(function () {

    var htmls = {
    	date:'<div class="date" date-type="date"></div>',
        row: '<li>{col}</li>',
        col: '<span>{date}</span>',
        dateheader: '<ul class="date-header clearfix"></ul>',
        datebody: '<ul class="date-body clearfix"></ul>',
        week: '<li>{weekday}</li>',
        datehead: '<ul class="date-head"></ul>',
        datehead_item: '<li class="{item_head}">{item}</li>'
    }
    $("[data-date=true]").after(htmls.date);
    var date1 = $("[date-type=date]");

$("[data-date=true]").click(function(event) {
	date1.toggleClass('display');
});
    var date_header = ["日", "一", "二", "三", "四", "五", "六"];
    var datehead_item = [{
        prevyear: '<<<'
    }, {
        prevmonth: '<<'
    }, {
        currentyear: '2016'
    }, {
        currentmonth: '2'
    }, {
        nextMonth: '>>'
    }, {
        nextyear: '>>>'
    }, {
        reset: '今天'
    }]
    var htmls_row = htmls.row;
    var htmls_col = htmls.col;
    date1.append(htmls.datehead)
    date1.append(htmls.dateheader)
    date1.append(htmls.datebody)

    function rendweekHead() {
        var html = "";
        date_header.forEach(function(item) {
            html += htmls.week.replace(/\{weekday\}/, item)
            /* body... */
        })
        return html;
    }
    $(".date-header").append(rendweekHead());

    function rendehead() {
        var html = ""
        datehead_item.forEach(function(item) {
            for (var a in item) {
                html += htmls.datehead_item.replace(/\{item_head\}/, a).replace(/\{item\}/, item[a]);
            }
        })
        return html;
    }
    $(".date-head").append(rendehead());
    var date = new dateMethod(2016, 3);

    function rendDay(date) {
        var count = [];
        var html = ""
        var flag = 0
        var datecount = date.dayCount();
        var firstdayofweek = date.firstDayofWeek();
        var firstNum = 7 - firstdayofweek;
        for (var i = 0; i < datecount; i++) {
            if (i < firstNum) {
                html += htmls_col.replace(/\{date\}/g, i + 1)
                if ((i + 1) == firstNum) {
                    count.push(html)
                    var html = ""
                }
            } else {
                flag++;
                html += htmls_col.replace(/\{date\}/g, i + 1)
                if (flag == 7 || i == datecount - 1) {
                    count.push(html)
                    flag = 0;
                    html = ""
                }
            }
        }
        return count;
    }

    function rendweek(date) {
        var html = "";
        rendDay(date).forEach(function(element, index) {
            html += htmls.row.replace(/\{col\}/, element);
        });
        return html;
    }
    $(".date-body").append(rendweek(date))
    var da = new Date();
    var today = da.getDate();
    $(".currentyear").text(da.getFullYear());
    $(".currentmonth").text(da.getMonth() + 1);

    function marktoday() {
        var da = new Date();
        var arr = $(".date-body li span")
        if ((da.getMonth() + 1) == $(".currentmonth").text() && da.getFullYear() == $(".currentyear").text()) {
            for (variable in arr) {
                if (arr[variable].textContent == today) {
                    $(arr[variable]).addClass('today');
                }
            }
        }
    }
    marktoday();
    $(".prevyear").click(function(event) {
        var year = parseInt($(".currentyear").text()) - 1;
        var month = parseInt($(".currentmonth").text());
        $(".date-body").html("");
        $(".currentyear").text(year)
        var date = new dateMethod(year, month);
        $(".date-body").append(rendweek(date));
        marktoday();
    });
    $(".nextyear").click(function(event) {
        var year = parseInt($(".currentyear").text()) + 1;
        var month = parseInt($(".currentmonth").text());
        $(".date-body").html("");
        $(".currentyear").text(year)
        var date = new dateMethod(year, month);
        $(".date-body").append(rendweek(date));
        marktoday();
    });
    $(".prevmonth").click(function(event) {
        var year = parseInt($(".currentyear").text());
        var month = parseInt($(".currentmonth").text() - 1);
        if (month <= 0) {
            month = 12;
            year = year - 1;
        }
        $(".date-body").html("");
        $(".currentyear").text(year)
        $(".currentmonth").text(month)
        var date = new dateMethod(year, month);
        $(".date-body").append(rendweek(date));
        marktoday();
    });
    $(".nextMonth").click(function(event) {
        var year = parseInt($(".currentyear").text());
        var month = parseInt($(".currentmonth").text()) + 1;
        if (month > 12) {
            month = 1;
            year = year + 1;
        }
        $(".date-body").html("");
        $(".currentyear").text(year)
        $(".currentmonth").text(month)
        var date = new dateMethod(year, month);
        $(".date-body").append(rendweek(date));
        marktoday();
    });
    $(".reset").click(function(event) {
        var da = new Date();
        var today = da.getDate();
        $(".currentyear").text(da.getFullYear());
        $(".currentmonth").text(da.getMonth() + 1);
        var date = new dateMethod(da.getFullYear(), da.getMonth() + 1);
        $(".date-body").html("");
        $(".date-body").append(rendweek(date));
        marktoday();
    });

    function dateMethod(year, month) {
        var date = new Date();
        month = month != undefined ? month : date.getMonth();
        month--;
        if (year != undefined) {
            date.setFullYear(year)
        }
        this.firstDayofWeek = function() {
            date.setMonth(month);
            date.setDate(1)
            return date.getDay()
        }
        this.dayCount = function() {
            date.setMonth(month + 1);
            date.setDate(0)
            return date.getDate();
        }
    }
    window['date1']=date1;

})()
    