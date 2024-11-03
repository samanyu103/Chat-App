const {getUser} =require ('../service/auth');

// async function restrict(req,res,next) {
//     // console.log(req.cookies)
//     // const uuid = req.cookies?.uid;
//     // console.log(req.cookies?.uid || (req.headers && req.headers['authorization']?.split(' ')[1]));
//     const uuid = req.headers["authorization"];
//     console.log(req.headers);
//     if (!uuid) {
//         console.log("no cookie")
//         return res.status(401).send({msg:"no cookie"});
//     }
//     uuid = uuid.split("Bearer ")[1];
//     const user = getUser(uuid);
//     if (!user) {
//         console.log("no match");
//         return res.status(401).send({msg:"no match"});
//     }
//     req.user = user;
//     next();


// }

async function restrict(req,res,next) {
    console.log(req.cookies)
    const uuid = req.cookies?.uid;
    console.log(uuid)
    if (!uuid) {
        console.log("no cookie")
        return res.status(401).send({msg:"no cookie"});
    }
    const user = getUser(uuid);
    if (!user) {
        console.log("no match");
        return res.status(401).send({msg:"no match"});
    }
    req.user = user;
    next();


}








module.exports = {
    restrict,
}