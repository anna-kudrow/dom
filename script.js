// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.

const classes = [
  {
    name: "Футбол",
    time: "16:00",
    maxParticipants: 20,
    participants: 15,
  },
  {
    name: "Баскетболл",
    time: "17:00",
    maxParticipants: 20,
    participants: 10,
  },
  {
    name: "Хоккей",
    time: "18:00",
    maxParticipants: 20,
    participants: 19,
  },
];

classes.forEach((element) => {
  const classItem = createClassItem(
    element.name,
    element.time,
    element.maxParticipants,
    element.participants
  );
  classesList.append(classItem);
});

function createClassItem(name, time, maxParticipants, participants) {
  const classItem = document.createElement("li");
  classItem.classList.add("class-item");
  const gameName = document.createElement("h3");
  gameName.textContent = name;
  const timeOfPlay = document.createElement("p");
  timeOfPlay.textContent = `Время проведения: ${time}`;
  const maxParticInfo = document.createElement("p");
  maxParticInfo.textContent = `Максимальное число участников: ${maxParticipants}`;
  maxParticInfo.classList.add("max-participants");
  const currentParticipants = document.createElement("p");
  currentParticipants.textContent = `Уже зарегестрировано: ${participants}`;
  currentParticipants.classList.add("current-participants");

  const applyBtn = document.createElement("button");
  applyBtn.textContent = "Записаться";
  applyBtn.classList.add("apply-btn");
  //   applyBtn.classList.add("btn btn-outline-success");

  const cancelBtn = document.createElement("button");
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

const applyBtns = classesList.querySelectorAll(".apply-btn");

applyBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    classes[index].participants++;

    const currentItem = btn.closest(".class-item");
    const currentParticipants = currentItem.querySelector(
      ".current-participants"
    );
    currentParticipants.textContent = `Уже зарегестрировано: ${classes[index].participants}`;
    const maxParticipants = currentItem.querySelector(".max-participants");
    if (
      currentParticipants.textContent.split(" ")[2] ==
      maxParticipants.textContent.split(" ")[3]
    ) {
      btn.disabled = true;
    }
    const cancelBtn = currentItem.querySelector(".cancel-btn");
    cancelBtn.disabled = false;
  });
});

const cancelBtns = classesList.querySelectorAll(".cancel-btn");
cancelBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const applyBtn = classesList.children[index].querySelector(".apply-btn");
    applyBtn.disabled = false;
    const currentParticipants = classesList.children[index].querySelector(
      ".current-participants"
    );
    classes[index].participants--;
    currentParticipants.textContent = `Уже зарегестрировано: ${classes[index].participants}`;
    if (currentParticipants.textContent.split(" ")[2] == 0) {
      btn.disabled = true;
    }
  });
});
