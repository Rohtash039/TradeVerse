import { firebaseAuth } from '../config/firebase.js';
import env from '../config/env.js';
import User from '../models/User.js';
import Watchlist from '../models/Watchlist.js';
import { success } from '../utils/apiResponse.js';
import { DEFAULT_BALANCE } from '../utils/constants.js';
const getSessionCookieOptions = () => ({
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: env.COOKIE_SAME_SITE,
  maxAge: env.SESSION_COOKIE_EXPIRES_MS,
  path: '/',
});

/**
 * POST /api/auth/session — Exchange Firebase ID token for HttpOnly session cookie
 */
export async function createSession(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ success: false, error: { message: 'Firebase ID token is required.' } });
    }

    const sessionCookie = await firebaseAuth.createSessionCookie(idToken, {
      expiresIn: env.SESSION_COOKIE_EXPIRES_MS,
    });

    res.cookie(env.SESSION_COOKIE_NAME, sessionCookie, getSessionCookieOptions());
    return success(res, {}, 'Session created');
  } catch (err) { next(err); }
}

/**
 * POST /api/auth/logout — Clear HttpOnly session cookie
 */
export async function logout(req, res, next) {
  try {
    res.clearCookie(env.SESSION_COOKIE_NAME, getSessionCookieOptions());
    return success(res, {}, 'Logged out');
  } catch (err) { next(err); }
}

/**
 * POST /api/auth/sync — Create or sync user on login
 */
export async function syncUser(req, res, next) {
  try {
    const { uid, email, name } = req.user;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email,
        displayName: name || email.split('@')[0],
        balance: DEFAULT_BALANCE,
      });
      // Create default watchlist
      await Watchlist.create({ userId: user._id });
    }

    return success(res, { user: { id: user._id, email: user.email, displayName: user.displayName, balance: user.balance, settings: user.settings } });
  } catch (err) { next(err); }
}

/**
 * GET /api/auth/me — Get current user
 */
export async function getMe(req, res, next) {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) return res.status(404).json({ success: false, error: { message: 'User not found. Please sync first.' } });
    return success(res, { user: { id: user._id, email: user.email, displayName: user.displayName, balance: user.balance, lockedBalance: user.lockedBalance, settings: user.settings } });
  } catch (err) { next(err); }
}


