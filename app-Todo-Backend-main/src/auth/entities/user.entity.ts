import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  _id?: string;

  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ minlength: 8, required: true })
  password: string;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({ type: [String], default: ["user"] }) // roles =[user,admin,etc]
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
