const socket = io();

const returnProjectCard = (name) => {
    return $(
        "<div class = 'card bg-primary text-black' id = 'dashboard'>"
        + "<div class = 'card-body'>"
        + name 
        + "<span class = 'buttons'>"
        + "<button class=\"delete\"><img src=\"./trash.svg\"></button>"
        + "<button class=\"edit\" onclick=\"redirect('/edit-project')\"><img src=\"./edit.svg\"></button>"
        + "</span>"
        +"</div>"
         + "</div>"
        );
}
socket.on('connect', ()=> {
    console.log(socket.connected);
    socket.on('send-jwt', (data) => {
        socket.emit('jwt token', window.localStorage.getItem('PM-326-authToken'));
        socket.on('token-request-complete', (data) => {
            $("#interim-spinner").remove();
            $("div.dashboard").empty();
            if(data.status) {
                console.log(data);
                if(data.msg === 'Success!') {
                    for(let project of data.data) {
                        $("div.dashboard").append(returnProjectCard(project.title));
                    }
                } else {
                    $("div.dashboard").append(
                        $(
                            "<div class=\"card bg-info text-white\" id = 'dashboard'>"
                            + "<div class=\"card-body\" style=\" margin-left: auto; margin-right: auto\">"
                            + data.msg
                            + "</div>"
                            + "</div>"
                        )
                    );
                }
            } else {
                $("div.dashboard")
                .append(
                    $(
                        "<div class=\"card bg-danger text-white\">"
                        + "<div class=\"card-body\" style=\" margin-left: auto; margin-right: auto\">"
                        + data.msg
                        + "</div>"
                        + "</div>"
                    )
                )
            }
        })
    })
})