export interface SelectInterface {
  label: string;
  initValue: string;
  onChange?(selected: string): any;
}
