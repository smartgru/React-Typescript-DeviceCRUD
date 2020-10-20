import Axios from 'axios';
import { IDevice } from '../core/interfaces';
import { TDeviceList } from '../core/types';

const BASE_API = 'https://5f8d69b04c15c40016a1dad2.mockapi.io/olek/Devices';

export const getDevices = async () => {
  return await Axios
    .get<TDeviceList>(BASE_API);
}

export const addDevice = async (param: IDevice) => {
  return await Axios.post<IDevice>(BASE_API, param);
}

export const editDevice = async (device: IDevice) => {
  return await Axios.put<IDevice>(`${BASE_API}/${device.id}`, device);
}

export const deleteDevice = async (deviceId: string) => {
  return await Axios.delete<any>(`${BASE_API}/${deviceId}`);
}
