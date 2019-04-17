const db = require("mongoose");

const userSchema = db.Schema({

    _id: db.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: {type: String, required: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }

});

module.exports = db.model("User", userSchema);