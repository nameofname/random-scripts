function destroy(e) {
    e.target.parentNode.removeChild(e.target);
}
function enable() {
    document.addEventListener('click', destroy);
}

function disable() {
    document.removeEventListener('click', destroy);
}

module.exports = { enable, disable };