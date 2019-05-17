import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { getProductEpics } from 'store/products/actions';
import { numberWithCommas, timeDifference } from 'common/utils';
import FullWidthLoading from 'components/Loading/FullWidthLoading';
import Filter from './Filter';
import { IHomeState, IHomeProps, IMapStateToProps } from './home.interface';

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
    const { products, loading } = this.props;

    return (
      <section className="home-section">
        <div className="products-container">
          {loading && <FullWidthLoading />}

          <Filter />

          <Row gutter={12}>
            {products.map(product => {
              return (
                <Col key={product.id} sm={12} lg={8} xl={6}>
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
                      <span className="date">
                        {timeDifference(product.date)}
                      </span>
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
