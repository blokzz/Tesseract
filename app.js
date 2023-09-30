
const inputElement = document.getElementById("input");
const buttonElement = document.getElementById("convert-btn");
const CopyBtn = document.getElementById("copy-btn");
const CleatBtn= document.getElementById("clear-btn");
const txtarea = document.getElementById("txtarea");
const errorMessage = document.getElementById("error-message");
const SelectTag = document.querySelector('select');

function resizeTextarea() {
    txtarea.style.height = `${txtarea.scrollHeight}px`;
  }

let language;

SelectTag.addEventListener("change", (e) => {
    language = e.target.value;
    return language
 });

buttonElement.addEventListener("click", function () {
txtarea.textContent = '';
const file = inputElement.files[0];
if (!inputElement.value) {
  errorMessage.textContent = 'You must choose a file first!'
  return;
}
else{
  errorMessage.textContent = '';
}
Tesseract.recognize(
    `${file.name}`,
    `${language}`,
    { logger: m => txtarea.setAttribute('placeholder','Converting....') }
  ).then(({ data: { text } }) => {
    txtarea.value= text
    txtarea.setAttribute('placeholder','Here will be displayed text')
    resizeTextarea();
  })
.catch(error =>{errorMessage.textContent = 'An error occured while loading file'
txtarea.setAttribute('placeholder','An error occured')
})
});

CopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(txtarea.value)
})

CleatBtn.addEventListener('click' , () => { 
  txtarea.value = "";
})