import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onCurrentTime, 1000));

function onCurrentTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

const savedTime = localStorage.getItem('videoplayer-current-time');

player.setCurrentTime(savedTime);
