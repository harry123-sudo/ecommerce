/**
 * Renders a calendar
 * @component lyte-calendar
 * @version 1.0.0
 * @utility revertToToday,revertToSelected
 * @methods onDateSelected,onNavigate,onViewChange
 * @dependencies lyte-dropdown
 */

Lyte.Component.register( 'lyte-calendar', {
_template:"<template tag-name=\"lyte-calendar\"> <div class=\"{{containerClass}}\" ontouchstart=\"{{action('record',event)}}\" ontouchend=\"{{action('decide',event)}}\"> <div class=\"lyteCalendarView\"> <div> <template is=\"if\" value=\"{{navYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"navigator\"></lyte-yield> </template><template case=\"false\"> <div class=\"lyteCalendarNavigator\"> <template is=\"if\" value=\"{{ifNotEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYear}}\"> <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavLft\" onclick=\"{{action('previous','Y',event)}}\"></span></template> </template> </template></template> <span class=\"lyteCalNav lyteCaldLft {{lyteUiDisableCalendarNav(viewDate,'previous')}}\" onclick=\"{{action('previous','M',event)}}\"></span> <span class=\"lyteCalsCalMon\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropHeaderType,'===','dropdown'),'||',expHandlers(ltPropHeaderType,'===','picklist'))}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" lt-prop=\"{{stringify(ltPropDropdown)}}\" on-show=\"{{method('setClass')}}\" class=\"lyteCalMonthDD\" lt-prop-tabindex=\"1\" on-option-selected=\"{{method('optionSelected','M')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{monthNames}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> <template is=\"if\" value=\"{{expHandlers(ltPropHeaderType,'===','dropdown')}}\"><template case=\"true\"> <lyte-dropdown lt-prop-freeze=\"false\" lt-prop=\"{{stringify(ltPropDropdown)}}\" on-show=\"{{method('setClass')}}\" class=\"lyteCalYearDD\" lt-prop-tabindex=\"2\" on-option-selected=\"{{method('optionSelected','Y')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-drop-box> <lyte-drop-body> <template is=\"for\" items=\"{{years}}\" item=\"item\" index=\"index\"> <lyte-drop-item data-value=\"{{item}}\">{{item}}</lyte-drop-item> </template> </lyte-drop-body> </lyte-drop-box> </template> </lyte-dropdown> </template><template case=\"false\"> <lyte-picklist lt-prop-options=\"{{years}}\" lt-prop-dropdown=\"{&quot;freeze&quot;: false, &quot;callout&quot;: true, &quot;tabindex&quot;: 2}\" class=\"lyteCalYearDD\" on-option-select=\"{{method('optionSelected','Y')}}\" on-show=\"{{method('setClass')}}\"> </lyte-picklist> </template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropHeaderType,'===','drilldown')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <span class=\"lyteDrillCalHeaderButton\" onclick=\"{{action('changeToMonthView',event)}}\"> <span class=\"lyteCalsCalMonth\">{{lyteUiGetMonthOrYear(monthHeader,\"M\")}}</span> <span class=\"lyteCalsCalYear\">{{lyteUiGetMonthOrYear(monthHeader,\"Y\")}}</span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <span class=\"lyteDrillCalHeaderButton\" onclick=\"{{action('changeToDecadeView',event)}}\"> <span class=\"lyteCalsCalYear\">{{currentYear}}</span> </span> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','decadeView')}}\"><template case=\"true\"> <span class=\"lyteDrillCalHeaderButton lyteDrillCalYearListHeader\"> {{decadeStart}} - {{decadeEnd}} </span> </template></template></template></template></template></template> </template><template case=\"false\"> <span class=\"lyteCalsCalMonth\">{{lyteUiGetMonthOrYear(monthHeader,\"M\")}}</span> <span class=\"lyteCalsCalYear\">{{lyteUiGetMonthOrYear(monthHeader,\"Y\")}}</span> </template></template></template></template> </span> <span class=\"lyteCalNav lyteCaldRgt {{lyteUiDisableCalendarNav(viewDate,'next')}}\" onclick=\"{{action('next','M',event)}}\"></span> <template is=\"if\" value=\"{{ifNotEquals(ltPropHeaderType,&quot;dropdown&quot;)}}\"><template case=\"true\"> <template is=\"if\" value=\"{{ltPropYear}}\"> <template case=\"true\"><span class=\"lyteCalNav lyteCalyearNavRgt\" onclick=\"{{action('next','Y',event)}}\"></span></template> </template> </template></template> </div> </template></template> </div> <div class=\"lyteCalTableContainer\"> <template is=\"if\" value=\"{{ltPropBodyYield}}\"><template case=\"true\"> <lyte-yield yield-name=\"body\"></lyte-yield> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(expHandlers(ltPropHeaderType,'!==','drilldown'),'||',expHandlers(expHandlers(ltPropHeaderType,'===','drilldown'),'&amp;&amp;',expHandlers(viewType,'===','dateView')))}}\"><template case=\"true\"> <div class=\"lyteCalTableRowHeader\"> <template is=\"for\" items=\"{{daysOfWeek}}\" item=\"day\" indexval=\"idod\"> <div class=\"lyteCalTableCellHeader\">{{lyteUiI18n(day)}}</div> </template> </div> </template></template> <div class=\"lyteCalTableRowGroup\"> <template is=\"if\" value=\"{{expHandlers(ltPropHeaderType,'!==','drilldown')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{matrix}}\" item=\"vector\" indexval=\"rowid\"> <template is=\"if\" value=\"{{lyteUiCheckEmpty(vector)}}\"> <template case=\"false\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{vector}}\" item=\"date\" indexval=\"cellid\"> <template is=\"if\" value=\"{{lyteUiCheckInRange(ltPropMinDate,ltPropMaxDate,date.val,ltPropFormat)}}\"> <template case=\"true\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template> </template> <template case=\"false\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template> </template> </template> </template> </div> </template> </template> </template> </template><template case=\"false\"> <template is=\"if\" value=\"{{expHandlers(viewType,'===','dateView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{matrix}}\" item=\"vector\" indexval=\"rowid\"> <template is=\"if\" value=\"{{lyteUiCheckEmpty(vector)}}\"> <template case=\"false\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{vector}}\" item=\"date\" indexval=\"cellid\"> <template is=\"if\" value=\"{{lyteUiCheckInRange(ltPropMinDate,ltPropMaxDate,date.val,ltPropFormat)}}\"> <template case=\"true\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" onclick=\"{{action('dateSelected',event)}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template> </template> <template case=\"false\"> <template is=\"if\" value=\"{{date.emptyBlock}}\"> <template case=\"true\"> <div class=\"lyteCalEmpty\"></div> </template> <template case=\"false\"> <div data-date=\"{{date.val}}\" class=\"{{date.clsname}}\"><span class=\"lyteCalDateSpan\">{{date.date}}</span></div> </template> </template> </template> </template> </template> </div> </template> </template> </template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','monthView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{monthViewData}}\" item=\"row\" index=\"rowIndex\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{row}}\" item=\"column\" index=\"columnIndex\"> <div onclick=\"{{action('monthSelected',event)}}\" class=\"{{column['class']}}\" data-date=\"{{column['systemValue']}}\"> {{column['displayValue']}} </div> </template> </div> </template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(viewType,'===','decadeView')}}\"><template case=\"true\"> <template is=\"for\" items=\"{{decadeViewData}}\" item=\"row\" index=\"rowIndex\"> <div class=\"lyteCalTableRow\"> <template is=\"for\" items=\"{{row}}\" item=\"column\" index=\"columnIndex\"> <template is=\"if\" value=\"{{expHandlers(column.emptyBlock,'!')}}\"><template case=\"true\"> <div onclick=\"{{action('yearSelected',event)}}\" class=\"lyteCalTableCell {{column.class}}\" data-date=\"{{column.year}}\"> {{column.year}} </div> </template><template case=\"false\"> <div class=\"lyteCalEmpty\"> </div> </template></template> </template> </div> </template> </template></template></template></template></template></template> </template></template> </div> </template></template> </div> <div> <div class=\"lyteCalBtns\"> <template is=\"if\" value=\"{{expHandlers(showToday,'&amp;&amp;',ltPropShowToday)}}\"><template case=\"true\"> <p class=\"lyteCalCurrentDate\"><a onclick=\"{{action('today',event)}}\">{{lyteUiI18n('today')}}</a></p> </template></template> <template is=\"if\" value=\"{{ltPropYield}}\"> <template case=\"true\"> <lyte-yield yield-name=\"footer\"></lyte-yield> </template> </template> </div> </div> </div> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1,1,1]},{"type":"if","position":[1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"attr","position":[1,5,1]},{"type":"if","position":[1,5,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"if","position":[3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"for","position":[1,1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"text","position":[1,3]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"text","position":[3,0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,3,1]},{"type":"if","position":[1,1,3,1],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]}]}]}},"default":{}},{"type":"attr","position":[3,1]},{"type":"if","position":[3,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"false":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0,0]}]}},"default":{}}]}},"default":{}}]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"for","position":[1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1]}]},"false":{"dynamicNodes":[]}},"default":{}}]}]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,1,5,1,1]},{"type":"if","position":[1,1,5,1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,0]},{"type":"text","position":[1,0,0]}]}},"default":{}},{"type":"attr","position":[1,1,5,1,3]},{"type":"if","position":[1,1,5,1,3],"cases":{"true":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}],
_observedAttributes :["ltPropStartDate","ltPropEndDate","ltPropCurrentDate","ltPropFormat","ltPropYear","ltPropMonthHeaderFormat","daysOfWeek","monthSystemValues","monthNames","shortHands","todayName","viewDate","changeData","ltPropYield","ltPropMinDate","ltPropMaxDate","ltPropStartWeekDay","navYield","selectDate","currentDatechanged","ltPropFillRows","ltPropNumberOfRows","callFrmDidcnct","monthDD","yearDD","years","ltPropHeaderType","ltPropDropdown","cords","start","prev","tt","showToday","monthViewTableArray","ltPropBodyYield","ltPropShowToday","ltPropI18n"],
	data: function() {
		return {
			'ltPropStartDate': Lyte.attr( 'string', { 
				'default': ''
			} ),
			'ltPropEndDate': Lyte.attr( 'string', { 
				'default': ''
			} ),

			/** 
			 * @componentProperty {dateString} ltPropCurrentDate
			 */

			'ltPropCurrentDate': Lyte.attr( 'string', { 
				'default': '' 
			} ),
			/** 
			 * @typedef {
				* MM/DD/YYYY |
				* YYYY/MM/DD |
				* MMM/DD/YYYY |
				* MMM/YYYY/DD |
				* DD/MMM/YYYY |
				* YYYY/MMM/DD |
				* DD/YYYY/MMM |
				* YYYY/DD/MMM |
				* MMMM/DD/YYYY |
				* MMMM/YYYY/DD |
				* DD/YYYY/MMMM |
				* YYYY/DD/MMMM |
				* DD/MMMM/YYYY |
				* YYYY/MMMM/DD
				* } dateFormat
			*/
			/** 
			 * @componentProperty {dateFormat} ltPropFormat
			 * @default MM/DD/YYYY
			 */

			'ltPropFormat': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'format', 'MM/DD/YYYY' )  
			} ),

			/**
			 * @componentProperty {boolean} ltPropYear
			 * @default true
			 * 
			 */

			'ltPropYear': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'year', true ) 
			} ),

			/**
			 * @typedef {
			 * 'MMMM YYYY' |
			 * 'MMM YYYY' 
			 * } MonthHeaderFormat
			 */
			/**
			 * @componentProperty {MonthHeaderFormat} ltPropMonthHeaderFormat
			 * @default 'MMMM YYYY'
			 */

			'ltPropMonthHeaderFormat': Lyte.attr( 'string', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'monthHeaderFormat', 'MMMM YYYY' ) 
			} ),
			'daysOfWeek': Lyte.attr( 'array', { 
				'default': [] 
			} ),

			'monthSystemValues': Lyte.attr( 'array', {
				'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December' 
				]
			} ),

			'monthNames': Lyte.attr( 'array', { 
				'default': [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December' 
				]
			} ),
			'shortHands': Lyte.attr( 'array', { 
				'default': [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'short.may',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
				]
			} ),
			'todayName': Lyte.attr( 'string', {
				'default': 'Today' 
			} ),
			'viewDate': Lyte.attr( 'object', { 
				'default': {} 
			} ),
			'changeData': Lyte.attr( 'number', {
				'default': 0 
			} ),

			/**
			 * @componentProperty {boolean} ltPropYield
			 * @default false
			 * 
			 */

			'ltPropYield': Lyte.attr( 'boolean', { 
				'default': false
			} ),

			/**
			 * @componentProperty {dateString} ltPropMinDate
			 */

			'ltPropMinDate': Lyte.attr( 'string', { 
				'default': ''
			} ),

			/**
			 * @componentProperty {dateString} ltPropMaxDate
			 */

			'ltPropMaxDate': Lyte.attr( 'string', { 
				'default': '' 
			} ),

			/**
			 * @componentProperty {number} ltPropStartWeekDay
			 * @default 1
			 * @minValue 0
			 * @maxValue 6
			 * @step 1
			 */

			'ltPropStartWeekDay': Lyte.attr( 'number', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'startWeekDay', 1 )
			} ),
			'navYield': Lyte.attr( 'boolean', { 
				'default': false 
			} ),
			'selectDate': Lyte.attr( 'boolean', { 
				'default': true 
			} ),
			'currentDatechanged': Lyte.attr( 'number', { 
				'default': 0 
			} ),

			/**
			 * @componentProperty {boolean} ltPropFillRows
			 * @default true
			 * @version 1.0.2
			 * 
			 */

			'ltPropFillRows': Lyte.attr( 'boolean', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'fillRows', true ) 
			} ),

			/**
			 * @componentProperty {number} ltPropNumberOfRows
			 * @version 1.0.2
			 * @default 6
			 */

			'ltPropNumberOfRows': Lyte.attr( 'number', { 
				'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'numberOfRows', 6 )
			} ),
			'callFrmDidcnct' : Lyte.attr('boolean',{"default" : false}),
			'monthDD' : Lyte.attr("object"),
			'yearDD' : Lyte.attr("object"),
			'years' :Lyte.attr("array",{"default":[1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100]}),

			/**
			 * @componentProperty {default|dropdown|drilldown} ltPropHeaderType
			 * @default default
			 * @version 1.0.2
			 */

			'ltPropHeaderType' : Lyte.attr( "string", { "default": _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'headerType', 'default' ) } ),

			'ltPropDropdown': Lyte.attr( 'object', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'dropdown', 
				{
					'callout': true
				} 
			) } ),

			'cords': Lyte.attr( 'object', { default: {} } ),
			'start': Lyte.attr( 'number' ),
			'prev': Lyte.attr( 'boolean' ),
			'tt': Lyte.attr( 'boolean', { 'default': true } ),
			'showToday': Lyte.attr( 'boolean', { 'default': true } ),

			'monthViewTableArray': Lyte.attr( 'array', { 'default': [] } ),

			'ltPropBodyYield': Lyte.attr( 'boolean', { 'default': false } ),

			'ltPropShowToday': Lyte.attr( 'boolean', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'showToday', true ) } ),

			'ltPropI18n': Lyte.attr( 'boolean', { 'default': _lyteUiUtils.resolveDefaultValue( 'lyte-calendar', 'I18n', false ) } )

		}
	},

	toDate : function(){
		if( this.isHavingTimezone ){
			return new Date( $L.moment().format( 'MM/DD/YYYY' ) );
		}
		return new Date();
	},

	moment : function( arg1, arg2, arg3 ){
		var timezone = this.isHavingTimezone;
		if( timezone ){// for test case failure
			if( arg3 ){
				arg3.ignore_timezone = timezone;
			} else{
				arg3 = { ignore_timezone : timezone };
			}
			return $L.moment( arg1, arg2, arg3 );
		} else{
			if( arg2 ){ // for test case failure
				return $L.moment( arg1, arg2 );
			}
			return $L.moment( arg1 );
		}
	},

	changeBodyContainerClass: function() {
		var container = this.$node.querySelector( '.lyteCalTableContainer' ),
		viewType = this.getData( 'viewType' );

		if( viewType === 'dateView' ) {
			container.classList.remove( 'lyteDrillCalMonthView' );
			container.classList.remove( 'lyteDrillCalYearView' );
		}
		else if( viewType === 'monthView' ) {
			container.classList.add( 'lyteDrillCalMonthView' );
			container.classList.remove( 'lyteDrillCalYearView' );
		}
		else if( viewType === 'decadeView' ) {
			container.classList.remove( 'lyteDrillCalMonthView' );
			container.classList.add( 'lyteDrillCalYearView' );
		}
	}.observes( 'viewType' ),

	changeDaysOfWeek: function() {
		var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ], 
		startDay = this.getData( 'ltPropStartWeekDay' ), i, result = [] ;
		for( i = 0; i < 7; i++ ) { 
			result.push( days[ ( i + startDay ) % 7 ] );
		}

		this.setData( 'daysOfWeek', result );
		
	},

	isYYFormat: function() {
		var format = this.getData( 'ltPropFormat' ),
		rYY = /\byy\b/ig;

		return rYY.test( format );
	},

	outsideBoundary: function( calStartDate ) {
		var calculatedYear = calStartDate.getFullYear(),
		current = this.toDate(),
		currentYear = current.getFullYear(),
		diff = calculatedYear - currentYear,
		dateBounds = this.isMomentSupported ? $L.moment() : { uL: 19, lL: 80 };

		if( diff > dateBounds.uL ) {
			return true;
		}
		else if( diff < -dateBounds.lL ) {
			return true;
		}	
		
	},

	didDestroy: function() {
		delete this.$node.revertToToday;
	},

	setMonthAndYearDropdown : function(){
		if(!this.getData('navYield') && this.isDropdownHeader() && this.getData('monthDD') && this.getData('yearDD')){
			var monthHeaders = this.getData('monthHeader').split( ' ' ),
			format = this.getData( 'ltPropMonthHeaderFormat' ), 
			lmd = /MMMM YYYY/ig,
			ld = /MMM YYYY/ig,
			monthArray = [],
			monthNames;
			if(arguments[0].item == "callFrmDidcnct"){
				if(lmd.test( format )){
					monthNames = this.getData('monthNames');
				}
				else if(ld.test(format)){
					monthNames = this.getData('shortHands');
				}
				for(var i=0;i<monthNames.length; i++){
					monthArray[i] = _lyteUiUtils.i18n(monthNames[i]);
				}
				this.setData('monthNames',monthArray);
			}
			// this.getData('monthDD').component.setData('ltPropOptions',monthArray);
			this.getData('monthDD').component.setData('ltPropSelected',monthHeaders[0]);
			this.getData('yearDD').component.setData('ltPropSelected',monthHeaders[1]);
		}
	}.observes('monthHeader','callFrmDidcnct'),

	startWeekDayObserver: function() {
		this.changeDaysOfWeek();
	}.observes( 'ltPropStartWeekDay' ),

	monthHeaderObserver: function() {
		this.buildDateViewHeader();
	}.observes( 'monthNames.[]' ),

	getMonthHeader: function() {
		var format = this.getData( 'ltPropMonthHeaderFormat' ), 
		lmd = /MMMM YYYY/ig,
		ld = /MMM YYYY/ig,
		retval = "", monthArray;

		if( lmd.test( format ) ) {
			monthArray = this.getData( 'monthNames' )
			retval = _lyteUiUtils.i18n( monthArray[ this.getData( 'viewDate' ).getMonth() ] ) + " " + this.getData( 'viewDate' ).getFullYear();
		}
		else if( ld.test( format ) ) {
			monthArray = this.getData( 'shortHands' )
			retval = _lyteUiUtils.i18n( monthArray[ this.getData( 'viewDate' ).getMonth() ] ) + " " + this.getData( 'viewDate' ).getFullYear();
		}

		return retval;
	},

	revert: function( event ) {
		var from = new Date( this.getData( 'viewDate' ).getTime() ), 
		curDate = this.toDate();


		curDate.setDate(1);

		var to = new Date( curDate.getTime() );

		this.setData( 'viewDate', curDate );
		this.setAndBuildView( 'dateView', event );
		this.setData( 'showToday', false );
		if( this.getMethods( 'onNavigate' ) 
			&& ( from.getMonth() !== to.getMonth() 
			|| from.getFullYear() !== to.getFullYear() ) 
		) {
			this.executeMethod( 'onNavigate', event, this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) ), this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) ) ,this );
		}
	},

	getDateFromFormat: function( dateObj, format ) {
		if( this.isMomentSupported ) {
			return this.getDateStringFromMoment( dateObj, format );
		}
		else {
			return this.getDateStringManually( dateObj, format );
		}
	},

	getDateStringFromMoment: function( dateObj, format ) {
		format = this.getRelevantFormat( format );

		return this.moment( dateObj ).format( format );
	},

	resolveConflicts: function( format ) {
		var match = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/.exec( format ),
		index = ( match || {} ).index,
		matchLength = ( match || [] )[ 0 ].length || 0;

		if( !isNaN( index ) ) {
			return format.substring( 0, index + matchLength ) + ( format.substring( index + matchLength ) || '' ).toUpperCase();
		}

		return format.toUpperCase();
	},

	isConflictingFormat: function( format ) {
		var rdate = /(\bd\b|\bdd\b|\bddd\b|\bdddd\b)/ig,
		match = format.match( rdate ) || [];

		return match.length > 1;
	},

	getRelevantFormat: function( format ) {

		if( this.isConflictingFormat( format ) ) {
			return this.resolveConflicts( format );
		}

		return format.toUpperCase();
	},

	getDateStringManually: function( dateObj, format ) {
		var date = dateObj.getDate(), year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, monthArray,
		sd = /(MM).+(DD).+(YYYY)/ig,
		dmy = /(DD).+(MM).+(YYYY)/ig,
		ld = /(MMM|DD|YYYY).+(MMM|DD|YYYY).+(YYYY|MMM|DD)/ig,
		lmd = /(MMMM|DD|YYYY).+(MMMM|DD|YYYY).+(YYYY|MMMM|DD)/ig,
		iso =/(YYYY).+(MM).+(DD)/ig;

		format = format.toUpperCase();
		
		if( month < 10 ) {
			month = '0' + month
		}

		if( date < 10 ) {
			date = '0' + date
		}

		if( lmd.test( format ) ) {
			monthArray = [ 
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
			]
			format = format.replace( 'MMMM', monthArray[ month - 1 ] );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( ld.test( format ) ){
			monthArray=[ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
			format = format.replace( 'MMM', monthArray[ month - 1 ] );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( iso.test( format ) ){
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( sd.test( format ) ) {
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		else if( dmy.test( format ) ) {
			format = format.replace( 'MM', month );
			format = format.replace( 'DD', date );
			format = format.replace( 'YYYY', year );
		}
		
		return format
	},

	isLeapYear: function( year ) {
		return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
	},

	getNumber: function(month,year) {
		var daysinmonths = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		if( this.isLeapYear.call( this, year ) && month == 1 ) {
			return 29;
		}
		else{
			return daysinmonths[ month ];
		}
	},

	showtoday: function() {
		var curDate = this.toDate();

		if( curDate.getMonth() != this.getData('viewDate').getMonth() || curDate.getYear() != this.getData('viewDate').getYear() ) {
			this.setData( 'showToday', true );
		}
		else {
			this.setData( 'showToday', false );
		}
	},

	reset: function( cur ) {
		cur.setHours( 0 );
		cur.setMinutes( 0 );
		cur.setSeconds( 0 );
		cur.setMilliseconds( 0 );
	},

	checkDate: function( current ) {
		var start = this.getData( 'ltPropMinDate' ) || '', 
		end = this.getData( 'ltPropMaxDate' ) || '',
		startDate, endDate;

		this.reset( current );

		if( start === '' && end === '' ) {
			return true;
		}
		else if( start !== '' && end === '' ) {
			startDate = this.stringToDate( start, this.getData( 'ltPropFormat' ) );
			this.reset( startDate );
			
			if( current >= startDate ) {
				return true;
			}
		}
		else if( start !== '' && end !== '' ) {
			startDate = this.stringToDate( start, this.getData( 'ltPropFormat' ) );
			this.reset( startDate );

			endDate = this.stringToDate( end, this.getData( 'ltPropFormat' ) );
			this.reset( endDate );

			if( current >= startDate && current <= endDate ) {
				return true;
			}
		}
		else {
			endDate = this.stringToDate( end, this.getData( 'ltPropFormat' ) );
			this.reset( endDate );

			if( current <= endDate ) {
				return true;
			}
		}

		return false;
	},

	numberOfRowsChange: function() {
		// https://stackoverflow.com/questions/19727905/in-javascript-is-it-expensive-to-use-try-catch-blocks-even-if-an-exception-is-n
		// No penalty in chrome >= 60
		var numberOfRows = this.getData( 'ltPropNumberOfRows' );

		try {
			if( numberOfRows < 5 ) {
				throw "Calendar failed to render. The number of rows should be greater than 4.";
			}
		}
		catch( e ) {
			console.error( e );
			return ;
		}

		this.setDatesFunction();
	}.observes( 'ltPropNumberOfRows' ),

	setDates: function() {
		this.setDatesFunction();
	}.observes( 
		'ltPropStartDate', 
		'ltPropEndDate', 
		'changeData', 
		'ltPropMinDate', 
		'ltPropMaxDate',
		'ltPropFormat',
		'ltPropStartWeekDay'
	),

	getNumberOfFirstRowDates: function( firstday ) {
		var startDayOfMonth = this.getData( 'ltPropStartWeekDay' ), 
		firstRowDays;

		if( firstday == 0 ) {
			firstRowDays = startDayOfMonth === 0 ? 7 : startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				firstRowDays = startDayOfMonth - firstday;
			}
			else {
				firstRowDays = 7 - ( firstday - startDayOfMonth );
			}
		}

		return firstRowDays;

	},

	getNumberToSubtract: function( firstday ) {
		var numberToSubtract, startDayOfMonth = this.getData( 'ltPropStartWeekDay' );

		if( firstday == 0 ) {
			numberToSubtract = startDayOfMonth == 0 ? 0 : 7 - startDayOfMonth;
		}
		else {
			if( firstday < startDayOfMonth ) {
				numberToSubtract = 7 - ( startDayOfMonth - firstday );
			}
			else {
				numberToSubtract = firstday - startDayOfMonth;
			}
		}

		return numberToSubtract;
	},

	getFirstDay: function( date, day ) {
		var first;

		first = date - Math.floor( date / 7 ) * 7 - 1;
		first = day - first;

		if( first < 0 ){
			first = 7 - first;
		}

		return first;
	},

	getRemainingDays: function( numberOfDaysInMonth, firstRowDays ) {
		var rem = numberOfDaysInMonth - firstRowDays;
		rem = rem - 28;

		return rem;
	},

	inc: function( rem, num ) {
		if( rem > 0 && num == 6 ) {
			return 7; 
		}

		return num;
	},

	setDatesFunction: function() {
		// Number of rows in the table
		var numberOfRows = this.getData( 'ltPropNumberOfRows' ), 
		fillRows = this.getData( 'ltPropFillRows' ), 
		format = this.getData( 'ltPropFormat' ),
		reachedNextMonth = false, 
		result = [],
		cur = this.getData( 'viewDate' ), 
		day = cur.getDay(),
		date = cur.getDate(), 
		firstday =  this.getFirstDay( date, day ),
		month = cur.getMonth(),
		year = cur.getFullYear(),
		numberOfDaysInMonth = this.getNumber( month, year ),
		firstRowDays = this.getNumberOfFirstRowDates( firstday ),
		rem = this.getRemainingDays( numberOfDaysInMonth, firstRowDays );


		numberOfRows = this.inc( rem, numberOfRows );

		var calStartDate = new Date( month + 1 + '/1/' + year ), 
		numberToSubtract = this.getNumberToSubtract( firstday );

		calStartDate.setDate( calStartDate.getDate() -  numberToSubtract );
		
		var todayDate = this.toDate(), firstRow;

		// Construct array
		for( var i = 0; i < numberOfRows; i++ ) {

			// This is to ensure that we don't create an empty row when we reach the next month when fillRows is false.
			if(reachedNextMonth) {
				break;
			}

			result.push( [] );

			for( var j = 0; j < 7; j++ ) {
				if( !fillRows && month !== calStartDate.getMonth() ) {
					result[i].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}
				else if( fillRows && this.isYYFormat() && this.outsideBoundary( calStartDate ) ) {
					result[ i ].push( { emptyBlock: true } );
					calStartDate.setDate( calStartDate.getDate() + 1 );

					if( i != 0 ) {
						reachedNextMonth = true;
					}

					continue;
				}

				var clsname = 'lyteCalCdate', newMonth = calStartDate.getMonth(),
				curDate = new Date( this.getData( 'viewDate' ).getTime() ),
				curMonth = curDate.getMonth(),
				ndate = calStartDate.getDate(),
				tdate = this.getData( 'ltPropCurrentDate' ) ? this.stringToDate( this.getData( 'ltPropCurrentDate' ), this.getData( 'ltPropFormat' ) ) : 'nodate',
				nyear = calStartDate.getYear(),
				isInRange = this.checkDate( calStartDate ),
				isPresent = ( this.getData( 'ltPropMinDate' ) || "" ) !== "" || ( this.getData( 'ltPropMaxDate' ) || "" ) !== "";

				if( curMonth !== newMonth ) {
					clsname += ' lyteCalDiffMonth';

					if( !isPresent ) {
						clsname += ' lyteCalGray';
					}

					// Out of range in different month
					else if( !isInRange ) {
						clsname += ' lyteCalDisabled';
					}		
				}

				// Out of range in same month
				else if( isPresent 
					&& !isInRange ) {
					clsname += ' lyteCalDisabled';
				}

				if( tdate !== 'nodate' && tdate !== 'Invalid Date' && newMonth == tdate.getMonth() && tdate.getDate() == ndate && tdate.getYear() == nyear && this.getData( 'selectDate' ) ) {
					clsname += ' lyteCalSel'
				}

				if( todayDate.getMonth() === newMonth && todayDate.getDate() === ndate && todayDate.getYear() === nyear && this.getData( 'selectDate' ) ) {
					clsname += ' lyteCalToday'
				}

				// Add Classes for weekends
				if( calStartDate.getDay() == 0 || calStartDate.getDay() == 6 ) {
					clsname += ' lyteCalWeekend'
				}

				// Store in array and increment date by 1
				clsname += ' lyteCalTableCell';
				var obj = {};
				obj.date = calStartDate.getDate();
				obj.clsname = clsname;
				obj.val = this.getDateFromFormat.call( this, calStartDate, this.getData( 'ltPropFormat' ) );
				result[ i ].push( obj );
				// Lyte.arrayUtils( this.getData( 'matrix' )[ i ], 'push', obj )
				calStartDate.setDate( calStartDate.getDate() + 1 );
			}

		}

		this.setData( 'matrix', result );

	},

	executeViewDateChanges : function() {
		if( this.getMethods( 'onViewdateChange' ) ) {
			this.executeMethod( 'onViewdateChange', this, this.getData( 'viewDate' ) );
		}
	}.observes( 'viewDate' ),

	/** 
	 * get proper month from user defined value
	 * @param {String} mon - The current month
	 *
	 */

	getProperMonth: function( val ) {
		var sm = {
			'jan': 1,
			'feb': 2,
			'mar': 3,
			'apr': 4,
			'may': 5,
			'jun': 6,
			'jul': 7,
			'aug': 8,
			'sep': 9,
			'oct': 10,
			'nov': 11,
			'dec': 12
		}, lg = {
			'january': 1,
			'february': 2,
			'march': 3,
			'april': 4,
			'may': 5,
			'june': 6,
			'july': 7,
			'august': 8,
			'september': 9,
			'october': 10,
			'november': 11,
			'december': 12
		}, ret

		val = val.toLowerCase();
		ret = sm[ val ] || lg[ val ];

		if( !ret && ret !== 0 ) {
			return parseFloat( val ) - 1;
		}

		return ret-1;
	},

	/**
	 * Checks if the date is a proper date for the corresponding month and year
	 * @param {Number} year - The year of the date object
	 * @param {Number} month - The month of the date object
	 * @param {Number} date - The date value of the date object
	 *
	 */

	isProperDate: function( year, month, date ) {
		var daysInMonth = this.getNumber( month, year );

		if( date <= daysInMonth ) {
			return true;
		}

		return false;
	},


	/**
	 * Return the date object for the given string and format
	 * @param {String} dateString - The current date in the form of a string
	 * @param {String} format - The format of the dateString
	 *
	 */

	getDateObjFromString: function( dateString, format ) {
		try {
			var vals = dateString.match( /([\da-z]+)/ig ), year, month,
			format = format.toUpperCase(),
			sep = format.match( /([a-z]+)/ig ),
			date = this.toDate(), i = 0, order=['Y', 'M', 'D'];
			date.setDate(1);  //initialize the day to be 1 to avoid error for eg: 30 Feb if passed will generate 1 Mar as result.

			if( vals.length !== 3 ) {
				return 'Invalid Date';
			}

			while( i < sep.length ) {
				var ind = this.getOrderIndex(sep, order[ i ] );

				if( i == 0 ) {
					date.setFullYear( year = vals[ ind ] );
				}
				else if( i == 1 ) {
					month = this.getProperMonth( vals[ ind ] );

					if( month < 0 || month > 11 ) {
						return 'Invalid Date';
					}

					date.setMonth( month );
				}
				else if( i == 2 ) {
					if( !this.isProperDate( year, month, vals[ ind ] ) ) {
						return 'Invalid Date';
					}

					date.setDate( vals[ ind ] );
				}

				if( date.toString() === 'Invalid Date' ) {
					return date.toString();
				}

				i++;
			}

			return date;	
		}
		catch( e ) {
			return 'Invalid Date';
		}
	},

	getDateObjFromMoment: function( dateString, format ) {
		var momentObj, ret;

		format = this.getRelevantFormat( format );

		if( !dateString ) {
			return 'Invalid Date';
		} 

		try {
			momentObj = this.moment( dateString, format );
			ret = momentObj.getDObj();
		}
		catch( e ) {
			ret = 'Invalid Date';
		}

		if( Object.prototype.toString.call( ret ) === '[object Date]' ) {
			if( isNaN( ret.getTime() ) ) {
				ret = 'Invalid Date';
			}
		}

		return ret || 'Invalid Date';
	},

	/**
	 * Convert the string to date object based on the format
	 * @param {String} cur - The current date of the user passed
	 * @param {String} format - The format of the dates
	 *
	 */

	stringToDate: function( cur, format ) {
		var ret;

		cur = this.convertToEnglish( cur );

		if( this.isMomentSupported ) {
			ret = this.getDateObjFromMoment( cur, format );
		}
		else {
			ret = this.getDateObjFromString( cur, format );
		}

		return ret;
	},

	convertToEnglish: function( cur ) {
		var i18n = this.getData( 'ltPropI18n' ),
		format = this.getData( 'ltPropFormat' );

		if( i18n ) {
			return this.moment( cur, format, { i18n : true } ).format( format );
		}

		return cur;
	},

	getEnglishShorthand: function( cur ) {
		var months = this.getShortHands(), proper = -1, max = 0,
		shortHands = this.getData( 'shortHands' );

		for( var i = 0; i < months.length; i++ ) {
			if( !!~cur.indexOf( months[ i ] ) && months[ i ].length > max ) {
				proper = i;
				max = months[ i ].length;
			}
		}

		if( proper !== -1 ) {
			cur = cur.replace( months[ proper ], this.getProperShortHand( shortHands[ proper ] ) );
		}

		return cur;
	},

	getShortHands: function() {
		var shortHands = this.getData( 'shortHands' ), res = [];

		for( var i = 0; i < shortHands.length; i++ ) {
			res.push( _lyteUiUtils.i18n( shortHands[ i ] ) );
		}

		return res;
	},

	getProperShortHand: function( val ) {
		if( val === 'short.may' ) {
			return 'May';
		}

		return val;
	},

	getEnglishStandard: function( cur ) {
		var months = this.getStandardMonths(), englishMonths = this.getData( 'monthNames' ),
		proper = -1, max = 0;

		for( var i = 0; i < months.length; i++ ) {
			if( !!~cur.indexOf( months[ i ] ) && months[ i ].length > max ) {
				proper = i;
				max = months [ i ].length;
			}
		}

		if( proper !== -1 ) {
			cur = cur.replace( months[ proper ], englishMonths[ proper ] );
		}

		return cur;
	},

	getStandardMonths: function() {
		var monthNames = this.getData( 'monthNames' ), res = [];

		for( var i = 0; i < monthNames.length; i++ ) {
			res.push( _lyteUiUtils.i18n( monthNames[ i ] ) );
		}

		return res;
	},

	getOrderIndex : function(objArr, match){
		for(var i = 0; i < objArr.length; i++){
			if(objArr[i].charAt(0) === match){
				return i;
			}
		}
		return -1;
	},

	buildYears: function() {
		var yearBounds = this.buildMinAndMaxYear(),
		maxYear = yearBounds.maxYear,
		minYear = yearBounds.minYear, i, years = [];

		for( i = minYear; i <= maxYear; i++ ) {
			years.push( i.toString() );
		}

		this.setData( 'years', years );
	},

	buildMinAndMaxYear: function() {
		var currentDate = this.toDate(), 
		isYYFormat = this.isYYFormat(),
		currentYear = currentDate.getFullYear(),
		dateBounds = this.isMomentSupported ? $L.moment() : { uL: 19, lL: 80 },
		valueToAdd = dateBounds.uL,
		valueToRemove = dateBounds.lL;

		return {
			maxYear: isYYFormat ? currentYear + valueToAdd : 2100,
			minYear: isYYFormat ? currentYear - valueToRemove : 1900
		};

	},

	setAndBuildView: function( viewType, event, preventCallback ) {
		var oldView = this.getData( 'viewType' ),
		newView = viewType;

		this.setData( 'viewType', viewType );

		if( viewType === 'monthView' ) {
			this.buildMonthView();
		}
		else if( viewType === 'decadeView' ) {
			this.buildDecadeView();
		}
		else if( viewType === 'dateView' ) {
			this.buildDateView();
		}

		// pressing the today button should not fire the viewChange when it is in the dateview
		if( !preventCallback && ( oldView !== newView ) ) {
			if( this.getMethods( 'onViewChange' ) ) {
				this.executeMethod( 'onViewChange', event, viewType, this );
			}
		}
		
	},

	buildDateView: function() {
		this.buildDateViewHeader();
		this.buildDateViewContent();
		this.showtoday();
	},

	buildDateViewHeader: function() {
		this.setData( 'monthHeader', this.getMonthHeader() );
	},

	buildDateViewContent: function() {
		this.setDatesFunction();
	},

	buildMonthView: function() {
		this.buildMonthViewHeader();
		this.buildMonthViewContent();
	},

	buildMonthViewHeader: function() {
		var viewDate = this.getData( 'viewDate' ),
		year = viewDate.getFullYear();

		this.setData( 'currentYear', year );
	},

	buildMonthViewContent: function() {
		var systemValues = this.getData( 'monthSystemValues' ),
		displayValue = this.getData( 'shortHands' ),
		rowCount = 3, columnCount = 4,
		rowIterator = 0, columnIterator,
		result = [], indexOfMonth;

		for( ; rowIterator < rowCount; rowIterator++ ) {
			result.push( [] );

			for( columnIterator = 0; columnIterator < columnCount; columnIterator++ ) {
				indexOfMonth = ( rowIterator * columnCount ) + columnIterator;

				result[ rowIterator ].push( 
					{
						displayValue: _lyteUiUtils.i18n( displayValue[ indexOfMonth ] ),
						systemValue: systemValues[ indexOfMonth ],
						class: this.getProperClassForMonthView( indexOfMonth )
					} 
				);
			}
		}

		this.setData( 'monthViewData', result );
	},

	getProperClassForMonthView: function( month ) {
		var viewDate = this.getData( 'viewDate' ),
		viewYear = viewDate.getFullYear(),
		curMonth = this.getCurrentMonth(),
		currentYear = this.getCurrentYear(),
		ret = 'lyteCalTableCell';

		ret += currentYear === viewYear && month === curMonth ? ' lyteDrillCalCurrentMonth': '';

		return ret;
	},

	getCurrentYear: function() {
		var date = this.toDate();

		return date.getFullYear();
	},

	getCurrentMonth: function() {
		var date = this.toDate();

		return date.getMonth();
	},

	buildDecadeView: function() {
		this.buildDecadeViewHeader();
		this.buildDecadeViewContent();
	},

	buildDecadeViewHeader: function() {
		var viewDate = this.getData( 'viewDate' ),
		currentYear = viewDate.getFullYear(),
		numberOfYearsFromDecadeStart = currentYear % 10,
		decadeStart = currentYear - numberOfYearsFromDecadeStart,
		decadeEnd = decadeStart + 9;

		this.setData( 'decadeStart', decadeStart );
		this.setData( 'decadeEnd', decadeEnd );
	},


	buildDecadeViewContent: function() {
		var viewDate = this.getData( 'viewDate' ),
		currentYear = viewDate.getFullYear(),
		numberOfYearsFromDecadeStart = currentYear % 10,
		decadeStart = currentYear - numberOfYearsFromDecadeStart,
		yearBounds = this.buildMinAndMaxYear(),	
		isYYFormat = this.isYYFormat(),
		minYear = yearBounds.minYear, maxYear = yearBounds.maxYear,	
		rows = 3, columns = 4, i, j, result = [], year;

		for( i = 0; i < rows; i++ ) {
			result.push( [] );

			for( j = 0; j < columns; j++ ) {

				year = ( decadeStart + i * 4 + j ) - 1;

				if( isYYFormat ) {
					result[ i ].push( 
						( year > maxYear || year < minYear ) ? this.emptyCell() : this.currentYearCell( year, decadeStart )
					);
				}
				else {
					result[ i ].push( this.currentYearCell( year, decadeStart ) );
				}
				
			}
		}

		this.setData( 'decadeViewData', result );
	},

	emptyCell: function() {
		return {
			emptyBlock: true
		};
	},

	currentYearCell: function( year, decadeStart ) {
		var decadeEnd = decadeStart + 9,
		classVal = [], currentYear = this.getCurrentYear();

		if( year < decadeStart || year > decadeEnd ) {
			classVal.push( 'lyteCalOtherDecadeCell' );
		}

		if( currentYear === year ) {
			classVal.push( 'lyteDrillCalCurrentYear' );
		}


		return {
			year: year,
			emptyBlock: false,
			class: classVal.join( ' ' )
		}
	},

	buildNavigationalUI: function() {
		var type = this.getData( 'ltPropHeaderType' );

		if( this.isDropdownHeader() ) {
			this.buildYears();	
		}
	},

	initFn: function() {
		var self = this;

		this.addContainerClass();
		this.checkForMoment();		
		this.buildViewDate();
		this.changeDaysOfWeek();
		this.initializeCalendar();

		// set revert
		this.$node.revertToToday = function() {
			self.revert();
		};

		this.$node.revertToSelected = function() {
			self.revertToSelected();
		}

		// This is being internally used by CRM for their calendar
		this.$node.getDateArray = function( viewDate ) {
			self.setData( 'viewDate', viewDate );
			self.buildDateViewContent();

			return self.getData( 'matrix' );
		}

	}.observes( 'currentDatechanged' ).on( 'init' ),

	revertToSelected: function() {
		var from = new Date( this.getData( 'viewDate' ).getTime() ), 
		cur = this.getData( 'ltPropCurrentDate' ),
		format = this.getData( 'ltPropFormat' ),
		curDate = cur ? this.stringToDate( cur, format ) : this.toDate(),
		today = this.toDate(), event = {};

		if( curDate === 'Invalid Date' ) {
			return ;
		}
		
		curDate.setDate(1);

		var to = new Date( curDate.getTime() );

		this.setData( 'viewDate', curDate );
		this.setAndBuildView( 'dateView', event );

		if( to.getMonth() === today.getMonth() && to.getFullYear() === today.getFullYear() ) {
			this.setData( 'showToday', false );	
		}
		else {
			this.setData( 'showToday', true );
		}
		
		if( this.getMethods( 'onNavigate' ) 
			&& ( from.getMonth() !== to.getMonth() 
			|| from.getFullYear() !== to.getFullYear() ) 
		) {
			this.executeMethod( 'onNavigate', event, this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) ), this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) ) ,this );
		}
	},

	addContainerClass: function() {
		var type = this.getData( 'ltPropHeaderType' ),
		classVal = [ 'lyteCalendarPopup' ];

		if( type === 'drilldown' ) {
			classVal.push( 'lyteDrillDownCalendar' );
		}

		this.setData( 'containerClass', classVal.join( ' ' ) );
	},

	checkForMoment: function() {
		this.isMomentSupported = $L && $L.moment ? true : false; 
		this.isHavingTimezone = this.isMomentSupported && !!$L.moment()._timezone;
	},

	buildViewDate: function() {
		var viewDate = this.getData( 'ltPropCurrentDate' ) ? 
						this.stringToDate( this.getData( 'ltPropCurrentDate' ), this.getData( 'ltPropFormat' ) ) 
						: this.toDate();

		if( viewDate === 'Invalid Date' ) {
			viewDate = this.toDate();
		}

		viewDate.setDate( 1 );
		this.setData( 'viewDate', viewDate );
	},

	initializeCalendar: function() {
		this.buildNavigationalUI();
		this.setAndBuildView( 'dateView', undefined, true );
	},


	didConnect : function(){

		if( !this.getData('navYield') && this.isDropdownHeader() ) {
			this.setData( 'monthDD', this.getMonthDropdown() );
			this.setData( 'yearDD', this.getYearDropdown() );
			this.setData( 'callFrmDidcnct', true );
		}

	},


	isDropdownHeader: function() {
		var type = this.getData( 'ltPropHeaderType' );

		return type === 'picklist' || type === 'dropdown';
	},

	getYearDropdown: function() {
		var type = this.getData( 'ltPropHeaderType' ), 
		ret = this.$node.querySelector( '.lyteCalYearDD' );

		if( type === 'picklist' ) {
			ret = ret.querySelector( 'lyte-dropdown' ); 
		}

		return ret;
	},

	getMonthDropdown: function() {
		return this.$node.querySelector( '.lyteCalMonthDD' );
	},

	didDestroy: function() {
		delete this.$node.revertToToday;
	},

	removeClass: function() {
		var node = this.$node.querySelector( '.lyteCalSel' );

		if( node ) {
			node.classList.remove( 'lyteCalSel' );
		}
	},

	changeViewDate: function( val ) {
		var cur = this.getData( 'ltPropCurrentDate' ),
		type = this.getData( 'ltPropHeaderType' );

		if( this.getData( 'preventObs' ) ) {
			return ;
		}

		// Current Date is set to empty
		if( !cur ) {
			this.removeClass();
			return ;
		}

		// Bad current date
		if( this.stringToDate( cur, this.getData( 'ltPropFormat' ) ) === 'Invalid Date' ) {
			this.removeClass();
			return ;
		}

		var val = this.getData( 'ltPropCurrentDate' );
		var newDate = this.stringToDate( val, this.getData( 'ltPropFormat' ) );
		newDate.setDate( 1 );

		if( type === 'dropdown' && !this.isInRange( newDate ) ) {
			return ;
		}

		this.setData( 'viewDate', newDate );
		this.buildDateView();
	}.observes( 'ltPropCurrentDate' ),

	isInRange: function( date ) {
		var year = date.getFullYear();

		if( year >= 1900 && year <= 2100 ) {
			return true;
		}

		return false;
	},

	monthHeaderFormatObserver: function() {
		this.buildDateViewHeader();
	}.observes( 'ltPropMonthHeaderFormat' ),

	changeCurrentDate: function( set, val, event ) {
		var inter, to, from = new Date( this.getData( 'viewDate' ).getTime() ), 
		fromDate, toDate, formattedDate, format = this.getData( 'ltPropFormat' ),
		isYYFormat = this.isYYFormat();

		format = this.getRelevantFormat( format );

		if( set === 'Y' ) {
			inter = this.getData( 'viewDate' );
			formattedDate = this.getDateFromFormat( inter, format );

			if( this.isMomentSupported ) {
				if( val > 0 ) {
					to = this.moment( formattedDate, format ).add( val, 'fullYear', isYYFormat ).getDObj();
				}
				else {
					to = this.moment( formattedDate, format ).add( val, 'fullYear', isYYFormat ).getDObj();
				}
			}
			else {
				inter.setYear( inter.getFullYear() + val )
				to = new Date( inter.getTime() )
			}
			
			this.setData( 'viewDate', to );
			this.buildDateView();
		}
		else if( set === 'M' ) {
			inter = this.getData( 'viewDate' );
			formattedDate = this.getDateFromFormat( inter, format );

			if( this.isMomentSupported ) {
				if( val > 0 ) {
					to = this.moment( formattedDate, format ).add( val, 'month', isYYFormat ).getDObj();
				}
				else {
					to = this.moment( formattedDate, format ).add( val, 'month', isYYFormat ).getDObj();
				}
			}
			else {
				inter.setMonth( inter.getMonth() + val )
				to = new Date( inter.getTime() )
			}
			
			this.setData( 'viewDate', to )
			this.buildDateView();
		}

		fromDate = this.getDateFromFormat( from, this.getData( 'ltPropFormat' ) );
		toDate = this.getDateFromFormat( to, this.getData( 'ltPropFormat' ) );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this )
		}
	},

	changeCurrentYear: function( val, event ) {
		var viewDate = this.getData( 'viewDate' ),
		isMomentSupported = this.isMomentSupported,
		fullYear = viewDate.getFullYear(),
		format = this.getData( 'ltPropFormat' ),
		isYYFormat = this.isYYFormat(),
		formattedDate = this.getDateFromFormat( viewDate, format ),
		fromDate = formattedDate,
		toDate;

		if( isMomentSupported ) {
			format = this.getRelevantFormat( format );
			viewDate = this.moment( formattedDate, format ).add( val, 'fullYear', isYYFormat ).getDObj();
		}
		else {
			viewDate.setFullYear( fullYear + val );
		}

		toDate = this.getDateFromFormat( viewDate, format );
		this.setData( 'viewDate', viewDate );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this );
		}
	},

	changeCurrentDecade: function( val, event ) {
		var viewDate = this.getData( 'viewDate' ),
		format = this.getData( 'ltPropFormat' ),
		isMomentSupported = this.isMomentSupported,
		formattedDate = this.getDateFromFormat( viewDate, format ),
		isYYFormat = this.isYYFormat(),
		currentYear = viewDate.getFullYear(),
		fromDate = formattedDate,
		toDate;

		format = this.getRelevantFormat( format );

		if( isMomentSupported ) {
			viewDate = this.moment( formattedDate, format ).add( val * 10, 'fullYear', isYYFormat ).getDObj(); 
		}
		else {
			viewDate.setFullYear( currentYear + 10 * val );
		}

		toDate = this.getDateFromFormat( viewDate, format );
		this.setData( 'viewDate', viewDate );

		if( this.getMethods( 'onNavigate' ) ) {
			this.executeMethod( 'onNavigate', event, fromDate, toDate, this );
		}
	},

	/** 
	 * Get the proper calendar date item that was clicked
	 * @param {Element} elem - represents the element that was clickedd
	 *
	 */
	getProper: function( elem ) {
		while( elem 
			&& !elem.classList.contains( 'lyteCalTableCell' ) 
		) {
			elem = elem.parentElement;
		}

		return elem;
	},

	convertToLang: function( val ) {
		var i18n = this.getData( 'ltPropI18n' ),
		format = this.getData( 'ltPropFormat' );

		if( i18n ) {
			return this.moment( val, format ).i18N( format );
		}

		return val;
	},

	actions: {
		changeToMonthView: function( event ) {
			this.setAndBuildView( 'monthView', event );
			this.setData( 'showToday', false );
		},

		changeToDecadeView: function( event ) {
			this.setAndBuildView( 'decadeView', event );
			this.setData( 'showToday', false );
		},

		// Detecting a one finger swipe
		record: function( event ) {
			// This is stupid
			this.setData( 'prev', false );

			if( event.touches.length > 1 ) {
				this.setData( 'prev', true );

				return ;
			}

			var touch = event.targetTouches[ 0 ],
			cords = {
				x: touch.clientX,
				y: touch.clientY
			},
			start = new Date().getTime();

			this.setData( 'cords', cords );
			this.setData( 'start', start );
		},

		decide: function( event ) {
			var prev = this.getData( 'prev' );

			// prev will be false only when you do a single finger swipe
			// Multi finger swipes return out of execution
			if( prev ) {
				return ;
			}

			var start = this.getData( 'cords' ),
			x = start.x, y = start.y,
			touch = event.changedTouches[ 0 ],
			diffX = x - touch.clientX,
			diffY = y - touch.clientY,
			parent = this.$node.querySelector( '.lyteCalendarPopup' ),
			rect = parent.getBoundingClientRect(),
			width = rect.width,
			height = rect.height,
			xTolerance = width * 0.2,
			yTolerance = height * 0.15,
			begin = this.getData( 'start' ),
			delay = ( new Date().getTime() ) - begin;

			if( yTolerance > Math.abs( diffY ) 
				&& xTolerance < Math.abs( diffX ) 
				&& delay < 1000 
			) {
				if( diffX < 0 ) {
					this.changeCurrentDate( "M", -1, event );
				}
				else if( diffX > 0 ) {
					this.changeCurrentDate( "M", 1, event );
				}
			}
			
		},

		previous: function( val, event ) {
			var viewType = this.getData( 'viewType' );

			if( viewType === 'dateView' ) {
				this.changeCurrentDate( val, -1, event );
			}
			else if( viewType === 'monthView' ) {
				this.changeCurrentYear( -1, event );
				this.buildMonthView();
			}
			else if( viewType === 'decadeView' ) {
				this.changeCurrentDecade( -1, event );
				this.buildDecadeView();
			}
		},

		next: function( val, event ) {
			var viewType = this.getData( 'viewType' );

			if( viewType === 'dateView' ) {
				this.changeCurrentDate( val, 1, event );
			}
			else if( viewType === 'monthView' ) {
				this.changeCurrentYear( 1, event );
				this.buildMonthView();
			}
			else if( viewType === 'decadeView' ) {
				this.changeCurrentDecade( 1, event );
				this.buildDecadeView();
			}
			
		},

		yearSelected: function( event ) {
			var viewDate = this.getData( 'viewDate' ),
			target = this.getProper( event.target ),
			currentSelectedYear = target.getAttribute( 'data-date' );

			viewDate.setYear( currentSelectedYear );
			this.setData( 'viewDate', viewDate );
			this.setAndBuildView( 'monthView', event );
		},

		monthSelected: function( event ) {
			var viewDate = this.getData( 'viewDate' ),
			currentYear = viewDate.getFullYear(),
			target = this.getProper( event.target ),
			currentSelectedMonth = target.getAttribute( 'data-date' );

			currentSelectedMonth = this.getData( 'monthSystemValues' ).indexOf( currentSelectedMonth ) + 1;

			this.setData( 'viewDate', new Date( currentSelectedMonth + '/1/' + currentYear ) );
			this.setAndBuildView( 'dateView', event );
		},

		dateSelected: function( event ) {
			var target = this.getProper( event.target ), ele;
			if( event.button !== 0 ) {
				return ;
			}

			ele = this.$node.getElementsByClassName( 'lyteCalSel' );
			if( ele.length !== 0 ) {
				ele[0].classList.remove( 'lyteCalSel' );
			}

			this.setData( 'preventObs', true );
			this.setData( 'ltPropCurrentDate', this.convertToLang( target.getAttribute( 'data-date' ) ) );
			this.setData( 'preventObs', false );
			target.classList.add( 'lyteCalSel' );
			if( this.getMethods( 'onDateSelected' ) ) {
				this.executeMethod( 'onDateSelected', event, target.getAttribute( 'data-date' ), this );
			}
		},

		today: function( event ) {
			this.revert( event );
		}

	},

	methods : {
		optionSelected : function(prop,event,selected,comp){
			if(prop == 'M') {
				// var index = comp.getData('ltPropOptions').indexOf(selected);
				var index = this.getData('monthNames').indexOf(selected);

				this.changeCurrentDate(prop, index - this.getData('viewDate').getMonth(),event);
			}
			else if(prop == 'Y') {
				this.changeCurrentDate(prop, parseInt(selected) - this.getData('viewDate').getFullYear(),event);
			}
		},

		setClass: function( ev, comp ) {
			var drop = comp.childComp,
			rtl = _lyteUiUtils.getRTL(),
			dir = rtl ? 'right' : 'left',
			arrow = drop.querySelector( '.lyteArrow' );

			drop.classList.add( 'lyteCalendarDropdown' )
			arrow.style[ dir ] = '20%';

			if( rtl ) {
				arrow.style.left = 'auto';
			}
		}
	}
});

/**
 * @syntax nonYielded
 * <lyte-calendar></lyte-calendar>
 */

/**
 * @syntax yielded
 * <lyte-calendar>
 *     <template is="registerYield" yield-name="footer">
 *         <span>Footer Of The Calendar</span>
 *     </template>
 * </lyte-calendar>
 */
