# CalendarJS

This is a JavaScript calendar that is intended to be flexible for entering events or reminders on certain dates.

#### How to use

- Load [CalendarJS.js](./javascript/CalendarJS.js) and [DefaultStyle.css](./stylesheet/DefaultStyle/DefaultStyle.css) into your project.
- Instantiate the CalendarJS class in your application and enter the div ID that will receive CalendarJS:

```
    const calendarJS = new Calendar();
    calendarJS.render('#calendar');
```

- You can insert events using the **addEvents** method like this:

```
    calendarJS.addEvents(
    [
         {
            name    : 'DocePipoca',
            date    : '17-3-2019',
            time    : '22:00',
            author   : 'Mario',
            link    : 'link to the event',
        },
         {
            name    : 'Event Name',
            data    : '10-10-2018',
            time    : '07:00',
            author   : 'Jeconias',
            link    : 'link to the event',
        }
    ]);

```

- You can render the calendar before or after entering events:

```
    const calendarJS = new Calendar();
    calendarJS.render('#calendar').addEvents(arrayObj);

    // ou

    calendarJS.addEvents(arrayObj).render('#calendar');
```

#### Available Methods

| Method    | Parameters   | Action                     | Return                 |
| --------- | ------------ | -------------------------- | ---------------------- |
| render    | ID           | Render the calendar        | Returns public methods |
| addEvents | Object Array | Inserts events to calendar | --                     |

#### Changelog

- v0.1 - initiated ;)

#### Current calendar style:

![Current calendar style](./stylesheet/DefaultStyle/preview/calendarJS_EN.png)

When you click on an event date:

![Current calendar style](./stylesheet/DefaultStyle/preview/specific_date_EN.png)
