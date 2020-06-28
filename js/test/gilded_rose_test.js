const { Item, update_quality } = require("../src/gilded_rose.js");
const { expect } = require('chai');

describe('Gilded Rose', () => {

    describe('Item', () => {
  
      describe('When adding an Item', () => {
  
        it('The item should be correctly represented in stock', () => {
          let stock = [ new Item('Elixir of the Mongoose', 5, 7)]
          expect(stock[0].name).to.equal('Elixir of the Mongoose');
          expect(stock[0].sell_in).to.equal(5);
          expect(stock[0].quality).to.equal(7);
        });
  
      });
  
    });
  
    describe('Update Quality', () => {
  
      describe('When called with a regular item', () => {
  
        it('Should decrease its Quality as SellIn decreases', () => {
          let stock = [ new Item('Elixir of the Mongoose', 5, 7)]
          update_quality(stock);
          expect(stock[0].name).to.equal('Elixir of the Mongoose');
          expect(stock[0].sell_in).to.equal(4);
          expect(stock[0].quality).to.equal(6);
        });
  
        it('Should degrade its Quality twice as fast once the sell by date has passed', () => {
          let stock = [ new Item('Elixir of the Mongoose', 0, 10)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(-1);
          expect(stock[0].quality).to.equal(8);
        });
  
        it('Should not reduce Quality below zero', () => {
          let stock = [ new Item('Elixir of the Mongoose', 0, 0)]
          update_quality(stock);
          expect(stock[0].quality).to.equal(0);
        });
  
      });
  
      describe('When called with Aged Brie', () => {
  
        it('Should increase in Quality the older it gets', () => {
          let stock = [ new Item('Aged Brie', 2, 0)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(1);
          expect(stock[0].quality).to.equal(1);
        });
  
        it('Should not increase Quality above 50', () => {
          let stock = [ new Item('Aged Brie', 2, 50)]
          update_quality(stock);
          expect(stock[0].quality).to.equal(50);
        });
  
      });
  
      describe('When called with the legendary item: Sulfuras, Hand of Ragnaros', () => {
  
        it('Should not reduce Sell_in beyond 0 as it never has to be sold', () => {
          let stock = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(0);
        });
  
        it('Should not reduce in Quality', () => {
          let stock = [ new Item('Sulfuras, Hand of Ragnaros', 10, 80)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(10);
          expect(stock[0].quality).to.equal(80);
        });
  
      });
  
  
      describe('When called with the special item: Backstage passes to a TAFKAL80ETC concert', () => {
  
        it('Should increase in Quality as its SellIn value approaches 0', () => {
          let stock = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(14);
          expect(stock[0].quality).to.equal(21);
        });
  
        it('Should increase in Quality by 2 when there are 10 or fewer days left', () => {
          let stock = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(9);
          expect(stock[0].quality).to.equal(32);
        });
  
        it('Should increase in Quality by 3 when there are 5 or fewer days left', () => {
          let stock = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(4);
          expect(stock[0].quality).to.equal(43);
        });
  
  
        it('Should reduce Quality to 0 after the concert', () => {
          let stock = [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(-1);
          expect(stock[0].quality).to.equal(0);
        });
  
      });
  
      describe('When called with the conjured item: Conjured Mana Cake', () => {
  
        it('Should degrade twice as fast as regular stock', () => {
          let stock = [ new Item('Conjured Mana Cake', 3, 6)]
          update_quality(stock);
          expect(stock[0].sell_in).to.equal(2);
          expect(stock[0].quality).to.equal(4);
        });
  
      });
  
    });
  
  });
  