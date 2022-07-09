const { diskStorage } = require('multer');
const AppError = require('../utils/appError');
const multer = require('multer');
const fs = require('fs');

class Media{
    constructor(des){
        this.des  = des;
    }

    upload(){
        
        const multerStorage = multer.diskStorage({
          destination: (req,file,cb) =>{
            cb(null, this.des);
          },
          filename: (req,file,cb) =>{
            const name = file.originalname.split('.')[0];
            const extension = file.mimetype.split('/')[1];
            cb(null, name + Date.now() + '.' + extension);
            console.log(cb);
          }
        });

        const multerFilter = (req,file,cb) =>{
            if(file.mimetype.startsWith('image')){
                cb(null,true);
            }else{
                cb(new AppError('Not an image', 400), false);
            }
        }

        const upload = multer({
            storage: multerStorage,
            fileFilter: multerFilter
        });


        console.log(upload);
        return upload;
    }

    unLink(folder){
        if(this.des !== null){
            const imageLocation = this.des;
            console.log(this.des);
            const imageName = imageLocation.split('/')[6];
            const path = folder + `/${imageName}`

            console.log(imageName);
            console.log(path);
            fs.unlink(path, error =>{
                if(error){
                    return 'file deleted';
                }
                else{
                    return (new AppError('Something went wrong'));
                }
            });
            return
        }
    }
}

module.exports = Media;