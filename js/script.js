'use strict';
//Скрипт начинает работать только после полной загрузки страницы
document.addEventListener('DOMContentLoaded', () => {

    const advertisement = document.querySelectorAll('.promo__adv img'),
    genre = document.querySelector('.promo__genre'),
    poster = document.querySelector('.promo__bg'),
    movieList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = document.querySelector('.adding__input'),
    checkbox = document.querySelector('[type="checkbox"]');

// Массив фильмов для нового списка
const movieDB = {
  movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Армагеддон",
      "Скотт Пилигрим против..."
  ]
};

//Добавляем фильмы в список через input
addForm.addEventListener('submit', (event) => {
    //Запрет обновления страницы
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

 //Проверка на пустую строку
    if (newFilm) {
        //Ставим троеточие если длина фильма больше 21 символа
        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        };
        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);
        createMovieList(movieDB.movies, movieList);  
    }
 //Cброс текста в input
    event.target.reset();
})

//Удаляем рекламные баннеры
 function deleteAdv(adv) {
    adv.forEach(item => {
        item.remove();
    });
 };
 deleteAdv(advertisement);

 function makeChanges() {
 //Меняем название жанра (специально через js  а не html)
 genre.textContent = "Драма";
 //Меняем банер, также специально именно через js
 poster.style.backgroundImage = "url('img/bg.jpg')";
 };
 makeChanges();

 //Сортировка данных
 function sortArr(arr) {
    arr.sort();
 }
 sortArr(movieDB.movies);

 function createMovieList(films, parent) {
    //Удаляем все фильмы из списка
    parent.innerHTML = "";
    //Формируем новый список фильмов и даём им нумерацию
    films.forEach((item, i) => {
    parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${item}
            <div class="delete"></div>
        </li>`;
    });
    //Удаление фильмов из списка и массива
    document.querySelectorAll('.delete').forEach((item, i) => {
        item.addEventListener('click', () => {
            item.parentElement.remove();
            movieDB.movies.splice(i, 1);
                //Рекурсия для нумерации фильмов (без неё ломается)
                createMovieList(movieDB.movies, movieList);
        });
    });
 };
 createMovieList(movieDB.movies, movieList);

});
