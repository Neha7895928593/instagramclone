const express = require('express');
const formidable = require('express-formidable');
const {
  createPostController,
  getAllPostController,
  getSinglePostController,
  deletePostController,
  likeController,
  unlikeController,
  commentController,
  getImage,
  mypostController,
} = require('../Controller/postController');
const authMiddleware = require('../middleware/authantication');

const router = express.Router();

router.post('/create', authMiddleware, formidable(), createPostController);
router.get('/', getAllPostController);
router.get('/my-posts', authMiddleware, mypostController); // Updated this line
router.get('/:id', getSinglePostController);
router.delete('/:id', authMiddleware, deletePostController);
router.post('/:postId/like', authMiddleware, likeController);
router.post('/:postId/unlike', authMiddleware, unlikeController);
router.post('/:postId/comment', authMiddleware, commentController);
router.get('/:postId/image', getImage);

module.exports = router;




// const express = require('express');
// const formidable=require('express-formidable')
// const { createPostController, getAllPostController, getSinglePostController, 
//     deletePostController, likeController, unlikeController, commentController, getImage, mypostController } = require('../Controller/postController');
// const authMiddleware = require('../middleware/authantication');


// const router = express.Router();


// router.post('/create', authMiddleware, formidable(),  createPostController)
// router.get('/',getAllPostController)
// router.get('/:id',getSinglePostController)
// router.delete('/:id',authMiddleware,deletePostController)
// router.post('/:postId/like',authMiddleware,likeController)
// router.post('/:postId/unlike', authMiddleware,unlikeController)
// router.post('/:postId/coments',authMiddleware,commentController)
// router.get('/:postId/image',getImage)
// router.get('/my-posts', authMiddleware,mypostController);

// module.exports = router;
