var data = {
	"MaxLength" : 50,
	"BackupDirectory" : "/tmp",
	"ShouldForce" : true
};

var dataMeta = {
	"MaxLength" : {self: "num"},
	"BackupDirectory" : {self: "str"},
	"ShouldForce" : {self: "bool"}
}


var ConfigComponentsList = React.createClass({displayName: "ConfigComponentsList",
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
  handleChange: function(comp, newVals) {
  	this.state.data[comp.props.fieldName] = newVals.value;
  	this.state.dataMeta[comp.props.fieldName] = newVals.dataMeta;
  	this.setState({data : this.state.data, dataMeta : this.state.dataMeta});
  	this.props.onChange(this.state);
  },
  renderComponents: function() {
  	var comps = [];
  	var index = 0;
  	for (compName in this.state.data) {
  		var val = this.state.data[compName];
  		var meta = this.state.dataMeta[compName];
  		comps.push(React.createElement(ConfigComponent, {key: index, onChange: this.handleChange, fieldName: compName, value: val, dataMeta: meta}))
  		index++;
  	}
  	return comps;
  },
  addComponent: function(compName, compType) {
  	this.state.data[compName] = null;
  	this.state.dataMeta[compName] = {self: compType};
  	this.setState({data: this.state.data, dataMeta: this.state.dataMeta});
  	this.props.onChange(this.state);
  },
	render: function() {
		return (
			React.createElement("div", null, 
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
  mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {data: this.props.data, dataMeta: this.props.dataMeta};
	},
	updateData: function(args) {
		this.setState(args);
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "jsonDiv"}, 
					React.createElement("span", {className: "jsonSpan"}, "JSON: ", JSON.stringify(this.state.data))
				), 
				React.createElement("div", {className: "configForm"}, 
					React.createElement(ConfigComponentsList, {ref: "configComponents", data: this.state.data, dataMeta: this.state.dataMeta, onChange: this.updateData})
				)
			)
		);
	}
});

var ConfigPage = React.createClass({displayName: "ConfigPage",
	handleSave: function() {
		var jsonData = this.refs.confForm.data;
		var saveSpan = this.refs.savedSpan;
		var url = '/save/' + this.props.system + "/" + this.props.config;
		$.ajax({
	    url: url,
	    type: 'POST',
	    data: JSON.stringify(jsonData),
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    async: false,
	    success: function(msg) {
	      alert(msg);
	      // savedSpan.style.visibility = "visible";
	    }.bind(this),
	    error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "configHeader"}, 
					React.createElement("h1", {className: "systemTitle"}, this.props.system), 
					React.createElement("h2", {className: "configTitle"}, this.props.config)
				), 
				React.createElement(ConfigForm, {ref: "confForm", data: data, dataMeta: dataMeta}), 
				React.createElement("span", {style: {visibility: "hidden"}, ref: "savedSpan"}, "Saved!"), 
				React.createElement("button", {className: "saveButton", onClick: this.handleSave}, "SAVE!"), 
				React.createElement("br", null)
			)
		);
	}
});