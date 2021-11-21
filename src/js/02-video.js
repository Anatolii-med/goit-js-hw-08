const _ = require('lodash');
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

/*
проверка при загрузке плеера на наличие сохраненных данных
если есть - устанавливается начало воспроизведения
*/
player.on('play', function () {
  if (localStorage.getItem('videoplayer-current-time')) {
    const setTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));
    player.setCurrentTime(setTime.seconds);
  }
});

/*
функция записи локальных даннных
*/
const playTime = function (time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
};

player.on('timeupdate', _.throttle(playTime, 1000));
