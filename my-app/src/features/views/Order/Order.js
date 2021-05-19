import React from 'react';

class Order extends React.Component {

  componentDidMount() {
    const { loadSeats } = this.props;
    loadSeats();
  }

  render() {

    return (
      <div>
        Order
      </div>
    )
  };
}

export default Order;