function getFileType(url) {
    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    const videoTypes = ['.mp4', '.mkv', '.webm', '.avi', '.mov'];
    const audioTypes = ['.mp3', '.wav', '.ogg', '.aac'];
    const documentTypes = ['.pdf', '.doc', '.docx', '.ppt', '.txt'];
  
    const fileExtension = url.split('.').pop().toLowerCase();
    console.log('fileExtension', fileExtension);
  
    if (imageTypes.includes(`.${fileExtension}`)) return 'image';
    if (videoTypes.includes(`.${fileExtension}`)) return 'video';
    if (audioTypes.includes(`.${fileExtension}`)) return 'audio';
    if (documentTypes.includes(`.${fileExtension}`)) return 'document';
    return 'unknown';
  }
  module.exports = { getFileType };