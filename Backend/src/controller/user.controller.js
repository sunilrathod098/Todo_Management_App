import { ApiError } from "../config/ApiError.js";
import { ApiResponse } from "../config/ApiResponse.js";
import { asyncHandler } from "../config/asyncHandler.js";
import { User } from "../model/user.model.js";


//generate token function-backend
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}



//registerUser function-backend
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //validation - check
    // if (
    //     [name, email, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

    //validation
    if (![name, email, password].every(Boolean)) {
        throw new ApiError(400, "All fields are required")
    }

    //check user is existed or not
    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist.")
    }


    //create new user
    const user = await User.create({
        name: name.toLowerCase(),
        email,
        password,
    })

    //remove password and refreshToken from the create user
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //return a success response
    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User registered successfully",
        )
    )
});



//loginUser function-backend
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email or password is required")
    }
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        throw new ApiError(404, "User not found");
        
    }
    
    //compare provided password and stored one
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials")
    }

    //generate refreshToken and AccessToken
    const { accessToken, refreshToken } = await
        generateAccessTokenAndRefreshToken(user._id)

    //retrieve user info without sensitive felids
    const loggedInUser = await User.findById(user._id).
        select(" -refreshToken -password")
    if (!loggedInUser) {
        throw new ApiError(500, "Something went wrong while logging in the user")
    }

    // Cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    // Return a success response with tokens and user data
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    tokens: { accessToken, refreshToken }
                },
                "User logged in successfully"
            )
        );
});

const getUserInfo = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if (!user) {
        console.error("Get User Info Failed: User not found");
        throw new ApiError(404, "User not found");
    }
        return res.status(200).json(new ApiResponse(200, user, "User info fetched successfully"));
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

export { getUserInfo, loginUser, registerUser };

