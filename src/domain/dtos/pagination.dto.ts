import { CustomError } from "../errors";


interface Props {

  limit?: number;
  page?: number;
  array: any[],

};


export class PaginationDto {

  constructor(
    public totelElements: number,
    public elements: any[],
    public limit: number,
    public page: number,
    public maxPage: number,
    public minPage: number,
  ){};


  static create( config:Props ): PaginationDto {
    let { array, limit = 5, page = 0 } = config;

    const numberElements = array.length;

    if( (typeof limit !== 'string' && typeof limit !== 'number') || (typeof page !== 'string' && typeof page !== 'number') )
      throw CustomError.BadRequestException(`limit and page must be numeric values`);

    limit = +limit;
    page = +page;

    if( limit < 0  || page < 0)
      throw CustomError.BadRequestException(`limit and page they must be positive numbers`);

    const pagination = page * limit;
    const maxPage = Math.round( numberElements / limit );
    const minPage = 0;

    const arrayPagination = array.slice( pagination, pagination + limit );

    return new PaginationDto( numberElements, arrayPagination, limit, page, maxPage, minPage);
  };

}