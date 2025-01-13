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
}

module.exports = keywordController;