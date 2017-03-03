/**
 * Created by veroo on 2017-02-16.
 */
var loginController = {
    getHtml: function () {
        var html = '<div class="login-container container">';
        html += '<div class="item-list centered">';
        html += '<div class="item-container">';
        html += '<div class="title col-lg-3 vertical-centered">ID</div>';
        html += '<div class="col-lg-9 vertical-centered">';
        html += '<input id="inp-userid" type="text" class="input form-control" placeholder="id">';
        html += '</div>';
        html += '</div>';
        html += '<div class="item-container">';
        html += '<div class="title col-lg-3 vertical-centered">Password</div>';
        html += '<div class="col-lg-9 vertical-centered">';
        html += '<input id="inp-password" type="password" class="input form-control" placeholder="password">';
        html += '</div>';
        html += '</div>';
        html += '<div class="item-container">';
        html += '<div class="col-lg-offset-8 col-lg-2 vertical-centered">';
        html += '<button id="btn-registration" type="button" class="btn btn-link">Registration</button>';
        html += '</div>';
        html += '<div class="col-lg-2 vertical-centered">';
        html += '<button id="btn-login" type="button" class="btn btn-primary">Login</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    },
    action: {
        returnFn: null,
        login: function (fn) {
            $.ajax({
                url: "/login",
                type: 'POST'
            }).done(function (response) {
                loginController.action.returnFn(response);
            });
        }
    }
};