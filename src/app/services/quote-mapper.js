const mapToTransferObject = storedQuote => {
  const { isDeleted, ...quote } = storedQuote;
  return quote;
};

module.exports = {
  mapToTransferObject
};
