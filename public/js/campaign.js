var host = 'http://115.29.166.167/api';
var clock;
var now_in_page;
//var common_token = "60:705670b5b6199e1d2c216dfb104a22e8";
var common_token = "491:996aae52d4b60b4d278d2e9246a0c941";
$(document).ready(function(){
  var tbody = $('#ranking-list').children('tbody');
  //alert(document.body.clientWidth)
  var width=document.body.clientWidth;
  if(width < 320){
	$(".flip-clock-wrapper ul ").css("margin","1% 0 1% 0");
	
	}else if(width <340 ){
		
	}else if(width <380 ){
		$(".counter").css("padding-left","3%");
	}else if(width <400){
		$(".counter").css("padding-left","6%");
	}
	else  if(width <440){
		$(".counter").css("padding-left","8%");
	}else{
		$(".counter").css("padding-left","10%");
	}
	
	console.log(document.body.clientWidth);
 now_in_page =0;
  var currentDate = new Date();
	
				// Set some date in the future. In this case, it's always Jan 1
	var futureDate  = new Date(2014, 8, 04);

	// Calculate the difference in seconds between the future and current date
	var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	// Instantiate a coutdown FlipClock
	clock = $('.counter').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	});
	
	

  $('#getInvolved').submit(function(e){
    e.preventDefault();
    var btn = $('#submit');
    var msg = $('#submission-message');
    var authData = {
      username: $('input[name="id"]').val(),
      password: $('input[name="password"]').val()
    };
    var rewardData = {
      phone: $('input[name="phone"]').val(),
      usrID: $('input[name="id"]').val(),
      name: $('input[name="name"]').val()
    };

    btn.text('努力提交中。。');
    $.ajax({//login
			url: host + '/auth.action',
			type: 'POST',
			data: authData,
		})
		.done(function(data) {
			console.log("success");
			if(data.errno===0){//login success
				rewardData.token = data.result;

			  $.ajax({//coupon
          url: host + '/SetReward.action',
          type: 'POST',
          data: rewardData,
        })
        .done(function(data) {
          console.log("success");
          switch (data.result) {
          case 1:
            alert('提交成功');
           // btn.attr('disabled','disabled');
           // msg.addClass('hidden');
            $('.step2').addClass('hidden');
            $('.step1').removeClass('hidden');
            break;
          case -1:
            msg.removeClass('hidden');
            msg.children('strong').text('用户名密码错误');
            //btn.attr('disabled','disabled');
            //btn.text('提交失败，请刷新重新提交');
			  btn.text('提交');
            break;
          case -2:
            msg.removeClass('hidden');
            msg.children('strong').text('您已经参加过抽奖');
           // btn.attr('disabled','disabled');
            //btn.text('提交失败，请刷新重新提交');
			  btn.text('提交');
            break;
          default:
          }
        })
        .fail(function() {
          console.log("set reward error");
          msg.removeClass('hidden');
          msg.children('strong').text('用户名密码错误');
          //btn.attr('disabled','disabled');
         // btn.text('提交失败，请刷新重新提交');
		   btn.text('提交');
        });
        getRankingList(tbody, rewardData.token);

			}
      else{//login fail
        msg.removeClass('hidden');
        msg.children('strong').text('用户名或密码错误');
        //btn.attr('disabled','disabled');
        btn.text('提交');
      }
		})
		.fail(function() {
			console.log("auth error");
			msg.removeClass('hidden');
      msg.children('strong').text('登录失败');
      //btn.attr('disabled','disabled');
      //btn.text('提交失败，请刷新重新提交');
	    btn.text('提交');
		});
  });
  getRankingList(tbody);
});

var getRankingList = function(tbody){

	
  $.ajax({
    url: host + '/GetReward.action',
    data: {
      token: common_token
    },
    type: 'POST'
  })
  .done(function(data) {
    console.log('get ranking list done');
    console.log(data);
    if(data.errno ===0 && data.result!=null){
      var row;
      //tbody.html('');
	  var temp = (now_in_page*7+7 < data.result.length ? now_in_page*7+7 : data.result.length);
	  console.log(temp);
	  for(var i=now_in_page*7; i<temp; i++){
			// console.log();
			
			row = '';
			row += '<tr><td>' + data.result[i].username + '</td>';
			//row += '<td>' + data.result[i].realname_show.substring(0,6) + '</td>';
      row += '<td>' + data.result[i].realname + '</td>';
			row += '<td>' + data.result[i].numOfMission + '</td>';
			row += '<td>' + data.result[i].numOfSuggestion + '</td></tr>';

			tbody.append(row);
	  }
		now_in_page++;
		if(now_in_page*7>data.result.length){
			$(".checkmore").addClass("hidden");
		}
		
    }
    else {

    }
  })
  .fail(function(data){

  });
};

function check_more(){
	var tbody = $('#ranking-list').children('tbody');
	getRankingList(tbody);
}
function change_to_coupon(){
	 $('.step1').addClass('hidden');
     $('.step2').removeClass('hidden');
}