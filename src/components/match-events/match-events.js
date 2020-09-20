import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Table from '@jetbrains/ring-ui/components/table/table';
import Pager from '@jetbrains/ring-ui/components/pager/pager';

import Selection from '@jetbrains/ring-ui/components/table/selection';

import LoadingScreen from '../loading-screen/loading-screen';

import {EventSignificance} from './enums/event-significance';

// eslint-disable-next-line no-unused-vars
import styles from './match-events.css';

import EventSignificanceSlider from './ui-components/event-significance-slider';

const className = 'match-events';

export default class MatchEvents extends PureComponent {
  static propTypes = {
    matchId: PropTypes.number.isRequired
  };

  state = {
    matchId: undefined,
    eventSignificance: EventSignificance.ALL,
    allData: undefined,
    data: undefined,
    selection: new Selection(),
    caption: undefined,
    selectable: false,
    draggable: false,
    page: 1,
    pageSize: 15,
    total: undefined,
    sortKey: 'index',
    sortOrder: true,
    loading: false
  }

  static getDerivedStateFromProps(nextProps) {
    const {matchId} = nextProps;

    return {matchId};
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {page, sortKey, sortOrder} = this.state;

    if (
      page !== prevState.page ||
      sortKey !== prevState.sortKey ||
      sortOrder !== prevState.sortOrder
    ) {
      this.setPage();
    }
  }

  setEventSignificance(value) {
    this.setState({eventSignificance: value});
    this.loadData();
  }

  onPageChange = page => {
    this.setState({page});
  };

  onSort = ({column: {id: sortKey}, order: sortOrder}) => {
    this.setState({sortKey, sortOrder});
  };

  loadData = () => {
    fetch(`http://localhost:8080/api/event/match/${this.state.matchId}/all`).
      then(res => res.json()).
      then(data => this.setState({
        allData: data,
        total: data.length
      }, () => this.setPage())).
      catch(console.log);
  }

  setPage = () => {
    const {allData, data, page, pageSize, sortKey, sortOrder} = this.state;

    allData.sort((a, b) => {
      const valueA = this.getValueForSortKey(a, sortKey);
      const valueB = this.getValueForSortKey(b, sortKey);

      if (valueA === null && valueB === null) {
        return 0;
      }

      if (valueA === null && valueB !== null) {
        return sortOrder ? 1 : -1;
      }

      if (valueA !== null && valueB === null) {
        return sortOrder ? -1 : 1;
      }

      return this.compareValuesForSort(valueA, valueB, sortKey) *
        (sortOrder ? 1 : -1);
    });

    const pageData = allData.slice((page - 1) * pageSize,
      (page - 1) * pageSize + pageSize);

    const selection = new Selection({data});

    this.setState({data: pageData, selection});
  }

  getValueForSortKey(rowData, sortKey) {
    const {eventTeam, possessionTeam, player, index} = rowData;

    if (sortKey === 'team') {
      return eventTeam.name;
    }

    if (sortKey === 'possessionTeam') {
      return possessionTeam.name;
    }

    if (sortKey === 'player' && player !== null) {
      const {nickName, name} = player;

      return nickName ? nickName : name;
    }

    if (sortKey === 'time') {
      return index;
    } // Better to return index here as it is chronological and will handle multiple events within same second

    return rowData[sortKey];
  }

  compareValuesForSort(valueA, valueB, sortKey) {
    switch (sortKey) {
      case 'distance':
      case 'index':
      case 'period':
      case 'time':
        return (valueA > valueB ? 1 : -1);

      default:
        return valueA.localeCompare(valueB);
    }
  }

  columns = [
    {
      id: 'team',
      title: 'Event Team',
      sortable: true,
      getValue: ({eventTeam}) => eventTeam.name
    },
    {
      id: 'eventType',
      title: 'Event Type',
      sortable: true
    },
    {
      id: 'eventDetail',
      title: 'Detail',
      sortable: false
    },
    {
      id: 'playPattern',
      title: 'Play Pattern',
      sortable: false
    },
    {
      id: 'player',
      title: 'Player',
      sortable: true,
      getValue: ({player}) => {
        if (player) {
          return player.nickName ? player.nickName : player.name;
        }

        return null;
      }
    },
    {
      id: 'jerseyNumber',
      title: 'Jersey No.',
      sortable: false
    },
    {
      id: 'playerPosition',
      title: 'Position',
      sortable: true
    },
    {
      id: 'possessionTeam',
      title: 'Possesssion Team',
      sortable: true,
      getValue: ({possessionTeam}) => possessionTeam.name
    },
    {
      id: 'outcome',
      title: 'Outcome',
      sortable: false
    },
    {
      id: 'distance',
      title: 'Distance',
      sortable: true,
      getValue: ({distance}) => (distance || distance === '0' ? <div
        className="number-cell">{(Math.round(distance * 100) / 100).toFixed(2)}</div> : null)
    },
    {
      id: 'index',
      title: 'Index',
      sortable: true
    },
    {
      id: 'period',
      title: 'Period',
      sortable: false
    },
    {
      id: 'time',
      title: 'Time',
      sortable: true,
      getValue: ({minute, second}) => `${minute}:${(`0${second}`).slice(-2)}`
    }
  ];

  getTable() {
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
      <div>
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
          page={page}
          pageSize={pageSize}
          autofocus
        />

        <Pager
          total={total}
          pageSize={pageSize}
          currentPage={page}
          disablePageSizeSelector
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }

  render() {
    const table = !this.state.data
      ? <LoadingScreen/>
      : this.getTable();

    return (
      <div className={className}>
        <EventSignificanceSlider
          startValue={this.state.eventSignificance}
          change={value => this.setEventSignificance(value)}
        />
        <hr/>
        {table}
      </div>
    );
  }

}
