// Controllers

const QtyMax = 100;
function DetailCtrl($scope, Page, skiService, $routeParams, $rootScope, cartServices) {
    var id = $scope.itemId = $routeParams.itemId;
    var title = "Detail";

    //Page.setTitle(title);
    $scope.item = skiService.get(id);
    $scope.items = skiService.getAll();
    $scope.inputQty = 1;
    $scope.selectedSizeItemArray = [];
    $scope.selectedSizeItem = "N/A";

    var sizeTemp, sizeItem, i;
    var sizeArray = [];
    sizeTemp = $scope.item.Sizes;

    if ($scope.item.DisplaySizes === false || $scope.item.Sizes === "") {
        sizeTemp = {"Sizes": "N/A"};
        $scope.selectedSizeItemArray.push(sizeTemp);
        $scope.selectedSizeItem = $scope.selectedSizeItemArray[0].size;
        return;
    }

    sizeArray = sizeTemp.split(',');
    $scope.select = {};

    for (i=0; i<sizeArray.length; i++) {
        sizeItem = {"Sizes": sizeArray[i]};
        $scope.selectedSizeItemArray.push(sizeItem);
    }
    $scope.selectedSizeItem = $scope.selectedSizeItemArray[0].Sizes;

    $scope.increaseQty = function() {
        if ($scope.inputQty >= QtyMax)
            $scope.inputQty = QtyMax;
        else
            $scope.inputQty = $scope.inputQty + 1;
    };
    $scope.decreaseQty = function() {
        if ($scope.inputQty <= 1)
            $scope.inputQty = 1;
        else
            $scope.inputQty = $scope.inputQty - 1;
    };

    $scope.showSelectedImage = function(index) {

        if (index === 1)
            $scope.item.DisplayImg = $scope.item.AltImage;
        else if (index === 2)
            $scope.item.DisplayImg = $scope.item.AltImage2;
        else 
            $scope.item.DisplayImg = $scope.item.MainImage;
    };

    //var cartData = [{ "ItemCode": "", "Quantity": "", "DisplayName":"",
    //                  "ListPrice":"", "Sizes":"",     "MainImage":""}];
    $scope.btnAdd2Cart = function() {
        var anIItem = { "ItemCode":$scope.item.ItemCode, 
                          "Quantity":$scope.inputQty,
                          "DisplayName":$scope.item.DisplayName,
                          "ListPrice":$scope.item.ListPrice,
                          "Sizes":$scope.selectedSizeItem,
                          "MainImage":$scope.item.MainImage
                        };
        
        cartServices.addCartItem(anIItem, $scope.item.ItemCode, $scope.inputQty,
                                 $scope.item.ListPrice, $scope.selectedSizeItem);
        $rootScope.numberCartItems += $scope.inputQty;
    };

     $scope.GetDisplaySizes = function() {
       return $scope.item.DisplaySizes;
    };

    $scope.GetEnableAltImage = function() {
       return $scope.item.EnableAltImage;
    };

    $scope.GetEnableAltImage2 = function() {
       return $scope.item.EnableAltImage2;
    };

}
