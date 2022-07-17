import User from "../../user/user.model";
import { Role } from "../enums/role";

export default async function isManager(id: string) {
    const user = await User.findById(id);
    if (user.role === Role.MANAGER) {
        return true;
    }
    return false;
}