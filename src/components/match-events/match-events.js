import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Table from '@jetbrains/ring-ui/components/table/table';
import Pager from '@jetbrains/ring-ui/components/pager/pager';

import { EventSignificance } from './enums/event-significance';

import styles from './match-events.css';
import EventSignificanceSlider from './ui-components/event-significance-slider';
import Selection from '@jetbrains/ring-ui/components/table/selection';

export default class MatchEvents extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    matchId: undefined,
    eventSignificance: undefined,
    data: undefined,
    selection: new Selection(),
    caption: undefined,
    selectable: false,
    draggable: false,
    page: 1,
    pageSize: 20,
    total: 7,
    sortKey: 'name',
    sortOrder: true,
    loading: false
  }

  defautEventSignificance = EventSignificance.ALL;

  componentDidMount() {
    this.setState({
      matchId: this.props.matchId
    }, () => this.setEventSignificance(this.defautEventSignificance));
  }

  setEventSignificance(value) {
    this.setState({ eventSignificance: value });
    this.loadData();
  }

  loadData = () => {
    fetch(`http://localhost:8080/api/event/match/${this.state.matchId}/all`)
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data }, () => this.loadPagedData());
      })
      .catch(console.log);
  }

  loadPagedData = () => {
    const { data, page, pageSize } = this.state;

    const updatedData = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

    const selection = new Selection({data});

    this.setState({data: updatedData, selection: selection});
  }

  columns = [
    {
      id: 'team',
      title: 'Event Team',
      sortable: true,
      getValue: ({ eventTeam }) => eventTeam.name
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
      getValue: ({ player }) => {
        if (player) return player.nickName ? player.nickName : player.name;

        return null;
      }
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
      getValue: ({ possessionTeam }) => possessionTeam.name
    },
    {
      id: 'eventType',
      title: 'Event Type',
      sortable: true
    },
    {
      id: 'outcome',
      title: 'Outcome',
      sortable: false
    },
    {
      id: 'distance',
      title: 'Distance',
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
      getValue: ({ minute, second }) => minute + ':' + second
    }
  ];

  onSort = ({ column: { id: sortKey }, order: sortOrder }) => {
    this.setState({ sortKey, sortOrder });
  };

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
        <hr />
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
          autofocus />
here
        <Pager
          total={total}
          pageSize={pageSize}
          currentPage={page}
          disablePageSizeSelector
          onPageChange={this.onPageChange} />
      </div>);
  }

  render() {
    const { className } = this.props;

    const table = !this.state.data
      ? <div></div>
      : this.getTable();

    return (
      <div className={className}>
        <EventSignificanceSlider
          startValue={this.defautEventSignificance}
          change={value => this.setEventSignificance(value)}
        />
        {table}
      </div>
    );
  }

}
