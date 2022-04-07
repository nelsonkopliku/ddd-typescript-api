import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum SearchBy {
  clusterName = 'clusterName',
  nodeName = 'nodeName',
}

export class SearchNode {
  @IsNotEmpty()
  @IsString()
  term!: string

  @IsEnum(SearchBy, {
    message: `'searchBy' should be either '${SearchBy.clusterName}' or '${SearchBy.nodeName}. None of the expected values eas provided'`,
  })
  searchBy!: string
}
