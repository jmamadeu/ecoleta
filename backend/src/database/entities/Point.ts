import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Item from './Item';

@Entity('points')
class Point {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  image: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  whatsapp: string;

  @Column('decimal')
  latitude: string;

  @Column('decimal')
  longitude: number;

  @Column('varchar')
  city: string;

  @Column('varchar')
  uf: string;

  @ManyToMany(() => Item)
  @JoinTable({ name: 'point_items' })
  items: Item[];
}

export default Point;
