import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const obj = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  time: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    datePicker(selectedDates);
    console.log(selectedDates[0]);
  },
};

obj.startButton.setAttribute('disabled', true);

flatpickr(obj.dateTimePicker, { ...options });

function datePicker(selectedDates) {
  if (selectedDates[0].getTime() <= new Date().getTime()) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
      timeout: 3 * 1000,
      position: 'center-top',
    });
    obj.startButton.setAttribute('disabled', true);
  } else {
    obj.startButton.removeAttribute('disabled');
  }
}

obj.startButton.addEventListener('click', btnStartHandler);

let timerId;

function btnStartHandler() {
  obj.startButton.setAttribute('disabled', true);
  obj.dateTimePicker.setAttribute('disabled', true);

  timerId = setInterval(() => {
    const chooseDate = new Date(obj.dateTimePicker.value);
    const timeToFinish = chooseDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeToFinish);

    obj.time.days.textContent = addLeadingZero(days);
    obj.time.hours.textContent = addLeadingZero(hours);
    obj.time.minutes.textContent = addLeadingZero(minutes);
    obj.time.seconds.textContent = addLeadingZero(seconds);
    // jeśli "timeToFinish <= 1" to odlicza do "-1" alternatywnie, po zakończniu odliczania mozna:
    // 
    //if (timeToFinish <= 0) {
    //   clearInterval(timerId);
    //   obj.dateTimePicker.setAttribute('disabled', true);
    //   obj.time.days.textContent = '00';
    //   obj.time.hours.textContent = '00';
    //   obj.time.minutes.textContent = '00';
    //   obj.time.seconds.textContent = '00';
    //   return;
    // }
    if (timeToFinish <= 1) {
      clearInterval(timerId);
      obj.dateTimePicker.setAttribute('disabled', true);
      return;
    } else {
      obj.dateTimePicker.removeAttribute('disabled');
    }
  });
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
