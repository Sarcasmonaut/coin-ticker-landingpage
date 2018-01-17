var dlLinks = {}

function downloadApp(platform) {
    if (document.querySelector('input#eula').checked) {
        if (dlLinks[platform]){
            return document.location.href = dlLinks[platform].url;
        }
        $('p#eula-error').toggle(false);
        var url = "https://tfne3aoymc.execute-api.eu-west-1.amazonaws.com/dev/latest?platform=" + platform
        
        fetch(url)
            .then(function (response) {
                return response.json();
            }, function(err)  {
                // console.log(err)
                return {}
            })
            .then(function (jsonResponse) {
                // console.dir(jsonResponse)
                if (jsonResponse.url){
                    dlLinks[platform] = jsonResponse.url;
                    document.location.href = jsonResponse.url;
                } else {
                    $('p#dl-error').toggle(true)
                    $('html, body').animate({
                        scrollTop: $("#dl-header").offset().top
                    }, 1200);
                }
            });

    } else {
        $('p#eula-error').toggle(true);
        $('html, body').animate({
            scrollTop: $("#dl-header").offset().top
        }, 1200);
    }
}