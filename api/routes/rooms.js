import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/room.js';

const router = express.Router();
//create
router.post('/:hotelid', verifyAdmin, createRoom);

//update
router.put('/:id', verifyAdmin, updateRoom);

router.put('/availability/:id', updateRoomAvailability);

//delete
router.delete('/:roomid/:hotelid', verifyAdmin, deleteRoom);

//get
router.get('/:id', getRoom);

//getall
router.get('/', getAllRooms);

export default router;