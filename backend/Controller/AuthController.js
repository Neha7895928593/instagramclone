const User = require('../model/UserModel');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// const dotenv=require('dotenv')
// dotenv.config();

const userRegisterController = async (req, res) => {
  try {
    const {fullName,email,password,profilePic} = req.body;
    console.log(req.body)
    const existingUser = await User.findOne({email:email});
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email is already taken.' });
        }
       if (!fullName||!email||!password){
        return res.status(401).send({message:"require all field"})
       }
       function isValidPassword(password) {
            const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
            return passwordPattern.test(password);
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
    // Perform any validation you need here

    // Create a new user instance
    const newUser = new User({
     fullName,
      email,
      password:hashedPassword,
      profilePic,
    });


    const savedUser = await newUser.save();

    res.status(201).send({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error in user registration', error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }
    console.log(user.password)
    console.log(password)
     
    const isValidPassword = await bcrypt.compare(password, user.password);

console.log(isValidPassword)
    

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }
    console.log(process.env.SECRET_KEY)
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    res.status(200).send({
      message: "User login successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        password:password,
        profilePic: user.profilePic,
        
      },
      
      token: token,
      
    });
    console.log({mydata:user})
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in module" });
  }
};

// const loginController=async (req,res)=>{
//   try {
//     const {email,password}=req.body
//     const user= await User.findOne({email})
//     if (!user){
//       res.status(401).send({message:"Invalid username or password"})
//     }
//     const isValidPassword=await bcrypt.compare(password, user.password)
//     if(!isValidPassword){
//       res.status(401).send({message:"Invalid password or userName"})
//     }
//     const token=jwt.sign({userId:user._id}, process.env.SCREAT_KEY,{expiresIn:"7d"} )
//     res.status(200).send({
//       message:"User login Successfully",
//       user:{
//         id:user._id,
//         fullName:user.fullName,
//         email:user.email,
//         password:user.password,
//         profilePic:user.profilePic,

//       },
//       token:token,
//     })
    
//   } catch (error) {
//     console.log(error)
//     res.status(500).send({message:"error in Module"})
    
//   }
// }

module.exports = { userRegisterController,loginController };
