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
  if (!Array.isArray(menu)) return;
  hajisMenuCache = menu;
  hajisMenuLoadedFromStorage = true;
  localStorage.setItem('restaurantMenu', JSON.stringify(menu));
  // Trigger storage event across tabs/instances for immediate client menu refresh
  localStorage.setItem('hajis_menu_items', JSON.stringify({ ts: Date.now() }));
  window.dispatchEvent(new Event('hajis_menu_updated'));
}

function setActiveSection(sectionKey) {
  const sections = ['orders', 'completed', 'menu', 'add', 'feedback', 'help', 'security'];
  sections.forEach((key) => {
    const section = document.getElementById(`${key}-section`);
    const navBtn = document.getElementById(`nav-${key}`);
    if (section) section.classList.toggle('active', key === sectionKey);
    if (navBtn) navBtn.classList.toggle('active', key === sectionKey);
  });
}

let helpRefreshTimer = null;

function startHelpAutoRefresh() {
  stopHelpAutoRefresh();
  helpRefreshTimer = setInterval(renderHelpMessages, 2000);
}

function stopHelpAutoRefresh() {
  if (helpRefreshTimer) {
    clearInterval(helpRefreshTimer);
    helpRefreshTimer = null;
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function updateHelpBadge() {
  const helpRequests = JSON.parse(localStorage.getItem('hajis_customer_help') || '[]');
  const unread = helpRequests.some(req => !req.read);
  const badge = document.getElementById('help-badge');
  if (badge) {
    badge.style.display = unread ? 'inline' : 'none';
  }
}

function displayHelpRequests() {
  const container = document.getElementById('help-messages-container');
  if (!container) {
    console.warn('Help messages container not found');
    return;
  }
  container.innerHTML = '';

  const helpRequests = JSON.parse(localStorage.getItem('hajis_customer_help') || '[]');
  if (!Array.isArray(helpRequests) || helpRequests.length === 0) {
    container.innerHTML = '<p style="color: var(--muted);">No help requests yet.</p>';
    updateHelpBadge();
    return;
  }

  helpRequests.forEach((req, index) => {
    const card = document.createElement('div');
    card.className = 'item-box';
    card.style = 'background:#fff;color:#000;border:1px solid #ddd;margin-bottom:10px;padding:12px;border-radius:8px;';

    const msg = document.createElement('p');
    msg.innerHTML = `<strong>Message:</strong> ${escapeHtml(req.message || '')}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${escapeHtml(req.phone || 'N/A')}`;

    const button = document.createElement('button');
    button.textContent = 'Mark as Resolved';
    button.style = 'background:#cc0000;color:#fff;border:none;border-radius:6px;padding:6px 10px;cursor:pointer;margin-top:8px;';
    button.addEventListener('click', () => {
      helpRequests.splice(index, 1);
      localStorage.setItem('hajis_customer_help', JSON.stringify(helpRequests));
      displayHelpRequests();
      updateHelpBadge();
    });

    card.appendChild(msg);
    card.appendChild(phone);
    card.appendChild(button);
    container.appendChild(card);
  });

  updateHelpBadge();
}

function renderHelpMessages() {
  const container = document.getElementById('help-messages-container');
  if (!container) {
    console.warn('Help messages container not found');
    return;
  }
  container.innerHTML = '';

  const helpRequests = JSON.parse(localStorage.getItem('hajis_customer_help') || '[]');
  if (!Array.isArray(helpRequests) || helpRequests.length === 0) {
    container.innerHTML = '<p style="color: var(--muted);">No help requests yet.</p>';
    updateHelpBadge();
    return;
  }

  helpRequests.forEach((req, index) => {
    const card = document.createElement('div');
    card.className = 'item-box';
    card.style = 'background:#fff;color:#000;border:1px solid #ddd;margin-bottom:10px;padding:12px;border-radius:8px;';

    const msg = document.createElement('p');
    msg.innerHTML = `<strong>Message:</strong> ${escapeHtml(req.message || '')}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone:</strong> ${escapeHtml(req.phone || 'N/A')}`;

    const button = document.createElement('button');
    button.textContent = 'Mark as Resolved';
    button.style = 'background:#cc0000;color:#fff;border:none;border-radius:6px;padding:6px 10px;cursor:pointer;margin-top:8px;';
    button.addEventListener('click', () => {
      helpRequests.splice(index, 1);
      localStorage.setItem('hajis_customer_help', JSON.stringify(helpRequests));
      renderHelpMessages();
      updateHelpBadge();
    });

    card.appendChild(msg);
    card.appendChild(phone);
    card.appendChild(button);
    container.appendChild(card);
  });

  updateHelpBadge();
}

function switchTab(tab) {
  setActiveSection(tab);
  if (tab === 'orders') {
    loadOrders();
    startAdminOrdersPolling();
  } else {
    stopAdminOrdersPolling();
  }
  if (tab === 'completed') {
    loadCompletedOrders();
  }
  if (tab === 'menu') displayMenuManager();
  if (tab === 'feedback') loadCustomerFeedback();
  if (tab === 'help') {
    renderHelpMessages();
    startHelpAutoRefresh();
  } else {
    stopHelpAutoRefresh();
  }
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

const ORDERS_KEY = 'hajis_orders';

function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY) || localStorage.getItem('hajis_restaurant_orders') || '[]';
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error parsing orders:', e);
    return [];
  }
}

function setOrders(orders) {
  const payload = JSON.stringify(orders);
  localStorage.setItem(ORDERS_KEY, payload);
  localStorage.setItem('hajis_restaurant_orders', payload);
  localStorage.setItem(ORDERS_KEY + '_ts', Date.now().toString());
  localStorage.setItem('hajis_restaurant_orders_ts', Date.now().toString());
  // NO loadOrders() and NO storage event dispatch here to avoid call stack recursion.
}
function getOrderRemainingSeconds(order) {
  if (!order || !order.deliveryMinutes || !order.acceptedAt) return null;
  const acceptedAt = new Date(order.acceptedAt).getTime();
  if (!acceptedAt) return null;
  const elapsedSec = Math.floor((Date.now() - acceptedAt) / 1000);
  return Math.max(-999999, Math.round(order.deliveryMinutes * 60 - elapsedSec));
}

function loadOrders() {
  let orders = getOrders();
  const ordersList = document.getElementById('orders-feed');
  if (!ordersList) return;

  if (!Array.isArray(orders) || orders.length === 0) {
    ordersList.innerHTML = '<p style="color:#ccc;">No active orders.</p>';
    return;
  }

  // Normalize orders array and ensure newest first (reverse handling)
  orders = orders.filter(o => o && o.timestamp);
  orders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  orders = orders.reverse(); // latest at top

  // Show active orders first: pending/accepted/overdue, and then cancelled as fallback
  const activeOrders = orders.filter(o => !['cancelled', 'completed'].includes((o.status || '').toLowerCase()));
  const cancelledOrders = orders.filter(o => (o.status || '').toLowerCase() === 'cancelled');
  const orderedToRender = activeOrders.concat(cancelledOrders);

  let hasOverdue = false;
  ordersList.innerHTML = '';

  orderedToRender.forEach((order) => {
    try {
      const item = document.createElement('div');
      item.className = 'item-box';
      item.style.position = 'relative';

      const rawStatus = (order.status || 'pending').toString().trim().toLowerCase();
      let normalizedStatus = rawStatus;
      if (rawStatus === 'in process' || rawStatus === 'in_process' || rawStatus === 'processing') {
        normalizedStatus = 'pending';
      }
      let statusDisplay = normalizedStatus;
      let extraInfo = '';

      if (order.status === 'accepted') {
      const remainingSec = getOrderRemainingSeconds(order);
      if (remainingSec !== null) {
        const m = Math.max(0, Math.floor(remainingSec / 60));
        const s = Math.max(0, remainingSec % 60);
        if (remainingSec >= 0) {
          extraInfo = `<span style="color:#22c55e; font-weight:600;">Remaining: ${m}:${s.toString().padStart(2, '0')}</span>`;
        } else {
          const overdue = Math.abs(remainingSec);
          const overdueMinutes = Math.floor(overdue / 60);
          const overdueSeconds = overdue % 60;
          extraInfo = `<span style="color:#ff6b6b; font-weight:700;">Overdue by ${overdueMinutes}:${overdueSeconds.toString().padStart(2, '0')}</span>`;
          statusDisplay = 'overdue';
          hasOverdue = true;
          if (!order.lateAlerted) {
            order.lateAlerted = true;
            playOrderLateAlert(order.id);
          }
        }
      }
    }

    let actions = '';
    if (normalizedStatus === 'pending') {
      actions = '<button class="btn btn-accept" onclick="window.updateStatus(\'' + order.id + '\', \'accepted\')">Accept</button><button class="btn btn-cancel" onclick="window.updateStatus(\'' + order.id + '\', \'cancelled\')">Cancel</button>';
    } else if (normalizedStatus === 'accepted') {
      actions = '<div class="flex-row" style="align-items:center; gap:8px; flex-wrap:wrap;"><input id="timer-update-' + order.id + '" type="number" class="timer-adjust-input" placeholder="±min" style="width:80px;" /><button class="btn btn-secondary btn-tiny" onclick="adjustOrderDeliveryMinutes(\'' + order.id + '\')">Update Timer</button><button class="btn btn-tiny" onclick="markOrderDelivered(\'' + order.id + '\')">Mark Delivered</button><button class="btn btn-cancel btn-tiny" onclick="window.updateStatus(\'' + order.id + '\', \'cancelled\')" style="background:#c31d1d;border-color:#ff6161;color:#fff;">Cancel</button></div>';
    } else if (normalizedStatus === 'overdue') {
      actions = '<button class="btn btn-tiny" onclick="markOrderDelivered(\'' + order.id + '\')">Mark Delivered</button>';
    } else if (normalizedStatus === 'completed') {
      actions = '<span style="color:#9af7a2; font-weight:600;">Completed</span>';
    } else if (normalizedStatus === 'cancelled') {
      actions = '<span style="color:#ff9b9b; font-weight:600;">Cancelled</span>';
    }

    const statusClass = normalizedStatus === 'accepted' ? 'order-on-time' : '';
    if (statusClass) {
      item.classList.add(statusClass);
    }
    if (order.status === 'accepted' && getOrderRemainingSeconds(order) !== null && getOrderRemainingSeconds(order) < 0) {
      item.classList.add('order-late');
    }

    item.innerHTML = `
      <button class="btn btn-tiny" onclick="deleteOrder('${order.id}')" style="position:absolute; top:5px; right:5px; background:#ff4444; color:#fff; border:none; border-radius:50%; width:25px; height:25px; cursor:pointer; font-size:14px;">X</button>
      <div class="item-box-title"><strong>${order.name}</strong> - <span style="color:#999;">${statusDisplay}</span></div>
      <div style="margin:4px 0;">${extraInfo}</div>
      <div class="order-actions" style="margin-top:8px;">
        ${actions}
      </div>
    `;
    ordersList.appendChild(item);
    } catch (error) {
      console.error('loadOrders: failed to render order', order && order.id, error);
    }
  });

  if (hasOverdue) {
    triggerAdminLateNotification();
  }

  // Persist any auto-late flags (to avoid repeat audio per refresh)
  setOrders(orders);
}

function loadCompletedOrders() {
  let orders = getOrders();
  const completedList = document.getElementById('completed-orders-list');
  if (!completedList) return;

  if (!Array.isArray(orders) || orders.length === 0) {
    completedList.innerHTML = '<p style="color:#ccc;">No completed orders.</p>';
    return;
  }

  // Filter for completed orders
  orders = orders.filter(o => o && o.timestamp && (o.status || '').toLowerCase() === 'completed');
  orders.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  orders = orders.reverse(); // latest at top

  completedList.innerHTML = '';

  orders.forEach((order) => {
    try {
      const item = document.createElement('div');
      item.className = 'item-box';
      item.style.position = 'relative';

      const rawStatus = (order.status || 'completed').toString().trim().toLowerCase();
      let statusDisplay = 'Completed';
      let extraInfo = '';

      if (order.deliveredAt) {
        extraInfo = `<span style="color:#22c55e; font-weight:600;">Delivered at ${new Date(order.deliveredAt).toLocaleString()}</span>`;
      }

      item.innerHTML = `
        <button class="btn btn-tiny" onclick="deleteOrder('${order.id}')" style="position:absolute; top:5px; right:5px; background:#ff4444; color:#fff; border:none; border-radius:50%; width:25px; height:25px; cursor:pointer; font-size:14px;">X</button>
        <div class="item-box-title"><strong>${order.name}</strong> - <span style="color:#999;">${statusDisplay}</span></div>
        <div style="margin:4px 0;">${extraInfo}</div>
      `;
      completedList.appendChild(item);
    } catch (error) {
      console.error('loadCompletedOrders: failed to render order', order && order.id, error);
    }
  });
}

function markOrderDelivered(orderId) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return;
  orders[idx].status = 'completed';
  orders[idx].deliveredAt = new Date().toISOString();
  orders[idx].lateAlerted = false;
  setOrders(orders);
  loadOrders();
  window.dispatchEvent(new StorageEvent('storage', { key: 'hajis_orders' }));
}

function playOrderLateAlert(orderId) {
  const soundId = 'late-alert-sound';
  const existing = document.getElementById(soundId);
  if (existing) {
    existing.play().catch(() => {});
  }

  if (Notification.permission === 'granted') {
    new Notification(`Order #${orderId} is Late! Please check status.`);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(`Order #${orderId} is Late! Please check status.`);
      }
    });
  }
}

function triggerAdminLateNotification() {
  const audioId = 'late-alert-sound';
  let sound = document.getElementById(audioId);
  if (!sound) {
    sound = document.createElement('audio');
    sound.id = audioId;
    sound.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg';
    sound.style.display = 'none';
    document.body.appendChild(sound);
  }
  sound.play().catch(() => {});
}

function adminTick() {
  const orders = getOrders();
  let updated = false;
  orders.forEach((order) => {
    if (order.status === 'accepted') {
      const remaining = getOrderRemainingSeconds(order);
      if (remaining !== null && remaining < 0) {
        order.status = 'overdue';
        updated = true;
      }
    }
  });
  if (updated) {
    setOrders(orders);
  }
  loadOrders();
}

setInterval(adminTick, 5000);

let adminOrdersRefreshInterval = null;

function startAdminOrdersPolling() {
  if (adminOrdersRefreshInterval) clearInterval(adminOrdersRefreshInterval);
  adminOrdersRefreshInterval = setInterval(() => {
    loadOrders();
  }, 2000); // 2-second admin polling to keep feed updated quickly
}

function stopAdminOrdersPolling() {
  if (adminOrdersRefreshInterval) clearInterval(adminOrdersRefreshInterval);
  adminOrdersRefreshInterval = null;
}

function clearAllHistory() {
  localStorage.removeItem(ORDERS_KEY);
  localStorage.removeItem('hajis_restaurant_orders');
  localStorage.removeItem(ORDERS_KEY + '_ts');
  localStorage.removeItem('hajis_restaurant_orders_ts');
  localStorage.removeItem('currentOrderId');
  console.info('All orders history cleared.');
  loadOrders();
  updateHelpBadge();
  renderHelpMessages();
}

window.addEventListener('storage', (event) => {
  // Keep customer help sync, but avoid order re-trigger loops;
  // order feed now uses interval polling.
  if (event.key === 'hajis_customer_help') {
    updateHelpBadge();
    if (document.getElementById('help-section')?.classList.contains('active')) {
      displayHelpRequests();
    }
  }
});

window.addEventListener('load', () => {
  if (document.getElementById('orders-section')) {
    startAdminOrdersPolling();
  }
});


function loadCustomerFeedback() {
  const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
  const feedbackList = document.getElementById('feedback-list');
  if (!feedbackList) return;

  if (!Array.isArray(reviews) || reviews.length === 0) {
    feedbackList.innerHTML = '<p style="color:#ccc;">No feedback available yet.</p>';
    return;
  }

  feedbackList.innerHTML = '';
  reviews.slice().reverse().forEach((review, index) => {
    const item = document.createElement('div');
    item.className = 'item-box';
    item.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px;">
        <strong style="color:#fff;">Feedback #${reviews.length - index}</strong>
        <span style="color:#22c55e; font-weight:700;">${review.rating || 0}/5</span>
      </div>
      <div style="color:#ffd700; margin-bottom:6px;">${'★'.repeat(review.rating || 0)}${'☆'.repeat(5 - (review.rating || 0))}</div>
      <div style="color:#d0d0d0; white-space:pre-wrap;">${review.comment || '<i>No comment</i>'}</div>
      <div style="margin-top:8px; font-size:0.8rem; color:#888;">${new Date(review.timestamp || Date.now()).toLocaleString()}</div>
    `;
    feedbackList.appendChild(item);
  });
}

function acceptOrder(orderId) {
  const minutes = prompt('Enter delivery time in minutes (e.g., 30, 45, 60):');
  const mins = parseInt(minutes, 10);
  if (!mins || mins < 1 || mins > 240) {
    alert('Please enter a valid number of minutes (1-240).');
    return;
  }
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return;
  orders[idx].status = 'accepted';
  orders[idx].deliveryMinutes = mins;
  orders[idx].acceptedAt = new Date().toISOString();
  setOrders(orders);
  loadOrders();
}

function adjustOrderDeliveryMinutes(orderId) {
  const deltaInput = document.getElementById(`timer-update-${orderId}`);
  if (!deltaInput) return;
  const delta = parseInt(deltaInput.value, 10);
  if (!Number.isFinite(delta) || delta === 0) {
    alert('Enter minutes to add or subtract (e.g., 5 or -5).');
    return;
  }
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return;
  if (orders[idx].status !== 'accepted') {
    alert('Can only adjust timer for accepted orders.');
    return;
  }

  const currentMinutes = Number(orders[idx].deliveryMinutes || 0);
  const newMinutes = Math.max(1, currentMinutes + delta);
  orders[idx].deliveryMinutes = newMinutes;
  orders[idx].lastTimerUpdate = new Date().toISOString();

  setOrders(orders);
  loadOrders();
  alert(`Order timer updated to ${newMinutes} min.`);
  deltaInput.value = '';
}

function cancelOrder(orderId) {
  window.updateStatus(`${orderId}`, 'cancelled');
}

window.updateStatus = function (id, newStatus) {
  const orderId = `${id}`;
  console.log('Status Updated:', orderId, newStatus);

  const orders = JSON.parse(localStorage.getItem('hajis_orders') || '[]');
  const idx = orders.findIndex((o) => `${o.id}` === orderId);
  if (idx === -1) {
    console.warn('updateStatus: order not found', orderId);
    return;
  }

  if (newStatus === 'accepted') {
    // Prompt for delivery time when accepting
    const minutes = prompt('Enter delivery time in minutes (e.g., 30, 45, 60):');
    const mins = parseInt(minutes, 10);
    if (!mins || mins < 1 || mins > 240) {
      alert('Please enter a valid number of minutes (1-240).');
      return;
    }
    orders[idx].deliveryMinutes = mins;
    orders[idx].acceptedAt = new Date().toISOString();
  }

  orders[idx].status = newStatus;
  orders[idx].updatedAt = new Date().toISOString();

  localStorage.setItem('hajis_orders', JSON.stringify(orders));
  localStorage.setItem('hajis_restaurant_orders', JSON.stringify(orders));
  localStorage.setItem('hajis_orders_ts', Date.now().toString());
  localStorage.setItem('hajis_restaurant_orders_ts', Date.now().toString());

  loadOrders();
  window.dispatchEvent(new StorageEvent('storage', { key: 'hajis_orders' }));
};

function deleteOrder(id) {
  const orderId = `${id}`;
  console.log('Deleting order:', orderId);

  const orders = JSON.parse(localStorage.getItem('hajis_orders') || '[]');
  const idx = orders.findIndex((o) => `${o.id}` === orderId);
  if (idx === -1) {
    console.warn('deleteOrder: order not found', orderId);
    return;
  }

  orders.splice(idx, 1);

  localStorage.setItem('hajis_orders', JSON.stringify(orders));
  localStorage.setItem('hajis_restaurant_orders', JSON.stringify(orders));
  localStorage.setItem('hajis_orders_ts', Date.now().toString());
  localStorage.setItem('hajis_restaurant_orders_ts', Date.now().toString());

  loadOrders();
  window.dispatchEvent(new StorageEvent('storage', { key: 'hajis_orders' }));
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
      <div style="color:#b3b3b3; margin-bottom: 8px;">${item.description || ''}</div>
      <div class="dish-actions" style="margin-top:8px; display: grid; gap: 8px;">
        <label>Image URL: <input id="image-${item.id}" type="text" value="${item.image || ''}" style="width:100%;" /></label>
        <label>Description:
          <textarea id="desc-${item.id}" rows="2" style="width:100%;">${item.description || ''}</textarea>
        </label>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <input id="price-${item.id}" type="number" min="0" step="0.01" value="${item.price.toFixed(2)}" style="width:120px;" />
          <button class="btn btn-primary" onclick="updateMenuItem(${item.id})">Save All Changes</button>
          <button class="btn btn-cancel" onclick="deleteDish(${item.id})">Delete</button>
        </div>
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

function updateMenuItem(itemId) {
  const priceInput = document.getElementById(`price-${itemId}`);
  const imageInput = document.getElementById(`image-${itemId}`);
  const descInput = document.getElementById(`desc-${itemId}`);

  if (!priceInput || !imageInput || !descInput) return;

  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price < 0) {
    alert('Please enter a valid price.');
    return;
  }

  const menu = getRestaurantMenu();
  const found = menu.find((m) => m.id === itemId);
  if (!found) return;

  let image = imageInput.value.trim();
  if (image && !image.toLowerCase().startsWith('images/')) {
    image = `images/${image}`;
  }

  found.price = price;
  found.image = image || found.image || 'images/placeholder.jpg';
  found.description = descInput.value.trim();

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
      const normalized = normalizeMenu(initialMenu);
      localStorage.setItem('restaurantMenu', JSON.stringify(normalized));
      return normalized;
    }
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
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

// Cart functions
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    console.warn('Error parsing cart', e);
    return [];
  }
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function addToCart(itemId) {
  const menu = getRestaurantMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item) {
    alert('Item not found');
    return;
  }
  const cart = getCart();
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  setCart(cart);
  alert(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
  const cart = getCart().filter(c => c.id !== itemId);
  setCart(cart);
}

function updateQuantity(itemId, quantity) {
  const cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    setCart(cart);
  }
}

function clearCart() {
  setCart([]);
}

function checkout() {
  window.location.href = 'order.html';
}

function updateCartDisplay() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'inline' : 'none';
  }
  if (cartIcon) {
    cartIcon.style.display = count > 0 ? 'block' : 'none';
  }
}

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

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem('hajis_cart') || '[]');
}

function setCart(cart) {
  localStorage.setItem('hajis_cart', JSON.stringify(cart));
  updateCartDisplay();
}

function addToCart(itemId) {
  const menu = getRestaurantMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item) return;

  const cart = getCart();
  const existing = cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || 'images/placeholder.jpg'
    });
  }
  setCart(cart);
  showCartToast(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
  const cart = getCart().filter(c => c.id !== itemId);
  setCart(cart);
}

function updateCartQuantity(itemId, quantity) {
  const cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    setCart(cart);
  }
}

function clearCart() {
  setCart([]);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartDisplay() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update floating cart button
  const cartBtn = document.querySelector('.floating-cart-btn');
  const cartCount = document.querySelector('.floating-cart-count');
  if (cartBtn && cartCount) {
    cartCount.textContent = count;
    cartBtn.style.display = count > 0 ? 'flex' : 'none';
  }

  // Update cart sidebar
  const sidebar = document.querySelector('.floating-cart-sidebar');
  const content = document.querySelector('.cart-panel-content');
  if (sidebar && content) {
    if (cart.length === 0) {
      content.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
      let html = '<table class="cart-table"><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th><th></th></tr></thead><tbody>';
      cart.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2);
        html += `
          <tr>
            <td>${item.name}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${item.id}, this.value)"></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${total}</td>
            <td><button onclick="removeFromCart(${item.id})">×</button></td>
          </tr>
        `;
      });
      html += '</tbody></table>';
      html += `<div class="cart-total-wrap"><strong>Total: $${getCartTotal().toFixed(2)}</strong></div>`;
      html += '<a href="order.html" class="btn btn-primary" style="width:100%;margin-top:16px;">Checkout</a>';
      content.innerHTML = html;
    }
  }
}

function toggleCartSidebar() {
  const sidebar = document.querySelector('.floating-cart-sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function showCartToast(message) {
  const toast = document.querySelector('.cart-toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
});