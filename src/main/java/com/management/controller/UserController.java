package com.management.controller;

import com.management.model.UserModel;
import com.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by veroo on 2017-02-15.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String getList(Model model){
        System.out.println("----- User -----");
        System.out.println(model);

        List<UserModel> userModel = userRepository.findAll();

        System.out.println(userModel);
        //List<UserModel> helloList = modelDao.findAll();

        //System.out.println(helloList);
        return "User";
    }

    @ResponseBody
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String getTest(Model model){
        System.out.println("----- Test -----");
        System.out.println(model);
        return "Test";
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    public ModelAndView getPage(Model model){
        System.out.println("----- Page -----");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");
        return mav;
    }
}

