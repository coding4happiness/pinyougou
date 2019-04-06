/** 定义品牌控制器层 */
app.controller('brandController', function($scope, $controller, baseService){

    // 品牌控制器继承基础控制器
    // 第一个$scope为 baseController
    // 第二个$scope为 brandController
    $controller('baseController', {$scope:$scope});

    $scope.findAll = function () {
        baseService.findAll("/brand/findAll").then(function (response) {
            $scope.dataList = response.data;
        });
    };

    $scope.search = function (page,rows) {
        baseService.findByPage("/brand/findByPage", page, rows, $scope.searchBrand).then(function (response) {
            $scope.dataList = response.data.data;
            $scope.paginationConfig.totalItems = response.data.total;
        });
    };

    $scope.saveOrUpdate = function () {
        var url = "save";
        if($scope.brand.id){
            url = "update";
        }
        baseService.saveOrUpdate("/brand/" + url, $scope.brand).then(function (response) {
            if(response.data){
                $scope.reload();

            }else{
                alert("添加失败");
            }
        });
    };


    //修改按钮点击事件
    $scope.show = function (brand) {
        $scope.brand = JSON.parse(JSON.stringify(brand));
    };



    $scope.delete = function () {
        if($scope.ids.length > 0){
            if(confirm("您是否要删除选中的品牌？")){
                baseService.deleteById("/brand/delete",$scope.ids).then(function (response) {
                    if(response.data){
                        $scope.ids = [];
                        $scope.reload();
                    }
                });
            }
        }else{
            alert("请选择要删除的品牌！");
        }
    };

});