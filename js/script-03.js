var Card = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var vm = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            vm.setState(data);
        })
    },
    render: function () {
        return (
            <div className="col-md-3">
                <div className="card">
                    <img className="card-img-top img-fluid" src={this.state.avatar_url} alt="Card image cap"></img>
                    <div className="card-block">
                        <h4 className="card-title">{this.state.name}</h4>
                        <p className="card-text">{this.state.bio}</p>
                        <p className="card-text"><a href={this.state.blog}>{this.state.blog}</a></p>
                    </div>
                </div>
            </div>
        );
    }
})

var Form = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var loginInput = this.refs.login;
        this.props.addCard(loginInput.value);
        loginInput = '';
    },
    render: function () {
        return (
            <div className="col-md-12">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="userName">Username</label>
                        <input type="text" className="form-control" id="userName" placeholder="trungk18" ref="login"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        )
    }
});

var Main = React.createClass({
    getInitialState: function () {
        return {
            logins: ['trungk18']
        }
    },
    addCard: function (input) {
        this.setState({ logins: this.state.logins.concat(input) });
    },
    render: function () {
        var cards = this.state.logins.map(function (login) {
            return (<Card login={login} />)
        });
        return (
            <div className="row">
                <Form addCard={this.addCard} />
                {cards}
            </div>
        )
    }
});

ReactDOM.render(<Main />, document.getElementById("app"));