require.config(
    {
        waitSeconds: 15,
        urlArgs: "bust=" + (new Date()).getTime(),
        paths: {
            'jquery': '../js/lib/jquery-3.2.1.min',
            // 'desc': '../lib/desc',
            'myFunctions': '../lib/function'
        }
    }
);

require(['jquery', 'function'], function ($, func) {
    var g_count = 5;
        func.init_page();
    $('#btnTest').on('click', function(){
        console.log('-- TEST -- start game.');
        func.init_page();
        func.load_config();
        console.log(func.findNextOccupation(5));
    });

    // start program here
    $("#btnStart").on("click", function() {
        console.log("btnStart onClick()");
        $("#btnStart").attr("disabled", true);
        $("#btnContinue").attr("disabled", true);
        $("#btnStop").attr("disabled", false);
        $('#mycontinue').val(1);

        func.load_config();
        // func.startGame();
        func.thread();
    });

    $("#btnContinue").on("click", function() {
        $('#mycontinue').val(1);
        // console.log("continue="+$('#mycontinue').val());
        $("#btnContinue").attr("disabled", true);
        // console.log("btnContinue onClick()");
        // Continue = 1;
        // if($('#mycontinue').val() == 1)
        // {
        //     $('#mycontinue').val(0);
        // }
        // else
        // {
        //     $('#mycontinue').val(1);
        // }
        // $("#mycontinue").attr("disabled", false);
    });

    $("#btnStop").bind("click", function() {
        console.log("btnStop onClick()");
        condition = 0;
        $("#btnStart").attr("disabled", false);
        $("#btnContinue").attr("disabled", true);
        $("#btnStop").attr("disabled", true);
    });

    $(".config-bar").on("click", function() {
        $(".config").toggleClass("fold");
        $(".config").slideToggle();
        $(".config-bar img").attr("src", ($(".config").hasClass("fold"))?"i/icon-arrow-down.png":"i/icon-arrow-up.png");
    });
});

