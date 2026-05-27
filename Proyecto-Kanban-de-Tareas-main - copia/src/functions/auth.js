// Guardar sesión (clave: 'users')
export function saveSession(user) {
  localStorage.setItem('users', JSON.stringify(user));
}

// Obtener usuario de sesión
export function getSession() {
  const user = localStorage.getItem('users');
  return user ? JSON.parse(user) : null;
}

// Cerrar sesión
export function clearSession() {
  localStorage.removeItem('users');
}

// ¿Es admin?
export function isAdmin() {
  const user = getSession();
  return user && user.role === 'admin';
}