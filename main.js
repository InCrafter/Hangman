import jsonFile from './words.json' assert {type: 'json'};
const words = "arson";
let randomWord;
var guess ;             // Geuss
var geusses = [ ];      // Stored geusses
var lives ;             // Lives
var counter ;           // Count correct geusses
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




window.onload = function () { 
    var showLives = document.getElementById("mylives"); 

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    const buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }
      
  
     result = function () {
      randomWord = jsonFile[Math.floor(Math.random()*jsonFile.length)];
      console.log(randomWord)
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
      if (lives < 1) {
        showLives.innerHTML = `Game Over. The word was ${randomWord.toUpperCase()}`;
      }
      for (var i = 0; i < geusses.length; i++) {
        if (counter + space === geusses.length) {
          showLives.innerHTML = "You Win!";
        }
      }
    }
  
    var animate = function () {
      var drawMe = lives ;
      drawArray[drawMe]();
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
            geusses[i].innerHTML = geuss;
            counter += 1;
          } 
        }
        var j = (randomWord.indexOf(geuss));
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      }
    }
    
    play = function () {
      buttons();
      geusses = [ ];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      canvas();
    }
  
    play();


    // reset
    document.getElementById('newWord').onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      context.clearRect(0, 0, 400, 400);
      play();
    }
  }