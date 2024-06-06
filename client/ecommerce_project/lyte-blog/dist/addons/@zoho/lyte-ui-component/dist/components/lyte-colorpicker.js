/*------------------------   NOTES   ------------------------*/
/*
  Things needed to document:
  1. No fill color will return transparent as color value on select. - done
*/

if(!ColorPicker_Util){
	var ColorPicker_Util = {
		component : null,
		baseConverter : function(numberToConvert, oldBase, newBase) {
	        if (newBase == 10) {
	            return parseInt(numberToConvert, 16);
	        }
	        if (newBase == 16) {
	            return parseInt(numberToConvert).toString(16);
	        }
	        numberToConvert = numberToConvert + "";
	        numberToConvert = numberToConvert.toUpperCase();
	        var listOfCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	        var dec = 0;
	        for (var i = 0; i <= numberToConvert.length; i++) {
	            dec += (listOfCharacters.indexOf(numberToConvert.charAt(i))) * (Math.pow(oldBase, (numberToConvert.length - i - 1)));
	        }
	        numberToConvert = "";
	        var magnitude = Math.floor((Math.log(dec)) / (Math.log(newBase)));
	        for (var i = magnitude; i >= 0; i--) {
	            var amount = Math.floor(dec / Math.pow(newBase, i));
	            numberToConvert = numberToConvert + listOfCharacters.charAt(amount);
	            dec -= amount * (Math.pow(newBase, i));
	        }
	        if (numberToConvert.length == 0){
	            numberToConvert = 0;
	        }
	        if (!numberToConvert){
	            numberToConvert = 0;
	        }
	        return numberToConvert;
	    },
	    convert3DigitTo6DigitRgbCode : function(rgbColor){
	    	return (rgbColor[0]+rgbColor[0]+rgbColor[1]+rgbColor[1]+rgbColor[2]+rgbColor[2]);
	    },
	    getHsvByRgbCode : function(rgbColor) {
	        var rgbColor = rgbColor.replace('#', ''),
	        red = ColorPicker_Util.baseConverter(rgbColor.substr(0, 2), 16, 10),
	        green = ColorPicker_Util.baseConverter(rgbColor.substr(2, 2), 16, 10),
	        blue = ColorPicker_Util.baseConverter(rgbColor.substr(4, 2), 16, 10),
	        maxValue, minValue, hue, saturation, valueBrightness;
	        if (red == 0 && green == 0 && blue == 0) {
	            var returnArray = {};
	            returnArray.hue = 0;
	            returnArray.saturation = 0;
	            returnArray.brightness = 0;
	            return returnArray;
	        }
	        red = red / 255;
	        green = green / 255;
	        blue = blue / 255;
	        maxValue = Math.max(red, green, blue);
	        minValue = Math.min(red, green, blue);
	       	hue = 0;
	        if (maxValue == minValue) {
	            hue = 0;
	            saturation = 0;
	        } else {
	            if (red == maxValue) {
	                hue = (green - blue) / (maxValue - minValue) / 1;
	            } else if (green == maxValue) {
	                hue = 2 + (blue - red) / 1 / (maxValue - minValue) / 1;
	            } else if (blue == maxValue) {
	                hue = 4 + (red - green) / (maxValue - minValue) / 1;
	            }
	            saturation = (maxValue - minValue) / maxValue;
	        }
	        hue = hue * 60;
	        valueBrightness = maxValue;
	        if (hue < 0){
	            hue += 360;
	        }
	        var returnArray = {};
	        returnArray.hue = hue;
	        returnArray.saturation = saturation;
	        returnArray.brightness = valueBrightness;
	        return returnArray;
	    },
	    getRgbCodeByRgbColors : function(red, green, blue) {
	        var red = ColorPicker_Util.baseConverter(red, 10, 16),
	        green = ColorPicker_Util.baseConverter(green, 10, 16),
	        blue = ColorPicker_Util.baseConverter(blue, 10, 16),
	        rgbColor;
	        red = red + "";
	        green = green + "";
	        blue = blue + "";
	        while (red.length < 2) {
	            red = "0" + red;
	        }
	        while (green.length < 2) {
	            green = "0" + green;
	        }
	        while (blue.length < 2) {
	            blue = "0" + "" + blue;
	        }
	        rgbColor = red + "" + green + "" + blue;
	        return rgbColor.toUpperCase();
	    },
	    getRgbColorsByRgbCode : function(rgbCode) {
	        var retArray = {};
	        retArray.red = ColorPicker_Util.baseConverter(rgbCode.substr(0, 2), 16, 10);
	        retArray.green = ColorPicker_Util.baseConverter(rgbCode.substr(2, 2), 16, 10);
	        retArray.blue = ColorPicker_Util.baseConverter(rgbCode.substr(4, 2), 16, 10);
	        return retArray;
	    },
	    getRgbColorsByHsv : function(hue, saturation, valueBrightness) {
	    	if (hue == 360){
	            hue = 0;
	        }
	        var Hi = Math.floor(hue / 60),
	        red,green,blue,f,p,q,t;
	        // if (hue == 360){
	        //     hue = 0;
	        // }
	        f = hue / 60 - Hi;
	        if (saturation > 1){
	            saturation /= 100;
	        }
	        if (valueBrightness > 1){
	            valueBrightness /= 100;
	        }
	        p = (valueBrightness * (1 - saturation));
	        q = (valueBrightness * (1 - (f * saturation)));
	        t = (valueBrightness * (1 - ((1 - f) * saturation)));
	        switch (Hi) {
	        case 0:
	            red = valueBrightness;
	            green = t;
	            blue = p;
	            break;
	        case 1:
	            red = q;
	            green = valueBrightness;
	            blue = p;
	            break;
	        case 2:
	            red = p;
	            green = valueBrightness;
	            blue = t;
	            break;
	        case 3:
	            red = p;
	            green = q;
	            blue = valueBrightness;
	            break;
	        case 4:
	            red = t;
	            green = p;
	            blue = valueBrightness;
	            break;
	        default:
	            red = valueBrightness;
	            green = p;
	            blue = q;
	            break;
	        }
	        if (saturation == 0) {
	            red = valueBrightness;
	            green = valueBrightness;
	            blue = valueBrightness;
	        }
	        red *= 255;
	        green *= 255;
	        blue *= 255;
	        red = Math.round(red);
	        green = Math.round(green);
	        blue = Math.round(blue);
	        return {
	            red: red,
	            green: green,
	            blue: blue
	        }
	    },
	    getRgbCodeByHsv : function(hue, saturation, valueBrightness) {
	        while (hue >= 360){
	            hue -= 360;
	        }
	        var colors = ColorPicker_Util.getRgbColorsByHsv(hue, saturation, valueBrightness);
	        return ColorPicker_Util.getRgbCodeByRgbColors(colors.red, colors.green, colors.blue);
	    },
	    getCmykByRgbColors: function(rgb){
				var c = 1 - rgb[0] / 255;
			    var m = 1 - rgb[1] / 255;
			    var y = 1 - rgb[2] / 255,k;

			    var min_cmy = Math.min(c, m, y);
			    c = (c - min_cmy) / (1 - min_cmy);
			    m = (m - min_cmy) / (1 - min_cmy);
			    y = (y - min_cmy) / (1 - min_cmy);
			    k = min_cmy;

			    c = isNaN( c )? 0 :c;
			    m = isNaN( m )? 0 :m;
			    y = isNaN( y )? 0 :y;

				return [c, m, y, k];
			},
			getRgbColorsByCmyk: function(c, m, y, k){
				if (c > 1){
		            c /= 100;
		        }
		        if (m > 1){
		            m /= 100;
		        }
		        if (y > 1){
		            y /= 100;
		        }
		        if (k > 1){
		            k /= 100;
		        }
				var red = 255 * (1-c) * (1-k),   //The red (R) color is calculated from the cyan (C) and black (K) colors
				green = 255 * (1-m) * (1-k),   //The green color (G) is calculated from the magenta (M) and black (K) colors:
				blue = 255 * (1-y) * (1-k);	  //The blue color (B) is calculated from the yellow (Y) and black (K) colors:

				red = Math.round(red);
		        green = Math.round(green);
		        blue = Math.round(blue);
		        return {
		            red: red,
		            green: green,
		            blue: blue
		        }
			},
			getRgbCodeByCmyk: function(c, m, y, k){
				var colors = ColorPicker_Util.getRgbColorsByCmyk(c, m, y, k);
				return ColorPicker_Util.getRgbCodeByRgbColors(colors.red, colors.green, colors.blue);
			},
			getDecimalToHexAlphaCode: function(alpha){
				if(alpha > 100){
					alpha = 100;
				}
				if(alpha < 0){
					alpha = 0;
				}
				alpha = Math.round(alpha * 255 /100);
				return ColorPicker_Util.baseConverter(alpha, 10, 16);
				// return (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
				// for (var i = 0.1; i >= 0; i -= 0.01) {
				//     i = Math.round(i * 100) / 100;
				//     var alpha = Math.round(i * 255);
				//     var hex = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
				//     var perc = Math.round(i * 100);
				//     console.log(perc + "% — " + hex + " (" + alpha + ")");
				// }
			},
			getHexToDecimalAlphaCode: function(alpha){
				var alpha = ColorPicker_Util.baseConverter(alpha, 16, 10);
				if(alpha > 255){
					alpha = 255;
				}
				if(alpha < 0){
					alpha = 0;
				}
				return Math.round(alpha * 100 / 255);
			},
	    getLeftPos : function(el) {
	        if (document.getBoxObjectFor) {
	            if (el.tagName != 'INPUT' && el.tagName != 'SELECT' && el.tagName != 'TEXTAREA'){
	                return document.getBoxObjectFor(el).x
	            }
	        }
	        var ret = el.offsetLeft;
	        while ((el = el.offsetParent) != null) {
	            if (el.tagName != 'HTML') {
	                ret += el.offsetLeft;
	                if (document.all){
	                    ret += el.clientLeft;
	                }
	            }
	        }
	        return ret;
	    },
	    getTopPos : function(el) {
	        if (document.getBoxObjectFor) {
	            if (el.tagName != 'INPUT' && el.tagName != 'SELECT' && el.tagName != 'TEXTAREA'){
	                return document.getBoxObjectFor(el).y
	            }
	        }
	        var ret = el.offsetTop;
	        while ((el = el.offsetParent) != null) {
	            if (el.tagName != 'HTML') {
	                ret += (el.offsetTop - el.scrollTop);
	                if (document.all){
	                    ret += el.clientTop;
	                }
	            }
	        }
	        return ret;
	    },
		getColorPicker : function(arg){
			var ele = arg.closest('colorpicker-ui')/*arg.closest('lyte-colorpicker')*/;
			// console.log(arg);
			// console.log(ele);
			// if(!ele){
			// 	var components = LytePopup.components;
			// 	for(var i =components.length - 1; i>=0; i--){
			// 		if(components[i].$node.parentElement.tagName == 'LYTE-COLORPICKER' && components[i].childComp.style.visibility == 'visible'){
			// 			ele = components[i].childComp;
			// 			break;
			// 		}
			// 	}
			// 	if(ele){
			// 		var div = ele.querySelector('.popoverWrapper');
			// 		if(div && div.classList.length > 1){
			// 			var className = div.className.split(" ")[1];
			// 			var colorpickers = document.querySelectorAll('lyte-colorpicker');
			// 			for(var i = 0 ; i<colorpickers.length ; i++){
			// 				if(colorpickers[i].component.getData('cpWrapperClass') === className){
			// 					ele = colorpickers[i];
			// 					break;
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			return ele;
		},
		splitIntoSubArray : function(arr, count) {
			var newArray = [];
			while (arr.length > 0) {
		    	newArray.push(arr.splice(0, count)); 
			}
			return newArray;
		}
	}
}

if(!ColorPicker_EventUtil){
	var ColorPicker_EventUtil = {
		__stopPropagation : false,
		__eventBound : false,
		__initOpacityMove: function(e,_this) {
			if(_this){
				if(e.type == "mousedown"){
					document.addEventListener('mousemove',ColorPicker_EventUtil.__mm = function(event){
						ColorPicker_EventUtil.__moveOnOpacityTrack(event,_this);
					});
					document.addEventListener('mouseup',ColorPicker_EventUtil.__mu = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
				if(e.type == "touchstart"){
					document.addEventListener('touchmove',ColorPicker_EventUtil.__tm = function(event){
						ColorPicker_EventUtil.__moveOnOpacityTrack(event,_this);
					});
					document.addEventListener('touchend',ColorPicker_EventUtil.__te = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
				_this.setData('opacityStatus', 1);
				_this.setData('calledForHueMove',true);
		        // _this.setData('poxYHue', ColorPicker_Util.getTopPos(_this.getData('divElHueBar')));
		        var opacitySlider = _this.$node.querySelector('.opacityslider__track');
		        _this.setData('opacityTrackSize', opacitySlider.offsetWidth /*_this.getData('cpInline') ? opacitySlider.offsetWidth : _this.childComp.querySelector('.opacityslider__track').offsetWidth*/);
		        _this.setData('posXOpacity', ColorPicker_Util.getLeftPos(opacitySlider /*_this.getData('cpInline') ? opacitySlider : _this.childComp.querySelector('.opacityslider__track')*/));
		        ColorPicker_EventUtil.__moveOnOpacityTrack(e,_this);
		        return false;
			}
	    },

		__initHueMove: function(e,_this) {
			if(_this){
				if(e.type == "mousedown"){
					document.addEventListener('mousemove',ColorPicker_EventUtil.__mm = function(event){
						ColorPicker_EventUtil.__moveOnHueBar(event,_this);
					});
					document.addEventListener('mouseup',ColorPicker_EventUtil.__mu = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
				if(e.type == "touchstart"){
					document.addEventListener('touchmove',ColorPicker_EventUtil.__tm = function(event){
						ColorPicker_EventUtil.__moveOnHueBar(event,_this);
					});
					document.addEventListener('touchend',ColorPicker_EventUtil.__te = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
				_this.setData('setPrevCmyk',false);
				_this.setData('hueStatus', 1);
				_this.setData('calledForHueMove',true);
		        // _this.setData('poxYHue', ColorPicker_Util.getTopPos(_this.getData('divElHueBar')));
		        var colorSlider = _this.$node.querySelector('.colorSlider_hueBar');
		        _this.setData('hueBarSize', colorSlider.offsetWidth /*_this.getData('cpInline') ? colorSlider.offsetWidth : _this.childComp.querySelector('.colorSlider_hueBar').offsetWidth*/);
		        _this.setData('poxXHue', ColorPicker_Util.getLeftPos(colorSlider /*_this.getData('cpInline') ? colorSlider : _this.childComp.querySelector('.colorSlider_hueBar')*/));
		        ColorPicker_EventUtil.__moveOnHueBar(e,_this);
		        return false;
			}
	    },

		__initPaletteMove : function(e,_this) {
	    	if(_this){
	    		_this.setData('setPrevCmyk',false);
	    		if(e.type == "mousedown"){
					document.addEventListener('mousemove',ColorPicker_EventUtil.__mm = function(event){
						ColorPicker_EventUtil.__moveOnPalette(event,_this);
					});
					document.addEventListener('mouseup',ColorPicker_EventUtil.__mu = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
				if(e.type == "touchstart"){
					document.addEventListener('touchmove',ColorPicker_EventUtil.__tm = function(event){
						ColorPicker_EventUtil.__moveOnPalette(event,_this);
					});
					document.addEventListener('touchend',ColorPicker_EventUtil.__te = function(event){
						ColorPicker_EventUtil.__endDrag(event,_this);
					});
				}
	    		var posdivElPalette = _this.getData('posdivElPalette');
		    	var circleOffsetBecauseOfWinWidget = _this.getData('circleOffsetBecauseOfWinWidget');
		    	var divElPalette =  _this.$node.querySelector('#colorDiv') /*_this.getData('cpInline') ? _this.$node.querySelector('#colorDiv') : _this.childComp.querySelector('#colorDiv')*/;
		    	var divElPaletteOffset = divElPalette.getBoundingClientRect();
		    	var circleOffsetSize = _this.getData('circleOffsetSize');
		        if (document.all){
		            e = event || window.event;
		        }
		        _this.__ffHackWinWidget();
		        posdivElPalette.x = divElPaletteOffset.left /*ColorPicker_Util.getLeftPos(divElPalette)*/ + circleOffsetBecauseOfWinWidget;
		        posdivElPalette.y = divElPaletteOffset.top /*ColorPicker_Util.getTopPos(divElPalette)*/ + circleOffsetBecauseOfWinWidget;
		        _this.setData('paletteSize',{'height' : divElPalette.offsetHeight, 'width' : divElPalette.offsetWidth});
		        _this.setData('posdivElPalette',posdivElPalette);
		        _this.setData('dragStatus', 1);
		        _this.setData('paletteMaxX', (divElPalette.offsetWidth - circleOffsetSize));
		        _this.setData('paletteMaxY', (divElPalette.offsetHeight - circleOffsetSize));
		        ColorPicker_EventUtil.__moveOnPalette(e,_this);
		        posdivElPalette = null;
		        divElPalette = null;
		        return false;
	    	}
	    },

	    __moveOnPalette : function(e,_this) {
	    	if(_this){
	    		if(e.type == "mousedown" || e.type == "mousemove"){
	    			e.preventDefault();
	    		}
		    	var posdivElPalette = _this.getData('posdivElPalette');
		    	var circleOffsetSize = _this.getData('circleOffsetSize');
		    	var divElPaletteCircle = _this.$node.querySelector('.colorSlider_palette_circle') /*_this.getData('cpInline') ? _this.$node.querySelector('.colorSlider_palette_circle') : _this.childComp.querySelector('.colorSlider_palette_circle')*/;
		        if (_this.getData('dragStatus') != 1){
		            return;
		        }
		        if (_this.getData('clickOnPaletteInProgress')){
		            return;
		        }
		        _this.setData('clickOnPaletteInProgress', true);
		        _this.setData('dragged',true);
		        if (document.all){
		            e = event;
		        }
		        var leftEl = posdivElPalette.x;
		        var topEl = posdivElPalette.y;
		        var left,top;
		        if(e.type == "mousedown" || e.type == "mousemove"){
		        	left = e.clientX/* + document.documentElement.scrollLeft*/ - leftEl - circleOffsetSize;
		        	top = e.clientY/* + document.documentElement.scrollTop*/ - topEl - circleOffsetSize;
		        }
		        if(e.type == "touchstart" || e.type == "touchmove"){
		        	left = e.touches[0].clientX/* + document.documentElement.scrollLeft*/ - leftEl - circleOffsetSize;
		        	top = e.touches[0].clientY/* + document.documentElement.scrollTop*/ - topEl - circleOffsetSize;
		        }
		        if (left < circleOffsetSize * -1){
		            left = circleOffsetSize * -1;
		        }
		        if (top < circleOffsetSize * -1){
		            top = circleOffsetSize * -1;
		        }
		        if (left > _this.getData('paletteMaxX')){
		            left = _this.getData('paletteMaxX');
		        }
		        if (top > _this.getData('paletteMaxY')){
		            top = _this.getData('paletteMaxY');
		        }
		        // if(_this.getData('cpInline')){
		        // 	var xscroll = window.pageXOffset;
          //           var yscroll = window.pageYOffset;
          //           left += xscroll;
          //           top += yscroll;
		        // }
		        divElPaletteCircle.style.left = left + 'px';
		        divElPaletteCircle.style.top = top + 'px';
		        _this.setData('currentSaturation', Math.round(((left + circleOffsetSize) / _this.getData('paletteSize').width) * 100));
		        _this.setData('currentBrightness', 100 - Math.round(((top + circleOffsetSize) / _this.getData('paletteSize').height) * 100));
		        _this.__setCurrentRgbCode();
		        // _this.__setBgColorPreviewDiv();
		        _this.__updateRgbInForm();
		        _this.__changeColorInOpacityTrack();
				_this.__setOpacityColorPreviewDiv();
		        _this.executeOnChange();
		        _this.setData('clickOnPaletteInProgress', false);
		        posdivElPalette = null;
		        divElPaletteCircle = null;
		        circleOffsetSize = null;
	    	}
	    },

	    __moveOnHueBar: function(e,_this) {
	    	if(_this){
	    		if(e.type == "mousedown" || e.type == "mousemove"){
	    			e.preventDefault();
	    		}
		        if (_this.getData('hueStatus') != 1){
		            return;
		        }
		        _this.setData('dragged',true);
		        if (document.all){
		            e = event;
		        }
		        var sliderOffset = _this.getData('sliderOffset');
		        var leftPos = _this.getData('poxXHue');
		        var diff;
		        if(e.type == "mousedown" || e.type == "mousemove"){
		        	diff = e.clientX + document.documentElement.scrollLeft - leftPos - sliderOffset;
		        }
		        if(e.type == "touchstart" || e.type == "touchmove"){
		        	diff = e.touches[0].clientX + document.documentElement.scrollLeft - leftPos - sliderOffset;
		        }
		        if (diff > _this.getData('hueBarSize') - sliderOffset){
		            diff = _this.getData('hueBarSize') - sliderOffset;
		        }
		        if (diff < 0 - sliderOffset){
		            diff = 0 - sliderOffset;
		        }
		        var ele = _this.$node /*_this.getData('cpInline') ? _this.$node : _this.childComp*/;
	        	ele.querySelector('.colorSlider_sliderHandle').style.left = diff + 'px';
		        var hue = Math.round((_this.getData('hueBarSize') - (diff + sliderOffset)) * (360 / _this.getData('hueBarSize')));
		        if (hue >= 360){
		            hue = 360;
		        }
		        _this.setData('currentHue', hue);
		        _this.__setCurrentRgbCode();
		        _this.__setPaletteBgColor();
		        // _this.__setBgColorPreviewDiv();
		        _this.__updateRgbInForm();
		        _this.__changeColorInOpacityTrack();
				_this.__setOpacityColorPreviewDiv();
		        _this.executeOnChange();
	    	}
	    },

	    __moveOnOpacityTrack: function(e,_this) {
	    	if(_this){
	    		if(e.type == "mousedown" || e.type == "mousemove"){
	    			e.preventDefault();
	    		}
		        if (_this.getData('opacityStatus') != 1){
		            return;
		        }
		        // _this.setData('dragged',true);
		        if (document.all){
		            e = event;
		        }
		        var leftPos = _this.getData('posXOpacity');
		        var sliderOffset = _this.getData('sliderOffset');
		        var diff;
		        if(e.type == "mousedown" || e.type == "mousemove"){
		        	diff = e.clientX + document.documentElement.scrollLeft - leftPos - sliderOffset;
		        }
		        if(e.type == "touchstart" || e.type == "touchmove"){
		        	diff = e.touches[0].clientX + document.documentElement.scrollLeft - leftPos - sliderOffset;
		        }
		        if (diff > _this.getData('opacityTrackSize') - sliderOffset){
		            diff = _this.getData('opacityTrackSize') - sliderOffset;
		        }
		        if (diff < 0 - sliderOffset){
		            diff = 0 - sliderOffset;
		        }
		        var diffPercent = parseInt(((diff + sliderOffset) / _this.getData('opacityTrackSize')) * 100);
		        var ele = _this.$node/*_this.getData('cpInline') ? _this.$node : _this.childComp*/;
		        ele.querySelector('.opacityslider__circlethumb').style.left = diff + 'px';
		        _this.setData("opacity", diffPercent);
		        _this.__setOpacityColorPreviewDiv();
		        _this.__updateOpacityInForm();
		        _this.executeOnChange();
	    	}
	    },

	    __endDrag : function(e,_this) {
	    	if(_this && _this.$node){
	    		if(_this.getData('dragStatus') == 0 && _this.getData('hueStatus') == 0 && _this.getData('opacityStatus') == 0){
		    		return;
		    	}
	    		if(e.type == "mouseup"){
					document.removeEventListener('mousemove',ColorPicker_EventUtil.__mm);
					document.removeEventListener('mouseup',ColorPicker_EventUtil.__mu);
					ColorPicker_EventUtil.__mm = undefined;
					ColorPicker_EventUtil.__mu = undefined;
				}
				if(e.type == "touchend"){
					document.removeEventListener('touchmove',ColorPicker_EventUtil.__tm);
					document.removeEventListener('touchend',ColorPicker_EventUtil.__te);
					ColorPicker_EventUtil.__tm = undefined;
					ColorPicker_EventUtil.__te = undefined;
				}
		    	ColorPicker_EventUtil.__stopPropagation = true;
		        if (_this.getData('dragStatus') == 1) {
		            // _this.__updateHsvInForm();
		            _this.__updateRgbInForm();
		        }
		        _this.setData('dragStatus', 0);
		        _this.setData('hueStatus', 0);
		        _this.setData('opacityStatus',0);
		        if(_this.getData('dragged')){
		        	_this.setData('dragged', false);
		        }
		        if(_this.getData('counter') != 0){
		        	_this.setData('counter',0);
		        }
		        if(_this.getData('restrictOnChange')){
		        	_this.setData('restrictOnChange',false);
		        }
		        var popup = _this.getData('cpInline') ? _this.$node.closest('.lytePopover') : null;
		        if(popup){
		        	popup._callee.ltProp('stopClick', true);
		        }
		        _this.executeOnSelect(e);

	    	}
	    	ColorPicker_Util.component = null;
	    }
	}
}



Lyte.Component.register("colorpicker-ui", {
_template:"<template tag-name=\"colorpicker-ui\"> <template is=\"if\" value=\"{{cpBasicColorPicker}}\"><template case=\"true\"> <div class=\"lyteColorPicker__default\"> <template is=\"if\" value=\"{{cpNoFillButton}}\"><template case=\"true\"> <div class=\"lyteColorPicker__nocolorbutton\" onclick=\"{{action(&quot;noFillExecute&quot;,event)}}\"> <span class=\"lyteColorPicker__noFill\"> </span> <span class=\"lyteColorPicker__text\">{{cpNoFillLabel}}</span> </div> </template></template> <template is=\"if\" value=\"{{cpUsedColors}}\"><template case=\"true\"> <div class=\"lyteColorPicker__palettecontainer usedColor__container\"> <div class=\"lyteColorPicker__paletteheading\">{{lyteUiI18n(\"Recently.Used.Colors\")}}</div> <div class=\"lyteColorPicker__palette\"> <ul class=\"used__colors\"> <template is=\"for\" items=\"{{usedColors}}\" item=\"color\" index=\"indexVal\"> <li class=\"lyteColorPicker__colorpan {{lyteUiAddPE(color)}}\" lt-prop-title=\"{{lyteUiRgbToHex(color)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;showdelay&quot; : &quot;1000&quot;}\" onclick=\"{{action(&quot;selectColor&quot;,event,color)}}\">{{color}}</li> <template is=\"if\" value=\"{{lyteUiCPInsertBreak(indexVal)}}\"><template case=\"true\"> <br> </template></template> </template> </ul> </div> </div> </template></template> <div class=\"lyteColorPicker__palettecontainer LCP_predefinedPallete\"> <div class=\"lyteColorPicker__paletteheading\">{{cpPaletteLabel}}</div> <div class=\"lyteColorPicker__palette\"> <div> <template is=\"for\" items=\"{{cpAvailableColors}}\" item=\"colorArray\" index=\"indexVal\"> <ul class=\"lyteColorPicker__shades default__colors\"> <template is=\"for\" items=\"{{colorArray}}\" item=\"color\" index=\"indexVal\"> <li class=\"lyteColorPicker__colorpan\" lt-prop-title=\"{{lyteUiRgbToHex(color)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;showdelay&quot; : &quot;1000&quot;}\" onclick=\"{{action(&quot;selectColor&quot;,event,color)}}\">{{color}}</li> </template> </ul> </template> </div> </div> </div> <template is=\"if\" value=\"{{cpStandardColors}}\"><template case=\"true\"> <div class=\"lyteColorPicker__palettecontainer LCP_standardColorCont\"> <div class=\"lyteColorPicker__paletteheading\">{{lyteUiI18n(\"Standard.Colors\")}}</div> <div class=\"lyteColorPicker__palette\"> <ul class=\"standard__colors\"> <template is=\"for\" items=\"{{cpStandardColorArray}}\" item=\"color\" index=\"indexVal\"> <li class=\"lyteColorPicker__colorpan\" lt-prop-title=\"{{lyteUiRgbToHex(color)}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;,&quot;showdelay&quot; : &quot;1000&quot;}\" onclick=\"{{action(&quot;selectColor&quot;,event,color)}}\">{{color}}</li> </template> </ul> </div> </div> </template></template> <template is=\"if\" value=\"{{cpAdvancedColorButton}}\"><template case=\"true\"> <div class=\"lyteColorPicker__navigatable lyteColorPicker__morecolorbutton\" onclick=\"{{action(&quot;goToAdvancedCP&quot;,event)}}\"> <span class=\"lyteColorPicker__icon\"></span> <span class=\"lyteColorPicker__text\">{{lyteUiI18n(\"Advanced.Colors\")}}</span> <span class=\"lyteColorpickerForwardArrow h-alignright LCP_rightArrow\"></span> </div> </template></template> </div> </template><template case=\"false\"> <div class=\"lyteColorPicker--advanced\"> <div class=\"lyteColorPicker__maparea\"> <div class=\"colorDiv\" id=\"colorDiv\"> <div id=\"lyteCPImgDiv\"></div> <div class=\"colorSlider_palette_circle colorSlider_palette_circleBlack\"></div> </div> </div> <div class=\"lyteColorPicker__previewDiv lyteColorPicker__sliderDiv\"> <div> <div class=\"colorSlider_hue\"> <div class=\"colorSlider_sliderHandle\"> </div> <div class=\"colorSlider_hueBar_border\"> <div class=\"colorSlider_hueBar\"></div> </div> </div> <div class=\"lyteColorPicker__opacityslider\"> <div class=\"opacityslider__circlethumb\"></div> <div class=\"lyteColorPicker__transparentbg\"> <div class=\"opacityslider__track\"></div> </div> </div> </div> <div class=\"lyteCP__transparentbg\"> <div class=\"previewDiv\" onmouseover=\"{{action(&quot;onOverColorPreviewDiv&quot;,event)}}\" onclick=\"{{action(&quot;copyValueToClipboard&quot;)}}\" lt-prop-title=\"{{lyteUiI18n('Copy.Color.value.to.Clipboard')}}\" lt-prop-tooltip-config=\"{&quot;position&quot; : &quot;bottom&quot;}\"></div> </div> </div> <div class=\"lyteColorPicker__previewDiv\"> <div class=\"selectFormat\"> <lyte-dropdown class=\"cPDropDown\" lt-prop-yield=\"true\" lt-prop-freeze=\"false\" lt-prop-tabindex=\"1\" on-option-selected=\"{{method(&quot;changeFormatView&quot;)}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-button class=\"colorPickerDD\"> <span class=\"lyteMarginRight lyteDropdownLabel\">{{dropButtonValue}}</span> <lyte-icon class=\"dropdown\"></lyte-icon> </lyte-drop-button> <lyte-drop-box class=\"lyteCPDropbox\"> <lyte-drop-body> <template is=\"for\" items=\"{{cpColorFormats}}\" item=\"item\" index=\"indexVal\"> <lyte-drop-item data-value=\"{{item}}\"> {{item}} </lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </div><div class=\"showValue\"> <lyte-table lt-prop-yield=\"true\" class=\"cpValFormatIp\" lt-prop-prevent-scrollbar=\"true\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-table-structure> <lyte-tbody> <template is=\"if\" value=\"{{ifEquals(dropButtonValue,lyteUiI18n(&quot;HEX&quot;))}}\"><template case=\"true\"> <lyte-tr> <lyte-td> <lyte-input id=\"lyteCPShowValue\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-maxlength=\"7\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;HEX&quot;)}}\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;HEX&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;HEX&quot;)}}\" lt-prop-direction=\"vertical\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__A\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;A&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;A&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;A&quot;)}}\" lt-prop-direction=\"vertical\"> </lyte-input> </lyte-td> </lyte-tr> <lyte-tr class=\"lyteCPHexText\"> <lyte-td>HEX</lyte-td> <lyte-td class=\"lyteColorPicker_alpha\">{{lyteUiSetAlphaLabel(cpOpacityLabel)}}</lyte-td> </lyte-tr> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(dropButtonValue,lyteUiI18n(&quot;RGB&quot;))}}\"><template case=\"true\"> <lyte-tr> <lyte-td> <lyte-input id=\"lyteCP__R\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;R&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;R&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;R&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__G\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;G&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;G&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;G&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__B\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;B&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;B&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;B&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__A\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;A&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;A&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;A&quot;)}}\" lt-prop-direction=\"vertical\"> </lyte-input> </lyte-td> </lyte-tr> <lyte-tr> <lyte-td>R</lyte-td> <lyte-td>G</lyte-td> <lyte-td>B</lyte-td> <lyte-td class=\"lyteColorPicker_alpha\">{{lyteUiSetAlphaLabel(cpOpacityLabel)}}</lyte-td> </lyte-tr> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(dropButtonValue,lyteUiI18n(&quot;HSV&quot;))}}\"><template case=\"true\"> <lyte-tr> <lyte-td> <lyte-input id=\"lyteCP__H\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;H&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;H&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;H&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__S\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;S&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;S&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;S&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__V\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;V&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;V&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;V&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__A\" lt-prop-type=\"text\" lt-prop-appearance=\"box\" lt-prop-maxlength=\"3\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;A&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;A&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;A&quot;)}}\" lt-prop-direction=\"vertical\"> </lyte-input> </lyte-td> </lyte-tr> <lyte-tr> <lyte-td>H</lyte-td> <lyte-td>S</lyte-td> <lyte-td>V</lyte-td> <lyte-td class=\"lyteColorPicker_alpha\">{{lyteUiSetAlphaLabel(cpOpacityLabel)}}</lyte-td> </lyte-tr> </template><template case=\"false\"><template is=\"if\" value=\"{{ifEquals(dropButtonValue,lyteUiI18n(&quot;CMYK&quot;))}}\"><template case=\"true\"> <lyte-tr> <lyte-td> <lyte-input id=\"lyteCP__C\" class=\"lyteCP_CMYK\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;C&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;C&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;C&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__M\" class=\"lyteCP_CMYK\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;M&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;M&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;M&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__Y\" class=\"lyteCP_CMYK\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;Y&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;Y&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;Y&quot;)}}\"> </lyte-input> </lyte-td> <lyte-td> <lyte-input id=\"lyteCP__K\" class=\"lyteCP_CMYK\" lt-prop-type=\"text\" lt-prop-maxlength=\"3\" lt-prop-appearance=\"box\" lt-prop-direction=\"vertical\" onkeydown=\"{{action(&quot;inputKeyDown&quot;,event,this,&quot;K&quot;)}}\" on-value-change=\"{{method(&quot;inputValueChanged&quot;,&quot;K&quot;)}}\" on-blur=\"{{method(&quot;onInputBlur&quot;,&quot;K&quot;)}}\"> </lyte-input> </lyte-td> </lyte-tr> <lyte-tr> <lyte-td>C</lyte-td> <lyte-td>M</lyte-td> <lyte-td>Y</lyte-td> <lyte-td>K</lyte-td> </lyte-tr> </template></template></template></template></template></template></template></template> </lyte-tbody> </lyte-table-structure> </template> </lyte-table> <input id=\"lyteCPHiddenInput\" tabindex=\"-1\" aria-hidden=\"true\"> </div> </div> <template is=\"if\" value=\"{{cpInline}}\"><template case=\"true\"> <template is=\"if\" value=\"{{cpMoreColorOptionSelected}}\"><template case=\"true\"> <div class=\"lyteColorPicker__commandbar\"> <lyte-button class=\"LCP_backbtn\" lt-prop-size=\"small\" lt-prop-appearance=\"default\" onclick=\"{{action(&quot;fromAdvCPtoBasic&quot;,event)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cpBackBtnText}}</template> </lyte-button> </div> </template></template> </template><template case=\"false\"> <div class=\"lyteColorPicker__commandbar\"> <template is=\"if\" value=\"{{cpMoreColorOptionSelected}}\"><template case=\"true\"> <lyte-button class=\"LCP_backbtn\" lt-prop-size=\"small\" lt-prop-appearance=\"default\" onclick=\"{{action(&quot;fromAdvCPtoBasic&quot;,event)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cpBackBtnText}}</template> </lyte-button> <lyte-button class=\"LCP_done\" lt-prop-size=\"small\" lt-prop-appearance=\"primary\" onclick=\"{{action(&quot;callOnSelect&quot;,event,true)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cpDoneBtnText}}</template> </lyte-button> </template><template case=\"false\"> <lyte-button class=\"LCP_cancel\" lt-prop-size=\"small\" style=\"margin-left: auto; margin-right: 7px;\" lt-prop-appearance=\"default\" onclick=\"{{action(&quot;closeColorPicker&quot;,event)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cpCancelBtnText}}</template> </lyte-button> <lyte-button class=\"LCP_done\" lt-prop-size=\"small\" lt-prop-appearance=\"primary\" onclick=\"{{action(&quot;callOnSelect&quot;,event,true)}}\"> <template is=\"registerYield\" yield-name=\"text\">{{cpApplyBtnText}}</template> </lyte-button> </template></template> </div> </template></template> </div> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[]}},"default":{}}]}]}},"default":{}},{"type":"text","position":[1,5,1,0]},{"type":"attr","position":[1,5,3,1,1]},{"type":"for","position":[1,5,3,1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1,1]},{"type":"for","position":[1,3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,3,3,1]},{"type":"attr","position":[1,5,1,1]},{"type":"registerYield","position":[1,5,1,1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3,1,1]},{"type":"for","position":[3,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3]}]},{"type":"componentDynamic","position":[1,5,1,1]},{"type":"registerYield","position":[1,5,2,1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1]},{"type":"text","position":[3,3,0]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5,1]},{"type":"componentDynamic","position":[1,5,1]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7,1]},{"type":"componentDynamic","position":[1,7,1]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3,5]},{"type":"text","position":[3,7,0]},{"type":"componentDynamic","position":[3,7]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5,1]},{"type":"componentDynamic","position":[1,5,1]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7,1]},{"type":"componentDynamic","position":[1,7,1]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3,5]},{"type":"text","position":[3,7,0]},{"type":"componentDynamic","position":[3,7]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3,1]},{"type":"componentDynamic","position":[1,3,1]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5,1]},{"type":"componentDynamic","position":[1,5,1]},{"type":"componentDynamic","position":[1,5]},{"type":"attr","position":[1,7,1]},{"type":"componentDynamic","position":[1,7,1]},{"type":"componentDynamic","position":[1,7]},{"type":"componentDynamic","position":[1]},{"type":"componentDynamic","position":[3,1]},{"type":"componentDynamic","position":[3,3]},{"type":"componentDynamic","position":[3,5]},{"type":"componentDynamic","position":[3,7]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,5,2,1]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1,1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[0]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["cpDraggable","cpCloseOnBodyClick","cpCloseOnSelection","cpAdvancedColorButton","cpAppearance","cpStandardColors","cpUsedColors","cpBasicColorPicker","cpSelectedColor","cpOriginElement","cpWrapperClass","cpCurrentRgbCode","cpBoundary","cpScrollable","cpNoFillButton","cpNoFillLabel","cpPaletteLabel","cpInline","cpColorFormats","cpDoneBtnText","cpCancelBtnText","cpBackBtnText","cpApplyBtnText","cpStandardColorArray","cpDuration","cpBoardColor","cpAvailableColors","cpMoreColorOptionSelected","cpOpacityLabel","cpUsedColorsNumber","stopObserverOnBoardColorChange","usedColors","polygonPoints","noFillPath","moreColorsPath","currentHue","currentBrightness","currentSaturation","paletteSize","circleOffsetSize","circleOffsetBecauseOfWinWidget","posdivElPalette","dragStatus","paletteMaxX","paletteMaxY","clickOnPaletteInProgress","component","hueStatus","poxYHue","poxXHue","dropButtonValue","basicDimensions","calledForHueMove","advCPDimensions","changedColor","tooltipTextChanged","inputChangeEvnt","hueBarSize","opacityStatus","opacityTrackSize","posXOpacity","opacity","sliderOffset","dragged","counter","cmykColors","setPrevCmyk","restrictOnChange","prevColor","colorFormat"],
	data : function(){
		return {
			//Component Variables
			"cpDraggable" : Lyte.attr("boolean",{"default" : false}),
			"cpCloseOnBodyClick" : Lyte.attr("boolean",{"default" : true}),
			"cpCloseOnSelection" : Lyte.attr("boolean",{"default" : false}),
			"cpAdvancedColorButton" : Lyte.attr("boolean",{"default" : true}),
			"cpAppearance" : Lyte.attr("string",{"default" : "callout"}),
			// "cpColorPreview" : Lyte.attr("boolean",{"default" : true}),
			"cpStandardColors" : Lyte.attr("boolean",{"default" : true}),
			"cpUsedColors" : Lyte.attr("boolean",{"default" : true}),
			"cpBasicColorPicker" : Lyte.attr("boolean",{"default" : true}),
			"cpSelectedColor" : Lyte.attr("object",{"default" : null}),
			"cpOriginElement" : Lyte.attr("string",{"default" : ""}),
			"cpWrapperClass" : Lyte.attr("string",{"default":"lyteColorPickerPopover"}),
			"cpCurrentRgbCode" : Lyte.attr("string",{ "default" : "90c3d4"}),
			"cpBoundary" : Lyte.attr("object",{"default" : null}),
			"cpScrollable":Lyte.attr("boolean",{"default": true}),
			"cpNoFillButton":Lyte.attr("boolean",{"default":false}),
			"cpNoFillLabel":Lyte.attr("string",{"default":""}),
			"cpPaletteLabel": Lyte.attr("string",{"default":""}),
			"cpInline" : Lyte.attr("boolean",{"default" : false}),
			"cpColorFormats" : Lyte.attr("array"),
			"cpDoneBtnText" : Lyte.attr("string",{"default" : "Done"}),
			"cpCancelBtnText" : Lyte.attr("string",{"default" : "Cancel"}),
			"cpBackBtnText" : Lyte.attr("string",{"default" : "Back"}),
			"cpApplyBtnText" : Lyte.attr("string",{"default" : "Apply"}),
			"cpStandardColorArray" : Lyte.attr("array",{"default" : []}),
			"cpDuration" : Lyte.attr("number",{"default":600}),
			"cpBoardColor" : Lyte.attr("string"),
			"cpAvailableColors" : Lyte.attr("array",{"default" : []}),
			"cpMoreColorOptionSelected" : Lyte.attr("boolean",{"default" : false}),
			"cpOpacityLabel" : Lyte.attr("string"),
			"cpUsedColorsNumber" : Lyte.attr("number",{"default":10}),
			//Local variables
			"stopObserverOnBoardColorChange" : Lyte.attr("boolean",{"default" : false}),
			
			
			"usedColors" : Lyte.attr("array"),
			
			"polygonPoints" : Lyte.attr("string",{"default" : "4.4,10.3 3.7,9.6 6.7,6.5 3.6,3.4 4.4,2.7 8.1,6.5"}),
			"noFillPath" : Lyte.attr("string",{"default" : "M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,1c1.8,0,3.3,0.7,4.6,1.7l-9.9,9.9C1.7,11.3,1,9.8,1,8 C1,4.1,4.1,1,8,1z M8,15c-1.8,0-3.3-0.7-4.6-1.7l9.9-9.9C14.3,4.7,15,6.2,15,8C15,11.9,11.9,15,8,15z"}),
			"moreColorsPath" : Lyte.attr("string", {"default" : "M299.7-0.2C128.3-0.2-7,134,0.2,305.2C7.4,476.9,138,577.3,259.7,595.9c88.2,13.4,107.8-45.1,87.3-67.3 c-35.5-38.3-22.6-68.6-7.3-82.5c17.4-15.7,50.3-17.3,77.3-13.8c65.5,8.5,175-40,182.2-144.8C611,116.5,471.1-0.2,299.7-0.2z M118.1,299.7c-27.7,0-50.1-22.4-50.1-50.1c0-27.7,22.4-50.1,50.1-50.1c27.7,0,50.1,22.4,50.1,50.1 C168.2,277.3,145.8,299.7,118.1,299.7z M217.6,166.6c-27.7,0-50.1-22.4-50.1-50.1c0-27.7,22.4-50.1,50.1-50.1 c27.7,0,50.1,22.4,50.1,50.1C267.7,144.1,245.2,166.6,217.6,166.6z M384.9,166.9c-27.7,0-50.1-22.4-50.1-50.1 c0-27.7,22.4-50.1,50.1-50.1c27.7,0,50.1,22.4,50.1,50.1C435,144.4,412.6,166.9,384.9,166.9z M485.2,299.9 c-27.7,0-50.1-22.4-50.1-50.1c0-27.7,22.4-50.1,50.1-50.1c27.7,0,50.1,22.4,50.1,50.1C535.2,277.5,512.8,299.9,485.2,299.9z"}),
			

			//AdvColorPicker Local Variables
			"currentHue" : Lyte.attr("number",{ "default" : 0}),
			"currentBrightness" : Lyte.attr("number",{ "default" : 100}),
			"currentSaturation" : Lyte.attr("number",{ "default" : 100}),
			"paletteSize" : Lyte.attr("object"/*,{ "default" : {'height':160,'width':260}}*/),
			"circleOffsetSize" : Lyte.attr("number",{ "default" : 6}),
			"circleOffsetBecauseOfWinWidget" : Lyte.attr("number",{ "default" : 0}),
			"posdivElPalette" : Lyte.attr("object",{ "default" : {}}),
			"dragStatus" : Lyte.attr("number",{ "default" : 0}),
			"paletteMaxX" : Lyte.attr("number",{ "default" : 0}),
			"paletteMaxY" : Lyte.attr("number",{ "default" : 0}),
			"clickOnPaletteInProgress" : Lyte.attr("boolean",{ "default" : false}),
			"component" : Lyte.attr("object",{"default" : null}),
			"hueStatus" : Lyte.attr("number",{ "default" : 0}),
			"poxYHue" : Lyte.attr("number", { "default" : 0}),
			"poxXHue" : Lyte.attr("number", { "default" : 0}),
			"dropButtonValue" : Lyte.attr("string",{"default" : "HEX"}),
			"basicDimensions" : Lyte.attr("object",{"default" : {"width" : 222,"height" : 362}}),
			"calledForHueMove" : Lyte.attr("boolean",{"default":false}),
			"advCPDimensions" : Lyte.attr("object",{"default" : {"width" : 280,"height" : 322}}),
			"changedColor" : Lyte.attr("object"),
			"tooltipTextChanged" : Lyte.attr('boolean',{'default' : false}),
			"inputChangeEvnt" : Lyte.attr("boolean",{"default" : false}),
			"hueBarSize" : Lyte.attr("number"),
			"opacityStatus" : Lyte.attr("number",{"default":0}),
			"opacityTrackSize" : Lyte.attr("number"),
			"posXOpacity" : Lyte.attr("number", { "default" : 0}),
			"opacity" : Lyte.attr("number"),
			"sliderOffset" : Lyte.attr("number",{"default" : 4}),
			"dragged" : Lyte.attr("boolean", {"default" : false}),
			"counter" : Lyte.attr("number"),
			"cmykColors" : Lyte.attr("array",{"default":[]}),
			"setPrevCmyk" : Lyte.attr("boolean",{"default":"false"}),
			"restrictOnChange" : Lyte.attr("boolean",{"default": false}),
			"prevColor" : Lyte.attr("object", {"default":{}}),
			"colorFormat" : Lyte.attr("object", {"default" : {"R" : "Red", "G" : "Green", "B" : "Blue", "H" : "Hue", "S" : "Saturation", "V" : "Brightness", "C" : "Cyan", "M" : "Magenta", "Y" : "Yellow", "K" : "Key", "A" : "Opacity"}})
		}		
	},
	
	didConnect : function(){
		this.setData('component',this);
	},

	//Observes color chnage and sets the color for advanced colorpicker
	observeColorChange : function(){
		// console.log(this.getData('cpBoardColor'));
		if(!(this.getData('cpBasicColorPicker')) && !(this.getData('stopObserverOnBoardColorChange')) && this.inputEle && this.isCurrentRgbCodeDifferent()){
			// console.log("triggered boardColor change");
			var boardColor = this.getData('cpBoardColor');
			this.__setCurrentRgbCodeFromBoardColor();
			this.setData('inputChangeEvnt',true);
			this.setRgbColor('#' + this.getData('cpCurrentRgbCode'));
			this.__updateRgbInForm();
			if( (/rgba/.test(boardColor) || (/#/.test(boardColor) && boardColor.length == 9)) ){
				this.__updateOpacityInForm();
			}
		}
		if(this.getData('stopObserverOnBoardColorChange')){
			this.setData('stopObserverOnBoardColorChange',false);
		}
	}.observes('cpBoardColor'),

	isCurrentRgbCodeDifferent : function(){
		var boardColor = this.getData('cpBoardColor'),
			currentRgbCode = this.getData('cpCurrentRgbCode'), code;
		if(/#/.test(boardColor)){
			if(boardColor.length == 9){
				code = boardColor.substring(1,7);
			}
			if(boardColor.length == 7){
				code = boardColor.substring(1);
			}
			else if(boardColor.length == 4){
				code = ColorPicker_Util.convert3DigitTo6DigitRgbCode(boardColor.substring(1));
			}
		}
		else if(/rgba/.test(boardColor)){
			var rgbColor = boardColor.substring(5,boardColor.length-1).split(",");
			code = ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2]);
		}
		else if(/rgb/.test(boardColor)){
			var rgbColor = boardColor.substring(4,boardColor.length-1).split(",");
			code = ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2]);
		}

		if(code && code.toUpperCase() == currentRgbCode.toUpperCase()){
			return false;
		}
		return true;
	},

	addPasteEvent : function(){
		var comp = this.$node,
			format = this.getData('dropButtonValue'),
			self = this;
		if(format === _lyteUiUtils.i18n("HEX")){
			comp.querySelector('#lyteCPShowValue input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "HEX");
			});
			comp.querySelector('#lyteCP__A input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "A");
			});
		}
		else if(format === _lyteUiUtils.i18n("RGB")){
			comp.querySelector('#lyteCP__R input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "R");
			});
			comp.querySelector('#lyteCP__G input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "G");
			});
			comp.querySelector('#lyteCP__B input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "B");
			});
			comp.querySelector('#lyteCP__A input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "A");
			});
		}
		else if(format === _lyteUiUtils.i18n("HSV")){
			comp.querySelector('#lyteCP__H input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "H");
			});
			comp.querySelector('#lyteCP__S input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "S");
			});
			comp.querySelector('#lyteCP__V input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "V");
			});
			comp.querySelector('#lyteCP__A input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "A");
			});
		}
		else if(format === _lyteUiUtils.i18n("CMYK")){
			comp.querySelector('#lyteCP__C input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "C");
			});
			comp.querySelector('#lyteCP__M input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "M");
			});
			comp.querySelector('#lyteCP__Y input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "Y");
			});
			comp.querySelector('#lyteCP__K input').addEventListener('paste', function(e){
				self.actions.onPaste(e, "K");
			});
		}

	},

	initializeAdvColorPicker : function(event,ele,restrictCmykChange){
		this.setData('dropButtonValue', this.getData('cpColorFormats')[0]);
		var imageObj = ele.querySelector('#lyteCPImgDiv')
		var divElPalette = ele.querySelector('#colorDiv');
		var divElPaletteCircle = ele.querySelector('.colorSlider_palette_circle');
		var cpDiv = ele.querySelector('.lyteColorPicker--advanced');
		if(!cpDiv.addedEvents){
			ele.querySelector('.colorSlider_hue').addEventListener('mousedown', function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initHueMove(event,ColorPicker_Util.component);
			});
			divElPalette.addEventListener('mousedown',function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initPaletteMove(event,ColorPicker_Util.component);
			});
			ele.querySelector('.colorSlider_hueBar').addEventListener('mousedown', function(event) {
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
	            ColorPicker_EventUtil.__moveOnHueBar(event,ColorPicker_Util.component);
	        });
	        ele.querySelector('.colorSlider_hue').addEventListener('touchstart', function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initHueMove(event,ColorPicker_Util.component);
			});
			divElPalette.addEventListener('touchstart',function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initPaletteMove(event,ColorPicker_Util.component);
			});
			ele.querySelector('.colorSlider_hueBar').addEventListener('touchstart', function(event) {
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
	            ColorPicker_EventUtil.__moveOnHueBar(event,ColorPicker_Util.component);
	        });
			//for opacityslider circle
			ele.querySelector('.lyteColorPicker__opacityslider').addEventListener('mousedown', function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initOpacityMove(event,ColorPicker_Util.component);
			});
			ele.querySelector('.lyteColorPicker__opacityslider').addEventListener('touchstart', function(event){
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
				return ColorPicker_EventUtil.__initOpacityMove(event,ColorPicker_Util.component);
			});
			//for opacityslider track
			ele.querySelector('.opacityslider__track').addEventListener('mousedown', function(event) {
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
	            ColorPicker_EventUtil.__moveOnOpacityTrack(event,ColorPicker_Util.component);
	        });
	        ele.querySelector('.opacityslider__track').addEventListener('touchstart', function(event) {
				ColorPicker_Util.component = ColorPicker_Util.getColorPicker(event.target).component;
	            ColorPicker_EventUtil.__moveOnOpacityTrack(event,ColorPicker_Util.component);
	        });
	        cpDiv.addedEvents = true;
		}

        this.setData('paletteSize',{'height' : divElPalette.offsetHeight, 'width' : divElPalette.offsetWidth});
        this.setData('hueBarSize',ele.querySelector('.colorSlider_hueBar').offsetWidth);
        this.setData('opacityTrackSize',ele.querySelector('.opacityslider__track').offsetWidth);
        if(this.getData('opacity') === undefined || (this.getData('opacity') && this.getData('opacity') < 0)){
        	this.setData('opacity',100);
        }
        if(this.getData('cpBoardColor')){
        	this.__setCurrentRgbCodeFromBoardColor();
        }
        if(this.getData('inputChangeEvnt')){
        	this.setData('inputChangeEvnt',false);
        }
		this.setRgbColor("#"+this.getData("cpCurrentRgbCode"),null,restrictCmykChange);
		this.addPasteEvent();
		ele = null;
		divElPalette = null;
		divElPaletteCircle = null;
		imageObj = null;
	},

	
	initializeBasicColorPicker : function(event,ele){
		var liELes = ele.querySelectorAll('.default__colors > li');
		for(var v =0; v<liELes.length ; v++){
			liELes[v].style.background = liELes[v].textContent;
		}
		if(this.getData('cpStandardColors')){
			liELes = ele.querySelectorAll('.standard__colors > li');
			for(var v =0; v<liELes.length ; v++){
				liELes[v].style.background = liELes[v].textContent;
			}
		}
		if(this.getData('cpUsedColors')){
			liELes = ele.querySelectorAll('.used__colors > li');
			for(var v =0; v<liELes.length ; v++){
				liELes[v].style.background = liELes[v].textContent;
			}
		}
		if(this.getData('cpColorPreview')){
			if(this.getData('cpCurrentRgbCode')){
				var color = ColorPicker_Util.getRgbColorsByRgbCode(this.getData('cpCurrentRgbCode'));
			}
		}
		liELes = null;
	},

	executeOnBeforeOpen : function(){
		if(this.getMethods('onBeforeOpen')){
			this.executeMethod('onBeforeOpen');
		}
	},

	executeOnSelect : function(event, close){
		var colors = this.getData('usedColors');
		// var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
		// this.setData('cpSelectedColor',{'hex' : '#'+this.getData('cpCurrentRgbCode'), 
		// 									'rgb' : "rgb("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+")", 
		// 									'opacity' : this.getData('opacity'),
		// 									'hex-alpha' : '#'+this.getData('cpCurrentRgbCode')+ColorPicker_Util.getDecimalToHexAlphaCode(this.getData('opacity')),
		// 									'rgba' : "rgba("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+", "+(this.getData('opacity')/100)+")"});
		this.__setSelectedColor();
		var color = this.getData('cpSelectedColor').rgba;
		if(colors.indexOf(color) != -1){
			// colors.splice(colors.indexOf(color), 1);
			Lyte.arrayUtils(this.getData('usedColors'),'removeAt',colors.indexOf(color),1);
		}
		else{
			Lyte.arrayUtils(this.getData('usedColors'),'removeAt',this.getData('cpUsedColorsNumber') - 1,1);
		}
		Lyte.arrayUtils(this.getData('usedColors'),'insertAt',0,color);
		var node = this.$node.querySelectorAll(".usedColor__container li")[0] /*(this.getData('cpInline') ? this.$node : this.childComp).querySelectorAll(".usedColor__container li")[0]*/;
		if(node){
			node.style.background = color;
		}
		// this.setData('usedColors',colors);
		if(this.getMethods("onSelect")){
			this.executeMethod("onSelect",event,close,this.getData('calledForHueMove'));	
		}
		if(this.getData('calledForHueMove')){
			this.setData('calledForHueMove',false);
		}
	},

	executeOnOpen : function(){
		if(this.getMethods('onOpen')){
			this.executeMethod('onOpen');
		}
	},

	executeOnClose : function(event){
		if(this && this.inputEle){
			// var inputEle = this.inputEle;
			this.inputEle = null;
			// inputEle.remove();
		}
		if(this.$node.closest('lyte-wormhole')){
			this.$node.closest('lyte-wormhole')._callee.parentElement.setData('ltPropShow',false);
		}
		// if(this.getMethods('onClose')){
		// 	this.executeMethod('onClose',event);
		// }
	},

	executeOnChange : function(){
		// var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData('cpCurrentRgbCode'));
  //       var selectedColor = {
  //       	"hex" : "#"+this.getData('cpCurrentRgbCode'),
  //       	"rgb" : "rgb("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+")",
  //       	"opacity" : this.getData('opacity'),
  //       	"hex-alpha" : "#"+this.getData('cpCurrentRgbCode')+ColorPicker_Util.getDecimalToHexAlphaCode(this.getData('opacity')),
  //       	"rgba" : "rgba("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+", "+(this.getData('opacity')/100)+")"
  //       };
  //       this.setData("cpSelectedColor",selectedColor);
  		this.__setSelectedColor();
  		if( !(this.isColorValueEqual()) ){
  			this.setData('prevColor', this.getData('cpSelectedColor'));
  			if(this.getMethods('onChange')){
				this.executeMethod('onChange',event,this.getData('cpSelectedColor'),this);
			}
  		}
	},

	isColorValueEqual : function(){
		var prevColor = this.getData('prevColor'),
			currColor = this.getData('cpSelectedColor');
		if(Object.keys(prevColor).length === Object.keys(currColor).length){
			for(key in prevColor){
				if(prevColor[key] != currColor[key]){
					return false;
				}
			}
			return true;
		}
		return false;
	},

	validateInputValue : function(type, lyteInp){
		var value = lyteInp.getData('ltPropValue');
		if(type === "HEX"){
			if(value.length == 4 || value.length == 7){
				if(lyteInp.classList.contains('lyteCp__Invalid')){
					lyteInp.classList.remove('lyteCp__Invalid');
				}
			}
			else{
				lyteInp.classList.add('lyteCp__Invalid');
				if(this.getMethods('onInputError')){
					this.executeMethod('onInputError', type == "HEX" ? "HEX" : this.getData('colorFormat')[type]);
				}
			}
		}
		else if(type == "R" || type == "G" || type == "B" || type == "H" || type == "S" || type == "V" || type == "C" || type == "M" || type == "Y" || type == "K" || type == "A"){
			if(value.length > 0 && value.length < 4){
				if(lyteInp.classList.contains('lyteCp__Invalid')){
					lyteInp.classList.remove('lyteCp__Invalid');
				}
			}
			else{
				lyteInp.classList.add('lyteCp__Invalid');
				if(this.getMethods('onInputError')){
					this.executeMethod('onInputError', type == "HEX" ? "HEX" : this.getData('colorFormat')[type]);
				}
			}
		}

	},

	/*----------------- Start of Utility Methods for Color Picker ---------------*/

	__setSelectedColor : function() {
		var rgbCode = this.getData('cpCurrentRgbCode');
		var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(rgbCode);
		var cmykColors = this.getData('cmykColors');
		if(this.getData('dropButtonValue') != "CMYK"){
			var rgbCol = ColorPicker_Util.getRgbColorsByHsv(this.getData('currentHue'), this.getData('currentSaturation') / 100, this.getData('currentBrightness') / 100);
    		var derivedCmykColors = ColorPicker_Util.getCmykByRgbColors([rgbCol.red,rgbCol.green,rgbCol.blue]);
    		if(!cmykColors.length){
    			cmykColors = derivedCmykColors
    			this.setData('cmykColors', cmykColors);
    		}
    		else{
    			var calculatedRgbCode1 = ColorPicker_Util.getRgbCodeByCmyk(derivedCmykColors[0], derivedCmykColors[1], derivedCmykColors[2], derivedCmykColors[3]);
    			var calculatedRgbCode2 = ColorPicker_Util.getRgbCodeByCmyk(cmykColors[0], cmykColors[1], cmykColors[2], cmykColors[3]);
    			if(calculatedRgbCode1 != calculatedRgbCode2 && calculatedRgbCode1 == rgbCode){
    				cmykColors = derivedCmykColors;
    				this.setData('cmykColors', cmykColors);
    			}
    		}
		}
        var selectedColor = {
        	"hex" : "#"+rgbCode,
        	"rgb" : "rgb("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+")",
        	"opacity" : this.getData('opacity'),
        	"hex-alpha" : "#"+rgbCode+ColorPicker_Util.getDecimalToHexAlphaCode(this.getData('opacity')),
        	"rgba" : "rgba("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+", "+(this.getData('opacity')/100)+")",
        	"cmyk" : cmykColors
        };
        this.setData("cpSelectedColor",selectedColor);
	},

	setRgbColor : function(rgbColor, hue, restrictCmykChange) {
        var hsv = ColorPicker_Util.getHsvByRgbCode(rgbColor);
        this.setData('currentHue', hue ? hue : hsv.hue);
        this.setData('currentBrightness', hsv.brightness * 100);
        this.setData('currentSaturation', hsv.saturation * 100);
        this.__changeViewAfterColorChange(restrictCmykChange);
        this.__setSelectedColor();
    },

    __changeViewAfterColorChange : function(restrictCmykChange) {
        this.__setCurrentRgbCode();
        this.__setPaletteBgColor();
        this.__setSliderPos();
        // this.__setBgColorPreviewDiv();
        if(!this.getData('inputChangeEvnt')){
        	this.__updateRgbInForm(restrictCmykChange);
        }else{
        	this.setData('inputChangeEvnt',false);
        }       
        /*this.__updateHsvInForm();*/
        this.__setSmallCirclePosition();
        // this.__setOpacitySliderPos();
		this.__changeColorInOpacityTrack();
		this.__setOpacityColorPreviewDiv();
		this.__updateOpacityInForm();
    },

	__setCurrentRgbCodeFromBoardColor : function(){
    	var color = this.getData('cpBoardColor');
		if(/#/.test(color)){
			if(color.length == 9){
				this.setData('opacity', ColorPicker_Util.getHexToDecimalAlphaCode(color.substring(7)));
				this.setData('cpCurrentRgbCode',color.substring(1,7));
			}
			else if(color.length == 7){
				this.setData('cpCurrentRgbCode',color.substring(1));
			}
			else if(color.length == 4){
				this.setData('cpCurrentRgbCode',ColorPicker_Util.convert3DigitTo6DigitRgbCode(color.substring(1)));
			}
		}
		else if(/rgba/.test(color)){
			var rgbColor = color.substring(5,color.length-1).split(",");
			this.setData('opacity',rgbColor[3]*100);
			this.setData('cpCurrentRgbCode',ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2]));
		}
		else if(/rgb/.test(color)){
			var rgbColor = color.substring(4,color.length-1).split(",");
			this.setData('cpCurrentRgbCode',ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2]));
		}
    },

	__setCurrentRgbCode : function(code) {
		var rgbCode = code ? code : ColorPicker_Util.getRgbCodeByHsv(this.getData('currentHue'), this.getData('currentSaturation') / 100, this.getData('currentBrightness') / 100);
		this.setData('stopObserverOnBoardColorChange', true);
		this.setData('cpBoardColor', '#'+rgbCode);
        this.setData('cpCurrentRgbCode', rgbCode);
        if(this.getData('stopObserverOnBoardColorChange')){
        	this.setData('stopObserverOnBoardColorChange', false);
        }
    },

    __setPaletteBgColor : function() {
        try {
        	// if(this.getData('cpInline')){
        		this.$node.querySelector('#colorDiv').style.backgroundColor = '#' + ColorPicker_Util.getRgbCodeByHsv(this.getData('currentHue'), 1, 1);
        	// }
        	// else{
         //    	this.childComp.querySelector('#colorDiv').style.backgroundColor = '#' + ColorPicker_Util.getRgbCodeByHsv(this.getData('currentHue'), 1, 1);
        	// }
        } catch (e) {}
    },

    __setSliderPos: function() {
        var leftPos = Math.round(this.getData('hueBarSize') - ((this.getData('currentHue') / 360) * this.getData('hueBarSize')));
        // if(this.getData('cpInline')){
        	this.$node.querySelector('.colorSlider_sliderHandle').style.left = leftPos - this.getData('sliderOffset') + "px";
        // }
        // else{
        // 	this.childComp.querySelector('.colorSlider_sliderHandle').style.left = leftPos - this.getData('sliderOffset') + "px";
        // }
    },

    __setSmallCirclePosition : function() {
    	var currentBrightness = this.getData('currentBrightness');
    	var currentSaturation = this.getData('currentSaturation');
    	var paletteSize = this.getData('paletteSize');
    	var circleOffsetSize = this.getData('circleOffsetSize');
    	var divElPaletteCircle = this.$node.querySelector('.colorSlider_palette_circle') /*this.getData('cpInline') ? this.$node.querySelector('.colorSlider_palette_circle') : this.childComp.querySelector('.colorSlider_palette_circle')*/;
        var leftPos = Math.round(currentSaturation * (paletteSize.width / 100)) - circleOffsetSize;
        var topPos = paletteSize.height - Math.round(currentBrightness * (paletteSize.height / 100)) - circleOffsetSize;
        divElPaletteCircle.style.left = leftPos + 'px';
        divElPaletteCircle.style.top = topPos + 'px';
        divElPaletteCircle.className = divElPaletteCircle.className.replace('colorSlider_palette_circleBlack', '');
        if (currentBrightness > 80) {
            divElPaletteCircle.className = divElPaletteCircle.className + 'colorSlider_palette_circleBlack';
        }
        divElPaletteCircle = null;
    },

    __ffHackWinWidget : function() {
    	var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
        if (ele.querySelector('.lyteColorPicker--advanced').parentNode.className && ele.querySelector('.lyteColorPicker--advanced').parentNode.className.indexOf('windowContent') >= 0 && !document.all) {
            this.setData('circleOffsetBecauseOfWinWidget', 0);
        }
    },

    __setBgColorPreviewDiv : function() {
    	// if(this.getData('cpInline')){
    		this.$node.querySelector('.previewDiv').style.backgroundColor = '#' + this.getData('cpCurrentRgbCode');
    	// }
    	// else{
    	// 	this.childComp.querySelector('.previewDiv').style.backgroundColor = '#' + this.getData('cpCurrentRgbCode');
    	// }
    },

    __updateRgbInForm : function(restrictCmykChange){
    	var comp = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
    	var format = comp.querySelector('.selectFormat').querySelector('lyte-dropdown').getData('ltPropSelected');
    	this.setData('dropButtonValue',format);
    	
    	if(format === _lyteUiUtils.i18n("HEX")){
    		comp.querySelector('#lyteCPShowValue').setData("ltPropValue",("#" + this.getData("cpCurrentRgbCode")));
    		this.inputEle.value = ("#" + this.getData("cpCurrentRgbCode") + ColorPicker_Util.getDecimalToHexAlphaCode(this.getData('opacity')));
    		this.setData('counter', 1);
    		if(!restrictCmykChange && this.getData('setPrevCmyk')){
				this.setData('setPrevCmyk',false);
			}
    	}
    	else if(format === _lyteUiUtils.i18n("RGB")){
    		var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
    		comp.querySelector('#lyteCP__R').component.setData('ltPropValue',rgbColor.red+"");
    		comp.querySelector('#lyteCP__G').component.setData('ltPropValue',rgbColor.green+"");
    		comp.querySelector('#lyteCP__B').component.setData('ltPropValue',rgbColor.blue+"");
    		this.setData('counter', 3);
    		// comp.querySelector('#lyteCPShowValue_RGB').component.setData('ltPropValue',"rgb("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+")");
    		this.inputEle.value = "rgba("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+", "+(this.getData('opacity')/100)+")";
    		// this.getData('rgbFieldCode').component.$node.cp("value",("rgb("+rgbColor.red+","+rgbColor.green+","+rgbColor.blue+")"));
    		if(!restrictCmykChange && this.getData('setPrevCmyk')){
				this.setData('setPrevCmyk',false);
			}
    	}
    	else if(format === _lyteUiUtils.i18n("HSV")){
    		var hue = Math.round(this.getData('currentHue'));
    		var saturation = Math.round(this.getData('currentSaturation'));
    		var valueBrightness = Math.round(this.getData('currentBrightness'));
    		comp.querySelector('#lyteCP__H').component.setData('ltPropValue',hue+"");
    		comp.querySelector('#lyteCP__S').component.setData('ltPropValue',saturation+"");
    		comp.querySelector('#lyteCP__V').component.setData('ltPropValue',valueBrightness+"");
    		this.setData('counter', 3);
    		this.inputEle.value = "hsv("+hue+"°,"+saturation+"%,"+valueBrightness+"%,"+(this.getData('opacity')/100)+")";
    		// this.getData('rgbFieldCode').component.$node.cp("value",("hsv("+hue+"°,"+saturation+"%,"+valueBrightness+"%)"));
    		if(!restrictCmykChange && this.getData('setPrevCmyk')){
				this.setData('setPrevCmyk',false);
			}
    	}
    	else if(format === _lyteUiUtils.i18n("CMYK")){
    		// console.log(this.getData('currentHue'),this.getData('currentSaturation')/100,this.getData('currentBrightness') / 100)
    		var rgbColor = ColorPicker_Util.getRgbColorsByHsv(this.getData('currentHue'), this.getData('currentSaturation') / 100, this.getData('currentBrightness') / 100);
    		var cmykColors;
    		if(this.getData('setPrevCmyk') && this.getData('cmykColors').length == 4){
    			cmykColors = this.getData('cmykColors');
    		}
    		else{
    			cmykColors = ColorPicker_Util.getCmykByRgbColors([rgbColor.red,rgbColor.green,rgbColor.blue]);
    			if(!restrictCmykChange && this.getData('setPrevCmyk')){
    				this.setData('setPrevCmyk',false);
    			}
    		}
    		// console.log(rgbColor, cmykColors);
    		comp.querySelector('#lyteCP__C').component.setData('ltPropValue',Math.round(cmykColors[0]*100)+"");
    		comp.querySelector('#lyteCP__M').component.setData('ltPropValue',Math.round(cmykColors[1]*100)+"");
    		comp.querySelector('#lyteCP__Y').component.setData('ltPropValue',Math.round(cmykColors[2]*100)+"");
    		comp.querySelector('#lyteCP__K').component.setData('ltPropValue',Math.round(cmykColors[3]*100)+"");
    		this.setData('cmykColors', cmykColors);
    		this.setData('counter', 4);
    		this.inputEle.value = "cmyk("+Math.round(cmykColors[0]*100)+"%,"+Math.round(cmykColors[1]*100)+"%,"+Math.round(cmykColors[2]*100)+"%,"+Math.round(cmykColors[3]*100)+"%)";
    		// this.getData('rgbFieldCode').component.$node.cp("value",("cmyk("+Math.round(cmykColors[0]*100)+"%,"+Math.round(cmykColors[1]*100)+"%,"+Math.round(cmykColors[2]*100)+"%,"+Math.round(cmykColors[3]*100)+"%)"));
    	}
    },

    __setOpacitySliderPos : function(){
    	var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
    	var leftPos = (this.getData('opacity')*this.getData('opacityTrackSize'))/100;
    	ele.querySelector('.opacityslider__circlethumb').style.left = leftPos - this.getData('sliderOffset') + "px";
    },

    __changeColorInOpacityTrack : function(){
    	var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
    	ele.querySelector('.opacityslider__track').style.backgroundImage = "linear-gradient(to right, transparent, #"+this.getData('cpCurrentRgbCode')+")";
    },

    __setOpacityColorPreviewDiv : function(){
    	var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
    	var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
    	ele.querySelector('.previewDiv').style.backgroundColor = "rgba("+rgbColor.red+","+rgbColor.green+","+rgbColor.blue+","+(this.getData('opacity')/100)+")";
    },

    __updateOpacityInForm : function(){
    	var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
    	if(ele.querySelector('#lyteCP__A')){
    		ele.querySelector('#lyteCP__A').component.setData('ltPropValue',this.getData('opacity'));
    		if(this.getData('dropButtonValue') == _lyteUiUtils.i18n("HEX")){
    			this.inputEle.value = ("#" + this.getData("cpCurrentRgbCode") + ColorPicker_Util.getDecimalToHexAlphaCode(this.getData('opacity')));
    		}
    		if(this.getData('dropButtonValue') == _lyteUiUtils.i18n("RGB")){
    			var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
    			this.inputEle.value = "rgba("+rgbColor.red+", "+rgbColor.green+", "+rgbColor.blue+", "+(this.getData('opacity')/100)+")";
    		}
    		if(this.getData('dropButtonValue') == _lyteUiUtils.i18n("HSV")){
    			var hue = Math.round(this.getData('currentHue'));
	    		var saturation = Math.round(this.getData('currentSaturation'));
	    		var valueBrightness = Math.round(this.getData('currentBrightness'));
    			this.inputEle.value = "hsv("+hue+"°,"+saturation+"%,"+valueBrightness+"%,"+(this.getData('opacity')/100)+")";
    		}
    	}
    },

	/*----------------- End of Utility Methods for Color Picker ---------------*/

	didDestroy : function(){
    	if(this.tId){
    		clearInterval(this.tId);
    		this.tId = false;
    	}
    },

	methods : {
		inputValueChanged : function(type,changedProp,lyteInp){
			// console.log("INPUT value changed");
			var comp = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
			if(type === "HEX"){
				if(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(changedProp.newValue)){
					this.setData('inputChangeEvnt',true);
					if(changedProp.newValue.length == 7){
						this.__setCurrentRgbCode(changedProp.newValue.substring(1));
						// this.setData('cpCurrentRgbCode',changedProp.newValue.substring(1));
						// this.setRgbColor(changedProp.newValue);
					}
					else if(changedProp.newValue.length == 4){
						this.__setCurrentRgbCode(ColorPicker_Util.convert3DigitTo6DigitRgbCode(changedProp.newValue.substring(1)));
						// this.setData('cpCurrentRgbCode',ColorPicker_Util.convert3DigitTo6DigitRgbCode(changedProp.newValue.substring(1)));
						// this.setRgbColor('#' + ColorPicker_Util.convert3DigitTo6DigitRgbCode(changedProp.newValue.substring(1)));
					}
					if(!(this.getData('dragged')) && this.getData('dragStatus') != 1 && this.getData('hueStatus') != 1 && !(this.getData('counter'))){
						this.setRgbColor('#' + this.getData('cpCurrentRgbCode'));
						this.executeOnChange();
					}
					else{
						this.setData('dragged',false);
						if(this.getData('counter')){
							this.setData('counter', this.getData('counter') - 1);
							if(!(this.getData('counter'))){
								this.setData('restrictOnChange',true);
								this.__updateOpacityInForm();
								// this.setData('counter', 1);
							}
						}
					}
				}
				else if(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(changedProp.newValue)){
					this.setData('inputChangeEvnt',true);
					if(changedProp.newValue.length == 6){
						this.__setCurrentRgbCode(changedProp.newValue);
						// this.setData('cpCurrentRgbCode',changedProp.newValue);
					}
					else if(changedProp.newValue.length == 3){
						this.__setCurrentRgbCode(ColorPicker_Util.convert3DigitTo6DigitRgbCode(changedProp.newValue));
						// this.setData('cpCurrentRgbCode',ColorPicker_Util.convert3DigitTo6DigitRgbCode(changedProp.newValue));
					}
					if(!(this.getData('dragged')) && this.getData('dragStatus') != 1 && this.getData('hueStatus') != 1 && !(this.getData('counter'))){
						this.setRgbColor('#' + this.getData('cpCurrentRgbCode'));
						this.executeOnChange();
					}
					else{
						this.setData('dragged',false);
						if(this.getData('counter')){
							this.setData('counter', this.getData('counter') - 1);
							if(!(this.getData('counter'))){
								this.setData('restrictOnChange',true);
								this.__updateOpacityInForm();
								// this.setData('counter', 1);
							}
						}
					}
				}
			}
			if(type === "R" || type === "G" || type === "B"){
				this.setData('inputChangeEvnt',true);
				var red = comp.querySelector('#lyteCP__R').component.getData('ltPropValue'),
					green = comp.querySelector('#lyteCP__G').component.getData('ltPropValue'),
					blue = comp.querySelector('#lyteCP__B').component.getData('ltPropValue');
				if(red && green && blue){
					this.__setCurrentRgbCode(ColorPicker_Util.getRgbCodeByRgbColors(red, green, blue));
					// this.setData('cpCurrentRgbCode',ColorPicker_Util.getRgbCodeByRgbColors(red, green, blue));
					if(!(this.getData('dragged')) && this.getData('dragStatus') != 1 && this.getData('hueStatus') != 1 && !(this.getData('counter'))){
						this.setRgbColor('#' + this.getData('cpCurrentRgbCode'));
						this.executeOnChange();
					}
					else{
						this.setData('dragged',false);
						if(this.getData('counter')){
							this.setData('counter', this.getData('counter') - 1);
							if(!(this.getData('counter'))){
								this.setData('restrictOnChange',true);
								this.__updateOpacityInForm();
								// this.setData('counter', 1);
							}
						}
					}
				}
			}
			if(type === "H" || type === "S" || type === "V"){
				this.setData('inputChangeEvnt',true);
				var hue = comp.querySelector('#lyteCP__H').component.getData('ltPropValue'),
					saturation = comp.querySelector('#lyteCP__S').component.getData('ltPropValue'),
					valueBrightness = comp.querySelector('#lyteCP__V').component.getData('ltPropValue');
				if(hue && saturation && valueBrightness){
					this.__setCurrentRgbCode(ColorPicker_Util.getRgbCodeByHsv(hue, saturation, valueBrightness));
					// this.setData('cpCurrentRgbCode',ColorPicker_Util.getRgbCodeByHsv(hue, saturation, valueBrightness));
					if(!(this.getData('dragged')) && this.getData('dragStatus') != 1 && this.getData('hueStatus') != 1 && !(this.getData('counter'))){
						this.setRgbColor('#' + this.getData('cpCurrentRgbCode'), type === "H" && hue == 360 ? 360 : undefined);
						this.executeOnChange();
					}
					else{
						this.setData('dragged',false);
						if(this.getData('counter')){
							this.setData('counter', this.getData('counter') - 1);
							if(!(this.getData('counter'))){
								this.setData('restrictOnChange',true);
								this.__updateOpacityInForm();
								// this.setData('counter', 1);
							}
						}
					}
				}
			}
			if(type === "C" || type === "M" || type === "Y" || type === "K"){
				this.setData('inputChangeEvnt',true);
				var c = comp.querySelector('#lyteCP__C').component.getData('ltPropValue'),
					m = comp.querySelector('#lyteCP__M').component.getData('ltPropValue'),
					y = comp.querySelector('#lyteCP__Y').component.getData('ltPropValue'),
					k = comp.querySelector('#lyteCP__K').component.getData('ltPropValue');
				if(c && m && y && k){
					this.setData('cmykColors', [c/100,m/100,y/100,k/100]);
					this.__setCurrentRgbCode(ColorPicker_Util.getRgbCodeByCmyk(c, m, y, k));
					// this.setData('cpCurrentRgbCode',ColorPicker_Util.getRgbCodeByCmyk(c, m, y, k));
					if(!(this.getData('dragged')) && this.getData('dragStatus') != 1 && this.getData('hueStatus') != 1 && !(this.getData('counter'))){
						this.setRgbColor('#' + this.getData('cpCurrentRgbCode'));
						this.executeOnChange();
					}
					else{
						this.setData('dragged',false);
						if(this.getData('counter')){
							this.setData('counter', this.getData('counter') - 1);
						}
					}
				}
			}
			if(type === "A"){
				var a = comp.querySelector('#lyteCP__A').component.getData('ltPropValue');
				if(a){
					this.setData('opacity', parseInt(a));
					if(this.getData('opacityStatus') != 1){
						this.__setOpacitySliderPos();
						this.__setOpacityColorPreviewDiv();
						if(!this.getData('restrictOnChange')){
							this.executeOnChange();
						}
						else{
							this.setData('restrictOnChange',false);
						}
					}
				}
			}
			this.validateInputValue(type, lyteInp);
		},

		onInputBlur : function(type, event, lyteInp){
			switch(type){
				case "HEX" : 
					lyteInp.setData("ltPropValue",("#" + this.getData("cpCurrentRgbCode")));
					break;
				case "R" :
					var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
    				lyteInp.setData('ltPropValue',rgbColor.red+"");
					break;
				case "G" :
					var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
					lyteInp.setData('ltPropValue',rgbColor.green+"");
					break;
				case "B" :
					var rgbColor = ColorPicker_Util.getRgbColorsByRgbCode(this.getData("cpCurrentRgbCode"));
					lyteInp.setData('ltPropValue',rgbColor.blue+"");
					break;
				case "H" :
		    		lyteInp.setData('ltPropValue',Math.round(this.getData('currentHue'))+"");
					break;
				case "S" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('currentSaturation'))+"");
					break;
				case "V" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('currentBrightness'))+"");
					break;
				case "C" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('cmykColors')[0] * 100)+"");
					break;
				case "M" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('cmykColors')[1] * 100)+"");
					break;
				case "Y" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('cmykColors')[2] * 100)+"");
					break;
				case "K" :
					lyteInp.setData('ltPropValue',Math.round(this.getData('cmykColors')[3] * 100)+"");
					break;
				case "A" :
					lyteInp.setData('ltPropValue', this.getData('opacity'));
					break;
			}
			
		},
		
		changeFormatView : function(e,value){
			if(e.currentTarget.tagName == 'LYTE-DROP-BOX'){
	    		this.__updateRgbInForm(true);
	    		this.addPasteEvent();
			}
	    }
	},

	actions : {
		onPaste : function(event, prop){
			// console.log("onPaste triggered", prop);
			var input = event.target,
				start = input.selectionStart,
				end = input.selectionEnd,
				value = input.value;
			if(start == end){
				value = value + (event.clipboardData || window.clipboardData).getData('text').trim();
			}
			else{
				var paste = value.substring(0,start) + (event.clipboardData || window.clipboardData).getData('text').trim();
				var restMsg = value.substring(end);
				if(restMsg.length > 0){
					paste += restMsg;
				}
				value = paste;
			}
			if(prop === "HEX"){
				if( (value.length == 1 && value[0] != '#') || value.length > 7 || (value.length > 0 && (value[0] != '#' || value.substring(1).indexOf('#') != -1)) ){
					event.preventDefault();
					event.stopPropagation();
				}
			}
			else if(prop == "R" || prop == "G" || prop == "B"){
				if(value === "" || isNaN(value) || (value && (parseInt(value) < 0 || parseInt(value) >255))){
					event.preventDefault();
					event.stopPropagation();
				}
			}
			else if(prop == "H"){
				if(value === "" || isNaN(value) || (value && (parseInt(value) < 0 || parseInt(value) >360))){
					event.preventDefault();
					event.stopPropagation();
				}
			}
			else if(prop == "S" || prop == "V" || prop == "C" || prop == "M" || prop == "Y" || prop == "K" || prop == "A"){
				if(value === "" || isNaN(value) || (value && (parseInt(value) < 0 || parseInt(value) >100))){
					event.preventDefault();
					event.stopPropagation();
				}
			}
		},
		inputKeyDown : function(event, comp, type){
			// console.log(arguments);
			//BACKSPACE - key code -> 8
			//DELETE - key code -> 46
			var arrowkeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
			if(type == "HEX"){
				if((event.shiftKey && (event.keyCode || event.which) == 51) || 
					(!(event.shiftKey || event.metaKey) && (event.keyCode || event.which) >= 48 && (event.keyCode || event.which) <= 57) || 
					((event.keyCode || event.which) >= 65 && (event.keyCode || event.which) <= 70) || 
					((event.keyCode || event.which) >= 97 && (event.keyCode || event.which) <= 102) || 
					((event.keyCode || event.which) >= 96 && (event.keyCode || event.which) <= 105) ||
					((event.keyCode || event.which) == 8) || ((event.keyCode || event.which) == 35) || 
					((event.keyCode || event.which) >= 37 && (event.keyCode || event.which) <= 40) || 
					((event.keyCode || event.which) == 46)){
					var input = comp.querySelector('input'),
						start = input.selectionStart,
						end = input.selectionEnd,
						value = input.value;
					if((event.keyCode || event.which) == 8){
						if(start == value.length){
							value = value.slice(0,-1);
						}
						// else if(start == 1){
						// 	value = value.slice(1);
						// }
						else if(start > 0){
							value = value.slice(0,start-1)+value.slice(start);
						}
						return;
					}
					if((event.keyCode || event.which) == 46){
						if(start < value.length){
							value = value.slice(0,start) + value.slice(start+1);
						}
						return;
					}
					if(arrowkeys.indexOf(event.key) != -1){
						return;
					}
					else if( !( (event.ctrlKey || event.metaKey) && ((event.keyCode || event.which) == 65 || (event.keyCode || event.which) == 67) ) ){
						var char = arrowkeys.indexOf(event.key) != -1 ? "" : event.key;
						if(((event.keyCode || event.which) >= 96 && (event.keyCode || event.which) <= 105)){
							var key = event.keyCode || event.which;
							key -= 48;
							char = String.fromCharCode(key);
						}
						// for start == end, just add the char at the cursor position and check for value
						// for start != end, some characters are selected in the input, so those characters will be replaced with the new char and then check for the value
						value = start == end ? value.slice(0,start) + char + value.slice(start) : value.slice(0,start) + value.slice(end) + char;
					}
					if( (value.length == 1 && value[0] != '#') || (value.length > 0 && (value[0] != '#' || value.substring(1).indexOf('#') != -1)) ){
						event.preventDefault();
						event.stopPropagation();
					}
				}
				else if( !((event.ctrlKey || event.metaKey) && (event.keyCode || event.which) == 86) ){
					event.preventDefault();
					event.stopPropagation();
				}
			}
			else if((!(event.shiftKey || event.metaKey) && (event.keyCode || event.which) >= 48 && (event.keyCode || event.which) <= 57) || 
					((event.keyCode || event.which) == 8) || ((event.keyCode || event.which) == 46) || 
					((event.keyCode || event.which) >= 37 && (event.keyCode || event.which) <= 40) ||
					((event.keyCode || event.which) >= 96 && (event.keyCode || event.which) <= 105) ||
					((event.ctrlKey || event.metaKey) && ((event.keyCode || event.which) == 65 || (event.keyCode || event.which) == 67))){
				var input = comp.querySelector('input'),
					start = input.selectionStart,
					end = input.selectionEnd,
					value = input.value;
				if((event.keyCode || event.which) == 8){
					if(start == value.length){
						value = value.slice(0,-1);
					}
					// else if(start == 1){
					// 	value = value.slice(1);
					// }
					else if(start > 0){
						value = value.slice(0,start-1)+value.slice(start);
					}
					return;
				}
				if((event.keyCode || event.which) == 46){
					if(start < value.length){
						value = value.slice(0,start) + value.slice(start+1);
					}
					return;
				}
				else if( !( (event.ctrlKey || event.metaKey) && ((event.keyCode || event.which) == 65 || (event.keyCode || event.which) == 67) ) ){
					var char = arrowkeys.indexOf(event.key) != -1 ? "" : event.key;
					if(((event.keyCode || event.which) >= 96 && (event.keyCode || event.which) <= 105)){
						var key = event.keyCode || event.which;
						key -= 48;
						char = String.fromCharCode(key);
					}
					// for start == end, just add the char at the cursor position and check for value
					// for start != end, some characters are selected in the input, so those characters will be replaced with the new char and then check for the value
					value = start == end ? value.slice(0,start) + char + value.slice(start) : value.slice(0,start) + value.slice(end) + char;
				}
				if(type == "R" || type == "G" || type == "B"){
					if(value && (parseInt(value) < 0 || parseInt(value) >255)){
						event.preventDefault();
						event.stopPropagation();
					}
				}
				else if(type == "H"){
					if(value && (parseInt(value) < 0 || parseInt(value) >360)){
						event.preventDefault();
						event.stopPropagation();
					}
				}
				else if(type == "S" || type == "V" || type == "C" || type == "M" || type == "Y" || type == "K" || type == "A"){
					if(value && (parseInt(value) < 0 || parseInt(value) >100)){
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}
			else if( !((event.ctrlKey || event.metaKey) && (event.keyCode || event.which) == 86) ){
				event.preventDefault();
				event.stopPropagation();
			}
		},

		callOnSelect : function(event,close){
			this.executeOnSelect(event,close);
		},

		selectColor : function(event,color){
			if(color == "rgba(0, 0, 0, 0)"){
				return;
			}
			var ele;
			var node = this.$node.querySelector('.lyteCPSelectedColor');
			// if(this.getData('cpInline')){
			// 	ele = this.$node.querySelector('.lyteColorPicker');
			// 	node = ele.querySelector('.cpSelectedColor');
			// }
			// else{
			// 	ele = document.querySelector('.'+this.getData('cpWrapperClass'));
			// 	node = ele.querySelector('.cpSelectedColor');
			// }
			if(node){
				node.classList.remove('lyteCPSelectedColor');
			}
			event.target.classList.add('lyteCPSelectedColor');
			var rgbColor;
			if(/rgba/.test(color)){
				rgbColor = color.substring(5,color.length-1).split(",");
				this.setData('opacity',rgbColor[3]*100);
			}
			else{
				rgbColor = color.substring(4,color.length-1).split(",");
				this.setData('opacity',100);
			}
			this.__setCurrentRgbCode(ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2]));
			var hsv = ColorPicker_Util.getHsvByRgbCode('#'+this.getData('ltPropCurrentRgbCode'));
	        this.setData('currentHue', hsv.hue);
	        this.setData('currentBrightness', hsv.brightness * 100);
	        this.setData('currentSaturation', hsv.saturation * 100);
			// this.__setSelectedColor();
			this.executeOnSelect(event);
		},

		goToAdvancedCP : function(event){
			var ele = this.$node;
			var color = this.getData('cpSelectedColor');
			if(color != null){
				this.setData("cpCurrentRgbCode",color.hex ? color.hex.substring(1) : "FF0000");
				if('cmyk' in color){
					this.setData('cmykColors', color.cmyk);
					this.setData('setPrevCmyk',true);
				}
				else{
					this.setData('cmykColors',[])
				}
			}
			this.setData('cpMoreColorOptionSelected',true);
			var advCPDimensions = this.getData('advCPDimensions');
			if(this.getData('cpInline')){
				// ele = this.$node.querySelector('.lyteColorPicker');
				this.setData('cpBasicColorPicker',false);
			}
			else{
				// ele = document.querySelector('.'+this.getData('cpWrapperClass'));
				var popOver = ele.closest('.lytePopover') /*ele.querySelector('.lytePopover')*/;
				var popOverOffset = popOver.getBoundingClientRect();
				var height = popOverOffset.height;
				this.setData('basicDimensions',{"width" : popOverOffset.width, "height" : height/*, "usedColorsHeight" : usedColorsHeight*/});
				
				popOver.style.width = advCPDimensions.width + "px";
				popOver.style.maxWidth = advCPDimensions.width + "px";
				this.setData('cpBasicColorPicker',false);
				popOver._callee.component.computeOffsetImpl();
				popOverOffset = null;
				height = null;
				popOver = null;
			}
			this.inputEle = ele.querySelector('#lyteCPHiddenInput');
			// this.inputEle.id = "lyteCPHiddenInput";
			// document.body.append(this.inputEle);
			// this.inputEle.style.top = "-100px";
			// this.inputEle.style.position = "absolute";
			this.initializeAdvColorPicker(event,ele,true);
			ele = null;
			color = null;
			advCPDimensions = null;
		},

		noFillExecute : function(event){
			var color = 'transparent';
			var selectedColor = {
				"hex" : undefined,
				"rgb" : color,
				"opacity" : 0
			};
			this.setData('cpSelectedColor',selectedColor);
			// this.executeOnSelect(event);
			if(this.getMethods("onSelect")){
				this.executeMethod("onSelect",event,undefined, this.getData('calledForHueMove'));	
			}
			if(this.getData('calledForHueMove')){
				this.setData('calledForHueMove',false);
			}
			// if(this.getData('cpCloseOnSelection') && !this.getData('calledForHueMove')){
			// 	this.setData('cpShow',false);
			// }
		},

		defaultColorExecute : function(event){
			var color = 'rgb(0, 0, 0)';
			var rgbColor = color.substring(4,color.length-1).split(",");
			var selectedColor = {
				"hex" : ("#" + ColorPicker_Util.getRgbCodeByRgbColors(rgbColor[0],rgbColor[1],rgbColor[2])),
				"rgb" : color,
				"opacity" : this.getData('opacity')
			};
			this.setData('cpSelectedColor',selectedColor);
			this.executeOnSelect(event);
		},

		closeColorPicker : function(event){
			this.executeOnClose(event);
		},

		fromAdvCPtoBasic : function(event){
			this.setData('cpMoreColorOptionSelected',false);
			var ele = this.$node;
			var basicDimensions = this.getData('basicDimensions');
			if(this.getData('cpInline')){
				// ele = this.$node.querySelector('.lyteColorPicker');
				// ele.style.width = basicDimensions.width + "px";
				this.setData('cpBasicColorPicker',true);
			}
			else{
				// ele = document.querySelector('.'+this.getData('cpWrapperClass'));
				var popOver = ele.closest('.lytePopover') /*ele.querySelector('.lytePopover')*/;
				var content = popOver.querySelector('lyte-popover-content');
				var contentHeight = 0;
				var height = 0;
				popOver.style.width = basicDimensions.width + "px";
				popOver.style.maxWidth = basicDimensions.width + "px";
				this.setData('cpBasicColorPicker',true);
				popOver._callee.component.computeOffsetImpl();
			}
			// if(this.inputEle){
			// 	var inputEle = this.inputEle;
			// 	this.inputEle = null;
			// 	inputEle.remove();
			// }
			this.initializeBasicColorPicker(event,ele);
			popOver = null;
		},
		copyValueToClipboard : function(prop){
			var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
			// if(prop == "fromAdv"){
			var colorCodeFormat = ele.querySelector('lyte-dropdown').ltProp('selected');
			this.inputEle.select();

			try {
				var successful = document.execCommand('copy');
				if(!this.getData('tooltipTextChanged')){
					ele.querySelector('.previewDiv').setAttribute('lt-prop-title',_lyteUiUtils.i18n('Color.value.copied'));
					this.setData('tooltipTextChanged',true);
					ele.querySelector('.previewDiv').dispatchEvent(new Event('mousemove'));
				}

			} catch (err) {
				// console.log('Oops, unable to copy');
			}
		},

		onOverColorPreviewDiv : function(event){
			var ele = this.$node /*this.getData('cpInline') ? this.$node : this.childComp*/;
			// if(type === "fromAdv"){
			// 	if(prop === "over"){
					if(this.getData('tooltipTextChanged')){
						ele.querySelector('.previewDiv').setAttribute('lt-prop-title',_lyteUiUtils.i18n('Copy.Color.value.to.Clipboard'));
						this.setData('tooltipTextChanged',false);
					}
					// ele.querySelector('.previewDiv').querySelector('#copyColorValueImg').style.display = "block";
				// }
				// if(prop === "out"){
				// 	ele.querySelector('.previewDiv').querySelector('#copyColorValueImg').style.display = "none";
				// }
			// }
			// var node;
			// if(this.getData('cpInline')){
			// 	node = this.$node.querySelector('#basciPreviewDivImg');
			// }
			// else{
			// 	node = this.$node.querySelector('lyte-popover').component.childComp.querySelector('#basciPreviewDivImg');
			// }
			// if(type === "fromBasic"){
			// 	if(prop === "over"){
			// 		node.style.display = "block";
			// 	}
			// 	if(prop === "out"){
			// 		node.style.display = "none";
			// 	}
			// }
		}
	}
});


/**
 * Renders a colorpicker
 * @component lyte-colorpicker
 * @version 1.0.0
 * @dependencies lyte-wormhole,lyte-button,lyte-popover,lyte-dropdown,lyte-input,lyte-table,lyte-draggable
 * @methods onBeforeOpen,onOpen,onSelect,onClose,onChange,onInputError
 */

Lyte.Component.register("lyte-colorpicker", {
_template:"<template tag-name=\"lyte-colorpicker\"> <template is=\"if\" value=\"{{ltPropInline}}\"><template case=\"true\"> <div class=\"lyteColorPicker\"> <div class=\"lyteColorPicker__showhidecontainer\"> <colorpicker-ui cp-advanced-color-button=\"{{ltPropAdvancedColorButton}}\" cp-standard-colors=\"{{ltPropStandardColors}}\" cp-used-colors=\"{{ltPropUsedColors}}\" cp-basic-color-picker=\"{{lbind(ltPropBasicColorPicker)}}\" cp-wrapper-class=\"{{ltPropWrapperClass}}\" cp-current-rgb-code=\"{{ltPropCurrentRgbCode}}\" cp-no-fill-button=\"{{ltPropNoFillButton}}\" cp-no-fill-label=\"{{ltPropNoFillLabel}}\" cp-palette-label=\"{{ltPropPaletteLabel}}\" cp-inline=\"{{ltPropInline}}\" cp-color-formats=\"{{lbind(ltPropColorFormats)}}\" cp-done-btn-text=\"{{lbind(ltPropDoneBtnText)}}\" cp-cancel-btn-text=\"{{lbind(ltPropCancelBtnText)}}\" cp-back-btn-text=\"{{lbind(ltPropBackBtnText)}}\" cp-apply-btn-text=\"{{lbind(ltPropApplyBtnText)}}\" cp-standard-color-array=\"{{ltPropStandardColorArray}}\" cp-board-color=\"{{lbind(ltPropBoardColor)}}\" cp-selected-color=\"{{lbind(ltPropSelectedColor)}}\" cp-available-colors=\"{{availableColors}}\" used-colors=\"{{lbind(ltPropUsedColorsList)}}\" cp-more-color-option-selected=\"{{lbind(moreColorOptionSelected)}}\" cp-opacity-label=\"{{ltPropOpacityLabel}}\" cp-used-colors-number=\"{{ltPropUsedColorsNumber}}\" opacity=\"{{ltPropOpacity}}\" cp-close-on-selection=\"{{ltPropCloseOnSelection}}\" cp-close-on-body-click=\"{{ltPropCloseOnBodyClick}}\" on-select=\"{{method(&quot;executeOnSelect&quot;)}}\" on-change=\"{{method(&quot;executeOnChange&quot;)}}\" on-close=\"{{method(&quot;executeOnClose&quot;)}}\" on-input-error=\"{{method(&quot;executeOnInputError&quot;)}}\"></colorpicker-ui> </div> </div> </template><template case=\"false\"> <lyte-popover class=\"lyteColorPicker popColorPicker\" on-close=\"{{method(&quot;closePopColorPicker&quot;)}}\" on-show=\"{{method(&quot;showColorPickerPopover&quot;,event)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-popover-content class=\"lyteColorPicker__showhidecontainer\"> <colorpicker-ui cp-advanced-color-button=\"{{ltPropAdvancedColorButton}}\" cp-standard-colors=\"{{ltPropStandardColors}}\" cp-used-colors=\"{{ltPropUsedColors}}\" cp-basic-color-picker=\"{{lbind(ltPropBasicColorPicker)}}\" cp-wrapper-class=\"{{ltPropWrapperClass}}\" cp-current-rgb-code=\"{{ltPropCurrentRgbCode}}\" cp-no-fill-button=\"{{ltPropNoFillButton}}\" cp-no-fill-label=\"{{ltPropNoFillLabel}}\" cp-palette-label=\"{{ltPropPaletteLabel}}\" cp-inline=\"{{ltPropInline}}\" cp-color-formats=\"{{lbind(ltPropColorFormats)}}\" cp-done-btn-text=\"{{lbind(ltPropDoneBtnText)}}\" cp-cancel-btn-text=\"{{lbind(ltPropCancelBtnText)}}\" cp-back-btn-text=\"{{lbind(ltPropBackBtnText)}}\" cp-apply-btn-text=\"{{ltPropApplyBtnText}}\" cp-standard-color-array=\"{{ltPropStandardColorArray}}\" cp-board-color=\"{{lbind(ltPropBoardColor)}}\" cp-selected-color=\"{{lbind(ltPropSelectedColor)}}\" cp-available-colors=\"{{availableColors}}\" used-colors=\"{{lbind(ltPropUsedColorsList)}}\" cp-more-color-option-selected=\"{{lbind(moreColorOptionSelected)}}\" cp-opacity-label=\"{{ltPropOpacityLabel}}\" cp-used-colors-number=\"{{ltPropUsedColorsNumber}}\" opacity=\"{{ltPropOpacity}}\" cp-close-on-selection=\"{{ltPropCloseOnSelection}}\" cp-close-on-body-click=\"{{ltPropCloseOnBodyClick}}\" on-select=\"{{method(&quot;executeOnSelect&quot;)}}\" on-change=\"{{method(&quot;executeOnChange&quot;)}}\" on-close=\"{{method(&quot;executeOnClose&quot;)}}\" on-input-error=\"{{method(&quot;executeOnInputError&quot;)}}\"></colorpicker-ui> </lyte-popover-content> </template> </lyte-popover> </template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropShow","ltPropDraggable","ltPropCloseOnBodyClick","ltPropCloseOnSelection","ltPropAdvancedColorButton","ltPropAppearance","ltPropStandardColors","ltPropUsedColors","ltPropBasicColorPicker","ltPropSelectedColor","ltPropOriginElement","ltPropWrapperClass","ltPropCurrentRgbCode","ltPropBoundary","ltPropScrollable","ltPropNoFillButton","ltPropNoFillLabel","ltPropPaletteLabel","ltPropInline","ltPropColorFormats","ltPropDoneBtnText","ltPropCancelBtnText","ltPropBackBtnText","ltPropApplyBtnText","ltPropStandardColorArray","ltPropDuration","ltPropBoardColor","ltPropOpacityLabel","ltPropPopover","ltPropUsedColorsNumber","ltPropUsedColorsList","ltPropOpacity","moreColorOptionSelected","availableColors","usedColors","colorpicker","dropButtonValue"],
	data: function () {
		return {
			//Component Variables

			/**
						 * @componentProperty {boolean} ltPropShow
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropShow": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropDraggable
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropDraggable": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropCloseOnBodyClick
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropCloseOnBodyClick": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropCloseOnSelection
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropCloseOnSelection": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {boolean} ltPropAdvancedColorButton
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropAdvancedColorButton": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {string} ltPropAppearance
						 * @version 1.0.0
						 * @default callout
						 * @options callout,box
						 */
			"ltPropAppearance": Lyte.attr("string", { "default": "callout" }),

			/**
						 * @componentProperty {boolean} ltPropStandardColors
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropStandardColors": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropUsedColors
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropUsedColors": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropBasicColorPicker
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropBasicColorPicker": Lyte.attr("boolean", { "default": true }),

			/**
						 * @experimental ltPropSelectedColor
						 */
			"ltPropSelectedColor": Lyte.attr("object", { "default": null }),

			/**
						 * @componentProperty {string} ltPropOriginElement
						 * @version 1.0.0
						 */
			"ltPropOriginElement": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {string} ltPropWrapperClass
						 * @version 1.0.0
						 * @default lyteColorPickerPopover
						 */
			"ltPropWrapperClass": Lyte.attr("string", { "default": "lyteColorPickerPopover" }),

			/**
						 * @experimental ltPropCurrentRgbCode
						 */
			"ltPropCurrentRgbCode": Lyte.attr("string", { "default": "90c3d4" }),

			/**
			 * @typedef {object} boundary
			 * @property {string} left
			 * @property {string} right
			 * @property {string} top
			 * @property {string} bottom
			 */
			/**
						 * @componentProperty {boundary} ltPropBoundary
						 * @version 1.0.0
						 * @default {}
						 */
			"ltPropBoundary": Lyte.attr("object", { "default": null }),

			/**
						 * @componentProperty {boolean} ltPropScrollable
						 * @version 1.0.0
						 * @default true
						 * 
						 */
			"ltPropScrollable": Lyte.attr("boolean", { "default": true }),

			/**
						 * @componentProperty {boolean} ltPropNoFillButton
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropNoFillButton": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {string} ltPropNoFillLabel
						 * @version 1.0.0
						 * @default No Fill
						 */
			"ltPropNoFillLabel": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {string} ltPropPaletteLabel
						 * @version 1.0.0
						 * @default Theme Colors
						 */
			"ltPropPaletteLabel": Lyte.attr("string", { "default": "" }),

			/**
						 * @componentProperty {boolean} ltPropInline
						 * @version 1.0.0
						 * @default false
						 * 
						 */
			"ltPropInline": Lyte.attr("boolean", { "default": false }),

			/**
						 * @componentProperty {array} ltPropColorFormats
						 * @version 2.0.0
						 * @default ["HEX","RGB","HSV","CMYK"]
						 */
			"ltPropColorFormats": Lyte.attr("array", { "default": ["HEX", "RGB", "HSV", "CMYK"] }),

			/**
						 * @componentProperty {string} ltPropDoneBtnText
						 * @version 2.0.0
						 * @default Done
						 */
			"ltPropDoneBtnText": Lyte.attr("string", { "default": "Done" }),

			/**
						 * @componentProperty {string} ltPropCancelBtnText
						 * @version 2.0.0
						 * @default Cancel
						 */
			"ltPropCancelBtnText": Lyte.attr("string", { "default": "Cancel" }),

			/**
						 * @componentProperty {string} ltPropBackBtnText
						 * @version 2.0.0
						 * @default Back
						 */
			"ltPropBackBtnText": Lyte.attr("string", { "default": "Back" }),

			/**
						 * @componentProperty {string} ltPropApplyBtnText
						 * @version 2.0.0
						 * @default Apply
						 */
			"ltPropApplyBtnText": Lyte.attr("string", { "default": "Apply" }),

			/**
						 * @componentProperty {array} ltPropStandardColorArray
						 * @version 2.0.0
						 */
			"ltPropStandardColorArray": Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {number} ltPropDuration
						 * @version 2.0.0
						 * @default 600
						 */
			"ltPropDuration": Lyte.attr("number", { "default": 600 }),

			/**
						 * @componentProperty {string} ltPropBoardColor
						 * @version 2.2.4
						 * @default #90c3d4
						 */
			"ltPropBoardColor": Lyte.attr("string", { "default": "#90c3d4" }),

			/**
						 * @componentProperty {string} ltPropOpacityLabel
						 * @version 2.2.22
						 * @default Alpha
						 */
			"ltPropOpacityLabel": Lyte.attr("string"),

			/**
						 * @componentProperty {object} ltPropPopover
						 * @version 2.2.23
						 */
			"ltPropPopover": Lyte.attr("object", { "default": {} }),

			/**
						 * @componentProperty {number} ltPropUsedColorsNumber
						 * @version 3.8.0
						 * @default 10
						 */
			"ltPropUsedColorsNumber": Lyte.attr("number", { "default": 10 }),

			/**
						 * @componentProperty {array} ltPropUsedColorsList
						 * @version 3.8.0
						 * @default 10
						 */
			"ltPropUsedColorsList": Lyte.attr("array", { "default": [] }),

			/**
						 * @componentProperty {number} ltPropOpacity
						 * @version 3.20.0
						 * @default 100
						 */
			"ltPropOpacity": Lyte.attr("number", { "default": 100 }),
			//Local variables
			"moreColorOptionSelected": Lyte.attr("boolean", { "default": false }),
			"availableColors": Lyte.attr("array", { "default": [] }),
			"usedColors": Lyte.attr("array"),
			"colorpicker": Lyte.attr("object", { "default": null }),
			"dropButtonValue": Lyte.attr("string", { "default": "HEX" })
		}
	},
	init: function () {
		var availableColors = [['rgb(255, 255, 255)', 'rgb(239, 22, 22)', 'rgb(239, 130, 22)', 'rgb(239, 177, 22)', 'rgb(93, 195, 90)', 'rgb(56, 215, 187)', 'rgb(22, 208, 239)', 'rgb(57, 142, 243)', 'rgb(197, 22, 239)', 'rgb(239, 22, 111)'],
		['rgb(230, 230, 230)', 'rgb(253, 232, 232)', 'rgb(253, 243, 232)', 'rgb(253, 247, 232)', 'rgb(239, 249, 239)', 'rgb(235, 251, 248)', 'rgb(232, 250, 253)', 'rgb(235, 244, 254)', 'rgb(249, 232, 253)', 'rgb(253, 232, 241)'],
		['rgb(204, 204, 204)', 'rgb(252, 208, 208)', 'rgb(252, 230, 208)', 'rgb(252, 239, 208)', 'rgb(223, 243, 222)', 'rgb(215, 247, 241)', 'rgb(208, 246, 252)', 'rgb(215, 232, 253)', 'rgb(243, 208, 252)', 'rgb(252, 208, 226)'],
		['rgb(153, 153, 153)', 'rgb(249, 162, 162)', 'rgb(249, 205, 162)', 'rgb(249, 224, 162)', 'rgb(190, 231, 189)', 'rgb(175, 239, 228)', 'rgb(162, 236, 249)', 'rgb(176, 210, 250)', 'rgb(232, 162, 249)', 'rgb(249, 162, 197)'],
		['rgb(102, 102, 102)', 'rgb(245, 115, 115)', 'rgb(245, 180, 115)', 'rgb(245, 208, 115)', 'rgb(158, 219, 156)', 'rgb(136, 231, 214)', 'rgb(115, 227, 245)', 'rgb(136, 187, 248)', 'rgb(220, 115, 245)', 'rgb(245, 115, 169)'],
		['rgb(51, 51, 51)', 'rgb(242, 69, 69)', 'rgb(242, 155, 69)', 'rgb(242, 193, 69)', 'rgb(125, 207, 123)', 'rgb(96, 223, 201)', 'rgb(69, 217, 242)', 'rgb(97, 165, 245)', 'rgb(209, 69, 242)', 'rgb(242, 69, 140)'],
		['rgb(25, 25, 25)', 'rgb(171, 12, 12)', 'rgb(171, 91, 12)', 'rgb(171, 125, 12)', 'rgb(56, 146, 53)', 'rgb(32, 158, 136)', 'rgb(12, 148, 171)', 'rgb(12, 97, 198)', 'rgb(140, 12, 171)', 'rgb(171, 12, 77)'],
		['rgb(0, 0, 0)', 'rgb(73, 5, 5)', 'rgb(73, 39, 5)', 'rgb(73, 54, 5)', 'rgb(24, 63, 23)', 'rgb(14, 68, 58)', 'rgb(5, 64, 73)', 'rgb(5, 42, 85)', 'rgb(60, 5, 73)', 'rgb(73, 5, 33)']];
		this.setData('availableColors', availableColors);
		if(this.getData('ltPropStandardColorArray').length == 0){
			var standardColorArray = ['rgb(192, 0, 0)', 'rgb(255, 0, 0)', 'rgb(255, 192, 0)', 'rgb(255, 255, 0)', 'rgb(146, 208, 80)', 'rgb(0, 176, 80)', 'rgb(0, 176, 240)', 'rgb(0, 112, 192)', 'rgb(0, 32, 96)', 'rgb(112, 48, 160)'];
			this.setData('ltPropStandardColorArray', standardColorArray);
		}
		var formatArray = this.getData('ltPropColorFormats');
		for (var i = 0; i < formatArray.length; i++) {
			formatArray[i] = _lyteUiUtils.i18n(formatArray[i]) || formatArray[i];
		}
		this.setData('ltPropColorFormats', formatArray);
		var usedColorsList = [], len = this.getData('ltPropUsedColorsNumber');
		if (this.getData('ltPropUsedColorsList').length > 0) {
			usedColorsList = this.getData('ltPropUsedColorsList').slice();
		}
		for (var i = usedColorsList.length; i < len; i++) {
			usedColorsList.push('noColor');
		}
		this.setData('ltPropUsedColorsList', usedColorsList.slice(0, len));
	},

	showColorPicker: function () {
		if (!this.getData('ltPropNoFillLabel')) {
			this.setData('ltPropNoFillLabel', _lyteUiUtils.i18n("No.Fill"));
		}
		if (!this.getData('ltPropPaletteLabel')) {
			this.setData('ltPropPaletteLabel', _lyteUiUtils.i18n("Theme.Colors"));
		}
		if (this.getData('ltPropInline')) {
			this.executeOnBeforeOpen();
			this.$node.style.display = "inline-block";
			this.setData('colorpicker', this.$node.querySelector('colorpicker-ui').component);
			if (this.getData('ltPropColorFormats').length > 0) {
				this.setData('dropButtonValue', this.getData('ltPropColorFormats')[0]);
			}
			if (this.getData('ltPropBasicColorPicker')) {
				this.getData('colorpicker').initializeBasicColorPicker(event || window.event, this.$node);
			}
			else {
				this.getData('colorpicker').inputEle = this.getData('colorpicker').$node.querySelector('#lyteCPHiddenInput');
				this.getData('colorpicker').initializeAdvColorPicker(event || window.event, this.$node);
			}
			this.executeOnOpen();
		}
		else {
			var popOver = this.$node.querySelector('.popColorPicker');
			if (this.getData('ltPropShow')) {
				if (this.getData('ltPropColorFormats').length > 0) {
					this.setData('dropButtonValue', this.getData('ltPropColorFormats')[0]);
				}
				popOver.ltProp("showCloseButton", false);
				if (this.getData('ltPropBoundary')) {
					popOver.ltProp("boundary", this.getData('ltPropBoundary'));
				}
				var keys = Object.keys(this.getData('ltPropPopover'));
				for (var j = 0; j < keys.length; j++) {
					popOver.ltProp(keys[j], this.getData('ltPropPopover')[keys[j]]);
				};
				popOver.ltProp({
					"windowSpacing": { left: 1, right: 1, top: 1, bottom: 1 },
					"contentPadding": "0px",
					"originElem": this.getData("ltPropOriginElement"),
					"wrapperClass": this.getData("ltPropWrapperClass"),
					"type": this.getData("ltPropAppearance"),
					"duration": this.getData("ltPropDuration"),
					"closeOnBodyClick": false,
					"freeze": false,
					"scrollable": this.getData("ltPropScrollable"),
					"draggable": false,
					"show": true
				});
				this.executeOnBeforeOpen();
			}
			else {
				
				if (popOver.ltProp) {
					popOver.ltProp('show', false);
				}

			}
		}
	}.observes('ltPropShow', 'ltPropInline').on('didConnect'),

	observeOpacityChanges : function(){
		var colorpicker = this.getData('colorpicker'), opacity = this.getData('ltPropOpacity');
		if(colorpicker && opacity >= 0 && opacity <= 100){
			colorpicker.setData('opacity', opacity);
			colorpicker.__updateOpacityInForm();
		}
	}.observes('ltPropOpacity'),

	executeOnBeforeOpen: function () {
		if (this.getMethods('onBeforeOpen')) {
			this.executeMethod('onBeforeOpen', this);
		}
	},
	executeOnOpen: function () {
		if (this.getMethods('onOpen')) {
			this.executeMethod('onOpen', this);
		}
	},
	executeOnCloseFn: function (event) {
		if (this.getMethods('onClose')) {
			this.executeMethod('onClose', event, this);
		}
	},

	didDestroy: function () {
		this.setData('colorpicker', null);
	},

	methods: {
		closePopColorPicker: function (event) {
			this.executeOnCloseFn(event);
			if (this.getData('moreColorOptionSelected')) {
				var self = this;
				self.tId = setTimeout(function () {
					self.getData('colorpicker').setData('cpBasicColorPicker', true);
					self.getData('colorpicker').setData('cpMoreColorOptionSelected', false);
					self.tId = false;
				}, 400);
			}
			var ele = this.childComp.querySelector('.' + this.getData('ltPropWrapperClass'));
			if (ele && ele.classList.contains('lyteColorpickerVisible')) {
				ele.classList.remove('lyteColorpickerVisible');
			}

			this.setData('ltPropShow', false);
		},
		showColorPickerPopover: function () {
			this.childComp = this.$node.querySelector('lyte-popover').component.childComp;
			var ele = this.childComp.querySelector('.' + this.getData('ltPropWrapperClass'));
			ele.classList.add('lyteColorpickerVisible');
			this.setData('colorpicker', ele.querySelector('colorpicker-ui').component);

			//Sometimes the content is not properly rendered when the 
			ele.querySelector('lyte-popover-content').style.height = "auto";
			var colorpicker = this.getData('colorpicker');
			if (this.getData('ltPropBasicColorPicker')) {
				colorpicker.initializeBasicColorPicker(event, ele);
			}
			else {
				colorpicker.inputEle = colorpicker.$node.querySelector('#lyteCPHiddenInput');
				colorpicker.initializeAdvColorPicker(event, ele);
			}
			if (this.getData('ltPropDraggable')) {
				var drag = ele.querySelector('.lytePopover');
				var handle = ele.querySelector('lyte-popover-header') || ele.querySelector('lyte-popover-content');
				drag.id = "draggableColor";
				handle.id = "draghandle";
				$L('#draggableColor').draggable({
					handle: ['#draghandle']
				})
			}
			this.$node.querySelector('lyte-popover').component.computeOffsetImpl();
			this.executeOnOpen();
			ele = null;
		},
		executeOnClose: function (event) {
			this.executeOnCloseFn(event);
		},
		executeOnSelect: function (event, close, calledForHueMove) {
			if (this.getMethods("onSelect")) {
				this.executeMethod("onSelect", event, this.getData('ltPropSelectedColor'), this);
			}
			if (((this.getData('ltPropCloseOnSelection') && this.getData('ltPropBasicColorPicker')) || close === true) && !calledForHueMove) {
				this.setData('ltPropShow', false);
			}
		},
		executeOnChange: function (event) {
			if (this.getMethods('onChange')) {
				this.executeMethod('onChange', event, this.getData('ltPropSelectedColor'), this);
			}
		},
		executeOnInputError: function (type) {
			if (this.getMethods('onInputError')) {
				this.executeMethod('onInputError', type);
			}
		}
	}
});

document.addEventListener('click', function (event) {
	if (ColorPicker_EventUtil.__stopPropagation) {
		ColorPicker_EventUtil.__stopPropagation = false;
		return;
	}
	var ele = event.target;
	while (!ele.classList.contains('lyteColorpickerVisible') && ele.tagName != 'LYTE-DROP-BOX' && ele.tagName != 'HTML') {
		ele = ele.parentElement;
		if (!ele) {
			return
		}
	}

	if (ele.tagName == 'HTML') {
		var colorpicker = document.querySelector('.lyteColorpickerVisible');
		if (colorpicker && colorpicker.parentElement.parentElement._callee.parentElement.component.getData('ltPropCloseOnBodyClick')) {
			colorpicker.parentElement.parentElement._callee.parentElement.ltProp('show', false);
		}
	}

}, true);

/**
 * @syntax nonYielded
 * <lyte-colorpicker lt-prop-basic-color-picker = "true">
 * </lyte-colorpicker>
 */
