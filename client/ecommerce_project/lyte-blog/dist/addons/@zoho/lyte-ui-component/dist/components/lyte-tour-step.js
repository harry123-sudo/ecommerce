/**
 * Renders a tour step component
 * @component lyte-tour-step
 * @version 3.1.0
 * @methods onChange, onBeforeChange
 */

Lyte.Component.register("lyte-tour-step", {
_template:"<template tag-name=\"lyte-tour-step\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <lyte-wormhole case=\"true\" lt-prop-query=\".lyteTourContainer\"> <template is=\"registerYield\" yield-name=\"lyte-content\"> <div class=\"lyteTourStep\"> <lyte-yield yield-name=\"lyteTourStep\"></lyte-yield> </div> </template> </lyte-wormhole> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"insertYield","position":[1,1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropBindToBody","ltPropSelector","ltPropClickable","ltPropArrowPosition","ltPropPosition","ltPropScrollToView","arrowPositionOnBox","initialArrowFlag"],
	data : function(){
		return {
			'ltPropBindToBody' 	: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {string} ltPropSelector
			 */

			'ltPropSelector'	 	: Lyte.attr('string'),
			'ltPropClickable'		: Lyte.attr('boolean' , { default : false }),

			/**
			 * @componentProperty {start | end |center} ltPropArrowPosition
			 * @default start
			 */

			'ltPropArrowPosition'	: Lyte.attr('string' , { default : 'start' }), //start , end , center

				/**
			 * @componentProperty {right|left|top|bottom} ltPropPosition
			 * @default right
			 * @options right , left , top , bottom
			 */

			'ltPropPosition'		: Lyte.attr('string' , { default : 'right' }), // right , left , top , bottom
			'ltPropScrollToView': Lyte.attr('boolean' , { default : false }),

			'arrowPositionOnBox': Lyte.attr('string' , {default : 'left'}),
			'initialArrowFlag'	: Lyte.attr('boolean' , {default : false})
		}
	},

	startLyteStep : function( th ){

		var _this = th.component;

		var parentTour = $L(this.$node).closest('lyte-tour')[0]

		// FIX: Maybe this is a different function
		if(this.getData('ltPropPosition') === 'right'){
			this.setData('arrowPositionOnBox' , 'left');
		} else if(this.getData('ltPropPosition') === 'left'){
			this.setData('arrowPositionOnBox' , 'right');
		} else if(this.getData('ltPropPosition') === 'top'){
			this.setData('arrowPositionOnBox' , 'bottom');
		} else if(this.getData('ltPropPosition') === 'bottom'){
			this.setData('arrowPositionOnBox' , 'top');
		}

		// FIX: Not sure if the th. should be there. Maybe it needs to be just this.
		th.setData('ltPropBindToBody' , true);

		// FIX: Global selector - This and the next statement must be a single function -> this.changeActiveStep()
		if($L('.lyteTourActiveTarget').length){
			$L('.lyteTourActiveTarget').removeClass('lyteTourActiveTarget');
		}

		var currentStepTarget = $L(this.getData('ltPropSelector'))[0];

		if(parentTour.getData('ltPropCreateDummy')){

			var tar = $L(this.getData('ltPropSelector'))[0]
			var body = $L('body')[0]
			var selectorString = this.getData('ltPropSelector').split(".")[1]

			var dummy;
			var dummyWrap;

			if($L(this.getData('ltPropSelector')+"Dummy").length){
				dummy = $L(this.getData('ltPropSelector')+"Dummy")[0]
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
			} else {
				dummy = tar.cloneNode(true)
				dummy.classList.add("lyteTourResetSpacing")
				dummy.classList.add("lyteTourActiveTarget")
				dummy.classList.add("lyteTourDummyTarget")
				dummy.classList.add(selectorString+"Dummy")
			}

			var tourWrap = $L('.lyteTourWrap')[0]



			if($L('.lyteTourDummyWrap').length){
				dummyWrap = $L('.lyteTourDummyWrap')[0]
			} else {
				 dummyWrap = document.createElement('DIV')
				 dummyWrap.setAttribute("class" , "lyteTourDummyWrap");
			}


			var tarDim = tar.getBoundingClientRect();
			var border = getComputedStyle(tar).borderRadius;

			dummy.style.position = "absolute";
			dummy.style.top = tarDim.top + "px";
			dummy.style.left = tarDim.left + "px";
			dummy.style.width = tarDim.width + "px";
			dummy.style.height = tarDim.height + "px";

			body.appendChild(dummyWrap)
			dummyWrap.appendChild(dummy)
			currentStepTarget = dummy;
		}



		// FIX: global selector
		$L('.lyteTourStep')[0].classList.add('lyteTourActiveStep');

		// FIX: Global selector can cause problem
		var lyteTourContainer = $L('.lyteTourContainer')[0];
		var stepData = lyteTourContainer.getBoundingClientRect();

		// FIX: Reuse get bounding client rects - no need to invoke them again
		var cs_top = stepData.top,
				cs_bottom = stepData.bottom,
				cs_right = stepData.right,
				cs_left = stepData.left,
				cs_height = stepData.height,
				cs_width = stepData.width;

		var currentStepTargetDim = currentStepTarget.getBoundingClientRect();

		var cst_top = currentStepTargetDim.top,
				cst_bottom = currentStepTargetDim.bottom,
				cst_right = currentStepTargetDim.right,
				cst_left = currentStepTargetDim.left,
				cst_height = currentStepTargetDim.height,
				cst_width = currentStepTargetDim.width;

		var deviation = 12;

		var backDiv = $L('.lyteTourTargetBackground');

		currentStepTarget.classList.add('lyteTourActiveTarget')

		backDiv.css({
			'width' : currentStepTargetDim.width,
			'height' : currentStepTargetDim.height,
			'top' :  currentStepTargetDim.top,
			'left' :  currentStepTargetDim.left
		})

		var tourNewTop;
		var arrowNewTop;

		var initialArrowFlag = false;

		var tourMidHeight = lyteTourContainer.getBoundingClientRect().height / 2;
		var targetMidHeight = currentStepTarget.getBoundingClientRect().top + (currentStepTarget.getBoundingClientRect().height / 2);
		var tourMidWidth = lyteTourContainer.getBoundingClientRect().width / 2;
		var targetMidWidth = currentStepTarget.getBoundingClientRect().left + (currentStepTarget.getBoundingClientRect().width / 2);

		var lyteTourArrow = $L('.lyteTourArrow')[0];

		lyteTourArrow.style.transform = "rotate(45deg)"


		var arrowData = lyteTourArrow.getBoundingClientRect();


		function arrowTranslate( placement , side){
			var returnVal = {};
			var arrowRotateVal = 45;
			var arrowUserPref = _this.getData('ltPropArrowPosition');

			if(!placement){
				placement = _this.getData('ltPropArrowPosition');
			}
			if(!side){
				side = _this.getData('arrowPositionOnBox');
			}

			switch ( side ){

				case 'left':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourLeftArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'top':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourTopArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'right':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourRightArrow').addClass('lyteTourDefaultArrow');

				break;

				case 'bottom':

				$L('.lyteTourDefaultArrow').removeClass('lyteTourDefaultArrow');
				$L('.lyteTourBottomArrow').addClass('lyteTourDefaultArrow');

				break;

			}

			lyteTourArrow = $L('.lyteTourDefaultArrow')[0];
			arrowData = lyteTourArrow.getBoundingClientRect();



			var arrowPlacement = side + (placement.charAt(0).toUpperCase() + placement.slice(1));

			var arrowNewX = -(arrowData.width/2),
					arrowNewY = ((Math.sqrt(2)*arrowData.width - arrowData.width)/2) + 20 ;

			var test = setArrowPosition(arrowPlacement);

			arrowNewX = test.xValue;
			arrowNewY = test.yValue;

			returnVal.arrowVal = "translate(" + arrowNewX + " ," + arrowNewY + ") rotate("+ 45 +"deg)";

			return returnVal;

		}

		function setArrowPosition( placement ){

			var arrowXVal , arrowYVal;
			var retVal = {};

			$L('.lyteTourArrow').css({
				'transform' : 'rotate(45deg)'
			})

			var arrowDia = _this.$node.closest('lyte-tour').getData('arrowDiagonalLength');

			var arrowDis = ((cst_height - arrowDia)/2) + deviation

				switch ( placement ){

					case 'leftStart':
					arrowXVal = '-50%';
					arrowYVal = arrowDis + "px";
					break;

					case 'leftCenter':
					arrowXVal = '-50%';
					arrowYVal = ((cs_height - arrowDis)/2)+"px";
					break;

					case 'leftEnd':
					arrowXVal = '-50%';
					arrowYVal = (cs_height - arrowDis - arrowDia) + "px";
					break;

					case 'topStart':
					arrowXVal = arrowDis + "px";
					arrowYVal = '-50%';
					break;

					case 'topCenter':
					arrowXVal = ((cs_width - arrowDia)/2)+"px";
					arrowYVal = '-50%';
					break;

					case 'topEnd':
					arrowXVal = (cs_width - arrowDis - arrowDia)+"px";
					arrowYVal = '-50%';
					break;

					case 'rightStart':
					arrowXVal = '50%';
					arrowYVal = arrowDis + "px";
					break;

					case 'rightCenter':
					arrowXVal = '50%';
					arrowYVal = ((cs_height - arrowDia)/2)+"px";
					break;

					case 'rightEnd':
					arrowXVal = '50%';
					arrowYVal = (cs_height - arrowDis - arrowDia)+"px";
					break;

					case 'bottomStart':
					arrowXVal = arrowDis + "px";
					arrowYVal =  '50%';
					break;

					case 'bottomCenter':
					arrowXVal = ((cs_width - arrowDia)/2)+"px";
					arrowYVal = '50%';
					break;

					case 'bottomEnd':
					arrowXVal = (cs_width - arrowDis - arrowDia)+"px";
					arrowYVal = '50%';
					break;


				}

				retVal.xValue = arrowXVal;
				retVal.yValue = arrowYVal;

				return retVal;

		}

		function setArrowStyle(placement , side){
			var arrowTransVal = arrowTranslate( placement , side );

			if(!($L('lyte-tour')[0].component.getData('ltPropFixedArrow'))){
				$L('.lyteTourArrow').css({
					'transform' : arrowTransVal.arrowVal
				})
				initialArrowFlag = true;
			}
		}

		function stepTranslate(){

			var userPref = _this.getData('ltPropPosition');
			var stepNewX = 10 , stepNewY = 10;
			var returnVal = {};
			var arrowPlace = _this.getData('ltPropArrowPosition');
			var arrow = $L('.lyteTourArrow')[0];
			var arrowDia = _this.$node.closest('lyte-tour').getData('arrowDiagonalLength');

			var setArrowPos = _this.getData('ltPropArrowPosition');
			var setArrowSide = _this.getData('ltPropPosition');

			var windowWidth = window.innerWidth;
			var windowHeight = window.innerHeight;

			switch(userPref){

				case 'right':

				stepNewX = cst_right + arrowDia;
				stepNewY = cst_top - deviation;

				if(setArrowPos === "center"){
					stepNewY = cst_top + (cst_height - cs_height)/2
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				setArrowSide = "left"

				if((cst_right + cs_width) > windowWidth){
					stepNewX = cst_left  - (cs_width + arrowDia)
					setArrowSide = "right"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				setArrowStyle(setArrowPos , setArrowSide);

				break;

				case 'left' :

				stepNewX = cst_left - (cs_width + arrowDia)
				stepNewY = cst_top - deviation;

				setArrowSide = "right"

				if(setArrowPos === "center"){
					stepNewY = cst_top + (cst_height - cs_height)/2
					deviation = 0;
				}
				if(setArrowPos === "end"){
					stepNewY = cst_top  - cs_height + cst_height + deviation
				}

				if(cst_left < cs_width){
					stepNewX = cst_right + arrowDia;
					setArrowSide = "left"
				}
				if((cst_top + cs_height) > windowHeight){
					stepNewY = cst_top  - cs_height + cst_height
					deviation = 0;
					setArrowPos = "end";
				}
				if(stepNewY <= 0){
					stepNewY = cst_top;
					deviation = 0;
					setArrowPos = "start";
				}

				setArrowStyle(setArrowPos , setArrowSide);

				break;


				// The same applies for these to case blocks
				case 'top':

				stepNewY = cst_top - (cs_height + arrowDia);
				stepNewX = cst_left - deviation

				setArrowSide = "bottom"

				if(setArrowPos === "center"){
					stepNewX = cst_left + (cst_width - cs_width)/2
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left  - cs_width + cst_width + deviation
				}

				if(cst_top < cs_height){
					stepNewY = cst_bottom + arrowDia;
					setArrowSide = "top"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left  - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				setArrowStyle(setArrowPos , setArrowSide);

				break;

				case 'bottom':

				stepNewX = cst_left - deviation;
				stepNewY = cst_bottom + arrowDia;

				setArrowSide = "top"

				if(setArrowPos === "center"){
					stepNewX = cst_left + (cst_width - cs_width)/2
					deviation = 0
				}
				if(setArrowPos === "end"){
					stepNewX = cst_left - cs_width + cst_width + deviation
				}

				if((cst_bottom + cs_height) > windowHeight){
					stepNewY = cst_top - (cs_height + arrowDia)
					setArrowSide = "bottom"
				}
				if((cst_left + cs_width) > windowWidth){
					stepNewX = cst_left - cs_width + cst_width
					deviation = 0
					setArrowPos = "end";
				}
				if(stepNewX <= 0){
					stepNewX = cst_left;
					deviation = 0
					setArrowPos = "start";
				}

				setArrowStyle(setArrowPos , setArrowSide);

				break;

			}

			returnVal.stepNewX = stepNewX
			returnVal.stepNewY = stepNewY
			returnVal.stepVal = "translate(" + stepNewX + "px ," + stepNewY + "px)";

			return returnVal;

		}

		var stepTranslateVal = stepTranslate();

		$L('.lyteTourContainer').css({
			'transform' : stepTranslateVal.stepVal
		})

		this.executeMethod('onChange')

	},
	methods : {
		onChange : function(){},
		onBeforeChange : function(){}
	}
});
