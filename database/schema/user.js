
const mongoose = require('mongoose');

const tunnelbore_user = new mongoose.Schema(
        {
         name: String,
         password: String
        },
);

const tbu = mongoose.model('tunnelbore_user', tunnelbore_user);

module.exports = tbu
