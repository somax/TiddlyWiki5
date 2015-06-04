/*\
title: $:/core/modules/widgets/action-setfield.js
type: application/javascript
module-type: widget

Action widget to set a single field or index on a tiddler.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var SetFieldWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
SetFieldWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
SetFieldWidget.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
SetFieldWidget.prototype.execute = function() {
	this.actionTiddler = this.getAttribute("$tiddler",this.getVariable("currentTiddler"));
	this.actionField = this.getAttribute("$field");
	this.actionIndex = this.getAttribute("$index");
	this.actionValue = this.getAttribute("$value");
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
SetFieldWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes["$tiddler"] || changedAttributes["$field"] || changedAttributes["$index"] || changedAttributes["$value"]) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
SetFieldWidget.prototype.invokeAction = function(triggeringWidget,event) {
	var self = this;
	if(typeof this.actionValue === "string") {
		this.wiki.setText(this.actionTiddler,this.actionField,this.actionIndex,this.actionValue);		
	}
	$tw.utils.each(this.attributes,function(attribute,name) {
		if(name.charAt(0) !== "$") {
			self.wiki.setText(self.actionTiddler,name,undefined,attribute);
		}
	});
	return true; // Action was invoked
};

exports["action-setfield"] = SetFieldWidget;

})();