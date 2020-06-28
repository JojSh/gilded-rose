function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

const specialStock = {
  'Aged Brie': item => ageBrie(item),
  'Sulfuras, Hand of Ragnaros': () => {},
  'Backstage passes to a TAFKAL80ETC concert': item => ageConcertTickets(item),
  'Conjured Mana Cake': item => ageRegular(item, true),
}

function improveOnce(item) {
  if (item.quality < 50) item.quality = item.quality + 1;
}

function degrade(item) {
  degradeOnce(item);
  if (item.sell_in <= 0) degradeOnce(item);
}

function degradeOnce(item) {
  if (item.quality > 0) item.quality = item.quality - 1;
}

function decrementSellIn(item) {
  item.sell_in = item.sell_in - 1;
}

function setQualityToZero(item) {
  item.quality = 0;
}

function ageRegular(item, conjured) {
  degrade(item);
  if (conjured) degradeOnce(item);
  decrementSellIn(item);
}

function ageBrie(item) {
  improveOnce(item);
  decrementSellIn(item);
}

function ageConcertTickets(item) {
  improveOnce(item);
  if (item.sell_in <= 10) improveOnce(item);
  if (item.sell_in <= 5) improveOnce(item);
  if (item.sell_in <= 0) setQualityToZero(item);
  decrementSellIn(item);
}

function update_quality(stock) {
  const stockList = stock || items;
  stockList.forEach(item => {
    const { name } = item;
    !specialStock[name] ? ageRegular(item) : specialStock[name](item);
  });
};

module.exports = {
  Item: Item,
  items: items,
  update_quality: update_quality,
};
