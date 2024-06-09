let product = [];
let categories = [];
const nodataimage = "C:\Users\BELAL IRSHAD\Documents\Belal\add to cart\add to cart\image\nodata.png"
async function getProduct() {
  let data = await fetch("http://localhost:3000/api/products");

  data = await data.json();

  product = [...data];
  categories = [
    ...new Set(
      product.map((item) => {
        return item;
      })
    ),
  ];
  let i = 0;
  let searchQuery = document
    .getElementById("search2")
    .value.trim()
    .toLowerCase();
 
  let filteredProducts = categories.filter((product) => {
    // Filter products based on title containing the search query
    if(searchQuery.length >= 3) {
      return product.title.toLowerCase().includes(searchQuery);

    }
    return product.title.toLowerCase()
  });
 
 
  document.getElementById("root").innerHTML = filteredProducts.length ? filteredProducts
    .map((item) => {
      var { images, title, price } = item;
      images = images[0];
      return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${images}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>` +
        "<button onclick='addtocart(" +
        i++ +
        ")'>Add to cart</button>" +
        `</div>
        </div>`
      );
    })
    .join(""):`<div class="no-data"></div>`;
  
}

document.getElementById("search2").addEventListener("input", getProduct);

var cart = [];
getProduct();

function addtocart(a) {
  const product = categories[a];
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  displaycart();
}
function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0,
    total = 0;
  document.getElementById("count").innerHTML = cart.length;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ " + 0 + ".00";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items) => {
        var { images, title, price, quantity } = items;
        total = total + price * quantity;
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
        return (
          `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${images}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00 x ${quantity}</h2>` +
          "<i class='fa-solid fa-trash' onclick='delElement(" +
          j++ +
          ")'></i></div>"
        );
      })
      .join("");
  }
}
