export interface CalendarPlusInterface {
  selected?: Date;
  onChangeDay?(date: Date): void;
}

export default CalendarPlusInterface;
