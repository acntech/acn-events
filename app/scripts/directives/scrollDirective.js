'use strict';

angular.module('acnEventsApp')
    .directive('scrollOnClick', function () {
        return {
            restrict: 'A',
            link: function (scope, $elm, attrs) {
                var idToScroll = attrs.href;
                $elm.on('click', function (evt) {
                    evt.preventDefault();
                    var el = document.getElementById(idToScroll);
                    $('body').animate(el.scrollIntoView(true), 'slow');
                });
            }
        };
    });