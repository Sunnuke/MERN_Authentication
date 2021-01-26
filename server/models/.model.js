const mongoose = require('mongoose');

const EXAMPLE_Schema = new mongoose.Schema({
    // Strings
    name: {type: String, 
        required: [true, "Name is Required!"], //Validations
        minlength: [3, "The Name must be at least 3 characters long!"]
    },
    firstName: {type: String},
    lastName: {type: String},
    middleName: {type: String},
    email: {type: String},
    password: {type: String},
    title: {type: String},
    description: {type: String},

    // Number
    age: {type: Number},
    price: {type: Number},
    balance: {type: Number, default: 0},

    // List
    friends: [ EXAMPLE_Schema ],

    // Objects
    address: {
        street: {type: String},
        city: {type: String},
        state: {type: String},
        zipCode: {type: String},
        country: {type: String},
    }
}, {timestamps: true});

module.exports.EXAMPLE = mongoose.model("EXAMPLE", EXAMPLESchema);