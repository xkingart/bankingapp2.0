const passportLocalMongoose = require('passport-local-mongoose');

module.exports = (mongoose) => {
    // Create Model
    const Schema = mongoose.Schema;

    const User = new Schema({
        username: String,
        password: String
    });
    // Export Model
    User.plugin(passportLocalMongoose);

    return mongoose.model('user', User, 'user');
}

