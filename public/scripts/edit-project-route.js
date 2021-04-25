const pathArray = window.location.pathname.split('/');
if (pathArray.length === 3) {
    const successFunction = (data) => {
        $('input[name=project-name]').attr('value', data.data.name);
        $('textarea[name=project-description]').text(data.data.description);
    }

    const failureFunction = (xhr) => {
        console.log('abc');
            if(xhr.status == 404 || xhr.status == 500) {
                $.get(`/${xhr.status}`, (data) => {
                    $(".container").empty();
                    $(".container").html(data);
                })
            }
    }
    get(`projects/${pathArray[2]}`, successFunction, failureFunction, window.localStorage.getItem('PM-326-authToken'));
}
