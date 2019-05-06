const GLOBALE_KONSTANTE = 123;

function globaleFunktion(){
  var langerName = 3;
  var auchEinLangerName = 4;

  function lokaleFunktion(foo){
    return langerName + foo;
  }

  return lokaleFunktion(auchEinLangerName);
}

