$(document).ready(function($){
  var customers = '';
  $.ajax({
    type: 'POST',
    url: '/api/getCustomers',
    data: {
      pos: parseInt($('.pager').attr('pos'))
    }
  })
  .done(function(data){
    console.log(data);
    var date;

    $.each(data, function(key, value){
      date = new Date(this.time)
      customers += '<tr>';
      customers += '<td>' + this.name + '</td>';
      customers += '<td>' + this.phone + '</td>';
      customers += '<td>' + this.city + '</td>';
      customers += '<td>' + date.toString() + '</td>';
      // customers += '<td><a href="#" class="delete-customer" rel="' + this._id + '">delete</a></td>';
      customers += '</tr>';
    });
    $('#customers-list > tbody').html(customers);
    $('.loading').addClass('hidden');
  })
  .fail(function(){
    console.log('fail');
  });

  $('#customers-list > tbody').on('click', 'td a.delete-customer', deleteCustomer);

  $('#newer').click(function(e){
    var pos = parseInt($('.pager').attr('pos'))
    $('.loading').removeClass('hidden');

    $.ajax({
      type: 'POST',
      url: '/api/getCustomers',
      data: {
        pos: pos-10
      }
    })
    .done(function(data){
      console.log(data);
      var date;
      var customers='';
      if (data.length > 0) {
        $.each(data, function(key, value){
          date = new Date(this.time)
          customers += '<tr>';
          customers += '<td>' + this.name + '</td>';
          customers += '<td>' + this.phone + '</td>';
          customers += '<td>' + this.city + '</td>';
          customers += '<td>' + date.toString() + '</td>';
          // customers += '<td><a href="#" class="delete-customer" rel="' + this._id + '">delete</a></td>';
          customers += '</tr>';
          $('#customers-list > tbody').html(customers);

        });

        if ($('.pager').attr('pos')>=10){
          $('.pager').attr('pos', parseInt($('.pager').attr('pos')) -10);

        }
        else {
          $('.pager').attr('pos', 0)
        }
      }
      $('#older').removeClass('disabled');

      $('.loading').addClass('hidden');
    })
    .fail(function(){
      console.log('fail');
    });
  });
  $('#older').click(function(e){
    var pos = parseInt($('.pager').attr('pos'))
    $('.loading').removeClass('hidden');

    $.ajax({
      type: 'POST',
      url: '/api/getCustomers',
      data: {
        pos: pos+10
      }
    })
    .done(function(data){
      console.log(data);
      var date;
      var customers='';
      if (data.length > 0) {
        $.each(data, function(key, value){
          date = new Date(this.time)
          customers += '<tr>';
          customers += '<td>' + this.name + '</td>';
          customers += '<td>' + this.phone + '</td>';
          customers += '<td>' + this.city + '</td>';
          customers += '<td>' + date.toString() + '</td>';
          // customers += '<td><a href="#" class="delete-customer" rel="' + this._id + '">delete</a></td>';
          customers += '</tr>';
        });

        $('.pager').attr('pos', parseInt($('.pager').attr('pos')) +10);
        $('#customers-list > tbody').html(customers);

      }
      else{
        $('#older').addClass('disabled');
      }
      $('.loading').addClass('hidden');
    })
    .fail(function(){
      console.log('fail');
    });
  });

});

function deleteCustomer(e) {
  e.preventDefault();
  var confirmation = confirm('确定删除这个客户吗?');

  if (confirmation === true) {
    $.ajax({
      type: 'POST',
      url: '/api/deleteCustomer',
      data: {
        id: $(this).attr('rel')
      }
    }).done(function(res) {
      if(res.success) {
        var customers = '';
        $.ajax({
          type: 'POST',
          url: '/api/getCustomers'
        })
        .done(function(data){
          console.log(data);

          $.each(data, function(key, value){
            customers += '<tr>';
            customers += '<td>' + this.name + '</td>';
            customers += '<td>' + this.phone + '</td>';
            customers += '<td>' + this.city + '</td>';
            customers += '<td><a href="#" class="delete-customer" rel="' + this._id + '">delete</a></td>';
            customers += '</tr>';
          });
          $('#customers-list > tbody').html(customers);

        });
      }
    });
  }
}
