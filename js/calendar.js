let Calendar = (function(){
    "use strict";

    let instance;
    const projectName = 'Calendar';

    let writeConsole = function(message){
        console.log('# ' + projectName + ': ' + message);
    }

    // CLASS/FUNCAO PRINCIPAL QUE CONTEM OS METODOS NECESSARIO PARA O CALENDARIO
    let Calendar = function(container){

        this.selected = null;
        this.bodyToRender = null;

        // VERIFICAR SE O ANO EH BISSEXTO
        const leap = function()
        {
            return ((container.global.currentYear % 100) !== 0) && ((container.global.currentYear % 4) === 0);
        }

        // RETORNAR O PRIMEIRO DIA DO MES
        const firstDayMonth = function()
        {
            const primeiroDiaMes = new Date(container.global.currentYear, container.global.currentMonth, 1);
            return primeiroDiaMes.getDay();
        }

        // QUANDO O MES FOR IGUAL A 0, VOLTAR PARA 11 E RETROCEDER UM ANO
        const lastMonth = function()
        {
            if(container.global.currentMonth != 0)
            {
                container.global.currentMonth--;
                return;
            }

            container.global.currentMonth = 11;
            container.global.currentYear--;
            return; 
        }

        // QUADO O MES FOR IGUAL A 11, VOLTAR PARA 0 E AVANCAR UM ANO
        const nextMonth = function()
        {
            if(container.global.currentMonth != 11)
            {
                container.global.currentMonth++;
                return;
            }

            container.global.currentMonth = 0;
            container.global.currentYear++;
            return; 
        }

        // RETORNA A QUANTIDADE DE DIAS DO MES ATUAL
        const totalDays = function(currentMonth = null)
        {

            currentMonth = (currentMonth === null) ? container.global.currentMonth : currentMonth;

            if(currentMonth == -1) currentMonth = 11;

            if (currentMonth == 0 
                || currentMonth == 2 
                || currentMonth == 4 
                || currentMonth == 6 
                || currentMonth == 7 
                || currentMonth == 9 
                || currentMonth == 11) {
                return  31;
            } else if (
                    currentMonth == 3 
                ||  currentMonth == 5 
                ||  currentMonth == 8 
                ||  currentMonth == 10) {
                return 30;
            } else {
                return leap() ? 29 : 28;
            }
        }

        // SETA UMA NOVA DATA
        const newDate = function()
        {
            container.global.currentDate.setFullYear(container.global.currentYear, container.global.currentMonth, container.global.currentDate);
            renderBody();
        }

        // SELECIONAR TAGS
        const selector = function(selector)
        {
            if(selector == '' || selector == null) {
                writeConsole('Error -> Enter the selector in the SELECTOR method.');
                return false;
            }
            this.selected = document.querySelectorAll(selector);
            return methodsPublic;
        }.bind(this);


        // SETAR NOVO VALOR PARA A TAG/TAGS
        const text = function(newText)
        {
            return render(newText);
        }

        // SETAR UM NOVO ANO NAS TAGS SELECIONADAS
        const currentYear = function(target = null)
        {
            if(target == null || target == '') { 
                writeConsole('currentYear needs a valid parameter'); return false;
            }
            selector(target);
            return render(container.global.currentYear);
        }

        const currentMonth = function(target)
        {
            if(target == null || target == '') {
                writeConsole('currentMonth needs a valid parameter'); return false;
            }
            selector(target);
            return render(container.lang.months[container.global.currentMonth]);
        }

        // RENDERIZAR
        const render = function(newText)
        {
            Array.prototype.forEach.call(this.selected, function(element){
                element.innerHTML = newText;
            });
            return methodsPublic;
        }.bind(this);

        const renderHeader = function()
        {
            let header = '';
        }

        const renderBody = function(target)
        {
            const totalDaysInt = totalDays();
            const totalDaysIntLastMonth = totalDays(container.global.currentMonth - 1);
            let renderStr = '';

            for(let i = firstDayMonth(); i > 0; i--)
            {
                renderStr += '<span>' + (totalDaysIntLastMonth - (i-1)) + '</span>';
            }


            for(let i = 1; i <= totalDaysInt; i++)
            {
                renderStr += '<span>' + i + '</span>';
            }


            this.bodyToRender = (this.bodyToRender != null) ? this.bodyToRender : target;

            selector(this.bodyToRender);
            render(renderStr);

            return methodsPublic;
        }.bind(this);

        // METODOS PUBLICOS PARA O USUARIO
        let methodsPublic = {
            select      : selector,
            text        : text,
            currentYear : currentYear,
            currentMonth: currentMonth,
            renderBody  : renderBody,
            lastMonth   : lastMonth,
            nextMonth   : nextMonth
        }

        writeConsole('Finished.');
        return methodsPublic;
    }

    // METODO INIT QUE FAZ PAPEL DE CONSTRUTOR
    Calendar.init = function(config){

        // CRIANDO OS OBJETOS NECESSARIOS
        this.container = {};
        let paths = {
            firstPath   :['lang', ['daysWeek', 'months'], 'array'],
            secondPath  :['global', 'object'],
            thirdPath   :['dev', 'object'],
        }

        // SIMPLES METODO PARA A CRIACAO DE PATHS DENTRO DO CONTAINER
        for(let p in paths)
        {
            if(paths[p].length > 1)
            {
                if(this.container[paths[p][0]] === undefined) this.container[paths[p][0]] = {};

                for(let element in paths[p][1])
                {
                    if(paths[p][1] === 'object')
                    {
                        this.container[ paths[p][0] ] = {}
                        continue;
                    }

                    if(paths[p][1] === 'array')
                    {
                        this.container[ paths[p][0] ] = [];
                        continue;
                    }

                    if(paths[p][2] === 'array')
                    {
                        this.container[ paths[p][0] ][ paths[p][1][element] ] = [];
                    }else{
                        this.container[ paths[p][0] ][ paths[p][1][element] ] = null;
                    }
                }
            }
        }
    
        let localDate = new Date();

        this.container.global = {
            currentDate     : localDate,
            currentYear     : localDate.getFullYear(),
            currentMonth    : localDate.getMonth(),
        }

        this.container.dev = {
            name: 'Jeconias Santos',
            github: 'jeconiassantos/calendarjs'
        }

        // IDIOMA PADRAO DA SEMANA
        this.container.lang.daysWeek = [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sáb'
        ];

        // IDIOMA PADRAO DO MES
        this.container.lang.months = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ];

        //if(typeof config.lang.months) {console.log('a')};



        writeConsole('Dev -> ' + this.container.dev.name);
        writeConsole('gitHub -> ' + this.container.dev.github);
        return new Calendar(this.container);
    }
    
    return function(config = null){
        writeConsole('Loading...');

        if(config != null && typeof(config) === 'object' && Array.isArray(config) === true || config != null && typeof(config) !== 'object')
        {
            writeConsole('The constructor parameter must be a valid Object');
            return;
        }

        if(!this.instance) return this.instance = new Calendar.init(config);
        return this.instance;
    }

})();