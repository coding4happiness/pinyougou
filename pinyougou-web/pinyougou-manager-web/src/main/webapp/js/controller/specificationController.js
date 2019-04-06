/** 定义规格控制器层 */
app.controller('specificationController', function($scope, $controller, baseService){


    $controller('baseController', {$scope:$scope});

    //增加一行
    $scope.addTableRow = function(){
        $scope.specification.specificationOptions.push({});
    };

    //删除一行
    $scope.deleteTableRow = function(index){
        //splice(index,howmany,item1,.....,itemX)
        //index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
        //howmany:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
        //item:可选。向数组添加的新项目。
        $scope.specification.specificationOptions.splice(index,1);
    };

    $scope.search = function (page,rows) {
        baseService.findByPage("/specification/findByPage", page, rows, $scope.searchSpecification).then(function (response) {
            $scope.dataList = response.data.data;
            $scope.paginationConfig.totalItems = response.data.total;
        });
    };

    //修改、新增
    $scope.saveOrUpdate = function () {
        var url = "save";
        if($scope.specification.id){
            url = "update";
        }
        baseService.saveOrUpdate("/specification/" + url, $scope.specification).then(function (response) {
            if(response.data){
                $scope.reload();
            }else{
                alert("添加失败");
            }
        });
    };


    //修改按钮点击事件
    $scope.show = function (specification) {
        //JSON.parse(jsonstr)将格式完好的json字符串转换为json对象
        //JSON.stringify(jsonobj)将json对象转换为json字符串
        $scope.specification = JSON.parse(JSON.stringify(specification));
        baseService.sendGet("/specification/findSpecOption?id=" + specification.id).then(function (response) {
            $scope.specification.specificationOptions = response.data;
        });
    };



    $scope.delete = function () {
        if($scope.ids.length > 0){
            if(confirm("您是否要删除选中的规格？")){
                baseService.deleteById("/specification/delete",$scope.ids).then(function (response) {
                    if(response.data){
                        $scope.ids = [];
                        $scope.reload();
                    }
                });
            }
        }else{
            alert("请选择要删除的规格！");
        }
    };

});