import jsonFile from './words.json' assert {type: 'json'};
var guess;
var geusses = [];
var lives;
var counter;
let result;
let comments;
let canvas;
let head;
let draw;
let frame1;
let frame2;
let frame3;
let frame4;
let torso;
let rightArm;
let rightLeg;
let leftArm;
let leftLeg;
let drawArray;
let check;
let play;
let myButtons;
let letters;
let list;
let space;
let wordHolder;
let correct;
let myStickman;
let context;
let wordCount;
let difficulty;
let button = document.getElementById('newWord')
let saveLives;
var drawMe = 9;
let oneWord = document.getElementById('oneWord');
let twoWord = document.getElementById('twoWord');
let easy = document.getElementById('easy');
let medium = document.getElementById('medium');
let hard = document.getElementById('hard');
let randomWord;
let language;

window.onload = function () { 


  
    var showLives = document.getElementById("mylives"); 

    const alphabetEN = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const alphabetDE = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ä", "ö", "ü", "ß"];
    
    const buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');

      if (language === "en") {
        for (var i = 0; i < alphabetEN.length; i++) {
          letters.id = 'alphabet';  
          list = document.createElement('li');
          list.id = 'letter';
          list.innerHTML = alphabetEN[i];
          check();
          myButtons.appendChild(letters);
          letters.appendChild(list);
        }
       } else if (language === "de") {
          for (var i = 0; i < alphabetDE.length; i++) {
            letters.id = 'alphabet';  
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabetDE[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
       }
      }
      
  
     result = async function () {
      const response = await fetch("https://random-word-api.herokuapp.com/word?lang=" + language);
      await response.json().then(word => randomWord = word[0].toLowerCase());
      test()

      wordHolder = document.getElementById('word');
      correct = document.createElement('ul');
  
      for (var i = 0; i < randomWord.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        guess.innerHTML = "_";
  
        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);
      }
    }
    
     comments = function () {
      showLives.innerHTML = "You have " + lives + " lives";
      const alp = document.getElementById("alphabet");
      if (lives < 1) {
        showLives.innerHTML = `Game Over. The word was ${randomWord.toUpperCase()}`;
        button.disabled = false;
        oneWord.disabled = false;
        twoWord.disabled = false;
        easy.disabled = false;
        medium.disabled = false;
        hard.disabled = false;
        letters.disabled = true;
        lives = saveLives; 
        if(alp){
          alp.remove();
        }
      }
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {
          showLives.innerHTML = "You Win!";
          button.disabled = false;
          oneWord.disabled = false;
          twoWord.disabled = false;
          easy.disabled = false;
          medium.disabled = false;
          hard.disabled = false;
          lives = saveLives; 
          if(alp){
            alp.remove();
          }
        }
      }
    }
  
    var animate = function () {
      if (saveLives === 10) {
        drawArray[drawMe]();
        drawMe -= 1;
      } else if (saveLives === 5) {
        drawArray[drawMe]();
        drawMe -= 1;
        drawArray[drawMe]();
        drawMe -= 1;
      } else if (saveLives === 2) {
        drawArray[drawMe]();
        drawMe -= 1;
        drawArray[drawMe]();
        drawMe -= 1;
        drawArray[drawMe]();
        drawMe -= 1;
        drawArray[drawMe]();
        drawMe -= 1;
        drawArray[drawMe]();
        drawMe -= 1;
      }
      
    }
    
    canvas =  function(){
  
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.strokeStyle = "#fff";
      context.lineWidth = 2;
    };
    
      head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
      }
      
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
      
      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke(); 
  }
  
     frame1 = function() {
       draw (0, 150, 150, 150);
     };
     
     frame2 = function() {
       draw (10, 0, 10, 600);
     };
    
     frame3 = function() {
       draw (0, 5, 70, 5);
     };
    
     frame4 = function() {
       draw (60, 5, 60, 15);
     };
    
     torso = function() {
       draw (60, 36, 60, 70);
     };
    
     rightArm = function() {
       draw (60, 46, 100, 50);
     };
    
     leftArm = function() {
       draw (60, 46, 20, 50);
     };
    
     rightLeg = function() {
       draw (60, 70, 100, 100);
     };
    
     leftLeg = function() {
       draw (60, 70, 20, 100);
     };
    
    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 
  
     check = function () {
      list.onclick = function () {
        var geuss = (this.innerHTML);
        this.onclick = null;
        for (var i = 0; i < randomWord.length; i++) {
          if (randomWord[i] === geuss) {
            this.setAttribute("class", "active");
            geusses[i].innerHTML = geuss;
            counter += 1;
          } 
        }
        var j = (randomWord.indexOf(geuss));
        if (j === -1) {
          this.setAttribute("class", "wrong");
          lives -= 1;
          animate();
          comments();
        } else {
          comments();
        }
      }
    }
    
    play = function () {
      buttons();
      geusses = [ ];
      counter = 0;
      space = 0;
      result();
      comments();
      canvas();
    }
  
    
    // reset
    document.getElementById('newWord').onclick = function() {
      document.getElementById("word").style.display = "block";
      document.getElementById("mylives").style.display = "block";
      document.getElementById("buttons").style.display = "block";
      document.getElementById("stickman").style.display = "block";
      button.disabled = true;
      oneWord.disabled = true;
      twoWord.disabled = true;
      easy.disabled = true;
      medium.disabled = true;
      hard.disabled = true;
      drawMe = 9;



      const text = document.getElementById("my-word");
      if(text){
        text.remove();
      }
      play();
      context.clearRect(0, 0, 400, 400);
    }

    

    function chooseWord(type) {

      if (type === "oneWord") {
        language = "en";
        twoWord.setAttribute("class", "");
        oneWord.setAttribute("class", "oneWordSelected");
      } else if (type === "twoWord") {
        language = "de";
        oneWord.setAttribute("class", "");
        twoWord.setAttribute("class", "TwoWordSelected");
      }
      
      if (type === "easy") {
        difficulty = "easy";
        easy.setAttribute("class", "EasySelected");
        medium.setAttribute("class", "");
        hard.setAttribute("class", "");
        lives = 10;
        saveLives = 10;
      } else if (type === "medium") {
        difficulty = "easy";
        medium.setAttribute("class", "MediumSelected");
        easy.setAttribute("class", "");
        hard.setAttribute("class", "");
        lives = 5;
        saveLives = 5;
      } else if (type === "hard") {
        difficulty = "easy";
        hard.setAttribute("class", "HardSelected");
        medium.setAttribute("class", "");
        easy.setAttribute("class", "");
        lives = 2;
        saveLives = 2;
      }

      if (difficulty && language  ) {
        button.disabled = false;
      }
    }

    document.getElementById('oneWord').onclick = function() {
      chooseWord("oneWord")
    }

    document.getElementById('twoWord').onclick = function() {
      chooseWord("twoWord")
    }

    document.getElementById('easy').onclick = function() {
      chooseWord("easy")
    }

    document.getElementById('medium').onclick = function() {
      chooseWord("medium")
    }

    document.getElementById('hard').onclick = function() {
      chooseWord("hard")
    }

    function test() {
      document.title = randomWord;
    }
  }

