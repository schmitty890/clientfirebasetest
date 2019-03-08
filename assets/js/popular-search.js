
//this reads from the database ONCE. do what you want with the values returned.
database.ref('/search').once('value').then(function(snapshot) {
    var keys = Object.keys(snapshot.val());
    var mostRecentlySearched = [];
    for (var key in snapshot.val()) {
        var eventSearched = snapshot.val()[key];
        // console.log(eventSearched);
        mostRecentlySearched.push(eventSearched.event);
    }
    // console.log(mostRecentlySearched);
    var html = '<ul>';
    mostRecentlySearched.forEach(function (index) {
      html += '<li>' + index + '</li>';
    });
    $('#the-list').append(html);
    $('#the-count').append(mostRecentlySearched.length);

}, function(errorObject) {
    console.log('the read failed: ' + errorObject.code);
});

$(document).on('click', '#search', function(event) {
    event.preventDefault();
    var event = $('#search-event').val().trim();

    database.ref("search/").push({
        event: event
    });
});