export interface IMembership {
    title: string,
    price?: string,
    desc1?: string,
    desc2?: string,
    desc3?: string,
    desc4?: string,
}

export interface ICheck {
    title?: string,
    desc1?: string,
    desc2?: string,
    desc3?: string,
    repro?: number,
    price?: string,
    monthT?: number,
    priceU?: number,
}

export interface ISessionOrSubscription {
    adicional: string;
    datetime: string;
    email: string;
    images: string[];
    monthT?: number;
    name: string;
    desc?: string;
    priceU: number;
    reference: string;
    repro?: number;
    title: string
}
