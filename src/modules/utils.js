import Likes from "./likes/likes";
import Show from "./show/show";

export default async function display(store) {
    const likes = await Likes.store();
    document.querySelector('.content').innerHTML = (await store.shows).map(v => (new Show(v)).render(likes)).join('');

}