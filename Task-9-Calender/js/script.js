$(document).ready(function () {
    var month, firstDay, endDate,current_Date, isLastDate = false;

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var totalDayInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
        $("table tbody tr td").removeClass("bg-success")
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
        currentYearValue = $('.year').find(":selected").val();
        currentMonth = $('.month').find(":selected").val();
        current_Date = $('.date').find(":selected").text();

        if (currentYearValue == "" || currentMonth == "") {
        }
        else {
            $("table tbody").empty();
            calenderUI();
        }
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
        current_Date

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
                    if (date == currentDate && currentMonth == dt.getMonth() && currentYear == dt.getFullYear()) {
                        $("tbody tr").eq(i).append(`<td class='bg-warning'>${date}</td>`)
                    }
                    else if (date == current_Date && currentMonth == $('.month').find(":selected").val() && currentYear == $('.year').find(":selected").text()) {
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
            // $(".year").append(`<option value=${i}>${i}</option>`)
            if(i == 2000){
                $(".year").append(`<option value=${i} selected>${i}</option>`);
            }
            else{
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
        $(".date").append(`<option value='nothing'>Date</option>`)
        for (var i = 1; i <= totalDayInMonth[month]; i++) {
            $(".date").append(`<option>${i}</option>`)
        }
        $(".date").val("nothing")
    })

})


