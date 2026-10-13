const STORAGE_KEY = 'innomarket.cart';

export function loadCartState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCartState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}

const USER_STORAGE_KEY = 'innomarket.user';

export function loadUserState() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveUserState(state) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}

const ADMIN_ITEMS_STORAGE_KEY = 'innomarket.adminItems';

export function loadAdminItems() {
  try {
    const raw = localStorage.getItem(ADMIN_ITEMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAdminItems(state) {
  try {
    localStorage.setItem(ADMIN_ITEMS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}
