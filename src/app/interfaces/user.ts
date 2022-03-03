import { Role } from "./role";

export interface User {
    username ?: String
    name ?: string
    password ?: string
    roles ?: Role[]
}
