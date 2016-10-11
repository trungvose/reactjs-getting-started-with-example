//from https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
}

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
        var disabled, button, correct = this.props.correct;
        switch (correct) {
            case true:
                button = (
                    <button onClick={this.props.acceptAnswer} className="btn btn-success">
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </button>
                )
                break;
            case false:
                button = (
                    <button className="btn btn-danger">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                )
                break;
            default:
                button = (
                    <button onClick={this.props.checkAnswer} className="btn btn-primary" disabled={disabled}>=</button>
                );
        }
        return (
            <div className="button-frame text-xs-center m-t-3">
                {button}
                <button onClick={this.props.redraw} className="btn btn-warning btn-sm" disabled={this.props.redrawCount === 0}>
                    <i className="fa fa-refresh" aria-hidden="true"></i> {this.props.redrawCount}
                </button>
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
                <span onClick={props.unSelectNumber.bind(null, i) } className="number">{i}</span>
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
            usedNumbers = this.props.usedNumbers,
            selectNumber = this.props.selectNumber;
        for (var i = 1; i <= 9; i++) {
            var className = 'number' + (selectedNumbers.indexOf(i) != -1 ? ' selected' : '');
            className += (usedNumbers.indexOf(i) != -1 ? ' used' : '');
            numbers.push(
                <span className={className} onClick={selectNumber.bind(null, i) }>{i}</span>
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

var DoneFrame = React.createClass({
    render: function () {
        return (
            <div className="card number-frame">
                <div className="card-block text-xs-center">
                    <h2>{this.props.doneStatus}</h2>
                    <button className="btn btn-default m-t-1" onClick={this.props.resetGame}>Play Again</button>
                </div>
            </div>
        )
    }
})

var Game = React.createClass({
    getInitialState: function () {
        return {
            selectedNumbers: [],
            numberOfStar: this.randomStar(),
            usedNumbers: [],
            redrawCount: 5,
            correct: null,
            doneStatus: null
        };
    },
    randomStar: function () {
        return Math.floor(Math.random() * 9) + 1
    },
    selectNumber: function (input) {
        if (this.state.selectedNumbers.indexOf(input) == -1)
            this.setState({
                selectedNumbers: this.state.selectedNumbers.concat(input),
                correct: null
            })
    },
    unSelectNumber: function (input) {
        var selectedNumbers = this.state.selectedNumbers,
            indexOfNumber = selectedNumbers.indexOf(input);
        selectedNumbers.splice(indexOfNumber, 1);

        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        });
    },
    sumOfSelectedNumber: function () {
        return this.state.selectedNumbers.reduce(function (total, number) {
            return total + number;
        }, 0);
    },
    checkAnswer: function () {
        var correct = (this.state.numberOfStar == this.sumOfSelectedNumber());
        this.setState({
            correct: correct
        })
    },
    acceptAnswer: function () {
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correct: null,
            numberOfStar: this.randomStar()
        }, function () {
            this.updateDoneStatus();
        })
    },
    redraw: function () {
        if (this.state.redrawCount > 0)
            this.setState({
                selectedNumbers: [],
                correct: null,
                numberOfStar: this.randomStar(),
                redrawCount: this.state.redrawCount - 1
            }, function () {
                this.updateDoneStatus();
            })
    },
    possibleSolution: function () {
        var usedNumbers = this.state.usedNumbers,
            numberOfStar = this.state.numberOfStar,
            possibleNumbers = [];

        for (var i = 1; i < 9; i++) {
            if (usedNumbers.indexOf(i) < 0) {
                possibleNumbers.push(i);
            }
        }
        return possibleCombinationSum(possibleNumbers, numberOfStar)
    },
    updateDoneStatus: function () {
        if (this.state.usedNumbers.length === 9) {
            this.setState({ doneStatus: 'Congratulations, You Won!' })
            return;
        }

        if (this.state.redrawCount === 0 && !this.possibleSolution()) {
            this.setState({ doneStatus: 'Sorry. You lose. Game Over!' })
        }
    },
    resetGame: function () {
        this.replaceState(this.getInitialState());
    },
    render: function () {
        var bottomFrame;
        if (this.state.doneStatus) {
            bottomFrame = (
                <DoneFrame doneStatus={this.state.doneStatus} resetGame={this.resetGame} />
            )
        }
        else {
            bottomFrame = (
                <NumberFrame
                    selectedNumbers={this.state.selectedNumbers}
                    selectNumber={this.selectNumber}
                    usedNumbers= {this.state.usedNumbers} />
            )
        }

        return (
            <div id="game">
                <h2>Random Math Game: Play Nine</h2>
                <p>
                    The goal of this game is to use each number only once during the game and not run out of number options.<br />

                    Each turn, you get a random number of stars. Select the number or numbers that add up to that number of stars, then click the equal sign.<br />
                    
                    If you chose correctly, the button will turn green, and you can click it again to submit. <br />
                    
                    You can deselect numbers by clicking on them (in the top right box). <br />
                </p>
                <hr />
                <div className="row">
                    <div className="col-md-5"><StarFrame
                        numberOfStar={this.state.numberOfStar} /></div>

                    <div className="col-md-2"><ButtonFrame
                        selectedNumbers={this.state.selectedNumbers}
                        correct={this.state.correct}
                        checkAnswer={this.checkAnswer}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redrawCount ={this.state.redrawCount} /></div>

                    <div className="col-md-5"><AnswerFrame
                        selectedNumbers={this.state.selectedNumbers}
                        unSelectNumber={this.unSelectNumber} /></div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {bottomFrame}
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<Game />, document.getElementById("app"));