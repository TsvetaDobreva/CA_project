import { IUser } from "./user";

export interface IOfferRequest {
    count: number;
    measure: string;
    systemType: string;
    glassType: string;
    status: string;
    date: Date;
    user: IUser;
}

export interface IShowNewOfferRequest {
    uid: string;
    position: number;
    email?: string;
    date: Date;
    count: number;
    measure: string;
    systemType: string;
    glassType: string;
    status: string;
    userUid: string;
    name: string;
}

export interface IDialogShowOfferRequest extends IShowNewOfferRequest {
    arrPosition: IPositionPrice[];
}

export interface IPositionPrice {
    measure: string;
    price: string;
}