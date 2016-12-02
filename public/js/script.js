// Client Side Ajax Script
$(document).ready(function ($) {
  $('.closed').on('click', (function(e){
    e.preventDefault()
    alert('Button closed clicked')
    console.log($(this).data("job-id"));
    var data = $(this).data("job-id");
    $.ajax({
                type: 'PUT',
                data: data,
        url: "/api/joblists/" + data + "/edit",
        success: function(data) {
          console.log(data)
          var newExpiredJob = document.createElement('tr')
          var newExpiredJobTitle = document.createElement('td')
          var newExpiredJobDescription = document.createElement('td')
          newExpiredJobTitle.innerText = data.title
          // var newExpiredJobDescription = document.createElement('td')
          // newExpiredJobDescription = data.description
          // newExpiredJobDetail.expired = data.expired
          // newExpiredJobDetail.postDate = data.postDate
          // newExpiredJobDetail.filled = data.filled
          newExpiredJob.appendChild(newExpiredJobTitle)
          newExpiredJob.appendChild(newExpiredJobDescription)
          // newExpiredJob.appendChild(newExpiredJobDescription)
          console.log(newExpiredJob)
          var ExpiredJobList = document.querySelectorAll('tbody')[1]
          ExpiredJobList.appendChild(newExpiredJob)
          console.log(ExpiredJobList)
          // console.log('success');
          // console.log(JSON.stringify(data));
        }
    });
  })
)})
