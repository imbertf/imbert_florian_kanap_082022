// get product.id in URL
function getUrlId() {
    const urlParams = new URLSearchParams(document.location.search);
    const getId = urlParams.get('id');
    // console.log(getId);

    // request API with specific ID of the selected product 
    fetch("http://localhost:3000/api/products/" + getId)
        .then((response) => response.json())
        .then((product) => addProduct(product))
        .catch((error) => {
            console.log("Page product inaccessible");
        });
};


getUrlId();

// Add product selected by URL Id in DOM
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

    // start loop to display color option to customer 
    for (const colors of productColors) {
        const option = document.createElement('option');
        option.value = colors;
        option.textContent = colors;
        colorChoice.append(option);
    }
    // call the function to add this product in cart 
    addProductInCart();
};

// Get cart from localStorage or create new cart if no cart has been found
function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
};

// Add product in cart using "Ajouter au panier" button
function addProductInCart() {
    // prevent input negative value 
    const selectedQuantity = document.getElementById('quantity');
    selectedQuantity.addEventListener('change', (event) => {
        // console.log(event);
        if (event.target.value < 0) {
            selectedQuantity.value = 0;
        }
    });

    // listen event on "add to cart" button 
    document.getElementById('addToCart').addEventListener('click', () => {
        const cart = getCart();
        const selectedColor = document.getElementById('colors');
        const urlParams = new URLSearchParams(document.location.search);
        const getId = urlParams.get('id');

        // prevent adding function if quantity or color are not selected 
        if (selectedColor.value === "") {
            alert("Veuillez sélectionner une couleur.");
            return;
        } else if (selectedQuantity.value > 100  || selectedQuantity.value === '0') {
            alert("Veuillez sélectionner une quantité comprise entre 1 et 100.")
            return;
        }

        // find if product is present in cart 
        const productFound = cart.find((product) => product.id === getId && product.color === selectedColor.value);
        // console.log(productFound);

        // update quantity if same product already in cart 
        if (productFound) {
            for (product of cart) {
                // console.log(product.quantity);
                if (product.id === getId && product.color === selectedColor.value) {
                    console.log('trouvé');
                    // console.log(product)
                    product.quantity = +product.quantity + +selectedQuantity.value;
                    // console.log(product);
                    window.alert("La quantité de votre panier à été modifée");
                }
            }
            // add product in cart if no product has been found 
        } else {
            const productValues = {
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