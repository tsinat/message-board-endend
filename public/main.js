$(function() {
    $('.form').submit(sendMessage);
    $('.delete').click(deleteMessage);
    // $('.edit').click(editMessage);
    // getMessage();
});

function sendMessage(e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var image = $('#image').val();
    var message = $('#message').val();

    $.post('/message', {
            name: name,
            email: email,
            image: image,
            message: message
        })
        .done(function(data) {
            var button = $('<button>').addClass('btn btn-danger');
            var div = $('<div>').addClass('newElement');

            var img = $('<img>').attr('src', image);
            // img.attr('src', image);
            var $message = $('<h3>').text(message);
            var $time = $('<h5>').text(Date.now())
            console.log(message);
            div.append(img, $message, $time);
            $('.message-board').append(div);
            // console.log('data send',data);
        })
        .fail(function(error) {
            console.log('data is not sent:', error);
        });
}

function deleteMessage(e) {
    var id = $(e.target).attr('id');
    $.ajax({
        url: `/message/:${id}`,
        type: 'DELETE',
        success: function(response) {
            $(e.target).closest('div').remove();

        }
    });
}

// function editMessage(e) {
//     var id = $(e.target).attr('id');
//
//     console.log($(this).closest().children());
//     $.ajax({
//         url: `/message/${id}`,
//         type: 'PUT',
//         data:{ },
//         success: function(response) {
//         }
//     });
// }
