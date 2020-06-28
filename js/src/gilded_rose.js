function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

const MAX_QUALITY = 50
const MIN_QUALITY = 0

const FEW_DAYS_TO_CONCERT = 10
const FEWER_DAYS_TO_CONCERT = 5

const specialStockAgers = {
  'Aged Brie': item => ageBrie(item),
  'Sulfuras, Hand of Ragnaros': () => {},
  'Backstage passes to a TAFKAL80ETC concert': item => ageConcertTickets(item),
  'Conjured Mana Cake': item => ageRegular(item, true),
}

function improveOnce(item) {
  if (item.quality < MAX_QUALITY) item.quality = item.quality + 1;
}

function degrade(item) {
  degradeOnce(item);
  if (item.sell_in <= MIN_QUALITY) degradeOnce(item);
}

function degradeOnce(item) {
  if (item.quality > MIN_QUALITY) item.quality = item.quality - 1;
}

function decrementSellIn(item) {
  item.sell_in = item.sell_in - 1;
}

function setQualityToMin(item) {
  item.quality = MIN_QUALITY;
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
  if (item.sell_in <= FEW_DAYS_TO_CONCERT) improveOnce(item);
  if (item.sell_in <= FEWER_DAYS_TO_CONCERT) improveOnce(item);
  if (item.sell_in <= MIN_QUALITY) setQualityToMin(item);
  decrementSellIn(item);
}

function update_quality() {
  items.forEach(item => {
    const ageSpecial = specialStockAgers[item.name];
    ageSpecial ? ageSpecial(item) : ageRegular(item);
  });
};
