requirejs.config({
    waitSeconds: 15,
    urlArgs: "bust=" + (new Date()).getTime(),
    "paths": {
        "jquery": "../js/lib/jquery-3.2.1.min",
        "popper": "../js/lib/popperjs/umd/popper",
        "bootstrap": "../js/lib/bootstrap",
        "function": "../script/function"
    },
    "shim" : {
        "bootstrap": ["jquery","popper"]
    }
});
 
require(["popper"],function(p){
    window.Popper = p;
    // require(["app/main"],function(app){
    //     window.mainApp = app;
    // });
});

require(['jquery', 'bootstrap', 'function'], function($, _bootstrap, func){
    func.init_page();
    // var poison_used = 0;
    var cure_used = 0;
    var savior_count = 0;
    var sheriff_count = 0;
    var transfer_count = 0;
    var electout_count = 0;
    var hunter_count = 0;
    var werewolves_count = 0;
    var kill_count = 0;
    var seer_count = 0;
    var witch_count = 0;
    var poison_count = 0;
    var skilled_count = 0;

    $('#modalContinueBtn').on('click', function(){
        // var $commonModalTarget = $('#commonModal').data('target');
        // if($commonModalTarget == 'savior-select')
        // {
        //     savior_count = 0;
        // }
        // else if($commonModalTarget == 'savior-protect')
        // {
        //     savior_count = 0;
        // }
        // else if($commonModalTarget == 'werewolves-select')
        // {
        //     werewolves_count = 0;
        // }
        // else if($commonModalTarget == 'werewolves-kill')
        // {
        //     kill_count = 0;
        // }
        // else if($commonModalTarget == 'seer-select' || $commonModalTarget == 'seer-told')
        // {
        //     seer_count = 0;
        // }
        // else if($commonModalTarget == 'witch-select')
        // {
        //     witch_count = 0;
        // }
        // else if($commonModalTarget == 'witch-who-killed')
        // {
        // }
        // else if($commonModalTarget == 'witch-want-kill')
        // {
        // }
        // else if($commonModalTarget == 'witch-ignor')
        // {
        // }
        // else if($commonModalTarget == 'hunter-select')
        // {
        // }
        savior_count = 0;
        sheriff_count = 0;
        transfer_count = 0;
        electout_count = 0;
        hunter_count = 0;
        werewolves_count = 0;
        kill_count = 0;
        seer_count = 0;
        witch_count = 0;
        poison_count = 0;
        skilled_count = 0;
        $('#commonModal').modal('hide');
        $('#commonModal').data('target', '');
        func.setContinue();
    });


    $('#modalYes').on('click', function(){
        console.log('modalYes');
        // var targetModal = $('#confirmModal').data('target');
        var targetModal = $('#commonModal').data('target');
        if(targetModal == 'witch-cure')
        {
            $('#commonModal').modal('hide');
            role_stats.forEach(function(data, index){
                if(data.status == 4)
                {
                    data.status = 0;
                    console.log('玩家'+(index+1)+'被女巫救活了。');
                    func.setCureUsedCount(func.getCureUsedCount()+1);
                    console.log('CureUsedCount = '+func.getCureUsedCount());
                }
                else if(data.status == 5)
                {
                    func.setCureUsedCount(func.getCureUsedCount()+1);
                    console.log('CureUsedCount = '+func.getCureUsedCount());
                    data.status = 4;
                    console.log('玩家'+(index+1)+'被女巫害死了。');
                }
            });
            console.log('CureUsedCount = '+func.getCureUsedCount());
            func.setContinue();

        }
        else if(targetModal == 'witch-poison')
        {
            
            func.setPoisonUsedCount(func.getPoisonUsedCount()+1);
            console.log('PoisonUsedCount = '+func.getPoisonUsedCount());
            
            $('#commonModalLabel').text('請選擇要毒殺哪位玩家？');
            $('#commonModal').data('target', 'witch-want-kill');
            $('#commonModal .modal-body').show();
            $('#modalContinueBtn').show();
            $('#modalYes').hide();
            $('#modalNo').hide();
        }
        return;
        //if(hasSkilledModal)
        // {
        //     $('#confirmSkilledModal').modal('hide');
        //     $('#shootingModal').modal('show');
        // }
    });

    $('#modalNo').on('click', function(){
        console.log('modalNo');
        // var targetModal = $('#confirmModal').data('target');
        var targetModal = $('#commonModal').data('target');
        if(targetModal == 'witch-cure')
        {
            $('#commonModal').modal('hide');
            if(func.getPoisonUsedCount() <= 0)
            {
                console.log('是否使用毒藥?');
                $('#commonModal').data('target', 'witch-poison');
                $('#commonModalLabel').text('是否使用毒藥?');
                setTimeout(function () { 
                    $('#commonModal').modal('show'); 
                }, 500);
            }
            else
            {
                console.log('這裡有進來嗎？');
                $('#informNoDragModal').modal('show');
            }
            func.setContinue();
        }
        else if(targetModal == 'witch-poison')
        {
            $('#commonModal').modal('hide');
            func.setContinue();
        }
        return;
        // if(hasSkilledModal)
        // {
        //     $('#confirmSkilledModal').modal('hide');
        //     $('#mycontinue').val(1);
        // }
        // console.log('Do NOT save the person who killed by werewolves.');
    });

    // 當有modal秀出來時觸發此callback
    $(document).on('shown.bs.modal','.modal', function () {
        // console.log(role_stats);
        // console.log('當前Modal = '+$('#commonModal').data('target'));
        $(this).find('div .choose-id').each(function( index, data)
        {
			var roleStr = '玩家';
			if(role_stats[index].user == 'sheriff')
			{
				roleStr = '警長';
				$(this).html('警長'+(index+1));
			}
            if(role_stats[index].role != '')
            {
               // console.log(index);
                if(role_stats[index].role == 'werewolves')
                {
                    $(this).html(roleStr+(index+1)+'<br>狼人');
                    if(role_stats[index].status == 0)
                    {
                        $(this).css('background-color', 'rgb(255, 0, 0)');
                        $(this).css('color', 'white');
                    }
                }
                if(role_stats[index].role == 'witch')
                {
                    $(this).html(roleStr+(index+1)+'<br>女巫');
                    if(role_stats[index].status == 0)
                    {
                        $(this).css('background-color', 'rgb(0, 128, 0)');
                        $(this).css('color', 'white');
                    }
                }
                if(role_stats[index].role == 'hunter')
                {
                    $(this).html(roleStr+(index+1)+'<br>獵人');
                    if(role_stats[index].status == 0)
                    {
                        $(this).css('background-color', 'rgb(0, 128, 0)');
                        $(this).css('color', 'white');
                    }
                }
                if(role_stats[index].role == 'seer')
                {
                    $(this).html(roleStr+(index+1)+'<br>預言家');
                    if(role_stats[index].status == 0)
                    {
                        $(this).css('background-color', 'rgb(0, 128, 0)');
                        $(this).css('color', 'white');
                    }
                }
                if(role_stats[index].role == 'savior')
                {
                    $(this).html(roleStr+(index+1)+'<br>守衛');
                    if(role_stats[index].status != 4 || role_stats[index].status != 8 || role_stats[index].status != 10 )
                    {
                        $(this).css('background-color', 'rgb(0, 128, 0)');
                        $(this).css('color', 'white');
                    }
                }
            }
            if(role_stats[index].status == 4 || role_stats[index].status == 5 || role_stats[index].status == 8)
            {
                $(this).html(roleStr+(index+1)+'<br>'+getRole(index+1)+'<br>(被獵殺)');
                $(this).css('background-color', 'purple');
                $(this).css('color', 'white');
            }
            if(role_stats[index].status == 10)
            {
                $(this).html(roleStr+(index+1)+'<br>'+getRole(index+1)+'<br>(出局)');
                $(this).css('background-color', 'orange');
                $(this).css('color', 'white');
            }
        });

    });


    $(document).on('hidden.bs.modal','.modal', function () {
        // 將所有方塊恢復預設值
        $(this).find('div .choose-id').css('background-color', '#DDD');
        $(this).find('div .choose-id').css('color', 'black');
    });

    // 按下玩家方塊所觸發的事件
    // $('.choose-id').on('click', function(){
    $('body').on('click', '.choose-id', function(){
        var hasSheriffModal = $('#sheriffModal').hasClass('show');
        var hasShootingModal = $('#shootingModal').hasClass('show');
        var hasTransferSheriffModal = $('#transferSheriffModal').hasClass('show');
        var hasElectOutModal = $('#electOutModal').hasClass('show');
        var targetModal = $('#commonModal').data('target');
        var user = $(this).data('user')-1;

        console.log('[DEBUG] targetModal = '+targetModal+' clicked.');

        // 標記守衛為哪位玩家所扮演
        if(targetModal == 'savior-select' && savior_count <= 0 && isNotChecked($(this)))
        {
            setCheckedColor($(this));
            console.log('標記玩家 '+(user+1)+' 為守衛');
            savior_count++;
            role_stats[user].role = 'savior';
            // 打開繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(targetModal == 'savior-select' && isChecked($(this)))
        {
            console.log('取消玩家 '+(user+1)+' 為守衛');
            role_stats[user].role = '';
            savior_count--;
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", true);
            setUncheckedColor($(this));
        }

        // 標記守衛要守護哪位玩家
        if(targetModal == 'savior-protect' && savior_count <= 0 && isNotChecked($(this)))
        {
            setCheckedColor($(this));
            console.log('標記玩家 '+(user+1)+' 被守衛守護');
            savior_count++;
            role_stats[user].status = 1;//守衛守護對象
            // 打開繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(targetModal == 'savior-protect' && isChecked($(this)))
        {
            console.log('取消玩家 '+(user+1)+' 被守衛守護');
            role_stats[user].status = 0;
            savior_count--;
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", true);
            console.log($("#modalContinueBtn").attr("disabled"));
            setUncheckedColor($(this));
        }

        // 標記場上的所有狼人玩家
        if(targetModal == 'werewolves-select' && werewolves_count < 4 && (isNotChecked($(this)) && isAlive($(this)) && !isGod($(this))))
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 為狼人');
            werewolves_count++;
            role_stats[user].role = 'werewolves';
            // console.log('指定玩家'+(user+1)+'為'+role_stats[user].role);
            if(werewolves_count == 4)
            {
                // 打開繼續鈕
                $("#modalContinueBtn").attr("disabled", false);
            }
            else
            {
                $("#modalContinueBtn").attr("disabled", true);
            }
        }
        else if(targetModal == 'werewolves-select' && (isChecked($(this)) && isWerewolf($(this))))
        {
            if(role_stats[user].status == 2)
            {
                $(this).css('background-color', 'rgb(0, 128, 0)');
                $(this).css('color', 'white');
            }
            else if(role_stats[user].status == 4)
            {
                $(this).css('background-color', 'purple');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
            // console.log('取消玩家 '+(user+1)+' 為狼人');
            werewolves_count--;
            role_stats[user].role = '';
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", true);
            // console.log('指定玩家'+(user+1)+'為'+role_stats[user].role);
        }

        // 選擇狼人刀了哪位玩家
        if(targetModal == 'werewolves-kill' && kill_count < 1)
        {
            // console.log($(this).css('background-color'));
            setCheckedColor($(this));
            console.log('指定玩家 '+(user+1)+' 被狼人獵殺');
            kill_count++;
            role_stats[user].status += 4;//被狼獵殺 status=4
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(targetModal == 'werewolves-kill' && isChecked($(this)) && isAlive($(this)))
        {
            // console.log($(this).css('background-color'));
            console.log('取消玩家 '+(user+1)+' 被狼人獵殺');
            kill_count--;
            role_stats[user].status -= 4;//被狼獵殺 status=4
            // 打開繼續鈕
            $("#modalContinueBtn").attr("disabled", true);
            setUncheckedColor($(this));
        }

        // 選擇預言家由哪位玩家扮演
        if(targetModal == 'seer-select'  && seer_count < 1 && isNotChecked($(this)) && isNoID($(this)))
        {
            setCheckedColor($(this));
            console.log('指定玩家 '+(user+1)+' 為預言家');
            seer_count++;
            role_stats[user].role = 'seer';
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(targetModal == 'seer-select' && isChecked($(this)))
        {
            role_stats[user].role = '';
            console.log('取消玩家 '+(user+1)+' 為預言家');
            seer_count--;
            setUncheckedColor($(this));
        }

        // 選擇女巫由哪位玩家扮演
        if(targetModal == 'witch-select'  && witch_count < 1 && isNotChecked($(this)) && isNoID($(this)))
        {
            setCheckedColor($(this));
            console.log('指定玩家 '+(user+1)+' 為女巫');
            witch_count++;
            role_stats[user].role = 'witch';
            // 關閉繼續鈕
            $("#modalContinueBtn").attr("disabled", false);
        }
        else if(targetModal == 'witch-select' && isChecked($(this)))
        {
            role_stats[user].role = '';
            console.log('取消玩家 '+(user+1)+' 為女巫');
            witch_count--;
            setUncheckedColor($(this));
        }

        // 選擇女巫毒害哪位玩家
        if(targetModal == 'witch-want-kill' && poison_count < 1)
        {
            setCheckedColor($(this));
            console.log('指定玩家 '+(user+1)+' 被女巫毒殺');
            poison_count++;
            role_stats[user].status += 4;//被女巫毒殺 status=4
        }
        else if(targetModal == 'witch-want-kill' && poison_count == 1 && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            console.log('取消玩家 '+(user+1)+' 被女巫毒殺');
            poison_count--;
            role_stats[user].status -= 4;//被女巫毒殺 status=2

            if(role_stats[user].status == 0 && role_stats[user].role == 'werewolves')
            {
                // $(this).css('background-color', 'red');
                // $(this).css('color', 'white');
                setUncheckedColor($(this));
            }
            else if(role_stats[user].status == 4)
            {
                $(this).css('background-color', 'purple');
                $(this).css('color', 'white');
            }
            else
            {
                // $(this).css('background-color', '#DDD');
                // $(this).css('color', 'black');
                setUncheckedColor($(this));
            }
        }
		
		if(targetModal == 'hunter-select' && hunter_count <= 0 && role_stats[user].role != 'werewolves'  && role_stats[user].role != 'witch' && role_stats[user].role != 'seer' && role_stats[user].role != 'savior')
		{
			setCheckedColor($(this));
			hunter_count++;
			role_stats[user].role = 'hunter';
		}
		else if(targetModal == 'hunter-select' && isChecked($(this)))
		{
            role_stats[user].role = '';
            hunter_count--;
            setUncheckedColor($(this));
		}
		
		if(targetModal == 'sheriff-select' && sheriff_count <= 0)
		{
			setCheckedColor($(this));
			sheriff_count++;
			role_stats[user].user = 'sheriff';
			alert(user);
			$("#modalContinueBtn").attr("disabled", false);
		}
		else if(targetModal == 'sheriff-select' && isChecked($(this)))
		{
            role_stats[user].user = user+1;
            sheriff_count--;
            setUncheckedColor($(this));
			$("#modalContinueBtn").attr("disabled", true);
		}	
/*
        // 標記獵人
        else if(targetModal == 'hunter-select' && hunter_count <= 0 && role_stats[user].role != 'werewolves'  && role_stats[user].role != 'witch' && role_stats[user].role != 'seer' && role_stats[user].role != 'savior')
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 為獵人');
            hunter_count++;
            role_stats[user].role = 'hunter';
            console.log('指定玩家'+(user+1)+'為'+role_stats[user].role);
        }
        else if(targetModal == 'hunter-select' && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            if(role_stats[user].status == 4 || role_stats[user].status == 8)
            {
                $(this).css('background-color', 'purple');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
            console.log('取消玩家 '+(user+1)+' 為獵人');
            hunter_count--;
            role_stats[user].role = '';
            console.log('指定玩家'+(user+1)+'為'+role_stats[user].role);
        }

        // 選擇獵人開槍帶走誰
        else if(hasShootingModal && skilled_count <= 0 && role_stats[user].role != 'hunter' && role_stats[user].status != 4 && role_stats[user].status != 8)
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 為被開槍的對象');
            skilled_count++;
            role_stats[user].status = 4;
        }
        else if(hasShootingModal && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            if(role_stats[user].role == 'werewolves')
            {
                $(this).css('background-color', 'red');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
            console.log('取消玩家 '+(user+1)+' 為被開槍的對象');
            role_stats[user].status = 0;
            skilled_count--;
        }

        // 選擇由哪位玩家當選警長
        else if(hasSheriffModal && sheriff_count <= 0)
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 為警長');
            sheriff_count++;
            role_stats[user].user = 'sheriff';
        }
        else if(hasSheriffModal && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            console.log('取消玩家 '+(user+1)+' 為警長');
            role_stats[user].user = user+1;
            sheriff_count--;
            if(role_stats[user].status == 4 || role_stats[user].status == 8)
            {
                $(this).css('background-color', 'purple');
                $(this).css('color', 'white');
            }
            else if(role_stats[user].role == 'werewolves')
            {
                $(this).css('background-color', 'red');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
        }
*/
        // 選擇警長要移交給誰
        else if(hasTransferSheriffModal && transfer_count <= 0 && role_stats[user].status != 4 && role_stats[user].status != 8)
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 為新警長');
            // 將原本的警長註記還原
            role_stats.forEach(function(data, index){
                if((data.status == 4 || data.status == 8) && data.user == 'sheriff')
                {
                    data.user = index+1;
                }
            }); 
            transfer_count++;
            role_stats[user].user = 'sheriff';
        }
        else if(hasTransferSheriffModal && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            if(role_stats[user].role == 'werewolves')
            {
                $(this).css('background-color', 'red');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
            console.log('取消玩家 '+(user+1)+' 為新警長');
            role_stats[user].user = user+1;
            transfer_count--;
        }

        // 選擇票出去的玩家
        else if(hasElectOutModal && electout_count <= 0 && role_stats[user].status != 4 && role_stats[user].status != 8)
        {
            $(this).css('background-color', '#333');
            $(this).css('color', 'white');
            console.log('指定玩家 '+(user+1)+' 出局');
            electout_count++;
            role_stats[user].status = 4;
        }
        else if(hasElectOutModal && ($(this).css('background-color') == 'rgb(51, 51, 51)'))
        {
            if(role_stats[user].role == 'werewolves')
            {
                $(this).css('background-color', 'red');
                $(this).css('color', 'white');
            }
            else
            {
                $(this).css('background-color', '#DDD');
                $(this).css('color', 'black');
            }
            console.log('取消玩家 '+(user+1)+' 出局');
            role_stats[user].status = 0;
            electout_count--;
        }
    });

    $('#btnTest').on('click', function(){
        console.log('-- TEST --');
        // console.log(role_stats);
        $('#commonModal').modal('show');
    });

    // start program here
    $("#btnStart").on("click", function() {
        console.log("btnStart onClick()");
        $("#btnStart").attr("disabled", true);
        $("#btnContinue").attr("disabled", true);
        $("#btnStop").attr("disabled", false);
        $('#mycontinue').val(1);

        func.load_config();
        // $('#myModal').modal('toggle');
        // func.startGame();
        func.thread();
    });

    $("#btnContinue").on("click", function() {
        // $('#mycontinue').val(1);
        func.setContinue();
        $('#commonModal').modal('hide');
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
        savior_count = 0;
        sheriff_count = 0;
        transfer_count = 0;
        electout_count = 0;
        hunter_count = 0;
        werewolves_count = 0;
        kill_count = 0;
        seer_count = 0;
        witch_count = 0;
        poison_count = 0;
        skilled_count = 0;
    });

    $(".config-bar").on("click", function() {
        $(".config").toggleClass("fold");
        $(".config").slideToggle();
        $(".config-bar img").attr("src", ($(".config").hasClass("fold"))?"i/icon-arrow-down.png":"i/icon-arrow-up.png");
    });

    function showVar()
    {
        console.log(savior_count);
        console.log(sheriff_count);
        console.log(transfer_count);
        console.log(electout_count);
        console.log(hunter_count);
        console.log(werewolves_count);
        console.log(kill_count);
        console.log(poison_count);
        console.log(skilled_count);
    }

    function isNotChecked($target)
    {
        // return ($target.css('background-color') == 'rgb(221, 221, 221)');
        return ($target.css('background-color') != 'rgb(51, 51, 51)');
    }

    function isChecked($target)
    {
        return ($target.css('background-color') == 'rgb(51, 51, 51)');
    }

    function isAlive($target)
    {
        var user = $target.data('user')-1;
        return role_stats[user].status != 4 || role_stats[user].status != 8 || role_stats[user].status != 10;
    }

    function isGod($target)
    {
        var user = $target.data('user')-1;
        return (role_stats[user].role == 'savior' || role_stats[user].role == 'hunter' || role_stats[user].role == 'seer' || role_stats[user].role == 'witch');
        // console.log($target.css('background-color'));
        // return ($target.css('background-color') == 'rgb(0, 128, 0)');
    }

    function isNoID($target)
    {
        var user = $target.data('user')-1;
        return role_stats[user].role == '';
    }

    function isWerewolf($target)
    {
        var user = $target.data('user')-1;
        return role_stats[user].role == 'werewolves';
        // console.log($target.css('background-color'));
        // return ($target.css('background-color') == 'red');
    }

    function setCheckedColor($target)
    {
        $target.css('background-color', '#333');
        $target.css('color', 'white');
    }

    function setUncheckedColor($target)
    {
        var user = $target.data('user')-1;

        if(role_stats[user].role == 'savior')
        {
            $target.css('background-color', 'rgb(0, 128, 0)');
            $target.css('color', 'white'); 
            console.log($target.css('background-color'));
        }
        else if(role_stats[user].role == 'werewolves')
        {
            $target.css('background-color', 'rgb(255, 0, 0)');
            $target.css('color', 'white'); 
            console.log($target.css('background-color'));
        }
        else
        {
            $target.css('background-color', '#DDD');
            $target.css('color', 'black');
        }

        // 被獵殺的玩家
        if(role_stats[user].status == 4 || role_stats[user].status == 5 || role_stats[user].status == 8)
        {
            $target.css('background-color', 'purple');
            $target.css('color', 'white');
        }
    }

    function getRole($target)
    {
        var role = role_stats[$target-1].role;
        console.log('role = '+role);
        console.log('user = '+$target-1);
        switch(role)
        {
            case 'savior':
                return '守衛';
            case 'werewolves':
                return '狼人';
            case 'seer':
                return '預言家';
            case 'witch':
                return '女巫';
            default:
                return '';
        }
    }
});
