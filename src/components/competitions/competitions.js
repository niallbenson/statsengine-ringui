import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Table from '@jetbrains/ring-ui/components/table/table';
import Selection from '@jetbrains/ring-ui/components/table/selection';

import {Link} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import styles from './competitions.css';

const className = 'competitions';

export default class Competitions extends PureComponent {

  static propTypes = {
    page: PropTypes.number,
    sortKey: PropTypes.number,
    sortOrder: PropTypes.number
  };

  state = {
    data: undefined,
    selection: new Selection(),
    caption: undefined,
    selectable: false,
    draggable: false,
    page: 1,
    pageSize: 7,
    total: 7,
    sortKey: 'name',
    sortOrder: true,
    loading: false
  }

  componentDidMount() {
    this.loadPage();
  }

  loadPage = () => {
    fetch('http://localhost:8080/api/competition').
      then(res => res.json()).
      then(data => this.setState({
        data
      }));
  }

  columns = [
    {
      id: 'name',
      title: 'League',
      sortable: false
    },
    {
      id: 'country',
      title: 'Country',
      sortable: true,
      getValue: ({country, countryFlag}) =>
        this.getCountryValue(country, countryFlag)
    },
    {
      id: 'gender',
      title: 'Gender',
      sortable: true,
      getValue: ({gender}) => this.getGenderValue(gender)
    },
    {
      id: 'select',
      title: '',
      sortable: false,
      getValue: ({id}) => this.getLinkValue(id)
    }
  ];

  getCountryValue(country, countryFlag) {
    return (
      <div>
        <img
          alt={`Flag of ${country}`}
          className="flag-image"
          src={countryFlag}
          title={country}
        />
        {country}
      </div>
    );
  }

  getGenderValue(gender) {
    return gender === 'MALE' ? 'Men\'s' : 'Women\'s';
  }

  getLinkValue(id) {
    return (
      <Link
        to={`/competition/${id}`}
        className="view-link"
      >
        {'View'}
      </Link>
    );
  }

  onSort = ({column: {id: sortKey}, order: sortOrder}) => {
    this.setState({sortKey, sortOrder});
  };

  render() {
    if (!this.state.data) {
      return (<div/>);
    }

    const {
      data,
      caption,
      selectable,
      draggable,
      loading,
      selection,
      sortKey,
      sortOrder
    } = this.state;

    return (
      <div className={className}>
        <Table
          data={data}
          columns={this.columns}
          selection={selection}
          onSelect={newSelection => this.setState({selection: newSelection})}
          onReorder={({data: newData}) => this.setState({data: newData})}
          loading={loading}
          onSort={this.onSort}
          sortKey={sortKey}
          sortOrder={sortOrder}
          caption={caption}
          selectable={selectable}
          isItemSelectable={this.isItemSelectable}
          draggable={draggable}
          autofocus
        />
      </div>
    );
  }


}
