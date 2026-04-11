import { 
  database, 
  db, 
  ref, 
  set, 
  push, 
  update, 
  onValue, 
  remove,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  setDoc,
  getDoc
} from './firebase-config.js';

// Global Constants
const ORDERS_FIREBASE_NODE = 'orders';// Firebase Node Constants (defined once, used globally)
const HELP_FIREBASE_NODE = 'hajis_help';
const SUPPORT_MESSAGES_COLLECTION = 'support_messages';
const MENU_FIREBASE_NODE = 'hajis_menu';
const ADMIN_USERNAME = 'Danish';
const ADMIN_PASSWORD = 'Haji123';

const DEFAULT_PLACEHOLDER_IMAGE = './images/Aloo Tarkari.jpg';

let hajisMenuLoadedFromStorage = false;
let hajisMenuCache = null;

// Ensure unique sessionId for Cart tracking
let sessionId = localStorage.getItem('hajis_session_id');
if (!sessionId) {
  sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('hajis_session_id', sessionId);
}
window.hajisSessionId = sessionId;

const initialMenu = [
  { id: 1, name: 'Shami Kabab', description: 'Grilled spiced beef patties served with chutney', price: 13.45, image: 'Shami Kabab.jpg', category: 'Starters' },
  { id: 2, name: 'Aalo Tikki', description: 'Crispy potato patties served with chutney', price: 9.75, image: 'Halwa Poori.jpg', category: 'Starters' },
  { id: 3, name: 'Dahi Poori', description: 'Crunchy chaat with yogurt and spices', price: 12.00, image: 'Samosa Chaat.jpg', category: 'Starters' },
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
    let normalizedImage = item.image.trim();
    if (hasImage) {
      if (!normalizedImage.toLowerCase().startsWith('images/') && !normalizedImage.toLowerCase().startsWith('./images/')) {
        normalizedImage = `./images/${normalizedImage}`;
      }
    }
    const normalizedItem = {
      ...item,
      id: Number(item.id) > 0 ? Number(item.id) : Date.now() + Math.floor(Math.random() * 1000),
      image: hasImage ? normalizedImage : DEFAULT_PLACEHOLDER_IMAGE
    };
    acc.push(normalizedItem);
    return acc;
  }, []);
}

// Load menu from Firebase with fallback to initialMenu
async function getRestaurantMenu() {
  return new Promise((resolve) => {
    if (hajisMenuLoadedFromStorage && Array.isArray(hajisMenuCache) && hajisMenuCache.length > 0) {
      return resolve(hajisMenuCache);
    }

    // Try to load from Firebase
    onValue(ref(database, MENU_FIREBASE_NODE), (snapshot) => {
      const firebaseMenu = snapshot.val();
      if (firebaseMenu && Array.isArray(firebaseMenu)) {
        console.log('📥 Menu loaded from Firebase');
        const normalized = normalizeMenu(firebaseMenu);
        hajisMenuCache = normalized;
        hajisMenuLoadedFromStorage = true;
        resolve(normalized);
      } else {
        // Firebase menu not available, use initialMenu and sync to Firebase
        console.log('📤 Syncing initial menu to Firebase');
        const normalizedDefault = normalizeMenu(initialMenu);

        // Sync to Firebase for future use
        update(ref(database, '/'), { [MENU_FIREBASE_NODE]: normalizedDefault })
          .catch(err => console.warn('Could not sync menu to Firebase:', err));

        hajisMenuCache = normalizedDefault;
        hajisMenuLoadedFromStorage = true;
        resolve(normalizedDefault);
      }
    }, { onlyOnce: true });
  });
}

function getRestaurantMenuSync() {
  if (hajisMenuCache && Array.isArray(hajisMenuCache) && hajisMenuCache.length > 0) return hajisMenuCache;
  if (window.hajisMenuData && Array.isArray(window.hajisMenuData) && window.hajisMenuData.length > 0) return window.hajisMenuData;
  return normalizeMenu(initialMenu);
}

function setRestaurantMenu(menu) {
  if (!Array.isArray(menu)) return;
  hajisMenuCache = menu;
  hajisMenuLoadedFromStorage = true;
  // Sync to Firebase instead of localStorage
  update(ref(database, '/'), { [MENU_FIREBASE_NODE]: menu })
    .catch(err => console.warn('Could not sync menu to Firebase:', err));
  window.dispatchEvent(new Event('hajis_menu_updated'));
}

// ==================== FIRESTORE MENU FUNCTIONS ====================
// These new functions handle menu data in Firestore 'hajis_menu' collection

async function getFirestoreProducts() {
  try {
    const productsRef = collection(db, 'hajis_menu');
    const q = query(productsRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error fetching Firestore products:', error);
    return [];
  }
}

async function addProductToFirestore(productData) {
  try {
    const productsRef = collection(db, 'hajis_menu');
    const docRef = await addDoc(productsRef, {
      ...productData,
      timestamp: new Date(),
      createdAt: new Date().toISOString()
    });
    console.log('✅ Product added to Firestore hajis_menu collection:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding product to Firestore:', error);
    throw error;
  }
}

async function updateProductInFirestore(productId, productData) {
  try {
    // Verify product ID is a valid Firestore auto-ID (not '1' or other manual IDs)
    if (!productId || typeof productId !== 'string' || productId.trim() === '') {
      throw new Error('Invalid product ID: ' + productId);
    }

    console.log('🔐 Updating Firestore document with ID:', productId);
    console.log('📋 Update payload:', productData);

    // Ensure price is a number
    if (productData.price !== undefined && productData.price !== null) {
      productData.price = parseFloat(productData.price);
      if (isNaN(productData.price)) {
        throw new Error('Price must be a valid number');
      }
      console.log('💰 Price is valid number:', productData.price);
    }

    const productRef = doc(db, 'hajis_menu', productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date().toISOString()
    });
    console.log('✅ Product updated in Firestore hajis_menu collection:', productId);
    console.log('📊 Updated fields:', Object.keys(productData));
  } catch (error) {
    console.error('❌ Error updating product in Firestore:', error.message);
    console.error('Product ID:', productId);
    console.error('Attempted data:', productData);
    throw error;
  }
}

async function deleteProductFromFirestore(productId) {
  try {
    const productRef = doc(db, 'hajis_menu', productId);
    await deleteDoc(productRef);
    console.log('✅ Product deleted from Firestore hajis_menu collection:', productId);
  } catch (error) {
    console.error('❌ Error deleting product from Firestore:', error);
    throw error;
  }
}

function setupFirestoreProductsListener(callbackFn) {
  try {
    const productsRef = collection(db, 'hajis_menu');
    const q = query(productsRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('📡 Real-time update from Firestore hajis_menu collection');
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      if (typeof callbackFn === 'function') {
        callbackFn(products);
      }
    }, (error) => {
      console.error('❌ Error in Firestore products listener:', error);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('❌ Error setting up Firestore products listener:', error);
  }
}

// Make Firestore functions available globally
window.getFirestoreProducts = getFirestoreProducts;
window.addProductToFirestore = addProductToFirestore;
window.updateProductInFirestore = updateProductInFirestore;
window.deleteProductFromFirestore = deleteProductFromFirestore;
window.setupFirestoreProductsListener = setupFirestoreProductsListener;

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
  // DISABLED: Help messages should only refresh when needed, not poll continuously
  console.log('ℹ️  startHelpAutoRefresh() disabled - manual refresh only');
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
  const helpRequests = JSON.parse(localStorage.getItem('hajis_help') || '[]');
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

  const helpRequests = JSON.parse(localStorage.getItem('hajis_help') || '[]');
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
      localStorage.setItem('hajis_help', JSON.stringify(helpRequests));
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

  const helpRequests = JSON.parse(localStorage.getItem('hajis_help') || '[]');
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
      localStorage.setItem('hajis_help', JSON.stringify(helpRequests));
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
    // Firebase real-time listener (in admin.html module script) handles all orders display
    // Do NOT call loadOrders() - Firebase listener is the source of truth
    console.log('📊 Orders tab active - Firebase real-time listener managing display');
  } else {
    stopAdminOrdersPolling();
  }
  if (tab === 'completed' && typeof loadCompletedOrders === 'function') {
    loadCompletedOrders();
  }
  if (tab === 'menu' && typeof displayMenuManager === 'function') displayMenuManager();
  if (tab === 'feedback' && typeof loadCustomerFeedback === 'function') loadCustomerFeedback();
  if (tab === 'help') {
    if (typeof renderHelpMessages === 'function') renderHelpMessages();
    if (typeof startHelpAutoRefresh === 'function') startHelpAutoRefresh();
  } else {
    if (typeof stopHelpAutoRefresh === 'function') stopHelpAutoRefresh();
    // If switching away from help tab, ensure Firebase listener is still active for orders
    if (tab === 'orders') {
      console.log('✅ Switched to orders - Firebase listener managing display');
    }
  }
}

// REMOVED: loginAdmin() is now defined in admin.html inline script only
// Using Firebase real-time listener instead of localStorage polling

function logoutAdmin() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('admin-error').style.display = 'none';
}

// ========== FIREBASE ORDERS (Primary) ==========
// All orders are now stored in Firebase hajis_orders node exclusively
// Admin dashboard uses real-time Firebase listeners (see admin.html)
// Order management functions return immediately to Firebase listener updates

function getOrders() {
  // Orders are fetched from Firebase via real-time listeners
  // This function is deprecated - use Firebase listeners instead
  return [];
}

function getOrderRemainingSeconds(order) {
  if (!order || !order.deliveryMinutes || !order.acceptedAt) return null;
  const acceptedAt = new Date(order.acceptedAt).getTime();
  if (!acceptedAt) return null;
  const elapsedSec = Math.floor((Date.now() - acceptedAt) / 1000);
  return Math.max(-999999, Math.round(order.deliveryMinutes * 60 - elapsedSec));
}

// ========== LEGACY FUNCTIONS REMOVED ==========
// The following functions have been removed as they used localStorage:
// - loadOrders() → now handled by admin.html Firebase listeners
// - loadCompletedOrders() → now handled by admin.html Firebase listeners  
// - markOrderDelivered() → now handled by admin.html inline script
// - acceptOrder() → now handled by admin.html inline script
// - deleteOrder() → now handled by admin.html inline script
// - updateStatus() → now handled by admin.html inline script
//
// Admin actions are now synchronized globally via Firebase Realtime Database
// and appear instantly on all admin dashboards without page refresh

function playOrderLateAlert(orderId) {
  const soundId = 'late-alert-sound';
  const existing = document.getElementById(soundId);
  if (existing) {
    existing.play().catch(() => { });
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
  sound.play().catch(() => { });
}

function adminTick() {
  // DISABLED: Firebase real-time listener handles all order updates
  // No polling needed - Firebase onValue() provides instant updates
  console.log('ℹ️  adminTick() disabled - Firebase handles updates');
}

// DISABLED: Removed pollinginterval - Firebase real-time listener is now the data source

let adminOrdersRefreshInterval = null;

function startAdminOrdersPolling() {
  // DISABLED: Firebase real-time listener (admin.html module) handles all updates
  // No polling needed - Firebase onValue() provides instant updates
  console.log('ℹ️  startAdminOrdersPolling() disabled - Firebase handles updates');
}

function stopAdminOrdersPolling() {
  // DISABLED: Firebase real-time listener doesn't need stopping
  console.log('ℹ️  stopAdminOrdersPolling() disabled - Firebase handles updates');
  adminOrdersRefreshInterval = null;
}

function clearAllHistory() {
  // DISABLED: Firebase is now the source of truth
  // Only clear localStorage items that are NOT orders
  localStorage.removeItem('currentOrderId');
  console.info('Non-order history cleared.');
  updateHelpBadge();
  renderHelpMessages();
}

window.addEventListener('storage', (event) => {
  // Keep customer help sync, but avoid order re-trigger loops;
  // order feed now uses interval polling.
  if (event.key === 'hajis_help') {
    updateHelpBadge();
    if (document.getElementById('help-section')?.classList.contains('active')) {
      displayHelpRequests();
    }
  }
});

window.addEventListener('load', () => {
  // DISABLED: Firebase real-time listener handles all order updates
  // No polling needed - Firebase onValue() provides instant updates
  console.log('ℹ️  Page load - Firebase handles all updates');
});


function loadCustomerFeedback() {
  const feedbackList = document.getElementById('feedback-list');
  if (!feedbackList) return;

  if (typeof window.displayFirestoreFeedback === 'function' && Array.isArray(window.firestoreFeedback)) {
    window.displayFirestoreFeedback(window.firestoreFeedback);
    return;
  }

  const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
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

// All admin order functions migrated to admin.html Firebase listeners
// displayMenuManager() and other menu functions remain below

function displayMenuManager() {
  const menu = getRestaurantMenuSync();
  const manager = document.getElementById('menu-manager');
  if (!manager) return;

  if (!Array.isArray(menu) || menu.length === 0) {
    manager.innerHTML = '<p style="color:#ccc;">Loading menu from Firestore...</p>';
    
    // Load from Firestore if available
    getFirestoreProducts().then(products => {
      if (!Array.isArray(products) || products.length === 0) {
        manager.innerHTML = '<p style="color:#ccc;">No menu items available. Add new items to get started.</p>';
        return;
      }
      displayMenuManagerUI(products, manager);
    });
    return;
  }

  displayMenuManagerUI(menu, manager);
}

function displayMenuManagerUI(menu, manager) {
  if (!Array.isArray(menu) || menu.length === 0) {
    manager.innerHTML = '<p style="color:#ccc;">No menu items available.</p>';
    return;
  }

  manager.innerHTML = '';
  menu.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'item-box';
    row.style.cssText = 'border:1px solid #444; border-radius:12px; padding:16px; background:#0f0f0f; margin-bottom:16px; display:grid; gap:12px;';
    row.innerHTML = `
      <div style="grid-column:1/-1; padding-bottom:8px; border-bottom:1px solid #333;">
        <strong style="font-size:1.1rem; color:#fff;">${item.name}</strong>
        <span style="color:#888; margin-left:12px;">Current Price: $${(item.price || 0).toFixed(2)}</span>
        <span style="color:#666; margin-left:12px; font-size:0.75rem;">ID: ${item.id}</span>
      </div>
      <div style="grid-column:1/-1; color:#bbb; font-size:0.9rem; line-height:1.5;">${item.description || 'No description'}</div>
      <div style="grid-column:1/-1; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div>
          <label style="display:block; color:#ddd; margin-bottom:6px; font-weight:600; font-size:0.85rem;">Image URL</label>
          <input id="image-${item.id}" type="text" value="${item.image || ''}" style="width:100%; padding:10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#fff;" />
        </div>
        <div>
          <label style="display:block; color:#ddd; margin-bottom:6px; font-weight:600; font-size:0.85rem;">Price (\$)</label>
          <input id="price-${item.id}" type="number" min="0" step="0.01" value="${(item.price || 0).toFixed(2)}" style="width:100%; padding:10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#fff;" />
        </div>
      </div>
      <div style="grid-column:1/-1;">
        <label style="display:block; color:#ddd; margin-bottom:6px; font-weight:600; font-size:0.85rem;">Description</label>
        <textarea id="desc-${item.id}" rows="3" style="width:100%; padding:10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#fff; font-family:inherit; resize:vertical;">${item.description || ''}</textarea>
      </div>
      <div style="grid-column:1/-1;">
        <label style="display:block; color:#ddd; margin-bottom:6px; font-weight:600; font-size:0.85rem;">Category</label>
        <select id="cat-${item.id}" style="width:100%; padding:10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#fff;">
          <option value="Starters" ${item.category === 'Starters' ? 'selected' : ''}>Starters</option>
          <option value="BBQ" ${item.category === 'BBQ' ? 'selected' : ''}>BBQ</option>
          <option value="Meat Curries" ${item.category === 'Meat Curries' ? 'selected' : ''}>Meat Curries</option>
          <option value="Karahi" ${item.category === 'Karahi' ? 'selected' : ''}>Karahi</option>
          <option value="Biryani" ${item.category === 'Biryani' ? 'selected' : ''}>Biryani</option>
          <option value="Vegan/Veggie Curries" ${item.category === 'Vegan/Veggie Curries' ? 'selected' : ''}>Vegan/Veggie Curries</option>
          <option value="Pizzas" ${item.category === 'Pizzas' ? 'selected' : ''}>Pizzas</option>
          <option value="Burgers" ${item.category === 'Burgers' ? 'selected' : ''}>Burgers</option>
          <option value="Brunch" ${item.category === 'Brunch' ? 'selected' : ''}>Brunch</option>
          <option value="Breads/Rice" ${item.category === 'Breads/Rice' ? 'selected' : ''}>Breads/Rice</option>
          <option value="Drinks" ${item.category === 'Drinks' ? 'selected' : ''}>Drinks</option>
          <option value="Desserts" ${item.category === 'Desserts' ? 'selected' : ''}>Desserts</option>
        </select>
      </div>
      <div style="grid-column:1/-1; display:flex; gap:12px; padding-top:8px; border-top:1px solid #333;">
        <button class="btn btn-primary" onclick="updateMenuItemFirestore('${item.id}')">✅ Save All Changes</button>
        <button class="btn btn-cancel" onclick="deleteMenuItemFirestore('${item.id}')">🗑️ Delete Item</button>
      </div>
    `;
    manager.appendChild(row);
  });
}

function updateMenuItemFirestore(itemId) {
  const priceInput = document.getElementById(`price-${itemId}`);
  const imageInput = document.getElementById(`image-${itemId}`);
  const descInput = document.getElementById(`desc-${itemId}`);
  const catInput = document.getElementById(`cat-${itemId}`);
  const updateButton = document.querySelector(`button[onclick*="updateMenuItemFirestore('${itemId}')"]`);

  if (!priceInput || !imageInput || !descInput) {
    console.error('❌ Missing form fields for item ID:', itemId);
    showNotification('Error: Form fields not found', 'error');
    return;
  }

  if (updateButton) {
    setButtonLoading(updateButton, true, 'Saving...');
  }

  console.log('📝 Starting menu item update for ID:', itemId);
  console.log('Price Input Value:', priceInput.value);

  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price < 0) {
    showNotification('Please enter a valid price.', 'error');
    console.error('❌ Invalid price value:', priceInput.value);
    return;
  }

  console.log('✅ Price parsed successfully:', price);

  // Get current document data to preserve existing values
  getDoc(doc(db, 'hajis_menu', itemId))
    .then((docSnap) => {
      if (!docSnap.exists()) {
        throw new Error('Menu item not found in Firestore');
      }

      const currentData = docSnap.data();
      console.log('📦 Current item data from Firestore:', currentData);

      const updateData = {
        price: price,
        image: imageInput.value.trim() || currentData.image || './images/Aloo Tarkari.jpg',
        description: descInput.value.trim() || currentData.description || '',
        category: catInput?.value || currentData.category || 'Uncategorized'
      };

      console.log('🔄 Preparing updateData:', updateData);
      return updateProductInFirestore(itemId, updateData);
    })
    .then(() => {
      if (updateButton) {
        setButtonLoading(updateButton, false);
        updateButton.style.background = '#4ade80';
      }

      console.log('✅ Price Updated in Firebase!');
      console.log('📊 Item ID:', itemId, '| New Price: $' + price.toFixed(2));
      
      // Show success notification with price
      showNotification(`Saved! Price updated to $${price.toFixed(2)}`, 'success');
      
      if (updateButton) {
        setTimeout(() => {
          updateButton.style.background = '';
        }, 2000);
      }
    })
    .catch(err => {
      if (updateButton) {
        setButtonLoading(updateButton, false);
      }
      const friendlyMessage = mapFirebaseErrorToFriendlyMessage(err);
      console.error('❌ Menu update failed for item', itemId, ':', err.message || err);
      showNotification(friendlyMessage, 'error');
    });
}

function deleteMenuItemFirestore(itemId) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  
  deleteProductFromFirestore(itemId)
    .then(() => {
      showNotification('Menu item deleted successfully!', 'success');
      displayMenuManager();
    })
    .catch(err => {
      showNotification('Error deleting menu item: ' + err.message, 'error');
    });
}

function updatePrice(itemId) {
  const priceInput = document.getElementById(`price-${itemId}`);
  if (!priceInput) {
    console.error('❌ Price input field not found for item:', itemId);
    return;
  }

  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price < 0) {
    console.error('❌ Invalid price value:', priceInput.value);
    return;
  }

  console.log('💾 Updating price for item', itemId, '- New price: $' + price.toFixed(2));

  updateProductInFirestore(itemId, { price: price })
    .then(() => {
      console.log('✅ Price Updated in Firebase! Item ID:', itemId, 'Price: $' + price.toFixed(2));
      showNotification(`Price updated to $${price.toFixed(2)}`, 'success');
    })
    .catch(err => {
      console.error('Error updating price:', err);
      showNotification('Error updating price: ' + err.message, 'error');
    });
}

function updateMenuItem(itemId) {
  const priceInput = document.getElementById(`price-${itemId}`);
  const imageInput = document.getElementById(`image-${itemId}`);
  const descInput = document.getElementById(`desc-${itemId}`);

  if (!priceInput || !imageInput || !descInput) return;

  const price = parseFloat(priceInput.value);
  if (isNaN(price) || price < 0) {
    showNotification('Please enter a valid price.', 'error');
    return;
  }

  const menu = getRestaurantMenuSync();
  const found = menu.find((m) => m.id === itemId);
  if (!found) return;

  let image = imageInput.value.trim();
  if (image && !image.toLowerCase().startsWith('images/') && !image.toLowerCase().startsWith('./images/')) {
    image = `./images/${image}`;
  }

  found.price = price;
  found.image = image || found.image || './images/Aloo Tarkari.jpg';
  found.description = descInput.value.trim();

  setRestaurantMenu(menu);
  displayMenuManager();
}


function deleteDish(itemId) {
  if (!confirm('Are you sure you want to delete this item?')) return;
  deleteProductFromFirestore(itemId)
    .catch(err => console.error('Error deleting dish:', err));
}

function addNewDish() {
  const name = (document.getElementById('new-name').value || '').trim();
  const price = parseFloat(document.getElementById('new-price').value);
  const imageInput = (document.getElementById('new-image').value || '').trim();
  const category = (document.getElementById('new-category').value || 'Uncategorized').trim();

  if (!name || isNaN(price) || price < 0) {
    showNotification('Please provide a valid name and price.', 'error');
    return;
  }

  const image = imageInput || './images/Aloo Tarkari.jpg';

  const newDish = {
    name: name,
    description: '',
    price: price,
    image: image,
    category: category,
    timestamp: new Date()
  };

  addProductToFirestore(newDish)
    .then(() => {
      showNotification('Dish added to Firestore successfully!', 'success');
      
      // Clear form
      document.getElementById('new-name').value = '';
      document.getElementById('new-price').value = '';
      document.getElementById('new-image').value = '';
      document.getElementById('new-category').value = 'Uncategorized';
      
      const preview = document.getElementById("uploadedimage");
      if (preview) {
        preview.style.display = 'none';
        preview.src = '';
      }
    })
    .catch(err => {
      showNotification('Error adding dish: ' + err.message, 'error');
    });
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
  // Menu is now loaded from Firebase via getRestaurantMenu()
  // This function is kept for backward compatibility
  console.log('📥 Menu initialized from Firebase on script load');
  getRestaurantMenu().then(menu => {
    window.hajisMenuData = menu;
  });
  return initialMenu;
}

// Auto-initialize on script load
window.hajisMenuData = initialMenu;
window.hajisGetRestaurantMenu = getRestaurantMenu;
window.hajisInitializeMenu = initializeHajisMenu;

function resetMenu() {
  if (!confirm('Are you sure? This will reset the menu to all 61 original items.')) return;
  try {
    const normalized = normalizeMenu(initialMenu);
    // Sync to Firebase instead of localStorage
    update(ref(database, '/'), { [MENU_FIREBASE_NODE]: normalized })
      .then(() => {
        hajisMenuCache = normalized;
        hajisMenuLoadedFromStorage = true;
        window.dispatchEvent(new Event('hajis_menu_updated'));
        alert('Menu reset successfully to 61 items and synced to Firebase.');
      })
      .catch(err => {
        alert('Reset failed: ' + err.message);
      });
  } catch (err) {
    alert('Reset failed: ' + err.message);
  }
}

initializeHajisMenu();

// Ensure Firebase functions are available globally
window.database = database;
window.firebaseRef = ref;
window.firebaseUpdate = update;
window.firebaseDb = database;

// ========== CHECKOUT (Firebase Primary Storage) ==========

// Cart is synchronized real-time to Firebase using 'active_carts/SESSION_ID'
// This provides persistent cross-device shopping if the session ID is maintained.

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

// Initialize real-time cart sync listener
let cartSyncInitialized = false;
function initializeCartSync() {
  if (cartSyncInitialized) return;
  cartSyncInitialized = true;

  // Removed Firebase sync for cart
  window.hajisCartSynced = true;
  window.dispatchEvent(new Event('cart_synced'));
}
// Boot sync immediately
initializeCartSync();

// Add item to local cart (for shopping experience)
function addToCart(itemIdOrName) {
  // Handle both numeric IDs and matching by Name if ID is unreliable
  let menu = getRestaurantMenuSync();
  
  // If menu is empty, try to use window.hajisMenuData or initialMenu
  if (!menu || menu.length === 0) {
    menu = window.hajisMenuData || normalizeMenu(initialMenu);
    console.warn('⚠️ Menu was empty, using fallback. Menu length:', menu.length);
  }

  const searchId = Number(itemIdOrName);
  
  let item = menu.find(i => Number(i.id) === searchId);
  if (!item && typeof itemIdOrName === 'string') {
    item = menu.find(i => i.name === itemIdOrName);
  }

  if (!item) {
    console.error('❌ Item not found. Search ID:', searchId, 'Menu length:', menu.length);
    console.error('Menu items:', menu.map(m => ({ id: m.id, name: m.name })));
    showNotification('Item not found', 'error');
    return;
  }

  const cart = getCart();
  const normalizedId = item.id;
  const existing = cart.find(c => c.id === normalizedId);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ 
      id: normalizedId, 
      name: item.name, 
      price: item.price, 
      image: item.image,
      quantity: 1 
    });
  }

  setCart(cart);

  console.log('✅ Item Added to Cart:', item.name, 'ID:', item.id);
  showNotification(`${item.name} added to cart!`, 'success');

  const sidebar = document.querySelector('.floating-cart-sidebar');
  if (sidebar) {
    sidebar.classList.add('open');
  }
}

// Add to Cart with immediate Firebase checkout redirect (from menu)
function addToCartFirebaseCheckout(itemName, price) {
  console.log('🔥 Adding item to Firebase checkout:', itemName);

  // Create order with single item
  const orderData = {
    cart: [{ name: itemName, price, quantity: 1 }],
    status: 'pending',
    timestamp: new Date().toISOString()
  };

  // Save to Firebase and redirect
  push(ref(database, ORDERS_FIREBASE_NODE), orderData)
    .then((newOrderRef) => {
      const orderId = newOrderRef.key;
      console.log('✅ Item saved to Firebase order:', orderId);

      alert('Order placed successfully!');
      setTimeout(() => {
        window.location.href = 'order.html?id=' + orderId;
      }, 2000);
    })
    .catch((error) => {
      console.error('❌ Error saving to Firebase:', error);
      alert('Failed to add item. Please try again.');
    });
}

function removeFromCart(itemId) {
  const normalizedId = Number(itemId);
  const cart = getCart().filter(c => Number(c.id) !== normalizedId);
  setCart(cart);
}

function updateQuantity(itemId, quantity) {
  const normalizedId = Number(itemId);
  const cart = getCart();
  const item = cart.find(c => Number(c.id) === normalizedId);
  if (item) {
    item.quantity = Math.max(1, Number(quantity));
    setCart(cart);
  }
}

// Main Checkout: Push cart to Firebase and redirect to order page
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification('Your cart is empty!', 'error');
    return;
  }

  // Save cart to Firebase (create pending order)
  const orderData = {
    cart: cart,
    status: 'pending',
    timestamp: new Date().toISOString()
  };

  push(ref(database, ORDERS_FIREBASE_NODE), orderData)
    .then((newOrderRef) => {
      const orderId = newOrderRef.key;
      console.log('✅ Order saved to Firebase:', orderId);

      // Clear the local cart
      clearCart();
      updateCartDisplay();

      // Delete the active cart session entirely upon order completion
      if (window.hajisSessionId) {
        remove(ref(database, 'active_carts/' + window.hajisSessionId))
          .catch(err => console.error('Error clearing active cart node:', err));
      }

      // Redirect to order tracking page with order ID
      window.location.href = 'order.html?id=' + orderId;
    })
    .catch((error) => {
      console.error('❌ Error saving order to Firebase:', error);
      alert('Failed to place order. Please try again.');
    });
}

function startMenuTimer() {
  // Timer now managed by Firebase lifecycle
  const value = Date.now();
  sessionStorage.setItem('menuTimerStart', value.toString());
}

function checkAdminSession() {
  const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  const loginEl = document.getElementById('admin-login');
  const dashEl = document.getElementById('admin-dashboard');

  if (loggedIn) {
    if (loginEl) loginEl.style.display = 'none';
    if (dashEl) {
      dashEl.style.display = 'block';
      if (typeof setActiveSection === 'function') setActiveSection('orders');
    }
    // loadOrders() is removed as it's handled by admin.html Firebase listener
  } else {
    if (loginEl) loginEl.style.display = 'flex';
    if (dashEl) dashEl.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', checkAdminSession);

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

  // Update nav cart icon
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'inline' : 'none';
  }
  if (cartIcon) {
    cartIcon.style.display = count > 0 ? 'block' : 'none';
  }

  // Update floating cart button
  const cartBtn = document.querySelector('.floating-cart-btn');
  const floatingCartCount = document.querySelector('.floating-cart-count');
  if (cartBtn && floatingCartCount) {
    floatingCartCount.textContent = count;
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

function showNotification(message, type = 'success') {
  let toastBody = document.querySelector('.hajis-notification-toast');
  if (!toastBody) {
    toastBody = document.createElement('div');
    toastBody.className = 'hajis-notification-toast';
    toastBody.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
      display: none;
    `;
    
    // Add animation keyframes if not already added
    if (!document.getElementById('hajis-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'hajis-notification-styles';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
        .hajis-notification-toast.show {
          display: block;
          animation: slideInRight 0.3s ease;
        }
        .hajis-notification-toast.hide {
          animation: slideOutRight 0.3s ease forwards;
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toastBody);
  }

  toastBody.textContent = message;
  if (type === 'success') {
    toastBody.style.backgroundColor = '#22c55e';
    toastBody.style.color = '#fff';
    toastBody.innerHTML = '✅ ' + message;
  } else if (type === 'error') {
    toastBody.style.backgroundColor = '#ef4444';
    toastBody.style.color = '#fff';
    toastBody.innerHTML = '❌ ' + message;
  } else {
    toastBody.style.backgroundColor = '#3b82f6';
    toastBody.style.color = '#fff';
    toastBody.innerHTML = 'ℹ️ ' + message;
  }
  
  toastBody.classList.remove('hide');
  toastBody.classList.add('show');

  setTimeout(() => {
    toastBody.classList.remove('show');
    toastBody.classList.add('hide');
  }, 3000);
}

function mapFirebaseErrorToFriendlyMessage(error) {
  if (!error) return 'Server busy, please try again.';
  const code = error.code || error?.message || '';
  switch (code) {
    case 'permission-denied':
      return 'Permission denied. Server busy, please try again.';
    case 'unavailable':
      return 'Server busy, please try again in a moment.';
    case 'deadline-exceeded':
      return 'Server busy, please try again.';
    case 'internal':
      return 'Internal server error, please try again.';
    case 'network-request-failed':
      return 'Network problem. Please check your connection and try again.';
    case 'resource-exhausted':
      return 'Server busy, please try again later.';
    case 'invalid-argument':
      return 'Invalid input data. Please review and try again.';
    default:
      if (typeof code === 'string' && code.includes('permission')) {
        return 'Server busy or permission denied, please try again.';
      }
      return error.message || 'Server busy, please try again.';
  }
}

function setButtonLoading(button, isLoading, loadingText = 'Processing...') {
  if (!button) return;
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalHtml = button.innerHTML;
    button.innerHTML = `${loadingText} <span class="button-spinner"></span>`;
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalHtml || 'Submit';
  }
}

function showCartToast(message) {
  showNotification(message, 'success');
}

function openChatModal() {
  const popup = document.getElementById('help-popup');
  if (popup) {
    if (popup.style.display === 'flex' || popup.style.display === 'block') {
      if (typeof closeChat === 'function') closeChat();
      else popup.style.display = 'none';
    } else {
      if (typeof openChat === 'function') openChat();
      else popup.style.display = 'flex';
    }
  }
}

// Chat message function
async function hajisSendMessage(message) {
  if (!message) return Promise.reject('Empty message');

  const customerId = localStorage.getItem('hajis_customer_id') || 'guest_' + Date.now();
  if (!localStorage.getItem('hajis_customer_id')) {
    localStorage.setItem('hajis_customer_id', customerId);
  }

  const supportData = {
    customerId,
    customerName: 'Guest Customer',
    messages: [{
      text: message,
      sender: 'customer',
      timestamp: new Date()
    }],
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastMessageTime: new Date()
  };

  try {
    const supportRef = collection(db, SUPPORT_MESSAGES_COLLECTION);
    await addDoc(supportRef, supportData);
    showNotification('Message sent to Haji\'s Support!', 'success');
    return true;
  } catch (error) {
    console.warn('Firestore support message write failed, falling back to RTDB', error);
    const helpData = {
      customerName: 'Guest Customer',
      message: message,
      timestamp: new Date().toLocaleString(),
      status: 'pending',
      adminReply: ''
    };
    await push(ref(database, HELP_FIREBASE_NODE), helpData);
    showNotification('Message sent to Haji\'s Support!', 'success');
    return true;
  }
}

window.hajisSendMessage = hajisSendMessage;

// Make functions global for HTML onclick handlers - MUST be done before any conditional checks
window.addToCart = addToCart;
window.addToCartFirebaseCheckout = addToCartFirebaseCheckout;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.checkout = checkout;
window.toggleCartSidebar = toggleCartSidebar;
window.updateCartDisplay = function() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update nav cart icon
  const cartIcon = document.getElementById('cart-icon');
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'inline' : 'none';
  }
  if (cartIcon) {
    cartIcon.style.display = count > 0 ? 'block' : 'none';
  }

  // Update floating cart button
  const cartBtn = document.querySelector('.floating-cart-btn');
  const floatingCartCount = document.querySelector('.floating-cart-count');
  if (cartBtn && floatingCartCount) {
    floatingCartCount.textContent = count;
    cartBtn.style.display = count > 0 ? 'flex' : 'none';
  }

  // Update cart sidebar
  const sidebar = document.querySelector('.floating-cart-sidebar');
  const content = document.querySelector('.cart-panel-content');
  if (!sidebar || !content) return;

  if (cart.length === 0) {
    content.innerHTML = '<p style="text-align:center; color:#666; padding:20px;">Your cart is empty</p>';
    return;
  }

  let html = '<div style="max-height:300px; overflow-y:auto;">';
  cart.forEach(item => {
    html += `
      <div class="cart-item" style="display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #eee;">
        <img src="${item.image || '/images/default-food.jpg'}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">
        <div style="flex:1;">
          <div style="font-weight:bold;">${item.name}</div>
          <div style="color:#666; font-size:0.9rem;">$${item.price} × ${item.quantity}</div>
        </div>
        <div style="display:flex; align-items:center; gap:5px;">
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="background:none;border:1px solid #ddd;padding:2px 8px;border-radius:4px;">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="background:none;border:1px solid #ddd;padding:2px 8px;border-radius:4px;">+</button>
          <button onclick="removeFromCart(${item.id})" style="background:#ff6b6b;color:#fff;border:none;padding:2px 8px;border-radius:4px;">×</button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  html += '<div style="padding:15px; border-top:1px solid #eee; background:#f9f9f9;">';
  html += `<div style="font-weight:bold; margin-bottom:10px;">Total: $${getCartTotal().toFixed(2)}</div>`;
  html += '<a href="order.html" class="btn btn-primary" style="width:100%;margin-top:16px;">Checkout</a>';
  content.innerHTML = html;
};
window.getCart = getCart;
window.displayMenuManagerUI = displayMenuManagerUI;
window.updateMenuItemFirestore = updateMenuItemFirestore;
window.deleteMenuItemFirestore = deleteMenuItemFirestore;
window.setCart = setCart;
window.getCartTotal = getCartTotal;
window.clearCart = clearCart;
window.updateQuantity = updateQuantity;
window.showNotification = showNotification;
window.hajisSendMessage = hajisSendMessage;
window.openChatModal = function() {
  const popup = document.getElementById('help-popup');
  if (popup) {
    if (popup.style.display === 'flex' || popup.style.display === 'block') {
      if (typeof closeChat === 'function') closeChat();
      else popup.style.display = 'none';
    } else {
      if (typeof openChat === 'function') openChat();
      else popup.style.display = 'flex';
    }
  }
};

// Additional admin/general functions to ensure they're available on window
window.loginAdmin = typeof loginAdmin !== 'undefined' ? loginAdmin : function() {};
window.checkAdminSession = typeof checkAdminSession !== 'undefined' ? checkAdminSession : function() {};
window.logoutAdmin = typeof logoutAdmin !== 'undefined' ? logoutAdmin : function() {};
window.setActiveSection = typeof setActiveSection !== 'undefined' ? setActiveSection : function() {};
window.switchTab = typeof switchTab !== 'undefined' ? switchTab : function() {};
window.resetMenu = typeof resetMenu !== 'undefined' ? resetMenu : function() {};
window.displayMenuManager = typeof displayMenuManager !== 'undefined' ? displayMenuManager : function() {};
window.addNewDish = typeof addNewDish !== 'undefined' ? addNewDish : function() {};
window.updateHelpBadge = typeof updateHelpBadge !== 'undefined' ? updateHelpBadge : function() {};
window.renderHelpMessages = typeof renderHelpMessages !== 'undefined' ? renderHelpMessages : function() {};

const cloudName = "daz0ntmay";
const uploadPreset = "my_preset";

function initCloudinary() {
  const uploadBtn = document.getElementById("upload_widget");
  if (!uploadBtn || typeof cloudinary === 'undefined') return;

  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      clientAllowedFormats: ["png", "jpg", "jpeg"],
      multiple: false,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        const imageUrl = result.info.secure_url;
        const imgField = document.getElementById("new-image");
        if (imgField) {
          imgField.value = imageUrl;
          if (typeof showNotification === 'function') showNotification('Image uploaded!', 'success');
        }
        const preview = document.getElementById("uploadedimage");
        if (preview) {
          preview.src = imageUrl;
          preview.style.display = 'block';
        }
      }
    }
  );

  uploadBtn.addEventListener("click", () => myWidget.open(), false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCloudinary);
} else {
  initCloudinary();
}
