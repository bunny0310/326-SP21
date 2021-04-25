const getProject = () => {
    $cardProject = $("div.card#viewProject");
    const successFunction = (data) => {
        if(data.data === null || data.data === undefined) {
            $.get(site+'404', (data) => {
                $("div.container#viewProject").html(data);
            })
            return;    
        }
        $children = $cardProject.children();
        $($children[0]).html(data.data.name);
        $($children[0]).css("font-weight", "bold");
        $($children[0]).css("text-align", "center");
        $($children[0]).css("font-family", "Dekko");
        $($children[0]).css("font-size", "40px");
        $($children[0]).css("text-transform", "uppercase");
        $($children[1]).html(data.data.description);
        $($children[2]).html(`Created by ` + parseJwt(window.localStorage.getItem('PM-326-authToken')).name + ` on ${data.data.createdAt}`);
        $cardProject.css("display", "block");
    }
    const failureFunction = (xhr) => {
        console.log(xhr);
        if(xhr.status == 401) {
            removeToken();
            redirect('/login');
        }
        if(xhr.status == 404 || xhr.status == 500) {
            $.get(`/${xhr.status}`, (data) => {
                $(".container").empty();
                $(".container").html(data);
            })
        }
    }
    const url = window.location.href;
    let projectId = url.substring(url.lastIndexOf('/') + 1);
    if(projectId === undefined || projectId === null || !(/^\d+$/).test(projectId)) {
        $.get(site+'404', (data) => {
            $("div.container#viewProject").html(data);
        })
    }
    projectId = parseInt(projectId);
    get(`projects/${projectId}`, successFunction, failureFunction, window.localStorage.getItem('PM-326-authToken'));
}

getProject();