
if(!_LyteDrawer_){
	var _LyteDrawer_ =  [];
}
Lyte.Component.register("lyte-drawer", {
_template:"<template tag-name=\"lyte-drawer\"> <template is=\"if\" value=\"{{expHandlers(ltPropLayout,'==',&quot;modal&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-modal lt-prop=\"{{stringify(ltPropModal)}}\" lt-prop-allow-multiple=\"true\" lt-prop-show-close-button=\"false\" lt-prop-close-on-escape=\"false\" lt-prop-width=\"{{ltPropWidth}}\" lt-prop-wrapper-class=\"{{ltPropWrapperClass}}\" lt-prop-height=\"{{ltPropHeight}}\" lt-prop-freeze=\"{{ltPropFreeze}}\" on-before-show=\"{{method(&quot;modalOnBeforeShow&quot;)}}\" on-show=\"{{method(&quot;modalOnShow&quot;)}}\" on-close=\"{{method(&quot;modalOnClose&quot;)}}\" on-before-close=\"{{method(&quot;modalOnBeforeClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content onclick=\"{{action(&quot;selectedItem&quot;,event,&quot;modal&quot;)}}\"> <lyte-yield yield-name=\"drawerPanel\"></lyte-yield> </lyte-modal-content> </template> </lyte-modal> </template><template case=\"false\"> <lyte-modal lt-prop=\"{{stringify(ltPropModal)}}\" lt-prop-allow-multiple=\"true\" lt-prop-show-close-button=\"false\" lt-prop-close-on-escape=\"false\" lt-prop-width=\"{{ltPropWidth}}\" lt-prop-wrapper-class=\"{{{{ltPropWrapperClass}}}}\" lt-prop-height=\"{{ltPropHeight}}\" lt-prop-freeze=\"{{ltPropFreeze}}\" on-before-show=\"{{method(&quot;modalOnBeforeShow&quot;)}}\" on-show=\"{{method(&quot;modalOnShow&quot;)}}\" on-close=\"{{method(&quot;modalOnClose&quot;)}}\" on-before-close=\"{{method(&quot;modalOnBeforeClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"modal\"> <lyte-modal-content onclick=\"{{action(&quot;selectedItem&quot;,event,&quot;modal&quot;)}}\"> <lyte-drawer-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drawer-group> <lyte-drawer-label> {{lyteUiReturnOnlyKey(item)}} </lyte-drawer-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\"> <template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{subitem[ltPropSystemValue]}}\"> {{subitem[ltPropUserValue]}} </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{subitem}}\"> {{subitem}} </lyte-drawer-item> </template></template></template> </lyte-drawer-group> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{item[ltPropSystemValue]}}\"> {{item[ltPropUserValue]}} </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{item}}\"> {{item}} </lyte-drawer-item> </template></template></template></template></template> </lyte-drawer-body> </lyte-modal-content> </template> </lyte-modal> </template></template> </template><template case=\"false\"> <div class=\"lyteDrawerInlineBody {{if(ltPropShow,'drawerPanelShown','drawerPanelHidden')}}\" style=\"height:{{ltPropHeight}};\"> <div class=\"lyteDrawerPanel\" onclick=\"{{action(&quot;selectedItem&quot;,event,&quot;inline&quot;)}}\" style=\"width:{{ltPropWidth}};\"> <div class=\"drawerWrapper {{ltPropWrapperClass}}\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"drawerPanel\"> </lyte-yield> </template><template case=\"false\"> <lyte-drawer-body> <template is=\"for\" items=\"{{ltPropOptions}}\" item=\"item\" index=\"index\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(item)}}\"><template case=\"true\"> <lyte-drawer-group> <lyte-drawer-label> {{lyteUiReturnOnlyKey(item)}} </lyte-drawer-label> <template is=\"for\" items=\"{{lyteUiReturnValueBy(item,lyteUiReturnOnlyKey(item))}}\" item=\"subitem\" index=\"indexval\"> <template is=\"if\" value=\"{{lyteUiIsObject(subitem)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{subitem[ltPropSystemValue]}}\"> {{subitem[ltPropUserValue]}} </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{subitem}}\"> {{subitem}} </lyte-drawer-item> </template></template></template> </lyte-drawer-group> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIsObject(item)}}\"><template case=\"true\"> <lyte-drawer-item data-value=\"{{item[ltPropSystemValue]}}\"> {{item[ltPropUserValue]}} </lyte-drawer-item> </template><template case=\"false\"> <lyte-drawer-item data-value=\"{{item}}\"> {{item}} </lyte-drawer-item> </template></template></template></template></template> </lyte-drawer-body> </template></template> </div> </div> <div class=\"lyteDrawerContent\"> <lyte-yield yield-name=\"drawerContent\"> </lyte-yield> </div> <template is=\"if\" value=\"{{expHandlers(ltPropShow,'&amp;&amp;',ltPropFreeze)}}\"><template case=\"true\"> <lyte-drawer-freeze style=\"{{currentPosition}}:{{ltPropWidth}};\"></lyte-drawer-freeze> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"insertYield","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'height:'","ltPropHeight","';'"]}}}},{"type":"attr","position":[1,1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width:'","ltPropWidth","';'"]}}}},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"insertYield","position":[1,3,1]},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["''","currentPosition","':'","ltPropWidth","';'"]}}}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropPosition","ltPropWidth","ltPropHeight","ltPropModal","ltPropFreeze","ltPropAnimationseconds","ltPropMiniVariant","ltPropUserValue","ltPropSystemValue","ltPropOptions","ltPropShow","ltPropSelectedClass","ltPropSelected","ltPropCloseOnSelect","ltPropCloseOnOutsideClick","ltPropDisableOptions","ltPropWrapperClass","ltPropLayout","ltPropDisplayType","ltPropYield","marginProperty","returnedFalse","currentPosition"],
	data : function(){
		return {
			ltPropPosition:Lyte.attr("string",{"default":"left"}),
			ltPropWidth:Lyte.attr("string",{"default":"200px"}),
			ltPropHeight:Lyte.attr("string",{"default":"100%"}),
			ltPropModal:Lyte.attr("object",{"default":{}}),
			ltPropFreeze:Lyte.attr("boolean",{"default":true}),
			ltPropAnimationseconds:Lyte.attr("string",{"default":"1"}),
			ltPropMiniVariant:Lyte.attr("boolean",{"default":true}),
			ltPropUserValue: Lyte.attr("string",{default:"name"}),
			ltPropSystemValue:Lyte.attr("string",{default:"value"}),
			ltPropOptions:Lyte.attr("array",{default:[]}),
			ltPropShow:Lyte.attr("boolean",{"default":false}),
			ltPropSelectedClass:Lyte.attr("string"),
			ltPropSelected:Lyte.attr("string"),
			ltPropCloseOnSelect:Lyte.attr("boolean",{"default":false}),
			ltPropCloseOnOutsideClick : Lyte.attr("boolean",{"default":true}),
			ltPropDisableOptions:Lyte.attr("array",{"default":[]}),
			ltPropWrapperClass:Lyte.attr("string"),
			// visibleState:Lyte.attr("boolean",{default:true}),
			ltPropLayout:Lyte.attr("string",{"default":"modal"}),
			ltPropDisplayType:Lyte.attr("string",{"default":"displace"}),
			ltPropYield:Lyte.attr("boolean",{default:false}),

			marginProperty:Lyte.attr("string",{"default":"marginLeft"}),
			returnedFalse : Lyte.attr("boolean",{"default" : false}),
			currentPosition : Lyte.attr("string")
		}		
	},
	methods:{
		modalOnBeforeShow:function(component){
			var position = this.$node.ltProp("position"),
			type = this.$node.ltProp("type"),
			offset = component.$node.ltProp("offset");
			var lyteDrawerBody = component.actualModalDiv.querySelector("lyte-drawer-body");
			// for(var i = 0 ; i<LytePopup.components.length; i++){
			// 	var parent = LytePopup.components[i].$node.parentElement;
			// 	if(parent && parent.tagName == "LYTE-DRAWER" && parent.component.getData("visibleState")){
			// 		parent.component.setData("visibleState",false);
			// 		break;
			// 	}
			// }
			if(position == "bottom"){
				var height = this.$node.ltProp("height");
				if(height == "100%"){
					this.$node.ltProp("height",component.actualModalDiv.querySelector("lyte-yield").getBoundingClientRect().height+"px");
				}
				height = this.$node.ltProp("height");
				var tempHeight = (height.indexOf('px') >= 0)?parseInt(height):(parseInt(height)/100)*window.innerHeight;
				if(tempHeight > window.innerHeight/2){
					this.$node.ltProp("height",window.innerHeight/2+"px");
				}
				this.$node.ltProp("width","100%");
			}
			else{
				this.$node.ltProp("height","100%");
				var width = this.$node.ltProp("width");
				if(width == "100%"){
					this.$node.ltProp("width","200px");
				}
			}
			if(lyteDrawerBody){
				var comp = this,
				tempHeight = this.$node.ltProp("height");
				tempHeight = (tempHeight.indexOf('px') >= 0)?parseInt(tempHeight):(parseInt(tempHeight)/100)*window.innerHeight;
				if(!isNaN(parseInt(offset.top))){
					tempHeight = (tempHeight - parseInt(offset.top));
				}
				lyteDrawerBody.style.height = tempHeight+"px";
				lyteDrawerBody.addEventListener("scroll",function(event){
					comp.scrollEvent(event);
				},true);
			}
			// if(type == "permanent"){
			// 	this.$node.ltProp("freeze",false);
			// }
			// else{
			// 	this.$node.ltProp("freeze",true);
			// }
			if(this.getMethods("onBeforeShow")){
				return this.executeMethod("onBeforeShow",this) ; 
			}
		},
		modalOnShow:function(component){
			_LyteDrawer_.push(this.$node);
			var lyteContent = component.actualModalDiv.querySelector("lyte-modal-content");
			component.actualModalDiv.parentElement.style.overflow = "hidden";
			lyteContent.style["overflow-y"] = "hidden";
			lyteContent.style.padding = "0px 0px";
			this.selectedOptionOperation();
			this.disableOnoptionsOperation();
			//var freezeLayer = component.childComp.querySelector("lyte-modal-freeze");
			// if(freezeLayer){
			// 	freezeLayer.addEventListener("click",function(){
			// 		for(var i = LytePopup.components.length -1 ; i>=0; i--){
			// 			if(LytePopup.components[i].$node.tagName == "LYTE-MODAL" && LytePopup.components[i].childComp.style.visibility == "visible"){
			// 				var popover = LytePopup.components[i].$node;
			// 				var parent = popover.parentElement;
			// 				if(parent && parent.tagName == "LYTE-DRAWER" && parent.ltProp('show') && parent.ltProp("CloseOnOutsideClick")){
			// 					parent.ltProp('show',false);
			// 					break;
			// 				}
			// 			}
			// 		}
			// 		console.log(this);
			// 	});
			// }
			if(this.getMethods("onShow")){
				return this.executeMethod("onShow",this) ; 
			}
		},
		modalOnBeforeClose:function(event,component){
			if(this.getMethods("onBeforeClose")){
				return this.executeMethod("onBeforeClose",this) ; 
			}
		},
		modalOnClose:function(component){
			_LyteDrawer_.pop();
			setTimeout(function(){
				component.$node.ltProp('reRenderModal',true);
			},500);
			if(this.getMethods("onClose")){
				return this.executeMethod("onClose",this) ; 
			}
		}
	},
	didConnect:function(){
		var lyteDrawerBody = this.$node.querySelector("lyte-drawer-body"),comp = this,layout=this.$node.ltProp("layout");
		if(lyteDrawerBody&&(layout == "inline")){
			lyteDrawerBody.addEventListener("scroll",function(event){
				comp.scrollEvent(event);
			},true);
		}
		// var drawer = this.$node,
		// layout = this.$node.ltProp("layout");
		// var yield = drawer.querySelectorAll("lyte-yield"),temp;
		// if(layout == "modal"){
		// 	// temp = yield[0].getAttribute("yield-name");
		// 	if(!yield.length){
		// 		this.setData("noyield",true);
		// 	}
		// 	else{
		// 		this.setData("noyield",false);
		// 	}
		// }
		// else{
		// 	temp = yield[1].getAttribute("yield-name");
		// 	if(yield == "yield"){
		// 		this.setData("noyield",false);
		// 	}
		// 	else{
		// 		this.setData("noyield",true);
		// 	}
		// }
		// if (document.readyState === "complete" || document.readyState === "interactive"){
		// 	addPopoverEvent();
		// }
		// else{
		// 	document.addEventListener("DOMContentLoaded", function(event){
		// 		addPopoverEvent(event);
		// 	});
		// }
	},
	didDestory:function(){
		//remove documnet event listener
	},
	actions:{
		selectedItem:function(event,type){
			var target= event.target;
			if(target.tagName == "LYTE-DRAWER-ITEM" && !target.classList.contains('lyteDrawerDisabledItem')){
				var value = target.getAttribute("data-value");
				this.$node.ltProp("selected",value);
			}
		}
	},
	selectedOptionOperation : function(changes){
		var Class = this.$node.ltProp("SelectedClass"),
		close = this.$node.ltProp("CloseOnSelect"),
		layout = this.$node.ltProp("layout"),
		selected = this.$node.ltProp("selected"),previous,parent,target;
		if(layout == "inline"){
			parent =this.$node.querySelector(".lyteDrawerPanel");
		}
		else{
			parent = this.$node.querySelector("lyte-modal").component.actualModalDiv;
		}
		if(parent && parent.querySelectorAll("lyte-drawer-item")){
			previous = parent.querySelector(".lyteDrawerActiveItem");
			if(selected){
				target = parent.querySelector("[data-value ='"+window._lyteUiUtils.escape(selected)+"']")
			}
			if(previous){
				//previous.setAttribute("class","");
				previous.classList.remove("lyteDrawerActiveItem");
				if(Class){
					previous.classList.remove(Class);
				}
			}
			if(target){
				target.classList.add("lyteDrawerActiveItem");
				if(Class){
					//target.setAttribute("class","active "+Class);
					target.classList.add(Class);
				}
				if(changes){
					if(this.getMethods("onSelected")){
						this.executeMethod("onSelected",selected,target,this) ; 
					}
					if(close){
						this.$node.ltProp("show",false);
					}
				}
			}
		}
	},
	selectedoption : function(changes){
		this.selectedOptionOperation(changes);
	}.observes("ltPropSelected"),
	disableOnoptionsOperation : function(){
		var array = this.getData("ltPropDisableOptions");
		var disabledlist,layout = this.$node.ltProp("layout"),parent;
		if(layout == "inline"){
			parent = this.$node.querySelector(".lyteDrawerPanel");
		}
		else{
			parent = this.$node.querySelector("lyte-modal").component.actualModalDiv;
		}
		if(parent && parent.querySelectorAll("lyte-drawer-item")){
			disabledlist = parent.querySelectorAll(".lyteDrawerDisabledItem")
			for(var index = 0 ; index<disabledlist.length;index++){
				disabledlist[index].classList.remove("lyteDrawerDisabledItem");
				//disabledlist[index].setAttribute("class","");
			}
			for(var index = 0 ; index<array.length;index++){
				var item = parent.querySelector("[data-value ='"+window._lyteUiUtils.escape(array[index])+"']");
				if(item){
					item.classList.add("lyteDrawerDisabledItem");
				}
			}
		}
	},
	disableOnoptions:function(){
		this.disableOnoptionsOperation();
	}.observes("ltPropDisableOptions"),
	showChanges:function(){
		var  show  = this.$node.ltProp("show");
		var panel = this.$node.querySelector('.lyteDrawerPanel'),
		layout = this.$node.ltProp("layout");
		panel = $L(panel);
		var position = this.$node.ltProp("position"),
		rtl = _lyteUiUtils.getRTL(),
		seconds =  this.$node.ltProp("animationseconds"),
		component = this.$node.querySelector("lyte-modal"),
		margin = this.getData('marginProperty'),
		displayType = this.$node.ltProp("displayType"),
		panelWidth = this.$node.ltProp("width"),
		tempPosition,result;
		if(this.getData('returnedFalse')){
            this.setData('returnedFalse',false);
            return;
        }
		if(show){
			if(rtl){
				tempPosition = (position == "right")?"left":(position == "left")?"right":"bottom";
			}
			else{
				tempPosition  = position;
			}
			this.setData("currentPosition",tempPosition);
			if(layout == "modal"){
				var offset  = component.ltProp("offset");
				if(tempPosition == "left"){
					component.ltProp("transition",{"animation":"slideFromLeft","duration":seconds});
					offset.left = "0px";
					component.ltProp("offset",offset);
				}
				else if(tempPosition == "right"){
					component.ltProp("transition",{"animation":"slideFromRight","duration":seconds});
					offset.right = "0px";
					component.ltProp("offset",offset);
				}
				else if(position == "bottom"){
					component.ltProp("transition",{"animation":"slideFromBottom","duration":seconds});
					offset.bottom = "0px";
					component.ltProp("offset",offset);
				}
				component.ltProp("show",true);
			}
			else if(layout == "inline"){
				var parent = this.$node.querySelector(".lyteDrawerInlineBody");
				if(tempPosition == "left"){
                    $L(parent).removeClass('lyteDrawerPanelRight').addClass('lyteDrawerPanelLeft');
					this.setData("marginProperty","marginLeft");
				}
				else if(tempPosition == "right"){
                    $L(parent).removeClass('lyteDrawerPanelLeft').addClass('lyteDrawerPanelRight');
					this.setData("marginProperty","marginRight");
				}
				//margin = this.getData("marginProperty");
				if(displayType == "overlapping"){
					var childpanel = this.$node.querySelector('.lyteDrawerContent').querySelector(".lyteDrawerPanel");
					if(childpanel){
						var width = childpanel.getBoundingClientRect().width;
						if(width){
							childpanel.style.width = 30+"px";
						}
					}
				}
				if(this.getMethods("onBeforeShow")){
					result = this.executeMethod("onBeforeShow",this) ; 
				}
				if(result === undefined || result){
					// this.selectedOptionOperation();
					// this.disableOnoptionsOperation();
					// panel.css('width', panelWidth);
					// var width =panel[0].getBoundingClientRect().width;
					// panel.css(margin, width+"px");
					// panel[0].removeEventListener("transitionend",this.transitionEnd,true);
					// panel.css('transition', 'margin '+seconds+'s ease');
					// setTimeout(function() {
					// 	panel.css(margin, '0px');
					// }, 50);
					_LyteDrawer_.push(this.$node);
					if(this.getMethods("onShow")){
						this.executeMethod("onShow",this) ; 
					}
				}
				else{
					this.setData("returnedFalse",true);
					this.$node.ltProp("show",false);
				}
			}
		}
		else if(layout == "inline"){
			if(panel[0].getBoundingClientRect().width){
				if(this.getMethods("onBeforeClose")){
					result = this.executeMethod("onBeforeClose",this) ; 
				}
				if(result === undefined || result){
					if(displayType == "overlapping"){
						var content = this.$node.querySelector('.lyteDrawerContent'),
						childcontent = content.querySelector('.lyteDrawerPanel');
						if(childcontent){
							var tempWidth = childcontent.getBoundingClientRect().width;
							if(tempWidth){
								childcontent.style.width = childcontent.parentElement.parentElement.ltProp("width");
							}
						}
					}
					// var width =panel[0].getBoundingClientRect().width;
					// panel.css('transition', 'margin '+seconds+'s ease');
					// panel.css(margin, -width+"px");
					// panel[0].addEventListener('transitionend',this.transitionEnd,true);
					_LyteDrawer_.pop();
					if(this.getMethods("onClose")){
						this.executeMethod("onClose",this) ; 
					}
				}
				else{
					this.setData("returnedFalse",true);
					this.$node.ltProp("show",true);
				}
			}
		}
		else{
			component.ltProp("show",false);
		}
	}.observes("ltPropShow").on('didConnect'),
	widthUpdate:function(change){	
		var layout = this.$node.ltProp("layout"),
		show = this.$node.ltProp("show");
		if(layout == "inline" && show){
			this.$node.querySelector(".lyteDrawerPanel").style.width = change.newValue;
		}
	}.observes("ltPropWidth"),
		// showObserve:function(){
	// 	this.positionChanges();
	// },
	scrollEvent:function(event){
		console.log("drawerbody");
		if(this.getMethods("onScroll")){
			return this.executeMethod("onScroll",this,event) ; 
		}
	},
	transitionEnd:function(){
		var drawerElem = $L(this);
		drawerElem.css('transition', '');
		drawerElem.css('width', 0);
		drawerElem.css('marginLeft', '');
		drawerElem.css('marginRight','');
	}
	// inlineShowChanges:function(){
	// 	var layout = this.$node.ltProp("layout"),
	// 	displayType = this.$node.ltProp("displayType"),
	// 	panelWidth = this.$node.ltProp("width"),
	// 	seconds =  this.$node.ltProp("animationseconds"),
	// 	margin = this.getData('marginProperty');
	// 	if(layout != "modal"){
	// 		var show = this.$node.ltProp("show");
	// 		var panel = this.$node.querySelector('.lyteDrawerPanel');
	// 		panel = $L(panel);
	// 		if(show){
	// 			if(displayType == "overlapping"){
	// 				var childpanel = this.$node.querySelector('.lyteDrawerContent').querySelector(".lyteDrawerPanel");
	// 				var width = childpanel.getBoundingClientRect().width;
	// 				if(width){
	// 					childpanel.style.width = 30+"px";
	// 				}
	// 			}
	// 			this.SelectedOptions();
	// 			this.disableOnoptionsOperation();
	// 			panel.css('width', panelWidth);
	// 			var width =panel[0].getBoundingClientRect().width;
	// 			panel.css(margin, width+"px");
	// 			panel[0].removeEventListener("transitionend",this.transitionEnd,true);
	// 			panel.css('transition', 'margin '+seconds+'s ease');
	// 			setTimeout(function() {
	// 				panel.css(margin, '0px');
	// 			}, 50);
	// 			_LyteDrawer_.push(this.$node);
	// 		}
	// 		else if(panel[0].getBoundingClientRect().width){
	// 			if(displayType == "overlapping"){
	// 				var content = this.$node.querySelector('.lyteDrawerContent'),
	// 				childcontent = content.querySelector('.lyteDrawerPanel'),tempWidth = childcontent.getBoundingClientRect().width;
	// 				if(tempWidth){
	// 					childcontent.style.width = childcontent.parentElement.parentElement.ltProp("width");
	// 				}
	// 			}
	// 			var width =panel[0].getBoundingClientRect().width;
	// 			panel.css('transition', 'margin '+seconds+'s ease');
	// 			panel.css(margin, -width+"px");
	// 			panel[0].addEventListener('transitionend',this.transitionEnd,true);
	// 			_LyteDrawer_.pop();
	// 		}
	// 	}
	// }.observes("ltPropShow").on("didConnect")
});
// Lyte.createCustomElement( "lyte-drawer-group", {
// 	static : {
// 		"observedAttributes": {
// 			get : function() {
// 				return [ 'label' ];
// 			}
// 		}
// 	},
// 	"attributeChangedCallback": function( attr, oldValue, newValue, namespace ) {
// 		var node, value;

// 		if ( attr == 'label' ) {
//             node = this.querySelector('lyte-drawer-label');
//             value = this.getAttribute('label');
//             if ( node ) {
//                 node.textContent = value;
//             } 
//             else {
//                 node = document.createElement('lyte-drawer-label');
//                 node.textContent = value;
//                 this.insertBefore( node, this.children[ 0 ] );
//             }
//         }
// 	}
// } );
// Lyte.createCustomElement( "lyte-drawer-item", {
// 	static : {
// 		"observedAttributes" : {
// 			get : function() {
// 				return [ 'selected' ];
// 			}
// 		}
// 	},
// 	"attributeChangedCallback": function( attr, oldValue, newValue, namespace ) {
// 		// var node, value;

// 		// if ( attr == 'label' ) {
//         //     node = this.querySelector('lyte-drawer-label');
//         //     value = this.getAttribute('label');
//         //     if ( node ) {
//         //         node.textContent = value;
//         //     } 
//         //     else {
//         //         node = document.createElement('lyte-drop-label');
//         //         node.textContent = value;
//         //         this.insertBefore( node, this.children[ 0 ] );
//         //     }
//         // }
// 	}
// } );
if (document.readyState === "complete" || document.readyState === "interactive"){
    addCloseEvent();
}
else{
    document.addEventListener("DOMContentLoaded", function(event){
        addCloseEvent(event);
    });
}
function  addCloseEvent(event){

	document.addEventListener('click',function(event){
		var ele = event.target;
		while( ele.tagName != "LYTE-DRAWER-BODY" && ele.tagName !="LYTE-DRAWER-FREEZE" && ele.tagName != "LYTE-MODAL-FREEZE" && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML'){
            ele = ele.parentElement;
            if(!ele){
                return
            }
        }
		if(ele.tagName == 'HTML' || ele.tagName == "LYTE-MODAL-FREEZE" || ele.tagName == "LYTE-DRAWER-FREEZE"){
			// for(var i = _LyteDrawer_.length -1 ; i>=0; i--){
			var last = _LyteDrawer_.length-1;
			if(last > -1){
				if(_LyteDrawer_[last].tagName == "LYTE-DRAWER" && _LyteDrawer_[last].ltProp('show') && _LyteDrawer_[last].ltProp("CloseOnOutsideClick")){
					setTimeout(function(){
						if(_LyteDrawer_[last]){
							_LyteDrawer_[last].ltProp('show',false);
						}
					},0);
				}
			}
			// }
		}
	},true);
	document.addEventListener('keydown',function(event){
			event = event || window.event;
            var isEscape = false;
            if ("key" in event) {
                isEscape = (event.key == "Escape" || event.key == "Esc");
            } else {
                isEscape = (event.keyCode == 27);
            }
            if (isEscape) {
				var last = _LyteDrawer_.length-1;
				if(last > -1){
                // for(var i = _LyteDrawer_.length -1 ; i>=0; i--){
					if(_LyteDrawer_[last].tagName == "LYTE-DRAWER" && _LyteDrawer_[last].ltProp('show') && _LyteDrawer_[last].ltProp("CloseOnOutsideClick")){
						setTimeout(function(){
							if(_LyteDrawer_[last]){
								_LyteDrawer_[last].ltProp('show',false);
							}
						},0);
					}
				}
            }
	},true);
}