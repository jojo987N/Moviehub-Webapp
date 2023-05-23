import './show.scss';

export default class Show {
  constructor({
    id, image, name, language, genres, schedule,
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.schedule = schedule;
  }

  render(likes) {
    return `<div id="${this.id}" class="show">
        <div>
            <img src="${this.image.medium}"/>
        </div>
            <div class="block">
              <span>${this.name}</span>
              <div class="likes">
                  <i class="fa fa-heart-o like" aria-hidden="true"></i>
                  <span><span class="likes-nb">${(likes.find((like) => like.item_id === this.id) || []).likes || 0}</span> likes</span>
              </div>
            </div>
        <div class="buttonContainer">
          <button>Comments</button>
          <button>Reservations</button>
        </div>
    </div> `;
  }
}