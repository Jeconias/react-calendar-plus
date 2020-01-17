import React from 'react';
import ReactDom from 'react-dom';
import CalendarPlus from './CalendarPlus';

const calendarPreview = document.getElementById('calendarPreview');

if (calendarPreview !== 'undefined')
  ReactDom.render(<CalendarPlus />, calendarPreview);

export default CalendarPlus;
