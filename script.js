// function addToCart(name, price, image) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const index = cart.findIndex(item => item.name === name);

//   if (index > -1) {
//     cart[index].qty += 1;
//   } else {
//     cart.push({ name, price, image, qty: 1 });
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));
//   updateCartCount();
// }

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.name === name);

  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  updateMiniCart();
  showToast();

  const button = event.target;
  const productCard = button.closest(".product-card");
  const productImg = productCard.querySelector("img");

  flyToCart(image, productImg);
}


// function updateCartCount() {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let count = cart.reduce((sum, item) => sum + item.qty, 0);
//   document.getElementById("cart-count").innerText = count;
// }

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-count");
  badge.innerText = count;

  // Animate when updated
  badge.classList.remove("animate");
  void badge.offsetWidth; // restart animation
  badge.classList.add("animate");
}


function goLogin() {
  window.location.href = "login.html";
}

function goSignup() {
  window.location.href = "signup.html";
}

updateCartCount();


// function searchProducts() {
//   const query = document.getElementById("search-input").value.toLowerCase();
//   const products = document.querySelectorAll(".product-card");

//   products.forEach(product => {
//     const name = product.querySelector("h3").innerText.toLowerCase();
//     product.style.display = name.includes(query) ? "block" : "none";
//   });
// }

function searchProducts() {
  const query = document.getElementById("search-input").value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

// STAR RATING RENDER
document.querySelectorAll(".stars").forEach(star => {
  const rating = star.getAttribute("data-rating");
  star.style.setProperty("--rating-width", `${(rating / 5) * 100}%`);
});

const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  document.querySelector(".auth").innerHTML = `
    <span style="color:white;">Hello, ${user.email}</span>
    <button onclick="logout()">Logout</button>
  `;
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function toggleMiniCart() {
  document.getElementById("mini-cart").classList.toggle("active");
}
function updateMiniCart() {
  const miniCart = document.getElementById("mini-cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  miniCart.innerHTML = "";

  cart.forEach(item => {
    miniCart.innerHTML += `
      <div class="mini-cart-item">
        <img src="${item.image}">
        <div>
          <h5>${item.name}</h5>
          <p>₹${item.price} × ${item.qty}</p>
        </div>
      </div>
    `;
  });
}
function showToast() {
  const toast = document.getElementById("cart-toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
function flyToCart(imgSrc, startElement) {
  const cartIcon = document.querySelector(".cart");

  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "flying-img";
  document.body.appendChild(img);

  const startRect = startElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  img.style.left = startRect.left + "px";
  img.style.top = startRect.top + "px";

  setTimeout(() => {
    img.style.left = cartRect.left + "px";
    img.style.top = cartRect.top + "px";
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.opacity = "0.5";
  }, 10);

  setTimeout(() => {
    img.remove();
  }, 800);
}


