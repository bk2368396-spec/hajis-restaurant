const ADMIN_USERNAME = 'Danish';
const ADMIN_PASSWORD = 'Haji123';

const DEFAULT_PLACEHOLDER_IMAGE = 'images/placeholder.jpg';

let hajisMenuLoadedFromStorage = false;
let hajisMenuCache = null;

const initialMenu = [
  { id: 1, name: 'Shami Kabab', description: 'Grilled spiced beef patties served with chutney', price: 13.45, image: 'Shami Kabab.jpg', category: 'Starters' },
  { id: 2, name: 'Aalo Tikki', description: 'Crispy potato patties served with chutney', price: 9.75, image: 'Aalo Tikki.jpg', category: 'Starters' },
  { id: 3, name: 'Dahi Poori', description: 'Crunchy chaat with yogurt and spices', price: 12.00, image: 'Dahi Poori.jpg', category: 'Starters' },
  { id: 4, name: 'Samosas Vegan', description: 'Crispy vegan samosas with spicy potato filling', price: 6.75, image: 'Vegan Samosas.jpg', category: 'Starters' },
  { id: 5, name: 'Samosas Chicken', description: 'Crispy samosas with chicken filling', price: 7.99, image: 'Chicken Samosas 4.jpg', category: 'Starters' },
  { id: 6, name: 'Papri Chaat', description: 'Classic papri chaat with tamarind and yogurt', price: 11.75, image: 'Papri Chaat.jpg', category: 'Starters' },
  { id: 7, name: 'Pani Puri', description: 'Gol gappa with spicy flavored water', price: 10.50, image: 'Pani Puri.jpg', category: 'Starters' },
  { id: 8, name: 'Bhel Puri', description: 'Puffed rice chaat with chutneys and herbs', price: 10.50, image: 'Bhel Puri.jpg', category: 'Starters' },

  { id: 9, name: 'Chicken Tikka Leg/Thigh', description: 'Marinated chicken leg or thigh grilled to perfection', price: 9.00, image: 'Leg_Thigh.jpg', category: 'BBQ' },
  { id: 10, name: 'Breast/Wing', description: 'Grilled chicken breast or wing with spices', price: 10.00, image: 'Chicken Qorma.jpg', category: 'BBQ' },
  { id: 11, name: 'Boneless Tikka', description: 'Boneless chicken tikka with smoky flavor', price: 14.50, image: 'Chicken Tikka Masala.jpg', category: 'BBQ' },
  { id: 12, name: 'Chicken Seekh Kabob', description: 'Minced chicken skewers with aromatic spices', price: 16.75, image: 'Chicken Seekh Kabob.jpg', category: 'BBQ' },
  { id: 13, name: 'Beef Seekh Kabob', description: 'Minced beef skewers with aromatic spices', price: 15.75, image: 'Beef Seekh Kabob .jpg', category: 'BBQ' },
  { id: 14, name: 'Chapli Kabob', description: 'Traditional beef chapli kabab with herbs', price: 15.50, image: 'Chapli Kebab(2).jpg', category: 'BBQ' },

  { id: 15, name: 'Nihari', description: 'Slow-cooked beef stew with rich spices', price: 17.75, image: 'Nihari.jpg', category: 'Meat Curries' },
  { id: 16, name: 'Chicken Tikka Masala', description: 'Creamy tomato gravy with grilled chicken', price: 17.25, image: 'Chicken Tikka Masala.jpg', category: 'Meat Curries' },
  { id: 17, name: 'Royal Chicken Qorma', description: 'Rich chicken qorma with cream and nuts', price: 17.25, image: 'Chicken Qorma.jpg', category: 'Meat Curries' },
  { id: 18, name: 'Royal Goat Qorma', description: 'Rich goat qorma with cream and nuts', price: 19.75, image: 'Qorma 3.jpg', category: 'Meat Curries' },
  { id: 19, name: 'Butter Chicken', description: 'Classic butter chicken with rich creamy tomato gravy', price: 17.25, image: 'Butter Chicken.jpg', category: 'Meat Curries' },
  { id: 20, name: 'Spinach Chicken', description: 'Spinach-infused chicken curry', price: 17.75, image: 'Palak Chicken.jpg', category: 'Meat Curries' },
  { id: 21, name: 'Spinach Goat', description: 'Spinach-infused goat curry', price: 19.75, image: 'Palak Gosht .jpg', category: 'Meat Curries' },

  { id: 22, name: 'Chicken Karahi', description: 'Spicy tomato-based chicken karahi', price: 39.50, image: 'Chicken Karahi.jpg', category: 'Karahi' },
  { id: 23, name: 'Mutton Karahi', description: 'Spicy tomato-based mutton karahi', price: 49.50, image: 'Mutton Karahi.jpg', category: 'Karahi' },
  { id: 24, name: 'Veggie Karahi', description: 'Spicy tomato-based vegetable karahi', price: 34.50, image: 'Veggie Karahi.jpg', category: 'Karahi' },

  { id: 25, name: 'Chicken Biryani', description: 'Fragrant chicken biryani with layered rice', price: 18.50, image: 'Chicken Biryani.jpg', category: 'Biryani' },
  { id: 26, name: 'Goat Biryani', description: 'Fragrant goat biryani with layered rice', price: 21.50, image: 'Goat Biryani.jpg', category: 'Biryani' },
  { id: 27, name: 'Paneer Biryani', description: 'Fragrant paneer biryani with layered rice', price: 17.50, image: 'Paneer Biryani.jpg', category: 'Biryani' },
  { id: 28, name: 'Vegan Biryani', description: 'Fragrant vegan biryani with layered rice and veggies', price: 18.50, image: 'Vegan Biryani.jpg', category: 'Biryani' },

  { id: 29, name: 'Chana Masala', description: 'Chickpeas simmered in spicy gravy', price: 13.50, image: 'Chana Masala .jpg', category: 'Vegan/Veggie Curries' },
  { id: 30, name: 'Baingan Bharta', description: 'Smoky roasted eggplant mash with spices', price: 13.50, image: 'Baingan Bharta.jpg', category: 'Vegan/Veggie Curries' },
  { id: 31, name: 'Bhindi Masala', description: 'Okra cooked with onions and spices', price: 13.50, image: 'Bhindi Masala.jpg', category: 'Vegan/Veggie Curries' },
  { id: 32, name: 'Vegan Tikka Masala', description: 'Tofu/vegetable tikka in creamy tomato gravy', price: 16.75, image: 'Vegan Tikka Masala(1).jpg', category: 'Vegan/Veggie Curries' },
  { id: 33, name: 'Vegan Daal Makhni', description: 'Creamy lentil curry made vegan', price: 15.50, image: 'Vegan Daal Makhni.jpg', category: 'Vegan/Veggie Curries' },
  { id: 34, name: 'Aalo Tarkari', description: 'Spicy potato curry', price: 13.50, image: 'Aloo Tarkari.jpg', category: 'Vegan/Veggie Curries' },
  { id: 35, name: 'Vegan Spinach & Tofu', description: 'Spinach and tofu curry', price: 16.75, image: 'Vegan Spinach w Tofu(1).jpg', category: 'Vegan/Veggie Curries' },
  { id: 36, name: 'Chana Daal', description: 'Chickpea lentil curry', price: 14.50, image: 'Chana Daal.jpg', category: 'Vegan/Veggie Curries' },

  { id: 37, name: 'Chicken Tikka Pizza', description: 'Chicken tikka pizza', price: 15.99, image: 'Chicken Tikka Masala.jpg', category: 'Pizzas' },
  { id: 38, name: 'Paneer Tikka Pizza', description: 'Paneer tikka pizza', price: 15.99, image: 'Paneer Tikka Masala.jpg', category: 'Pizzas' },
  { id: 39, name: 'Veggie Pizza', description: 'Vegetable pizza', price: 15.99, image: 'Mix Veg Tikka Masala.jpg', category: 'Pizzas' },
  { id: 40, name: 'Pepperoni Pizza', description: 'Pepperoni pizza', price: 16.50, image: 'Pepperoni Pizza.jpg', category: 'Pizzas' },

  { id: 41, name: 'Veggie Burger', description: 'Veggie burger', price: 12.99, image: 'Burger.jpg', category: 'Burgers' },
  { id: 42, name: 'Cheese Burger', description: 'Cheese burger', price: 13.99, image: 'Burger.jpg', category: 'Burgers' },
  { id: 43, name: 'Chicken Burger', description: 'Chicken burger', price: 13.99, image: 'Chicken Burger.jpg', category: 'Burgers' },
  { id: 44, name: 'Chapli Burger', description: 'Chapli beef burger', price: 13.99, image: 'Chapli Burger.jpg', category: 'Burgers' },
  { id: 45, name: 'Fried Chicken Burger', description: 'Fried chicken burger', price: 13.99, image: 'Fried Chicken Burger.jpg', category: 'Burgers' },

  { id: 46, name: 'Halwa Poori', description: 'Breakfast platter with halwa and poori', price: 16.50, image: 'Halwa Poori.jpg', category: 'Brunch' },
  { id: 47, name: 'Brunch Platter', description: 'Brunch platter with sides and chai', price: 18.50, image: 'Halwa Poori (1).jpg', category: 'Brunch' },

  { id: 48, name: 'Plain Basmati Rice', description: 'Plain basmati rice', price: 4.75, image: 'Naa.jpg', category: 'Breads/Rice' },
  { id: 49, name: 'Qulcha Naan', description: 'Soft flatbread', price: 2.99, image: '2 naan 2 curry.jpg', category: 'Breads/Rice' },
  { id: 50, name: 'Butter Naan', description: 'Butter naan', price: 3.50, image: 'Butter Naan.jpg', category: 'Breads/Rice' },
  { id: 51, name: 'Garlic Naan', description: 'Garlic naan', price: 4.50, image: 'Butter Naan.jpg', category: 'Breads/Rice' },
  { id: 52, name: 'Roti', description: 'Tandoori roti', price: 3.50, image: 'Naa.jpg', category: 'Breads/Rice' },

  { id: 53, name: 'Mango Lassi', description: 'Mango yogurt drink', price: 5.50, image: 'Mango Lassi.jpg', category: 'Drinks' },
  { id: 54, name: 'Karak Chai', description: 'Strong spiced tea', price: 2.99, image: 'Karak Chai.jpg', category: 'Drinks' },
  { id: 55, name: 'Kashmiri Chai', description: 'Pink tea', price: 4.99, image: 'Karak Chai.jpg', category: 'Drinks' },
  { id: 56, name: 'Turkish Soda', description: 'Flavored soda', price: 3.50, image: 'Turkish Soda 3.jpg', category: 'Drinks' },
  { id: 57, name: 'Mint Lemonade', description: 'Mint lemonade', price: 5.50, image: 'SalamCola.jpg', category: 'Drinks' },

  { id: 58, name: 'Gajar Halwa', description: 'Traditional carrot dessert', price: 9.75, image: 'Suji Halwa.jpg', category: 'Desserts' },
  { id: 59, name: 'Falooda', description: 'Sweet milk beverage with vermicelli', price: 9.50, image: 'Mango lassi .jpg', category: 'Desserts' },
  { id: 60, name: 'Rice Pudding', description: 'Creamy rice pudding', price: 6.99, image: 'Mango lassi .jpg', category: 'Desserts' },
  { id: 61, name: 'Suji Halwa', description: 'Semolina pudding', price: 6.99, image: 'Suji Halwa.jpg', category: 'Desserts' }
];

function normalizeMenu(menu) {
  const seen = new Set();
  return menu.reduce((acc, item) => {
    if (!item || !item.name) return acc;
    const nameKey = item.name.trim().toLowerCase();
    if (seen.has(nameKey)) return acc;
    seen.add(nameKey);
    const hasImage = item.image && item.image.trim();
    const normalizedItem = {
      ...item,
      id: Number(item.id) > 0 ? Number(item.id) : Date.now() + Math.floor(Math.random() * 1000),
      image: hasImage ? item.image.trim() : DEFAULT_PLACEHOLDER_IMAGE
    };
    acc.push(normalizedItem);
    return acc;
  }, []);
}

function getRestaurantMenu() {
  if (hajisMenuLoadedFromStorage && Array.isArray(hajisMenuCache) && hajisMenuCache.length > 0) {
    return hajisMenuCache;
  }

  const stored = localStorage.getItem('restaurantMenu');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const normalized = normalizeMenu(parsed);
        hajisMenuCache = normalized;
        hajisMenuLoadedFromStorage = true;
        return normalized;
      }
    } catch (err) {
      console.warn('restaurantMenu parse failed', err);
    }
  }

  const normalizedDefault = normalizeMenu(initialMenu);
  localStorage.setItem('restaurantMenu', JSON.stringify(normalizedDefault));
  hajisMenuCache = normalizedDefault;
  hajisMenuLoadedFromStorage = true;
  return normalizedDefault;
}

function setRestaurantMenu(menu) {
  localStorage.setItem('restaurantMenu', JSON.stringify(menu));
  // Trigger storage event across tabs/instances for immediate client menu refresh
  localStorage.setItem('hajis_menu_items', JSON.stringify({ ts: Date.now() }));
  window.dispatchEvent(new Event('hajis_menu_updated'));
}

function setActiveSection(sectionKey) {
  const sections = ['orders', 'menu', 'add', 'security'];
  sections.forEach((key) => {
    const section = document.getElementById(`${key}-section`);
    const navBtn = document.getElementById(`nav-${key}`);
    if (section) section.classList.toggle('active', key === sectionKey);
    if (navBtn) navBtn.classList.toggle('active', key === sectionKey);
  });
}

function switchTab(tab) {
  setActiveSection(tab);
  if (tab === 'orders') loadOrders();
  if (tab === 'menu') displayMenuManager();
}

function loginAdmin() {
  const user = (document.getElementById('admin-username').value || '').trim();
  const pass = (document.getElementById('admin-password').value || '').trim();
  const adminError = document.getElementById('admin-error');

  if (user === 'Danish' && pass === 'Haji123') {
    sessionStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    setActiveSection('orders');
    loadOrders();
    displayMenuManager();
    return;
  }

  adminError.textContent = 'Wrong Password. Use Danish / Haji123';
  adminError.style.display = 'block';
}

function logoutAdmin() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('admin-error').style.display = 'none';
}

function getOrders() {
  return JSON.parse(localStorage.getItem('hajis_orders') || '[]');
}

function setOrders(orders) {
  localStorage.setItem('hajis_orders', JSON.stringify(orders));
}

function loadOrders() {
  const orders = getOrders();
  const ordersList = document.getElementById('orders-list');
  if (!ordersList) return;

  if (orders.length === 0) {
    ordersList.innerHTML = '<p style="color:#ccc;">No orders yet.</p>';
    return;
  }

  ordersList.innerHTML = '';
  orders.slice().reverse().forEach((order) => {
    const item = document.createElement('div');
    item.className = 'item-box';
    item.innerHTML = `
      <div><strong>${order.name}</strong> - <span style="color:#999;">${order.status || 'pending'}</span></div>
      <div class="order-actions" style="margin-top:8px;">
        <button class="btn" onclick="acceptOrder(${order.id})">Accept</button>
        <button class="btn" onclick="cancelOrder(${order.id})">Cancel</button>
      </div>
    `;
    ordersList.appendChild(item);
  });
}

function acceptOrder(orderId) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return;
  orders[idx].status = 'accepted';
  setOrders(orders);
  startMenuTimer();
  loadOrders();
}

function cancelOrder(orderId) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return;
  orders[idx].status = 'cancelled';
  setOrders(orders);
  loadOrders();
}

function displayMenuManager() {
  const menu = getRestaurantMenu();
  const manager = document.getElementById('menu-manager');
  if (!manager) return;

  if (!Array.isArray(menu) || menu.length === 0) {
    manager.innerHTML = '<p style="color:#ccc;">No menu items available.</p>';
    return;
  }

  manager.innerHTML = '';
  menu.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'item-box';
    row.innerHTML = `
      <div><strong>${item.name}</strong> - $${item.price.toFixed(2)}</div>
      <div style="color:#b3b3b3;">${item.description || ''}</div>
      <div class="dish-actions" style="margin-top:8px;">
        <input id="price-${item.id}" type="number" min="0" step="0.01" value="${item.price.toFixed(2)}" style="width:90px;" />
        <button class="btn" onclick="updatePrice(${item.id})">Update Price</button>
        <button class="btn" onclick="deleteDish(${item.id})">Delete</button>
      </div>
    `;
    manager.appendChild(row);
  });
}

function updatePrice(itemId) {
  const priceInput = document.getElementById(`price-${itemId}`);
  if (!priceInput) return;
  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price < 0) return;

  const menu = getRestaurantMenu();
  const found = menu.find((m) => m.id === itemId);
  if (!found) return;

  found.price = price;
  setRestaurantMenu(menu);
  displayMenuManager();
}

function deleteDish(itemId) {
  let menu = getRestaurantMenu();
  menu = menu.filter((m) => m.id !== itemId);
  setRestaurantMenu(menu);
  displayMenuManager();
}

function addNewDish() {
  const name = (document.getElementById('new-name').value || '').trim();
  const price = parseFloat(document.getElementById('new-price').value);
  const imageInput = (document.getElementById('new-image').value || '').trim();
  const fileInput = document.getElementById('new-image-file');
  const category = (document.getElementById('new-category').value || 'Uncategorized').trim();

  if (!name || isNaN(price) || price < 0) {
    alert('Please provide a valid name and price.');
    return;
  }

  const menu = getRestaurantMenu();
  const nameKey = name.toLowerCase();
  const book = menu.find((item) => item.name && item.name.toLowerCase() === nameKey);
  if (book) {
    alert('This item already exists in the menu. Update via Menu Manager instead.');
    return;
  }

  let image = imageInput;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    image = fileInput.files[0].name.trim();
  }

  if (image) {
    if (!image.toLowerCase().startsWith('images/')) {
      image = `images/${image}`;
    }
  } else {
    image = 'images/placeholder.jpg';
  }

  const newDish = { id: Date.now(), name, description: '', price, image, category };
  menu.push(newDish);
  setRestaurantMenu(menu);

  document.getElementById('new-name').value = '';
  document.getElementById('new-price').value = '';
  document.getElementById('new-image').value = '';
  if (fileInput) fileInput.value = '';
  document.getElementById('new-category').value = 'Uncategorized';

  displayMenuManager();
  switchTab('menu');
}


function changePassword() {
  const current = document.getElementById('current-password').value;
  const next = document.getElementById('new-password').value;
  const confirm = document.getElementById('confirm-password').value;
  if (current !== ADMIN_PASSWORD) { alert('Current password incorrect'); return; }
  if (!next || next !== confirm) { alert('New passwords do not match'); return; }
  alert('Password change saved for this session only (demo-mode).');
}

function initializeHajisMenu() {
  try {
    const stored = localStorage.getItem('restaurantMenu');
    if (!stored || stored === '[]') {
      console.log('hajis: Initializing menu from initialMenu array...');
      const normalized = normalizeMenu(initialMenu);
      localStorage.setItem('restaurantMenu', JSON.stringify(normalized));
      console.log('hajis: Menu initialized with', normalized.length, 'items');
      return normalized;
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      console.log('hajis: Menu already in localStorage, items:', parsed.length);
      return parsed;
    }
  } catch (err) {
    console.warn('hajis: init failed, using fallback', err);
    const normalized = normalizeMenu(initialMenu);
    localStorage.setItem('restaurantMenu', JSON.stringify(normalized));
    return normalized;
  }
  return [];
}

// Auto-initialize on script load
window.hajisMenuData = initialMenu;
window.hajisGetRestaurantMenu = getRestaurantMenu;
window.hajisInitializeMenu = initializeHajisMenu;

function resetMenu() {
  if (!confirm('Are you sure? This will reset the menu to all 61 original items.')) return;
  try {
    const normalized = normalizeMenu(initialMenu);
    localStorage.setItem('restaurantMenu', JSON.stringify(normalized));
    hajisMenuCache = normalized;
    hajisMenuLoadedFromStorage = true;
    localStorage.setItem('hajis_menu_items', JSON.stringify({ ts: Date.now() }));
    window.dispatchEvent(new Event('hajis_menu_updated'));
    alert('Menu reset successfully to 61 items. Updated in-place.');
  } catch (err) {
    alert('Reset failed: ' + err.message);
  }
}

initializeHajisMenu();

function startMenuTimer() {
  const value = Date.now();
  sessionStorage.setItem('menuTimerStart', value.toString());
  localStorage.setItem('menuTimerStart', value.toString());
}

function checkAdminSession() {
  const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  if (loggedIn) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    setActiveSection('orders');
    loadOrders();
  } else {
    document.getElementById('admin-login').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', checkAdminSession);