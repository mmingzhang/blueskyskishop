// Controllers

function ContactCtrl($scope, Page, skiService, $http) {
    $scope.contactUser = { 'name': '','email' : '', 'phone' : '', 'msg' : ''};

    $scope.btnSendMsg = function() {
      
      if ($scope.contactForm.$valid === true)
      {
        $scope.contactUser.email = $scope.contactUser_email;
        var contactData = JSON.stringify($scope.contactUser);
        console.log(contactData);
        // Send contactData to server
    		//$http.post("/echo/json/", contactData).success(function(contactData, status) {
    		  //alert("contactData is sent");
    		//});
      }
	    
    };
} 
