import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get the token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json ({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
     } else {
         res.status(404)
         throw new Error('Invalid Email or Password')
     }
})

export { authUser }