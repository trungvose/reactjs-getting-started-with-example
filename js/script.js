//Button comp
var Button = React.createClass({
    localHandleClick: function(){
        this.props.localHandleClick(this.props.increment)
    },
    render: function () {
        return (
            <button className="btn btn-default" onClick={this.localHandleClick}>+ {this.props.increment}</button>
        );
    }
});

//Result comp
var Result = React.createClass({
    render: function () {
        return (
            <span>{this.props.localCounter}</span>
        );
    }
})

//Main comp
var Main = React.createClass({
    getInitialState: function () {
        return {
            counter: 0
        }
    },
    handleClick: function (increment) {
        this.setState({
            counter: this.state.counter + increment
        });
    },
    render: function () {
        return (
            <div>
                <Button localHandleClick={this.handleClick} increment={1}/>
                <Button localHandleClick={this.handleClick} increment={5}/>
                <Button localHandleClick={this.handleClick} increment={10}/>
                <Button localHandleClick={this.handleClick} increment={100}/>
                <Result localCounter={this.state.counter}/>
            </div>
        )
    }
})

ReactDOM.render(<Main />, document.getElementById("app"));
