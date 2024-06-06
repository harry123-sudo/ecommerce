/**
 * This component is used to select a value from a range of values
 * @component lyte-slider
 * @version 1.0.0
 * @methods beforeRender,afterRender,onSelect,onChange
 */

Lyte.Component.register('lyte-slider',{
_template:"<template tag-name=\"lyte-slider\"> <div class=\"lyteSlide {{if(ltPropDisabled,'lyteSliderDisabled','')}}\"> <div class=\"lyteRangeSlider {{ltPropDirection}}\" onclick=\"{{action('click',event)}}\" tabindex=\"0\" onkeydown=\"{{action('keydown',event)}}\"> <div class=\"lyteSliderFill\"></div> <div class=\"lyteSliderHandler {{ltPropHandler}} lyteHandler1\" lt-prop-title=\"{{if(expHandlers(ltPropTooltip,'&amp;&amp;',true),if(ltPropRangeHandler,ltPropMinValue,ltPropValue),'')}}\" tabindex=\"0\" onmousedown=\"{{action('mousedown',event,this)}}\" ontouchstart=\"{{action('mousedown',event,this)}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-style=\"{{ltPropTooltipStyle}}\" lt-prop-tooltip-class=\"{{ltPropTooltipClass}}\" style=\"border-color: {{ltPropFillColor}}\"></div> <template is=\"if\" value=\"{{ltPropRangeHandler}}\"><template case=\"true\"> <div class=\"lyteSliderHandler {{ltPropHandler}} lyteHandler2\" tabindex=\"0\" onmousedown=\"{{action('mousedown',event,this)}}\" ontouchstart=\"{{action('mousedown',event,this)}}\" lt-prop-title=\"{{if(ltPropTooltip,ltPropMaxValue,'')}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-style=\"{{ltPropTooltipStyle}}\" lt-prop-tooltip-class=\"{{ltPropTooltipClass}}\" style=\"border-color: {{ltPropFillColor}}\"></div> </template></template><template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteScaleOption {{ltPropHandler}}\"> <template is=\"for\" items=\"{{divLength}}\" index=\"indexVal\"> <span class=\"lyteScaleLine\" style=\"{{item}}\"> <span></span> <span class=\"lyteScalLable\">{{scaleVal[indexVal]}}</span> </span> </template> </div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,3],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'border-color: '","ltPropFillColor"]}}}},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","helperInfo":{"name":"concat","args":["'border-color: '","ltPropFillColor"]}}}}]}},"default":{}},{"type":"attr","position":[1,1,6]},{"type":"if","position":[1,1,6],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1],"attr":{"style":{"name":"style","dynamicValue":"item"}}},{"type":"text","position":[1,3,0]}]}]}},"default":{}}],
_observedAttributes :["divLength","scaleVal","ltPropMin","ltPropMax","ltPropScaleInterval","ltPropStep","ltPropHandler","ltPropDirection","ltPropWidth","ltPropFillColor","ltPropNonFillColor","ltPropHeight","ltPropValue","ltPropDiscrete","ltPropContent","ltPropRangeHandler","ltPropMinValue","ltPropMaxValue","ltPropDisabled","ltPropSelectedValue1","ltPropSelectedValue2","ltPropYield","ltPropTooltipStyle","ltPropTooltip","ltPropScaleUnit","ltPropTooltipClass","ltPropTooltipConfig","ltPropMinDiff","ltPropDigits","preventObs"],
        init:function(){
            this._dir = _lyteUiUtils.getRTL();
            var config = this.getData( 'ltPropTooltipConfig' ), dir = this.getData('ltPropDirection'), style = this.getData('ltPropTooltipStyle');
            if( !config ) {
                this._config = true;
                this.data.ltPropTooltipConfig = { position : ( dir == 'lyteHorizontal' ? 'top' : 'right' ), showdelay : 500, margin : 10 }
            }

            if( !style ) {
                this._style = true;
                if( this.data.ltPropFillColor ) {
                    this.data.ltPropTooltipStyle = "background-color : " + this.data.ltPropFillColor + ";";
                }
            }

            if( [ undefined, '', null ].indexOf( this.getData( 'ltPropScaleInterval' ) ) != -1 ) {
                this.setData('preventObs', true);
                var newScale;
                if( this.getData( 'ltPropHandler' ).indexOf( 'Arrow' ) != -1 ) {
                    if( this.getData('ltPropContent').length == 0 ) {
                        newScale = 0.1 * ( parseFloat( this.getData( 'ltPropMax' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) )
                    }
                } 
                if( this.getData('ltPropContent').length ) {
                    newScale = 'true';
                }
                if( newScale ) {
                    this.setData( 'ltPropScaleInterval', newScale.toString() )
                }
                this.setData('preventObs', false);
            }
            if(this.getMethods('beforeRender'))
                {
                   /**
                    * @method beforeRender
                    * @version 1.0.1
                    */
                    this.executeMethod('beforeRender', this.$node);
                }
        },

        rtlfunc : function( lft, bcr, ww ) {
            if( this._dir && lft != 'top' && lft != 'clientY' ) {
                if( bcr ) {
                    if( lft == 'right' ) {
                        return ww - bcr.left;
                    } else if( lft == 'clientX' ) {
                        return ww - bcr.clientX
                    } else if( lft == 'offsetLeft' ) {
                        return bcr.offsetParent.offsetWidth - bcr.offsetLeft - bcr.offsetWidth;
                    }
                    return ww - bcr.right;
                } else if( lft == 'left' ) {
                    return 'right';
                } 
            }
            return bcr ? bcr[ lft ] : lft;
        },

        heightSetObs : function(){
            this.heightSet.call(this, arguments[0])
        }.observes('ltPropWidth','ltPropHeight'),

        heightSet : function (){
            var width = this.getData('ltPropWidth'), height = this.getData('ltPropHeight')
            if(this.getData('ltPropDirection').indexOf('Horizontal')!=-1)
                    {
                        if(!width) {
                                this.setData('ltPropWidth','200px')
                                width = '200px';
                            }
                        if(!height) {
                                this.setData('ltPropHeight','30px')
                                height = '30px';
                            }
                    }
            else
                {
                    if(!width){
                            this.setData('ltPropWidth','30px')
                            width = '30px'
                        }
                    if(!height){
                            this.setData('ltPropHeight','200px')
                            height = '200px';
                        }
                }
            this.$node.style.width = width;
            this.$node.style.height = height;
            if(arguments.length){
                this.didConnectWrk.call(this)   
            }
        },

        initialWorkObs : function(){
            if(this.getData('preventObs')){
                return;
            }
            this.setData('preventObs', true);
            this.initialWork.call(this, arguments[ 0 ]);
            this.setData('preventObs', false);
        }.observes('ltPropContent','ltPropMax','ltPropMin', 'ltPropScaleInterval','ltPropDiscrete','ltPropStep','ltPropValue', 'ltPropScaleUnit').on('init'),

        initialWork : function (arg){
            var ltPropContent = this.getData('ltPropContent').slice(), direction = this.getData('ltPropDirection'), discrete = this.getData( 'ltPropDiscrete' ), rangeHandler = this.getData( 'ltPropRangeHandler' );
            if( !ltPropContent.length )
                {
                    var min = parseFloat( this.getData( 'ltPropMin' ) ), max = parseFloat( this.getData( 'ltPropMax' ) )
                    if( !rangeHandler ) {
                        var value = parseFloat( this.getData( 'ltPropValue' ) );
                        if( value < min || isNaN( value ))
                            {   
                                this.setData('ltPropValue', min.toString());
                            }
                        else if( value > max)
                            {
                                this.setData('ltPropValue', max.toString());
                            }
                        this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));
                    } else {
                        var minVal = parseFloat( this.getData( 'ltPropMinValue' ) ), maxVal = parseFloat( this.getData( 'ltPropMaxValue' ) );
                        if( isNaN( minVal ) || minVal < min || minVal >= max ) {
                            this.setData( 'ltPropMinValue', min.toString() );
                        }
                        if( isNaN( maxVal ) || maxVal > max || maxVal <= min) {
                            this.setData( 'ltPropMaxValue', max.toString() );
                        }
                        this.setData('ltPropSelectedValue1', this.getData('ltPropMinValue'));
                        this.setData('ltPropSelectedValue2', this.getData('ltPropMaxValue'));
                    }   
                    if( discrete ) {
                        var minDiscrete = 0.1 * ( parseFloat( this.getData( 'ltPropMax' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) );
                        discrete = parseFloat( discrete );
                        discrete = Math.max( isNaN( discrete ) ? 0 : discrete, minDiscrete ).toString();
                        this.setData( 'ltPropDiscrete', discrete);
                        this.setData( 'ltPropStep', discrete );
                        this.setData( 'ltPropScaleInterval', discrete );                    
                    }
                }
            else if(ltPropContent.length)
                {
                    this.setData('ltPropMax','100');
                    this.setData('ltPropStep',this.getData('ltPropScaleInterval'))
                    if( this.getData( 'ltPropScaleInterval' ) || ( arg && arg.item == 'ltPropContent' ) ) {
                        this.setData('ltPropScaleInterval', '' + parseFloat( 100 / ( ltPropContent.length - 1 ) ) + '')
                    }
                    this.setData('ltPropDiscrete',this.getData('ltPropScaleInterval'))
                    if( !rangeHandler ) {
                        if(!this.getData('ltPropValue'))
                            {
                                this.setData('ltPropValue',this.getData('ltPropContent')[0])
                                this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));  
                            }   
                    } else {
                        var minVal = this.getData( 'ltPropMinValue' ), maxVal = this.getData( 'ltPropMaxValue' );
                        if( !minVal || ltPropContent.indexOf( minVal ) == -1 || ( ltPropContent.indexOf( minVal ) > ltPropContent.indexOf( maxVal ) ) ) {
                             this.setData( 'ltPropMinValue', ltPropContent[ 0 ] );
                        } 
                        if( !maxVal || ltPropContent.indexOf( maxVal ) == -1 || ( ltPropContent.indexOf( minVal ) > ltPropContent.indexOf( maxVal ) ) ) {
                             this.setData( 'ltPropMaxValue', ltPropContent[ ltPropContent.length - 1 ] );
                        } 
                        this.setData('ltPropSelectedValue1', this.getData('ltPropMinValue'));
                        this.setData('ltPropSelectedValue2', this.getData('ltPropMaxValue'));
                    }   
                }   
            var array = []
            var scale = []
            if(!this.getData('ltPropYield'))    
                {
                    var dirFlag = direction.indexOf('Horizontal') != -1 ? true : false, left = "top:", scaleint = parseFloat( this.getData( 'ltPropScaleInterval' ) );
                    if(dirFlag){
                        left =  this.rtlfunc.call( this, 'left' ) + ":"
                    }
                    if( scaleint && !isNaN( scaleint ) )
                        {
    
                            var temp = parseFloat(this.getData('ltPropMin')), scaleText = this.getData( 'ltPropScaleUnit' );
                            for(var i=0;temp<=parseFloat(this.getData('ltPropMax'));i++)
                                {
                                    array.push(left + (((temp-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin'))))*100)+'%');
                                    if(this.getData('ltPropContent').length)
                                        {
                                            scale.push(ltPropContent[i] + scaleText)
                                        }
                                    else    
                                        {
                                            scale.push(temp + scaleText);
                                        }   
                                    temp+=parseFloat(scaleint);
                                }
                            var maxVal = ltPropContent.length ? ltPropContent[ltPropContent.length-1] : this.getData('ltPropMax');
                            if(scale[scale.length-1]!=maxVal)
                                {
                                    array.push(left + (100) + '%');
                                    if(ltPropContent.length)
                                        {
                                            scale.push(ltPropContent[ltPropContent.length - 1] + scaleText)
                                        }
                                    else    
                                        {
                                            scale.push(this.getData('ltPropMax') + scaleText);  
                                        }
                                }   
                        }
                    else
                        {
                            array.push( left + 0 + '%');
                            array.push( left + 100 + '%');
                            scale=this.MaxMinSet.call(this);
                            this.setData('scaleVal',scale);         
                        }
            }
            this.setData('scaleVal', scale);
            this.setData('divLength', array);   
        },

        colorSetObs : function(arg){
            this.colorSet.call(this, arg);
        }.observes('ltPropFillColor','ltPropNonFillColor').on( 'didConnect' ),

        colorSet : function (arg) {
            if((!arg && this.data.ltPropFillColor) || (arg && arg.item == "ltPropFillColor"))
                {
                    this.$node.querySelector( 'div.lyteSliderFill' ).style.backgroundColor=this.data.ltPropFillColor;
                }
            if((!arg && this.data.ltPropNonFillColor) || (arg && arg.item == "ltPropNonFillColor"))
                {
                    this.$node.querySelector( 'div.lyteRangeSlider' ).style.backgroundColor= this.data.ltPropNonFillColor;
                }
        },

        didConnectWrkObs : function(){
            if(this.getData('preventObs')){
                return;
            }
            this.setData('preventObs', true);
            this.didConnectWrk.apply(this, arguments);
            this.setData('preventObs', false);
        }.observes('ltPropScaleInterval','ltPropValue','ltPropMin','ltPropMax','ltPropMinValue','ltPropMaxValue','ltPropContent','ltPropHandler','ltPropRangeHandler'),

        didConnectWrk : function () {
            var lyterangeFlag,handlers,nodeName,lyteRangeSlider= this.$node.querySelector( 'div.lyteRangeSlider' ), lyteSlide= this.$node.querySelector( 'div.lyteSlide' );
            var handlers = this.$node.querySelectorAll( 'div.lyteSliderHandler' ), rangeHandler = this.getData('ltPropRangeHandler'), direction = this.getData('ltPropDirection');
            var thisClientRect = this.$node.getBoundingClientRect(), handlersClientRect = handlers[0].getBoundingClientRect(), offParent = this.$node.offsetParent, objj = {};
            var width = "width", handlerWidth = "handlerWidth", left = this.rtlfunc.call( this, 'left' ), left1, left2, actWidth = {}, offsetWidth = 'offsetWidth', node;
            if( direction.indexOf('Horizontal') == -1) {
                width = "height"; handlerWidth = "handlerHeight", left = "top", offsetWidth = 'offsetHeight';
            }
            if( offParent == null ) {
                objj.width = parseFloat(this.getData('ltPropWidth'));
                objj.height = parseFloat(this.getData('ltPropHeight'));
                objj.handlerWidth = objj.handlerHeight = 12;
            } else {
                objj.width = thisClientRect.width;
                objj.height = thisClientRect.height;
                objj.handlerWidth = handlersClientRect.width;
                objj.handlerHeight = handlersClientRect.height;
            }
              var lyteSliderFill= this.$node.querySelector( 'div.lyteSliderFill' );
              if(this.getData('ltPropContent').length)
                    {
                        var index1,index2,index = this.data.ltPropContent.indexOf( this.data.ltPropValue );
                        node= this.$node.querySelectorAll( 'div.lyteSliderHandler' );
                        index = index > -1 ? index : 0 ;
                        if(rangeHandler)
                            {
                                index1 = this.getData( 'ltPropContent' ).indexOf( this.getData( 'ltPropMinValue' ) );
                                index1 = index1 != -1 ? index1 : 0;
                                index2 = this.getData( 'ltPropContent' ).indexOf( this.getData( 'ltPropMaxValue' ) );
                                index2 = index2 != -1 ? index2 : this.getData( 'ltPropContent' ).length - 1;
                            }
                        if(rangeHandler)
                            {
                                left1 = this.rangeInitialSet.call(this, offsetWidth, index1)
                                left2 = this.rangeInitialSet.call(this, offsetWidth, index2)
                                actWidth = this.rangeSliderFill(left1, left2, objj[handlerWidth])
                            }
                        else    
                            {
                                left1 = this.rangeInitialSet.call(this, offsetWidth, index)
                                actWidth.width =  index / ( this.getData( 'ltPropContent' ).length - 1 ) * objj[ width ] ;
                            }   
                    }
                else if(!rangeHandler)
                    {
                        left1 = this.initialValueSet.call(this, objj[width], objj[handlerWidth] , parseFloat(this.getData('ltPropValue')))
                        actWidth.width = ( ( parseFloat( this.getData( 'ltPropValue' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) ) / ( parseFloat( this.getData( 'ltPropMax' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) ) * objj[width] );
                    }
                else
                    {
                        left1 = this.initialValueSet.call(this, objj[width], objj[handlerWidth], parseFloat( this.getData( 'ltPropMinValue' ) ) )
                        left2 = this.initialValueSet.call(this, objj[width], objj[handlerWidth], parseFloat( this.getData( 'ltPropMaxValue' ) ) )
                        actWidth = this.rangeSliderFill(left1, left2, objj[handlerWidth])
                    }
            handlers[ 0 ].style[ left ] = left1 + 'px';
            lyteSliderFill.style[ width ] = actWidth.width + 'px';
            if( handlers[ 1 ] ) {
                handlers[ 1 ].style[ left ] = left2 + 'px';
                lyteSliderFill.style[ left ] = actWidth.left + 'px';
            }       
        },  

        directionObsObs : function(){
            this.directionObs.call(this);
        }.observes('ltPropDirection'),

        directionObs : function(){
            if(this.getData('preventObs')){
                return;
            }
            $L.fastdom.mutate(function(){
                var lyteSliderHandler = this.$node.querySelector( '.lyteSliderHandler' );
                lyteSliderHandler.style.removeProperty( this.rtlfunc.call( this, 'left' ) );
                lyteSliderHandler.style.removeProperty('top');
                var lyteSliderFill = this.$node.querySelector( '.lyteSliderFill' );
                lyteSliderFill.style.removeProperty('width');
                lyteSliderFill.style.removeProperty('height');
                this.setData('preventObs', true);
                this.heightSet.call(this);
                // this.initialWork.call(this);
                $L.fastdom.measure( function() {
                    this.didConnectWrk.call(this);
                    this.setData('preventObs', false);
                }.bind( this ))
            }.bind(this))
        },

        MaxMinSet:function(){
                var scale=[], scaleText = this.getData( 'ltPropScaleUnit' );
                if(this.getData('ltPropContent').length)
                    {
                        scale.push(this.getData('ltPropContent')[0] + scaleText);
                        scale.push(this.getData('ltPropContent')[this.getData('ltPropContent').length-1] + scaleText)
                    }
                else    
                    {
                        scale.push(this.getData('ltPropMin') + scaleText);
                        scale.push(this.getData('ltPropMax') + scaleText);
                    }
                return scale;   
        },
        selectedVal:function(clientRect, nodeClientRect,ltPropHeight,node,left){
            var selectedVal, lyteSlide = this.$node.querySelector( 'div.lyteSlide' );
            var slideClientRect = clientRect[ltPropHeight];
            if(node)
                {
                    selectedVal = (((parseFloat(node.style[ left ]) + nodeClientRect[ltPropHeight]/2)/slideClientRect)*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin'))).toFixed( this.data.ltPropDigits );
                }
            else    
                {
                    selectedVal = (( parseFloat( this.$node.querySelector( 'div.lyteSliderFill' ).style[ ltPropHeight ] ) / slideClientRect)*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin'))).toFixed( this.data.ltPropDigits );
                }
            if(this.getData('ltPropContent').length)
                {
                    var numb = parseFloat(selectedVal)/parseFloat(this.getData('ltPropScaleInterval'));
                    if(selectedVal>100)
                        {
                            selectedVal=this.getData('ltPropContent')[this.getData('ltPropContent').length - 1];
                        }
                    else
                        {
                            selectedVal=this.getData('ltPropContent')[parseInt(parseFloat(numb).toFixed(0))];
                        }
                }
            return selectedVal; 
        },
        onSelect:function(flag){
            if(this.getMethods('onChange')||this.getMethods('onSelect'))
                {
                    if(!this.getData('ltPropRangeHandler'))
                        {
                            if(this.getMethods('onChange')) 
                                {
                                    this.executeMethod('onChange',this.getData('ltPropSelectedValue1'), this.$node) 
                                }
                            if(this.getMethods('onSelect') && flag) 
                                {
                                    this.executeMethod('onSelect',this.getData('ltPropSelectedValue1'), this.$node) 
                                }
                        }
                    else
                        {
                            if(this.getMethods('onChange')) 
                                {
                                    this.executeMethod('onChange', this.getData('ltPropSelectedValue1'), this.getData('ltPropSelectedValue2'), this.$node); 
                                }
                            if(this.getMethods('onSelect') && flag) 
                                {
                                    this.executeMethod('onSelect', this.getData('ltPropSelectedValue1'), this.getData('ltPropSelectedValue2'), this.$node); 
                                }
                        }
                }           
            },
        scroll:function(widthVal,offWidth){
                var discrete=parseFloat(this.getData('ltPropDiscrete'));
                var flag=false,flag1=false,flag2=false;
                if(widthVal>=parseFloat(this.getData('ltPropMax'))-(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))%discrete)
                    {
                        discrete=(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))%discrete;
                        flag1=true;
                        flag=true;
                    }
                else if(widthVal-parseFloat(this.getData('ltPropDiscrete'))/2<(parseFloat(this.getData('ltPropMin'))))
                    {
                        flag=true;
                        flag2=true;
                    }
                if(flag)                                    
                    {
                        if(widthVal>parseFloat(this.getData('ltPropMax'))-discrete/2)
                            {
                                if(flag1)
                                    {
                                        widthVal=parseFloat(this.getData('ltPropMax'))
                                    }
                                else
                                    {
                                        widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete+discrete;
                                    }
                            }
                        else
                            {
                                discrete=parseFloat(this.getData('ltPropDiscrete'))
                                if(flag2)
                                    {
                                        widthVal=parseFloat(this.getData('ltPropMin'))
                                    }
                                else
                                    {
                                        widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete;
                                    }
                            }
                    }
                else
                    {
                        if((widthVal-parseFloat(this.getData('ltPropMin')))%discrete>=parseFloat(this.getData('ltPropDiscrete'))/2)
                            {
                                widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete+discrete;
                            }
                        else
                            {
                                widthVal=widthVal-(widthVal-parseFloat(this.getData('ltPropMin')))%discrete;
                            }
                    }       
                return ((widthVal-parseFloat(this.getData('ltPropMin')))/(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))*offWidth);
        },  
        ScrollCheck:function(node,left1,width1,clientX1,offsetWidth1,ltPropWidth1,offsetLeft1,event){
            var isTch = event.type == "touchmove", evt = event; 
            if( isTch && event.touches.length != 1 ) {
                return
            } else if( isTch ) {
                evt = event.touches[ 0 ];
            }
            var step, flag = true, lyteHandler2, lyteHandler1, lyteRangeSlider, lyteSlide = this.$node.querySelector( 'div.lyteSlide'  ), handler1Client, handler2Client;
            var rangeHandler = this.getData( 'ltPropRangeHandler' ), sliderFill = this.$node.querySelector( 'div.lyteSliderFill' ), wwidth = window.innerWidth,
            evtt = this.rtlfunc.call( this, clientX1, evt, wwidth ), h1left, h2left, width, left;
            if( !rangeHandler )
                {   
                    width = evtt - this.rtlfunc.call( this, left1, sliderFill.getBoundingClientRect(), wwidth );
                }
            else
                {
                    lyteHandler2 = this.$node.querySelector( 'div.lyteHandler2' ),lyteHandler1= this.$node.querySelector( 'div.lyteHandler1' ), lyteRangeSlider= this.$node.querySelector( 'div.lyteRangeSlider' );
                    handler1Client = lyteHandler1.getBoundingClientRect(), handler2Client = lyteHandler2.getBoundingClientRect();
                    h2left = this.rtlfunc.call( this, left1, handler2Client, wwidth ); h1left = this.rtlfunc.call( this, left1, handler1Client, wwidth )
                    if(( h2left - h1left ) <= 0)    
                        {
                            if(this._elem)
                                {
                                    if( this._elem.classList.contains( 'lyteHandler1' ) )
                                        {
                                            if( evtt < ( h1left + handler1Client[ width1 ] ) && ( h2left - h1left ) == 0 )
                                                {
                                                    flag = true;
                                                }
                                            else
                                                {   
                                                    if(event.type == 'mousemove' || isTch )
                                                        {
                                                          flag = false
                                                        }
                                                }   
                                        }
                                    else if(this._elem.classList.contains('lyteHandler2'))
                                        {
                                            if( evtt > ( h2left ) && ( h2left - h1left ) == 0 )
                                                {   
                                                    flag=true;
                                                }
                                            else
                                                {
                                                    if(event.type=='mousemove' || isTch )
                                                        {
                                                            flag=false
                                                        }
                                                }   
                                        }
                                }       
                            else
                                {
                                    if(event.type=='mousemove' || isTch )
                                        {
                                            flag=false
                                        }
                                }   
                        }   
                    else
                        {
                            step = this.getData('ltPropDiscrete') ? parseFloat( this.getData( 'ltPropDiscrete' ) ) : 0;
                        }    
                width = evtt - this.rtlfunc.call( this, left1, lyteRangeSlider.getBoundingClientRect(), wwidth );   
                }
            if( this.getData( 'ltPropContent' ).length && event.type == 'click' )
                {
                    if( rangeHandler )
                        {
                            if( parseInt( h2left - h1left ) < 1 / ( this.getData( 'ltPropContent' ).length - 1 ) * this.$node[ ltPropWidth1 ] && evtt < ( h2left + handler2Client[ width1 ]) && evtt > ( h1left + handler1Client[ width1 ] ) )
                                {
                                    flag = false
                                }
                        }
                }       
            var discrete=parseFloat(this.getData('ltPropDiscrete')), lyteSliderHandler= this.$node.querySelector( 'div.lyteSliderHandler' );
            var nodeClientRect = node.getBoundingClientRect(), slideClientRect = lyteSlide.getBoundingClientRect();
            if(this.getData('ltPropDiscrete'))
                {   
                    var widthVal=((width/slideClientRect[width1])*(parseFloat(this.getData('ltPropMax'))-parseFloat(this.getData('ltPropMin')))+parseFloat(this.getData('ltPropMin')));
                    width=this.scroll.call(this,widthVal, slideClientRect[width1]);     
                }
                width=width < slideClientRect[width1] ? width : slideClientRect[width1];
                width=width>0?width:0;  
                left=(width-nodeClientRect[width1]/2);
                left=left>(slideClientRect[width1] -lyteSliderHandler[offsetWidth1]/2) ? slideClientRect[width1] - lyteSliderHandler[offsetWidth1]/2:left;
                left=left>-nodeClientRect[width1]/2?left:-nodeClientRect[width1]/2;
                if( rangeHandler )
                    {
                        if(node.classList.contains('lyteHandler1'))
                            {   
                                if( this.rtlfunc.call( this, offsetLeft1, lyteHandler2 ) < left )
                                    {
                                        flag=false
                                    }
                            }
                        else
                            {
                                if( this.rtlfunc.call( this, offsetLeft1, lyteHandler1 ) > left )
                                    {
                                        flag=false
                                    }
                            }   
                    }
                    // selected node need to be focused for keyboard events
                    node.focus()
                    if(flag)
                        {
                            left1 = this.rtlfunc.call( this, left1 );
                            if( !rangeHandler )
                                {
                                    sliderFill.style[width1]=width+'px';
                                }
                            else
                                {
                                    var leftx, lefty;
                                    if(node.classList.contains( 'lyteHandler1' )) {
                                        lefty = parseInt( lyteHandler2.style[ left1 ] )
                                        var co = this.minMaxCheck( slideClientRect, handler1Client, width1 )
                                        left = Math.min( Math.max( left, co[ 0 ] ), lefty - co[ 1 ] );
                                        leftx = left;
                                    } else {
                                        leftx = parseInt( lyteHandler1.style[ left1 ] )
                                        var co = this.minMaxCheck( slideClientRect, handler1Client, width1, true );
                                        left = Math.max( Math.min( left, co[ 0 ] ), leftx + co[ 1 ]);
                                        lefty = left;
                                    }
                                    var acWid = this.rangeSliderFill.call(this, leftx, lefty, handler1Client [ width1 ]);
                                    sliderFill.style[ left1 ] = acWid.left + 'px';
                                    sliderFill.style[ width1 ] = acWid.width + 'px';

                                }
                            node.style[ left1 ] = left + 'px';  
                        }
                    $L.fastdom.measure(function(){  
                        this.selectedValFind.call(this, slideClientRect, nodeClientRect)    
                    }.bind(this));
            event.stopPropagation();
            event.preventDefault();

            if( event && /mousemove|touchmove/i.test( event.type ) && node.tooltip && node.tooltip.refresh ){
                node.tooltip.refresh( { clientX : Math.max( Math.min( event.clientX, slideClientRect.right ), slideClientRect.left ) }, node.tooltip.tooltipSpan );
            }



        },

        minMaxCheck : function( slideClientRect, handler1Client, width1, flag ){
            var diffVal = this.getData( 'ltPropMinDiff' ) || 0, left1, conv = diffVal * slideClientRect[ width1 ] / ( parseFloat( this.getData( 'ltPropMax' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) );
            if( !flag ) {
                left1 = conv - ( handler1Client[ width1 ] / 2 )
            } else {
                left1 = slideClientRect[ width1 ] - conv - ( handler1Client[ width1 ] / 2 )
            }
            return [ left1, conv ]
        },

        selectedValFind : function(clientRect, nodeClientRect){
                this.setData('preventObs', true)
                if(!this.getData('ltPropRangeHandler'))
                    {
                        if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
                            {
                                this.setData('ltPropValue',this.selectedVal.call(this, clientRect, nodeClientRect,'height').toString());
                            }
                        else
                            {
                                this.setData('ltPropValue',this.selectedVal.call(this, clientRect, nodeClientRect,'width').toString());
                            }
                        this.setData('ltPropSelectedValue1',this.getData('ltPropValue'));   
                    }
                else
                    {
                        if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
                            {
                                this.setData('ltPropMinValue',this.selectedVal.call(this, clientRect, nodeClientRect, 'height', this.$node.querySelector( 'div.lyteHandler1' ), 'top').toString());
                                this.setData('ltPropMaxValue',this.selectedVal.call(this, clientRect, nodeClientRect, 'height', this.$node.querySelector( 'div.lyteHandler2' ),'top').toString());
                            }
                        else
                            {
                                var lt = this.rtlfunc.call( this, 'left' );
                                this.setData('ltPropMinValue', this.selectedVal.call(this, clientRect, nodeClientRect, 'width', this.$node.querySelector( 'div.lyteHandler1' ), lt ).toString());
                                this.setData('ltPropMaxValue',this.selectedVal.call(this, clientRect, nodeClientRect, 'width', this.$node.querySelector( 'div.lyteHandler2' ), lt ).toString());
                            }
                        this.setData('ltPropSelectedValue1',this.getData('ltPropMinValue'));
                        this.setData('ltPropSelectedValue2',this.getData('ltPropMaxValue'));    
                    }   
                this.setData('preventObs', false)
            // }.bind(this))
        },

        initialValueSet : function(width, handlerWidth, value){
            var max = parseFloat( this.getData( 'ltPropMax' ) ), min = parseFloat( this.getData( 'ltPropMin' ) );
            return ( ( ( value - min ) / ( max - min ) * ( width ) ) - ( handlerWidth ) / 2 )
        },
        rangeSliderFill:function(left1, left2, handlerWidth){
            return {width : left2 - left1, left : left1 + handlerWidth / 2 }
        },
        keyCheck:function(event, node,width1,left1,offsetWidth,ltPropWidth){
            // while keydown action
            left1 = this.rtlfunc.call( this, left1 );
            var flag=true, lyteSliderFill = this.$node.querySelector( 'div.lyteSliderFill' ), wwidth = window.innerWidth;
            var nodeClientRect = node.getBoundingClientRect(), left, actWidth = {}, rangeHandler = this.getData('ltPropRangeHandler');
            var thisRect = this.$node.getBoundingClientRect(), fact = 1, handlers = this.$node.querySelectorAll( 'div.lyteSliderHandler' );
            var direction = this.getData('ltPropDirection').indexOf('Horizontal') != -1;
            var step = parseFloat(this.getData('ltPropStep'));
            if( !step ) {
                step = parseFloat( this.getData( 'ltPropMax' ) ) * .1;
            }
            if( this._dir ) {
                if( event.keyCode == 39 && direction ) {
                    fact = -1;
                }
            } else {
                if( event.keyCode == 37 && direction || event.keyCode == 38 && !direction ) {
                    fact = -1
                }
            }

            left = parseFloat( node.style[ left1 ] ) + ( step / ( parseFloat( this.getData( 'ltPropMax' ) ) - parseFloat( this.getData( 'ltPropMin' ) ) ) * thisRect[ width1 ] * fact );
            left  = Math.min( Math.max( -nodeClientRect[ width1 ] / 2, left), thisRect[ width1 ] -nodeClientRect[ width1 ] / 2 )
            if( !rangeHandler ) {
                actWidth.width  =  left + nodeClientRect[ width1 ] / 2 ;
            } else {
                var leftx, lefty;
                if(node == handlers[0]){
                    lefty = parseInt( handlers[ 1 ].style[ left1 ] )
                    var co = this.minMaxCheck( thisRect, nodeClientRect, width1 )
                    left = Math.min( Math.max( left, co[ 0 ] ), lefty - co[ 1 ] );
                    leftx = left;
                } else {
                    leftx = parseInt( handlers[ 0 ].style[ left1 ] )
                    var co = this.minMaxCheck( thisRect, nodeClientRect, width1, true );
                    left = Math.max( Math.min( left, co[ 0 ] ), leftx + co[ 1 ]);
                    lefty = left;
                }
                if( leftx > lefty ) {
                    var currLeft = parseInt( handlers[ 0 ].style[ left1 ] );
                    if( currLeft == lefty ) {
                        return
                    } else {
                        if( event.keyCode == 37 || event.keyCode == 38 ) {
                            lefty = left = leftx;
                        } else if( event.keyCode == 39 || event.keyCode == 40 ) {
                            leftx = left = lefty;
                        }
                    }
                }
                actWidth = this.rangeSliderFill.call(this, leftx, lefty, nodeClientRect[width1]);
            }
            node.style[ left1 ] = left + 'px';
            lyteSliderFill.style[ width1 ] = actWidth.width + 'px';
            if(rangeHandler) {
                lyteSliderFill.style[ left1 ] = actWidth.left + 'px';
            }
            $L.fastdom.measure(function(){
                this.selectedValFind.call(this, thisRect, nodeClientRect)
            }.bind(this))
        },
        mousemove : function(event){
            this._mousemoved = true;
            if(!this._flag ) {
                this._flag = true;
            }
            var left, width, clientX, offsetWidth, offsetWidth, ltPropWidth, offsetLeft;
            if( this.getData( 'ltPropDirection' ).indexOf( 'Horizontal' ) != -1 )
                {
                    left = 'left', width = 'width', clientX = 'clientX', offsetWidth = 'offsetWidth', offsetWidth = 'offsetWidth', ltPropWidth = 'ltPropWidth', offsetLeft = 'offsetLeft';
                }
            else
                {
                    left = 'top', width = 'height', clientX = 'clientY', offsetWidth = 'offsetHeight', offsetWidth = 'offsetHeight', ltPropWidth = 'ltPropHeight', offsetLeft = 'offsetTop';
                }
                this.ScrollCheck.call( this, this._elem, left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                $L.fastdom.measure(function(){
                    if( this.getMethods( 'onChange' ) ) {
                        this.onSelect.call( this ); 
                    }
            }.bind(this))           
        },
        eventListener:function(event, elem){
            var isTch = event.type == "touchstart", evt = isTch ? event.touches[ 0 ] : event, wwidth = window.innerWidth, height, xPos = this.rtlfunc.call( this, 'clientX', evt, wwidth ), lyteRangeSlider = this.$node.querySelector( 'div.lyteRangeSlider' );
            var clientRect = lyteRangeSlider.getBoundingClientRect()
            if( xPos > this.rtlfunc.call( this, 'left', 'clientRect', wwidth ) ) {
                    var width = xPos - this.rtlfunc.call( this, 'left', 'clientRect', wwidth ) - parseFloat( clientRect.width - parseFloat( clientRect.width / 2 ) );
                    if( width > 0 ) {
                            event.preventDefault();
                        }
                }
            else {
                    event.preventDefault();
                }
            var yPos = evt.clientY;
            if( yPos >= clientRect.top ) {
                    height = yPos - clientRect.top - parseFloat( clientRect.height - parseFloat( clientRect.height / 2 ) );
                    if( height > 0 ) {
                        event.preventDefault();
                    }
                }
            else {
                    event.preventDefault();
                }
            this._mousemove = this.mousemove.bind(this);
            this._mouseup = this.mouseup.bind(this);
            this._elem = elem;  
            document.addEventListener( isTch ? "touchmove" : 'mousemove', this._mousemove,true);
            document.addEventListener( isTch ? "touchend" : 'mouseup', this._mouseup, true);
        }, 
        rangeInitialSet:function(offsetWidth,index){
            return ( index / ( this.getData( 'ltPropContent' ).length - 1 ) * this.$node[ offsetWidth ] - this.$node.querySelector( 'div.lyteSliderHandler' )[ offsetWidth ] / 2 );
        },
        didConnect:function(){            
            this.directionObs.call(this)
            this.valueSelected.call(this);
            $L.fastdom.mutate(function(){
                if(this.getMethods('afterRender')){
                   /**
                    * @method afterRender
                    * @version 1.0.1
                    */
                    this.executeMethod('afterRender', this.$node);
                }
            }.bind(this))   
        },
        valueSelected : function(){
            if(this.getData('ltPropRangeHandler'))
                {
                    this.setData('ltPropSelectedValue1', this.getData('ltPropMinValue'));
                    this.setData('ltPropSelectedValue2', this.getData('ltPropMaxValue'));
                }
            else
                {
                    this.setData('ltPropSelectedValue1', this.getData('ltPropValue'));
                }   
        },
        mouseup : function(event){
            var handler= this.$node.querySelector( 'div.lyteRangeSlider' ), isTch = event.type == "touchend";
            document.removeEventListener( isTch ? "touchmove" : 'mousemove', this._mousemove,true);
            document.removeEventListener( isTch ? "touchend" : 'mouseup', this._mouseup, true);
            delete this._mousemove; delete this._mouseup;
            delete this._elem;
            if( this.$node.contains( event.correspondingElement || event.target ) ) {
                this._prevclick = true;
            }
            if( this._mousemoved ){
                $L.fastdom.measure( this.onSelect.bind( this, true ) ); 
            }
            delete this._mousemoved;
        },

        data:function(){
            return {
                divLength:Lyte.attr("array",{"default":[]}),
                scaleVal:Lyte.attr("array",{"default":[]}),
                /**
                 * @componentProperty {string} ltPropMin=0
                 * @version 1.0.0
                 */
                ltPropMin:Lyte.attr("string",{"default":'0'}),
                /**
                 * @componentProperty {string} ltPropMax=''
                 * @version 1.0.0
                 */
                ltPropMax:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropScaleInterval=''
                 * @version 1.0.0
                 */
                ltPropScaleInterval:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropStep=''
                 * @version 1.0.0
                 */
                ltPropStep:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {lyteArrow | lyteArrowLeft | lyteCircle | lyteSquare} ltPropHandler=lyteArrow
                 * @version 1.0.0
                 */
                ltPropHandler:Lyte.attr("string",{"default":'lyteArrow'}),
                /**
                 * @componentProperty {lyteHorizontal | lyteVertical} ltPropDirection=lyteHorizontal
                 * @version 1.0.0
                 */
                ltPropDirection:Lyte.attr("string",{"default":'lyteHorizontal'}),
                /**
                 * @componentProperty {string} ltPropWidth=''
                 * @version 1.0.0
                 */
                ltPropWidth:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {colorString} ltPropFillColor=''
                 * @version 1.0.0
                 */
                ltPropFillColor:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {colorString} ltPropNonFillColor=''
                 * @version 1.0.0
                 */
                ltPropNonFillColor:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropHeight=''
                 * @version 1.0.0
                 */
                ltPropHeight:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropValue=''
                 * @version 1.0.0
                 */
                ltPropValue:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropDiscrete=''
                 * @version 1.0.0
                 */
                ltPropDiscrete:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string[]} ltPropContent
                 * @default []
                 * @version 1.0.0
                 */
                ltPropContent:Lyte.attr("array",{"default":[]}),
                /**
                 * @componentProperty {string} ltPropRangeHandler=false
                 * @version 1.0.0
                 */
                ltPropRangeHandler:Lyte.attr("boolean",{"default": false}),
                /**
                 * @componentProperty {string} ltPropMinValue=''
                 * @version 1.0.0
                 */
                ltPropMinValue:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropMaxValue=''
                 * @version 1.0.0
                 */
                ltPropMaxValue:Lyte.attr("string",{"default":''}),
                /**
                 * @componentProperty {string} ltPropDisabled=false
                 * @version 1.0.0
                 */
                ltPropDisabled:Lyte.attr("boolean",{"default": false}),
                /**
                 * @componentProperty {string} ltPropSelectedValue1=''
                 * @version 1.0.0
                 */
                ltPropSelectedValue1 : Lyte.attr('string', {default : ''}),
                /**
                 * @componentProperty {string} ltPropSelectedValue2=''
                 * @version 1.0.0
                 */
                ltPropSelectedValue2 : Lyte.attr('string', {default : ''}),
                /**
                 * @componentProperty {string} ltPropYield=false
                 * @version 1.0.0
                 */
                ltPropYield : Lyte.attr('boolean', {default : false}),
                /**
                 * @componentProperty {string} ltPropTooltipStyle=''
                 * @version 1.0.2
                 */
                ltPropTooltipStyle : Lyte.attr('string', { default : ''}),
                /**
                 * @componentProperty {string} ltPropTooltip=''
                 * @version 1.0.2
                 */
                ltPropTooltip : Lyte.attr( 'boolean', { default : true}),
                /**
                 * @componentProperty {string} ltPropScaleUnit=''
                 * @version 1.0.2
                 */
                ltPropScaleUnit : Lyte.attr( 'string' , { default : '' } ),
                /**
                 * @componentProperty {string} ltPropTooltipClass=''
                 * @version 1.0.2
                 */
                ltPropTooltipClass : Lyte.attr('string', { default : ''}),
                
                /**
                 * @typedef {object} sliderConfig
                 * @property {number} margin=5
                 * @property {left | right | top | bottom | topright | bottomright | topleft | bottomleft} position=top
                 * @property {box | callout} appearance=callout
                 * @property {number} showdelay=0
                 * @property {number} hidedelay=0
                 * @property {number} maxdisplaytime=5000
                 * @property {boolean} keeptooltip=false
                 */

                /**
                 * @componentProperty {sliderConfig} ltPropTooltipConfig
                 * @default {}
                 * @version 1.0.2
                 */
                ltPropTooltipConfig : Lyte.attr('object'),
                /**
                 * @componentProperty {number} ltPropMinDiff=0
                 * @version 1.0.2
                 */
                ltPropMinDiff : Lyte.attr( 'number', { default : 0 } ),
                /**
                 * @componentProperty {number} ltPropDigits=2
                 * @version 1.0.8
                 */
                ltPropDigits : Lyte.attr( 'number', { default : 2 } ),

                //system data
                preventObs : Lyte.attr('boolean', { default : false})
            }
        },
        actions:{
            "click":function(event){
                    if( this._prevclick ){      
                        delete this._prevclick;     
                        return;     
                    }
                    var left = 'left', width = "width", clientX = 'clientX', offsetWidth = 'offsetWidth', ltPropWidth = 'ltPropWidth', offsetLeft = 'offsetLeft', wwidth = window.innerWidth;
                    if(this.getData('ltPropDirection').indexOf('Horizontal')==-1)
                        {
                            left = 'top', width = "height", clientX = 'clientY', offsetWidth = 'offsetHeight', ltPropWidth = 'ltPropHeight', offsetLeft = 'offsetTop'
                        }
                    if(!this.getData('ltPropRangeHandler'))
                        {
                            this.ScrollCheck.call(this, this.$node.querySelector( 'div.lyteSliderHandler' ), left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                        }
                    else
                        {
                            var YPos= this.rtlfunc.call( this, clientX, event, wwidth );
                            var node1= this.$node.querySelector( 'div.lyteHandler1' )
                            var node2= this.$node.querySelector( 'div.lyteHandler2' )
                            var node1client = node1.getBoundingClientRect(), node2client = node2.getBoundingClientRect();
                            if( Math.abs( this.rtlfunc.call( this, left, node1client, wwidth ) - this.rtlfunc.call( this, left, node2client, wwidth ) ) > 0 )
                                {
                                    if(this.rtlfunc.call( this, left, node1client, wwidth ) + node1client[ width ] + Math.abs(this.rtlfunc.call( this, left, node1client, wwidth ) - this.rtlfunc.call( this, left, node2client, wwidth ) ) / 2 < YPos )
                                        {
                                            this.ScrollCheck.call(this,node2,left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                                        }
                                    else if(this.rtlfunc.call( this, left, node1client, wwidth ) + node1client[ width ] + Math.abs(this.rtlfunc.call( this, left, node1client, wwidth ) - this.rtlfunc.call( this, left, node2client, wwidth ) ) / 2 != YPos )
                                        {
                                            this.ScrollCheck.call(this,node1,left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                                        }   
                                }
                            else if( this.rtlfunc.call( this, left, node1client, wwidth ) == this.rtlfunc.call( this, left, node2client, wwidth ) )     
                                {   
                                    if( YPos < this.rtlfunc.call( this, left, node1client, wwidth ) )   
                                        {
                                            this.ScrollCheck.call(this,node1,left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                                        }
                                    else
                                        {
                                            this.ScrollCheck.call(this,node2,left, width, clientX, offsetWidth, ltPropWidth, offsetLeft, event);
                                        }   
                                }
                        }
                    $L.fastdom.measure(function(){
                        this.onSelect.call(this, true); 
                    }.bind(this))
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
            },

            keydown : function( evt ){
                var keycode = evt.keyCode || evt.which,
                data = this.data,
                is_hori = /horizontal/i.test( data.ltPropDirection ),
                discrete = data.ltPropDiscrete;

                if( !/^37|38|39|40$/.test( keycode ) || ( /^37|39$/.test( keycode ) && !is_hori ) || ( /^38|40$/.test( keycode ) && is_hori ) ){
                    return;
                }

                if( discrete ){
                    this.setData( 'ltPropStep', discrete );
                }

                var node = evt.target,
                width = 'width',
                left = 'left',
                offsetWidth = 'offsetWidth',
                ltPropWidth = 'ltPropWidth';

                if( !is_hori ){
                    width = 'height';
                    left = 'top';
                    offsetWidth = "offsetHeight";
                    ltPropWidth = 'ltPropHeight';
                }

                if( !data.ltPropRangeHandler ){
                    node = this.$node.querySelector( 'div.lyteSliderHandler' );
                }
                this.keyCheck( evt, node, width, left, offsetWidth, ltPropWidth );

                $L.fastdom.mutate( this.onSelect.bind( this, true ) );
                evt.stopPropagation();
                evt.stopImmediatePropagation();
                evt.preventDefault();
            },

            "mousedown" : function( evt , elem) {
                if( evt.button == 2 ){
                    return;
                }
                this.eventListener.call(this, evt, elem)
            }
        }
    });

/**
 * @syntax nonYielded
 * <lyte-slider lt-prop-min="0" lt-prop-max="100" lt-prop-discrete="15" lt-prop-value="45" lt-prop-direction="lyteHorizontal" lt-prop-handler="lyteArrow" ></lyte-slider>
 */

 /**
  * @syntax yielded
  * <lyte-slider lt-prop-max = '100' lt-prop-width='600px' lt-prop-value = '50' lt-prop-discrete = '20' lt-prop-yield = true> 
  *    <template is = "registerYield" yield-name = "yield"> 
  *        <div class="lyteScaleOption"> 
  *            <span class="lyteScaleLine" style="left:0%"> 
  *                <span></span> 
  *                <span class="lyteScaleLabel">0</span> 
  *            </span> 
  *            <span class="lyteScaleLine" style="left:50%"> 
  *                <span></span> 
  *                <span class="lyteScaleLabel">50</span> 
  *            </span> 
  *            <span class="lyteScaleLine" style="left:100%"> 
  *                <span></span> 
  *                <span class="lyteScaleLabel">100</span> 
  *            </span> 
  *        </div> 
  *    </template> 
  *  </lyte-slider> 
  */
