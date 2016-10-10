var StarFrame = React.createClass({
    render: function () {
        var stars = [];
        for (var i = 0; i < this.props.numberOfStar; i++) {
            stars.push(
                <i className="fa fa-star-o" aria-hidden="true"></i>
            )
        }
        return (
            <div className="card star-frame">
                <div className="card-block">
                    {stars}
                </div>
            </div>
        )
    }
});

var ButtonFrame = React.createClass({
    render: function () {
        return (
            <div className="button-frame text-xs-center">
                <button className="btn btn-primary">=</button>
            </div>
        )
    }
});

var AnswerFrame = React.createClass({
    render: function () {
        var props = this.props;
        //display in the form of number
        var selectedNumbers = props.selectedNumbers.map(function (i) {
            return (
                <span className="number">{i}</span>
            )
        });
        return (
            <div className="card answer-frame">
                <div className="card-block">
                    {selectedNumbers}
                </div>
            </div>
        )
    }
});

var NumberFrame = React.createClass({
    render: function () {
        var numbers = [], 
            selectedNumbers = this.props.selectedNumbers,
            clickNumber = this.props.clickNumber;
        for (var i = 1; i <= 9; i++) {
            var className = 'number' + (selectedNumbers.indexOf(i) != -1 ? ' selected' : '');
            numbers.push(
                <span className={className} onClick={clickNumber.bind(null, i)}>{i}</span>
            );
        }
        return (
            <div className="card number-frame">
                <div className="card-block">
                    {numbers}
                </div>
            </div>
        )
    }
});


var Game = React.createClass({
    getInitialState: function () {
        return {
            selectedNumbers: [],
            numberOfStar: Math.floor(Math.random() * 9) + 1
        };
    },
    clickNumber: function(input){
        if(this.state.selectedNumbers.indexOf(input) == -1)
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(input)
            })
    },
    render: function () {
        return (
            <div id="game">
                <h2>Random Math Game</h2>
                <hr />
                <div className="row">
                    <div className="col-md-5"><StarFrame numberOfStar={this.state.numberOfStar} /></div>
                    <div className="col-md-2"><ButtonFrame /></div>
                    <div className="col-md-5"><AnswerFrame selectedNumbers={this.state.selectedNumbers} /></div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <NumberFrame selectedNumbers={this.state.selectedNumbers} clickNumber={this.clickNumber}/>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<Game />, document.getElementById("app"));