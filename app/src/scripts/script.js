// nav 

const navToggleElements     = document.querySelectorAll('.header__btn, .header__content'),
      navControlElements    = document.querySelectorAll('.header__btn, .header__content__close');

 navControlElements.forEach(btn => btn.addEventListener('click', () =>
  navToggleElements.forEach(el => el.classList.toggle('open'))
))

// video

const video          = document.querySelector('.feature__video'),
      current        = document.getElementById('current'),
      duration       = document.getElementById('duration'),
      playIcon       = document.querySelector('.feature__videos__icon'),
      playPause      = document.querySelector('.feature__controls__bottom__play'),
      restart        = document.querySelector('.feature__controls__bottom__restart'),
      prevSpeed      = document.querySelector('.feature__controls__bottom__prev-speed'),
      nextSpeed      = document.querySelector('.feature__controls__bottom__next-speed'),
      speed          = document.querySelector('.feature__videos__speed'),
      prevNext       = document.querySelectorAll('.feature__controls__bottom__prev, .feature__controls__bottom__next'),
      videoControls  = document.querySelector('.feature__controls'),
      videoBlock     = document.querySelector('.feature__videos'),
      videoClose     = document.querySelector('.feature__videos__close'),
      videoLine      = document.querySelector('.feature__controls__line'),
      videoProgress  = document.querySelector('.feature__controls__progress'),
      videoRuler     = document.querySelector('.feature__controls__progress-ruler'),
      volumeChange   = document.querySelector('.feature__controls-volume__icon'),
      volumeLine     = document.querySelector('.feature__controls-volume__line'),
      volumeProgress = document.querySelector('.feature__controls-volume__progress'),
      volumeRuler    = document.querySelector('.feature__controls-volume__ruler');
      
// video time

function changeTime(time) {
  const noll = num => num < 10 ? '0' + num : num
  let hour = Math.trunc(time / 3600)
  time -= hour * 3600
  let minute = Math.trunc(time / 60)
  time -= minute * 60
  time = Math.trunc(time)
  return `${hour}:${noll(minute)}:${noll(time)}`
}

function videoDuration() {
  return duration.innerHTML = changeTime(video.duration)
}

function videoCurrent() {
   setInterval(() => {
   current.innerHTML = changeTime(video.currentTime)
 }, 1000);
}
   
// video playPause
           
playPause.addEventListener('click',()=>{
  videoPlay()
})
playIcon.addEventListener('click',()=>{
  videoPlay()
})
video.addEventListener('click',()=>{
  videoPlay()
})
video.onended = ()=>{
  start()
}


function videoPlay() {
  playPause.classList.toggle('paused')
  if (video.paused === true) {
    video.play()
    videoDuration()
    videoCurrent()
    playIcon.style.zIndex = '-1'
  }else{
    video.pause()
    clearInterval(videoCurrent())
    playIcon.style.zIndex = '1'
  }
}

// video stop

restart.addEventListener('click', ()=>{
    start()
  })

function start() {
  video.currentTime = 0
  video.pause()
  playPause.classList.remove('paused')
  speed.style.opacity = 0;
  video.playbackRate = 1;
}

// videoSpeed

prevSpeed.addEventListener('click',()=>{
  playDownSpeed()
})
nextSpeed.addEventListener('click',()=>{
  playUpSpeed()
})

function playDownSpeed() {
  if (video.playbackRate > 0) {
    video.playbackRate -= 0.25
    speed.innerHTML = video.playbackRate
  }
  if (video.playbackRate === 0) {
    video.playbackRate = 1
    speed.innerHTML = video.playbackRate
  }
  if (video.playbackRate === 1) {
    speed.style.opacity = 0 
   }else{
    speed.style.opacity = 1
   }
}

function playUpSpeed() {
  if (video.playbackRate < 2) {
    video.playbackRate += 0.25
    speed.innerHTML = video.playbackRate
  }
  if (video.playbackRate === 2) {
    video.playbackRate = 1
    speed.innerHTML = video.playbackRate
  }  if (video.playbackRate === 1) {
    speed.style.opacity = 0 
   }else{
    speed.style.opacity = 1
   }
}

// video prev-next

prevNext.forEach(el => {
  el.addEventListener('click',(e)=>{
    if (e.target.getAttribute("id") === 'prev') {
      // video.previous();
      console.log(e.target.getAttribute("id"));
      alert('you have not prev video')
    }
    if (e.target.getAttribute("id") === 'next') {
      // video.next();
      alert('you have not next video')
    }
  })
});

// video volume

volumeChange.onclick = ()=> video.muted = !video.muted

const volumeIcons = ['up','slash','down','normal','off','mute']

video.onvolumechange = ()=>{
  let volume = video.volume * 100
  volumeProgress.style.width = video.volume * 100 + '%'
  volumeIcons.forEach(volumeIcon => volumeChange.classList.remove(volumeIcon))
  if (video.muted) {
    volumeChange.classList.add('slash')
  }else if (volume > 75) {
    volumeChange.classList.add('up')
  }else if (volume > 50) {
    volumeChange.classList.add('normal')
  }else if (volume > 25) {
    volumeChange.classList.add('down')
  }else if (volume > 0) {
    volumeChange.classList.add('off')
  }else if (volume === 0) {
    volumeChange.classList.add('mute')
  }
}

volumeLine.addEventListener('click',(e)=>{
  if (e.target !== volumeRuler) {
    video.volume = e.offsetX / 100
  }
})

// volume progress

volumeRuler.addEventListener('mousedown',(e)=>{
  if (e.clientX >= volumeLine.offsetLeft && e.clientX <= volumeLine.offsetLeft + volumeLine.clientWidth) {
    video.volume = (e.clientX - volumeLine.offsetLeft) / 100
  }
})

window.addEventListener('mouseup',()=>{
  window.onmousemove = null
})

// video volume range

// I have not used from range. you can use it. it is ready for work. If you am going to swich on it. please remove all notes. attention!!! you do all old codes to note which "volume__line, volume__progress, volume__ruler" in feature.pug

// videoVolume.addEventListener('change',(e)=>{
//   video.volume = e.currentTarget.value / 100
// })




// // video progress

video.addEventListener('timeupdate',()=>{
  let ProPos = video.currentTime / video.duration
  videoProgress.style.width = ProPos * 100 +'%'
})
videoLine.addEventListener('click',(e)=> {
  const scrubTime = (e.offsetX / videoLine.offsetWidth) * video.duration
  video.currentTime = scrubTime
})

// video fullscreen

video.addEventListener('dblclick',()=>{
  videoBlock.requestFullscreen()
  videoClose.style.opacity = '1'
  videoClose.style.zIndex = '1'
})
videoClose.addEventListener('click',()=>{
  document.exitFullscreen()
  videoClose.style.opacity = '0'
  videoClose.style.zIndex = '-1'
})