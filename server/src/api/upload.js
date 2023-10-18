const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(new Error('Only JPEG and PNG images are allowed!'),false);
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})
router.post('/',upload.single('file'),(req,res,next)=>{
    res.send(req.file.filename);
})

router.get('/a',(req,res,next)=>{
    res.send('hello')
})

module.exports = router;