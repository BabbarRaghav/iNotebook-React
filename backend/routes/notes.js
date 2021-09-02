const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    obj = {
        name: 'Raghav',
        email: 'babbarraghav2@gmail.com'
    }
    res.json(obj)
})

module.exports = router