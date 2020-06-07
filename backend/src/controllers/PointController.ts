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
      items.split(',').map(async (item_id: number) => {
        const item = await itemRepository.findOne(Number(item_id));

        return item;
      })
    );

    const image = req.file.filename;

    let point = pointRepository.create({
      ...req.body,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      image,
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

    return res.json(
      points.map((point) => ({
        ...point,
        image: `http://192.168.100.4:3333/uploads/${point.image}`,
      }))
    );
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

    return res.json({
      ...point,
      image: `http://192.168.100.4:3333/uploads/${point.image}`,
    });
  }
}

export default PointController;
