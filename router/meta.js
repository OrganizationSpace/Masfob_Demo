const express = require('express');
const router = express.Router();
const Meta = require('../controller/meta'); 
const workflow = new Meta();

//send normal message  
router.post('/meta',async (req, res) => {
	
	const data = req.body
	try {
		const result = await workflow.meta({data})
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send image
router.post('/urlmeta',async (req, res) => {
	
	const data = req.body
	try {
		const result = await workflow.meta({data})
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send video
router.post('/video',async (req, res) => {
	
	const data = req.body
	console.log('data:', data)
	try {
		const result = await workflow.meta({data})
		console.log('result:', result)
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send document
router.post('/document',async (req, res) => {
	
	const data = req.body
	console.log('data:', data)
	try {
		const result = await workflow.meta({data})
		console.log('result:', result)
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send location
router.post('/location',async (req, res) => {
	
	const data = req.body
	console.log('data:', data)
	try {
		const result = await workflow.meta({data})
		console.log('result:', result)
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send audio
router.post('/audio',async (req, res) => {
	
	const data = req.body
	console.log('data:', data)
	try {
		const result = await workflow.meta({data})
		console.log('result:', result)
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send image with button
router.post('/buttonmeta',async (req, res) => {
	
	const data = req.body
	try {
		const result = await workflow.meta({data})
		res.status(200).json({ success: true})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send image with button check message 'hi'
router.post('/imgmeta', async (req, res) => {
	try {
	const {message}= req.body;
  console.log('Message:', message);

  const data= {
	"messaging_product": "whatsapp",
	"recipient_type": "individual",
	"to": 917305153529, // WhatsApp user ID
	"type": "interactive",
	"interactive": {
	  "type": "button",
	  "header": {
		"type": "image",
		"image": {
		  "link": "https://picsum.photos/seed/picsum/200/300" // Replace with your image URL
		}
	  },
	  "body": {
		"text": "Hi bro"
	  },
	  "footer": {
		"text": "thank you!™"
	  },
	  "action": {
		"buttons": [
		  {
			"type": "reply",
			"reply": {
			  "id": "change-button",
			  "title": "Change"
			}
		  },
		  {
			"type": "reply",
			"reply": {
			  "id": "cancel-button",
			  "title": "Cancel"
			}
		  }
		]
	  }
	}
  };	
	
	  // Check if the message is "hi"
	  if (message === 'hi') {	  
		const result = await workflow.meta({ data});
		console.log('Result:', result);
		
		return res.status(200).json({ success: true, message: 'sent successfully.' });
	  } else {
		return res.status(400).json({ success: false, message: 'Please send "hi" to trigger the template.' });
	  }
	} catch (error) {
	  console.error('Error sending template:', error);
	  res.status(500).json({ success: false, message: 'Internal server error.', error: error.message });
	}
  })
  
//send image button with workflow
router.post('/send',async (req, res) => {
	
	const data = req.body
	console.log('data:', data)
	try {
		const message = data.message
		console.log('message:', message)
		if(message === 'hi'){
			const metaTesting = await workflow.meta1({ param:data })
			console.log('metaTesting:', metaTesting);
			return res.status(200).json({ success: true, message: 'message match' })
		}
		else{
			console.log('message not match')
			return res.status(400).json({ success: false, message: 'message not match' })
		}
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: error.message, error })
		next(error)
	}
})

//send message with workflow by keyword
router.post('/keywordsend', async (req, res) => {
    const { keyword } = req.body; // Destructure keyword from the request body
    console.log('Received keyword:', keyword);

    try {
        // Fetch the keyword
        const fetchedKeyword = await workflow.fetchKeyword({ keyword });
        if (!fetchedKeyword) {
            console.log('Keyword not found:', keyword);
            throw new Error(`Keyword "${keyword}" not found.`);
        }

        const { name } = fetchedKeyword;
        console.log('Fetched name associated with keyword:', name);

 // Fetch the workflow by name
 const fetchedWorkflow = await workflow.fetchWorkflowByName({ name });
 if (!fetchedWorkflow) {
     console.log('Workflow not found:', name);
     throw new Error(`Workflow with name "${name}" not found.`);
 }

 // Prepare the message data
 const preparedMessageData = await workflow.prepareMessageData({ fetchedWorkflow });
 console.log('Prepared message data:', preparedMessageData);

 // Send the message
 const apiResponse = await workflow.sendMessage({ preparedMessage: preparedMessageData });
 console.log('WhatsApp API Response:', apiResponse.data);

 return res.status(200).json({
     success: true,
     message: 'Message sent successfully.',
        });
    } catch (error) {
        console.error('Error in route:', error);

        // Send error response
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack,
        });

        next(error);
    }
});

router.post('/sendformat', async (req, res) => {
    const { keyword } = req.body; // Destructure keyword and type from the request body
    console.log('Received keyword:', keyword);

    try {
        // Fetch the keyword
        const fetchedKeyword = await workflow.fetchKeyword({ keyword });
        if (!fetchedKeyword) {
            console.log('Keyword not found:', keyword);
            throw new Error(`Keyword "${keyword}" not found.`);
        }

        const { name } = fetchedKeyword;
        console.log('Fetched name associated with keyword:', name);

        // Fetch the workflow by name and type
        const fetchedWorkflow = await workflow.fetchWorkflowByNameAndType({ name });
        if (!fetchedWorkflow) {
            console.log('Workflow not found for name and type:', name, type);
            throw new Error(`Workflow with name "${name}" and type "${type}" not found.`);
        }

        // Prepare the message data
        const preparedMessageData = await workflow.prepareMessageData({ fetchedWorkflow });
        console.log('Prepared message data:', preparedMessageData);

        // Send the message
        const apiResponse = await workflow.sendMessage({ preparedMessage: preparedMessageData });
        console.log('WhatsApp API Response:', apiResponse.data);

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully.',
        });
    } catch (error) {
        console.error('Error in route:', error);

        // Send error response
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.stack,
        });

        next(error);
    }
});

module.exports = router;