/*! loadScript to head */
function loadScript(callback) {
    var script = document.createElement("script")
    var url ='https://bdtag-uat.firstbank.com.tw/jscollection/WebConnector-efirst.js';
    
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                script.onreadystatechange = null;
                if(callback)
                    callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            if (callback)
                callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}