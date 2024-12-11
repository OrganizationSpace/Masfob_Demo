require('dotenv').config();
const Organization_ = require('../schema/organization')


const labelRateLimiter = async (req, res, next) => {
    try {
        const maxLabels = parseInt(process.env.MAX_LABELS);
        const labelCount = await Organization_.aggregate([
            {$match: { workspace: req.workspace } },
            { $unwind: "$customer_labels" },
            { $count: "totalLabels" }
        ]);
    
        if ( labelCount.length > 0 &&labelCount[0].totalLabels >= maxLabels) {
        return res.status(429).json({
            success: false,
            message: 'Already has the maximum number of labels (20)',
        });
    }

        next();
    } catch (error) {
        next(error); 
    }
};
module.exports =labelRateLimiter
