$(document).ready(function () {
    
        // Total classes to be add
        var iconClass = ["fa fa-fire", "fa fa-eye", "fa fa-wifi", "fa fa-plane", "fa fa-rocket", "fa fa-file", "fa fa-car", "fa fa-heartbeat", "fa fa-book", "fa fa-trophy", "fa fa-bitcoin", "fa fa-circle", "fa fa-truck", "fa fa-tree", "fa fa-tablet", "fa fa-signal", "fa fa-phone", "fa fa-instagram", "fa fa-snapchat", "fa fa-facebook", "fa fa-firefox", "fa fa-quora", "fa fa-spotify", "fa fa-wordpress", "fa fa-youtube", "fa fa-yahoo", "fa fa-github", "fa fa-paypal", "fa fa-opera"]
    
        var index = [], classes = [], match = [], countBox = 0,timeStart = false,startTime, duration;
    
        shuffle(iconClass);
        uniqueCards(iconClass);
        totalCards(classes);
        console.log(classes);
    
        // this will append icon classes on boxes 
        for (let i = 0; i <= classes.length; i++) {
            $(".box").eq(i).find("i").addClass(classes[i])
        }
    
        // hiding icons 
        $(".box > i").hide();
    
        // click event on box : if two cards are matching then it will show otherwise they will be hide.
        $(".box").click(function () {
            if(timeStart==false){
                startTime = Date.now();
                timeStart = true;
            }
            if ($(this).find("i").hasClass("not")) {
            }
            else {
                $(this).find("i").show();
                ++countBox;
                index.push($(this).index())
    
                var start = setTimeout(function () {
                    if (countBox % 2 == 0) {
                        $(".box > i:visible").each(function (index, element) {
                            if ($(this).hasClass("not")) {
                            }
                            else {
                                match.push($(element).attr("class").toString())
                            }
    
                        })
                        if (match[0] == match[1]) {
                            $(".box > i:visible").addClass("not")
                        }
                        else {
                            $(".box").eq(index[0]).find("i").hide();
                            $(".box").eq(index[1]).find("i").hide();
    
                        }
                        match = [];
                        index = [];
                        if ($(".box >i:visible").length == 24) {
                            duration = Date.now() - startTime;
                            $(".statusOfWin").text(`You won the game in ${duration/1000} seconds!!!`).fadeOut(6000);
                        }
                    }
                }, 200)
            }
        })
    
        // refresh button click event : refresh the page
        $(document).on("click",".refresh",function(){
            location.reload();
        })
    
         // shuffle function - this function will shuffle all the classes randomly
         function shuffle(iconClass) {
            var storeValue;
            for (let i = 0; i < iconClass.length; i++) {
                var a = parseInt(Math.random() * 15);
                storeValue = iconClass[i]
                iconClass[i] = iconClass[a]
                iconClass[a] = storeValue;
            }
        }
    
        // after shuffling, this function will choose 12 cards from choosen cards 
        function uniqueCards(iconClass) {
            for (let j = 0; j < iconClass.length; j++) {
                classes.push(iconClass[j])
                if (j == 11) {
                    break;
                }
            }
        }
    
         // this function will make exactly 24 cards to play 
         function totalCards(classes) {
            let count = 0
            for (let i = 0; i < classes.length; i++) {
                classes.push(classes[i]);
                ++count;
                if (count == 12) {
                    break;
                }
            }
            shuffle(classes);
        }
    })
    