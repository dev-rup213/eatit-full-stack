const prices = {
    classicspoon: 30, chocolatespoon: 35,
    classicfork: 30, chocolatefork: 35,
    classicbowl: 60, chocolatebowl: 70,
    classicset: 100, chocolateset: 120
};

const itemMap = {
    1: "classicspoon", 2: "chocolatespoon", 
    3: "chocolatefork", 4: "classicfork", 
    5: "classicbowl", 6: "chocolatebowl",
    7: "classicset" , 8: "chocolateset"
};

function getCartState() {
    return {
        cartCount: parseInt(localStorage.getItem('cartCount')) || 0,
        classicspoonCount: parseInt(localStorage.getItem('classicspoonCount')) || 0,
        chocolatespoonCount: parseInt(localStorage.getItem('chocolatespoonCount')) || 0,
        classicforkCount: parseInt(localStorage.getItem('classicforkCount')) || 0,
        chocolateforkCount: parseInt(localStorage.getItem('chocolateforkCount')) || 0,
        classicbowlCount: parseInt(localStorage.getItem('classicbowlCount')) || 0,
        chocolatebowlCount: parseInt(localStorage.getItem('chocolatebowlCount')) || 0,
        classicsetCount: parseInt(localStorage.getItem('classicsetCount')) || 0,
        chocolatesetCount: parseInt(localStorage.getItem('chocolatesetCount')) || 0
    };
}

function saveData(state) {
    Object.keys(state).forEach(key => localStorage.setItem(key, state[key]));
}

function updateUI() {
            const s = getCartState();
    
    for (let i = 1; i <= 8; i++) {
        const el = document.getElementById(`display${i}`);
        if (el) el.innerText = s[`${itemMap[i]}Count`];
        const totalEl = document.getElementById("total");
        if (totalEl) totalEl.innerText = `Total price: Rs.${calculateTotal()}`;
    }

    const cartEl = document.getElementById("cart");
    if (cartEl) {
        cartEl.innerHTML = s.cartCount > 0 
            ? `<i class="fa-solid fa-shopping-cart"></i> Item selected: ${s.cartCount}` 
            : `<i class="fa-solid fa-shopping-cart"></i> Your cart is empty`;
    }
}

function calculateTotal() {
    const s = getCartState();
    return Object.keys(prices).reduce((total, key) => total + (s[`${key}Count`] || 0) * prices[key], 0);
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 8; i++) {
        const addBtn = document.getElementById(`btn${(i * 2) - 1}`);
        const lessBtn = document.getElementById(`btn${i * 2}`);
        const removeBtn = document.getElementById(`btnr${i}`)
        const key = `${itemMap[i]}Count`;


        if (addBtn) addBtn.onclick = () => {
            let s = getCartState();
            s[key]++; s.cartCount++;
            saveData(s); updateUI();
            alert("Item added to the cart!!!");
};

        if (lessBtn) lessBtn.onclick = () => {
            let s = getCartState();
            if (s[key] > 0) {
                s[key]--; s.cartCount--;
                saveData(s); updateUI();
                alert("Item deducted from the cart!!!");
            }
        };
        if (removeBtn) removeBtn.onclick = () => {
            let s = getCartState();
            if (s[key]>0) {
                s.cartCount -= s[key];
                s[key] = 0
                saveData(s); updateUI();
                alert(`${itemMap[i]} removed from cart!!`)
            }

    };

        const pBtn = document.getElementById(`price${i}`);
        if (pBtn) pBtn.onclick = () => {
            const s = getCartState();
            const seePriceEl = document.getElementById(`see${i}`);
            if (seePriceEl) seePriceEl.innerText = `Total Price: ${s[key] * prices[itemMap[i]]}`;
};

        const bBtn = document.getElementById(`Buy${i}`);
        if (bBtn) bBtn.onclick = () => {
            let s = getCartState();
            if (s[key] > 0) {
                s.cartCount -= s[key];
                s[key] = 0;
                saveData(s); updateUI();
                const seePriceEl = document.getElementById(`see${i}`);
                if (seePriceEl) seePriceEl.innerText = "Total Price: 0";
                alert("Congratulations !!! Your order for this item recorded successfully.");
    }
};
    }



    document.getElementById("buyall")?.addEventListener("click", () => {
        const reset = { cartCount: 0, classicspoonCount: 0, chocolatespoonCount: 0, classicforkCount: 0, chocolateforkCount: 0, classicbowlCount: 0, chocolatebowlCount: 0, classicsetCount: 0, chocolatesetCount: 0 };
        saveData(reset); updateUI();
        const totalEl = document.getElementById("total");
        if (totalEl) totalEl.innerText = "";
        for(let i=1; i<=8; i++) {
            const seePriceEl = document.getElementById(`see${i}`);
            if (seePriceEl) seePriceEl.innerText = "Total Price: 0";
    }
    });

    document.querySelector('.product-card .add-buy')?.addEventListener("click", () => {
        window.location.href = "purchase.html";
    });
    updateUI();
});
