/**
 * Deprecated, use isFloatAllowZeros instead
 * @param {*} number 
 */
export const isFloat = (number) => {
    const re = /^((0(?!0))|[1-9]+\d*)(\.\d*)?$/;
    return re.test(number);
};
/**
 * 允許輸入多個0
 * @param {*} number 
 */
export const isFloatAllowZeros = (number) => {
    const re = /^\d\d*(\.\d*)?$/;
    return re.test(number);
};
/**
 * 同isFloat只是後面限制1位
 * @param {*} number 
 */
export const isFloatWithOneAfterZero = (number) => {
    const re = /^(0(?!0)|([1-9]+\d*))(\.\d{0,1})?$/;
    return re.test(number);
};
/**
 * 同isFloat只是後面限制4位
 * @param {*} number 
 */
export const isFloatWithFourAfterZero = (number) => {
    const re = /^(0(?!0)|([1-9]+\d*))(\.\d{0,4})?$/;
    return re.test(number);
};
/**
 * 同isFloat只是多一個符號
 * @param {*} number 
 */
export const isSignedFloatWithTwoAfterZero = (number) => {
    const re = /^[-+]?(0(?!0)|([1-9]+\d*)?)(\.\d{0,2})?$/;
    return re.test(number);
};
/**
 * 輸入框檢核輸入非浮點數
 * since 2019/06/03
 */
export const isNumericCharacter = (character) => {
    const regex = /^\d?\.?$/
    return regex.test(character)
}