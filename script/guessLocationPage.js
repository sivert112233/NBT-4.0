import {BookLocationCodes} from "./bookList.js";


document.querySelector('.js-iconButton').addEventListener('click', () => {
  myFunction();
});

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none"
  } else {
    x.style.display = "block";
  }
}

export class GuessShelfLocation{
  constructor() {
    this.rightGuesses = 0;
    this.wrongGuesses = 0; 
  }
  setScore(guess) {
    if (guess){
      this.rightGuesses += 1;
    }else{
      this.wrongGuesses += 1;
    }
  }
  resetScore() {
    this.rightGuesses = 0;
    this.wrongGuesses = 0; 
  }
  getCurrentScore() {
    console.log(this.rightGuesses);
    console.log(this.wrongGuesses);
  }
  displayScore(){
    return document.querySelector('.js-output-book-code-resulet').innerHTML = `
    <p class="resultDisplayColorRight">Riktig: ${this.rightGuesses}</p>
    <p class="resultDisplayColorWrong">Feil: ${this.wrongGuesses}</p>
    `;
  }
  getLocation(button) {
    let resulet;
    switch(button) {
      case 'bottomLeft':
        resulet =  new BookLocationCodes().books1;
        break;
      case 'topLeftBack':
        resulet =  new BookLocationCodes().books2;
        break;
      case 'topLeftFront':
        resulet =  new BookLocationCodes().books3;
        break;  
      case 'topRightBack':
        resulet =  new BookLocationCodes().books4;
        break;
      case 'topRightMiddle':
        resulet =  new BookLocationCodes().books5;
        break;
      case 'topRightFornt':
        resulet =  new BookLocationCodes().books6;
        break;
      case 'bottomRight':
        resulet =  new BookLocationCodes().books7;
        break;
      default:
        resulet = console.log('ko');
        break;
    }
    return resulet; 
  }
  addColorToButtons(buttonId, answer) {
    if (answer){
      document.getElementById(buttonId).classList.add("bookButtonsRight");
    }else{
      document.getElementById(buttonId).classList.add("bookButtonsWrong");
    }
  }
  removeColoreFromButtons(buttonId) {
    document.getElementById(buttonId).classList.remove('bookButtonsWrong');
    document.getElementById(buttonId).classList.remove('bookButtonsRight');
  }

  runCodeAndRenderPage() {
    let guess = false; 
    let randomBook = undefined; 
    let noCodeIsChosen = true;
    const allBooks = new BookLocationCodes().allBooks;

    function getRandomBookAndResetColor() {
      const output = document.querySelector('.js-get-book-box');
      guess = false;
      noCodeIsChosen = false; 
      randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
      allBooks.splice(allBooks.indexOf(randomBook),1);
      document.querySelectorAll('.js-bookButtons').forEach((button) => {
        new GuessShelfLocation().removeColoreFromButtons(button.id); //--?--//
      });
      if (randomBook) {
        output.innerHTML = randomBook.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ");
      }
    }
    document.querySelector('.js-get-book-button').addEventListener('click', () => { 
      getRandomBookAndResetColor();
    });  

    document.querySelectorAll('.js-bookButtons').forEach((button) => {
      button.addEventListener('click', () => {
        console.log(allBooks.length);
        if (noCodeIsChosen){
          return alert('Vent på ny kode.');
        }
        this.getLocation(button.id).forEach((i) => {
          if (randomBook === i) {
            if (allBooks.length === 0) {
              this.setScore(!guess);
              this.runAndRenderCompletedCode();
            }
            guess = true;
          };
        });
        if (guess){
          this.setScore(guess);
          this.addColorToButtons(button.id, guess);
          setTimeout(() => {
            getRandomBookAndResetColor();
          },1000);
          noCodeIsChosen = true
        }else{
          if (button.classList.contains('bookButtonsWrong')) {
            return alert('Du har allerede gjettet denne lokasjonen. Prøv en lokasjon som ikke er rød.')
          }
          this.setScore(guess);
          this.addColorToButtons(button.id, guess);
        }
        this.displayScore();
      });
    });
  }
}
new GuessShelfLocation().runCodeAndRenderPage();