class WhereClause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }

  //Search feature
  search() {
    const searchWord = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,
            $options: "i", //case insensitive
          },
        }
      : {};

    this.base = this.base.find({ ...searchWord });

    return this;
  }

  //Pagination Feature
  pagination(limitValue) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    let skipValue = limitValue * (currentPage - 1);

    this.base = this.base.limit(limitValue).skip(skipValue);
    return this;
  }

  //Filter Feature
  filter() {
    const copyQ = { ...this.bigQ };
    //Remove these fields
    delete copyQ.search;
    delete copyQ.limit;
    delete copyQ.page;

    //Convert to string
    let copyQString = JSON.stringify(copyQ);
    copyQString = copyQString.replace(/\b(gte|lte|gt|lt)\b/g, (m) => `$${m}`); //adding "$" to queries for mongodb
    const jsonCopyQ = JSON.parse(copyQString);

    this.base = this.base.find(jsonCopyQ);
    return this;
  }
}

module.exports = WhereClause;
