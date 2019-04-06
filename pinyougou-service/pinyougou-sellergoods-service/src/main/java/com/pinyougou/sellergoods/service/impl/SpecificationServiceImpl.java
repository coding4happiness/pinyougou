package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.mapper.SpecificationMapper;
import com.pinyougou.mapper.SpecificationOptionMapper;
import com.pinyougou.pojo.Specification;
import com.pinyougou.pojo.SpecificationOption;
import com.pinyougou.service.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service(interfaceName = "com.pinyougou.service.SpecificationService")
@Transactional
public class SpecificationServiceImpl implements SpecificationService {
    @Autowired
    private SpecificationMapper specificationMapper;
    @Autowired
    private SpecificationOptionMapper specificationOptionMapper;
    @Override
    public PageResult findByPage(Specification specification, Integer page, Integer rows) {
        PageInfo<Specification> pageInfo = PageHelper.startPage(page, rows).doSelectPageInfo(new ISelect() {
            @Override
            public void doSelect() {
                specificationMapper.findAll(specification);
            }
        });
        return new PageResult(pageInfo.getTotal(),pageInfo.getList());
    }

    @Override
    public void save(Specification specification) {
        try{
            //选择insert,即使没有值,所有的字段都会添加一遍
            //使用inserSelective,只会给有值的字段赋值（会对传进来的值做非空判断）
            //向规格表中添加数据
            specificationMapper.insertSelective(specification);
            //向规格选项表中添加数据
            specificationOptionMapper.save(specification);
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

    @Override
    public void update(Specification specification) {
        try{
            //更新规格表数据
            specificationMapper.updateByPrimaryKeySelective(specification);
            //删除规格选项表数据
            SpecificationOption so = new SpecificationOption();
            so.setSpecId(specification.getId());
            specificationOptionMapper.delete(so);
            //新增规格选项表数据
            specificationOptionMapper.save(specification);
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }

    @Override
    public List<SpecificationOption> findSpecOption(Long id) {
        SpecificationOption so = new SpecificationOption();
        so.setSpecId(id);
        return specificationOptionMapper.select(so);
    }

    @Override
    public void deleteAll(Long[] ids) {
        try{
            //删除规格选项表
            specificationOptionMapper.deleteAll(ids);

            //删除规格表
            specificationMapper.deleteAll(ids);
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    @Override
    public List<Map<String, Object>> findSpecList() {
        try{
            return specificationMapper.findSpecList();
        }catch (Exception ex){
            throw new RuntimeException(ex);
        }
    }
}
