import { IPositionPrice } from "./offerRequest";
import { IUser } from "./user";

export interface IOffer {
    userUid: string;
    name: string;
    glassType: string;
    systemType: string;
    positionData: IPositionPrice[];
    date: Date;
    id?: string;
    adminTableItemUid?: string;
}

export interface IShowOffer extends IOffer {
    position: number;
}

export interface IRowInMyOfferTable extends IShowOffer {
    price: string;
    uid: string;
    status: string;
}

export interface ICompleteOffer {
    price: string;
    date: Date;
    userUid: string;
    adminTableItemUid: string;
    status: string;
}

export interface IShowCompleteOffer extends ICompleteOffer {
    position: number;
}

export interface IShowConfirmOfferInTable extends IShowCompleteOffer {
    user: IUser;
}
