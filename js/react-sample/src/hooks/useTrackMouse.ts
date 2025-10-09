let initted = false;


let moduleScopedListenerFunction = (e: MouseEvent) => {};

function ListenerFunctionFactory(callback: (e: MouseEvent) => void) {
    function listenerFunc(e: MouseEvent) {
        callback(e);
    }
    moduleScopedListenerFunction = listenerFunc;
    return moduleScopedListenerFunction;
}

function _bind(callback: (e: MouseEvent) => void) {
    window.addEventListener("mousemove", ListenerFunctionFactory(callback));
}

function _unbind() {
    window.removeEventListener("mousemove", moduleScopedListenerFunction);
    initted = false;
}

export default function useTrackMouse(callback: (e: MouseEvent) => void) {
    if (initted) return _unbind;
    _bind(callback);
    initted = true;
    return _unbind;
}