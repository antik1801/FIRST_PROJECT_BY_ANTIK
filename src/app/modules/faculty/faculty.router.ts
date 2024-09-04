import { Router } from "express";


const router = Router();

router.post('/create-faculty');
router.get('/');
router.get('/:facultyId')
router.patch('/:facultyId')
router.delete('/:facultyId')


export const FacultyRoutes = router;