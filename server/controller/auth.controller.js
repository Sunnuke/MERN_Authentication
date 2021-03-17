const { User } = require("../models/auth.model");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

module.exports.index = (request, response) => {
    response.json({
        message: "Connected!"
    });
}

// ES7 Form : async/await
module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            console.log("User:");
            console.log(user);
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true,
                    path:'/'
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.status(400).json(err));
}

// ES7 Form : async/await
module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        // if email not found in users collection
        return res.sendStatus(400);
    }

    // if user is found with email address, compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // if password wasn't a match!
        return res.sendStatus(400);
    }

    // if password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
    // note: chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {httpOnly: true, path:'/'})
        .json({ msg: "success!", user: user });
}

module.exports.logout = (req, res) => {
    // res.clearCookie('usertoken');
    // res.cookie('usertoken', null, {httpOnly: true});
    res.clearCookie('usertoken', {path:'/'})
    console.log("LOGOUT:")
    console.log(res.cookie('usertoken'))
    res.sendStatus(200);
}

module.exports.getAll = async(req, res) => {
    const userToken = req.cookies.usertoken;
    if (userToken === null) {
        res.status(400).json({ msg: "Loading users... (must login to view list)" });
    }
    const users = await User.find({});
    
    res.json(users);
}
