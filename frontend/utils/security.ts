/**
 * Security Utility Helpers for TerraSync AI+
 * Provides client-side defense in depth including input sanitization, 
 * secure local storage management, and SHA-256 cryptographic hashing.
 */

// Simple client-side XSS sanitizer
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Simulated client-side CSRF Token generator for forms
export function generateCsrfToken(): string {
  const array = new Uint8Array(16);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  }
  return Array.from(array, (dec) => dec.toString(16).padStart(2, '0')).join('');
}

// Validate password strength (requires length >= 8, uppercase, lowercase, number, and special character)
export function validatePassword(password: string): { isValid: boolean; feedback: string } {
  if (password.length < 8) {
    return { isValid: false, feedback: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, feedback: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, feedback: 'Password must contain at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, feedback: 'Password must contain at least one number.' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, feedback: 'Password must contain at least one special character.' };
  }
  return { isValid: true, feedback: 'Strong password.' };
}

// Backend validation that the received password hash is a valid SHA-256 hex string or fallback format
export function isValidPasswordHash(hash: string): boolean {
  if (typeof hash !== 'string') return false;
  return /^[0-9a-f]{64}$/.test(hash) || /^fallback_[0-9a-f]+$/.test(hash);
}


// Client-side secure SHA-256 Password hashing using Web Crypto API (with support for Node.js test contexts via globalThis)
export async function hashPassword(password: string): Promise<string> {
  const cryptoObj = typeof window !== 'undefined' && window.crypto
    ? window.crypto
    : (typeof globalThis !== 'undefined' && (globalThis as any).crypto
        ? (globalThis as any).crypto
        : null);

  if (!cryptoObj || !cryptoObj.subtle) {
    // Fallback for non-browser/legacy environments using simple character hashing
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }

  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await cryptoObj.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

