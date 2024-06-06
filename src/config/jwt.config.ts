import { envs } from "./envs.config";
import jwt from 'jsonwebtoken';


export class JwtAdapter {

  constructor(
    private readonly seed: string = envs.JWT_SEED,
  ){};


  async getJwt(
    payload: Object,
    duration: string = '1h',
  ):Promise<string | null> {
    return new Promise( resolve => {

      jwt.sign( payload, this.seed, {expiresIn: duration}, (err, encoded) => {
        if( err ) return resolve(null);

        return resolve( encoded! );
      });
    })
  };

  async decodedJwt<T>( token:string ):Promise< T | null > {

    return new Promise( resolve => {
      jwt.verify( token, this.seed, (err, decoded) => {
        if( err ) return resolve( null );

        return resolve( decoded as T );
      });
    });

  };

}