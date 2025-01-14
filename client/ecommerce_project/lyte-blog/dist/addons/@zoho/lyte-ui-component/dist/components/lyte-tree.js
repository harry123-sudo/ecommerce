/**
 * Renders data in tree view
 * @component lyte-tree
 * @version 1.0.6
 * @methods onToggle,onToggleEnd

 */
Lyte.Component.register("lyte-tree", {
_template:"<template tag-name=\"lyte-tree\"> <template is=\"for\" items=\"{{ltPropData}}\" item=\"item\" index=\"index\"> <div class=\"lyteTreeBodyDiv\"> <lyte-tree-body data-index=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" class=\"{{lyteUiTreeClassHelp(item.defaultState,item.collapsed,ltPropWrapperOpenClass,ltPropWrapperCloseClass)}}\" data-level=\"{{lyteUiTreeLevelHelp(indexVar,index)}}\"> <div class=\"mainContainer lyteTreeMainContainer {{lyteUiTreeChildHelp(item,ltPropLeafContainer,ltPropChildrenValue)}} {{lyteUiTreeHasChildHelp(item)}} {{lyteTreeMaxChild(indexVar,index,ltPropMaxLevel)}}\"> <lyte-yield collapsed=\"{{if(item.collapsed,'collapsed','')}}\" yield-name=\"content\" list-value=\"{{item}}\" class=\"{{lyteUiTreeChildHelp(item,ltPropLeafNodeClass,ltPropChildrenValue)}}\"></lyte-yield> <template is=\"if\" value=\"{{lyteUiTreeMaxLevelHelp(indexVar,index,ltPropMaxLevel)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(expHandlers(item[ltPropChildrenValue][&quot;length&quot;],'!==',0),'&amp;&amp;',expHandlers(item[ltPropChildrenValue],'!==',undefined)),'&amp;&amp;',expHandlers(item.collapsed,'!'))}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(item.defaultState,'!'),'||',expHandlers(item.defaultState,'===',&quot;open&quot;))}}\"><template case=\"true\"> <lyte-tree class=\"lyteTreeOpened lyteTreeChildrenLevel\" lt-prop-children-value=\"{{ltPropChildrenValue}}\" index-var=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" lt-prop-data=\"{{item[ltPropChildrenValue]}}\" id=\"{{ltPropId}}\" lt-prop-tree-lines=\"{{ltPropTreeLines}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-open-class=\"{{ltPropOpenClass}}\" lt-prop-wrapper-open-class=\"{{ltPropWrapperOpenClass}}\" lt-prop-leaf-node-class=\"{{ltPropLeafNodeClass}}\" lt-prop-close-class=\"{{ltPropCloseClass}}\" lt-prop-wrapper-close-class=\"{{ltPropWrapperCloseClass}}\" lt-prop-max-level=\"{{ltPropMaxLevel}}\" on-toggle=\"{{method('onToggle')}}\" on-toggle-end=\"{{method('onToggleEnd')}}\"> <template is=\"registerYield\" yield-name=\"content\" from-parent=\"\"> </template> </lyte-tree> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(item.defaultState,'===',&quot;close&quot;)}}\"><template case=\"true\"> <lyte-tree class=\"lyteTreeClosed lyteTreeChildrenLevel\" lt-prop-children-value=\"{{ltPropChildrenValue}}\" index-var=\"{{lyteUiTreeIndexHelp(indexVar,index)}}\" lt-prop-data=\"{{item[ltPropChildrenValue]}}\" id=\"{{ltPropId}}\" lt-prop-tree-lines=\"{{ltPropTreeLines}}\" lt-prop-yield=\"{{ltPropYield}}\" lt-prop-open-class=\"{{ltPropOpenClass}}\" lt-prop-wrapper-open-class=\"{{ltPropWrapperOpenClass}}\" lt-prop-leaf-node-class=\"{{ltPropLeafNodeClass}}\" lt-prop-close-class=\"{{ltPropCloseClass}}\" lt-prop-wrapper-close-class=\"{{ltPropWrapperCloseClass}}\" lt-prop-max-level=\"{{ltPropMaxLevel}}\" on-toggle=\"{{method('onToggle')}}\" on-toggle-end=\"{{method('onToggleEnd')}}\"> <template is=\"registerYield\" yield-name=\"content\" from-parent=\"\"> </template> </lyte-tree> </template></template></template></template> </template></template> </template></template> </div> </lyte-tree-body> </div> </template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"insertYield","position":[1,1,1,1]},{"type":"attr","position":[1,1,1,3]},{"type":"if","position":[1,1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]}]}],
_observedAttributes :["ltPropData","ltPropChildrenValue","ltPropLeafContainer","ltPropWrapperOpenClass","ltPropWrapperCloseClass","ltPropOpenClass","ltPropCloseClass","ltPropLeafNodeClass","ltPropMaxLevel","treeHeight","ltPropStateAttr","heightTransArr","collapsedAll","tempVar","indexVar"],
	data : function(){
		return {

			/**
			 * @componentProperty {array} ltPropData
			 */

			'ltPropData' : Lyte.attr('array' , {
				'default'  : []
			}),

			/**
			 * @componentProperty {string} ltPropChildrenValue
			 * @default children
			 */

			'ltPropChildrenValue' : Lyte.attr('string',{
				'default' : 'children'
			}),

			/**
			 * @componentProperty {string} ltPropLeafContainer
			 * @default lyteTreeNoChildContainer
			 */

			'ltPropLeafContainer' : Lyte.attr('string' , {
				'default' : 'lyteTreeNoChildContainer'
			}),

			/**
			 * @componentProperty {string} ltPropWrapperOpenClass
			 */

			'ltPropWrapperOpenClass' : Lyte.attr('string',{
				'default' : ''
			}),

			/**
			 * @componentProperty {string} ltPropWrapperCloseClass
			 */

			'ltPropWrapperCloseClass' : Lyte.attr('string',{
				'default' : ''
			}),

			/**
			 * @componentProperty {string} ltPropOpenClass
			 */

			'ltPropOpenClass' : Lyte.attr('string' , {
				'default'  : ''
			}),

			/**
			 * @componentProperty {string} ltPropCloseClass
			 */

			'ltPropCloseClass' : Lyte.attr('string' , {
				'default'  : ''
			}),

			/**
			 * @componentProperty {string} ltPropLeafNodeClass
			 * @default lyteTreeHasNoChild
			 */

			'ltPropLeafNodeClass' : Lyte.attr('string' , {
				'default'  : 'lyteTreeHasNoChild'
			}),

			'ltPropMaxLevel' : Lyte.attr('number' , {
				'default' : 35
			}),

			'treeHeight' :  Lyte.attr('number' , {
				'default'  : 0
			}),
			'ltPropStateAttr' : Lyte.attr('string' , {
				'default' : ''
			}),

			'heightTransArr' : Lyte.attr('array' , {
				default : []
			}),

			collapsedAll : Lyte.attr('boolean' , {
				default : false
			}),

			tempVar : Lyte.attr('string', { default : ''}),
			indexVar : Lyte.attr('string',{default : ''})
		}
	},

	init : function(){

		if($L(this.$node).attr('class') === undefined){
			$L(this.$node).addClass('lyteTreeOpened')
		}

		var _thisTree = this

	this.$node.expandAll = function(){
		var _this = this

		var treeBody = $L(this).find('lyte-tree')[0].closest('lyte-tree-body')
		var icon = $L(treeBody).find('lyte-tree-icon')[0]

		function openingFun(){

			var children = $L(_this).find('.lyteTreeChildrenLevel')
			var maxedChild = $L(_this).find('.lyteTreeMaxedChild')

			$L(children).find('.lyteTreeCollapsed').removeClass('lyteTreeCollapsed')

			$L(children).find('.lyteTreeClosed').addClass('lyteTreeOpened');
			$L(children).find('.lyteTreeClosed').removeClass('lyteTreeClosed');
			$L(maxedChild).find('.lyteTreeOpened').addClass('lyteTreeClosed');
			$L(maxedChild).find('.lyteTreeOpened').removeClass('lyteTreeOpened');

			$L(children).find('.lyteIconClosed').addClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));
			$L(children).find('.lyteIconClosed').removeClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));
			$L(maxedChild).find('.lyteIconOpened').addClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));
			$L(maxedChild).find('.lyteIconOpened').removeClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));

			$L(_this).find('.lyteTreeChildrenLevel').css({display : '' , height : 'auto'});

			icon.click();

			_this.setData('collapsedAll' , false);
		}


		if($L('.lyteTreeCollapsed').length > 0){
			if(this.getData('collapsedAll')){
				openingFun()
			}
		} else {

			$L(_thisTree.$node).find('.lyteIconClosed:not(.lyteTreeIconMaxed)').click();

		}

	}
	this.$node.collapseAll = function(){

		if(!this.getData('collapsedAll')){
			var _this = this

			var collTrans = function(){

				$L(_this).find('.lyteTreeOpened').addClass('lyteTreeClosed');
				$L(_this).find('.lyteTreeOpened').removeClass('lyteTreeOpened');

				$L(_this).find('.lyteIconOpened').addClass('lyteIconClosed ' + _this.getData('ltPropCloseClass'));
				$L(_this).find('.lyteIconOpened').removeClass('lyteIconOpened ' + _this.getData('ltPropOpenClass'));

				$L(_this).find('.lyteTreeChildrenLevel').css({display : 'none' , height : 'auto'});

				$L(_this).find('.lyteTreeChildrenLevel')[0].removeEventListener('transitionend' , collTrans)
			}

			var treeBody = $L(this).find('lyte-tree')[0].closest('lyte-tree-body')
			var icon = $L(treeBody).find('lyte-tree-icon')[0]
			if(!$L(icon).hasClass('lyteIconClosed')){
				icon.click();
				$L(this).find('.lyteTreeChildrenLevel')[0].addEventListener('transitionend' , collTrans)
			} else {
				$L(icon).addClass('lyteTreeIconClosedM');
				collTrans();
			}

			$L(this).addClass('lyteTreeCollapsed')


			this.setData('collapsedAll' , true);
		}

	}
},

	openrecursive : function( array ){
		if( array.length ){
			var newEl = array[ 0 ];
			array.shift();
			if( !newEl || newEl.classList.contains( 'lyteTreeOpened' ) ){
				this.openrecursive( array )
				return
			}
			var icon = newEl.parentElement.querySelector( 'lyte-tree-icon' );
			clearTimeout( newEl._treetime );
			newEl.classList.remove( 'lyteTreeClosed' );
			newEl.classList.add( 'lyteTreeOpened' );
			icon.classList.remove( 'lyteIconClosed' )
			icon.classList.add( 'lyteIconOpened' );
			newEl.style.display = "";
			newEl.style.height = "auto";
			this.data.ltPropCloseClass && icon.classList.remove( this.data.ltPropCloseClass );
			this.data.ltPropOpenClass && icon.classList.add( this.data.ltPropOpenClass );
			newEl._treetime = setTimeout( this.heightcalc.bind( this, newEl, array ) , 0)
		}
	},

	heightcalc : function( elem, array ){
		if( !document.body.contains( elem ) ){
			this.openrecursive( array );
			return
		}
		var height = elem.getBoundingClientRect().height;
		elem.style.height = 0;
		if( height == 0 ){
			this.transEnd( elem, array )
		} else {
			setTimeout( this.heightset.bind( this, elem, array, height ), 20 )
		}
	},

	heightset : function( elem, array, height ){
		if( !document.body.contains( elem ) ){
			this.openrecursive( array );
			return
		}
		elem.style.height = height + 'px';
		elem._trn = this.transEnd.bind( this, elem, array )
		elem.addEventListener( 'transitionend', elem._trn )
	},

	transEnd : function( elem, array ){
		elem.style.height = "auto"
		elem.removeEventListener( 'transitionend', elem._trn )
		delete elem._trn;
		this.openrecursive( array );
	},

	stateChange : function( arg ){
		if( arg.newValue ){
			var idx = arg.newValue, elements = [],
			tree = Array.from( this.$node.getElementsByTagName( 'lyte-tree' ) ),
			_length = idx.length,
			fn = function( sliced, new_tree, item ){
				var value = item.component.data.tempVar;
				if( value.startsWith( sliced ) ){
					new_tree.push( item );
				}
				return value == sliced;
			}

			for( var i =  1; i <= _length; i++ ){
				var sliced = idx.slice( 0, i ),
				new_tree = [],

				filtered = tree.filter( fn.bind( this, sliced, new_tree ) );

				tree = new_tree;

				elements.push( filtered[ 0 ] );
			}
			this.openrecursive( elements )
			this.setData( 'ltPropStateAttr', '' )
		}
	}.observes( 'ltPropStateAttr' ),
	didConnect : function(){

	},
	methods : {onToggle : function(){},onToggleEnd : function(){}}
});

if(!_lyteUiUtils.registeredCustomElements['lyte-tree-icon']){

	_lyteUiUtils.registeredCustomElements['lyte-tree-icon'] = true

	Lyte.createCustomElement("lyte-tree-icon" , {
		connectedCallback : function(){
			var currTreeElem = $L(this).closest('lyte-tree');
			if(currTreeElem.hasClass('lyteTreeClosed')){
				currTreeElem[0].style.display = 'none';
			}
			if(!this.hasAttribute('lyte-custom-icon')){
				this.innerHTML = '<i class="arrow up"></i>';
			}
		},
		constructor : function(){
			var res = true;
			var classComponent = $L(this).closest('lyte-tree')[0]
			var lyteTreeIcon = this;
			var iconCorresTree = $L(this).closest('.lyteTreeMainContainer').find('lyte-tree')[0]
			if(iconCorresTree){
				if($L(iconCorresTree).hasClass('lyteTreeOpened')){
					$L(lyteTreeIcon).addClass('lyteIconOpened ' + classComponent.getData('ltPropOpenClass'))
				} else if($L(iconCorresTree).hasClass('lyteTreeClosed')){
					$L(lyteTreeIcon).addClass('lyteIconClosed ' + classComponent.getData('ltPropCloseClass'))
				}
			}

			if(	$L(this).closest('.lyteTreeMainContainer').hasClass('lyteTreeHasChild') ||
					$L(this).closest('.lyteTreeMainContainer').hasClass('lyteTreeMaxedChild') ){
				$L(lyteTreeIcon).addClass('lyteIconClosed lyteTreeIconMaxed ' + classComponent.getData('ltPropCloseClass'))
			}

			this.addEventListener( 'click', function(evt) {
					evt.preventDefault();
					var element, btn;
					element = btn = this;
					if(element){
						while(element.nodeName !== "LYTE-TREE-BODY"){
							element = element.parentElement;
						}
					}
					var clickedBtn = element.parentElement.parentElement;
					if(clickedBtn && clickedBtn.component.getMethods('onToggle')){
						res =	clickedBtn.component.executeMethod('onToggle', element, evt, clickedBtn,lyteTreeIcon);
						if(res === undefined){
							res = true
						}
					}
					if(res){

						if(element.nodeName === "LYTE-TREE-BODY"){

							var treeCont = element.querySelector('lyte-tree');
							var transBoolean = false;
							var hTransBoolean = false;
							if((treeCont)&&(!treeCont.classList.contains('treeTransRunning'))){
								var thisBtn = treeCont.component;
									function trans(){
										transBoolean = false;
										treeCont.classList.remove('lyteTreeOpened');
										// element.classList.remove( classComponent.getData('ltPropWrapperOpenClass') )
										element.className = classComponent.getData('ltPropWrapperCloseClass')
										treeCont.classList.add('lyteTreeClosed');
										treeCont.style.height = "auto";
										btn.style.pointerEvents = "auto";
										treeCont.style.display='none';
										lyteTreeIcon.className = classComponent.getData('ltPropCloseClass');
										lyteTreeIcon.classList.add( 'lyteIconClosed' );
										treeCont.classList.remove('treeTransRunning');
										treeCont.removeEventListener('transitionend' , trans);
										if(clickedBtn && clickedBtn.component.getMethods('onToggleEnd')){
											res =	clickedBtn.component.executeMethod('onToggleEnd', element, evt, clickedBtn,lyteTreeIcon);
										}

									}
									function heightTrans(){
										// if((element.classList).indexOf(classComponent.getData('ltPropWrapperCloseClass'))>-1){
										// 	element.classList.remove( classComponent.getData('ltPropWrapperCloseClass') )
										// }
										hTransBoolean = false;
										element.className = classComponent.getData('ltPropWrapperOpenClass')
										treeCont.style.height = thisBtn.getData('treeHeight') + "px";
										treeCont.style.height = "auto";
										btn.style.pointerEvents = "auto";
										lyteTreeIcon.className = classComponent.getData('ltPropOpenClass');
										lyteTreeIcon.classList.add( 'lyteIconOpened' );
										treeCont.classList.remove('treeTransRunning');
										treeCont.removeEventListener('transitionend' , heightTrans);
										if(clickedBtn && clickedBtn.component.getMethods('onToggleEnd')){
											res =	clickedBtn.component.executeMethod('onToggleEnd', element, evt, clickedBtn,lyteTreeIcon);
										}

									}
								if(treeCont.classList.contains('lyteTreeOpened')){
									var closingTempHeight = treeCont.getBoundingClientRect().height;
									treeCont.style.height = closingTempHeight + "px";
									setTimeout(function() {
										var closingTempHeight1 = treeCont.getBoundingClientRect().height;
										treeCont.style.height = "0px";
										treeCont.classList.add('treeTransRunning');
										transBoolean = true
									}, 10);
									treeCont.addEventListener('transitionend' , trans);
								} else {
									treeCont.classList.remove('lyteTreeClosed');
									treeCont.classList.add('lyteTreeOpened');
									treeCont.style.display='';
									treeCont.style.height='auto';

									if($L(treeCont).closest('.lyteTreeCollapsed').length>0){
										$L(treeCont).closest('.lyteTreeCollapsed')[0].setData('collapsedAll' , false)
										$L(treeCont).closest('.lyteTreeCollapsed').removeClass('lyteTreeCollapsed')
									}

									thisBtn.setData('treeHeight' , treeCont.getBoundingClientRect().height);
									treeCont.style.height='0px';
									setTimeout(function() {
										treeCont.style.height= thisBtn.getData('treeHeight') + 'px'
										treeCont.classList.add('treeTransRunning');
										hTransBoolean = true
									}, 30);
									treeCont.addEventListener('transitionend' , heightTrans);

								}

								var treeTime = getComputedStyle(treeCont).transitionDuration
								treeTime = parseFloat(treeTime.match(/-?\d.\d+/g)[0]) * 1500;

									setTimeout(function(){
										if(transBoolean){
											trans(treeCont);
										}
										if(hTransBoolean){
											heightTrans(treeCont);
										}
									} , treeTime)

							}
						}

						if(res !== undefined){
							if( res && res.then ) {

									res.then( function( arg ) {
										lyteTreePromiseFun();
									},function(){});
								}	else {
									if(res){
										lyteTreePromiseFun();
									}
								}
							} else {
								lyteTreePromiseFun();
							}
							function lyteTreePromiseFun(){
								var treeDt = clickedBtn.component.getData('ltPropData');
								var path = element.getAttribute('data-index').split(" ");

								if(path.length<2){
									var pathIndex = path[0];
									var x = treeDt[pathIndex];
									if(x !== undefined){
										Lyte.objectUtils(x, 'add', 'collapsed', false);
									}
								} else {
									var x = treeDt;
									for(var pathIndex = 1;pathIndex<path.length;pathIndex++){
										var x = treeDt[path[pathIndex]];
									}
									Lyte.objectUtils(x, 'add', 'collapsed', false)
								}
							}
					} else {
						lyteTreeIcon.className = classComponent.getData('ltPropOpenClass');
						lyteTreeIcon.classList.add( 'lyteIconOpened' );
					}
			}.bind(this));
		},
		static : {"observedAttributes" : {}}
	});

}

if( !_lyteUiUtils.registeredCustomElements[ 'lyte-tree-content' ] ) {
	_lyteUiUtils.registeredCustomElements[ 'lyte-tree-content' ] = true;

	Lyte.createCustomElement( "lyte-tree-content", {
		static: {
			"observedAttributes" : {
				get : function() {
					return [ ];
				}
			}
		},

		"connectedCallback": function() {
			var level = $L(this).closest('lyte-tree-body')[0].getAttribute('data-index').split(' ').length;
			this.setAttribute('lyte-tree-level' , level)
		}
	} );
}



/**
 * @syntax yielded
 *	 <lyte-tree>
 *	 <template is="registerYield" yield-name="content">
 *			 <lyte-tree-content onclick="{{action('test')}}">
 *				 <lyte-tree-icon lyte-custom-icon>
 *					 <div set-level="{{treeCheck(this)}}"></div>
 *						 <div class="collapseBox">
 *							 <div class="arrow"></div>
 *						 </div>
 *				 </lyte-tree-icon>
 *			 </lyte-tree-content>
 *		 </template>
 *	 </lyte-tree>
 */
