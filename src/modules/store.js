import Likes from './likes/likes.js';
import Show from './show/show.js';

export default class Store {
  constructor() {
    this._shows = fetch('https://api.tvmaze.com/shows');
  }

  get shows() {
    return (async () => (await (await this._shows).json()).slice(0, 6))();
  }

  async display() {
    const likes = await Likes.store();
    document.querySelector('.content').innerHTML = (await this.shows).map((v) => (new Show(v)).render(likes)).join('');
  }
}