import { CommonResponse } from "./common.response";

export type UserHttpResponse = CommonResponse & {
    users: any
}