  //產生一個hash值，只有數字，規則和java的hashcode規則相同
  function hashCode(str) {
    var h = 0;
    var len = str.length;
    var t = 2147483648;
    for (var i = 0; i < len; i++) {
        h = 31 * h + str.charCodeAt(i);
        if (h > 2147483647) h %= t; //java int溢位則取模
    }
    /*var t = -2147483648 * 2;
     while (h > 2147483647) {
     h += t
     }*/
    return h;
}

//時間戳來自客戶端，精確到毫秒，但仍舊有可能在在多執行緒下有併發，
//尤其hash化後，毫秒數前面的幾位都不變化，導致不同日期hash化的值有可能存在相同，
//因此使用下面的隨機數函式，在時間戳上加隨機數，保證hash化的結果差異會比較大
/*
 ** randomWord 產生任意長度隨機字母數字組合
 ** randomFlag-是否任意長度 min-任意長度最小位[固定位數] max-任意長度最大位
 ** 用法  randomWord(false,6);規定位數 flash
 *      randomWord(true,3，6);長度不定，true
 * arr變數可以把其他字元加入，如以後需要小寫字母，直接加入即可
 */
function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 隨機產生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
//獲取hashcode
function gethashcode() {
    //定義一個時間戳，計算與1970年相差的毫秒數  用來獲得唯一時間
    var timestamp = (new Date()).valueOf();
    var myRandom = randomWord(false, 6);
    var hashcode = hashCode(myRandom + timestamp.toString());
    return hashcode;
    }
    // console.log(randomWord(gethashcode(),10,10));