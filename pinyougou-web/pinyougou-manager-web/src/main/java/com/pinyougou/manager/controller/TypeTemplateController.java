package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.TypeTemplate;
import com.pinyougou.service.TypeTemplateService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/typeTemplate")
public class TypeTemplateController {
    @Reference(timeout = 10000)
    private TypeTemplateService typeTemplateService;

    @GetMapping("/findByPage")
    public PageResult findByPage(TypeTemplate typeTemplate, Integer page, Integer rows){
        try{
            if(typeTemplate != null &&
                    StringUtils.isNoneBlank(typeTemplate.getName())){
                typeTemplate.setName(new String(typeTemplate.getName()
                        .getBytes("ISO8859-1"),"utf-8"));
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return typeTemplateService.findByPage(typeTemplate,page,rows);
    }

    @PostMapping("/save")
    public Boolean save(@RequestBody TypeTemplate typeTemplate){
        try{
            typeTemplateService.save(typeTemplate);
            return true;
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return false;
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody TypeTemplate typeTemplate){
        try {
            typeTemplateService.update(typeTemplate);
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return  false;
    }

    @PostMapping("/deleteById")
    public Boolean deleteById(@RequestBody Long[] ids){
        try {
            typeTemplateService.deleteById(ids);
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }

    @GetMapping("/findTypeTemplate")
    public TypeTemplate findTypeTemplate(Long typeId){
        try {
            return typeTemplateService.findTypeTemplate(typeId);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    @GetMapping("/findTypeTemplateList")
    public List<Map<String,Object>> findTypeTemplateList(){
        try {
            return typeTemplateService.findAllByIdAndName();
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
