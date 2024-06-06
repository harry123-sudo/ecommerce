/**
 * Renders a counter
 * @component lyte-counter
 * @version  2.0.0
 * @methods onComplete,easingFunction
 */
Lyte.Component.register("lyte-counter", {
_template:"<template tag-name=\"lyte-counter\"> <div class=\"counterDiv {{ltPropClass}}\"> <span class=\"counterNegative\">{{negative}}</span> <span class=\"counterPrefix\">{{ltPropPrefix}}</span> <span class=\"counterValue\">{{result}}</span> <span class=\"counterSuffix\">{{ltPropSuffix}}</span> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,7,0]}],
_observedAttributes :["ltPropStart","ltPropEnd","ltPropPrefix","ltPropSuffix","ltPropDecimals","ltPropDuration","ltPropUseEasing","ltPropUseGrouping","ltPropSeparator","ltPropDecimalSeparator","ltPropState","ltPropClass","negative","startValue","endValue","result"],
	data : function(){
		return {
			/** 
			 * @componentProperty {number} ltPropStart=0
			 * @version 2.0.0
			 */
			'ltPropStart' : Lyte.attr( 'number', {
				'default' : 0
			} ),
/** 
			 * @componentProperty {number} ltPropEnd=0
			 * @version 2.0.0
			 */
			'ltPropEnd' : Lyte.attr( 'number', {
				'default' : 0
			} ),
			/** 
			 * @componentProperty {string} ltPropPrefix=""
			 * @version 2.0.0
			 */
			'ltPropPrefix' : Lyte.attr( 'string', {
				'default' :  _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'prefix', "" )
			} ),
			/** 
			 * @componentProperty {string} ltPropSuffix=""
			 * @version 2.0.0
			 */
			'ltPropSuffix' : Lyte.attr( 'string', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'suffix', "" )
			} ),
			/** 
			 * @componentProperty {number} ltPropDecimals=0
			 * @version 2.0.0
			 */
			'ltPropDecimals' : Lyte.attr( 'number', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'decimals', 0 )
			} ),
			/** 
			 * @componentProperty {number} ltPropDuration=2
			 * @version 2.0.0
			 */
			'ltPropDuration' : Lyte.attr( 'number', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'duration', 2 )
			} ),
			/** 
			 * @componentProperty {boolean} ltPropUseEasing=true
			 * @version 2.0.0
			 */
			'ltPropUseEasing' : Lyte.attr( 'boolean', { 
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'useEasing', true )
			} ),
			/** 
			 * @componentProperty {boolean} ltPropUseGrouping=true
			 * @version 2.0.0
			 */
			'ltPropUseGrouping' : Lyte.attr( 'boolean', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'useGrouping', true )
			} ),
			/** 
			 * @componentProperty {string} ltPropSeparator=','
			 * @version 2.0.0
			 */
			'ltPropSeparator' : Lyte.attr( 'string', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'separator', ',')
			} ),
			/** 
			 * @componentProperty {string} ltPropDecimalSeparator='.'
			 * @version 3.0.0
			 */
			'ltPropDecimalSeparator' : Lyte.attr( 'string', {
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'decimalSeparator', "." )
			} ),
			/** 
			 * @componentProperty {string} ltPropState=''
			 * @version 2.0.0
			 */
			'ltPropState' : Lyte.attr( 'string', {
			 'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'state', '' )
			} ),
			/** 
			 * @componentProperty {string} ltPropClass=""
			 * @version 2.0.0
			 */
			'ltPropClass' : Lyte.attr( 'string', { 
				'default' : _lyteUiUtils.resolveDefaultValue( 'lyte-counter', 'class', '' )
			} ),
			/**
            * @experimental negative
            */
			'negative' : Lyte.attr( 'string', {
				'default' : ''
			} ),
			/**
            * @experimental startValue
            */
			'startValue' : Lyte.attr( 'number', {
				'default' : 0
			} ),
			/**
            * @experimental endValue
            */
			'endValue' : Lyte.attr( 'number' ),
			/**
            * @experimental result
            */
			'result' : Lyte.attr( 'string' )
		}		
	},
	
	didConnect : function() {
		if( this._rAFId ){
			window.cancelAnimationFrame( this._rAFId )
		}
		this._initialized = false;
		if( this.getData( 'seperator' ) === '' ) {
			this.getData( 'ltPropUseGrouping', false )
		}
		if( this.getData( 'ltPropEnd' ) == null ) {
			throw new TypeError( '"endValue" is null or not defined' )
		}
		if( !this.checkForNumber( Number( this.getData( 'ltPropStart' ) ) ) ) {
			throw new TypeError( '"Start Value" is not a number' )
		}
		if( !this.checkForNumber( Number( this.getData( 'ltPropEnd' ) ) ) ) {
			throw new TypeError( '"End Value" is not a number' )
		}
		this._startVal = Number( this.getData( 'ltPropStart' ) )
		this._endVal = Number( this.getData( 'ltPropEnd' ) )
		delete this._startTime
		delete this._paused
		this.initialize()
		if( this.getData( 'ltPropState' ).toUpperCase() == 'START' ) {
			this.start();
		}
	},
	stateObs : function() {
		if( this.getData( 'ltPropState' ).toUpperCase() == 'START' ) {
			this.start();
		}
		else if( this.getData( 'ltPropState' ).toUpperCase() == 'RESET' ) {
			this.reset();
		}
		else if( this.getData( 'ltPropState' ).toUpperCase() == 'PAUSE' ) {
			if( this._initialized ){
				this._paused = true;
				cancelAnimationFrame( this._rAFId );
			}
		}
		else if( this.getData( 'ltPropState' ).toUpperCase() == 'RESUME' && this._paused ) {
			this.resume();
		}
	}.observes( 'ltPropState' ),
	updateObs : function() {
		this._endVal = Number( this.getData( 'ltPropEnd' ) );
		if( this.getData( 'ltPropState' ) == 'Running' ) {
			this.update( this.getData( 'ltPropEnd' ) );
		}
	}.observes( 'ltPropEnd' ),
	startObs : function() {
		if( this._rAFId ) {
			window.cancelAnimationFrame( this._rAFId )
		}
		this._initialized = false;
		this._startVal = Number( this.getData( 'ltPropStart' ) )
		this._endVal = Number( this.getData( 'ltPropEnd' ) )
		delete this._startTime
		delete this._paused
		this.initialize()
	}.observes( 'ltPropStart' ),
	start : function() {
		if( this._rAFId ) {
			window.cancelAnimationFrame( this._rAFId )
		}
		this._initialized = false;
		delete this._startTime;
		delete this._paused;
		this.initialize()
		this.setData( 'ltPropState', 'Running' )
		this._startVal = this.getData( 'ltPropStart' )
		this._rAFId = requestAnimationFrame( this.count.bind( this ) );
	},
	reset : function() {
		this._paused = false;
		delete this._startTime;
		this._initialized = false;
		this.setData( 'ltPropState', '' );
		if( this.initialize() ) {
			window.cancelAnimationFrame( this._rAFId );
			this.printValue( this.getData( 'ltPropStart' ) );
		}
	},
	update : function(endVal){
		if ( !this._initialized ) {
			 return;
		}
		if ( !this.checkForNumber( endVal ) ) {
			return;
		}
		if ( endVal === this._frameVal ) {
			 return;
		}
		window.cancelAnimationFrame( this._rAFId );
		this._paused = false;
		delete this._startTime;
		this._startVal = this._frameVal;
		this.setData( 'ltPropEnd', endVal );
		this._endVal = endVal;
		this._endValue = this._endVal;
		this._countDown = ( this._startVal > this._endVal );
		this._rAFId = window.requestAnimationFrame( this.count.bind( this ) );
	},
	resume : function() {
		if( this._initialized ) {
			this._paused = false;
			delete this._startTime;
			if( this._remaining ) {
				this._duration = this._remaining;
			}
			if( this._frameVal ) {
				this._startVal = this._frameVal;
			}
			this.setData( 'ltPropState', 'running' );
			requestAnimationFrame( this.count.bind( this ) );
		}
	},
	count : function() {
		var timestamp=new Date().getTime();
		if (!this._startTime) {
		 this._startTime = timestamp;
		}
		this._timestamp = timestamp;
		var progress = timestamp - this._startTime;
		this._remaining = this._duration - progress;
		if ( this.getData( 'ltPropUseEasing' ) ) {
			if ( this._countDown ) {
				this._frameVal = this._startVal - this.executeMethod( 'easingFunction', progress, 0, this._startVal - this._endVal, this._duration );
			} else {
				this._frameVal = this.executeMethod( 'easingFunction', progress, this._startVal, this._endVal - this._startVal, this._duration );
			}
		} else {
			if ( this._countDown ) {
				this._frameVal = this._startVal - ( ( this._startVal - this._endVal ) * ( progress / this._duration ) );
			} else {
				this._frameVal = this._startVal + ( this._endVal - this._startVal ) * ( progress / this._duration );
			}
		}
		if ( this._countDown ) {
			this._frameVal = ( this._frameVal < this._endVal ) ? this._endVal : this._frameVal;
		} else {
			this._frameVal = ( this._frameVal > this._endVal ) ? this._endVal : this._frameVal;
		}
		this._frameVal = Math.round( this._frameVal * this._dec )/this._dec;
		this.printValue( this._frameVal );
		if (progress <= this._duration ) {
			var func1 = this.count.bind( this );
			this._rAFId = window.requestAnimationFrame( func1 );

		}
		else {
			var self = this;
			setTimeout( function() {
				if( self.getMethods( 'onComplete' ) ) {
					self.executeMethod( 'onComplete' )
				}
			},100);
			this.setData( 'ltPropState', '' ); 
			this._initialized = false;
		}
	},
	initialize : function() {
		if ( this._initialized ) {
			 	return true;
		}
		if ( this.checkForNumber( this._startVal ) && this.checkForNumber( this._endVal ) ) {
				this._decimals = Math.max( 0, this.getData( 'ltPropDecimals' ) || 0 )
				this._dec = Math.pow(10, this._decimals)
				this._duration = Number( this.getData( 'ltPropDuration' ) ) * 1000 || 2000
				this._countDown = ( this._startVal > this._endVal )
				this._frameVal = this._startVal
				this._initialized = true
				this.printValue( this._startVal )
				return true
		}
			return false;
	},
	checkForNumber : function( n ) {
		var num = Number( n )
		return ( typeof num === 'number' && !isNaN( num ) );
	},
	printValue : function( value ){
		var result = this.formatNumber( value );
		this.setData( 'result', result );
	
	},
	formatNumber : function( num ) {
		var neg = ( num < 0 ),x, x1, x2, x3, i, len;
		num = Math.abs( num ).toFixed( this.getData( 'ltPropDecimals' ) );
		num += '';
		x = num.split( '.' );
		x1 = x[ 0 ];
		x2 = x.length > 1 ? this.getData( 'ltPropDecimalSeparator' ) + x[ 1 ] : '';
		if ( this.getData( 'ltPropUseGrouping' ) ) {
			x3 = '';
			for ( i = 0, len = x1.length; i < len; ++i ) {
				if (i !== 0 && ((i % 3) === 0)) {
					x3 = this.getData( 'ltPropSeparator' ) + x3;
				}
				x3 = x1[ len - i - 1 ] + x3;
			}
			x1 = x3;
		}
		this.setData( 'negative', ( neg ? '-' : '' ) );
		return x1 + x2 ;
	},
	methods : {
		easingFunction : function( t, b, c, d ) {
			return c * ( -Math.pow( 2, -10 * t / d ) + 1 ) * 1024 / 1023 + b;
		}
	}
});

/**
 * @syntax nonYielded 
 * <lyte-counter></lyte-counter> 
 */