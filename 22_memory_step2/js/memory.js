console.log('memory.js wurde geladen');

document.addEventListener('DOMContentLoaded', function(){
  const spalten = 4;
  const reihen = 4;
  const zahlen = [22, 5, 66, 5, 24, 66, 22, 24, 10, 10, 99, 99, 1, 1, 42, 42];
  let ersteKarte = null;

  document.getElementById('btn_start').onclick = erzeugeSpielfeld;

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
      // inhalt.style.display = 'none';

      karte.appendChild(inhalt);
      spielGrid.appendChild(karte);
    }

    spielParent.appendChild(spielGrid);
  } // Ende erzeugeSpielfeld

  function karteGeklickt(){
    const inhalt = this.firstElementChild;
    // inhalt.style.display = 'inline';
    this.classList.add('aufgedeckt');

    if(ersteKarte === null || ersteKarte === this){ // keine 1. Karte aufgedeckt...
      ersteKarte = this;
    } else { // 2. Karte wurde aufgedeckt
      const inhaltErsteKarte = ersteKarte.firstElementChild;
      this.onclick = ersteKarte.onclick = null;

      if(inhalt.innerText === inhaltErsteKarte.innerText){ // gleicher Inhalt, beide Karten bleiben aufgedeckt
        inhalt.classList.add('richtig');
        inhaltErsteKarte.classList.add('richtig');
        // inhalt.style.color = inhaltErsteKarte.style.color = 'darkgreen';
      } else { // verschiedener Inhalt
        inhalt.classList.add('falsch');
        inhaltErsteKarte.classList.add('falsch');

        // inhalt.style.color = inhaltErsteKarte.style.color = 'firebrick';

        setTimeout(
          function(){ // Karten werden wieder verdeckt
            // Die Konstanten 'inhalt' und 'inhaltErsteKarte' sind in der übergeordneten Funktion
            // 'karteGeklickt' deklariert und werden nachträglich nicht geändert.
            inhalt.classList.remove('falsch');
            inhaltErsteKarte.classList.remove('falsch');
            // inhalt.style.color = inhaltErsteKarte.style.color = '';

            // 'this' ist in dieser funktion nicht mehr verfügbar, daher stattdessen: inhalt.parentElement
            inhalt.parentElement.classList.remove('aufgedeckt');
            // 'ersteKarte' bildet als Variable der 'DOMContentLoaded'-Funktion immer die
            // zuletzt aufgedeckte erste Karte ab, daher stattdessen: inhaltErsteKarte.parentElement
            inhaltErsteKarte.parentElement.classList.remove('aufgedeckt');

            // inhalt.style.display = inhaltErsteKarte.style.display = 'none';
            inhalt.parentElement.onclick = inhaltErsteKarte.parentElement.onclick = karteGeklickt;
          },
          2000 // delay in ms
        );
      }

      ersteKarte = null;
    }
  } // Ende karteGeklickt

}); // Ende DOMContentLoaded
