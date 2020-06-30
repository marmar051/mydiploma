export default class NewsCard {
  constructor(options) {
    this.options = options;
  }

  //Метод создания карточки с новостью
  create(element) {
    const card = document.createElement('div');
    const cardLink = document.createElement('a');
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    const cardContent = document.createElement('div');
    const cardContentInfo = document.createElement('div');
    const cardDate = document.createElement('p');
    const cardTitle = document.createElement('h4');
    const cardSubtitle = document.createElement('p');
    const cardSource = document.createElement('p');

    card.classList.add('news__item');
    cardLink.classList.add('link', 'news__item-link');
    imageContainer.classList.add('news__item-image-container');
    image.classList.add('news__item-image');
    cardContent.classList.add('news__item-content');
    cardContentInfo.classList.add('news__item-contentinfo');
    cardDate.classList.add('date', 'api-block__item-date', 'news__item-date');
    cardTitle.classList.add('headline', 'api-block__item-title', 'news__item-title');
    cardSubtitle.classList.add('api-block__item-text', 'news__item-subtitle');
    cardSource.classList.add('news__item-source');

    cardLink.setAttribute('href', `${element.url}`);
    cardLink.setAttribute('target', '_blank');
    image.setAttribute('alt', 'Image');
    image.setAttribute('src', `${element.urlToImage}`);
    cardDate.textContent = `${this.options.getFormattedDate(element.publishedAt)}`;
    cardTitle.textContent = `${element.title}`;
    cardSubtitle.textContent = `${element.description}`;
    cardSource.textContent = `${element.source.name}`;

    imageContainer.appendChild(image);
    cardContentInfo.appendChild(cardDate);
    cardContentInfo.appendChild(cardTitle);
    cardContentInfo.appendChild(cardSubtitle);
    cardContent.appendChild(cardContentInfo);
    cardContent.appendChild(cardSource);
    cardLink.appendChild(imageContainer);
    cardLink.appendChild(cardContent);
    card.appendChild(cardLink);

    return card;
  }
}
