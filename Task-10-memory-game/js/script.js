$(document).ready(function () {

    // Total classes 
    var iconClass = ["fa fa-fire", "fa fa-eye", "fa fa-wifi", "fa fa-plane", "fa fa-rocket", "fa fa-file", "fa fa-car", "fa fa-heartbeat", "fa fa-book", "fa fa-trophy", "fa fa-bitcoin", "fa fa-circle", "fa fa-truck", "fa fa-tree", "fa fa-tablet", "fa fa-signal", "fa fa-phone", "fa fa-instagram", "fa fa-snapchat", "fa fa-facebook", "fa fa-firefox", "fa fa-quora", "fa fa-spotify", "fa fa-wordpress", "fa fa-youtube", "fa fa-yahoo", "fa fa-github", "fa fa-paypal", "fa fa-opera"]

    var index = [];

    var classes = [];
    var match = []
    var countBox = 0;

    // shuffle function 
    function shuffle(iconClass) {
        var storeValue;
        for (let i = 0; i < iconClass.length; i++) {
            var a = parseInt(Math.random() * 15);
            storeValue = iconClass[i]
            iconClass[i] = iconClass[a]
            iconClass[a] = storeValue;
        }

    }

    // this function will choose 12 cards from choosen cards 
    function uniqueCards(iconClass) {
        for (let j = 0; j < iconClass.length; j++) {
            classes.push(iconClass[j])
            if (j == 11) {
                break;
            }
        }
    }

    shuffle(iconClass)
    uniqueCards(iconClass)
    console.log(classes)


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
        var storeValue;
        for (let i = 0; i < classes.length; i++) {
            var a = Math.floor(Math.random() * 10);
            storeValue = classes[i]
            classes[i] = classes[a]
            classes[a] = storeValue;
        }
    }
    totalCards(classes)
    console.log(classes)

    // this will append icon classes on boxes 
    for (let i = 0; i <= classes.length; i++) {
        $(".box").eq(i).find("i").addClass(classes[i])
    }

    $(".box > i").hide();

    // click event on box 
    $(".box").click(function () {
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
                        console.log("hii")
                        $(".box > i:visible").addClass("not")
                        // $(".box > i:visible").parent().attr("disabled", true)
                    }
                    else {
                        console.log("0 and 1 index", index[0], index[1])

                        $(".box").eq(index[0]).find("i").hide();
                        $(".box").eq(index[1]).find("i").hide();

                    }
                    match = [];
                    index = [];
                    console.log(match)
                }
            }, 1000)
        }
    })

    if ($(".box>i:visible").length == 24) {
        alert("You won the game !!!")
    }
})


