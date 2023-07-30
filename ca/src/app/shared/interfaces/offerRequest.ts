import { IUser } from "./user";

export interface IOfferRequest {
    count : Number;
    measure : string;
    systemType : string;
    glassType : string;
    status : string;
    date: Date;
    user: IUser;
}

export interface IShowNewOfferRequest {
    uid: string;
    position: number;
    email?: string;
    date: string;
    count : Number;
    measure : string;
    systemType : string;
    glassType : string;
    status: string
}

