/**
 * Renders a resizeable rows and columns
 * @component lyte-splitter
 * @version 2.2.0
 * @methods onResizeEnd
 */


Lyte.Component.register("lyte-splitter", {
_template:"<template tag-name=\"lyte-splitter\"> <lyte-yield yield-name=\"splitter\"></lyte-yield> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1]}],
_observedAttributes :["ltPropResize","ltPropCollapsible","columnElementCount","rowElementCount"],
	data : function(){
		return {

			/**
			 * @componentProperty {boolean} ltPropResize
			 * @default true
			 *
			 */

			ltPropResize : Lyte.attr('boolean' , {
				default : true
			}),

			/**
			 * @componentProperty {boolean} ltPropCollapsible
			 * @default true
			 *
			 */

			ltPropCollapsible : Lyte.attr('boolean' , {
				default : true
			}),
			columnElementCount : Lyte.attr('number' , {
				default : 0
			}),
			rowElementCount : Lyte.attr('number' , {
				default : 0
			})
		}
	}
});

/**
 * @customElement lyte-row-splitter
 */

if(!_lyteUiUtils.registeredCustomElements['lyte-row-splitter']){

	_lyteUiUtils.registeredCustomElements['lyte-row-splitter'] = true

		Lyte.createCustomElement('lyte-row-splitter',{
			constructor : function(){},
			static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
		});

	}

	/**
	 * @customElement lyte-column-splitter
	 */

	if(!_lyteUiUtils.registeredCustomElements['lyte-column-splitter']){

		_lyteUiUtils.registeredCustomElements['lyte-column-splitter'] = true

			Lyte.createCustomElement('lyte-column-splitter',{
				constructor : function(){},
				static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
			});

		}

		/**
		 * @customElement lyte-row-element
		 */

		if(!_lyteUiUtils.registeredCustomElements['lyte-row-element']){

			_lyteUiUtils.registeredCustomElements['lyte-row-element'] = true

			Lyte.createCustomElement('lyte-row-element',{
				constructor : function(){
					var splitterComponent = $L(this).closest('lyte-splitter').get(0);
					var splitterRow = $L(this).closest('lyte-row-splitter').get(0);

					var currentParent = this.parentElement;
					var lyteRowElements = currentParent.querySelectorAll('lyte-row-element');
					var lastRowElement = currentParent.children[currentParent.children.length-1];

					// var lyteRowElementsAr = Object.values(lyteRowElements);
					var lyteRowElementsAr = Object.keys(lyteRowElements).map(function(e) {
						return lyteRowElements[e]
					})

					var currentIndex = lyteRowElementsAr.indexOf(this);

					var rowElements = $L(splitterRow).find('lyte-row-element');

					if((!(lastRowElement == this))&&(this.getAttribute('lt-prop-resize')!=="false")){
						if(lyteRowElementsAr[currentIndex+1]){
							if(lyteRowElementsAr[currentIndex+1].getAttribute('lt-prop-resize')!=="false"){
								var rowHandle  = document.createElement("LYTE-ROW-HANDLE");
								currentParent.insertBefore(rowHandle, this.nextSibling);
							}
						}
					}
					if(lastRowElement == this){
						var remainingWidthPercent = 0;
						var filteredRowElements = $L(splitterRow).children( 'lyte-row-element' ).filter( function( index, item ) {

							if( item.hasAttribute('lt-prop-size') ) {
								var ltSize = item.getAttribute('lt-prop-size')
								var sizeValue = parseInt(item.getAttribute('lt-prop-size').match(/\d+/g));
								if(ltSize.indexOf('%') !== -1){
									item.style.flexBasis = ltSize;
									remainingWidthPercent = remainingWidthPercent + sizeValue;
									return false;
								}
							}
							return true;
						})
						var handleCount = $L(this).parent().children('lyte-row-handle').length;
						var elementCount = filteredRowElements.length;

						var rowSplitterSpace = (currentParent.getBoundingClientRect().height - (handleCount*8));
						var remainingWidth = rowSplitterSpace - ((remainingWidthPercent/100) * rowSplitterSpace);
						var percent = remainingWidth/elementCount;
						var flexBasis = ((percent / (rowSplitterSpace)) * 100)+"%";
						filteredRowElements.css('flexBasis' , flexBasis)
					}
				},
				static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
			})

		}


		/**
		 * @customElement lyte-column-element
		 */



		if(!_lyteUiUtils.registeredCustomElements['lyte-column-element']){

			_lyteUiUtils.registeredCustomElements['lyte-column-element'] = true

		Lyte.createCustomElement('lyte-column-element',{
			constructor : function(){
				var splitterComponent = $L(this).closest('lyte-splitter').get(0);
				var splitterColumn = $L(this).closest('lyte-column-splitter').get(0);

				var currentParent = this.parentElement;
				var lyteColumnElements = currentParent.querySelectorAll('lyte-column-element');
				var lastColumnElement = currentParent.children[currentParent.children.length-1];

				// var lyteColumnElementsAr = Object.values(lyteColumnElements);
				var lyteColumnElementsAr = Object.keys(lyteColumnElements).map(function(e) {
					return lyteColumnElements[e]
				})

				var currentIndex = lyteColumnElementsAr.indexOf(this);

				// var columnElements = $L(splitterColumn).find('lyte-column-element');
				var columnElements = $L(this).parent().children('lyte-column-element');

				if((!(lastColumnElement == this))&&(this.getAttribute('lt-prop-resize')!=="false")){

					if(lyteColumnElementsAr[currentIndex+1]){
						if(lyteColumnElementsAr[currentIndex+1].getAttribute('lt-prop-resize')!=="false"){
							var columnHandle  = document.createElement("LYTE-COLUMN-HANDLE");
							currentParent.insertBefore(columnHandle, this.nextSibling);
						}
					}
				}
				if(lastColumnElement == this){
					var remainingWidthPercent = 0;
					var filteredColumnElements = $L(splitterColumn).children( 'lyte-column-element' ).filter( function( index, item ) {

						if( item.hasAttribute('lt-prop-size') ) {
							var ltSize = item.getAttribute('lt-prop-size')
							var sizeValue = parseInt(item.getAttribute('lt-prop-size').match(/\d+/g));
							if(ltSize.indexOf('%') !== -1){
								item.style.flexBasis = ltSize;
								remainingWidthPercent = remainingWidthPercent + sizeValue;
								return false;
							}
						}
						return true;
					})
					var handleCount = $L(this).parent().children('lyte-column-handle').length;
					var elementCount = filteredColumnElements.length;
					var columnSplitterSpace = (currentParent.getBoundingClientRect().width - (handleCount*8));
					var remainingWidth = columnSplitterSpace - ((remainingWidthPercent/100) * columnSplitterSpace);
					var percent = remainingWidth/elementCount;
					var flexBasis = ((percent / (columnSplitterSpace)) * 100)+"%";
					filteredColumnElements.css('flexBasis' , flexBasis)

				}
			},
			static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
		})

}

/**
 * @customElement lyte-row-handle
 */



if(!_lyteUiUtils.registeredCustomElements['lyte-row-handle']){

	_lyteUiUtils.registeredCustomElements['lyte-row-handle'] = true


		Lyte.createCustomElement('lyte-row-handle',{
			connectedCallback : function(){
				var columnHandleIcon = document.createElement('DIV');
				columnHandleIcon.setAttribute('class' , 'rowHandleIcon');
				this.appendChild(columnHandleIcon);
			},
			constructor : function(){

				var lyteRowRe = this;
				var currentParent,currentIndex,prevSplitterRow,nextSplitterRow,currentIndex;
				var oldClientY;
				var prevSplitterRowBasis;
				var nextSplitterRowBasis;
				var splitterComponent;
				var prevEleMinSize = 0;
				var nextEleMinSize = 0;
				lyteRowRe.addEventListener('mousedown' , resizeFun);
				function resizeFun(event){
					// lyteRowRe.style.background = "red";
					lyteRowRe.classList.add('splitResizing');
					splitterComponent = $L(this).closest('lyte-splitter').get(0);
					splitterComponentRow = $L(this).closest('lyte-row-splitter').get(0);
					currentParent = lyteRowRe.parentElement;
					// childArray = Object.values(currentParent.children);
					childArray = Object.keys(currentParent.children).map(function(e){
						return currentParent.children[e]
					})
					currentIndex = childArray.indexOf(lyteRowRe);
					prevSplitterRow = childArray[currentIndex-1];
					nextSplitterRow = childArray[currentIndex+1];
					oldClientY = event.clientY;
					$L(this).parent().children('lyte-row-element').css('flexGrow',0);
					if(!getComputedStyle(prevSplitterRow).flexBasis){
						prevSplitterRow.style.flexBasis = (((100/currentParent.querySelectorAll('lyte-row-element').length)-1)/2) + "%";
					}
					if((!getComputedStyle(nextSplitterRow).flexBasis)||(getComputedStyle(nextSplitterRow).flexBasis === "auto")){
						nextSplitterRow.style.flexBasis = (((100/currentParent.querySelectorAll('lyte-row-element').length))/($L('lyte-row-element').length - 2)) + "%";
					}
					prevSplitterRow.style.flexGrow = nextSplitterRow.style.flexGrow = 0;
					oldClientY = event.clientY;
					prevSplitterRowBasis = parseFloat(getComputedStyle(prevSplitterRow).flexBasis);
					nextSplitterRowBasis = parseFloat(getComputedStyle(nextSplitterRow).flexBasis);
					if(prevSplitterRow.hasAttribute('lt-prop-min-size')){
						prevEleMinSize = parseFloat(prevSplitterRow.getAttribute('lt-prop-min-size'));
					}
					if(nextSplitterRow.hasAttribute('lt-prop-min-size')){
						nextEleMinSize = parseFloat(nextSplitterRow.getAttribute('lt-prop-min-size'));
					}
					splitterComponent.addEventListener('mousemove' , adjustFun);
					splitterComponent.addEventListener('mouseup' , removeFun);
				}
				function adjustFun(event){
					var clientYchange = oldClientY - event.clientY;
					var availableSpace = (currentParent.getBoundingClientRect().height - ($L(lyteRowRe).parent().children('lyte-row-handle').length * 8));
					var percentDiff = ((clientYchange / availableSpace)*100);

					if(((prevSplitterRowBasis - percentDiff) >= prevEleMinSize) && ((nextSplitterRowBasis + percentDiff) >= nextEleMinSize)){
						prevSplitterRow.style.flexBasis = (prevSplitterRowBasis - percentDiff) + "%";
						prevSplitterRow.setAttribute('lt-prop-size' , ((prevSplitterRowBasis - percentDiff) + "%"));
						nextSplitterRow.style.flexBasis = (nextSplitterRowBasis + percentDiff) + "%";
						nextSplitterRow.setAttribute('lt-prop-size' , ((nextSplitterRowBasis + percentDiff) + "%"))
					} else {
						if(((prevSplitterRowBasis - percentDiff) < (prevEleMinSize+1))){
							nextSplitterRow.style.flexBasis = ((prevSplitterRowBasis + nextSplitterRowBasis)-prevEleMinSize) + "%";
							nextSplitterRow.setAttribute('lt-prop-size' , (((prevSplitterRowBasis + nextSplitterRowBasis)-prevEleMinSize) + "%"))
							prevSplitterRow.style.flexBasis = prevEleMinSize + "%";
							prevSplitterRow.setAttribute('lt-prop-size' , (prevEleMinSize+"%"))
						} else if(((nextSplitterRowBasis + percentDiff) < (nextEleMinSize+1))){
							prevSplitterRow.style.flexBasis = ((prevSplitterRowBasis + nextSplitterRowBasis)-nextEleMinSize) + "%";
							prevSplitterRow.setAttribute('lt-prop-size' , (((prevSplitterRowBasis + nextSplitterRowBasis)-nextEleMinSize) + "%"));
							nextSplitterRow.style.flexBasis = nextEleMinSize + "%";
							nextSplitterRow.setAttribute('lt-prop-size' , (nextEleMinSize+"%"));
						}
					}
				}
				function removeFun(){
					// lyteRowRe.style.background = "#ddd";
					lyteRowRe.classList.remove('splitResizing');
					splitterComponent.removeEventListener('mousemove' , adjustFun);
					splitterComponent.removeEventListener('mouseup' , removeFun);

					var prevId = prevSplitterRow.getAttribute('lt-prop-splitter-id');
					var nextId = nextSplitterRow.getAttribute('lt-prop-splitter-id');

					var returnData = {};
					returnData[prevId] = {
						'element' : prevSplitterRow,
						'size' : prevSplitterRow.getAttribute('lt-prop-size')
					}
					returnData[nextId] = {
						'element' : nextSplitterRow,
						'size' : nextSplitterRow.getAttribute('lt-prop-size')
					}

					if(splitterComponent.getMethods('onResizeEnd')){
						splitterComponent.component.executeMethod('onResizeEnd' , returnData);
					}

				}

			},
			static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
		})

	}

	/**
	 * @customElement lyte-column-handle
	 */


	if(!_lyteUiUtils.registeredCustomElements['lyte-column-handle']){

		_lyteUiUtils.registeredCustomElements['lyte-column-handle'] = true


		Lyte.createCustomElement('lyte-column-handle',{
			connectedCallback : function(){
				var columnHandleIcon = document.createElement('DIV');
				columnHandleIcon.setAttribute('class' , 'columnHandleIcon');
				this.appendChild(columnHandleIcon);
			},
			constructor : function(){

				var lyteColRe = this;
				var currentParent,currentIndex,prevSplitterCol,nextSplitterCol,currentIndex;
				var oldClientX;
				var prevSplitterColBasis;
				var nextSplitterColBasis;
				var splitterComponent;
				var prevEleMinSize = 0;
				var nextEleMinSize = 0;
				var prevFlexValues = {};
				var nextFlexValues = {};

				lyteColRe.addEventListener('mousedown' , resizeFun);
				function resizeFun(event){
					// lyteColRe.style.background = "black";
					// lyteColRe.children[0].style.background = "white";

					lyteColRe.classList.add('splitResizing');


					splitterComponent = $L(lyteColRe).closest('lyte-splitter').get(0);
					splitterComponentCol = $L(lyteColRe).closest('lyte-column-splitter').get(0);
					currentParent = lyteColRe.parentElement;
					childArray = Object.keys(currentParent.children).map(function(e){
						return currentParent.children[e]
					})
					currentIndex = childArray.indexOf(lyteColRe);
					prevSplitterCol = childArray[currentIndex-1];
					nextSplitterCol = childArray[currentIndex+1];
					oldClientX = event.clientX;
					$L(this).parent().children('lyte-column-element').css('flexGrow',0);
					if(!getComputedStyle(prevSplitterCol).flexBasis){
						prevSplitterCol.style.flexBasis = (((100/currentParent.querySelectorAll('lyte-column-element').length)-1)/2) + "%";
					}
					if((!getComputedStyle(nextSplitterCol).flexBasis)||(getComputedStyle(nextSplitterCol).flexBasis === "auto")){
						nextSplitterCol.style.flexBasis = (((100/currentParent.querySelectorAll('lyte-column-element').length))/($L('lyte-column-element').length - 2)) + "%";
					}
					prevSplitterCol.style.flexGrow = nextSplitterCol.style.flexGrow = 0;
					oldClientX = event.clientX;
					prevSplitterColBasis = parseFloat(getComputedStyle(prevSplitterCol).flexBasis);
					nextSplitterColBasis = parseFloat(getComputedStyle(nextSplitterCol).flexBasis);
					if(prevSplitterCol.hasAttribute('lt-prop-min-size')){
						prevEleMinSize = parseFloat(prevSplitterCol.getAttribute('lt-prop-min-size'));
					}
					if(nextSplitterCol.hasAttribute('lt-prop-min-size')){
						nextEleMinSize = parseFloat(nextSplitterCol.getAttribute('lt-prop-min-size'));
					}
					if(!$L(prevSplitterCol).data('flexValues')){
						prevFlexValues = {
							"value" : getComputedStyle(prevSplitterCol).flexBasis
						}
					}
					if(!$L(nextSplitterCol).data('flexValues')){
						nextFlexValues = {
							"value" : getComputedStyle(nextSplitterCol).flexBasis
						}
					}

					$L(prevSplitterCol).data('flexValues' , prevFlexValues);
					$L(nextSplitterCol).data('flexValues' , nextFlexValues);
					// console.log(prevSplitterCol , nextSplitterCol);


					splitterComponent.addEventListener('mousemove' , adjustFun);
					splitterComponent.addEventListener('mouseup' , removeFun);
				}
				function adjustFun(event){
					var clientXchange = oldClientX - event.clientX;
					var availableSpace = (currentParent.getBoundingClientRect().width - ($L(lyteColRe).parent().children('lyte-column-handle').length * 8));
					var percentDiff = ((clientXchange / availableSpace)*100);

					if(((prevSplitterColBasis - percentDiff) >= prevEleMinSize) && ((nextSplitterColBasis + percentDiff) >= nextEleMinSize)){
						prevSplitterCol.style.flexBasis = (prevSplitterColBasis - percentDiff) + "%";
						prevSplitterCol.setAttribute('lt-prop-size' , ((prevSplitterColBasis - percentDiff) + "%"));
						nextSplitterCol.style.flexBasis = (nextSplitterColBasis + percentDiff) + "%";
						nextSplitterCol.setAttribute('lt-prop-size' , ((nextSplitterColBasis + percentDiff) + "%"))
						prevFlexValues.value = (prevSplitterColBasis - percentDiff);
						nextFlexValues.value = (nextSplitterColBasis + percentDiff);
						$L(prevSplitterCol).data('flexValues' , prevFlexValues)
						$L(nextSplitterCol).data('flexValues' , nextFlexValues)
					} else {
						if(((prevSplitterColBasis - percentDiff) < (prevEleMinSize+1))){
							nextSplitterCol.style.flexBasis = ((prevSplitterColBasis + nextSplitterColBasis)-prevEleMinSize) + "%";
							nextSplitterCol.setAttribute('lt-prop-size' , (((prevSplitterColBasis + nextSplitterColBasis)-prevEleMinSize) + "%"))
							prevSplitterCol.style.flexBasis = prevEleMinSize+"%";
							prevSplitterCol.setAttribute('lt-prop-size' , (prevEleMinSize+"%"))
						} else if(((nextSplitterColBasis + percentDiff) < (nextEleMinSize+1))){
							prevSplitterCol.style.flexBasis = ((prevSplitterColBasis + nextSplitterColBasis)-nextEleMinSize) + "%";
							prevSplitterCol.setAttribute('lt-prop-size' , (((prevSplitterColBasis + nextSplitterColBasis)-nextEleMinSize) + "%"));
							nextSplitterCol.style.flexBasis = nextEleMinSize+"%";
							nextSplitterCol.setAttribute('lt-prop-size' , (nextEleMinSize+"%"));
						}
					}
				}
				function removeFun(){

					lyteColRe.classList.remove('splitResizing');
					// lyteColRe.style.background = "#ddd";
					// lyteColRe.children[0].style.background = "black";
					splitterComponent.removeEventListener('mousemove' , adjustFun);
					splitterComponent.removeEventListener('mouseup' , removeFun);

					var prevId = prevSplitterCol.getAttribute('lt-prop-splitter-id');
					var nextId = nextSplitterCol.getAttribute('lt-prop-splitter-id');

					var returnData = {};
					returnData[prevId] = {
						'element' : prevSplitterCol,
						'size' : prevSplitterCol.getAttribute('lt-prop-size')
					}
					returnData[nextId] = {
						'element' : nextSplitterCol,
						'size' : nextSplitterCol.getAttribute('lt-prop-size')
					}

					if(splitterComponent.getMethods('onResizeEnd')){
						splitterComponent.component.executeMethod('onResizeEnd' , returnData);
					}
				}
			},
			static: {
            observedAttributes: {
                get: function() {
                    return []
                }
            }
        }
		})

	}


	/**
	 * @syntax yielded
	 *	 <lyte-splitter>
	 *	     <template is="registerYield" yield-name="splitter">
	 *	       <lyte-column-splitter>
	 *	         <lyte-column-element>
	 *	           <lyte-row-splitter>
	 *	             <lyte-row-element>
	 *	               <lyte-column-splitter>
	 *	                 <lyte-column-element>C1</lyte-column-element>
	 *	               </lyte-column-splitter>
	 *	             </lyte-row-element>
	 *	             <lyte-row-element>R2</lyte-row-element>
	 *	             <lyte-row-element>
	 *	               <lyte-column-splitter>
	 *	                 <lyte-column-element>
	 *	                   <lyte-row-splitter>
	 *	                     <lyte-row-element>R1</lyte-row-element>
	 *	                   </lyte-row-splitter>
	 *	                 </lyte-column-element>
	 *	                 <lyte-column-element>C2</lyte-column-element>
	 *	               </lyte-column-splitter>
	 *	             </lyte-row-element>
	 *	           </lyte-row-splitter>
	 *	         </lyte-column-element>
	 *	         <lyte-column-element>
	 *	           <lyte-column-splitter>
	 *	             <lyte-column-element>
	 *	               <lyte-row-splitter>
	 *	                 <lyte-row-element>
	 *	                   <lyte-column-splitter>
	 *	                     <lyte-column-element>C1</lyte-column-element>
	 *	                   </lyte-column-splitter>
	 *	                 </lyte-row-element>
	 *	                 <lyte-row-element>R2</lyte-row-element>
	 *	               </lyte-row-splitter>
	 *	             </lyte-column-element>
	 *	             <lyte-column-element>C2</lyte-column-element>
	 *	             <lyte-column-element>
	 *	               <lyte-row-splitter>
	 *	                 <lyte-row-element>R1</lyte-row-element>
	 *	               </lyte-row-splitter>
	 *	             </lyte-column-element>
	 *	           </lyte-column-splitter>
	 *	         </lyte-column-element>
	 *	       </lyte-column-splitter>
	 *	     </template>
	 *	   </lyte-splitter>
	 */
