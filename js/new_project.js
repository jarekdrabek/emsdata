$(function() {

    $("#registerForm input,#registerForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var projectName = $("input#registerProjectName").val();
            var name = $("input#registerName").val();
            var email = $("input#registerEmail").val();
            var phone = $("input#registerPhone").val();
            var useCase = $("textarea#registerUseCase").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/new_project.php",
                type: "POST",
                data: {
                    projectName: projectName,
                    name: name,
                    phone: phone,
                    email: email,
                    useCase: useCase
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#register-success').html("<div class='alert alert-success'>");
                    $('#register-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#register-success > .alert-success')
                        .append("<strong>Your request has been sent. </strong>");
                    $('#register-success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#registerForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#register-success').html("<div class='alert alert-danger'>");
                    $('#register-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#register-success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our server is not responding. Please try again later!");
                    $('#register-success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#registerForm').trigger("reset");
                }
            })
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#register-success').html('');
});
