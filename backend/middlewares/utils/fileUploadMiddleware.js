import multer from 'multer';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    const filename = `${v4()}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
