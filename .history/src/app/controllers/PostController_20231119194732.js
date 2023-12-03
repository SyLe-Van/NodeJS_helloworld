const fs = require('fs');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'public/uploads/' });
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const secret = 'uit20521854'

 class PostController {
    // [POST] /Post
    async post(req, res) {
      const {originalname, path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
      
      const {token} = req.cookies;
      console.log(token)
      jwt.verify(token, secret, {}, async (err, info) => {
         
          if(err){
            console.log(err)
            throw err;
          }

          const {title, content, categories} = req.body;
          const postDoc =  await Post.create({
            title,
            content,
            categories,
            cover: newPath,
            author: info.id,
          })
        res.json(postDoc)
      })

    }
    // [GET] /Post
    async getPost(req, res) {
        res.json(await Post.find()
          .populate('author',['username'])
          .sort({createdAt: -1})
        )
    }
}
module.exports = new PostController;
  