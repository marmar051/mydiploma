export default class CommitCard {
  constructor(options) {
    this.options = options;
  }
  //Метод создания комиита
  create(element) {
    return `
      <div class="commits__slide swiper-slide">
        <p class="api-block__item-date commits__date">${this.options.getFormattedDate(element.commit.committer.date)}</p>
        <div class="commits__author">
          <img class="commits__author-photo" alt="Photo" src="${element.author.avatar_url}">
          <div class="commits__author-data">
            <h4 class="headline api-block__item-title commits__author-name">${element.commit.committer.name}</h4>
            <a class="link commits__author-email" href="mailto:${element.commit.committer.email}">${element.commit.committer.email}</a>
          </div>
        </div>
        <p class="api-block__item-text commits__text">${element.commit.message}</p>
      </div>
    `;
  }
}


