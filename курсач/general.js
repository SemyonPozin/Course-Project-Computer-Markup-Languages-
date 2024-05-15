document.addEventListener("load", hamb());
document.addEventListener("load", actlink());
document.addEventListener("load", correctArrows());

//функция добавления кнопки гамбургера на экране шириной менее 540 пикселей 
function hamb() {
  if (document.documentElement.clientWidth <= 540) {
    document.getElementsByClassName("head-right")[0].innerHTML +=
   ` <button class="hamburger-button hamb" style="border-top: none; border-left: none;">
   <svg width="32" height="32" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg">
     <path d="M4 8H28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M4 16H28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M4 24H28" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
 </button>`
      // "<div class='hamb'>&#8801</div>";
  }
}

//--------------скролл-------------//

// Получаем все элементы, которые нужно анимировать, с помощью класса '_animate-items'
const animItems = document.querySelectorAll("._animate-items");

// Проверяем, есть ли элементы для анимации, и если есть, устанавливаем слушатель события 'scroll' на объекте window
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  // Функция, которая вызывается при скролле страницы
  function animOnScroll(params) {
    // Проходимся по каждому элементу и вычисляем его высоту и отступ от верха страницы
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      // Коэффициент, который определяет, на какой высоте начинается анимация элемента
      const animStart = 4;
      // Вычисляем точку, на которой начинается анимация
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      // Если элемент выше, чем видимая область, устанавливаем точку анимации равной 1/4 видимой области
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      // Если точка анимации находится в видимой области, добавляем класс '_activeScroll'
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_activeScroll");
      } else {
        // Если элемент за пределами видимой области, удаляем класс '_activeScroll'
        animItem.classList.remove("_activeScroll");
      }
    }
  }
  // Функция для вычисления отступов элементов
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  // Задержка перед первым вызовом функции анимации
  setTimeout(() => {
    animOnScroll();
  }, 300);
}


//функция появления формы
function orderForm() {
  let containerForm = document.querySelector(".for_form");
  containerForm.style.display = "grid";
}

//функция сброса данных формы
function resetForm() {
  document.getElementsByName("name")[0].value = "";
  document.getElementsByName("name")[0].placeholder = "";
  document.getElementsByName("surname")[0].value = "";
  document.getElementsByName("surname")[0].placeholder = "";
  document.getElementsByName("cellphone")[0].value = "";
  document.getElementsByName("cellphone")[0].placeholder = "";
  document.getElementsByName("mail")[0].value = "";
  document.getElementsByName("mail")[0].placeholder = "";
  document.getElementsByName("name")[0].classList.remove("red_border");
  document.getElementsByName("surname")[0].classList.remove("red_border");
  document.getElementsByName("cellphone")[0].classList.remove("red_border");
  document.getElementsByName("mail")[0].classList.remove("red_border");
}

//функция закрытия формы
function closeForm() {
  resetForm();
  document.getElementsByClassName("for_form")[0].style.display = "none";
}

var form = document.getElementById("order-form");

//валидация формы по ее отправке
document.getElementById("order-form").onsubmit = (event) => {
  event.preventDefault();
  let nameValid = true;
  let surnameValid = true;
  let telephoneValid = true;
  let mailValid = true;
  const regExpName = /[A-Z]{1}[a-z]+(-{1}[A-Z]{1}[a-z]+)?/;//регулярное выражение для имени пользователя
  const regExpTelephone = /^(\+375|80)(29|25|44|33)\d{7}$/;//регулярное выражение для номера телефона
  const regExpGml =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;//регулярное выражение для электронной почты

  if (document.getElementsByName("name")[0].value.match(regExpName)) {
    nameValid = true;
    if ("red_border" in document.getElementsByName("name")[0].classList) {
      document.getElementsByName("name")[0].classList.remove("red_border");
    }
  } else {
    nameValid = false;
    document.getElementsByName("name")[0].classList.add("red_border");
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("name")[0].placeholder = "Заполните корректно";
  }

  if (document.getElementsByName("surname")[0].value.match(regExpName)) {
    surnameValid = true;
    if (
      document.getElementsByName("surname")[0].classList.includes("red_border")
    ) {
      document.getElementsByName("surname")[0].classList.remove("red_border");
    }
  } else {
    surnameValid = false;
    document.getElementsByName("surname")[0].classList.add("red_border");
    document.getElementsByName("surname")[0].value = "";
    document.getElementsByName("surname")[0].placeholder =
      "Заполните корректно";
  }

  if (document.getElementsByName("cellphone")[0].value.match(regExpTelephone)) {
    telephoneValidValid = true;
    if (
      document
        .getElementsByName("cellphone")[0]
        .classList.includes("red_border")
    ) {
      document.getElementsByName("cellphone")[0].classList.remove("red_border");
    }
  } else {
    telephoneValidValid = false;
    document.getElementsByName("cellphone")[0].value = "";
    document.getElementsByName("cellphone")[0].classList.add("red_border");
    document.getElementsByName("cellphone")[0].placeholder =
      "Заполните корректно";
  }

  if (document.getElementsByName("mail")[0].value.match(regExpGml)) {
    telephoneValidValid = true;
    if (
      document.getElementsByName("mail")[0].classList.includes("red_border")
    ) {
      document.getElementsByName("mail")[0].classList.remove("red_border");
    }
  } else {
    telephoneValidValid = false;
    document.getElementsByName("mail")[0].classList.add("red_border");
    document.getElementsByName("mail")[0].value = "";
    document.getElementsByName("mail")[0].placeholder = "Заполните корректно";
  }

  if (nameValid && surnameValid && telephoneValid && mailValid) {
    alert("Заявка оставлена");
    closeForm();
  }
};

//функция выделения текущей ссылки
function actlink() {
  let links = Array.from(document.querySelectorAll("#headlink"));
  for (let i = 0; i < links.length; i++) {
    window.location.href == links[i].href
      ? links[i].parentNode.classList.add("active_link")
      : links[i].parentNode.classList.remove("active_link");
  }
}

//функция изменения надписей в зависимости от ширины экрана
function correctArrows() {
  if(window.location.href !== "contacts.html")
    return;
  if (window.innerWidth < 561) {
    let arrows = Array.from(document.querySelectorAll(".contactzag"));
    console.log(arrows)
    arrows[0].textContent = "Контакты";
    arrows[1].textContent = "Цены и график";
  }
}
