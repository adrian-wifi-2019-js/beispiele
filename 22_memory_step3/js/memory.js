console.log('memory.js wurde geladen');

///////////////////////
// Hilfsfunktionen
///////////////////////

// Die Funktion retouniert eine Zahl, die in der Liste noch nicht vorkommt
function neueZahlInListe(liste){
  let zahl = zufallsInteger(1,99);

  if( liste.indexOf(zahl) === -1 ){ // Zahl gibt's noch nicht
    // array.push() fügt einen neuen Eintrag am Ende einer Liste hinzu
    // und entspricht 1:1 folgender Vorgehensweise: array[array.length] = wert;
    liste.push(zahl);
    liste.push(zahl);
  } else {
    // wenn die Zahl bereits vorkommt, ruft die Funktion sich abermals selbst auf
    // Es handelt sich also um eine REKURSIVE FUNKTION
    neueZahlInListe(liste);
  }
}

// function sortiereNachZufall(a, b){
//     return 0.5 - Math.random(); // 50% Wahrscheinlichkeit positiv : negativ
// }

document.addEventListener('DOMContentLoaded', function(){
  const spalten = 4;
  const reihen = 4;
  let zahlen = [];
  let ersteKarte = null;

  // console.log( zufallsInteger(1,99) );

  document.getElementById('btn_start').onclick = neuesSpiel;

  function neuesSpiel(){
    // alte Werte werden reseted
    ersteKarte = null;
    zahlen = [];

    let anzahlKarten = spalten * reihen;

    for(let i = 0; i < anzahlKarten/2; i++){
      neueZahlInListe(zahlen);
    }
    
    shuffleListe(zahlen);
    // zahlen.sort( sortiereNachZufall );

    console.log(zahlen);

    erzeugeSpielfeld ();
  }

  function erzeugeSpielfeld (){
    const spielParent = document.getElementById('spiel');
    const spielGrid = document.createElement('div');

    spielParent.innerHTML = ''; // altes SpielGrid wird gelöscht
    spielGrid.classList.add('memory');

    for(let i = 0; i < spalten * reihen; i++ ){
      let karte = document.createElement('div');
      karte.onclick = karteGeklickt;
      karte.classList.add('karte');

      let inhalt = document.createElement('span');
      inhalt.innerText = zahlen[i];

      karte.appendChild(inhalt);
      spielGrid.appendChild(karte);
    }

    spielParent.appendChild(spielGrid);
  } // Ende erzeugeSpielfeld

  function karteGeklickt(){
    const inhalt = this.firstElementChild;
    this.classList.add('aufgedeckt');

    if(ersteKarte === null || ersteKarte === this){ // keine 1. Karte aufgedeckt...
      ersteKarte = this;
    } else { // 2. Karte wurde aufgedeckt
      const inhaltErsteKarte = ersteKarte.firstElementChild;
      this.onclick = ersteKarte.onclick = null;

      if(inhalt.innerText === inhaltErsteKarte.innerText){ // gleicher Inhalt, beide Karten bleiben aufgedeckt
        inhalt.classList.add('richtig');
        inhaltErsteKarte.classList.add('richtig');
      } else { // verschiedener Inhalt
        inhalt.classList.add('falsch');
        inhaltErsteKarte.classList.add('falsch');

        setTimeout(
          function(){ // Karten werden wieder verdeckt
            // Die Konstanten 'inhalt' und 'inhaltErsteKarte' sind in der übergeordneten Funktion
            // 'karteGeklickt' deklariert und werden nachträglich nicht geändert.
            inhalt.classList.remove('falsch');
            inhaltErsteKarte.classList.remove('falsch');

            // 'this' ist in dieser funktion nicht mehr verfügbar, daher stattdessen: inhalt.parentElement
            inhalt.parentElement.classList.remove('aufgedeckt');
            // 'ersteKarte' bildet als Variable der 'DOMContentLoaded'-Funktion immer die
            // zuletzt aufgedeckte erste Karte ab, daher stattdessen: inhaltErsteKarte.parentElement
            inhaltErsteKarte.parentElement.classList.remove('aufgedeckt');

            inhalt.parentElement.onclick = inhaltErsteKarte.parentElement.onclick = karteGeklickt;
          },
          2000 // delay in ms
        );
      }

      ersteKarte = null;
    }
  } // Ende karteGeklickt

}); // Ende DOMContentLoaded
