import { IPositionPrice } from "./offerRequest";

export interface IOffer {
    userUid: string;
    name: string;
    glassType: string;
    systemType: string;
    positionData: IPositionPrice[];
    date: Date;
}

export interface IShowOffer extends IOffer {
    position: number;
}

export interface IRowInMyOfferTable extends IShowOffer {
    price: string;
}
