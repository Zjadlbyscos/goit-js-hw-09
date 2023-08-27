import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const obj = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay); // Add delay argument to setTimeout
  });
}

obj.form.addEventListener('submit', btnSubmitHandler);

function btnSubmitHandler(e) {
  e.preventDefault();
  let delay = parseInt(obj.delay.value);
  const step = parseInt(obj.step.value);
  const amount = parseInt(obj.amount.value);

  if (delay < 0 || step < 0 || amount < 1) {
    Notify.warning(`❗ Enter a value greater than zero ❗`, {
      clickToClose: true,
      timeout: 3 * 1000,
      position: 'center-top',
    });
  } else {
    for (let i = 0; i < amount; i += 1) {
      let position = i + 1;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
            clickToClose: true,
          });
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
            clickToClose: true,
          });
        });
      delay += step;
    }
  }
}
