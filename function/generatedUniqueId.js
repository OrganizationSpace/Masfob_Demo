// generateUniqueId.js
function generateUniqueId() {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

  
  module.exports = generateUniqueId;
  