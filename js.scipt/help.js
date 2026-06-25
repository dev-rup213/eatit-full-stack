// Toggle Search Bar
const searchWrapper = document.querySelector('.search-wrapper');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('search-btn');

// When clicking the wrapper or icon, toggle 'active'
searchWrapper.addEventListener('click', (e) => {
    searchWrapper.classList.toggle('active');
    if (searchWrapper.classList.contains('active')) {
        searchInput.focus();
    }
});


// Prevent search bar from closing when clicking inside the input
searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close search if clicking outside
document.addEventListener('click', (e) => {
    if (!searchWrapper.contains(e.target)) {
        searchWrapper.classList.remove('active');
    }
});
const searchwrapper = document.querySelector('.mobile-only-search');
const search = document.getElementById('mobile-search-input');
const mobile = document.querySelectorAll('.mobile')
const Icon = document.getElementById('search-btn');
// When clicking the wrapper or icon, toggle 'active'
searchwrapper.addEventListener('click', (e) => {
    searchwrapper.classList.toggle('active');
    if (searchwrapper.classList.contains('active')) {
        search.focus();
        mobile.forEach(item => item.style.display = "none");
    }
    else {
      mobile.forEach(item => item.style.display = "");
    }
});


// Prevent search bar from closing when clicking inside the input
search.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close search if clicking outside
document.addEventListener('click', (e) => {
    if (!searchwrapper.contains(e.target)) {
        searchwrapper.classList.remove('active');
        mobile.forEach(item => item.style.display = "");
    }
});



const searchinput = document.getElementById("search-input");
const products = document.querySelectorAll(".help-card")
const noResult = document.getElementById("noResults")
searchinput.addEventListener("input",function(){
    const query =
searchinput.value.toLowerCase().trim();
    let matchfound = false;

    products.forEach(Product => {
        const text =
        Product.innerText.toLowerCase();
        if (text.includes(query)) {
            Product.style.display = "block";
            matchfound= true;
        }
        else{
            Product.style.display = "none";


        }
        });
        noResult.style.display = matchfound ? "none" : "block" ;
        
    });





const Searchinput = document.getElementById("mobile-search-input");
const Products = document.querySelectorAll(".help-card")
const NoResult = document.getElementById("noResults")
Searchinput.addEventListener("input",function(){
    const query =
Searchinput.value.toLowerCase().trim();
    let matchfound = false;

    Products.forEach(Product => {
        const text =
        Product.innerText.toLowerCase();
        if (text.includes(query)) {
            Product.style.display = "block";
            matchfound= true;
        }
        else{
            Product.style.display = "none";


        }
        });
        NoResult.style.display = matchfound ? "none" : "block" ;
        
    });
// Side Nav Toggle
const navOpen = document.getElementById('navOpen');
const navClose = document.getElementById('navClose');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
  document.body.classList.add('nav-open');
}

function closeNav() {
  document.body.classList.remove('nav-open');
}

navOpen?.addEventListener('click', openNav);
navClose?.addEventListener('click', closeNav);
navOverlay?.addEventListener('click', closeNav);

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// Highlight active page in side nav
document.querySelectorAll('.side-nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.style.background = 'var(--bg, #f8f9fa)';
    link.style.fontWeight = '600';
  }
});
