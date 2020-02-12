import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {}, 
        order: {}
    };

    componentDidMount(){
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

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

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order };
        // add to order or update number in order
        order[key] = order[key] + 1 || 1;
        // call setState to update state object
        this.setState({
            order: order
        });
    };
    
    render() {
        return (
            <div className="catch-of-the-day"> 
                <div className="menu">   
                    <Header tagline="Fresh Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish 
                        key={key} 
                        index={key}
                        details ={this.state.fishes[key]} 
                        addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order 
                fishes={this.state.fishes}
                order={this.state.order}
                // {...this.state}
                // OR spread but passing all the data 
                />
                <Inventory 
                addFish={this.addFish} 
                loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;