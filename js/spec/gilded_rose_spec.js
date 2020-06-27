describe('Gilded Rose', () => {

  describe('Item', () => {

    describe('When adding an Item', () => {

      it('The item should be correctly represented in items', () => {
        items = [ new Item('Elixir of the Mongoose', 5, 7)]
        expect(items[0].name).toEqual('Elixir of the Mongoose');
        expect(items[0].sell_in).toEqual(5);
        expect(items[0].quality).toEqual(7);
      });

    });

  });

  describe('Update Quality', () => {

    describe('When called for a regular item', () => {

      it('Should decrease its Quality as SellIn decreases', () => {
        items = [ new Item('Elixir of the Mongoose', 5, 7)]
        update_quality();
        expect(items[0].name).toEqual('Elixir of the Mongoose');
        expect(items[0].sell_in).toEqual(4);
        expect(items[0].quality).toEqual(6);
      });

      it('Should degrade its Quality twice as fast once the sell by date has passed', () => {
        items = [ new Item('Elixir of the Mongoose', 0, 10)]
        update_quality();
        expect(items[0].sell_in).toEqual(-1);
        expect(items[0].quality).toEqual(8);
      });

      it('Should not reduce quality below zero', () => {
        items = [ new Item('Elixir of the Mongoose', 0, 0)]
        update_quality();
        expect(items[0].quality).toEqual(0); // to not equal - 1 ?
      });

    });

    describe('When called for Aged Brie', () => {

      it('Should increase in Quality the older it gets', () => {
        items = [ new Item('Aged Brie', 2, 0)]
        update_quality();
        expect(items[0].sell_in).toEqual(1);
        expect(items[0].quality).toEqual(1);
      });

      it('Should not increase quality above 50', () => {
        items = [ new Item('Aged Brie', 2, 50)]
        update_quality();
        expect(items[0].quality).toEqual(50);
      });

    });

    describe('When called for the legendary item: Backstage passes to a TAFKAL80ETC concert ', () => {

      it('Should not reduce Sell_in beyond 0 as it never has to be sold', () => {
        items = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80)]
        update_quality();
        expect(items[0].sell_in).toEqual(0);
      });

      it('Should increase in Quality as its SellIn value approaches;', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]
        update_quality();
        expect(items[0].sell_in).toEqual(14);
        expect(items[0].quality).toEqual(21);
      });

      it('Should increase in Quality by 2 when there are fewer than 10 days left', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]
        update_quality();
        expect(items[0].sell_in).toEqual(9);
        expect(items[0].quality).toEqual(32);
      });

      it('Should increase in Quality by 3 when there are fewer than 5 days left', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]
        update_quality();
        expect(items[0].sell_in).toEqual(4);
        expect(items[0].quality).toEqual(43);
      });


      it('Reduce Quality to 0 after the concert', () => {
        items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]
        update_quality();
        expect(items[0].sell_in).toEqual(-1);
        expect(items[0].quality).toEqual(0);
      });

    });

    describe('When called for the conjured item: Conjured Mana Cake', () => {

      it('Should degrade twice as fast as regular items', () => {
        items = [ new Item('Conjured Mana Cake', 3, 6)]
        update_quality();
        expect(items[0].sell_in).toEqual(2);
        expect(items[0].quality).toEqual(4);
      });

    });

  });

});
