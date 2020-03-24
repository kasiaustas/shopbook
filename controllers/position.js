const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

//post
module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            imageSrc: req.file ? req.file.path : '',
            externalLink: req.body.externalLink,
            countryList: req.body.countryList,
            description: req.body.description,
            active: req.body.active,
            category: req.body.category,
            user: req.user.id
        }).save();
        res.status(201).json(position);
    } catch (e) {
        errorHandler(res, e)
    }
};

//get:categoryId
module.exports.getByCategoryId = async function (req, res) {
   try {
       const positions = await Position.find({
           category: req.params.categoryId,
           active: true
       });
       res.status(200).json(positions);
   } catch (e) {
       errorHandler(res, e)
   }
};

//delete
module.exports.remove = async function (req, res) {
    try {
        await  Position.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Позиция была удалена.'
        });
    } catch (e) {
        errorHandler(res, e)
    }
};

//patch
module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true} //обновит определенную запись в mongoose и только после этого нам ее вернёт
            );
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e)
    }
};

