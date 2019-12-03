<template>
    <div class="wrapper-dropdownMaybe">
        <div class="calendarCom">
            <div class="title">
                <img class="bt pre" @click="clickPre($event)" src="./Righ-Left.svg" alt />
                <h2 class="calendar-year green small">{{month_name[selectMonth.thisMonth]}}</h2>
                <h1 class="calendar-title green">{{selectMonth.thisYear}}</h1>
                <img class="bt next" @click="clickNext($event)" src="./right-arrow-01.svg" alt />
            </div>
            <div class="body-calendar">
                <div class="weekColor body-list weekList">
                    <ul class="weeks">
                        <li>MON</li>
                        <li>TUE</li>
                        <li>WED</li>
                        <li>THU</li>
                        <li>FRI</li>
                        <li>SAT</li>
                        <li>SUN</li>
                    </ul>
                </div>
                <div class="darkgrey body-list daysList">
                    <ul class="days">
                        <li
                            :class="{thisM:item.getMonth()===selectMonth.thisMonth,selectDay:item.getFullYear()===todayMonth.thisYear&&item.getDate()===todayMonth.thisDay&&item.getMonth()===todayMonth.thisMonth}"
                            v-for="(item,i) in selectMonth.every"
                            :key="i"
                            class="cell"
                        >{{item.getDate()}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data: () => ({
        month_leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        month_name: ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"],
        week_name: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        selectMonth: {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth(),
            thisDay: new Date().getDate(),
            every: []
        },
        beforeSelectMonth: [],
        afterSelectMonth: [],
        todayMonth: {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth(),
            thisDay: new Date().getDate(),
            every: []
        },
    }),
    components: {

    },
    methods: {

        refreshDate: function () {
            //是否今天
            let beforeSelectMonth = [];
            let selectMonthEvery = [];
            let afterSelectMonth = [];
            for (let i = 0; i < this.startOnWeekDay; i++) {
                beforeSelectMonth.push(new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth, -i))
            }
            beforeSelectMonth.reverse();
            // // 加入之前月份日期

            for (let i = 1; i < this.thisMonthInleapYearOrNot + 1; i++) {
                let newDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth, i);
                selectMonthEvery.push(newDate);
            }
            this.beforeSelectMonth = beforeSelectMonth;


            // 加入之後月份日期
            let cellUnit = this.afterSelectMonthLength;

            if (cellUnit < 35) {
                for (let i = 0; i < (35 - cellUnit); i++) {
                    let newDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 35 && cellUnit < 42) {
                for (let i = 0; i < (42 - cellUnit); i++) {
                    let newDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 42 && cellUnit < 49) {
                for (let i = 0; i < (49 - cellUnit); i++) {
                    let newDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 49 && cellUnit < 56) {
                for (let i = 0; i < (56 - cellUnit); i++) {
                    let newDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth + 1, i);
                    afterSelectMonth.push(newDate);
                }
            }
            this.selectMonth.every = beforeSelectMonth.concat(selectMonthEvery).concat(afterSelectMonth);
        },
        clickNext: function (e) {
            e.preventDefault();
            this.selectMonth.thisMonth++;
            if (this.selectMonth.thisMonth > 11) {
                this.selectMonth.thisYear++;
                this.selectMonth.thisMonth = 0;
            }
            this.refreshDate(this.selectMonth);
        },
        clickPre: function (e) {
            e.preventDefault();
            this.selectMonth.thisMonth--;
            if (this.selectMonth.thisMonth < 0) {
                this.selectMonth.thisYear--;
                this.selectMonth.thisMonth = 11;
            }
            this.refreshDate(this.selectMonth);
        },
    },
    computed: {
        startOnWeekDay() {
            let tmpDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth, 1);
            return (tmpDate.getDay());
        },
        lastOnWeekDay() {
            let tmpDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth, this.thisMonthInleapYearOrNot);
            return (tmpDate.getDay());
        },
        thisday() {
            let tmpDate = new Date(this.selectMonth.thisYear, this.selectMonth.thisMonth, this.selectMonth.thisDay);
            return tmpDate;
        },
        thisMonthInleapYearOrNot() {
            let tmp = this.selectMonth.thisYear % 4;
            if (tmp == 0) {
                return (this.month_leapYear[this.selectMonth.thisMonth]);
            } else {
                return (this.month_normal[this.selectMonth.thisMonth]);
            }
        },
        afterSelectMonthLength() {
            return this.thisMonthInleapYearOrNot + this.beforeSelectMonth.length
        }
    },
    mounted() {
        this.refreshDate();
    }
}
</script>
<style lang="scss" scoped>
.calendarCom {
    width: 368px;
    height: 322px;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.04);
    background-color: #ffffff;
    padding: 16px 24px;
}

.calendarCom .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.calendarCom .title * {
    font-size: 16px;
    text-align: center;
    height: 24px;
    line-height: 24px;
    margin: 0;
    padding: 0;
}
.calendarCom .title .bt {
    width: 64px;
}
.calendarCom .title .pre {
    padding-right: 46px;
    padding-left: 10px;
}
.calendarCom .title .next {
    padding-right: 10px;
    padding-left: 46px;
}
.calendarCom .title a {
    color: aqua;
    text-decoration: none;
}

.calendarCom .body-list ul {
    width: 100%;
    font-family: arial;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
}

.calendarCom .body-list ul li {
    width: 14.28%;
    height: 40px;
    line-height: 40px;
    list-style-type: none;
    display: block;
    box-sizing: border-box;
    text-align: center;
    font-size: 13px;
}
.calendarCom .weeks {
    height: 24px;
    line-height: 24px;
    margin-bottom: 16px;
}
.calendarCom .weekColor {
    color: #a8a8a8;
}
.calendarCom .cell {
    color: #cac4c4;
}
.calendarCom .thisM {
    color: #565656;
}

.calendarCom .green {
    color: #6ac13c;
}

.calendarCom .greenbox {
    border: 1px solid #6ac13c;
    background: #e9f8df;
}

.calendarCom .selectDay {
    color: #6ac13c;
    border: 1px solid #6ac13c;
    background: #e9f8df;
}
</style>