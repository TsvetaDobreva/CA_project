export interface IUser {
    uid: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    company?: string;
    orders: string[];
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
   
}