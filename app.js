
var app = angular.module('app', []);

app.controller('Ctrlr1', ['$scope', '$http', function($scope, $http) {
    $scope.image = '' ;
    $scope.indicies = [];
    $scope.index = 0;
    $scope.size = 22;
    $scope.socket = io();
    $scope.score = 50.0;

    var init = function(size) {
      for (var i = 1; i <= size; ++i) {
        $scope.indicies.push(i);
      }
      shuffle($scope.indicies);
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg';
    };

    var shuffle = function(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    };

    $scope.swipeRight = function() {
      $scope.socket.emit('Right', {index: $scope.indicies[$scope.index]});
      ++$scope.index;
      $scope.index %= $scope.size;
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg';
    };

    $scope.swipeLeft = function() {
      $scope.socket.emit('Left', {index: $scope.indicies[$scope.index]});
      ++$scope.index;
      $scope.index %= $scope.size;
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg';
    };

    $scope.socket.on('update', function(data) {
      $scope.score += data.change;
      if ($score.score <= 0) {
        $scope.swipeLeft();
        $scope.scope = 50.0; 
      } else {
        $scope.swipeRight();
        $scope.score = 50.0;
      }
    });

    init(22);
}]);
