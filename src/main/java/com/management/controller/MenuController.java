package com.management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by veroo on 2017-02-16.
 */
@Controller
public class MenuController {

    @ResponseBody
    @RequestMapping(value = "/menus", method = RequestMethod.GET)
    public String menuList() {
        return "{\"msg\":\"OK\"}";
    }
}
