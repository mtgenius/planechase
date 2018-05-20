var planechase = {
  deck: [],
  init: function(deck) {
    this.deck = deck;
  },
  next: function() {
    this.deck.push(this.deck.shift());
    this.render();
  },
  render: function() {
    document.getElementById('card').style.backgroundImage = 'url()';
  },
  roll: function() {
    var result = Math.floor(Math.random() * 6);
  }
};
