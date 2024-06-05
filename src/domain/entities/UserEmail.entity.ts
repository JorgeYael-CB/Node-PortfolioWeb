export class UserEmailEntity {

  constructor(
    public readonly email:string,
    public readonly verify: boolean,
    public readonly isActive: boolean,
    public readonly roles: string[],
  ){};

}