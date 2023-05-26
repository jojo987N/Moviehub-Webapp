import { DEFAULT_INCREMENT_NB_ITEMS } from '../modules/global.js';
import Show from '../modules/show/show.js';
import { likes } from './dataMock.js';

export default function display(shows, count) {
  document.querySelector('.content').innerHTML = `${shows.map((v) => (new Show(v)).render(likes)).slice(0, count).join('')}<div class="bt-show-more">
    <button class="show-more">Show More <span class="nb-items"></span></button>
  </div>`;

  const nbItems = document.querySelectorAll('.nb-items');
  [...nbItems].forEach((el) => {
    el.innerHTML = `(<b>${count} - ${shows.length}</b>)`;
  });

  document.querySelector('.show-more').onclick = () => {
    count += DEFAULT_INCREMENT_NB_ITEMS;

    display(shows, count);
  };
}