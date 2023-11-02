$(document).ready(function () {
    $(".dot").hide()
    // document.getElementsByClassName("image-section")[0].style.display == 'none';
    // document.getElementsByClassName("loader")[0].style.display == 'none';
    // document.getElementById("result").style.display == 'none';

    const file = document.querySelector("#upload-file")
    file.addEventListener("change", function () {
        console.log("image");
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            document.getElementById("imagePreview").src = reader.result; 
            // document.querySelector("#imagePreview").src = reader.result
        })
        reader.readAsDataURL(this.files[0]);
    })

    // function readURL(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             // document.getElementById("imagePreview").setAttribute('src', "url(" + e.target.result + ")");
    //             // $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
    //             // $('.image-section').show();
    //             // $('#imagePreview').hide();
    //         }
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').css('background-color', '#fffff');
        $('#btn-predict').show();
        $('.dot').hide();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        $(this).hide();
        $('.loader').show();

        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('.dot').fadeIn(300);
                $('.dot').show();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data[0]);

                data[1].forEach(line => {
                    $('#cache').append('<li>'+line+'</li>')
                });
                
                console.log('Success!');
            },
        });
    });

});