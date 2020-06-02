/**
 * @author Kaden Badalian
 *
 * @filename actionTypes.js
 * @date 4/20/20
 */

// Global Actions

export const LOGOUT = 'LOGOUT';

export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const VALIDATE_TOKEN_ERROR = 'VALIDATE_TOKEN_ERROR';
export const TOKEN_VALID = 'TOKEN_VALID';
export const TOKEN_NOT_VALID = 'TOKEN_NOT_VALID';

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const SET_TOKEN = 'SET_TOKEN';

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
