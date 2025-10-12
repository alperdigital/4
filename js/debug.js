/**
 * Debug utilities for the Matrix App
 */

export function debugLog(message, data = null) {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(`[MatrixApp Debug] ${message}`, data || '');
  }
}

export function debugError(message, error = null) {
  console.error(`[MatrixApp Error] ${message}`, error || '');
}

export function debugWarn(message, data = null) {
  console.warn(`[MatrixApp Warning] ${message}`, data || '');
}

export function checkElementExists(selector, context = '') {
  const element = document.querySelector(selector);
  if (!element) {
    debugError(`Element not found: ${selector}${context ? ` in ${context}` : ''}`);
    return false;
  }
  debugLog(`Element found: ${selector}${context ? ` in ${context}` : ''}`);
  return true;
}

export function checkManagerExists(managerName, app) {
  const manager = app.getManager(managerName);
  if (!manager) {
    debugError(`Manager not found: ${managerName}`);
    return false;
  }
  debugLog(`Manager found: ${managerName}`);
  return true;
}

