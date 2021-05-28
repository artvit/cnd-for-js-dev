const quotesy = require('quotesy');

const mapFromRawQuote = rawQuote => ({
  author: rawQuote.author,
  text: rawQuote.text,
  source: rawQuote.source,
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false
});

class QuotesStorage {
  constructor() {
    this.quotes = quotesy.parse_json().reduce((map, rawQuote, index) => map.set(index, {
      ...mapFromRawQuote(rawQuote),
      id: index
    }), new Map());
    this.nextIndex = this.quotes.size;
  }

  get(id) {
    return this.quotes.get(id);
  }

  getAll() {
    return [...this.quotes.values()];
  }

  add(quote) {
    const id = this.nextIndex++;
    return this.quotes.set(id, { ...quote, id }).get(id);
  }

  set(id, quote) {
    return this.quotes.set(id, { ...quote, id }).get(id);
  }
}

module.exports = QuotesStorage;
