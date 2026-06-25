const prices = {
    classicspoon: 30, chocolatespoon: 35,
    classicfork: 30, chocolatefork: 35,
    classicbowl: 60, chocolatebowl: 70,
    classicset: 100, chocolateset: 120
};

    const botMappings = {
        "bot1": "classicspoonCount", "bot2": "chocolatespoonCount",
        "bot3": "classicforkCount", "bot4": "chocolateforkCount",
        "bot5": "classicsetCount", "bot6": "chocolatesetCount",
        "bot7": "classicbowlCount", "bot8": "chocolatebowlCount"
    };

function updateStoreUI() {
    const count = parseInt(localStorage.getItem('cartCount')) || 0;
    const storeCart = document.getElementById("storecart");
    if (storeCart) storeCart.innerText = "Item selected: " + count;
    const storeCart1 = document.getElementById("storecart1");
    if (storeCart1) storeCart1.innerText = ": " + count;
    const total = calculatetotal();
    const totalDisplay = document.getElementById("total");
    const totalamount = document.getElementById("amount");
    if (totalDisplay) totalDisplay.innerText = "Total price: Rs." + total;
     if (totalamount) totalamount.innerText = "Total amount: Rs." + total;
}

function syncWithGlobalCart(itemKey, delta) {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    let itemCount = parseInt(localStorage.getItem(itemKey)) || 0;

    if (delta < 0 && itemCount <= 0) return;

    localStorage.setItem(itemKey, itemCount + delta);
    localStorage.setItem('cartCount', cartCount + delta);
        updateStoreUI();
}

function calculatetotal() {
    return (
        (parseInt(localStorage.getItem('classicspoonCount')) || 0) * prices.classicspoon +
        (parseInt(localStorage.getItem('chocolatespoonCount')) || 0) * prices.chocolatespoon +
        (parseInt(localStorage.getItem('classicforkCount')) || 0) * prices.classicfork +
        (parseInt(localStorage.getItem('chocolateforkCount')) || 0) * prices.chocolatefork +
        (parseInt(localStorage.getItem('classicbowlCount')) || 0) * prices.classicbowl +
        (parseInt(localStorage.getItem('chocolatebowlCount')) || 0) * prices.chocolatebowl +
        (parseInt(localStorage.getItem('classicsetCount')) || 0) * prices.classicset +
        (parseInt(localStorage.getItem('chocolatesetCount')) || 0) * prices.chocolateset
    );
}
const button = document.querySelectorAll('.button');
const total = calculatetotal();

button.forEach(button =>{
    if (total > 0) {
        button.style.display = "";
    }
    else {
        button.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    Object.entries(botMappings).forEach(([id, key]) => {
        const el = document.getElementById(id);
        if (el) {
            el.onclick = () => {
                syncWithGlobalCart(key, 1);
                alert("Item added to the cart!!!");
                document.querySelectorAll('.button').forEach(cart => cart.style.display = "");
        };
        }
    });

    document.querySelectorAll('.add-cart').forEach(button => {
        if (!button.id || !botMappings[button.id]) {
            button.addEventListener('click', () => {
                alert("Item added!");
                document.querySelectorAll('.button').forEach(cart => cart.style.display = "");
    });
        }
});

    document.querySelectorAll('.less-cart').forEach(button => {
        button.addEventListener('click', () => {
            alert("Item deducted from your cart!!");
            document.querySelectorAll('.button').forEach(cart => cart.style.display = "none");
        });
    });

    const resetCart = () => {
        const keys = [
            'cartCount', 'classicspoonCount', 'chocolatespoonCount',
            'classicforkCount', 'chocolateforkCount', 'classicbowlCount',
            'chocolatebowlCount', 'classicsetCount', 'chocolatesetCount'
        ];
        keys.forEach(key => localStorage.setItem(key, 0));
        updateStoreUI();
        const totalDisplay = document.getElementById("total");
        if (totalDisplay) totalDisplay.innerText = "Total price: Rs.0";
    };

    document.getElementById("remove")?.addEventListener("click", () => {
        resetCart();
        alert("Cart cleared!");
        document.querySelectorAll('.button').forEach(cart => cart.style.display = "none");
       
    });

    document.querySelectorAll('.add-buy').forEach(button => {
        button.onclick = () => {
            alert("Congratulations !!! Your order recorded sucessfully.");
            resetCart();
        };
    });
  updateStoreUI();
});