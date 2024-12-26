// const followFunction = async (req, res)=>{
//     try{
//         const currentUser = await User.findById(req.user._id);
//         const userToBeFollow = await User.findById(req.params.id)

//         //check if user exit or not
//         if(!userToBeFollow){
//             return res.status(400).json({
//                 success:false,
//                 message:"User not found...."
//             })
//         }
        
//         if(currentUser.following.includes(userToBeFollow._id))
//     }catch(error){
//         return res.status(500).json({success:false, message: error.message})
//     }
// }