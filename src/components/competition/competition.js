import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './competition.css';

import Island, { Header, Content } from '@jetbrains/ring-ui/components/island/island';
import Select from '@jetbrains/ring-ui/components/select/select';
import Season from '../season/season';

export default class Competition extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  state = {
    id: undefined,
    competition: undefined,
    selectedSeason: undefined,
    matches: undefined
  }

  componentDidMount() {
    this.setState(
      { id: this.props.match.params.id },
      () => this.loadPage()
    );
  }

  loadPage = () => {
    fetch('http://localhost:8080/api/competition/' + this.state.id)
      .then(res => res.json())
      .then(data => {
        this.setState(
          { competition: data },
          () => this.setDefaultSeason()
        );
      })
      .catch(console.log);
  }

  setDefaultSeason = () => {
    const seasons = this.state.competition.seasons;

    if (seasons.length > 0) {
      this.setState({ selectedSeason: seasons[0] });
    }
  }

  onSelect = (event) => {
    const selectedSeason = this.state.competition.seasons.find(s => s.id === event.key);

    this.setState({ selectedSeason: selectedSeason });
  }

  render() {
    if (!this.state.competition) return (<div></div>);

    const { className, staticContext, ...restProps } = this.props;
    const classes = classNames(styles.competition, className);

    const competition = this.state.competition;

    const seasonSelector = this.getSeasonSelector();

    const season = !this.state.selectedSeason ? null
      : <Season competition={this.state.competition} season={this.state.selectedSeason} className="season" />;

    return (
      <div className={classes}>
        <Island>
          <Header>{competition.name}</Header>
          <Content>
            {seasonSelector}
            {season}
          </Content>
        </Island>
      </div>
    );
  }

  getSeasonSelector() {
    const competition = this.state.competition;

    if (!competition.seasons || competition.seasons.length == 0) {
      return (
        <div>No seasons for competition</div>
      );
    }

    const data = competition.seasons.map(s => {
      return { label: s.name, key: s.id }
    });

    return (
      <div>
        {'Season '}
        <Select
          key="select"
          type={Select.Type.INLINE}
          data={data}
          selectedLabel={data[0].label}
          onSelect={this.onSelect}
        />
      </div>
    );
  }

}
