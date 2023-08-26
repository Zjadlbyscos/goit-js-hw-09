import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const obj = {
dateTimePicker: document.querySelector('datetime-picker'),
startButton: document.querySelector('[data-start]'),
daysElement: document.querySelector('[data-days]'),
hoursElement: document.querySelector('[data-hours]'),
minutesElement: document.querySelector('[data-minutes]'),
secondsElement: document.querySelector('[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

  obj.startButton.setAttribute('disabled', true);

flatpickr(obj.dateTimePicker,{...options});

function datePicker(selectedDates){
    if (selectedDates[0].getTime()<= new Date()){
        Notify.failure('Please choose a date in the future',{
            clickToClose: true,
            timeout: 10 * 1000,
        });
        obj.startButton.setAttribute('disabled', true);
    }else{
        obj.startButton.setAttribute('disabled', false);
    }
}