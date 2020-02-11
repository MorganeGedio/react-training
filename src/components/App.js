import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
    state = {
        fishes: {}, 
        order: {}
    };
    addFish = (fish) => {
        // take copy of existing state (we don't want a mutation)
        // object spread
        const fishes = {...this.state.fishes}
        // add new fish
        fishes[`fish${Date.now()}`] = fish;
        // set new fishes object to state - built in method
        this.setState({
            fishes: fishes
        });
    };
    render() {
        return (
            <div className="catch-of-the-day"> 
                <div className="menu">   
                    <Header tagline="Fresh Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish} />
            </div>
        );
    }
}

export default App;