<template>
    <div class="wrapper-dropdownMaybe">
        <div class="calendarCom" v-if="!monthSelector">
            <div class="title">
                <img
                    class="bt pre cursor-pointer"
                    @click="clickPre($event)"
                    src="./Righ-Left.svg"
                    alt
                />
                <h2
                    class="calendar-year cursor-pointer"
                    @click="openMonthSelector()"
                >{{month_name[selectMonth.thisMonth]}}</h2>
                <h1
                    class="calendar-title cursor-pointer"
                    @click="openYearSelector()"
                >{{selectMonth.thisYear}}</h1>
                <img
                    class="bt next cursor-pointer"
                    @click="clickNext($event)"
                    src="./right-arrow-01.svg"
                    alt
                />
            </div>
            <div class="body-calendar">
                <div class="weekColor body-list weekList">
                    <ul class="weeks">
                        <li v-for="(item,i) in week_name" :key="i">{{item}}</li>
                    </ul>
                </div>
                <div class="darkgrey body-list daysList">
                    <ul class="days" :ref="'days'">
                        <li
                            :class="{thisM:item.getMonth()===selectMonth.thisMonth,
                            selectDay:item.getFullYear()===todayMonth.thisYear&&item.getDate()===todayMonth.thisDay&&item.getMonth()===todayMonth.thisMonth,
                            selected:item.getFullYear()===chooseTheDay.thisYear&&item.getDate()===chooseTheDay.thisDay&&item.getMonth()===chooseTheDay.thisMonth
                            }"
                            v-for="(item,i) in selectMonth.every"
                            :key="i"
                            class="cell cursor-pointer"
                            @click="clickChooseTheDay($event,item)"
                        >{{item.getDate()}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="calendarCom" v-else>
            <div class="option" v-if="!yearSelector">
                <div class="title">
                    <svg
                        @click="closeMonthSelector"
                        aria-hidden="true"
                        viewBox="0 0 512 512"
                        class="back cursor-pointer"
                    >
                        <path
                            d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"
                        />
                    </svg>
                </div>
                <span class="optionTitle">Select Month</span>
                <ul>
                    <li
                        class="cell cursor-pointer"
                        v-for="(item,i) in month_name"
                        :class="{
                            selectDay:todayMonth.thisMonth===i&&new Date().getFullYear()===readyToSelect.thisYear,
                             selected:i===selectMonth.thisMonth
                            }"
                        :key="i"
                        @click="setSelectMonth(i)"
                    >{{i+1}} {{item}}</li>
                </ul>
            </div>
            <div class="option yearOption" v-else>
                <div class="title">
                    <svg
                        @click="back"
                        aria-hidden="true"
                        viewBox="0 0 512 512"
                        class="back cursor-pointer"
                    >
                        <path
                            d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"
                        />
                    </svg>
                </div>
                <span
                    class="optionTitle"
                >{{new Date(todayMonth.thisYear-100,0,1).getFullYear()}} - {{new Date(todayMonth.thisYear+100,1,1).getFullYear()}}</span>

                <ul>
                    <li
                        :class="{
                            selectDay:item.getFullYear()===todayMonth.thisYear,
                           selected:item.getFullYear()===selectMonth.thisYear,
                            }"
                        @click="setSelectYear(item)"
                        class="cell cursor-pointer"
                        v-for="(item,i) in yearOption"
                        :key="i"
                    >{{item.getFullYear()}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data: () => ({
        month_name: ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"],
        week_name: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
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
        chooseTheDay: {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth(),
            thisDay: new Date().getDate()
        },
        yearOption: [],
        readyToSelect: {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth()
        },
        monthSelector: false,
        yearSelector: false

    }),
    components: {

    },
    watch: {
        yearSelector: function () {
            if (this.yearSelector == true) {
                this.$nextTick(() => {
                    let h = document.querySelector('.yearOption').querySelector('ul').scrollHeight;
                    document.querySelector('.yearOption').querySelector('ul').scrollTop = h / 2 - 42;
                }
                );            }
        }
    },
    methods: {

        refreshDate: function () {
            let beforeSelectMonth = [];
            let selectMonthEvery = [];
            let afterSelectMonth = [];
            let yearOption = [];
            let selectY = this.selectMonth.thisYear;
            let selectM = this.selectMonth.thisMonth;
            for (let i = 0; i < this.startOnWeekDay; i++) {
                beforeSelectMonth.push(new Date(selectY, selectM, -i))
            }
            beforeSelectMonth.reverse();
            // // 加入之前月份日期

            for (let i = 1; i < this.thisMonthLength + 1; i++) {
                let newDate = new Date(selectY, selectM, i);
                selectMonthEvery.push(newDate);
            }
            this.beforeSelectMonth = beforeSelectMonth;


            // 加入之後月份日期
            let cellUnit = this.thisMonthLength + this.beforeSelectMonth.length;

            if (cellUnit < 35) {
                for (let i = 1; i <= (35 - cellUnit); i++) {
                    let newDate = new Date(selectY, selectM + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 35 && cellUnit < 42) {
                for (let i = 1; i <= (42 - cellUnit); i++) {
                    let newDate = new Date(selectY, selectM + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 42 && cellUnit < 49) {
                for (let i = 1; i <= (49 - cellUnit); i++) {
                    let newDate = new Date(selectY, selectM + 1, i);
                    afterSelectMonth.push(newDate);
                }
            } else if (cellUnit > 49 && cellUnit < 56) {
                for (let i = 1; i <= (56 - cellUnit); i++) {
                    let newDate = new Date(selectY, selectM + 1, i);
                    afterSelectMonth.push(newDate);
                }
            }
            this.selectMonth.every = beforeSelectMonth.concat(selectMonthEvery).concat(afterSelectMonth);

            //年份選單
            for (let i = this.todayMonth.thisYear - 100; i <= this.todayMonth.thisYear + 100; i++) {
                yearOption.push(new Date(i, 0, 1));
            }
            this.yearOption = yearOption;


        },
        clickNext: function (e) {
            e.preventDefault();
            this.selectMonth.thisMonth++;
            if (this.selectMonth.thisMonth > 11) {
                this.selectMonth.thisYear++;
                this.selectMonth.thisMonth = 0;
            }
            this.refreshDate();
        },
        clickPre: function (e) {
            e.preventDefault();
            this.selectMonth.thisMonth--;
            if (this.selectMonth.thisMonth < 0) {
                this.selectMonth.thisYear--;
                this.selectMonth.thisMonth = 11;
            }
            this.refreshDate();
        },
        clickChooseTheDay: function (e, item) {
            e.preventDefault();
            this.chooseTheDay.thisYear = item.getFullYear();
            this.chooseTheDay.thisMonth = item.getMonth();
            this.chooseTheDay.thisDay = item.getDate();
        },
        openMonthSelector: function () {
            this.monthSelector = true;
        },
        openYearSelector: function () {
            this.monthSelector = true;
            this.yearSelector = true;
        },
        closeMonthSelector: function () {
            this.monthSelector = false;
        },
        closeYearSelector: function () {
            this.yearSelector = false;
        },
        clickPreY: function () {
            this.readyToSelect.thisYear--;
        },
        clickNextY: function () {
            this.readyToSelect.thisYear++;
        },
        resetReadyToSelect: function () {
            this.readyToSelect.thisYear = new Date().getFullYear();
            this.readyToSelect.thisMonth = new Date().getMonth();
        },
        setSelectMonth: function (i) {
            // this.readyToSelect.thisYear =this.selectMonth.thisYear ; 
            this.selectMonth.thisMonth = i;
            this.closeMonthSelector();
            this.refreshDate();
            // this.resetReadyToSelect();
        },
        setSelectYear: function (item) {
            this.selectMonth.thisYear = item.getFullYear();
            this.closeYearSelector();
            this.closeMonthSelector();
            this.refreshDate();
            // this.resetReadyToSelect();

        },
        back: function () {
            this.closeYearSelector();
            this.closeMonthSelector();
        }
    },
    computed: {
        startOnWeekDay() {
            let selectY = this.selectMonth.thisYear;
            let selectM = this.selectMonth.thisMonth;
            let tmpDate = new Date(selectY, selectM, 1);
            return (tmpDate.getDay());
        },
        lastOnWeekDay() {
            let selectY = this.selectMonth.thisYear;
            let selectM = this.selectMonth.thisMonth;
            let tmpDate = new Date(selectY, selectM, this.thisMonthLength);
            return (tmpDate.getDay());
        },
        thisday() {
            let selectY = this.selectMonth.thisYear;
            let selectM = this.selectMonth.thisMonth;
            let tmpDate = new Date(selectY, selectM, this.selectMonth.thisDay);
            return tmpDate;
        },
        thisMonthLength() {
            let selectY = this.selectMonth.thisYear;
            let selectM = this.selectMonth.thisMonth;
            const date1 = new Date(selectY, selectM, 1);
            const date2 = new Date(selectY, (selectM + 1), 1);
            return (Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24);
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
.calendarCom .cell:hover {
    border: 1px solid #d9f7c8;
}
.calendarCom .thisM {
    color: #565656;
}

.calendarCom .calendar-year {
    color: #6ac13c;
}
.calendarCom .calendar-title {
    color: #6ac13c;
}

.calendarCom .body-calendar .selected {
    color: #6ac13c;
    border: 1px solid #6ac13c;
    background: #fdfdfd;
}
.calendarCom .body-calendar .selected:hover {
    border: 1px solid #6ac13c;
}
.calendarCom .body-calendar .selectDay {
    color: #6ac13c;
    border: 1px solid #6ac13c;
    background: #e9f8df;
}
.calendarCom .option {
    position: relative;
}
.calendarCom .option > ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 248px;
    overflow-x: auto;
}

.calendarCom .option > ul li {
    height: 80px;
    line-height: 60px;
    width: 25%;
    font-size: 12px;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: initial;
}
.calendarCom .option .selected {
    color: #6ac13c;
    border: 1px solid #6ac13c;
    background: #fdfdfd;
}
.calendarCom .option .selected:hover {
    border: 1px solid #6ac13c;
}
.calendarCom .option > ul .selectDay {
    color: #6ac13c;
    border: 1px solid #6ac13c;
    background: #e9f8df;
}
.cursor-pointer {
    cursor: pointer;
}
.calendarCom .back {
    position: absolute;
    top: 0;
    left: 0;
    fill: #ceffce;
    transition-property:fill top;
    transition:  ease 0.1s;
}
.calendarCom .back:hover {
    fill: #79ff79;
    top:-1px;
    transition-property:fill top;
}
.calendarCom .optionTitle {
    text-align: center;
    width: 100%;
    height: 24px;
    margin-bottom: 16px;
    display: inline-block;
}
</style>