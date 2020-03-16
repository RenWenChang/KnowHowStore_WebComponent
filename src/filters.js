import Vue from 'vue'

export const fillterDot =  function(value, dot) {

    if(isNaN(value)) {
        return ""
    }

    if (Number(value) === 0) {
        return Number(value);
    } else {
        return Number(value).toLocaleString(undefined, { minimumFractionDigits: dot, maximumFractionDigits: dot })
    }
};


Vue.filter('filterDot', function(value, dot) {

    if(isNaN(value)) {
        return ""
    }

    if (Number(value) === 0) {
        return Number(value);
    } else {
        return Number(value).toLocaleString(undefined, { minimumFractionDigits: dot, maximumFractionDigits: dot })
    }
});

Vue.filter('positive', function(value) {
    if(isNaN(value)) {
        return ""
    }


    if (value < 0) {
        value = value * -1
        return value;
    } else {
        return value;
    }

});

Vue.filter('dateFilter', function(value) {

    value = value.slice(0, 10);
    return value
});

Vue.filter('YYYYMMDD', (taiwanDateString, divide = '-') => {
    const taiwnDateInstance = new Date(taiwanDateString);
    const YY = taiwnDateInstance.getFullYear()
    const month = taiwnDateInstance.getMonth() + 1
    let MM = month;

    if (month <= 9) {
        MM = `0${month}`
    }
    const date = taiwnDateInstance.getDate()
    let DD = date;
    if (date <= 9) {
        DD = `0${date}`
    }
    return `${YY}${divide}${MM}${divide}${DD}`
})


