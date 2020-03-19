export interface CalendarPlusInterface {
  selected?: Date;
  showConfig?: boolean;
  onChangeDay?(date: Date): void;
}

export default CalendarPlusInterface;
