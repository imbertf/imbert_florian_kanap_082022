// Get data from API 
// function initProduct() {
//     const url = "http://localhost:3000/api/products/";
//     fetch(url)
//         .then((response) => response.json())
//         .then((data) => data.forEach(products => showProductInCart(products)))
//         .catch((error) => {
//             console.log("Page product inaccessible");
//         });
// };
// initProduct();

// get cart
function getCart() {
    const cart = localStorage.getItem("cart");
    // console.table(cart);
    if (cart === null) {
        document.querySelector("#cartAndFormContainer > h1").textContent = "Votre cart est vide";
        // console.log('Votre cart est vide');
    } else {
        return JSON.parse(cart);
    }
};
getCart();

// display product in car on page 
function showProductInCart(products) {
    // get existing cart in localStorage
    const cart = getCart();

    // display product if cart exist
    if (cart != null) {
        // start loop in cart 
        for (item of cart) {
            console.log(item);

            // create article
            const cartItems = document.getElementById("cart__items");
            const article = document.createElement("article");

            cartItems.appendChild(article).classList.add('cart__item');
            article.setAttribute(`data-id`, item.id);
            // console.log(cart.id);
            article.setAttribute(`data-color`, item.color);
            // console.log(cart.color);
            // console.log(article);

            // create div img in article
            const cartItemImg = document.createElement("div");
            article.appendChild(cartItemImg);
            cartItemImg.classList.add("cart__item__img");
            // console.log(cartItemImg);

            // add img in div 
            const img = document.createElement("img");
            cartItemImg.appendChild(img);
            // img.src = products.imageUrl;
            // img.alt = products.alt;
            // console.log(img);
        };
    };
};
showProductInCart();

