// Controllers
//var cartData = [{ "ItemCode": "", "quantity": "", "DisplayName":"",
//                  "ListPrice":"", "Sizes":"",     "MainImage":""}];
function CartCtrl($scope, Page, skiService, $location, $rootScope, cartServices) {
	$scope.cartItems = cartServices.getAll();
	$scope.total = cartServices.getTotal();

	$scope.RemoveItem = function (item) {
        var id = item.ItemCode;
        cartServices.RemoveCartItem(id);
        // Update 
        cartServices.updateTotalPrice();
        $scope.cartItems = cartServices.getAll();
		$scope.total = cartServices.getTotal();
    }

    $scope.UpdateTotal = function () {
        var total = 0;
        $scope.cartItems = cartServices.getAll();
        angular.forEach($scope.cartItems, function(item) {
        total += item.Quantity * item.ListPrice;
        })
        $scope.total = total;
        cartServices.updateTotalPrice();
    }


    $scope.GetDisplaySizes = function(item) {
        if (item.Sizes === "N/A")
            return false;
        else 
            return true;
    };

    $scope.conShopping = function () {
        $location.path( '/home' );
    }

    $scope.checkout = function () {

        if ($scope.total > 0)
            $location.path( '/checkout' );
        else
            alert("You have no items in your shopping cart. Shop great deals now!");
    }
}
