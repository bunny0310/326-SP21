const getProjects = () => {
    $("div.footer").hide();
    const returnProjectCard = (project) => {
        let date = new Date(project.updatedAt);
        return $(
            `<div class = 'card bg-primary text-black' id = 'dashboard'>
            <div class = 'card-body'>
             <a href="/viewProjects/${project.id}" class="normal-link">${project.name}</a>
            <span class = 'buttons'>
            <button class="delete"><img src="./trash.svg"></button>
            <button class="edit" onclick="redirect('/edit-project/${project.id}')"><img src="./edit.svg"></button>
            </span>
            </div>
            <div class="card-footer">
                Last modified on ${date.toLocaleString()}
              </div>
            </div>`
            );
    }

    const successPullProjects = (data) => {
        $("#interim-spinner").remove();
        $("div.dashboard").empty();
        for(let project of data) {
            $("div.dashboard").append(returnProjectCard(project));
        }
        $pageDropdown = $("div.footer ul li#page-dropdown select");
        $pageDropdown.empty();
        let selectedPage = new URLSearchParams(window.location.search).get('page');
        selectedPage = parseInt(selectedPage);
        if(selectedPage === null || selectedPage === undefined || !(/^\d+$/.test(selectedPage)) || selectedPage > pageCount){
            selectedPage = 1;
            console.log('here');
        }
        for(let i=1; i<=pageCount; ++i) {
            let selected = "";
            if(i == selectedPage) {
                selected = "selected";
            }
            $pageDropdown.append(`<option value="dashboard?page=${i}" ${selected} >${i}</option>`);
        }
        $pageNext = $("div.footer ul li#page-next");
        $pagePrevious = $("div.footer ul li#page-previous");
        if(selectedPage == 1) {
            $pagePrevious.addClass("disabled");
        } else {
            $pagePrevious.removeClass("disabled");
        }
        if(selectedPage == pageCount) {
            $pageNext.addClass("disabled");
        } else {
            $pageNext.removeClass("disabled");
        }
        // add the appropriate links to previous and next buttons
        $nextLink = $("div.footer ul li#page-next a")[0];
        $previousLink = $("div.footer ul li#page-previous a")[0];
        const prevPage = selectedPage - 1;
        const nextPage = selectedPage + 1;
        $nextLink.href=`dashboard?page=${nextPage}`;
        $previousLink.href=`dashboard?page=${prevPage}`;
        $("div.footer").show();
    }

    let pageCount = 1;
    const successPageCount = (data) => {
        pageCount = data.msg % 5 === 0 ? data.msg / 5 : (parseInt(data.msg / 5)) + 1;
        get('projects?page=' + new URLSearchParams(window.location.search).get('page'), successPullProjects, failureFunction, window.localStorage.getItem('PM-326-authToken'));
    }

    const failureFunction = (xhr) => {
        $("#interim-spinner").remove();
        $("div.dashboard").empty();
        const msg = JSON.parse(xhr.responseText);
        if(xhr.status == 401) {
            removeToken();
            redirect('/login');
        }
        flash(JSON.stringify(msg), 2250, "error");
    }

    get('getProjectsCount', successPageCount, failureFunction, window.localStorage.getItem('PM-326-authToken'));
}

getProjects();