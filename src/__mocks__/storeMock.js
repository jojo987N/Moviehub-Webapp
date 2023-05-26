import data from './dataMock';

export default class Store {
  constructor() {
    this._shows = data;
  }

  get shows() {
    return this._shows;
  }
}