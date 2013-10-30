var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegistrationSchema = new Schema({
    state: {
        type: String,
        required: true, // TODO: should define enum with valid values
        trim: true
    },
    person: {
        name: {
            type: String,
            required: [true, "Navn er påkrevd" ],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email er påkrevd" ],
            trim: true,
            index: true,
            unique: true
        },
        phone: {
            type: Number,
            required: [true, "Telefon er påkrevd" ],
            trim: true
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Registration', RegistrationSchema);