export interface IMembership {
    title: string,
    price?: string,
    desc1: string,
    desc2: string,
    desc3?: string,
    desc4?: string,
}

export interface ISesion {
    title: string,
    sesion1?: {
        description: string,
        nSesion: number,
        price: number,
    },
    sesion2?: {
        description: string,
        nSesion: number,
        price: number,
    }
}

export interface IBusiness {
    title: string
    price: number,
    desc1: string,
    desc2: string,
    age: number,
    priceMonth: number
}
