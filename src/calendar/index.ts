import {
  MethodsPublic,
  CalendarContainer,
  TouchesPosition,
  CalendarData,
  Languages
} from "./types";
import writeConsole from "./util";
import { resolve } from "url";
import { spawn } from "child_process";

const CalendarJS = (): any => {
  let _instance = null;
  let _calendarContainer: HTMLDivElement;
  let _headerToRender: HTMLDivElement;
  let _bodyToRender: HTMLDivElement;
  let _boardToRender: HTMLDivElement;
  let _eventData: Map<string, CalendarData> = new Map<string, CalendarData>();
  let _randomNumber: number = 0;
  let _areaTouches: TouchesPosition = {
    clientX: 0,
    clientY: 0
  };

  const Main = function(container: CalendarContainer): MethodsPublic {
    /**
     * Check if the year is leap
     */
    const leap = (): boolean => {
      return (
        container.localDate.currentYear % 100 !== 0 &&
        container.localDate.currentYear % 4 === 0
      );
    };

    /**
     * Return first day of month
     */
    const firstDayMonth = (): number => {
      const firstDayMonth = new Date(
        container.localDate.currentYear,
        container.localDate.currentMonth,
        1
      );
      return firstDayMonth.getDay();
    };

    /**
     * when month is equal to 0, return to 11 and return a year
     */
    const lastMonth = (): void => {
      if (container.localDate.currentMonth != 0) {
        container.localDate.currentMonth--;
      } else {
        container.localDate.currentMonth = 11;
        container.localDate.currentYear--;
      }
      reloadDate();
    };

    // when month is 11, return to 0 and advance one year
    const nextMonth = (): void => {
      if (container.localDate.currentMonth != 11) {
        container.localDate.currentMonth++;
      } else {
        container.localDate.currentMonth = 0;
        container.localDate.currentYear++;
      }
      reloadDate();
    };

    /**
     *
     * Method public to set calendar container
     *
     * @param target
     */
    const loadContainer = (target: string): MethodsPublic | boolean => {
      if (target === "" || target.slice(0, 1) != "#") {
        writeConsole("Container method need ID to render. Ex: #calendar");
        return false;
      }
      const result: NodeList | boolean = selectHTMLDocumentTag(target);
      if (result === false) {
        writeConsole("Container not found to render calendar.");
        return false;
      }
      _calendarContainer = <HTMLDivElement>result[0];
      return methodsPublic;
    };

    const loadData = (data: CalendarData[]): MethodsPublic => {
      data.map(o => {
        const vDate: string[] = o.date.split("-");
        _eventData.set(`${vDate[0]}-${parseInt(vDate[1]) - 1}-${vDate[2]}`, o);
      });
      return methodsPublic;
    };

    /**
     *
     * Method public to set language
     *
     * @param lang
     */
    const loadLang = (lang: Languages = "enUS"): MethodsPublic => {
      if (lang !== "enUS") {
        try {
          const dataLang = require(`../languages/${lang}`);
          container.lang = dataLang;
          container.settings.language.active = lang;
          return methodsPublic;
        } catch (e) {
          console.log(e);
        }
      }

      container.lang = require("../languages/enUS");
      return methodsPublic;
    };

    /**
     * Method to change theme
     */
    const loadTheme = (): MethodsPublic => {
      writeConsole("Load Theme");
      return methodsPublic;
    };

    /**
     * Method to load action events
     */
    const loadEvents = (): void => {
      const previousArrow: NodeList | boolean = selectHTMLDocumentTag(
        container.tags.classes.calendarActionBefore
      );
      if (previousArrow === false) {
        writeConsole("Não foi possível registrar o evento para voltar um mês");
        return;
      }

      const nextArrow: NodeList | boolean = selectHTMLDocumentTag(
        container.tags.classes.calendarActionAfter
      );
      if (nextArrow === false) {
        writeConsole("Não foi possível registrar o evento para voltar um mês");
        return;
      }

      addEventInHTMLDocumentTag(previousArrow, "click", lastMonth);
      addEventInHTMLDocumentTag(nextArrow, "click", nextMonth);
    };

    /**
     * Method to reload calendar with action of arrows
     */
    const reloadDate = (): void => {
      container.localDate.currentDate.setFullYear(
        container.localDate.currentYear,
        container.localDate.currentMonth,
        container.localDate.currentDay
      );

      _bodyToRender = renderBody();
      _calendarContainer
        .querySelector(`.${_bodyToRender.getAttribute("class")}`)
        .remove();
      _calendarContainer.appendChild(_bodyToRender);

      const textMonth: NodeList | boolean = selectHTMLDocumentTag(
        container.tags.ids.calendarHeaderMonth
      );
      if (textMonth === false) {
        writeConsole("Erro ao selecionar text header html document.");
        return;
      }

      const textYear: NodeList | boolean = selectHTMLDocumentTag(
        container.tags.ids.calendarHeaderYear
      );

      if (textYear === false) {
        writeConsole("Erro ao selecionar yeha header html document.");
        return;
      }

      changeValueHTMLDocumentTag(
        container.lang.months[container.localDate.currentMonth],
        textMonth
      );
      changeValueHTMLDocumentTag(
        container.localDate.currentYear.toString(),
        textYear
      );
    };

    /**
     * To render header
     */
    const renderHeader = (): HTMLDivElement => {
      let header: HTMLDivElement = document.createElement("div");
      const renderStr: string = `\
      <div>\
        <div class="calendarActionBefore"><i></i></div>\
        <h1 id="calendarHeaderMonth">${
          container.lang.months[container.localDate.currentMonth]
        }</h1>\
        <span id="calendarHeaderYear">${container.localDate.currentYear}</span>\
        <div class="calendarActionAfter"><i></i></div>\
      </div>\
      <div class="calendarDaysWeek">\
        <ul>\
          <li>${container.lang.daysWeek[0]}</li>\
          <li>${container.lang.daysWeek[1]}</li>\
          <li>${container.lang.daysWeek[2]}</li>\
          <li>${container.lang.daysWeek[3]}</li>\
          <li>${container.lang.daysWeek[4]}</li>\
          <li>${container.lang.daysWeek[5]}</li>\
          <li>${container.lang.daysWeek[6]}</li>\
        </ul>\
      </div>`;
      header.className = container.tags.classes.calendarHeader.substring(1);
      header.innerHTML = renderStr;
      return header;
    };

    /**
     * To render body
     */
    const renderBody = (): HTMLDivElement => {
      const totalDaysInt: number = totalDays();
      const totalDaysIntLastMonth: number = totalDays(
        container.localDate.currentMonth - 1
      );
      const totalDaysNextMonth: number = 42 - (firstDayMonth() + totalDaysInt);
      const today: Date = new Date();
      let body: HTMLDivElement = document.createElement("div");
      let span: HTMLSpanElement;
      let childSpan: HTMLSpanElement = document.createElement("span");
      childSpan.setAttribute("title", "Hoje");

      for (let i: number = firstDayMonth(); i > 0; i--) {
        span = document.createElement("span");
        span.setAttribute(
          "data-date",
          `${totalDaysIntLastMonth - (i - 1)}-${container.localDate
            .currentMonth - 1}-${container.localDate.currentYear}`
        );

        span.classList.add("calendarLastAndNextMonth");
        span.innerHTML = `${totalDaysIntLastMonth - (i - 1)}`;

        loadPageInDate(span);

        body.appendChild(span);
      }

      for (let i: number = 1; i <= totalDaysInt; i++) {
        span = document.createElement("span");
        span.setAttribute(
          "data-date",
          `${i}-${container.localDate.currentMonth}-${container.localDate.currentYear}`
        );

        if (
          i == container.localDate.currentDay &&
          container.localDate.currentMonth === today.getMonth() &&
          container.localDate.currentYear === today.getFullYear()
        ) {
          childSpan.innerHTML = i.toString();
          span.classList.add("calendarToday");
          span.setAttribute("data-today", "true");
          span.appendChild(childSpan);
        } else {
          span.innerHTML = i.toString();
        }

        loadPageInDate(span);

        body.appendChild(span);
      }

      for (let i: number = 1; i <= totalDaysNextMonth; i++) {
        span = document.createElement("span");
        span.setAttribute(
          "data-date",
          `${i}-${container.localDate.currentMonth + 1}-${
            container.localDate.currentYear
          }`
        );

        span.classList.add("calendarLastAndNextMonth");
        span.innerHTML = i.toString();

        loadPageInDate(span);

        body.appendChild(span);
      }

      body.className = container.tags.classes.calendarBody.substring(1);
      return body;
    };

    /**
     * To render container events and settings
     */
    const renderBoard = (): HTMLDivElement => {
      let board: HTMLDivElement = document.createElement("div");
      const renderStr: string = `<div>\<span></span>\</div>`;
      board.className = container.tags.classes.eventDetails.substring(1);
      board.innerHTML = renderStr;
      return board;
    };

    const loadPageInDate = (current: HTMLSpanElement): void => {
      const date: string = current.getAttribute("data-date");
      if (_eventData.has(date)) {
        let nSpan: HTMLSpanElement = document.createElement("span");
        nSpan.innerHTML = date.slice(0, 2);
        current.classList.add("calendarEvent");
        current.innerHTML = "";
        current.setAttribute("data-id", "-1");
        // Add event in date
        current.addEventListener(
          "click",
          e => {
            if (
              _boardToRender === undefined ||
              _randomNumber !== parseInt(current.getAttribute("data-id"))
            ) {
              const hasBoard: boolean =
                <HTMLDivElement>_bodyToRender.lastChild === _boardToRender
                  ? true
                  : false;
              _randomNumber = Math.round(1 + Math.random() * (100 - 1));
              _boardToRender = showEventsDay(date);
              current.setAttribute("data-id", _randomNumber.toString());
              if (hasBoard === true) {
                _bodyToRender.lastChild.replaceWith(_boardToRender);
              } else {
                _bodyToRender.appendChild(_boardToRender);
              }
            }
          },
          false
        );
        current.append(nSpan);
      }
    };

    const showEventsDay = (date: string): HTMLDivElement => {
      const allEventsOfDay: HTMLUListElement = document.createElement("ul");
      _eventData.forEach((v, k) => {
        if (date === k) {
          const li: HTMLLIElement = document.createElement("li");
          const a: HTMLAnchorElement = document.createElement("a");
          li.appendChild(a);

          a.href = v.link !== "" || v.link !== undefined ? v.link : "#";
          a.innerHTML = `${v.name} - ${v.date}`;
          a.setAttribute("rel", "noopener noreferrer");

          allEventsOfDay.appendChild(li);
        }
      });
      const board: HTMLDivElement = renderBoard();
      board.appendChild(allEventsOfDay);
      return board;
    };

    /**
     *
     * Method for render header and body calendar
     *
     */
    const renderCalendar = (): void => {
      _headerToRender = renderHeader();
      _bodyToRender = renderBody();

      _calendarContainer.innerHTML = "";
      _calendarContainer.appendChild(_headerToRender);
      _calendarContainer.appendChild(_bodyToRender);

      loadEvents();
    };

    /**
     *
     * Method to return total days of month
     *
     * @param currentMonth
     */
    const totalDays = (currentMonth: number = 0): number => {
      currentMonth =
        currentMonth === 0 ? container.localDate.currentMonth : currentMonth;

      if (currentMonth == -1) currentMonth = 11;

      if (
        currentMonth == 0 ||
        currentMonth == 2 ||
        currentMonth == 4 ||
        currentMonth == 6 ||
        currentMonth == 7 ||
        currentMonth == 9 ||
        currentMonth == 11
      ) {
        return 31;
      } else if (
        currentMonth == 3 ||
        currentMonth == 5 ||
        currentMonth == 8 ||
        currentMonth == 10
      ) {
        return 30;
      } else {
        return leap() ? 29 : 28;
      }
    };

    const methodsPublic: MethodsPublic = {
      container: loadContainer,
      data: loadData,
      lang: loadLang,
      theme: loadTheme,
      render: renderCalendar
    };

    return methodsPublic;
  };

  /**
   *
   * Add event in HTML tag
   *
   * @param select NodeList
   * @param type string
   * @param funct Function
   */
  const addEventInHTMLDocumentTag = (
    select: NodeList,
    type: string,
    funct: Function
  ) => {
    Array.prototype.forEach.call(select, element => {
      element.addEventListener(type, funct, false);
    });
  };

  /**
   *
   * Change value of multiple tags
   *
   * @param value string
   * @param sel NodeList
   */
  const changeValueHTMLDocumentTag = (value: string, sel: NodeList): void => {
    Array.prototype.forEach.call(sel, element => {
      element.innerHTML = value;
    });
  };

  /**
   *
   * Select tag by id, class and type
   *
   * @param selector string
   */
  const selectHTMLDocumentTag = (selector: string): NodeList | false => {
    if (selector === "" || selector === null) {
      writeConsole("Error -> Enter the selector in the SELECTOR method.");
      return false;
    }
    return document.querySelectorAll(selector);
  };

  const hideEventsDay = () => {
    console.log("resolve");
    //selectHTMLDocumentTag(container.tags.ids.eventDetails)
    //this.selected[0].style.transform = "translateX(-100%)";
  };

  /**
   *
   * Method representing the constructor
   *
   */
  const start = (): MethodsPublic => {
    writeConsole("Loading...");

    let localDate = new Date();
    const container: CalendarContainer = {
      localDate: {
        currentDate: localDate,
        currentYear: localDate.getFullYear(),
        currentMonth: localDate.getMonth(),
        currentDay: localDate.getDate()
      },
      lang: {
        daysWeek: [],
        months: []
      },
      tags: {
        ids: {
          eventDetails: "#eventDetails",
          calendarHeaderYear: "#calendarHeaderYear",
          calendarHeaderMonth: "#calendarHeaderMonth",
          hiddenDayEvents: "#hiddenDayEvents"
        },
        classes: {
          eventDetails: ".eventDetails",
          calendarEvent: ".calendarEvent",
          calendarHeader: ".calendarHeader",
          calendarBody: ".calendarBody",
          calendarActionBefore: ".calendarActionBefore",
          calendarActionAfter: ".calendarActionAfter"
        }
      },
      settings: {
        show: false,
        language: {
          active: "enUS",
          available: [
            "deDE",
            "enUS",
            "esUS",
            "filFIL",
            "idID",
            "inHI",
            "jaJP",
            "koKR",
            "myMY",
            "plPL",
            "ptBR",
            "ruRU",
            "srRS",
            "zhCN"
          ]
        },
        theme: {
          active: "Default",
          available: ["Default", "Night", "Royale"]
        }
      }
    };
    writeConsole("gitHub -> jeconias/calendarjs");
    writeConsole("Finished.");
    return Main(container);
  };

  return (() => {
    if (!_instance) return (_instance = start());
    return _instance;
  })();
};

export default CalendarJS;
