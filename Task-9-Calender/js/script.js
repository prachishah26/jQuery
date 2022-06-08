$(document).ready(function () {

    // global variables 
    var month, firstDay, endDate, currentDate, isLastDate = false;

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var totalDayInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // this will remove blinking effect while refreshing 
    $(".container").show();

    // this will append options in select menu 
    setYears();
    setMonths();

    // date object 
    var dateTime = new Date();
    var currentMonth = dateTime.getMonth();
    var currentYear = dateTime.getFullYear();
    var TodayDate = dateTime.getDate();

    // Display on the top : Current month and Year
    $(".monthDisplay").text(months[currentMonth]);
    $(".yearDisplay").text(currentYear);

    // this will show calender on screen
    calenderUI();

    // Todays date will Highlight with Yello color
    $(".today").click(function () {
        $("table tbody").empty();
        currentMonth = dateTime.getMonth();
        currentYear = dateTime.getFullYear();
        TodayDate = dateTime.getDate();
        calenderUI();
        removeHighlight();
    })

    //Right arrow click event to get next month
    $(document).on("click", ".rightArrow", function () {
        ++currentMonth;
        if (currentMonth > 11) {
            currentMonth = 0;
            ++currentYear
        }
        $("table tbody").empty();
        calenderUI();
        removeHighlight();
    })

    
    // Left arrow click event to get previous month
    $(document).on("click", ".leftArrow", function () {
        --currentMonth;
        if (currentMonth < 0) {
            currentMonth = 11;
            --currentYear;
        }
        $("table tbody").empty();
        calenderUI();
        removeHighlight();
    })

    // find Date click event to find search-date
    $(document).on("click", ".findDate", function () {

        currentYear = $('.year').find(":selected").text();
        currentYearValue = $('.year').find(":selected").val();
        currentMonth = $('.month').find(":selected").val();
        currentDate = $('.date').find(":selected").text();

        if (currentYearValue == "" || currentMonth == "") {
        }
        else {
            $("table tbody").empty();
            calenderUI();
            $('.month').val("");
            $('.date').val("empty");

        }
    })

    // this will help in select the date according to month 
    $(document).on("click", ".month", function () {

        var year = $(".year option:selected").text();
        month = $(".month option:selected").val();

        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            totalDayInMonth[1] = 29;
        } else {
            totalDayInMonth[1] = 28;
        }
        $(".date").empty();
        $(".date").append(`<option value='empty'>Date</option>`)
        for (var i = 1; i <= totalDayInMonth[month]; i++) {
            $(".date").append(`<option>${i}</option>`)
        }
        $(".date").val("empty")
    })


    // this will return total days in particular month
    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    // function for calender
    function calenderUI() {
        let date = 1;
        currentMonth
        currentYear
        TodayDate
        currentDate

        firstDay = (new Date(currentYear, currentMonth)).getDay();
        endDate = daysInMonth(currentMonth, currentYear)

        for (let i = 0; i < 6; i++) {
            $("tbody").append(`<tr></tr>`)
            if (isLastDate) {
                break;
            }
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    $("tbody tr").eq(i).append(`<td></td>`)
                }
                else {
                    if (date == TodayDate && currentMonth == dateTime.getMonth() && currentYear == dateTime.getFullYear()) {
                        $("tbody tr").eq(i).append(`<td class='bg-warning'>${date}</td>`)
                    }
                    else if (date == currentDate && currentMonth == $('.month').find(":selected").val() && currentYear == $('.year').find(":selected").text()) {
                        $("tbody tr").eq(i).append(`<td class='bg-success'>${date}</td>`)
                    }
                    else {
                        $("tbody tr").eq(i).append(`<td>${date}</td>`)
                    }
                    date++;
                    if (date > endDate) {
                        isLastDate = true;
                        break;
                    }
                }
            }
        }
        isLastDate = false
        $(".row h5 .monthDisplay").text(months[currentMonth]);
        $(".row h5 .yearDisplay").text(currentYear);
    }

    function setYears() {
        // it will fill years dropdown 
        var yearStartFrom = 1970
        var yearEnds = 2050
        for (var i = yearStartFrom; i <= yearEnds; i++) {
            if (i == 2000) {
                $(".year").append(`<option value=${i} selected>${i}</option>`);
            }
            else {
                $(".year").append(`<option value=${i}>${i}</option>`);
            }
        }
    }

    function setMonths() {
        // it will fill month dropdown 
        var firstMonth = 0;
        var lastMonth = 11;
        for (var j = firstMonth; j <= lastMonth; j++) {
            $(".month").append(`<option value=${j}>${months[j]}</option>`)
        }
    }

    function removeHighlight() {
        // This function will remove green color from date when search date operation will be finished 
        $("table tbody tr td").removeClass("bg-success")
    }

})


