require('dotenv').config();
const Asset_ = require('../schema/asset');

const assetRateLimiter = async (req, res, next) => {
    try { 
            const maxAssets = parseInt(process.env.MAX_ASSET_SIZE);
            const totalAssetSizeResult = await Asset_.aggregate([
                { $match: { workspace: req.workspace } },
                { $group: { _id: null, totalAssetSize: { $sum: "$size" } } }
            ]);

            const totalAssetSize = totalAssetSizeResult.length > 0 ? totalAssetSizeResult[0].totalAssetSize : 0;
            //const finalSize = totalAssetSize ;
        //     console.log("++++++++++++++++++++++++++++++++++");
        // console.log(totalAssetSize);
        // console.log(maxAssets);
        // console.log("++++++++++++++++++++++++++++++++++");

            if (totalAssetSize > maxAssets) {
                return res.status(429).json({
                    success: false,
                    message: 'Adding this asset exceeds the maximum allowed asset size for the workspace (500MB)',
                });
            }

            next();  
       
    } catch (error) {
        next(error);
    }

};

module.exports = assetRateLimiter;
