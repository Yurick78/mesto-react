import avatar from './images/avatar.jpg';
import './index.css';

function App() {
  return (
    <div className="page">

      <header className="header">
        <a href="#" aria-label="Логотип Mesto Russia" className="header__logo fade-opacity"></a>
      </header>

      <main>

        <section className="profile">
          <div className="profile__avatar-edit">
            <img src={avatar} alt="Аватар" className="profile__avatar" />
            <button type="button" aria-label="Кнопка редактирования Аватара" className="profile__avatar-button"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button type="button" aria-label="Кнопка редактирования профиля"
              className="profile__edit-button fade-opacity"></button>
          </div>
          <p className="profile__about">Исследователь океана</p>
          <button type="button" aria-label="Кнопка добавления карточки" className="profile__add-button fade-opacity"></button>
        </section>

        <section className="cards"></section>

      </main>

      <footer className="footer">&copy; 2022 Карпов Юрий</footer>

      <article className="popup" id="popup-edit">
        <div className="popup__container popup__container_show_form">
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form" name="profileForm" noValidate>
            <input type="text" placeholder="Имя" className="popup__field" id="nameInput" name="name" required minLength="2"
              maxLength="40" />
            <span className="popup__input-error nameInput-error"></span>
            <input type="text" placeholder="О себе" className="popup__field" id="aboutInput" name="about" required
              minLength="2" maxLength="200" />
            <span className="popup__input-error aboutInput-error"></span>
            <button type="submit" aria-label="Кнопка сохранения формы" className="popup__submit-button">Сохранить</button>
          </form>
          <button type="button" aria-label="Кнопка закрытия окна" className="popup__close-button fade-opacity"></button>
        </div>
      </article>

      <article className="popup" id="popup-avatar">
        <div className="popup__container popup__container_show_form">
          <h2 className="popup__title">Обновить аватар</h2>
          <form className="popup__form" name="avatarForm" noValidate>
            <input type="url" placeholder="Ссылка на аватар" className="popup__field" id="avatarInput" name="avatar" required />
            <span className="popup__input-error avatarInput-error"></span>
            <button type="submit" aria-label="Кнопка сохранения формы" className="popup__submit-button">Сохранить</button>
          </form>
          <button type="button" aria-label="Кнопка закрытия окна" className="popup__close-button fade-opacity"></button>
        </div>
      </article>

      <article className="popup" id="popup-add">
        <div className="popup__container popup__container_show_form">
          <h2 className="popup__title">Новое место</h2>
          <form className="popup__form" name="addForm" noValidate>
            <input type="text" placeholder="Название" className="popup__field" id="titleInput" name="name" required
              minLength="2" maxLength="30" />
            <span className="popup__input-error titleInput-error"></span>
            <input type="url" placeholder="Ссылка на картинку" className="popup__field" id="pictureInput" name="link"
              required />
            <span className="popup__input-error pictureInput-error"></span>
            <button type="submit" aria-label="Кнопка сохранения формы" className="popup__submit-button">Создать</button>
          </form>
          <button type="button" aria-label="Кнопка закрытия окна" className="popup__close-button fade-opacity"></button>
        </div>
      </article>

      <article className="popup" id="popup-delete">
        <div className="popup__container popup__container_show_form">
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form" name="deleteForm" noValidate>
            <button type="submit" aria-label="Кнопка подтверждения удаления" className="popup__submit-button">Да</button>
          </form>
          <button type="button" aria-label="Кнопка закрытия окна" className="popup__close-button fade-opacity"></button>
        </div>
      </article>

      <article className="popup popup_overlay_dark" id="popup-image">
        <div className="popup__container popup__container_show_image">
          <img src="#" alt="" className="popup__image" />
          <p className="popup__signature"></p>
          <button type="button" aria-label="Кнопка закрытия окна" className="popup__close-button fade-opacity"></button>
        </div>
      </article>

      <template id="card-template">
        <div className="card">
          <button type="button" aria-label="Иконка мусорного бака" className="card__trash fade-opacity"></button>
          <img src="#" alt="" className="card__picture" />
          <div className="card__info">
            <h2 className="card__title"></h2>
            <div className="card__like-wrapper">
              <button type="button" aria-label="Иконка сердечка" className="card__like-btn"></button>
              <span className="card__like-qty"></span>
            </div>
          </div>
        </div>
      </template>


    </div>


  );
}

export default App;
