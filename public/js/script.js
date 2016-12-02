$('#closejob').click(function(e) {
  console.log('at script')
  e.preventDefault();
  var jobid = $('').
  // var jobid = document.getElementById('closejob').title

  console.log(jobid);
  $.ajax({
    method: 'post',
    url: '/transactions/add',
    data: jobid
  }).done(function(data) {

    // window.location = '/profile'
})
})
