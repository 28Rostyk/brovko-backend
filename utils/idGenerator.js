const { customAlphabet } = require("nanoid");

const idGenerator = (symbolsQuantity, firstLetter) => {
  const alphabet = "1234567890";
  const generator = customAlphabet(alphabet, symbolsQuantity);

  if (!firstLetter) {
    return generator();
  }

  return `${firstLetter}${generator()}`;
};

module.exports = { idGenerator };
