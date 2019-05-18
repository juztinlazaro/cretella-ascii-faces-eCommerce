import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { getProductEpics } from 'store/products/actions';
import {
  numberWithCommas,
  onFormatRelativeDate,
  onComputeEndScroll,
} from 'common/utils';
import FullWidthLoading from 'components/Loading/FullWidthLoading';
import Filter from './Filter';
import { IHomeState, IHomeProps, IMapStateToProps } from './home.interface';

class Home extends Component<IHomeProps, IHomeState> {
  state = {
    isScrolled: false,
    limit: 15,
    page: 10,
  };

  componentDidMount() {
    const { limit, page } = this.state;
    const { match } = this.props;
    const sort = match.params.sort;
    window.addEventListener('scroll', this.handleScroll);
    this.props.getProductEpics({
      limit,
      page,
      sort,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { limit, page, isScrolled } = this.state;
    const { match } = this.props;
    const element = document.documentElement;
    const sort = match.params.sort;
    const isLastAndEndScroll = onComputeEndScroll(element) && isScrolled;

    this.setState(
      {
        isScrolled: true,
      },
      () => {
        if (isLastAndEndScroll) {
          this.setState(
            (prevState: IHomeState) => {
              return {
                isScrolled: false,
                page: prevState.page + 10,
              };
            },
            () => {
              this.props.getProductEpics({
                infiniteScrollLoading: true,
                limit,
                page,
                sort,
              });
            },
          );
        }
      },
    );
  };

  handleChangeSort = (sort: string) => {
    const { limit, page } = this.state;

    this.props.getProductEpics({
      limit,
      page,
      sort,
    });
  };

  render() {
    const { products, loading, infiniteScrollLoading } = this.props;
    return (
      <section className="home-section">
        <div className="products-container">
          {loading && <FullWidthLoading />}

          <Filter onChangeSort={this.handleChangeSort} />

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
                        {onFormatRelativeDate(product.date)}
                      </span>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          {infiniteScrollLoading && (
            <div className="infinite-scroll-loading">
              <FullWidthLoading />
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IMapStateToProps) => {
  return {
    infiniteScrollLoading: state.products.infiniteScrollLoading,
    loading: state.products.loading,
    products: state.products.products,
  };
};

export default connect(
  mapStateToProps,
  { getProductEpics },
)(Home);
