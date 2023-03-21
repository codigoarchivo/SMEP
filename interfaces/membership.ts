export interface IMembership {
    title: string,
    price: string,
    desc1: string,
    desc2: string,
    desc3: string,
    desc4: string,
}

export interface ISelectSession {
    title: string,
    priceU: number,
}

export interface ISelectSubscription {
    title: string,
    desc1: string,
    desc2: string,
    desc3: string,
    repro: number,
    price: string,
    monthT: number,
    priceU: number,
}

export interface ISession {
    adicional: string;
    datetime: string;
    email: string;
    images: string[];
    name: string;
    priceU: number;
    reference: string;
    title: string;
    select?: string;
    state?: boolean;
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    valid?: boolean;
    _id?: string
}

export interface ISubscription {
    adicional: string;
    datetime: string;
    email: string;
    images: string[];
    monthT: number;
    name: string;
    desc: string;
    priceU: number;
    reference: string;
    repro: number;
    title: string;
    select?: string;
    state?: boolean;
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    valid?: boolean;
    _id?: string
}