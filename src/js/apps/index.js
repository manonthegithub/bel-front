require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack!../../bootstrap.config.js');
require('../../styles/style.less');


$(document).ready(
    function(){
        $('.carousel').carousel({
            interval: 5000 //changes the speed
        })
    }
);
