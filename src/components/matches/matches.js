import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import List, { ActiveItemContext } from '@jetbrains/ring-ui/components/list/list';
import { Redirect } from 'react-router-dom';

import styles from './matches.css';

export default class Matches extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    matches: undefined,
    redirect: undefined
  }

  static getDerivedStateFromProps(props, state) {
    state.matches = props.matches;

    return state;
  }

  getListData = () => {
    const matchesGroupedByMonth = this.getMatchesGroupedByMonth();

    const listItems = [];

    for (const [monthGroupName, matches] of Object.entries(matchesGroupedByMonth)) {
      listItems.push({
        rgItemType: List.ListProps.Type.TITLE,
        label: monthGroupName
      });

      matches.forEach(m =>
        listItems.push({
          rgItemType: List.ListProps.Type.ITEM,
          label: this.getMatchDescription(m),
          description: new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
            .format(new Date(m.matchDate)),
          key: m.id
        })
      );
    }

    return listItems;
  };

  getMatchDescription = (match) => match.homeTeamName + ' ' + match.homeScore + ' - ' + match.awayScore + ' ' + match.awayTeamName;

  getMatchesGroupedByMonth = () => {
    const { matches } = this.state;

    const result = matches.reduce((arr, item) => {
      const key = this.getMatchDateMonthGroupName(item.matchDate);

      (arr[key] ? arr[key] : (arr[key] = null || [])).push(item);

      return arr;
    }, {});

    return result;
  };

  getMatchDateMonthGroupName(matchDate) {
    const date = new Date(matchDate);

    const monthNameLong = date.toLocaleString('default', { month: 'long' });

    return monthNameLong + ' ' + date.getFullYear();
  }

  onSelect = (event) => {
    this.setState({
      redirect: event.key
    });
  };

  render() {
    const { matches, redirect } = this.state;

    if (!matches) return (<div></div>);

    if (redirect !== undefined) {
      const redirectUrl = '/match/' + redirect;

      return <Redirect to={redirectUrl} />;
    }

    const { className, ...restProps } = this.props;
    const classes = classNames(styles.matches, className);

    const listData = this.getListData();

    return (
      <div className={classes}>
        <List
          data={listData}
          activeIndex={2}
          shortcuts
          onSelect={this.onSelect}
          renderOptimization={false}
        />
      </div>
    );
  }
}
