const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    type: String,
    color: String,
    model: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);