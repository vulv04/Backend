export const generateSKU = () => {
  return "SKU-" + Math.random().toString(36).substr(2, 6).toUpperCase();
};
