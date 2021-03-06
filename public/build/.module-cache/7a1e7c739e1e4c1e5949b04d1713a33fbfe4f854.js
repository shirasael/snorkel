var SystemFront = React.createClass({displayName: "SystemFront",
	render: function() {
		var style = {color: this.props.color};
		return (
			React.createElement("figure", {className: "systemCardFront", style: style}, 
				React.createElement("img", {src: this.props.imgSrc}), 
				React.createElement("h1", null, this.props.sysName)
			)
		);
	}
});

var SystemBack = React.createClass({displayName: "SystemBack",
	renderServers: function() {
		var servers = ['Server-A', 'Server-B', 'Server-C'];
		return servers.map(function(server, index) {
			return (
				React.createElement("div", {className: "server", key: index}, server)
			);
		});
	},
	render: function() {
		var style = {color: this.props.color};
		return (
			React.createElement("figure", {className: "systemCardBack", style: style}, 
				this.renderServers()
			)
		);
	}
});

var SystemCard = React.createClass({displayName: "SystemCard",
	getInitialState: function() {
		return {flipped: false};
	},
	flip: function() {
		console.log("Flipped: " + this.state.flipped);
  	this.setState({flipped : !this.state.flipped});
	},
	getClassName: function() {
		return "card" + this.state.flipped ? " flipped" : "";
	},
	render: function() {
		return (
			React.createElement("section", {className: this.getClassName(), onClick: this.flip}, 
		    React.createElement("div", {className: "card"}, 
		      React.createElement(SystemFront, {color: "blue", sysName: this.props.sysName}), 
		      React.createElement(SystemBack, {color: "red"})
		    )
		  )
		);
	}
});

var SystemsList = React.createClass({displayName: "SystemsList",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(SystemCard, {sysName: "SomeSys"})
			)
		);
	}
});

React.render(
  React.createElement(SystemsList, null),
  document.getElementById('content')
);