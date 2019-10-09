import {
  MethodsPublic,
  CalendarContainer,
  TouchesPosition,
  CalendarData
} from "./Types";
import writeConsole from "./Utils";
import { resolve } from "url";

const CalendarJS = (): any => {
  let _instance = null;
  let _bodyToRender: HTMLDocument;
  let _calendarContainer: Object;
  let _areaTouches: TouchesPosition = {
    clientX: 0,
    clientY: 0
  };

  const Main = function(container: CalendarContainer): MethodsPublic {
    const el: HTMLElement = document.getElementById("content");

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
      newDate();
    };

    // when month is 11, return to 0 and advance one year
    const nextMonth = (): void => {
      if (container.localDate.currentMonth != 11) {
        container.localDate.currentMonth++;
      } else {
        container.localDate.currentMonth = 0;
        container.localDate.currentYear++;
      }
      newDate();
    };

    /**
     *
     * ###### METHODS PUBLIC ######
     *
     */
    const loadContainer = (target: string): MethodsPublic => {
      selectHTMLDocumentTag(target)
        .then((data: NodeList) => {
          if (data.length > 0) {
            _calendarContainer = data[0];
          }
        })
        .catch(e => {
          writeConsole(e);
        });
      return methodsPublic;
    };

    const loadData = (data: CalendarData): MethodsPublic => {
      selectHTMLDocumentTag(container.tags.classes.calendarBody)
        .then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
      return methodsPublic;
    };

    const loadLang = (): MethodsPublic => {
      writeConsole("Load Lang");
      return methodsPublic;
    };
    const loadTheme = (): MethodsPublic => {
      writeConsole("Load Theme");
      return methodsPublic;
    };

    // Set new date
    /*const newDate = (): void => {
      container.localDate.currentDate.setFullYear(
        container.localDate.currentYear,
        container.localDate.currentMonth,
        container.localDate.currentDay
      );

      renderBody();

      let nodeList: NodeList | boolean = selectHTMLDocumentTag(
        container.tags.ids.calendarHeaderMonth
      );
      if (nodeList === false) {
        writeConsole("Erro ao selecionar headr html document.");
        return;
      }
      nodeList = selectHTMLDocumentTag(container.tags.ids.calendarHeaderYear);

      if (nodeList === false) {
        writeConsole("Erro ao selecionar headr html document.");
        return;
      }
      changeValueHTMLDocumentTag(
        container.lang.months[container.localDate.currentMonth],
        nodeList
      );

      changeValueHTMLDocumentTag(this.container.global.currentYear, nodeList);

      // Load events
      addCalendarEvent();

      const selHiddenDayEvents: HTMLDocument = selectHTMLDocumentTag(
        container.tags.ids.hiddenDayEvents
      );
      if (!!selHiddenDayEvents === false) {
        console.log("ext here");
        return;
      }
      addEventInHTMLDocumentTag(selHiddenDayEvents, "click", hiddenDayEvents);
    };*/

    const renderBody = (): void => {
      const totalDaysInt: number = totalDays();
      const totalDaysIntLastMonth: number = totalDays(
        container.localDate.currentMonth - 1
      );
      const totalDaysNextMonth: number = 42 - (firstDayMonth() + totalDaysInt);
      const today: Date = new Date();
      let renderStr: string = "";
      let appendChild: boolean = true;

      for (let i: number = firstDayMonth(); i > 0; i--) {
        renderStr += `<span data-date="${totalDaysIntLastMonth -
          (i - 1) +
          "-" +
          (container.localDate.currentMonth - 1)}-${
          container.localDate.currentYear
        }" class="calendarLastAndNextMonth">${totalDaysIntLastMonth -
          (i - 1)}</span>`;
      }

      for (let i: number = 1; i <= totalDaysInt; i++) {
        renderStr +=
          i == container.localDate.currentDay &&
          container.localDate.currentMonth === today.getMonth() &&
          container.localDate.currentYear === today.getFullYear()
            ? `<span data-date="${i}-${container.localDate.currentMonth}-${container.localDate.currentYear}" class="calendarToday"><span title="Hoje">${i}</span></span>`
            : `<span data-date="${i}-${container.localDate.currentMonth}-${container.localDate.currentYear}">${i}</span>`;
      }

      for (let i: number = 1; i <= totalDaysNextMonth; i++) {
        renderStr += `<span data-date="${i}-${container.localDate.currentMonth +
          1}-${
          container.localDate.currentYear
        }" class="calendarLastAndNextMonth">${i}</span>`;
      }

      let body: HTMLDivElement = document.createElement("div");
      body.className = container.tags.classes.calendarBody.substring(1);
      body.innerHTML = renderStr;
      //body.appendChild(renderEventsDetails());
      //body.appendChild(renderSettings());

      _bodyToRender[0].appendChild(body);
    };

    // Total days of month
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
      theme: loadTheme
    };

    return methodsPublic;
  };

  const addEventInHTMLDocumentTag = (
    select: HTMLDocument,
    type: string,
    funct: Function
  ) => {
    Array.prototype.forEach.call(select, element => {
      element.addEventListener(type, funct, false);
    });
  };

  // ALTERAR VALORES DAS TAGS
  const changeValueHTMLDocumentTag = (value: string, sel: NodeList): void => {
    Array.prototype.forEach.call(sel, element => {
      element.innerHTML = value;
    });
  };

  // SELECIONAR TAGS
  const selectHTMLDocumentTag = (selector: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (selector === "" || selector === null) {
        writeConsole("Error -> Enter the selector in the SELECTOR method.");
        return reject(false);
      }
      const nodeList: NodeList = document.querySelectorAll(selector);
      resolve(nodeList);
    });
  };

  const hiddenDayEvents = () => {
    console.log("resolve");
    //selectHTMLDocumentTag(container.tags.ids.eventDetails)
    //this.selected[0].style.transform = "translateX(-100%)";
  };

  const start = (): any => {
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
