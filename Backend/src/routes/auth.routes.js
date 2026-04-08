import  { Router } from "express"
import { getUserProfile, login, logout, registerUser } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router()
/**
 * @route post "/api/auth/register"
 * @description Registers a new user
 * @access public
 */
router.post("/register",registerUser)

/**
 * @route post "/api/auth/login"
 * @description log in an existing user
 * @access public
 */
router.post("/login",login)



/**
 * @route post "/api/auth/logout"
 * @description logout an loggedin user
 * @access public
 */
router.get("/logout",logout)

/**
 * @route get "/api/auth/user-profile"
 * @description get user details
 * @access private
 */
router.get("/user-profile",authMiddleware,getUserProfile)

export default router;