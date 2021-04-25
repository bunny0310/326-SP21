const pathArray = window.location.pathname.split('/');
if (pathArray.length === 3) {
    const successFunction = (data) => {
        console.log(data.name);
        $('input[name=project-name]').attr('value', data.name);
        $('textarea[name=project-description]').text(data.description);
    }

    const failureFunction = (xhr) => {
        const msg = JSON.parse(xhr.responseText).msg;
        flash(msg, 10000, "error");
    }
    get('edit-project/' + pathArray[2], successFunction, failureFunction, window.localStorage.getItem('PM-326-authToken'));
}
