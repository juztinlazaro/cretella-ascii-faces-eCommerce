import React from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'antd/lib/select';
import { sortBy } from 'common/constant/filter.constant';
import { IFilter } from './filter.interface';

const Option = Select.Option;

const Filter: React.SFC<IFilter> = ({ history, onChangeSort }) => {
  const handleChangeSortBy = (value: string) => {
    history.push(`/home/${value}`);
    onChangeSort(value);
  };

  return (
    <section className="filter-section">
      <h2>Filer</h2>

      <Select
        onChange={handleChangeSortBy}
        className="sortBy-select"
        placeholder="ex. size"
      >
        {sortBy.map(item => (
          <Option key={item.id} value={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
    </section>
  );
};

export default withRouter(Filter);
