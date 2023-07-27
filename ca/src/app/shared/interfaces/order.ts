import { IUser } from './user';

export interface IOrder {
    orderName: string; // orderName or orderNumber???
    userId: IUser;

}