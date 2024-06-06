import { UserEmailEntity } from "../../domain/entities";

export class UserEmailMapper {

  static getInstanceFromObj( userObject: { [key:string]:any } ):UserEmailEntity {
    const { email, id, _id, verify, isActive, date, roles, questions, name } = userObject;

    if( !email ) throw new Error('Missing email');
    if( !id && _id ) throw new Error('Missing id');
    if( typeof verify !== 'boolean' ) throw new Error('Missing verify');
    if( !isActive ) throw new Error('Missing isActive');
    if( !date ) throw new Error('Missing date');
    if( !roles ) throw new Error('Missing roles');
    if( !questions ) throw new Error('Missing questions');

    return new UserEmailEntity( email, id || _id, verify, isActive, date, roles, questions, name);
  }

}