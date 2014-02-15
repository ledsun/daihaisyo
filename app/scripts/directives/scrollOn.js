'use strict';

angular.module('daihaisyoApp')

  /**
   * Scroll to the element when specified event occurs
   */
  .directive('scrollOn', function() {
    return {
      restrict: 'A',
      link: function(scope, $elm, attrs) {
        $elm.on(attrs.scrollOn, function() {
          $('html').animate({
            scrollTop: $elm.offset().top
          }, 'slow');
        });
      }
    };
  });