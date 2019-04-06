package com.pinyougou.pojo;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "tb_brand")
public class Brand implements Serializable{
    @Id//建立主键列与相应实体类的属性的映射关系
    @GeneratedValue(strategy = GenerationType.IDENTITY)//标记主键生成策略
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "first_char")
    private String firstChar;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstChar() {
        return firstChar;
    }

    public void setFirstChar(String firstChar) {
        this.firstChar = firstChar;
    }
}
