app.controller('baseController', function($scope){

    //设置分页查询初始化参数
    $scope.paginationConfig = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        perPageOptions: [10,15,20,25,30],
        onChange: function () {
            $scope.reload();
        }
    };

    //分页查询加载页面
    $scope.reload = function () {
        $scope.search($scope.paginationConfig.currentPage,$scope.paginationConfig.itemsPerPage);
    };

    //存储选中的checkbox索引
    $scope.ids = [];

    $scope.check = function(event,id){
        if(event.target.checked){
            //将选中的checkbox对应的品牌id存入数组
            $scope.ids.push(id);
        }else{
            //查找id的索引
            var idx = $scope.ids.indexOf(id);
            //将数组中的品牌id删除
            $scope.ids.splice(idx,1);
        }
    };
    
    $scope.jsonArr2Str = function (jsonArrStr,key) {
       /* [{"id":16,"text":"TCL"},{"id":13,"text":"长虹"},{"id":14,"text":"海尔"},
            {"id":19,"text":"创维"},{"id":21,"text":"康佳"},{"id":18,"text":"夏普"},
            {"id":17,"text":"海信"},{"id":20,"text":"东芝"},{"id":15,"text":"飞利浦"},
            {"id":22,"text":"LG"},{"id":4,"text":"小米"}]*/
       //将jsonArr转成json对象
        var jsonArr = JSON.parse(jsonArrStr);
        //定义存放json对象值的新数组
        var resArr = [];
        //迭代数组
        for(var i=0; i<jsonArr.length; i++){
            //取数组中的一个元素
            var json = jsonArr[i];
            //把json对象的值存入新数组中
            resArr.push(json[key]);
        }
        //返回新数组中的元素用逗号分隔的字符串
        return resArr.join(",");
    };

});