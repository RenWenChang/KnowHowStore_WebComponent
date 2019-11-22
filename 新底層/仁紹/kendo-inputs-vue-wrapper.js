(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["KendoInputsVueWrapper"] = factory(require("vue"));
	else
		root["KendoInputsVueWrapper"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KendoSharedMethods = exports.KendoBaseInputComponent = exports.KendoBaseDatasourceComponent = exports.KendoBaseComponent = undefined;

var _kendoBaseComponent = __webpack_require__(14);

var _kendoBaseComponent2 = _interopRequireDefault(_kendoBaseComponent);

var _kendoBaseDatasourceComponent = __webpack_require__(16);

var _kendoBaseDatasourceComponent2 = _interopRequireDefault(_kendoBaseDatasourceComponent);

var _kendoBaseInputComponent = __webpack_require__(17);

var _kendoBaseInputComponent2 = _interopRequireDefault(_kendoBaseInputComponent);

var _kendoSharedMethods = __webpack_require__(18);

var _kendoSharedMethods2 = _interopRequireDefault(_kendoSharedMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.KendoBaseComponent = _kendoBaseComponent2.default;
exports.KendoBaseDatasourceComponent = _kendoBaseDatasourceComponent2.default;
exports.KendoBaseInputComponent = _kendoBaseInputComponent2.default;
exports.KendoSharedMethods = _kendoSharedMethods2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoNumericTextBoxMixin = __webpack_require__(13);

var _KendoNumericTextBoxMixin2 = _interopRequireDefault(_KendoNumericTextBoxMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-numerictextbox',
    mixins: [_KendoNumericTextBoxMixin2.default]
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoColorPickerMixin = __webpack_require__(20);

var _KendoColorPickerMixin2 = _interopRequireDefault(_KendoColorPickerMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-colorpicker',
    mixins: [_KendoColorPickerMixin2.default]
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        tileSizeWidth: {
            type: Number,
            kComposite: 'tileSize.width'
        },
        tileSizeHeight: {
            type: Number,
            kComposite: 'tileSize.height'
        }
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoColorPaletteMixin = __webpack_require__(23);

var _KendoColorPaletteMixin2 = _interopRequireDefault(_KendoColorPaletteMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-colorpalette',
    mixins: [_KendoColorPaletteMixin2.default]
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoFlatColorPickerMixin = __webpack_require__(25);

var _KendoFlatColorPickerMixin2 = _interopRequireDefault(_KendoFlatColorPickerMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-flatcolorpicker',
    mixins: [_KendoFlatColorPickerMixin2.default]
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoMaskedTextBoxMixin = __webpack_require__(28);

var _KendoMaskedTextBoxMixin2 = _interopRequireDefault(_KendoMaskedTextBoxMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-maskedtextbox',
    mixins: [_KendoMaskedTextBoxMixin2.default]
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoSliderMixin = __webpack_require__(30);

var _KendoSliderMixin2 = _interopRequireDefault(_KendoSliderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-slider',
    mixins: [_KendoSliderMixin2.default]
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        tooltipEnabled: {
            type: Boolean,
            kComposite: 'tooltip.enabled'
        },
        tooltipFormat: {
            type: String,
            kComposite: 'tooltip.format'
        },
        tooltipTemplate: {
            type: String,
            kComposite: 'tooltip.template'
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoRangeSliderMixin = __webpack_require__(32);

var _KendoRangeSliderMixin2 = _interopRequireDefault(_KendoRangeSliderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-rangeslider',
    mixins: [_KendoRangeSliderMixin2.default]
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _KendoSwitchMixin = __webpack_require__(34);

var _KendoSwitchMixin2 = _interopRequireDefault(_KendoSwitchMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'kendo-switch',
    mixins: [_KendoSwitchMixin2.default]
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = exports.KendoSwitch = exports.RangeSlider = exports.KendoRangeSlider = exports.Slider = exports.KendoSlider = exports.MaskedTextBox = exports.KendoMaskedTextBox = exports.FlatColorPicker = exports.KendoFlatColorPicker = exports.ColorPalette = exports.KendoColorPalette = exports.ColorPicker = exports.KendoColorPicker = exports.NumericTextBox = exports.KendoNumericTextBox = exports.InputsInstaller = exports.KendoInputsInstaller = undefined;

var _kendoInputsInstaller = __webpack_require__(12);

var _kendoInputsInstaller2 = _interopRequireDefault(_kendoInputsInstaller);

var _KendoNumericTextBox = __webpack_require__(1);

var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

var _KendoColorPicker = __webpack_require__(2);

var _KendoColorPicker2 = _interopRequireDefault(_KendoColorPicker);

var _KendoColorPalette = __webpack_require__(4);

var _KendoColorPalette2 = _interopRequireDefault(_KendoColorPalette);

var _KendoFlatColorPicker = __webpack_require__(5);

var _KendoFlatColorPicker2 = _interopRequireDefault(_KendoFlatColorPicker);

var _KendoMaskedTextBox = __webpack_require__(6);

var _KendoMaskedTextBox2 = _interopRequireDefault(_KendoMaskedTextBox);

var _KendoSlider = __webpack_require__(7);

var _KendoSlider2 = _interopRequireDefault(_KendoSlider);

var _KendoRangeSlider = __webpack_require__(9);

var _KendoRangeSlider2 = _interopRequireDefault(_KendoRangeSlider);

var _KendoSwitch = __webpack_require__(10);

var _KendoSwitch2 = _interopRequireDefault(_KendoSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.KendoInputsInstaller = _kendoInputsInstaller2.default;
exports.InputsInstaller = _kendoInputsInstaller2.default;
exports.KendoNumericTextBox = _KendoNumericTextBox2.default;
exports.NumericTextBox = _KendoNumericTextBox2.default;
exports.KendoColorPicker = _KendoColorPicker2.default;
exports.ColorPicker = _KendoColorPicker2.default;
exports.KendoColorPalette = _KendoColorPalette2.default;
exports.ColorPalette = _KendoColorPalette2.default;
exports.KendoFlatColorPicker = _KendoFlatColorPicker2.default;
exports.FlatColorPicker = _KendoFlatColorPicker2.default;
exports.KendoMaskedTextBox = _KendoMaskedTextBox2.default;
exports.MaskedTextBox = _KendoMaskedTextBox2.default;
exports.KendoSlider = _KendoSlider2.default;
exports.Slider = _KendoSlider2.default;
exports.KendoRangeSlider = _KendoRangeSlider2.default;
exports.RangeSlider = _KendoRangeSlider2.default;
exports.KendoSwitch = _KendoSwitch2.default;
exports.Switch = _KendoSwitch2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _KendoNumericTextBox = __webpack_require__(1);

var _KendoNumericTextBox2 = _interopRequireDefault(_KendoNumericTextBox);

var _KendoColorPicker = __webpack_require__(2);

var _KendoColorPicker2 = _interopRequireDefault(_KendoColorPicker);

var _KendoColorPalette = __webpack_require__(4);

var _KendoColorPalette2 = _interopRequireDefault(_KendoColorPalette);

var _KendoFlatColorPicker = __webpack_require__(5);

var _KendoFlatColorPicker2 = _interopRequireDefault(_KendoFlatColorPicker);

var _KendoMaskedTextBox = __webpack_require__(6);

var _KendoMaskedTextBox2 = _interopRequireDefault(_KendoMaskedTextBox);

var _KendoSlider = __webpack_require__(7);

var _KendoSlider2 = _interopRequireDefault(_KendoSlider);

var _KendoRangeSlider = __webpack_require__(9);

var _KendoRangeSlider2 = _interopRequireDefault(_KendoRangeSlider);

var _KendoSwitch = __webpack_require__(10);

var _KendoSwitch2 = _interopRequireDefault(_KendoSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KendoInputsInstaller = function () {
    function KendoInputsInstaller() {
        _classCallCheck(this, KendoInputsInstaller);
    }

    _createClass(KendoInputsInstaller, null, [{
        key: 'install',
        value: function install(Vue) {
            Vue.component(_KendoNumericTextBox2.default.name, _KendoNumericTextBox2.default);
            Vue.component(_KendoColorPicker2.default.name, _KendoColorPicker2.default);
            Vue.component(_KendoColorPalette2.default.name, _KendoColorPalette2.default);
            Vue.component(_KendoFlatColorPicker2.default.name, _KendoFlatColorPicker2.default);
            Vue.component(_KendoMaskedTextBox2.default.name, _KendoMaskedTextBox2.default);
            Vue.component(_KendoSlider2.default.name, _KendoSlider2.default);
            Vue.component(_KendoRangeSlider2.default.name, _KendoRangeSlider2.default);
            Vue.component(_KendoSwitch2.default.name, _KendoSwitch2.default);
        }
    }]);

    return KendoInputsInstaller;
}();

exports.default = KendoInputsInstaller;

// Automatic installation if Vue has been added to the global scope.

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(KendoInputsInstaller);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _NumericTextBoxProps = __webpack_require__(19);

var _NumericTextBoxProps2 = _interopRequireDefault(_NumericTextBoxProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _NumericTextBoxProps2.default,
    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _kendoBaseComponentsVueWrapper.KendoBaseInputComponent],
    mounted: function mounted() {
        var that = this;
        kendo.jQuery(that.$el).kendoNumericTextBox(that.widgetOptions);

        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });

        that.kendoWidget().bind('spin', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoNumericTextBox();
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(15);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
    props: {
        disabled: Boolean,
        readonly: Boolean
    },
    render: function render(h) {
        return h('div');
    },
    created: function created() {
        this.resolveWidgetOptions();
        this.$_nativeTemplates = [];
        this.$on('kendowidgetready', this.ready);
    },
    beforeDestroy: function beforeDestroy() {
        if (this.kendoWidget() && this.kendoWidget().destroy) {
            this.kendoWidget().destroy();
            if (this.$_nativeTemplates.length) {
                for (var i = 0; i < this.$_nativeTemplates.length; i++) {
                    this.$_nativeTemplates[i].$destroy();
                }
            }
        }
    },
    mounted: function mounted() {
        if (this.$el.classList.length > 0) {
            this.nativeClasses = [].concat(_toConsumableArray(this.$el.classList));
        } else {
            this.nativeClasses = [];
        }

        for (var key in this.$options.propsData) {
            var that = this;

            if (key.toLowerCase().indexOf('template') !== -1) {
                var isFunction = this.widgetOptions[key] instanceof Function;

                if (isFunction) {
                    this.widgetOptions[key] = this.transformTemplate(key);
                }
            }

            if (key === 'value') {
                that.$watch(key, function (newValue) {
                    that.changeValue(newValue);
                });
            } else if (key === 'disabled') {
                that.$watch(key, function (newValue) {
                    that.makeDisabled(newValue);
                });
            } else if (key === 'readonly') {
                that.$watch(key, function (newValue) {
                    that.makeReadonly(newValue);
                });
            } else {
                that.$watch(key, function (newValue, oldValue) {
                    // Vue always dispatches a change when inline complex objects are bound
                    // https://github.com/telerik/kendo-ui-core/issues/3952
                    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                        that.updateWidget();
                    }
                });
            }
        }
    },

    watch: {
        $attrs: function $attrs() {
            this.toggleClasses();
        }
    },
    methods: {
        toggleClasses: function toggleClasses() {
            var that = this;
            var $element = kendo.jQuery(that.$el);
            var $wrapper = that.kendoWidget().wrapper;

            if ($wrapper && $wrapper[0] !== $element[0]) {
                that.nativeClasses.forEach(function (item) {
                    $wrapper.removeClass(item);
                });

                // Add to wrapper only the custom classes without the default Kendo ones
                if (that.kendoClasses) {
                    that.nativeClasses = [].concat(_toConsumableArray(that.$el.classList)).filter(function (item) {
                        return that.kendoClasses.indexOf(item) < 0;
                    });
                } else {
                    that.nativeClasses = [].concat(_toConsumableArray(that.$el.classList));
                }

                that.nativeClasses.forEach(function (item) {
                    $wrapper.addClass(item);
                });
            }

            if (that.kendoClasses) {
                that.kendoClasses.forEach(function (item) {
                    $element.addClass(item);
                });
            }
        },
        updateWidget: function updateWidget() {
            var that = this;

            that.resolveWidgetOptions();

            if (that._resolveChildren) {
                that._resolveChildren();
            }

            if (that.kendoWidget().setOptions) {
                that.kendoWidget().setOptions(that.widgetOptions);
            }
        },

        transformTemplate: function transformTemplate(key, val) {
            var that = this;
            var object;
            var templateDefinition = val || that.$options.propsData[key];
            try {
                object = templateDefinition.call(that, {});
            } catch (e) {
                return templateDefinition;
            }

            if (!object.template) {
                return templateDefinition;
            }

            return function () {
                object = templateDefinition.apply(this, arguments);
                var vueObject = new _vue2.default(object.template);
                vueObject.$data.templateArgs = object.templateArgs;

                var kendoguid = 'kendo' + kendo.guid();

                that.$nextTick(function () {
                    if (document.getElementById(kendoguid)) {
                        vueObject.$mount('#' + kendoguid);
                        that.$_nativeTemplates.push(vueObject);
                    }
                });

                return '<div id="' + kendoguid + '"></div>';
            };
        },
        resolveChildren: function resolveChildren(prop, name) {
            if (!this.widgetOptions[prop] && this.$slots.default) {
                var items = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.$slots.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var childSlot = _step.value;

                        if (childSlot.tag && childSlot.tag.indexOf(name) !== -1) {
                            var itemOptions = this.parseOptions(childSlot.componentInstance);

                            if (itemOptions.dataSourceRef) {
                                this.setInnerDataSource('dataSourceRef', 'dataSource', itemOptions);
                            }

                            items.push(itemOptions);
                            this.handleWatcher(childSlot.componentInstance);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (items.length) {
                    this.widgetOptions[prop] = items;
                }
            }
        },
        handleWatcher: function handleWatcher(childInstance) {
            var that = this;
            childInstance.stashedPropsData = JSON.stringify(childInstance.$options.propsData);

            if (!childInstance._isWatchAttached) {
                childInstance.$watch('$props', function () {
                    var propsAsJson = JSON.stringify(childInstance.$options.propsData);
                    var needsUpdate = childInstance.stashedPropsData !== propsAsJson;

                    if (that.updateWidget && needsUpdate) {
                        that.updateWidget();
                    } else if (that._resolveInnerChildren) {
                        that._resolveInnerChildren();
                    }

                    childInstance.stashedPropsData = propsAsJson;
                }, { deep: true });

                childInstance._isWatchAttached = true;
            }
        },
        makeDisabled: function makeDisabled(toDisable) {
            if (this.kendoWidget().enable) {
                this.kendoWidget().enable(!toDisable);
            }
        },
        makeReadonly: function makeReadonly(value) {
            if (this.kendoWidget().readonly) {
                this.kendoWidget().readonly(value);
            }
        },
        changeValue: function changeValue(newValue) {
            if (this.kendoWidget().value) {
                this.kendoWidget().value(newValue);
            }
        },
        resolveWidgetOptions: function resolveWidgetOptions() {
            this.widgetOptions = this.parseOptions();
        },
        parseOptions: function parseOptions(component) {
            var that = component || this;
            var options = {};
            for (var key in that.$options.propsData) {
                var propOptions = that.$options.props[key];
                var val = that.$options.propsData[key];

                var compositeProps = propOptions.kComposite;

                if (!compositeProps) {
                    if (key.toLowerCase().indexOf('template') !== -1 && val instanceof Function) {
                        options[key] = this.transformTemplate(key, val);
                    } else {
                        options[key] = val;
                    }
                } else {
                    this.addCompositeProperty(options, compositeProps.split('.'), that.$props[key]);
                }
            }

            Object.keys(that.$props).forEach(function (event) {
                if (that.$listeners && that.$listeners[event.toLowerCase()]) {
                    var kendoIndex = event.lastIndexOf('kendo');
                    var kendoEvent;
                    if (kendoIndex !== -1) {
                        kendoEvent = event.replace('kendo', '').toLowerCase();
                    }

                    options[kendoEvent || event] = that.$listeners[event.toLowerCase()];
                }
            });

            return options;
        },
        addCompositeProperty: function addCompositeProperty(obj, keys, val) {
            var lastKey = keys.pop();
            var lastObj = keys.reduce(function (obj, key) {
                obj[key] = _typeof(obj[key]) === 'object' ? obj[key] || {} : {};
                return obj[key];
            }, obj);

            if (lastKey.toLowerCase().indexOf('template') !== -1 && val instanceof Function) {
                lastObj[lastKey] = this.transformTemplate(lastKey, val);
            } else {
                lastObj[lastKey] = val;
            }
        },
        ready: function ready() {
            var that = this;

            if (this.$el.classList.length > 0) {
                that.kendoClasses = [].concat(_toConsumableArray(that.$el.classList)).filter(function (item) {
                    return that.nativeClasses.indexOf(item) < 0;
                });
            }

            if (that.$options.propsData && that.$options.propsData.disabled) {
                that.makeDisabled(true);
            }

            if (that.$options.propsData && that.$options.propsData.readonly) {
                that.makeReadonly(true);
            }
        }
    }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        dataSourceRef: String
    },
    render: function render(h) {
        return h('div');
    },

    methods: {
        findDataSource: function findDataSource() {
            var dataSource;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var a = _step.value;

                    if (this.$children.length && a.kendoDataSource) {
                        dataSource = a.kendoDataSource;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return dataSource;
        },
        setInnerDataSource: function setInnerDataSource() {
            var dataSourceRefProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dataSourceRef';
            var rootProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataSource';
            var subProp = arguments[2];

            var innerDataSource = this.findDataSource();

            if (innerDataSource) {
                if (!subProp) {
                    this.widgetOptions[rootProp] = innerDataSource;
                } else {
                    subProp[rootProp] = innerDataSource;
                }
            } else {
                var refString = subProp ? subProp[dataSourceRefProp] : this[dataSourceRefProp];
                var referredDataSource = this.getParentsRef(refString);

                if (referredDataSource) {
                    this.attachEvents(referredDataSource);
                    if (!subProp) {
                        this.widgetOptions[rootProp] = referredDataSource.kendoDataSource;
                    } else {
                        subProp[rootProp] = referredDataSource.kendoDataSource;
                    }
                }
            }
        },
        getParentsRef: function getParentsRef(anchor) {
            var parent = this.$parent;

            while (parent && !parent.$refs[anchor]) {
                parent = parent.$parent;
            }

            return parent ? parent.$refs[anchor] : undefined;
        },
        setDataSource: function setDataSource(newValue) {
            var newDataSourceRef = this.getParentsRef(newValue);
            var kendoWidget = this.kendoWidget();

            if (kendoWidget.setDataSource && newDataSourceRef) {
                kendoWidget.setDataSource(newDataSourceRef.kendoDataSource);
            } else if (kendoWidget.setDataSource) {
                kendoWidget.setDataSource(newValue);
            }
        },
        attachEvents: function attachEvents(referredDataSource) {
            if (referredDataSource.kendoDataSource) {
                referredDataSource.kendoDataSource.bind('change', function (ev) {
                    referredDataSource.$emit('change', ev);
                });

                referredDataSource.kendoDataSource.bind('error', function (ev) {
                    referredDataSource.$emit('error', ev);
                });

                referredDataSource.kendoDataSource.bind('push', function (ev) {
                    referredDataSource.$emit('push', ev);
                });

                referredDataSource.kendoDataSource.bind('requestEnd', function (ev) {
                    referredDataSource.$emit('requestend', ev);
                });

                referredDataSource.kendoDataSource.bind('requestStart', function (ev) {
                    referredDataSource.$emit('requeststart', ev);
                });

                referredDataSource.kendoDataSource.bind('sync', function (ev) {
                    referredDataSource.$emit('sync', ev);
                });
            }
        }
    },
    mounted: function mounted() {
        var that = this;

        that.$watch('dataSourceRef', function (newValue) {
            that.setDataSource(newValue);
        });
        that.$watch('dataSource', function (newValue) {
            that.setDataSource(newValue);
        });

        that.setInnerDataSource();
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    render: function render(h) {
        return h('input', {
            ref: 'valueInput',
            props: {
                value: this.value
            }
        });
    },

    model: {
        event: 'changemodel'
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    methods: {
        resolveInnerTags: function resolveInnerTags(tagName) {
            var items = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.$slots.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var childSlot = _step.value;

                    if (childSlot.tag && childSlot.tag.indexOf(tagName) !== -1) {
                        var childOptions = childSlot.componentOptions;
                        var item = childOptions.propsData;

                        if (!childOptions.propsData.items) {
                            item.items = childSlot.componentInstance.subitems;
                        }

                        items.push(item);
                        this.handleWatcher(childSlot.componentInstance);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return items;
        },
        handleWatcher: function handleWatcher(childInstance) {
            var that = this;

            if (!childInstance._isWatchAttached) {
                childInstance.$watch('$props', function () {
                    if (that.updateWidget) {
                        that.updateWidget();
                    } else if (that._resolveInnerChildren) {
                        that._resolveInnerChildren();
                    }
                }, { deep: true });

                childInstance._isWatchAttached = true;
            }
        }
    }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    culture: String,
    decimals: Number,
    downArrowText: String,
    factor: Number,
    format: String,
    max: Number,
    min: Number,
    placeholder: String,
    restrictDecimals: Boolean,
    round: Boolean,
    spinners: Boolean,
    step: Number,
    upArrowText: String,
    value: Number,

    // Events
    change: Function,
    spin: Function
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _ColorPickerProps = __webpack_require__(21);

var _ColorPickerProps2 = _interopRequireDefault(_ColorPickerProps);

var _Messages = __webpack_require__(22);

var _Messages2 = _interopRequireDefault(_Messages);

var _TileSize = __webpack_require__(3);

var _TileSize2 = _interopRequireDefault(_TileSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _ColorPickerProps2.default,
    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _kendoBaseComponentsVueWrapper.KendoBaseInputComponent, _Messages2.default, _TileSize2.default],
    mounted: function mounted() {
        var that = this;
        kendo.jQuery(that.$el).kendoColorPicker(that.widgetOptions);

        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoColorPicker();
        }
    }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    buttons: Boolean,
    clearButton: Boolean,
    columns: Number,
    tileSize: Number | Object,
    messages: Object,
    palette: String | Array,
    opacity: Boolean,
    preview: Boolean,
    toolIcon: String,
    value: String,

    // Events
    change: Function,
    select: Function,
    open: Function,
    close: Function
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        messagesApply: {
            type: String,
            kComposite: 'messages.apply'
        },
        messagesCancel: {
            type: String,
            kComposite: 'messages.cancel'
        },
        messagesPreviewInput: {
            type: String,
            kComposite: 'messages.previewInput'
        }
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _ColorPaletteProps = __webpack_require__(24);

var _ColorPaletteProps2 = _interopRequireDefault(_ColorPaletteProps);

var _TileSize = __webpack_require__(3);

var _TileSize2 = _interopRequireDefault(_TileSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _ColorPaletteProps2.default,
    render: function render(h) {
        return h('div');
    },

    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _TileSize2.default],
    mounted: function mounted() {
        kendo.jQuery(this.$el).kendoColorPalette(this.widgetOptions);

        this.$emit('kendowidgetready', this.kendoWidget());
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoColorPalette();
        }
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    palette: String | Array,
    columns: Number,
    tileSize: Number | Object,
    value: String,

    // Events
    change: Function
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _FlatColorPickerProps = __webpack_require__(26);

var _FlatColorPickerProps2 = _interopRequireDefault(_FlatColorPickerProps);

var _Messages = __webpack_require__(27);

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _FlatColorPickerProps2.default,
    render: function render(h) {
        return h('div');
    },

    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _Messages2.default],
    mounted: function mounted() {
        kendo.jQuery(this.$el).kendoFlatColorPicker(this.widgetOptions);

        this.$emit('kendowidgetready', this.kendoWidget());
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoFlatColorPicker();
        }
    }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    opacity: Boolean,
    buttons: Boolean,
    value: String,
    preview: Boolean,
    autoupdate: Boolean,
    messages: Object,

    // Events
    change: Function
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        messagesApply: {
            type: String,
            kComposite: 'messages.apply'
        },
        messagesCancel: {
            type: String,
            kComposite: 'messages.cancel'
        }
    }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _MaskedTextBoxProps = __webpack_require__(29);

var _MaskedTextBoxProps2 = _interopRequireDefault(_MaskedTextBoxProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _MaskedTextBoxProps2.default,
    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _kendoBaseComponentsVueWrapper.KendoBaseInputComponent],
    mounted: function mounted() {
        var that = this;
        kendo.jQuery(that.$el).kendoMaskedTextBox(that.widgetOptions);

        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoMaskedTextBox();
        }
    }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    clearPromptChar: Boolean,
    culture: String,
    mask: String,
    promptChar: String,
    rules: Object,
    unmaskOnPost: Boolean,
    value: String,

    // Events
    change: Function
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _SliderProps = __webpack_require__(31);

var _SliderProps2 = _interopRequireDefault(_SliderProps);

var _Tooltip = __webpack_require__(8);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _SliderProps2.default,
    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _kendoBaseComponentsVueWrapper.KendoBaseInputComponent, _Tooltip2.default],
    mounted: function mounted() {
        var that = this;
        kendo.jQuery(that.$el).kendoSlider(that.widgetOptions);

        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });

        that.kendoWidget().bind('slide', function () {
            that.$emit('changemodel', that.$refs.valueInput.value);
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoSlider();
        }
    }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    decreaseButtonTitle: String,
    dragHandleTitle: String,
    increaseButtonTitle: String,
    largeStep: Number,
    max: Number,
    min: Number,
    orientation: String,
    showButtons: Boolean,
    smallStep: Number,
    tickPlacement: String,
    tooltip: Object,
    value: String | Number,

    // Events
    change: Function,
    slide: Function
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _RangeSliderProps = __webpack_require__(33);

var _RangeSliderProps2 = _interopRequireDefault(_RangeSliderProps);

var _Tooltip = __webpack_require__(8);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: _RangeSliderProps2.default,
    render: function render(h) {
        return h('div', [h('input', {
            props: {
                name: this.selectionStartName
            }
        }), h('input', {
            props: {
                name: this.selectionEndName
            }
        })]);
    },

    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _kendoBaseComponentsVueWrapper.KendoBaseInputComponent, _Tooltip2.default],
    mounted: function mounted() {
        var that = this;
        kendo.jQuery(that.$el).kendoRangeSlider(that.widgetOptions);

        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.kendoWidget().value());
        });

        that.kendoWidget().bind('slide', function () {
            that.$emit('changemodel', that.kendoWidget().value());
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoRangeSlider();
        }
    },
    computed: {
        nameAttr: function nameAttr() {
            return this.$attrs.name;
        },
        selectionStartName: function selectionStartName() {
            var nameAttr = this.nameAttr;
            return nameAttr ? nameAttr + '[0]' : null;
        },
        selectionEndName: function selectionEndName() {
            var nameAttr = this.nameAttr;
            return nameAttr ? nameAttr + '[1]' : null;
        }
    }
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    largeStep: Number,
    leftDragHandleTitle: String,
    max: Number,
    min: Number,
    orientation: String,
    rightDragHandleTitle: String,
    selectionEnd: Number,
    selectionStart: Number,
    smallStep: Number,
    tickPlacement: String,
    tooltip: Object,
    value: Array,

    // Events
    change: Function,
    slide: Function
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kendoBaseComponentsVueWrapper = __webpack_require__(0);

var _SwitchProps = __webpack_require__(35);

var _SwitchProps2 = _interopRequireDefault(_SwitchProps);

var _ObsoleteSwitchProps = __webpack_require__(36);

var _ObsoleteSwitchProps2 = _interopRequireDefault(_ObsoleteSwitchProps);

var _Messages = __webpack_require__(37);

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: Object.assign({}, _SwitchProps2.default, _ObsoleteSwitchProps2.default),
    render: function render(h) {
        return h('input', {
            attrs: {
                type: 'checkbox'
            }
        });
    },

    mixins: [_kendoBaseComponentsVueWrapper.KendoBaseComponent, _Messages2.default],
    mounted: function mounted() {
        var that = this;

        that.widgetOptions.messages = that.widgetOptions.messages || {};

        // Obsolete props
        if (that.widgetOptions.onLabel) {
            that.widgetOptions.messages.checked = that.widgetOptions.onLabel;
        }

        if (that.widgetOptions.offLabel) {
            that.widgetOptions.messages.unchecked = that.widgetOptions.offLabel;
        }

        if (that.widgetOptions.enable == false) {
            that.widgetOptions.enabled = that.widgetOptions.enable;
        }

        kendo.jQuery(that.$el).kendoSwitch(that.widgetOptions);

        that.$_kendoSwitch = that.kendoWidget();
        that.$emit('kendowidgetready', that.kendoWidget());

        that.kendoWidget().bind('change', function () {
            that.$emit('changemodel', that.kendoWidget().check());
        });
    },

    methods: {
        kendoWidget: function kendoWidget() {
            return kendo.jQuery(this.$el).getKendoSwitch();
        }
    },
    destroyed: function destroyed() {
        var switchInstance = this.kendoWidget() || this.$_kendoSwitch;
        switchInstance.destroy();
        switchInstance.wrapper.remove();
    },

    watch: {
        checked: function checked(value) {
            var kWidget = this.kendoWidget();

            if (value != kWidget.check()) {
                kWidget.check(value);
            }
        }
    },
    model: {
        event: 'changemodel',
        prop: 'checked'
    }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    checked: Boolean,
    enabled: Boolean,
    readonly: Boolean,
    messages: Object,
    width: Number | String,

    // Events
    change: Function
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    enable: Boolean,
    onLabel: String,
    offLabel: String
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        messagesChecked: {
            type: String,
            kComposite: 'messages.checked'
        },
        messagesUnchecked: {
            type: String,
            kComposite: 'messages.unchecked'
        }
    }
};

/***/ })
/******/ ]);
});
//