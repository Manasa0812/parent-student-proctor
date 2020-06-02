var app = angular.module('studentApp',[])
app.controller('studentController',function($scope,$http){
	$http({
  method:'GET',
  url:'/getproctorfeedback'
}).then(function success(responce){
	console.log(responce.data)
  $scope.feed = responce.data;
},function error(responce){
  alert('error occured in pushing data to table');
})
$http({
  method:'GET',
  url:'/getparentmsg'
}).then(function success(responce){
	console.log(responce.data)
  $scope.msg = responce.data;
},function error(responce){
  alert('error occured in pushing data to table');
})


$http({
  method:'GET',
  url:'/getstudentdetails'
}).then(function success(responce){
	console.log(responce.data)
  $scope.detail = responce.data;
},function error(responce){
  alert('error occured in pushing data to table');
})

$scope.details = function(user){
	$scope.userDetails = []
	console.log("working");
	console.log(user);
	$scope.userDetails.push(user);

	// $http({
	// 	method:'POST',
	// 	url:'/postdetail',
	// 	data:user
	// }).then(function success(responce){
	// 	$scope.userDetails = responce.data;
	// },function error(responce){
	// 	console.log('error');
	// })
}
$http({
  method:'GET',
  url:'/getbacklogdetails'
}).then(function success(responce){
	console.log(responce.data)
  $scope.backlog = responce.data;
},function error(responce){
  alert('error occured in pushing data to table');
})
});
//  app.controller('radioController',function($scope,$http){
// 		$scope.attendence={
// 			attend:'present',
			
// 		};

// console.log($scope.attendence)
//   $scope.radiosave= function(attendence){
//     $http({
//       method:'POST',
//       url:'/postradio',
//       data:$scope.attendence
//     }).then(function success(responce){
//          alert('details sent to database');
//     },function error(responce){
//       alert('Error occured');
//     })
//   }

// 	})

