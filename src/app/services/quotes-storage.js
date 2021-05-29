const quotesy = require('quotesy');
const uuid = require('uuid');

const mapFromRawQuote = rawQuote => ({
  author: rawQuote.author,
  text: rawQuote.text,
  source: rawQuote.source,
  tags: rawQuote.tags?.split(', '),
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false
});

class QuotesStorage {
  constructor() {
    this.quotes = quotesy.parse_json().reduce((map, rawQuote) => {
      const id = uuid.v4();
      return map.set(id, {
        ...mapFromRawQuote(rawQuote),
        id
      });
    }, new Map());
  }

  get(id) {
    return this.quotes.get(id);
  }

  getAll() {
    return [...this.quotes.values()];
  }

  add(quote) {
    const id = uuid.v4();
    return this.quotes.set(id, { ...quote, id }).get(id);
  }

  set(id, quote) {
    return this.quotes.set(id, { ...quote, id }).get(id);
  }
}

module.exports = QuotesStorage;
