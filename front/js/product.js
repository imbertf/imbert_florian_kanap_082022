// ----- get URL -----//

// get product.id in URL
function getUrlId() {
    const str = "http://127.0.0.1:5500/front/html/product.html?id=034707184e8e4eefb46400b5a3774b5f";
    const url = new URL(str);
    const search_params = new URLSearchParams(url.search);
    if (search_params.has('id')) {
        const id = search_params.get('id');
        console.log(id)
    }
};

getUrlId();

// ----- add product by id in DOM ----- //

function fetchProduct() {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then((data) => data.id(product => addProduct(product)))
        .catch((error) => {
            console.log("Le produit est inaccessible");
          });
};

function addProduct(product) {
    const itemImg = document.querySelector('.items__img');
    itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  }

fetchProduct();
