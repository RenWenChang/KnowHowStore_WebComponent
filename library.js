// 得隨機最大最小值
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let 只能是中文 = /oblog/value.replace(/[^\u4E00-\u9FA5]/g);

function onlyEng() {
    if (!(event.keyCode >= 65 && event.keyCode <= 90))
        event.returnvalue = false;
}
// 只能是數字 考慮小鍵盤上的數字鍵
function onlyNum() {
    if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)))
        event.returnvalue = false;
}

// 表單項只能為數字和"_",用於電話/銀行帳號驗證上,可擴展到域名注冊等
function isNumber(String) {
    let Letters = "1234567890-";   //可以自己增加可輸入值
    let i;
    let c;
    if (String.charAt(0) == '-')
        return false;
    if (String.charAt(String.length - 1) == '-')
        return false;
    for (i = 0; i < String.length; i++) {
        c = String.charAt(i);
        if (Letters.indexOf(c) < 0)
            return false;
    }
    return true;
}
function CheckForm() {
    if (!isNumber(document.form.TEL.value)) {
        alert("您的電話號碼不合法！");
        document.form.TEL.focus();
        return false;
    }
    return true;
}



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