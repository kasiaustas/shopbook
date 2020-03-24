const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const bodyParser = require('body-parser')
const cors = require('cors') //чтобы сервер мог обрабатывать cors запросы (если сервер будет на др домене)
const morgan = require('morgan')//чтобы красиво могли логировать запросы
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys')
const app = express()

//Подключение к базе данных--------------------------------------
mongoose.connect(keys.mongoURI, {
                               useNewUrlParser: true,
                               useUnifiedTopology: true,
                               useCreateIndex: true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error))
//---------------------------------------------------------------

//Инициализация пакета паспорта----------------------------------
app.use(passport.initialize());
require('./middleware/passport')(passport) //прописана логика авторизации и защиты роутов
//---------------------------------------------------------------

app.use(morgan('dev'))
//даст возможность получать доступ к картинкам на прямую в браузере, например localhost:5000/uploads/26012020-193829_967-kotiki-23.jpg
app.use('/uploads', express.static('uploads'))
app.use(cors())
//Парсит все данные, которые приходят от пользователя
app.use(bodyParser.urlencoded({extended: true}))
//Генерирует js объекты из json, который мы получаем
app.use(bodyParser.json())


//Регистрация роутов
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)

module.exports = app