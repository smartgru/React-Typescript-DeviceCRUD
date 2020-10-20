import React from 'react';
import MaterialTable from 'material-table';

import { IDevice, IDeviceColumn } from '../../core/interfaces';
import { TDeviceList } from '../../core/types';
import tableIcons from '../TableIcons';

const DeviceTableComlumns: IDeviceColumn[] | [] = [
  { title: "ID", field: "id", editable: "never" },
  { title: "Name", field: "name" },
  {
    title: "Avatar",
    field: "avatar",
    render: (rowData: IDevice) => <img src={rowData.avatar} style={{ width: 50, borderRadius: '50%' }}/>
  },
  { title: "Created", field: "createdAt" }
];


interface DeviceListProps {
  items: TDeviceList | undefined;
  addItem: (data: IDevice) => void;
  editItem: (data: IDevice, id: string) => void;
  deleteItem: (id: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  items,
  addItem,
  editItem,
  deleteItem,
}) => {
  if (!items) {
    return null;
  }

  return (
    <>
      <MaterialTable
        columns={DeviceTableComlumns}
        data={items}
        icons={tableIcons}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                addItem(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                editItem(newData, oldData && oldData.id ? oldData.id : '');
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setTimeout(() => {
                  deleteItem(oldData && oldData.id ? oldData.id : '');
                  resolve();
                }, 1000);

                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
};

export default DeviceList;
