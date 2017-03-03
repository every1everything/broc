/**
 * Created by veroo on 2017-02-16.
 */
var PageRoute = {
    targetID: "main-container",
    beforePage: "",
    currentPage: "",
    selectPage: function (page) {
        if(page === 'login'){
            PageRoute.page.login();
        } else if(page === 'main') {
            PageRoute.page.main();
        }

        PageRoute.beforePage = PageRoute.currentPage;
        PageRoute.currentPage = page;
    },
    page: {
        login: function () {
            loginController.action.returnFn = PageRoute.action.login;
            $("#" + PageRoute.targetID).html(loginController.getHtml());

            $("#btn-login").on("click", loginController.action.login);
        },
        main: function () {
            //mainController.action.returnFn = PageRoute.action.login;
            $("#" + PageRoute.targetID).html(mainController.getHtml());
            mainController.action.menu();
        }
    },
    action:{
        login: function (parameters) {
            PageRoute.selectPage("main");
        }
    }
};

$(document).ready(function() {
    PageRoute.selectPage("login");
});