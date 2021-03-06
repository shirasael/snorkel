

var NumberInput = React.createClass({displayName: "NumberInput",
	getInitialState: function() {
		return {value: Number(this.props.value)};
	},
	handleChange: function(event) {
		var newVal = Number(event.target.value);
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "number", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var StringInput = React.createClass({displayName: "StringInput",
	getInitialState: function() {
		return {value: this.props.value};
	},
	handleChange: function(event) {
		var newVal = event.target.value;
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "text", value: this.state.value, onChange: this.handleChange})
		);
	}
});

var BoolInput = React.createClass({displayName: "BoolInput",
	getInitialState: function() {
		return {value: this.props.value};
	},
	handleChange: function(event) {
		var newVal = event.target.checked;
    this.setState({value : newVal});
    this.props.valueChanged(newVal);
  },
	render: function() {
		return (
			React.createElement("input", {type: "checkbox", checked: this.state.value, onChange: this.handleChange})
		);
	}
});

var ConfigComponentCreator = React.createClass({displayName: "ConfigComponentCreator",
	genenrateComponent: function() {
		var fieldName = React.findDOMNode(this.refs.compName).value.trim();
		var fieldType = React.findDOMNode(this.refs.compType).value;
		this.props.onComponentCreated(fieldName, fieldType);
	},
	render: function() {
		return (
			React.createElement("div", {className: "componentCreator"}, 
        React.createElement("input", {type: "text", placeholder: "Name", ref: "compName"}), 
        React.createElement("span", null, " : "), 
        React.createElement(TypeSelector, {ref: "compType"}), 
				React.createElement("button", {onClick: this.genenrateComponent}, "Generate Component")
			)
		);
	}
});

var TypeSelector = React.createClass({displayName: "TypeSelector",
	getInitialState: function() {
		return {selected : null};
	},
	handleChange: function(event) {
		var newSelected = event.target.value;
    this.setState({selected : newSelected});
  },
	render: function() {
		return (
			React.createElement("select", {ref: "compType", value: this.state.selected, onChange: this.handleChange}, 
      	React.createElement("option", {value: "num"}, "Number"), 
      	React.createElement("option", {value: "str"}, "String"), 
      	React.createElement("option", {value: "bool"}, "Boolean")
      )
		);
	}
});


var data = {
	"MaxLength" : 50,
	"BackupDirectory" : "/tmp",
	"ShouldForce" : true
};

var dataMeta = {
	"MaxLength" : "num",
	"BackupDirectory" : "str",
	"ShouldForce" : "bool"
}


var ConfigComponentsList = React.createClass({displayName: "ConfigComponentsList",
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
  handleValChange: function(compName, compVal) {
  	this.state.data[compName] = compVal;
  	this.setState({data : this.state.data});
  },
  renderComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.data) {
  		var type = this.state.dataMeta[compName];
  		var val = this.state.data[compName];
  		comps.push(React.createElement(ConfigComponent, {key: index, onChange: this.handleValChange, fieldName: compName, fieldType: type, value: val}))
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.data[compName] = null;
  	this.state.dataMeta[compName] = compType;
  	this.setState({data: this.state.data, dataMeta: this.state.dataMeta});
  },
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "jsonDiv"}, 
					React.createElement("span", {className: "jsonSpan"}, "JSON: ", JSON.stringify(this.state.data))
				), 
				React.createElement("br", null), 
				React.createElement("div", null, 
					React.createElement("div", {className: "components"}, 
						this.renderComponents()
					), 
					React.createElement("br", null), 
					React.createElement(ConfigComponentCreator, {onComponentCreated: this.addComponent})
				)
			)
		);
	}
});

var ConfigForm = React.createClass({displayName: "ConfigForm",
	handleSubmit: function() {
		var toReturn = this.refs.configComponents.state.data;
		console.log(JSON.stringify(toReturn));
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(ConfigComponentsList, {ref: "configComponents", data: data, dataMeta: dataMeta}), 
					React.createElement("br", null)
				)
			)
		);
					// <button onClick={this.handleSubmit}>Get JSON</button>
	}
});

React.render(
  React.createElement(ConfigForm, null),
  document.getElementById('content')
);