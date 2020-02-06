import ReactDom from 'react-dom';
import React from 'react';
import CalendarPlus from './CalendarPlus';

const calendarPreview: HTMLElement = document.getElementById('calendarPreview');

if (calendarPreview) ReactDom.render(<CalendarPlus />, calendarPreview);

export default CalendarPlus;
