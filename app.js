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
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg' + '?' + Math.random();
    };

    var shuffle = function(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    };

    $scope.swipeRight = function() {
      console.log('RIGHT!!');
      $scope.socket.emit('Right', {index: $scope.indicies[$scope.index]});
      ++$scope.index;
      $scope.index = $scope.index % $scope.size;
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg' + '?' + Math.random();
      $scope.$apply();
    };

    $scope.swipeLeft = function() {
      console.log('LEFT!!');
      $scope.socket.emit('Left', {index: $scope.indicies[$scope.index]});
      ++$scope.index;
      $scope.index %= $scope.size;
      $scope.image = 'media/' + $scope.indicies[$scope.index] + '.jpg' + '?' + Math.random();
      $scope.$apply();
    };

    $scope.socket.on('update', function(data) {
      $scope.score = $scope.score + data.change;
      console.log(data.change);
      if ($scope.score <= 0) {
        $scope.swipeLeft();
        $scope.score = 50.0; 
      } else if ($scope.score >= 100) {
        $scope.swipeRight();
        $scope.score = 50.0;
      }
    });

    init(22);
}]);
