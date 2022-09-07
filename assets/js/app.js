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
 * 11. create function handleDeleteColors
 * 12. create functions shortingReset, shortingAscending, shortingDscending
 * 13. create function getCustomColorsLS
 */

window.onload = function () {
  main();
};

function main() {
  const colorInput = document.getElementById("colorInput");
  const generateColorBtn = document.getElementById("generateColorBtn");
  const copyBtn = document.getElementById("copyBtn");
  const saveBtn = document.querySelector(".save-icon i");
  const shortingReset = document.querySelector(".color-control #reset");
  const shortingAscending = document.querySelector(
    ".color-control .fa-arrow-down-a-z"
  );
  const shortingDscending = document.querySelector(
    ".color-control .fa-arrow-up-z-a"
  );
  const deleteColors = document.querySelector(".color-control #delete-colors");

  generateColorBtn.addEventListener("click", handleGeneratedColor(colorInput));
  copyBtn.addEventListener("click", handleCopyColor(colorInput));
  colorInput.addEventListener("keyup", handleChangeColor);
  saveBtn.addEventListener("click", handleSaveColor(colorInput));

  // get colors from localStorage
  const colors = getCustomColorsLS();
  if (colors) {
    createColorItem(colors);
    isActiveSaveColor(colors, colorInput);
  }
  // Delete all colors from localStorage
  deleteColors.addEventListener("click", function () {
    if (confirm("Are you sure....???")) {
      localStorage.removeItem("custom-colors");
      let colors = getCustomColorsLS();
      if (!colors) {
        colors = [];
        const saveColorArea = document.querySelector(".save-color-area");
        saveColorArea.style.display = "none";
        isActiveSaveColor(colors, colorInput);
      }
    }
  });
  // reset ascending descending
  shortingReset.addEventListener("click", function () {
    createColorItem(getCustomColorsLS());
  });
  shortingAscending.addEventListener("click", function () {
    const colors = getCustomColorsLS();
    colors.sort((a, b) => {
      return parseInt(a, 16) - parseInt(b, 16);
    });
    createColorItem(colors);
  });
  shortingDscending.addEventListener("click", function () {
    const colors = getCustomColorsLS();
    colors.sort((a, b) => {
      return parseInt(b, 16) - parseInt(a, 16);
    });
    createColorItem(colors);
  });
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
    isActiveSaveColor(getCustomColorsLS(), colorCode);
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
    isActiveSaveColor(getCustomColorsLS(), event.target);
  }
}
// handle save color
function handleSaveColor(colorInput) {
  return function () {
    let colors = getCustomColorsLS();
    colors = colors === false ? [] : colors;
    const color = colorInput.value;
    if (colors.includes(color)) return;
    colors.unshift(color);
    localStorage.setItem("custom-colors", JSON.stringify(colors));
    createColorItem(colors);
    isActiveSaveColor(colors, colorInput);
  };
}

/**
 * Utils function
 */
// getCustomColorsLS
function getCustomColorsLS() {
  return localStorage.getItem("custom-colors")
    ? JSON.parse(localStorage.getItem("custom-colors"))
    : false;
}
// Generate Random color
function generateRandomcolor() {
  // I need 0 to 255 but Math.floor(Math.random() * 255) return 254 if I add Math.floor(Math.random() * 255)+1 then 0 not generate so I can do Math.floor(Math.random() * 256)
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
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
  const saveColorArea = document.querySelector(".save-color-area");
  const customColors = document.getElementById("color-list");
  customColors.innerHTML = "";
  if ((saveColorArea.style.display = "none")) {
    saveColorArea.style.display = "block";
  }
  colors.forEach((color) => {
    const item = document.createElement("div");
    item.setAttribute("data-color", color);
    item.setAttribute("title", color);
    item.classList.add("item", "shadow-sm");
    item.style.backgroundColor = `#${color}`;
    customColors.appendChild(item);
  });
}

// check save icon isActive
function isActiveSaveColor(colors, colorInput) {
  colors = colors === false ? [] : colors;
  const saveIcon = document.querySelector(".save-icon i");
  if (colors.includes(colorInput.value)) {
    saveIcon.classList.remove("fa-regular", "fa-heart");
    saveIcon.classList.add("fa-solid", "fa-heart");
    saveIcon.style.color = "var(--heart)";
  } else if (colors.includes(colorInput)) {
    saveIcon.classList.remove("fa-regular", "fa-heart");
    saveIcon.classList.add("fa-solid", "fa-heart");
    saveIcon.style.color = "var(--heart)";
  } else {
    saveIcon.classList.remove("fa-solid", "fa-heart");
    saveIcon.classList.add("fa-regular", "fa-heart");
    saveIcon.style.color = "var(--gray)";
  }
}
