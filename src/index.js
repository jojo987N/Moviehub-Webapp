/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Show from './modules/show/show.js';
import Store from './modules/store.js';
import App from './modules/app.js';
import Likes from './modules/likes/likes.js';
import init from './modules/utils';

(async () => {
  const app = localStorage.getItem('app') || await (new App()).id;
  localStorage.setItem('app', app);
  await init();
  const likes = await Likes.store();
  const store = new Store();
  document.querySelector('.content').innerHTML = (await store.shows).map(v => (new Show(v)).render(likes)).join('');
})();
