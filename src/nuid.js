const prefix = ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const len = prefix.length;

module.exports = {
  next: () => {
    const id = prefix[Math.floor(Math.random() * len)];
    return `${id}${Date.now()}`;
  }
};
