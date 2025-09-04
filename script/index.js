document.querySelector('.js-fixedTopHeaderMenu').addEventListener('click', () => {
  document.getElementById("myNav").style.height = "100%";
});
document.querySelector('.js-closeBtn').addEventListener('click', () => {
  document.getElementById("myNav").style.height = "0%";
})

