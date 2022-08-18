
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

// function addProduct(product) {
//   const items = document.getElementById('items');
//   items.innerHTML += `<a href="./product.html?id=${product._id}">
// <article>
// <img src="${product.imageUrl}" alt="${product.altTxt}">
// <h3 class="productName">${product.name}</h3>
// <p class="productDescription">${product.description}.</p>
// </article>
// </a>`;
// }

// ----- Add product list on index.html from API ----- //

function addProduct(product) {
  // create element in const
  const items = document.getElementById('items');
  const a = document.createElement('a');
  const article = document.createElement('article');
  const img = document.createElement('img');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');

  // add attribute in tags
  a.textContent = '';
  a.href = `./product.html?id=${product._id}`;

  img.src = product.imageUrl;
  img.alt = product.altTxt;

  h3.className = 'productName';
  h3.textContent = product.name;

  p.className = 'productDescription';
  p.textContent = product.description;

  // add tags in DOM
  article.append(img);
  article.append(h3);
  article.append(p);
  a.append(article);
  items.append(a);
}

initProduct();







