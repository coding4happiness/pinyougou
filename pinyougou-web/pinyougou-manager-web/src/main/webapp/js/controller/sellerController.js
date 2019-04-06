app.controller('sellerController',function($scope,$controller,baseService){

    $controller('baseController',{$scope:$scope});

    $scope.search = function (page, rows) {
        baseService.findByPage("/seller/findByPage",page,rows,$scope.searchSeller).then(function (response) {
            $scope.dataList = response.data.data;
            $scope.paginationConfig.totalItems = response.data.total;
        });
    };

    $scope.show = function (seller) {
        $scope.seller = JSON.parse(JSON.stringify(seller));
    };

    $scope.updateStatus = function (sellerId, status) {
        baseService.sendGet("/seller/updateStatus?sellerId=" + sellerId + "&status=" + status)
            .then(function (response) {
            if(response.data){
                $scope.reload();
            }else{
                alert("操作失败");
            }
        });
    }
});