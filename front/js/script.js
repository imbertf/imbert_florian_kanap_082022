
//----- API request -----//

// return json format when API answered
// show informations products array from API
// return error message if API request failed
function initProduct() {
  const url = "http://localhost:3000/api/products";
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.forEach(product => addProduct(product)))
    .catch((error) => {
      console.log("Page product inaccessible");
    });
}

// ----- Add product list on index.html from API ----- //

// Create product card in DOM 
function addProduct(product) {
  // Get and create tags for product card
  const items = document.getElementById('items');
  const a = document.createElement('a');
  const article = document.createElement('article');
  const img = document.createElement('img');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  // add attributes in tags
  a.textContent = '';
  a.href = `./product.html?id=${product._id}`;

  img.src = product.imageUrl;
  img.alt = product.altTxt;

  h3.className = 'productName';
  h3.textContent = product.name;

  p.className = 'productDescription';
  p.textContent = product.description;

  // add tags in DOM
  article.append(img, h3, p);
  a.appendChild(article);
  items.appendChild(a);
}

initProduct();







