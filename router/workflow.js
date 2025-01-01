const express = require('express');
const router = express.Router();
const Workflow = require('../controller/workflow'); // Import the Workflow schema/model
const workflow = new Workflow();

// router.post('/data', async (req, res) => {
//     const data = req.body.flow?.flow; // Extracting data from the request body
//     console.log(data);
//     try {
//         const workflows = await workflow.add({flow:data}); // Call the updated method
//         res.status(200).json({ success: true, workflows });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error adding workflows', error: error.message });
//     }
// });


router.post('/data1', async (req, res) => {
    const flow = req.body.flow?.flow; // Extracting data from the request body
    const workspace =req.body.workspace;
    console.log(flow);
    console.log(workspace);
    try {
        const workflows = await workflow.add({flow,workspace}); // Call the updated method
        if (!workflows|| !workflows.length===0) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
          }
        res.status(200).json({ success: true, workflows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding workflows', error: error.message });
    }
});


// Export the router
module.exports = router;
