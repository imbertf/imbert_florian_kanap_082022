// get order id from URL
// add order id in DOM
// remove all item from cart
function confirmation() {
    const orderId = document.querySelector("#orderId");
    const orderIdUrl = new URL(location.href).searchParams.get("orderid");
    orderId.textContent = orderIdUrl;
  
    // Suppression des produits du localStorage et du panier lorsque la commande est passée
    localStorage.removeItem("cart");
  }
  
  confirmation()