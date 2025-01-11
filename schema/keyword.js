const mongoose = require('mongoose')

const keyword_schema = mongoose.Schema({
    
    name: {
        type: String,
        trim: true,
    }, //new
    keyword: 
        {
            type: String,
            trim: true,
        }, //new
    
})

module.exports = mongoose.model('keyword_', keyword_schema)
