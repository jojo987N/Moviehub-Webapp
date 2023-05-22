/* eslint-disable no-underscore-dangle */
export default class Store {
  constructor() {
    this._shows = fetch('https://api.tvmaze.com/shows');
  }

  get shows() {
    return (async () => (await (await this._shows).json()).slice(0, 6))();
  }
}