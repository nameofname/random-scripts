const debounce = (func, timeout) => {
    let t;
    return () => {
        clearTimeout(t);
        t = setTimeout(function() { return func(...arguments); }, timeout);
    }
}
const fun = () => console.log('ronald')
const debouncedFun = debounce(fun, 1000)

fun()
debouncedFun()
debouncedFun()
debouncedFun()
debouncedFun()
