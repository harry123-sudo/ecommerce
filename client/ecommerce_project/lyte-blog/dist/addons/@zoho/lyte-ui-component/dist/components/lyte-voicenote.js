Lyte.Component.register("lyte-voicenote", {
_template:"<template tag-name=\"lyte-voicenote\"> <span class=\"lyteVoiceNotePausePlayIcon {{state}}\" onclick=\"{{action('toggle')}}\"></span> <template is=\"if\" value=\"{{ltPropVolCtrlEnabled}}\"><template case=\"true\"> <div class=\"lyteVoiceNoteVolumeController\"> <span class=\"lyteVoiceNoteVolumeIcon\" onclick=\"{{action('onMute')}}\"></span> <div class=\"lyteVoiceNoteVolumeSlider\"> <lyte-multislider lt-prop-max=\"1\" lt-prop-fill-color=\"#ddd\" lt-prop-height=\"5px\" lt-prop-yield=\"true\" lt-prop-width=\"60px\" lt-prop-handler=\"lyteCircle\" lt-prop-value=\"[ { &quot;value&quot; : {{ltPropVolume}}, &quot;min&quot; : 0, &quot;max&quot; : 1 } ]\" on-change=\"{{method('setVolume')}}\" lt-prop-color=\"[&quot;#61A6E8&quot; ]\"></lyte-multislider> </div> </div> </template></template> <audio onpause=\"{{action('pause')}}\" onplay=\"{{action('play')}}\" onvolumechange=\"{{action('changeVolume',event)}}\" onloadedmetadata=\"{{action('meta',event)}}\" ontimeupdate=\"{{action('update',event)}}\"> <source src=\"{{ltPropSrc}}\" type=\"audio/mpeg\"> </audio> <div class=\"lyteVoiceNoteProgress\" tabindex=\"0\" onkeydown=\"{{action('keydown',event)}}\" onclick=\"{{action('progressClick',event)}}\"> <span class=\"lyteVoiceNoteCompletion\"></span> <span class=\"lyteVoiceNoteHandler\" lt-prop-tooltip-class=\"lyteVoiceNoteTooltip\" onmousedown=\"{{action('mousedown',event)}}\" lt-prop-title=\"{{elapsedTime}}\" lt-prop-tooltip-config=\"{&quot;showdelay&quot;:500,&quot;hidedelay&quot; : 500, &quot;position&quot; : &quot;bottom&quot;}\"></span> </div> <time class=\"lyteVoiceNoteElapsedTime\" datetime=\"{{elapsedFormat}}\">{{elapsedTime}}</time> <time class=\"lyteVoiceNoteDurationSpan\" datetime=\"{{datetimeFormat}}\">{{duration}}</time> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"attr","position":[5,1]},{"type":"attr","position":[7]},{"type":"attr","position":[7,3]},{"type":"attr","position":[9]},{"type":"text","position":[9,0]},{"type":"attr","position":[11]},{"type":"text","position":[11,0]}],
_observedAttributes :["ltPropSrc","ltPropVolCtrlEnabled","ltPropVolume","state","duration","datetimeFormat","elapsedTime","elapsedFormat"],

	didConnect : function(){
		this._audio = this.$node.querySelector( "audio" );
		this._hander = this.$node.getElementsByClassName( "lyteVoiceNoteHandler" )[ 0 ];
		this._completion = this._hander.previousElementSibling;
		this._defaultVolume = 0.5;
		if(this.getData("ltPropVolCtrlEnabled"))
		{
			this._slider = this.$node.querySelector( ".lyteVoiceNoteVolumeSlider").firstElementChild;
			this._volIcon = this.$node.querySelector('.lyteVoiceNoteVolumeIcon');
		}
	},

	didDestroy : function(){
		delete this._audio;
		delete this._hander;
		delete this._completion;
		delete this._defaultVolume;
		delete this._slider;
		delete this._volIcon;
	},

	left : function(){
		return _lyteUiUtils.getRTL() ? "right" : "left";
	},

	data : function(){
		return {
			ltPropSrc : Lyte.attr( "string" ),
			ltPropVolCtrlEnabled : Lyte.attr( "boolean", { default : false}),
			ltPropVolume : Lyte.attr( "number", { default : 1}),
			// system data

			state : Lyte.attr( "string", { default : "paused" } ),
			duration : Lyte.attr( "string", { default : "0.00" } ),
			datetimeFormat : Lyte.attr( "string", { default : "" } ),
			elapsedTime : Lyte.attr( "string", { default : "" } ),
			elapsedFormat : Lyte.attr( "string", { default : "" } )
		}		
	},
	// init: function(){
	// 	this.setData("ltPropVolume","1");
	// },
	read_duration : function( sec_check ){
		var abs = Math.round( sec_check ),
		secs = abs % 60,
		mins_check = parseInt( abs / 60 ),
		mins = mins_check % 60,
		hrs = parseInt( mins_check / 60 );

		return{
			sec : secs,
			min : mins,
			hr : hrs
		};
	},

	display_format : function( arg, obj ){
		var str = '';

		[ 'hr', 'min', 'sec' ].forEach( function( item ){
			var _value = arg[ item ];
			if( _value ){
				str += ( _value + ( obj[ item ] || '.' ) );
			}
		});

		str = str.replace( /\.$/, '' );

		if( !obj.hr ){
			if( str.indexOf( '.' ) == -1 ){
				str = "0." + str;
			}
		}

		return str;
	},

	update_time : function( evt ){
		var elem = evt.target,
		bcr = this._bcr || elem.getBoundingClientRect(),
		left = this.left(),
		width = bcr.width,
		diff = Math.min( Math.abs( evt.clientX - bcr[ left ] ), width ),
		audio = this._audio,
		duration = audio.duration;

		audio.currentTime = Math.max( 0, Math.min( duration - 1, ( duration * ( diff / width ) ).toFixed( 2 ) ) ); 
	},

	mousemove : function( ev ){
		var touches = ev.touches || [],
		length = touches.length,
		evt = touches[ 0 ] || ev;

		if( length > 1 ){
			return;
		}

		if( length ){
			ev.preventDefault();
		}

		var bcr = this._bcr,
		clientX = Math.min( Math.max( bcr.left, evt.clientX ), bcr.right ),
		node = this._hander,
		tooltip = node.tooltip;

		if( tooltip && tooltip.refresh ){
            tooltip.refresh( { clientX : evt.clientX }, tooltip.tooltipSpan );
        }

		this.update_time( { clientX : clientX } );

	},

	mouseup : function( evt ){

		var isTch = ( evt.touches || [] ).length;

		this.bind_evt( 'removeEventListener', isTch );
		if( this._downstate ){
			this.play();
		}

		delete this._move;
		delete this._up;
		delete this._bcr;
		delete this._downstate;
	},

	bind_evt : function( fn, isTch ){
		var doc = document;

		doc[ fn ]( isTch ? 'touchmove' : 'mousemove', this._move, true );
		doc[ fn ]( isTch ? 'touchend' : 'mouseup', this._up, true );
	},

	set_format : function( time, name1, name2 ){
		var format = this.read_duration( time );

		this.setData( name1, this.display_format( format, {} ) );
		this.setData( name2, "PT" + this.display_format( format, { hr : "H", min : "M", sec : "S" } ) );
	},

	play : function(){
		var audio = this._audio,
		_this = this,
		fn = function(){
			delete _this._happening;
			var final = _this._final,
			cb = 'onPlay';
			_this.getMethods( cb ) && _this.executeMethod( cb, _this.$node );

			if( final ){
				delete _this._final;
				_this[ final ]();
			}
		};

		if( this._happening ){
			this._final = 'play';
		} else if( audio.paused ){
			this._happening = true;
			audio.play().then( fn ).catch( fn );
		}
	},

	pause : function(){
		if( this._happening ){
			this._final = 'pause';
		} else {
			this._audio.pause();
			var cb = 'onPause';
			this.getMethods( cb ) && this.executeMethod( cb, this.$node );
		}
	},


	actions : {

		keydown : function( evt ){
			var keycode = evt.which || evt.keyCode,
			audio = this._audio,
			duration = audio.duration,
			currentTime = audio.currentTime;

			if( !/^3(7|9)$/.test( keycode ) ){
				return;
			}

			evt.preventDefault();

			this._state = !audio.paused;

			this.pause();

			audio.currentTime = Math.max( 0, Math.min( duration - 1, currentTime + ( 5 * ( keycode == 37 ? -1 : 1 ) ) ) );
		},

		pause : function(){
			this.setData( "state", "paused" );
			return false;
		},

		play : function(){
			this.setData( "state", "" );
			return false;
		},

		mousedown : function( ev ){

			var touches = ev.touches || [],
			length = touches.length,
			isTch = length != 0,
			evt = touches[ 0 ] || ev,
			audio = this._audio;

			if( length > 1 ){
				return;
			}

			if( this._downstate = !audio.paused ){
				this.pause();
			}

			this._move = this.mousemove.bind( this );
			this._up = this.mouseup.bind( this );
			this._bcr = evt.target.parentNode.getBoundingClientRect();

			this.bind_evt( "addEventListener", isTch );
			ev.preventDefault();

		},

		progressClick : function( evt ){
			var elem = evt.target;
			if( elem == this._hander ){
				return;
			}
			var audio = this._audio;

			this._state = !audio.paused;

			this.pause();

			this.update_time( evt );
		},

		meta : function( evt ){
			var audio = this._audio;
			if( !audio ){
				return false;
			}
			var duration = audio.duration;
			this.set_format( duration, 'duration', 'datetimeFormat' );

			return false;
		},

		toggle : function(){
			var audio = this._audio,
			fn = "pause";

			if( audio.paused ){
				fn = "play";
			}

			this[ fn ]();
			return false;
		},

		update : function( evt ){
			var audio = this._audio,
			time = audio.currentTime,
			duration = audio.duration,
			handle = this._hander,
			tooltip = handle.tooltip;

			if( isNaN( duration ) ){
				return;
			}

			if( tooltip && tooltip.refresh ){
				tooltip.refresh( {}, tooltip.tooltipSpan );
			}

			handle.style[ this.left() ] = this._completion.style.width = ( time / duration * 100 ) + '%';

			$L( this.$node )[ ( audio.ended ? 'add' : "remove" ) + "Class" ]( "lyteVoiceNoteCompleted" );

			if( this._state ){
				this.play();
			}
			delete this._state;

			this.set_format( time, 'elapsedTime', 'elapsedFormat' );

			this.getMethods('onProgress') && this.executeMethod( 'onProgress', audio, time, duration, evt,this.$node);
		},

		onMute : function(){
			var audio = this._audio;

			audio.muted = !audio.muted
		},

		changeVolume : function( evt )
		{
			var audio = this._audio;

			if(audio.volume > 0 && this._volIcon.classList.contains('lyteVoiceNoteMuteIcon') )
			{
				this._volIcon.classList.remove('lyteVoiceNoteMuteIcon');
				audio.muted = false;
				this.setData("ltPropVolume",audio.volume);
			}
			else if(!audio.muted && audio.volume == 0)
			{
				audio.volume = this._defaultVolume;
				this.setData("ltPropVolume",this._defaultVolume);
			}
			else if(audio.muted)
			{
				this._volIcon.classList.add('lyteVoiceNoteMuteIcon');
				this.setData("ltPropVolume",0);
			}

			this.getMethods('onVolumeChange') && this.executeMethod( 'onVolumeChange', audio, evt ,this.$node);
		}

	},
	methods : {
		setVolume : function (  handlerIndex , currentValue, event, MultiSliderElement  ) 
		{
			var audio = this._audio;
			
			if(currentValue.value == 0)
			{
				audio.muted = true;	
			}
			audio.volume = currentValue.value;
		}
	}
});