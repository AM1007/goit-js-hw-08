import '../css/common.css';
import Player from '@vimeo/player';
import { throttle } from 'lodash';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlay = function (data) {
  const strigifyData = JSON.stringify(data);
  localStorage.setItem(TIME_KEY, strigifyData);
};
player.on('timeupdate', throttle(onPlay, 1000));

function resumePlayback() {
  const savedTime = localStorage.getItem(TIME_KEY);

  if (JSON.parse(savedTime) === null) {
    return;
  }
  const paused = JSON.parse(savedTime)['seconds'];

  paused = player.setCurrentTime(paused);
}
resumePlayback();
