import React from 'react';
import PropTypes from 'prop-types';
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

    static propTypes = {
        match: PropTypes.object 
    }

    componentDidMount(){
        const { params } = this.props.match;
        // reinstate local storage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, 
            JSON.stringify(this.state.order));
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

    updateFish = (key, updatedFish) => {
        // take copy of current state
        const fishes = {...this.state.fishes}; 
        // add new fish to fishes variable
        fishes[key] = updatedFish;
        // set new fishes object to state 
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // copy of state 
        const fishes = {...this.state.fishes}; 
        // remove item from state 
        fishes[key] = null;
        // update state 
        this.setState({ fishes });
    }

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

    removeFromOrder = (key) => {
        const order = { ...this.state.order }; 
        // because we don't mirror with firebase we can write delete
        delete order[key];
        this.setState({
            order: order
        });
    }
    
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
                removeFromOrder={this.removeFromOrder}
                // {...this.state}
                // OR spread but passing all the data 
                />
                <Inventory 
                addFish={this.addFish} 
                updateFish = {this.updateFish} 
                deleteFish = {this.deleteFish} 
                loadSampleFishes={this.loadSampleFishes}
                fishes={this.state.fishes}
                />
            </div>
        );
    }
}

export default App;