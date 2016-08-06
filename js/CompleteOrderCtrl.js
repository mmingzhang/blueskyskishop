// Controllers
//var cartData = [{ "ItemCode": "", "quantity": "", "DisplayName":"",
//                  "ListPrice":"", "Sizes":"",     "MainImage":""}];
function CompleteOrderCtrl($scope, Page, skiService, $location, $rootScope, cartServices) {
	$scope.cartItems = cartServices.getAll();
	$scope.orderNumber = cartServices.getOrderNumber();
}
