(function(window, factory) {
  if (typeof exports === "object") {
    module.exports = factory(window);
  } else {
    window.CalendarJS = factory(window);
  }
})(window, function(window) {
  "use strict";
  let instance;
  const projectName = "Calendar";

  // Function main
  let Calendar = function(container) {
    this.container = container;
    this.selected = null;
    this.bodyToRender = null;
    this.eventsSave = null;
    this.areaTouches = {
      clientX: 0,
      clientY: 0
    };

    // Check if the year is leap
    const leap = () => {
      return (
        this.container.global.currentYear % 100 !== 0 &&
        this.container.global.currentYear % 4 === 0
      );
    };

    // Return first day of month
    const firstDayMonth = () => {
      const primeiroDiaMes = new Date(
        this.container.global.currentYear,
        this.container.global.currentMonth,
        1
      );
      return primeiroDiaMes.getDay();
    };

    // QUANDO O MES FOR IGUAL A 0, VOLTAR PARA 11 E RETROCEDER UM ANO
    const lastMonth = () => {
      if (this.container.global.currentMonth != 0) {
        this.container.global.currentMonth--;
      } else {
        this.container.global.currentMonth = 11;
        this.container.global.currentYear--;
      }
      newDate();
      return;
    };

    // QUADO O MES FOR IGUAL A 11, VOLTAR PARA 0 E AVANCAR UM ANO
    const nextMonth = () => {
      if (this.container.global.currentMonth != 11) {
        this.container.global.currentMonth++;
      } else {
        this.container.global.currentMonth = 0;
        this.container.global.currentYear++;
      }
      newDate();
      return;
    };

    // Total days of month
    const totalDays = (currentMonth = null) => {
      currentMonth =
        currentMonth === null
          ? this.container.global.currentMonth
          : currentMonth;

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

    // SETA UMA NOVA DATA
    const newDate = () => {
      this.container.global.currentDate.setFullYear(
        this.container.global.currentYear,
        this.container.global.currentMonth,
        this.container.global.currentDate
      );

      renderBody();

      selector(this.container.tags.ids.calendarHeaderMonth);
      newValueInTag(
        this.container.lang.months[this.container.global.currentMonth]
      );

      selector(this.container.tags.ids.calendarHeaderYear);
      newValueInTag(this.container.global.currentYear);

      // Load events
      addCalendarEvent();

      // RECARREGAR O EVENTO PARA FECHAR OS DETALHES
      eventNew(
        this.container.tags.ids.hiddenDayEvents,
        "click",
        hiddenDayEvents
      );
    };

    // SELECIONAR TAGS
    const selector = selector => {
      if (selector == "" || selector == null) {
        writeConsole("Error -> Enter the selector in the SELECTOR method.");
        return false;
      }
      this.selected = document.querySelectorAll(selector);
      return methodsPublic;
    };

    // ALTERAR VALORES DAS TAGS
    const newValueInTag = (newText, sel = null) => {
      let selected = sel == null ? this.selected : sel;
      Array.prototype.forEach.call(selected, function(element) {
        element.innerHTML = newText;
      });
      return methodsPublic;
    };

    // CAPTURAR PONTOS DE TOQUE
    const touchStart = event => {
      const touch = event.touches[0] || event.originalEvent.touches[0];

      this.areaTouches = {
        clientX: touch.clientX,
        clientY: touch.clientY
      };

      return;
    };

    // CAPTURAR MOVIMENTO
    const touchMove = event => {
      if (!this.areaTouches.clientX || !this.areaTouches.clientY) return;

      const clientX = event.targetTouches[0].clientX;
      const clientY = event.targetTouches[0].clientY;

      const diffX = this.areaTouches.clientX - clientX;
      const diffY = this.areaTouches.clientY - clientY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          lastMonth();
        } else {
          nextMonth();
        }
      }

      this.areaTouches = {
        clientX: 0,
        clientY: 0
      };

      return;
    };

    const saverCalendarContainer = target => {
      if (target == null || target == "" || target.substring(1, 0) != "#") {
        writeConsole("render needs a valid parameter. Ex: #calendarId");
        return false;
      }
      this.container.tags.ids.calendarContainer = target;
      return methodsPublic;
    };

    const renderContainer = () => {

      // INITIALLY CHANGE COLOR THEME
      changeColorTheme();

      // SELECIONAR O CONTAINER DO CALENDARIO
      selector(this.container.tags.ids.calendarContainer);

      // SALVAR O CONTAINER DO CALENDARIO
      this.bodyToRender = this.selected;

      // RENDERIZAR O CABEÇALHO
      newValueInTag(renderHeader());

      // RENDERIZAR O CORPO
      renderBody();

      // ADICIONAR OS EVENTOS
      eventNew(
        this.container.tags.classes.calendarActionBefore,
        "click",
        lastMonth
      );
      eventNew(
        this.container.tags.classes.calendarActionAfter,
        "click",
        nextMonth
      );
      eventNew(
        this.container.tags.ids.hiddenDayEvents,
        "click",
        hiddenDayEvents
      );
      eventNew(
        this.container.tags.classes.calendarBody,
        "touchstart",
        touchStart
      );
      eventNew(
        this.container.tags.classes.calendarBody,
        "touchmove",
        touchMove
      );
    };

    const renderHeader = () => {
      return `\
            <div class="calendarHeader">\
                <div>\
                    <div class="calendarActionBefore"><i></i></div>\
                    <h1 id="calendarHeaderMonth">${
                      this.container.lang.months[
                        this.container.global.currentMonth
                      ]
                    }</h1>\
                    <span id="calendarHeaderYear">${
                      this.container.global.currentYear
                    }</span>\
                    <div class="calendarActionAfter"><i></i></div>\
                </div>\
                <div class="calendarDaysWeek">\
                    <ul>\
                        <li>${this.container.lang.daysWeek[0]}</li>\
                        <li>${this.container.lang.daysWeek[1]}</li>\
                        <li>${this.container.lang.daysWeek[2]}</li>\
                        <li>${this.container.lang.daysWeek[3]}</li>\
                        <li>${this.container.lang.daysWeek[4]}</li>\
                        <li>${this.container.lang.daysWeek[5]}</li>\
                        <li>${this.container.lang.daysWeek[6]}</li>\
                    </ul>\
                </div>\
            </div>`;
    };

    const renderEventsDetails = () => {
      let eventsContainer = document.createElement("div");
      let buttonContainer = document.createElement("div");
      let buttonEventsDetails = document.createElement("span");

      buttonEventsDetails.id = this.container.tags.ids.hiddenDayEvents.substring(
        1
      );
      buttonContainer.appendChild(buttonEventsDetails);

      eventsContainer.className = this.container.tags.classes.eventDetails.substring(
        1
      );
      eventsContainer.id = this.container.tags.ids.eventDetails.substring(1);
      eventsContainer.appendChild(buttonContainer);
      eventsContainer.appendChild(document.createElement("ul"));

      return eventsContainer;
    };

    const renderSettings = () => {
      const settings = this.container.settings;

      const settingsButton = document.createElement("div");
      settingsButton.id = "settingsButton";
      if (settings.show) {
        document.getElementById("calendar").appendChild(settingsButton);
      }

      const settingsContainer = document.createElement("div");
      settingsContainer.id = "settingsContainer";

      const settingsHeaderContainer = document.createElement("div");

      const backButton = document.createElement("span");
      backButton.className = "backButton";

      const settingsHeaderTitle = document.createElement("span");
      settingsHeaderTitle.innerText = this.container.lang.settings.settings || "Settings";

      settingsHeaderContainer.appendChild(backButton);
      settingsHeaderContainer.appendChild(settingsHeaderTitle);

      const settingsBodyContainer = document.createElement("div");
      settingsBodyContainer.className = "settingsBody";
      settingsBodyContainer.appendChild(ThemeSetting());

      settingsButton.addEventListener('click', () => settingsContainer.style.transform = "translateX(0%)");
      backButton.addEventListener('click', () => settingsContainer.style.transform = "translateX(-100%)");

      settingsContainer.appendChild(settingsHeaderContainer);
      settingsContainer.appendChild(settingsBodyContainer);

      return settingsContainer;
    };

    const ThemeSetting = () => {
      const themes = this.container.settings.theme.available;
      const activeTheme = this.container.settings.theme.active;

      const settingContainer = document.createElement("div");

      const selectTitle = document.createElement("span");
      selectTitle.innerText = this.container.lang.settings.theme || "Color Theme";

      const selectItem = document.createElement("select");
      selectItem.name = "theme";
      selectItem.id = "theme-select";

      const options = themes.map(
          value => `<option value="${value}" ${activeTheme === value ? 'selected' : ''}>${value}</option>`
      );

      selectItem.innerHTML = options;

      selectItem.addEventListener("change", ev => changeColorTheme(ev.target.value));

      settingContainer.appendChild(selectTitle);
      settingContainer.appendChild(selectItem);
      return settingContainer;
    };

    const renderBody = callback => {
      const totalDaysInt = totalDays();
      const totalDaysIntLastMonth = totalDays(
        this.container.global.currentMonth - 1
      );
      const totalDaysNextMonth = 42 - (firstDayMonth() + totalDaysInt);
      const today = new Date();
      let renderStr = "";
      let appendChild = true;

      for (let i = firstDayMonth(); i > 0; i--) {
        renderStr += `<span data-date="${totalDaysIntLastMonth -
          (i - 1) +
          "-" +
          (this.container.global.currentMonth - 1)}-${
          this.container.global.currentYear
        }" class="calendarLastAndNextMonth">${totalDaysIntLastMonth -
          (i - 1)}</span>`;
      }

      for (let i = 1; i <= totalDaysInt; i++) {
        renderStr +=
          i == this.container.global.currentDay &&
          this.container.global.currentMonth === today.getMonth() &&
          this.container.global.currentYear === today.getFullYear()
            ? `<span data-date="${i}-${this.container.global.currentMonth}-${this.container.global.currentYear}" class="calendarToday"><span title="Hoje">${i}</span></span>`
            : `<span data-date="${i}-${this.container.global.currentMonth}-${this.container.global.currentYear}">${i}</span>`;
      }

      for (let i = 1; i <= totalDaysNextMonth; i++) {
        renderStr += `<span data-date="${i}-${this.container.global
          .currentMonth + 1}-${
          this.container.global.currentYear
        }" class="calendarLastAndNextMonth">${i}</span>`;
      }

      let body = document.createElement("div");
      body.className = this.container.tags.classes.calendarBody.substring(1);
      body.innerHTML = renderStr;
      body.appendChild(renderEventsDetails());
      body.appendChild(renderSettings());
      //body.style.transform = 'translateY(0%)';

      // VERIFICAR SE O BODY JÁ EXISTE
      Array.prototype.forEach.call(
        this.bodyToRender[0].childNodes,
        function(element) {
          if (
            element.className ===
            this.container.tags.classes.calendarBody.substring(1)
          ) {
            element.innerHTML = renderStr;
            element.appendChild(renderEventsDetails());
            appendChild = false;
          }
        }.bind(this)
      );

      if (appendChild) {
        this.bodyToRender[0].appendChild(body);
      }

      return true;
    };

    const eventNew = (select, type, funct) => {
      selector(select);

      Array.prototype.forEach.call(this.selected, function(element) {
        element.addEventListener(type, funct, false);
      });
    };

    const showDayEvents = event => {
      selector(this.container.tags.ids.eventDetails);

      const clickedSpan = event.target;
      const lastParent = clickedSpan.parentElement;
      const eventDetailsUl = this.selected[0].childNodes[1];
      let list = "";
      let link;

      this.eventsSave.events.forEach(function(element) {
        if (lastParent.getAttribute("data-date") === element.date) {
          link = element.link != undefined ? element.link : "#";
          list += `<li><a href="${link}" target="_blank" rel="noopener noreferrer">${element.name} - ${element.time}</a></li>`;
        }
      });

      eventDetailsUl.innerHTML = list;
      this.selected[0].style.transform = "translateX(0)";
    };

    const hiddenDayEvents = () => {
      selector(this.container.tags.ids.eventDetails);
      this.selected[0].style.transform = "translateX(-100%)";
    };

    const addCalendarEvent = eventsObj => {
      renderContainer();

      if (eventsObj != undefined) {
        this.eventsSave = eventsObj;
      }

      if (this.eventsSave == undefined || this.eventsSave === null) return {};

      if (
        typeof this.eventsSave === "object" &&
        Array.isArray(this.eventsSave) === true
      ) {
        writeConsole("You must pass a valid object");
        return {};
      }

      let eventsLength = this.eventsSave.events.length;

      selector(this.container.tags.classes.calendarBody);

      Array.prototype.forEach.call(
        this.selected,
        function(element) {
          while (
            eventsLength &&
            typeof this.eventsSave.events[eventsLength - 1] === "object" &&
            Array.isArray(this.eventsSave.events[eventsLength - 1]) === false
          ) {
            element.childNodes.forEach(
              function(span) {
                if (
                  span.getAttribute("data-date") ==
                  this.eventsSave.events[eventsLength - 1].date
                ) {
                  let spanNew = document.createElement("span");
                  spanNew.title = "Visualizar eventos";
                  spanNew.innerHTML = span.innerText;

                  span.className = this.container.tags.classes.calendarEvent.substring(
                    1
                  );
                  span.innerHTML = "";
                  span.appendChild(spanNew);

                  spanNew.addEventListener("click", showDayEvents, false);
                }
              }.bind(this)
            );
            eventsLength--;
          }
        }.bind(this)
      );

      return methodsPublic;
    };

    const showSettings = (val = null) => {
      this.container.settings.show = val !== null ? val : true;
        return methodsPublic;
    };

    const defaultLanguage = () => {
        return require('./languages/enUS')
    };

    const changeLanguage = (lang = null) => {
      // set default language
      if (lang === null) {
        defaultLanguage();
        return methodsPublic;
      }
      try {
        const dataLang = require(`./languages/${lang}`);
        this.container.lang = dataLang;
      } catch (e) {
        defaultLanguage();
        console.log(e);
      }
      return methodsPublic;
    };

    const changeColorTheme = (theme = null) => {

      if (
          theme !== null
          && !this.container.settings.theme.available.includes(theme)
      ) {
        return;
      }
      let cssThemeLink = document.querySelector('#calendarThemeCSS');
      if (!cssThemeLink) {
        cssThemeLink = document.createElement('link');
        cssThemeLink.rel = 'stylesheet';
        cssThemeLink.type = 'text/css';
        cssThemeLink.id = 'calendarThemeCSS';
        const headElement = document.getElementsByTagName('head')[0];
        headElement.appendChild(cssThemeLink)
      }
      if (theme === null) {
        theme = this.container.settings.theme.active
      }
      const linkToNewFile = `./src/themes/${theme}/${theme}.css`;
      cssThemeLink.href = linkToNewFile;
      this.container.settings.theme.active = theme;
      writeConsole("Theme is now " + theme)
    };

    // PUBLIC METHODS FOR THE USER
    const methodsPublic = {
      render: saverCalendarContainer,
      lang: changeLanguage,
      addEvents: addCalendarEvent,
      showSettings: showSettings
    };

    writeConsole("Finished.");
    return methodsPublic;
  };

  let writeConsole = message =>
    console.log("# " + projectName + ": " + message);

  // VERIFICAR SE UM OBJETO OU SUB-OBJETO EXISTE
  let verifyObject = function(obj, path = "") {
    if (
      (typeof obj === "object" && Array.isArray(obj) === true) ||
      obj == "" ||
      obj === null
    ) {
      writeConsole("You must pass a valid object");
      return undefined;
    }

    let paths = path.split("."),
      size = paths.length,
      i = 0;

    if (size === 1 && path === "") return obj;

    while (obj != undefined && i < size) {
      obj = obj[paths[i++]];
    }

    return i && i == size ? obj : undefined;
  };

  // METODO INIT QUE FAZ PAPEL DE CONSTRUTOR
  Calendar.init = function(config) {
    // CRIANDO OS OBJETOS NECESSARIOS
    this.container = {};
    let paths = {
      firstPath: ["lang", ["daysWeek", "months"], "array"],
      secondPath: ["global", "object"],
      thirdPath: ["dev", "object"],
      fourPath: ["tags", ["ids", "classes"], "object"]
    };

    // SIMPLES METODO PARA A CRIACAO DE PATHS DENTRO DO CONTAINER
    for (let p in paths) {
      if (paths[p].length > 1) {
        if (this.container[paths[p][0]] === undefined)
          this.container[paths[p][0]] = {};

        for (let element in paths[p][1]) {
          if (paths[p][1] === "object") {
            this.container[paths[p][0]] = {};
            continue;
          }

          if (paths[p][1] === "array") {
            this.container[paths[p][0]] = [];
            continue;
          }

          if (paths[p][2] === "array") {
            this.container[paths[p][0]][paths[p][1][element]] = [];
          } else {
            this.container[paths[p][0]][paths[p][1][element]] = null;
          }
        }
      }
    }

    let localDate = new Date();

    this.container.global = {
      currentDate: localDate,
      currentYear: localDate.getFullYear(),
      currentMonth: localDate.getMonth(),
      currentDay: localDate.getDate()
    };

    this.container.tags.ids = {
      eventDetails: "#eventDetails",
      calendarHeaderYear: "#calendarHeaderYear",
      calendarHeaderMonth: "#calendarHeaderMonth",
      hiddenDayEvents: "#hiddenDayEvents"
    };

    this.container.tags.classes = {
      eventDetails: ".eventDetails",
      calendarEvent: ".calendarEvent",
      calendarBody: ".calendarBody",
      calendarActionBefore: ".calendarActionBefore",
      calendarActionAfter: ".calendarActionAfter"
    };

    this.container.settings = this.container.settings || {
      show: false,
      language: {
        active: "enUS",
        available: ["deDE", "enUS", "esUS", "filFIL", "idID", "inHI", "jaJP", "koKR", "myMY", "plPL", "ptBR", "ruRU", "srRS", "zhCN"]
      },
      theme: {
        active: "DefaultStyle",
        available: ["DefaultStyle", "Night", "Royale"]
      }
    };

    writeConsole("gitHub -> jeconias/calendarjs");
    return new Calendar(this.container);
  };

  return function(config = null) {
    writeConsole("Loading...");

    if (
      (config != null &&
        typeof config === "object" &&
        Array.isArray(config) === true) ||
      (config != null && typeof config !== "object")
    ) {
      writeConsole("The constructor parameter must be a valid Object");
      return;
    }

    if (!instance) return (instance = new Calendar.init(config));
    return instance;
  };
});
