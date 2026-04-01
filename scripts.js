const CART_KEY = 'hajis_cart_data';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(itemIndex) {
  ensureMenuItemsReady();
  const menuItems = window.hajisMenuItems;
  if (!menuItems || !menuItems[itemIndex]) {
    console.error('hajis: addToCart called with invalid itemIndex:', itemIndex, 'menuItems:', menuItems);
    alert('Unable to add item. Please open Menu page again and try.');
    if (window.location.pathname.split('/').pop() !== 'menu.html') {
      window.location.href = 'menu.html';
    }
    return;
  }

  const item = menuItems[itemIndex];
  const cart = getCart();
  const existing = cart.find((it) => it.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: item.name, price: item.price, quantity: 1 });
  }

  saveCart(cart);
  updateCartLink();
  alert(`${item.name} added to cart. Total items: ${cart.reduce((sum, x) => sum + x.quantity, 0)}`);
}

function removeFromCart(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

function updateCartQuantity(index, value) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  const qty = parseInt(value, 10);
  if (isNaN(qty) || qty <= 0) return;
  cart[index].quantity = qty;
  saveCart(cart);
  renderCart();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function updateCartLink() {
  const orderLink = document.querySelector('.nav-links a[href="order.html"]');
  if (!orderLink) return;
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  let badge = orderLink.querySelector('.cart-badge');
  if (count <= 0) {
    if (badge) {
      badge.remove();
    }
    return;
  }
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-badge';
    badge.style.marginLeft = '6px';
    badge.style.color = 'var(--gold)';
    badge.style.fontWeight = '700';
    orderLink.appendChild(badge);
  }
  badge.textContent = `(${count})`;
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  const cartTable = document.getElementById('cart-table-body');
  const cartTotal = document.getElementById('cart-total');
  const emptyCart = document.getElementById('empty-cart');

  if (!cartContainer || !cartTable || !cartTotal || !emptyCart) return;

  const cart = getCart();
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
    cartContainer.style.display = 'none';
    return;
  }

  emptyCart.style.display = 'none';
  cartContainer.style.display = 'block';
  cartTable.innerHTML = '';

  cart.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${idx}, this.value)"></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="btn btn-outline-gold" onclick="removeFromCart(${idx})">Remove</button></td>
    `;
    cartTable.appendChild(tr);
  });

  cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
  updateCartLink();
}

function processOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Your cart is empty. Please add something from the menu.');
    return;
  }

  const name = document.getElementById('customer-name')?.value?.trim();
  const phone = document.getElementById('customer-phone')?.value?.trim();
  const address = document.getElementById('customer-address')?.value?.trim();
  if (!name || !phone || !address) {
    alert('Please fill in your delivery details.');
    return;
  }

  const paymentMethod = document.querySelector('.payment-btn.active')?.textContent?.trim() || 'Cash on Delivery';
  if (paymentMethod === 'Card Payment') {
    const cardNumber = document.getElementById('card-number')?.value?.trim();
    const cardExpiry = document.getElementById('card-expiry')?.value?.trim();
    const cardCvv = document.getElementById('card-cvv')?.value?.trim();

    if (!cardNumber || !cardExpiry || !cardCvv) {
      alert('Please enter your card details.');
      return;
    }
  }

  const total = getCartTotal().toFixed(2);
  alert(`Order placed successfully! Total $${total}. Payment method: ${paymentMethod}.`);
  clearCart();
  document.getElementById('order-form')?.reset();
}

function initializePaymentButtons() {
  const cashBtn = document.getElementById('payment-cash');
  const cardBtn = document.getElementById('payment-card');
  if (!cashBtn || !cardBtn) return;

  cashBtn.addEventListener('click', () => {
    cashBtn.classList.add('active');
    cardBtn.classList.remove('active');
    document.getElementById('card-details').style.display = 'none';
  });

  cardBtn.addEventListener('click', () => {
    cardBtn.classList.add('active');
    cashBtn.classList.remove('active');
    document.getElementById('card-details').style.display = 'block';
  });
}

function initMenuItemsGlobal(menuItems) {
  try {
    window.hajisMenuItems = Array.isArray(menuItems) ? menuItems : [];
    localStorage.setItem('hajis_menu_items', JSON.stringify(window.hajisMenuItems));
  } catch (e) {
    console.warn('hajis: could not persist menu items to localStorage', e);
    window.hajisMenuItems = Array.isArray(menuItems) ? menuItems : [];
  }
}

function ensureMenuItemsReady() {
  if (window.hajisMenuItems && window.hajisMenuItems.length) return;
  const savedText = localStorage.getItem('hajis_menu_items');
  if (savedText) {
    try {
      const saved = JSON.parse(savedText);
      if (Array.isArray(saved)) {
        window.hajisMenuItems = saved;
      }
    } catch (e) {
      console.error('hajis: failed to parse stored menu items', e);
      localStorage.removeItem('hajis_menu_items');
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.getElementById('mob-menu');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
    navMobile.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navMobile.classList.remove('open'));
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((a) => {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  if (document.querySelector('#cart-table-body')) {
    renderCart();
  }

  updateCartLink();
  initializePaymentButtons();

  // Debug helper: show if this page expected menu grid but none exists
  if (window.location.pathname.split('/').pop() === 'menu.html' && !document.getElementById('menu-grid')) {
    console.error('hajis: menu-grid element is missing in menu.html, check your HTML structure');
  }

  window.processOrder = processOrder;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQuantity = updateCartQuantity;
  window.clearCart = clearCart;
  window.renderCart = renderCart;
});
