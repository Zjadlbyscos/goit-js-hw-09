const obj = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
  };
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  obj.stopBtn.setAttribute('disabled', true)
  obj.startBtn.addEventListener('click', clickStartBtn)
  obj.stopBtn.addEventListener('click', clickStopBtn)
  
  let intervalId;

  function clickStartBtn (e){
//e.target dotyczy startBtn
e.target.setAttribute('disabled', true)
intervalId = setInterval(bodyColorChange, 1000)
obj.stopBtn.removeAttribute('disabled')

  }
  function bodyColorChange (){
    document.body.style.backgroundColor = getRandomHexColor();
  }

  function clickStopBtn (e){
    clearInterval(intervalId)
    obj.startBtn.removeAttribute('disabled')
    e.target.setAttribute('disabled', true)
  }