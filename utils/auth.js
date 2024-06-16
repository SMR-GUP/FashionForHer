// utils/auth.js



// Store the token
export const setToken = (token) => {
  if (typeof window !== 'undefined') {

    localStorage.setItem('token', token);
  }
};

// Get the token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Remove the token
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Get user info from the token
export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = decodeJWT(token);
      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        removeToken();
        return null;
      }
      return decodedToken; // This contains user details
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
};

const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(base64UrlDecode(payload));
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const base64UrlDecode = (str) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};
