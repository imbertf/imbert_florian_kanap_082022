// ----- get URL -----//

// get product.id in URL

function getUrlId() {
    const urlParams = new URLSearchParams(document.location.search);
    const getId = urlParams.get('id');
    // console.log(getId);

    fetch("http://localhost:3000/api/products/" + getId)
        .then((response) => response.json())
        .then((product) => addProduct(product))
        .catch((error) => {
            console.log("Page product inaccessible");
        });
};


getUrlId();

// ----- add product by id in DOM ----- //

function addProduct(product) {
    const productImg = document.querySelector('article div.item__img');
    const productName = document.getElementById('title');
    const productPrice = document.getElementById('price');
    const itemDescription = document.getElementById('description');
    const colorChoice = document.getElementById('colors');
    const createImg = document.createElement('img');
    const productColors = product.colors;

    productImg.appendChild(createImg);

    createImg.src = product.imageUrl;
    createImg.alt = product.altTxt;

    productName.textContent = product.name;
    productPrice.textContent = product.price;
    itemDescription.textContent = product.description;

    for (const colors of productColors) {
        const option = document.createElement('option');
        option.value = colors;
        option.textContent = colors;
        colorChoice.append(option);
    }

    addProductInCart();
};


// ----- add product in cart ----- //

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
};

function addProductInCart() {

    document.getElementById('addToCart').addEventListener('click', () => {
        const cart = getCart();
        const productName = document.getElementById('title').innerText;
        const productPrice = document.getElementById('price').innerText;
        const selectedColor = document.getElementById('colors');
        const selectedQuantity = document.getElementById('quantity');
        const imageProduct = document.querySelector(".item__img > img");
        const imageSrc = imageProduct.src;
        const imageAlt = imageProduct.alt;
        const urlParams = new URLSearchParams(document.location.search);
        const getId = urlParams.get('id');

        const productFound = cart.find((product) => product.id === getId && product.color === selectedColor.value);
        console.log(productFound);
        if (productFound) {
            for (product of cart) {
                console.log(product.quantity);
                if (product.id === getId && product.color === selectedColor.value) {
                    console.log('trouvé');
                    console.log(product)
                    product.quantity = +product.quantity + +selectedQuantity.value;
                    console.log(product);
                    window.alert("La quantité de votre panier à été modifée");
                }
            }
        } else {
            const productValues = {
                'name': productName,
                'image': imageSrc,
                'alt': imageAlt,
                'price': productPrice,
                'id': getId,
                'color': selectedColor.value,
                'quantity': +selectedQuantity.value,
            };
            cart.push(productValues);
            console.table(cart);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.alert("Produit ajouté au panier");
    }
    )
};











