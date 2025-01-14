/**
 * Renders a messagebox
 * @component lyte-messagebox
 * @version 1.0.0
 * @dependencies lyte-wormhole
 * @methods onClose
 */

Lyte.Component.register("lyte-messagebox", {
_template:"<template tag-name=\"lyte-messagebox\"> <template is=\"if\" value=\"{{ltPropShow}}\"> <template case=\"true\"><lyte-wormhole style=\"visibility: hidden\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\" on-append=\"{{method(&quot;afterWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"{{lyteUiMsgBoxConcatClass(ltPropClass,ltPropType,'MessageIcon','lyteMessageBox')}}\"> <template is=\"if\" value=\"{{ltPropType}}\"><template case=\"true\"> <span class=\"lyteMessageBoxSymbol\"></span> </template></template> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <span class=\"lyteMessageBoxContent\"> <lyte-yield yield-name=\"messageboxYield\"></lyte-yield> </span> </template><template case=\"false\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropMessage,'')}}\"> <template case=\"false\"><div> <span class=\"lyteMessageBoxContent\">{{ltPropMessage}}</span> </div></template> </template> </template></template> <span class=\"lyteMessageBoxClose\" onclick=\"{{action('closeMessageBox')}}\"></span> </div> </template> </lyte-wormhole></template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropShow","ltPropMessage","ltPropDuration","ltPropOffset","ltPropTransition","ltPropYield","ltPropClass","ltPropCloseManually"],
    init : function() {

    },
    data : function(){
        return {

            /**
             * @componentProperty {success | error | warning | info} ltPropType
             * @version 1.0.0
             * @default success
             */
            "ltPropType":Lyte.attr("string",{"default":"success"}),

            /**
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropShow":Lyte.attr("boolean",{"default":false}),

            /**
             * @componentProperty {string} ltPropMessage
             * @version 1.0.0
             */
            "ltPropMessage":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropDuration
             * @version 1.0.0
             * @default 2000
             */
            "ltPropDuration":Lyte.attr("string",{"default":"2000"}),
            /**
             * @typedef {object} offset
             * @property {string} left="center"
             * @property {string} top="center"
             * @property {string} right
             * @property {string} bottom
             */
            /**
             * @componentProperty {offset} ltPropOffset
             * @version 1.0.0
             */
            "ltPropOffset":Lyte.attr("object",{"default":null}),

            /**
             * @typedef {object} transition
             * @property {slideFromTop | fadeIn} animation="fadeIn"
             * @property {string} duration
             */
            /**
             * @componentProperty {transition} ltPropTransition
             * @version 1.0.0
             * @default { "animation" : "fadeIn", "duration" :"0.2s"}
             */
            "ltPropTransition":Lyte.attr("object",{"default":{"animation" : "fadeIn","duration" : "0.2s"}}),

            /**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropYield":Lyte.attr("boolean",{"default" : false}),

            /**
             * @componentProperty {string} ltPropClass
             * @version 1.0.0
             */
            "ltPropClass":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {boolean} ltPropCloseManually
             * @version 3.0.X
             */
            "ltPropCloseManually":Lyte.attr("boolean",{"default": false})
        }
    },
    setDuration : function(){
        var durationVal = this.$node.ltProp("duration");
        if(durationVal != ""){
            this.setData("ltPropDuration",durationVal);
        }
    }.observes('ltPropDuration'),

    computeOffsetImpl : function(){
        var messageEle = this.actualMessageDiv;
        this.fastdomfn1 = $L.fastdom.measure(function(){
            delete this.fastdomfn1;
            var messageElePosition = messageEle.getBoundingClientRect();
            // var offsetObj = this.$node.ltProp('offset');
            var offsetObj = Object.assign({},this.$node.ltProp('offset'));
            //console.log(offsetObj);

            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            if(this.$node.ltProp('offset')){
                if(offsetObj.left === "center" || offsetObj.right === "center" || offsetObj.left == undefined || offsetObj.left == ""){
                    var offLeft = (w - messageElePosition.width)/2;
                    if(offLeft < 0){
                        offLeft = 20;
                    }
                    offsetObj.left = offLeft + "px";
                }
                if(offsetObj.top === "center" || offsetObj.bottom === "center"){
                    var offTop = (h - messageElePosition.height)/2;
                    if(offTop < 0){
                        offTop = 20;
                    }
                    offsetObj.top = offTop + "px";
                }
                if(offsetObj.right && offsetObj.right !== "center"){
                    if(offsetObj.right.indexOf("%") > -1){
                        offsetObj.left = w-(messageElePosition.width+(w/parseFloat(offsetObj.right)))+"px";
                    }
                    else{
                        offsetObj.left = w-(messageElePosition.width+parseFloat(offsetObj.right))+"px";
                    }
                }
                if(offsetObj.bottom && offsetObj.bottom !== "center"){
                    if(offsetObj.bottom.indexOf("%") > -1){
                        offsetObj.top = h-(messageElePosition.height+(h/parseFloat(offsetObj.bottom)))+"px";
                    }
                    else{
                        offsetObj.top = h-(messageElePosition.height+parseFloat(offsetObj.bottom))+"px";
                    }
                }
                if(!offsetObj.top){
                    offsetObj.top = 20;
                }
                this.fastdomfn2 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn2;
                    messageEle.style.left = parseFloat(offsetObj.left) + "px";
                    if(this.getData('ltPropTransition').animation != "slideFromTop"){
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = parseFloat(offsetObj.top) + "px";
                    }
                    else{
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (parseFloat(offsetObj.top) + messageElePosition.height) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    }
                    this.showMessagebox();
                },this);
            }
            else{
                var offsetLeft="",offsetTop="";
                offsetLeft = (document.body.clientWidth - messageElePosition.width)/2;
                this.fastdomfn3 = $L.fastdom.mutate(function(){
                    delete this.fastdomfn3;
                    messageEle.style.left = parseFloat(offsetLeft)+"px";
                    if(this.getData('ltPropTransition').animation != "slideFromTop"){
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.top = "20px";
                    }
                    else{
                        // messageEle.style.transitionDuration = this.getData('ltPropTransition').duration ? this.getData('ltPropTransition').duration : '0.2s';
                        messageEle.style.top = -1 * messageElePosition.height + "px";
                        this.childComp.style.visibility = "visible";
                        this.actualMessageDiv.style.visibility = "visible";
                        messageEle.style.transform = "translate(0px,"+ (messageElePosition.height + 20) +"px)";
                        // this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                    }
                    this.showMessagebox();
                },this);
            }

        },this);
    },
    closeMessageBoxFn : function(checkWormhole){
        //console.log("Here");
        if(this.timeOutId){
            clearInterval(this.timeOutId);
            this.timeOutId = false;
        }
        if( this.childComp && document.contains( this.childComp ) ){
            this.childComp.remove();
        }
        delete this.actualMessageDiv;
        delete this.childComp;
        if(!checkWormhole && this.getMethods("onClose")){
            this.executeMethod("onClose",this);
        }
    },

    clearFastdom : function(){
        if(this.fastdomfn1){
            $L.fastdom.clear(this.fastdomfn1);
            delete this.fastdomfn1;
        }
        if(this.fastdomfn2){
            $L.fastdom.clear(this.fastdomfn2);
            delete this.fastdomfn2;
        }
        if(this.fastdomfn3){
            $L.fastdom.clear(this.fastdomfn3);
            delete this.fastdomfn3;
        }
    },

	showToggled : function() {
		if(!(this.$node.ltProp("show"))){
            this.closeMessageBoxFn();
        }
    }.observes('ltPropShow').on('didConnect'),

    showMessagebox : function(){
        // start = new Date().getTime();
        var duration = parseInt(this.getData("ltPropDuration"));
        var self = this;
        this.timeOutId = setInterval(function(){
            clearInterval(self.timeOutId);
            //console.log("timeOut");
            // end = new Date().getTime();
            // console.log(end - start);
            if(!self.$node || self.getData('ltPropCloseManually')){
                return;
            }
            if(self.getData('ltPropTransition').animation != "slideFromTop"){
                self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            else{
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            self.timeOutId = false;
        },duration);
    },

    didDestroy : function(){
        this.clearFastdom();
        if(this.timeOutId){
            clearInterval(this.timeOutId);
            if(this.getData('ltPropTransition').animation != "slideFromTop" && this.actualMessageDiv){
        		this.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
        		this.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
	        	this.setData("ltPropShow",false);
        	}
        	else{
        		this.actualMessageDiv.style.transform = "";
	        	this.setData("ltPropShow",false);
        	}
            this.timeOutId = false;
            this.closeMessageBoxFn(true);
        }
    },

    actions : {
        closeMessageBox : function(){
            clearInterval(this.timeOutId);
            this.timeOutId = false;
            var self = this;
            if(self.getData('ltPropTransition').animation != "slideFromTop"){
                self.actualMessageDiv.classList.remove('lyteMessageBoxFadeIn');
                self.actualMessageDiv.classList.add('lyteMessageBoxFadeOut');
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },500);
            }
            else{
                self.actualMessageDiv.style.transform = "";
                setTimeout(function(){
                    if(self.$node){
                        self.setData("ltPropShow",false);
                    }
                },200);
            }
        }
    },

    methods : {
        beforeWormholeAppend : function(arg){
            this.childComp = arg;
            this.actualMessageDiv = this.childComp.querySelector(".lyteMessageBox");
            this.actualMessageDiv.style.position = "fixed";
            // LyteComponent.appendChild(document.body,this.childComp);
        },
        afterWormholeAppend : function(arg){
            if(this.getData('ltPropTransition').animation == "slideFromTop"){
                this.actualMessageDiv.classList.add('lyteMessageBoxSlideFromTop');
                this.computeOffsetImpl();
            }
            else{
                this.computeOffsetImpl();
                this.actualMessageDiv.classList.add('lyteMessageBoxFadeIn');
                // this.childComp.style.visibility = "visible";
            }
        }
    }


});

/**
 * @syntax nonYielded
 * <lyte-messagebox lt-prop-message = "This is a messagebox without yield.">
 * </lyte-messagebox>
 */

 /**
 * @syntax yielded
 * <lyte-messagebox lt-prop-yield = true>
 *     <template is = "registerYield" yield-name = "messageboxYield">
 *         <span> Here is the text. </span>
 *         <a href = "#"> Some link </a>
 *     </template>
 * </lyte-messagebox>
 */
