function HomeCtrl($scope, $location) {

    $scope.shopSkiGear = function () {
        console.log("shopSkiGear");
        $location.path( '/ski' );
    }

    $scope.shopSnowboardGear = function () {
        $location.path( '/snowboard' );
    }

    $scope.shopGoggles = function () {
        $location.path( '/goggles' );
    }

    $scope.shopHelmets = function () {
        $location.path( '/helmets' );
    }

    $scope.shopAccessories = function () {
        console.log("shopAccessories");
        $location.path( '/accessories' );
    }

}
