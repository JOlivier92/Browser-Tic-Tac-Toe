class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on ("click","li", (event => {
      let square = $(event.currentTarget);
      this.makeMove(square);
    }));
  }

  makeMove($square) {
    // alert("clicked")
    let currentPlayer = this.game.currentPlayer;
    try {
      this.game.playMove($square.data("pos"));
    } catch (exception) {
      alert(exception.msg);
      return ;
    }

    $square.addClass(currentPlayer);

    if (this.game.isOver()) {
      this.$el.off("click");

      let winner = this.game.winner();
      const $figcaption = $("<figcaption>");
      if (winner) {
        $figcaption.html(`Congrats, ${winner}, you won.`)
      } else {
        $figcaption.html("It's a draw :(")
      }
      this.$el.append($figcaption);
    }
  }


  setupBoard() {
    const $ul = $("<ul>");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
