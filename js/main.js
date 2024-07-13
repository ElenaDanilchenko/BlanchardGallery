(() => {
  //пункты меню
  const menuItems = document.querySelectorAll('.nav__link');

  // разделы
  const sections = document.querySelectorAll('section');

  // map для соотвествия пунктов меню и разделов (первая секция - hero - не имеет соответствующего пункта меню)
  const menuMap = new Map();
  for (let i = 0; i < menuItems.length; i++) {
    menuMap.set(menuItems[i], sections[i + 1]);
  }

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
    menuMap.forEach((value, key) => {
      key.addEventListener('click', (event) => {
        event.preventDefault();
        value.scrollIntoView({ behavior: 'smooth' });
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
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameInputContent = inputs[0].value;
      const phoneInputContent = inputs[1].value;

      if (!namePattern.test(nameInputContent)) {
        setInvalidclasses(inputs[0], labels[0]);
        return;
      }
      if (!phonePattern.test(phoneInputContent)) {
        setInvalidclasses(inputs[1], labels[1]);
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

    });

    // удаление стилей, указывающих об ошибке при новом заполнении поля формы
    inputs.forEach(input => {
      input.addEventListener('input', () => removeInvalidclasses(input, input.closest('label')));
    })

    function setInvalidclasses(input, label) {
      input.classList.add('form__input--invalid');
      label.classList.add('form__label--invalid');
    }

    function removeInvalidclasses(input, label) {
      input.classList.remove('form__input--invalid');
      label.classList.remove('form__label--invalid');
    }
  });

})();
