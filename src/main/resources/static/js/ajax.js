/**
 * Created by veroo on 2016-08-24.
 */
var server_Url = "/";
var api_url = "api/";

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
/* AJAX HANDLERS */
var ajax = {
    initialize: function () {
        $.ajaxSetup({
            async: true,
            crossDomain: false,
            dataType: "json",
            beforeSend: ajax.beforeSend,
            error: ajax.errorHandler,
            success: ajax.successHandler,
            complete: ajax.completeHandler
        });
    },
    completeHandler: function (event, request, settings) {

    },
    successHandler: function (response, a, b, c) {
        if ('string' == typeof response)
            alert(response);
    },
    errorHandler: function (xhr, textStatus, thrownError) {
        if (undefined != xhr["responseJSON"]) {
            if ('string' == typeof xhr["responseJSON"]) {

            }
            else {
                var errorString = "";
                for(var key in xhr["responseJSON"]) {
                    var values = xhr["responseJSON"][key];
                    /*
                    errorString += "[" + key + "]\n";
                    if(Object.isisArray(values) == true){
                        for (var idx = 0; idx < values.length; idx++)
                            errorString += values[idx];
                    } else {
                        errorString += values;
                    }
                    errorString += values;
                    */
                    if(key == "msg"){
                        errorString += values + "\n";
                    }
                }

                if (errorString.length > 0)
                    alert(errorString);
            }
        }
    },
    beforeSend: function (xhr, settings) {
        if (undefined != settings.confirm_msg) {
            if (!confirm(settings.confirm_msg)) {
                alert("Canceled.");
                return false;
            }
        }
        if(undefined != settings.headers){
            var keys = Object.keys(settings.headers);
            xhr.setRequestHeader("Access-Control-Allow-Origin","*");
            for(var i = 0 ; i < keys.length; i++){
                 xhr.setRequestHeader(keys[i], settings.headers[keys[i]]);
            }
        }

        if (!ajax.isCsrfSafeMethod(settings.type) && !this.crossDomain) {
            var csrftoken = getCookie("csrftoken");
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    },
    isCsrfSafeMethod: function (method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
};

$(document).ready(function() {
    ajax.initialize();
});