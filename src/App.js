import React, { Component } from 'react';
import './App.css';

import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';

import { 
    Box,
    Text,
    ResponsiveContext
} from 'grommet';


class App extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.timeInterval = null;
        this.state = {
            currentTime: new Date(),
            rst: new Date(),
            jst: new Date(),
            sst: new Date(),
            explainRST: false,
            explainJST: false,
            explainSST: false,
        };

    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timeInterval);
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            let rand = this.getRandomInt(0, 100);
            console.log(rand);
            // probabilistic time
            let sst = new Date();
            if (rand < 35) {
                sst = null;
            }

            this.updateTimes(sst);
            this.interval = setInterval(() => this.updateTimes(this.state.sst), 1000);
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateTimes(sst) {
        
        let curr = new Date();

        // jana standard time, +45 mins
        let jst = new Date();
        jst.setMinutes(jst.getMinutes() + 45);

        // rachel standard time 11pm or 1am
        let rst = new Date();
        if ((rst.getHours() > 1 && rst.getHours() < 23) || (rst.getHours() == 1 && (rst.getSeconds() > 0 || rst.getMinutes() > 0))) {
            rst.setHours(23);
            rst.setMinutes(0);
            rst.setSeconds(0);
        }
        else {
            rst.setHours(1);
            rst.setMinutes(0);
            rst.setSeconds(0); 
        }

        // probabilistic time
        let _sst = new Date();
        if (sst) {
            _sst.setHours(_sst.getHours() + 1)
        }
        else {
            _sst = null;
        }

        this.setState({
            currentTime: curr,
            jst: jst,
            rst: rst,
            sst: _sst
        });
    }

    formatNum(num) {
        return ("0" + num).slice(-2)
    }

    render() {        
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => 
                        <ResponsiveContext.Consumer>
                            {size =>
                                <Box
                                    width="100vw"
                                    height="100vh"
                                    direction="column"
                                    justify="center"
                                    align="center"
                                    gap="medium"
                                >
                                    <Box
                                        direction="column"
                                        justify="center"
                                        align="center"
                                    >
                                        <Text textAlign="center" size="55px">{this.formatNum(this.state.currentTime.getHours())}:{this.formatNum(this.state.currentTime.getMinutes())}:{this.formatNum(this.state.currentTime.getSeconds())} EST </Text>
                                    </Box>
                                    <Box
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        onClick={() => {this.setState({explainRST: !this.state.explainRST})}}
                                    >
                                        {this.state.explainRST &&
                                            <Text textAlign="center" size="25px">Rachel Standard Time: 11:00 PM or 1:00 AM</Text>
                                        }
                                        <Text textAlign="center" size="55px" >{this.state.rst ? (this.formatNum(this.state.rst.getHours())+':'+this.formatNum(this.state.rst.getMinutes())+':' + this.formatNum(this.state.rst.getSeconds()) + ' RST') : "hmmm"}</Text>
                                    </Box>
                                    <Box
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        onClick={() => {this.setState({explainSST: !this.state.explainSST})}}
                                    >
                                        {this.state.explainSST &&
                                            <Text textAlign="center" size="25px">Soaad Standard Time: probabilistic time</Text>
                                        }
                                        <Text textAlign="center" size="55px">{this.state.sst ? (this.formatNum(this.state.sst.getHours())+':'+this.formatNum(this.state.sst.getMinutes())+':' + this.formatNum(this.state.sst.getSeconds()) + ' SST') : "no-show SST"}</Text>
                                    </Box>
                                    <Box
                                        direction="column"
                                        justify="center"
                                        align="center"
                                        onClick={() => {this.setState({explainJST: !this.state.explainJST})}}
                                    >
                                        {this.state.explainJST &&
                                            <Text textAlign="center" size="25px">Jana Standard Time: +45mins</Text>
                                        }
                                        <Text textAlign="center" size="55px">{this.state.jst ? (this.formatNum(this.state.jst.getHours())+':'+this.formatNum(this.state.jst.getMinutes())+':' + this.formatNum(this.state.jst.getSeconds()) + ' JST') : "hmmm"}</Text>
                                    </Box>
                                    
                        
                                </Box>
                            }
                        </ResponsiveContext.Consumer>
                    }/>                    
                    <Route component={() => 
                        <Box
                            width="100vw"
                            height="100vh"
                            direction="row"
                            justify="center"
                            align="center"
                        >
                            <Text>Hmmm! This page does not exist :(</Text>
                        </Box>
                    } />                   
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
