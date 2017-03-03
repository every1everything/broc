/**
 * Created by veroo on 2017-02-16.
 */
var mainController = {
    menuContainer: "tab-main-menus",
    getHtml: function () {
        var html = '<ul id = "' + mainController.menuContainer + '" class="nav nav-tabs" role="tablist"></ul>';
        html += '<div id = "tab-main-panel" class="tab-panel"></div>';
        return html;
    },
    action:{
        menu: function () {
            $.ajax({
                url: "/menus/",
                type: "GET"
            }).done(function (response) {
                var htmlMenus = "";
                //var list = response.results;

                var list = [];
                list.push({id:1, title: "고객 관리"});
                list.push({id:2, title: "디자이너 관리"});
                list.push({id:3, title: "운영현황"});
                list.push({id:4, title: "세금 관리"});
                list.push({id:5, title: "물품 관리"});
                
                list.forEach(function (d, i) {
                    var key = d.id;
                    htmlMenus += "<li class='nav-item'>";
                    htmlMenus += "<a class='nav-link' data-toggle='tab' role='tab' href='' key='" + key + "'>" + d.title + "</a>";
                    htmlMenus += "</li>";
                });
                $("#" + mainController.menuContainer).html(htmlMenus);
                //$(".nav-link").on("click", adminPage.mouseEvent);
            });
        }
    }
};