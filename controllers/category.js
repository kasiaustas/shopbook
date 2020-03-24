const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

//get
module.exports.getAll = async function (req, res) {

    try {
      //const categories = await Category.find({user: req.user.id});
       const categories = await Category.find({});
      res.status(200).json(categories);
   } catch (e) {
     errorHandler(res, e)
   }


};

//get
module.exports.getById = async function (req, res) {
   try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
   } catch (e) {
     errorHandler(res, e)
   }
};

//delete
module.exports.remove = async function (req, res) {
   try {
      await Category.remove({_id: req.params.id});
      await Position.remove({category: req.params.id});
      res.status(200).json({
         message: 'Категория удалена.'
      });
   } catch (e) {
     errorHandler(res, e)
   }
};

//post
module.exports.create = async function (req, res) {
   const category = new Category({
      name: req.body.name,
      user: req.user.id,
      active: req.body.active
   });
   try {
     await category.save();
     res.status(201).json(category);
   } catch (e) {
      errorHandler(res, e)
   }
};

module.exports.update = async function (req, res) {
   const updated = {
      name: req.body.name,
      active: req.body.active
   }

   try {
      const category = await Category.findOneAndUpdate(
          {_id: req.params.id},
          {$set: updated},
          {new: true}
      );

      //Если категорию делаем неактивной, то и все позиции внутри нее автоматически тоже
      if (!req.body.active){
           const position = await Position.updateMany(
               {category: req.params.id},
               {active: false}
           );
       }
      res.status(200).json(category);
   } catch (e) {
      errorHandler(res, e)
   }
};
