import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Island, {
  Header,
  Content
} from '@jetbrains/ring-ui/components/island/island';
import Select from '@jetbrains/ring-ui/components/select/select';

import Season from '../season/season';

const className = 'competition';

export default class Competition extends PureComponent {

  static propTypes = {
    match: PropTypes.object
  };

  static getDerivedStateFromProps(nextProps) {
    const {id} = nextProps.match.params;

    return {id};
  }

  state = {
    id: undefined,
    competition: undefined,
    selectedSeason: undefined,
    matches: undefined
  }

  componentDidMount() {
    this.loadPage();
  }

  loadPage = () => {
    fetch(`http://localhost:8080/api/competition/${this.state.id}`).
      then(res => res.json()).
      then(data => {
        this.setState({
          competition: data
        }, () => this.setDefaultSeason());
      });
  }

  setDefaultSeason = () => {
    const {seasons} = this.state.competition;

    if (seasons.length > 0) {
      this.setState({selectedSeason: seasons[0]});
    }
  }

  onSelect = event => {
    this.setState({
      selectedSeason: this.getSelectedSeason(event)
    });
  }

  getSelectedSeason(event) {
    const {seasons} = this.state.competition;

    return seasons.find(s => s.id === event.key);
  }

  getSeasonSelector() {
    const {seasons} = this.state.competition;

    if (!seasons || seasons.length === 0) {
      return (
        <div>{'No seasons for competition'}</div>
      );
    }

    const data = seasons.map(s => ({label: s.name, key: s.id}));

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

  render() {
    if (!this.state.competition) {
      return (<div/>);
    }

    const competition = this.state.competition;

    const seasonSelector = this.getSeasonSelector();

    const season = !this.state.selectedSeason
      ? null
      : (
        <Season
          competition={competition}
          season={this.state.selectedSeason}
          className="season"
        />
      );

    return (
      <div className={className}>
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

}
