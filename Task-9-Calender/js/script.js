$(document).ready(function () {
    var month,firstDay,endDate, isLastDate = false;

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var totalDayInMonth = [31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30]

    // this will append options in select menu ------------
    setYears();
    setMonths();

    // date object ---------------------------------------
    var dt = new Date();
    var currentMonth = dt.getMonth();
    var currentYear = dt.getFullYear();
    var currentDate = dt.getDate();

    $(".monthDisplay").text(months[currentMonth]);
    $(".yearDisplay").text(currentYear);

    // this will show calender on screen------------
    calenderUI();

    // Todays date will display----------------------------------------
    $(".today").click(function () {
        $("table tbody").empty();
        currentMonth = dt.getMonth();
        currentYear = dt.getFullYear();
        currentDate = dt.getDate();
        calenderUI();
    })

    // next month ------------------------------
    $(document).on("click", ".rightArrow", function () {
        ++currentMonth;
        if (currentMonth > 11) {
            currentMonth = 0;
            ++currentYear
        }
        $("table tbody").empty();
        calenderUI();
    })

    // previous month -------------------------------
    $(document).on("click", ".leftArrow", function () {
        --currentMonth;
        if (currentMonth < 0) {
            currentMonth = 11;
            --currentYear;
        }
        $("table tbody").empty();
        calenderUI();
    })

    // find Date 
    $(document).on("click", ".findDate", function () {
        currentYear = $('.year').find(":selected").text();
        currentMonth = $('.month').find(":selected").val();
        currentDate = $('.date').find(":selected").text();
        $("table tbody").empty();
        calenderUI();
    })

    // this will return total days in particular month-------------
    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    // function for calender-------------------------------------
    function calenderUI() {
        let date = 1;
        currentMonth
        currentYear
        currentDate

        firstDay = (new Date(currentYear, currentMonth)).getDay();
        endDate = daysInMonth(currentMonth,currentYear)

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
                    if (date == currentDate && currentMonth == dt.getMonth() && currentYear == dt.getFullYear()) {
                        $("tbody tr").eq(i).append(`<td class='bg-warning'>${date}</td>`)
                    }
                    else if (date == currentDate && currentMonth == $('.month').find(":selected").val() && currentYear == $('.year').find(":selected").text()){
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
            $(".year").append(`<option value=${i}>${i}</option>`)
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

    $(document).on("click", ".month", function () {
        // this will help in select the date according to month 
        $(".date").empty()
        var year = $(".year option:selected").text();
        month = $(".month option:selected").val();

        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            totalDayInMonth[1] = 28;
        } else {
            totalDayInMonth[1] = 29;
        }
    })

    $(document).on("click", ".date", function () {
        // it will fill the date dropdown
        for (var i = 1; i <= totalDayInMonth[month]; i++) {
            $(".date").append(`<option>${i}</option>`)
        }
    })
})


