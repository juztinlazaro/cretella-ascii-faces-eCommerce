import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';

interface IIdleDetectorprops {
  onAction?: () => void;
  onActive?: () => void;
  onIdle?: () => void;
  idleTime?: number;
}

class IdleDetector extends Component<IIdleDetectorprops, {}> {
  idleTimerRef: any;

  constructor(props: IIdleDetectorprops) {
    super(props);
    this.idleTimerRef = React.createRef();
  }

  onAction = (e: any) => {
    if (this.props.onAction) {
      this.props.onAction();
    }

    console.log('user did Something', e);
  };

  onActive = (e: any) => {
    if (this.props.onActive) {
      this.props.onActive();
    }

    console.log('user is ACTIVE', e);
    console.log('time remaining', this.idleTimerRef.getRemainingTime());
  };

  onIdle = (e: any) => {
    if (this.props.onIdle) {
      this.props.onIdle();
    }

    console.log('user is IDLE', e);
    console.log('USER last active', this.idleTimerRef.getLastActiveTime());
  };

  handleGetRef = (ref: any) => {
    this.idleTimerRef = ref;
  };

  render() {
    const { idleTime } = this.props;
    return (
      <div>
        <IdleTimer
          ref={this.handleGetRef}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={idleTime}
        />
      </div>
    );
  }
}

export default IdleDetector;
