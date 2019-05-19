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
  };

  onActive = (e: any) => {
    if (this.props.onActive) {
      this.props.onActive();
    }
  };

  onIdle = (e: any) => {
    if (this.props.onIdle) {
      this.props.onIdle();
    }
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
