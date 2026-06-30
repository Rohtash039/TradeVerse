import { firebaseAuth } from '../config/firebase.js';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';

const parseCookies = (cookieHeader = '') => {
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [rawName, ...rawValue] = cookie.trim().split('=');
    if (!rawName || rawValue.length === 0) return cookies;
    cookies[rawName] = decodeURIComponent(rawValue.join('='));
    return cookies;
  }, {});
};

/**
 * Verifies Firebase session cookie first, with Bearer ID token fallback.
 * Attaches decoded token to req.user.
 */
export default async function authMiddleware(req, res, next) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const sessionCookie = cookies[env.SESSION_COOKIE_NAME];
    const authHeader = req.headers.authorization;

    let decodedToken;
    if (sessionCookie) {
      decodedToken = await firebaseAuth.verifySessionCookie(sessionCookie, true);
    } else if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      decodedToken = await firebaseAuth.verifyIdToken(token);
    } else {
      throw AppError.unauthorized('No token provided');
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || null,
    };

    next();
  } catch (err) {
    if (err.isOperational) return next(err);
    next(AppError.unauthorized('Invalid or expired token'));
  }
}
