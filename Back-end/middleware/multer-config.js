const multer = require('multer');

// Création d'un objet pour récupartion de l'extension du fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/x-icon': 'ico',
  'image/bmp': 'bmp',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const nameWithoutExtension = name.split('.')[0]
    const extension = MIME_TYPES[file.mimetype];
    callback(null, nameWithoutExtension + Date.now() + '.' + extension);
  }
});

module.exports = multer({
  storage: storage
}).single('image');