// Controllers

function MainCtrl($scope, Page, skiService, $location, $rootScope) {
    console.log($location.path());
    $scope.currentPath = $location.path();
    $scope.page= Page; 
    $rootScope.numberCartItems = 0;

    $scope.images=[ {src:'HomePage1.jpg',title:'Pic 1'},
                    {src:'HomePage2.jpg',title:'Pic 2'},
                    {src:'HomePage3.jpg',title:'Pic 3'},
                    {src:'HomePage4.jpg',title:'Pic 4'},
                    {src:'HomePage5.jpg',title:'Pic 5'}
                  ]; 
    
    $scope.checkCurrentPath = function () {
        console.log('check path');
        if($location.path() == '/home')
            return true;
        else 
            return false;
    }
}

function ViewCtrl($scope, Page, skiService) {
    Page.setTitle("Items");
    $scope.items = skiService.getAll();
}

function AboutCtrl($scope, Page, skiService) {
    Page.setTitle("About Us");
    $scope.items = skiService.getAll();
} 

