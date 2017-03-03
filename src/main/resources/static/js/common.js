/**
 * Created by veroo on 2016-11-06.
 */
var common = {
    url: {
        registration: "/view/registration"
    },
    mouseEvent: function () {
        var btn_id = $(this).attr("id");
        if (btn_id === "btn-login") {
            common.login();
        } else if (btn_id === "btn-logout") {
            common.logout();
        } else if (btn_id === "btn-registration") {
            common.registration();
        }
    },
    login: function () {
        $.ajax({
            url: "/login/",
            type: "POST",
            data: {
                userid: $('#inp-userid').val(),
                password: $('#inp-password').val()
            }
        }).done(function (response) {

            window.location.href = '/pages/';
        });
    },
    logout: function () {
        $.ajax({
            url: "/logout/",
            type: "POST"
        }).done(function (response) {
            alert(response.msg);
            window.location.href = "/";
        });
    },
    registration: function () {
        window.location.href = common.url.registration;
    },
    getChecklist: function (selector, attr) {
        var checkbox = $(selector + " > tbody > tr > td > input:checked");
        var list = [];
        checkbox.each(function (d) {
            list.push($(this).attr(attr));
        });
        return list;
    },
    getButton: function (id, text) {
        return "<button id='" + id + "' type='button' class='btn btn-default'>" + text + "</button>";
    },
    addButtons: function (selector, buttons, func) {
        var buttons_html = "";
        for (var i = 0; i < buttons.length; i++) {
            buttons_html += common.getButton(buttons[i]['id'], buttons[i]['text']);
        }
        if (buttons_html !== "") {
            $(selector).append("<div class='btn-container'>" + buttons_html + "</div>");
            $(selector + " > .btn-container > .btn").on("click", function () {
                return func(this);
            });
        }
    },
    getInputGroup: function (id, title) {
        /*
        var html = "<div class='col-md-12'>";
        html += "<div class='input-group'>";
        html += "<span class='input-group-addon'>" + title + "</span>";
        html += "<input id='"+ id+"' type='text' class='form-control'>";
        html += "</div></div>";
        */

        var html = "<div class='form-group'>";
        html += "<label class='col-sm-2 control-label'>"+ title +"</label>";
        html += "<div class='col-sm-10'>";
        html += "<input type='text' class='form-control' id='" +id +"'>";
        html += "</div></div>";
        return html;
    },
    getSelect: function (id, title, values) {
       var html = "<div class='form-group'>";
        html += "<label class='col-sm-2 control-label'>"+ title +"</label>";
        html += "<div class='col-sm-10'>";
        html += "<select id='" +id +"'>";
        for(var i = 0 ; i < values.length ; i++) {
            html += "<option value='" + values[i].key +"'>" + values[i].title + "</option>";
        }
        html += "</select></div></div>";
        return html;
    }
};

$(document).ready(function() {
    // index
    $(".btn").on("click", common.mouseEvent);
});