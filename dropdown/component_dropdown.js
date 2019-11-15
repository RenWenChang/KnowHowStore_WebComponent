// https://ddjs.org v5.12.0 Copyright 2019 Mike Bostock
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (global = global || self, factory(global.dd = global.dd || {}));
}(this, function (exports) {
    function clickOpenSelection(e) {
        e.stopPropagation();
        let el = e.target.classList;
        if (el.contains("open")) {
            e.target.lastElementChild.classList.remove("ul");
            el.remove("open");

        } else {
            closeAllOption();
            e.target.lastElementChild.classList.add("ul");
            el.add("open");
        }
    }
    function clickChooseOption(e) {
        // e.preventDefault();
        e.stopPropagation();
        // e.path[3].firstElementChild.textContent = e.target.textContent;//user setting
        e.target.offsetParent.classList.remove("ul");
        e.target.offsetParent.offsetParent.classList.remove("open");
    }

    function closeAllOption() {
        var all_dd = document.querySelectorAll(".dropdown");
        let open = document.querySelectorAll(".open");
        let ul = document.querySelectorAll(".ul");
        if (open.length !== 0 && ul.length !== 0) {
            Array.from(all_dd).forEach((item, i) => {
                item.classList.remove("open");
            })
            Array.from(ul).forEach((item, i) => {
                item.classList.remove("ul")
            })
        }
    }


    function dropdownEventsMount() {
        var all_dd = document.querySelectorAll(".dropdown");
        var option = document.querySelectorAll(".dd_option");
        if (all_dd.length !== 0) {//開選單
            Array.from(all_dd).forEach((item, i) => {
                item.addEventListener("click", clickOpenSelection)

            })
        }
        if (option.length !== 0) {//點選項
            Array.from(option).forEach((item, i) => {
                item.addEventListener("click", clickChooseOption);
            })
        }
    }


    function beExcludeElements_EventsMount(a, eventsNeedMount) {
        if (typeof eventsNeedMount === "boolean" && eventsNeedMount) {
            dropdownEventsMount();
        }

        document.addEventListener("click", (e) => {
            a.forEach((fn) => {
                fn();
            })
        })
    }

    exports.clickOpenSelection = clickOpenSelection;
    exports.clickChooseOption = clickChooseOption;
    exports.closeAllOption = closeAllOption;
    exports.dropdownEventsMount = dropdownEventsMount;
    exports.beExcludeElements_EventsMount = beExcludeElements_EventsMount;
    Object.defineProperty(exports, '__esModule', { value: true });

}));