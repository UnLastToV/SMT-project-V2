const express = require('express');
const router = express.Router();
const citizenController = require('../controllers/citizenController');

/**
 *  Citizen Routes 
*/
router.get('/', citizenController.homepage);
router.get('/about', citizenController.about);
router.get('/add', citizenController.addCitizen);
router.post('/add', citizenController.postCitizen);
router.get('/view/:id', citizenController.view);
router.get('/edit/:id', citizenController.edit);
router.put('/edit/:id', citizenController.editPost);
router.delete('/edit/:id', citizenController.deleteCitizen);

router.post('/search', citizenController.searchCitizens);



module.exports = router;