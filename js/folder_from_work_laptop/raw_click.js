var things = document.getElementsByClassName('submit_update'); 
var len = things.length; 
for (var i=0; i<len; i++) {
    things[i].onclick = function (e) {
        e = e || window.event; 
        e.preventDefault(); 
        e.stopPropagation(); 
        alert('eee'); 
        return false; 
    }
}

