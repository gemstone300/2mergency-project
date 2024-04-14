import { Users } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name : 'records'
})

export class Records {
    
    @PrimaryGeneratedColumn()
    recordId : number;

    @Column({ type : 'bigint', nullable : false, default : 0 })
    stackedDistance : bigint;

    // @ManyToOne(() => Users, (users) => users.records, {
    //     onDelete : 'CASCADE'
    // })
    @JoinColumn({ name : 'userId', referencedColumnName : 'userId' })
    users : Users;

    @Column({ type : 'int' })
    userId : number;

}
