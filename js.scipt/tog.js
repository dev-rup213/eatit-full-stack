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
    function displayFinalTotal() {
        const prices = {
            classicspoon: 30, chocolatespoon: 35,
            classicfork: 30, chocolatefork: 35,
            classicbowl: 60, chocolatebowl: 70,
            classicset: 100, chocolateset: 120
        };

            const total = 
            (parseInt(localStorage.getItem('classicspoonCount')) || 0) * prices.classicspoon +
            (parseInt(localStorage.getItem('chocolatespoonCount')) || 0) * prices.chocolatespoon +
            (parseInt(localStorage.getItem('classicforkCount')) || 0) * prices.classicfork +
            (parseInt(localStorage.getItem('chocolateforkCount')) || 0) * prices.chocolatefork +
            (parseInt(localStorage.getItem('classicbowlCount')) || 0) * prices.classicbowl +
            (parseInt(localStorage.getItem('chocolatebowlCount')) || 0) * prices.chocolatebowl +
            (parseInt(localStorage.getItem('classicsetCount')) || 0) * prices.classicset +
            (parseInt(localStorage.getItem('chocolatesetCount')) || 0) * prices.chocolateset;

            document.getElementById("total").innerText = "Rs. " + total;
            document.getElementById("pay").innerText = "Proceed to Pay: Rs. " + total;

        return total;


    }



    function delivery() {
        const total = displayFinalTotal();
        if (total === 0) {
             document.getElementById("delivery").innerText = "Your Cart is empty!"; 
            return;
        }
        if (total < 500) {
            document.getElementById("delivery").innerText = "Estimated delivery time : 3-4 days"; 
            return;
         }
        if (total >= 500) {
            document.getElementById("delivery").innerText = "Just wait i am coming baby!!!";
            return;
        }


  
    }
    window.onload = function() {
        delivery();
    
        document.getElementById("cash").onclick = () => {
            document.getElementById("pay").innerText = "Place Order";
    }
        document.getElementById("UPI").onclick = () => {
            let total = displayFinalTotal()
            document.getElementById("pay").innerText = "Proceed to Pay: Rs. " + total;
    }
        document.getElementById("CARD").onclick = () => {
            let total = displayFinalTotal()
            document.getElementById("pay").innerText = "Proceed to Pay: Rs. " + total;
    }
    }
        // Payment Method Toggling
    const options = document.querySelectorAll(".option");
    const methods = document.querySelectorAll(".method");
        const tiles = document.querySelectorAll(".tile");

    options.forEach(option => {
        option.addEventListener("click", () => {
    options.forEach(o => o.classList.remove("active"));
    methods.forEach(m => m.classList.remove("active"));
    option.classList.add("active");
                const methodId = option.getAttribute('data-method');
                document.getElementById(methodId).classList.add("active");
});
        });
tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    tiles.forEach(t => t.classList.remove("active"));
    tile.classList.add("active");
                console.log("Selected UPI:", tile.dataset.upi);
  });
        });
        
        // Final "Pay" Action
        document.getElementById("pay").onclick = async () => {
    const total = displayFinalTotal();
    if (total === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Detect which payment method is active
    let paymentMethod = 'cod';
    if (document.getElementById("UPI").classList.contains("active")) paymentMethod = 'upi';
    if (document.getElementById("CARD").classList.contains("active")) paymentMethod = 'card';
    if (document.getElementById("cash").classList.contains("active")) paymentMethod = 'cod';

    const productKeyToId = {
        'classicspoonCount': 1,
        'chocolatespoonCount': 2,
        'classicforkCount': 3,
        'chocolateforkCount': 4,
        'classicbowlCount': 5,
        'chocolatebowlCount': 6,
        'classicsetCount': 7,
        'chocolatesetCount': 8
    };

    const prices = {
        classicspoonCount: 30, chocolatespoonCount: 35,
        classicforkCount: 30, chocolateforkCount: 35,
        classicbowlCount: 60, chocolatebowlCount: 70,
        classicsetCount: 100, chocolatesetCount: 120
    };

    const items = [];
    Object.keys(productKeyToId).forEach(key => {
        const qty = parseInt(localStorage.getItem(key)) || 0;
        if (qty > 0) {
            items.push({
                product_id: productKeyToId[key],
                quantity: qty,
                price: prices[key] * qty
            });
        }
    });

    try {
        const response = await fetch('http://127.0.0.1:8000/api/order/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                payment_method: paymentMethod,
                total_amount: total,
                items: items
            })
        });
        const data = await response.json();
        if (data.success) {
            removeCart();
            alert(`Thank you for choosing sustainability! Order #${data.order_id} placed successfully! amounting ${data.displayFinalTotal}`);
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('Something went wrong. Please try again.');
    }
};
    function removeCart() {
        parseInt(localStorage.removeItem('cartCount'));
        parseInt(localStorage.removeItem('classicspoonCount'));
        parseInt(localStorage.removeItem('chocolatespoonCount'));
        parseInt(localStorage.removeItem('classicforkCount'));
        parseInt(localStorage.removeItem('chocolateforkCount'));
        parseInt(localStorage.removeItem('classicbowlCount'));
        parseInt(localStorage.removeItem('chocolatebowlCount'));
        parseInt(localStorage.removeItem('classicsetCount')) ;
        parseInt(localStorage.removeItem('chocolatesetCount'));


    }

    