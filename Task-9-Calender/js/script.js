$(document).ready(function () {
    var getYear, month, flag = false;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var totalDayInMonth = [31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30]
    var dt = new Date();
    var currentMonth = dt.getMonth() + 1;
    var currentYear = dt.getFullYear();
    var currentDate = dt.getDate();

    $(".monthDisplay").text(months[currentMonth]);
    $(".yearDisplay").text(currentYear);

    calenderCalculation();

    $(".today").click(function () {
        $("table tbody").empty();
        currentMonth = dt.getMonth() + 1;
        currentYear = dt.getFullYear();
        currentDate = dt.getDate();
        calenderCalculation();
    })

    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function calenderCalculation() {

        let date = 1;
        currentMonth
        currentYear
        currentDate
        console.log(currentMonth)
        console.log("daysinmonth",daysInMonth(currentMonth-1,currentYear));

        var day = (new Date(currentYear, currentMonth - 1)).getDay();
        console.log("....day...", day)

        for (let i = 0; i < 6; i++) {
            $("tbody").append(`<tr></tr>`)
            if (flag) {
                break;
            }
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < day) {
                    $("tbody tr").eq(i).append(`<td></td>`)
                }
                else {
                    if (date == currentDate && currentMonth == dt.getMonth() + 1 && currentYear == dt.getFullYear()) {
                        $("tbody tr").eq(i).append(`<td class='bg-warning'>${date}</td>`)
                    }
                    else {
                        $("tbody tr").eq(i).append(`<td>${date}</td>`)
                    }
                    date++;
                    if (date > totalDayInMonth[currentMonth - 1]) {
                        flag = true;
                        break;
                    }
                }
            }
            console.log("second for loop ends")
        }
        flag = false
        $(".row h5 .monthDisplay").text(months[currentMonth - 1]);
        $(".row h5 .yearDisplay").text(currentYear);
    }

    $(document).on("click", ".rightArrow", function () {
        ++currentMonth;
        console.log("cm", currentMonth)

        console.log(totalDayInMonth);

        if (currentMonth > 12) {
            currentMonth = 0;
            ++currentYear
        }

        $("table tbody").empty();
        calenderCalculation();

        $(".row h5 .monthDisplay").text(months[currentMonth])
        $(".row h5 .yearDisplay").text(currentYear)

    })

    $(document).on("click", ".leftArrow", function () {
        --currentMonth;
        if (currentMonth < 0) {
            currentMonth = 11;
            --currentYear;
        }
        $(".row h5 .monthDisplay").text(months[currentMonth])
        $(".row h5 .yearDisplay").text(currentYear)
        $("table tbody").empty();
        calenderCalculation();
    })


    // this will append options in select menu -----------------------------------
    setYears();
    setMonths();

    $(document).on("click", ".findDate", function () {
        currentYear = $('.year').find(":selected").text();
        currentMonth = $('.month').find(":selected").val() + 1;
        currentDate = $('.date').find(":selected").text();
        $("table tbody").empty();
        console.log(currentYear, currentMonth, currentDate)

        calenderCalculation();
    })

    function setYears() {
        var yearStartFrom = 1970
        var yearEnds = 2050
        for (var i = yearStartFrom; i <= yearEnds; i++) {
            $(".year").append(`<option value=${i}>${i}</option>`)
        }
    }

    function setMonths() {
        var firstMonth = 0;
        var lastMonth = 11;
        for (var j = firstMonth; j <= lastMonth; j++) {
            $(".month").append(`<option value=${j}>${months[j]}</option>`)
        }
    }

    

    $(document).on("click", ".month", function () {
        $(".date").empty().first().val("Date");
        var year = $(".year option:selected").text();
        month = $(".month option:selected").val();

        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
            totalDayInMonth[1] = 28;
        } else {
            totalDayInMonth[1] = 29;
        }
    })

    $(document).on("click", ".date", function () {
        for (var i = 1; i <= totalDayInMonth[month]; i++) {
            $(".date").append(`<option>${i}</option>`)
        }
    })
})


