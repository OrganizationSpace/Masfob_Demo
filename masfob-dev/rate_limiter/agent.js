require('dotenv').config();
const Agent_ = require('../schema/agent')


const agentRateLimiter = async (req, res, next) => {
    try {
        const maxAgents = parseInt(process.env.MAX_AGENTS);
        const agentCount = await Agent_.aggregate([
            {$match: { workspace: req.workspace } },
             { $count: "totalAgents" } 
        ]);
    
       if ( agentCount.length > 0 &&agentCount[0].totalAgents >= maxAgents) {
        return res.status(429).json({
            success: false,
            message: 'Workspace already has the maximum number of agents (10)',
        });
    }

        next();
    } catch (error) {
        next(error); 
    }
};
module.exports =agentRateLimiter
