package com.management.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by veroo on 2017-02-15.
 */
@Entity
@Table(name="tbl_user")
public class UserModel {
    @Id
    @Column(length = 45, unique = true, nullable = false)
    private String userid;

    @Column(length = 45, nullable = false)
    private String password;

    @Column(length = 45)
    private String name;

    @Column(nullable = false)
    private Date dateCreated;

    @Column(nullable = false)
    private Date dateModified;

    @Column(nullable = true)
    private Date dateLastlogin;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }

    public Date getDateLastlogin() {
        return dateLastlogin;
    }

    public void setDateLastlogin(Date dateLastlogin) {
        this.dateLastlogin = dateLastlogin;
    }
}
