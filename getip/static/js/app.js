function showResults() {
    if (urlButtonRow.style.display === 'none') {
        urlButtonRow.style.display = 'block';
    }

    if (preloader.style.display === 'block') {
        preloader.style.display = 'none';
    }

    if (document.getElementById('results-section').style.display === 'none') {
        document.getElementById('results-section').style.display = 'block';
    }
}

function show403() {
    if (urlButtonRow.style.display === 'none') {
        urlButtonRow.style.display = 'block';
    }

    if (preloader.style.display === 'block') {
        preloader.style.display = 'none';
    }

    if (document.getElementById('results-section').style.display === 'none') {
        document.getElementById('results-section').style.display = 'block';
    }
}

function show500() {
    if (urlButtonRow.style.display === 'none') {
        urlButtonRow.style.display = 'block';
    }

    if (preloader.style.display === 'block') {
        preloader.style.display = 'none';
    }

    if (document.getElementById('results-section').style.display === 'none') {
        document.getElementById('results-section').style.display = 'block';
    }
}

$(document).ready(function (e) {

    $('#url-form').on('submit', function (e) {
        e.preventDefault();

        if (document.getElementById('invalid-url').style.display === 'block') {
            document.getElementById('invalid-url').style.display = 'none';
        }

        url = document.getElementById('url').value;

        preloader = document.getElementById('preloader');
        urlButtonRow = document.getElementById('url-button-row');

        if (urlButtonRow.style.display != 'none') {
            urlButtonRow.style.display = 'none';
        }

        if (preloader.style.display === 'none') {
            preloader.style.display = 'block';
        }

        new_byurl_request = $.ajax({
            url: '/get-ip-by-url',
            type: 'POST',
            data: $('#url-form').serialize(),
            statusCode: {
                403: function() {
                    show403();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Session Expired!</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;Please refresh the page.</p>';
                },

                500: function() {
                    show500();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Well that\'s embarrassing...</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;We\'re experiencing some problems on our end. Please try again.</p>';
                }
            },
            success: function (response) {
                if (response.status === 'success') {
                    showResults();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + url + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-check green-text text-lighten-2"></i> &nbsp;IP Address: ' + response.ip + '</p>';
                    M.toast({
                        html: '<p><i class="fas fa-1x fa-check green-text text-lighten-2 center"></i></p> &nbsp;&nbsp;&nbsp;<p>Success! '+ response.ip +'</p>',
                        classes: 'grey darken-3 button-border-purple white-text'
                    });
                }

                else if (response.status === 'failure') {
                    showResults();
                    document.getElementById('results-text').innerHTML = '<strong><p class="white-text flow-text">Results for ' + url + ':</p></strong> <p class="flow-text white-text"><i class="fas fa-exclamation-triangle red-text text-accent-1"></i> &nbsp;No record found.</p>';
                    M.toast({ html: '<p><i class="fas fa-exclamation-triangle red-text text-accent-1"></i></p> &nbsp;&nbsp;&nbsp;<p>No record found!</p>', classes: 'grey darken-3 button-border-purple white-text' })
                }

                else if (response.status === 'form_error') {
                    if (urlButtonRow.style.display === 'none') {
                        urlButtonRow.style.display = 'block';
                    }

                    if (preloader.style.display === 'block') {
                        preloader.style.display = 'none';
                    }

                    if (response.field === 'port') {
                        document.getElementById('invalid-port-number').style.display = 'block';
                        document.getElementById('invalid-port-number').innerHTML = '<span>'+response.error+'</span>';
                    }

                    else if (response.field === 'url') {
                        document.getElementById('invalid-url').style.display = 'block';
                        document.getElementById('invalid-url').innerHTML = '<span>' + response.error + '</span>';
                    }
                }

                else {
                    console.log("Failed")
                    console.log(response.status);
                    console.log(response.field)
                    console.log(response.error)
                }
            }
        });
    });
});
