// get cart. If no cart is present in localStorage, display message to inform customer
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

// show product in cart to customer 
// display article adding elements in DOM 
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
    pPrice.innerText = product.price + " €";
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

    // create input itemQuantity and add it in cart__item__content__settings__quantity
    // set setAttribute to input
    const inputQuantity = document.createElement("input");
    const quantityDataId = pQuantity.closest(".cart__item").dataset.id;
    const quantityDataColor = pQuantity.closest(".cart__item").dataset.color;
    cartItemContentSettingsQuantity.appendChild(inputQuantity);
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute('type', "number");
    inputQuantity.setAttribute('name', "itemQuantity");
    inputQuantity.setAttribute('min', "0");
    inputQuantity.setAttribute('max', "10");
    inputQuantity.setAttribute('value', cart.quantity);

    // update product quantity in cart when change number in input 
    inputQuantity.addEventListener('change', (event) => {
        updateQuantity(event, quantityDataId, quantityDataColor);
    });

    // prevent adding negative value
    inputQuantity.addEventListener('change', (event) => {
        // console.log(event);
        if (event.target.value < 0) {
            inputQuantity.value = 0;
        }
    });

    // call function to calculate total quantity, price and display it in DOM 
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

// allow customer to update quantity in cart 
// get cart 
// start loop to select only one product and modify quantity without change others quantities of others products in cart
// replace old cart by the new one and refresh page  
function updateQuantity(event, quantityDataId, quantityDataColor) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    for (let article of cart) {
        if (article.id === quantityDataId && article.color === quantityDataColor) {
            article.quantity = +event.target.value;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// allow customer to remove chosen item from cart 
// Get article in cart
// filter article, create new cart with filtered article 
// replace old cart by the new one and refresh page  
function deleteItem(dataId, dataColor) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // console.log(dataId, dataColor);
    const cartFilter = cart.filter((article) => article.id !== dataId && article.color !== dataColor || article.id === dataId && article.color !== dataColor);
    // console.log(cartFilter)
    let newCart = cartFilter;
    localStorage.setItem("cart", JSON.stringify(newCart));
    location.reload();
}

// display total product quantity in DOM
// get cart
// create empty array
// sets quantity to 0  
// start loop in cart to gather all products quantities  
// push total quantity in empty array
// injects the total in DOM
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
// sets price to 0
// start loop using all textContent in .cart__item__content__description
// pick up values on them and add values together
// injects the total in DOM
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

// prevent error during writing form process 
// use Regex to test if user is writing right informations in form line 
// return error message to customer if the entered values are wrong
function checkEmptyInputs() {
    const form = document.getElementsByClassName("cart__order__form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const order = document.getElementById("order");

    const firstNameError = document.getElementById("firstNameErrorMsg");
    const lastNameError = document.getElementById("lastNameErrorMsg");
    const addressError = document.getElementById("addressErrorMsg");
    const cityError = document.getElementById("cityErrorMsg");
    const emailError = document.getElementById("emailErrorMsg");

    firstName.addEventListener("input", (event) => {
        const value = event.target.value;
        if (/^[A-zÀ-ú \-]+$/.test(value)) {
            firstName.style.border = "2px solid green";
            firstNameError.innerHTML = "";
        } else {
            // isValid = false;
            firstNameError.innerHTML = "Charactères invalides";
            firstName.style.border = "2px solid red";
        };
    });

    lastName.addEventListener("input", (event) => {
        const value = event.target.value;
        if (/^[A-zÀ-ú \-]+$/.test(value)) {
            lastName.style.border = "2px solid green";
            lastNameError.innerHTML = "";
        } else {
            // isValid = false;
            lastNameError.innerHTML = "Charactères invalides";
            lastName.style.border = "2px solid red";
        };
    });

    address.addEventListener("input", (event) => {
        const value = event.target.value;
        if (/^[A-zÀ-ú0-9 ,.'\-]+$/.test(value)) {
            address.style.border = "2px solid green";
            addressError.innerHTML = "";
        } else {
            // isValid = false;
            addressError.innerHTML = "Charactères invalides";
            address.style.border = "2px solid red";
        };
    });

    city.addEventListener("input", (event) => {
        const value = event.target.value;
        if (/^[A-zÀ-ú \-]+$/.test(value)) {
            city.style.border = "2px solid green";
            cityError.innerHTML = "";
        } else {
            // isValid = false;
            cityError.innerHTML = "Charactères invalides";
            city.style.border = "2px solid red";
        };
    });

    email.addEventListener("input", (event) => {
        const value = event.target.value;
        if (/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})+$/.test(value)) {
            email.style.border = "2px solid green";
            emailError.innerHTML = "";
        } else {
            // isValid = false;
            emailError.innerHTML = "Exemple: adresse@mail.com";
            email.style.border = "2px solid red";
        };
    });

    // prevents customer from ordering product if the form is not properly completed 
    order.addEventListener("click", (event) => {
        // prevent from natural refresh function of this event
        event.preventDefault();
        const cart = getCarts();
        // create map of products using id product
        const productID = cart.map(product => product.id);
        // checks if informations are entered
        // if not, display erro message to customer
        if (firstName.value == "" || lastName.value == "" || address.value == "" || city.value == "" || email.value == "") {
            alert("Renseignez le formulaire pour passer commande.");
            firstName.style.border = "2px solid red";
            lastName.style.border = "2px solid red";
            address.style.border = "2px solid red";
            city.style.border = "2px solid red";
            email.style.border = "2px solid red";
        } else {
            // if all informations are right, allow order using "Commander !" button
            // create Object with one contact object and products array inside of it
            const order = {
                contact: {
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "address": address.value,
                    "city": city.value,
                    "email": email.value,
                },
                products: productID,
            };

            // create POST request to API and get data and orderId in response
            // redirect customer to confirmation page with order ID in URL
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    location.href = `confirmation.html?orderid=${data.orderId}`;
                })
        };
    });
};

checkEmptyInputs();

