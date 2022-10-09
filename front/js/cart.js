// get cart
function getCarts() {
    const cart = localStorage.getItem("cart");
    // console.table(cart);
    if (cart === null) {
        document.querySelector("#cartAndFormContainer > h1").textContent = "Votre panier est vide";
        // console.log('Votre cart est vide');
    } else {
        return JSON.parse(cart);
    };
};

// display product in car on page 
function fetchProductsInCart() {
    // get existing cart in localStorage
    const carts = getCarts();

    // start loop in cart 
    for (const cart of carts) {
        fetch("http://localhost:3000/api/products/" + cart.id)
            .then((response) => response.json())
            .then((product) => showProductInCart(product, cart))
            .catch((error) => console.error("erreur sur le produit ", error));
    };
};

function showProductInCart(product, cart) {

    // create article
    const cartItems = document.getElementById("cart__items");
    const article = document.createElement("article");
    // console.log(product);
    // console.log(cart);

    // add article in section cart__items 
    cartItems.appendChild(article).classList.add('cart__item');
    article.setAttribute(`data-id`, product._id);
    // console.log(product.id);
    article.setAttribute(`data-color`, cart.color);
    // console.log(article);

    // create div img in article
    const cartItemImg = document.createElement("div");
    article.appendChild(cartItemImg);
    cartItemImg.classList.add("cart__item__img");
    // console.log(cartItemImg);

    // create img 
    const img = document.createElement("img");
    cartItemImg.appendChild(img);
    // add img in div 

    img.src = product.imageUrl;
    img.alt = product.altTxt;
    // console.log(img);

    // create div cart__item__content in article
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content");
    article.appendChild(cartItemContent);
    // console.log(cartItemContent);

    // create div cart__item__content__description in cart__item__content 
    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartItemContentDescription);
    // console.log(cartItemContentDescription);

    // create H2 in cart__item__content__description 
    const h2 = document.createElement("h2");
    h2.innerText = product.name;
    cartItemContentDescription.appendChild(h2);
    // console.log(h2);

    // create pColor in cart__item__content__description 
    const pColor = document.createElement("p");
    pColor.innerText = article.dataset.color;
    cartItemContentDescription.appendChild(pColor);
    // console.log(pColor);

    // create pPrice in cart__item__content__description 
    const pPrice = document.createElement("p");
    pPrice.innerText = product.price;
    cartItemContentDescription.appendChild(pPrice);
    // console.log(pPrice);

    // create div cart__item__content__settings in cart__item__content 
    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);
    // console.log(cartItemContentSettings);

    // create div cart__item__content__settings__quantity in cart__item__content__settings 
    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    // console.log(cartItemContentSettingsQuantity);

    // create pQuantity in cart__item__content__settings__quantity 
    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : ";
    cartItemContentSettingsQuantity.appendChild(pQuantity);
    // console.log(pQuantity);

    // create input itemQuantity in cart__item__content__settings__quantity
    const inputQuantity = document.createElement('input');
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute('type', "number");
    inputQuantity.setAttribute('name', "itemQuantity");
    inputQuantity.setAttribute('min', "0");
    inputQuantity.setAttribute('max', "10");
    inputQuantity.setAttribute('value', cart.quantity);
    inputQuantity.setAttribute(`data-id`, product._id);
    inputQuantity.setAttribute(`data-color`, cart.color);
    inputQuantity.addEventListener('change', (event) => {
        updateQuantity(event);
    });

    cartItemContentSettingsQuantity.appendChild(inputQuantity);

    // prevent adding negative value
    inputQuantity.addEventListener('change', (event) => {
        // console.log(event);
        if (event.target.value < 0) {
            inputQuantity.value = 0;
        }
    });

    totalQuantity();
    totalPrice();

    // create div cart__item__content__settings__delete in cart__item__content__settings to delete product in cart  
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    // console.log(cartItemContentSettingsDelete);

    // create pDelete in cart__item__content__settings__delete 
    const pDelete = document.createElement("p");
    pDelete.classList.add('deleteItem');
    pDelete.innerText = "Supprimer";
    cartItemContentSettingsDelete.appendChild(pDelete);
    // console.log(pDelete);

    // function to remove article from cart 
    const dataId = pDelete.closest(".cart__item").dataset.id;
    const dataColor = pDelete.closest(".cart__item").dataset.color;
    pDelete.addEventListener("click", (event) => {
        deleteItem(dataId, dataColor);
    })

};

function updateQuantity(event) {
    const dataId = event.target.getAttribute("data-id");
    const dataColor = event.target.getAttribute("data-color");
    // console.log(dataColor);
    const cart = JSON.parse(localStorage.getItem("cart"));

    for (let article of cart) {
        if (article.id === dataId && article.color === dataColor) {
            article.quantity = +event.target.value;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// Get article in cart, filter article, create new cart with filtered article and push new cart instead the old one
function deleteItem(dataId, dataColor) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(dataId, dataColor);
    const cartFilter = cart.filter((article) => article.id !== dataId && article.color !== dataColor || article.id === dataId && article.color !== dataColor);
    // console.log(cartFilter)
    let newCart = cartFilter;
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
}

function totalQuantity() {
    const getTotalQuantity = document.getElementById("totalQuantity");
    const cart = JSON.parse(localStorage.getItem("cart"));
    let totalQuantity = [];
    // console.log(totalQuantity);
    let total = 0;
    for (let article of cart) {
        // console.log(article.quantity);
        total += article.quantity;
    }
    totalQuantity.push(total)
    // console.log(totalQuantity);
    getTotalQuantity.innerText = total;
};

// Calculate cart total price
function totalPrice() {
    // get datas from HTML values 
    const getTotalPrice = document.getElementById("totalPrice");
    const getQuantity = document.querySelectorAll(".itemQuantity");
    const getPrices = document.querySelectorAll(".cart__item__content__description");

    // define basic product price value at 0
    let productPrice = 0;
    // create loop with all .cart__item__content__description
    for (let i = 0; i < getPrices.length; i++) {
        // get text element which contains article price information changing type from string to number and multiply it with quantity
        productPrice += parseInt(getPrices[i].lastElementChild.textContent) * getQuantity[i].value;
    }
    getTotalPrice.innerText = productPrice;
};

fetchProductsInCart();

// --------------------------------------------------------------
// ------------------ |                  | ----------------------
// ------------------ |   form section   | ----------------------
// ------------------ |                  | ----------------------
// --------------------------------------------------------------

function firstNameValidation() {
    let firstName = document.getElementById("firstName");
    firstName.addEventListener("change", (event) => {
        if (firstName.value = ""){
            let error = document.getElementById("firstNameErrorMsg");
            error.innerText = "Le champ prénom est requis.";
            error.style.color = "red";
            // event.preventDefault();
        }
    })
};

firstNameValidation();
