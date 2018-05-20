<?php

$set = 'planechase-anthology';

$cards = json_decode(file_get_contents('cards.json'));
$card_urls = $cards->$set;
$deck = array();
$count_card_urls = count($card_urls);
for ($x = 0; $x < $count_card_urls; $x++) {
  array_push($deck, $x);
}
$max_index = $count_card_urls - 1;
for ($x = 0; $x < $count_card_urls; $x++) {
  $temp = $deck[$x];
  $new_index = rand(0, $max_index);
  $deck[$x] = $deck[$new_index];
  $deck[$new_index] = $temp;
}

?>
<!DOCTYPE html>
<html>
  <head>
    <title>Planechase - MTGeni.us</title>
    <link href="screen.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <a href="#" id="settings"></a>
    <div id="card"></div>
    <script src="script.js" type="text/javascript"></script>
    <script type="text/javascript">
      planechase.init(<?php echo '[', implode(',', $deck), ']'; ?>);
    </script>
  </body>
</html>
