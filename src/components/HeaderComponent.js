import React, { Component } from 'react';
import CalculatorService from '../services/CalculatorService';
import {Link} from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 title:"TORQUE IT LOAN CALCULATOR"
        }
    }
   
    render() {
        
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><Link to="/" className="navbar-brand">{this.state.title}</Link></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
