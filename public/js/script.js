// Client Side Ajax Script
$(document).ready(function ($) {
  $('.filters').on('submit', function(e){
    e.preventDefault()
    alert('Button filters submitted')
    var formdata = $(this).serializeArray()
    var experience = $('#experience').val()
    var education = $('#education').val()
    var age = $('#age').val()
    var expectedPay = $('#expectedPay').val()
    var skills = $('#skills').val()
    var mata = $(this).data("job-id")
    console.log(mata)
    console.log(experience)
    console.log(education)
    console.log(age)
    console.log(expectedPay)
    console.log(skills)
    // var parameters = {experience: experience}
    $.ajax({
      type: 'PUT',
      data: formdata,
      url: "/api/applicants/" + mata + "/searching",
    }).done(doSomething)

    function doSomething (data) {
    alert('form submitted, update list of applicants')
    console.log(data)
    // eg. data (based on joblist.applicants) is an array now.
    // eg. data[0].name = mary
    data.forEach(function(applicant){
      $('#results').append('<li>' + applicant.name  +'</li>')
    })
  }
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

          // notice that element for job.description was not created.
          var newExpiredJobTitle = document.createElement('td')
          var newExpiredJobExpired = document.createElement('td')
          var newExpiredJobpostDate = document.createElement('td')
          var newExpiredJobFilled = document.createElement('td')
          newExpiredJobTitle.innerText = data.title
          newExpiredJobExpired.innerText = 'true'
          newExpiredJobpostDate.innerText = data.postDate
          newExpiredJobFilled.innerText = data.filled
          newExpiredJob.appendChild(newExpiredJobTitle)
          newExpiredJob.appendChild(newExpiredJobExpired)
          newExpiredJob.appendChild(newExpiredJobpostDate)
          newExpiredJob.appendChild(newExpiredJobFilled)

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
