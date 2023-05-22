import './show.scss';

export default class Show {
  constructor({
    image, name, language, genres, schedule,
  }) {
    this.image = image;
    this.name = name;
    this.language = language;
    this.genres = genres;
    this.schedule = schedule;
  }

  render() {
    return `<div>
        <div>
            <img src="${this.image.medium}"/>
        </div>
            <div class="block">
              <span>${this.name}</span>
              <div class="likes">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  <span>5 likes</span>
              </div>
            </div>
        <div class="buttonContainer">
          <button>Comments</button>
          <button>Reservations</button>
        </div>
    </div> `;
  }
}