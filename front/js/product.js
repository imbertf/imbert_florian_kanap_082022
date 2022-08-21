// ----- get URL -----//

// get product.id in URL

function getUrlId() {
    const urlParams = new URLSearchParams(document.location.search);
    const getId = urlParams.get('id');
    console.log(getId);

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

    createImg.setAttribute('src', product.imageUrl);
    createImg.setAttribute('alt', product.altTxt);

    productName.textContent = product.name;
    productPrice.textContent = product.price;
    itemDescription.textContent = product.description;

    for (const colors of productColors) {
        colorChoice.insertAdjacentHTML('afterbegin', `<option value=${colors}>${colors}</option>`);
    }
}

// ----- add product in basket ----- //

// const basket = [product.id, ];