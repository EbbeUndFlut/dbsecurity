import { getUser } from "../service/user.service.js";

export async function getTheUser(req, res) {
    const result = await getUser(req.body)
    res.json(result)
}