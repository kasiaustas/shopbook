const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if(candidate){
        //Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60});//час 60сек*60мин время жизни токена

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
        else{
            res.status(401).json({
                message:'Вы ввели неправильный пароль.'
            })
        }
    } else{
        //Пользователя нет, ошибка
        res.status(404).json({
            message:'Пользователь с таким email не найден.'
        })
    }
}

module.exports.register= async function (req, res) {

    //ищем по полю email
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        //Если пользователь нашелся, нужно отправить ошибку (https://httpstatuses.com/)
        res.status(409).json({
            message:'Такой емейл уже занят. Попробуйте другой.'
        })
    }
    else {
        //Если пользователь не нашёлся, создаем нового
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }

    }
}

module.exports.account = async function (req, res) {

    const user = req.user
    if(!user){
        res.status(401).json({
            message:'Для доступа к кабинету пользователя авторизуйтесь в системе'
        })
    }
    else {
        res.status(200).json(user);
    }

}