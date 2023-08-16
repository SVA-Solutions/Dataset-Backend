var multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_key,
    api_secret: process.env.cloudinary_api_secrate
  });
  
  // Multer configuration
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'image-uploads', // Cloudinary folder where images will be stored
      allowedFormats: ['jpg', 'jpeg', 'png'],
      filename: function (req, file, cb) {
        const originalFilename = file.originalname;
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${originalFilename}`;
        cb(null, uniqueFilename);
      }
    }
  });
  const uploadPhoto = (folderName, fields) => {
    const upload = multer({ storage: storage }).fields(fields);
    return (req, res, next) => {
      upload(req, res, err => {
        if (err) {
          return res.status(400).json({ message: 'Image upload failed.' });
        }
        next();
      });
    };
  };
  // const uploadPhoto = multer({ storage: storage });

  module.exports = uploadPhoto;