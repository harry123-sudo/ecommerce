/**
 * Renders a colorbox
 * @component lyte-colorbox
 * @version 1.0.0
 * @dependencies lyte-exif
 * @utility launch,push,open,zoomBy,replace,close,delete
 * @methods onBeforeOpen,onOpen,onBeforeClose,onClose,onLoad,onComplete,onFailure,onNavigate,onZoomin,onZoomout,onReset,onDownload
 */ 

var LyteColorbox = {
	_prefix : 'lyteCBox',
	_boxElement : 'lyteCBoxElement',
	_box : null,
	_content : null,
	_overlay : null,
	_title : null,
	_description: null,
	_close : null,
	_download : null,
	_next : null,
	_prev : null,
	_open : null,
	_zoomIn : null,
	_zoomOut : null,
	_reset : null,
	_active : null,
	_closing : null,
	_previousOffset : {},
	_first : true,
	_domEle : null,
	_related : null,
	_el : null,
	_photoRegex : /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
	_index : 0,
	_zoom : false,
	_component : null,
	_winheight : null,
	_winWidth : null,
	_isArray : false,
	_hrefArray : [],
	_titleArray : [],
	_nextItem : false,
	_prevItem : false,
	_zIndex : 0,
	_timeoutId : false,
	_thumbDiv : null,
	_clickNumber : 0,
	_zoomedThroughUtil: false,
	_count : 0,
	_boundKeydown : false,
	_boundResize : false,
	_diff : 0,
	_loadingIcon : null,

	setSize : function(size, dimension, param) {
		if(/%/.test(size)){
			return parseInt(size);
		}
		else{
			return Math.round((dimension === 'x' ? (isNaN(size/param) ? 0 : size/param) : (isNaN(size/param) ? 0 : size/param)) * 100);
		}
		// return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
	},

	createElement : function(tagName,id,className){
		var element = document.createElement(tagName);
		if (id) {
			element.id = id;
		}
		if (className) {
			element.classList.add(className);
		}
		return element;
	},

	/**
	 * The method is going to return the selector of the element that matches with ltPropSelectors
	 * ( Might be buggy when lt-prop-position is changed as it only removes opposites)
	 * @param {classList} compSelectors - The list of selectors provided to lyte-colorbox
	 * @param {ClassList} elemClasses - The list of classes that the element has
	 *
	 */
	getSelector : function(compSelectors,elemClasses){
		for(var i = 0; i<elemClasses.length; i++){
			if(compSelectors.indexOf('.'+elemClasses[i]) != -1){
				return elemClasses[i];
			}
		}
		return false;
	},

	/**
	 * The method is going to return the index of the next or previous element based on the argument passed ie. 1 or -1
	 * @param {number} increment - The value by which next or previous element's index is determined
	 *
	 */
	getIndex : function(increment) {
		var max = LyteColorbox._related.length,
		newIndex = (LyteColorbox._index + increment) % max;

		return (newIndex < 0) ? max + newIndex : newIndex;
	},

	isImage : function(url) {
		return LyteColorbox._domEle || LyteColorbox._photoRegex.test(url);
	},

	createName : function(param){
		if(!param){
			return LyteColorbox._el.type == "photo" ? "image" : "file";
		}
		return param.replace(/[ ,-]/g,"_");
	},

	/**
	 * The method is going to add the list or single object to the current list maintained in LyteColorbox._related
	 * @param {array of objects or a object} values - The list of objects or single object that will be added to the current related element list
	 *
	 */
	add : function(values){
		if(Array.isArray(values)){
			values = values.map(function(obj){
				if(!obj.lytecboxType || obj.lytecboxType == "photo"){
					obj.type = "photo";
				}
				else{
					var typeArr = obj.lytecboxType.split("/");
					obj.type = typeArr[0];
					if(typeArr.length > 1){
						obj.format = typeArr[1].toUpperCase();
					}
					else{
						obj.format = "WEBPAGE";
					}
				}
				return obj;
			});
		}
		else{
			if(!values.lytecboxType || values.lytecboxType == "photo"){
				values.type = "photo";
			}
			else{
				var typeArr = values.lytecboxType.split("/");
				values.type = typeArr[0];
				if(typeArr.length > 1){
					values.format = typeArr[1].toUpperCase();
				}
				else{
					values.format = "WEBPAGE";
				}
			}
		}
		Lyte.arrayUtils(LyteColorbox._related,"push",values);
	},

	/**
	 * The method is going to get the elements having same selector as mentioned by the rel property and will add it to LyteColorbox._related 
	 * @param {classList} rel - The classlist to be matched
	 *
	 */
	getRelated : function(rel) {
		LyteColorbox._index = 0;
		LyteColorbox._related = [];
		if (rel && rel !== false && rel !== 'nofollow') {
			var elements = Array.from(document.querySelectorAll('.' + LyteColorbox._boxEle)).filter(function (node) {
				return (LyteColorbox.getSelector(LyteColorbox._component.getData('ltPropSelectors'),Array.from(node.classList)) === rel);
			});
			for(var i = 0;i<elements.length;i++){
				var obj = LyteColorbox.getProperties(elements[i]);
				if(!obj.classList){
					obj.classList = [rel];
				}
				LyteColorbox._related.push(obj);
			}
			LyteColorbox._index = LyteColorbox._related.findIndex( function(obj) { return obj.lytecboxHref == LyteColorbox._el.lytecboxHref && obj.lytecboxTitle == LyteColorbox._el.lytecboxTitle});

			// Check direct calls to Colorbox.
			if (LyteColorbox._index === -1) {
				LyteColorbox._related.push(LyteColorbox._el);
				LyteColorbox._index = LyteColorbox._related.length - 1;
			}
		} else {
			LyteColorbox._related = [];
			LyteColorbox._related.push(LyteColorbox._el);
			LyteColorbox._index = LyteColorbox._related.length - 1;
		}
	},

	/**
	 * The method is going to hide the visible element in colorbox
	 *
	 */
	hideElement : function(){
		var elements = LyteColorbox._content ? LyteColorbox._content.querySelectorAll('.lyteCBoxVisible') : [];
		for(var i = 0; i < elements.length; i++){
			elements[i].classList.remove('lyteCBoxVisible');
		}
	},

	/**
	 * The method is going to specify mark the currently shown element in the colorbox
	 * @param {DOM element} element - The current visible element in colorbox
	 *
	 */
	setCurrentClass : function( element ){
		var elements = LyteColorbox._content ? LyteColorbox._content.querySelectorAll('.lyteCBoxCurrentElem') : [];
		for(var i = 0; i < elements.length; i++){
			elements[i].classList.remove('lyteCBoxCurrentElem');
		}
		element.classList.add('lyteCBoxCurrentElem');
	},

	/**
	 * The method is going to hide the loading icon
	 * @param {DOM element} parent - The parent element containing the loading icon
	 *
	 */
	hideLoadingIcon: function( parent ) {
		var loadingIcon;

		loadingIcon = parent.querySelector( '.lyteColorboxLoadingImg' );
		loadingIcon.style.display = 'none';
	},

	/**
	 * The method is going to hide or show the loading icon
	 *
	 */
	toggleLoadingIcon : function() {
		var type = LyteColorbox._component.getData( 'ltPropType' );

		if( type === 'custom' && !LyteColorbox._component.getData( 'ltPropYield' ) ) {
			if(LyteColorbox._content.querySelector('.lyteColorboxLoadingImg').style.display != "none"){
				LyteColorbox._content.querySelector('.lyteColorboxLoadingImg').style.display = "none";
			}
			else{
				LyteColorbox._content.querySelector('.lyteColorboxLoadingImg').style.display = "";
			}
		}
	},

	/**
	 * The method is going to create an object containing the properties that are required by the colorbox to load the element
	 * @param {DOM element} element - The element from which the properties are extracted
	 *
	 */
	getProperties : function(element){
		var obj = Object.assign({},element.dataset);
		if(!obj.lytecboxHref){
			if(element.tagName === "IMG"){
				obj.lytecboxHref = element.src;
			}
			else if(element.tagName === "A"){
				obj.lytecboxHref = element.href;
			}
		}
		if(!obj.lytecboxType || obj.lytecboxType == "photo"){
			obj.type = "photo";
		}
		else{
			var values = obj.lytecboxType.split("/");
			obj.type = values[0];
			if(values.length > 1){
				obj.format = values[1].toUpperCase();
			}
			else{
				obj.format = "WEBPAGE";
			}
		}
		obj.classList = element.classList;
		return obj;
	},

	removeElements : function(){
		var nodes = Array.from(LyteColorbox._content.querySelectorAll("."+LyteColorbox._prefix+"Photo")),
		comp = LyteColorbox._component,
		type = comp.getData( 'ltPropType' ),
		animation = comp.getData( 'ltPropAnimation' );
		Lyte.arrayUtils(nodes,"push",(Array.from(LyteColorbox._content.querySelectorAll("."+LyteColorbox._prefix+"Iframe"))));
		Lyte.arrayUtils(nodes,"push",(Array.from(LyteColorbox._content.querySelectorAll("."+LyteColorbox._prefix+"Custom"))));

		for(var i=0;i<nodes.length;i++){

			// if( type === 'all' ) {
				if( animation === "slide" ){
					nodes[i].parentElement.remove();
				}
				else{
					nodes[i].remove();
				}
			// }
			// else {
			// 	nodes[ i ].parentElement.remove();
			// }
			
		}
	},

	/**
	 * The method is going to set percentage property to the element
	 * @param {number} value - The zoom value to be added
	 * @param {number} scale - The scale value to be added
	 *
	 */
	setPercentage : function(value, scale){

		if(value){
			LyteColorbox._domEle.setAttribute('data-lytecb-size',value);
		}
		else{
			var orientation = LyteColorbox._domEle.getAttribute('lytecbox-rotate'),
				width = orientation && orientation.indexOf('90') != -1 ? LyteColorbox._domEle.naturalHeight : LyteColorbox._domEle.naturalWidth,
				value, currWidth;
			if(scale){
				currWidth = orientation && orientation.indexOf('90') != -1 ? LyteColorbox._domEle.offsetHeight : LyteColorbox._domEle.offsetWidth;
				value = ((currWidth * scale) / width) * 100;

			}
			else{
				currWidth = LyteColorbox._domEle.getBoundingClientRect().width;
				value = (currWidth / width) * 100;
			}
			LyteColorbox._domEle.setAttribute('data-lytecb-size', (value % 1 != 0) ? Number.parseFloat(value).toFixed(2) : value);
		}
	},

	checkHW : function(){
		// var eleOffset = LyteColorbox._domEle.getBoundingClientRect();
		// var parentOffset = LyteColorbox._domEle.parentElement.getBoundingClientRect();
		if(LyteColorbox._el.type == "photo" && LyteColorbox._domEle.offsetHeight >= LyteColorbox._domEle.parentElement.offsetHeight){
			LyteColorbox._domEle.parentElement.classList.add('lyteCBoxAlignStart');
		}
		else{
			LyteColorbox._domEle.parentElement.classList.remove('lyteCBoxAlignStart');
		}
	},

	isSameColorBoxAsPrevious: function( comp ) {
		return LyteColorbox._component && LyteColorbox._component.$node.isEqualNode( comp.$node );
	},

	/**
	 * The method is going to set the properties of LyteColorbox object based on the current lyte-colorbox component
	 * @param {object} component - Properties of current lyte-colorbox component
	 *
	 */
	setupForBindings: function( comp ) {
		if( this.isSameColorBoxAsPrevious( comp ) ) {
			return;
		}

		LyteColorbox._boxEle = comp._boxElement;
		LyteColorbox._content = comp._content;
		LyteColorbox._overlay = comp._overlay;
		LyteColorbox._title = comp._title;
		LyteColorbox._description = comp._description;
		LyteColorbox._close = comp._close;
		LyteColorbox._download = comp._download;
		LyteColorbox._next = comp._next;
		LyteColorbox._prev = comp._prev;
		LyteColorbox._box = comp._box;
		LyteColorbox._zoomIn = comp._zoomIn;
		LyteColorbox._zoomOut = comp._zoomOut;
		LyteColorbox._reset = comp._reset;
		LyteColorbox._thumbDiv = comp._thumbDiv;
		LyteColorbox._loadingIcon = comp._loadingIcon;
		LyteColorbox._component = comp;
	},

	/**
	 * The method is going to initialize the colorbox component and derive all the properties required to show an element
	 * @param {DOM element} element - The current element to be opened
	 * @param {object} event - The current event object
	 *
	 */
	launch : function(element,event) {
		if(this.$node){
			LyteColorbox.setupForBindings(this);
		}

		if (!LyteColorbox._closing) {
			if(element && typeof element === "object"){
				if(element.nodeType){
					var obj = LyteColorbox.getProperties(element);
					LyteColorbox._el = element = obj;
					LyteColorbox.getRelated(LyteColorbox.getSelector(LyteColorbox._component.getData('ltPropSelectors'),Array.from(element.classList)));
				}
				else if(element.lytecboxHref){
					LyteColorbox._el = element;
					if(element.classList){
						LyteColorbox.getRelated(LyteColorbox.getSelector(LyteColorbox._component.getData('ltPropSelectors'),Array.from(element.classList)));
					}
					else{
						LyteColorbox._related = [];
						LyteColorbox._related.push(LyteColorbox._el);
					}
				}
			}
			else{
				LyteColorbox._related = [];
			}
			// LyteColorbox._component.setData('ltPropGroup',LyteColorbox._related);

			var returnVal = LyteColorbox._component.callOnBeforeOpen(LyteColorbox._related, event) == false ? false : true;
			if(!returnVal){
				LyteColorbox._related = null;
				LyteColorbox._el = null;
				return;
			}
			if(!LyteColorbox._el){
				LyteColorbox._el = element = LyteColorbox._related[0];
			}
			// LyteColorbox._related = LyteColorbox._component.getData('ltPropGroup');
			LyteColorbox._index = LyteColorbox._related instanceof Array ? LyteColorbox._related.findIndex( function(obj) { return obj.lytecboxHref == LyteColorbox._el.lytecboxHref && obj.lytecboxTitle == LyteColorbox._el.lytecboxTitle}) : 0;
			if(!LyteColorbox._component.getData('ltPropYield')){
				if(LyteColorbox._related.length > 1){
					LyteColorbox._next.classList.remove('lyteColorboxHideVisibility');
					LyteColorbox._prev.classList.remove('lyteColorboxHideVisibility');
				}
				else{
					LyteColorbox._next.classList.add('lyteColorboxHideVisibility');
					LyteColorbox._prev.classList.add('lyteColorboxHideVisibility');
				}
			}

			if (!LyteColorbox._open) {

				LyteColorbox._open = LyteColorbox._active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				document.body.classList.add('lyteCBoxOH');
				// setClass(settings.get('className'));
				LyteColorbox._box.classList.add('lyteColorboxHideVisibility','lyteColorboxDisplay');

				LyteColorbox._component.trapFocus();
				
				if(LyteColorbox._overlay){
					LyteColorbox.computeOffsetImpl();
				}
				LyteColorbox.hideElement();
				LyteColorbox._box.classList.remove('lyteColorboxHideVisibility');
				LyteColorbox._component.setData('thumbnails',LyteColorbox._related);
				LyteColorbox._component.setData('triggerSetThumbnail', LyteColorbox._component.getData('triggerSetThumbnail')+1 );
				LyteColorbox._component.callOnOpen();
				// setTimeout(function(){
					LyteColorbox.load(element, true);
				// },100)
				
			}
			else{
				LyteColorbox.load(element);
			}

			
		}
	},

	/**
	 * The method is going to use the values and load the item which can be an image or webpage or any other document
	 * @param {Object} element - DOM element or an object which contains the values that will be used to load the item to be shown in the colorbox
	 * @param {boolean} init - boolean value indicating that the colorbox is opening for the first time
	 * 
	 */
	load : function(element, init){
		LyteColorbox._active = true;
		LyteColorbox._domEle = false;
		var complete, failure, ele, domEl;
		
		var href = element.lytecboxHref;
		var title = element.lytecboxTitle;
		if(LyteColorbox._title && title){
			LyteColorbox._title.textContent = title;
		}
		var className = LyteColorbox._boxEle+'__'+LyteColorbox._index;
		LyteColorbox._content.classList.remove('lyteCBoxOH');
		if(element.type == "custom"){
			LyteColorbox._component.setData('isIframe',true);
			if(!element.lytecboxDlink){
				LyteColorbox._component.setData('download',false);
			}
			domEl = LyteColorbox._content.querySelector('.'+className);
			LyteColorbox._domEle = domEl;
			if(!LyteColorbox._domEle){
				LyteColorbox._domEle = LyteColorbox.createElement("div",null,null);
				$L(LyteColorbox._domEle)
					.attr({
						'class': LyteColorbox._prefix + 'Custom' +" "+className
					});
				if(element.lytecboxPreview == "none"){
					var htmlEle = LyteColorbox.createElement("div",null,LyteColorbox._prefix + 'PreviewNone');
					if(element.lytecboxIcon){
						htmlEle.style.backgroundImage = 'url('+element.lytecboxIcon+')';
					}
					LyteColorbox._domEle.append(htmlEle);
					htmlEle =  LyteColorbox.createElement("div",null,LyteColorbox._prefix + 'CustomText');
					htmlEle.textContent = element.lytecboxAlt || "Sorry, no preview is available for this file format";
					LyteColorbox._domEle.append(htmlEle);
				}
				LyteColorbox._component.callOnLoad(LyteColorbox._domEle,LyteColorbox._index);
				LyteColorbox.toggleLoadingIcon();
				LyteColorbox.appendElement(LyteColorbox._domEle);
				if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
					setTimeout(function(){
						LyteColorbox.slide();
					},10);
				}
				LyteColorbox._active = false;
				LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
			}
			else{
				LyteColorbox.toggleLoadingIcon();
				if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
					LyteColorbox._zIndex++;
					if(LyteColorbox._nextItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxNextItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					else if(LyteColorbox._prevItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxPreviousItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					setTimeout(function(){
						LyteColorbox.slide();
					},10);
				}else{
					LyteColorbox._domEle.classList.add('lyteCBoxVisible');
				}
				LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
				LyteColorbox._active = false;
			}
		}
		else if(element.type == "iframe"){
			LyteColorbox._component.setData('isIframe',true);
			if(!element.lytecboxDlink){
				LyteColorbox._component.setData('download',false);
			}
			domEl = LyteColorbox._content.querySelector('.'+className);
			LyteColorbox._domEle = domEl;
			if(!LyteColorbox._domEle){
				LyteColorbox._domEle = document.createElement('iframe');
				var attrs = element.lytecboxAttrs || {};
				if(!attrs.width){
					attrs.width = "100%";
				}
				if(!attrs.height){
					attrs.height = "100%";
				}

				if (typeof attrs === 'object') {
					$L.each(attrs, function(key, val){
						LyteColorbox._domEle[key] = val;
					});
				}

				if ('frameBorder' in LyteColorbox._domEle) {
					LyteColorbox._domEle.frameBorder = 0;
				}
				if ('allowTransparency' in LyteColorbox._domEle) {
					LyteColorbox._domEle.allowTransparency = "true";
				}
				LyteColorbox._domEle.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
				LyteColorbox._domEle.allowFullscreen = true;

				// if (!settings.get('scrolling')) {
				// 	iframe.scrolling = "no";
				// }

				// $events.one(event_purge, function () {
				// 	iframe.src = "//about:blank";
				// });
				var appendIframe = function(){
					LyteColorbox._domEle.onload = function(){
						// alert("loaded colorbox");
						LyteColorbox.toggleLoadingIcon();
						LyteColorbox._component.callOnLoad(LyteColorbox._domEle,LyteColorbox._index);
						if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
							setTimeout(function(){
								LyteColorbox.slide();
							},10);
						}
						LyteColorbox._active = false;
						LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
					}
					LyteColorbox._domEle.onerror = function(){
						alert("error on colorbox");
					}
					LyteColorbox.appendElement(LyteColorbox._domEle);
					
				};

				$L(LyteColorbox._domEle)
					.attr({
						'src': href,
						'class': LyteColorbox._prefix + 'Iframe' +" "+className
					});
				
				appendIframe();
				
			}
			else{
				LyteColorbox.toggleLoadingIcon();
				if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
					LyteColorbox._zIndex++;
					if(LyteColorbox._nextItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxNextItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					else if(LyteColorbox._prevItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxPreviousItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					setTimeout(function(){
						LyteColorbox.slide();
					},10);
				}else{
					LyteColorbox._domEle.classList.add('lyteCBoxVisible');
				}
				LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
				LyteColorbox._active = false;
			}			
		}
		else{	//element.type == "photo"
			var type = LyteColorbox._component.getData( 'ltPropType' ),
				getExifData = LyteColorbox._component.getData( 'ltPropAddOrientation' );

			LyteColorbox._component.setData('isIframe',false);
			LyteColorbox._component.setData('download',true);
			domEl = LyteColorbox._content.querySelector('.'+className);
			LyteColorbox._domEle = domEl;
			if(type != "image"){
				LyteColorbox._content.classList.add('lyteCBoxOH');
			}
			if(!LyteColorbox._domEle){
				LyteColorbox._domEle = new Image();
				if(element.lytecboxClass){
					var classes = element.lytecboxClass.split(" ");
					$L.each(classes,function(index, val){
						LyteColorbox._domEle.classList.add(val);
					});
				}				

				var divElement;
				if( type === "image" ) {
					divElement = LyteColorbox.appendElementForImage();

					if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
						if(init){
							divElement.classList.add('lyteCBoxCurrentItem');
						}
						LyteColorbox.slide();
					}
					else{
						LyteColorbox.setCurrentClass(divElement);
					}
				}

				var image = $L(LyteColorbox._domEle),
					imageComplete = LyteColorbox.imageComplete.bind( divElement ),
					imageFailure = LyteColorbox.imageFailure.bind( divElement );

				if(getExifData){
					var xhr = new XMLHttpRequest(), prefix = LyteColorbox._prefix;
					xhr.onload = function() {
					    var reader = new FileReader();
					    reader.onloadend = function() {
					    	image.attr({
								'src': reader.result,
								'class': prefix + 'Photo' +" "+className,
								'alt': LyteColorbox._component.getData('ltPropImgError')
							})
							.one('load', imageComplete )
							.one('error', imageFailure);
					    	// callback(reader.result);
					    }
					    reader.readAsDataURL(xhr.response);
					};
					xhr.onError = function() {
					    image.attr({
							'src': href,
							'class': prefix + 'Photo' +" "+className,
							'alt': LyteColorbox._component.getData('ltPropImgError')
						})
						.one('load', imageComplete )
						.one('error', imageFailure);
					};
					xhr.open('GET', href);
					xhr.responseType = 'blob';
					xhr.send();
				}
				else{
					image.attr({
						'src': href,
						'class': LyteColorbox._prefix + 'Photo' +" "+className,
						'alt': LyteColorbox._component.getData('ltPropImgError')
					})
					.one('load', imageComplete )
					.one('error', imageFailure);
				}
				

				if( type === 'image' ) {
					divElement.appendChild( image.get( 0 ) );
				}

				LyteColorbox._active = false;
			}
			else{
				LyteColorbox.toggleLoadingIcon();

				// We make the transition property none inside the reset function because of lyteCBoxPhoto
				// now we are bringing it back. We are emptying it because the lyteCBoxPhoto was causing the image
				// to slide when it was reset
				LyteColorbox.enableTransition( LyteColorbox._domEle );
				if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
					LyteColorbox._zIndex++;
					if(LyteColorbox._nextItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxNextItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					else if(LyteColorbox._prevItem){
						ele = LyteColorbox._domEle.parentElement;
						ele.classList.remove('lyteCBoxDN');
						ele.classList.add('lytCBoxPreviousItem');
						// ele.style.zIndex = LyteColorbox._zIndex;
						LyteColorbox._component.setData('currentEle',ele);
					}
					// setTimeout(function(){
						LyteColorbox.slide();

						if( LyteColorbox._domEle.parentElement._loaded ) {
							if(!(LyteColorbox._domEle.classList.contains('lyteCBoxVisible'))){
								LyteColorbox._domEle.classList.add('lyteCBoxVisible');
							}
							LyteColorbox.checkAspectRatio();
						}
						
					// },10);
					
				}else{
					if( type === "image" ) {
						LyteColorbox.setCurrentClass(LyteColorbox._domEle.parentElement);
					}
					LyteColorbox._domEle.classList.add('lyteCBoxVisible');
					LyteColorbox.checkHW();
					LyteColorbox.checkAspectRatio();
				}
				LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
				LyteColorbox._active = false;
			}
			
		}

		// $L(LyteColorbox._domEle).one('load', complete);

		if(LyteColorbox._component.getData('ltPropThumbnail')){
			var currentThumbnail = LyteColorbox._thumbDiv.querySelector('.thumb-on');
			if(currentThumbnail){
				currentThumbnail.classList.remove('thumb-on');
			}
			LyteColorbox._thumbDiv.querySelectorAll('.lyteColorboxThumb')[LyteColorbox._index].classList.add('thumb-on');
			LyteColorbox.updateThumbnailPos();
		}

		this.changeNavArrows();

	},

	changeNavArrows: function() {
		var ind = LyteColorbox._index;

		if(!LyteColorbox._component.getData('ltPropLoop')){
			if(ind == 0){
				if(LyteColorbox._prev){
					LyteColorbox._prev.classList.add('lyteColorboxHideVisibility');
				}
			}
			else if(ind == LyteColorbox._related.length - 1){
				if(LyteColorbox._next){
					LyteColorbox._next.classList.add('lyteColorboxHideVisibility');
				}
			}
			else{
				if(LyteColorbox._prev && LyteColorbox._prev.classList.contains('lyteColorboxHideVisibility')){
					LyteColorbox._prev.classList.remove('lyteColorboxHideVisibility');
				}
				if(LyteColorbox._next && LyteColorbox._next.classList.contains('lyteColorboxHideVisibility')){
					LyteColorbox._next.classList.remove('lyteColorboxHideVisibility');
				}
			}
		}
	},

	/**
	 * The method is going to do the computations after the image is loaded in the DOM
	 *
	 */
	imageComplete : function(){
		var type = LyteColorbox._component.getData( 'ltPropType' ), img,
			getExifData = LyteColorbox._component.getData( 'ltPropAddOrientation' );
		this._loaded = true;

		if( type === 'custom' ) {
			LyteColorbox.checkAndChangeStatus( LyteColorbox._domEle );
			LyteColorbox._domEle._offset = {
											height : LyteColorbox._domEle.naturalHeight,
											width : LyteColorbox._domEle.naturalWidth
										};
			LyteColorbox._component.callOnLoad(LyteColorbox._domEle,LyteColorbox._index);
			img = LyteColorbox._domEle;
			img.classList.add('lyteCBoxDNImp');
			if(LyteColorbox._overlay){
				LyteColorbox.computeOffsetImpl(null,img,true);
				if(getExifData && $L.exif){
					img._index = LyteColorbox._index;
					$L.exif({
							target : img,
							getData : function(obj){
								// console.log('lyte-exif', obj.exifdata);
								img = obj.target;
								img.classList.add('lyteColorBoxDisableTransition');
								if(getComputedStyle(img).imageOrientation != "from-image"){
									var rValue = obj.exifdata.Orientation;
									switch(rValue) {
										case 2 :
											img.setAttribute('style','transform:rotateY(180deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg)');
											break;
										case 3 :
											img.setAttribute('style','transform:rotate(180deg)');
											img.setAttribute('lytecbox-rotate','rotate(180deg)');
											break;
										case 4 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(180deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(180deg)');
											break;
										case 5 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(90deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(90deg)');
											break;
										case 6 :
											img.setAttribute('style','transform:rotate(90deg)');
											img.setAttribute('lytecbox-rotate','rotate(90deg)');
											break;
										case 7 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(-90deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(-90deg)');
											break;
										case 8 :
											img.setAttribute('style','transform:rotate(-90deg)');
											img.setAttribute('lytecbox-rotate','rotate(-90deg)');
											break;
							        }
								}
								img.classList.remove('lyteCBoxDNImp');
								img.classList.remove('lyteColorBoxDisableTransition');
								LyteColorbox.checkAspectRatio();
								LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
							}
						})
				}
				else{
					if(getExifData){
						console.log("Couldn't fetch exifdata as the plugin is not included.");
					}
					img.classList.remove('lyteCBoxDNImp');
					LyteColorbox.checkAspectRatio();
					LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
				}
			}
			else{
				LyteColorbox.toggleLoadingIcon();
				LyteColorbox.appendElement(LyteColorbox._domEle);	
				if(getExifData && $L.exif){
					img._index = LyteColorbox._index;
					$L.exif({
							target : img,
							getData : function(obj){
								// console.log('lyte-exif', obj.exifdata);
								img = obj.target;
								img.classList.add('lyteColorBoxDisableTransition');
								if(getComputedStyle(img).imageOrientation != "from-image"){
									var rValue = obj.exifdata.Orientation;
									switch(rValue) {
										case 2 :
											img.setAttribute('style','transform:rotateY(180deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg)');
											img.setAttribute('data-orientation',2);
											break;
										case 3 :
											img.setAttribute('style','transform:rotate(180deg)');
											img.setAttribute('lytecbox-rotate','rotate(180deg)');
											img.setAttribute('data-orientation',3);
											break;
										case 4 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(180deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(180deg)');
											img.setAttribute('data-orientation',4);
											break;
										case 5 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(90deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(90deg)');
											img.setAttribute('data-orientation',5);
											break;
										case 6 :
											img.setAttribute('style','transform:rotate(90deg)');
											img.setAttribute('lytecbox-rotate','rotate(90deg)');
											img.setAttribute('data-orientation',6);
											break;
										case 7 :
											img.setAttribute('style','transform:rotateY(180deg) rotate(-90deg)');
											img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(-90deg)');
											img.setAttribute('data-orientation',7);
											break;
										case 8 :
											img.setAttribute('style','transform:rotate(-90deg)');
											img.setAttribute('lytecbox-rotate','rotate(-90deg)');
											img.setAttribute('data-orientation',8);
											break;
							        }
								}
								img.classList.remove('lyteCBoxDNImp');
								img.classList.remove('lyteColorBoxDisableTransition');
								LyteColorbox.checkAspectRatio();
								if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
									// setTimeout(function(){
										LyteColorbox.slide();
									// },10);
								}
								LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
							}
						})
				}
				else{
					if(getExifData){
						console.log("Couldn't fetch exifdata as the plugin is not included.");
					}
					img.classList.remove('lyteCBoxDNImp');
					LyteColorbox.checkAspectRatio();
					if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
						// setTimeout(function(){
							LyteColorbox.slide();
						// },10);
					}
					LyteColorbox._component.callOnComplete(LyteColorbox._domEle,LyteColorbox._index);
				}
			}
		}
		else {
			img = this.querySelector( 'img' );

			LyteColorbox.checkAndChangeStatus( img );
			img._offset = {
				height : img.naturalHeight,
				width : img.naturalWidth
			};

			LyteColorbox.hideLoadingIcon( this );
			// Ask if index will be proper
			if(getExifData && $L.exif){
				img._index = LyteColorbox._index;
				$L.exif({
						target : img,
						getData : function(obj){
							// console.log('lyte-exif', obj.exifdata);
							img = obj.target;
							img.classList.add('lyteColorBoxDisableTransition');
							if(getComputedStyle(img).imageOrientation != "from-image"){
								var rValue = obj.exifdata.Orientation;
								switch(rValue) {
									case 2 :
										img.setAttribute('style','transform:rotateY(180deg)');
										img.setAttribute('lytecbox-rotate','rotateY(180deg)');
										img.setAttribute('data-orientation',2);
										break;
									case 3 :
										img.setAttribute('style','transform:rotate(180deg)');
										img.setAttribute('lytecbox-rotate','rotate(180deg)');
										img.setAttribute('data-orientation',3);
										break;
									case 4 :
										img.setAttribute('style','transform:rotateY(180deg) rotate(180deg)');
										img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(180deg)');
										img.setAttribute('data-orientation',4);
										break;
									case 5 :
										img.setAttribute('style','transform:rotateY(180deg) rotate(90deg)');
										img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(90deg)');
										img.setAttribute('data-orientation',5);
										break;
									case 6 :
										img.setAttribute('style','transform:rotate(90deg)');
										img.setAttribute('lytecbox-rotate','rotate(90deg)');
										img.setAttribute('data-orientation',6);
										break;
									case 7 :
										img.setAttribute('style','transform:rotateY(180deg) rotate(-90deg)');
										img.setAttribute('lytecbox-rotate','rotateY(180deg) rotate(-90deg)');
										img.setAttribute('data-orientation',7);
										break;
									case 8 :
										img.setAttribute('style','transform:rotate(-90deg)');
										img.setAttribute('lytecbox-rotate','rotate(-90deg)');
										img.setAttribute('data-orientation',8);
										break;
						        }
							}
							LyteColorbox._component.callOnLoad( img,img._index, img.exifdata );
							// img.classList.add('lyteCBoxVisible');
							img.classList.remove('lyteColorBoxDisableTransition');

							// only calculate aspect ratio if it is current displayed image
							if( LyteColorbox._domEle === img ) {
								img.classList.add('lyteCBoxVisible');
								LyteColorbox.checkAspectRatio();
							}
							LyteColorbox._component.callOnComplete(img, img._index);
							// LyteColorbox.setPercentage();
						}
					})
			}
			else{
				if(getExifData){
					console.log("Couldn't fetch exifdata as the plugin is not included.");
				}
				LyteColorbox._component.callOnLoad( img, LyteColorbox._index );
				img.classList.add('lyteCBoxVisible');

				// only calculate aspect ratio if it is current displayed image
				if( LyteColorbox._domEle === img ) {
					LyteColorbox.checkAspectRatio();
				}
				LyteColorbox._component.callOnComplete(img,LyteColorbox._index);
				// LyteColorbox.setPercentage();
			}
		}
		
	},

	/**
	 * The method is triggered when the image fails to load
	 *
	 */
	imageFailure : function(){
		var type = LyteColorbox._component.getData( 'ltPropType' ), img;
		if(type === 'custom'){
			img = LyteColorbox._domEle;
			LyteColorbox.toggleLoadingIcon();
		}
		else{
			img = this.querySelector( 'img' );
			LyteColorbox.hideLoadingIcon( this );
		}
		LyteColorbox._component.callOnFailure(img,LyteColorbox._index,LyteColorbox._content);
	},

	/**
	 * The method is going to update the thumbnail based on the item shown in the colorbox
	 *
	 */
	updateThumbnailPos : function(){
		var ind = LyteColorbox._index,
			total = LyteColorbox._component.getData('ltPropThumbnailNumber'),
			mean = parseInt(total / 2),
			end = total % 2 == 0 ? LyteColorbox._related.length : LyteColorbox._related.length - 1,
			div = LyteColorbox._thumbDiv.querySelector('.lyteColorboxThumbInnerWrapper'),
			thumbnails = LyteColorbox._thumbDiv.querySelectorAll('.lyteColorboxThumb'),
			thumbnailsOffset = window.getComputedStyle(thumbnails[0]),
			thumbnailWidth = (parseInt(thumbnailsOffset.width) + (thumbnailsOffset.marginLeft ? parseInt(thumbnailsOffset.marginLeft) : 0) + (thumbnailsOffset.marginRight ? parseInt(thumbnailsOffset.marginRight) : 0)),
			direction = /*LyteColorbox._component.getData('ltPropDirection') == 'rtl'*/_lyteUiUtils.getRTL() ? -1 : 1;
		if(LyteColorbox._component.getData('ltPropType') === "custom"){
			if(ind >= mean && ind <= (end - mean)){
				div.style.transform = "translate("+((mean - ind)*thumbnailWidth * direction)+"px,0)";
			}
			else if(ind < mean){
				div.style.transform = "translate(0,0)";
			}
			else if(ind > (end - mean) && LyteColorbox._related.length > total){
				div.style.transform = "translate("+((mean - (end - mean))*thumbnailWidth * direction)+"px,0)";
			}
		}
		else{
			var width = LyteColorbox._thumbDiv.offsetWidth;
			total = Math.floor(width/thumbnailWidth);
			mean = parseInt(total / 2);
			if(ind >= mean && ind <= (end - mean)){
				var left = 0;
				if((ind == mean || ind == (end - mean)) && total % 2 == 0){
					LyteColorbox._diff = left = thumbnailWidth / 2 * (-direction);
				}
				if(ind > mean && ind < (end - mean)){
					left = ((mean - ind)*thumbnailWidth * direction) + ((width - total * thumbnailWidth) / 2) + LyteColorbox._diff;
				}
				if(ind == (end - mean)){
					left = (width - LyteColorbox._related.length * thumbnailWidth) * direction + (thumbnailsOffset.marginRight ? parseInt(thumbnailsOffset.marginRight) : 0);
				}
				div.style.transform = "translate("+/*((mean - ind)*thumbnailWidth * direction)*/left+"px,0)";
			}
			else if(ind < mean){
				div.style.transform = "translate(0,0)";
			}
			else if(ind > (end - mean) && LyteColorbox._related.length > total){
				var left = (width - LyteColorbox._related.length * thumbnailWidth) * direction + (thumbnailsOffset.marginRight ? parseInt(thumbnailsOffset.marginRight) : 0);
				div.style.transform = "translate("+left+"px,0)";
			}
		}
	},

	calculateOverlayHeight : function(winheight){
		if(!LyteColorbox._component.getData('ltPropYield')){
			LyteColorbox._overlay.style.height = winheight - 50 + "px";
		}
		else{
			LyteColorbox._overlay.style.height = LyteColorbox._overlay.getBoundingClientRect().height + "px";
		}
	},

	/**
	 * The method is going to do the calculation when images are loaded in a custom lyte-colorbox and will set the height and width
	 * @param {object} event - The event object
	 * @param {DOM element} photo - The image element
	 * @param {boolean} preventCheckAspectRatio - Boolean value based on which the aspect ratio of the image is checked
	 *
	 */
	computeOffsetImpl : function(event,photo,preventCheckAspectRatio){
		var comp = LyteColorbox._component, 
		type = comp.getData( 'ltPropType' ),
		header = type === 'custom' ? document.querySelector('.lyteColorboxHeader') : comp._header;

		if( LyteColorbox._open && LyteColorbox._overlay) {
			var winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    	var winheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    	if(LyteColorbox._component.getData('ltPropThumbnail')){
	    		var cs = window.getComputedStyle(LyteColorbox._thumbDiv);
	    		winheight = winheight - (parseInt(cs.height) + parseInt(cs.marginTop));
	    	}
			var offset = {};
			if(!LyteColorbox._first){
				window.removeEventListener('resize',LyteColorbox.computeOffsetImpl);
			}
			LyteColorbox._first = false;
	    	var overlayOffset = LyteColorbox._overlay.getBoundingClientRect();
			if(photo){
				if(LyteColorbox._component.getData('ltPropHeight')){
					offset.conHeight = parseInt(LyteColorbox._component.getData('ltPropHeight'));
				}
				else{
					if(photo.height >= overlayOffset.height){
						offset.conHeight = overlayOffset.height;
					}
					else{
						offset.conHeight = photo.height;
					}
				}
				if(LyteColorbox._component.getData('ltPropWidth')){
					offset.conWidth = parseInt(LyteColorbox._component.getData('ltPropWidth'));
				}
				else{
					if(photo.width >= overlayOffset.width){
						offset.conWidth = overlayOffset.width;
					}
					else{
						offset.conWidth = photo.width;
					}
				}

				LyteColorbox.toggleLoadingIcon();
				LyteColorbox.appendElement(photo);
				if(!preventCheckAspectRatio){
					LyteColorbox.checkAspectRatio();
				}
				LyteColorbox._active = false;

			}
			if(!LyteColorbox._component.getData('ltPropYield')){
				offset.top = (winheight - LyteColorbox._content.getBoundingClientRect().height) / 2 ;
				offset.left = (winWidth - LyteColorbox._content.getBoundingClientRect().width) / 2;
				offset.iconTop = ((winheight - LyteColorbox._next.getBoundingClientRect().height) / 2 ) + (header.getBoundingClientRect().height / 2);
			}
			else{
				var contentOffset = LyteColorbox._content.getBoundingClientRect();
				var overlayOffset = LyteColorbox._overlay ? LyteColorbox._overlay.getBoundingClientRect() : {height : winheight, width : winWidth};
				LyteColorbox._content.style.top = (overlayOffset.height - contentOffset.height) / 2 + "px";
				LyteColorbox._content.style.left = (overlayOffset.width - contentOffset.width) / 2 + "px";
				if(window.getComputedStyle(LyteColorbox._content).transform){
					LyteColorbox._content.style.transform = "none";
				}
			}
			if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
				LyteColorbox.slide();
			}
			
			window.addEventListener('resize',LyteColorbox.computeOffsetImpl);
		}
	},

	/**
	 * The method is going to append the image containing div for image type lyte-colorbox
	 *
	 */
	appendElementForImage : function() {
		var ele,
		comp = LyteColorbox._component;

		if(LyteColorbox._nextItem){
			ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');

			// ele.append(element);
			LyteColorbox._component.setData('currentEle',ele);
			var item = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+(LyteColorbox._index + 1));
			if(!item){
				LyteColorbox._content.append(ele);
			}
			else{
				LyteColorbox._content.insertBefore(ele,item.parentElement);
			}
		}
		else if(LyteColorbox._prevItem){
			ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');


			// ele.append(element);
			LyteColorbox._component.setData('currentEle',ele);
			var item = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+(LyteColorbox._index + 1));
			if(!item){
				LyteColorbox._content.append(ele);
			}
			else{
				LyteColorbox._content.insertBefore(ele,item.parentElement);
			}
		}
		else{
			ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');
			// ele.append(element);


			LyteColorbox._content.append(ele);
			LyteColorbox._component.setData('currentEle',ele);
		}
		// element.classList.add('lyteCBoxVisible');

		LyteColorbox.createLoadingIcon( ele );

		return ele;
	},

	/**
	 * The method is going to create the loading icon and append it
	 * @param {DOM element} div - The div that contains the loading icon
	 *
	 */
	createLoadingIcon: function( div ) {
		var loadingIcon;
		if(LyteColorbox._loadingIcon){
			loadingIcon = LyteColorbox._loadingIcon.cloneNode();
		}
		else{
			loadingIcon = document.createElement( 'div' );
			loadingIcon.innerHTML = unescape("%3Csvg%20class%3D%22lyteColorboxLoadingCircle%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20data-svg%3D%22spinner%22%3E%3Ccircle%20fill%3D%22none%22%20stroke%3D%22%23000%22%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2214%22%3E%3C/circle%3E%3C/svg%3E");
		}
		loadingIcon.classList.add( 'lyteColorboxLoadingImg' );
		div.appendChild( loadingIcon );
	},

	/**
	 * The method is going to append the element that will be shown to the colorbox
	 * @param {classList} arr - The classlist under question
	 *
	 */
	appendElement : function(element){
		var comp = LyteColorbox._component,
		type = comp.getData( 'ltPropType' );

		if(LyteColorbox._component.getData('ltPropAnimation') == "slide"){
			var ele;
			LyteColorbox._zIndex++;
			if(LyteColorbox._nextItem){
				ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');

				//if( type === 'custom' ) {
					ele.classList.add('lytCBoxNextItem');
				// }
				ele.append(element);
				LyteColorbox._component.setData('currentEle',ele);
				var item = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+(LyteColorbox._index + 1));
				if(!item){
					LyteColorbox._content.append(ele);
				}
				else{
					LyteColorbox._content.insertBefore(ele,item.parentElement);
				}
			}
			else if(LyteColorbox._prevItem){
				ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');

				// if( type === 'custom' ) {
					ele.classList.add('lytCBoxPreviousItem');
				// }
				ele.append(element);
				LyteColorbox._component.setData('currentEle',ele);
				var item = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+(LyteColorbox._index + 1));
				if(!item){
					LyteColorbox._content.append(ele);
				}
				else{
					LyteColorbox._content.insertBefore(ele,item.parentElement);
				}
			}
			else{
				ele = LyteColorbox.createElement('div',null,'lyteCBoxItem');
				ele.append(element);

				// if( type === 'custom' ) {
					ele.style.zIndex = LyteColorbox._zIndex;
				// }

				LyteColorbox._content.append(ele);
				LyteColorbox._component.setData('currentEle',ele);
			}
			element.classList.add('lyteCBoxVisible');
		}
		else{
			if(LyteColorbox._related.length > 1){
				var item = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+(LyteColorbox._index + 1));
				if(item){
					LyteColorbox._content.insertBefore(element, item);
				}
				else{
					LyteColorbox._content.append(element);
				}
			}
			else{
				LyteColorbox._content.append(element);
			}
			element.classList.add('lyteCBoxVisible');
			LyteColorbox.checkHW();
			LyteColorbox._component.setData('currentEle',null);
		}
	},

	isZoomed: function( img ) {
		return img && !img._isDefault;
	},

	isCurrentDisplayedImage: function( img ) {
		return img === LyteColorbox._domEle;
	},

	isZoomedAndCurrentDisplayedImage: function( img ) {
		// console.log( LyteColorbox._clickNumber, LyteColorbox._domEle, img ); 
		return !img._isDefault && LyteColorbox._domEle === img;
		// return LyteColorbox._domEle === img && LyteColorbox.isImageZoomed( img );
	},

	transitionEnd: function( event ) {
		var img;

		if( event.target === this && event.propertyName === 'transform' ) {
			img = this.querySelector( 'img' );

			if( LyteColorbox.isZoomed( img ) && !LyteColorbox.isCurrentDisplayedImage( img ) ) {
				LyteColorbox.reset( img );
			}

			// if( LyteColorbox.isZoomedAndNotCurrentDisplayedImage( img ) ) {
				
			// }
			// else {
			// 	LyteColorbox.reset( img );
			// }
			
			this.removeEventListener( 'transitionend', LyteColorbox.transitionEnd );
			// LyteColorbox.showScrollbar();
		}
	},

	doesImageExceedContentBoxAfterMovingRight: function( imgOffsets, contentOffsets ) {
		return imgOffsets.left < contentOffsets.left;
	},

	/**
	 * The method is going to move the element out of view towards right in colorbox
	 * @param {DOM element} elementMovingOutOfView - The div containing the image
	 * @param {classList} className - className to be removed
	 *
	 */
	moveElementOutOfViewTowardsRight: function( elementMovingOutOfView, className ) {
		var content = elementMovingOutOfView,
		img = elementMovingOutOfView.querySelector( 'img' ),
		contentOffsets = content.getBoundingClientRect(),
		imgOffsets,
		exceededBy, contentWidth = contentOffsets.width,
		percentExceededWithRespectToParent,
		totalTranslateValue = 100,
		translateBy;

		if( img ) {
			imgOffsets = img.getBoundingClientRect();

			if( LyteColorbox.doesImageExceedContentBoxAfterMovingRight( imgOffsets, contentOffsets ) ) {
				exceededBy = contentOffsets.left - imgOffsets.left;
				percentExceededWithRespectToParent = ( exceededBy / contentWidth ) * 100;
				totalTranslateValue += percentExceededWithRespectToParent;
			}
		}

		elementMovingOutOfView.style.transition = 'transform 0.3s ease';
		elementMovingOutOfView.style.transform = 'translate3d(' + totalTranslateValue + '%,0,0)';
		elementMovingOutOfView.classList.remove( className );
	},

	doesImageExceedContentBoxAfterMovingLeft: function( imgOffsets, contentOffsets ) {
		return imgOffsets.right > contentOffsets.right;
	},

	/**
	 * The method is going to move the element out of view towards left in colorbox
	 * @param {DOM element} elementMovingOutOfView - The div containing the image
	 * @param {classList} className - className to be removed
	 *
	 */
	moveElementOutOfViewTowardsLeft: function( elementMovingOutOfView, className ) {
		var content = elementMovingOutOfView,
		img = elementMovingOutOfView.querySelector( 'img' ),
		contentOffsets = content.getBoundingClientRect(),
		imgOffsets, exceededBy, contentWidth = contentOffsets.width,
		percentExceededWithRespectToParent,
		totalTranslateValue = 100,
		translateBy;

		if( img ) {
			imgOffsets = img.getBoundingClientRect();

			if( LyteColorbox.doesImageExceedContentBoxAfterMovingLeft( imgOffsets, contentOffsets ) ) {
				exceededBy = imgOffsets.right - contentOffsets.right;
				percentExceededWithRespectToParent = ( exceededBy / contentWidth ) * 100;
				totalTranslateValue += percentExceededWithRespectToParent;
			}
		}

		elementMovingOutOfView.style.transition = 'transform 0.3s ease';
		elementMovingOutOfView.style.transform = 'translate3d(-' + totalTranslateValue + '%,0,0)';
		elementMovingOutOfView.classList.remove( className );
	},

	/**
	 * The method is going to show the slide animation when another item from the list is opened in the colorbox
	 *
	 */
	slide : function(){
		var comp = LyteColorbox._component,
		ele = comp.getData('currentEle'),
		elementMovingIntoView = ele,
		type = comp.getData( 'ltPropType' ),
		elementMovingOutOfView, className = 'lyteCBoxCurrentItem';

		if( type === 'custom' ) {
			if(ele){
				LyteColorbox.checkHW();
				if(LyteColorbox._nextItem){
					var elements = Array.from(ele.parentElement.querySelectorAll('.lyteCBoxCurrentItem')) /*$L('.lyteCBoxCurrentItem',ele.parentElement).e).filter(function(element){return !element.isEqualNode(ele)})*/;
					for(var i = 0; i < elements.length; i++){
						elements[i].classList.add('lytCBoxPreviousItem');
					}
				}
				if(LyteColorbox._prevItem){
					var elements = Array.from(ele.parentElement.querySelectorAll('.lyteCBoxCurrentItem')) /*$L('.lyteCBoxCurrentItem',ele.parentElement).e).filter(function(element){return !element.isEqualNode(ele)})*/;
					for(var i = 0; i < elements.length; i++){
						elements[i].classList.add('lytCBoxNextItem');
					}
				}
				ele.style.zIndex = LyteColorbox._zIndex;
				ele.classList.add('lyteCBoxCurrentItem');
				if(LyteColorbox._nextItem || LyteColorbox._prevItem){
					if(LyteColorbox._timeoutId){
						clearTimeout(LyteColorbox._timeoutId);
						LyteColorbox._timeoutId = false;
					}
					LyteColorbox._timeoutId = setTimeout(function(){
						ele.classList.remove('lytCBoxPreviousItem','lytCBoxNextItem');
						var elements = Array.from(ele.parentElement.querySelectorAll('.lyteCBoxCurrentItem') /*$L('.lyteCBoxCurrentItem',ele.parentElement).e*/).filter(function(element){return !element.isEqualNode(ele)});
						for(var i = 0; i < elements.length; i++){
							// elements[i].remove();
							elements[i].classList.remove('lytCBoxNextItem','lytCBoxPreviousItem','lyteCBoxCurrentItem');
							elements[i].classList.add('lyteCBoxDN');
						}
						// ele.style.zIndex = 0;
						// LyteColorbox._zIndex = 0;
						LyteColorbox._timeoutId = false;
					},300);
					LyteColorbox._nextItem = false;
					LyteColorbox._prevItem = false;
				}
			}
		}
		else {
			if( elementMovingIntoView ) {

				if( elementMovingIntoView ) {

					if( LyteColorbox._nextItem ) {
						elementMovingOutOfView = elementMovingIntoView.parentElement.querySelector( '.lyteCBoxCurrentItem' );
						if(!elementMovingOutOfView){
							elementMovingOutOfView = elementMovingIntoView.parentElement.querySelector( '.lyteCBoxMoveRight' );
							className = 'lyteCBoxMoveRight';
						}
						LyteColorbox.moveElementOutOfViewTowardsLeft( elementMovingOutOfView, className );
						// elementMovingOutOfView.classList.add( 'lyteCBoxMoveLeftWithTransition' );
						// elementMovingOutOfView.classList.remove( 'lyteCBoxCurrentItem' );

						elementMovingIntoView.style.removeProperty( 'transition' );
						elementMovingIntoView.classList.add( 'lyteCBoxMoveRight' );
						elementMovingIntoView.style.removeProperty( 'transform' );
						// elementMovingIntoView.classList.remove( 'lyteCBoxMoveLeftWithTransition' );
						// elementMovingIntoView.classList.remove( 'lyteCBoxMoveRightWithTransition' );
						
					}

					if( LyteColorbox._prevItem ) {
						elementMovingOutOfView = elementMovingIntoView.parentElement.querySelector( '.lyteCBoxCurrentItem' );
						if(!elementMovingOutOfView){
							elementMovingOutOfView = elementMovingIntoView.parentElement.querySelector( '.lyteCBoxMoveLeft' );
							className = 'lyteCBoxMoveLeft';
						}
						LyteColorbox.moveElementOutOfViewTowardsRight( elementMovingOutOfView, className );
						// elementMovingOutOfView.classList.add( 'lyteCBoxMoveRightWithTransition' );
						// elementMovingOutOfView.classList.remove( 'lyteCBoxCurrentItem' );

						elementMovingIntoView.style.removeProperty( 'transition' );
						elementMovingIntoView.classList.add( 'lyteCBoxMoveLeft' );
						elementMovingIntoView.style.removeProperty( 'transform' );
						// elementMovingIntoView.classList.remove( 'lyteCBoxMoveRightWithTransition' );
						// elementMovingIntoView.classList.remove( 'lyteCBoxMoveLeftWithTransition' );
						
					}

					if( elementMovingOutOfView ) {
						elementMovingOutOfView.addEventListener( 'transitionend', LyteColorbox.transitionEnd );
					}

					// Remove it to cause the animation
					var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
                    if(LyteColorbox._reqAF1){
						cancelAnimationFrame(LyteColorbox._reqAF1);
					}
					if(LyteColorbox._reqAF2){
						cancelAnimationFrame(LyteColorbox._reqAF2);
					}
					LyteColorbox._reqAF1 = requestAnimationFrame( function() {
						LyteColorbox._reqAF1 = false;
						// Firefox requires two requestAnimationFrames for this to work
						LyteColorbox._reqAF2 = requestAnimationFrame( function() {
							LyteColorbox._reqAF2 = false;
							elementMovingIntoView.classList.remove( 'lyteCBoxMoveLeft', 'lyteCBoxMoveRight', 'lytCBoxPreviousItem', 'lytCBoxNextItem' );
							elementMovingIntoView.classList.add( 'lyteCBoxCurrentItem' );
						} );
					} );
												
					

					LyteColorbox._nextItem = false;
					LyteColorbox._prevItem = false;
				}

				
			}
		}
	},
	
	/**
	 * The method is going to navigate to the next item/image in the LyteColorbox._related list
	 * @param {object} event - Event object
	 * @param {boolean} stopMethod - boolean value that determines if the onNavigate method will be triggered or not
	 *
	 */
	next : function (event,stopMethod) {
		var promise, that = LyteColorbox._component,
		loop = that.getData( 'ltPropLoop' ),
		curIndex = LyteColorbox._index + 1,
		totalLength = ( LyteColorbox._related || [] ).length;

		if( !loop && curIndex >= totalLength ) {
			return ;
		}

		if( that.getMethods( 'onBeforeNavigate' ) ) {
			promise = that.executeMethod( 'onBeforeNavigate', event, that.$node, LyteColorbox._index, 1 );
		}

		if( promise ) {
			promise.then( function() {
				LyteColorbox.moveToNext( event, stopMethod );
			} );
		}
		else {
			LyteColorbox.moveToNext( event, stopMethod );
		}
	},

	moveToNext: function( event, stopMethod ) {
		var comp = LyteColorbox._component,
		type = comp.getData( 'ltPropType' );

		if (!LyteColorbox._active && LyteColorbox._related[1] && (LyteColorbox._component.getData('ltPropLoop') || LyteColorbox._related[(LyteColorbox._index + 1)])) {
			if(LyteColorbox._component.getData('ltPropAnimation') != "slide"){
				LyteColorbox.hideElement();
				// LyteColorbox.toggleLoadingIcon();
				// document.querySelector('.lyteCBoxPhoto').remove();
			}else{
				// LyteColorbox.hideScrollbar();
				LyteColorbox._nextItem = true;
			}
			// if(LyteColorbox._clickNumber != 0){
			// 	LyteColorbox._clickNumber = 0;
			// }
			LyteColorbox.toggleLoadingIcon();

			if( type === 'custom' ) {
				LyteColorbox.reset();
			}
			
			LyteColorbox._index = LyteColorbox.getIndex(1);
			LyteColorbox._domEle = null;
			LyteColorbox.load(LyteColorbox._el = LyteColorbox._related[LyteColorbox._index]);
			!stopMethod && LyteColorbox._component.getMethods("onNavigate") && LyteColorbox._component.executeMethod('onNavigate',event,LyteColorbox._component.$node,LyteColorbox._index+1, 1 );
		}
	},

	/**
	 * The method is going to navigate to the previous item/image in the LyteColorbox._related list
	 * @param {object} event - Event object
	 * @param {boolean} stopMethod - boolean value that determines if the onNavigate method will be triggered or not
	 *
	 */
	prev : function (event,stopMethod) {
		var promise, that = LyteColorbox._component,
		curIndex = LyteColorbox._index,
		loop = that.getData( 'ltPropLoop' );

		if( !loop && curIndex === 0 ) {
			return ;
		}

		if( that.getMethods( 'onBeforeNavigate' ) ) {
			promise = that.executeMethod( 'onBeforeNavigate', event, that.$node, LyteColorbox._index, -1 );
		}

		if( promise ) {
			promise.then( function() {
				LyteColorbox.moveToPrevious( event, stopMethod );
			} );
		}
		else {
			LyteColorbox.moveToPrevious( event, stopMethod );
		}
	},

	moveToPrevious: function( event, stopMethod ) {
		var comp = LyteColorbox._component,
		type = comp.getData( 'ltPropType' );

		if (!LyteColorbox._active && LyteColorbox._related[1] && (LyteColorbox._component.getData('ltPropLoop') || LyteColorbox._index)) {
			if(LyteColorbox._component.getData('ltPropAnimation') != "slide"){
				LyteColorbox.hideElement();
				// LyteColorbox.toggleLoadingIcon();
				// document.querySelector('.lyteCBoxPhoto').remove();
			}else{
				// LyteColorbox.hideScrollbar();
				LyteColorbox._prevItem = true;
			}
			// if(LyteColorbox._clickNumber != 0){
			// 	LyteColorbox._clickNumber = 0;
			// }
			LyteColorbox.toggleLoadingIcon();

			if( type === 'custom' ) {
				LyteColorbox.reset();
			}

			LyteColorbox._index = LyteColorbox.getIndex(-1);
			LyteColorbox._domEle = null;
			LyteColorbox.load(LyteColorbox._el = LyteColorbox._related[LyteColorbox._index]);
			!stopMethod && LyteColorbox._component.getMethods("onNavigate") && LyteColorbox._component.executeMethod('onNavigate',event,LyteColorbox._component.$node,LyteColorbox._index+1, -1 );
		}
	},

	/**
	 * The method is going to close the colorbox and remove all the related properties
	 *
	 */
	close : function () {
		if (LyteColorbox._open && !LyteColorbox._closing) {
			LyteColorbox._component.setData('currentEle',null);
			document.body.classList.remove('lyteCBoxOH');
			LyteColorbox._content.classList.remove('lyteCBoxOH');
			if(LyteColorbox._component.getData('ltPropThumbnail')){
				var thumbnails = LyteColorbox._thumbDiv.querySelector('.lyteColorboxThumbnails');
				var thumbs = LyteColorbox._thumbDiv.querySelector('.lyteColorboxThumbInnerWrapper');
				thumbnails.style.width = "";
				thumbnails.classList.add('lyteColorboxHideVisibility');
				thumbs.style.transform = "";
				thumbs.style.width = "";
			}

			// We don't need to call check and change status over here because we just destroy all the images
			if(LyteColorbox._zoomIn){
				LyteColorbox._zoomIn.classList.remove('lyteColorboxDisabled');
			}

			if(LyteColorbox._zoomOut && LyteColorbox._component.getData( 'ltPropType' ) != 'image'){
				LyteColorbox._zoomOut.classList.add('lyteColorboxDisabled');
			}

			if(LyteColorbox._reset){
				LyteColorbox._reset.classList.add('lyteColorboxDisabled');
			}
			LyteColorbox._clickNumber = 0;
			LyteColorbox._zoomedThroughUtil = false;
			LyteColorbox._closing = true;
			LyteColorbox._open = false;
			LyteColorbox._box.classList.remove('lyteColorboxDisplay');
			LyteColorbox._domEle = null;
			LyteColorbox._related = [];
			LyteColorbox._closing = false;
			LyteColorbox._el = null;
			LyteColorbox._diff = 0;
			LyteColorbox.removeElements();
			LyteColorbox.toggleLoadingIcon();
			LyteColorbox._loadingIcon = null;
			LyteColorbox._component.callOnClose();
		}
	},

	/**
	 * The method is going to perform the download action
	 *
	 */
	download : function(){
		var returnVal = true;
		if(LyteColorbox._component.getMethods('onDownload')){
			returnVal = LyteColorbox._component.executeMethod('onDownload',LyteColorbox._domEle,LyteColorbox._el, LyteColorbox._component.$node);
			returnVal = returnVal === undefined ? true : returnVal;
		}
		if(!returnVal){
			return;
		}
		var a = document.createElement('a');
		if(LyteColorbox._el.lytecboxDlink){
			a.setAttribute("href", LyteColorbox._el.lytecboxDlink);
		}else{
			if(LyteColorbox._el.type == "photo"){
				a.setAttribute("href", LyteColorbox._el.lytecboxHref);
			}
		}
		a.setAttribute("download", LyteColorbox.createName(LyteColorbox._el.lytecboxTitle));
		document.body.append(a);
		a.click();
		a.remove();
	},

	isIE : function(){
		var ua = window.navigator.userAgent;

	    var msie = ua.indexOf('MSIE ');
	    if (msie > 0) {
	        // IE 10 or older => return version number
	        // return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	        return true;
	    }

	    var trident = ua.indexOf('Trident/');
	    if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        // return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	        return true;
	    }

	    // var edge = ua.indexOf('Edge/');
	    // if (edge > 0) {
	    //    // Edge => return version number
	    //    // return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	    //    return true;
	    // }

	    // other browser
	    return false;
	},

	/**
	 * The method is going to zoom the image by the mentioned scale
	 * @param {number} newScale - New scale value by which the image will be zoomed in or out
	 * @param {object} originPoint - left and top values that determine the position at which the image will be zoomed
	 * @param {DOM element} image - image element
	 *
	 */
	zoomTo : function( newscale, originPoint, image ){
		originPoint = originPoint || {};
		var comp = LyteColorbox._component,
		orientation = image.getAttribute('lytecbox-rotate'),
		width = image.offsetWidth,
        height = image.offsetHeight,
        bcr = image.getBoundingClientRect(),
        contentOffsets = LyteColorbox._content.getBoundingClientRect(),
        xPt = originPoint.left || ( comp.getData('ltPropZoomPosition') == "center" ? contentOffsets.left + contentOffsets.width * 0.5 : bcr.left + bcr.width * 0.5 ),
        yPt = originPoint.top || ( comp.getData('ltPropZoomPosition') == "center" ? contentOffsets.top + contentOffsets.height * 0.5 : bcr.top + bcr.height * 0.5 ),
        transform = image.style.transform,
        transformOrigin = image.style.transformOrigin,
        matches = transform.match( /scale\((.+)\)/ ) || [ null, 1, 0 ,0 ],
        originMatch = transformOrigin.match( /(.+)% (.+)%/ ) || [ null, 50, 50 ],
        oldscale = parseFloat( matches[ 1 ] ),
        translateX = parseFloat( image.style.left || 0 ),
        translateY = parseFloat( image.style.top || 0 ),
        originX = parseFloat( originMatch[ 1 ] ),
        originY = parseFloat( originMatch[ 2 ] ),
        newOriginX = ( xPt - bcr.left ) / bcr.width * 100,
        newOriginY = ( yPt - bcr.top ) / bcr.height * 100,

        translateX2set = ( newOriginX - originX ) * 0.01 * width * ( oldscale - 1 ),
        
        translateY2set = ( newOriginY - originY ) * 0.01 * height * ( oldscale - 1 );
        
        image.style.transformOrigin = newOriginX + '% ' + newOriginY + '%';

        image.style.transform = "scale(" + newscale + ")" + (orientation == null ? '' : ' ' + orientation);
        image.style.left = ( translateX2set + translateX ) + 'px';
        image.style.top = ( translateY2set + translateY ) + 'px';
	},

	/**
	 * The method is going to return the transform property value
	 * @param {DOM element} ele - Image element
	 *
	 */
	getMatrixValue : function(ele){
		if(window.WebKitCSSMatrix){
			return new WebKitCSSMatrix( window.getComputedStyle( ele ).transform )
		}
		if(window.MSCSSMatrix){
			return new MSCSSMatrix( window.getComputedStyle( ele ).transform )
		}
	},

	/**
	 * The method is going to zoom the image based on the mouse wheel behaviour
	 * @param {object} event - Event object
	 *
	 */
	wheel : function( evt ){

		evt.preventDefault();
		var delta = evt.deltaMode && evt.deltaMode == 1,
		y = evt.deltaY * ( delta ? 6 : 1 ),
		x = evt.deltaX * ( delta ? 6 : 1 );
		if( Math.abs( y ) < Math.abs( x ) ){
            return;
        }
        if( Math.abs( y ) > 50 ){
        	if( y > 0 ){
        		y = 50;
        	} else {
        		y = -50;
        	}
        }
        
        var image = LyteColorbox._domEle,
        min = LyteColorbox._component.data.ltPropMinScale,
        max = LyteColorbox._component.data.ltPropMaxScale,
		matrix = LyteColorbox.getMatrixValue( image ),
		curZoom = LyteColorbox.getCurrentZoom( image ),
		newscale = Math.min( Math.max( /* matrix.a */ curZoom + ( y / 1000 ), min ), max );
        if( !image.classList.contains( 'preventAnimation' ) ){
            image.classList.add( 'preventAnimation' );
        }
        clearTimeout( image._timeout );
        image._timeout = setTimeout( function(){
            image.classList.remove( 'preventAnimation' );
        }, 500)

        this.zoomTo( newscale, { left : evt.clientX, top : evt.clientY }, image );
        LyteColorbox._zoom = true;
        LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.remove('lyteColorboxDisabled');
		LyteColorbox._reset && LyteColorbox._reset.classList.remove('lyteColorboxDisabled');
	},

	getCurrentZoom: function( img ) {
		var rscale = /scale\(([\d.]*)\)/,
		parsed = rscale.exec( img.style.transform ),
		scale = ( parsed || [] )[ 1 ] || '1';

		return parseFloat( scale );
	},

	checkAndChangeStatus: function( img ) {
		var currentZoom = LyteColorbox.getCurrentZoom( img ),
		no_zoom_scale = 1;

		if( currentZoom === no_zoom_scale ) {
			img._isDefault = true;
		}
		else {
			img._isDefault = false;
		}
	},

	/**
	 * The method is going to zoom in the image
	 *
	 */
	zoomIn : function(){
		LyteColorbox._clickNumber += 1;
		if(LyteColorbox._clickNumber <= LyteColorbox._component.getData('ltPropZoomClickNumber')){
			LyteColorbox.resetLeftAndTopHelpers();

			if( LyteColorbox._component.data.ltPropZoomPosition == "imageCenter" ){
				LyteColorbox._domEle.style.left = "0px";
				LyteColorbox._domEle.style.top = "0px";
				LyteColorbox._domEle.style.transformOrigin = "";
			}
			$L.fastdom.measure( function(){
				var zoomBy = parseFloat(LyteColorbox._component.getData('ltPropZoomBy')) / 100;
				// var matrix = LyteColorbox.getMatrixValue( LyteColorbox._domEle );
				var curZoom = LyteColorbox.getCurrentZoom( LyteColorbox._domEle );
				var offset = LyteColorbox._domEle.getBoundingClientRect();

				this.zoomTo( curZoom + zoomBy, {}, LyteColorbox._domEle );
				// this.zoomTo( matrix.a + zoomBy, {}, LyteColorbox._domEle );
				LyteColorbox.checkAndChangeStatus( LyteColorbox._domEle );
				if(LyteColorbox._clickNumber == 1 || (LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.contains('lyteColorboxDisabled')) || (LyteColorbox._reset && LyteColorbox._reset.classList.contains('lyteColorboxDisabled'))){
					LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.remove('lyteColorboxDisabled');
					LyteColorbox._reset && LyteColorbox._reset.classList.remove('lyteColorboxDisabled');
				}
				if(LyteColorbox._clickNumber == LyteColorbox._component.getData('ltPropZoomClickNumber')){
					LyteColorbox._zoomIn && LyteColorbox._zoomIn.classList.add('lyteColorboxDisabled');
				}
				LyteColorbox.setPercentage(undefined, curZoom + zoomBy);
				LyteColorbox._component.getMethods("onZoomin") && LyteColorbox._component.executeMethod('onZoomin',(Math.round((curZoom+zoomBy) * 100) - 100),LyteColorbox._component.$node);
				// LyteColorbox._component.getMethods("onZoomin") && LyteColorbox._component.executeMethod('onZoomin',(Math.round((matrix.a+zoomBy) * 100) - 100),LyteColorbox._component.$node);
			}.bind( this ))
		}
		else{
			LyteColorbox._clickNumber -= 1;
		}
	},

	/**
	 * The method is going to zoom out the image
	 *
	 */
	zoomOut : function(){
		LyteColorbox.resetLeftAndTopHelpers();
		if(LyteColorbox._zoom){		//if the picture is zoomed using the util function then reset it.
			var orientation = LyteColorbox._domEle.getAttribute('lytecbox-rotate');
			LyteColorbox._zoom = false;
			LyteColorbox._domEle.style.transform = (orientation ? orientation : "");
			LyteColorbox._domEle.style.top = "0px";
			LyteColorbox._domEle.style.left = "0px";
			LyteColorbox._domEle.style.transformOrigin = "";
			LyteColorbox.checkAndChangeStatus( LyteColorbox._domEle );
			LyteColorbox._clickNumber = 0;
			LyteColorbox._zoomedThroughUtil = false;
			LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.add('lyteColorboxDisabled');
			LyteColorbox._reset && LyteColorbox._reset.classList.add('lyteColorboxDisabled');
			if(LyteColorbox._zoomIn && LyteColorbox._zoomIn.classList.contains('lyteColorboxDisabled')){
				LyteColorbox._zoomIn.classList.remove('lyteColorboxDisabled');
			}
			LyteColorbox.setPercentage(undefined, 1);
			LyteColorbox._component.getMethods("onZoomout") && LyteColorbox._component.executeMethod('onZoomout',0,LyteColorbox._component.$node);
		}
		else{
			LyteColorbox._clickNumber -= 1;
			if(LyteColorbox._clickNumber >= 0 && LyteColorbox._clickNumber < LyteColorbox._component.getData('ltPropZoomClickNumber')){
				//Reset left and top helpers
				LyteColorbox._domEle._left = undefined;
				LyteColorbox._domEle._top = undefined;
				if( LyteColorbox._component.data.ltPropZoomPosition == "imageCenter" ){
					LyteColorbox._domEle.style.left = "0px";
					LyteColorbox._domEle.style.top = "0px";
					LyteColorbox._domEle.style.transformOrigin = "";
				}
				$L.fastdom.measure( function(){
					var zoomBy = parseFloat(LyteColorbox._component.getData('ltPropZoomBy')) / 100;
					//var matrix = LyteColorbox.getMatrixValue( LyteColorbox._domEle );
					// this.zoomTo( matrix.a - zoomBy, {}, LyteColorbox._domEle );
					var curZoom = LyteColorbox.getCurrentZoom( LyteColorbox._domEle );
					this.zoomTo( curZoom - zoomBy, {}, LyteColorbox._domEle );

					LyteColorbox.checkAndChangeStatus( LyteColorbox._domEle );
					if(LyteColorbox._clickNumber == 0){
						LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.add('lyteColorboxDisabled');
						LyteColorbox._reset && LyteColorbox._reset.classList.add('lyteColorboxDisabled');
					}
					if(LyteColorbox._clickNumber == LyteColorbox._component.getData('ltPropZoomClickNumber') - 1){
						LyteColorbox._zoomIn && LyteColorbox._zoomIn.classList.remove('lyteColorboxDisabled');
					}
					LyteColorbox.setPercentage(undefined, curZoom - zoomBy);
					LyteColorbox._component.getMethods("onZoomout") && LyteColorbox._component.executeMethod('onZoomout',(Math.round((curZoom-zoomBy)*100)-100),LyteColorbox._component.$node);
					// LyteColorbox._component.getMethods("onZoomout") && LyteColorbox._component.executeMethod('onZoomout',(Math.round((matrix.a-zoomBy)*100)-100),LyteColorbox._component.$node);
				}.bind( this ))
			}
			else{
				LyteColorbox._clickNumber += 1;
			}
		}
		
	},

	disableTransition: function( img ) {
		img.classList.add( 'lyteColorBoxDisableTransition' );
	},

	enableTransition: function( img ) {
		img.classList.remove( 'lyteColorBoxDisableTransition' );
	},

	/**
	 * The method is going to reset the zoomed behaviour of the image
	 *
	 */
	reset : function( elementToBeReset , onclick ) {
		elementToBeReset = elementToBeReset || LyteColorbox._domEle;
		var orientation = elementToBeReset.getAttribute('lytecbox-rotate');
		if( elementToBeReset.classList.contains(LyteColorbox._prefix+"Photo" ) && ( LyteColorbox._clickNumber > 0 || LyteColorbox._zoomedThroughUtil ) ){
			LyteColorbox.resetLeftAndTopHelpers();
			LyteColorbox._zoom = false;
			LyteColorbox._clickNumber = 0;
			LyteColorbox._zoomedThroughUtil = false;
			var width = elementToBeReset.offsetWidth,
			actualWidth = elementToBeReset.naturalWidth,
			value = (width / actualWidth) * 100;


			// don't remove the animation class when it is reset through the reset button
			if( !onclick ) {
				elementToBeReset.classList.remove( 'lyteCBoxAnimateOnUp' );
				LyteColorbox.disableTransition( elementToBeReset );
			}
			// elementToBeReset.classList.remove( 'lyteCBoxPhoto' );

			elementToBeReset.style.transform = (orientation ? orientation : "");
			elementToBeReset.style.top = "0px";
			elementToBeReset.style.left = "0px";
			elementToBeReset.style.transformOrigin = "";

			LyteColorbox.setPercentage(value % 1 != 0 ? value.toFixed(2) : value);
			LyteColorbox.checkAndChangeStatus( elementToBeReset );
			// LyteColorbox.checkAndChangeStatus( elementToBeReset );		

			if(LyteColorbox._zoomIn){
				LyteColorbox._zoomIn.classList.remove('lyteColorboxDisabled');
			}

			if(LyteColorbox._zoomOut){
				LyteColorbox._zoomOut.classList.add('lyteColorboxDisabled');
			}

			if(LyteColorbox._reset){
				LyteColorbox._reset.classList.add('lyteColorboxDisabled');
			}

			onclick && LyteColorbox._component.getMethods("onReset") && LyteColorbox._component.executeMethod('onReset', LyteColorbox._component.$node);

		}
	},

	resetLeftAndTopHelpers : function(){
		//Reset left and top helpers
		LyteColorbox._domEle._left = undefined;
		LyteColorbox._domEle._top = undefined;
		LyteColorbox._domEle.classList.remove('lyteCBoxAnimateOnUp');
	},

	/**
	 * The method is going to zoom the image by the value provided
	 * @param {number} value - zoom value
	 *
	 */
	zoomByUtilFn : function(value){
		if(LyteColorbox._domEle && LyteColorbox._domEle.classList.contains('lyteCBoxPhoto') && (value >= 0 || value === "fitWidth" || value === 'actual' || value === 'reset' )){
			var zoomBy, fit, curZoom;
			LyteColorbox.resetLeftAndTopHelpers();
			if(value === "fitWidth"){
				fit = true;
				var parentWidth = parseFloat(getComputedStyle(LyteColorbox._content).width),
				orientation = LyteColorbox._domEle.getAttribute('lytecbox-rotate'); 
				zoomBy = ((parentWidth / (orientation && orientation.indexOf('90') != -1 ? LyteColorbox._domEle.offsetHeight : LyteColorbox._domEle.offsetWidth)));
				LyteColorbox._zoomedThroughUtil = true;
				var value = (parentWidth / (orientation && orientation.indexOf('90') != -1 ? LyteColorbox._domEle.naturalHeight : LyteColorbox._domEle.naturalWidth)) * 100;
				LyteColorbox.setPercentage(value % 1 != 0 ? value.toFixed(2) : value);
			}
			else if( value === 'reset' ){
				zoomBy = 1;
				var width = LyteColorbox._domEle.offsetWidth,
				actualWidth = LyteColorbox._domEle.naturalWidth,
				value = (width / actualWidth) * 100;
				LyteColorbox.setPercentage(value % 1 != 0 ? value.toFixed(2) : value);
			}
			// else if( value === 'actual' ) {
			// 	var img = LyteColorbox._domEle,
			// 	fullWidth = img.naturalWidth,
			// 	curWidth = parseFloat( window.getComputedStyle( img ).width );
			// 	zoomBy = fullWidth / curWidth;
			// 	LyteColorbox._zoomedThroughUtil = true;
			// }
			else{
				// zoomBy = 1 + (value / 100);
				var img = LyteColorbox._domEle,
				fullWidth = img.naturalWidth,
				curWidth = img.offsetWidth,
				newWidth = fullWidth * value / 100,
				diff = (newWidth - curWidth) / curWidth;
				zoomBy = (1 + diff).toFixed(2);
				LyteColorbox._zoomedThroughUtil = true;
				LyteColorbox.setPercentage(value);
			}
			if( LyteColorbox._component.data.ltPropZoomPosition == "imageCenter" ){
				LyteColorbox._domEle.style.left = "0px";
				LyteColorbox._domEle.style.top = "0px";
				LyteColorbox._domEle.style.transformOrigin = "";
			}
			$L.fastdom.measure( function(){
				// var matrix = LyteColorbox.getMatrixValue( LyteColorbox._domEle );
				// this.zoomTo( zoomBy, {}, LyteColorbox._domEle );
				curZoom = LyteColorbox.getCurrentZoom( LyteColorbox._domEle );
				this.zoomTo( zoomBy, {}, LyteColorbox._domEle );

				LyteColorbox.checkAndChangeStatus( LyteColorbox._domEle );
				if(zoomBy == 1){
					LyteColorbox._zoom = false;
					LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.add('lyteColorboxDisabled');
					LyteColorbox._reset && LyteColorbox._reset.classList.add('lyteColorboxDisabled');
				}
				else{
					LyteColorbox._zoom = true;	//incase the picture is zoomed using util function
					LyteColorbox._zoomOut && LyteColorbox._zoomOut.classList.remove('lyteColorboxDisabled');
					LyteColorbox._reset && LyteColorbox._reset.classList.remove('lyteColorboxDisabled');
					LyteColorbox._domEle.classList.add('onZoom');
				}
				if( /* zoomBy >= matrix.a */ zoomBy >= curZoom ) {
					LyteColorbox._component.getMethods("onZoomin") && LyteColorbox._component.executeMethod('onZoomin',value,LyteColorbox._component.$node);
				}
				else{
					LyteColorbox._component.triggerCheck();
					LyteColorbox._component.getMethods("onZoomout") && LyteColorbox._component.executeMethod('onZoomout',value,LyteColorbox._component.$node);
				}
			}.bind( this ) );
		}
	},

	checkForLeftAndTopAfterZoomOut : function(){
		var image = LyteColorbox._domEle,
		eleOffset = LyteColorbox._domEle.getBoundingClientRect(),
		parentOffset = LyteColorbox._content.getBoundingClientRect(),
		transformOrigin = image.style.transformOrigin,
		originMatch = transformOrigin.match( /(.+)% (.+)%/ ) || [ null, 50, 50 ],
		originX = parseFloat( originMatch[ 1 ] ),
	    originY = parseFloat( originMatch[ 2 ] ),
		diff = 0;
		image.classList.add('lyteCBoxAnimateOnUp');
		if(eleOffset.width < parentOffset.width){
			image.style.left = "0px";
			originX = 50;
		}
		else{
			// debugger
			var left = Math.round(eleOffset.left),
			right = Math.round(eleOffset.right);
			if(left > parentOffset.left){
				diff = left - parentOffset.left;
				image.style.left = (parseFloat(image.style.left || 0) - diff) + "px";
			}
			if(right < parentOffset.right){
				diff = parentOffset.right - right;
				image.style.left = (parseFloat(image.style.left || 0) + diff) + "px";
			}
		}
		if(eleOffset.height < parentOffset.height){
			image.style.top = "0px";
			originY = 50;
		}
		else{
			// debugger
			var top = Math.round(eleOffset.top),
			bottom = Math.round(eleOffset.bottom);
			if(top > parentOffset.top){
				diff = top - parentOffset.top;
				image.style.top = (parseFloat(image.style.top || 0) - diff) + "px";
			}
			if(bottom < parentOffset.bottom){
				diff = parentOffset.bottom - bottom;
				image.style.top = (parseFloat(image.style.top || 0) + diff) + "px";
			}
		}
		image.style.transformOrigin = originX + '% ' + originY + '%';
		image.removeEventListener('transitionend',LyteColorbox.checkForLeftAndTopAfterZoomOut);
	},

	convertToPx: function( val, parentDimensionValue ) {
		var rpercent = /(\d*)%/i,
		rpx = /(\d*)px/i,
		parsed, res = '', percentValue;

		if( ( parsed = rpercent.exec( val ) ) ) {
			percentValue = parseInt( parsed[ 1 ] ) / 100;
			res = ( percentValue * parseInt( parentDimensionValue ) ) + 'px';
		}
		else if( rpx.exec( val ) ) {
			res = val;
		}
		else if( val ) {
			res = val + 'px';
		}

		// returns empty string when no value is provided by the user
		return res;
	},

	getProperOffsetsToCalculateImageDimensions: function() {
		var styles = window.getComputedStyle(LyteColorbox._content),
		component = LyteColorbox._component,
		width = LyteColorbox.convertToPx( component.getData( 'ltPropWidth' ), styles.width ) || ( parseInt( styles.width )  * 0.8 + 'px' ),
		height = LyteColorbox.convertToPx( component.getData( 'ltPropHeight' ), styles.height ) || ( parseInt( styles.height ) * 0.8 + 'px' );

		return {
			width: parseInt( width ),
			height: parseInt( height )
		};
	},

	/**
	 * The method is going to check the aspect ratio to fit it properly inside the colorbox element when opened
	 *
	 */
	checkAspectRatio : function(){
		var elementOffset = LyteColorbox._domEle._offset;

		if( !elementOffset ) {
			return ;
		}
		
		var referenceOffsets = LyteColorbox.getProperOffsetsToCalculateImageDimensions();
		var orientation = LyteColorbox._domEle.getAttribute('lytecbox-rotate');
		if(orientation && orientation.indexOf('90') != -1){
			var offset = Object.assign({}, referenceOffsets);
			referenceOffsets = {
								height : offset.width,
								width : offset.height
							}
		}
		var width = elementOffset.width;
		var height = elementOffset.height;


		// landscape and width exceeds the reference container
		if(elementOffset.width > elementOffset.height && elementOffset.width > referenceOffsets.width){
			height = LyteColorbox.getHeight(height,width,referenceOffsets);
			width = referenceOffsets.width;
			LyteColorbox._domEle.style.width = width + "px";
			LyteColorbox._domEle.style.height = height + "px";

			// even after changing width height exceeds reference container
			if(height > referenceOffsets.height){
				width = LyteColorbox.getWidth(height,width,referenceOffsets);
				height = referenceOffsets.height;
				LyteColorbox._domEle.style.height = height + "px";
				LyteColorbox._domEle.style.width = width + "px";
			}
		}
		else{
			// landscape and height exceeds the container but not the width
			// portrait and height exceeds reference container
			if(height > referenceOffsets.height){
				width = LyteColorbox.getWidth(height,width,referenceOffsets);
				height = referenceOffsets.height;
				LyteColorbox._domEle.style.height = height + "px";
				LyteColorbox._domEle.style.width = width + "px";
			}

			// portrait and width exceeds reference container even after changing height
			// portrait and width exceeds reference container
			if(width > referenceOffsets.width){
				LyteColorbox._domEle.style.width = referenceOffsets.width + "px";
				LyteColorbox._domEle.style.height = LyteColorbox.getHeight(height,width,referenceOffsets) + "px";
			}
		}
		LyteColorbox.setPercentage();
	},

	getHeight : function(height,width,parentOffset){
		var derivedHeight = parentOffset.width * (height/width);
		return Math.round(derivedHeight);
	},

	getWidth : function(height,width,parentOffset){
		var derivedWidth = parentOffset.height * (width/height);
		return Math.round(derivedWidth);
	},

	/**
	 * The method is going to open a particular item from the list of items based on the index value. The index is 1 based ie. ist image's index value is 1
	 * @param {number} index - index value of the image/item to be opened in the colorbox
	 *
	 */
	open : function(index){
		index -= 1;
		if((index != LyteColorbox._index) && (index >= 0 && index < LyteColorbox._related.length)){
			if(LyteColorbox._component.getData('ltPropAnimation') != "slide"){
				LyteColorbox.hideElement();
				// LyteColorbox.toggleLoadingIcon();
				// document.querySelector('.lyteCBoxPhoto').remove();
			}else if(index < LyteColorbox._index){
				LyteColorbox._prevItem = true;
			}else{
				LyteColorbox._nextItem = true;
			}
			// if(LyteColorbox._clickNumber != 0){
			// 	LyteColorbox._clickNumber = 0;
			// }
			LyteColorbox.toggleLoadingIcon();
			LyteColorbox.reset();
			LyteColorbox._index = index;
			LyteColorbox._domEle = null;
			LyteColorbox.load(LyteColorbox._el = LyteColorbox._related[LyteColorbox._index]);
		}
	},

	/**
	 * The method is going to replace the item url with a new url to fetch the item
	 * @param {number} index - index value of the item whose url or other properties needs to be updated
	 * @param {object} obj - Object containing the updated set of properties along with their values
	 *
	 */
	replace : function(index,obj){
		var indexObj = LyteColorbox._related[index - 1];
		var changedHref = false;
		for(var key in obj){
			if(key in indexObj){
				if(key == 'lytecboxHref'){
					changedHref = true;
				}
				Lyte.Component.set(indexObj, key, obj[key]);
				// indexObj[key] = obj[key];
			}
		}
		var className = LyteColorbox._boxEle+"__"+(index - 1);
		var ele = LyteColorbox._content.querySelector('.'+className);
		if(ele && changedHref){
			$L(ele)
				   .attr({
				   		'src': indexObj.lytecboxHref
				   })
			if(indexObj.type == "photo"){
				ele.style.height = "";
				ele.style.width = "";
				ele.onload = function(){
					ele._offset = {
									height : ele.naturalHeight,
									width : ele.naturalWidth
								};
					if(ele.classList.contains('lyteCBoxVisible') && !(ele.parentElement.classList.contains('lyteCBoxDN'))){
						LyteColorbox.checkAspectRatio();
						LyteColorbox.checkHW();
					}
				}
			}
		}
		if(ele && ele.classList.contains('lyteCBoxVisible') && !(ele.parentElement.classList.contains('lyteCBoxDN'))){
			if(LyteColorbox._title){
				LyteColorbox._title.textContent = indexObj.lytecboxTitle;
			}
			LyteColorbox._el = indexObj;
		}

		if( !ele ){
			var cbox = LyteColorbox;
			if( cbox._open && index - 1 == cbox._index ){
				cbox.reset();
				cbox.load( indexObj );
			}
		}
	},

	removeElementObjectFromDom : function(index){
		var element = LyteColorbox._content.querySelector('.'+LyteColorbox._boxEle+'__'+index);
		if(element){
			LyteColorbox._component.getData('ltPropAnimation') == "slide" ? element.parentElement.remove() : element.remove();
		}
	},

	updateSelectors : function(index){
		var elements = Array.from(LyteColorbox._content.querySelectorAll('.lyteCBoxPhoto')),
			regex1 = /(lyteCBoxElement\d*__\d*)/g,
			regex2 = /[+-]?\d+(\.\d+)?/g;
		Lyte.arrayUtils(elements,'push',Array.from(LyteColorbox._content.querySelectorAll('.lyteCBoxIframe')));
		Lyte.arrayUtils(elements,'push',Array.from(LyteColorbox._content.querySelectorAll('.lyteCBoxCustom')));
		for(var i = 0 ; i < elements.length ; i++){
			var cname = elements[i].getAttribute('class'),
				reqdClass = cname.match(regex1)[0],
				indexVal = parseInt(reqdClass.match(regex2)[1]);
			if(indexVal > index){
				indexVal -= 1;
				cname = cname.replace(reqdClass, LyteColorbox._boxEle+'__'+indexVal);
				elements[i].className = cname;
			}
		}
	},

	/**
	 * The method is going to delete an item from the LyteColorbox._related list based on the passed index value
	 * @param {number} index - index of the item to be removed
	 *
	 */
	remove : function(index){
		var currImg = false;
		if(LyteColorbox._index === index - 1){
			currImg = true 
			if( LyteColorbox._component.getData('ltPropLoop') || index != LyteColorbox._related.length ){
				LyteColorbox.next(null, true);
			}
			else{
				LyteColorbox.prev(null, true);
				currImg = false;
			}
			$L(LyteColorbox._domEle)
				.off( 'load', LyteColorbox.imageComplete )
				.off( 'error', LyteColorbox.imageFailure );
		}
		this.removeElementObjectFromDom( index - 1 );
		Lyte.arrayUtils( LyteColorbox._related, 'removeAt', index - 1, 1 );
		if(currImg && LyteColorbox._index != 0){
			LyteColorbox._index -= 1;
		}
		this.updateSelectors( index -1 );
		if(LyteColorbox._component.getData('ltPropThumbnail')){
			LyteColorbox._component.setData('triggerSetThumbnail',LyteColorbox._component.getData('triggerSetThumbnail')+1);
			this.updateThumbnailPos();
		}

		this.changeNavArrows();
	}

};

Lyte.Component.register("lyte-colorbox", {
_template:"<template tag-name=\"lyte-colorbox\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'===','custom')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"colorBoxYield\"></lyte-yield> </template><template case=\"false\"> <div id=\"lyteColorbox\" class=\"lyteColorbox lyteCBox\"> <div class=\"lyteColorboxFreezeLayer lyteCBoxOverlay\"></div> <div class=\"lyteColorboxWrapper\"> <template is=\"if\" value=\"{{expHandlers(isIframe,'!')}}\"><template case=\"true\"> <div class=\"lyteColorboxUtilDiv\"> <span class=\"lyteCBoxZoomOut lyteColorboxZoomOut lyteColorboxDisabled\" lt-prop-title=\"Zoom Out\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></span> <span class=\"lyteCBoxReset lyteColorboxReset lyteColorboxDisabled\" lt-prop-title=\"Reset Zoom\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></span> <span class=\"lyteCBoxZoomIn lyteColorboxZoomIn\" lt-prop-title=\"Zoom In\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></span> </div> </template></template> <div class=\"lyteColorboxContent lyteCBoxContent\"> <span class=\"lyteColorboxLoadingImg\"></span> </div> <div class=\"lyteColorboxHeader\"> <div class=\"lyteColorboxTitle lyteCBoxTitle\"></div> <template is=\"if\" value=\"{{download}}\"><template case=\"true\"> <div class=\"lyteColorboxDownloadDiv lyteCBoxDownload\"> <span class=\"lyteColorboxDownloadImg\"></span> </div> </template></template> </div> </div> <div class=\"lyteColorboxCloseIcon lyteCBoxClose\"></div> <div class=\"lyteColorboxIconDiv lyteCBoxPrevious\"> <div class=\"lyteColorboxPreviousIcon\"></div> </div> <div class=\"lyteColorboxIconDiv lyteCBoxNext\"> <div class=\"lyteColorboxNextIcon\"></div> </div> <template is=\"if\" value=\"{{ltPropThumbnail}}\"><template case=\"true\"> <div class=\"lyteColorboxThumbOuterWrapper\"> <div class=\"lyteColorboxThumbnails\" onclick=\"{{action(&quot;clickOnThumbnails&quot;,event)}}\"> <div class=\"lyteColorboxThumbInnerWrapper\"> <template is=\"for\" items=\"{{thumbnails}}\" item=\"item\" index=\"index\"> <div class=\"{{lyteUiAddShowClass(ltPropAddOrientation,'lyteColorboxThumb','addedOrientation')}}\" data-thumb-val=\"{{lyteUiSetIndexString(index,thumbnails.length)}}\"> <template is=\"if\" value=\"{{ifEquals(item.type,&quot;photo&quot;)}}\"><template case=\"true\"> <img src=\"{{item.lytecboxHref}}\"> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIfEqualsAny(item.type,&quot;iframe&quot;,&quot;custom&quot;)}}\"><template case=\"true\"><template is=\"if\" value=\"{{item.lytecboxThumbnail}}\"><template case=\"true\"> <img class=\"lyteCBoxFavImg\" src=\"{{item.lytecboxThumbnail}}\"> </template><template case=\"false\"> <div class=\"lyteCBoxIframeWrap\"> <div class=\"lyteCBoxIframeIcon\"></div> <div class=\"lyteCBoxIframeLabel\">{{item.format}}</div> </div> </template></template> </template></template></template></template> </div> </template> </div> </div> </div> </template></template> </div> </template></template> </template><template case=\"false\"> <template is=\"if\" value=\"{{ltPropYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"colorBoxYield\"></lyte-yield> </template><template case=\"false\"> <lyte-colorbox-container> <lyte-colorbox-header> <lyte-colorbox-title></lyte-colorbox-title> <template is=\"if\" value=\"{{download}}\"><template case=\"true\"> <lyte-colorbox-download> <span class=\"lyteColorboxDownloadImg\"></span> </lyte-colorbox-download> </template></template> <lyte-colorbox-close></lyte-colorbox-close> </lyte-colorbox-header> <lyte-colorbox-content> </lyte-colorbox-content> <lyte-colorbox-previous> <div class=\"lyteColorboxPreviousIcon\"></div> </lyte-colorbox-previous> <lyte-colorbox-next> <div class=\"lyteColorboxNextIcon\"></div> </lyte-colorbox-next> <lyte-colorbox-description> </lyte-colorbox-description> <div class=\"lyteColorboxUtilDiv\"> <lyte-colorbox-zoomin lt-prop-title=\"Zoom In\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></lyte-colorbox-zoomin> <lyte-colorbox-reset class=\"lyteColorboxDisabled\" lt-prop-title=\"Reset Zoom\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></lyte-colorbox-reset> <lyte-colorbox-zoomout lt-prop-title=\"Zoom Out\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;appearance&quot; : &quot;box&quot;,&quot;margin&quot; : 5}\"></lyte-colorbox-zoomout> </div> <template is=\"if\" value=\"{{ltPropThumbnail}}\"><template case=\"true\"> <lyte-colorbox-thumbnail> <div class=\"lyteColorboxThumbnails\" onclick=\"{{action(&quot;clickOnThumbnails&quot;,event)}}\"> <div class=\"lyteColorboxThumbInnerWrapper\"> <template is=\"for\" items=\"{{thumbnails}}\" item=\"item\" index=\"index\"> <div class=\"{{lyteUiAddShowClass(ltPropAddOrientation,'lyteColorboxThumb','addedOrientation')}}\" data-thumb-val=\"{{lyteUiSetIndexString(index,thumbnails.length)}}\"> <template is=\"if\" value=\"{{ifEquals(item.type,&quot;photo&quot;)}}\"><template case=\"true\"> <img src=\"{{item.lytecboxHref}}\"> </template><template case=\"false\"><template is=\"if\" value=\"{{lyteUiIfEqualsAny(item.type,&quot;iframe&quot;,&quot;custom&quot;)}}\"><template case=\"true\"><template is=\"if\" value=\"{{item.lytecboxThumbnail}}\"><template case=\"true\"> <img class=\"lyteCBoxFavImg\" src=\"{{item.lytecboxThumbnail}}\"> </template><template case=\"false\"> <div class=\"lyteCBoxIframeWrap\"> <div class=\"lyteCBoxIframeIcon\"></div> <div class=\"lyteCBoxIframeLabel\">{{item.format}}</div> </div> </template></template> </template></template></template></template> </div> </template> </div> </div> </lyte-colorbox-thumbnail> </template></template> </lyte-colorbox-container> </template></template> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,5,3]},{"type":"if","position":[1,3,5,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,11]},{"type":"if","position":[1,11],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1,1,5]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1,9]},{"type":"componentDynamic","position":[1,11,1]},{"type":"componentDynamic","position":[1,11,3]},{"type":"componentDynamic","position":[1,11,5]},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1,1]},{"type":"for","position":[1,1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropHeight","ltPropWidth","ltPropOverlayClose","ltPropYield","ltPropSelectors","ltPropLoop","ltPropArrowKey","ltPropZoomBy","ltPropEscKey","ltPropImgError","ltPropAnimation","ltPropThumbnail","ltPropThumbnailNumber","ltPropZoomClickNumber","ltPropType","ltPropMinScale","ltPropMaxScale","ltPropWheelZoom","ltPropZoomPosition","ltPropAddOrientation","currentEle","thumbnails","triggerSetThumbnail","isIframe","download"],
	data : function(){
		return {
			
			/**
			 * @componentProperty {string} ltPropHeight
			 * @version 1.0.0
			 * @suffix px,pt,cm,mm,vh,vm,em
			 */
			'ltPropHeight' : Lyte.attr("string"),

			/**
			 * @componentProperty {string} ltPropWidth
			 * @version 1.0.0
			 * @suffix px,pt,cm,mm,vh,vm,em
			 */
			'ltPropWidth' : Lyte.attr("string"),

			/**
             * @componentProperty {boolean} ltPropOverlayClose
             * @version 1.0.0
             * @default true
             * 
             */
			'ltPropOverlayClose' : Lyte.attr("boolean",{"default":true}),

			/**
             * @componentProperty {boolean} ltPropYield
             * @version 1.0.0
             * @default false
             * 
             */
			'ltPropYield' : Lyte.attr("boolean",{"default":false}),

			/**
             * @componentProperty {array} ltPropSelectors
             * @version 1.0.0
             * @default []
             */
			'ltPropSelectors' : Lyte.attr("array",{"default" : []}),

			/**
             * @componentProperty {boolean} ltPropLoop
             * @version 1.0.0
             * @default true
             * 
             */
			'ltPropLoop' : Lyte.attr("boolean",{"default":true}),

			/**
             * @componentProperty {boolean} ltPropArrowKey
             * @version 1.0.0
             * @default true
             * 
             */
			'ltPropArrowKey' : Lyte.attr("boolean",{"default":true}),

			/**
             * @componentProperty {string} ltPropZoomBy
             * @version 1.0.0
             * @default 25%
             */
			'ltPropZoomBy' : Lyte.attr("string",{"default":"25%"}),

			/**
             * @componentProperty {boolean} ltPropEscKey
             * @version 1.0.0
             * @default true
             * 
             */
			'ltPropEscKey' : Lyte.attr("boolean",{"default":true}),

			/**
             * @componentProperty {string} ltPropImgError
             * @version 1.0.0
             * @default This image failed to load.
             */
			'ltPropImgError' : Lyte.attr("string",{"default":"This image failed to load."}),

			/**
             * @componentProperty {string} ltPropAnimation
             * @version 1.0.0
             * @default default
             * @options default,slide
             */
			'ltPropAnimation' : Lyte.attr("string",{"default":"default"}),   //default,slide

			/**
             * @componentProperty {boolean} ltPropThumbnail
             * @version 1.0.0
             * @default true
             * 
             */
			'ltPropThumbnail' : Lyte.attr("boolean",{"default":true}),

			/**
             * @componentProperty {number} ltPropThumbnailNumber
             * @version 1.0.0
             * @default 7
             */
			'ltPropThumbnailNumber' : Lyte.attr("number",{"default":7}),

			/**
             * @componentProperty {number} ltPropZoomClickNumber
             * @version 1.0.0
             * @default 5
             */
			'ltPropZoomClickNumber' : Lyte.attr('number',{'default':5}),

			/**
             * @componentProperty {custom|image} ltPropType
             * @version 2.2.5
             * @default custom
             */
			'ltPropType': Lyte.attr( 'string', { 'default': 'custom' } ),

			/**
             * @componentProperty {number} ltPropMinScale
             * @version 2.2.5
             * @default 0.01
             * @minValue 0.01
             * @maxValue Infinity
             */
			'ltPropMinScale' : Lyte.attr( 'number', { default : 0.01 } ),

			/**
             * @componentProperty {number} ltPropMaxScale
             * @version 2.2.5
             * @default Infinity
             * @minValue 0.01
             * @maxValue Infinity
             */
			'ltPropMaxScale' : Lyte.attr( 'number', { default : Infinity } ),

			/**
             * @componentProperty {boolean} ltPropWheelZoom
             * @version 2.2.5
             * @default false
             * 
             */
			'ltPropWheelZoom' : Lyte.attr( 'boolean', { default : false } ),

			/**
             * @componentProperty {center|imageCenter} ltPropZoomPosition
             * @version 2.2.5
             * @default center
             */
			'ltPropZoomPosition' : Lyte.attr( 'string', { default : 'center' } ),	//center, imageCenter

			/**
             * @componentProperty {boolean} ltPropAddOrientation
             * @version 2.2.15
             * @default false
             * 
             */
			'ltPropAddOrientation' : Lyte.attr('boolean', { default : false} ),
			'currentEle' : Lyte.attr('object'),
			'thumbnails' : Lyte.attr('array'),
			'triggerSetThumbnail' : Lyte.attr('number',{'default':0}),
			'isIframe' : Lyte.attr('boolean',{"default":false}),
			'download' : Lyte.attr('boolean',{"default":true})

		}		
	},

	trapFocus: function() {
		var content = LyteColorbox._content,
		isTrapFocusPresent = $L( content ).trapFocus,
		id = content.getAttribute( 'id' );

		if( !id ) {
			id = 'lyteColorBox' + ( new Date() ).getTime();
			content.setAttribute( 'id', id );
		}

		if( isTrapFocusPresent ) {
			content.setAttribute( 'id', id );
			$L( '#' + id ).trapFocus();
		}
	},

	setThumbnailSliderProp : function(){
		if(this.getData('ltPropThumbnail') && LyteColorbox._thumbDiv){
			$L.fastdom.measure( function(){
				var thumbnailNo = this.getData('ltPropThumbnailNumber'),
					thumbnails = LyteColorbox._thumbDiv.querySelectorAll('.lyteColorboxThumb'),
					parentDiv = LyteColorbox._thumbDiv.querySelector('.lyteColorboxThumbnails'),
					innerWrapper = LyteColorbox._thumbDiv.querySelector('.lyteColorboxThumbInnerWrapper'),
					thumbnailsOffset = window.getComputedStyle(thumbnails[0]),
					winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					thumbnailWidth = (parseInt(thumbnailsOffset.width) + (thumbnailsOffset.marginLeft ? parseInt(thumbnailsOffset.marginLeft) : 0) + (thumbnailsOffset.marginRight ? parseInt(thumbnailsOffset.marginRight) : 0));
				$L.fastdom.mutate( function(){
					if(this.getData('ltPropType') === "custom"){
						parentDiv.style.width = (thumbnails.length < thumbnailNo ? thumbnails.length * thumbnailWidth : thumbnailNo * thumbnailWidth) + "px";
						innerWrapper.style.width = thumbnails.length * thumbnailWidth + "px";
						parentDiv.classList.remove('lyteColorboxHideVisibility');
					}
					else{
						var width = thumbnails.length * thumbnailWidth;
						if(width > winWidth){
							parentDiv.style.width = "100%";
						}
						innerWrapper.style.width = thumbnails.length * thumbnailWidth + "px";
						parentDiv.classList.remove('lyteColorboxHideVisibility');
					}
				}.bind(this) );
			}.bind(this) );
		}
	}.observes('ltPropThumbnailNumber','triggerSetThumbnail'),

	init : function(){
		this.$node.launch = function(element){
			LyteColorbox.launch.call( this, element);
		}.bind(this);
		this.$node.push = function(values){
			LyteColorbox.add(values);
		};
		this.$node.open = function(value){
			LyteColorbox.open(value);
		};
		this.$node.zoomBy = function(value){
			LyteColorbox.zoomByUtilFn(value);
		};
		this.$node.replace = function(index, obj){
			LyteColorbox.replace(index,obj);
		};
		this.$node.close = function(){
			LyteColorbox.close();
		};
		this.$node.delete = function(index){
			LyteColorbox.remove(index);
		};
		if(this.getData('ltPropYield')){
			this.setData('ltPropThumbnail',false);
		}
	},

	observeHeightAndWidth : function(){
		if(LyteColorbox._open && LyteColorbox._domEle.classList.contains('lyteCBoxPhoto')){
			LyteColorbox.checkAspectRatio();
		}
	}.observes('ltPropHeight','ltPropWidth'),

	toggleTumbnail : function(){
		var type = this.getData( 'ltPropType' ),
		container = LyteColorbox._box,
		thumbnail = type === 'custom' ? container.querySelector('.lyteColorboxThumbOuterWrapper') : container.querySelector( 'lyte-colorbox-thumbnail' );

		if( this.getData( 'ltPropThumbnail' ) ) {
			LyteColorbox._thumbDiv = thumbnail;
		}
		else{
			LyteColorbox._thumbDiv = null;
		}
	}.observes('ltPropThumbnail'),

	/**
	 * The method is going to initialze the colorbox component and add listeners to the elements that will be shown in the custom type colorbox
	 *
	 */
	intialFunc : function(){

		var type = this.getData( 'ltPropType' );

		// We've added this to prevent any initial errors from happening
		if( type === 'custom' ) {
			if(!this._box){
				this._init = false;
				var comp = this;
				// debugger
				this._content = comp.$node.querySelector('.lyteCBoxContent');
				this._overlay = comp.$node.querySelector('.lyteCBoxOverlay');
				this._title = comp.$node.querySelector('.lyteCBoxTitle');
				this._close = comp.$node.querySelector('.lyteCBoxClose');
				this._download = comp.$node.querySelector('.lyteCBoxDownload');
				this._next = comp.$node.querySelector('.lyteCBoxNext');
				this._prev = comp.$node.querySelector('.lyteCBoxPrevious');
				this._zoomIn = comp.$node.querySelector('.lyteCBoxZoomIn');
				this._zoomOut = comp.$node.querySelector('.lyteCBoxZoomOut');
				this._reset = comp.$node.querySelector('.lyteCBoxReset');
				this._box = comp.$node.querySelector('.lyteCBox') ? comp.$node.querySelector('.lyteCBox') : false;
			
				if(!comp.getData('ltPropYield') && comp.getData('ltPropThumbnail')){
					this._thumbDiv = comp.$node.querySelector('.lyteColorboxThumbOuterWrapper');
				}

				if(!this._box){
					this._box = LyteColorbox.createElement('div',null,'lyteCBox');
					var children = comp.$node.querySelector('lyte-yield').children;
					while(children.length > 0){
						_lyteUiUtils.appendChild(this._box,children[0]);
					}
					this._box.classList.add('lyteColorbox');
				}

				LyteColorbox._count = LyteColorbox._count+1;
				this._className = 'lyteCBoxWrapper__'+(LyteColorbox._count);
				this._boxElement = LyteColorbox._boxElement+LyteColorbox._count;
				this._box.classList.add(this._className);
				this._box._callee = comp.$node;
			
			}

			if (document.body && ((this._box.parentElement && this._box.parentElement.tagName != "BODY") || !this._box.parentElement) ) {
				_lyteUiUtils.appendChild(document.body,this._box);
				this.childComp = this._box;
			}

			LyteColorbox.setupForBindings( this );
			this.addBindings();

			this.unbindEventsForSelectors();
			var ele = this.getSelectorElements();

			if( ele.length > 0 ) {
				this.addClickEvents(ele, this._className);
			}
			else{
				console.warn("No selector(s) provided to colorbox.")
			}	
		}
		else {
			this.setupColorBoxForImages();
		}
		
	}.observes('ltPropSelectors.[]').on('didConnect'),

	convertToArray: function( children ) {
		return Array.prototype.slice.call( children );
	},

	createOwnContainer: function() {
		var children, arrayOfChildren;

		this._box = document.createElement( 'lyte-colorbox-container' );
		children = this.$node.querySelector( 'lyte-yield' ).children;
		arrayOfChildren = this.convertToArray( children );

		arrayOfChildren.forEach( function( child ) {
			_lyteUiUtils.appendChild( this._box, child );
		}.bind(this) );

		// TODO: We are not adding the lyteColorBox class. Ask sam if it is needed 
	},

	setupAlreadyComplete: function() {
		return this._box;
	},

	setupElements: function() {
		var comp = this,
		isContainerProvidedByTheUser;

		this._loadingIcon = comp.$node.querySelector( 'lyte-colorbox-loading-icon' );
		this._content = comp.$node.querySelector( 'lyte-colorbox-content' );
		this._title = comp.$node.querySelector( 'lyte-colorbox-title' );
		this._close = comp.$node.querySelector( 'lyte-colorbox-close' );
		this._download = comp.$node.querySelector( 'lyte-colorbox-download' );
		this._next = comp.$node.querySelector( 'lyte-colorbox-next' );
		this._prev = comp.$node.querySelector( 'lyte-colorbox-previous' );
		this._zoomIn = comp.$node.querySelector( 'lyte-colorbox-zoomin' );
		this._zoomOut = comp.$node.querySelector( 'lyte-colorbox-zoomout' );
		this._reset = comp.$node.querySelector( 'lyte-colorbox-reset' );
		this._header = comp.$node.querySelector( 'lyte-colorbox-header' );
		this._description = comp.$node.querySelector( 'lyte-colorbox-description' );
		this._box = comp.$node.querySelector( 'lyte-colorbox-container' ) ? comp.$node.querySelector( 'lyte-colorbox-container' ) : false;

		if( !this.getData( 'ltPropYield' ) 
			&& this.getData( 'ltPropThumbnail' ) 
		) {
			// TODO: Ask Sam if there is a need to expose thumbnails to the user
			this._thumbDiv = comp.$node.querySelector( 'lyte-colorbox-thumbnail' );
		}

		isContainerProvidedByTheUser = this._box ? true : false;

		if( !isContainerProvidedByTheUser ) {
			this.createOwnContainer();
		}

		LyteColorbox._count = LyteColorbox._count + 1;
		this._className = 'lyteCBoxWrapper__' + ( LyteColorbox._count );
		this._boxElement = LyteColorbox._boxElement + LyteColorbox._count;
		this._box.classList.add( this._className );
		this._box._callee = comp.$node;
	},

	stillNotAppendedToBody: function() {
		return document.body && ( ( this._box.parentElement && this._box.parentElement.tagName != "BODY" ) || !this._box.parentElement );
	},

	/**
	 * The method is going to initialze the colorbox component and add listeners to the elements that will be shown in the image type colorbox
	 *
	 */
	setupColorBoxForImages: function() {
		var listOfItemsThatOpenColorbox;

		if( !this.setupAlreadyComplete() ) {
			this._init = false;
			this.setupElements();
		}

		if( this.stillNotAppendedToBody() ) {
			_lyteUiUtils.appendChild( document.body, this._box );
			this.childComp = this._box;
		}

		LyteColorbox.setupForBindings( this );
		this.addBindings();

		this.unbindEventsForSelectors();
		listOfItemsThatOpenColorbox = this.getSelectorElements();

		if( listOfItemsThatOpenColorbox.length > 0 ) {
			// LyteColorbox.setupForBindings( this );
			// this.addBindings( listOfItemsThatOpenColorbox, this._className );
			this.addClickEvents( listOfItemsThatOpenColorbox, this._className );
		}
		else{
			console.warn("No selector(s) provided to colorbox.")
		}	
	},

	/**
	 * The method is going to add the zoom util icons and their behaviour for images and for others the same will be removed
	 *
	 */
	utilDivEvents : function(){
		if(!this.getData('isIframe')){
			LyteColorbox._zoomIn = this._zoomIn = this.childComp.querySelector('.lyteCBoxZoomIn');
			LyteColorbox._zoomOut = this._zoomOut = this.childComp.querySelector('.lyteCBoxZoomOut');
			LyteColorbox._reset = this._reset = this.childComp.querySelector('.lyteCBoxReset');
			if(LyteColorbox._zoomIn){
				LyteColorbox._zoomIn.addEventListener('click',function(){
					LyteColorbox.zoomIn();
				},true)
			}
			if(LyteColorbox._zoomOut){
				LyteColorbox._zoomOut.addEventListener('click',function(){
					LyteColorbox.zoomOut();
					this.triggerCheck();
				}.bind(this),true)
			}
			if(LyteColorbox._reset){
				LyteColorbox._reset.addEventListener('click',function(){
					LyteColorbox.reset(null ,true);
				},true)
			}
		}
		else{
			LyteColorbox._zoomIn = this._zoomIn = null;
			LyteColorbox._zoomOut = this._zoomOut = null;
			LyteColorbox._reset = this._reset = null;
		}
	}.observes('isIframe'),

	/**
	 * The method is going to show or remove download icon and behaviour based on if the download link is provided or not
	 *
	 */
	downloadDivEvents : function(){
		if(this.getData('download')){
			LyteColorbox._download = this._download = this.$node.querySelector('.lyteCBoxDownload');
			if(LyteColorbox._download){
				LyteColorbox._download.addEventListener('click',function(){
					LyteColorbox.download();
				},true);
			}
		}
		else{
			LyteColorbox._download = this._download = null;
		}
	}.observes('download'),

	callOnBeforeOpen : function(arrayObj,event){
		var returnVal;
		if(this.getMethods('onBeforeOpen')){
			returnVal = this.executeMethod('onBeforeOpen',arrayObj,this,event);
		}
		return returnVal;
	},

	callOnOpen : function(){
		if(this.getMethods('onOpen')){
			this.executeMethod('onOpen',this);
		}
	},

	callOnLoad : function(){
		if(this.getMethods('onLoad')){
			this.executeMethod('onLoad',arguments[0],arguments[1],this,this.getData('ltPropAddOrientation') ? arguments[2] : null);
		}
	},

	callOnComplete : function(){
		if(this.getMethods('onComplete')){
			this.executeMethod('onComplete',arguments[0],arguments[1],this);
		}
	},

	callOnFailure : function(){
		if(this.getMethods('onFailure')){
			this.executeMethod('onFailure',arguments[0],arguments[1],this,arguments[2]);
		}
	},

	getSelectorElements : function(){
		var selectors = this.getData('ltPropSelectors');
		var ele = [];
		for(var i = 0; i<selectors.length; i++){
			Lyte.arrayUtils(ele,'push',Array.from(document.querySelectorAll(selectors[i])));
		}
		return ele;
	},

	unbindEventsForSelectors: function(){
		var elements = document.querySelectorAll('.'+this._boxElement);
		if(elements.length > 0){
			for(var i = 0; i<elements.length; i++){
				elements[i].removeEventListener("click",this.clickHandler,true);
				elements[i].classList.remove(this._boxElement);
				delete elements[i]._className;
			}
		}
		this.setData('currentEle',null);
	},

	callOnClose : function(){
		if(this.getMethods('onClose')){
			this.executeMethod("onClose",this);
		}
	},

	didDestroy: function() {
		// debugger
		if(!LyteColorbox._first && /*LyteColorbox._count == 1*/$L('lyte-colorbox').length == 0){
			window.removeEventListener('resize',LyteColorbox.computeOffsetImpl);
			LyteColorbox._first = true;
		}
		this.unbindEventsForSelectors();
		delete this.childComp;
		this._box._callee = null;
		if(LyteColorbox._box){
			LyteColorbox._box._callee = null;
		}
		LyteColorbox._component = null;
		this._box.remove();

		if( this._header ) {
			this._header = null;
		}
		
		LyteColorbox._box = this._box = null;
		LyteColorbox._prev = this._prev = null;
		LyteColorbox._next = this._next = null;
		LyteColorbox._content = this._content = null;
		LyteColorbox._overlay = this._overlay = null;;
		LyteColorbox._title = this._title = null;
		LyteColorbox._close = this._close = null;
		LyteColorbox._download = this._download = null;
		LyteColorbox._thumbDiv = this._thumbDiv = null;
		LyteColorbox._description = this._description = null;
		LyteColorbox._zoomIn = this._zoomIn = null;
		LyteColorbox._zoomOut = this._zoomOut = null;
		LyteColorbox._reset = this._reset = null;
		LyteColorbox._loadingIcon = this._loadingIcon = null;
		LyteColorbox._domEle = null;
		LyteColorbox._el = null;
		LyteColorbox._boxEle = this._boxElement = null;
		LyteColorbox._open = null;
		LyteColorbox._active = null;
		LyteColorbox._closing = null;
		LyteColorbox._related = null;
		// LyteColorbox._count -= 1;
		LyteColorbox._diff = 0;
		document.body.classList.remove('lyteCBoxOH');
	},

	clickHandler : function(e) {
		if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			LyteColorbox.setupForBindings(document.querySelector('.'+this._className)._callee.component);
			LyteColorbox.launch(LyteColorbox.getProperties(this), e);
		}
	},

	checkBeforeClose : function(event){
		var returnVal;
		if(this.getMethods('onBeforeClose')){
			returnVal = this.executeMethod('onBeforeClose', event, this);
		}
		if(returnVal === undefined || returnVal === true){
			LyteColorbox.close();
		}
	},

	/**
	 * The method is going to add event to the body or to the element that will be shown in the colorbox and matches the selectors provided by ltPropSelectors
	 *
	 */
	addBindings : function() {
		var comp, type;

		if (LyteColorbox._box) {

			if(!this._init){
				this._init = true;

				comp = LyteColorbox._component;
				type = comp.getData( 'ltPropType' );

				// Add this only for our new type of colorbox
				if( LyteColorbox._content && type !== 'custom' && false ) {
					LyteColorbox._content.addEventListener('click',function (event) {
						if( event.target.tagName !== 'IMG' && LyteColorbox._component.getData('ltPropOverlayClose') ) {
							// LyteColorbox.close();
							this.checkBeforeClose(event);
						}
					}.bind( this ),true);
				}
				
				if(LyteColorbox._next){
					LyteColorbox._next.addEventListener('click',function (event) {
						LyteColorbox.next(event);
					},true);
				}
				if(LyteColorbox._prev){
					LyteColorbox._prev.addEventListener('click',function (event) {
						LyteColorbox.prev(event);
					},true);
				}
				if(LyteColorbox._close){
					LyteColorbox._close.addEventListener('click',function (event) {
						// LyteColorbox.close();
						this.checkBeforeClose(event);
					}.bind( this ),true);
				}
				if(LyteColorbox._overlay){
					LyteColorbox._overlay.addEventListener('click',function (event) {
						if (LyteColorbox._component.getData('ltPropOverlayClose')) {
							// LyteColorbox.close();
							this.checkBeforeClose(event);
						}
					}.bind( this ),true);
				}
				if(LyteColorbox._download){
					LyteColorbox._download.addEventListener('click',function(){
						LyteColorbox.download();
					},true);
				}
				if(LyteColorbox._zoomIn){
					LyteColorbox._zoomIn.addEventListener('click',function(){
						LyteColorbox.zoomIn();
					},true)
				}
				if(LyteColorbox._zoomOut){
					LyteColorbox._zoomOut.addEventListener('click',function(){
						LyteColorbox.zoomOut();
						this.triggerCheck();
					}.bind(this),true)
				}
				if(LyteColorbox._reset){
					LyteColorbox._reset.addEventListener('click',function(){
						LyteColorbox.reset(null ,true);
					},true)
				}

				if( LyteColorbox._content && this.data.ltPropWheelZoom ){
					LyteColorbox._content.addEventListener( 'wheel', LyteColorbox.wheel.bind( LyteColorbox ), true );
				}

				if(LyteColorbox._content){	//Click and drag
					LyteColorbox._content.addEventListener('mousedown',function(e){
						this.mousedownFn(e);
					}.bind(this),true);

					LyteColorbox._content.addEventListener('touchstart',function(e){
						this.mousedownFn(e);
					}.bind(this),true);
				}

				// Key Bindings
				if(!LyteColorbox._boundKeydown){
					LyteColorbox._boundKeydown = true;
					document.body.addEventListener('keyup', function (e) {
						if(LyteColorbox._intervalId){
							clearInterval(LyteColorbox._intervalId);
							LyteColorbox._intervalId = false;
						}
					}, true);
					document.body.addEventListener('keydown', function (e) {
						var key = e.keyCode;
						if (LyteColorbox._open && LyteColorbox._component.getData('ltPropEscKey') && key === 27) {
							e.preventDefault();
							// LyteColorbox.close();
							LyteColorbox._component.checkBeforeClose(e);
						}
						if (LyteColorbox._open && LyteColorbox._component.getData('ltPropArrowKey') && LyteColorbox._related[1] && !e.altKey) {
							if (key === 37) {
								if(LyteColorbox._intervalId){
									return;
								}
								LyteColorbox._intervalId = setInterval(function(){
									LyteColorbox._intervalId = false;
								},100);
								// LyteColorbox._keydownPressed = true;
								var target = e.target;
								if(target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable){
									return;
								}
								e.preventDefault();
								// console.log(e.target);
								if(LyteColorbox._prev){
									LyteColorbox.prev(e);
								}
								else{
									if(LyteColorbox._related instanceof Array && LyteColorbox._related.length > 1){
										LyteColorbox.prev(e);
									}
								}
							} else if (key === 39) {
								if(LyteColorbox._intervalId){
									return;
								}
								// console.log("Before setting",LyteColorbox._intervalId);
								LyteColorbox._intervalId = setInterval(function(){
									LyteColorbox._intervalId = false;
								},100);
								// console.log("After setting",LyteColorbox._intervalId);
								// LyteColorbox._keydownPressed = true;
								var target = e.target;
								if(target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable){
									return;
								}
								e.preventDefault();
								// console.log(e.target);
								if(LyteColorbox._next){
									LyteColorbox.next(e);
								}
								else{
									if(LyteColorbox._related instanceof Array && LyteColorbox._related.length > 1){
										LyteColorbox.next(e);
									}
								}
							}
						}
					},true);
				}

				if(!LyteColorbox._boundResize){
					LyteColorbox._boundResize = true;
					window.addEventListener('resize',function(){
						if(LyteColorbox._open){
							if(LyteColorbox._domEle && LyteColorbox._domEle.classList.contains('lyteCBoxPhoto')){
								LyteColorbox.checkAspectRatio();
							}
							LyteColorbox._diff = 0;
						}
					},true);
				}

			}
			
			return true;
		}
		return false;
	},

	addClickEvents : function(ele, className){
		for(var i = 0; i<ele.length; i++){
			ele[i].addEventListener("click",this.clickHandler,true);
			ele[i].classList.add(this._boxElement);
			ele[i]._className = className;
		}
	},

	triggerCheck : function(stopTimeout){
		// if(this.timeoutId || (stopTimeout && this.timeoutId)){
		// 	clearTimeout(this.timeoutId);
		// 	this.timeoutId = undefined;
		// }
		// this.timeoutId = setTimeout(function(){
		// 	LyteColorbox.checkForLeftAndTopAfterZoomOut();
		// 	this.timeoutId = undefined;
		// },300);
		LyteColorbox._domEle.addEventListener('transitionend',LyteColorbox.checkForLeftAndTopAfterZoomOut);
	},

	mousedownFn : function(e){
		var ele = null;

		if(e.which === 3){
			return;
		}
		var target = e.target;
		while(target){
			if($L(target).hasClass("lyteCBoxPhoto")){
				ele = target;
				break;
			}
			target = target.parentElement;
		}
		if(ele){
			// TODO: Removed this because this was preventing a blur from happening in the colorbox
			// But preventDefault is required in firefox to restirct its default move that happens when an image is clicked and dragged
			if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
			    e.preventDefault();
			}
			if(ele.classList.contains('lyteCBoxAnimateOnUp')){
				ele.classList.remove('lyteCBoxAnimateOnUp');
			}
			var parentOffset = ele.parentElement.getBoundingClientRect();
			var eleOffset = ele.getBoundingClientRect();
			//If after zooming the image size has outgrown it parent
			if(eleOffset.top < parentOffset.top || eleOffset.left < parentOffset.left || eleOffset.bottom > parentOffset.bottom || eleOffset.right > parentOffset.right){
				if(eleOffset.top < parentOffset.top || eleOffset.bottom > parentOffset.bottom){	//check top value in mouseup
					ele._top = true;
				}
				if(eleOffset.left < parentOffset.left || eleOffset.right > parentOffset.right){	//check left value in mouseup
					ele._left = true;
				}
				if(e.type == "touchstart"){
					ele._offset.x = e.touches[0].clientX;
					ele._offset.y = e.touches[0].clientY;

					// ele._offset = {
					// 				x : e.touches[0].clientX,
					// 				y : e.touches[0].clientY
					// 			};
					document.addEventListener('touchmove',LyteColorbox.mm = function(e){
						this.mousemoveFn(e);
					}.bind(this));
					document.addEventListener('touchend',LyteColorbox.mu = function(e){
						this.mouseupFn(e);
					}.bind(this));
				}
				else{
					ele._offset.x = e.clientX;
					ele._offset.y = e.clientY;
					// ele._offset = {
					// 				x : e.clientX,
					// 				y : e.clientY
					// 			};
					document.addEventListener('mousemove',LyteColorbox.mm = function(e){
						this.mousemoveFn(e);
					}.bind(this));
					document.addEventListener('mouseup',LyteColorbox.mu = function(e){
						this.mouseupFn(e);
					}.bind(this));
				}
			}
			LyteColorbox._draggedEle = ele;
		}
	},

	mousemoveFn : function(e){
	
		if(LyteColorbox._draggedEle){
			var ele = LyteColorbox._draggedEle;
			e.preventDefault();
			var _mousePosition;
			if(e.type == "touchmove"){
				_mousePosition = {
									x : e.touches[0].clientX,
									y : e.touches[0].clientY
								};
			}
			else{
				_mousePosition = {
									x : e.clientX,
									y : e.clientY
								};
			}
			var parent = ele.offsetParent;
			var parentOffset = parent.getBoundingClientRect();
			var leftVal = _mousePosition.x - ele._offset.x/* - parentOffset.left - parseInt(_marginLeft) + scrollLeftValue*/;
			var topVal = _mousePosition.y - ele._offset.y/* - parentOffset.top - parseInt(_marginTop) + _scrollTop*/;
			if(ele._left){
				ele.style.left = (parseFloat(ele.style.left || 0) + leftVal) + "px";
			}
			if(ele._top){
				ele.style.top = (parseFloat(ele.style.top || 0)+topVal) + "px";
			}
			ele._offset.x = _mousePosition.x;
			ele._offset.y = _mousePosition.y;
		}
	},

	mouseupFn : function(e){
		if(e.type == "touchend"){
			document.removeEventListener('touchmove',LyteColorbox.mm);
			document.removeEventListener('touchend',LyteColorbox.mu);
		}
		else{
			document.removeEventListener('mousemove',LyteColorbox.mm);
			document.removeEventListener('mouseup',LyteColorbox.mu);
		}
		delete LyteColorbox.mm;
		delete LyteColorbox.mu;
		if(LyteColorbox._draggedEle){
			var ele = LyteColorbox._draggedEle;
			var parentOffset = ele.parentElement.getBoundingClientRect();
			var eleOffset = ele.getBoundingClientRect();
			var diff;
			if(ele._left){
				ele.classList.add('lyteCBoxAnimateOnUp');
				if(eleOffset.left > parentOffset.left){
					diff = eleOffset.left - parentOffset.left;
					ele.style.left = (parseFloat(ele.style.left || 0) - diff) + "px";
				}
				if(eleOffset.right < parentOffset.right){
					diff = parentOffset.right - eleOffset.right;
					ele.style.left = (parseFloat(ele.style.left || 0) + diff) + "px";
				}
			}
			// else{
			// 	ele.style.left = "0px";
			// }
			if(ele._top){
				if(!(ele.classList.contains('lyteCBoxAnimateOnUp'))){
					ele.classList.add('lyteCBoxAnimateOnUp');
				}
				if(eleOffset.top > parentOffset.top){
					diff = eleOffset.top - parentOffset.top;
					ele.style.top = (parseFloat(ele.style.top || 0) - diff) + "px";
				}
				if(eleOffset.bottom < parentOffset.bottom){
					diff = parentOffset.bottom - eleOffset.bottom;
					ele.style.top = (parseFloat(ele.style.top || 0) + diff) + "px";
				}
			}
			// else{
			// 	ele.style.top = "0px";
			// }
			// if(!(ele.classList.contains('lyteCBoxAnimateOnUp'))){
			// 	debugger
			// }
			ele = null;
			delete LyteColorbox._draggedEle;
			// mm = null;
			// mu = null;
		}
	},

	moveToImage: function( event ) {
		var type = this.getData( 'ltPropType' ), dir = 0;

		var target = event.target;
		while(target.parentElement){
			if(target.classList.contains('lyteColorboxThumb')){
				break;
			}
			target = target.parentElement;
		}
		if(target.classList.contains('lyteColorboxThumb')){
			var children = Array.from(target.parentElement.children).filter(function(ele){ return ele.tagName != "TEMPLATE" });
			for(var i = 0; i < children.length; i++){
				if(children[i].isEqualNode(target)){
					if(i > LyteColorbox._index){
						dir = 1;
						if (!LyteColorbox._active && LyteColorbox._related[1] && (LyteColorbox._component.getData('ltPropLoop') || LyteColorbox._related[(LyteColorbox._index + 1)])) {
							if(LyteColorbox._component.getData('ltPropAnimation') != "slide"){
								LyteColorbox.hideElement();
								// LyteColorbox.toggleLoadingIcon();
							}else{
								LyteColorbox._nextItem = true;
							}
							LyteColorbox.toggleLoadingIcon();
							if( type === 'custom' ) {
								LyteColorbox.reset();
							}
							
							LyteColorbox._index = i;
							LyteColorbox._domEle = null;
							LyteColorbox.load(LyteColorbox._el = LyteColorbox._related[LyteColorbox._index]);
						}
					}
					else if(i < LyteColorbox._index){
						dir = -1;
						if (!LyteColorbox._active && LyteColorbox._related[1] && (LyteColorbox._component.getData('ltPropLoop') || LyteColorbox._index)) {
							if(LyteColorbox._component.getData('ltPropAnimation') != "slide"){
								LyteColorbox.hideElement();
								// LyteColorbox.toggleLoadingIcon();
							}else{
								LyteColorbox._prevItem = true;
							}
							LyteColorbox.toggleLoadingIcon();
							if( type === 'custom' ) {
								LyteColorbox.reset();
							}
							LyteColorbox._index = i;
							LyteColorbox._domEle = null;
							LyteColorbox.load(LyteColorbox._el = LyteColorbox._related[LyteColorbox._index]);
						}
					}
				}
			}
			this.getMethods("onNavigate") && this.executeMethod('onNavigate',event,this.$node,LyteColorbox._index+1, dir );
		}
	},

	actions : {
		clickOnThumbnails : function(event){
			var promise, that = this;

			if( this.getMethods( 'onBeforeNavigate' ) ) {
				promise = this.executeMethod( 'onBeforeNavigate', event, this.$node, LyteColorbox._index );
			}

			if( promise ) {
				promise.then( function() {
					that.moveToImage( event );
				} );
			}
			else {
				this.moveToImage( event );
			}
		}
	}

});

// //findIndex
// function findIndex( array, condition) {
//     var index;

//     if( condition.constructor == Function ) {
//         for( var i = 0; i < array.length; i++ ) {
//             var ret = condition.call( array[ i ], array[ i ] );
//             if( ret ) {
//                 return i;
//             }
//         }
//     } else {
//        return Array.prototype.indexOf.call( array, condition );
//     }    
// }
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

/**
 * @syntax nonYielded
 * <lyte-colorbox>
 * </lyte-colorbox> 
 */

/**
 * @syntax 
 * @attribute ltPropType=custom
 * @attribute ltPropYield=true
 * <lyte-colorbox lt-prop = '{"selectors" : ["selector1"]}' lt-prop-yield = "true"> 
 *	  <template is = "registerYield" yield-name = "colorBoxYield"> 
 *	  	  <div class = "lyteCBoxOverlay"> </div> 
 *	  	  <div class = "lyteCBoxContent customColorpickerContent"> </div> 
 *	  	  <div class = "lyteCBoxClose"> 
 *	  	  	  <svg viewport = "0 0 28 28" version = "1.1" xmlns = "http://www.w3.org/2000/svg"> 
 *	  	  	  	  <line x1 = "1" y1 = "27" x2 = "27" y2 = "1" stroke = "white" stroke-width = "2"></line> 
 *	  	  	  	  <line x1 = "1" y1 = "1" x2 = "27" y2 = "27" stroke = "white" stroke-width = "2"> </line> 
 *	  	  	  </svg> 
 *	  	  </div> 
 *	  	  <div class = "customHeaderBlock"> 
 *	  	  	  <div class = "customHeader"> 
 *	  	  	  	  <span> <img src = "custom-pic.png" width = "40px" height = "40px"> </span> 
 *	  	  	  	  <span>  Custom ColorBox</span> 
 *	  	  	  </div> 
 *	  	  	  <div class = "lyteCBoxTitle customTitle">  Title Here!</div> 
 *	  	  	  <div class = "lyteCBoxDownload"> 
 *	  	  	  	  <img src = "download-arrow.svg"> 
 *	  	  	  </div> 
 *	  	  </div> 
 *	  </template> 
 * </lyte-colorbox> 
 */

/**
 * @syntax 
 * @attribute ltPropType=image
 * @attribute ltPropYield=true
 * <lyte-colorbox lt-prop-yield="true" lt-prop='{"type" : "image","selectors" : [".group1"]}' >
 * 	<template is="registerYield" yield-name="colorBoxYield">
 * 		<div>
 * 			<lyte-colorbox-header>
 * 				<lyte-colorbox-title></lyte-colorbox-title>
 * 				<lyte-colorbox-download>
 * 					<span class="lyteColorboxDownloadImg"></span>
 * 				</lyte-colorbox-download>
 * 				<lyte-colorbox-close></lyte-colorbox-close>
 * 			</lyte-colorbox-header>
 * 			<lyte-colorbox-content>
 * 				<span class="lyteColorboxLoadingImg"></span>
 * 			</lyte-colorbox-content>
 * 			<lyte-colorbox-previous>
 * 				<div class="lyteColorboxPreviousIcon"></div>
 * 			</lyte-colorbox-previous>
 * 			<lyte-colorbox-next>
 * 				<div class="lyteColorboxNextIcon"></div>
 * 			</lyte-colorbox-next>
 * 			<lyte-colorbox-description>
 * 			</lyte-colorbox-description>
 * 			<div class="lyteColorboxUtilDiv">
 * 				<lyte-colorbox-zoomin></lyte-colorbox-zoomin>
 * 				<lyte-colorbox-reset></lyte-colorbox-reset>
 * 				<lyte-colorbox-zoomout></lyte-colorbox-zoomout>
 * 			</div>
 * 			<lyte-colorbox-loading-icon></lyte-colorbox-loading-icon>
 * 		</div>
 * 	</template>
 * </lyte-colorbox>
 */
