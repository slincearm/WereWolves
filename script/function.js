define(function(){
    var wait = (function (ms, cb) {
        var waitDateOne = new Date();
        while ((new Date()) - waitDateOne <= ms) {
            //Nothing
        }
        if (cb) {
            eval(cb);
        }
    });

    var waitAction = (async function (hint) {
        // $("#rundown textarea").append(hint);
        console.log(hint);
        wait(1000);
        // if($('#mycontinue').val() == 0)
        // {
        //  waitAction('internal waitting.');
        // }
     //    while ( !Continue )
        // {
        //  wait(1000);
     //        console.log('do nothing, waiting for user click continue button');
        //  // do nothing, waiting for user click continue button
        // }
    });

    var startGame = (async function (count) {
        var isNight = 1;

        while ( Day <= 16)
        {
            if ( isNight )
            {
                $("#rundown textarea").append("第"+Day+"個夜晚\n");
                $("#vTodayIs")[0].play();
                $("#vNum"+Day)[0].play();
                $("#vThNight")[0].play();
                $("#vNightfallCloseEyes")[0].play();

                // sleep(TimeRole);
                // wait(TimeRole);
                if ( hasThief && (1==Day) )
                {
                    console.log('after delay hasThief');
                    $("#vThiefOpen")[0].play();
                    // sleep(TimeSkill);
                    // wait(TimeSkill);
                    $("#vThiefSkill")[0].play();
                    // wait(10000);
                    setTimeout(function () { }, 10000);
                    console.log('wait 10 seconds.');
                    // waitAction("盜賊決定後，按任意鍵繼續…");
                    // $('#mycontinue').val(0);
                    $("#vThiefClose")[0].play();
                    // sleep(TimeRole);
                    // wait(TimeRole);
                }
            }
            else
            {
                $("#rundown textarea").append("第"+Day+"個白天\n");
                $("#vTodayIs")[0].play();
                $("#vNum"+Day)[0].play();
                $("#vThDay"+Day)[0].play();
                $("#vDaybreakOpenEyes")[0].play();
                // sleep(TimeSkill);
                // wait(TimeSkill);
                if ( 1 == Day )
                {
                    $("#vSheriffElection")[0].play();
                    waitAction("警長競選完畢後，按任意鍵繼續…");
                    $("#vPlayerKilledWithWords")[0].play();
                    waitAction("遺言發表完畢後，按任意鍵繼續…");
                }
                else
                {
                    $("#vPlayerKilledWithoutWords")[0].play();
                    // sleep(TimeRole);
                    // wait(TimeRole);
                }

                if ( config[eBearLeader] )
                {
                    $("#vBearLeaderSkill")[0].play();
                    // sleep(TimeRole);
                    // wait(TimeRole);
                }

                $("#vDiscussion")[0].play();
                waitAction("村民投票放逐，被放逐者遺言發表完畢後，按任意鍵繼續…");
            }
            if ( !isNight)
                ++Day;
        }
    });

    var findNextOccupation = (function (current_occupation) {
        console.log(order_occupation);
        for(i=current_occupation; i<order_occupation.length; i++){
            // console.log('order_occupation['+i+']='+order_occupation[i]);
            if(order_occupation[i] != 0)
            {
                return order_occupation[i];
            }
        }
        return 0;
    });

    var findFirstOccupation = (function () {
        // console.log(order_occupation);
        var tmp=0;
        order_occupation.forEach(function(value, index){
            if(value != 0 && tmp == 0){
                tmp = value;
            }
        });
        return tmp;
    });

    var thread = (function () {
        var me = this;
        var isNight = 1;
        if ( isNight )
        {
            if($('#mycontinue').val() == 1 && $('#next_job').val() == 0)
            {
                // console.log(order_occupation);
                // console.log('first occ='+typeof findFirstOccupation());
                // $('#next_job').val(numThief);
                // console.log('#next_job.val() = '+$('#next_job').val());
                $('#mycontinue').val(0);
                console.log('theme sound playing.');

                $("#rundown textarea").append("第"+Day+"個夜晚\n");
                $("#vTodayIs")[0].play();
                $("#vTodayIs")[0].onended = function(){ $("#vNum"+Day)[0].play();};
                $("#vNum"+Day)[0].onended = function(){ $("#vThNight")[0].play();};
                $("#vThNight")[0].onended = function(){ $("#vNightfallCloseEyes")[0].play();};
                $("#vNightfallCloseEyes")[0].onended = function(){ 
                    $("#btnContinue").attr("disabled", false);
                    console.log('theme sound play ended.');
                    $('#next_job').val(findFirstOccupation());
                    // console.log('first exist occupation='+findFirstOccupation());

                };
            }

            if ( hasThief && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numThief)
            {
                // console.log('numThief='+numThief);
                // console.log('findNextOccupation='+findNextOccupation(numThief));

                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Thief');
                if($('#occ_played').val() == 1)
                    play_skill('Thief');
                if($('#occ_played').val() == 2)
                    play_close_eyes('Thief', findNextOccupation(numThief));
            }
            if ( hasSavior && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numSavior)
            {
                console.log('numSavior='+numSavior);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Savior');
                if($('#occ_played').val() == 1)
                    play_skill('Savior');
                if($('#occ_played').val() == 2)
                    play_close_eyes('Savior', findNextOccupation(numSavior));
            }
            if ( hasWerewolf && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numWerewolf)
            {
                console.log('numWerewolf='+numWerewolf);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Werewolves');
                if($('#occ_played').val() == 1)
                    play_skill('Werewolves');
                if($('#occ_played').val() == 2)
                    play_close_eyes('Werewolves', findNextOccupation(numWerewolf));
            }
            if ( hasSeer && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numSeer)
            {
                console.log('numSeer='+numSeer);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Seer');
                if($('#occ_played').val() == 1)
                    play_skill1('Seer');
                if($('#occ_played').val() == 2)
                    play_skill2('Seer');
                if($('#occ_played').val() == 3)
                    play_close_eyes('Seer', findNextOccupation(numSeer));
            }
            if ( hasWitch && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numWitch)
            {
                console.log('numWitch='+numWitch);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Witch');
                if($('#occ_played').val() == 1)
                    play_player_killed('Witch');
                if($('#occ_played').val() == 2)
                    play_skill1('Witch');
                if($('#occ_played').val() == 3)
                    play_skill2('Witch');
                if($('#occ_played').val() == 4)
                    play_close_eyes('Witch', findNextOccupation(numWitch));
            }
            if ( hasAncient && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numAncient)
            {
                console.log('numAncient='+numAncient);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Ancient');
                if($('#occ_played').val() == 1)
                    play_close_eyes('Ancient', findNextOccupation(numAncient));
            }
            if ( hasHunter && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numHunter)
            {
                console.log('numHunter='+numHunter);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Hunter');
                if($('#occ_played').val() == 1)
                    play_close_eyes('Hunter', findNextOccupation(numHunter));
            }
            if ( hasIdiot && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numIdiot)
            {
                console.log('numIdiot='+numIdiot);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('Idiot');
                if($('#occ_played').val() == 1)
                    play_close_eyes('Idiot', findNextOccupation(numIdiot));
            }
            if ( hasBearleader && (1==Day) && $('#mycontinue').val() == 1 && $('#next_job').val() == numBearleader)
            {
                console.log('numBearleader='+numBearleader);
                $('#mycontinue').val(0);// clear to 0
                if($('#occ_played').val() == 0)
                    play_open_eyes('BearLeader');
                if($('#occ_played').val() == 1)
                    play_close_eyes('BearLeader', 0);
            }
        }

        // main threading
        setTimeout(function () { me.thread(); }, 10);
    });

    var init_page = (function () {
        for (var i=1; i<=20; i++) {
            $("#sel_tSkill").append(new Option("技能思考時間："+i+"秒", i));
            $("#sel_tRole").append(new Option("角色結束延遲："+i+"秒", i));
        }
        for (var i=0; i<=16; i++) {
            $("#sel_day").append(new Option("第"+(i+1)+"天開始播放", i));
        }

        $("#btnContinue").attr("disabled", true);
        $("#btnStop").attr("disabled", true);

        console.log("screen.height="+screen.height);
        console.log("screen.width="+screen.width);
        console.log("window height="+$(window).height());
        console.log("document height="+$(document).height());
    });

    var load_config = (function () {
        Day = (0==$("#sel_day").val())?1:$("#sel_day").val();
        TimeRole = 1000*$("#sel_tRole").val();
        // console.log("TimeRole="+TimeRole);
        TimeSkill = 1000*$("#sel_tSkill").val();
        // console.log("Day="+Day);
        hasSeer = $("#seer").is(":checked");
        hasHunter = $("#hunter").is(":checked");
        hasWitch = $("#witch").is(":checked");
        hasSavior = $("#savior").is(":checked");
        hasWerewolf = $("#werewolf").is(":checked");
        hasAncient = $("#ancient").is(":checked");
        hasThief = $("#thief").is(":checked");
        hasIdiot = $("#idiot").is(":checked");
        hasBearleader = $("#bearleader").is(":checked");

        numSeer = ($("#seer").is(":checked"))?$("#seer").val():0;
        numHunter = ($("#hunter").is(":checked"))?$("#hunter").val():0;
        numWitch = ($("#witch").is(":checked"))?$("#witch").val():0;
        numSavior = ($("#savior").is(":checked"))?$("#savior").val():0;
        numWerewolf = ($("#werewolf").is(":checked"))?$("#werewolf").val():0;
        numAncient = ($("#ancient").is(":checked"))?$("#ancient").val():0;
        numThief = ($("#thief").is(":checked"))?$("#thief").val():0;
        numIdiot = ($("#idiot").is(":checked"))?$("#idiot").val():0;
        numBearleader = ($("#bearleader").is(":checked"))?$("#bearleader").val():0;
        order_occupation = [numThief, numSavior, numWerewolf, numSeer, numWitch, numAncient, numHunter, numIdiot, numBearleader];
    });

    var play_open_eyes = (function (occupation) {
        $("#rundown textarea").append(occupation+", open eyes please.\n");
        console.log('open eyes sound playing.');
        $("#v"+occupation+"Open")[0].play();
        $("#v"+occupation+"Open")[0].onended = function(){ 
            $('#occ_played').val(parseInt($('#occ_played').val())+1);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", true);
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
            console.log('open eyes sound ended.');
        };
    });

    var play_skill = (function (occupation) {
        $("#rundown textarea").append(occupation+", release your skill please.\n");
        console.log('skill choose sound playing.');
        $("#v"+occupation+"Skill")[0].play();
        $("#v"+occupation+"Skill")[0].onended = function(){ 
            $('#occ_played').val(parseInt($('#occ_played').val())+1);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", true);
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
            console.log('skill choose  sound ended.');
        };
    });

    var play_player_killed = (function (occupation) {
        $("#rundown textarea").append(occupation+", someone killed.\n");
        console.log('someone killed sound playing.');
        $("#vPlayerKilled")[0].play();
        $("#vPlayerKilled")[0].onended = function(){ 
            $('#occ_played').val(parseInt($('#occ_played').val())+1);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", true);
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
            console.log('someone killed sound ended.');
        };
    });

    var play_skill1 = (function (occupation) {
        $("#rundown textarea").append(occupation+", release your skill please.\n");
        console.log('skill choose sound playing.');
        $("#v"+occupation+"Skill1")[0].play();
        $("#v"+occupation+"Skill1")[0].onended = function(){
            $('#occ_played').val(parseInt($('#occ_played').val())+1);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", true);
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
            console.log('skill choose sound ended.');
        };
    });

    var play_skill2 = (function (occupation) {
        $("#rundown textarea").append(occupation+", release your skill please.\n");
        console.log('skill choose sound playing.');
        $("#v"+occupation+"Skill2")[0].play();
        $("#v"+occupation+"Skill2")[0].onended = function(){ 
            $('#occ_played').val(parseInt($('#occ_played').val())+1);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", true);
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
            console.log('skill choose sound ended.');
        };
    });

    var play_close_eyes = (function (occupation, next_job) {
        $("#rundown textarea").append(occupation+", close eyes please.\n");
        console.log('close eyes sound playing.');
        $("#v"+occupation+"Close")[0].play();
        $("#v"+occupation+"Close")[0].onended = function(){ 
            $('#occ_played').val(0);
            console.log('next sound='+$('#occ_played').val());
            $("#btnContinue").attr("disabled", false);
            $('#next_job').val(next_job);// point to next occupation.
            console.log('next_job='+next_job);
            console.log('next occupation='+$('#next_job').val());
            console.log('close eyes sound ended.');
            // autorun
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
        };
    });

    var func = {wait, startGame, init_page, load_config, thread, findFirstOccupation, findNextOccupation};

    return func;
});