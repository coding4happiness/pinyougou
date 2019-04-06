app.controller('sellerController',function ($scope, $controller, baseService) {
    $controller('baseController',{$scope:$scope});

    $scope.saveOrUpdate = function () {
        var url = "save";
        if ($scope.seller.id){
            url = "update";
        }
        baseService.sendPost("/seller/" + url, $scope.seller).then(function (response) {
            if(response.data){
                location.href = "/shoplogin.html";
            }else{
                alert("操作失败!");
            }
        })
    };
});