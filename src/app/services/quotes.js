const QuotesStorage = require('./quotes-storage');

class QuotesService {
  constructor() {
    this.storage = new QuotesStorage();
  }

  getAll() {
    return this.storage.getAll().filter(quote => !quote.isDeleted);
  }

  getById(id) {
    const quote = this.storage.get(id);
    if (quote && !quote.isDeleted) {
      return quote;
    }
  }

  getRandom() {
    const all = this.getAll();
    const idx = Math.floor(all.length * Math.random());
    return all[idx];
  }

  getRandomByTag(tag) {
    const filtered = this.getAll().filter(quote => quote.tags?.includes(tag));
    const idx = Math.floor(filtered.length * Math.random());
    return filtered[idx];
  }

  add(quote) {
    quote.createdAt = new Date();
    quote.updatedAt = new Date();
    return this.storage.add(quote);
  }

  update(id, quote) {
    const storedQuote = this.storage.get(id);
    if (storedQuote) {
      quote.updatedAt = new Date();
      return this.storage.set(id, { ...storedQuote, ...quote });
    }
  }

  remove(id) {
    const quote = this.storage.get(id);
    if (quote) {
      quote.isDeleted = true;
      this.storage.set(id, quote);
      return quote;
    }
  }
}

module.exports = QuotesService;
