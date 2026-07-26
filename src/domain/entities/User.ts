import { UserRole } from "../enum/user/role.enum";
import { UserStatus } from "../enum/user/status.enum";
import { ERROR_MESSAGE } from "../../shared/constants/messages/error.message";
import { hashPassword } from "../../shared/utils/password.hash.util";

export class User {
    private readonly _id?:string;
    private _name :string;
    private _email:string;
    private _password:string;
    private _role:UserRole;
    private _status:UserStatus;
    public isVerified: boolean = false;
    public createdAt: Date = new Date();
    public updatedAt: Date = new Date();

    constructor(props:{
        readonly id?:string;
        name:string;
        email:string;
        password:string;
        role:UserRole;
        status:UserStatus;
        isVerified?: boolean ;
        createdAt?: Date ;
        updatedAt?: Date ;


 }){
    this._id=props.id;
    this._name=props.name;
    this._email=props.email;
    this._password=props.password;
    this._role=props.role;
    this._status=props.status;
     this.isVerified =props.isVerified??false;
     this.createdAt= props.createdAt??new Date();
     this.updatedAt= props.updatedAt??new Date();
 }
 static create(props:{
    id?:string,
    name:string;
    email:string;
    password:string;
    role:UserRole;
    status:UserStatus;
    isVerified: boolean ;
       

 }):User{
      return new User({
        id:props.id,
        name:props.name,
        email:props.email,
        password:props.password,
        role:props.role,
        status:props.status,
        isVerified:props.isVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
 }

  get id(){return this._id;}
  get name(){ return this._name;}
  get email() { return this._email; }
  get password() { return this._password; }
  get role() { return this._role; }
  get status() { return this._status; }

  async gethashedPassword(){
   return await hashPassword(this.password);
  }
  setPassword(newPassword:string){
    this._password=newPassword
    this.updatedAt=new Date()
  }

   isBlocked(): boolean {
    // if(this._status === UserStatus.BLOCKED) throw new Error(ERROR_MESSAGE.ADMIN_BLOCKED)
    return this._status === UserStatus.BLOCKED;
   }


   verifyUser() {
    this.isVerified = true;
    this._status = UserStatus.ACTIVE;
    this.updatedAt = new Date();
  }

   canLogin(): boolean {
    return this.isVerified && this.status === UserStatus.ACTIVE;
  }
   isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}