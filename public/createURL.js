$(document).ready(function(){
    $("form#shortenForm").on('submit', function(e){

        e.preventDefault();
        var data = $('#originalURL').val();
        if(data===null||data.length===0) return

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/shorten',
            data: {original:data},
                
        })
        .done(function(data){
            if(data==="faild"){
            $('#errorContainer label').remove()
            $('#errorContainer').append(jQuery('<label>').text("There was an error on the request, please try again"))
            
            }else{

            $("#shortenURL").val(data.shorten)
            $('#urlContainer button').remove()
            $('#originalURL').val("")
            $('#urlContainer').append(jQuery('<button>').attr('id', 'redirectButton'))
            $('#redirectButton').append(jQuery('<a>').attr('href', data.shorten).attr('target', "_blank").text("open in new tab"))
        }
        });
    });
});