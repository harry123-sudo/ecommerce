/**
 * Renders a button-group
 * @dependency lyte-grouper,lyte-button
 * @component lyte-button-group
 * @version 3.1.0
 * @methods onBeforeSelected,onSelected,onBeforeUnselected,onUnselected,onChanged
 * @import lyte-grouper
 * @ignoreProperties ltPropAlignment,ltPropAppearance,ltPropWidth,ltPropSelectedClass
 */
Lyte.Component.register("lyte-button-group", {
_template:"<template tag-name=\"lyte-button-group\" style=\"width:{{ltPropWidth}}\" onclick=\"{{action('click')}}\"> <lyte-grouper lt-prop-alignment=\"{{ltPropAlignment}}\" lt-prop-appearance=\"{{ltPropAppearance}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-yield yield-name=\"yield\" class=\"lyteBtnGroupWrap\"> </lyte-yield> </template> </lyte-grouper> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1]}]},{"type":"componentDynamic","position":[1]}],
_templateAttributes :{"type":"attr","position":[],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","ltPropWidth"]}}}},
_observedAttributes :["ltPropType","ltPropAlignment","ltPropAppearance","ltPropSelectedValues","ltPropSelected","ltPropSelectedClass","ltPropWidth","ltPropFireOnInit","preventSelect"],
	data : function(){
		return {
			/** 
			 * @componentProperty {checkbox | radiobutton} ltPropType=checkbox
			 */
			ltPropType : Lyte.attr("string",{"default" : "checkbox"}),
			/** 
			 * @componentProperty {Horizontal | Vertical} ltPropAlignment=Horizontal
			 */
			ltPropAlignment : Lyte.attr("string", {
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'alignment', "Horizontal" )
			}),
			/** 
			 * @componentProperty {fill | line} ltPropAppearance=line
			 */
			ltPropAppearance : Lyte.attr("string",{
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'appearance', "line" )
			}),
			/** 
			 * @componentProperty {array} ltPropSelectedValues
			 * @default []
			 */
			ltPropSelectedValues : Lyte.attr("array",{"default" : []}),
			/** 
			 * @componentProperty {string} ltPropSelected=""
			 */
			ltPropSelected : Lyte.attr("string",{"default" : ""}),
			/** 
			 * @componentProperty {string} ltPropSelectedClass=lyteBtnGroupSelectedBtn
			 */
			ltPropSelectedClass : Lyte.attr("string",{
				"default" : _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'selectedClass', "lyteBtnGroupSelectedBtn" )
			}),
			/** 
			 * @componentProperty {string} ltPropWidth=auto
			 * @default auto
			 */
			ltPropWidth : Lyte.attr("string",{"default" : "auto"}),
			/** 
			 * @componentProperty {boolean} ltPropFireOnInit=false
			 */
			ltPropFireOnInit : Lyte.attr("boolean",{
				"default": _lyteUiUtils.resolveDefaultValue( 'lyte-button-group', 'fireOnInit', false )
			}),
			preventSelect : Lyte.attr("boolean",{"default" : false})
		}		
	},
	isRadioButton : function(){
		if(this.data.ltPropType === "radiobutton"){
			return true;
		}
	},
	isCheckbox : function(){
		if(this.data.ltPropType === "checkbox"){
			return true;
		}
	},
	didConnect : function(){
		if(this.data.ltPropFireOnInit){
			this.setupButtons(); //ForCallbacks
		}
		else{
			if(this.isRadioButton()){
				this.updateButtons([],[this.data.ltPropSelected]);
			}
			else if(this.isCheckbox()){
				this.updateButtons([],this.data.ltPropSelectedValues);
			}
		}
	},
	updateButtons: function(oldValue,newValue){
		var oldButton = this.getSelectedButtons(oldValue),
		newButton =  this.getSelectedButtons(newValue);
		if(oldButton.length > 0){
			this.removeClass(oldButton);
		}
		if(newButton.length > 0){
			this.addClass(newButton);
		}
	},
	setupButtons : function(){
		var type =  this.data.ltPropType;
		if(type === "radiobutton" && this.data.ltPropSelected){
			this.changeRadiobutton("",this.data.ltPropSelected);
		}
		else if(type === "checkbox" && this.data.ltPropSelectedValues.length > 0){
			this.selectCheckbox(this.data.ltPropSelectedValues);
		}
	},
	setSelectedValue : function(dataName,value){
		this.setData("preventSelect",true);
		this.setData(dataName,value);
		this.setData("preventSelect",false);
	},
	changeCheckbox : function(oldArray,newArray,oldValue,index,event){
		var	unselectedButtons = this.getSelectedButtons(oldArray),
		selectedButtons =  this.getSelectedButtons(newArray),
		oldButtons =  this.getSelectedButtons(oldValue),
		newButtons = oldButtons.slice();
		if(oldArray.length > 0){
			if(this.onBeforeUnselected(oldArray,unselectedButtons,event)){
				return;
			}
			this.removeClass(unselectedButtons);
			Lyte.arrayUtils(this.getData("ltPropSelectedValues"),"removeAt", index ,1);
			newButtons.splice(index,1);
			this.onUnselected(oldArray,unselectedButtons,event);
		}
		if(newArray.length > 0){
			if(this.onBeforeSelected(newArray,selectedButtons,event)){
				this.setSelectedValue("ltPropSelectedValues",oldValue);
				return;
			}
			this.addClass(selectedButtons);
			Lyte.arrayUtils(this.getData("ltPropSelectedValues"),"push",newArray[0]);
			newButtons.push(selectedButtons[0]);
			this.onSelected(newArray,selectedButtons,event);
		}
		this.onChanged(oldValue,this.data.ltPropSelectedValues, oldButtons,newButtons);
	},
	selectCheckbox : function(newValue){
		var newButtons = this.getSelectedButtons(newValue);
		if(newValue.length > 0){
			if(this.onBeforeSelected(newValue,newButtons,event)){
				this.setSelectedValue("ltPropSelectedValues",[]);
				return;
			}
			this.addClass(newButtons);
			this.onSelected(newValue,newButtons,event);
		}
		this.onChanged([], newValue,[],newButtons);
	},
	changeRadiobutton : function(oldValue,newValue,event){
		var oldButton = this.getSelectedButton( oldValue ),
		newButton = this.getSelectedButton( newValue );
		if(oldButton && this.onBeforeUnselected(oldValue,oldButton,event)){
			this.setSelectedValue("ltPropSelected",oldValue);
			return;
		}
		if(newButton && this.onBeforeSelected(newValue,newButton,event)){
			this.setSelectedValue("ltPropSelected",oldValue);
			return;
		}
		if(oldButton){
			this.removeClass([oldButton]);
			this.onUnselected(oldValue,oldButton,event);
		}
		if(newButton){
			this.addClass([newButton]);
			if(event){
				this.setSelectedValue("ltPropSelected",newValue);
			}
			this.onSelected(newValue,newButton,event);
		}
		this.onChanged( oldValue, newValue, oldButton, newButton);
	},
	onBeforeSelected: function( values, buttons, event ) {
		if( this.getMethods( 'onBeforeSelect' ) ) {
			if(this.executeMethod( 'onBeforeSelect', values, buttons,event ) === false){
				return true;
			}
		}
	},
	onSelected : function(values, buttons, event){
		if( this.getMethods( 'onSelect' ) ) {
			this.executeMethod( 'onSelect',values, buttons, event );
		}
	},
	onBeforeUnselected: function( values, buttons, event ) {
		if( this.getMethods( 'onBeforeUnselect' ) ) {
			if(this.executeMethod( 'onBeforeUnselect', values, buttons,event ) === false){
				return true;
			}
		}
	},
	onUnselected : function(values, buttons, event){
		if( this.getMethods( 'onUnselect' ) ) {
			this.executeMethod( 'onUnselect',values, buttons, event );
		}
	},
	onChanged: function(oldValue, newValue, prevLyteButtons,currentLyteButtons) {
		if( this.getMethods( 'onChanged' ) ) {
			this.executeMethod( 'onChanged',oldValue, newValue, prevLyteButtons, currentLyteButtons);
		}
	},
	getSelectedButtons : function(arr){ // this for array
		var array = [];
		for(var index=0;index<arr.length;index++){
			if(arr[index]){
				var button = this.$node.querySelector("[lt-prop-value ='"+window._lyteUiUtils.escape(arr[index])+"']");
				if(button){
					array.push(button);
				}
			}
		}
		return array;
	},
	getSelectedButton : function(value){
		if(value){
			var button = this.$node.querySelector("[lt-prop-value ='"+window._lyteUiUtils.escape(value)+"']");
			return button;
		}
	},
	removeClass: function(nodes){
		var className =  this.data.ltPropSelectedClass;
		if(className){
			nodes.forEach(function(node){
				var button = node.querySelector("button");
				button.classList.remove(className);
			});
		}
	},
	addClass: function(nodes){
		var className =  this.data.ltPropSelectedClass;
		if(className){
			nodes.forEach(function(node){
				var button = node.querySelector("button");
				button.classList.add(className);
			});
		}
	},
	handleBtnOldandNewValue : function(oldArr,newArr){
		var oldArray=[],newArray=[];
		if(newArr.length){
			for(var index=0;index<oldArr.length;index++){
				var temp = oldArr[index];
				if(newArr.indexOf(temp)<0){
					oldArray.push(temp);
				}
			}
		}
		else{
			oldArray = oldArr;
		}
		if(oldArr.length){
			for(var index=0;index<newArr.length;index++){
				var temp = newArr[index];
				if(oldArr.indexOf(temp)<0){
					newArray.push(temp);
				}
			}
		}
		else{
			newArray =  newArr;
		}
		return {newValue:newArray,oldValue:oldArray}
	},
	selectedObserver : function(change){
		if(this.data.preventSelect){
			return;
		}
		if(this.isRadioButton()){
			this.updateButtons([change.oldValue],[change.newValue]);
		}
	}.observes('ltPropSelected'),
	selectedValuesObserver  : function(change){
		if(this.data.preventSelect){
			return;
		}
		if(this.isCheckbox()){
			var obj = this.handleBtnOldandNewValue(change.oldValue,change.newValue);
			this.updateButtons(obj.oldValue,obj.newValue);
		}
	}.observes('ltPropSelectedValues'),
	classChange : function(change){
		if(change.oldValue){
			var nodes = this.$node.querySelectorAll("."+change.oldValue);
			nodes.forEach(function(node){
				node.classList.remove(change.oldValue);
			});
			if(change.newValue){
				nodes.forEach(function(node){
					node.classList.add(change.newValue);
				});
			}
		}
	}.observes("ltPropSelectedClass"),
	actions : {
		click : function(){
			var target = event.target,lyteButton = $L(target).closest('lyte-button',this.$node)[0];
			if(lyteButton && lyteButton.contains(target)){
				var type = this.data.ltPropType,selected,
				value =  lyteButton.getAttribute("lt-prop-value");
				if(type == "checkbox"){
					selected = this.data.ltPropSelectedValues.slice();
					var index = selected.indexOf(value);
					if(index > -1){
						this.changeCheckbox([value],[],selected,index,event);
					}
					else{
						this.changeCheckbox([],[value],selected,undefined,event);
					}
				}
				else if(type == "radiobutton"){
					selected = this.data.ltPropSelected;
					if(selected != value){
						this.changeRadiobutton(selected,value,event);
					}
				}
			}
		}
	}
}); 
/**
 * @syntax yielded 
 *	<lyte-button-group>
 * 		<template is='registerYield' yield-name='yield'> 
 *	  		<lyte-button lt-prop-value='button1'> 
 *	  	  		<template is='registerYield' yield-name='text'> 
 *	  	  	  		Button1 
 *	  	  	  	</template> 
 *	  	  	</lyte-button> 
 *	  	  	<lyte-button lt-prop-value='button2'> 
 *	  	  		<template is='registerYield' yield-name='text'> 
 *	  	  	  		Button2 
 *	  	  	  	</template> 
 *	  	  	</lyte-button> 
 *	  	</template> 
 *	</lyte-button-group>
 */