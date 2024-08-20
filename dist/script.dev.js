"use strict";

// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.
// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.
// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.
// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.
// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".
// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.
// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.
// 7. При разработке используйте Bootstrap для стилизации элементов.
var classes = [{
  name: "Футбол",
  time: "16:00",
  maxParticipants: 20,
  participants: 15
}, {
  name: "Баскетболл",
  time: "17:00",
  maxParticipants: 20,
  participants: 10
}, {
  name: "Хоккей",
  time: "18:00",
  maxParticipants: 20,
  participants: 19
}];
classes.forEach(function (element) {
  var classItem = createClassItem(element.name, element.time, element.maxParticipants, element.participants);
  classesList.append(classItem);
});

function createClassItem(name, time, maxParticipants, participants) {
  var classItem = document.createElement("li");
  classItem.classList.add("class-item");
  var gameName = document.createElement("h3");
  gameName.textContent = name;
  var timeOfPlay = document.createElement("p");
  timeOfPlay.textContent = "\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F: ".concat(time);
  var maxParticInfo = document.createElement("p");
  maxParticInfo.textContent = "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432: ".concat(maxParticipants);
  maxParticInfo.classList.add("max-participants");
  var currentParticipants = document.createElement("p");
  currentParticipants.textContent = "\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E: ".concat(participants);
  currentParticipants.classList.add("current-participants");
  var applyBtn = document.createElement("button");
  applyBtn.textContent = "Записаться";
  applyBtn.classList.add("apply-btn"); //   applyBtn.classList.add("btn btn-outline-success");

  var cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancel-btn");
  cancelBtn.textContent = "Отменить запись";
  classItem.append(gameName);
  classItem.append(timeOfPlay);
  classItem.append(maxParticInfo);
  classItem.append(currentParticipants);
  classItem.append(applyBtn);
  classItem.append(cancelBtn);
  return classItem;
}

var applyBtns = classesList.querySelectorAll(".apply-btn");
applyBtns.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    classes[index].participants++;
    var currentItem = btn.closest(".class-item");
    var currentParticipants = currentItem.querySelector(".current-participants");
    currentParticipants.textContent = "\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E: ".concat(classes[index].participants);
    var maxParticipants = currentItem.querySelector(".max-participants");

    if (currentParticipants.textContent.split(" ")[2] == maxParticipants.textContent.split(" ")[3]) {
      btn.disabled = true;
    }

    var cancelBtn = currentItem.querySelector(".cancel-btn");
    cancelBtn.disabled = false;
  });
});
var cancelBtns = classesList.querySelectorAll(".cancel-btn");
cancelBtns.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    var applyBtn = classesList.children[index].querySelector(".apply-btn");
    applyBtn.disabled = false;
    var currentParticipants = classesList.children[index].querySelector(".current-participants");
    classes[index].participants--;
    currentParticipants.textContent = "\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0435\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E: ".concat(classes[index].participants);

    if (currentParticipants.textContent.split(" ")[2] == 0) {
      btn.disabled = true;
    }
  });
});