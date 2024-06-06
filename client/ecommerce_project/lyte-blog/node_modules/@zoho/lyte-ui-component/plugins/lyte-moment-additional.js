;( function( window ){
	if( $L.moment ) {
		var proto = $L.moment.lyteMoment.prototype;
		var standardDate = [
			{ val : 'YYYY-MM-DD', regex : /^(\d{4}-\d{2}-\d{2})/ },
			{ val : 'GGGG-['+ proto.week + ']WW-E', regex : new RegExp( '\^(\\d{4}-'+ proto.week + '\\d{2}-\\d)' ) },
			{ val : 'GGGG-['+ proto.week + ']WW', regex : new RegExp( '\^(\\d{4}-'+ proto.week + '\\d{2})' ) },
			{ val : 'YYYY-DDD', regex : /^(\d{4}-\d{3})/ },
			{ val : 'YYYY-MM', regex : /^(\d{4}-\d{2})/ },
			{ val : 'YYYYMMDD', regex : /^(\d{8})/},
			{ val : 'GGGG['+ proto.week + ']WWE', regex : new RegExp( '\^(\\d{4}'+ proto.week + '\\d{2}\\d)' ) },
			{ val : 'GGGG['+ proto.week + ']WW', regex : new RegExp( '\^(\\d{4}'+ proto.week + '\\d{2})' ) },
			{ val : 'YYYYDDD', regex : /^(\d{4}\d{3})/ }
		],
		standardTime = [
			{ val : 'HH:mm:ss.SSSS', regex : /^\d{2}:\d{2}:\d{2}\.[0-9]{1,}$/ },
			{ val : 'HH:mm:ss,SSSS', regex : /^\d{2}:\d{2}:\d{2},[0-9]{1,}$/ },
			{ val : 'HH:mm:ss', regex : /^\d{2}:\d{2}:\d{2}$/ },
			{ val : 'HH:mm', regex : /^\d{2}:\d{2}$/ },
			{ val : 'HHmmss.SSSS', regex : /^\d{6}\.[0-9]{1,}$/ },
			{ val : 'HHmmss,SSSS', regex : /^\d{6},[0-9]{1,}$/ },
			{ val : 'HHmmss', regex : /^\d{6}$/ },
			{ val : 'HHmm', regex : /^\d{4}$/ },
			{ val : 'HH', regex : /^\d{2}$/ }
		];
		function constructFormatCopy( arg, isTime ) {
			var cpForm = this.formats.slice(), obj = {}, dummy = arg, isWEG = new RegExp(  this.week + '|G|E' , 'i' ).test( arg );
			for( var i = 0; i < cpForm.length; i++ ) {
				var cur = cpForm[ i ];
				if( isTime != cur.time ) {
					continue;
				}
				if( cur.regex.test( dummy ) && isWEG == !!cur.isWEG && !this.isDef( obj[ cur.type ] ) ) {
					if( cur.ignore && !cur.ignore.test( dummy ) ) {
						var dd = this.dayArr[ obj.month ] || 30;
						if( parseInt( dummy.match( cur.regex )[ 0 ] ) < dd ){
							continue;
						}
					}
					if( cur.str ) {
						var matches = this.find( cur.array, dummy.replace( /(Y|G)+/, '' ) ).mon;
						if( matches ){
							arg = this.replace( arg, matches, false, cur.val );
							obj[ cur.type ] = cur.array ? this.find( cur.array, matches ).index : matches;
						}
					} else {
						var matches = dummy.match( cur.regex )[ 0 ];
						arg = this.replace( arg, cur.regex, cur.suff, cur.val );
						obj[ cur.type ] = parseInt( matches );
						if( cur.type == 'week' ) {
							arg = replace( arg, new RegExp( this.week + '(?=\\\[' + this.week + ')') );
						}
					}
					dummy = dummy.replace( matches, '' );
				}
			}
			return arg;
		}

		function iterate( array, arg ) {
			for( var i = 0; i < array.length; i++ ) {
				if( array[ i ].regex.test( arg ) ) {
					return array[ i ];
				}
			}
		}

		function get_day( month, year ){
			var dayArr = this.dayArr,
			isLeap = this.isLeap( year );

			return dayArr[ month ] + ( month == 1 && isLeap ? 1 : 0 );
		}

		function constructFormat( arg ) {
			var dateFormat = iterate.call( this, standardDate, arg ), timeFormat;
			if( dateFormat ) {
				timeFormat = iterate.call( this, standardTime, arg.replace( dateFormat.regex, '' ) );
				if( timeFormat ) {
					arg = dateFormat.val + timeFormat.val;
				} else {
					arg = constructFormatCopy.call( this, arg.replace( dateFormat.regex, dateFormat.val ), true );
				}
			} else {
				arg = constructFormatCopy.call( this, arg )
				arg = constructFormatCopy.call( this, arg, true )
			}
			return arg;
		}

		proto.additional = true;

		$L.extend( proto, {

			 inbuiltFormats : {
			 	localDatetime: 'YYYY-MM-DDTHH:mm',            
		        localSecondDatetime: 'YYYY-MM-DDTHH:mm:ss',
		        localMillisecondDatetime: 'YYYY-MM-DDTHH:mm:ss.SSS',   
		        defaultDate: 'YYYY-MM-DD',                             
		        defaultTime: 'HH:mm',                                
		        defaultTimeSecond: 'HH:mm:ss',                 
		        defaultTimeMillisecond: 'HH:mm:ss.SSS',           
		        defaultWeek: 'GGGG-[W]WW',    
		        defaultMonth: 'YYYY-MM'
			 },

			get : function( arg ){
				if( arg ){
					return this[ arg ]();
				}
			},

			set : function( arg, val ) {
				if( arg ) {
					if( val.constructor == Object ) {
						for( var key in val ) {
							this[ key ]( val[ key ] );
						}
						return this
					} else {
						return this[ arg ]( val );
					}
				}
			},

			constructFormat : constructFormat,

			i18N : i18N
		})

		new Array( { prop : 'date', array : [ proto.weekLong, proto.weekShort, proto.weekMid] }, { prop : 'day', array : [ proto.weekLong, proto.weekShort, proto.weekMid] } , { prop : 'month', array : [ proto.shortMon, proto.longMon ] }, { prop : 'year'}, { prop : 'fullYear' }, { prop : 'hours' }, { prop : 'minutes' }, { prop : 'seconds' }, { prop : 'milliseconds' },{ prop : 'UTCMilliseconds' }, { prop : 'time' } ).forEach( function( val ) {
			
			proto[ val.prop ] = function( arg ){
				if( this.validate() ) {
					var dob = this.toDate();
					var prop = val.prop[ 0 ].toUpperCase() + val.prop.slice( 1 );
					if( this.isDef( arg ) ) {
						if( arg.constructor == String ) {
							for( var i = 0; i < val.array.length; i++ ) {
								var ret = this.find( val.array[ i ], arg )
								if( ret.mon ) {
									arg = ret.index;
									break;
								}
							}
						} else if( arg.constructor == Number && Math.floor( arg ) != arg ) {
							if( val.prop == 'year' ) {
								val.prop = 'month';
								arg = Math.round( arg * 12 );
							} else {
								arg = Math.round( arg )
							}
						}
						if( val.prop == 'day' ) {
							dob.setDate( dob.getDate() + ( arg - dob.getDay() ) );
						} else{
							dob[ 'set' + prop ]( arg );
						}
						return this;
					} else {
						return dob[ 'get' + prop ]();
					}
				}
			}
		});

		$L.extend( proto, {
			week : function( arg ) {
				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( arg ) ) {
						dob.setDate( dob.getDate() + ( arg - this.week() ) * 7 );
						return this;
					} else{
						return this.getWeekReverse( dob, 1 ).week;
					}
				}
			},

			quarter : function( arg ) {
				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( arg ) ) {
						var mon = dob.getMonth();
						dob.setMonth( dob.getMonth() + ( arg - this.quarter() ) * 3 );
						return this;
					} else{
						return Math.ceil( dob.getMonth() / 3 );
					}
				}
			},

			add : function( val, prop, cyclic ) {

				if( val < 0 ){
					return this.subtract( Math.abs( val ), prop, cyclic );
				}

				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( prop ) ) {
						if( this._timezone && prop == "month" ){

							var ref = $L.moment( dob );

							for( var i = 0; i < val; i++ ){
								var _month = Number( ref.format( 'M' ) ) - 1,
								date = _month ? get_day.call( this, _month, Number( ref.format( 'YYYY' ) ) ) : 31,
								old_time = ref.getDObj().getTimezoneOffset();

								ref.add( date, 'date' );

								var new_time = ref.getDObj().getTimezoneOffset();

								if( new_time != old_time ){
									this.subtract( new_time - old_time, "minutes" );
								}
							}
							return this;
						} else{
						 	var old_time = dob.getTimezoneOffset(),
						 	newmoment = this.set( prop, this.get( prop ) + val );
						 	if( cyclic ){
								return convertCyclic.call( this, newmoment );
							}
							return newmoment;
						}
					}
				}
			},

			subtract : function( val, prop, cyclic ) {

				if( val < 0 ){
					return this.add( Math.abs( val ), prop, cyclic );
				}

				if( this.validate() ) {
					var dob = this.toDate();
					if( this.isDef( prop ) ) {
						var newmoment;

						if( this._timezone && prop == "month" ){

							var ref = $L.moment( dob );

							for( var i = 0; i < val; i++ ){
								var _month = Number( ref.format( 'M' ) ) - 1,
								date = _month > 1 ? get_day.call( this, _month - 1, Number( ref.format( 'YYYY' ) ) ) : 31,
								old_time = ref.getDObj().getTimezoneOffset();

								ref.subtract( date, 'date' );

								var new_time = ref.getDObj().getTimezoneOffset();

								if( new_time != old_time ){
									this.subtract( new_time - old_time, "minutes" );
								}
							}
							return this;
						}

						var newmoment = this.set( prop, this.get( prop ) - val );
						if( cyclic ){
							return convertCyclic.call( this, newmoment );
						}
						return newmoment;
					}
				}
			},

			startOf : function( prop ){
				if( this.validate() ){
					var dob = this.toDate(),
					flag,
					format = this.format(),
					replace = [],
					year = Number( format.slice( 0, 4 ) ),
					month = Number( format.slice( 5, 7 ) ),
					date = Number( format.slice( 8, 10 ) ),
					hour = Number( format.slice( 11, 13 ) ),
					minute = Number( format.slice( 14, 16 ) ),
					second = Number( format.slice( 17, 19 ) ),
					milliseconds = dob.getMilliseconds(),
					to_deduct = 0,
					old_time = this.timezoneOffset( dob );

					if( prop == "week" ){
						var day = dob.getDay() || 7;
						to_deduct = ( day - 1 ) * 24 * 60 * 60 * 1e3;
						flag = true;
						prop = "hour";
					}

					switch( prop ){
						case "year" : {
							flag = true;
						}
						case "month" : {
							if( flag ){
								to_deduct += this.totdate( month - 1, this.isLeap( year ) ) * 24 * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "date" : 
						case "day" : {
							if( flag ){
								to_deduct += ( date - 1 ) * 24 * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "hour" : {
							if( flag ){
								to_deduct += hour * 60 * 60 * 1e3;
							}
							flag = true;
						}
						case "minute" : {
							if( flag ){
								to_deduct += minute * 60 * 1e3;
							}
							flag = true;
						}
						case "second" : {
							if( flag ){
								to_deduct += second * 1e3;
							}
						}
					}

					if( to_deduct ){
						dob.setTime( dob.getTime() - to_deduct - milliseconds );

						var new_time = this.timezoneOffset( dob ),
						diff = new_time - old_time;

						if( diff ){
							dob.setTime( dob.getTime() + diff * 60 * 1e3 );
						}
					}

					return this;
				}
			},

			endOf : function( prop ){
				if( this.validate() ){
					this.startOf( prop );

					var to_add = 1;

					if( prop == "week" ){
						prop = "day";
						to_add = 7;
					}

					var map = {
						hour : "hours",
						minute : "minutes",
						second : "seconds",
						date : "date",
						day : "day",
						month : "month",
						year : "fullYear"
					};

					this.add( to_add, map[ prop ] || prop );
					this.subtract( 1, "milliseconds" );
					return this;
				}
			},

			fromNow : function( arg, to_accurate ){
				if( this.validate() ){
					var today = this,
					past_date = $L.moment( arg );

					if( !past_date.validate() ){
						return;
					}

					var old_time = today.get( 'time' ),
					new_time = past_date.get(  'time' ),
					diff = parseInt( ( new_time - old_time ) / 1000 ),
					past = diff < 0,
					limits = { years : { val : 320 * 24 * 60 * 60, conv : 365 * 24 * 60 * 60 }, months : { val : 26 * 24 * 60 * 60, conv : 30 * 24 * 60 * 60 }, days : { val : 22 * 60 * 60, conv : 24 * 60 * 60 }, hours : { val : 45 * 60, conv : 60 * 60 }, minutes : { val : 44, conv : 60 }, seconds : { val : 0, conv : 1 } };
					timestamp = new_time - old_time,
					ns1 = to_accurate ? 'conv' : 'val',
					ns2 = to_accurate ? 'floor' : 'round',
					fn = function( _diff, obj ){
						var key,
						value;

						for( key in limits ){
							if( _diff >= limits[ key ][ ns1 ] ) {
								val = Math[ ns2 ]( _diff / limits[ key ].conv );
								value = val;

								var new_diff = _diff - val * limits[ key ].conv;
								if( new_diff > 0 ){
									fn( new_diff, obj );
								}
								break;
							}
						}

						obj[ key ] = { value : value };

						return {
							property : key,
							value : value
						};
					},
					obj = { past : past, timestamp : timestamp };

					diff = Math.abs( diff ); 

					return $L.extend( obj, fn( diff, obj ) );
				}
			}		
		} );

		function convertCyclic( newmoment ){
			var dob = this.toDate();
			
			dob.setFullYear( parseInt( this.getCorrectYear( this.crctLength( Number( this.format( 'YYYY' ) ) % 100, 2 ) ) ) );
			return this;
		}

		function i18N( format, callBack ){
			if( this.validate() ){
				var parsed = this.parseFormat( this.replaceTxt( format ) ).reverse();
				format = format.replace( /{{|}}/g, '' );

				parsed.forEach( function( item ){
					var value = item.format.val,
					formatted = this.format( value ),
					i18ned = window._lyteUiUtils ? _lyteUiUtils.i18n( formatted ) : formatted,
					index = item.index;

					format = format.slice( 0, index ) + ( callBack ? callBack( formatted, i18ned, value ) : i18ned ) + format.slice( index + value.length );
				}.bind( this ) );

				return format;
			}
		}

	}
})(window);