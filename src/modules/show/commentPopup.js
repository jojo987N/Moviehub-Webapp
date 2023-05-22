export default class CommentPopup {
  constructor(selectedItem) {
    this.selectedItem = selectedItem;
    this.nameInput = null;
    this.commentTextArea = null;
  }

  async loadPopup() {
    const showDetails = await this.fetchShowDetails();
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('pop-container');
    const showName = document.createElement('h3');
    showName.textContent = showDetails.name;
    popupContainer.appendChild(showName);
    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.placeholder = 'Your Name';
    popupContainer.appendChild(this.nameInput);
    
  }

  async fetchShowDetails() {
    const response = await fetch(`https://api.tvmaze.com/shows/${this.selectedItem}`);
    const showDetails = response.json();
    return showDetails;
  }
}