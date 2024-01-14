


const post=require('../model/postmodel')
const fs = require('fs');

const createPostController = async (req, res) => {
    try {
        
        
        const { description, location,} = req.fields;
       
        const {image}=req.files
        if (!description || !location || !image) {
            res.status(401).send({ message: "All fields are required" });
        }
        if (image && image.size > 10000000) {
            res.status(400).send({ error: "Photo should be less than 1MB" });
            return;
        }
        
         
        const postobject = new post({

            description: description,
            location: location,
            // image: image,
            author: req.user,
        });
        if (image) {
             postobject.image.data = fs.readFileSync(image.path);
            postobject.image.contentType = image.type;
        }


        await postobject.save(); 

        res.status(200).send({
            message: "Post created successfully",
            postobject,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in model" });
    }
};
const getAllPostController = async (req, res) => {
    try {
        const data = await post.find({})
        .populate('author','_id  profilePic  fullName').select('-image')
        .populate('comments.commentedBy','_id fullName' )


        // Check if there are no posts
        if (!data || data.length === 0) {
            return res.status(404).send({ message: "No posts found" });
        }

        
        res.status(200).send({ message: "Posts retrieved successfully", data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in retrieving posts" });
    }
};
const getSinglePostController = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await post.findOne({ _id: id })
        .populate('author','_id fullName profilePic');
        ; 

        if (!data) {
            return res.status(404).send({ message: "Post not found" });
        }

        res.status(200).send({ message: "Post retrieved successfully", data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error in retrieving the post" });
    }
};
const mypostController = async (req, res) => {
    try {
       
        const data = await post.find({ author: req.user._id })
            .populate('author', '_id fullName profilePic')
            .select('-image');

        if (!data || data.length === 0) {
           
            return res.status(404).send({ message: "No posts found for the user" });
        }

        
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

const deletePostController = async (req, res) => {
    try {
       
        const data = await post.findOne({ _id: req.params.id }).populate('author', '_id');

        
        if (!data) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        if (data.author._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You are not the author of this post' });
        }

        // Delete the post
         await post.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const likeController=async(req,res)=>{
    const { postId } = req.params;
    const userId = req.user._id;
    console.log(userId)

  
    try {
      
      const Post = await post.findById(postId).populate("author","_id fullName").select('-image')
      console.log('Post.like:', Post.like);
      console.log('userId:', userId);

  
      if (!Post) {
        return res.status(404).json({ error: 'Post not found' });
      }

     

    //   if (Post.like.includes(userId)) {
    //         return unlikeController();
    //       }
  
      
      if (Post.like.includes(userId)) {
        return res.status(400).json({ error: 'Post already liked' });
      }
  
     
      Post.like.push(userId);
  
      
      await Post.save();
  
      return res.status(200).json({ message: 'Post liked successfully',Post });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  



}



const unlikeController=async(req,res)=>{
    const { postId } = req.params;
    const userId = req.user._id;
    console.log(userId)

  
    try {
      // Check if the post exists
      const Post = await post.findById(postId).populate("author","_id fullName")
      console.log('Post.like:', Post.like);
      console.log('userId:', userId);

  
      if (!Post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
  
      // Check if the user has already liked the post
    //   if (Post.like.includes(userId)) {
    //     return res.status(400).json({ error: 'Post already liked' });
    //   }
  
      // Add user to the likes array
      Post.like.pull(userId);
  
      // Save the updated post
      await Post.save();
  
      return res.status(200).json({ message: 'Post unlike successfully',Post });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  



}
const getImage= async (req,res)=>{
    try {
        const postId = req.params.postId;
        const postData = await post.findById(postId).select('image');
    
    
        if (!postData || !postData.image || !postData.image.data) {
          return res.status(404).send({ error: 'Image not found' });
        }
    
        res.set('Content-Type', postData.image.contentType);
        res.send(postData.image.data);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
      }

}

const commentController =  async (req, res) => {
      const { postId } = req.params;
      const { text } = req.body;
      const userId = req.user._id;
      const newComment = {commentedBy:userId,text };
  
      try {
        const Post = await post.findById(postId)
        .populate('comments.commentedBy','_id fullName')//commentowner
        .populate('author','_id fullName')//postowner
  
        if (!Post) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        
  
        Post.comments.push(newComment);
        await Post.save();
  
        return res.status(201).json({ message: 'Comment added successfully', post: Post });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }



module.exports={createPostController,getAllPostController,getImage,
    getSinglePostController,mypostController
    ,deletePostController,likeController,likeController,unlikeController,commentController}