$(document).ready(function () {
    var howMany = $('input[type="text"]').length;
    $('#add-button').click(function () {
        console.log(howMany)
        if (howMany !==10 ) {
            $('input[name="choice' + (howMany - 1) + '"]').after(`<input maxlength="40"required type="text" placeholder="Choice #${howMany}" name="choice${howMany}" />`)
            howMany++;
        }
    });
});