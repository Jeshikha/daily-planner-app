$(document).ready(function () {
    // Getting the current date using Day.js
    var currentDate = dayjs().format('dddd, MMMM D');

    // display the current date in the header
    $('#currentDay').text(currentDate);

    // Get the current time using Day.js
    function updateTime() {
        var currentTime = dayjs().format('HH:mm:ss');

        // Display the current time in the HTML element
        $('#currentTime').text(currentTime);
    }

    // Updating the time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);

    // updating the colours of my time blocks based on the current time
    function updateTimeBlocks() {
        var currentTime = dayjs().format('H'); // using 24-hr format from dayjs

        $('.time-block').each(function () {
            var blockTime = parseInt($(this).attr('id').split('-')[1]);// working the hour associated with the time block.

            // the hour associated with the time block - blockTime
            // the current hour - currentTime
            // adding and removing classes to change the colours of the time block
            // if blockTime is less than currentTime, it adds the class past and removes present and future. 
            // If they are equal, it adds present and removes past and future. 
            // Otherwise, it adds future and removes past and present
            if (blockTime < currentTime) {
                $(this).addClass('past').removeClass('present future');
            } else if (blockTime == currentTime) {
                $(this).addClass('present').removeClass('past future');
            } else {
                $(this).addClass('future').removeClass('past present');
            }
        });
    }

    // Load saved appointments from local storage
    // loading saved appointments from local storage and populating the textareas within the time blocks
    function loadAppointments() {
        $('.time-block').each(function () {
            // retrieving the id attribute for each time block e.g hour-9 and assigns it to the blockID variable
            var blockID = $(this).attr('id');
            // retrieving the stored appointment from local storage
            var appointment = localStorage.getItem(blockID);
            // If there is a stored appointment for the current time block 
            // textarea will be filled within that time block with the saved appointment
            if (appointment) {
                $(this).find('.description').val(appointment);
            }
        });
    }

    // Initialising the scheduler
    updateTimeBlocks();
    loadAppointments();

    //  Functioning save button clicks
    $('.saveBtn').on('click', function () {
        // retrieving the hour of the clicked save button, which corresponds to the time block 
        var blockID = $(this).parent().attr('id');
        // getting the value of the textarea element with the class description that is a sibling of the clicked save button
        var appointment = $(this).siblings('.description').val();
        // If there is an appointment it will save it to local storage and show a notification
        if (appointment) {
            localStorage.setItem(blockID, appointment);
            // making a notification message visible on the page when new appointment
            $('#notify').addClass('show');
            setTimeout(function () {
                $('#notify').removeClass('show');
            }, 15000);
        }
    });
});






