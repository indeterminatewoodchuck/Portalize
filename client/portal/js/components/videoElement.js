var React = require('react');

var VideoElement = React.createClass({

  render: function(){
    return (
      <div>
        <video id={this.props.key} 
              src={this.props.value.stream} width={this.props.size} autoPlay />
      </div>
    );
  }
});

module.exports = VideoElement;
