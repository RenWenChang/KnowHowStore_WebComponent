function selector(selector) {
    return typeof selector === "string"
        ? document.querySelector(selector)
        : alert("typeof error ,parameter 'selector' must be string !");
};
function selectorAll(selector) {
    return typeof selector === "string"
        ? document.querySelectorAll(selector)
        : alert("typeof error , parameter 'selector' must be string !");
};