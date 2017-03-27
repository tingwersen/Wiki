function run()
{
    var index = 0;
    $("td:first-child").each(function () {
        var text = $(this).text();
        var count = (text.match(/-/g) || []).length;

        $(this).prop("indent", count);
        $(this).prop("expanded", false);
        $(this).prop("index", index++);        
    });

    $("td:first-child").each(function () {
        
        var indent = $(this).prop("indent");

        if (indent > 0) {
            $(this).parent().hide();
        }

        var text = $(this).html().replace(/(-?&nbsp;)+/g, "");

        if (getChildNodes($(this)).length > 0) {
            $(this).html("<span style='display:inline-block;width:" + (indent * 20) + "px'></span><span class='expand-control-icon icon'></span><span>" + text + "</span>");
            $(this).css("cursor", "pointer");
        }
        else {
            $(this).html("<span style='display:inline-block;width:" + (indent * 20) + "px'></span><span style='display:inline-block;width:20px;'></span><span>" + text + "</span>");
        }

        $(this).click(function () {
            var doExpand = !$(this).prop("expanded");
            $(this).prop("expanded", doExpand);
            
            if (doExpand) {
                expand(this);
                $(this).children(".expand-control-icon").addClass("expanded");
            }
            else {
                collapse(this);
                $(this).children(".expand-control-icon").removeClass("expanded");
            }
        });

        function expand(td) {
            if ($(td).prop("expanded")) {
                var childNodes = getChildNodes(td);
                childNodes.each(function () {
                    $(this).parent().show();
                    expand(this);
                });
            }
        }

        function collapse(td) {
            var childNodes = getChildNodes(td);
            childNodes.each(function () {
                $(this).parent().hide();
                collapse(this);
            });
        }

        function getChildNodes(td) {
            var nodes = [];
            var currentIndent = $(td).prop("indent");
            $(td).parent().nextAll().children("td:first-child").each(function () {
                if ($(this).prop("indent") <= currentIndent) {
                    return false; // break
                }

                if ($(this).prop("indent") == currentIndent + 1) {
                    nodes.push(this);
                }
            });
            return $(nodes).map(function () { return $(this).toArray(); });
        }
    });
}

run();