
module.exports = (mongoose) => {
    // Create Model
    const Schema = mongoose.Schema;

    const Person = new Schema({
        firstname: String,
        middlename: String,
        lastname: String,
        birthdate: Date,
        email: String,
        username: String,
        created: { type: Date, default: Date.now }
    });

    return mongoose.model('person', Person, 'person');
}

