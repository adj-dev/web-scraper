$(function () {
  // Add an event listener for the `scraper` button
  $(document).on('click', '#scraper', function () {
    console.log('clicked the scraper button');
    $.ajax({
      method: 'GET',
      url: '/scrape'
    })
      .then(function (req, res) {
        console.log(res);
        window.location.reload(true);
      });
  });
});