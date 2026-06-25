document.addEventListener('DOMContentLoaded',()=> {

const classic = document.querySelectorAll('.classic')
const cake = document.querySelectorAll('.cake')
const select =document.getElementById('select1')
console.log('Chocolate:',cake.length,'Classic:', classic.length);

select.addEventListener('change', () => {
  if(select.value === 'all') {
    cake.forEach(item => item.style.display = "");
    classic.forEach(item => item.style.display =  "");
  }

    if(select.value === 'cake') {
    cake.forEach(item => item.style.display = "");
    classic.forEach(item => item.style.display =  "none");

    }


    
  if(select.value === 'classic') {
    cake.forEach(item => item.style.display = "none");
    classic.forEach(item => item.style.display =  "");
  }
})
  

});
document.addEventListener('DOMContentLoaded',()=> {

const classic = document.querySelectorAll('.classic')
const cake = document.querySelectorAll('.cake')
const select =document.getElementById('select2')
console.log('Chocolate:',cake.length,'Classic:', classic.length);

select.addEventListener('change', () => {
  if(select.value === 'all') {
    cake.forEach(item => item.style.display = "");
    classic.forEach(item => item.style.display =  "");
  }

    if(select.value === 'cake') {
    cake.forEach(item => item.style.display = "");
    classic.forEach(item => item.style.display =  "none");

    }


    
  if(select.value === 'classic') {
    cake.forEach(item => item.style.display = "none");
    classic.forEach(item => item.style.display =  "");
  }
})
  

});
document.addEventListener('DOMContentLoaded',()=> {
const select = document.getElementById('select1')
const card = document.querySelectorAll('.product-row')
const search = document.getElementById('search-input')

function applyfilter () {
    const catagory = select.value;
    const searchall = search.value.toLowerCase().trim();

    card.forEach(card =>{
    const mastercard = catagory === 'all' || card.classList.contains(catagory);
    const cardText = card.textContent.toLowerCase();
    const searchtext = searchall === '' || cardText.includes(searchall);

    if(mastercard && searchtext) {
        card.style.display = "";
    }
    else {
        card.style.display = "none"
    }
});
}
    select.addEventListener('change',applyfilter);
    search.addEventListener('input',applyfilter);
});
document.addEventListener('DOMContentLoaded',()=> {
const select = document.getElementById('select2')
const card = document.querySelectorAll('.product-row')
const search = document.getElementById('mobile-search-input')

function applyfilter () {
    const catagory = select.value;
    const searchall = search.value.toLowerCase().trim();

    card.forEach(card =>{
    const mastercard = catagory === 'all' || card.classList.contains(catagory);
    const cardText = card.textContent.toLowerCase();
    const searchtext = searchall === '' || cardText.includes(searchall);

    if(mastercard && searchtext) {
        card.style.display = "";
    }
    else {
        card.style.display = "none"
    }
});
}
    select.addEventListener('change',applyfilter);
    search.addEventListener('input',applyfilter);
});