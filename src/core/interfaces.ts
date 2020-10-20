export interface IDevice {
  id?: string;
  name: string;
  avatar: string;
  createdAt?: string;
}

export interface IDeviceColumn {
  title: string;
  field: string;
  editable?: "never" | "always" | "onUpdate" | "onAdd" | ((_columnDef: any, rowData: IDevice) => boolean) | undefined;
  render?: any;
}
