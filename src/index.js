/* eslint-disable arrow-parens */
import './style.scss';
import './style.css';
import Show from './modules/show/show.js';
import Store from './modules/store.js';

(async () => {
  //   const show = new Show({image:'ggg', name:'ggg', language:'ggg4', genre:'ggg', days:'ggg', time:'ggg', likes:'ggg'})
  //   console.log(show.image)
  const store = new Store();

  document.querySelector('.content').innerHTML = (await store.shows).map(v => (new Show(v)).render()).join('');

  // console.log((await store.shows).map(v => new Show(v)))

  // console.log(new Show({a:1, image: 4}))
})();
