const express = require('express');
const router = express.Router();

const Keyword = require('../controller/keyword');
const keyword_ = new Keyword();

//add
router.post('/add',async (req, res,next) => {
    
    const data = req.body;
    console.log('data:', data)
    try {
        const keyword = data.keyword
        console.log('message:', keyword)
        
            const add_keyword = await keyword_.add({ data })
            console.log('key:', add_keyword);
            return res.status(200).json({ success: true, message: 'keyword saved' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message, error })
        next(error)
    }
})

//list
router.post('/list',async (req,res,next) =>{
    try{
    const list_keyword = await keyword_.listKeyword({})
    return res.status(200).json({ success: true, message: 'keyword listed' })
} catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message, error })
    next(error)
}

})

module.exports = router;