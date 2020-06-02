var app = angular.module('myapp',[])
app.controller('myController',function($scope,$http,$window){

$scope.submitData = function(user){
    $http({
      method:'POST',
      url:'/postdata',
      data:$scope.user,
    }).then(function success(responce){
        // alert('details sent to database');

       window.location.href = '/student'
         // console.log($scope.user)

    },function error(responce){
      alert('Error occured');
      $scope.users = {};
    })
  }

});
app.controller('youController',function($scope,$http,$window){
  $scope.saveData = function(proctor){
    $http({
      method:'POST',
      url:'/postpro',
      data:$scope.proctor,
    }).then(function success(responce){
        // alert('details sent to database');

       window.location.href = '/proctor'
         // console.log($scope.user)

    },function error(responce){
      alert('Error occured');
      $scope.proctors = {};
    })
  }

});
app.controller('parentController',function($scope,$http,$window){
  $scope.submitparent= function(child){
    $http({
      method:'POST',
      url:'/postparent',
      data:$scope.child,
    }).then(function success(responce){
        // alert('details sent to database');

       window.location.href = '/parent'
         // console.log($scope.user)

    },function error(responce){
      alert('Error occured');
      $scope.child = {};
    })
  }

});