import Animation from './animation/animation.js';
import { DEFAULT_INCREMENT_NB_ITEMS } from './global.js';
import ItemCounter from './itemsCounter.js';
import Like from './like/like.js';
import Likes from './likes/likes.js';
import Show from './show/show.js';

export default async function display(shows, count) {
  const likes = await Likes.store();

  document.querySelector('.content').innerHTML = `${shows.map((v) => (new Show(v)).render(likes)).slice(0, count).join('')}<div class="bt-show-more">
  <div class="container-anim">
    <div id='anim'></div>
  </div>
  <button class="show-more">Show More <span class="nb-items"></span></button>
</div>`;

  const nbItems = document.querySelectorAll('.nb-items');
  [...nbItems].forEach((el) => {
    el.innerHTML = `(<b>${ItemCounter.count()} - ${shows.length}</b>)`;
  });

  document.querySelectorAll('.show').forEach((show) => {
    show.querySelector('.like').onclick = () => {
      Likes.add(new Like(parseInt(show.id, 10)));
      const likes = show.querySelector('.likes-nb');
      likes.innerHTML = parseInt(likes.innerHTML, 10) + 1;
    };
  });
  document.querySelector('.show-more').onclick = async (e) => {
    e.target.remove()
    const animation = new Animation('anim');
    animation.render();
    count += DEFAULT_INCREMENT_NB_ITEMS;
    display(shows, count);

     
  };
}
