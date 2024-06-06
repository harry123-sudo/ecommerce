/**
 * Renders a carousel
 * @component lyte-carousel
 * @version  3.0.0
 * @methods onBeforeNext,onAfterNext
 */

Lyte.Component.register( 'lyte-carousel', {
_template:"<template tag-name=\"lyte-carousel\"> <div class=\"lyteCarouselWrapper\"> <lyte-yield yield-name=\"carouselBoxYield\"></lyte-yield> </div> </template>",
_dynamicNodes : [{"type":"insertYield","position":[1,1]}],
_observedAttributes :["ltPropAutoPlay","ltPropEffect","ltPropActiveIndex","ltPropMoreRecords","ltPropRecords","ltPropAutoPlayDuration","ltPropAutoPlayPause","ltPropData","currentActiveIndex"],
	data : function(){
		return {
			/** 
			 * @componentProperty {boolean} ltPropAutoPlay=false
			 * @version 3.0.0
			 */
			ltPropAutoPlay : Lyte.attr( 'boolean', {
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlay', false )
			  }),
			/** 
			 * @componentProperty {slide | fade} ltPropEffect=slide
			 * @version 3.0.0
			 */
			ltPropEffect : Lyte.attr( 'string', { 
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'effect', 'slide' ) 
			}),
			/** 
			 * @componentProperty {number} ltPropActiveIndex=0
			 * @version 3.0.0
			 */

			ltPropActiveIndex : Lyte.attr( 'number', {
			 'default' : 0
			}),
			/** 
			 * @componentProperty {boolean} ltPropMoreRecords=false
			 * @version 3.0.0
			 */
			ltPropMoreRecords : Lyte.attr( 'boolean', {
			 'default' : false
			}),
			/** 
			 * @componentProperty {number} ltPropRecords
			 * @version 3.0.0
			 */
			ltPropRecords : Lyte.attr( 'number', {
			 'default' : undefined
			}),
			/** 
			 * @componentProperty {number} ltPropAutoPlayDuration=3000
			 * @version 3.0.0
			 */
			ltPropAutoPlayDuration : Lyte.attr('number',{
			'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlayDuration', 3000 )
			}),
			/** 
			 * @componentProperty {boolean} ltPropAutoPlayPause=false
			 * @version 3.0.0
			 */
			ltPropAutoPlayPause : Lyte.attr( 'boolean', {
			 'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-carousel', 'autoPlayPause', false )
			}),
			/** 
			 * @componentProperty {array} ltPropData=[]
			 * @version 3.0.0
			 */
			ltPropData : Lyte.attr( 'array', {
			 'default' : []
			}),
			currentActiveIndex : Lyte.attr( 'number', {
			 'default' : 0
			})
		}		
	},
	didConnect : function() {
		var activeIndex = this.getData( 'ltPropActiveIndex' )
		if( activeIndex ) {
			this.setData( 'currentActiveIndex', activeIndex )
		}
		if( this.getData( 'ltPropRecords' ) >= 1 ) {
			this.setActiveItem()
		}
		if( this.getData( 'ltPropRecords' ) > 1 ) {
			this.setMethod();
		}
		this.$node.moveSlideByIndex = function(index){
			var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
			if( activeIndex >= 0 && activeIndex < itemList.length ){
				itemList[activeIndex].classList.remove('lyteActive')
				if(indicatorList) {
					indicatorList.classList.remove('lyteActive')
				}
			}
			clearTimeout( this._nextTimeout )
			clearTimeout( this._nextFadeTimeout )
			this.setData( 'currentActiveIndex', index )
			this.setActiveItem()
		}.bind( this ) 
		this.$node.reset = function(){
			setTimeout( function() {
				var activeIndex = this.getData( 'currentActiveIndex' ),
				itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
			 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
				if( activeIndex >= 0 && activeIndex < itemList.length ){
					itemList[activeIndex].classList.remove('lyteActive')
					if(indicatorList) {
						indicatorList.classList.remove('lyteActive')
					}
				}
				clearTimeout( this._nextTimeout )
				clearTimeout( this._nextFadeTimeout )
				this.setData( 'currentActiveIndex',this.getData( 'ltPropActiveIndex' ) )
				this.setActiveItem()
				this.setMethod();
			}.bind( this ) )
		}.bind( this ) 
		this.$node.getActiveSlideIndex =function(){
			return this.getData('currentActiveIndex')
		}
	},
	didDestroy : function() {
		clearInterval( this._autoId )
		delete this._autoId
	},
	setMethod : function() {
		var prev =this.$node.getElementsByTagName( 'lyte-carousel-prev' )[ 0 ],
			next = this.$node.getElementsByTagName( 'lyte-carousel-next' )[ 0 ],
			indicator = this.$node.getElementsByTagName( 'lyte-carousel-indicator' )[ 0 ];
			if( this.getData( 'ltPropEffect' ).toLowerCase() ==  "fade" ) {
				this.$node.classList.add( 'lyteFade' )
				if( prev ) {
					this._prevFadeClick = this.prevFadeClick.bind( this )
					prev.addEventListener( 'click', this._prevFadeClick )
				}
				if( next ) {
					this._nextFadeClick = this.nextFadeClick.bind( this )
					next.addEventListener( 'click', this._nextFadeClick )
				}
				if( indicator ) {
					this._indicatorFadeClick = this.indicatorFadeClick.bind( this )
					indicator.addEventListener( 'click', this._indicatorFadeClick )
				}
				this._zeroOpacityTransition = this.zeroOpacityTransition.bind( this )
			}
			else{
				this.$node.classList.add( 'lyteScroll' )
				if( prev ) {
					this._prevClick = this.prevClick.bind( this )
					prev.addEventListener( 'click', this._prevClick )
				}
				if( next ) {
					this._nextClick = this.nextClick.bind( this )
					next.addEventListener( 'click', this._nextClick )
				}
				if( indicator ) {
					this._indicatorClick = this.indicatorClick.bind( this );
					indicator.addEventListener( 'click', this._indicatorClick )
				}
				this._removePrevClass = this.removePrevClass.bind( this )
				this._removeNextClass = this.removeNextClass.bind( this )
			}
	},
	dataObs : function() {
		setTimeout( function() {
				clearTimeout( this._nextTimeout )
				clearTimeout( this._nextFadeTimeout )
				this.setData( 'currentActiveIndex',this.getData( 'ltPropActiveIndex' ) )
				this.setActiveItem()
				this.setMethod();
		}.bind( this ) )
	}.observes( 'ltPropData' ),
	currentActiveObs : function() {
		// this.checkButton();
		this.setActiveItem();
		
	    
	}.observes( 'currentActiveIndex' ),
	activeIndexObs : function() {
		// this.checkButton();
		var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
		if( activeIndex >= 0 && activeIndex < itemList.length ){
			itemList[activeIndex].classList.remove('lyteActive')
			if(indicatorList) {
				indicatorList.classList.remove('lyteActive')
			}
			this.setData( 'currentActiveIndex', this.getData( 'ltPropActiveIndex' ) )
		}
	    
	}.observes( 'ltPropActiveIndex' ),
	autoPlayPauseObs : function() {
		var carouselContent = this.$node.querySelector( '.lyteCarouselWrapper' );
		this._carouselContentFocus= this.carouselContentFocus.bind(this)
		if( this.getData( 'ltPropAutoPlayPause' ) && this.getData( 'ltPropAutoPlayDuration' ) ) {
			if( carouselContent ) {
				carouselContent.addEventListener( 'mouseenter', this._carouselContentFocus )
			}
		}
		else{
			if( carouselContent ) {
				carouselContent.removeEventListener( 'mouseenter', this._carouselContentFocus )
			}
		}
	}.observes( 'ltPropAutoPlayPause' ).on( 'didConnect' ),
	carouselContentFocus : function(  ){
		var carouselContent = this.$node.querySelector( '.lyteCarouselWrapper' );

		clearInterval( this._autoId );
		this._autoId = false
		this._carouselContentFocusOut = this.carouselContentFocusOut.bind( this, carouselContent )
		carouselContent.addEventListener( 'mouseleave',  this._carouselContentFocusOut)
	},
	carouselContentFocusOut : function(carouselContent  ) {

		carouselContent.removeEventListener( 'mouseleave', this._carouselContentFocusOut )
		if(this.getData('ltPropAutoPlay'))	{
			this.autoPlayFunc();
		}
			
	},
	autoPlayObs : function() {
		if( !this.getData( 'ltPropAutoPlay' ) && this._autoId ) {
			clearInterval( this._autoId );
			this._autoId = false
		}
		if(this.getData( 'ltPropAutoPlay' ) && this.getData( 'ltPropRecords' ) > 1 ) {
			this.autoPlayFunc();
		}
	}.observes( 'ltPropAutoPlay' ).on( 'didConnect' ),
	setActiveItem : function(){
		var activeIndex = this.getData( 'currentActiveIndex' ),
			itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ activeIndex +'"] ' );
			if( activeIndex >= 0 && activeIndex < itemList.length ){
				itemList[ activeIndex ].classList.add( 'lyteActive' );
				if( indicatorList ) {
					indicatorList.classList.add( 'lyteActive' ) ;
				}
	
			}
	},
	prevClick : function(event) {
		if( this._prevTrans ) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		else{
			var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
			 indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="' +currentActive+ '"] ' );
			 res=true;
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records);
			}
			if(res){
				if( currentActive >= 1 ){
					this.previous( currentActive, currentActive-1, itemList, indicatorList, event )
				}
				else if(currentActive==0){
					this.previous( currentActive, records-1, itemList, indicatorList, event )
	
				}
			}
			
		}
	},
	nextClick : function( event ) {
		
		var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
		 	res=true,that = this,index;
		if( this._nextTrans ) {
			event.preventDefault();
			event.stopPropagation();
				return;			
		}
		else{
			if( this._autoId ) {
				clearInterval( this._autoId )
				this._autoId = false;
			}
			if( this.getMethods( 'onBeforeNext' ) ){
						res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records);
			}

			if(res && res.then ) {
				res.then( function( arg ) {
					if( currentActive >= 0 &&  currentActive < that.getData( 'ltPropRecords' ) ) {
						if( currentActive < that.getData( 'ltPropRecords' ) - 1 ) {
							that.next( currentActive, currentActive+1, itemList, indicatorList, event )

						}
						else if( currentActive == that.getData( 'ltPropRecords' ) - 1 ) {
							that.next( currentActive, 0, itemList, indicatorList, event )
						}
					}
					if( that.getData('ltPropAutoPlay')  ) {
							that.autoPlayFunc();
					}
					
				}).catch( function( err ) {
					console.error( err );
				} );
			}
			else if( res !== false ) {
				if( currentActive >= 0 && currentActive < records-1 ) {
					this.next( currentActive, currentActive+1, itemList, indicatorList, event )
							
				}
				else if( currentActive == records-1 ) {
					this.next( currentActive, 0, itemList, indicatorList, event )
				}
				if( this.getData( 'ltPropAutoPlay' )  ) {
					setTimeout( function() {
						this.autoPlayFunc();
					}.bind( this ), 100 )
				}
			}
		}
			
	},	
	next : function( currentActive, nextIndex, itemList, indicatorList, event ) {
		var res = true, records = this.getData('ltPropRecords')

		if(event && event.currentTarget && event.currentTarget.tagName == "LYTE-CAROUSEL-INDICATOR"){
			if( this.getMethods( 'onBeforeNext' ) ){
				res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records);
			}
		}
		if(res){
			this._nextTrans = true
			var duration = parseFloat( getComputedStyle( itemList[ currentActive ] ).transitionDuration )
				duration = ( duration * 1000 ) +200
			setTimeout( function() {
					
					if( this._nextTrans ) {
						var itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ),
						indicatorList = this.$node.getElementsByTagName( 'lyte-carousel-indicator-item' ),
						activeItemList = this.$node.querySelectorAll( 'lyte-carousel-item.lyteActive' )
						for( var i=0 ; i<itemList.length; ++i ) {
							if( $L(itemList[ i ] ).hasClass( 'lyteActivePrev' ) ) {
								itemList[ i ].classList.remove( 'lyteActivePrev' )
							}
						}
						if( activeItemList.length > 1 ) {
							for( var i=0 ; i < itemList.length; ++i ) {
								if( i != this.getData( 'ltPropActiveIndex' ) && $L( itemList[ i ] ).hasClass( 'lyteActive' ) ) {
									itemList[ i ].classList.remove( 'lyteActive' )
									indicatorList[ i ].classList.remove( 'lyteActive' )
	
								}
							}
						}
						delete this._nextTrans
					}
			}.bind( this ), duration )
	
			itemList[ nextIndex].classList.add( 'lyteActiveNext' ) 
			this._nextTimeout = setTimeout( function() {
				if( this._nextTrans ) {
					itemList[ currentActive ].addEventListener( 'transitionend', this._removePrevClass )
					itemList[ currentActive ].classList.add( 'lyteActivePrev' ) 
	
					itemList[ currentActive ].classList.remove( 'lyteActive' ) 
					if( indicatorList ) {
						indicatorList.classList.remove( 'lyteActive' ) 
					}
					itemList[ nextIndex].classList.remove( 'lyteActiveNext' ) 
					// this.setData( 'ltPropActiveIndex',	nextIndex ) ;
					this.setData( 'currentActiveIndex', nextIndex ) ;
					if( this.getMethods( 'onAfterNext' ) ){
						this.executeMethod( 'onAfterNext' , event , this , nextIndex ) ;
					}
				}
			}.bind( this ), 100 )
		}
		
	},
	previous : function( currentActive, prevIndex, itemList, indicatorList, event ) {
		var res = true, records = this.getData('ltPropRecords')
		if(event && event.currentTarget && event.currentTarget.tagName == "LYTE-CAROUSEL-INDICATOR"){
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records);
			}
		}
		if(res){

			this._prevTrans=true

			itemList[ prevIndex ].classList.add( 'lyteActivePrev' ) 
			setTimeout( function() {
				itemList[ currentActive ].addEventListener( 'transitionend', this._removeNextClass )
				itemList[ currentActive ].classList.add( 'lyteActiveNext' ) 
				itemList[ currentActive ].classList.remove( 'lyteActive' ) 
				itemList[ prevIndex ].classList.remove('lyteActivePrev') 

				if( indicatorList ) {
					indicatorList.classList.remove( 'lyteActive' ) 
				}
				// this.setData( 'ltPropActiveIndex', prevIndex )
				this.setData( 'currentActiveIndex', prevIndex )
				if( this.getMethods( 'onAfterPrev' ) ){
					this.executeMethod( 'onAfterPrev' , event , this , prevIndex ) 
				}
			}.bind( this ) )
		}
	},
	removePrevClass: function( event ) {
		
			// if(currentActive-1>=0){
				event.currentTarget.classList.remove( 'lyteActivePrev' ) 
				event.currentTarget.removeEventListener( 'transitionend', this._removePrevClass )

			// }

			delete this._nextTrans 
	},
	removeNextClass: function(event){
		

		event.currentTarget.classList.remove('lyteActiveNext') ;
		event.currentTarget.removeEventListener('transitionend',this.removeNextClass);
		
		delete this._prevTrans 
	},
	autoPlayFunc : function(){
		if(this._autoId){
			clearInterval(this._autoId)
			this._autoId = false
		}
		var duration = this.getData('ltPropAutoPlayDuration')
		if(duration && this.getData('ltPropRecords') > 1 ){
			this._autoId=setInterval(function(){
				var effect = this.getData('ltPropEffect') ?  this.getData('ltPropEffect') :'';
				if( effect.toLowerCase() == "fade" && !this._nextFadeTrans ){
					this.nextFadeClick();
				}
				else if( effect.toLowerCase() !== "fade" &&!this._nextTrans ){
					this.nextClick();
				}
			}.bind(this),duration);
		}
	},
	indicatorClick : function(event){

		var index, e = event.target,
		target= $L(e).closest('lyte-carousel-indicator-item')[ 0 ];

	
		if( target && target.tagName.toLowerCase() == 'lyte-carousel-indicator-item' ){
			index = target.getAttribute('data-value');
			var currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
			res=true,that = this;

			if( index < currentActive ){
				this.previous( currentActive, index, itemList, indicatorList ,event );
			}
			else if(index > currentActive ){
				this.next( currentActive, index, itemList, indicatorList ,event );

			}
		}
	},
	prevFadeClick : function( event ) {
		if( this._prevFadeTrans ) {
			event.preventDefault()
			event.stopPropagation()
			return;
		}
		else{
			var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
			indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="' +currentActive+ '"] ' ),
			res=true;
			if( this.getMethods( 'onBeforePrev' ) ){
				res = this.executeMethod( 'onBeforePrev' , event , this , currentActive ,records );
			}
			if(res){
				if( currentActive >= 1 ){
					this.previousFade( currentActive, currentActive-1, itemList, indicatorList, event )
				}
				else if( currentActive==0 ) {
					this.previousFade( currentActive, records-1, itemList, indicatorList, event )
	
				}
			}
			
		}
	},
	previousFade : function( currentActive, prevIndex, itemList, indicatorList, event ) {
			this._prevFadeTrans=true

			setTimeout( function() {
				itemList[ prevIndex ].addEventListener( 'transitionend', this._zeroOpacityTransition )
				itemList[ currentActive ].classList.remove( 'lyteActive' ) ;
				itemList[ prevIndex ].classList.add('lyteActive') ;

				if( indicatorList ) {
					indicatorList.classList.remove( 'lyteActive' ) ;
				}
				this.setData( 'currentActiveIndex', prevIndex );
				if( this.getMethods( 'onAfterPrev' ) ){
					this.executeMethod( 'onAfterPrev' , event , this , prevIndex ) 
				}
			}.bind( this ) )
	},
	zeroOpacityTransition : function( event ){
		event.currentTarget.removeEventListener( 'transitionend', this._zeroOpacityTransition )
		
		delete this._prevFadeTrans ;
		delete this._nextFadeTrans ;
	},
	nextFadeClick : function( event ) {
		
		var records = this.getData( 'ltPropRecords' ),
		 	currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
		 	res=true,that = this,index;
		if( this._nextTrans ) {
				event.preventDefault();
				event.stopPropagation();
				return;			
		}
		else{
			if( this._autoId ) {
				clearInterval( this._autoId )
				this._autoId = false;
			}
			if( this.getMethods( 'onBeforeNext' ) ){
						res = this.executeMethod( 'onBeforeNext' , event , this , currentActive ,records );
			}

			if( res && res.then ) {
				res.then(function( arg ) {
					if( currentActive >= 0 &&  currentActive < that.getData( 'ltPropRecords' ) ) {
						if( currentActive < that.getData( 'ltPropRecords' )-1 ) {
							that.nextFade( currentActive, currentActive+1, itemList, indicatorList, event )

						}
						else if( currentActive == that.getData( 'ltPropRecords' ) - 1 ) {
							that.nextFade( currentActive, 0, itemList, indicatorList, event )
						}
					}
					if( that.getData( 'ltPropAutoPlay' ) ) {
						// setTimeout(function(){
							that.autoPlayFunc();
						// }.bind(that),100)
					}
				} ).catch( function( err ) {
					console.error( err );
				} );
			}
			else if( res !== false ) {
				if( currentActive >= 0 && currentActive < records-1 ){
					this.nextFade( currentActive, currentActive+1, itemList, indicatorList, event )
							
				}
				else if( currentActive == records-1 ) {
					this.nextFade( currentActive, 0, itemList, indicatorList, event )
				}
				if( this.getData( 'ltPropAutoPlay' ) ) {
					setTimeout( function() {
						this.autoPlayFunc();
					}.bind( this ),100 )
				}
			}
		}
		
	},
	nextFade : function( currentActive, nextIndex, itemList, indicatorList, event ) {
		this._nextFadeTrans = true
		var duration = parseFloat( getComputedStyle( itemList[ currentActive ] ).transitionDuration )
			duration = ( duration * 1000 ) +20
			
		setTimeout( function() {
				if( this._nextFadeTrans ) {
					delete this._nextFadeTrans
				}
		}.bind( this ), duration )

		this._nextFadeTimeout = setTimeout( function() {
			itemList[ currentActive ].addEventListener( 'transitionend', this._zeroOpacityTransition)
			itemList[ currentActive ].classList.remove( 'lyteActive' ) ;
			if( indicatorList ) {
				indicatorList.classList.remove( 'lyteActive' ) ;
			}
			this.setData( 'currentActiveIndex', nextIndex ) ;
			if( this.getMethods( 'onAfterNext' ) ){
				this.executeMethod( 'onAfterNext' , event , this , nextIndex ) 
			}
		}.bind( this ), 100 )
	},
	indicatorFadeClick : function() {
		var index, e = event.target,
		target= $L( e ).closest( 'lyte-carousel-indicator-item' )[ 0 ];

	
		if( target && target.tagName.toLowerCase() == 'lyte-carousel-indicator-item' ) {
			index = target.getAttribute( 'data-value' );
			var currentActive = this.getData( 'currentActiveIndex' ),
		 	itemList = this.$node.getElementsByTagName( 'lyte-carousel-item' ) ,
		 	indicatorList= this.$node.querySelector( ' lyte-carousel-indicator-item[data-value="'+ currentActive +'"] ' ),
			res=true,that = this;

			if( index < currentActive ){
				this.previousFade( currentActive, index, itemList, indicatorList ,event );
			}
			else if(index > currentActive ){
				this.nextFade( currentActive, index, itemList, indicatorList ,event );

			}
		}
	}
});
