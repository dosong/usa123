$(document).ready(function($){
	$('.flexslider').flexslider({
		animation: "slide",
		slideshowSpeed: 5000
	});
	$('#joining-form').submit(function(e){
		e.preventDefault();
		var newCustomer = {
			name: $('#name').val(),
			phone: $('#phone').val(),
			city: $('#city').val()
		};
		var btn = $('#submit-button');
		var nameInput = $('#name');
		var phoneInput = $('#phone');
		var cityInput = $('#city');
		btn.text('提交中。。')
		$('.loading').removeClass('hidden');
		btn.attr('disabled','');
		nameInput.attr('disabled','');
		phoneInput.attr('disabled','');
		cityInput.attr('disabled','');
		// console.log(newCustomer);
		$.ajax({
			url: '/api/addCustomer',
			type: 'POST',
			data: newCustomer
		})
		.done(function(data) {
			if (data.success) {
				// console.log("success");
				btn.text('提交成功');
				setTimeout(function(){
					btn.text('重新提交');
					btn.removeAttr('disabled');
					nameInput.removeAttr('disabled');
					phoneInput.removeAttr('disabled');
					cityInput.removeAttr('disabled');
				},1800)

			}
			else {
				btn.removeAttr('disabled');
				nameInput.removeAttr('disabled');
				phoneInput.removeAttr('disabled');
				cityInput.removeAttr('disabled');
			}

		})
		.fail(function() {
			// console.log("error");
			btn.removeAttr('disabled');

		})
		.always(function() {
			$('.loading').addClass('hidden');
			nameInput.val('');
			phoneInput.val('');
			cityInput.val('');
		});
	});
});
