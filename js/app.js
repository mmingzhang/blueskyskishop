var skiShopApp = angular.module('skiShop', ['appService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
                when('/home', {templateUrl: 'shopviews/home.html',   controller: HomeCtrl}).
                when('/detail/:itemId', {templateUrl: 'shopviews/detail.html',   controller: DetailCtrl}).
                when('/ski', {templateUrl: 'shopviews/ski.html',   controller: ViewCtrl}).
                when('/skis', {templateUrl: 'shopviews/skis.html',   controller: ViewCtrl}).
                when('/skiboots', {templateUrl: 'shopviews/skiboots.html',   controller: ViewCtrl}).
                when('/skipoles', {templateUrl: 'shopviews/skipoles.html',   controller: ViewCtrl}).
                when('/snowboard', {templateUrl: 'shopviews/snowboard.html',   controller: ViewCtrl}).
                when('/snowboards', {templateUrl: 'shopviews/snowboards.html',   controller: ViewCtrl}).
                when('/snowboardboots', {templateUrl: 'shopviews/snowboardboots.html',   controller: ViewCtrl}).
                when('/goggles', {templateUrl: 'shopviews/goggles.html',   controller: ViewCtrl}).
                when('/helmets', {templateUrl: 'shopviews/helmets.html',   controller: ViewCtrl}).
                when('/accessories', {templateUrl: 'shopviews/accessories.html',   controller: ViewCtrl}).
                when('/gloves', {templateUrl: 'shopviews/gloves.html',   controller: ViewCtrl}).
                when('/hats', {templateUrl: 'shopviews/hats.html',   controller: ViewCtrl}).
                when('/cart', {templateUrl: 'shopviews/cart.html',   controller: CartCtrl}).
                when('/checkout', {templateUrl: 'shopviews/checkout.html',   controller: CheckoutCtrl}).
                when('/completeorder', {templateUrl: 'shopviews/completeorder.html',   controller: CompleteOrderCtrl}).
                when('/contactus', {templateUrl: 'shopviews/contactus.html',   controller: ContactCtrl}).
                when('/aboutus', {templateUrl: 'shopviews/aboutus.html',   controller: AboutCtrl}).
                otherwise({redirectTo: '/home'});
}]);

function checkoutCtrl($scope, Page) {
    Page.setTitle("Checkout");
}

skiShopApp.run(function($rootScope) {
    $rootScope.numberCartItems = 0;
});

const SkisMin = 10000000;
const SkisMax = 10999999;
const SkiBootsMin = 11000000;
const SkiBootsMax = 11999999;
const SkiPolesMin = 12000000;
const SkiPolesMax = 19999999;
const SnowboardsMin = 20000000;
const SnowboardsMax = 20999999;
const SnowboardBootsMin = 21000000;
const SnowboardBootsMax = 29999999;
const GogglesMin = 30000000;
const GogglesMax = 39999999;
const HelmetsMin = 40000000;
const HelmetsMax = 49999999;
const AccessoriesGlovesMin = 50000000;
const AccessoriesGlovesMax = 50999999;
const AccessoriesHatsMin = 51000000;
const AccessoriesHatsMax = 59999999;

// Filter: type = 'ski', 'snowboard',...
skiShopApp.filter('skiShopFilter', function ()
{
  return function (skiService,type)  {
    if(!skiService)
      return;
    var filtered = [];
    for (var i = 0; i < skiService.length; i++) {
      var item = skiService[i];
      if (type === 'skis' &&
          item.ItemCode >= SkisMin &&
          item.ItemCode <= SkisMax) {
        filtered.push(item);
      }
      else if (type === 'skiboots' &&
          item.ItemCode >= SkiBootsMin &&
          item.ItemCode <= SkiBootsMax) {
        filtered.push(item);
      }
      else if (type === 'skipoles' &&
          item.ItemCode >= SkiPolesMin &&
          item.ItemCode <= SkiPolesMax) {
        filtered.push(item);
      }
      else if (type === 'snowboards' &&
          item.ItemCode >= SnowboardsMin &&
          item.ItemCode <= SnowboardsMax) {
        filtered.push(item);
      }
      else if (type === 'snowboardboots' &&
          item.ItemCode >= SnowboardBootsMin &&
          item.ItemCode <= SnowboardBootsMax) {
        filtered.push(item);
      }
      else if (type === 'goggles' &&
          item.ItemCode >= GogglesMin &&
          item.ItemCode <= GogglesMax) { 
        filtered.push(item);
      }
      else if (type === 'helmets' &&
          item.ItemCode >= HelmetsMin &&
          item.ItemCode <= HelmetsMax) {
        filtered.push(item);
      }
      else if (type === 'gloves' &&
          item.ItemCode >= AccessoriesGlovesMin &&
          item.ItemCode <= AccessoriesGlovesMax) {
        filtered.push(item);
      }
      else if (type === 'hats' &&
          item.ItemCode >= AccessoriesHatsMin &&
          item.ItemCode <= AccessoriesHatsMax) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
/*
// Filter
skiShopApp.filter('skiShopFilter', function () {
  return function (skiService,type) {
    if(!skiService)
      return;
    var filtered = [];
    for (var i = 0; i < skiService.length; i++) {
    var item = skiService[i];
     if (item.category.indexOf(type) >= 0) {
       filtered.push(item);
     }
    }
    return filtered;
  };
});
*/
skiShopApp.directive('sliderimg', function ($timeout) {
  return {
    restrict: 'AE',
  replace: true,
  scope:{
    images: '='
  },
    link: function (scope, elem, attrs) {
  
    scope.currentIndex=0;

    scope.next=function(){
      scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
    };
    
    scope.prev=function(){
      scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
    };
    
    scope.$watch('currentIndex',function(){
      scope.images.forEach(function(image){
        image.visible=false;
      });
      scope.images[scope.currentIndex].visible=true;
    });
    
    /* Start: For Automatic slideshow*/
    
    var timer;
    
    var sliderFunc=function(){
      timer=$timeout(function(){
        scope.next();
        timer=$timeout(sliderFunc,5000);
      },5000);
    };
    
    sliderFunc();
    
    scope.$on('$destroy',function(){
      $timeout.cancel(timer);
    });
    
    /* End : For Automatic slideshow*/
    
    },
  templateUrl:'shopviews/slider.html'
  }
});

