/**
 * 取得小數零下的位數數量
 * https://stackoverflow.com/questions/9553354/how-do-i-get-the-decimal-places-of-a-floating-point-number-in-javascript/44846902
 * @param {Number} number 
 */
export const getPrecision = (number) => {
    if (Math.floor(number) !== number) {
        const splitByDot = number.toString().split(".")
        const afterZero = splitByDot[1]
        if (afterZero) {
            if (afterZero.length) {
                return afterZero.length
            }
        }
    }
    return 0;
};
/**
 * 無條件捨去到小數後幾位
 * http://www.eion.com.tw/Blogger/?Pid=1173
 * @param {} val 
 * @param {*} precision 
 */
export const floorToPrecision = (val, precision) => {
    const part1 = Math.floor(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10)
    const part2 = Math.pow(10, (precision || 0));
    return part1 / part2
}