// const sessionIdtoUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "abcd";

function setUser(user) {
    // sessionIdtoUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}
function getUser(token) {
    // return sessionIdtoUserMap.get(id);
    return jwt.verify(token, secret);
}

module.exports = {
    setUser, 
    getUser
};