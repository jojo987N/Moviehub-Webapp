import URL_BASE from './global.js';

export default class App {
  constructor() {
    this._id = fetch(`${URL_BASE}apps/`, {
      method: 'POST',
    });
  }

  get id() {
    return (async () => (await (await this._id).text()))();
  }
}