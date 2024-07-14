(() => {
  //пункты меню
  const menuItems = document.querySelectorAll('.nav__link');

  // кнопка "Подписаться на рассылку"
  const subscribeButton = document.querySelector('.hero__btn');
  // секция Контакты, к которой должен быть переход при нажатии "Подписаться на рассылку"
  const contactsSection = document.getElementById('contacts');

  // форма
  const form = document.querySelector('.form');
  // поля формы
  const inputs = document.querySelectorAll('.form__input');
  // надписи о недопустимом формате
  const labels = document.querySelectorAll('.form__label');

  // регулярное выражение для проверки имени
  const namePattern = /^[a-zа-яё\s-]+$/iu;
  // регулярное выражение для проверки телефона
  const phonePattern = /^[\d()+-]{10,16}$/u;

  document.addEventListener('DOMContentLoaded', () => {
    // для каждого пункта меню плавный переход к соотвествующему разделу
    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', event => {
        event.preventDefault();
        const section = document.getElementById(menuItem.getAttribute('href').slice(1));
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // при клике по кнопке "Подписаться на рассылку" плавный переход к форме обратной связи с активацией первого поля ввода (имени)
    subscribeButton.addEventListener('click', () => {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        inputs[0].focus();
      }, 800);
    });

    //валидация полей формы
    form.addEventListener('submit', async event => {
      event.preventDefault();

      const nameInputContent = inputs[0].value.trim();
      const phoneInputContent = inputs[1].value.trim();

      if (!namePattern.test(nameInputContent)) {
        setInvalidClasses(inputs[0], labels[0]);
        return;
      }
      if (!phonePattern.test(phoneInputContent)) {
        setInvalidClasses(inputs[1], labels[1]);
        return;
      }

      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          name: nameInputContent,
          phone: phoneInputContent
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      form.reset();

    });

    // удаление стилей, указывающих об ошибке, при новом заполнении поля формы
    inputs.forEach(input => {
      input.addEventListener('input', () => removeInvalidclasses(input, input.closest('label')));
    });

    function setInvalidClasses(input, label) {
      input.classList.add('form__input--invalid');
      label.classList.add('form__label--invalid');
    }

    function removeInvalidclasses(input, label) {
      input.classList.remove('form__input--invalid');
      label.classList.remove('form__label--invalid');
    }
  });

})();
