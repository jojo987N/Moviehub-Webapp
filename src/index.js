/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Show from './modules/show/show.js';
import Store from './modules/store.js';

(async () => {
  const store = new Store();
  document.querySelector('.content').innerHTML = (await store.shows).map(v => (new Show(v)).render()).join('');
})();
