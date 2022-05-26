$(document).ready(function () {
    $("table").hide()
    var index = 0;
    var page;
    var firstName;
    var lastName;
    var gender;
    var email;
    var contact;
    var dob;
    var sports;
    var about;
    var current_tr;

    $(".step").click(function () {
        index = $(this).index();
        $(".level").hide().eq(index).show();
    });

    $(".next").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page + 1).show();
    });

    $(".prev").click(function () {
        page = $(".level:visible").index();
        $(".level").hide().eq(page - 1).show();
    });

    // submit button 
    $(".submit").click(function (e) {
        e.preventDefault()
        firstName = $("#fname").val();
        lastName = $("#lname").val();
        gender = $("input[type=radio][name=gridRadios]:checked").val();
        email = $("#email").val();
        contact = $("#contact").val();
        dob = $("#birthday").val();
        sports = $("#sports").val();
        about = $("#about").val();

        $("input[type=text],input[type=phone], textarea").val("");
        $('input[name="gridRadios"]').prop('checked', false);
        $("#sports").val(0);
        $(".level").hide().first().show();

        
        $("table").show();
        var count = $('#myTable tr').length;
        

        $(".data-table tbody").append("<tr data-fname='"+firstName+"' data-lname='" +lastName + "'data-gender='" + gender + "'data-email='" + email + "'data-contact='" + contact + "'data-dob='"+ dob + "'data-sports='" + sports +"'data-about='" + about +"'><td>"+count+ "</td><td>"+firstName + "</td><td>"+lastName+"</td><td>"+gender+"</td><td>"+email+"</td><td>"+contact+"</td><td>"+dob+"</td><td>"+sports+"</td><td>"+about+"</td><td>"+'<button class="btn btn-info btn-edit">edit</button>' +"</td><td>"+'<button class="btn btn-danger btn_delete">DELETE</button>'+"</td></tr>");

    })

    $("body").on("click",".btn_delete",function(){
        $(this).parents("tr").remove();

        $("tbody tr").each(function(index){
            $(this).find("td:eq(0)").text(index+1);
        })
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

        $("#fname").val(fname);
        $("#lname").val(lname);
        $("input[type=radio][value=" + gender + "]"). prop('checked', true);
        $("#email").val(email);
        $("#contact").val(contact);
        $("#birthday").val(dob);
        $("#sports").val(sports);
        $("#about").val(about);

        $(".btn-update , .btn-cancel").show();
        $(".submit").hide();
        current_tr = $(this).parents("tr").index();
        console.log(current_tr);

    })
    $("body").on("click",".btn-cancel",function(){
        $("input[type=text],input[type=phone], textarea").val("");
        $('input[name="gridRadios"]').prop('checked', false);
        $("#sports").val(0);

        $(".btn-update, .btn-cancel").hide();
        $(".submit").show()
    })
     
    // update button 
    $("body").on("click",".btn-update",function(){
        $(".level").hide().first().show();
        var count = $('#myTable tr').length-1;
        $(this).hide();
        firstName = $("#fname").val();
        lastName = $("#lname").val();
        gender = $("input[type=radio][name=gridRadios]:checked").val();
        email = $("#email").val();
        contact = $("#contact").val();
        dob = $("#birthday").val();
        sports = $("#sports").val();
        about = $("#about").val();

        $("input[type=text],input[type=phone], textarea").val("");
        $('input[name="gridRadios"]').prop('checked', false);
        $("#sports").val(0);

        $("tbody tr").eq(current_tr).replaceWith("<tr data-fname='"+firstName+"' data-lname='" +lastName + "'data-gender='" + gender + "'data-email='" + email + "'data-contact='" + contact + "'data-dob='"+ dob + "'data-sports='" + sports +"'data-about='" + about +"'><td>"+count+ "</td><td>"+firstName + "</td><td>"+lastName+"</td><td>"+gender+"</td><td>"+email+"</td><td>"+contact+"</td><td>"+dob+"</td><td>"+sports+"</td><td>"+about+"</td><td>"+'<button class="btn btn-info btn-edit">edit</button>' +"</td><td>"+'<button class="btn btn-danger btn_delete">DELETE</button>'+"</td></tr>");
    })
})