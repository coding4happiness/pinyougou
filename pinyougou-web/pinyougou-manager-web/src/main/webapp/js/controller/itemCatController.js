app.controller('itemCatController',function ($scope, $controller, baseService) {

    $controller('baseController',{$scope:$scope});

    $scope.findItemCatByParentId = function(parentId){
        baseService.sendGet("/itemCat/findItemCatByParentId","parentId=" + parentId)
            .then(function (response) {
                //$scope.itemCat.parentId = parentId;
                if(response.data){
                $scope.dataList = response.data;
            }
        });
    };

    $scope.findTypeTemplate = function (typeId) {
        baseService.sendGet("/typeTemplate/findTypeTemplate","typeId=" + typeId)
            .then(function (response) {
                $scope.typeTemplate = response.data;

        })
    };

    $scope.show = function(itemCat){
        $scope.itemCat = JSON.parse(JSON.stringify(itemCat));
    };

    $scope.grade = 1;

    $scope.selectList = function(itemCat, grade){
        $scope.grade = grade;
        if(grade == 1){
            $scope.itemCat_1 = null;
            $scope.itemCat_2 = null;
        }
        if(grade == 2){
            $scope.itemCat_1 = itemCat;
            $scope.itemCat_2 = null;
        }
        if(grade == 3){
            $scope.itemCat_2 = itemCat;
        }
        $scope.findItemCatByParentId(itemCat.id);
    };

    $scope.findTypeTemplateList = function () {
        baseService.sendGet("/typeTemplate/findTypeTemplateList").then(function (response) {
            $scope.typeTemplateList = {data:response.data};
        })
    };

    $scope.saveOrUpdate = function () {
        url = "save";
        if($scope.itemCat.id){
            url = "update";
        }
        baseService.saveOrUpdate("/itemCat/" + url, $scope.itemCat).then(function (response) {
            if(response.data){
                $scope.findItemCatByParentId($scope.itemCat.parentId);
            }else{
                alert("添加失败");
            }
        });
    };


});