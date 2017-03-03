function Table(id, cls) {
    this.id = id;
    this.cls = cls;
    this.targetName = "";
    this.datasource = [];
    this.columns = [];
    this.pageLength = 0;
    this.dataCount = 0;
    this.selectedPageNumber = 1;
    this.pageCount = 5;
    this.event = {
        pagination: null,
        row: null,
        rowField: null
    };
    this.instance = this;
    this.isBuild = false;
    this.beforeSelectRow = null;
    this.beforeSelectRowField = null;
}

Table.prototype.setTargetName = function(targetName) {
	this.targetName = targetName;
};

Table.prototype.setColumns = function(columns) {
    columns.forEach(function (d) {
        if(d.columnType === undefined){
            d.columnType = "string";
        }
        d.columnType = d.columnType.toUpperCase();
    });
	this.columns = columns;
};

Table.prototype.setPageLength = function(pageLength) {
	this.pageLength = pageLength;
};

Table.prototype.addColumn = function(title, field, cls) {
	this.columns.push({title: title, field: field, cls: cls});
};

Table.prototype.setEventCallback = function(event) {
	this.event = event;
};

Table.prototype.setPaginationEventCallback = function(event) {
	this.event.pagination = event;
};
Table.prototype.setRowEventCallback = function(event) {
	this.event.row = event;
};
Table.prototype.setRowFieldEventCallback = function(event) {
	this.event.rowField = event;
};
Table.prototype.getData = function (row) {
    var idx = parseInt(row);
    return this.datasource[idx];
};

Table.prototype.setData = function(datasource) {
    this.datasource = datasource.data;
    this.dataCount = datasource.count;
    if (this.isBuild == true) {
        this.build();
    }
};

Table.prototype.build = function() {
    var target = $(this.targetName);
    if (this.isBuild == false) {
        var table = "<table id='" + this.id + "-tbl'>" + getHTMLHead(this.columns) + "</table>";
        target.append("<div id='" + this.id + "' class='" + this.cls + "'>" + table + "</div>");
    }
    var targetPath = this.targetName + "> #" + this.id;
    var pagination = getHTMLPagination(this.pageLength, this.dataCount, this.selectedPageNumber, this.pageCount);
    $(targetPath + " > table > tbody").remove();
    $(targetPath + " > table").append(getHTMLBody(this.columns, this.datasource, this.pageLength));

    $(targetPath + " > .pagination-container").remove();
    $(targetPath).append(pagination);

    var eventCallback = this.event;
    var instance = this;
    $(targetPath + " > .pagination-container > .pagination > .paginate_button > a").on("click", function (evt) {
        instance.selectedPageNumber = parseInt($(this).attr("data-idx"));
        if (eventCallback.pagination != null && eventCallback.pagination !== undefined) {
            eventCallback.pagination(instance.id, instance.selectedPageNumber);
        }
    });

    $(targetPath + " > table > tbody > tr").on("click", function (evt) {
        var selectedRow = "";
        var isSelected = false;
        if(eventCallback.row !== null) {
            if (instance.beforeSelectRow !== null) {
                selectedRow = instance.beforeSelectRow.attr("data-row");
                instance.beforeSelectRow.removeClass("active");
            }
            if (selectedRow == $(this).attr("data-row")) {
                instance.beforeSelectRow = null;
            } else {
                $(this).addClass("active");
                instance.beforeSelectRow = $(this);
                isSelected = true;
            }
            eventCallback.row(isSelected, this);
        }
    });

    $(targetPath + " > table > tbody > tr > td").on("click", function (evt) {
        var isSelected = false;
        var selectedRow = "";
        if(eventCallback.rowField !== null) {
            if (instance.beforeSelectRowField !== null) {
                selectedRow = instance.beforeSelectRowField.attr("data-row");
                //instance.beforSelectRow.removeClass("active");
            }
            if (selectedRow == $(this).attr("data-row")) {
                instance.beforeSelectRowField = null;
            } else {
                $(this).addClass("active");
                instance.beforeSelectRowField = $(this);
                isSelected = true;
            }
            eventCallback.rowField(isSelected, this);
        }
    });

    this.isBuild = true;
};

function getHTMLHead(columns) {
    var th = "";
    columns.forEach(function (elt) {
        th += "<th class='" + elt.cls + "'>" + elt.title + "</th>";
    });

    return "<thead><tr>" + th + "</tr></thead>";
}

function getHTMLBody(columns, datasource, pageLength){
	var body = "";
	var maxLength = datasource.length;
	if( pageLength != 0){
		maxLength = Math.min(pageLength, maxLength);
	}

	for(var row = 0 ; row < maxLength ; row++){
		var elt = datasource[row];
		var content = "";
		columns.forEach(function(col, idx) {
		    content += "<td data-row='" + row + "' data-column='" + idx + "'>";
		    if(col.columnType === "CHECKBOX"){
		        content += "<input type='checkbox' key='"+ elt[col.code] +"'></td>";
            } else{
		        content += elt[col.field];
            }
            content += "</td>";
		});
		body += "<tr data-row='" + row + "'>" + content + "</tr>";
	}

	return "<tbody>" + body + "</tbody>";
}

function getHTMLPagination(pageLength, dataCount, selectedPageNum, pageCount) {
    var pagination = "";
    var paginate_button = "paginate_button";
    if (pageLength != 0) {
        var paginate = Math.ceil(dataCount / pageLength);
        if (paginate > 1) {
            pagination += "<div class='pagination-container'>";
            pagination += "<ul class='pagination'>";

            var start = Math.floor((selectedPageNum - 1) / pageCount) * pageCount + 1;
            if (start != 1) {
                pagination += "<li class='" + paginate_button + "'><a href='#' data-idx='" + (start - pageCount) + "'><span class='glyphicon glyphicon-chevron-left'></span></a></li>";
            }

            var pageButton = Math.min(paginate, start + pageCount - 1);
            for (var pangeNum = start; pangeNum <= pageButton; pangeNum++) {
                pagination += "<li class='" + paginate_button;
                if (selectedPageNum == pangeNum) {
                    pagination += " active";
                }
                pagination += "'><a href='#' data-idx='" + pangeNum + "'>" + pangeNum + "</a></li>";
            }
            if (pageButton != paginate) {
                pagination += "<li class='" + paginate_button + "'><a href='#' data-idx='" + (start + pageCount) + "'><span class='glyphicon glyphicon-chevron-right'></span></a></li>";
            }

            pagination += "</ul></div>";
        }
    }

    return pagination;
}
