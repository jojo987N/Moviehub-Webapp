/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Store from './modules/store.js';
import App from './modules/app.js';
import Likes from './modules/likes/likes.js';
import Like from './modules/like/like.js';
import ItemCounter from './modules/itemsCounter';

(async () => {
  const app = localStorage.getItem('app') || await (new App()).id;
  localStorage.setItem('app', app);
  const store = new Store();
  await store.display();
  console.log(ItemCounter.count())
  document.querySelectorAll('.show').forEach((show, i) => {
    show.querySelector('.like').onclick = () => {
      Likes.add(new Like(i + 1));
      const likes = show.querySelector('.likes-nb');
      likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
    };
  });
})();
