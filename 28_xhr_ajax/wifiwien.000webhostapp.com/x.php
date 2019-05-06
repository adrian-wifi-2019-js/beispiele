<?php
  header( 'Access-Control-Allow-Origin: *' );
  header( 'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );

  sleep(1);

  $err = null;

  if ( !isset( $_POST['x'] ) ) {
    $err = 'x ist nicht definiert.';
  } else if ( !is_numeric($_POST['x']) ) {
    $err = 'Kein Zahlenwert.';
  }

  if ($err) {
    echo '{"fehler":"' . $err . '"}';
    exit;
  }

  echo '{"x2":'.$_POST['x'] * $_POST['x'].'}';

  // echo 'Hallo ich Server! Deine Daten: '.$_POST['x'];
?>
