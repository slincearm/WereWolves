var Continue = 0;
var next_night_job = 0;// 2:'numSavior', 3:'numWerewolf', 4:'numSeer', 5:'witch', 7:'hunter'
var next_day_job = 0;
var isNight = 1;
var Day = 1;
var poisonUsedCount = 0;
var cureUsedCount = 0;
define(function(){
    

    var findNextNightJob = (function (current_occupation) {
        // console.log(order_of_night_job);
        for(i=current_occupation; i<order_of_night_job.length; i++){
            // console.log('order_of_night_job['+i+']='+order_of_night_job[i]);
            if(order_of_night_job[i] != 0)
            {
                next_night_job = order_of_night_job[i];
                return order_of_night_job[i];
            }
        }
        return 0;
    });

    var findFirstNightJob = (function () {
        // console.log(order_of_night_job);
        var tmp=0;
        order_of_night_job.forEach(function(value, index){
            if(value != 0 && tmp == 0){
                tmp = value;
            }
        });
        return tmp;
    });

    var setContinue = (function() {
        Continue = 1;
    });

    var getContinue = (function() {
        return Continue;
    });

    var clrContinue = (function() {
        Continue = 0;
    });



    var thread = (function () {
        var me = this;
        // var isNight = 1;
        
        if ( isNight )
        {
            if(($('#mycontinue').val() == 1 || getContinue()) && next_night_job == 0)
            {
                $('#mycontinue').val(0);
                clrContinue();
                console.log('theme sound playing.');

                $("#rundown textarea").prepend("第"+Day+"個夜晚\n");
                $("#vTodayIs")[0].play();
                $("#vTodayIs")[0].onended = function(){ $("#vNum"+Day)[0].play();};
                $("#vNum"+Day)[0].onended = function(){ $("#vThNight")[0].play();};
                $("#vThNight")[0].onended = function(){ $("#vNightfallCloseEyes")[0].play();};
                $("#vNightfallCloseEyes")[0].onended = function(){ 
                    $("#btnContinue").attr("disabled", false);
                    $('#mycontinue').val(1);
                    setContinue();
                    next_night_job = findFirstNightJob();
                    $("#rundown textarea").prepend("[主持人] 請按下繼續鍵，開始夜晚的工作。\n");
                };
            }

            if ( hasSavior && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numSavior)
            {
                // console.log('numSavior='+numSavior);
                $('#mycontinue').val(0);// clear to 0
                clrContinue();
                if($('#occ_played').val() == 0)
                {
                    if(Day == 1)
                    {
                        $('#commonModal').data('target', 'savior-select');
                        $('#commonModalLabel').text('請標記守衛');
                        $("#modalContinueBtn").attr("disabled", true);
                        setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    }
                    play_open_eyes('Savior');
                }
                if($('#occ_played').val() == 1)
                {
                    // console.log('modal show? '+$('#commonModal').hasClass('show'));
                    $("#rundown textarea").prepend("[指令] 守衛 今晚你想守護哪個玩家？\n");
                    $("#rundown textarea").prepend("[主持人] 請記下守衛想守護的對象。\n");
                    $('#commonModal').data('target', 'savior-protect');
                    $('#commonModalLabel').text('請標記守衛想守護的對象');
                    $("#modalContinueBtn").attr("disabled", true);
                    setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    play_skill('Savior');
                }
                if($('#occ_played').val() == 2)
                    play_close_eyes('Savior', findNextNightJob(numSavior));
            }

            if ( hasWerewolf && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numWerewolf)
            {
                // console.log('numWerewolf='+numWerewolf);
                $('#mycontinue').val(0);// clear to 0
                clrContinue();
                if($('#occ_played').val() == 0)
                {
                    if(Day == 1)
                    {
                        $("#rundown textarea").prepend("[主持人] 請記下 狼人 是由哪幾位玩家所扮演。\n");
                        $('#commonModal').data('target', 'werewolves-select');
                        $('#commonModalLabel').text('請標記扮演狼人的玩家');
                        $("#modalContinueBtn").attr("disabled", true);
                        setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                        play_open_eyes('Werewolves');
                    }
                    else
                    {
                        play_open_eyes('Werewolves');
                    }
                }
                if($('#occ_played').val() == 1)
                {
                    $("#rundown textarea").prepend("[指令] 狼人 請決定今晚想獵殺的目標？\n");
                    $('#commonModal').data('target', 'werewolves-kill');
                    $('#commonModalLabel').text('請標記被狼人獵殺的玩家');
                    $("#modalContinueBtn").attr("disabled", true);
                    setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    play_skill('Werewolves');
                }
                if($('#occ_played').val() == 2)
                    play_close_eyes('Werewolves', findNextNightJob(numWerewolf));
            }

            if ( hasSeer && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numSeer)
            {
                // console.log('numSeer='+numSeer);
                $('#mycontinue').val(0);// clear to 0
                clrContinue();
                if($('#occ_played').val() == 0)
                {
                    if(Day == 1)
                    {
                        $('#commonModal').data('target', 'seer-select');
                        $('#commonModalLabel').text('請標記扮演預言家的玩家');
                        $("#modalContinueBtn").attr("disabled", true);
                        setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    }
                    play_open_eyes('Seer');
                }
                if($('#occ_played').val() == 1)
                {
                    play_skill1('Seer');
                }
                if($('#occ_played').val() == 2)
                {
                    $("#rundown textarea").prepend("[指令] 預言家 你驗到的是這個身份\n");
                    $('#commonModal').data('target', 'seer-told');
                    $('#commonModalLabel').text('請以手勢告知 預言家 所驗到的身份');
                    $("#modalContinueBtn").attr("disabled", false);
                    setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    play_skill2('Seer');
                }
                if($('#occ_played').val() == 3)
                    play_close_eyes('Seer', findNextNightJob(numSeer));
            }

            if ( hasWitch && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numWitch)
            {
                // console.log('numWitch='+numWitch);
                $('#mycontinue').val(0);// clear to 0
                clrContinue();
                if($('#occ_played').val() == 0)
                {
                    if(Day == 1)
                    {
                        $('#commonModal').data('target', 'witch-select');
                        $('#commonModalLabel').text('請標記扮演女巫的玩家');
                        $("#modalContinueBtn").attr("disabled", true);
                        setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    }
                    play_open_eyes('Witch');
                }
                if($('#occ_played').val() == 1)
                {
                    $("#rundown textarea").prepend("[主持人] 請以手勢告知 女巫 誰被殺害？\n");
                    $('#commonModal').data('target', 'witch-who-killed');
                    $('#commonModalLabel').text('請以手勢告知女巫誰被殺害？');
                    // $("#modalContinueBtn").attr("disabled", false);
                    setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    play_player_killed('Witch');
                }
                if($('#occ_played').val() == 2)
                {
                    $("#rundown textarea").prepend("[指令] 女巫 是否使用解藥？\n");
                    $('#commonModalLabel').text('是否使用解藥？');
                    $('#commonModal .modal-body').hide();
                    $('#commonModal').data('target', 'witch-cure');
                    $('#modalContinueBtn').hide();
                    $('#modalYes').show();
                    $('#modalNo').show();
                    $("#modalYes").attr("disabled", true);
                    $("#modalNo").attr("disabled", true);
                    setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                    play_skill1('Witch');
                }
                if($('#occ_played').val() == 3)
                {
                    $("#rundown textarea").prepend("[指令] 女巫 是否使用毒藥？\n");
                    $("#rundown textarea").prepend("[主持人] 請記下 女巫 是否對被殺害的人使用毒/解藥？\n");
                    if(getCureUsedCount() >= 1)
                    {
                        $('#commonModalLabel').text('已用過解藥就不能再使用毒藥了！');
                        $('#commonModal').data('target', 'witch-ignor');
                        $('#commonModal .modal-body').hide();
                        $('#modalContinueBtn').show();
                        $('#modalYes').hide();
                        $('#modalNo').hide();
                        setTimeout(function () { $('#commonModal').modal('show');}, 500);
                    }
                    else
                    {
                        $('#commonModalLabel').text('是否使用毒藥？');
                        $('#commonModal').data('target', 'witch-poison');
                        $('#modalContinueBtn').hide();
                        $('#modalYes').show();
                        $('#modalNo').show();
                        $("#modalYes").attr("disabled", true);
                        $("#modalNo").attr("disabled", true);
                    }
                    play_skill2('Witch');
                }
                if($('#occ_played').val() == 4)
                    play_close_eyes('Witch', findNextNightJob(numWitch));
            }

            if ( hasHunter && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numHunter)
            {
                // console.log('numHunter='+numHunter);
                $('#mycontinue').val(0);// clear to 0
                clrContinue();
                $('#commonModal .modal-body').show();
                $('#modalContinueBtn').show();
                $('#modalYes').hide();
                $('#modalNo').hide();
                if(1 == Day)
                {
                    if($('#occ_played').val() == 0)
                    {
                        $('#commonModal').data('target', 'hunter-select');
                        $('#commonModalLabel').text('請標記扮演獵人的玩家');
                        $("#modalContinueBtn").attr("disabled", true);
                        setTimeout(function () { $('#commonModal').modal('show'); }, 500);
                        play_open_eyes('Hunter');
                    }
                    if($('#occ_played').val() == 1)
                        play_close_eyes('Hunter', findNextNightJob(numHunter));
                }
                else
                {
                    null_run();
                }
            }

            if ( hasThief && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numThief)
            {
                // console.log('numThief='+numThief);
                // console.log('findNextNightJob='+findNextNightJob(numThief));
                if(1==Day)
                {
                    $('#mycontinue').val(0);// clear to 0
                    clrContinue();
                    if($('#occ_played').val() == 0)
                        play_open_eyes('Thief');
                    if($('#occ_played').val() == 1)
                    {
                        $("#rundown textarea").prepend("[指令] 盜賊 請選擇身份？\n");
                        play_skill('Thief');
                    }
                    if($('#occ_played').val() == 2)
                        play_close_eyes('Thief', findNextNightJob(numThief));
                }
                else
                {
                    null_run();
                }
            }
            
            if ( hasAncient && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numAncient)
            {
                // console.log('numAncient='+numAncient);
                $('#mycontinue').val(0);// clear to 0
                if(1==Day)
                {
                    if($('#occ_played').val() == 0)
                        play_open_eyes('Ancient');
                    if($('#occ_played').val() == 1)
                        play_close_eyes('Ancient', findNextNightJob(numAncient));
                }
                else
                {
                    null_run();
                }
            }
            
            if ( hasIdiot && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numIdiot)
            {
                // console.log('numIdiot='+numIdiot);
                $('#mycontinue').val(0);// clear to 0
                if(1 == Day)
                {
                    if($('#occ_played').val() == 0)
                        play_open_eyes('Idiot');
                    if($('#occ_played').val() == 1)
                        play_close_eyes('Idiot', findNextNightJob(numIdiot));
                }
                else
                {
                    null_run();
                }
            }
            if ( hasBearleader && ($('#mycontinue').val() == 1 || getContinue()) && next_night_job == numBearleader)
            {
                // console.log('numBearleader='+numBearleader);
                $('#mycontinue').val(0);// clear to 0
                if(1 == Day)
                {
                    if($('#occ_played').val() == 0)
                        play_open_eyes('BearLeader');
                    if($('#occ_played').val() == 1)
                        play_close_eyes('BearLeader', 0);
                }
                else
                {
                    null_run();
                }
            }
        }
        else
        {
            // console.log('mycontinue = '+$('#mycontinue').val());
            if(($('#mycontinue').val() == 1 || getContinue()) && next_day_job == 0)
            {
                $('#mycontinue').val(0);
                $("#rundown textarea").prepend("第"+Day+"個白天\n");
                $("#vTodayIs")[0].play();
                $("#vTodayIs")[0].onended = function(){ $("#vNum"+Day)[0].play();};
                $("#vNum"+Day)[0].onended = function(){ $("#vThDay")[0].play();};
                $("#vThDay")[0].onended = function(){ $("#vDaybreakOpenEyes")[0].play();};
                $("#vDaybreakOpenEyes")[0].onended = function(){ 
                    $("#btnContinue").attr("disabled", false);
                    console.log('theme sound play ended.');
                    next_day_job = numSheriff;
                    $('#mycontinue').val(1);
                    // console.log('next_day_job='+next_day_job);
                };
            }

            if ( ($('#mycontinue').val() == 1 || getContinue()) && next_day_job == numSheriff)
            {
                $('#mycontinue').val(0);
                console.log('mycontinue = '+$('#mycontinue').val());
                if($('#occ_played').val() == 0 && Day > 1)
                {
                    $('#occ_played').val(1);
                    console.log('force set occ_played = 1');
                }
                if($('#occ_played').val() == 0 && Day == 1)
                {
                    $("#vSheriffElection")[0].play();
                    $('#sheriffModal').modal('show');
                    $("#vSheriffElection")[0].onended = function(){
                        $("#btnContinue").attr("disabled", false);
                        $('#occ_played').val(1);
                    };
                }

                if($('#occ_played').val() == 1 && Day == 1)
                {
                    console.log('vPlayerKilledWithWords');
                    $("#rundown textarea").prepend("[主持人] 請告知哪位玩家被殺害，並讓其發表遺言。\n");
                    $('#defineDeathModal #exampleModalLabel').text('請告知哪位玩家被殺害，並讓其發表遺言。');
                    $('#defineDeathModal').modal('show');
                    $("#vPlayerKilledWithWords")[0].play();
                    $("#vPlayerKilledWithWords")[0].onended = function(){

                        $("#btnContinue").attr("disabled", false);
                        $('#occ_played').val(2);
                    };
                }
                else if($('#occ_played').val() == 1 && Day != 1)
                {
                    console.log('vPlayerKilledWithoutWords');
                    $("#vPlayerKilledWithoutWords")[0].play();
                    $("#rundown textarea").prepend("[主持人] 請告知哪位玩家被殺害，不可發表遺言。\n");
                    $('#defineDeathModal #exampleModalLabel').text('請告知哪位玩家被殺害，不可發表遺言。');
                    $('#defineDeathModal').modal('show');
                    $("#vPlayerKilledWithoutWords")[0].onended = function(){
                        $("#btnContinue").attr("disabled", false);
                        
                        $('#occ_played').val(2);
                        $('#mycontinue').val(1);
                    };
                }

                // 執行死刑
                if($('#occ_played').val() == 5)
                {
                    $('#occ_played').val(0);
                    role_stats.forEach(function(data, index){
                        if((data.status == 4 || data.status == 8))
                        {
                            // console.log('user '+(index+1)+'的status = '+data.status);
                            data.status = 10;
                        }
                    }); 
                    Day++;
                    isNight = 1;
                    next_day_job = 0;
                    $('#mycontinue').val(1);
                    check_game_result(role_stats);
                }

                // 放逐發言
                if($('#occ_played').val() == 4)
                {
                    console.log('mycontinue = '+$('#mycontinue').val());
                    $("#vDiscussion")[0].play();
                    $("#vDiscussion")[0].onended = function(){
                        $("#btnContinue").attr("disabled", false);
                        $("#rundown textarea").prepend("[主持人] 開始票人，結束後請按下繼續鍵。\n");
                        $('#electOutModal').modal('show');
                        $('#occ_played').val(5);
                    };
                }

                // 警長死亡
                if($('#occ_played').val() == 3)
                {
                    console.log('mycontinue = '+$('#mycontinue').val());
                    
                    $('#mycontinue').val(1);
                    $('#occ_played').val(4);
                    role_stats.forEach(function(data, index){
                        if((data.status == 4 || data.status == 8) && data.user == 'sheriff')
                        {
                            // 顯示移交警徽視窗
                            console.log('顯示移交警徽視窗');
                            $('#transferSheriffModal').modal('show');
                            // $('#defineDeathModal').modal('hide');
                            $('#mycontinue').val(0);
                        }
                    });
                    $("#btnContinue").attr("disabled", false);
                    console.log('occ_played = '+$('#occ_played').val());
                }

                // 獵人死亡
                if($('#occ_played').val() == 2)
                {
                    
                    console.log('mycontinue = '+$('#mycontinue').val());
                    role_stats.forEach(function(data, index){
                        if((data.status == 4 || data.status == 8) && data.role == 'hunter')
                        {
                            console.log('獵人死亡');
                            // 顯示是否發動技能
                            $('#mycontinue').val(0);
                            $('#confirmSkilledModal').modal('show');
                            $('#defineDeathModal').modal('hide');
                            $('#occ_played').val(3);
                        }
                    }); 
                    $('#occ_played').val(3);
                    console.log('顯示哪位玩家被殺害');
                    // $('#mycontinue').val(1);
                    
                    console.log('occ_played = '+$('#occ_played').val());
                }
            }
        }

        // main threading
        setTimeout(function () { me.thread(); }, 100);
    });

    var init_page = (function () {
        for (var i=1; i<=20; i++) {
            $("#sel_tPlays").append(new Option((i)+"個玩家", i));
        }
        for (var i=1; i<=20; i++) {
            $("#sel_tSkill").append(new Option("技能思考時間："+i+"秒", i));
            $("#sel_tRole").append(new Option("角色結束延遲："+i+"秒", i));
        }
        for (var i=0; i<=16; i++) {
            $("#sel_day").append(new Option("第"+(i+1)+"天開始播放", i));
        }

        $("#btnStop").attr("disabled", true);

        $('#sel_tPlays').val(12);

        // console.log("screen.height="+screen.height);
        // console.log("screen.width="+screen.width);
        // console.log("window height="+$(window).height());
        // console.log("document height="+$(document).height());
    });

    var load_config = (function () {
        Continue = 0;
        next_night_job = 0;// 2:'numSavior', 3:'numWerewolf', 4:'numSeer', 5:'witch', 7:'hunter'
        next_day_job = 0;
        isNight = 1;
        Day = 1;
        poisonUsedCount = 0;
        cureUsedCount = 0;
        $('#occ_played').val(0);

        // Day = (0==$("#sel_day").val())?1:$("#sel_day").val();
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
        order_of_night_job = [numThief, numSavior, numWerewolf, numSeer, numWitch, numAncient, numHunter, numIdiot, numBearleader];

        numSheriff = 1;
        order_of_day_job = [numSheriff];

        // role_stats = [
        //     {'user':1, 'status':0, 'role':''},
        //     {'user':2, 'status':0, 'role':'werewolves'},
        //     {'user':3, 'status':0, 'role':''},
        //     {'user':4, 'status':0, 'role':'seer'},
        //     {'user':5, 'status':0, 'role':''},
        //     {'user':6, 'status':0, 'role':''},
        //     {'user':7, 'status':1, 'role':'savior'},
        //     {'user':8, 'status':0, 'role':''},
        //     {'user':9, 'status':0, 'role':'werewolves'},
        //     {'user':10, 'status':0, 'role':'werewolves'},
        //     {'user':11, 'status':0, 'role':''},
        //     {'user':12, 'status':4, 'role':''},
        //     {'user':13, 'status':0, 'role':''},
        //     {'user':14, 'status':0, 'role':'werewolves'},
        //     {'user':15, 'status':0, 'role':''},
        //     {'user':16, 'status':0, 'role':''}
        // ];
        // role_stats = [
        //     {'user':1, 'status':0, 'role':''},
        //     {'user':2, 'status':0, 'role':''},
        //     {'user':3, 'status':0, 'role':''},
        //     {'user':4, 'status':0, 'role':''},
        //     {'user':5, 'status':0, 'role':''},
        //     {'user':6, 'status':0, 'role':''},
        //     {'user':7, 'status':0, 'role':''},
        //     {'user':8, 'status':0, 'role':''},
        //     {'user':9, 'status':0, 'role':''},
        //     {'user':10, 'status':0, 'role':''},
        //     {'user':11, 'status':0, 'role':''},
        //     {'user':12, 'status':0, 'role':''},
        //     {'user':13, 'status':0, 'role':''},
        //     {'user':14, 'status':0, 'role':''},
        //     {'user':15, 'status':0, 'role':''},
        //     {'user':16, 'status':0, 'role':''}
        // ];

        $('#players_block').empty();
        role_stats = [];
        for (var i=1; i<=$('#sel_tPlays').val(); i++) {
            var tmp = {'user':i, 'status':0, 'role':''};
            role_stats.push(tmp);
            $('#players_block').append('<div class="col-2 choose-id" data-user="'+i+'">玩家 '+i+'</div>');
        }
        console.log(role_stats);
        // <div class="modal-body row">
        // <div class="col-2 choose-id" data-user="1">玩家 1</div>
    });

    var check_game_result = (function (stats) {
        var player_count = stats.length;
        var alive_count = 0;
        var death_count = 0;
        var werewolves_count = 0;

        stats.forEach(function(data, index){
            if(data.status != 10 && data.role != 'werewolves')
            {
                alive_count++;
                if(data.status != 10 && data.user == 'sheriff')
                {
                    // alive_count++;
                }
            }
            else if(data.status != 10 && data.role == 'werewolves')
            {
                werewolves_count++;
            }
        });
        console.log(alive_count, werewolves_count);
        return;
    });




    var null_run = (function () {
        next_night_job = findNextNightJob(numHunter);
        if(next_night_job == 0)
        {
            $("#rundown textarea").prepend("[主持人] 請按下繼續鍵，開始白天的工作。\n");
            console.log('天亮了');
            isNight = 0;
            $('#mycontinue').val(1);// set to 1
        }
    });

    var setCureUsedCount = (function (count) {
        cureUsedCount = count;
    });

    var getCureUsedCount = (function () {
        return cureUsedCount;
    });

    var setPoisonUsedCount = (function (count) {
        poisonUsedCount = count;
    });

    var getPoisonUsedCount = (function () {
        return poisonUsedCount;
    });

    var func = {init_page, load_config, thread, findFirstNightJob, findNextNightJob, setCureUsedCount, getCureUsedCount, setPoisonUsedCount, getPoisonUsedCount, setContinue, clrContinue};

    return func;
});












function play_open_eyes(occupation){
    $("#rundown textarea").prepend("[指令] "+occupation+", 請睜眼。\n");
    // console.log('open eyes sound playing.');
    $("#v"+occupation+"Open")[0].play();
    $("#v"+occupation+"Open")[0].onended = function(){ 
        if(occupation != 'Werewolves' && occupation != 'Seer')
        {
            // 打開繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
            console.log('把按鈕打開了');
        }
        $('#occ_played').val(parseInt($('#occ_played').val())+1);
        // console.log('next sound='+$('#occ_played').val());
        $("#btnContinue").attr("disabled", true);
        // console.log('open eyes sound ended.');
    };
}

function play_skill(occupation) {
    // $("#rundown textarea").prepend(occupation+", release your skill please.\n");
    // console.log('skill choose sound playing.');
    $("#modalContinueBtn").attr("disabled", true);
    $("#v"+occupation+"Skill")[0].play();
    $("#v"+occupation+"Skill")[0].onended = function(){
        $('#occ_played').val(parseInt($('#occ_played').val())+1);
        // console.log('next sound='+$('#occ_played').val());
        $("#btnContinue").attr("disabled", true);
        if(occupation == 'Thief')
        {
            $("#rundown textarea").prepend("[主持人] 請在 盜賊 決定身份後，按下繼續鍵。\n");
            $("#btnContinue").attr("disabled", false);
        }
        // console.log('skill choose  sound ended.');
    };
}

function play_player_killed(occupation) {
    // $("#rundown textarea").prepend(occupation+", someone killed.\n");
    // console.log('someone killed sound playing.');
    $("#modalContinueBtn").attr("disabled", true);
    $("#vPlayerKilled")[0].play();
    $("#vPlayerKilled")[0].onended = function(){ 
        $('#occ_played').val(parseInt($('#occ_played').val())+1);
        // console.log('next sound='+$('#occ_played').val());
        // $("#btnContinue").attr("disabled", true);
        // setTimeout(function () { $('#mycontinue').val(1) }, 500);
        if(occupation == 'Witch')
        {
            console.log('告知女巫後，讓主持人可以按下繼續鈕。');
            $("#modalContinueBtn").attr("disabled", false);
        }
    };

}

function play_skill1(occupation) {
    // $("#rundown textarea").prepend(occupation+", release your skill please.\n");
    console.log('skill choose sound playing.');
    $("#modalContinueBtn").attr("disabled", true);
    $("#v"+occupation+"Skill1")[0].play();
    $("#v"+occupation+"Skill1")[0].onended = function(){
        $('#occ_played').val(parseInt($('#occ_played').val())+1);
        console.log('next sound='+$('#occ_played').val());
        $("#btnContinue").attr("disabled", true);
        // setTimeout(function () { $('#mycontinue').val(1) }, 500);
        console.log('skill choose sound ended.');
        if(occupation == 'Seer')
        {
            Continue = 1;
        }
        else if(occupation == 'Witch')
        {
            $("#modalYes").attr("disabled", false);
            $("#modalNo").attr("disabled", false);
        }
    };
}

function play_skill2(occupation) {
    // $("#rundown textarea").prepend(occupation+", release your skill please.\n");
    console.log('skill choose sound playing.');
    $("#modalContinueBtn").attr("disabled", true);
    $("#v"+occupation+"Skill2")[0].play();
    $("#v"+occupation+"Skill2")[0].onended = function(){ 
        $('#occ_played').val(parseInt($('#occ_played').val())+1);
        console.log('next sound='+$('#occ_played').val());
        $("#btnContinue").attr("disabled", true);
        if(occupation == 'Seer')
        {
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(occupation == 'Witch')
        {
            $("#modalYes").attr("disabled", false);
            $("#modalNo").attr("disabled", false);
            $("#modalContinueBtn").attr("disabled", false);
        }
        else
        {
            setTimeout(function () { $('#mycontinue').val(1) }, 500);
        }
        console.log('skill choose sound ended.');
    };
}

function play_close_eyes(occupation, Next_night_job) {
    $("#rundown textarea").prepend("[指令] "+occupation+", 請閉眼。\n");
    console.log('close eyes sound playing.');
    $("#v"+occupation+"Close")[0].play();
    $("#v"+occupation+"Close")[0].onended = function(){ 
        $('#occ_played').val(0);
        console.log('next sound='+$('#occ_played').val());
        $("#btnContinue").attr("disabled", false);
        // $('#next_night_job').val(next_night_job);// point to next occupation.

        console.log('next_night_job='+Next_night_job);
        console.log('close eyes sound ended.');
        next_night_job = Next_night_job;
        if(next_night_job == 0)
        {
            $("#rundown textarea").prepend("[主持人] 天亮了，開始白天的工作。\n");
            // $('#mycontinue').val(1);
            // console.log('天亮了');
            isNight = 0;
        }
        // autorun
        $('#mycontinue').val(1);
        // setTimeout(function () {
        //     if(isNight == 0)
        //     {
        //         // $('#mycontinue').val(0);
        //     }
        //     else
        //     {
        //     }
        // }, 500);


    };
}
