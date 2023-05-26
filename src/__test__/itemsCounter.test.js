import data from '../__mocks__/dataMock.js';
import '../__mocks__/indexMock.js';
import display from '../__mocks__/utilsMock.js';
import { DEFAULT_INCREMENT_NB_ITEMS, DEFAULT_NB_ITEMS } from '../modules/global.js';
import ItemCounter from '../modules/itemsCounter.js';

describe('Tests for items counter ', () => {
  it('Check if the number of items is equal to default display number on page load ', () => {
    const numberItems = ItemCounter.count();
    expect(numberItems).toBe(DEFAULT_NB_ITEMS);
  });

  it('Check if the number of items is equal to default display number plus default increment number when click on show more button', () => {
    document.querySelector('.show-more').click();
    const numberItemsAdded = DEFAULT_INCREMENT_NB_ITEMS;
    const numberItems = ItemCounter.count();
    expect(numberItems).toBe(DEFAULT_NB_ITEMS + numberItemsAdded);
  });

  it('Check if the number of items is equal to default display number plus n times default increment number when click n times on show more button', () => {
    display(data, DEFAULT_NB_ITEMS);
    let numberItemsAdded = 0;
    [...Array(5).keys()].map((i) => i + 1).forEach(() => {
      document.querySelector('.show-more').click();
      numberItemsAdded += DEFAULT_INCREMENT_NB_ITEMS;
    });

    const numberItems = ItemCounter.count();
    expect(numberItems).toBe(DEFAULT_NB_ITEMS + numberItemsAdded);
  });
});
