// Controllers
//var cartData = [{ "ItemCode": "", "quantity": "", "DisplayName":"",
//                  "ListPrice":"", "Sizes":"",     "MainImage":""}];
function CheckoutCtrl($scope, Page, skiService, $location, $rootScope, cartServices) {
    $scope.orderItems = cartServices.getAll();
    $scope.subtotal = cartServices.getTotal();
    
    $scope.shipTypeArray = [];
    $scope.shipTypeArray.push({name:"Free Shipping", detail:"(4-9 Business Days) $0.00", price:0.0 });
    $scope.shipTypeArray.push({name:"Expedited Shipping", detail:"(3-7 Business Days) $4.99", price:4.99 });
    $scope.shipTypeArray.push({name:"Express Shipping", detail:"(1-5 Business Days) $6.99", price:6.99 });
    $scope.selectedShip = $scope.shipTypeArray[0].price;
    $scope.total = parseFloat($scope.subtotal + $scope.selectedShip).toFixed(2);
   
    $scope.creditCardTypeArray = ["Visa", "MasterCard", "American Express", "Discover"];
    //$scope.creditCardTypeItem = $scope.creditCardTypeArray[0];
    $scope.creditCardExpDateMArray = ["01-January","02-February","03-March","04-April","05-May","06-June",
                                      "07-July","08-August","09-September","10-October","11-November","12-December"];
    //$scope.creditCardExpDateMItem = $scope.creditCardExpDateMArray[0];
    $scope.creditCardExpDateYArray = ["2016", "2017", "2018", "2019", "2020", "2021",
                                      "2022", "2023", "2024", "2025", "2026", "2027"];
    //$scope.creditCardExpDateYItem = $scope.creditCardExpDateYArray[0];
	
    $scope.billStateArray = ["Alabama","Alaska","Arizona","Arkansas","California", 
                             "Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",  
                             "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland", 
                             "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska", 
                             "Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina", 
                             "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island", 
                             "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia", 
                             "Washington","West Virginia","Wisconsin","Wyoming"];                         

    $scope.billCountryArray = ["United States"];
    $scope.check_bill_country = $scope.billCountryArray[0];
    $scope.check_ship_country = $scope.billCountryArray[0];

    $scope.ShipOtherAddr = function () {
        //console.log ("ShipOtherAddr");
    }
 
    $scope.GetDisplaySizes = function(item) {
        if (item.Sizes === "N/A")
            return false;
        else 
            return true;
    };

    $scope.UpdateSelectShip = function(shipType) {
      $scope.selectedShip = shipType.price;
      var orderTotal = parseFloat($scope.subtotal) + parseFloat($scope.selectedShip);
      $scope.total = parseFloat(orderTotal).toFixed(2);
    };

    $scope.UpdateShipAddr = function() {
        $scope.check_ship_first = $scope.check_bill_first;
        $scope.check_ship_last = $scope.check_bill_last;
        $scope.check_ship_company = $scope.check_bill_company;
        $scope.check_ship_email = $scope.check_bill_email;
        $scope.check_ship_addr = $scope.check_bill_addr;
        $scope.check_ship_apt = $scope.check_bill_apt;
        $scope.check_ship_city = $scope.check_bill_city;
        $scope.check_ship_state = $scope.check_bill_state;
        $scope.check_ship_zip = $scope.check_bill_zip;
        $scope.check_ship_country = $scope.check_bill_country;
        $scope.check_ship_phone = $scope.check_bill_phone,
        $scope.check_ship_fax = $scope.check_bill_fax;
    };

    UpdateShipData = function () {
      
      if ($scope.ShipOtherAddr === false) {
        $scope.check_ship_first = $scope.check_bill_first;
        $scope.check_ship_last = $scope.check_bill_last;
        $scope.check_ship_company = $scope.check_bill_company;
        $scope.check_ship_email = $scope.check_bill_email;
        $scope.check_ship_addr = $scope.check_bill_addr;
        $scope.check_ship_apt = $scope.check_bill_apt;
        $scope.check_ship_city = $scope.check_bill_city;
        $scope.check_ship_state = $scope.check_bill_state;
        $scope.check_ship_zip = $scope.check_bill_zip;
        $scope.check_ship_country = $scope.check_bill_country;
        $scope.check_ship_phone = $scope.check_bill_phone,
        $scope.check_ship_fax = $scope.check_bill_fax;
      }
    };

    $scope.placeOrder = function () {
        //alert("Place Order");

        $scope.orderNumber = cartServices.getOrderNumber();
        UpdateShipData();
        var checkoutData = JSON.stringify({
            orderNumber: $scope.orderNumber,
            // bill data
            billFirstName: $scope.check_bill_first,
            billLastName: $scope.check_bill_last,
            billCompany: $scope.check_bill_company,
            billEmail: $scope.check_bill_email,
            billAddr: $scope.check_bill_addr,
            billApt: $scope.check_bill_apt,
            billCity: $scope.check_bill_city,
            billState: $scope.check_bill_state,
            billZip: $scope.check_bill_zip,
            billCountry: $scope.check_bill_country,
            billPhone: $scope.check_bill_phone,
            billFax: $scope.check_bill_fax,
            // ship data
            shipFirstName: $scope.check_ship_first,
            shipLasttName: $scope.check_ship_last,
            shipCompany: $scope.check_ship_company,
            shipEmail: $scope.check_ship_email,
            shipAddr: $scope.check_ship_addr,
            shipApt: $scope.check_ship_apt,
            shipCity: $scope.check_ship_city,
            shipState: $scope.check_ship_state,
            shipZip: $scope.check_ship_zip,
            shipCountry: $scope.check_ship_country,
            shipPhone: $scope.check_ship_phone,
            shipFax: $scope.check_ship_fax,
            // shipping method
            shipType: $scope.selectedShip,
            // payment method
            payCreditCardType: $scope.creditCardTypeItem,
            payCreditCardNum: $scope.cardNumPay,
            payCreditCardExpMonth: $scope.creditCardExpDateMItem,
            payCreditCardExpYear: $scope.creditCardExpDateYItem,
            payCreditCardVerifyNum: $scope.cardVerfNum,
            // order info
            orderItems: $scope.orderItems,
            orderSubtotal: $scope.subtotal,
            orderTotal: $scope.total
         });

        //$http.post("/echo/json/", checkoutData).success(function(checkoutData, status) {
        //  //alert("checkoutData is sent");
        //});

        if ($scope.subtotal > 0) {
            cartServices.RemoveAllCartItems();
            $location.path( '/completeorder' );
        }
        else {
            alert("You have no items in your shopping cart. Shop great deals now!");
            $location.path( '/home' );
        }
    }
}
