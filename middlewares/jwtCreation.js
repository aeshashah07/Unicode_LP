const JWT = require('jsonwebtoken');
const createErrors = require('http-errors')
const dotenv = require('dotenv');
dotenv.config();


module.exports =  {
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userid
            }
            const secret = process.env.SECRET_KEY
            const options = {
                expiresIn: "1h"
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    }
}