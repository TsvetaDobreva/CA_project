import { IPositionPrice } from "./offerRequest";

export interface IOffer {
    userUid: string;
    name: string;
    glassType: string;
    systemType: string;
    positionData: IPositionPrice[];
}

export interface IShowOffer extends IOffer {
    position: number;
}
