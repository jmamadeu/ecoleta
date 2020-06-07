import express from 'express';
import multer from 'multer';

import multerConfig from './configs/multer';

import PointController from './controllers/PointController';
import ItemController from './controllers/ItemController';

const itemController = new ItemController();
const pointController = new PointController();

const routes = express.Router();

const upload = multer(multerConfig);

routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post('/points', upload.single('image'), pointController.create);

routes.get('/items', itemController.index);
routes.post('/items', itemController.create);
// Run this code for add custom items

// routes.post('/items/seeds', async (req, res) => {
//   const itemRepository = getRepository(Item);

//   const items = itemRepository.create([...req.body.items]);

//   await itemRepository.save(items);

//   return res.json(
//     items.map((item) => ({
//       ...item,
//       url: `http:localhost:3333/uploads/${item.image}`,
//     }))
//   );
// });

export default routes;
