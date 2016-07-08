// console.log('\'Allo \'Allo!');

function fadeCard(elem, diff) {
  // console.log('huzzah, diff =' + diff);
  $(elem).css( "opacity", diff );
}
function fadeCardReset(elem) {
  $(elem).css( "opacity", 1 );
}
function removeCard(elem) {
  $(elem).slideUp("slow");
}

var draggable = Draggable.create(".draggable", {
	type:"x",
	lockAxis:true,
  throwProps:true,
	onClick:function() {
		console.log("clicked");
    //removeCard(this.target);
	},
  onDrag:function() {
    // console.log("dragging");
    var currentX = this.x;
    var cardWidth = this.target.offsetWidth;
    // console.log(currentX + "and the card is " + cardWidth + " wide");
    if ( Math.abs(currentX) >= (cardWidth/4) ) {
      var difference = 1-(Math.abs(currentX)/cardWidth);
      fadeCard(this.target, difference);
    }
    else {
      fadeCardReset(this.target);
    }
  },
  onDragEnd:function(){
    // console.log("drag ended");
    var currentX = this.x;
    var cardWidth = this.target.offsetWidth;
    if ( Math.abs(currentX) >= (cardWidth/8*5) ) {
      // console.log("get rid of this guy!")
      if (currentX > 0) {
        TweenLite.to(
          this.target , 0.25 , { x:cardWidth+30 , y:0 , onComplete: removeCard, onCompleteParams:[this.target] }
        );
      }
      else if (currentX < 0) {
        TweenLite.to(
          this.target , 0.25 , { x:-cardWidth-30 , y:0 , onComplete: removeCard, onCompleteParams:[this.target] }
        );
      }
    }
    else {
      TweenLite.to( this.target , 1 , { x:0 , y:0 });
      fadeCardReset(this.target);
    }
  }
});
