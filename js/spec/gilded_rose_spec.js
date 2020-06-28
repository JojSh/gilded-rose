describe('Gilded Rose', () => {

  describe('Item', () => {

    describe('When adding an Item', () => {

      it('The item should be correctly represented in items', () => {
        let items = [ new Item('Elixir of the Mongoose', 5, 7)]
        expect(items[0].name).toEqual('Elixir of the Mongoose');
        expect(items[0].sell_in).toEqual(5);
        expect(items[0].quality).toEqual(7);
      });

    });

  });

  describe('Update Quality', () => {

    describe('When called with a regular item', () => {

      it('Should decrease its Quality as SellIn decreases', () => {
        let items = [ new Item('Elixir of the Mongoose', 5, 7)]
        update_quality(items);
        expect(items[0].name).toEqual('Elixir of the Mongoose');
        expect(items[0].sell_in).toEqual(4);
        expect(items[0].quality).toEqual(6);
      });

      it('Should degrade its Quality twice as fast once the sell by date has passed', () => {
        let items = [ new Item('Elixir of the Mongoose', 0, 10)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(-1);
        expect(items[0].quality).toEqual(8);
      });

      it('Should not reduce Quality below zero', () => {
        let items = [ new Item('Elixir of the Mongoose', 0, 0)]
        update_quality(items);
        expect(items[0].quality).toEqual(0);
      });

    });

    describe('When called with Aged Brie', () => {

      it('Should increase in Quality the older it gets', () => {
        let items = [ new Item('Aged Brie', 2, 0)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(1);
        expect(items[0].quality).toEqual(1);
      });

      it('Should not increase Quality above 50', () => {
        let items = [ new Item('Aged Brie', 2, 50)]
        update_quality(items);
        expect(items[0].quality).toEqual(50);
      });

    });

    describe('When called with the legendary item: Sulfuras, Hand of Ragnaros', () => {

      it('Should not reduce Sell_in beyond 0 as it never has to be sold', () => {
        let items = [ new Item('Sulfuras, Hand of Ragnaros', 0, 80)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(0);
      });

      it('Should not reduce in Quality', () => {
        let items = [ new Item('Sulfuras, Hand of Ragnaros', 10, 80)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(10);
        expect(items[0].quality).toEqual(80);
      });

    });


    describe('When called with the special item: Backstage passes to a TAFKAL80ETC concert', () => {

      it('Should increase in Quality as its SellIn value approaches 0', () => {
        let items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(14);
        expect(items[0].quality).toEqual(21);
      });

      it('Should increase in Quality by 2 when there are 10 or fewer days left', () => {
        let items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 30)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(9);
        expect(items[0].quality).toEqual(32);
      });

      it('Should increase in Quality by 3 when there are 5 or fewer days left', () => {
        let items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(4);
        expect(items[0].quality).toEqual(43);
      });


      it('Should reduce Quality to 0 after the concert', () => {
        let items = [ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(-1);
        expect(items[0].quality).toEqual(0);
      });

    });

    describe('When called with the conjured item: Conjured Mana Cake', () => {

      it('Should degrade twice as fast as regular items', () => {
        let items = [ new Item('Conjured Mana Cake', 3, 6)]
        update_quality(items);
        expect(items[0].sell_in).toEqual(2);
        expect(items[0].quality).toEqual(4);
      });

    });

  });

});
