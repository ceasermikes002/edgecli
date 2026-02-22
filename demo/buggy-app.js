// Buggy demo application that generates realistic errors
const express = require('express');

// Simulate a buggy authentication function
function authenticateUser(token) {
  console.log('[INFO] Authenticating user...');
  
  if (!token) {
    console.error('[ERROR] JWT token validation failed - invalid signature');
    return null;
  }
  
  // Bug: Missing null check causes cascading errors
  const decoded = verifyToken(token);
  console.log(`[INFO] User authenticated: ${decoded.userId}`);
  return decoded;
}

function verifyToken(token) {
  if (token === 'invalid') {
    console.error('[ERROR] Token verification failed - signature mismatch');
    return null; // Bug: returns null but caller doesn't check
  }
  return { userId: 123, email: 'user@example.com' };
}

// Simulate database connection issues
function connectDatabase() {
  console.log('[INFO] Connecting to database...');
  setTimeout(() => {
    console.error('[ERROR] Database connection timeout after 5000ms');
    console.error('[ERROR] Failed to connect to mongodb://localhost:27017');
  }, 1000);
}

// Simulate memory warnings
function checkMemory() {
  setInterval(() => {
    console.warn('[WARN] Memory usage at 87%');
    console.warn('[WARN] Consider increasing heap size');
  }, 3000);
}

// Simulate API errors
function fetchUserData(userId) {
  console.log(`[INFO] Fetching user data for ID: ${userId}`);
  setTimeout(() => {
    console.error('[ERROR] Failed to fetch user data - 500 Internal Server Error');
    console.error('[ERROR] Upstream service unavailable');
  }, 2000);
}

// Main execution
console.log('[INFO] Starting application...');
console.log('[INFO] Environment: development');

connectDatabase();
checkMemory();

// Trigger authentication errors
setTimeout(() => {
  authenticateUser('invalid');
}, 500);

setTimeout(() => {
  authenticateUser(null);
}, 1500);

setTimeout(() => {
  fetchUserData(123);
}, 2500);

// Simulate null pointer errors
setTimeout(() => {
  try {
    const user = null;
    console.log(user.id); // This will throw
  } catch (error) {
    console.error('[ERROR] Null pointer exception in auth.js:42');
    console.error('[ERROR] Cannot read property "id" of undefined');
  }
}, 3500);

// Keep the app running
setInterval(() => {
  console.log('[INFO] Heartbeat - app running');
}, 10000);
