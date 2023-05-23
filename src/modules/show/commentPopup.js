import Store from '../store.js';

export default class CommentPopup {
  constructor(selectedItem) {
    this.selectedItem = selectedItem;
    this.store = new Store();
    this.nameInput = null;
    this.commentTextArea = null;
  }

  async loadPopup() {
    const showDetails = await this.fetchShowDetails();

    if (!showDetails || !showDetails.image || !showDetails.name) {
      throw Error('Failed to fetch show details or show image or name is undefined');
    }
    const {
      name, image, language, genres, schedule,
    } = showDetails;
    if (!name || !image) {
      throw Error('Show name or image is undefined');
    }
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.style.width = '800px';
    popupContainer.style.height = '700px';
    popupContainer.style.backgroundColor = '#d3d3d3';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    popupContainer.style.transform = 'translate(-50%, -50%)';
    popupContainer.style.zIndex = '9999';

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'X';
    popupContainer.appendChild(closeButton);

    const showImage = document.createElement('img');
    showImage.src = image.medium;
    popupContainer.appendChild(showImage);

    const showName = document.createElement('h1');
    showName.textContent = name;
    popupContainer.appendChild(showName);

    const sContent = document.createElement('div');
    sContent.classList.add('s-content');
    const showlanguage = document.createElement('h4');
    showlanguage.textContent = `Language: ${language}`;
    sContent.appendChild(showlanguage);

    const showgenres = document.createElement('h4');
    showgenres.textContent = `Geners: ${genres}`;
    sContent.appendChild(showgenres);

    const showSchedule = document.createElement('h4');
    showSchedule.textContent = `Schedule: ${schedule.days} at ${schedule.time}`;
    sContent.appendChild(showSchedule);
    popupContainer.appendChild(sContent);
    const title = document.createElement('h3');
    title.textContent = 'Add a Comment';
    popupContainer.appendChild(title);
    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Your Name';
    popupContainer.appendChild(this.nameInput);

    this.commentTextArea = document.createElement('textarea');
    this.commentTextArea.placeholder = 'Your Insights';
    popupContainer.appendChild(this.commentTextArea);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Comment';
    popupContainer.appendChild(submitButton);

    document.body.appendChild(popupContainer);
  }

  async fetchShowDetails() {
    try {
      const shows = await this.store.shows;
      const selectedShow = shows.find((show) => Number(show.id) === Number(this.selectedItem));
      if (!selectedShow || !selectedShow.image) {
        throw Error('Failed to fetch show details or show image is undefined');
      }
      return selectedShow;
    } catch (error) {
      throw Error('Error fetching show details:', error);
    }
  }
}