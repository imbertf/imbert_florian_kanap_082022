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


function showcartInCart() {
    // get existing cart in localStorage
    const cart = getCart();


    if (cart != null) {
        for (product of cart) {
            // console.log(product);
            // create article, add class with ID and color attributes in cart__items section
            const cartItems = document.getElementById('cart__items');
            const article = document.createElement('article');
            // console.log(cartItems);
            cartItems.insertAdjacentElement('afterbegin', article).classList.add('cart__item');
            // console.log(article);

            article.setAttribute(`data-id`, product.id);
            // console.log(cart.id);
            article.setAttribute(`data-color`, product.color);
            // console.log(cart.color);

            // create div cart__item__img with img inside article
            const divImg = document.createElement('div');
            divImg.classList.add('cart__item__img');
            // console.log(div);
            const img = document.createElement('img');
            // console.log(img);
            article.appendChild(divImg);
            // console.log(div);
            divImg.append(img);
            img.src = product.image;
            img.alt = product.alt;
            // console.log(img);

            // create div cart__item__content wich will show cart informations to customer
            const divContent = document.createElement('div');
            article.insertAdjacentElement('beforeend', divContent);
            divContent.classList.add('cart__item__content');

            // create div class cart__item__content__description in cart__item__content
            const divContentDescription = document.createElement('div');
            const cartItemContent = document.querySelector('article > div.cart__item__content');
            // console.log(divContentDescription);
            cartItemContent.insertAdjacentElement('beforeend', divContentDescription).classList.add('cart__item__content__description');

            const h2 = document.createElement('h2');
            const color = document.createElement('p');
            const price = document.createElement('p');

            cartItemContent.querySelector('.cart__item__content__description').append(h2, color, price);

            h2.innerText = product.name;
            color.innerText = product.color;
            price.innerText = product.price + "€";

            // create div class cart__item__content__settings in cart__item__content
            // console.log(cartItemContent);
            cartItemContent.appendChild(document.createElement('div')).classList.add('cart__item__content__settings');


            // create div class cart__item__content__settings__quantity in cart__item__content__settings
            const cartItemContentSettings = document.querySelector('.cart__item__content > .cart__item__content__settings');
            const divSettingsQuantity = document.createElement('div');
            cartItemContentSettings.insertAdjacentElement('beforeend', divSettingsQuantity);
            divSettingsQuantity.classList.add('cart__item__content__settings__quantity')

            // add p and input in div cart__item__content__settings__quantity
            const quantity = document.createElement('p');
            const input = document.createElement('input');
            const cartItemContentSettingsQuantity = document.querySelector('.cart__item__content__settings > .cart__item__content__settings__quantity').append(quantity, input);

            // prevent adding negative value
            input.addEventListener('change', (event) => {
                // console.log(event);
                if (event.target.value < 0) {
                    input.value = 1;
                }
            });

            // show quantity
            quantity.innerText = product.quantity;

            // show input
            input.setAttribute('type', "number");
            input.classList.add('itemQuantity');
            input.classList.add('itemQuantity');
            input.setAttribute('min', "1");
            input.setAttribute('max', "10");
            input.setAttribute('value', "");

            // update quantity
            input.addEventListener('change', (event) => {
                // console.log(event);
                const inputValue = input.value;
                // console.log(inputValue);
                const currentQuantity = product.quantity;
                // console.log(currentQuantity);
                const updateQuantity = +currentQuantity + +inputValue;
                console.log(updateQuantity);
                cart.push(updateQuantity);
                console.table(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.alert("La quantité de votre panier à été modifée");

            for (let i = 0; i < cart.length; i++) {
                const quantity = cart[i].quantity;
                console.log(quantity);
            }

            if (event.target.value > input.value) {
                const currentQuantity = product.quantity;
                const inputQuantity = input.value;
                const addQuantity = currentQuantity + +inputQuantity;
                quantity.innerText = addQuantity;
                // console.log(currentQuantity);
                // console.log(inputQuantity);
                console.log(addQuantity);
            } else {
                const currentQuantity = product.quantity;
                const inputQuantity = input.value;
                const removeQuantity = currentQuantity - -inputQuantity;
                quantity.innerText = removeQuantity;
                // console.log(currentQuantity);
                // console.log(inputQuantity);
                console.log(removeQuantity);
            }
            });

            // create div class cart__item__content__settings__delete in cart__item__content__settings
            const divSettingsDelete = document.createElement('div');
            cartItemContentSettings.insertAdjacentElement('beforeend', divSettingsDelete);
            divSettingsDelete.classList.add('cart__item__content__settings__delete');

            // add delete text in cart__item__content__settings__delete
            const deleteItem = document.createElement('p');
            const cartItemContentSettingsDelete = document.querySelector('.cart__item__content__settings > .cart__item__content__settings__delete').append(deleteItem);

            deleteItem.classList.add('deleteItem');
            deleteItem.innerText = "Supprimer";

            // deleteItemInCart();

        };
    }
    // showcartInCart();
};

showcartInCart();

// function deleteItemInCart() {
//     const cart = getCart();
//     // console.log(cart);
//     const deleteItem = document.querySelector('.deleteItem');
//     // console.log(deleteItem);
//     for (let product of cart) {
//         const productId = product.id;
//         console.log(productId);
//         deleteItem.addEventListener('click', (event) => {
//             localStorage.removeItem('cart');
//         })
//     }
// }

// show total price
// function totalPrice() {

// }

function updateQuantity() {
    const cart = getCart();
    console.log(cart);

    if (cart != null) {
        for (let product in cart) {
            const currentQuantity = product.quantity;
            console.log(currentQuantity);
        };
    };
}
updateQuantity();