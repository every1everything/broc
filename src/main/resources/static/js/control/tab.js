/**
 * Created by veroo on 2016-11-07.
 */
function tabControl(target) {
    this.target = target;
    this.data = null;
    this.panels = [];
}

tabControl.prototype.addPanel = function(id, title, panel) {
    var tab = {
        id: id,
        title: title,
        panel: panel
    };
    this.panels.push(tab);
};

tabControl.prototype.build = function (id) {
    var tabMenu = $("<ul id='" + id + "-tabs' class='nav nav-tabs'></ul>");
    var tabPanel = $("<div id='" + id + "-tab-content' class='tab-content'></div>");
    for (var i = 0; i < this.panels.length; i++) {
        var newTab = $("<li class='nav-item'></li>");
        $("<a class='nav-link'>" + this.panels[i].title + "</a>").appendTo(newTab);
        newTab.appendTo(tabMenu);

        var newPanel = $("<div class='tab-pane'></div>");
        newPanel.appendTo(tabPanel);
    }
    this.target.remove();
    this.target.append(tabMenu);
    this.target.append(tabPanel);
};

