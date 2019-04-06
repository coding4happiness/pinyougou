package com.pinyougou.service;

import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.Specification;
import com.pinyougou.pojo.SpecificationOption;

import java.util.List;
import java.util.Map;

public interface SpecificationService {

    PageResult findByPage(Specification specification, Integer page, Integer rows);

    void save(Specification specification);

    void update(Specification specification);

    List<SpecificationOption> findSpecOption(Long id);

    void deleteAll(Long[] ids);

    List<Map<String,Object>> findSpecList();

}
