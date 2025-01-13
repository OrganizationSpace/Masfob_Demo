const express = require('express');
const router = express.Router();

const Keyword = require('../controller/keyword');
const keyword_ = new Keyword();
const Workflow = require('../schema/workflow');

//add
router.post('/add',async (req, res,next) => {
    
    const data = req.body;
    console.log('data:', data)
    try {
        const keyword = data.keyword
        console.log('message:', keyword)
        
            const add_keyword = await keyword_.add({ data })
            console.log('key:', add_keyword);
            return res.status(200).json({ success: true, message: 'keyword saved' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error.message, error })
        next(error)
    }
})

//list
router.post('/list',async (req,res,next) =>{
    try{
    const list_keyword = await keyword_.listKeyword({})
    return res.status(200).json({ success: true, message: 'keyword listed' ,data : list_keyword })
} catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message, error })
    next(error)
}

})

// Route to fetch workflows based on a keyword
router.post('/fetch', async (req, res) => {
    const { key } = req.body;

    try {
        // Step 1: Fetch the keyword from the 'keyword_' collection
        const fetchedKeyword = await keyword_.fetch({  key });
        console.log('fetchedKeyword:', fetchedKeyword);
        if (!fetchedKeyword) {
            return res.status(404).json({ success: false, message: 'Keyword not found.' });
        }

        const name = fetchedKeyword[0]?.name;
        console.log('name:', name);

        // Step 2: Use the 'name' from the fetched keyword to find workflows in the 'Workflow_' collection
        const workflows = await Workflow.find({ name: name });

        if (workflows.length === 0) {
            return res.status(404).json({ success: false, message: 'No workflows found for this keyword.' });
        }

        // Step 3: Return the workflows
        res.status(200).json({
            success: true,
            message: 'Workflows fetched successfully.',
            keyword: fetchedKeyword[0]?.keyword,
            data: workflows,
        });
    } catch (error) {
        console.error('Error fetching workflows:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching workflows.',
            error: error.message,
        });
    }
});

// Route to delete a keyword by keyword value
router.post('/delete', async (req, res) => {
    const { keyword } = req.body;

    try {
        // Step 1: Find and delete the keyword by the 'keyword' field
        const deletedKeyword = await keyword_.delete({ keyword });

        // Step 2: Check if the keyword was found and deleted
        if (!deletedKeyword) {
            return res.status(404).json({ success: false, message: 'Keyword not found.' });
        }

        // Step 3: Return success response
        res.status(200).json({
            success: true,
            message: 'Keyword deleted successfully.',
            data: deletedKeyword,
        });
    } catch (error) {
        console.error('Error deleting keyword:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting keyword.',
            error: error.message,
        });
    }
});

module.exports = router;