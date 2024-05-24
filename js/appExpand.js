// Append the menu once on DOM ready and hide it initially
$(document).ready(function() {
    $('.app-expand').hide();  // Hide the menu initially
});

// Toggle the visibility on click
$(document).on('click', '#apps-icon', function() {
    $('.app-expand').toggle();  // Toggle the visibility of the expand menu
});
