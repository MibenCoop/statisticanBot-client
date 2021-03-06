import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { getMessages } from '../actions/messages'
import { connect } from 'react-redux'
import MessagesTop from '../components/MessagesTop'
import UsersTop from '../components/UsersTop';
import Chart from '../components/Chart';
import { CHART_DATA } from '../chartConstants'
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{}
        }
    }
    componentDidMount() {
        this.props.getMessages();        
        this.getChartData();
    }

    getChartData(){
        //Generate array with days
        const labels = Array.from(new Array(30),(val,index)=>index+1);
        let chartData = Object.assign({}, CHART_DATA);
        chartData.labels = labels;
        this.setState({
          chartData
        });
      }
    
    render() {
        const { messages } = this.props;
        return (
            <div>
                <h3>Messages amount: {Array.from(messages).length}</h3>
                <MessagesTop messages = {messages}/>
                <UsersTop messages = {messages} />
                <Link to = "/messages">Go to the all messages</Link>
                <Chart messages = {messages} chartData={this.state.chartData} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch => ({
    getMessages: () => dispatch(getMessages()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);