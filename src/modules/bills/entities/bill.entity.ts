import { UserEntity } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from "typeorm";

export enum Status {
    Ongoing = "Đang xử lý",
    Accepted = "Đã tiếp nhận",
    AdminCancelled = "Đã bị Admin hủy",
    UserCancelled = "Đã bị người dùng hủy"
}
@Entity({ name: 'bills' })
export class BillsEntity {
  @PrimaryGeneratedColumn()
  bills_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'varchar',
    length: 255,
  })
  receiver: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({
      type:"enum",
      enum: Status,
      default: Status.Ongoing
  })
  status:Status

  @Column({
      type:"decimal",
      precision: 10,
      scale:0
  })
  total: number
}
