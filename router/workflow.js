const express = require('express');
const router = express.Router();
const Workflow = require('../controller/workflow'); 
const workflow = new Workflow();

//add workflow
router.post('/add', async (req, res) => {
    const data = req.body.flow?.flow; 
    console.log(data);
    try {
        const workflows = await workflow.add({flow:data}); 
		console.log('workflows:', workflows);

        res.status(200).json({ success: true, workflows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding workflows', error: error.message });
    }
}); 

router.post('/addv2', async (req, res) => {
    console.log("req.body:", JSON.stringify(req.body, null, 2));

    const { flow } = req.body;

    try {
        if (!Array.isArray(flow)) {
            return res.status(400).json({
                success: false,
                message: "'flow' must be an array."
            });
        }

        const processedWorkflows = [];

        for (const item of flow) {
            if (!item.name) {
                return res.status(400).json({
                    success: false,
                    message: "Each flow must have a 'name' field."
                });
            }

            // Validate nodes
            for (const node of item.nodes) {
                if (!node.id || !node.node_type || !node.answer) {
                    return res.status(400).json({
                        success: false,
                        message: "Each node in the flow must have 'id', 'node_type', and 'answer' fields."
                    });
                }

                if (!node.answer.text) {
                    return res.status(400).json({
                        success: false,
                        message: `Node answer must contain 'text' for node ID: ${node.id}`
                    });
                }

                if (node.answer.button && !Array.isArray(node.answer.button)) {
                    return res.status(400).json({
                        success: false,
                        message: `'button' must be an array for node ID: ${node.id}`
                    });
                }

                // Fetch the asset if there is a name in the answer.url
                if (node.answer.url && node.answer.url !== '') {
                    try {
                        const asset = await workflow.fetchAsset({ name: node.answer.url });

                        if (asset) {
                            node.answer.url = asset.url;
                            console.log(node.answer.url)
                            node.answer.type = asset.type;
                            node.answer.format = asset.format;
                            node.answer.size = asset.size;
                        } else {
                            console.error(`Asset not found for name: ${node.answer.url}`);
                        }
                    } catch (error) {
                        return res.status(500).json({
                            success: false,
                            message: `Error fetching asset for node ID: ${node.id}`,
                            error: error.message,
                        });
                    }
                }
            }

            // Process the workflow...
            const workflowToSave = {
                id: item.id || `${Date.now()}`, // Generate ID if not provided
                name: item.name,
                question: item.question || '',
                node_type: item.node_type || 'default', // Default type if missing
                answer: item.answer || {}, // Fallback to empty if missing
                workspace: req.body.workspace || '',
                waba_id: req.body.waba_id || '3422342342242142424',
                phone_number_id: req.body.phone_number_id || '123234234232334',
                nodes: item.nodes,
                edges: item.edges,
            };

            try {
                // Save the workflow
                const savedWorkflow = await workflow.addWorkflows({ newWorkflow: workflowToSave });
                processedWorkflows.push({ flowId: item.id, workflow: savedWorkflow });
            } catch (error) {
                console.error('Error saving workflow:', error.message);
                return res.status(500).json({
                    success: false,
                    message: `Error saving workflow for flow ID: ${item.id}`,
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Workflows added successfully.',
            workflows: processedWorkflows,
        });
    } catch (error) {
        console.error('Error processing workflows:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Error processing workflows',
            error: error.message,
        });
    }
});

//list workflow by key
router.post('/fetch', async (req, res) => {
    const {key} = req.body; 
    console.log('key:', key);
    try {
        const fetch_workflows = await workflow.fetch({key}); 
        if (!fetch_workflows || fetch_workflows.length===0) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
          }
        res.status(200).json({ success: true, fetch_workflows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching workflows', error: error.message });
    }
}
);

//list all workflow
router.get('/list', async (req, res) => {
  
    try {
        const workflows = await workflow.list({}); 
        res.status(200).json({ success: true, workflows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching workflows', error: error.message });
    }
}
);

//delete workflow
router.post('/delete', async (req, res) => {
    const {id} = req.body; 
    console.log('key:', id);
    try {
        const delete_workflow = await workflow.delete({id}); 
        console.log('delete_workflow:', delete_workflow);
        if (!delete_workflow) {
            return res.status(400).json({ success: false, message: 'Invalid request data' });
          }
        res.status(200).json({ success: true, message: 'wokflow deleted', delete_workflow });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching workflows', error: error.message });
    }
}
);
  
module.exports = router;


// //add workflow with file(final)
// router.post('/addv2', async (req, res) => {
//     let rawFlows = req.body.flow; // Incoming data from the frontend

//     try {
//         // Parse `rawFlows` if it is a string
//         if (typeof rawFlows === 'string') {
//             rawFlows = JSON.parse(rawFlows);
//         }
//         console.log('Parsed Flows:', JSON.stringify(rawFlows, null, 2));

//         const processedWorkflows = [];

//         // Validate the structure of the parsed data
//         if (!Array.isArray(rawFlows)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "'flow' must be an array.",
//             });
//         }

//         // Process each flow in the array
//         for (const flow of rawFlows) {
//             if (!flow.id || !flow.name || !flow.answer || !flow.answer.url) {
//                 return res.status(400).json({
//                     success: false,
//                     message: `Each flow must have 'id', 'name', and 'answer.url' fields.`,
//                 });
//             }
//             //const node_id = flow.id;//id(node_id) from flow to find asset
//             let fileType;
//             let fileUrl = flow.answer.url;// url(name) from flow to find asset
//             const name_file = flow.answer.url;
// 			console.log("name",name_file)
//             // Fetch asset details from the database
//             try {
//                 const asset_match = await workflow.fetchAsset({  name: name_file });

//                 if (asset_match) {
//                     fileUrl = asset_match.url; // Use the matched URL from the asset database
//                     fileType = asset_match.type;// Use the matched type from asset database
//                     console.log(`Asset match found for ${flow.answer.url}: ${fileUrl}`);
//                 }
//             } catch (error) {
//                 console.error('Error finding asset in database:', error.message);
//                 return res.status(500).json({
//                     success: false,
//                     message: `Error finding asset for flow ID: ${flow.id}`,
//                 });
//             }

//             // Prepare the workflow object to save
//             const workflowToSave = {
//                 id: flow.id,
//                 name: flow.name,
//                 type: flow.type,
//                 label: flow.label,
//                 question: flow.question || '',
//                 answer: {
//                     linkType: fileType,
//                     link: fileUrl,
//                     text: flow.answer.text || '',
//                     button: flow.answer.button || [],
//                 },
//                 workspace: req.body.workspace || 'defaultWorkspace',
//                 waba_id: req.body.waba_id || '',
//                 phone_number_id: req.body.phone_number_id || '',
//             };

//             console.log('Workflow to Save:', JSON.stringify(workflowToSave, null, 2));

//             // Save the workflow to the database
//             try {
//                 const savedWorkflow = await workflow.addWorkflows({ newWorkflow: workflowToSave });
//                 console.log(`Workflow saved for flow ID ${flow.id}:`, savedWorkflow);

//                 processedWorkflows.push({
//                     flowId: flow.id,
//                     workflow: savedWorkflow,
//                 });
//             } catch (error) {
//                 console.error('Error saving workflow:', error.message);
//                 return res.status(500).json({
//                     success: false,
//                     message: `Error saving workflow for flow ID: ${flow.id}`,
//                     error: error.message,
//                 });
//             }
//         }

//         // Respond with the processed workflows
//         return res.status(200).json({
//             success: true,
//             message: 'Workflows added successfully.',
//             workflows: processedWorkflows,
//         });
//     } catch (error) {
//         console.error('Error processing workflows:', error.message);
//         return res.status(500).json({
//             success: false,
//             message: 'Error processing workflows',
//             error: error.message,
//         });
//     }
// });