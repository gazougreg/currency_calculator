import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

// Entity of db (typeorm)
@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}