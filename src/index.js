import './styles.scss'

window.onbeforeprint = function() { 
    console.log("before print");
};

window.onafterprint = function() { 
    console.log("after print");
};