import { IUser } from "./user";

export interface IFinishedOrder {
    adminTableRelation: string;
    date: Date;
    price: string;
    status: string;
    userUid: string;
}

export interface IFinishedOrderRow extends IFinishedOrder {
    position: number;
}

export interface IAdminTable extends IOrderData {
    date: Date;
    count: number;
    price?: string;
    status: string;
    userData: IUser
}

export interface IAdminTableRow extends IAdminTable {
    id: string;
    position: number;
    email: string;
}  

export interface IAdminOfferDialog extends IAdminTableRow {
    positionData: IPositionPrice[];
}

export interface IContactMsg {
    createDate: Date;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    read: boolean;
    text: string;
}

export interface ISendOffer extends IOrderData {
    adminTableRelation: string;
    date: Date;
    fullName: string;
    positionData: ISinglePositionData[];
}

interface IOrderData {
    measure: string;
    glassType: string;
    systemType: string;
}

interface ISinglePositionData {
    price: string;
    measure: string;
}

export interface IPositionPrice {
    measure: string;
    price: string;
}

export interface IMyOfferTableRow {
    price: string;
    uid: string;
    status: string;
    userUid: string;
    name: string;
    glassType: string;
    systemType: string;
    positionData: IPositionPrice[];
    date: Date;
    id?: string;
    adminTableRelation?: string;
    position: number;
    action?: string;
}

export interface IOffer {
    userUid: string;
    name: string;
    glassType: string;
    systemType: string;
    positionData: IPositionPrice[];
    date: Date;
    id?: string;
    adminTableRelation?: string;
}

