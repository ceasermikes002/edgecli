// Sample buggy authentication file for patch suggestion demo

function authenticateUser(token) {
  console.log('Authenticating user...');
  
  // Bug: No null check before accessing properties
  const decoded = verifyToken(token);
  const userId = decoded.userId; // Will crash if decoded is null
  
  console.log(`User ${userId} authenticated`);
  return userId;
}

function verifyToken(token) {
  if (!token || token === 'invalid') {
    console.error('Invalid token');
    return null; // Returns null but caller doesn't check
  }
  
  // Simulate token decoding
  return {
    userId: 123,
    email: 'user@example.com',
    role: 'admin'
  };
}

// Bug: Missing error handling
function getUserPermissions(userId) {
  const user = findUser(userId);
  return user.permissions; // Crashes if user is undefined
}

function findUser(userId) {
  // Simulate database lookup that might fail
  if (userId === 999) {
    return undefined; // User not found
  }
  return { userId, permissions: ['read', 'write'] };
}

module.exports = {
  authenticateUser,
  getUserPermissions
};
