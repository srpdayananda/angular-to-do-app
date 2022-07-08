import { CommonResponse } from './common.response';

export type AuthInputProps = {
    email: string,
    password: string,
}

export type AuthResponse = CommonResponse & {
    user: any
}
