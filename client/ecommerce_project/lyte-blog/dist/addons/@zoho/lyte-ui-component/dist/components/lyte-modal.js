/**
 * Renders a modal
 * @component lyte-modal
 * @version 1.0.0
 * @dependencies lyte-wormhole
 * @methods onBeforeShow,onShow,onBeforeClose,onClose,onResize
 * @utility alignModal,calculateOffset,trapFocus, reflectTransitionChange
 */

Lyte.Component.register("lyte-modal",{
_template:"<template tag-name=\"lyte-modal\"> <template is=\"if\" value=\"{{expHandlers(ltPropBindToBody,'&amp;&amp;',expHandlers(ltPropReRenderModal,'!'))}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" style=\"{{if(ltPropShowCopy,'visibility:visible','visibility:hidden')}}\" on-before-append=\"{{method(&quot;beforeWormholeAppend&quot;)}}\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"modalWrapper {{ltPropWrapperClass}}\"> <div class=\"lyteModal\"> <template is=\"if\" value=\"{{ltPropShowCloseButton}}\"> <template case=\"true\"><span class=\"lyteModalClose\" onclick=\"{{action('close')}}\" tabindex=\"0\"></span></template> </template> <lyte-yield yield-name=\"modal\"></lyte-yield> </div> <template is=\"if\" value=\"{{ltPropFreeze}}\"> <template case=\"true\"><lyte-modal-freeze></lyte-modal-freeze></template> </template> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"if","args":["ltPropShowCopy","'visibility:visible'","'visibility:hidden'"]}}}},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"insertYield","position":[1,1,3]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropFreeze","ltPropShowCloseButton","ltPropCloseOnEscape","ltPropTransition","ltPropOffset","ltPropDimmer","ltPropDraggable","ltPropAllowMultiple","ltPropScrollable","ltPropMaxHeight","ltPropMaxWidth","ltPropWidth","ltPropHeight","ltPropWrapperClass","ltPropBindToBody","ltPropShowCopy","ltPropReRenderModal","ltPropOverlayClose","ltPropAria","ltPropAriaAttributes","ltPropPreventFocus","ltPropSetContentHeight","ltPropCloseDuration","ltPropOverlapModal","ltPropIgnoreInlineDirection","first","resizeCalled","initializedPosition","prevHeight","returnedFalse","prevModalHeight","prevModalWidth","calculateHW","checkAria"],
    data: function(){
        return {
            //config from callee

            /**
             * @componentProperty {boolean} ltPropShow
             * @version 1.0.0
             * @default false
             */
            "ltPropShow":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {boolean} ltPropFreeze
             * @version 1.0.0
             * @default true
             */
            "ltPropFreeze":Lyte.attr("boolean",{"default": true}),

            /**
             * @componentProperty {boolean} ltPropShowCloseButton
             * @version 1.0.0
             * @default true
             */
            "ltPropShowCloseButton":Lyte.attr("boolean",{"default": true}),

            /**
             * @componentProperty {boolean} ltPropCloseOnEscape
             * @version 1.0.0
             * @default true
             */
            "ltPropCloseOnEscape":Lyte.attr("boolean",{"default": true}),
            /**
             * @typedef {object} transition
             * @property {slideFromTop|slideFromBottom|slideFromLeft|slideFromRight|fadeIn|zoom} animation
             * @property {string} duration
             */
            /**
             * @componentProperty {transition} ltPropTransition
             * @version 1.0.0
             * @default { "animation" :"slideFromTop" , "duration":"0.5s"}
             */
            "ltPropTransition":Lyte.attr("object",{"default":{"animation":"slideFromTop","duration":"0.5"}}),
            /**
             * @typedef {object} offset
             * @property {string} top
             * @property {string} left
             * @property {string} bottom
             * @property {string} right
             */
            /**
             * @componentProperty {offset} ltPropOffset
             * @version 1.0.0
             * @default { "top" :"center", "left" :"center"}
             */
            "ltPropOffset":Lyte.attr("object",{"default":{"top":"center","left":"center"}}),
            /**
             * @typedef {object} dimmer
             * @property {colorstring} color
             * @property {string} opacity
             */
            /**
             * @componentProperty {dimmer} ltPropDimmer
             * @version 1.0.0
             */
            "ltPropDimmer":Lyte.attr("object"), //,{"default":{"color":"black","opacity":"0.4"}}

            /**
             * @componentProperty {boolean} ltPropDraggable
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropDraggable":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {boolean} ltPropAllowMultiple
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropAllowMultiple":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {boolean} ltPropScrollable
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropScrollable":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {string} ltPropMaxHeight
             * @version 1.0.0
             * @suffix px,pt,cm,mm,vh,vm,em
             */
            "ltPropMaxHeight":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropMaxWidth
             * @version 1.0.0
             * @suffix px,pt,cm,mm,vh,vm,em
             */
            "ltPropMaxWidth":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropWidth
             * @version 1.0.0
             * @suffix px,pt,cm,mm,vh,vm,em
             */
            "ltPropWidth":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {string} ltPropHeight
             * @version 1.0.0
             * @default auto
             * @suffix px,pt,cm,mm,vh,vm,em
             */
            "ltPropHeight":Lyte.attr("string",{"default":"auto"}),

            /**
             * @componentProperty {string} ltPropWrapperClass
             * @version 1.0.0
             */
            "ltPropWrapperClass":Lyte.attr("string",{"default":""}),

            /**
             * @componentProperty {boolean} ltPropBindToBody
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropBindToBody":Lyte.attr("boolean",{"default":false}),

            /**
             * @experimental ltPropShowCopy
             */
            "ltPropShowCopy":Lyte.attr("boolean",{"default": false}),

            /**
             * @componentProperty {boolean} ltPropReRenderModal
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropReRenderModal":Lyte.attr("boolean",{"default":false}),

            /**
             * @componentProperty {boolean} ltPropOverlayClose
             * @version 1.0.0
             * @default false
             *
             */
            "ltPropOverlayClose":Lyte.attr("boolean",{"default":false}),

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

            /**
             * @componentProperty {boolean} ltPropSetContentHeight
             * @version 3.9.0
             * @default false
             *
             */
            "ltPropSetContentHeight" : Lyte.attr('boolean', { default : false } ),

            /**
             * @componentProperty {number} ltPropCloseDuration
             * @version 3.10.0
             * @default undefined
             */
            "ltPropCloseDuration" : Lyte.attr("number",{"default" : undefined}),

            /**
             * @componentProperty {boolean} ltPropOverlapModal
             * @version 3.19.0
             * @default true
             *
             */
            "ltPropOverlapModal" : Lyte.attr('boolean', { default : true } ),

            /**
             * @componentProperty {boolean} ltPropIgnoreInlineDirection
             * @version 3.19.0
             * @default true
             *
             */
            "ltPropIgnoreInlineDirection" : Lyte.attr('boolean', { default : false } ),

            //local properties
            "first":Lyte.attr("boolean",{"default":true}),
            'resizeCalled' : Lyte.attr("boolean",{"default":false}),
            'initializedPosition' : Lyte.attr("boolean",{"default":false}),
            "prevHeight" : Lyte.attr("number"),
            "returnedFalse" : Lyte.attr("boolean",{"default" : false}),
            "prevModalHeight" : Lyte.attr("number"),
            "prevModalWidth" : Lyte.attr("number"),
            "calculateHW" : Lyte.attr("boolean", {"default":false}),
            "checkAria" : Lyte.attr("number", {"default":0})
        }
    },
    addDragHandler : function(){
        var dragHeader = this.actualModalDiv.querySelector('lyte-modal-header');
        if(dragHeader){
            dragHeader.parentEle = this;
            if(this.$node.ltProp("draggable")){
                dragHeader.addEventListener('mousedown',this.handleMove,true);
                dragHeader.addEventListener('touchstart',this.handleMove,true);
                dragHeader.classList.add('lyteModalHeaderDraggable');
            }
            else{
                dragHeader.removeEventListener('mousedown',this.handleMove,true);
                dragHeader.removeEventListener('touchstart',this.handleMove,true);
                dragHeader.classList.remove('lyteModalHeaderDraggable');
            }
        }
        else{
            console.warn("This modal is not draggable because it has no header");
            this.$node.ltProp("draggable",false);
        }
    },
    handleMove : function(e){
        var drag = e.currentTarget.parentEle.actualModalDiv, mouseOffset;
        LytePopup.node=drag;
        if(e.type == "mousedown"){
            mouseOffset = { x : e.clientX, y : e.clientY};
        }
        if(e.type == "touchstart"){
            mouseOffset = { x : e.touches[0].clientX, y : e.touches[0].clientY};
        }
        if(e.currentTarget.parentEle.getData('ltPropTransition').animation == "fadeIn"){
            LytePopup.xPos=mouseOffset.x-this.getBoundingClientRect().left;
            LytePopup.yPos=mouseOffset.y-this.getBoundingClientRect().top;
        }
        else{
            LytePopup.xPos=mouseOffset.x;
            LytePopup.yPos=mouseOffset.y;
        }
        var elePos = drag.getBoundingClientRect();
        drag.style.transitionDuration = "0s";
        if(e.type = "mousedown"){
            document.body.addEventListener('mousemove',e.currentTarget.parentEle.handleDrag,true);
            document.body.addEventListener('mouseup',e.currentTarget.parentEle.stopDrag,true);
        }
        if(e.type = "touchstart"){
            document.body.addEventListener('touchmove',e.currentTarget.parentEle.handleDrag,true);
            document.body.addEventListener('touchend',e.currentTarget.parentEle.stopDrag,true);
        }

    },
    handleDrag : function(e){
        var drag = LytePopup.node;
        if(!LytePopup.node){
            return;
        }
        var mouseOffset;
        if(e.type == "mousemove"){
            mouseOffset = { x : e.clientX, y : e.clientY};
        }
        if(e.type == "touchmove"){
            mouseOffset = { x : e.touches[0].clientX, y : e.touches[0].clientY};
        }
        if(LytePopup.node.closest('lyte-wormhole')._callee.component.getData('ltPropTransition').animation == "fadeIn"){
            drag.style.left=(mouseOffset.x-LytePopup.xPos)+'px';
            drag.style.top=(mouseOffset.y-LytePopup.yPos)+'px';
        }
        else{
            var matrix = LytePopup.node.closest('lyte-wormhole')._callee.component.transform,
                x = matrix.x+(mouseOffset.x-LytePopup.xPos),
                y = matrix.y+(mouseOffset.y-LytePopup.yPos);
            drag.style.transform = "translate("+x+"px, "+y+"px)";
        }
        window.getSelection().removeAllRanges();
    },
    stopDrag : function(e){
        var targetElem = e.target;
        while(targetElem && targetElem !== document){
            if(targetElem.parentEle){
                if(e.type == "mouseup"){
                    this.removeEventListener('mousemove',targetElem.parentEle.handleDrag,true);
                    this.removeEventListener('mouseup',targetElem.parentEle.stopDrag,true);
                }
                if(e.type == "touchend"){
                    this.removeEventListener('touchmove',targetElem.parentEle.handleDrag,true);
                    this.removeEventListener('touchend',targetElem.parentEle.stopDrag,true);
                }
                break;
            }
            targetElem = targetElem.parentElement ? targetElem.parentElement : document;
        }
        if(LytePopup.node){
            var comp = LytePopup.node.closest('lyte-wormhole')._callee.component;
            LytePopup.node.style.transitionDuration = comp.getData('ltPropTransition').duration;
            if(comp.getData('ltPropTransition').animation != "fadeIn"){
                var matrix = new WebKitCSSMatrix(window.getComputedStyle(comp.actualModalDiv).transform);
                comp.transform = {'x' : matrix.m41, 'y' : matrix.m42};
            }
            LytePopup.node = null;
        }
    },
    showToggled : function(){

        var event = event || window.event;
        if(this.getData('returnedFalse')){
            this.setData('returnedFalse',false);
            return;
        }
        if(this.$node.ltProp("reRenderModal")){
            if(this.$node.ltProp("show")){
                this.$node.ltProp({"showCopy":false, "show":false});
                LytePopup.closePopup(this);
                this.setData("first",true);
                this.setData('initializedPosition',false);
            }
            this.$node.ltProp("reRenderModal",false);
        }
        if(this.timeOutId){
            // debugger
            delete this.timeOutId;
            this.closeModal();
            LytePopup.closePopup(this);
        }
        if(this.$node.ltProp("show") && !this.$node.ltProp("showCopy")){
            if(_lyteUiUtils.getRTL()){
              if(!this.getData('ltPropIgnoreInlineDirection')){
                if(this.getData('ltPropTransition').animation == "slideFromLeft"){
                    this.getData('ltPropTransition').animation = "slideFromRight";
                }
                else if(this.getData('ltPropTransition').animation == "slideFromRight"){
                    this.getData('ltPropTransition').animation = "slideFromLeft";
                }
                var offset = this.getData('ltPropOffset'),
                    newOffset = {};
                for(key in offset){
                    if(key == "left" && offset[key] != "center"){
                        newOffset.right = offset[key];
                    }
                    else if(key == "right"){
                        newOffset.left = offset[key];
                    }
                    else{
                        newOffset[key] = offset[key];
                    }
                }
                this.setData('ltPropOffset',newOffset);
              }
            }
            if(LytePopup.components.indexOf(this) != -1){
                LytePopup.closePopup(this);
                this.setData("first",true);
                this.setData('initializedPosition',false);
            }
            this.$node.ltProp("bindToBody",true);
            var self = this;
            this.beforeShowId = setTimeout(function(){
                delete self.beforeShowId;
                self.onBeforeShowHandling();
            },0);

        }
        else{
            this.clearFastdomBatch();
            if(this.$node.ltProp("showCopy")){
                var self = this;
                this.beforeCloseId = setTimeout(function(){
                    delete self.beforeCloseId;
                    self.onBeforeCloseHandling(event);
                },0);
            }
            else{
                if(LytePopup.components.indexOf(this) != -1){
                    LytePopup.closePopup(this);
                    this.setData("first",true);
                    this.setData('initializedPosition',false);
                }
            }
        }
    }.observes("ltPropShow","ltPropReRenderModal").on('didConnect'),
    clearFastdomBatch : function(){
        if(this.fastdomfn1){
            $L.fastdom.clear(this.fastdomfn1);
        }
        if(this.fastdomfn2){
            $L.fastdom.clear(this.fastdomfn2);
        }
        if(this.fastdomfn3){
            $L.fastdom.clear(this.fastdomfn3);
        }
        if(this.fastdomfn4){
            $L.fastdom.clear(this.fastdomfn4);
        }
        if(this.fastdomfn5){
            $L.fastdom.clear(this.fastdomfn5);
        }
        if(this.fastdomfn6){
            $L.fastdom.clear(this.fastdomfn6);
        }
        if(this.fastdomfn7){
            $L.fastdom.clear(this.fastdomfn7);
        }
        if(this.fastdomfn8){
            $L.fastdom.clear(this.fastdomfn8);
        }
        if(this.beforeShowId){
            clearTimeout(this.beforeShowId);
        }
    },
    changeBindToBody : function(){
        if(!this.getData('ltPropBindToBody')){
            if(this.getData('ltPropFreeze') && this.addedFreezeDetails){
                LytePopup.hideOrShowFreeze("close",this,true);
                delete this.addedFreezeDetails;
            }
            LytePopup.closePopup(this);
            if(this.renderSidewise){
                delete this.renderSidewise;
                delete this.renderProps;
            }
            this.actualModalDiv = null;
            this.childComp = null;
            if(this.getData('ltPropShow') ){
                this.setData({'ltPropShowCopy':false,'ltPropShow':false});
            }
            else if(this.getData('ltPropShowCopy')){
                this.setData('ltPropShowCopy', false);
            }
            this.setData("first",true);
            this.setData('initializedPosition',false);
            this.$node.classList.remove('lyteModalOpened');
            // if(this.$node.ltProp('freeze')){
            //     LytePopup.bodywrapperCount -= 1;
            //     if(LytePopup.bodywrapperCount == 0){
            //         document.body.classList.remove('bodyWrapper');
            //     }
            // }
            LytePopup.checkAndRemoveWrapper();
        }
    }.observes("ltPropBindToBody"),
    addAriaValues : function( arg ) {
        if(this.getData('ltPropAria')){
            var ariaProp = this.getData('ltPropAriaAttributes') || {};
            _lyteUiUtils.setAttribute( this.actualModalDiv, ariaProp, arg ? arg.oldValue : {} );
            var closeIcon = this.actualModalDiv.querySelector('.lyteModalClose');
            if(closeIcon){
                closeIcon.setAttribute('aria-label', Lyte.Component.registeredHelpers.lyteUiGetValue(ariaProp,'close-label') || 'Close icon at top right position');
            }
        }
    }.observes('ltPropAriaAttributes','ltPropAriaAttributes.{}','checkAria'),

    /**
     * The method is going to set height and width of the modal
     *
     */
    updateScrollHandling : function(){    //It sets the height and width of the modal
        if(!this.$node.ltProp("freeze")){
            // this.$node.ltProp("scrollable",true);
            this.setData("calculateHW",true);
        }
        var modalElem = this.actualModalDiv;
        var oldHeight, oldWidth, newHeight, newWidth,
        w =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        contentNode = modalElem.querySelector("lyte-modal-content");
        // contentNode = contentNode ? contentNode : modalElem;
        modalElem.style.maxWidth = "";
        modalElem.style.maxHeight = "";
        modalElem.style.height = this.$node.ltProp("height")?this.$node.ltProp("height"):"auto";
        modalElem.style.width = this.$node.ltProp("width")?( (!(this.getData('ltPropOverlapModal')) && this.$node.ltProp("width").indexOf('%') != -1) ? ((parseFloat(this.$node.ltProp("width"))/100) * w) + "px" : this.$node.ltProp("width") ):"auto";
        // console.log(this.$node.ltProp("width"));
        /*------------------------------ MEASURE STARTS --------------------------*/
        this.fastdomfn2 = $L.fastdom.measure(function() {    //Measures the initial height and width
            delete this.fastdomfn2;
            var modalElemOffset = modalElem.getBoundingClientRect();
            /*IF maxwidth or maxheigth given as a percentage then to calculate the actual width or height
                                we need the modalElements parent element's width and height*/
            var modalParentOff = modalElem.parentElement.getBoundingClientRect();
            var cs = window.getComputedStyle(modalElem);
            var borderDimensionY = ((cs.borderTopWidth ? parseFloat(cs.borderTopWidth) : 0) +
                                     (cs.borderBottomWidth ? parseFloat(cs.borderBottomWidth) : 0));
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - (this.getData('ltPropFreeze') ? parseInt(window.getComputedStyle(modalElem.parentElement).top) : 0);
            // console.log(modalElemOffset);
            /*------------------------------ MUTATE STARTS --------------------------*/
            this.fastdomfn3 = $L.fastdom.mutate(function(){    //Checks for the max height and width provided by the user and sets the modal height and width based on that
                delete this.fastdomfn3;
                if(this.$node.ltProp("maxWidth")){
                    // this.$node.ltProp("scrollable",true);
                    // this.setData("calculateHW",true);
                    // oldWidth = modalElemOffset.width /*- borderDimensionX*/;
                    newWidth = this.$node.ltProp("maxWidth").indexOf('%') != -1 ? ((parseFloat(this.$node.ltProp("maxWidth"))/100) * modalParentOff.width) : parseFloat(this.$node.ltProp("maxWidth"));
                    modalElem.style.maxWidth = newWidth + "px";
                    // if(oldWidth < newWidth){
                    //     modalElem.style.width = oldWidth+"px";
                    //     // newWidth = oldWidth;
                    // }
                    modalElem.style.overflowX = "auto";
                }
                else{
                    newWidth = modalElemOffset.width /*- borderDimensionX*/;
                }

                if(this.$node.ltProp("maxHeight")){
                    this.childComp.querySelector(".modalWrapper").classList.add("scrollable");
                    // this.$node.ltProp("scrollable",true);
                    this.setData("calculateHW",true);
                    oldHeight = modalElemOffset.height - borderDimensionY;
                    var newH = this.$node.ltProp("maxHeight").indexOf('%') != -1 ? ((parseFloat(this.$node.ltProp("maxHeight"))/100) * modalParentOff.height) : parseFloat(this.$node.ltProp("maxHeight"));
                    // modalElem.style.height = newH + "px";
                    modalElem.style.maxHeight = newH + "px";
                    newHeight = newH - borderDimensionY;
                }
                else{
                    /*  +1 is added here to the oldHeight as offsetHeights are rounded off values. ie. 5.5 => 6.
                        So, if 5.5 + 5.5 = 11. But offsetHeight will give 6 + 6 by rounding off 5.5 which is != 11.
                        So for safety we add extra 1 px to the total height.
                    */
                    oldHeight = modalElem.offsetHeight - borderDimensionY + 1;
                    //If height is provided in px or em then we dont compare if it is greater than window height as it is fixed
                    if(this.$node.ltProp('height') && this.$node.ltProp('height') != "auto"/* && ((this.$node.ltProp('height')).indexOf('px') != -1 || (this.$node.ltProp('height')).indexOf('em') != -1)*/){
                        newHeight = oldHeight;
                        this.setData("calculateHW",true);
                    }
                    else{
                        newHeight = oldHeight > h ? h-40 : oldHeight;
                    }
                    if(this.$node.ltProp("scrollable")){
                        if(!(this.$node.ltProp('height')) || this.$node.ltProp('height') == "auto"){
                            newHeight = h-40;
                        }
                        this.setData("calculateHW",true);
                    }
                    if(contentNode /*this.actualModalDiv.querySelector("lyte-modal-content")*/ && contentNode.offsetHeight /*this.actualModalDiv.querySelector("lyte-modal-content")*/ > oldHeight - ((this.actualModalDiv.querySelector("lyte-modal-header") ? this.actualModalDiv.querySelector("lyte-modal-header").offsetHeight : 0) + (this.actualModalDiv.querySelector("lyte-modal-footer") ? this.actualModalDiv.querySelector("lyte-modal-footer").offsetHeight : 0))){
                        // this.$node.ltProp("scrollable",true);
                        this.setData("calculateHW",true);
                    }
                }
                if(this.getData("calculateHW") && contentNode){
                    var modalheader = this.actualModalDiv.querySelector("lyte-modal-header"), modalFooter = this.actualModalDiv.querySelector("lyte-modal-footer");
                    var modalHOff = null,modalFOff = null;
                    /*------------------------------ MEASURE STARTS --------------------------*/
                    this.fastdomfn4 = $L.fastdom.measure(function(){   //measures the content haeder, content and footer dimensions
                        delete this.fastdomfn4;
                        if(modalheader){
                            modalHOff = modalheader.offsetHeight;
                        }
                        if(modalFooter){
                            modalFOff = modalFooter.offsetHeight;
                        }
                        var diff = 0;
                        var modalHeight = modalElem.getBoundingClientRect().height;
                        // if(this.getData('resizeCalled')){
                        //     //to get the difference between previous height and current height
                        //     if(this.getData('prevHeight') < modalHeight){
                        //         diff = modalHeight - this.getData('prevHeight');
                        //     }
                        //     this.setData('resizeCalled',false);
                        // }
                        this.setData('prevHeight',modalHeight);
                        /*------------------------------ MUTATE STARTS --------------------------*/
                        this.fastdomfn5 = $L.fastdom.mutate(function(){   //Sets the final height and width of the modal
                            delete this.fastdomfn5;
                            var newH = (newHeight - ((modalHOff ? modalHOff : 0)+ (modalFOff ? modalFOff : 0)));
                            contentNode.style.maxHeight = (newH > 0 ? newH : 50) + diff +"px";
                            contentNode.style.overflowY = "auto";
                            if(this.$node.ltProp('height') != "auto" && this.getData('ltPropSetContentHeight')){
                                contentNode.style.height = newH + "px";
                            }
                            // if(this.getData('first')){
                            //     contentNode.style.height = (oldHeight - ((modalHOff ? modalHOff.height : 0)+ (modalFOff ? modalFOff.height : 0))) +"px";
                            // }
                            // modalElem.style.width = this.$node.ltProp("width")?this.$node.ltProp("width"):"auto";
                            // this.actualModalDiv.style.maxWidth = newWidth > 0 ? (newWidth +"px"):("70%");
                            modalElem = null;
                            contentNode = null;
                            modalheader = null;
                            modalFooter = null;
                            if(!this.getData('initializedPosition')){
                                this.computeOffsetImpl();
                                this.setData('initializedPosition',true);
                            }
                            else if(this.getData('resizeCalled')){
                                this.computeOffsetImplOnResize();
                                this.setData('resizeCalled',false);
                            }
                        },this);
                        /*------------------------------ MUTATE ENDS --------------------------*/
                    },this);
                    /*------------------------------ MEASURE ENDS --------------------------*/
                }
                else{
                    this.childComp.querySelector(".modalWrapper").classList.remove("scrollable");
                    modalElem = null;
                    contentNode = null;
                    if(!this.getData('initializedPosition')){
                        this.computeOffsetImpl();
                        this.setData('initializedPosition',true);
                    }
                    else if(this.getData('resizeCalled')){
                        this.computeOffsetImplOnResize();
                        this.setData('resizeCalled',false);
                    }
                }

                if (!this.$node.ltProp("freeze")) {
                    this.childComp.querySelector(".modalWrapper").classList.add('noFreeze');
                    if(!this.renderSidewise){
                        this.actualModalDiv.style.position = "fixed";
                    }
                }
                // else{
                //     this.childComp.querySelector(".modalWrapper").style.position = "fixed";
                // }
            },this);
            /*------------------------------ MUTATE ENDS --------------------------*/
        },this);
        /*------------------------------ MEASURE ENDS --------------------------*/


    },
    scrollHandling : function(){
        if(!this.getData('ltPropShow')){
            return;
        }
        this.updateScrollHandling();
    }.observes("ltPropWidth","ltPropMaxWidth","ltPropHeight","ltPropMaxHeight"),
    callOnShow: function(){
        // if(this.getData('ltPropFreeze')){
        //     this.childComp.querySelector("lyte-modal-freeze").style.transitionDuration = this.getData('ltPropTransition').duration + "s";
        // }
        this.$node.classList.add('lyteModalOpened');
        if(this.getMethods("onShow")){
            this.executeMethod("onShow",this);
        }
    },
    callOnResize : function(){
        if(this.isResponsibleForSidewiseRender()){
            LytePopup.components[LytePopup.components.length - 1].$node.component.updateScrollHandling();
        }
        if(this.getMethods("onResize")){
            this.executeMethod("onResize",this);
        }
    },

    enableTransform : function(val,pos,duration){
        this.$node.ltProp('showCopy',true);
        var self = this;
        setTimeout(function(){
            if(pos == 'x'){
                self.actualModalDiv.style.transform = "translate("+val+"px,0px)";
                self.transform = {'x' : val, 'y' : 0};
            }
            if(pos == 'y'){
                self.actualModalDiv.style.transform = "translate(0px,"+val+"px)";
                self.transform = {'x' : 0, 'y' : val};
            }
        },(duration != undefined ? duration : undefined))

    },

    /**
     * The method is going to redo the left and top computation when the modal is opened and the window is resized
     *
     */
    computeOffsetImplOnResize : function(){
        /*------------------------------ MEASURE STARTS --------------------------*/
         $L.fastdom.measure(function() {
            var modalEle = this.actualModalDiv,
                modalElePosition = modalEle.getBoundingClientRect(),
                parentStyle = window.getComputedStyle(modalEle.parentElement),
                parentTop = parseInt(parentStyle.top), //Takes the modalWrapper's top value and subtracts it from the modals top to nullify the parent's top
                parentLeft = parseInt(parentStyle.left),
                correctedTop = modalEle.offsetTop,
                w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - (this.getData('ltPropFreeze') ? parentLeft : 0),
                h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - (this.getData('ltPropFreeze') ? parentTop : 0),
                prevWinH = this.getData('prevWinH'),
                prevWinW = this.getData('prevWinW'),
                transform = this.transform /*new WebKitCSSMatrix(window.getComputedStyle(modalEle).transform)*/,
                newTop = null,
                newLeft = null,
                offsetObj = this.getData('ltPropOffset'),
                heightDiff = this.getData('prevModalHeight') - modalElePosition.height,
                widthDiff = this.getData('prevModalWidth') - modalElePosition.width,
                freezeLayer, wrapperDiv;
            this.calculateForSidewiseRender();
            if(this.renderSidewise){
                this.renderProps.windowWidth = w;
                w = this.getData('ltPropTransition').animation == 'slideFromRight' ? this.renderProps.left : (this.renderProps.windowWidth - this.renderProps.right);
                freezeLayer = this.childComp.querySelector('lyte-modal-freeze');
                wrapperDiv = this.actualModalDiv.parentElement;
            }
            if(this.getData('ltPropTransition').animation === "fadeIn" || this.getData('ltPropTransition').animation === "zoom"){
              prevWinH = modalElePosition.height
              prevWinW = modalElePosition.width
                if(w < prevWinW){
                    if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                        newLeft = ((prevWinW - w) / 2);
                    }
                    else if(offsetObj.right){
                        newLeft = modalElePosition.left - (prevWinW - w);
                    }
                    else if(offsetObj.left){
                        newLeft = modalElePosition.left;
                    }
                }
                if(w > prevWinW){
                    if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                        newLeft = ((w - prevWinW) / 2);
                    }
                    else if(offsetObj.right){
                        newLeft = modalElePosition.left + (w - prevWinW);
                    }
                    else if(offsetObj.left){
                        newLeft = modalElePosition.left;
                    }
                }
                if(h < prevWinH){
                    if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                        newTop = (h - modalElePosition.height)/2 /*correctedTop - ((prevWinH - h) / 2)*/;
                    }
                    else if(offsetObj.bottom){
                        newTop = correctedTop - (prevWinH - h);
                    }
                    else if(offsetObj.top){
                        newTop = correctedTop;
                    }
                }
                if(h > prevWinH){
                    if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                        newTop = (h - modalElePosition.height)/2 /*correctedTop + ((h - prevWinH) / 2)*/;
                    }
                    else if(offsetObj.bottom && offsetObj.bottom != "center"){
                        newTop = correctedTop + (h - prevWinH);
                    }
                    else if(offsetObj.top && offsetObj.top != "center"){
                        newTop = correctedTop;
                    }
                }
                $L.fastdom.mutate(function() {
                    if(newTop){
                        modalEle.style.top = newTop + "px";
                    }
                    if(newLeft){
                        modalEle.style.left = newLeft + "px";
                    }
                    this.callOnResize();
                },this);
            }
            else{
                if(w < prevWinW){
                    if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                        newLeft = transform.x - ((prevWinW - w) / 2) + (widthDiff / 2);
                    }
                    else if(offsetObj.right){
                        newLeft = transform.x - (prevWinW - w) + widthDiff;
                    }
                    else if(offsetObj.left){
                        newLeft = transform.x;
                    }
                    this.transform.x = newLeft;
                }
                if(w > prevWinW){
                    if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                        newLeft = transform.x + ((w - prevWinW) / 2) + (widthDiff / 2);
                    }
                    else if(offsetObj.right){
                        newLeft = transform.x + (w - prevWinW) + widthDiff;
                    }
                    else if(offsetObj.left){
                        newLeft = transform.x;
                    }
                    this.transform.x = newLeft;
                }
                if(h < prevWinH){
                    if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                        newTop = transform.y - ((prevWinH - h) / 2) + (heightDiff / 2);
                    }
                    else if(offsetObj.bottom){
                        newTop = transform.y - (modalElePosition.bottom - h + parseInt(offsetObj.bottom)) /*(prevWinH - h)*/;
                    }
                    else if(offsetObj.top){
                        newTop = transform.y;
                    }
                    this.transform.y = newTop;
                }
                if(h > prevWinH){
                    if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                        newTop = transform.y + ((h - prevWinH) / 2) + (heightDiff / 2);
                    }
                    else if(offsetObj.bottom && offsetObj.bottom != "center"){
                        newTop = transform.y + (h - modalElePosition.bottom - parseInt(offsetObj.bottom))/*(h - prevWinH)*/;
                    }
                    else if(offsetObj.top && offsetObj.top != "center"){
                        newTop = transform.y;
                    }
                    // console.log("prev top", this.transform.y);
                    // console.log("new top", newTop);
                    this.transform.y = newTop;
                }
                $L.fastdom.mutate(function() {
                    modalEle.style.transitionDuration = "0s";
                    if(this.getData('ltPropTransition').animation === "slideFromTop" || this.getData('ltPropTransition').animation === "slideFromBottom"){
                        if(w < prevWinW){
                            if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                                modalEle.style.left = modalElePosition.left - ((prevWinW - w) / 2) + (widthDiff/2) + "px";
                            }
                            else if(offsetObj.right){
                                modalEle.style.left = modalElePosition.left - (prevWinW - w) + widthDiff + "px";
                            }
                            else if(offsetObj.left){
                                modalEle.style.left = modalElePosition.left + "px";
                            }
                            // modalEle.style.left = modalElePosition.left - ((prevWinW - w)/2) + "px";
                        }
                        if(w > prevWinW){
                            if((offsetObj.left && offsetObj.left == "center") || (offsetObj.right && offsetObj.right == "center")){
                              modalEle.style.left = modalElePosition.left + ((w - prevWinW) / 2) + (widthDiff/2) + "px";
                            }
                            else if(offsetObj.right){
                                modalEle.style.left = modalElePosition.left + (w - prevWinW) + widthDiff + "px";
                            }
                            else if(offsetObj.left){
                                modalEle.style.left = modalElePosition.left + "px";
                            }
                            // modalEle.style.left = modalElePosition.left + ((w - prevWinW)/2) + "px";
                        }
                        modalEle.style.transform = "translate(0px,"+this.transform.y+"px)";
                    }
                    else if(this.getData('ltPropTransition').animation === "slideFromLeft" || this.getData('ltPropTransition').animation === "slideFromRight"){
                        if(h < prevWinH){
                            if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                                modalEle.style.top = correctedTop - ((prevWinH - h) / 2) + (heightDiff/2) + "px";
                            }
                            else if(offsetObj.bottom){
                                modalEle.style.top = correctedTop - (prevWinH - h) + "px";
                            }
                            else if(offsetObj.top){
                                modalEle.style.top = correctedTop + "px";
                            }
                            // modalEle.style.top = modalElePosition.top - ((prevWinH - h)/2) + "px";
                        }
                        if(h > prevWinH){
                            if((offsetObj.top && offsetObj.top == "center") || (offsetObj.bottom && offsetObj.bottom == "center")){
                                modalEle.style.top = correctedTop + ((h - prevWinH) / 2) + (heightDiff/2) + "px";
                            }
                            else if(offsetObj.bottom && offsetObj.bottom != "center"){
                                modalEle.style.top = correctedTop + (h - prevWinH) + "px";
                            }
                            else if(offsetObj.top && offsetObj.top != "center"){
                                modalEle.style.top = correctedTop + "px";
                            }
                            // modalEle.style.top = modalElePosition.top + ((h - prevWinH)/2) + "px";
                        }
                        modalEle.style.transform = "translate("+this.transform.x+"px,0px)";
                        if(this.renderSidewise){
                            if(this.getData('ltPropTransition').animation == 'slideFromRight'){
                                var rightValue = this.renderProps.windowWidth - this.renderProps.left;
                                if(freezeLayer){
                                    freezeLayer.style.right = rightValue + "px";
                                }
                                if(wrapperDiv){
                                    wrapperDiv.style.right = rightValue - 5 + "px";
                                }
                            }
                            if(this.getData('ltPropTransition').animation == 'slideFromLeft'){
                                if(freezeLayer){
                                    freezeLayer.style.left = this.renderProps.right + "px";
                                }
                                if(wrapperDiv){
                                    wrapperDiv.style.left = (this.renderProps.right + 1) + "px";
                                }
                            }
                        }
                    }
                    this.callOnResize();
                    // modalEle.style.transitionDuration = this.$node.ltProp("transition").duration+"s";
                },this);
            }
            this.setData('prevModalHeight',modalElePosition.height);
            this.setData('prevModalWidth',modalElePosition.width);
            this.setData('prevWinH',h);
            this.setData('prevWinW',w);
        },this);
        /*------------------------------ MEASURE ENDS --------------------------*/
        // modalEle = null;
    },

    isResponsibleForSidewiseRender : function(){
        var components = LytePopup.components;
        if(components.length > 1 && components[components.length - 2] === this && components[components.length - 1].renderSidewise){
            return true;
        }
        return false;
    },

    /**
     * The method is going to calculate the left and top value of the modal and perform the animation
     *
     */
    computeOffsetImpl : function(arg, triggeredFromTransChange){     //sets the left and top of the modal based on user provided values
        var _this = this.nodeName && this.nodeName === "LYTE-MODAL" ? this.component : this;
        /*------------------------------ MEASURE STARTS --------------------------*/
         _this.fastdomfn6 = $L.fastdom.measure(function() {
            delete _this.fastdomfn6;
            if(!_this.actualModalDiv){
                return;
            }
            _this.calculateForSidewiseRender();
            var modalEle = _this.actualModalDiv;
            var freezeLayer, wrapperDiv;
            var offsetObj = Lyte.deepCopyObject(_this.$node.ltProp('offset'));
            var modalRect = modalEle.getBoundingClientRect();
            var modalElePosition = {top: modalRect.top,
                                    right: modalRect.right,
                                    bottom: modalRect.bottom,
                                    left: modalRect.left,
                                    width: modalEle.offsetWidth,
                                    height: modalEle.offsetHeight
                                };
            var parentLeft = 0, parentTop = 0;
            if(_this.getData('ltPropFreeze')){
                var parentStyle = window.getComputedStyle(modalEle.parentElement);
                parentLeft = parseInt(parentStyle.left);
                parentTop = parseInt(parentStyle.top);
            }
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - parentLeft;
            if(_this.renderSidewise){
                _this.renderProps.windowWidth = w;
                w = _this.getData('ltPropTransition').animation == 'slideFromRight' ? _this.renderProps.left : (_this.renderProps.windowWidth - _this.renderProps.right);
                freezeLayer = _this.childComp.querySelector('lyte-modal-freeze');
                wrapperDiv = _this.actualModalDiv.parentElement;
            }
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - parentTop;
             // $L.fastdom.mutate(() => {
                modalEle.style.transitionDuration = (arg != undefined ? arg : _this.$node.ltProp("transition").duration)+"s";
            // },this);
            _this.setData('prevWinH',h);
            _this.setData('prevWinW',w);
            _this.setData('prevModalHeight',modalElePosition.height);
            _this.setData('prevModalWidth',modalElePosition.width);
            if(offsetObj){
                if(offsetObj.left === "center" || offsetObj.right === "center"){
                    var offLeft = (w - modalElePosition.width)/2;
                    if(offLeft < 0){
                        offLeft = 20;
                    }
                    offsetObj.left = offLeft;
                }
                if(offsetObj.top === "center" || offsetObj.bottom === "center"){
                    var offTop = (h - modalElePosition.height)/2;
                    if(offTop < 0){
                        offTop = 20;
                    }
                    offsetObj.top = offTop;
                }
                if(offsetObj.right && offsetObj.right !== "center"){
                    if(offsetObj.right.indexOf("%") > -1){
                        offsetObj.left = w-(modalElePosition.width+(w/parseFloat(offsetObj.right)));
                    }
                    else{
                        offsetObj.left = w-(modalElePosition.width+parseFloat(offsetObj.right));
                    }
                }
                if(offsetObj.bottom && offsetObj.bottom !== "center"){
                    if(offsetObj.bottom.indexOf("%") > -1){
                        offsetObj.top = h-(modalElePosition.height+(h/parseFloat(offsetObj.bottom)));
                    }
                    else{
                        offsetObj.top = h-(modalElePosition.height+parseFloat(offsetObj.bottom));
                    }
                }
                if(offsetObj.left === "" || offsetObj.left == undefined){
                    _this.data.ltPropOffset.left = "center";
                    offsetObj.left = ((w - modalElePosition.width)/2);
                }
                if(offsetObj.top === "" || offsetObj.top == undefined){
                    _this.data.ltPropOffset.top = "center";
                    offsetObj.top = ((h - modalElePosition.height)/2);
                }
                if(_this.getData('ltPropTransition').originElement){
                    var ele = document.querySelector(_this.getData('ltPropTransition').originElement);
                    if(!ele){
                        Console.error("The originElement provided does not exist. Kindly Check!");
                    }
                    else{
                        var eleOffset = ele.getBoundingClientRect();
                        offsetObj.originElementPos = {xDiff : (eleOffset.left + (eleOffset.width/2)) - (parseFloat(offsetObj.left) + (modalElePosition.width/2)),
                                                      yDiff : (eleOffset.top + (eleOffset.height/2)) - (parseFloat(offsetObj.top) + (modalElePosition.height/2)) };
                    }
                }
                /*------------------------------ MUTATE STARTS --------------------------*/
                 _this.fastdomfn7 = $L.fastdom.mutate(function() {
                    delete _this.fastdomfn7;
                    if(_this.getData('first')){
                        LytePopup.bindTransitionEnd(_this.actualModalDiv);
                    }
                    if(_this.getData('ltPropTransition').animation == "slideFromTop"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = (-1 * modalElePosition.height) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate(0px,"+(parseInt(offsetObj.top)+modalElePosition.height)+"px)";
                            return;
                        }
                        _this.enableTransform(parseInt(offsetObj.top)+modalElePosition.height,"y",arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromBottom"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = h+1 + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate(0px,"+(-1 * (h - parseInt(offsetObj.top) + 1))+"px)";
                            return;
                        }
                        _this.enableTransform(-1 * (h - parseInt(offsetObj.top) + 1),"y",arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromLeft"){
                        if(_this.renderSidewise){
                            if(freezeLayer){
                                freezeLayer.style.left = _this.renderProps.right + "px";
                            }
                            if(wrapperDiv){
                                wrapperDiv.style.left = _this.renderProps.right + "px";
                            }
                        }
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.left = (-1 * modalElePosition.width) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate("+(parseInt(offsetObj.left)+modalElePosition.width)+"px,0px)";
                            return;
                        }
                        _this.enableTransform(parseInt(offsetObj.left)+modalElePosition.width,'x',arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromRight"){
                        if(_this.renderSidewise){
                            var rightValue = _this.renderProps.windowWidth - _this.renderProps.left;
                            if(freezeLayer){
                                freezeLayer.style.right = rightValue + "px";
                            }
                            if(wrapperDiv){
                                wrapperDiv.style.right = rightValue - 5 + "px";
                            }
                        }
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.left = w + 1 + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate("+(-1 * (w - parseInt(offsetObj.left) + 1))+"px,0px)";
                            return;
                        }
                        _this.enableTransform(-1 * (w - parseInt(offsetObj.left) + 1),'x',arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "fadeIn"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "";
                            return;
                        }
                        _this.$node.ltProp('showCopy',true);
                        // setTimeout(function(){
                            modalEle.style.opacity = 1;
                        // },200);
                    }
                    else if(_this.getData('ltPropTransition').animation == "zoom"){
                        _this.$node.ltProp('showCopy',true);
                        var transform = "scale(0)";
                        if(offsetObj.originElementPos){
                            transform = "translateX( "+ offsetObj.originElementPos.xDiff + "px) translateY( "+ offsetObj.originElementPos.yDiff + "px) scale(0)";
                        }
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.transition = "none";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = offsetObj.originElementPos ? 'translateX(0) translateY(0) scale(1)' : 'scale(1)';
                            setTimeout(function(){
                                modalEle.style.transition = "";
                            },16)
                            return;
                        }
                        modalEle.style.transform = transform;
                        modalEle.style.opacity = 1;
                        setTimeout(function(){
                            modalEle.style.transition = "";
                            modalEle.style.transitionDuration = (arg != undefined ? arg : _this.$node.ltProp("transition").duration)+"s";
                            if(offsetObj.originElementPos){
                                modalEle.style.transform = 'translateX(0) translateY(0) scale(1)';
                            }
                            else{
                                modalEle.style.transform = 'scale(1)';
                            }
                        },50);
                    }
                    if(_this.$node.ltProp("freeze")){
                        document.body.classList.add('bodyWrapper');
                        // LytePopup.bodywrapperCount += 1;
                    }
                    if(_this.getData('first')){
                        // LytePopup.bindTransitionEnd(_this.actualModalDiv);
                        _this.callOnShow();
                        _this.setData("first",false);
                    }
                },_this);
                /*------------------------------ MUTATE ENDS --------------------------*/
            }
            else{
                _this.setData('ltPropOffset',{left:"center", top:"center"});
                // _this.data.ltPropOffset.left = "center";
                // _this.data.ltPropOffset.top = "center";
                offsetObj.left = ((w - modalElePosition.width)/2);
                offsetObj.top = ((h - modalElePosition.height)/2);
                if(!_this.$node.ltProp("scrollable")){
                    if(offsetObj.left < 0){
                        offsetObj.left = 20;
                    }
                    if(offsetObj.top < 0){
                        offsetObj.top = 20;
                    }
                }
                if(_this.getData('ltPropTransition').originElement){
                    var ele = document.querySelector(_this.getData('ltPropTransition').originElement);
                    if(!ele){
                        Console.error("The originElement provided does not exist. Kindly Check!");
                    }
                    else{
                        var eleOffset = ele.getBoundingClientRect();
                        offsetObj.originElementPos = {xDiff : (eleOffset.left + (eleOffset.width/2)) - (offsetObj.left + (modalElePosition.width/2)),
                                                      yDiff : (eleOffset.top + (eleOffset.height/2)) - (offsetObj.top + (modalElePosition.height/2)) };
                    }
                }
                /*------------------------------ MUTATE STARTS --------------------------*/
                _this.fastdomfn8 = $L.fastdom.mutate(function() {
                    delete _this.fastdomfn8;
                    if(_this.getData('first')){
                        LytePopup.bindTransitionEnd(_this.actualModalDiv);
                    }
                    if(_this.getData('ltPropTransition').animation == "slideFromTop"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = (-1 * modalElePosition.height) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate(0px,"+(parseInt(offsetObj.top)+modalElePosition.height)+"px)";
                            return;
                        }
                        _this.enableTransform(parseInt(offsetObj.top)+modalElePosition.height,"y",arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromBottom"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = h+1 + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate(0px,"+(-1 * (h - parseInt(offsetObj.top) + 1))+"px)";
                            return;
                        }
                        _this.enableTransform(-1 * (h - parseInt(offsetObj.top) + 1),"y",arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromLeft"){
                        if(_this.renderSidewise){
                            if(freezeLayer){
                                freezeLayer.style.left = _this.renderProps.right + "px";
                            }
                            if(wrapperDiv){
                                wrapperDiv.style.left = _this.renderProps.right + "px";
                            }
                        }
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.left = (-1 * modalElePosition.width) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate("+(parseInt(offsetObj.left)+modalElePosition.width)+"px,0px)";
                            return;
                        }
                        _this.enableTransform(parseInt(offsetObj.left)+modalElePosition.width,'x',arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "slideFromRight"){
                        if(_this.renderSidewise){
                            var rightValue = _this.renderProps.windowWidth - _this.renderProps.left;
                            if(freezeLayer){
                                freezeLayer.style.right = rightValue + "px";
                            }
                            if(wrapperDiv){
                                wrapperDiv.style.right = rightValue - 5 + "px";
                            }
                        }
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.left = w + 1 + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "translate("+(-1 * (w - parseInt(offsetObj.left) + 1))+"px,0px)";
                            return;
                        }
                        _this.enableTransform(-1 * (w - parseInt(offsetObj.left) + 1),'x',arg);
                    }
                    else if(_this.getData('ltPropTransition').animation == "fadeIn"){
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = "";
                            return;
                        }
                        _this.$node.ltProp('showCopy',true);
                        // setTimeout(function(){
                            modalEle.style.opacity = 1;
                        // },200);
                    }
                    else if(_this.getData('ltPropTransition').animation == "zoom"){
                        _this.$node.ltProp('showCopy',true);
                        var transform = "scale(0)";
                        if(offsetObj.originElementPos){
                            transform = "translateX( "+ offsetObj.originElementPos.xDiff + "px) translateY( "+ offsetObj.originElementPos.yDiff + "px) scale(0)";
                        }
                        modalEle.style.left = parseFloat(offsetObj.left) + "px";
                        modalEle.style.top = parseFloat(offsetObj.top) + "px";
                        modalEle.style.transition = "none";
                        if(triggeredFromTransChange){
                            modalEle.style.transform = offsetObj.originElementPos ? 'translateX(0) translateY(0) scale(1)' : 'scale(1)';
                            setTimeout(function(){
                                modalEle.style.transition = "";
                            },16)
                            return;
                        }
                        modalEle.style.transform = transform;
                        modalEle.style.opacity = 1;
                        setTimeout(function(){
                            modalEle.style.transition = "";
                            modalEle.style.transitionDuration = (arg != undefined ? arg : _this.$node.ltProp("transition").duration)+"s";
                            if(offsetObj.originElementPos){
                                modalEle.style.transform = 'translateX(0) translateY(0) scale(1)';
                            }
                            else{
                                modalEle.style.transform = 'scale(1)';
                            }
                        },50);
                    }
                    if(_this.$node.ltProp("freeze")){
                        document.body.classList.add('bodyWrapper');
                        // LytePopup.bodywrapperCount += 1;
                    }
                    if(_this.getData('first')){
                        _this.callOnShow();
                        _this.setData("first",false);
                    }
                },_this);
                /*------------------------------ MUTATE ENDS --------------------------*/
            }

        },_this);
        /*------------------------------ MEASURE ENDS --------------------------*/
        // modalEle = null;
    },

    /**
     * The method is going to check if sidewise render will be done and assigns the values that will be used for sidewise rendering of the modal
     *
     */
    calculateForSidewiseRender : function(){
        if(LytePopup.components.length > 1){
            var prevModal;
            if(LytePopup.components[LytePopup.components.length - 2].$node.tagName === "LYTE-MODAL"){
                prevModal = LytePopup.components[LytePopup.components.length - 2];
            }
            if(!this.getData('ltPropOverlapModal') && prevModal && prevModal.getData('ltPropAllowMultiple') && ["slideFromLeft","slideFromRight"].indexOf(this.getData('ltPropTransition').animation) != -1){
                this.renderSidewise = true;
                var prevModalOffset = prevModal.actualModalDiv.getBoundingClientRect();
                this.renderProps = {
                    prevModal : prevModal,
                    left : Math.round(prevModalOffset.left),
                    right : Math.round(prevModalOffset.right),
                    width : Math.round(prevModalOffset.width)
                };
            }
        }
    },

    closeModal : function(){
        var freezeLayer = this.childComp.querySelector('lyte-modal-freeze');
        if(this.renderSidewise){
            if(this.getData('ltPropTransition').animation == "slideFromRight"){
                if(freezeLayer){
                    freezeLayer.style.right = "";
                }
                this.actualModalDiv.parentElement.style.right = "";
            }
            if(this.getData('ltPropTransition').animation == "slideFromLeft"){
                if(freezeLayer){
                    freezeLayer.style.left = "";
                }
                this.actualModalDiv.parentElement.style.left = "";
            }
            delete this.renderSidewise;
            delete this.renderProps;
        }
        if(_lyteUiUtils.getRTL()){
            if(!this.getData('ltPropIgnoreInlineDirection')){
              if(this.getData('ltPropTransition').animation == "slideFromLeft"){
                  this.getData('ltPropTransition').animation = "slideFromRight";
              }
              else if(this.getData('ltPropTransition').animation == "slideFromRight"){
                  this.getData('ltPropTransition').animation = "slideFromLeft";
              }
            var offset = this.getData('ltPropOffset'),
                newOffset = {};
            for(key in offset){
                if(key == "left" && offset[key] != "center"){
                    newOffset.right = offset[key];
                }
                else if(key == "right"){
                    newOffset.left = offset[key];
                }
                else{
                    newOffset[key] = offset[key];
                }
            }
            this.setData('ltPropOffset',newOffset);
          }
        }
        if(this.getData('ltPropTransition').animation == "zoom"){
            this.actualModalDiv.style.opacity = "0";
            this.actualModalDiv.style.transform = "";
        }
        if(!this.$node.ltProp('freeze')){
            this.childComp.querySelector(".modalWrapper").classList.remove('noFreeze');
        }
        this.$node.ltProp({"showCopy":false,"show":false});
        // LytePopup.closePopup(this);

        if(this.$node.ltProp('freeze')){
            // LytePopup.bodywrapperCount -= 1;
            // if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
            //     document.body.classList.remove('bodyWrapper');
            // }
        }
        else{
            this.actualModalDiv.style.position = "";
        }
        this.$node.classList.remove('lyteModalOpened');
        if(this.actualModalDiv){
            this.actualModalDiv.style.transform = "";
        }
        if(this.getMethods("onClose")){
            this.executeMethod("onClose",this);
        }
        LytePopup.checkAndRemoveWrapper();
    },

    onBeforeCloseHandling : function(event){
        var result = true;
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if(this.getMethods("onBeforeClose")){
            result = this.executeMethod("onBeforeClose",event,this);
        }
        if(result === undefined || result){
            if(this.actualModalDiv && this.childComp){
                if(this.getData('ltPropFreeze') && this.addedFreezeDetails){
                    LytePopup.hideOrShowFreeze("close",this);
                    delete this.addedFreezeDetails;
                }
                var animDur = parseFloat(this.$node.ltProp('transition').duration) * 1000;
                var self = this;
                // console.log("duration",animDur);
                // var t1 = performance.now();
                this.timeOutId = setTimeout(function(){
                    delete self.timeOutId;
                    // var t2 = performance.now();
                    // console.log(t2 -t1);
                    self.closeModal();
                },animDur);
                var modalEle = this.actualModalDiv;
                if(this.getData('ltPropCloseDuration')){
                    modalEle.style.transitionDuration = (this.getData('ltPropCloseDuration') / 1000)+"s";
                }
                else{
                    modalEle.style.transitionDuration = (animDur / 1000)+"s";
                }
                // console.log("transitionDuration", modalEle.style.transitionDuration);
                var modalElemOffset;
                var transform = "scale(0)", transformVal;
                /*------------------------------ MEASURE STARTS --------------------------*/
                $L.fastdom.measure(function(){
                    modalElemOffset = modalEle.getBoundingClientRect();
                    if(this.getData('ltPropTransition').animation == "zoom" && this.getData('ltPropTransition').originElement){
                        var ele = document.querySelector(this.getData('ltPropTransition').originElement);
                        if(!ele){
                            Console.error("The originElement provided does not exist. Kindly Check!");
                        }
                        else{
                            var eleOffset = ele.getBoundingClientRect();
                            var modalElePosition = {top: modalElemOffset.top,
                                                    right: modalElemOffset.right,
                                                    bottom: modalElemOffset.bottom,
                                                    left: modalElemOffset.left,
                                                    width: modalEle.offsetWidth,
                                                    height: modalEle.offsetHeight
                                                };
                            var originElementPos = {xDiff : (eleOffset.left + (eleOffset.width/2)) - (modalElePosition.left + (modalElePosition.width/2)),
                                                          yDiff : (eleOffset.top + (eleOffset.height/2)) - (modalElePosition.top + (modalElePosition.height/2)) };
                            transform = "translateX( "+ originElementPos.xDiff + "px) translateY( "+ originElementPos.yDiff + "px) scale(0)"
                        }
                    }
                },this);
                /*------------------------------ MEASURE ENDS --------------------------*/
                /*------------------------------ MUTATE STARTS --------------------------*/
                $L.fastdom.mutate(function(){
                    if(this.getData('ltPropTransition').animation == "slideFromTop"){
                        // modalEle.style.transform = "translateY(-100%)";
                        transformVal = -(Math.ceil(modalElemOffset.height) + parseInt(modalEle.style.top) + 10) + "px";
                        modalEle.style.transform = "translateY("+transformVal+")";
                    }
                    else if(this.getData('ltPropTransition').animation == "slideFromBottom"){
                        // modalEle.style.transform = "translateY(100%)";
                        transformVal = (h - parseInt(modalEle.style.top) + 10) + "px";
                        modalEle.style.transform = "translateY("+transformVal+")";
                    }
                    else if(this.getData('ltPropTransition').animation == "slideFromLeft"){
                        // modalEle.style.transform = "translateX(-100%)";
                        transformVal = -(Math.ceil(modalElemOffset.width) + parseInt(modalEle.style.left) + 10) + "px";
                        modalEle.style.transform = "translateX("+transformVal+")";
                    }
                    else if(this.getData('ltPropTransition').animation == "slideFromRight"){
                        // modalEle.style.transform = "translateX(100%)";
                        transformVal = (((this.renderProps && this.renderProps.left) || w ) - parseInt(modalEle.style.left) + 10) + "px";
                        modalEle.style.transform = "translateX("+transformVal+")";
                    }
                    else if(this.getData('ltPropTransition').animation == "fadeIn"){
                        modalEle.style.opacity = 0;
                    }
                    else if(this.getData('ltPropTransition').animation == "zoom"){
                        modalEle.style.transform = transform;
                    }
                    delete this.transform;
                    if(!(this.$node.classList.contains('lyteModalOpened'))){
                        modalEle.style.transform = "";
                    }
                },this);
                $L.fastdom.mutate(function(){
                    modalEle = null;
                });
                /*------------------------------ MUTATE ENDS --------------------------*/

                modalEle.classList.remove('lyteModalFromTop','lyteModalFromBottom','lyteModalFromLeft','lyteModalFromRight','lyteModalFadeIn','lyteZoom');
                if(this.$node.ltProp('freeze') && this.childComp.querySelector("lyte-modal-freeze")){
                    var freezeLayer = this.childComp.querySelector("lyte-modal-freeze");
                    setTimeout(function(){
                        freezeLayer.style.opacity = 0;
                        freezeLayer.style.visibility = "";
                    }.bind(this), 300);
                }
                LytePopup.closePopup(this);
                // LytePopup.bindTransitionEnd(this.actualModalDiv);
                this.setData("first",true);
                this.setData('initializedPosition',false);
                this.setData('calculateHW', false);
            }
            this.$node.alignModal = null;
            this.$node.calculateOffset = null;
            this.$node.reflectTransitionChange = null;
        }
        else{
            this.setData('returnedFalse',true);
            this.$node.ltProp('show',true);
        }
    },
    onBeforeShowHandling : function(){
        var result = true;
        if(this.getMethods("onBeforeShow")){
            result = this.executeMethod("onBeforeShow",this) ;
        }
        if(result === undefined || result){
            this.setData('checkAria', this.getData('checkAria')+1);
            this.addDragHandler();
            this.updateScrollHandling();

            var modalEle = this.actualModalDiv;
            var val = "";
            modalEle.style.transitionDuration = this.$node.ltProp("transition").duration+"s";
            var classVal = "lyteModalFrom";
            var modalStyle = this.actualModalDiv.style;
            var modalElemOffset = this.actualModalDiv.getBoundingClientRect();
            var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            switch(this.$node.ltProp("transition").animation){
                case "slideFromTop":
                    classVal += "Top";
                    break;
                case "slideFromBottom":
                    classVal += "Bottom";
                    break;
                case "slideFromLeft":
                    classVal += "Left";
                    break;
                case "slideFromRight":
                    classVal += "Right";
                    break;
                case "fadeIn":
                    classVal = "lyteModalFadeIn";
                    break;
                case "zoom":
                    classVal = "lyteZoom";
                    break;
            }
            /*------------------------------ MUTATE STARTS --------------------------*/
            this.fastdomfn1 = $L.fastdom.mutate(function(){
                delete this.fastdomfn1;
                this.actualModalDiv.classList.add(classVal);
                this.actualModalDiv.style.opacity = "";
                modalEle = null;
            },this);
            /*------------------------------ MUTATE ENDS --------------------------*/
            LytePopup.addPopup(this);
            this.calculateForSidewiseRender();
            if(this.$node.ltProp('freeze')){
                var freezeLayer = this.childComp.querySelector("lyte-modal-freeze");
                if(this.renderSidewise){
                    if(this.getData('ltPropTransition').animation == 'slideFromRight'){
                        freezeLayer.style.right = (windowWidth - this.renderProps.left) + "px";
                    }
                    if(this.getData('ltPropTransition').animation == 'slideFromLeft'){
                        freezeLayer.style.left = this.renderProps.right + "px";
                    }

                }
                var freezeStyle = freezeLayer.style;
                // freezeStyle.opacity = this.getData('ltPropDimmer').opacity;
                if(this.getData('ltPropDimmer') && this.getData('ltPropDimmer').color){
                    freezeStyle.background = this.getData('ltPropDimmer').color;
                }
                if(!this.addedFreezeDetails){
                    freezeStyle.opacity = this.getData('ltPropDimmer') && this.getData('ltPropDimmer').opacity ? this.getData('ltPropDimmer').opacity : "";
                }
            }
            this.$node.alignModal = this.computeOffsetImpl.bind(this, 0, true);
            this.$node.calculateOffset = this.updateScrollHandling.bind(this);
            this.$node.reflectTransitionChange = this.reflectTransitionChange.bind(this);
        }
        else{
            this.setData('returnedFalse',true);
            this.$node.ltProp({"showCopy":false,"show":false});
        }
    },

    /**
     * The method is going to change the transition property when the modal is opened with different animation and closed with different animation
     * This util function is required to be triggered by the developer after they change the ltPropTransition value
     * The function can be triggered in onShow inside a setTimeout of 500ms or before the ltPropShow of the modal is set to false
     *
     */
    reflectTransitionChange : function(){
        this.computeOffsetImpl(null, true);
    },
    didDestroy : function(){
        this.$node.classList.remove('lyteModalOpened');
        if(this.timeOutId){
            clearTimeout(this.timeOutId);
            delete this.timeOutId;
        }
        if(this.beforeCloseId){
            clearTimeout(this.beforeCloseId);
            delete this.beforeCloseId;
        }
        if(this.renderSidewise){
            delete this.renderSidewise;
            delete this.renderProps;
        }
        if(this.childComp){
            this.clearFastdomBatch();
            if(this.getData('ltPropFreeze') && this.addedFreezeDetails){
                LytePopup.hideOrShowFreeze("close",this);
                delete this.addedFreezeDetails;
            }
            LytePopup.closePopup(this);
            this.childComp.remove();
            delete this.actualModalDiv;
            delete this.childComp;
            // if(this.$node.ltProp('freeze')){
            //     LytePopup.bodywrapperCount -= 1;
            //     if(LytePopup.bodywrapperCount == 0 || LytePopup.components.length == 0){
            //         document.body.classList.remove('bodyWrapper');
            //     }
            // }
            LytePopup.checkAndRemoveWrapper();
        }
        // LytePopup.components = [];
    },
    actions: {
        close : function(){
           this.$node.ltProp("show",false);
        }
    },
    methods : {
        beforeWormholeAppend : function(arg){
            if(this.childComp){
                delete this.childComp;
            }
            if(this.actualModalDiv){
                delete this.actualModalDiv;
            }
            this.childComp = arg;
            this.actualModalDiv = this.childComp.querySelector(".lyteModal");
        }
    }
});

if (document.readyState === "complete" || document.readyState === "interactive"){
    addModalEvent();
}
else{
    document.addEventListener("DOMContentLoaded", function(event){
        addModalEvent(event);
    });
}
function addModalEvent(event){
    window.addEventListener('resize',function(event){
        // console.log(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
        if(LytePopup._lyteModalRTId){
            // console.log(LytePopup._lyteModalRTId);
            clearTimeout(LytePopup._lyteModalRTId);
            LytePopup._lyteModalRTId = false;
        }
        LytePopup._lyteModalRTId = setTimeout(function(){
            for(var i = LytePopup.components.length - 1 ; i >= 0 ; i--){
                if(LytePopup.components[i].$node && LytePopup.components[i].$node.nodeName == "LYTE-MODAL" && LytePopup.components[i].childComp.style.visibility == "visible" && LytePopup.components[i].childComp.querySelector('.lyteModal')){
                    LytePopup.components[i].$node.component.setData('resizeCalled',true);
                    if((i == LytePopup.components.length - 1) && LytePopup.components[i].renderSidewise){
                        continue;
                    }
                    LytePopup.components[i].$node.component.updateScrollHandling();
                }
            }
            LytePopup._lyteModalRTId = false;
        },100);
    },true);

    document.addEventListener('click',function(event){
        var ele = event.target;
        while(!$L(ele).hasClass('modalWrapper') && ele.tagName != "LYTE-MODAL-FREEZE" && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML'){
            ele = ele.parentElement;
            if(!ele){
                return
            }
        }
        if(ele.tagName == "HTML" || ele.tagName == "LYTE-MODAL-FREEZE"){
            for(var i = LytePopup.components.length -1 ; i>=0; i--){
                if(LytePopup.components[i].$node.tagName == "LYTE-MODAL" && LytePopup.components[i].childComp.style.visibility == "visible"){
                    var modal = LytePopup.components[i].$node;

                    if(modal && modal.component.getData('ltPropOverlayClose')){
                        modal.ltProp('show',false);
                        break;
                    }
                }
            }
        }
        else{
            /*  If ele is having modalWrapper class ie. a modal and it is not the modal that is opened at last which is the current modal element in the page
            this means the click has happened outside the current modal
            so the current modal should be closed */
            if(ele.classList.contains('modalWrapper') && LytePopup.components.length > 1 && LytePopup.components[LytePopup.components.length -1].$node.tagName == "LYTE-MODAL"){
                var modal = LytePopup.components[LytePopup.components.length -1];
                if(!(modal.childComp.contains(ele)) && modal.childComp.style.visibility == "visible" && modal.getData('ltPropOverlayClose')){
                    modal.$node.ltProp('show',false);
                }
            }
        }
    },true);
}
;

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/**
 * @syntax yielded
 * <lyte-modal>
 *     <template is = "registerYield" yield-name = "modal">
 *         <lyte-modal-header> Create Profile </lyte-modal-header>
 *         <lyte-modal-content>
 *             //Some Content
 *         </lyte-modal-content>
 *         <lyte-modal-footer class = "right">
 *             //Some button
 *         </lyte-modal-footer>
 *     </template>
 * </lyte-modal>
 */
