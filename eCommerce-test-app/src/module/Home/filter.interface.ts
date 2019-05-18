import { RouteComponentProps } from 'react-router';

interface IParams {
  sortBy?: string;
  sort?: string;
}

export interface IFilter extends RouteComponentProps<IParams> {
  onChangeSort: (sort: string) => void;
}
