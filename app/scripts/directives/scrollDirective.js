angular.module('acnEventsApp')
  .directive('scrollOnClick', function () {
    return {
      restrict: 'A',
      link: function (scope, $elm, attrs) {
        var idToScroll = attrs.href;
        $elm.on('click', function (evt) {
          evt.preventDefault();
          var $target;
          if (idToScroll) {
            $target = $(idToScroll);
          } else {
            $target = $elm;
          }
          $("body").animate({scrollTop: $target.offset().top}, "slow");
        });
      }
    }
  });