// authentication (tk+mk) -> token (session) -> req.headers["Authorization"] = `Bearer ${token}`   

import { UserModel } from "../models/User.js"


const authenticated = async(req, res, next) => {
    // req.headers["Authorization"] = `Bearer ${token}`
    // optional operator
    console.log(req.headers)
    const authorization = req.headers['authorization']
        // ["Bearer", "token"]
    console.log(authorization)
    const token = authorization && (authorization.split(' ')[0] === "Bearer" ? authorization.split(' ')[1] : authorization.split(' ')[0])
    console.log(token)
    if (!token) res.status(401).send("Unauthenticated")

    // jwt.verify
    // const isValidToken = jwt.verify
    // 

    //valid token
    // const user = jwt.verify(token).body.data {userID}
    // const user = await User.findById(userID)
    const user = await UserModel.findOne({})

    req.user = user

    // req.user

    return next()
        //invalid

    // res.500
}


const authorization = (req, res, next) => {
        // roles: Admin, User, Guest
        const { user } = req
        const role = user.role
        if (role !== "admin") return res.status(403)

        return next()
    }
    //

export {
    authenticated,
    authorization
}