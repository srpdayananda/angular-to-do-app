import { Role } from '../enums/role.enum';

export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    accessToken?: string;
}