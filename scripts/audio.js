const audioElement = new Audio('audio/temp-audio.mp3');

document.addEventListener('click', (event) => {
  console.log('Clicked', event);
  audioElement.play()
})