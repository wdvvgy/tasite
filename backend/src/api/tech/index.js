import express from 'express';
import * as tech from './tech';
import { authErrors } from 'error';
import authMiddleware from 'middleware/auth';

const api = express.Router();



/*
    모든 tech 가져온다.
    response: tech (array)
*/
api.get('/', async (req, res) => {
	try {
        const techs = await tech.getTechs();
        res.status(200).json({ tech: techs });
    } catch(e) {
        console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
    }    
});

/*
    인증된 사용자인지 체크
*/
api.use('/', authMiddleware);


/*
    tech create
    response: tech
*/
api.post('/', async (req, res) => {
	try {
        const techInfo = req.body.tech;
		await tech.createTech(techInfo);
		res.status(200).json({ message: 'success' });
	} catch(e) {
		console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
	}
});

/*
    tech edit
    response: tech
*/
api.put('/:id', async (req, res) => {
    try {
        const techId = req.params.id;
        const techInfo = req.body.tech;
        await tech.editTech({techId, techInfo});
        res.status(200).json({ message: 'success' });
    } catch(e) {
        console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
    }
});

/*
    tech delete
    response: success
*/
api.delete('/:id', async (req, res) => {
    try {
        const techId = req.params.id;
        await tech.deleteTech(techId);
        res.status(200).json({ message: 'success' });
    } catch(e) {
        console.error(e.message);
        if(e.status){
            res.status(e.status).json(e);
        } else {
            const error = authErrors.get('EXCEPTION');
            res.status(error.status).json({ message: error.message });
        }
    }
});

export default api;