function updateCanvas() {
  return {

    link: function(scope, element, attrs) {
      // Initialize our canvas context
      c = document.getElementById("photo-canvas");
      var ctx = c.getContext("2d");

      c.style.width='100%';
      c.style.height='100%';
      c.width  = c.offsetWidth;
      c.height = c.offsetHeight;

      scope.$watch('game.manager.currentPhoto', function(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          console.log(newVal);
          var image = new Image();
          image.src = newVal.image_url
          drawImageProp(ctx, image, 0, 0, c.width, c.height);
          console.log("Photo changed! ", newVal.image_url);
        }
      });
    }
  };
}

angular.module('pixelPlay.game').directive('updateCanvas', updateCanvas);