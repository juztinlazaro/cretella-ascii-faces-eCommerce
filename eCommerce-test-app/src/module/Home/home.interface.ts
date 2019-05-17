export interface IHomeState {
  status: boolean;
}

export interface IPayload {
  page: number;
  limit: number;
  sort: string;
}

export interface IHomeProps {
  getProductEpics: (payload: IPayload) => {};
  products: any[];
  loading: boolean;
}

export interface IMapStateToProps {
  products: {
    loading: boolean;
    products: any[];
  };
}
