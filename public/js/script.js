// Client Side Ajax Script
$(document).ready(function ($) {

  $('#cancelSaveUserDetails').on('click', (function(e){
    e.preventDefault()
    alert('here liao')
    document.location.href = '/profile'
  }))

  $('#saveUserDetails').click(function(e) {
      e.preventDefault();
      alert('am here at edit ajax')
      var formdata = $('.editUserDetails').serializeArray()

      console.log(formdata);
      $.ajax({
        method: 'put',
        url: '/recruiterProfile',
        data: formdata
      }).done(function(data) {
        window.location = '/profile'
      });
  })



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

          // ITEM APPENDED TO EXPIRED JOB LIST
          var newExpiredJob = document.createElement('tr')

          // notice that element for job.description and expired was not created.
          var newExpiredJobTitle = document.createElement('td')
          var newExpiredJobpostDate = document.createElement('td')
          var newExpiredJobFilled = document.createElement('td')
          var newExpiredJobViewApplicants = document.createElement('td')
          var link = document.createElement('a')
          link.href= data._id + "/applicants"
          link.textContent="See Past Applicants"
          newExpiredJobViewApplicants.appendChild(link)
          newExpiredJobTitle.innerText = data.title
          newExpiredJobpostDate.innerText = data.postDate
          newExpiredJobFilled.innerText = "true"
          newExpiredJob.appendChild(newExpiredJobTitle)
          newExpiredJob.appendChild(newExpiredJobpostDate)
          newExpiredJob.appendChild(newExpiredJobFilled)
          newExpiredJob.appendChild(newExpiredJobViewApplicants)

          console.log(newExpiredJob)
          var ExpiredJobList = document.querySelectorAll('tbody')[1]
          ExpiredJobList.appendChild(newExpiredJob)
          console.log(ExpiredJobList)

          // ITEM REMOVED FROM UNEXPIRED joblist
          var CurrentJoblist = document.querySelectorAll('tbody')[0]
          var wantedElementID = ("." + data._id)
          $(wantedElementID).remove()

        }
    });
  })
)})
