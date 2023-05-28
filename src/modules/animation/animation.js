import './animation.scss';
import lottie from 'lottie-web';
import animationData from '../../asset/loading.json';

export default class Animation {
  constructor(type) {
    this.container = document.getElementById(type);
  }

  render() {
    lottie.loadAnimation({
      container: this.container,
      renderer: 'svg',
      animationData,
    });
  }

  remove() {
    this.container.parentElement.classList.add('hide');
    document.querySelector('footer').classList.remove('hide');
    document.querySelector('.content').classList.remove('hide');
  }
}