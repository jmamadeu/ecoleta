import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import Point from '../database/entities/Point';
import Item from '../database/entities/Item';

class PointController {
  async create(req: Request, res: Response) {
    const pointRepository = getRepository(Point);
    const itemRepository = getRepository(Item);

    let { items } = req.body;

    items = await Promise.all(
      items.map(async (item_id: number) => {
        const item = await itemRepository.findOne(item_id);

        return item;
      })
    );

    let point = pointRepository.create({
      ...req.body,
      image:
        'https://images.unsplash.com/photo-1541855099555-42c6a7c57cfa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      items,
    });

    await pointRepository.save(point);

    return res.json(point);
  }

  async index(req: Request, res: Response) {
    const pointRepository = getRepository(Point);

    const { items, city, uf } = req.query;

    const parseItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await pointRepository
      .createQueryBuilder('point')
      .innerJoinAndSelect('point.items', 'point_items')
      .where('point.city = :city AND point.uf = :uf', {
        city: String(city),
        uf: String(uf),
      })
      .where('point_point_items.itemsId IN (:...ids)', { ids: parseItems })
      .getMany();

    return res.json(points);
  }

  async show(req: Request, res: Response) {
    const pointRepository = getRepository(Point);

    const point = await pointRepository.findOne({
      where: { id: req.params.id },
      relations: ['items'],
    });

    if (!point) {
      return res.status(400).json({ message: 'Point not found' });
    }

    return res.json(point);
  }
}

export default PointController;
