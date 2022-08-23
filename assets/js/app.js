/**
 * 1. Create Main Function when staying all functions are connected.
 * 2. Generate RGB color function
 * 3. generateRGBcolor to generateHexColor function
 * 4. create handleGeneratedColor function control from main function
 * 5. create handleCopyColor function control from main function
 */

window.onload = function () {
  main();
};

function main() {
  const colorInput = document.getElementById("colorInput");
  const generateColorBtn = document.getElementById("generateColorBtn");
  const copyBtn = document.getElementById("copyBtn");

  generateColorBtn.addEventListener("click", handleGeneratedColor(colorInput));
  copyBtn.addEventListener("click", handleCopyColor(colorInput));
}

/**
 * event handler
 */

// generate color handle
function handleGeneratedColor(outputColorCode) {
  return function () {
    const colorCode = generateHexColor();
    // show generated color here
    document.querySelector(
      ".generated-color"
    ).style.backgroundColor = `#${colorCode}`;
    outputColorCode.value = colorCode;
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

/**
 * Utils function
 */

// Generate RGB color
function generateRGBcolor() {
  let red = Math.floor(Math.random() * 255) + 1;
  let green = Math.floor(Math.random() * 255) + 1;
  let blue = Math.floor(Math.random() * 255) + 1;
  return { red, green, blue };
}

// Generate Hex color code
function generateHexColor() {
  const { red, green, blue } = generateRGBcolor();
  return `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
