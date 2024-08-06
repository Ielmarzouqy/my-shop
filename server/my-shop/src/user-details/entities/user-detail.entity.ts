import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserDetail {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    phone: number;

    @Column()
    address: string;
}
