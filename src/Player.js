import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <div
        className={[
          'player',
          this.props.direction === 'right' ? 'player--right' : 'player--left',
        ].join(' ')}
        style={{
          left: this.props.left,
        }}
      >
        <div>{this.props.user.label || 'message'}</div>
      </div>
    );
  }
}
Player.defaultProps = {
  left: 500,
};
export default Player;