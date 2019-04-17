const db = require("mongoose");
const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = function(req, res) {
    User.find({ email: req.body.email })
        .exec()   
        .then(function(user) {
            if(user.length > 0) {
                return res.status(400).json({
                    message: `A user with the e-mail address ${req.body.email} already exists.`
                })
            } else {
                encrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) {
                        return res.status(500).json({ error: err});
                    } else {
                        var user = new User(
                            {
                                _id: new db.Types.ObjectId,
                                email: req.body.email,
                                password: hash,
                                firstname: req.body.firstname,
                                lastname: req.body.lastname
                            }
                        );

                        user.save()
                            .then(function() {
                                res.status(201).json({
                                    message: `User ${req.body.firstname} ${req.body.lastname} was created successfully.`,
                                    success: true
                                })
                            })
                            .catch(function(err) {
                                res.status(500).json({
                                    message: `Failed to create user ${req.body.firstname} ${req.body.lastname}.`,
                                    errorcode: "500",
                                    success: false
                                })
                            })
                    }
                })
            }
        })
        .catch(function(err) {
            res.status(500).json({ 
                error: "failed"
            })
        }) 
}

exports.login = function(req, res) {
    User.find({ email: req.body.email })
        .then(function(user) {
            if(user.length === 0) {
                return res.status(401).json({
                    message: "User email or password is incorrect -1",
                    message2: "No user with this email address exists.",
                    success: false
                })
            } else {
                encrypt.compare(req.body.password, user[0].password, function(err, result) {
                    if(err) {
                        return res.status(401).json({
                            message: "User email or password is incorrect -2",
                            success: false
                        })
                    } 

                    if(result) {
                        const token = jwt.sign( 
                            { id: user[0]._id, email: user[0].email },
                            process.env.PRIVATE_SECRET_KEY,
                            { expiresIn: "24h" }                        
                        )

                        return res.status(200).json( {
                            message: "Authentication was successful",
                            success: true,
                            token: token,
                            id: user[0]._id
                        })
                    }

                    return res.status(401).json({
                        message: "User email or password is incorrect -3",
                        success: false
                    })
                })
            }
        })
}

exports.getUsers = function(req, res) {
    User.find()
        .exec()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(500).json({ 
            errorcode: "500",
            message: "Something went wrong",
            success: false
         }));
}

exports.getUser = (req, res) => {
    User.find( { _id: req.params.id } )
        .exec()
        .then((user) => res.status(200).json(user))
        .catch(() => res.status(500).json({ 
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}

exports.updateUser = (req, res) => {
    User.updateOne( { _id: req.params.id } )
        .exec()
        .then((user) => res.status(200).json({message: `User ${user.firstname} ${user.lastname} was updated.`}))
        .catch(() => res.status(500).json({ 
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
    }

exports.deleteUser = (req, res) => {
    User.deleteOne( { _id: req.params.id } )
        .exec()
        .then(user => res.status(200).json({
            message: `User was removed.`
        }))
        .catch( () => res.status(500).json({ 
            errorcode: "500",
            message: "Something went wrong",
            success: false
        }));
}