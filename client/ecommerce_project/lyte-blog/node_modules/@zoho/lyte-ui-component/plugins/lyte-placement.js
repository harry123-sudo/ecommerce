 ;(function(windows){
 	
 	lyteDomObj.prototype.placement = function( config ) {
		var elem = this.get(0);
		appendElement( config , elem );
		if( config.originElement ) {
			alignWithOriginElement( config , elem );						
		}else{
			alignWithWindow( config , elem );
		}			
	}

	function alterElementPosition( alterposition , elem ){
		if( alterposition ){
			elem.style.left = elem.offsetLeft + alterposition.left + 'px';
			elem.style.top = elem.offsetTop + alterposition.top + 'px';
		}
	}
			
	function appendElement( config , elem ){
		var appendto;
		elem.style.position = 'absolute';
		if( config.appendTo ){
			appendto = document.querySelector( config.appendTo );
			if( appendto == undefined ){
				appendto = $L('body').get(0);
			}
		}else{
			appendto = document.getElementsByTagName('body')[0];
		}
			appendto.appendChild(elem);
	}

	function alignRight( origin_elem , elem ){
		var actualposition = origin_elem.getBoundingClientRect().right;
		if( isWindowLeftExceeded( actualposition , elem ) ){
			elem.style.left = actualposition + "px";
		}else{
			elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + "px";
		}
		FixElementTop( origin_elem , elem);
	}
			
	function alignLeft( origin_elem , elem ){
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		if( canElementFitLeft( leftBoundary ) ){
			elem.style.left = leftBoundary + "px";
		}else{
			elem.style.left = origin_elem.getBoundingClientRect().right + "px";
		}
		FixElementTop( origin_elem , elem);

	}
	
	function alignTop( origin_elem , elem ){
		var topBoundary =  origin_elem.offsetTop - elem.offsetHeight;
		fixElementLeft( origin_elem , elem );
		if( canElementFitAbove( topBoundary ) ){
			elem.style.top = topBoundary + 'px';
		}else{
			elem.style.top = origin_elem.getBoundingClientRect().bottom + 'px';
		}

	}
	
	function alignBottom( origin_elem , elem ){
		var actual_top = origin_elem.getBoundingClientRect().bottom;
		fixElementLeft( origin_elem , elem );
		if( isWindowTopExceeded( actual_top , elem ) ){
			elem.style.top = actual_top + 'px';
		}else{
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
	}

	function alignBottomRight( origin_elem , elem ){
		var topBoundary = origin_elem.offsetTop - elem.offsetHeight;
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		var actual_left = origin_elem.getBoundingClientRect().right;
		var actual_top = origin_elem.getBoundingClientRect().bottom;
		if( isWindowTopExceeded( actual_top , elem ) || !canElementFitAbove( topBoundary ) ) {
			elem.style.top = actual_top + 'px';
		}
		else {
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
		if( isWindowLeftExceeded( actual_left , elem ) || !canElementFitLeft( leftBoundary ) ){
			elem.style.left = actual_left + 'px';
		}else{
			elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + 'px';
		}
	}

	function alignTopRight( origin_elem , elem ){
		var topBoundary = origin_elem.offsetTop - elem.offsetHeight;
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		var left = origin_elem.getBoundingClientRect().right;
		var top = origin_elem.getBoundingClientRect().bottom;
		if( canElementFitAbove( topBoundary ) || !isWindowTopExceeded( top , elem ) ){
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
		else{
			elem.style.top = top + 'px';
		}
		if( isWindowLeftExceeded( left , elem ) || !canElementFitLeft( leftBoundary ) ){
			elem.style.left = left + 'px';
		}
		else{
			elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + 'px';
		}
	}
	
	function alignTopLeft( origin_elem , elem ){
		
		var topBoundary = origin_elem.offsetTop - elem.offsetHeight;
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		var left = origin_elem.getBoundingClientRect().right;
		var top = origin_elem.getBoundingClientRect().bottom;
		if( canElementFitAbove( topBoundary ) || !isWindowTopExceeded( top , elem ) ){
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
		else{
			elem.style.top = top + 'px';
		}
		if( !isWindowLeftExceeded( left , elem ) || canElementFitLeft( leftBoundary ) ){
			elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + 'px';
		}else{
			elem.style.left = origin_elem.getBoundingClientRect().right + 'px';
		}
	}
	
	function alignBottomLeft( origin_elem , elem ){
		
		var topBoundary = origin_elem.offsetTop - elem.offsetHeight;
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		var actual_left = origin_elem.getBoundingClientRect().right;
		var actual_top = origin_elem.getBoundingClientRect().bottom;
		if( isWindowTopExceeded( actual_top , elem ) || !canElementFitAbove( topBoundary ) ) {
			elem.style.top = actual_top + 'px';
		}
		else {
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
		if( !isWindowLeftExceeded( actual_left , elem ) || canElementFitLeft( leftBoundary ) ){
			elem.style.left = leftBoundary + 'px';
		}else{
			elem.style.left = actual_left + 'px';
		}
	}

	function alignTopCenter( origin_elem , elem ){
		var topBoundary =  origin_elem.offsetTop - elem.offsetHeight;
		elem.style.left = origin_elem.offsetLeft + origin_elem.offsetWidth/2 - elem.offsetWidth/2 + "px";
		if( canElementFitAbove( topBoundary ) ){
			elem.style.top = topBoundary + 'px';
		}else{
			elem.style.top = origin_elem.getBoundingClientRect().bottom + 'px';
		}
	}
	
	function alignBottomCenter( origin_elem , elem ){
		var actual_top =  origin_elem.getBoundingClientRect().bottom;
		elem.style.left = origin_elem.offsetLeft + origin_elem.offsetWidth/2 - elem.offsetWidth/2 + "px";
		if( isWindowTopExceeded( actual_top , elem ) ){
			elem.style.top = actual_top + 'px';
		}else{
			elem.style.top = origin_elem.offsetTop - elem.offsetHeight + 'px';
		}
	}
	
	function alignCenterRight( origin_elem , elem ){
		var actual_left =  origin_elem.getBoundingClientRect().right;
		if( isWindowLeftExceeded( actual_left , elem ) ){
			elem.style.left = actual_left + "px";
		}else{
			elem.style.left = origin_elem.offsetLeft - elem.offsetWidth + "px";
		}
		FixElementTopCenter( origin_elem , elem );

	}
	function alignCenter( origin_elem , elem ){
		var center = origin_elem.offsetLeft + origin_elem.offsetWidth/2 ;
		if( isWindowLeftExceeded( center , elem )){
			elem.style.left = center + 'px'; 
		}else{
			elem.style.left = origin_elem.offsetLeft + origin_elem.offsetWidth/2 - elem.offsetWidth + 'px';
		}
		FixElementTopCenter( origin_elem , elem );
	}
	
	function alignCenterLeft( origin_elem , elem ){
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		if( canElementFitLeft( leftBoundary ) ){
			elem.style.left = leftBoundary + "px";
		}else{
			elem.style.left = origin_elem.getBoundingClientRect().right + "px";
		}
		FixElementTopCenter( origin_elem , elem );
	}
	
	function FixElementTopCenter( origin_elem , elem ){
		var top = origin_elem.offsetTop + origin_elem.offsetHeight/2; 
		if( !isWindowTopExceeded( top , elem ) ){
			elem.style.top = top - elem.offsetHeight + "px";
		}else{
			elem.style.top = top + "px";
		}
	}
	
	function canElementFitAbove( topBoundary ){
		if( topBoundary >= 0 ){
			return true;
		}
		else{
			return false;
		}
	} 
			
	function canElementFitLeft( leftBoundary ){
		if( leftBoundary >= 0 ){
			return true;
		}
		else{
			return false;
		}
	}
	
	function isWindowTopExceeded( position , elem ){
		
		if( ( position + elem.offsetHeight ) < window.innerHeight ){
			return true;
		}
		else{
			return false;
		}

	}
	
	function isWindowLeftExceeded( position , elem ){
		
		if( ( position + elem.offsetWidth ) < window.innerWidth ){
			return true;	
		}
		else{
			return false;
		}
	}	
	
	
	function placeAtBottom( origin_elem , elem ){
		elem.style.top = origin_elem.offsetHeight + origin_elem.offsetTop - elem.offsetHeight + "px"; 
	}

	function placeAtTop( origin_elem , elem ){
		elem.style.top = origin_elem.getBoundingClientRect().top + "px";
	}
	
	function FixElementTop( origin_elem ,elem){
		if( !isWindowTopExceeded( origin_elem.offsetTop , elem ) ){
				placeAtBottom( origin_elem , elem );
		}else{
				placeAtTop( origin_elem , elem );
		}
	}
	
	function alignWithOriginElement( config , elem ){
		var body = $L( "body" ).get(0);
		if( getComputedStyle(body).direction == 'rtl'){
			Changedirection( config );
		}
		if( config.alignment ){
			alignWithLeftTop( config , elem );
		}else{
			alignWithPosition( config , elem );
		}
		alterElementPosition( config.alterposition , elem );
	}
	
	function alignWithLeftTop( config , elem ){
		var origin_elem = $L( config.originElement ).get(0);
		var elem_left = config.alignment.left;
		var elem_top = config.alignment.top;
		switch(elem_top){
			case 'top':
				if( !elem_left ){
					alignTop( origin_elem , elem );
				}
				else if( elem_left == 'left' ){
					alignTopLeft( origin_elem , elem );
				}
				else if( elem_left == 'right'){
					alignTopRight( origin_elem , elem );
				}
				else{
					alignTopCenter( origin_elem , elem ); 
				}
				break;
			case 'bottom':
				if( !elem_left ){
					alignBottom( origin_elem , elem );
				}
				else if( elem_left == 'left' ){
					alignBottomLeft( origin_elem , elem );
				}
				else if( elem_left == 'right'){
					alignBottomRight( origin_elem , elem );
				}
				else{
					alignBottomCenter( origin_elem , elem ); 
				}
				break;
			case 'center':
				if( !elem_left ){
					alignCenter( origin_elem , elem );
				}
				else if( elem_left == 'left' ){
					alignCenterLeft( origin_elem , elem );
				}
				else if( elem_left == 'right'){
					alignCenterRight( origin_elem , elem );
				}
				else{
					alignCenter( origin_elem , elem );				
				}
				break;
			default :
				switch(elem_left){
					case 'left':
						alignLeft( origin_elem , elem );
						break;
					case 'right':
						alignRight( origin_elem , elem );
						break;
					case 'center':
						alignCenter( origin_elem , elem );
						break;
					default :
						alignBottom( origin_elem , elem );
						break;
				}
		}
	}
	
	function alignWithPosition( config , elem ){
		var origin_elem = $L( config.originElement ).get(0);
		switch ( config.position ) {
			case 'right':
				alignRight( origin_elem , elem );
				break;
			case 'left':
				alignLeft( origin_elem , elem );
				break;
			case 'top':
				alignTop( origin_elem , elem );
				break;
			case 'bottomright':
				alignBottomRight( origin_elem , elem );						
				break;
			case 'bottomleft':
				alignBottomLeft( origin_elem , elem );			
				break;
			case 'topright':
				alignTopRight( origin_elem , elem );
				break;
			case 'topleft':
				alignTopLeft( origin_elem , elem );
				break;
			case 'bottom':
			default :
				alignBottom( origin_elem , elem );
				break;
		}
	}
	
	function alignWithWindow( config , elem ){
		var offset = config.offset ? config.offset : {};
		
		if(isoffset( offset ) ){
			if( isRtl() ){
				offset.left = window.innerWidth - offset.left.match(/(\d+)/)[0] - elem.offsetWidth + 'px';
			}
			setTopLeft( offset , elem );
		}else{
			elem.style.left = ( window.innerWidth/2 - elem.offsetWidth/2 )  + 'px';
			elem.style.top = ( window.innerHeight/2 - elem.offsetHeight/2 )  + 'px';	
		}
	}
	function Changedirection( config ){
		if(config.alignment){
			if( config.alignment.left == 'right' ){
				config.alignment.left = 'left';
			}else if( config.alignment.left == 'left' ){
				config.alignment.left = 'right';
			}
		}else{
			if( config.position == 'left' ){
				config.position = 'right';
			}else if( config.position == 'topleft' ){
				config.position = 'topright';
			}else if( config.position == 'bottomleft' ){
				config.position = 'bottomright';
			}else if( config.position == 'right' ){
				config.position = 'right';
			}else if( config.position == 'topright' ){
				config.position = 'topleft';
			}else if( config.position == 'bottomright' ){
				config.position = 'bottomleft';
			}
		}
	}
	function fixElementLeft( origin_elem , elem ){
		var leftBoundary = origin_elem.offsetLeft - elem.offsetWidth;
		if( !isWindowLeftExceeded( origin_elem.offsetLeft , elem ) ){
			elem.style.left = window.innerWidth - elem.offsetWidth + 'px';
		}else{
			elem.style.left = origin_elem.offsetLeft + 'px';
		}
	}
	function isRtl(){
		var body = $L('body').get(0);
		if(getComputedStyle(body).direction == 'rtl'){
			return true;
		}
		else{
			return false;
		}
	}
	function setTopLeft( offset , elem ){
		var left = offset.left ? offset.left : '0px';
		var top = offset.top ? offset.top : '0px';
		elem.style.left = left;
		elem.style.top = top;
	}
	function isoffset( offset ){
		if(offset.left  || offset.top ){
			return true;
		}
		else{
			return false;
		}
	}
})(window);
