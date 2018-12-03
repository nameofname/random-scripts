function destroy(e) {
    e.target.parentNode.removeChild(e.target);
}
function enableDestroyer() {
    document.addEventListener('click', destroy);
}

function disableDestroyer() {
    document.removeEventListener('click', destroy);
}