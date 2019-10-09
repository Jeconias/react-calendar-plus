var CalendarJS =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/calendar/CalendarJS.ts":
/*!************************************!*\
  !*** ./src/calendar/CalendarJS.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ \"./src/calendar/Utils.ts\");\n\n\nconst CalendarJS = () => {\n  let _instance = null;\n\n  let _bodyToRender;\n\n  let _calendarContainer;\n\n  let _areaTouches = {\n    clientX: 0,\n    clientY: 0\n  };\n\n  const Main = function (container) {\n    const el = document.getElementById(\"content\");\n    /**\n     * Check if the year is leap\n     */\n\n    const leap = () => {\n      return container.localDate.currentYear % 100 !== 0 && container.localDate.currentYear % 4 === 0;\n    };\n    /**\n     * Return first day of month\n     */\n\n\n    const firstDayMonth = () => {\n      const firstDayMonth = new Date(container.localDate.currentYear, container.localDate.currentMonth, 1);\n      return firstDayMonth.getDay();\n    };\n    /**\n     * when month is equal to 0, return to 11 and return a year\n     */\n\n\n    const lastMonth = () => {\n      if (container.localDate.currentMonth != 0) {\n        container.localDate.currentMonth--;\n      } else {\n        container.localDate.currentMonth = 11;\n        container.localDate.currentYear--;\n      }\n\n      newDate();\n    }; // when month is 11, return to 0 and advance one year\n\n\n    const nextMonth = () => {\n      if (container.localDate.currentMonth != 11) {\n        container.localDate.currentMonth++;\n      } else {\n        container.localDate.currentMonth = 0;\n        container.localDate.currentYear++;\n      }\n\n      newDate();\n    };\n    /**\n     *\n     * ###### METHODS PUBLIC ######\n     *\n     */\n\n\n    const loadContainer = target => {\n      selectHTMLDocumentTag(target).then(data => {\n        if (data.length > 0) {\n          _calendarContainer = data[0];\n        }\n      }).catch(e => {\n        Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e);\n      });\n      return methodsPublic;\n    };\n\n    const loadData = data => {\n      selectHTMLDocumentTag(container.tags.classes.calendarBody).then(data => {\n        console.log(data);\n      }).catch(e => {\n        console.log(e);\n      });\n      return methodsPublic;\n    };\n\n    const loadLang = () => {\n      Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Load Lang\");\n      return methodsPublic;\n    };\n\n    const loadTheme = () => {\n      Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Load Theme\");\n      return methodsPublic;\n    }; // Set new date\n\n    /*const newDate = (): void => {\n      container.localDate.currentDate.setFullYear(\n        container.localDate.currentYear,\n        container.localDate.currentMonth,\n        container.localDate.currentDay\n      );\n       renderBody();\n       let nodeList: NodeList | boolean = selectHTMLDocumentTag(\n        container.tags.ids.calendarHeaderMonth\n      );\n      if (nodeList === false) {\n        writeConsole(\"Erro ao selecionar headr html document.\");\n        return;\n      }\n      nodeList = selectHTMLDocumentTag(container.tags.ids.calendarHeaderYear);\n       if (nodeList === false) {\n        writeConsole(\"Erro ao selecionar headr html document.\");\n        return;\n      }\n      changeValueHTMLDocumentTag(\n        container.lang.months[container.localDate.currentMonth],\n        nodeList\n      );\n       changeValueHTMLDocumentTag(this.container.global.currentYear, nodeList);\n       // Load events\n      addCalendarEvent();\n       const selHiddenDayEvents: HTMLDocument = selectHTMLDocumentTag(\n        container.tags.ids.hiddenDayEvents\n      );\n      if (!!selHiddenDayEvents === false) {\n        console.log(\"ext here\");\n        return;\n      }\n      addEventInHTMLDocumentTag(selHiddenDayEvents, \"click\", hiddenDayEvents);\n    };*/\n\n\n    const renderBody = () => {\n      const totalDaysInt = totalDays();\n      const totalDaysIntLastMonth = totalDays(container.localDate.currentMonth - 1);\n      const totalDaysNextMonth = 42 - (firstDayMonth() + totalDaysInt);\n      const today = new Date();\n      let renderStr = \"\";\n      let appendChild = true;\n\n      for (let i = firstDayMonth(); i > 0; i--) {\n        renderStr += `<span data-date=\"${totalDaysIntLastMonth - (i - 1) + \"-\" + (container.localDate.currentMonth - 1)}-${container.localDate.currentYear}\" class=\"calendarLastAndNextMonth\">${totalDaysIntLastMonth - (i - 1)}</span>`;\n      }\n\n      for (let i = 1; i <= totalDaysInt; i++) {\n        renderStr += i == container.localDate.currentDay && container.localDate.currentMonth === today.getMonth() && container.localDate.currentYear === today.getFullYear() ? `<span data-date=\"${i}-${container.localDate.currentMonth}-${container.localDate.currentYear}\" class=\"calendarToday\"><span title=\"Hoje\">${i}</span></span>` : `<span data-date=\"${i}-${container.localDate.currentMonth}-${container.localDate.currentYear}\">${i}</span>`;\n      }\n\n      for (let i = 1; i <= totalDaysNextMonth; i++) {\n        renderStr += `<span data-date=\"${i}-${container.localDate.currentMonth + 1}-${container.localDate.currentYear}\" class=\"calendarLastAndNextMonth\">${i}</span>`;\n      }\n\n      let body = document.createElement(\"div\");\n      body.className = container.tags.classes.calendarBody.substring(1);\n      body.innerHTML = renderStr; //body.appendChild(renderEventsDetails());\n      //body.appendChild(renderSettings());\n\n      _bodyToRender[0].appendChild(body);\n    }; // Total days of month\n\n\n    const totalDays = (currentMonth = 0) => {\n      currentMonth = currentMonth === 0 ? container.localDate.currentMonth : currentMonth;\n      if (currentMonth == -1) currentMonth = 11;\n\n      if (currentMonth == 0 || currentMonth == 2 || currentMonth == 4 || currentMonth == 6 || currentMonth == 7 || currentMonth == 9 || currentMonth == 11) {\n        return 31;\n      } else if (currentMonth == 3 || currentMonth == 5 || currentMonth == 8 || currentMonth == 10) {\n        return 30;\n      } else {\n        return leap() ? 29 : 28;\n      }\n    };\n\n    const methodsPublic = {\n      container: loadContainer,\n      data: loadData,\n      lang: loadLang,\n      theme: loadTheme\n    };\n    return methodsPublic;\n  };\n\n  const addEventInHTMLDocumentTag = (select, type, funct) => {\n    Array.prototype.forEach.call(select, element => {\n      element.addEventListener(type, funct, false);\n    });\n  }; // ALTERAR VALORES DAS TAGS\n\n\n  const changeValueHTMLDocumentTag = (value, sel) => {\n    Array.prototype.forEach.call(sel, element => {\n      element.innerHTML = value;\n    });\n  }; // SELECIONAR TAGS\n\n\n  const selectHTMLDocumentTag = selector => {\n    return new Promise((resolve, reject) => {\n      if (selector === \"\" || selector === null) {\n        Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Error -> Enter the selector in the SELECTOR method.\");\n        return reject(false);\n      }\n\n      const nodeList = document.querySelectorAll(selector);\n      resolve(nodeList);\n    });\n  };\n\n  const hiddenDayEvents = () => {\n    console.log(\"resolve\"); //selectHTMLDocumentTag(container.tags.ids.eventDetails)\n    //this.selected[0].style.transform = \"translateX(-100%)\";\n  };\n\n  const start = () => {\n    Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Loading...\");\n    let localDate = new Date();\n    const container = {\n      localDate: {\n        currentDate: localDate,\n        currentYear: localDate.getFullYear(),\n        currentMonth: localDate.getMonth(),\n        currentDay: localDate.getDate()\n      },\n      lang: {\n        daysWeek: [],\n        months: []\n      },\n      tags: {\n        ids: {\n          eventDetails: \"#eventDetails\",\n          calendarHeaderYear: \"#calendarHeaderYear\",\n          calendarHeaderMonth: \"#calendarHeaderMonth\",\n          hiddenDayEvents: \"#hiddenDayEvents\"\n        },\n        classes: {\n          eventDetails: \".eventDetails\",\n          calendarEvent: \".calendarEvent\",\n          calendarBody: \".calendarBody\",\n          calendarActionBefore: \".calendarActionBefore\",\n          calendarActionAfter: \".calendarActionAfter\"\n        }\n      },\n      settings: {\n        show: false,\n        language: {\n          active: \"enUS\",\n          available: [\"deDE\", \"enUS\", \"esUS\", \"filFIL\", \"idID\", \"inHI\", \"jaJP\", \"koKR\", \"myMY\", \"plPL\", \"ptBR\", \"ruRU\", \"srRS\", \"zhCN\"]\n        },\n        theme: {\n          active: \"Default\",\n          available: [\"Default\", \"Night\", \"Royale\"]\n        }\n      }\n    };\n    Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"gitHub -> jeconias/calendarjs\");\n    Object(_Utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"Finished.\");\n    return Main(container);\n  };\n\n  return (() => {\n    if (!_instance) return _instance = start();\n    return _instance;\n  })();\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CalendarJS);\n\n//# sourceURL=webpack://CalendarJS/./src/calendar/CalendarJS.ts?");

/***/ }),

/***/ "./src/calendar/Utils.ts":
/*!*******************************!*\
  !*** ./src/calendar/Utils.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst writeConsole = text => {\n  console.log(text);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (writeConsole);\n\n//# sourceURL=webpack://CalendarJS/./src/calendar/Utils.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./calendar/CalendarJS.ts */ \"./src/calendar/CalendarJS.ts\").default;\n\n//# sourceURL=webpack://CalendarJS/./src/index.ts?");

/***/ })

/******/ });