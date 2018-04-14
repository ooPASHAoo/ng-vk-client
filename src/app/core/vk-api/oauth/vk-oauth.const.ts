/**
 * Window event name
 * @type {string}
 * *
 * May be created in redirect_uri page
 * with result(hashUri with out #) in '.detail' property.
 */
export const OAUTH_EVENT = 'PGOAuthResult';

/**
 * OAuth redirect uri
 * @type {string}
 * *
 * Redirected with result in hashUri.
 * Set in VK-App settings.
 */
export const OAUTH_REDIRECT_URI = 'http://localhost:4200/login/oauth-callback';
