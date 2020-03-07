const getTime = () => {
  return new Date().toLocaleString().slice(10, 12);
};

module.exports = getTime;
