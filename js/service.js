/* Services */

var skiShopSvr = angular.module('appService', [])

        .factory('Page', function($rootScope){
            var pageTitle = "Untitled";
            return {
                title:function(){
                    return pageTitle;
                },
                setTitle:function(newTitle){
                    pageTitle = newTitle;
                }
            }
        })

        .factory ('skiService', function ($http) { 
            var data = null;
            // get json data
            $http.get('js/products.json').success (function(response){
                data = response.productData;
           });
            return {
                getAll:function () { 
                    return data;
                },
                get:function(ItemCode){
                  var i = 0;
                  while (i < data.length) {
                    //console.log(typeof(data[i].ItemCode));
                    //console.log(typeof(ItemCode));
                    if (data[i].ItemCode == ItemCode) // === ???
                      return data[i];
                    i++;
                  }
                  return null;
                },
                getByIndex:function(index){
                      return data[index];
                },
                add:function (note) {
                    var currentIndex = data.length;
                    data.push({
                      ItemCode:currentIndex, DisplayName:note.DisplayName, Brand:note.Brand,
                      ListPrice:note.ListPrice, MainImage:note.MainImage, DisplaySizes:note.DisplaySizes,
                      Sizes:note.Sizes
                    });
                },
                delete:function (ItemCode) {
                    var oldNotes = data;
                    data = [];
                    angular.forEach(oldNotes, function (note) {
                        if (note.ItemCode !== ItemCode) data.push(note);
                    });
                }
            }
});

skiShopSvr.factory("cartServices", function ($rootScope) {
  //var cartData = [{ "ItemCode": "", "Quantity": "", "DisplayName":"",
  //                  "ListPrice":"", "Sizes":"", "MainImage":""}];
  var cartData = [];
  var totalPrice = 0;
  var orderNumber = "111-123456789";

  return  {
            addCartItem:function (anItem, itemcode, itemQty, ListPrice, Sizes) {
              console.log('anItem');
              console.log(anItem.ItemCode);
            var i = 0;
            var total = 0;
            angular.forEach(cartData, function(item) {
              total += item.Quantity * item.ListPrice;
            })
            totalPrice = total + (ListPrice*itemQty);
            
            while (i < cartData.length) {
                  if (cartData[i].ItemCode === anItem.ItemCode &&
                      cartData[i].Sizes == Sizes) { 
                    cartData[i].Quantity += itemQty;
                    return;
                }
                i++;
              }
              cartData.push(anItem);
            },
            getTotal:function(){
              //return totalPrice;
              return (totalPrice.toFixed(2));    
            },
            getAll:function(){
               return cartData;   
            },
            updateTotalPrice:function(){
              var total = 0;
              angular.forEach(cartData, function(item) {
                total += item.Quantity * item.ListPrice;
              })
              //totalPrice = total;
              totalPrice = total;
              return (totalPrice.toFixed(2));  
            },
            getOrderNumber:function(){
              // orderNumber = OrderNumberGenerator();
              return orderNumber;   
            },
            RemoveAllCartItems:function () {
                cartData.length = 0;
				        $rootScope.numberCartItems = 0;
            },
            RemoveCartItem:function (itemcode) {
              var i = 0;
              while (i < cartData.length) {
                //console.log(typeof(cartData[i].ItemCode));
                //console.log(typeof(ItemCode));
                if (cartData[i].ItemCode === itemcode) { 
                  $rootScope.numberCartItems -= cartData[i].Quantity;
                  cartData.splice(i, 1);
                }
                i++;
              }
            } 
          }
        
});
/*
skiShopSvr.factory("checkoutServices", function ($rootScope) {
  //var cartData = [{ "ItemCode": "", "Quantity": "", "DisplayName":"",
  //                  "ListPrice":"", "Sizes":"", "MainImage":""}];
  var BillInfoData = [];
  var ShipAddrData = [];
  var CreditCardData = [];

  var ship2DiffAddr = false;
  var shipType = 0;
  var paymentType = 0;

  return  {
            addBillInfoItem:function (aBillItem) {
              console.log('aBillItem');
              console.log(aBillItem.ItemCode);
            
              BillInfoData.push(aBillItem);
            },
            getAll:function(){
               return BillInfoData;   
            },
            RemoveAllBillInfoItems:function () {
                BillInfoData.length = 0;
            },
            RemoveBillInfoItem:function (aBillItem) {
              var i = 0;
              while (i < BillInfoData.length) {
                //console.log(typeof(BillInfoData[i].Email));
                //console.log(typeof(BillInfoData[i].LastName));
                if (BillInfoData[i].Email === aBillItem.Email) { 
                  BillInfoData.splice(i, 1);
                }
                i++;
              }
            } 
          }
        
});
*/