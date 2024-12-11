require('dotenv').config();
const Customer_ = require('../schema/customer')


const customerRateLimiter = async (req, res, next) => {
    try {
        const maxCustomers = parseInt(process.env.MAX_CUSTOMERS);
        const customerCount = await Customer_.aggregate([
            { $match: { workspace:req.workspace } },
             { $count: "totalClients" } 
        ]);

        const currentCount = customerCount.length > 0 ? customerCount[0].totalClients : 0;
        const newCustomersCount = req.decryptedData.length;

        if (currentCount + newCustomersCount >= maxCustomers) {
            return res.status(429).json({
                success: false,
                message: 'Workspace already has the maximum number of customers (10000)',
            });
        }

        next();
    } catch (error) {
        next(error); 
    }
};
module.exports =customerRateLimiter
