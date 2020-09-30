import HLTV from 'hltv';
import React from 'react';
import './App.css';

import FastAverageColor from 'fast-average-color';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamRanking: [],
    };
  }

  getTeams() {
    HLTV.getTeamRanking().then((res) => {
      this.setState({ teamRanking: res });
    });
  }

  getChangeLogo(change) {
    if (change > 0) {
      return 'arrow-green.svg';
    }

    if (change === 0) {
      return 'minus.svg';
    }

    if (change < 0) {
      return 'arrow-red.svg';
    }
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    return (
      <div className="team-list">
        {this.state.teamRanking.map((item, index) => {
          const url = `https://static.hltv.org/images/team/logo/${item.team.id}`;

          const fac = new FastAverageColor();

          // From not loaded image (HTMLImageElement)
          fac
            .getColorAsync(url, { algorithm: 'dominant' })
            .then(function (color) {
              console.log(color);
              // {
              //     rgb: 'rgb(255, 0, 0)',
              //     rgba: 'rgba(255, 0, 0, 1)',
              //     hex: '#ff0000',
              //     hexa: '#ff0000ff',
              //     value: [255, 0, 0, 255],
              //     isDark: true,
              //     isLight: false
              // }
            })
            .catch(function (e) {
              console.error(e);
            });

          return (
            <div className="team">
              <div className="logo-change">
                <img
                  className="logo"
                  src={`https://static.hltv.org/images/team/logo/${item.team.id}`}
                ></img>

                <img
                  className="change"
                  src={`/static/${this.getChangeLogo(item.change)}`}
                ></img>
                <h3 className="change-ratio">{item.change}</h3>
              </div>
              <h1>{`${item.place} - ${item.team.name}`}</h1>
              <h2>{item.points} Points</h2>
            </div>
          );
        })}
      </div>
    );
  }
}
