let Calendar = (function() {
  "use strict";

  let instance;
  const projectName = "Calendar";

  // CLASS/FUNCAO PRINCIPAL QUE CONTEM OS METODOS NECESSARIO PARA O CALENDARIO
  let Calendar = function(container) {
    this.selected = null;
    this.bodyToRender = null;
    this.eventsSave = null;
    this.areaTouches = {
      clientX: 0,
      clientY: 0
    };

    // VERIFICAR SE O ANO EH BISSEXTO
    const leap = () => {
      return (
        container.global.currentYear % 100 !== 0 &&
        container.global.currentYear % 4 === 0
      );
    };

    // RETORNAR O PRIMEIRO DIA DO MES
    const firstDayMonth = () => {
      const primeiroDiaMes = new Date(
        container.global.currentYear,
        container.global.currentMonth,
        1
      );
      return primeiroDiaMes.getDay();
    };

    // QUANDO O MES FOR IGUAL A 0, VOLTAR PARA 11 E RETROCEDER UM ANO
    const lastMonth = () => {
      if (container.global.currentMonth != 0) {
        container.global.currentMonth--;
      } else {
        container.global.currentMonth = 11;
        container.global.currentYear--;
      }
      newDate();
      return;
    };

    // QUADO O MES FOR IGUAL A 11, VOLTAR PARA 0 E AVANCAR UM ANO
    const nextMonth = () => {
      if (container.global.currentMonth != 11) {
        container.global.currentMonth++;
      } else {
        container.global.currentMonth = 0;
        container.global.currentYear++;
      }
      newDate();
      return;
    };

    // RETORNA A QUANTIDADE DE DIAS DO MES ATUAL
    const totalDays = (currentMonth = null) => {
      currentMonth =
        currentMonth === null ? container.global.currentMonth : currentMonth;

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
      container.global.currentDate.setFullYear(
        container.global.currentYear,
        container.global.currentMonth,
        container.global.currentDate
      );

      renderBody();

      selector(container.tags.ids.calendarHeaderMonth);
      newValueInTag(container.lang.months[container.global.currentMonth]);

      selector(container.tags.ids.calendarHeaderYear);
      newValueInTag(container.global.currentYear);

      // CARREGAR OS EVENTOS NAS DATAS
      addCalendarEvent();

      // RECARREGAR O EVENTO PARA FECHAR OS DETALHES
      eventNew(container.tags.ids.hiddenDayEvents, "click", hiddenDayEvents);
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

    // SETAR NOVO VALOR PARA A TAG/TAGS
    const text = newText => {
      return newValueInTag(newText);
    };

    // SETAR UM NOVO ANO NAS TAGS SELECIONADAS
    const currentYear = (target = null) => {
      if (target == null || target == "") {
        writeConsole("currentYear needs a valid parameter");
        return false;
      }
      selector(target);
      return newValueInTag(container.global.currentYear);
    };

    const currentMonth = target => {
      if (target == null || target == "") {
        writeConsole("currentMonth needs a valid parameter");
        return false;
      }
      selector(target);
      return newValueInTag(
        container.lang.months[container.global.currentMonth]
      );
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

    const renderContainer = target => {
      if (target == null || target == "" || target.substring(1, 0) != "#") {
        writeConsole("render needs a valid parameter. Ex: #calendarId");
        return false;
      }
      // SELECIONAR O CONTAINER DO CALENDARIO
      selector(target);

      // SALVAR O CONTAINER DO CALENDARIO
      this.bodyToRender = this.selected;

      // RENDERIZAR O CABEÇALHO
      newValueInTag(renderHeader());

      // RENDERIZAR O CORPO
      renderBody();

      // CARREGAR OS EVENTOS NAS DATAS
      addCalendarEvent();

      // ADICIONAR OS EVENTOS
      eventNew(container.tags.classes.calendarActionBefore, "click", lastMonth);
      eventNew(container.tags.classes.calendarActionAfter, "click", nextMonth);
      eventNew(container.tags.ids.hiddenDayEvents, "click", hiddenDayEvents);
      eventNew(container.tags.classes.calendarBody, "touchstart", touchStart);
      eventNew(container.tags.classes.calendarBody, "touchmove", touchMove);

      return methodsPublic;
    };

    const renderHeader = () => {
      return `\
            <div class="calendarHeader">\
                <div>\
                    <div class="calendarActionBefore"><i></i></div>\
                    <h1 id="calendarHeaderMonth">${
                      container.lang.months[container.global.currentMonth]
                    }</h1>\
                    <span id="calendarHeaderYear">${
                      container.global.currentYear
                    }</span>\
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
                </div>\
            </div>`;
    };

    const renderEventsDetails = () => {
      let eventsContainer = document.createElement("div");
      let buttonContainer = document.createElement("div");
      let buttonEventsDetails = document.createElement("span");

      buttonEventsDetails.id = container.tags.ids.hiddenDayEvents.substring(1);
      buttonContainer.appendChild(buttonEventsDetails);

      eventsContainer.className = container.tags.classes.eventDetails.substring(
        1
      );
      eventsContainer.id = container.tags.ids.eventDetails.substring(1);
      eventsContainer.appendChild(buttonContainer);
      eventsContainer.appendChild(document.createElement("ul"));

      return eventsContainer;
    };

    const renderBody = callback => {
      const totalDaysInt = totalDays();
      const totalDaysIntLastMonth = totalDays(
        container.global.currentMonth - 1
      );
      const totalDaysNextMonth = 42 - (firstDayMonth() + totalDaysInt);
      const today = new Date();
      let renderStr = "";
      let appendChild = true;

      for (let i = firstDayMonth(); i > 0; i--) {
        renderStr += `<span data-date="${totalDaysIntLastMonth -
          (i - 1) +
          "-" +
          (container.global.currentMonth - 1)}-${
          container.global.currentYear
        }" class="calendarLastAndNextMonth">${totalDaysIntLastMonth -
          (i - 1)}</span>`;
      }

      for (let i = 1; i <= totalDaysInt; i++) {
        renderStr +=
          i == container.global.currentDay &&
          container.global.currentMonth === today.getMonth() &&
          container.global.currentYear === today.getFullYear()
            ? `<span data-date="${i}-${container.global.currentMonth}-${container.global.currentYear}" class="calendarToday"><span title="Hoje">${i}</span></span>`
            : `<span data-date="${i}-${container.global.currentMonth}-${container.global.currentYear}">${i}</span>`;
      }

      for (let i = 1; i <= totalDaysNextMonth; i++) {
        renderStr += `<span data-date="${i}-${container.global.currentMonth +
          1}-${
          container.global.currentYear
        }" class="calendarLastAndNextMonth">${i}</span>`;
      }

      let body = document.createElement("div");
      body.className = container.tags.classes.calendarBody.substring(1);
      body.innerHTML = renderStr;
      body.appendChild(renderEventsDetails());
      //body.style.transform = 'translateY(0%)';

      // VERIFICAR SE O BODY JÁ EXISTE
      Array.prototype.forEach.call(this.bodyToRender[0].childNodes, function(
        element
      ) {
        if (
          element.className === container.tags.classes.calendarBody.substring(1)
        ) {
          element.innerHTML = renderStr;
          element.appendChild(renderEventsDetails());
          appendChild = false;
        }
      });

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
      selector(container.tags.ids.eventDetails);

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
      selector(container.tags.ids.eventDetails);
      this.selected[0].style.transform = "translateX(-100%)";
    };

    const addCalendarEvent = eventsObj => {
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

      selector(container.tags.classes.calendarBody);

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

                  span.className = container.tags.classes.calendarEvent.substring(
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

    // METODOS PUBLICOS PARA O USUARIO
    let methodsPublic = {
      render: renderContainer,
      addEvents: addCalendarEvent
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

    this.container.dev = {
      name: "Jeconias Santos",
      github: "jeconias/calendarjs"
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

    // IDIOMA PADRAO DA SEMANA
    this.container.lang.daysWeek = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

    // IDIOMA PADRAO DO MES
    this.container.lang.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (config != null) {
      // VALIDAR OS DIAS DA SEMANA
      if (verifyObject(config, "lang.daysWeek") != undefined) {
        if (
          Array.isArray(config.lang.daysWeek) === false ||
          config.lang.daysWeek.length < 7
        ) {
          writeConsole('"daysWeek" must be an array with 7 values.');
        }
        this.container.lang.daysWeek = config.lang.daysWeek;
      }

      // VALIDAR OS MESES
      if (verifyObject(config, "lang.months") != undefined) {
        if (
          Array.isArray(config.lang.months) === false ||
          config.lang.months.length < 11
        ) {
          writeConsole('"months" must be an array with 11 values.');
        }
        this.container.lang.months = config.lang.months;
      }
    }

    writeConsole("Dev -> " + this.container.dev.name);
    writeConsole("gitHub -> " + this.container.dev.github);
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
})();
