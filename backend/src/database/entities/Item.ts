import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  image: string;

  @Column('varchar')
  title: string;
}

export default Item;
