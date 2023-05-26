import Store from '../store.js';
import CommentApi from '../comments/commentApi.js';
import Comment from '../comment/comment.js';

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
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    popupContainer.style.backgroundColor = '#333';
    popupContainer.style.position = 'fixed';
    popupContainer.style.top = '50%';
    popupContainer.style.left = '50%';
    popupContainer.style.border = '1px solid #f1f1f1';
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
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');
    popupContainer.appendChild(commentsContainer);
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
    submitButton.addEventListener('click', this.submit.bind(this));

    popupContainer.appendChild(submitButton);

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
    commentsContainer.innerHTML = '';

    const comments = await CommentApi.getComments(this.selectedItem);

    const countComment = await this.commentCounter();
    const countComments = document.createElement('h3');
    countComments.classList.add('totalComment');
    countComments.textContent = `Total Comments ( ${countComment} )`;
    commentsContainer.appendChild(countComments);
    this.commentCounter();

    if (!Array.isArray(comments)) {
      throw new Error('Invalid comments data. Expected an array of comments.');
    }
    const lastThreeComments = comments.slice(-3).reverse();

    lastThreeComments.forEach((comment) => {
      if (!comment.comment || comment.comment.trim() === '') {
        return;
      }
      const commentElement = document.createElement('p');
      commentElement.textContent = `${comment.creation_date}   ${comment.username} :  ${comment.comment}`;
      commentsContainer.appendChild(commentElement);
    });
  }

  async submit() {
    const username = this.nameInput.value;
    const commentText = this.commentTextArea.value;
    if (!username && !commentText) {
      throw new Error('Both value must be entered');
    }
    const comment = new Comment(this.selectedItem, username, commentText);
    await CommentApi.postComment(comment.item_id, comment.username, comment.comment);
    this.displayComments();
    this.nameInput.value = '';
    this.commentTextArea.value = '';
  }
}