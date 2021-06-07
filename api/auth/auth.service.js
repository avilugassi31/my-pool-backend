const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(username, password) {
    console.log('username in login auth service:', username);
    logger.debug(`auth.service - login with username: ${username}`);
    const user = await userService.getByUsername(username);
    console.log('user  in login auth service:', user);
    if (!user) return Promise.reject('Invalid username or password');
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid username or password');

    delete user.password;
    console.log('user before return in login auth service:', user)
    return user;
}

async function signup(imgUrl, username, password, fullname, createdAt) {
    console.log('username in signup authservice:', username);
    const saltRounds = 10;
    logger.debug(
        `auth.service - signup with username: ${username}, fullname: ${fullname}`
    );
    if (!username || !password || !fullname)
        return Promise.reject('fullname, username and password are required!');
    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({
        imgUrl,
        username,
        password: hash,
        fullname,
        createdAt,
    });
}

module.exports = {
    signup,
    login,
};
