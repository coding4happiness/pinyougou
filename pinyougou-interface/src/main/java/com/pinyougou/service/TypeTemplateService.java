package com.pinyougou.service;

import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.TypeTemplate;

import java.util.List;
import java.util.Map;

public interface TypeTemplateService {

    PageResult findByPage(TypeTemplate typeTemplate, Integer page, Integer rows);

    void save(TypeTemplate typeTemplate);

    void update(TypeTemplate typeTemplate);

    void deleteById(Long[] ids);

    TypeTemplate findTypeTemplate(Long typeId);

    List<Map<String,Object>> findAllByIdAndName();
}
