package com.pinyougou.service;

import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.Brand;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface BrandService {
    /** 查询所有品牌 */
    List<Brand> findAll();

    void save(Brand brand);

    void update(Brand brand);

    PageResult findByPage(Brand brand, Integer page, Integer rows);

    void deleteAll(Serializable[] ids);
    List<Map<String,Object>> findAllByIdAndName();
}
