/** 品牌服务层 */
app.service("baseService", function($http){

    //发送get请求
    this.sendGet = function(url,data){
        if(data){
            url = url + "?" + data;
           //return $http.get(url,data);
        }
        return $http.get(url);
    };

    //发送post请求
    this.sendPost = function (url,data) {
        if(data){
            return $http.post(url,data);
        }else{
            return $http.post(url);
        }
    };

    //查询所有
    this.findAll = function (url) {
        return this.sendGet(url);
    };

    //分页查询(带条件查询和不带条件查询)
    this.findByPage = function (url,page,rows,data) {
        url = url + '?page=' + page + '&rows=' + rows;
        if(data && (JSON.stringify(data) != "{}")){
            //如果url = url + "?" + data;传递请求参数时，前端传的参数应为对象；只能通过$http的形式传送
            // 如果
            return $http({
                method: 'get',
                url: url,
                params: data
            });
            return this.sendGet(url,data);
        }else{
            return this.sendGet(url);
        }
    };

    //插入与修改
    this.saveOrUpdate = function (url, data) {
        return this.sendPost(url,data);
    };

    //删除和批量删除
    this.deleteById = function (url, ids) {
        return this.sendPost(url,ids);
    };

    /** 定义文件异步上传的方法 */
    this.uploadFile = function(){
        // 创建表单数据对象
        var formData = new FormData();
        // 第一个参数：请求参数名称
        // 第二个参数：取html页面中第一个file元素
        // 表单数据对象追加上传的文件
        formData.append("file", file.files[0]);
        // 发送异步请求
        return $http({
            method : 'post', // 请求方式
            url : '/upload', // 请求URL
            data : formData, // 表单数据对象
            headers : {"Content-Type": undefined}, // 设置请求头
            transFormRequest : angular.identity // 转换表单请求(把文件转化成字节)
        });
    };

});