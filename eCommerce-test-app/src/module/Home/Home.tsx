import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { getProductEpics } from 'store/products/actions';
import { numberWithCommas } from 'common/utils';

interface IHomeState {
  status: boolean;
}

interface IPayload {
  page: number;
  limit: number;
  sort: string;
}

interface IHomeProps {
  getProductEpics: (payload: IPayload) => {};
  products: any[];
}

class Home extends Component<IHomeProps, IHomeState> {
  state = {
    status: false,
  };

  componentDidMount() {
    this.props.getProductEpics({
      limit: 15,
      page: 10,
      sort: '',
    });
  }

  render() {
    const { products } = this.props;

    return (
      <section className="home-section">
        <div className="products-container">
          <Row gutter={12}>
            {products.map(product => {
              return (
                <Col key={product.id} span={8}>
                  <div className="product-card">
                    <div
                      className="face"
                      style={{
                        fontSize: product.size,
                      }}
                    >
                      {product.face}
                    </div>

                    <div className="product-details">
                      <span className="price">
                        Price: {numberWithCommas(product.price)}
                      </span>
                      <span className="date">{product.date}</span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    );
  }
}

interface IMapStateToProps {
  products: {
    loading: boolean;
    products: any[];
  };
}

const mapStateToProps = (state: IMapStateToProps) => {
  return {
    loading: state.products.loading,
    products: state.products.products,
  };
};

export default connect(
  mapStateToProps,
  { getProductEpics },
)(Home);
