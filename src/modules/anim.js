export default class Anim {
    static render = (type, button) => `<div class="bt-show-more">
    <div class="container-anim">
      <div id='${type}'></div>
    </div>
    ${button || ''}
  </div>`
}