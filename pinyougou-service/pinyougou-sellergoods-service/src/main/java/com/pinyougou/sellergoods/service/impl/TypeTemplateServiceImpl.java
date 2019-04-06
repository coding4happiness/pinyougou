package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.mapper.TypeTemplateMapper;
import com.pinyougou.pojo.TypeTemplate;
import com.pinyougou.service.TypeTemplateService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service(interfaceName = "com.pinyougou.service.TypeTemplateService")
public class TypeTemplateServiceImpl implements TypeTemplateService{

    @Autowired
    private TypeTemplateMapper typeTemplateMapper;
    @Override
    public PageResult findByPage(TypeTemplate typeTemplate, Integer page, Integer rows) {
            PageInfo<TypeTemplate> pageInfo = PageHelper.
                    startPage(page, rows).doSelectPageInfo(new ISelect() {
                @Override
                public void doSelect() {
                    typeTemplateMapper.findAll(typeTemplate);
                }
            });
            return new PageResult(pageInfo.getTotal(),pageInfo.getList());
    }

    @Override
    public void save(TypeTemplate typeTemplate) {
        typeTemplateMapper.insertSelective(typeTemplate);
    }

    @Override
    public void update(TypeTemplate typeTemplate) {
        typeTemplateMapper.updateByPrimaryKeySelective(typeTemplate);
    }

    @Override
    public void deleteById(Long[] ids) {
        try {
            typeTemplateMapper.deleteAll(ids);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @Override
    public TypeTemplate findTypeTemplate(Long typeId) {
        TypeTemplate typeTemplate = new TypeTemplate();
        typeTemplate.setId(typeId);
        return typeTemplateMapper.selectOne(typeTemplate);
    }

    @Override
    public List<Map<String,Object>> findAllByIdAndName() {
        return typeTemplateMapper.findAllByIdAndName();
    }


}
