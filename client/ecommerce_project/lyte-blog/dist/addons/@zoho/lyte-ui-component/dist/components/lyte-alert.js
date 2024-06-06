/**
 * Renders an alert
 * @component lyte-alert
 * @version 1.0.0
 * @dependencies lyte-button,lyte-wormhole
 */ 

Lyte.Component.register("lyte-alert",{
_template:"<template tag-name=\"lyte-alert\"> <template is=\"if\" value=\"{{ltPropShowCopy}}\"> <template case=\"true\"><lyte-wormhole on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"alertWrapper {{ltPropWrapperClass}}\"> <div class=\"{{lyteUiConcatAlertClass(ltPropContentAlign,'alertPopup')}}\"> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"> <template case=\"true\"><span class=\"lyte-svg alertClose\" onclick=\"{{action('closeAlert')}}\" tabindex=\"0\"></span></template> </template> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"alert\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropHeading,'')}}\"> <template case=\"false\"><div class=\"alertHeader\"> <span class=\"dBlock\">{{ltPropHeading}}</span> </div></template> </template> <div class=\"alertContent\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropType,'')}}\"> <template case=\"false\"><div class=\"alertContentMiddle\"> <span class=\"{{lyteUiConcatTypeClass(ltPropType,'AlertIcon','lyteStatusIcon')}}\"></span> </div></template> </template> <div class=\"alertContentMiddle\"> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropPrimaryMessage,'')}}\"> <template case=\"false\"><div> <span class=\"alertPrimaryMsg\">{{ltPropPrimaryMessage}}</span> </div></template> </template> <template is=\"if\" value=\"{{lyteUiIfEquals(ltPropSecondaryMessage,'')}}\"> <template case=\"false\"><div> <span class=\"alertSecondaryMsg\">{{ltPropSecondaryMessage}}</span> </div></template> </template> </div> <div class=\"clearFloat\"></div> </div> </template></template> <template is=\"if\" value=\"{{nonYieldFooter}}\"><template case=\"true\"> <template is=\"if\" value=\"{{lyteUiIsEmptyArray(ltPropButtons)}}\"> <template case=\"false\"><div class=\"{{lyteUiConcat('alertFooter ',ltPropButtonPosition)}}\"> <template is=\"for\" items=\"{{ltPropButtons}}\"> <template is=\"if\" value=\"{{lyteUiIfEquals(item.type,'accept')}}\"> <template case=\"true\"><lyte-button class=\"lyteAlertBtn\" onclick=\"{{action('accept',item.text)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{item.text}}</template> </lyte-button></template> </template> <template is=\"if\" value=\"{{lyteUiIfEquals(item.type,'reject')}}\"> <template case=\"true\"><lyte-button class=\"lyteAlertBtn\" onclick=\"{{action('reject',item.text)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{item.text}}</template> </lyte-button></template> </template> </template> </div></template> </template> </template></template> </div> <div class=\"{{lyteUiAddShowClass(ltPropShowCopy,'','alertFreezeLayer')}}\"></div> </div> </template> </lyte-wormhole></template> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[0,1]}]}},"default":{}},{"type":"attr","position":[3,3,1]},{"type":"if","position":[3,3,1],"cases":{"false":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}},{"type":"attr","position":[3,3,3]},{"type":"if","position":[3,3,3],"cases":{"false":{"dynamicNodes":[{"type":"text","position":[0,1,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"attr","position":[0,1]},{"type":"for","position":[0,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"registerYield","position":[0,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]}]},{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["ltPropType","ltPropShow","ltPropWrapperClass","ltPropAllowMultiple","ltPropHeading","ltPropPrimaryMessage","ltPropSecondaryMessage","ltPropTop","ltPropButtons","ltPropButtonPosition","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropDimmer","ltPropYield","ltPropAnimation","ltPropContentAlign","ltPropAria","ltPropAriaAttributes","ltPropPreventFocus","nonYieldFooter","triggerShow"],
    data: function(){
        return {
            /**
             * @componentProperty {success|error|warning|info|confirm} ltPropType
             * @version 1.0.0
             */
            "ltPropType":Lyte.attr("string",{"default": ""}),

            /**
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             * 
             */
            "ltPropShow":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {string} ltPropWrapperClass
             * @version 1.0.0
             */
            "ltPropWrapperClass":Lyte.attr("string",{"default": ""}),

            /**
             * @componentProperty {boolean} ltPropAllowMultiple
             * @version 1.0.0
             * @default false
             * 
             */
            "ltPropAllowMultiple":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {string} ltPropHeading
             * @version 1.0.0
             */
            "ltPropHeading":Lyte.attr("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropPrimaryMessage
             * @version 1.0.0
             */
            "ltPropPrimaryMessage":Lyte.attr("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropSecondaryMessage
             * @version 1.0.0
             */
            "ltPropSecondaryMessage":Lyte.attr("string",{"default": ""}),

            /**
             * @componentProperty {string} ltPropTop
             * @version 1.0.0
             * @suffix px,%,em
             * @default 40px
             */
            "ltPropTop":Lyte.attr("string",{"default":"40px"}),

            /**
             * @componentProperty {array} ltPropButtons
             * @version 1.0.0
             * @default []
             */
            "ltPropButtons":Lyte.attr("array",{"default": []}),

            /**
             * @componentProperty {left|center|right} ltPropButtonPosition
             * @version 1.0.0
             * @default right
             */
            "ltPropButtonPosition":Lyte.attr("string",{"default": "right"}),

            /**
             * @componentProperty {boolean} ltPropShowCloseButton
             * @version 1.0.0
             * @default true
             * 
             */
            "ltPropShowCloseButton":Lyte.attr("boolean",{"default": true}),

            /**
             * @componentProperty {boolean} ltPropCloseOnEscape
             * @version 1.0.0
             * @default true
             * 
             */
            "ltPropCloseOnEscape":Lyte.attr("boolean",{"default": true}),
            /**
             * @typedef {object} dimmer
             * @property {colorstring} color=black
             * @property {number} opacity=0.4
             * @minValue 0
             * @maxValue 1
             * @step 0.1
             */
            /**
             * @componentProperty {dimmer} ltPropDimmer
             * @version 1.0.0
             */
            "ltPropDimmer":Lyte.attr("object",{"default":{"color":"black","opacity":"0.4"}}),

            /**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             * 
             */
            "ltPropYield":Lyte.attr("boolean",{"default":false}),

            /**
             * @componentProperty {slideDown|zoomIn} ltPropAnimation=slideDown
             * @version 2.0.0
             */
            "ltPropAnimation" : Lyte.attr("string",{"default":"slideDown"}), //Other value zoomIn

            /**
             * @componentProperty {left|center} ltPropContentAlign=left
             * @version 2.0.0
             */
            "ltPropContentAlign" : Lyte.attr("string",{"default" : "left"}), //other value center

            /**
             * @componentProperty {boolean} ltPropAria
             * @version 3.1.0
             * @default false
             * 
             */
            "ltPropAria" : Lyte.attr( 'boolean', { default : false } ),

            /**
             * @componentProperty {object} ltPropAriaAttributes
             * @version 3.1.0
             */
            "ltPropAriaAttributes" : Lyte.attr( 'object', { default : {} } ),

            /**
             * @componentProperty {boolean} ltPropPreventFocus
             * @version 3.3.0
             * @default false
             * 
             */
            "ltPropPreventFocus" : Lyte.attr('boolean', { default : false } ),
            "nonYieldFooter" : Lyte.attr("boolean",{"default":true}),
            "triggerShow" : Lyte.attr("number",{"default":0})
        }
    },
    didConnect : function() {
        if(this.$node.ltProp("show")){
            this.setData('triggerShow',this.getData('triggerShow')+1);
        }
    },

    /**
     * The method is going to add the aria properties to the alert component
     *
     */
    addAriaValues : function() {
        if(this.getData('ltPropAria')){
            var ariaProp = this.getData('ltPropAriaAttributes') || {};
            if('aria-labelledby' in ariaProp){
                var header = this.getAlertWidget('header');
                if(header){
                    // header.setAttribute('id',Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'aria-labelledby'));
                    header.classList.add(Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'aria-labelledby'));
                }
            }
            if('aria-describedby' in ariaProp){
                var content = this.getAlertWidget('content');
                if(content){
                    // content.setAttribute('id',Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'aria-describedby'));
                    content.classList.add(Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'aria-describedby'));
                }
            }
            _lyteUiUtils.setAttribute( this.getAlertWidget(), ariaProp, {} );
            var closeIcon = this.getAlertWidget('close');
            if(closeIcon){
                closeIcon.setAttribute('aria-label', Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'close-label') || 'Close icon at top right position');
            }
        }
    },

    /**
     * The method is going to return the element from the alert based on the prop value
     * @param {property} prop - The type of element to be returned
     *
     */
    getAlertWidget : function(prop){
        if(prop === "header"){
            return this.getData('ltPropYield') ? this.childComp.querySelector('lyte-alert-header') : this.childComp.querySelector('.alertHeader');
        }
        else if(prop === "content"){
            return this.getData('ltPropYield') ? this.childComp.querySelector('lyte-alert-content') : this.childComp.querySelector('.alertContentMiddle');
        }
        else if(prop === "close"){
            return this.childComp.querySelector('.alertClose');
        }
        else{
            return this.childComp.querySelector('.alertPopup');
        }
    },
    showToggled : function() {
        if(this.$node.ltProp("show")){
            // this.printId();
            if(this.closeTId){
                clearTimeout(this.closeTId);
                delete this.closeTId;
            }
            if(this.sId){
                clearTimeout(this.sId);
                delete this.sId;
                this.setData('ltPropShowCopy',false);
                delete this.sId;
                delete this.actualModalDiv;
                delete this.childComp;
                // LytePopup.bodywrapperCount -= 1;
                // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
                //     document.body.classList.remove('bodyWrapper');
                // }
            }
            // if(this.getData('nonYieldFooter')){
            //     if(this.getData('ltPropButtons').length == 0){
            //         if(this.getData('ltPropType') == "confirm"){
            //             this.setData('ltPropButtons',[{"type":"accept","text":"Ok"},{"type":"reject","text":"Cancel"}]);
            //         }
            //         else{
            //             this.setData('ltPropButtons',[{"type":"accept","text":"Ok"}]);
            //         }
            //     }
            // }
            var self = this;
            this.openTId = setTimeout(function(){
                delete self.openTId;
                document.body.classList.add('bodyWrapper');
                // LytePopup.bodywrapperCount += 1;
                self.showAlert();
            },0);
        }
        else{
            if(this.openTId){
                clearTimeout(this.openTId);
                delete this.openTId;
            }
            if(this.showTId){
                clearTimeout(this.showTId);
                delete this.showTId;
            }
            var self = this;
            this.closeTId = setTimeout(function(){
                delete self.closeTId;
                self.closeAlert();
            },0);
            
        }
    }.observes('ltPropShow','triggerShow'),
    printId : function(){
        console.log("this.openTId ---> "+this.openTId);
        console.log("this.showTId ---> "+this.showTId);
        console.log("this.closeTId ---> "+this.closeTId);
        console.log("this.sId ---> "+this.sId);
    },
    closeAlertFn : function(){

        /**
        * @method onClose
        * @version 1.0.0
        */
        if(this.getMethods("onClose")){
            this.executeMethod("onClose",this);  
        }
    },

    /**
     * The method is going to add the left and top values to the alert
     * Add the configurations for the button which are provided using ltPropButtons
     * Makes the alert visible
     *
     */
    showAlert : function(){
        var self = this;
        this.showTId = setTimeout(function(){
            delete self.showTId;
            if(self.actualModalDiv){
                LytePopup.bindTransitionEnd(self.actualModalDiv);
                if(self.getData('ltPropTop') == "center"){
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    self.actualModalDiv.style.top = (h - self.actualModalDiv.getBoundingClientRect().height)/2 + "px";
                }
                else{
                    self.actualModalDiv.style.top = self.getData('ltPropTop');
                }
                if(self.getData("ltPropAnimation") == "zoomIn"){
                    self.actualModalDiv.classList.add('alertOpened');
                }
                self.$node.classList.add('lyteAlertOpened');
                /**
                * @method onShow
                * @version 2.2.0
                */
                if(self.getMethods('onShow')){
                    self.executeMethod('onShow',self);
                }
            }
            else{
                if(self.getData('ltPropShow')){
                    self.setData('ltPropShow',false);
                }
            }
        },100);
        this.setData('ltPropShowCopy',true);
        this.addAriaValues();
        if(this.getData("ltPropAnimation") == "slideDown"){
            this.actualModalDiv.classList.add('lyteAlertSlideDown');
        }
        else if(this.getData("ltPropAnimation") == "zoomIn"){
            this.actualModalDiv.classList.add('lyteAlertZoomIn');
        }
        if(this.getData('ltPropButtons') && this.getData('nonYieldFooter')){
            var buttons = this.getData('ltPropButtons');
            var buttonComp;
            for(var i=0; i<buttons.length; i++){
                buttonComp = this.actualModalDiv.querySelectorAll(".lyteAlertBtn")[i];
                var keys = Object.keys(buttons[i]);
                for(var j = 0; j<keys.length; j++){
                    buttonComp.ltProp(keys[j], buttons[i][keys[j]]);
                };
            }
            buttonComp = null;
        }
        LytePopup.addPopup(this);
        var freezeStyle = this.childComp.querySelector(".alertFreezeLayer").style;
        freezeStyle.background = this.getData('ltPropDimmer').color;
        if(!this.addedFreezeDetails){
            freezeStyle.opacity = this.getData('ltPropDimmer').opacity;
        }
    },

    /**
     * The method is going to do the calculations and close the alert
     *
     */
    closeAlert : function(){
        if(this.childComp && this.actualModalDiv){
            if(this.addedFreezeDetails){
                LytePopup.hideOrShowFreeze("close",this);
                delete this.addedFreezeDetails;
            }
            if(this.getData('ltPropAnimation') == "slideDown"){
                this.actualModalDiv.style.top = "-"+(this.actualModalDiv.getBoundingClientRect().height+this.actualModalDiv.getBoundingClientRect().top+40)+"px";
            }
            var animDur = parseFloat(document.defaultView.getComputedStyle(this.actualModalDiv).getPropertyValue("transition-duration")) * 1000;
            if(this.getData('ltPropAnimation') == "zoomIn"){
                this.actualModalDiv.classList.remove('alertOpened');
            }
            var self = this;
            this.sId = setTimeout(function(){
                self.setData('ltPropShowCopy',false);
                delete self.sId;
                delete self.actualModalDiv;
                delete self.childComp;
                // LytePopup.bodywrapperCount -= 1;
                // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
                //     document.body.classList.remove('bodyWrapper');
                // }
                LytePopup.checkAndRemoveWrapper();
            },animDur-100);
            this.closeAlertFn();
            LytePopup.closePopup(this);
            if(this.addedFreezeDetails){
                this.childComp.querySelector(".alertFreezeLayer").style.opacity = 0;
                this.childComp.querySelector(".alertFreezeLayer").style.visibility = "";
            }
            // LytePopup.bindTransitionEnd(this.actualModalDiv);
        }
        else{
            LytePopup.closePopup(this);
        }
        this.$node.classList.remove('lyteAlertOpened');
    },
    didDestroy : function(){
        this.$node.classList.remove('lyteAlertOpened');
        if(this.openTId){
            clearTimeout(this.openTId);
            delete this.openTId;
        }
        if(this.showTId){
            clearTimeout(this.showTId);
            delete this.showTId;
        }
        if(this.closeTId){
            clearTimeout(this.closeTId);
            delete this.closeTId;
        }
        if(this.sId){
            clearTimeout(this.sId);
            delete this.sId;
        }
        if(this.childComp){
            if(this.addedFreezeDetails){
                LytePopup.hideOrShowFreeze("close", this);
                delete this.addedFreezeDetails;
            }
            LytePopup.closePopup(this);
            this.childComp.remove();
            delete this.actualModalDiv;
            delete this.childComp;
            // LytePopup.bodywrapperCount -= 1;
            // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
            //     document.body.classList.remove('bodyWrapper');
            // }
            LytePopup.checkAndRemoveWrapper();
        }
    },
    actions: {
        closeAlert : function(){
            this.$node.ltProp("show",false);            
        },
        accept : function(buttonText){
            var retVal = true;
            /**
            * @method onAccept
            * @version 1.0.0
            */
            if(this.getMethods("onAccept")){
                retVal = this.executeMethod("onAccept",buttonText,this); 
                retVal = retVal == undefined ? true : retVal; 
            }
            retVal && this.$node.ltProp("show",false);            
        },
        reject : function(buttonText){
            var retVal = true;
            /**
            * @method onReject
            * @version 1.0.0
            */
            if(this.getMethods("onReject")){
                retVal = this.executeMethod("onReject",buttonText,this);  
                retVal = retVal == undefined ? true : retVal; 
            }
            retVal && this.$node.ltProp("show",false);
        }
    },
    methods: {
        beforeWormholeAppend : function(arg){
            this.childComp = arg;
            this.actualModalDiv = this.childComp.querySelector(".alertPopup");
            if(this.getData('ltPropYield') && arg.querySelector('lyte-alert-footer')){
                this.setData("nonYieldFooter",false);
            }
            else{
                this.setData("nonYieldFooter",true);
            }
            if(this.getData('nonYieldFooter')){
                if(this.getData('ltPropButtons').length == 0){
                    if(this.getData('ltPropType') == "confirm"){
                        this.setData('ltPropButtons',[{"type":"accept","text":"Ok"},{"type":"reject","text":"Cancel"}]);
                    }
                    else{
                        this.setData('ltPropButtons',[{"type":"accept","text":"Ok"}]);
                    }
                }
            }
        }
    }
});

/**
 * @syntax nonYielded
 * <lyte-alert lt-prop-heading="Delete Profile" lt-prop-primary-message="Confirm Delete" lt-prop-secondary-message="Are you sure want to delete this profile?" >
 * </lyte-alert>
 */

/**
 * @syntax yielded
 * <lyte-alert lt-prop-wrapper-class = "sampleAlert" lt-prop-yield = "true"> 
 *     <template is = "registerYield" yield-name = "alert"> 
 *         <lyte-alert-header> Delete Profile </lyte-alert-header> 
 *         <lyte-alert-content> Are you sure want to delete this profile? </lyte-alert-content> 
 *     </template> 
 * </lyte-alert> 
 */
