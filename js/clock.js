$(document).ready(function() {
  let clock;

  // Grab the current date
  let currentDate = new Date();

  // Target future date/24 hour time/Timezone
  let targetDate = moment.tz("2025-03-09 12:00", "Asia/Kolkata");

  // Calculate the difference in seconds between the future and current date
  let diff = targetDate / 1000 - currentDate.getTime() / 1000;

  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: false
    });
    console.log("Date has already passed!")
    
  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      countdown: true,
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });
    
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  };


  // alert_markup
function alert_markup(alert_type, msg) {
  return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
};

 $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));

        $.post('https://script.google.com/macros/s/AKfycbyGx48NddqaHNTmsOuQesULH56c5UL4v--NDXqux8gNE9bZPSG9YO-IenqjMbQ0ClJIIg/exec', data)
            .done(function (data) {
                console.log(data);
                if (data.result === "error") {
                    $('#alert-wrapper').html(alert_markup('danger', data.message));
                } else {
                    $('#alert-wrapper').html(alert_markup('info','<strong>Thank You for Your RSVP!</strong><br><br>We’re so excited to have you join us on our special day! <br><br>More details will be posted on our website as the big day approaches. If you need to update your RSVP, please submit it again through the same link. For any questions, feel free to reach out to us at <a href="mailto:adam.min.wedding@gmail.com">adam.min.wedding@gmail.com</a>.<br><br>We can’t wait to celebrate with you on <b>9th March 2025!</b><br><br>Warm wishes,<br>Min & Adam'));
                    $('#rsvp-modal').modal('show');
                    // Clear the form inputs
                    $("#rsvp-form")[0].reset();
                }
            })
            .fail(function (data) {
                console.log(data);
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
            });
    });
    
      // Event listener for the "Save our date" button
  $('#save-date-btn').on('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Create the calendar event
    var myCalendar = createCalendar({
      options: {
        class: '', // Add additional classes if needed
        id: '',    // Unique ID, if required
      },
      data: {
        // Event title
        title: "Ram and Antara's Wedding",

        // Event start date
        start: new Date('2025-03-09T10:00:00'), // Adjust date and time as needed

        // Event end date
        end: new Date('2025-03-09T23:00:00'), // Adjust as needed

        // Event Address
        address: 'ITC Fortune Park Hotel, Kolkata',

        // Event Description
        description: "We can't wait to see you on our big day. For any queries or issues, please contact Mr. Amit Roy at +91 9876543210.",
      },
    });

    // Append the calendar to the designated area
    $('#add-to-cal').html(myCalendar);

    // Optionally show a message to the user
    alert('The event has been added to your calendar!');
  });

});

