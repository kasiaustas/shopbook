const app = require('./app')
const port = process.env.PORT || 4000
/*
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Working'
    })
})

 */
app.listen(port, () => console.log(`Server has been started on port ${port}`))