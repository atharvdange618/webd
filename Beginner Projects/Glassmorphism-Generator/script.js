//Initial Reference
let colorInput = document.querySelector('.container .settings #glass-color');
let blurText = document.querySelector('.container .settings .blur p');
let blurInput = document.querySelector('.container .settings .blur input');
let transparencyText = document.querySelector('.container .settings .transparency p');
let TransparencyInput = document.querySelector('.container .settings .transparency input');
let outputDiv = document.querySelector('.container .output .output-div');
let outline = document.querySelector('.container .settings #outline');

let updateGlass = () => {
    blurText.innerHTML = `Blur (${blurInput.value})`;
    transparencyText.innerHTML = `Transparency ${TransparencyInput.value}`;
    let color = colorInput.value;
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    outputDiv.style.cssText = `background:rgba(${r},${g},${b},${TransparencyInput.value});backdrop-filter:blur(${blurInput.value}px);-webkit-backdrop-filter:blur(${blurInput.value}px)`;

    document.querySelector('.container .settings .code-output .txt1').innerHTML = `background:rgba(${r},${g},${b},${TransparencyInput.value})`;

    document.querySelector('.container .settings .code-output .txt3').innerHTML = `backdrop-filter:blur(${blurInput.value}px)`;

    document.querySelector('.container .settings .code-output .txt4').innerHTML = `-webkit-backdrop-filter:blur(${blurInput.value}px)`;

    if (outline.checked) {
        outputDiv.style.cssText = `background:rgba(${r},${g},${b},${TransparencyInput.value});backdrop-filter:blur(${blurInput.value}px);-webkit-backdrop-filter:blur(${blurInput.value}px);border:1px solid rgba( 255, 255, 255, 0.38);`;

        document.querySelector('.container .settings .code-output .txt5').style.display = "block";
    } else {
        outputDiv.style.cssText = `background:rgba(${r},${g},${b},${TransparencyInput.value});backdrop-filter:blur(${blurInput.value}px);-webkit-backdrop-filter:blur(${blurInput.value}px)`;

        document.querySelector('.container .settings .code-output .txt5').style.display = "none";
    }
}
