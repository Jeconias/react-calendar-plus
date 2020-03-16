import './i18n';

import React from 'react';
import ReactDom from 'react-dom';

import CalendarPlus from './CalendarPlus';

const calendarPreview: HTMLElement | null = document.getElementById(
  'calendarPreview',
);

if (calendarPreview) ReactDom.render(<CalendarPlus />, calendarPreview);

export default CalendarPlus;
