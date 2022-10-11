const mongoose = require('mongoose');

module.exports = (uri, options) => {

    return new Promise((res, rej) => {
        if ([0,3,99].includes(mongoose.connection.readyState)) {
            mongoose.connect(uri, options, (error) => error ? rej(error) : res(mongoose));
        } else {
            res(mongoose)
        }
    }) 
}


