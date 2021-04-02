
const redirect = (url) => {
    window.location = url;
};

const validateForm = () => {
    const data = $("form#login-form").serializeArray();

    var returnArray = {};
    for (var i = 0; i < data.length; i++){
        returnArray[data[i]['name']] = data[i]['value'];
    }

    $.post('http://localhost:5000/api/validate/login', returnArray, (data) => {
        flash('Default Flash Message',{

            // background color
            'bgColor' : '#5cb85c',
            
            // text color
            'ftColor' : 'white',
          
            // or 'top'
            'vPosition' : 'bottom',
          
            // or 'left'
            'hPosition' : 'right',
          
            // duration of animation
            'fadeIn' : 400,
            'fadeOut' : 400,
          
            // click to close
            'clickable' : true,
          
            // auto hides after a duration time
            'autohide' : true,
          
            // timout
            'duration' : 4000
            
          });
    });
    return false;
}

