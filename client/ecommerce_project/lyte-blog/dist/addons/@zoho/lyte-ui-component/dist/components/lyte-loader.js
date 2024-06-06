Lyte.Component.register("lyte-loader", {
_template:"<template tag-name=\"lyte-loader\"> <template is=\"if\" value=\"{{ltPropShowLoader}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropInLine}}\"><template case=\"true\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span class=\"lyteLoaderExit\" onclick=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"if\" value=\"{{expHandlers(ifEquals(ltPropProgressBar.value,false),'!')}}\"><template case=\"true\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\"><template case=\"true\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> </template></template> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze \"></lyte-loader-freeze> </div> </template><template case=\"false\"> <lyte-wormhole lt-prop-query=\"{{ltPropSelector}}\" on-before-append=\"{{method('beforeWormholeAppend')}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"ltLoaderContainer {{ltPropShowClass}}\"> <div class=\"ltLoader\"> <div class=\"ltexitdiv\"> <template is=\"if\" value=\"{{ltPropCloseIcon}}\"><template case=\"true\"> <span class=\"lyteLoaderExit\" onclick=\"{{action(&quot;lyteLoadCloser&quot;,event)}}\"></span> </template></template> </div> <div class=\"ltspindiv\"> <div class=\"ltLoaderSpin\"></div> </div> <template is=\"if\" value=\"{{expHandlers(ifEquals(ltPropProgressBar.value,false),'!')}}\"><template case=\"true\"> <div class=\"ltLoaderProgressBar {{ltPropProgressBar.class}} {{ltPropProgressBar.mode}}\"> <template is=\"if\" value=\"{{ifEquals(ltPropProgressBar.mode,'definite')}}\"><template case=\"true\"> <span class=\"lyteLoaderProgressed\" style=\"width: {{ltPropProgressed}}%\"></span> </template></template> </div> </template></template> <div class=\"lyteLoaderProgressMessage\">{{ltPropMessage}}</div> <div class=\"lyteLoaderTimeoutMessage\">{{ltPropTimeoutMessage}}</div> </div> <lyte-loader-freeze class=\"lyteLoaderFreeze \"></lyte-loader-freeze> </div> </template> </lyte-wormhole> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}}}]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,1,7,0]},{"type":"text","position":[1,1,9,0]},{"type":"componentDynamic","position":[1,3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'width: '","ltPropProgressed","'%'"]}}}}]}},"default":{}}]}},"default":{}},{"type":"text","position":[1,1,7,0]},{"type":"text","position":[1,1,9,0]},{"type":"componentDynamic","position":[1,3]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropSelector","ltPropProgressBar","ltPropShowClass","ltPropOnTimeout","ltPropMessage","ltPropProgressed","ltPropCloseIcon","ltPropTimer","ltPropSortedValue","ltPropTimeout","ltPropInLine","ltPropLoader","ltPropDimmer","ltPropTimeoutMessage","ltPropShowLoader"],
	data : function(){
		return {
			'ltPropShow' : Lyte.attr('boolean',{'default':false}),
			'ltPropSelector' : Lyte.attr('string'),
			'ltPropProgressBar' : Lyte.attr('object',{'default':{}}),
			'ltPropShowClass' : Lyte.attr('string',{'default':''}),
			'ltPropOnTimeout' : Lyte.attr('object',{'default':{}}),
			'ltPropMessage' : Lyte.attr('string'),
			'ltPropProgressed' : Lyte.attr('number',{'default':0}),
			'ltPropCloseIcon' : Lyte.attr('boolean',{'default':true}),
			'ltPropTimer' : Lyte.attr('number'),
			'ltPropSortedValue' : Lyte.attr('array'),
			'ltPropTimeout' : Lyte.attr('number',{'default':5000}),
			'ltPropInLine' : Lyte.attr('boolean',{'default':false}),
			'ltPropLoader' : Lyte.attr('object'),
			'ltPropDimmer' : Lyte.attr('object',{'default':{}}),
			'ltPropTimeoutMessage' : Lyte.attr('string'),
			'ltPropShowLoader' : Lyte.attr('boolean',{'default':false})
		}		
	},
	SetProgressData : function() {
		var progress_data = this.data.ltPropProgressBar;
		var displayMsg = this.data.ltPropProgressBar.displayMsg||{};
		var msg_arr = Object.keys(displayMsg)||[];
		msg_arr = msg_arr.sort();
		progress_data.mode = progress_data.mode || 'indefinite';
		
		if(progress_data.mode === 'indefinite'){
			progress_data.value = -1;
		}else{
			progress_data.value =  progress_data.value || 0;
		}

		progress_data.show =  progress_data.show === false ? false : true;
		progress_data.class = progress_data.class || "";
		
		this.setData('ltPropSortedValue',msg_arr);
		
	}.on('init'),
	CallOnshow : function(){
		if(this.getMethods("onShow")){
            this.executeMethod("onShow",this); 
        }
	},
	CallOntimeout : function(){
		if(this.getMethods("onTimeout")){
            this.executeMethod("onTimeout",this); 
        }
	},
	CallOnberforeshow : function(){

		if(this.getMethods('onBeforeShow',this)){
			var return_val = this.executeMethod('onBeforeShow',this) === false? false : true;
			return return_val;
		}
		return true;
	},
	CallOnhide : function(){
		if(this.getMethods("onHide")){
            this.executeMethod("onHide",this); 
        }
	},
	CallOnberforehide : function(){
		if(this.getMethods('onBeforeHide',this)){
			var return_val = this.executeMethod('onBeforeHide',this) === false? false : true;
			return return_val;
		}
		return true;
	},
	initial_setup : function() {
		
		var show = this.data.ltPropShow;
		if(show){
			this.ShowLoader();
		}else{
			this.HideLoader();
		}
	}.observes('ltPropShow').on('didConnect'),

	ShowLoader : function(){
		
		
		
		if(this.CallOnberforeshow()){
			this.setData('ltPropShowLoader' , true);
			var Load_ref =  this.data.ltPropLoader || this.$node;
			var parent = Load_ref.parentNode;
			Load_ref.classList.add('lyteLoaderElement');
			if( window.getComputedStyle(parent).position !== 'absolute'){
				parent.classList.add('lyteLoaderParent');
			}
			this.CallOnshow();
			this.addListener();
			this.AppendValue();
			this.set_timeout();
			
			var freezeStyle = Load_ref.querySelector("lyteLoaderFreeze").style;
            if(this.getData('ltPropDimmer') && this.getData('ltPropDimmer').color){
                freezeStyle.background = this.getData('ltPropDimmer').color;
            }
            freezeStyle.opacity = this.getData('ltPropDimmer') && this.getData('ltPropDimmer').opacity ? this.getData('ltPropDimmer').opacity : 0.4;
           
        }else{
        	this.data.ltPropShow = false;
        	this.setData('ltPropShowLoader' , false);
			return;
		}

		
	},
	addListener : function(){
		var closeOnEscape = this.data.ltPropOnTimeout.closeOnEscape === true ? true : false;
		if(closeOnEscape){
			document.addEventListener('keyup',this.close_loader.bind(this));
		}
	},
	HideLoader : function(){
		var Load_ref = this.data.ltPropLoader || this.$node;
		Load_ref.classList.remove('lyteLoaderElement')

		window.clearTimeout(this.data.ltPropTimer);
		this.data.ltPropTimer = undefined;
		document.removeEventListener("keyup", this.close_loader );
		if(this.CallOnberforehide()){
			this.CallOnhide();
			this.setData('ltPropShowLoader' , false);
		}else{
        	this.data.ltPropShow = true;
        	this.setData('ltPropShowLoader' , true);
			return;
		}
		
	},
	set_timeout : function(){
		var that = this;
		if(this.data.ltPropTimeout >= 0){
			this.$node.ltProp('timeoutMessage',' ');
			var delayTime = Number(this.data.ltPropTimeout);
			var timeout = setTimeout(function(){that.timeout()},delayTime);
			this.setData('ltPropTimer',timeout);
		}
	},
	DisplayMessage : function(){
		if(this.data.ltPropShow){
			this.AppendValue();
		}
		
	}.observes('ltPropProgressBar.value'),

	timeout : function(){
		var Load_ref = this.data.ltPropLoader || this.$node;
		
		var errMsg = this.data.ltPropOnTimeout.errorMsg || 'some unkown error has occured';
		this.setData('ltPropTimeoutMessage', errMsg);
		this.CallOntimeout();
	},
	AppendValue : function(){
		if( this.data.ltPropShow ){
			if(this.data.ltPropProgressBar.mode === 'definite' ){
				var value = this.data.ltPropProgressBar.value;
				var displayMsg = this.data.ltPropProgressBar.displayMsg;
				var msg_arr =  this.data.ltPropSortedValue;
				
				if( msg_arr.length ){
					var val =  msg_arr[0];
					var com_index ,index;
					for(index =0 ; index < msg_arr.length ; index++){
						if( value < msg_arr[index]){
							break;
						}
					}
					com_index = index-1;
					val = msg_arr[index-1] || 0;
					val = parseInt(val);
					this.setData('ltPropMessage',displayMsg[val]);
					this.setData('ltPropProgressed',val);
				}else{
					var msg = this.data.ltPropProgressBar.displayMsg||{};
					this.setData('ltPropProgressed',value);
					this.setData('ltPropMessage',msg[0]);
				}
			}else{
				var msg = this.data.ltPropProgressBar.displayMsg||{};
				this.setData('ltPropProgressed',-1);
				this.setData('ltPropMessage',msg[-1]);
			}
		}
	},

	/*Show_loader : function(){
		
		var show  =  this.data.ltPropShow;
		if(show){
			this.onShow();
		}else{
			this.onHide();
		}
		
	},
	onBeforeLoader : function(){
		this.Show_loader();
	}.observes('ltPropShow').on('didConnect'),
	Loader_timeout : function(){
		this.set_timeout();
	},
	set_timeout(){
		var Load_ref = this.data.ltPropLoader || this.$node;
		
		var delayTime = Number(this.data.ltPropOnTimeout.delayTime);
		delayTime = isNaN(delayTime) ? 5000 : delayTime;

		var that = this;
		var timeout = setTimeout(function(){that.onTimeout()},delayTime);
		this.setData('ltProptimeout',timeout);
	},
	onHide : function( ){
		var Load_ref = this.data.ltPropLoader || this.$node;
		
		window.clearTimeout(this.data.ltProptimeout);
		document.removeEventListener("keyup", this.close_loader );
		this.reset_value();


	},
	
	onShow : function(){
		var Load_ref =  this.data.ltPropLoader || this.$node;
		var parent = Load_ref.parentNode;
		if(parent.nodeName !== 'BODY' && window.getComputedStyle(parent).position !== 'absolute'){
			parent.classList.add('lyteLoaderParent');
		}
		
		var closeOnEscape = this.data.ltPropOnTimeout.closeOnEscape === true ? true : false;
		if(closeOnEscape){
			document.addEventListener('keyup',this.close_loader.bind(this));
		}
		this.set_timeout();
	},
	reset_value : function(){
		this.setData('ltPropMessage','');

		if(this.data.ltPropProgressBar.mode === 'definite'){
			this.setData('ltPropProgressBar.value',0);	
		}else{
			this.setData('ltPropProgressBar.value',-1);
		}
		
	},*/
	close_loader : function(event){
		if(event.code === 'Escape' ){
			this.$node.setData('ltPropShow',false);
		}
	},
	didDestroy : function(){
		document.removeEventListener("keyup", this.close_loader );
		if(this.data.ltPropTimer){
			window.clearTimeout(this.data.ltPropTimer);
			this.data.ltPropTimer = undefined;
		}
	},
	actions : {
		lyteLoadCloser : function(event){
			this.$node.setData('ltPropShow',false);
		}
	},
	methods : {
		beforeWormholeAppend : function(){
			this.setData('ltPropLoader',this.$node.children[0]);
		}
	}
});

