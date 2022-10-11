
module.exports = (mongoose) => {
    // Create Model
    const Schema = mongoose.Schema;

    const Account = new Schema({
        nickname: String,
        type: { type: String, default: 'savings' },
        balance: { type: Number, default: 0 },
        username: String,
        created: { type: Date, default: Date.now }
    });

    return mongoose.model('account', Account, 'account');
}

