/**
 * 1. Create Main Function when staying all functions are connected.
 * 2. Generate Random color code function
 * 3. generateRandomcolor to generateHexColor function
 * 4. create handleGeneratedColor function control from main function
 * 5. create handleCopyColor function control from main function
 * 6. create handleChangeColor function
 * 7. create isValidColorCode function
 * 8. create handleSaveColor handler function
 * 9. create a new function createColorItem
 * 10. create a function isActiveSaveColor
 */

// global variable
let customColors = [];

window.onload = function () {
  main();
};

function main() {
  const colorInput = document.getElementById("colorInput");
  const generateColorBtn = document.getElementById("generateColorBtn");
  const copyBtn = document.getElementById("copyBtn");
  const saveBtn = document.querySelector(".save-icon img");

  generateColorBtn.addEventListener("click", handleGeneratedColor(colorInput));
  copyBtn.addEventListener("click", handleCopyColor(colorInput));
  colorInput.addEventListener("keyup", handleChangeColor);
  saveBtn.addEventListener("click", handleSaveColor(colorInput));

  const newCustomColors = localStorage.getItem("custom-colors");
  if (newCustomColors) {
    customColors = JSON.parse(newCustomColors);
    createColorItem(customColors);
    isActiveSaveColor(customColors, colorInput);
  }
}

/**
 * event handler
 */

// generate color handle
function handleGeneratedColor(outputColorCode) {
  return function () {
    const randomColorCode = generateRandomcolor();
    const colorCode = generateHexColor(randomColorCode);
    // show generated color here
    document.querySelector(
      ".generated-color"
    ).style.backgroundColor = `#${colorCode}`;
    outputColorCode.value = colorCode;
    isActiveSaveColor(customColors, colorCode);
  };
}
// generated color copy from input value
function handleCopyColor(colorCode) {
  return function () {
    const copyArea = document.querySelector(".copy-area");
    navigator.clipboard.writeText(colorCode.value);
    copyArea.innerHTML = "";
    copyArea.classList.remove("copid");

    copyArea.innerText = `${colorCode.value} hex color code copied`;
    copyArea.classList.add("copid");
    copyArea.style.border = `2px solid #${colorCode.value}`;
    setTimeout(() => {
      copyArea.classList.remove("copid");
    }, 1500);
  };
}
// input handleChangeColor function
function handleChangeColor(event) {
  const colorCode = event.target.value;
  if (isValidColorCode(colorCode)) {
    document.querySelector(
      ".generated-color"
    ).style.backgroundColor = `#${colorCode}`;
    isActiveSaveColor(customColors, event.target);
  }
}
// handle save color
function handleSaveColor(colorInput) {
  return function () {
    const color = colorInput.value;
    if (customColors.includes(color)) return;
    customColors.unshift(color);
    localStorage.setItem("custom-colors", JSON.stringify(customColors));
    createColorItem(customColors);
    isActiveSaveColor(customColors, colorInput);
  };
}

/**
 * Utils function
 */

// Generate Random color
function generateRandomcolor() {
  let red = Math.floor(Math.random() * 255) + 1;
  let green = Math.floor(Math.random() * 255) + 1;
  let blue = Math.floor(Math.random() * 255) + 1;
  return { red, green, blue };
}

// Generate Hex color code
function generateHexColor({ red, green, blue }) {
  const checkHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `${checkHex(red)}${checkHex(green)}${checkHex(blue)}`;
}
// color vallidation
function isValidColorCode(color) {
  if (color.length !== 6) return false;
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// create color Item
function createColorItem(colors) {
  const customColors = document.getElementById("color-list");
  customColors.innerHTML = "";
  if ((customColors.style.display = "none")) {
    customColors.style.display = "flex";
  }
  colors.forEach((color) => {
    const item = document.createElement("div");
    item.classList.add("item", "shadow-sm");
    item.style.backgroundColor = `#${color}`;
    customColors.appendChild(item);
  });
}

// check save icon isActive
function isActiveSaveColor(colors, colorInput) {
  const saveIcon = document.querySelector(".save-icon img");
  if (colors.includes(colorInput.value)) {
    saveIcon.src = "./assets/images/heart-active.svg";
    console.log(colors.includes(colorInput.value));
  } else {
    saveIcon.src = "./assets/images/heart.svg";
  }
}
