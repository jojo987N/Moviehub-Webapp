export default class ItemCounter {
  static count() {
    return document.querySelectorAll('.show').length;
  }
}