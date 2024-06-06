/**
 * Renders an board
 * @component lyte-board
 * @version 3.1.0
 * @methods onBoardScroll
 */
Lyte.Component.register( 'lyte-board', {
_template:"<template tag-name=\"lyte-board\"> <div class=\"lyteBoardWrapper {{ltPropClass}}\"> <div class=\"lyteBoardHeader\"> <lyte-yield yield-name=\"headerItem\" board-detail=\"{{ltPropBoardDetail}}\" index=\"{{ltPropIndex}}\"></lyte-yield> </div> <div class=\"lyteBoardContainer\"> <div class=\"lyteKanbanNestedSortable {{ltPropKanbanId}}\" id=\"{{ltPropBoardDetail.id}}\" index=\"{{ltPropIndex}}\" data-loaded=\"{{dataLoaded}}\" cards-length=\"{{cardArray.length}}\" onscroll=\"{{action('boardScroll',event,this)}}\"> <template is=\"for\" items=\"{{cardArray}}\" item=\"itemContent\" index=\"index1\"> <div class=\"lyteBoardItemContentData {{itemContent[ltPropCardClassName]}}\"> <lyte-yield yield-name=\"contentItem\" lyte-card-item=\"{{itemContent}}\"></lyte-yield> </div> </template> </div> <template is=\"if\" value=\"{{expHandlers(cardArray.length,'==',0)}}\"><template case=\"true\"> <div class=\"lyteKanbanNoResultMsg\">{{ltPropNoResultMessage}}</div> </template></template> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,0]}]}},"default":{}}],
_observedAttributes :["lyteViewPort","ltPropBoardDetail","ltPropIndex","ltPropBoardSortable","ltPropClass","ltPropKanbanId","ltPropMoreStageRecord","ltPropNoResultMessage","dummyId","ltPropCardClassName","cardArray"],
	data : function() {
		return {
		 	/**
            * @componentProperty {object} ltPropBoardDetail
            * @version 3.1.0
            */ 
			lyteViewPort : Lyte.attr("boolean", {"default" : true}),//No I18n
			'ltPropBoardDetail' : Lyte.attr( 'object' ), 
			/**
            * @componentProperty {number} ltPropIndex
            * @version 3.1.0
            */ 
			'ltPropIndex' : Lyte.attr( 'number' ),
			/**
            * @componentProperty {boolean} ltPropBoardSortable=true
            * @version 3.1.0
            */
            'ltPropBoardSortable' : Lyte.attr( 'boolean', {
				'default':  _lyteUiUtils.resolveDefaultValue( 'lyte-board', 'boardSortable', true )
			} ),
			/**
            * @componentProperty {string} ltPropClass
            * @version 3.1.0
            */
			'ltPropClass' : Lyte.attr('string',{
				'default':  _lyteUiUtils.resolveDefaultValue( 'lyte-board', 'class', '' )
			}),
			/**
            * @componentProperty {string} ltPropKanbanId=''
            * @version 3.1.0
            */
			'ltPropKanbanId' : Lyte.attr( 'string', {
				'default' : ''
			} ) ,
			'ltPropMoreStageRecord' : Lyte.attr( 'boolean', {
				'default': false
			} ),
			'ltPropNoResultMessage' : Lyte.attr('string',{'default': _lyteUiUtils.resolveDefaultValue( 'lyte-dropdown', 'noResultMessage', _lyteUiUtils.i18n( 'no.results.found' ) )}),
			'dummyId' : Lyte.attr( 'string', {
				'default' : ''
			} ),
			'ltPropCardClassName' : Lyte.attr('string',{'default':undefined}),
			'cardArray' : Lyte.attr( 'array', {
				'default':[]
			} )
		}		
	},
	init : function(){

		this.setCardArray()
	},
	didConnect : function(){
		this.$node.getVisibleCard =function(){
			    var scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			    if(scrollDiv.scrollHeight>scrollDiv.clientHeight){
			    	return this.getVisibleNode()

			    }
			return (this.getData('ltPropBoardDetail').cards ? this.getData('ltPropBoardDetail').cards  : [])

		}.bind(this)
	},
	viewPortObs : function(){
		if( !this.getData('lyteViewPort') ) {
			var kanbanview = $L(this.$node ).closest( 'lyte-kanbanview' )[ 0 ]
			if(kanbanview){
				kanbanview.component.setupSortableForCard()
			} 
			console.log(kanbanview)
		}

	}.observes('lyteViewPort'),
	didDestroy: function() {
        clearTimeout( this.timeout1 );
	},
	getVisibleNode : function(){
        // return;
        var bcr=this.$node.getBoundingClientRect(),
        originalRows = Array.from( this.$node.getElementsByClassName( 'lyteBoardItemContentData' ) ),
        tValue = Math.max( bcr.top + 10 , -10 ),
        bValue = Math.min( window.innerWidth + 10, bcr.bottom),
        visible = [], boardDetails = this.getData('ltPropBoardDetail').cards;
        


       
        for( var i = 0; i < originalRows.length; i++ ){
            var row = originalRows[ i ],
            _bcr = row.getBoundingClientRect();
            if( _bcr.bottom > tValue && _bcr.top <bValue ){
                visible.push( boardDetails[i] );
                
            }
        }

        
        return visible;
    
	},
	contentObs : function(){
		this.setCardArray()
		if(this.getData('ltPropBoardSortable')){
			this.addSortableForNewRecords()
		}
		
	}.observes( 'ltPropBoardDetail.cards.[]' ),
	setCardArray : function(){
		var boardDetail = this.getData('ltPropBoardDetail')
		if( boardDetail && boardDetail.cards ){
			this.setData( 'cardArray', boardDetail.cards )
		}
	},
	addSortableForNewRecords : function() {
		var sortableClass = this.$node.querySelectorAll( '.lyteKanbanNestedSortable.'+this.getData('ltPropKanbanId') )[0].getSortableClass(),
		cardWithoutSortable = this.$node.querySelectorAll( '.lyteBoardItemContentData:not(.'+sortableClass+')' )
		$L(cardWithoutSortable).map(function(index,element){
			element.parentElement.addToSortable(element);
		})
		
	},
	addShadow : function() {
		this.$node.querySelector( '.lyteBoardHeader' ).classList.add( 'lyteKanbanviewHeaderShadow' ); 
	},
	hasScrollHeightReached : function(event) {
		if ( event.target.scrollHeight - 10 <= ( Math.ceil( event.target.offsetHeight ) + Math.ceil( event.target.scrollTop ) ) ) {
			if ( this.getData( 'ltPropMoreStageRecord' ) && this.getMethods( 'onBoardScroll' ) ) {
				this.executeMethod( 'onBoardScroll' , this.getData( 'ltPropBoardDetail' ), this, event  ); //NO i18n
			}
		}
	},
	removeShadow : function(){
		this.$node.querySelector('.lyteBoardHeader').classList.remove('cxKanbanShadow'); // No I18n
	},
	executeScrollStop : function(){
		if( this.getMethods( 'onBoardScrollStop' ) ) {
			var visible,boardDetail = this.getData('ltPropBoardDetail'),
			 scrollDiv = this.$node.getElementsByClassName('lyteKanbanNestedSortable')[0]
			if(scrollDiv.scrollHeight>scrollDiv.clientHeight){
			    	visible = this.getData('ltPropBoardDetail')
			 } else{
			 	visible = this.getVisibleNode()
			 }
			this.executeMethod( 'onBoardScrollStop', boardDetail, visible, this, scrollDiv.scrollTop, event );
		}
	},
	actions :{
		boardScroll : function( event ) {

			if ( event.target.scrollTop != 0 ) {
				this.addShadow();
			}

			this.timeout1 = setTimeout(function() {
				
				this.hasScrollHeightReached(event)
			}.bind( this ), 10 );

			if ( event.target.scrollTop == 0 ){
				this.removeShadow()
			}
			this.debounceTimeout = setTimeout( function(){
				this.executeScrollStop()
			}.bind(this),100)
		}

	}
});

/**
 * Renders a kanbanview
 * @component lyte-kanbanview
 * @version 3.1.0
 * @dependencies lyte-card,lyte-board
 * /components/lyte-card.js
 * /theme/compiledCSS/default/ltr/lyte-ui-card.css
 * /components/lyte-board.js
 * /theme/compiledCSS/default/ltr/lyte-ui-board.css
 * @methods onDragSelectForBoard, onDragSelectBoards, onBodyScroll, onDragSelectForCard, onRecordDropForBoard, onRecordDrop,onDragSelectCard
 */
Lyte.Component.register( 'lyte-kanbanview' , {
_template:"<template tag-name=\"lyte-kanbanview\"> <div class=\"lyteKanbanviewScrollDivSelector {{dummyId}}\" onscroll=\"{{action('onBodyScroll',event)}}\"> <template is=\"for\" items=\"{{ltPropBoardDetails}}\" item=\"item\" index=\"dataIndex\"> <div class=\"lyteKanbanViewItem\"> <lyte-yield yield-name=\"kanbanYield\" lyte-board-item=\"{{item}}\" lyte-index=\"{{dataIndex}}\" lyte-kanban-id=\"{{dummyId}}\"></lyte-yield> </div> </template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"insertYield","position":[1,1]}]}],
_observedAttributes :["ltPropBoardDetails","ltPropSortable","ltPropMoreStageRecord","ltPropId","dummyId"],
	data : function(){
		return {
			/** 
			 * @componentProperty {array} ltPropBoardDetails=[]
			 * @version 3.1.0
			 */

			'ltPropBoardDetails' : Lyte.attr( 'array', {
				'default': []
			} ), 
			/** 
			 * @typedef {object} sortable
			 * @property {boolean} board
			 * @property {boolean} card
			*/
			/** 
			 * @componentProperty {sortable} ltPropSortable={"board" : true, "card" : true }
			 * @version 3.1.0
			 */
			'ltPropSortable' : Lyte.attr( 'object', {
				'default': {"board" : true, "card" : true }

			} ) ,
			/** 
			 * @componentProperty {boolean} ltPropMoreStageRecord=false
			 * @version 3.1.0
			 */
			'ltPropMoreStageRecord' : Lyte.attr( 'boolean', {
				'default': false
			} ),
			/** 
			 * @componentProperty {string} ltPropId
			 * @version 3.1.0
			 */
			'ltPropId' : Lyte.attr( 'string'),
			'dummyId' : Lyte.attr( 'string', {
				'default' : ''
			} )
		}		
	},
	didDestroy : function() {
		clearTimeout(this.timeout2);
	},
	didConnect : function() {
		var kanbanviewList = document.querySelectorAll('lyte-kanbanview')
		this._dir = _lyteUiUtils.getRTL();

		if(this.getData('ltPropId') == undefined){
			var pos = Object.values(kanbanviewList).indexOf(this.$node)
			this.setData('dummyId', 'dummyId'+pos)
		}
		else{
			this.setData('dummyId',this.getData('ltPropId'))
		}
		this.doBoardSortable()
		this.doCardSortable()
		this.$node.getVisibleBoard =function(){
			var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
			if(scrollDiv.scrollWidth<scrollDiv.clientWidth){
				return this.getData('ltPropBoardDetails')
			}
			return this.getVisibleNode()
		}.bind(this)
	},
		
	getVisibleNode : function(){
        // return;
        var bcr=this.$node.getBoundingClientRect(),
        originalRows = Array.from( this.$node.getElementsByTagName( 'lyte-board' ) ),
        tValue = Math.max( bcr.left + (this._dir?0:10) , -10 ),
        bValue = Math.min( window.innerWidth + 10, bcr.right  - (this._dir?10:0)),
        visible = [],boardDetails = this.getData('ltPropBoardDetails');


       
        for( var i = 0; i < originalRows.length; i++ ){
            var row = originalRows[ i ],
            _bcr = row.getBoundingClientRect();
            if( _bcr.right > tValue && _bcr.left <bValue ){
                visible.push( boardDetails[i] );
                
            }
        }

        return visible;
    
	},
	boardObs : function() {
		if( this.getData('ltPropSortable').board ){
			this.addSortableForNewBoards()
		}
	}.observes( 'ltPropBoardDetails.[]' ),
	doCardSortable : function() {
		clearTimeout(this._cardSortableTimeout)
		this._cardSortableTimeout =setTimeout( function(){
			if( this.getData( 'ltPropBoardDetails' ).length > 0 && this.getData( 'ltPropSortable' ).card ) {
				this.setupSortableForCard()
			}
		}.bind(this),100)
		
	},
	doBoardSortable : function() {
		if( this.getData( 'ltPropBoardDetails' ).length > 0 && this.getData( 'ltPropSortable' ).board ) {
			this.setupSortableForBoard()
		}
	},
	stageBoardDetailsObs : function() {
		this.doCardSortable()
	}.observes( 'ltPropBoardDetails.[]' ).on, 
	hasSameColumnReordered : function( source, destination ) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' )

		if( sourceIndex == destinationIndex ) {
			return true
		}
		return false
	},
	onRecordDropForBoard : function( boardDetails, droppedElement, fromIndex, toIndex, source, destination, draggedElement ){
		
		if( this.getMethods( 'onRecordDropForBoard') ) {
			this.executeMethod( 'onRecordDropForBoard', droppedElement, source, destination, fromIndex, toIndex ,boardDetails ,draggedElement[0] )
		}
	},
	onRecordDrop : function( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination,droppedElement) {
		var sourceIndex = source.getAttribute( 'index' ),
		destinationIndex = destination.getAttribute( 'index' ),
		board,card


		board = this.$node.querySelectorAll( 'lyte-board' );
		card = droppedElement.querySelector( 'lyte-card' )
		if( !this.hasSameColumnReordered( source, destination ) ) {
			boardDetails[ sourceIndex ].cards = sourceArray; 
			board[ sourceIndex ].setData( 'ltPropContent' , sourceArray );
		}
		boardDetails[ destinationIndex ].cards = destArray; 
		board[ destinationIndex ].setData('ltPropContent' , destArray);

		if( this.getMethods( 'onRecordDrop') ) {
			this.executeMethod( 'onRecordDrop', card, board[ sourceIndex ], board[ destinationIndex ], fromIndex, toIndex,parseInt(sourceIndex),parseInt(destinationIndex),boardDetails,draggedElement[0] ) 
		}
	},
	setupSortableForBoard : function() {
		var self=this  ;

		$L( '.lyteKanbanviewScrollDivSelector ', this.$node ).sortable( {  
			scrollDivX  :  '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			onSelect  : function( currentElem, fromIndex, source, event ) { 
					var	board = currentElem.querySelector( 'lyte-board' )
					
					if( self.getMethods( 'onDragSelectForBoard' ) ){
						return self.executeMethod( 'onDragSelectForBoard', board, fromIndex, source, event ); 
					}
					
					return true;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	board = draggableElement.querySelector( 'lyte-board' )

				if( self.getMethods( 'onDragForBoard' ) ){
						 self.executeMethod( 'onDragForBoard', board, belowElem, event, placeholder ); 
				}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				board = droppableElement.querySelector( 'lyte-board' ),
				flag = true;
				if( self.getMethods( 'onBeforeDropForBoard' ) ){
					flag = self.executeMethod( 'onBeforeDropForBoard', boardDetails, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var boardDetails=self.getData( 'ltPropBoardDetails' ),
				draggedElement, board = droppedElement.querySelector( 'lyte-board' )



				draggedElement = Lyte.arrayUtils( boardDetails, 'splice', fromIndex, 1 )
				Lyte.arrayUtils( boardDetails, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.setData('ltPropBoardDetails',boardDetails)
				self.onRecordDropForBoard( boardDetails, board , fromIndex, toIndex, source, destination, draggedElement)

				
		 	} 
 		}); 
	},
	setupSortableForCard : function(){
		var self=this;

		$L( '.lyteKanbanNestedSortable', this.$node ).sortable( {  
			scrollDivX  : '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ,  
			connectedWith  : '.lyteKanbanNestedSortable.'+this.getData('dummyId') , 

			onSelect  : function( currentElem, fromIndex, source, event ) { 
					console.log(currentElem)
					if($L(currentElem).hasClass('lyteKanbanNoResultMsg')){
						return false;
					}
					var	card = currentElem.querySelector( 'lyte-card' )

					if( self.getMethods( 'onDragSelectForCard' ) ){
						return self.executeMethod( 'onDragSelectForCard', card, fromIndex, source, event ); 
					}
					
					return true;
			},
			onDrag  : function ( draggableElement , belowElem, event, placeholder ){ 
				self.prevent =true
				var	card = draggableElement.querySelector( 'lyte-card' )
				if( self.getMethods( 'onDragForCard' ) ){
						 self.executeMethod( 'onDragForCard', card, belowElem, event, placeholder ); 
				}
			},
			onEnter : function(event){
				var element = arguments[1].sortable
				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.add('lyteHide')
					}
				}
				
			},
			onLeave : function ( event , obj) {
				var element = arguments[1].sortable
				if(element.getAttribute('cards-length')==0){
					var div=element.nextElementSibling
					if($L(div).hasClass('lyteKanbanNoResultMsg')){
						div.classList.remove('lyteHide')
					}
				}
			},
			onBeforeDrop : function ( droppableElement , belowElement , placeholderElement , fromIndex , toIndex , source , destination ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				flag = true;
				if( self.getMethods( 'onBeforeDropForCard' ) ){
					flag = self.executeMethod( 'onBeforeDropForCard', boardDetails, sourceArray, destArray, droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination ); 
				}
				return flag;
			},
			onDrop  : function( droppedElement , destination , belowElement , fromIndex , toIndex , source ) {
				var sourceIndex = source.getAttribute( 'index' ),
				destinationIndex = destination.getAttribute( 'index' ),
				boardDetails=self.getData( 'ltPropBoardDetails' ),
				sourceArray=boardDetails[ sourceIndex ].cards,
				destArray=boardDetails[ destinationIndex ].cards,
				draggedElement
				if(destArray.length==0){
					toIndex=0;
				}
				draggedElement = ( self.hasSameColumnReordered( source, destination ) ? Lyte.arrayUtils( destArray, 'splice', fromIndex, 1 ) : Lyte.arrayUtils( sourceArray, 'splice', fromIndex, 1 ) )
				Lyte.arrayUtils( destArray, 'splice', toIndex, 0, draggedElement[ 0 ] )
				delete self.prevent

				self.onRecordDrop( boardDetails, sourceArray, destArray, draggedElement, fromIndex, toIndex, source, destination ,droppedElement)

		 	} 
 		}); 
	},
	isDragging : function(){
		if(this.prevent){
			return true
		}
		return false
	},
	hasScrollEndReached : function() {
		var scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') ),
			boardDetails = this.getData( 'ltPropBoardDetails' ),
			clientRect=this.$node.getBoundingClientRect(),
			lastClient=scrollDiv.lastElementChild.getBoundingClientRect()
			if((!this._dir && lastClient.right-3 < clientRect.right)||(this._dir&& lastClient.left+3>Math.min(window.innerWidth,clientRect.left))){
					if( this.getMethods( 'onBodyScroll' ) ) {
					this.executeMethod( 'onBodyScroll', this, boardDetails );
					
					}
			}
         
	},
	addSortableForNewBoards : function() {
		var sortableClass = this.$node.querySelectorAll( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )[ 0 ].getSortableClass(),
		boardWithoutSortable = this.$node.querySelectorAll( '.lyteKanbanViewItem:not(.'+sortableClass+')' )

		$L(boardWithoutSortable).addClass("sortable-element "+sortableClass );
	},
	executeScrollStop : function(){
		if( this.getMethods( 'onBodyScrollStop' ) ) {
			var visible,boardDetails=this.getData('ltPropBoardDetails'),
			scrollDiv = this.$node.querySelector( '.lyteKanbanviewScrollDivSelector.'+this.getData('dummyId') )
			if(scrollDiv.scrollWidth>scrollDiv.clientWidth){
				if(this.getData('ltPropSameWidth')){
					visible = this.getVisibleNodeWithSameWidth()
				}
				else{
					visible = this.getVisibleNode()
				} 
			}
			else{
				visible = boardDetails
			}	
			this.executeMethod( 'onBodyScrollStop', boardDetails, visible, this, scrollDiv.scrollLeft, event );
		}
	},
	actions :{
		onBodyScroll : function( ev ) {
			clearTimeout(this.debounceTimeout)
			this.timeout2 = setTimeout( function() {
				this.hasScrollEndReached()
			}.bind( this ), 10 );
			this.debounceTimeout = setTimeout( function(){
				this.executeScrollStop()
			}.bind(this),100)
		}
	}
});
