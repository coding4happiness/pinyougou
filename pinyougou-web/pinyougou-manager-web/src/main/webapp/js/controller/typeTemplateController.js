app.controller('typeTemplateController',function ($scope,$controller,baseService) {

    $controller('baseController',{$scope:$scope});

    $scope.search = function (page,rows) {
        baseService.findByPage("/typeTemplate/findByPage",
            page,rows, $scope.searchTypeTemplate).then(function (response) {
            $scope.dataList = response.data.data;
            $scope.paginationConfig.totalItems = response.data.total;
        });
    };


    $scope.findBrandList = function () {
        baseService.sendGet("/brand/findBrandList").then(function (response) {
            $scope.brandList = {data:response.data};
        });
    };


    $scope.findSpecList = function () {
        baseService.sendGet("/specification/findSpecList").then(function (response) {
            $scope.specList = {data:response.data};
        });
    };

    $scope.addTableRow = function () {
        $scope.typeTemplate.customAttributeItems.push({});
    };

    $scope.deleteTableRow = function (idx) {
        $scope.typeTemplate.customAttributeItems.splice(idx,1);
    };

    $scope.saveOrUpdate = function(){
        for(var index = 0; index < $scope.typeTemplate.customAttributeItems.length; index++){
            if(typeTemplate.customAttributeItems[index].text == '') {
                typeTemplate.customAttributeItems.splice(index, 1);
                index--;
            }
        }
        var url = "save";
        if($scope.typeTemplate.id){
            url = "update";
        }
        baseService.saveOrUpdate("/typeTemplate/" + url, $scope.typeTemplate).then(function (response) {
            if(response.data){
                $scope.reload();
            }else{
                alert("添加失败");
            }
        });
    };

    $scope.show = function (typeTemplate) {
        $scope.typeTemplate = JSON.parse(JSON.stringify(typeTemplate));
        $scope.typeTemplate.brandIds = JSON.parse(typeTemplate.brandIds);
        $scope.typeTemplate.specIds = JSON.parse(typeTemplate.specIds);
        $scope.typeTemplate.customAttributeItems =
            JSON.parse(typeTemplate.customAttributeItems);
    };

    $scope.delete = function () {
        if($scope.ids.length > 0){
            if(confirm("您是否要删除选中的模板？")){
                baseService.deleteById("/typeTemplate/deleteById",$scope.ids).then(function (response) {
                    if(response.data){
                        $scope.reload();
                    }else{
                        alert("删除失败");
                    }
                })
            }
        }else{
            alert("请选择要删除的模板！");
        }
    }
});
