import React, { Component } from 'react';

class StopWatch extends Component {
  constructor(props){
    super(props);
    this.timer = null;
    this.initialTime = null;
    /* Component Initial State */
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliSeconds: 0,
      isRunning: false,
      laps: [],
      currentTime: null
    }
  }

  /* Calculate the Difference between Start time an current Time */
  calculateDifference = diff => {
    let milliSeconds = diff;
    let hours = Math.floor(milliSeconds / 1000 / 60 / 60);
    milliSeconds -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(milliSeconds / 1000 / 60);
    milliSeconds -= minutes * 1000 * 60;
    let seconds = Math.floor(milliSeconds / 1000);
    milliSeconds -= seconds * 1000;
    return { hours, minutes, seconds, milliSeconds};
  }

  /* Change state of the Timer every Millisecond */
  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ 
        ...this.calculateDifference(new Date() - this.initialTime), 
        isRunning: true, 
        currentTime: new Date() 
      })
    }, 10);
  }   

  /* Start the Timer after checking if currently is in Pause state */
  onClickStart = () => {
    this.initialTime = this.initialTime !== null ? new Date(Date.now() + (this.initialTime - this.state.currentTime)) : new Date()
    this.startTimer();
  }

  /* Reset time Time to Initial and start Time again */
  onClickRestart = () => this.initialTime = new Date();

  /* Stop to Time */
  onClickStop = () => {
    clearInterval(this.timer);
    this.setState({isRunning: false});
  }

  /* Store Current Time in laps Array */
  onClickLap = () => {
    let { isRunning, laps, currentTime, ...runningTime } = this.state;
    laps.push(runningTime);
    this.setState({laps});
  }

  /* Reset Laps to initial */
  onClickClearLaps = () => this.setState({laps: []});

  /* Reset Time to Zero and Start Watch again if it's already running */
  onClickReset = () => {
    if (this.state.isRunning) {
      this.initialTime = new Date();
    } else {
      this.initialTime = null;
      this.onClickStop();
      this.setState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliSeconds: 0
      });
    }
  }

  /* Render Action Buttons */
  renderNavbar = () => (
    <nav className="controls">
      {
        !this.state.isRunning ? 
          <a className="button" onClick={() => this.onClickStart()}>Start</a>
        :
          <React.Fragment>
            <a className="button" onClick={() => this.onClickStop()}>Stop</a>   
            <a className="button" onClick={() => this.onClickRestart()}>Restart</a>
          </React.Fragment>
      }
      {
        this.state.isRunning ? 
          <a className="button" onClick={() => this.onClickLap()}>Lap</a>
        :
          null  
      }
      {
        this.state.laps.length ?
          <a className="button" onClick={() => this.onClickClearLaps()}>Clear Laps</a>
        :
          null  
      }
      {
        (this.state.isRunning || this.initialTime !== null) ?
          <a className="button" onClick={() => this.onClickReset()}>Reset</a>
         :
           null 
      }
    </nav>
  )

  /* Render Timer */
  renderElapsedTime = () => {
    let { hours, minutes, seconds, milliSeconds } = this.state;
    return(
      <div className="stopwatch-numbers">
        <div>
          <span>{hours}</span>
        </div>
        <span>:</span>
        <div>
          <span>{minutes}</span>
        </div>
        <span>:</span>
        <div>
          <span>{seconds}</span>
        </div>
        <span>:</span>
        <div>
          <span>{milliSeconds}</span>
        </div>
      </div>  
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex-container">
          {this.renderNavbar()}
          {this.renderElapsedTime()}
          {
            this.state.laps.length ?
              <div className="results-wrapper">
                <h1 className="title">Lap Results</h1>
                <ul className="results">
                  {
                    this.state.laps.map((lap, index) => (
                      <li key={index}>
                        {`${lap.hours}:${lap.minutes}:${lap.seconds}:${lap.milliSeconds}`}
                      </li>
                    ))
                  }
                </ul>
              </div> 
            :
              null   
          }
        </div>
      </React.Fragment>
    );
  }
}

export default StopWatch;