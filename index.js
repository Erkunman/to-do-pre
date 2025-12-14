let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const savedTasks = localStorage.getItem("toDoTasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return items;
  }
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;

    const newItem = createItem(itemName);

    listElement.prepend(newItem);

    items = getTasksFromDOM();

    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");

    textElement.focus();

    selectText(textElement);
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");

    const currentItems = getTasksFromDOM();

    saveTasks(currentItems);

    items = currentItems;
  });

  return clone;
}

function selectText(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");

  const tasks = [];

  itemsNamesElements.forEach((element) => {
    const taskText = element.textContent;
    tasks.push(taskText);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("toDoTasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskText = inputElement.value.trim();

  if (newTaskText) {
    const newItem = createItem(newTaskText);
    listElement.prepend(newItem);

    items = getTasksFromDOM();
    saveTasks(items);

    inputElement.value = "";
  }
});

items = loadTasks();
items.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});