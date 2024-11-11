const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokenBalance: {
        type: Number,
        default: 100,
    }, 
    notifications: [
        {
            type: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
            seen: {
                type: Boolean,
                default: false,
            },
        },
    ],
    transactionHistory: [
        {
            type: {
                type: String,
                required: true,
            },
            productName: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
},{timestamps: true});


// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);