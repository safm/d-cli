const biggerNumber = (num1 = 0, num2 = 0) => {
  return Math.max(num1, num2);
};

const bytesToKb = (bytes, decimal = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimal < 0 ? 0 : decimal;

  return parseFloat((bytes / Math.pow(k, 1)).toFixed(dm));
};

module.exports = {
  biggerNumber,
  bytesToKb
};
