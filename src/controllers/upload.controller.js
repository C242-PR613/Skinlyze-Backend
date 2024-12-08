const bucket = require("../services/storage.service")

async function upload(req,res,next) {
    const image = req.file;
    console.log(image)
    if (!image) {
        return res.status(400).send('No file uploaded.');
      }
    
      const blob = bucket.file("images/" + new Date().toISOString() + "-" + image.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
    
      blobStream.on('error', (err) => {
        res.status(500).send({ message: err.message });
      });
    
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(201).send({ "image_url": publicUrl });
      });
    
      blobStream.end(req.file.buffer);
}

module.exports = {upload}