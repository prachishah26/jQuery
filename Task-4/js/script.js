
$(document).ready(function () {
    $(".resume").hide();
    $(".restart").hide();

    $(".start").click(function () {
        if ($(".enter-time").val() == 0) {
            $(".time-status").text("Please enter seconds first !!!")
        }
        else {
            $(this).attr('disabled','disabled');
            $(".pause").attr("disabled",false);
            $(".time-status").addClass("green").removeClass("red").removeClass("blue").removeClass("yello");
            $(".status").addClass("green-border").removeClass("red-border").removeClass("blue-border").removeClass("yello-border");

            $(".time-status").text("Running............ !!!")
            var sec = parseInt($(".enter-time").val());

            var hours = Math.floor(sec / 3600);
            var minutes = Math.floor((sec - (hours * 3600)) / 60);
            var seconds = sec - (hours * 3600) - (minutes * 60);
            var c_seconds = 0;

            $(".hours").text(hours);
            $(".minutes").text(minutes);
            $(".seconds").text(seconds);
            $(".c_seconds").text(c_seconds)

            countdown();
        }
    })

    $(".resume").click(function () {
        $(this).attr('disabled','disabled');
        $(".time-status").text("Running............ !!!")
        resume();
    })

    $(".restart").click(function () {
        $(this).hide();
        $(".start").show();
        $(".start").attr("disabled",false);
        $(".time-status").text("Enter time and hit start !")
        $(".time-status").addClass("yello").removeClass("red");
        $(".status").addClass("yello-border").removeClass("red-border");
        restart();
    })

    $(".pause").click(function () {
        if ($(".enter-time").val() == 0) {
            $(".time-status").text("Please enter seconds first !!!")
        }
        else {
            $(".start").hide();
            $(".resume").show();
            $(".resume").attr("disabled",false);
            $(".time-status").addClass("blue").removeClass("green").removeClass("red");
            $(".status").addClass("blue-border").removeClass("green-border").removeClass("blue-border");

            $(".time-status").text("Paused !")
            pause();
        }

    })

    $(".stop").click(function () {
        if ($(".enter-time").val() == 0) {
            $(".time-status").text("Please enter seconds first !!!")
        }
        else {
            $(".time-status").text("Stopped !")
            $(".resume").hide();
            $(".restart").show();
            $(".pause").attr("disabled",true);
            $(".time-status").addClass("red").removeClass("green").removeClass("blue");
            $(".status").addClass("red-border").removeClass("green-border").removeClass("blue-border");
            stop();
        }
    })

    $(".reset").click(function () {
        $(".time-status").text("Enter time and hit start !")
        $(".restart, .resume").hide();
        $(".start").attr("disabled",false);
        $(".pause").attr('disabled',false);
        $(".time-status").addClass("gray").removeClass("red").removeClass("blue").removeClass("green");
            $(".status").addClass("gray-border").removeClass("red-border").removeClass("blue-border").removeClass("green-border");
        reset();
    })
    var start;
    function countdown() {
        // this function will start countdown timer 
        start = setInterval(function () {
            hours = $(".hours").text()
            minutes = $(".minutes").text()
            seconds = $(".seconds").text()
            c_seconds = $(".c-seconds").text()

            if (c_seconds > 0) {
                --c_seconds;
            } else {
                c_seconds = 99;
                if (seconds > 0) {
                    --seconds
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        --minutes;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            --hours;
                        } else {
                            hours = 0;
                            minutes = 0;
                            seconds = 0;
                            c_seconds = 0;
                            clearInterval(start);
                            $(".time-status").text("Your time is finished now !!!!")

                        }
                    }
                }
            }
            $(".c-seconds").text(c_seconds);
            $(".seconds").text(seconds);
            $(".minutes").text(minutes);
            $(".hours").text(hours);

        }, 10)
        return hours, minutes, seconds, c_seconds;
    }
    function values(){
        // this function will change the values of time in respective place 
        $(".c-seconds").text(c_seconds);
        $(".seconds").text(seconds);
        $(".minutes").text(minutes);
        $(".hours").text(hours);
    }

    function pause() {
        clearInterval(start);
        values();
        $(".time-status").text(`Paused at ${hours} Hours , ${minutes} Minutes, ${seconds} Seconds`)
    }

    function stop() {
        clearInterval(start);
        values();
        $(".restart").show();
        $(".start").hide();
        $(".time-status").text(`Stopped at ${hours} Hours , ${minutes} Minutes, ${seconds} Seconds`);
    }

    function reset() {
        clearInterval(start);
        $(".start").show()
        $(".c-seconds").text(0);
        $(".seconds").text(0);
        $(".minutes").text(0);
        $(".hours").text(0);
        $(".enter-time").val(null);
    }

    function resume() {
        clearInterval(start);
        values();
        countdown();
    }

    function restart() {
        clearInterval(start);
        $(".c-seconds").text(0);
        $(".seconds").text(0);
        $(".minutes").text(0);
        $(".hours").text(0);
        $(".enter-time").val(null);
    }
})