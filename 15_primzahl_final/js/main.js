'use strict';

console.log('main.js geladen');

window.onload = function(){

  var btn = document.getElementById('btn_eingabe');
  var btn2 = document.getElementById('btn_zufall');

  btn.onclick = function(){
    var eingabeFeld = document.getElementById('eingabe');
    var pruefZahl = eingabeFeld.value;
    var ausgabeText, bildName, farbWert;

    eingabeFeld.className = '';

    if ( isNaN(pruefZahl) || pruefZahl < 2 ){ // Validierung
      ausgabeText = 'Geben Sie bitte eine gültige Zahl größer 1 an.';
      bildName = 'fragezeichen.png';
      farbWert = 'darkred';
      eingabeFeld.className = 'fehler';
      eingabeFeld.focus();
    } else if ( isPrimzahl( pruefZahl ) /*=== true*/ ){
      ausgabeText = pruefZahl + ' ist eine Primzahl';
      bildName = 'hakerl.png';
      farbWert = 'lightgreen';
    } else {
      ausgabeText = pruefZahl + ' ist KEINE Primzahl';
      bildName = 'kreuzerl.png';
      farbWert = 'orange';
    }

    document.getElementById('ausgabe').innerText = ausgabeText;
    document.getElementById('iconAusgabe').src = 'images/' + bildName;

    // document.getElementsByTagName('div')[0].style.backgroundColor = farbWert;
    document.querySelector('div.main').style.backgroundColor = farbWert;

    //...oder...
    // document.querySelector('body > div:nth-of-type(1)');
  } // Ende btn.onclick

  btn2.onclick = function(){
    // var min = 2;
    // var max = 100;
    // var zahl = Math.floor(Math.random() * (max - min) + min) + 1;

    var zahl = zufallsInteger(2, 100);
    // console.log( zufallsInteger(555, 7836) );

    document.getElementById('eingabe').value = zahl;
    btn.click();
  }

} // Ende window.onload
