let styleHistory = [];
let currentIndex = -1;

function applyStyles() {
  const textContainer = document.getElementById("textContainer");
  const fontStyle = document.getElementById("fontStyle").value;
  const fontSize = document.getElementById("fontSize").value + "px";
  const textColor = document.getElementById("textColor").value;

  styleHistory.push({
    fontFamily: textContainer.style.fontFamily,
    fontSize: textContainer.style.fontSize,
    color: textContainer.style.color,
    left: textContainer.style.left,
    top: textContainer.style.top,
  });

  textContainer.style.fontFamily = fontStyle;
  textContainer.style.fontSize = fontSize;
  textContainer.style.color = textColor;

  currentIndex = styleHistory.length - 1;
  console.log(currentIndex);
}

function undo() {
  if (currentIndex > 0) {
    console.log(2);
    currentIndex--;

    applyHistoryStyle();
  }
}

function redo() {
  if (currentIndex < styleHistory.length - 1) {
    currentIndex++;
    console.log(2);
    applyHistoryStyle();
  }
}

function applyHistoryStyle() {
  const textContainer = document.getElementById("textContainer");
  const historyStyle = styleHistory[currentIndex];

  textContainer.style.fontFamily = historyStyle.fontFamily;
  textContainer.style.fontSize = historyStyle.fontSize;
  textContainer.style.color = historyStyle.color;
  textContainer.style.left = historyStyle.left;
  textContainer.style.top = historyStyle.top;
}

let isDragging = false;

function startDragging(event) {
  isDragging = true;

  const textElement = document.getElementById("textContainer");
  const offsetX = event.clientX - textElement.getBoundingClientRect().left;
  console.log(event.clientX);
  console.log(textElement.getBoundingClientRect().left);
  const offsetY = event.clientY - textElement.getBoundingClientRect().top;
  console.log(event.clientY);
  console.log(textElement.getBoundingClientRect().top);

  function moveElement(event) {
    if (isDragging) {
      const x = event.clientX - offsetX;
      const y = event.clientY - offsetY;

      textElement.style.left = x + "px";
      textElement.style.top = y + "px";
    }
  }

  function stopDragging() {
    isDragging = false;
    document.removeEventListener("mousemove", moveElement);
    document.removeEventListener("mouseup", stopDragging);
  }

  document.addEventListener("mousemove", moveElement);
  document.addEventListener("mouseup", stopDragging);
}
