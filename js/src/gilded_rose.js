class Item {
  constructor(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
  }
}

let items = []

const specialStock = {
  'Aged Brie': item => ageBrie(item),
  'Sulfuras, Hand of Ragnaros': () => {},
  'Backstage passes to a TAFKAL80ETC concert': item => ageConcertTickets(item),
}

function improveOnce(item) {
  if (item.quality < 50) item.quality = item.quality + 1
}

function degrade(item) {
  degradeOnce(item)
  if (item.sell_in <= 0) degradeOnce(item)
  decrementSellIn(item)
}

function degradeOnce(item) {
  if (item.quality > 0) item.quality = item.quality - 1
}

function decrementSellIn(item) {
  item.sell_in = item.sell_in - 1
}

function setQualityToZero(item) {
  item.quality = 0
}

function ageBrie(item) {
  improveOnce(item)
  decrementSellIn(item)
}

function ageConcertTickets(item) {
  improveOnce(item)
  if (item.sell_in <= 10) improveOnce(item)
  if (item.sell_in <= 5) improveOnce(item)
  if (item.sell_in <= 0) setQualityToZero(item)
  decrementSellIn(item)
}

function update_quality() {
  items.forEach(item => {
    const { name } = item;
    !specialStock[name] ? degrade(item) : specialStock[name](item);
  })
}
