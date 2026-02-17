let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");

// Right-side price elements
const itemCountEl = document.getElementById("item-count");
const priceTotalEl = document.getElementById("price-total");
const discountEl = document.getElementById("discount");
const finalTotalEl = document.getElementById("final-total");
const savingsEl = document.getElementById("savings");

function renderCart() {
  cartItemsDiv.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    itemCountEl.innerText = "0";
    priceTotalEl.innerText = "0";
    discountEl.innerText = "0";
    finalTotalEl.innerText = "0";
    savingsEl.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    itemCount += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <div class="qty-controls">
            <button onclick="updateQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateQty(${index}, 1)">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">
            REMOVE
          </button>
        </div>
      </div>
    `;
  });

  // 🔢 Calculations (Flipkart-like)
  const discount = Math.floor(total * 0.3); // 30% discount
  const platformFee = 7;
  const finalTotal = total - discount + platformFee;

  // 🧾 Update UI
  itemCountEl.innerText = itemCount;
  priceTotalEl.innerText = total;
  discountEl.innerText = discount;
  finalTotalEl.innerText = finalTotal;
  savingsEl.innerText = discount;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

renderCart();
