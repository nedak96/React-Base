/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/20/20
 */

// Global Actions

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const CHECK_SESSION = 'CHECK_SESSION';
export const CHECK_SESSION_ERROR = 'CHECK_SESSION_ERROR';
export const SESSION_FOUND = 'SESSION_FOUND';
export const SESSION_NOT_FOUND = 'SESSION_NOT_FOUND';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

// Sign In Actions

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_ERROR = 'AUTHENTICATE_USER_ERROR';

export const SET_EMAIL_PASS_ERROR = 'SET_EMAIL_PASS_ERROR';

export const CLEAN_SIGN_IN = 'CLEAN_SIGN_IN';

// Sign Up Actions

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';

export const CLEAN_SIGN_UP = 'CLEAN_SIGN_UP';
