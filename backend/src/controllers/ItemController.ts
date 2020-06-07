import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Item from '../database/entities/Item';

class ItemController {
  async create(req: Request, res: Response) {
    const itemRepository = getRepository(Item);

    const item = itemRepository.create({ ...req.body.items });

    await itemRepository.save(item);

    return res.json(item);
  }

  async index(_: Request, res: Response) {
    const itemRepository = getRepository(Item);

    const items = await itemRepository.find();

    return res.json(
      items.map((item) => ({
        ...item,
        image_url: `http://192.168.100.4:3333/uploads/${item.image}`,
      }))
    );
  }
}

export default ItemController;
