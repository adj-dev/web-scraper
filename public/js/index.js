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

      // if on the '/saved' route refresh the page
      if (window.location.pathname === '/saved') {
        window.location.reload(true);
      };
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



  // Add an event listener for the `toggleNote` button
  $(document).on('click', '#toggleNote', function () {
    let state = $(this).attr('data-state');
    let divId = $(this).attr('data-id');

    if (state === 'hidden') {
      // Show the `add/edit comment div`
      $(`#${divId}`).show();
      // Change the `data-state` value
      $(this).attr('data-state', 'shown');
      $(this).text('Cancel');
    } else if (state === 'shown') {
      // Hide the `add/edit comment div`
      $(`#${divId}`).hide();
      // Change the `data-state` value
      $(this).attr('data-state', 'hidden');
      $(this).text('Add Note');
    }
  });



  // Add an event listener for the `addNote` button (also used for updating notes)
  $(document).on('click', '#addNote', function () {
    // Capture name and content from inputs
    let name = $('#noteName').val().trim();
    let content = $('#noteContent').val().trim();
    // Capture id of Article
    let id = $(this).attr('data-id');

    let commentId = $(this).parent().next().attr('id');

    let body = { name, content };

    if ($(this).text() === 'Add') {
      // Make a call to the db to create a note
      $.ajax({
        method: 'POST',
        url: `/note/${id}`,
        data: body
      }).done(function (msg) {
        // Reload the window so new note will render
        window.location.reload(true);
      });
    } else {
      // Make an update call to the db
      $.ajax({
        method: 'PUT',
        url: `/note/${commentId}`,
        data: body
      }).done(function () {
        // Reload the window so new note will render
        window.location.reload(true);
      });

      // change the button text back to normal
      $('#addNote').text('Add');
    }
  });



  // Add an event listener for the `edit notes` button
  $(document).on('click', '#editNote', function () {
    // Hide the comment div and show the add/edit div
    let id = $(this).attr('data-id');
    // `divId` is the id of the edit comment div
    let divId = $(`#${id}`).attr('data-ref')
    // Change the text of the `add` button
    $('#addNote').text('Update');
    // Hide the comment div
    $(`#${id}`).hide();
    // Show the add/edit div
    $(`#${divId}`).show();
    // Populate the inputs with the current note data
    let content = $(`#${id}`).children('p').text();
    let name = $(`#${id}`).children('span').text();

    $('#noteName').val(name);
    $('#noteContent').val(content);
  });


  // Add an event listener for the `delete note` button
  $(document).on('click', '#deleteNote', function () {
    // Get the comment id out of the target element
    let id = $(this).attr('data-id');
    // make a call to the db for deletion of comment
    $.ajax({
      method: 'POST',
      url: `/note/delete/${id}`
    }).done(function () {
      window.location.reload(true);
    })
  });
});