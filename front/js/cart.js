// Get data from API 
function initProduct() {
    const url = `http://localhost:3000/api/products/`;
    // console.log(url);
    fetch(url)
        .then((response) => response.json())
        .then((product) => showProductInCart(product))
        .catch((error) => {
            console.log("Page product inaccessible");
        });
};
initProduct();

// get cart
function getCart() {
    const cart = localStorage.getItem("cart");
    // console.table(cart);
    if (cart === null) {
        document.querySelector("#cartAndFormContainer > h1").textContent = "Votre panier est vide";
        // console.log('Votre cart est vide');
    } else {
        return JSON.parse(cart);
    }
};
getCart();

// display product in car on page 
function showProductInCart(product) {
    // console.log(product);

    // get existing cart in localStorage
    const cart = getCart();
    // start loop in cart 
    for (let i = 0; i < cart.length; i++) {

        // create article
        const cartItems = document.getElementById("cart__items");
        const article = document.createElement("article");

        // add article in section cart__items 
        cartItems.appendChild(article).classList.add('cart__item');
        article.setAttribute(`data-id`, cart[i].id);
        // console.log(cart[i].id);
        article.setAttribute(`data-color`, cart[i].color);
        // console.log(cart[i].color);
        console.log(article);

        // create div img in article
        const cartItemImg = document.createElement("div");
        article.appendChild(cartItemImg);
        cartItemImg.classList.add("cart__item__img");
        // console.log(cartItemImg);

        // create img 
        const img = document.createElement("img");
        cartItemImg.appendChild(img);
        // add img in div 
        img.src = product[i].imageUrl;
        img.alt = product[i].altTxt;
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
        h2.innerText = product[i].name;
        cartItemContentDescription.appendChild(h2);

        // create pColor in cart__item__content__description 
        const pColor = document.createElement("p");
        pColor.innerText = article.dataset.color;
        cartItemContentDescription.appendChild(pColor);
        // console.log(pColor);

        // create pPrice in cart__item__content__description 
        const pPrice = document.createElement("p");
        pPrice.innerText = product[i].price;
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
        inputQuantity.setAttribute('min', "1");
        inputQuantity.setAttribute('max', "10");
        inputQuantity.setAttribute('value', "");
        cartItemContentSettingsQuantity.appendChild(inputQuantity);

        // prevent adding negative value
        inputQuantity.addEventListener('change', (event) => {
            // console.log(event);
            if (event.target.value < 0) {
                inputQuantity.value = 1;
            }
        });

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
    };
};
