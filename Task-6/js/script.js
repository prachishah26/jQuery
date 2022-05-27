$(document).ready(function () {
    $("table").hide()
    var index,page,firstName,lastName,gender,email,contact,dob,sports,about,checkbox,current_tr;
    $(".step").removeClass("bg").eq(0).addClass("bg")

    $(".step").click(function () {
        index = $(this).index();
        $(".level").hide().eq(index).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg")
    });

    $(".next").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page + 1).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg")
    });

    $(".prev").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page - 1).show();
        $(".step").removeClass("bg").eq($(".level:visible").index()).addClass("bg")
    });

    // submit button 
    $(".submit").click(function () {
        get_details();
        clear_details();

        $("table, .data-title").show();
        var count = $('#myTable tr').length;

        $(".data-table tbody").append("<tr data-fname='"+firstName+"' data-lname='" +lastName + "'data-gender='" + gender + "'data-email='" + email + "'data-contact='" + contact + "'data-dob='"+ dob + "'data-sports='" + sports +"'data-about='" + about+"'data-checkbox='" + checkbox +"'><td>"+count+ "</td><td>"+firstName + "</td><td>"+lastName+"</td><td>"+gender+"</td><td>"+email+"</td><td>"+contact+"</td><td>"+dob+"</td><td>"+sports+"</td><td>"+about+"</td><td>"+checkbox+"</td><td>"+'<button class="btn btn-warning btn-edit">EDIT</button>' +"</td><td>"+'<button class="btn btn-danger btn_delete">DELETE</button>'+"</td></tr>");
        $(".step").removeClass("bg").eq(0).addClass("bg");
        $(".submit-status").show().fadeOut(5000);
    })

    $("body").on("click",".btn_delete",function(){
        $(this).parents("tr").remove();

        $("tbody tr").each(function(index){
            $(this).find("td:eq(0)").text(index+1);
        })
        if ($("tbody tr").length==0){
            $("table , .data-title").hide();
        }
    })

    // edit button 
    $("body").on("click",".btn-edit",function(){

        var fname = $(this).parents("tr").attr("data-fname");
        var lname = $(this).parents("tr").attr("data-lname");
        var gender = $(this).parents("tr").attr("data-gender");
        var email = $(this).parents("tr").attr("data-email");
        var contact = $(this).parents("tr").attr("data-contact");
        var dob = $(this).parents("tr").attr("data-dob");
        var sports = $(this).parents("tr").attr("data-sports");
        var about = $(this).parents("tr").attr("data-about");
        var checkbox = $(this).parents("tr").attr("data-checkbox");

        $("#fname").val(fname);
        $("#lname").val(lname);
        $("input[type=radio][value=" + gender + "]"). prop('checked', true);
        $("#email").val(email);
        $("#contact").val(contact);
        $("#birthday").val(dob);
        $("#sports").val(sports);
        $("#about").val(about);
        $("#checkbox").val(checkbox);

        $(".btn-update , .btn-cancel").show();
        $(".btn_delete").attr("disabled",true);
        $(".submit").hide();
        current_tr = $(this).parents("tr").index();
        console.log(current_tr);

    })
    // cancel button 
    $("body").on("click",".btn-cancel",function(){
        clear_details();

        $(".btn-update, .btn-cancel").hide();
        $(".submit").show()
        $(".btn_delete").attr("disabled",false);
    })

    // update button 
    $("body").on("click",".btn-update",function(){
        $(".level").hide().first().show();
        var count = $('#myTable tr').length-1;
        $(this).hide();
        $(".btn-cancel").hide();
        $(".submit").show();
        get_details();
        clear_details();

        $("tbody tr").eq(current_tr).replaceWith("<tr data-fname='"+firstName+"' data-lname='" +lastName + "'data-gender='" + gender + "'data-email='" + email + "'data-contact='" + contact + "'data-dob='"+ dob + "'data-sports='" + sports +"'data-about='" + about+"'data-checkbox='" + checkbox +"'><td>"+count+ "</td><td>"+firstName + "</td><td>"+lastName+"</td><td>"+gender+"</td><td>"+email+"</td><td>"+contact+"</td><td>"+dob+"</td><td>"+sports+"</td><td>"+about+"</td><td>"+checkbox+"</td><td>"+'<button class="btn btn-warning btn-edit">EDIT</button>' +"</td><td>"+'<button class="btn btn-danger btn_delete">DELETE</button>'+"</td></tr>");
        $(".btn_delete").attr("disabled",false);
    })

    function clear_details(){
        $("input[type=text],input[type=phone], textarea").val("");
        $('#gridRadios1').prop('checked', true);
        $("#sports").val(0);
        $('input[type="checkbox"]').prop('checked',false);
        $(".level").hide().first().show();
    }
    function get_details(){
        firstName = $("#fname").val();
        lastName = $("#lname").val();
        if($("input[type=radio][name=gridRadios]").is(':checked')){
            gender = $("input[type=radio][name=gridRadios]:checked").val()
        }
        else{
            gender = "";
        }
        email = $("#email").val();
        contact = $("#contact").val();
        dob = $("#birthday").val();
        sports = $("#sports").val();
        if ($("#sports").val()==0){
            sports = ""
        }
        about = $("#about").val();
        if ($(':checkbox').is(':checked')){
            checkbox = "Yes";
        }
        else{
            checkbox = "No";
        }
    }
}) 