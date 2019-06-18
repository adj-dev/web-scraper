$(function () {
  // Add an event listener for the `scraper` button
  $(document).on('click', '#scraper', function () {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    })
      .then(function (req, res) {
        console.log(res);
        window.location.reload(true);
      });
  });



  // Add an event listener for the `clear` button
  $(document).on('click', '#toggleDisplay', function () {
    // Capture the `data-state` attribute from the target element
    let state = $(this).attr('data-state');

    // If `state` === 'shown' hide the container div, otherwise show the container div
    if (state === 'shown') {
      $('.container').hide();

      // Toggle the appearance and attribute values of the button
      $(this).text('Show');
      $(this).attr('data-state', 'hidden');
    } else if (state === 'hidden') {
      $('.container').show();

      // Toggle the appearance and attribute values of the button
      $(this).text('Hide');
      $(this).attr('data-state', 'shown');
    }
  });



  // Add an event listener for the `save` button
  $(document).on('click', '#toggleSave', function () {
    // Capture the `data-state` and `data-id` attributes from the target element
    let state = $(this).attr('data-state');
    let id = $(this).attr('data-id');

    // Make a call to the server for updating the document
    $.ajax({
      method: 'PUT',
      url: `/toggleSaved/${id}`
    }).done(function (msg) {
      console.log(msg);
    });

    if (state === 'unsaved') {
      // Toggle the appearance and attribute values of the button
      $(this).text('unsave');
      $(this).attr('data-state', 'saved');
    } else if (state === 'saved') {

      // Toggle the appearance and attribute values of the button
      $(this).text('save');
      $(this).attr('data-state', 'unsaved');
    }
  });
});