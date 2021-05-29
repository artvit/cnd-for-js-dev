const QuotesStorage = require('./quotes-storage');
const { mapToTransferObject } = require('./quote-mapper');

class QuotesService {
  constructor() {
    this.storage = new QuotesStorage();
  }

  getAll() {
    return this.storage.getAll().filter(quote => !quote.isDeleted).map(mapToTransferObject);
  }

  getById(id) {
    const quote = this.storage.get(id);
    if (quote && !quote.isDeleted) {
      return mapToTransferObject(quote);
    }
  }

  getRandom() {
    const all = this.getAll();
    const idx = Math.floor(all.length * Math.random());
    return all[idx] && mapToTransferObject(all[idx]);
  }

  getRandomByTag(tag) {
    const filtered = this.getAll().filter(quote => quote.tags?.includes(tag));
    const idx = Math.floor(filtered.length * Math.random());
    return filtered[idx] && mapToTransferObject(filtered[idx]);
  }

  add(quote) {
    quote.createdAt = new Date();
    quote.updatedAt = new Date();
    return mapToTransferObject(this.storage.add(quote));
  }

  update(id, quote) {
    const storedQuote = this.storage.get(id);
    if (storedQuote && !storedQuote.isDeleted) {
      quote.updatedAt = new Date();
      return mapToTransferObject(this.storage.set(id, { ...storedQuote, ...quote }));
    }
  }

  remove(id) {
    const quote = this.storage.get(id);
    if (quote && !quote.isDeleted) {
      quote.isDeleted = true;
      this.storage.set(id, quote);
      return mapToTransferObject(quote);
    }
  }
}

module.exports = QuotesService;
