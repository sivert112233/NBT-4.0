document.querySelector('.js-iconButton').addEventListener('click', () => {
  myFunction();
});

document.querySelector('.js-guessLocation').addEventListener('click', () => {
  window.location.href = 'guessLocationPage.html';
})


function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none"
  } else {
    x.style.display = "block";
  }
}