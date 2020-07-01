export default class SearchInput {
  constructor(options) {
    this.options = options;
  }

  //Функция ожидания загрузки информации новостей
  _renderLoading(isLoading, block) {
    if(isLoading) {
      block.classList.add('news__find_is-visible');
    } else {
      block.classList.remove('news__find_is-visible');
    }
  }

  //Функция проверки на валидность поля ввода
  _checkInputValidity(elementInput, elementError) {
    if (elementInput.validity.tooShort) {
      elementError.classList.remove('lead__search-error-message_type_inactive');
      elementError.textContent = this.options.validationWords.validationInput;
      return;
    }
    this._resetError(elementError);
    return;
  }

  //Функция установки валидности поля
  _setSubmitButtonState(elementForm, elementButton) {
    if (!elementForm.checkValidity()) {
      elementButton.setAttribute('disabled', true);
      elementButton.classList.remove('lead__button_type_active');
    } else {
      elementButton.removeAttribute('disabled');
      elementButton.classList.add('lead__button_type_active');
    }
  }

  //Функция сброса ошибки
  _resetError(element) {
    element.classList.add('lead__search-error-message_type_inactive');
    element.textContent = '';
  }

  //Метод отрисовки первоначального блока новостей
  renderStartNews() {
    this.options.newsError.classList.remove('news__error_is-visible');//отключение блока ошибки получения данных
    this.options.newsOut.classList.remove('news__out_is-visible');//отключение блока "ничего не найдено"
    this.options.newsData.classList.remove('news__data_is-visible');//скрытие найденных предыдущих новостей
    this.options.newsButton.classList.remove('news__button_is-invisible');//включение кнопки доп новостей
    
    //очистка контейнера с предыдущими найденными новостями
    while (this.options.newsContainer.firstChild) {
      this.options.newsContainer.removeChild(this.options.newsContainer.firstChild);
      
    }
    document.querySelector('.lead__button').setAttribute('disabled', true);
    document.querySelector('.lead__button').classList.remove('lead__button_type_active');
    //включение прелоудера
    this._renderLoading(true, this.options.newsFind);
    //запись новостей в локальное хранилище с дальнейшими действиями
    this.options.dataStorage.saveStorage(this.options.themeInput)
     .then((newsItemsArray) => {
      //Проверка наличия новостей
      if (newsItemsArray.length === 0) {
        this._renderLoading(false, this.options.newsFind);//отключение прелоудера
        this.options.newsOut.classList.add('news__out_is-visible');//включение блока "ничего не найдено"
      } else {
        const maxCountNewsInBlock = 3;
        const newsBlock = this.options.newsCardList.createNewsContainer();//Создание первого блока новостей
        this.options.newsContainer.appendChild(newsBlock);//добавление первого блока в контейнер
        this._renderLoading(false, this.options.newsFind);//отключение прелоудера
        const len = newsItemsArray.length < maxCountNewsInBlock ? newsItemsArray.length : maxCountNewsInBlock;//переменная для опредления длины массива новостей
        //рендеринг первых трех новостей
        for (let i = 0; i < len; i += 1) {
          newsItemsArray[i].urlToImage === null ? newsItemsArray[i].urlToImage = "./images/favicon.png" : newsItemsArray[i].urlToImage;
          this.options.renderNews(this.options.newsCardList, newsBlock, this.options.newsCard, newsItemsArray, i);
          this._setSubmitButtonState(this.options.formSearch, this.options.searchButton);
        };
        this.options.newsData.classList.add('news__data_is-visible');//показ первого блока новостей
        //Если новостей < 3 - дальнейшие действия
        if(newsItemsArray.length <= maxCountNewsInBlock) {
          this.options.newsButton.classList.add('news__button_is-invisible');//скрытие кнопки с доп новостями
        }
      }
    })
    .catch((err) => {
      this._renderLoading(false, this.options.newsFind);//выключение прелоудера
      this.options.newsError.classList.add('news__error_is-visible');//включение блока с ошибкой получения данных
      console.log(`Ошибка ${err}`);
    });
  }

  //Метод установки слушателей
  setEventListeners() {
    this.options.formSearch.addEventListener('input', (event) => {
      this._checkInputValidity(event.target, this.options.errorMessage);
      this._setSubmitButtonState(this.options.formSearch, this.options.searchButton);
    });
  }
}
