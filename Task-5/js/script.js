$(document).ready(function () {
    var isStart = false;
    $(".resume, .restart").hide();
    var count = 0
    $(".stop, .pause").attr("disabled", true);

    $(".start").click(function () {
        if (isStart == false) {
            stopwatch();
            $(this).attr("disabled", true);
            $(".stop, .pause").attr("disabled", false);
            isStart = true;
        }
    })
    $(".pause").click(function () {
        ++count;
        clearInterval(start);
        $(".resume").show().attr("disabled", false);
        $(".start, .restart").hide();
        $(".pause").attr("disabled", true);
        set_status("Paused !!!")
        set_pausedtime(`${count}. Paused at ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds..`)
        isStart=false;
    })
    $(".resume").click(function () {
        if(isStart == false){
            $(this).attr("disabled", true);
            $(".pause").attr("disabled", false);
            get_timevalues();
            stopwatch();
            set_status("Running...!!!"); isStart=true;
        }
    })
    $(".stop").click(function () {
        clearInterval(start);
        $(".restart").show();
        $(".start, .resume").hide();
        $(".pause").attr("disabled", true);
        $(".restart").attr("disabled", false);
        clear_pausedtime();
        set_pausedtime(`Stopped at ${hours} Hours, ${seconds} Seconds, ${minutes} Minutes..`)
        isStart=false;
    })
    $(".restart").click(function () {
        $(this).attr("disabled", true);
        $(".pause").attr("disabled", false);
        hours = 0; minutes = 0; seconds = 0; c_seconds = 0;
        get_timevalues();
        stopwatch();
        clear_pausedtime();
    })
    $(".reset").click(function () {
        clearInterval(start);
        $(".start").show().attr("disabled", false);
        $(".resume, .restart").hide();
        $(".stop, .pause").attr("disabled", true);
        hours = 0; minutes = 0; seconds = 0; c_seconds = 0;
        get_timevalues();
        set_status("Start the stopwatch !!!")
        clear_pausedtime()
    })
    var start;
    function stopwatch() {
        start = setInterval(function () {
            hours = parseInt($(".hours").text())
            minutes = parseInt($(".minutes").text())
            seconds = parseInt($(".seconds").text())
            c_seconds = parseInt($(".c-seconds").text())

            if (c_seconds < 100) {
                ++c_seconds;
            } else {
                c_seconds = 0;
                if (seconds < 60) {
                    ++seconds
                } else {
                    seconds = 0;
                    if (minutes < 60) {
                        ++minutes;
                    } else {
                        minutes = 00;
                        ++hours;
                    }
                }
            }
            get_timevalues();
        }, 10)
    }
    function addZero(n) {
        if (n <= 9) {
            return "0" + n
        } else {
            return n
        }
    }
    function get_timevalues() {
        $(".c-seconds").text(addZero(c_seconds));
        $(".seconds").text(addZero(seconds));
        $(".minutes").text(addZero(minutes));
        $(".hours").text(addZero(hours));
    }
    function set_status(message) {
        $(".time-status").text(message);
    }
    function set_pausedtime(message) {
        $(".pause-time").append("<br />" + message);
    }
    function clear_pausedtime() {
        $(".pause-time").empty();
        count = 0;
    }
})