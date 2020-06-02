var app = angular.module('studentApp',[])
app.controller('studentController',function($scope,$http){
$scope.save = function(feed){
    $http({
      method:'POST',
      url:'/poststudentfeed',
      data:$scope.feed,
    }).then(function success(responce){
        alert('details sent to database');
         $scope.feedbacks.push(responce.data)
         $scope.feed = {};

       // window.location.href = '/student'
         // console.log($scope.user)

    },function error(responce){
      alert('Error occured');
      
    })
  }

  $scope.submit = function(feed){
    $http({
      method:'POST',
      url:'/postconfidential',
      data:$scope.feed,
    }).then(function success(responce){
        alert('details sent to database');
         // $scope.feedbacks.push(responce.data)
         // $scope.confidential = {};

       // window.location.href = '/student'
         // console.log($scope.user)

    },function error(responce){
      alert('Error occured');
      
    })
  }


});
app.controller('academicController',function($scope,$http){
 $http({
  method:'GET',
  url:'/academics'
 }).then(function success(responce){
  $scope.k = []
  $scope.a = []
  $scope.b = []
  $scope.c = []
  var g = responce.data
  for(var i = 0;i<g.length;i++){
   if(g[i].semester == 1){
    console.log('if working')
      $scope.k.push(g[i]);
}
  if(g[i].semester == 2){
        $scope.a.push(g[i]);

   }
   if(g[i].semester == 3){
       $scope.b.push(g[i]);
     }
  if(g[i].semester == 4){
       $scope.c.push(g[i]);
      }
 //     if(g[i].semester == 5){
 //       d.push(g[i]);
 //     }
 //     if(g[i].semester == 6){
 //       e.push(g[i]);
 //     }
 //     if(g[i].semester == 7){
 //       f.push(g[i]);
 //     }
 //     if(g[i].semester == 8){
 //       h.push(g[i]);
 //     }
   }
  // $scope.sem1= responce.data;
 },function error(responce){
  console.log('error getting');
 })
})