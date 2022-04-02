const {Router} = require('express');
const User = require('../models/user');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router()

router.post(
	'/regitser', 
	[
		check('email', 'Not valid email').isEmail(),
		check('password', 'Min password length 6 symbols').isLength({min: 6})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).json({errors: errors.array(), message: 'Not valid data'})
			}

			const {email, password} = req.body

			const candidate = await User.findOne({email})
			
			if(candidate){
				return res.status(400).json({message: 'This User alredy exist'})
			}
			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({email, password: hashedPassword})
			await user.save()
			res.status(201).json({message: 'User has been created'})

		} catch (e) {
			res.status(500).json({message: 'Somthing went wrong, try again'})
		}
	})
router.post(
	'/login', 
	[
		check('email', 'Enter correct email').normalizeEmail().isEmail(),
		check('password', 'Enter correct password').exists()
	],
	async (req, res) => {
		try {
			
			
			const errors = validationResult(req)

			if(!errors.isEmpty()){
				return res.status(400).json({errors: errors.array(), message: 'not valid data'})
			}

			const {email, password} = req.body
			const user = await User.findOne({email})

			if(!user){
				return res.status(400).json({message: 'User not found'})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if(!isMatch){
				return res.status(400).json({message: 'Incorrect password, try again'})
			}

			const token = jwt.sign(
				{ userId: user.id },
				config.get('jwtSecret'),
				{expiresIn: '1h'}
			)

			res.json({ token, userId: user.id })

		} catch (e) {
			res.status(500).json({message: 'Somthing went wrong, try again'})
		}
	})


module.exports = router

