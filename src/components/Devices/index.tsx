import React, { useEffect, useState, Fragment } from 'react';

import {
  getDevices,
  addDevice,
  editDevice,
  deleteDevice,
} from '../../services/api';
import { TDeviceList } from '../../core/types';
import DeviceList from '../DeviceList';
import { IDevice } from '../../core/interfaces';

const Devices: React.FC = () => {
  const [devices, setDeviceList] = useState<TDeviceList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result: { data: TDeviceList } = await getDevices();
      if (result) {
        setDeviceList(result.data);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (param: IDevice) => {
    const { data: newItem } = await addDevice(param);
    if (newItem) {
      setDeviceList([...devices, newItem]);
    }
  };

  const editItem = async (param: IDevice, id: string) => {
    const { data: newItem } = await editDevice(param);
    if (newItem) {
      const deviceList = [...devices];
      const updatedList = deviceList.map((item: IDevice) =>
        item.id === id ? newItem : item,
      );
      setDeviceList(updatedList);
    }
  };

  const deleteItem = async (id: string) => {
    const result = await deleteDevice(id);
    if (result) {
      const deviceList = [...devices];
      const deletedIndex = deviceList.findIndex(
        (item: IDevice) => item.id === id,
      );
      if (deletedIndex > -1) deviceList.splice(deletedIndex, 1);
      setDeviceList(deviceList);
    }
  };

  if (loading) {
    return <div>Loading Devices...</div>;
  }

  return (
    <DeviceList
      items={devices}
      addItem={addItem}
      editItem={editItem}
      deleteItem={deleteItem}
    />
  );
};
export default Devices;
