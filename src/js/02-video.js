const _ = require('lodash');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

/*
проверка при загрузке плеера на наличие сохраненных данных
если есть - устанавливается начало воспроизведения
*/

const onPlayerLoad = function () {
  if (localStorage.getItem('videoplayer-current-time')) {
    const setTime = JSON.parse(localStorage.getItem('videoplayer-current-time'));
    player.setCurrentTime(setTime.seconds);
  }
};

onPlayerLoad();

/*
функция записи локальных даннных
*/
const playTime = function (time) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(time));
};

player
  .on('timeupdate', _.throttle(playTime, 1000))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
