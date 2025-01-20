const express = require('express');
const router = express.Router();

const TestFlow_ = require('../controller/test');
const testflow = new TestFlow_();
const TestFlow = require('../schema/test'); // Adjust path to your test schema file

router.post('/create', async (req, res) => {
  console.log("Request body:", JSON.stringify(req.body, null, 2)); // Log the request body

  const { flow } = req.body;

  try {
    // Ensure 'flow' is an array
    if (!Array.isArray(flow)) {
      return res.status(400).json({
        success: false,
        message: "'flow' must be an array."
      });
    }

    const workflows = [];

    // Process each flow in the input
    for (const item of flow) {

      // Map nodes with generated IDs and default values for node_type if missing
      const nodes = (item.nodes || []).map(node => ({
        id: node.id ,
        node_type: node.node_type || "default", // Set default value if node_type is missing
        label: node.label,
        position: node.position,
        answer: node.answer
      }));

      // Map edges with generated IDs if missing
      const edges = (item.edges || []).map(edge => ({
        id: edge.id ,
        source: edge.source,
        sourceHandle: edge.sourceHandle,
        target: edge.target,
        targetHandle: edge.targetHandle
      }));

      // Prepare the workflow object
      const workflow = {
        name: item.name || "Untitled Workflow",
        question: item.question || "",
        answer: item.answer || {},
        workspace: req.body.workspace || "",
        waba_id: req.body.waba_id || "",
        phone_number_id: req.body.phone_number_id || "",
        nodes,
        edges
      };

      workflows.push(workflow);
    }

    // Save all workflows to the database
    const savedWorkflows = await testflow.addWorkflow({ newWorkflow: workflows });
    console.log("Workflows saved successfully:", savedWorkflows);

    return res.status(200).json({
      success: true,
      message: "Workflows created successfully.",
      workflows: savedWorkflows
    });
  } catch (error) {
    console.error("Error creating workflows:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating workflows.",
      error: error.message
    });
  }
})

router.post('/createv2', async (req, res) => {
    console.log("Request body:", JSON.stringify(req.body, null, 2)); // Log the request body
  
    const { flow } = req.body;
  
    try {
      // Ensure 'flow' is an array
      if (!Array.isArray(flow)) {
        return res.status(400).json({
          success: false,
          message: "'flow' must be an array."
        });
      }
  
      const workflows = [];
  
      for (const item of flow) {
        // Validate that 'name' is provided for each flow
        if (!item.name) {
          return res.status(400).json({
            success: false,
            message: "'name' is required for each workflow."
          });
        }
  
        let fileType;
        const name_file = item.answer.url;
        console.log("name", name_file);
  
        // Fetch asset details from the database
        try {
          const asset_match = await testflow.fetchAsset({ name: name_file });
  
          if (asset_match) {
            fileUrl = asset_match.url; // Use the matched URL from the asset database
            fileType = asset_match.type; // Use the matched type from the asset database
            console.log(`Asset match found for ${item.answer.url}: ${fileUrl}`);
          }
        } catch (error) {
          console.error('Error finding asset in database:', error.message);
          return res.status(500).json({
            success: false,
            message: `Error finding asset for flow ID: ${item.id}`,
          });
        }
  
        // Map nodes and edges as needed
        const nodes = (item.nodes || []).map(node => ({
          id: node.id,
          node_type: node.node_type || "default",
          label: node.label,
          position: node.position,
          answer: node.answer
        }));
  
        const edges = (item.edges || []).map(edge => ({
          id: edge.id,
          source: edge.source,
          sourceHandle: edge.sourceHandle,
          target: edge.target,
          targetHandle: edge.targetHandle
        }));
  
        // Prepare the workflow object
        const workflow = {
          name: item.name || "",
          question: item.question || "",
          answer: {
            linkType: fileType,
            link: fileUrl,
            text: item.answer.text || '',
            button: item.answer.button || [],
          },
          workspace: req.body.workspace || "",
          waba_id: req.body.waba_id || "",
          phone_number_id: req.body.phone_number_id || "",
          nodes,
          edges
        };
  
        workflows.push(workflow);
      }
  
      // Save all workflows to the database
      const savedWorkflows = await testflow.addWorkflow({ newWorkflow: workflows });
      console.log("Workflows saved successfully:", savedWorkflows);
  
      return res.status(200).json({
        success: true,
        message: "Workflows created successfully.",
        workflows: savedWorkflows
      });
    } catch (error) {
      console.error("Error creating workflows:", error.message);
      return res.status(500).json({
        success: false,
        message: "Error creating workflows.",
        error: error.message
      });
    }
  });
  
module.exports = router;



