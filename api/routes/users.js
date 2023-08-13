import express from 'express'
import { updateUser, deleteUser, getAllUsers, getUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//     res.send('you are authenticated');
// });

// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//     res.send('you are verified user');
// });

// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Hello admin');
// });

//update
router.put('/:id', verifyUser, updateUser);

//delete
router.delete('/:id', verifyUser, deleteUser);

//get
router.get('/:id', verifyUser, getUser);

//getall
router.get('/', verifyAdmin, getAllUsers);


export default router;