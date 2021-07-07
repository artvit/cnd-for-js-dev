const mapToTransferObject = storedQuote => {
  const { isDeleted, ...quote } = storedQuote;
  return {
    ...quote,
    tags: quote.tags?.join(', ') || ''
  };
};

const mapFromTransferObject = quoteData => ({
  ...quoteData,
  tags: quoteData.tags?.split(', ')
});

module.exports = {
  mapToTransferObject,
  mapFromTransferObject
};
