import React from 'react';
import classnames from 'classnames';
import Spin from 'antd/lib/spin';

const FullWidthLoading: React.SFC<{ isFixed?: boolean }> = ({ isFixed }) => (
  <section
    className={classnames('fullWidthLoading-container', {
      _fixed: isFixed,
    })}
  >
    <Spin />
  </section>
);

export default FullWidthLoading;
