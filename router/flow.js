const express = require('express');
const router = express.Router();
//const workflowController = require('../controller/flow');
const generateUniqueId = require('../function/generatedUniqueId');

//const flowController =require('../controller/flow')

// POST route to create or update a flow
// router.post('/create', async (req, res) => {
//   try {
//     const { name, nodes, edges } = req.body;
//   // Validate required fields
//     if (!name || !Array.isArray(nodes) || !Array.isArray(edges)) {
//           return res.status(400).json({ error: "Invalid data format" });
//         }

//     // Create a new flow document
//     const flow = await flowController.add({
//       name,
//       nodes,
//       edges
//     });

//     res.status(200).json({ message: 'Flow created successfully', flow });
//   } catch (error) {
//     console.error('Error creating flow:', error);
//     res.status(500).json({  error: error.message || "Error creating flow" });
//   }
// });

// GET route to retrieve flow by name
// router.get('/list', async (req, res) => {
//   try {
//       const workflows = await flowController.list({}); 
//       res.status(200).json({ success: true, workflows });
//   } catch (error) {
//       res.status(500).json({ success: false, message: 'Error fetching workflows', error: error.message });
//   }
// }
// );

// POST route to create a new workflow
router.post('/create', async (req, res) => {
  try {
    const workflow = await workflowController.createWorkflow(req.body);
    res.status(201).json({ message: 'Workflow created successfully', workflow });
  } catch (error) {
    console.error('Error creating workflow:', error);
    res.status(500).json({ error: error.message || 'Error creating workflow' });
  }
});

router.post('/addv2', async (req, res) => {
  console.log('req.body:', JSON.stringify(req.body, null, 2)); // Log the body fully

  const { flow } = req.body;

  try {
    // Validate that 'flow' is an array
    if (!Array.isArray(flow)) {
      return res.status(400).json({
        success: false,
        message: "'flow' must be an array.",
      });
    }

    const processedWorkflows = [];

    // Process each flow in the input
    for (const item of flow) {
      // Validate required fields in each flow
      if (!item.name || !item.nodes || !item.edges) {
        return res.status(400).json({
          success: false,
          message: "Each flow must have 'name', 'nodes', and 'edges' fields.",
        });
      }

      // Validate 'nodes' array
      if (!Array.isArray(item.nodes)) {
        return res.status(400).json({
          success: false,
          message: "Each flow must have 'nodes' as an array.",
        });
      }

      // Validate 'edges' array
      if (!Array.isArray(item.edges)) {
        return res.status(400).json({
          success: false,
          message: "Each flow must have 'edges' as an array.",
        });
      }

      // Validate nodes structure
      for (const node of item.nodes) {
        if (
          !node.id ||
          !node.node_type ||
          !node.label ||
          !node.position ||
          typeof node.position.x !== 'number' ||
          typeof node.position.y !== 'number' ||
          !node.answer ||
          typeof node.answer !== 'object' ||
          !node.answer.text
        ) {
          return res.status(400).json({
            success: false,
            message: `Each node must have 'id', 'node_type', 'label', 'position', and 'answer' with a 'text' field. Error at node ID: ${node.id || 'unknown'}`,
          });
        }

        // Validate 'button' array in answer
        if (node.answer.button && !Array.isArray(node.answer.button)) {
          return res.status(400).json({
            success: false,
            message: `'button' must be an array for node ID: ${node.id}`,
          });
        }
      }

      // Validate edges structure
      for (const edge of item.edges) {
        if (!edge.id || !edge.source || !edge.sourceHandle || !edge.target || !edge.targetHandle) {
          return res.status(400).json({
            success: false,
            message: `Each edge must have 'id', 'source', 'sourceHandle', 'target', and 'targetHandle'. Error at edge ID: ${edge.id || 'unknown'}`,
          });
        }
      }

      // Prepare the workflow object to save
      const workflowToSave = {
        id: item.id || generateUniqueId(), // Generate a unique ID if not provided
        name: item.name,
        question: item.question || '',
        node_type: item.node_type || 'default', // Default node_type
        answer: {
          type: '', // Placeholder for file type
          url: item.answer?.url || '',
          text: item.answer?.text || '',
          button: item.answer?.button || [],
        },
        workspace: req.body.workspace || '',
        waba_id: req.body.waba_id || '546388148553591',
        phone_number_id: req.body.phone_number_id || '566917379828344',
        nodes: item.nodes,
        edges: item.edges,
      };

      console.log('Workflow to Save:', JSON.stringify(workflowToSave, null, 2));

      // Save the workflow to the database
      try {
        const savedWorkflow = await workflowController.addWorkflows({
          newWorkflow: workflowToSave,
        });
        console.log(`Workflow saved for flow ID ${item.id}:`, savedWorkflow);

        processedWorkflows.push({ flowId: item.id, workflow: savedWorkflow });
      } catch (error) {
        console.error('Error saving workflow:', error.message);
        return res.status(500).json({
          success: false,
          message: `Error saving workflow for flow ID: ${item.id}`,
        });
      }
    }

    // Respond with success and saved workflows
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




// // GET route to retrieve a workflow by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const workflow = await workflowController.getWorkflowById(id);
//     res.status(200).json({ workflow });
//   } catch (error) {
//     console.error('Error fetching workflow:', error);
//     res.status(500).json({ error: error.message || 'Error fetching workflow' });
//   }
// });

// // DELETE route to delete a workflow by ID
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedWorkflow = await workflowController.deleteWorkflow(id);
//     res.status(200).json({ message: 'Workflow deleted successfully', workflow: deletedWorkflow });
//   } catch (error) {
//     console.error('Error deleting workflow:', error);
//     res.status(500).json({ error: error.message || 'Error deleting workflow' });
//   }
// });


module.exports = router;