import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from '../components/ImagePopup';
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";


function App() {

  // Создание стейтов открытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = useState(false);

  // Создание стейта сохранения/загрузки данных
  const [isRenderLoading, setRenderLoading] = useState(false);


  // Стейты текущего пользователя и карточек
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  // Получение данных текущего пользователя
  useEffect(() => {
    api.getUserInfo()
      .then(result => setCurrentUser(result))
      .catch(error => console.log(error));
  }, []);


  // Получение данных начальных карточек
  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(error => console.log(error));
  }, []);


  function handleCardLike(card) {

    // Проверяем есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((likeCard) => {
        setCards(cardsArray => cardsArray.map(item => item._id === card._id ? likeCard : item));
      })
      .catch(error => console.log(error));
  }


  // Удаление карточки
  function handleCardDelete(card) {
    setRenderLoading(true);

    // Отправляем запрос в API и удаляем карточку
    api.deleteCard(card._id)
      .then(() => {
        setCards(cardsArray => cardsArray.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setRenderLoading(false));
  }


  // Сохранение данных нового пользователя
  function handleUpdateUser(newUserData) {
    setRenderLoading(true);
    api.addUserInfo(newUserData)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => setRenderLoading(false));
  }


  // Обновление аватара
  function handleUpdateAvatar(newAvatar, clearForm) {
    setRenderLoading(true);
    api.updateAvatar(newAvatar)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
        clearForm();
      })
      .catch(error => console.log(error))
      .finally(() => setRenderLoading(false))
  }


  // Добавление карточки
  function handleAddPlaceSubmit(newCard) {
    setRenderLoading(true);
    return new Promise((resolve) => {
      api.addCard(newCard)
        .then(result => {
          setCards([result, ...cards]);
          closeAllPopups();
          resolve();
        })
        .catch(error => console.log(error))
        .finally(() => setRenderLoading(false))
    })
  }


  // Открытие попапа редактирования Аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }


  // Открытие попапа редактирования данных профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }


  // Открытие попапа добавления карточки места
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }


  // Открытие попапа изображения
  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteButtonClick(card) {
    setCardDeletePopupOpen(true);
    setSelectedCard(card);
  }


  // Закрытие попапов
  function closeAllPopups() {
    setRenderLoading(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setCardDeletePopupOpen(false);
  }


  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteButtonClick}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRenderLoading={isRenderLoading}
          closeAllPopups={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          closeAllPopups={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRenderLoading={isRenderLoading}
          closeAllPopups={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRenderLoading={isRenderLoading}
          closeAllPopups={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
          onDeleteCard={handleCardDelete}
          isRenderLoading={isRenderLoading}
          closeAllPopups={closeAllPopups}
        />

      </CurrentUserContext.Provider>

    </div>


  );
}

export default App;
