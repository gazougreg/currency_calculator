import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

// Entity of db (typeorm)
@Entity()
export class ExchangeRate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    euro_rate: number;

    @Column()
    currency_id: number;
}