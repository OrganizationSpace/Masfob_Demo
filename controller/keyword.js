const Keyword_ = require('../schema/keyword')
const Workflow_ = require('../schema/workflow')

class keywordController {

//add keyword by workflow name
async add({ data }) {
  try {
    const name = data.name;
    console.log('name:',name);

    const keyword = data.keyword;
    console.log('keyword:',keyword);

    const findName = await Workflow_.findOne({ name: name });
      console.log('findName:', findName);
  
    if (findName) {
      const addKeyword = new Keyword_({ name: findName.name, keyword: keyword });
      const savedKeyword = await addKeyword.save();
      console.log('addKeyword:', savedKeyword);
      return savedKeyword; 
    } else {
      console.log('name does not exist:', name);
      return { message: `Name ${name} does not exist.` }; 
    }
  } catch (error) {
    console.error('Error in keywordAdd:', error); 
    throw error; 
  }
}

//list keyword
async listKeyword({}) {
  try{
    const result = await Keyword_.find({})
    return result
  }
  catch(error) {
    console.error('Error in keywordAdd:', error); 
    throw error; 
  }
}

//list  workflow
async fetch({key}) { 
    try {
      
      const result = await Keyword_.find({keyword: key}); 
      console.log('result:',result);
      return result;

} catch (error) {
  console.error('Error fetching workflows:', error);
  res.status(500).json({ message: 'Error fetching workflows', error });
}
}

async delete({ keyword}) {
  try{
    const result = await Keyword_.deleteOne({keyword: keyword})
    return result
  }
  catch(error) {
    console.error('Error in keywordAdd:', error); 
    throw error; 
  }
}

//fetch workflow by keyword(sona)
async fetchKeyword({key}) {
    try {
        const fetchedKeyord = await Keyword_.find({keyword: key});
        console.log("fetchedkeyword:", fetchedKeyord);

        // Access the 'name' property from the first element of the array
        const keyword = fetchedKeyord[0]?.name; 
        console.log("keyword:", keyword);

        if (!keyword) {
            throw new Error('Keyword not found');
        }

        const result = await Workflow_.find({name: keyword});
        console.log("listed keyword:", result);

        // Return both the keyword and the workflows
        return { keyword, workflows: result };
    } catch (error) {
        console.error('Error in fetchKeyword:', error); 
        throw error; 
    }
}

//delete keyword(sona)
async deleteKeyword({id}) {
    try {
        
        const result = await Keyword_.deleteOne({ _id: id});
        console.log("deleted keyword:", result);
        return  result 
    } catch (error) {
        console.error('Error in deleting Keyword:', error); 
        throw error; 
    }
}

}

module.exports = keywordController;