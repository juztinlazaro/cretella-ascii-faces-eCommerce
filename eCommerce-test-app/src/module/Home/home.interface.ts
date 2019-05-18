export interface IHomeState {
  isScrolled: boolean;
  limit: number;
  page: number;
}

export interface IGetProductsEpicsPayload {
  page?: number;
  limit?: number;
  sort?: string;
  infiniteScrollLoading?: boolean;
}

export interface IHomeProps {
  getProductEpics: (payload: IGetProductsEpicsPayload) => {};
  products: any[];
  loading: boolean;
  infiniteScrollLoading: boolean;
  match: {
    params: {
      sort?: string;
    };
  };
}

export interface IMapStateToProps {
  products: {
    infiniteScrollLoading: boolean;
    products: any[];
    loading: boolean;
  };
}
