$(document).ready(function () {
    // Get the current date using Day.js
    var currentDate = dayjs().format('dddd, MMMM D');

    // Display the current date in the header
    $('#currentDay').text(currentDate);

    // Function to update time block styles
    function updateTimeBlocks() {
        var currentTime = dayjs().format('H');

        $('.time-block').each(function () {
            var blockTime = parseInt($(this).attr('id').split('-')[1]);

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
    function loadTasks() {
        $('.time-block').each(function () {
            var blockID = $(this).attr('id');
            var appointment = localStorage.getItem(blockID);

            if (appointment) {
                $(this).find('.description').val(appointment);
            }
        });
    }

    // Initialize the scheduler
    updateTimeBlocks();
    loadTasks();

    // Handle save button clicks
    $('.saveBtn').on('click', function () {
        var blockID = $(this).parent().attr('id');
        var appointment = $(this).siblings('.description').val();

        if (appointment) {
            localStorage.setItem(blockID, appointment);
            $('#notify').addClass('show');
            setTimeout(function () {
                $('#notify').removeClass('show');
            }, 3000);
        }
    });
});






