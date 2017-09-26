var Day = 0;
var TimeRole = 1;
var TimeSkill = 1;

var Continue = 0;

var hasSeer = 0;
var hasHunter = 0;
var hasWitch = 0;
var hasSavior = 0;
var hasWerewolf = 0;
var hasAncient = 0;
var hasThief = 0;
var hasIdiot = 0;
var hasBearleader = 0;
var condition = 0;

function init_page()
{	
    for (var i=1; i<=20; i++) {
		$("#sel_tSkill").append(new Option("技能思考時間："+i+"秒", i));
		$("#sel_tRole").append(new Option("角色結束延遲："+i+"秒", i));
	}
	for (var i=0; i<=16; i++) {
		$("#sel_day").append(new Option("第"+i+1+"天開始播放", i));
	}

    $("#btnContinue").attr("disabled", true);
    $("#btnStop").attr("disabled", true);

console.log("screen.height="+screen.height);
console.log("screen.width="+screen.width);
console.log("window height="+$(window).height());
console.log("document height="+$(document).height());

}

function regist_event()
{
	$(".config-bar").bind("click", function() {
		$(".config").toggleClass("fold");
		$(".config").slideToggle();
		$(".config-bar img").attr("src", ($(".config").hasClass("fold"))?"i/icon-arrow-down.png":"i/icon-arrow-up.png");

	});

    $("#btnTest").bind("click", function() {
        condition = 1;
    });

	$("#btnStart").bind("click", function() {
console.log("btnStart onClick()");
        $("#btnStart").attr("disabled", true);
        $("#btnContinue").attr("disabled", false);
        $("#btnStop").attr("disabled", false);

        load_config();
        start_game();
	});

	$("#btnContinue").bind("click", function() {
console.log("btnContinue onClick()");
        Continue = 1;
	});

	$("#btnStop").bind("click", function() {
console.log("btnStop onClick()");
        condition = 0;
        $("#btnStart").attr("disabled", false);
        $("#btnContinue").attr("disabled", true);
        $("#btnStop").attr("disabled", true);
	});

}

function load_config()
{
    Day = (0==$("#sel_day").val())?1:$("#sel_day").val();
    TimeRole = 1000*$("#sel_tRole").val();
    TimeSkill = 1000*$("#sel_tSkill").val();
console.log("Day="+Day);
    hasSeer = $("#seer").is(":checked");
    hasHunter = $("#hunter").is(":checked");
    hasWitch = $("#witch").is(":checked");
    hasSavior = $("#savior").is(":checked");
    hasWerewolf = $("#werewolf").is(":checked");
    hasAncient = $("#ancient").is(":checked");
    hasThief = $("#thief").is(":checked");
    hasIdiot = $("#idiot").is(":checked");
    hasBearleader = $("#bearleader").is(":checked");
}

function start_game()
{
    var isNight = 1;

    while ( Day <= 16 )
    {
        if ( isNight )
        {
            $("#rundown textarea").append("第"+Day+"個夜晚");
            $("#vTodayIs")[0].play();
            $("#vNum"+Day)[0].play();
			// $("#vThNight")[0].play();
			// $("#vNightfallCloseEyes")[0].play();

            // sleep(TimeRole);
            wait(5000, echosomething("a wait callback function executed."));
            if ( hasThief && (1==Day) )
            {
                console.log('after delay hasThief');
				$("#vThiefOpen")[0].play();
                sleep(TimeSkill);
				$("#vThiefSkill")[0].play();
				waitAction("盜賊決定後，按任意鍵繼續…");
				$("#vThiefClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasSavior )
            {
                console.log('after delay hasSavior');
				$("#vSaviorOpen")[0].play();
                sleep(TimeSkill);
				$("#vSaviorSkill")[0].play();
                sleep(TimeSkill);
				$("#vSaviorClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasWerewolf )
            {
                console.log('after delay hasWerewolf');
				$("#vWerewolvesOpen")[0].play();
                sleep(TimeSkill);
				$("#vWerewolvesSkill")[0].play();
                waitAction("狼人決定後，按任意鍵繼續…");
				$("#vWerewolvesClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasSeer )
            {
                console.log('after delay hasSeer');
				$("#vSeerOpen")[0].play();
                sleep(TimeSkill);
				$("#vSeerSkill1")[0].play();
                sleep(TimeSkill);
				$("#vSeerSkill2")[0].play();
                sleep(TimeSkill);
				$("#vSeerClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasWitch )
            {
                console.log('after delay hasWitch');
				$("#vWitchOpen")[0].play();
                sleep(TimeSkill);
				$("#vPlayerKilled")[0].play();
                sleep(TimeSkill);
				$("#vWitchSkill1")[0].play();
                sleep(TimeSkill);
				$("#vWitchSkill2")[0].play();
                sleep(TimeSkill);
				$("#vWitchClose")[0].play();
                sleep(TimeRole);

            }
            if ( hasAncient && (1==Day) )
            {
                console.log('after delay hasAncient');
				$("#vAncientOpen")[0].play();
                sleep(TimeSkill);
				$("#vAncientClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasHunter && (1==Day) )
            {
                console.log('after delay hasHunter');
				$("#vHunterOpen")[0].play();
                sleep(TimeSkill);
				$("#vHunterClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasIdiot && (1==Day) )
            {
                console.log('after delay hasIdiot');
				$("#vIdiotOpen")[0].play();
                sleep(TimeSkill);
				$("#vIdiotClose")[0].play();
                sleep(TimeRole);
            }
            if ( hasBearLeader && (1==Day) )
            {
                console.log('after delay hasBearLeader');
				$("#vBearLeaderOpen")[0].play();
                sleep(TimeSkill);
				$("#vBearLeaderClose")[0].play();
                sleep(TimeRole);
            }
        }
        else
        {
			$("#rundown textarea").append("第"+Day+"個白天");
            $("#vTodayIs")[0].play();
            $("#vNum"+Day)[0].play();
			$("#vThDay"+Day)[0].play();
			$("#vDaybreakOpenEyes")[0].play();
            sleep(TimeSkill);
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
                sleep(TimeRole);
            }

            if ( config[eBearLeader] )
            {
				$("#vBearLeaderSkill")[0].play();
                sleep(TimeRole);
            }

			$("#vDiscussion")[0].play();
            waitAction("村民投票放逐，被放逐者遺言發表完畢後，按任意鍵繼續…");
        }
        if ( !isNight && condition)
            ++Day;
        if(condition)
        {
            isNight += (isNight)?(-1):(1);
            console.log('isNight='+isNight);
        }
    }

}

function waitAction(hint)
{
    $("#rundown textarea").append(hint);
    while ( !Continue )
	{
        console.log('hello');
		// do nothing, waiting for user click continue button
	}
}

function sleep(msec)
{
console.log("+sleep()");
console.log("typeof msec="+typeof msec);
    setTimeout(function(){
        // do nothing
    }, msec);
console.log("-sleep()");
}

var delay = function() {
    if(condition)
    {
        console.log('go next');
    }
    else
    {
        setTimeout(delay, 1000);
    }
    // console.log('i am waiting.');
}

// function wait(ms, cb) {
//   var waitDateOne = new Date();
//   while ((new Date()) - waitDateOne <= ms) {
//     //Nothing
//   }
//   if (cb) {
//     eval(cb);
//   }
// }

// function echosomething(msg)
// {
//     console.log(msg);
// }
