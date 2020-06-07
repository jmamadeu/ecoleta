import express from 'express';

import PointController from './controllers/PointController';
import ItemController from './controllers/ItemController';

const itemController = new ItemController();
const pointController = new PointController();

const routes = express.Router();

routes.get('/points', pointController.index);
routes.post('/points', pointController.create);
routes.get('/points/:id', pointController.show);

routes.get('/items', itemController.index);

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

routes.post('/items', itemController.create);

export default routes;
