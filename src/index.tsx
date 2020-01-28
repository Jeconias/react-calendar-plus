import CalendarPlus from './CalendarPlus';
import React from 'react';
import ReactDom from 'react-dom';

const calendarPreview: HTMLElement = document.getElementById('calendarPreview');

if (calendarPreview) ReactDom.render(<CalendarPlus />, calendarPreview);

export default CalendarPlus;
