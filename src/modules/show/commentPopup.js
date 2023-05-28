import Store from '../store.js';
import CommentApi from '../comments/commentApi.js';
import Comment from '../comment/comment.js';
import Anim from '../anim.js';
import Animation from '../animation/animation.js';

export default class CommentPopup {
  constructor(selectedItem) {
    this.selectedItem = selectedItem;
    this.store = new Store();
    this.commentApi = new CommentApi();
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
    document.body.classList.add('no-scroll');
    const backgroundPopup = document.createElement('div');
    backgroundPopup.classList.add('background-popup');
    document.body.appendChild(backgroundPopup);
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    popupContainer.style.backgroundColor = '#333';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    // popupContainer.style.border = '1px solid #f1f1f1';
    // popupContainer.style.transform = 'translate(-50%, -50%)';
    popupContainer.style.zIndex = '9999';

    const closeButton = document.createElement('span');

    closeButton.innerHTML = '<i class="fa fa-window-close close-button" aria-hidden="true"></i>';

    popupContainer.appendChild(closeButton);

    const showImage = document.createElement('img');
    showImage.src = image.original;
    popupContainer.appendChild(showImage);

    const showName = document.createElement('h1');
    showName.textContent = name;
    popupContainer.appendChild(showName);

    const sContent = document.createElement('div');
    sContent.classList.add('s-content');
    const showlanguage = document.createElement('p');
    showlanguage.classList.add('language');
    showlanguage.innerHTML = `<h4>Language</h4> ${language}`;
    sContent.appendChild(showlanguage);

    const showgenres = document.createElement('p');
    showgenres.classList.add('genres');
    showgenres.innerHTML = `<h4>Genres</h4> ${genres.join(', ')}`;
    sContent.appendChild(showgenres);

    const showSchedule = document.createElement('p');
    showSchedule.innerHTML = `<h4>Schedule</h4> ${schedule.days} at ${schedule.time}`;
    showSchedule.classList.add('schedule');
    sContent.appendChild(showSchedule);
    popupContainer.appendChild(sContent);
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    popupContainer.appendChild(commentsContainer);
    const title = document.createElement('h3');
    title.classList.add('add-comment');
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
    submitButton.addEventListener('click', this.submit.bind(this));

    const buttonContainer = document.createElement('div');

    buttonContainer.classList.add('button-container');

    buttonContainer.insertAdjacentHTML('beforeend', Anim.render('pending-comment'));

    buttonContainer.appendChild(submitButton);

    popupContainer.appendChild(buttonContainer);

    document.body.appendChild(popupContainer);

    this.displayComments();
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

  commentCounter = async () => {
    const comments = await CommentApi.getComments(this.selectedItem);

    const nonEmptyComments = comments.filter((comment) => comment.comment && comment.comment.trim() !== '');

    const countComment = nonEmptyComments.length;
    return countComment;
  }

  displayComments = async () => {
    const commentsContainer = document.querySelector('.comments-container');
    const comments = await CommentApi.getComments(this.selectedItem);
    const countComment = comments.length;
    const countComments = document.createElement('h3');
    countComments.classList.add('totalComment');
    countComments.textContent = `Total Comments ( ${countComment} )`;
    commentsContainer.appendChild(countComments);

    if (!Array.isArray(comments)) {
      throw new Error('Invalid comments data. Expected an array of comments.');
    }
    commentsContainer.innerHTML = `<h3 class="totalComment">Total Comments ( ${countComment} )</h3>${comments.map((comment) => `<p><span class="date-comment">${comment.creation_date}</span>   <span class="username">${comment.username}</span>   <span class="comment-msg">${comment.comment}</span></p><hr/>`).join('')}`;
  }

  async submit() {
    document.querySelector('.submit-button').classList.add('hide');
    document.querySelectorAll('.container-anim')[1].classList.remove('hide');
    document.querySelectorAll('.container-anim')[1].innerHTML = '<div id="pending-comment"></div>';

    const animation = new Animation('pending-comment');

    animation.render();

    const username = this.nameInput.value;
    const commentText = this.commentTextArea.value;
    if (!username && !commentText) {
      return;
    }
    const comment = new Comment(this.selectedItem, username, commentText);
    await CommentApi.postComment(comment.item_id, comment.username, comment.comment);
    await this.displayComments();
    animation.remove();
    document.querySelector('.submit-button').classList.remove('hide');
    this.nameInput.value = '';
    this.commentTextArea.value = '';
  }
}