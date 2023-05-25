import URL_BASE from '../global.js';

export default class Likes {
    static add = (like) => fetch(`${URL_BASE}apps/${localStorage.getItem('app')}/likes/`, {
      method: 'POST',
      body: JSON.stringify(like),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    static store() {
      return (async () => (await fetch(`${URL_BASE}apps/${localStorage.getItem('app')}/likes/`)).json().catch(() => []))();
    }
}