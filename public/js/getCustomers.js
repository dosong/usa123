$(document).ready(function($){
  var customers = '';
  $.ajax({
    type: 'GET',
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
    $('.loading').addClass('hidden');
  })
  .fail(function(){
    console.log('fail');
  });

  $('#customers-list > tbody').on('click', 'td a.delete-customer', deleteCustomer);




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
          type: 'GET',
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
