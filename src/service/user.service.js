import { getByNameAndPassword } from "../repository/user.repository.js";

export async function getUser(user) {
    return await getByNameAndPassword(user)
}