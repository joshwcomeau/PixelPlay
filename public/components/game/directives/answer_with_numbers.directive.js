function answerWithNumbers($document, GameManager) {
  return {
    restrict: 'A',
    link: function() {
      $document.bind('keyup', function(e) {
        if ( e.which === 49 ) {
          $("#answer-1").click();
          $("#answer-1 .number-label").removeAttr("style");
        } else if ( e.which === 50 ) {
          $("#answer-2").click();
          $("#answer-2 .number-label").removeAttr("style");          
        } else if ( e.which === 51 ) {
          $("#answer-3").click();
          $("#answer-3 .number-label").removeAttr("style");
        }
      });

      $document.bind('keydown', function(e) {
        if ( e.which === 49 ) {
          $("#answer-1 .number-label").css({ background: '#347b8e'});
        } else if ( e.which === 50 ) {
          $("#answer-2 .number-label").css({ background: '#347b8e'});
        } else if ( e.which === 51 ) {
          $("#answer-3 .number-label").css({ background: '#347b8e'});
        }
      });
    }
  };
}


angular.module('pixelPlay').directive('answerWithNumbers', ['$document', 'GameManager', answerWithNumbers]);