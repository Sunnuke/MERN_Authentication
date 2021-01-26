const { _HERE } = require("../models/_HERE.model");

module.exports.index = (request, response) => {
    response.json({
        message: "Connected!"
    });
}

module.exports.create_HERE = (request, response) => {
    const { ATTRIBUTES_HERE } = request.body;
    MODEL_HERE.create({ ATTRIBUTES_HERE })
        .then(_HERE => response.json(_HERE))
        .catch(err => response.status(400).json(err));
}

module.exports.all_HERE = (request, response) => {
    MODEL_HERE.find({})
        .then(_HERE => response.json(_HERE))
        .catch(err => response.status(400).json(err));
}
module.exports.one_HERE = (request, response) => {
    MODEL_HERE.findOne({_id:request.params.id})
        .then(_HERE => response.json(_HERE))
        .catch(err => response.status(400).json(err));
}

module.exports.Update_HERE = (request, response) => {
    MODEL_HERE.updateOne({_id: request.params.id}, request.body, {new: true, runValidators: true})
        .then(updated => response.json(updated))
        .catch(err => response.status(400).json(err));
}

module.exports.delete_HERE = (request, response) => {
    MODEL_HERE.findOneAndDelete({_id: request.params.id})
        .then(deleted => response.json(deleted))
        .catch(err => response.status(400).json(err));
}