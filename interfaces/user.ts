export interface IUser {
    map(arg0: (user: any) => { id: any; email: any; name: any; role: any; }): unknown;
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}