  const pc = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const d = document.createElement('div');
    d.className = 'particle';
    const s = 4 + Math.random() * 8;
    d.style.cssText = `
      left:${Math.random()*100}%;
      width:${s}px; height:${s}px;
      animation-duration:${8+Math.random()*14}s;
      animation-delay:${-Math.random()*12}s;
      opacity:${0.1+Math.random()*0.2};
    `;
    pc.appendChild(d);
  }

  // ── Tab switch ──
  let currentTab = 'login';
  function switchTab(tab) {
    currentTab = tab;
    document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
    document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
    document.getElementById('panelsTrack').style.transform = tab === 'login' ? 'translateX(0)' : 'translateX(-100%)';
    clearAllAlerts();
  }

  // ── Toggle password visibility ──
  function togglePw(inputId, btn) {
    const inp = document.getElementById(inputId);
    const isText = inp.type === 'text';
    inp.type = isText ? 'password' : 'text';
    btn.style.color = isText ? '' : 'var(--green-light)';
  }

  // ── Clear inline errors ──
  function clearErr(inputId, errId) {
    document.getElementById(inputId)?.classList.remove('error');
    document.getElementById(errId)?.classList.remove('show');
  }
  function showErr(inputId, errId) {
    document.getElementById(inputId)?.classList.add('error');
    document.getElementById(errId)?.classList.add('show');
  }
  function clearAllAlerts() {
    ['loginAlert','registerAlert','forgotAlert'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.className = 'alert-banner'; el.innerHTML = ''; }
    });
  }

  function showAlert(id, msg, type = 'error') {
    const el = document.getElementById(id);
    el.className = `alert-banner ${type}`;
    el.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg><span>${msg}</span>`;
  }

  // ── Password strength ──
  function onPasswordInput() {
    clearErr('regPassword','regPassErr');
    const val = document.getElementById('regPassword').value;
    const bar = document.getElementById('pwStrength');
    const fill = document.getElementById('strengthFill');
    const label = document.getElementById('strengthLabel');
    if (!val) { bar.classList.remove('show'); return; }
    bar.classList.add('show');
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    const levels = [
      { pct:'20%', color:'#e74c3c', text:'Very Weak' },
      { pct:'40%', color:'#e67e22', text:'Weak' },
      { pct:'60%', color:'#f1c40f', text:'Fair' },
      { pct:'80%', color:'#2ecc71', text:'Strong' },
      { pct:'100%', color:'#27ae60', text:'Very Strong' },
    ];
    const lv = levels[Math.max(0, score - 1)];
    fill.style.width = lv.pct;
    fill.style.background = lv.color;
    label.textContent = `Strength: ${lv.text}`;
    label.style.color = lv.color;
    checkConfirm();
  }

  function checkConfirm() {
    const pw = document.getElementById('regPassword').value;
    const cf = document.getElementById('regConfirm').value;
    if (!cf) return;
    if (pw !== cf) {
      showErr('regConfirm','regConfirmErr');
    } else {
      clearErr('regConfirm','regConfirmErr');
      document.getElementById('regConfirm').classList.add('valid');
    }
  }

  // ── Validation helpers ──
  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isValidPhone(v) { return /^[6-9]\d{9}$/.test(v.replace(/[\s\-\+]/g,'')); }

  // ── Loading state ──
  function setLoading(btnId, on) {
    document.getElementById(btnId).classList.toggle('loading', on);
  }

  // ── LOGIN ──
  async function handleLogin() {
    clearAllAlerts();
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPassword').value;
    let valid = true;

    if (!isValidEmail(email)) { showErr('loginEmail','loginEmailErr'); valid = false; }
    if (!pass) { showErr('loginPassword','loginPassErr'); valid = false; }
    if (!valid) return;

    setLoading('loginBtn', true);

    try {
      const res = await fetch('https://eatit-full-stack.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (document.getElementById('rememberMe').checked) {
          localStorage.setItem('eatit_user', JSON.stringify({ name: data.name, email }));
        } else {
          sessionStorage.setItem('eatit_user', JSON.stringify({ name: data.name, email }));
        }
        showSuccess('Welcome back, ' + data.name + '!', 'You have logged in successfully.', 'index.html');
      } else {
        showAlert('loginAlert', data.error || 'Invalid email or password. Please try again.');
      }
    } catch (e) {
      showAlert('loginAlert', 'Network error. Make sure the server is running and try again.');
    }

    setLoading('loginBtn', false);
  }

  // ── REGISTER ──
  async function handleRegister() {
    clearAllAlerts();
    const name    = document.getElementById('regName').value.trim();
    const phone   = document.getElementById('regPhone').value.trim();
    const email   = document.getElementById('regEmail').value.trim();
    const address = document.getElementById('regAddress').value.trim();
    const pass    = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    let valid = true;

    if (!name)                      { showErr('regName','regNameErr'); valid = false; }
    if (!isValidPhone(phone))       { showErr('regPhone','regPhoneErr'); valid = false; }
    if (!isValidEmail(email))       { showErr('regEmail','regEmailErr'); valid = false; }
    if (!address)                   { showErr('regAddress','regAddressErr'); valid = false; }
    if (pass.length < 8)            { showErr('regPassword','regPassErr'); valid = false; }
    if (pass !== confirm)           { showErr('regConfirm','regConfirmErr'); valid = false; }
    if (!valid) return;

    setLoading('registerBtn', true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, address, password: pass })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showSuccess('Account Created!', 'Your EAT iT account has been created successfully. Welcome to sustainable eating!', 'index.html');
      } else {
        showAlert('registerAlert', data.error || 'Registration failed. Please try again.');
      }
    } catch (e) {
      showAlert('registerAlert', 'Network error. Make sure the server is running and try again.');
    }

    setLoading('registerBtn', false);
  }

  // ── FORGOT PASSWORD ──
  function openForgot(e) { e.preventDefault(); document.getElementById('forgotOverlay').classList.add('open'); }
  function closeForgot() { document.getElementById('forgotOverlay').classList.remove('open'); }

  async function submitForgot() {
    const email = document.getElementById('forgotEmail').value.trim();
    if (!isValidEmail(email)) {
      document.getElementById('forgotEmailErr').classList.add('show');
      return;
    }
    document.getElementById('forgotEmailErr').classList.remove('show');
    const btn = document.querySelector('#forgotModal .btn-submit');
    btn.classList.add('loading');

    // Simulate API call (wire to real endpoint when backend is ready)
    await new Promise(r => setTimeout(r, 1600));
    btn.classList.remove('loading');
    showAlert('forgotAlert', 'If this email is registered, a recovery link has been sent.', 'success');
  }

  // ── SUCCESS MODAL ──
  function showSuccess(title, msg, redirect) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMsg').textContent = msg;
    document.getElementById('successOverlay').classList.add('open');
    setTimeout(() => { document.getElementById('redirectFill').style.width = '100%'; }, 100);
    setTimeout(() => { window.location.href = redirect; }, 3200);
  }

  // Close modals on backdrop click
  document.getElementById('forgotOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('forgotOverlay')) closeForgot();
  });

  // Enter key submit
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (document.getElementById('forgotOverlay').classList.contains('open')) { submitForgot(); return; }
      if (currentTab === 'login') handleLogin();
      else handleRegister();
    }
  });