package com.pinyougou.pojo;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class GoodsDesc implements Serializable{
    @Id
    @Column(name="goods_id")
    private Long goodsId;
    @Column(name="introduction")
    private String introduction;
    @Column(name="specification_items")
    private String specificationItems;
    @Column(name="custom_attribute_items")
    private String customAttributeItems;
    @Column(name="item_images")
    private String itemImages;
    @Column(name="package_list")
    private String packageList;
    @Column(name="sale_service")
    private String saleService;

    public Long getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Long goodsId) {
        this.goodsId = goodsId;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getSpecificationItems() {
        return specificationItems;
    }

    public void setSpecificationItems(String specificationItems) {
        this.specificationItems = specificationItems;
    }

    public String getCustomAttributeItems() {
        return customAttributeItems;
    }

    public void setCustomAttributeItems(String customAttributeItems) {
        this.customAttributeItems = customAttributeItems;
    }

    public String getItemImages() {
        return itemImages;
    }

    public void setItemImages(String itemImages) {
        this.itemImages = itemImages;
    }

    public String getPackageList() {
        return packageList;
    }

    public void setPackageList(String packageList) {
        this.packageList = packageList;
    }

    public String getSaleService() {
        return saleService;
    }

    public void setSaleService(String saleService) {
        this.saleService = saleService;
    }
}
