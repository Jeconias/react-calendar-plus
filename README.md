# CalendarJS

Esse é um calendário com JavaScript que tem como propósito ser fléxivel para a inserção de eventos ou lembretes em determinadas datas.


#### Como utilizar

- Carregue o [calendarjs.js](./javascript/calendarjs.js) e [calendarjs.css](./stylecheet/calendarjs.css)
no seu projeto.
- Instancie a classe do CalendarJS na sua aplicação e insira o ID da div que irá receber o CalendarJS:

```
    const calendarJS = new Calendar();
    calendarJS.render('#calendar'); 
```

- Você pode inserir eventos utilizando o método **addEvents** dessa forma:

```
    calendarJS.addEvents(
    [
         {
            name    : 'DocePipoca',
            data    : '17-3-2019',
            hora    : '22:00',
            autor   : 'Mario',
            link    : 'link para o evento',
        },
         {
            name    : 'Nome do Evento',
            data    : '10-10-2018',
            hora    : '07:00',
            autor   : 'Jeconias',
            link    : 'link para o evento',
        }
    ]);

```

- Você pode renderizar o calendário antes ou depois de inserir os eventos:

```
    const calendarJS = new Calendar();
    calendarJS.render('#calendar').addEvents(arrayObj);

    // ou

    calendarJS.addEvents(arrayObj).render('#calendar');
```


#### Métodos disponíveis

| Método | Parametros | Ação | Retorno |
|--------|------------|------|---------|
|render       | ID     | Renderiza o calendário | Retorna os métodos públicos |
|addEvents    | Array de Objetos | Insere os eventos no calendário | -- |


##### Estilo atual do calendário:
![Estilo atual do calendário](./images/calendarJS.png)

Ao clicar em alguma data com eventos:

![Estilo atual do calendário](./images/specific_date.png)

