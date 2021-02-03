const { User } = require("../models/User.model");
const jwt = require("jsonwebtoken")

index: (request, response) => {
    response.json({
        message: "Connected!"
    });
}

// ES7 Form : async/await
register: (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
}

// ES7 Form : async/await
login: async(req, res) => {
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
            .cookie("usertoken", userToken, secret, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

// module.exports.register = (request, response) => {
//     User.create(req.body)
//     .then(user => {
//         res.json({ msg: "success!", user: user });
//     })
//     .catch(err => res.json(err));
// }

// module.exports.create_HERE = (request, response) => {
//     const { ATTRIBUTES_HERE } = request.body;
//     MODEL_HERE.create({ ATTRIBUTES_HERE })
//         .then(_HERE => response.json(_HERE))
//         .catch(err => response.status(400).json(err));
// }

// module.exports.all_HERE = (request, response) => {
//     MODEL_HERE.find({})
//         .then(_HERE => response.json(_HERE))
//         .catch(err => response.status(400).json(err));
// }
// module.exports.one_HERE = (request, response) => {
//     MODEL_HERE.findOne({_id:request.params.id})
//         .then(_HERE => response.json(_HERE))
//         .catch(err => response.status(400).json(err));
// }

// module.exports.Update_HERE = (request, response) => {
//     MODEL_HERE.updateOne({_id: request.params.id}, request.body, {new: true, runValidators: true})
//         .then(updated => response.json(updated))
//         .catch(err => response.status(400).json(err));
// }

// module.exports.delete_HERE = (request, response) => {
//     MODEL_HERE.findOneAndDelete({_id: request.params.id})
//         .then(deleted => response.json(deleted))
//         .catch(err => response.status(400).json(err));
// }