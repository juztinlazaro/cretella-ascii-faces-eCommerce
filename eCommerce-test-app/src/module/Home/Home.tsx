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
import IdleDetector from 'components/IdleDetector/IdleDetector';
import {
  IDLE_TIME,
  PRODUCT_FIRST_PAGE,
  PRODUCT_DATA_LIMIT,
} from 'common/constant/defaults.constant';

import Filter from './Filter';
import { IHomeState, IHomeProps, IMapStateToProps } from './home.interface';

class Home extends Component<IHomeProps, IHomeState> {
  state = {
    isScrolled: false,
    limit: PRODUCT_DATA_LIMIT,
    page: PRODUCT_FIRST_PAGE,
  };

  componentDidMount() {
    const { limit, page } = this.state;
    const { match } = this.props;
    const sort = match.params.sort;
    this.props.getProductEpics({
      limit,
      page,
      sort,
    });

    window.addEventListener('scroll', this.handleScrollDOM);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollDOM);
  }

  handleScrollDOM = () => {
    const { limit, page, isScrolled } = this.state;
    const { match } = this.props;
    const element = document.documentElement;
    const sort = match.params.sort;
    const isLastAndEndScroll = onComputeEndScroll(element) && isScrolled;

    if (isLastAndEndScroll) {
      this.setState(
        (prevState: IHomeState) => {
          return {
            isScrolled: false,
            page: prevState.page + 1,
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
    } else {
      this.setState({
        isScrolled: true,
      });
    }
  };

  handleIdleGetProducts = () => {
    const { limit, page } = this.state;
    const { match } = this.props;
    const sort = match.params.sort;

    this.setState(
      prevState => {
        return {
          page: prevState.page + 1,
        };
      },
      () => {
        this.props.getProductEpics({
          limit,
          page,
          sort,
        });
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
    const { products, loading, infiniteScrollLoading, isNoData } = this.props;
    return (
      <section className="home-section">
        <div className="products-container">
          {loading && <FullWidthLoading isFixed={true} />}

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

          {isNoData && <h4 className="_text-center">~ end of catalogue~</h4>}

          <IdleDetector
            idleTime={IDLE_TIME}
            onIdle={this.handleIdleGetProducts}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: IMapStateToProps) => {
  return {
    infiniteScrollLoading: state.products.infiniteScrollLoading,
    isNoData: state.products.isNoData,
    loading: state.products.loading,
    products: state.products.products,
  };
};

export default connect(
  mapStateToProps,
  { getProductEpics },
)(Home);
