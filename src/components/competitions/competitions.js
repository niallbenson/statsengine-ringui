import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Table from '@jetbrains/ring-ui/components/table/table';
import Selection from '@jetbrains/ring-ui/components/table/selection';
import Button from '@jetbrains/ring-ui/components/button/button';

import styles from './competitions.css';
import { Link } from 'react-router-dom';
import Heading from '@jetbrains/ring-ui/components/heading/heading';

export default class Competitions extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
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

  componentDidUpdate(prevProps, prevState) {
    const { page, sortKey, sortOrder } = this.state;
    if (
      page !== prevState.page ||
      sortKey !== prevState.sortKey ||
      sortOrder !== prevState.sortOrder
    ) {
      this.loadPage();
    }
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
      getValue: ({ country, countryFlag }) =>
        <div>
          <img className="flag-image" src={countryFlag} title={country}></img> {country}
        </div>
    },
    {
      id: 'gender',
      title: 'Gender',
      sortable: true,
      getValue: ({ gender }) => gender === 'MALE' ? 'Men\'s' : 'Women\'s'
    },
    {
      id: 'select',
      title: '',
      sortable: false,
      getValue: ({ id }) => <Link to={'/competition/' + id} className="view-link">View</Link>
    }
  ];

  onSort = ({ column: { id: sortKey }, order: sortOrder }) => {
    this.setState({ sortKey, sortOrder });
  };

  loadPage = () => {
    fetch('http://localhost:8080/api/competition')
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data });
      })
      .catch(console.log);
  }

  render() {
    if (!this.state.data) return (<div></div>);

    const { children, className, ...restProps } = this.props;
    const classes = classNames(styles.home, className);

    const {
      data,
      caption,
      selectable,
      draggable,
      loading,
      page,
      pageSize,
      total,
      selection,
      sortKey,
      sortOrder
    } = this.state;

    return (
      <div className={classes}>
        <Table
          data={data}
          columns={this.columns}
          selection={selection}
          onSelect={newSelection => this.setState({ selection: newSelection })}
          onReorder={({ data: newData }) => this.setState({ data: newData })}
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
