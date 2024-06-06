/**
 * Renders a clock
 * @component lyte-clock
 * @version 3.5.0
 * @utility startTimer
 * @methods onTimerStart, onTimerEnd, onTimeReached
 */

Lyte.Component.register("lyte-clock", {
_template:"<template tag-name=\"lyte-clock\"> <template is=\"if\" value=\"{{expHandlers(ltPropType,'===','digital')}}\"><template case=\"true\"> <div class=\"lyteClkDigitalWrapper\"> <template is=\"if\" value=\"{{expHandlers(ltPropAppearance,'==','default')}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','watch')}}\"><template case=\"true\"> <div class=\"lyteClkDef lyteClkWatch lyteClkWatchDef\"> <span class=\"lyteClkWatchHrVal\">{{lyteUiClockPairNumber(ltPropHours)}}</span> <span class=\"lyteClkWatchColon\">:</span> <span class=\"lyteClkWatchMinVal\">{{lyteUiClockPairNumber(ltPropMinutes)}}</span> <span class=\"lyteClkWatchColon\">:</span> <span class=\"lyteClkWatchSecVal\">{{lyteUiClockPairNumber(ltPropSeconds)}}</span> <span class=\"lyteClkWatchAMPM lyteClkWatchDefAMPM\">{{ltPropTimeMeridiem}}</span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','forwardtimer')}}\"><template case=\"true\"> <div class=\"lyteClkDef lyteClkWatch lyteClkWatchDef\"> <template is=\"if\" value=\"{{ltPropShowHours}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkWatchHrVal\">{{lyteUiClockPairNumber(ltPropHours)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.hour}}</span> </div></template></template> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><span class=\"lyteClkTimerColon\">:</span></template></template> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkWatchMinVal\">{{lyteUiClockPairNumber(ltPropMinutes)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.minute}}</span> </div></template></template> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><span class=\"lyteClkTimerColon\">:</span></template></template> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkWatchSecVal\">{{lyteUiClockPairNumber(ltPropSeconds)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.second}}</span> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','timer')}}\"><template case=\"true\"> <div class=\"lyteClkDef lyteClkTimer lyteClkTimerDef\"> <template is=\"if\" value=\"{{ltPropShowYears}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerYears)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.year}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowMonths}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerMonths)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.month}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDays}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerDays)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.day}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowHours}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerHours)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.hour}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerMinutes)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.minute}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerDefBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerSeconds)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerDefLabel\">{{ltPropUnitLabel.second}}</span> </div></template></template> </div> </template></template></template></template></template></template> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropAppearance,'==','frame')}}\"><template case=\"true\"> <div class=\"lyteClkFrameOuter\"> <div class=\"lyteClkFrameInner\"> <template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','watch')}}\"><template case=\"true\"> <div class=\"lyteClkFrame lyteClkWatch lyteClkWatchFrame\"> <span class=\"lyteClkWatchHrVal\">{{lyteUiClockPairNumber(ltPropHours)}}</span> <span class=\"lyteClkWatchColon\">:</span> <span class=\"lyteClkWatchMinVal\">{{lyteUiClockPairNumber(ltPropMinutes)}}</span> <span class=\"lyteClkWatchColon\">:</span> <span class=\"lyteClkWatchSecVal\">{{lyteUiClockPairNumber(ltPropSeconds)}}</span> <span class=\"lyteClkWatchAMPM lyteClkWatchFrameAMPM\">{{ltPropTimeMeridiem}}</span> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','forwardtimer')}}\"><template case=\"true\"> <div class=\"lyteClkFrame lyteClkWatch lyteClkWatchFrame\"> <template is=\"if\" value=\"{{ltPropShowHours}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkWatchHrVal\">{{lyteUiClockPairNumber(ltPropHours)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.hour}}</span> </div></template></template> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><span class=\"lyteClkTimerColon\">:</span></template></template> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkWatchMinVal\">{{lyteUiClockPairNumber(ltPropMinutes)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.minute}}</span> </div></template></template> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><span class=\"lyteClkTimerColon\">:</span></template></template> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkWatchSecVal\">{{lyteUiClockPairNumber(ltPropSeconds)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.second}}</span> </div></template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','timer')}}\"><template case=\"true\"> <div class=\"lyteClkFrame lyteClkTimer lyteClkTimerFrame\"> <template is=\"if\" value=\"{{ltPropShowYears}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerYears)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.year}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowMonths}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerMonths)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.month}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowDays}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerDays)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.day}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowHours}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerHours)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.hour}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowMinutes}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerMinutes)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.minute}}</span> </div></template></template> <span class=\"lyteClkTimerColon\">:</span> <template is=\"if\" value=\"{{ltPropShowSeconds}}\"><template case=\"true\"><div class=\"lyteClkTimerBox lyteClkTimerFrameBox\"> <span class=\"lyteClkTimerValue\">{{lyteUiClockPairNumber(ltPropTimerSeconds)}}</span> <span class=\"lyteClkTimerLabel lyteClkTimerFrameLabel\">{{ltPropUnitLabel.second}}</span> </div></template></template> </div>   </template></template></template></template></template></template> </div></div></template></template></template></template> <template is=\"if\" value=\"{{expHandlers(ltPropMode,'===','stopWatch')}}\"><template case=\"true\"> <div class=\"lyteClockStopWatch\"> <div class=\"lyteClkFrameOuter\"> <div class=\"lyteClkFrameInner\"> <div class=\"lyteClockSwWrap\"> <template is=\"if\" value=\"{{ltPropShowSWHours}}\"><template case=\"true\"><span>{{lyteUiClockPairNumber(ltPropStopHours)}}</span></template></template> <template is=\"if\" value=\"{{ltPropShowSWHours}}\"><template case=\"true\"><span>:</span></template></template> <span>{{lyteUiClockPairNumber(ltPropStopMinutes)}}</span> <span>:</span> <span>{{lyteUiClockPairNumber(ltPropStopSeconds)}}</span> <template is=\"if\" value=\"{{ltPropShowSWMilliSeconds}}\"><template case=\"true\"><span>.</span></template></template> <template is=\"if\" value=\"{{ltPropShowSWMilliSeconds}}\"><template case=\"true\"><span>{{lyteUiClockPairNumber(ltPropStopMilliSeconds)}}</span></template></template> </div> </div> </div> <div class=\"lyteClockSwActionBtnWrap\"> <template is=\"if\" value=\"{{ltPropShowStopStart}}\"><template case=\"true\"><div class=\"lyteClockSwActionBtn lyteClockSWStart \">Start</div></template></template> <template is=\"if\" value=\"{{ltPropShowStopPause}}\"><template case=\"true\"><div class=\"lyteClockSwActionBtn lyteClockSWPause\">Pause</div></template></template> <template is=\"if\" value=\"{{ltPropShowStopLap}}\"><template case=\"true\"><div class=\"lyteClockSwActionBtn lyteClockSWLap\">Lap</div></template></template> <template is=\"if\" value=\"{{ltPropShowStopReset}}\"><template case=\"true\"><div class=\"lyteClockSwActionBtn lyteClockSWReset\">Reset</div></template></template> </div> <div class=\"lyteClockSwLapWrapper\"> <template is=\"for\" items=\"{{ltPropLapTime}}\" item=\"item\" index=\"index\"> <div class=\"lyteClockSwLap\"> <span class=\"lyteClockSwLapLabel\">Lap {{index}}</span> <div class=\"lyteClockSwLapTime\"> <span>{{lyteUiClockPairNumber(item.lapHours)}}</span> : <span>{{lyteUiClockPairNumber(item.lapMinutes)}}</span> : <span>{{lyteUiClockPairNumber(item.lapSeconds)}}</span> . <span>{{lyteUiClockPairNumber(item.lapMilliSecs)}}</span> </div> </div> </template> </div> </div> </template></template> </div> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(ltPropType,'===','analog')}}\"><template case=\"true\"> <div class=\"lyteClkFrameOuter\"> <div class=\"lyteClkFrameInner\"> <div class=\"lyteClkAlogCont\"> <div class=\"lyteClkAlogTik lyteClkTik126\"></div> <div class=\"lyteClkAlogTik lyteClkTik17\"></div> <div class=\"lyteClkAlogTik lyteClkTik28\"></div> <div class=\"lyteClkAlogTik lyteClkTik39\"></div> <div class=\"lyteClkAlogTik lyteClkTik410\"></div> <div class=\"lyteClkAlogTik lyteClkTik511\"></div> <div class=\"lyteClockMidCircle\"></div> <div class=\"lyteClkAlogDial lyteClockHrDial\"> <div class=\"lyteClkHrDialElem\"></div> </div> <div class=\"lyteClkAlogDial lyteClockMinDial\"> <div class=\"lyteClkMinDialElem\"></div> </div> <div class=\"lyteClkAlogDial lyteClockSecDial\"> <div class=\"lyteClkSecDialElem\"></div> </div> <template is=\"if\" value=\"{{ltPropShowDate}}\"><template case=\"true\"> <div class=\"lyteClockDate\"> <div class=\"\">{{ltPropDate}}</div> </div> </template></template> </div> </div> </div> </template></template></template></template> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,9,0]},{"type":"text","position":[1,11,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,17]},{"type":"if","position":[1,17],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,21]},{"type":"if","position":[1,21],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1]},{"type":"if","position":[1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,5,0]},{"type":"text","position":[1,9,0]},{"type":"text","position":[1,11,0]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,5]},{"type":"if","position":[1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,9]},{"type":"if","position":[1,9],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,13]},{"type":"if","position":[1,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,17]},{"type":"if","position":[1,17],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}},{"type":"attr","position":[1,21]},{"type":"if","position":[1,21],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,1,0]},{"type":"text","position":[0,3,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,1,1]},{"type":"if","position":[1,1,1,1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,1,1,1,3]},{"type":"if","position":[1,1,1,1,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"text","position":[1,1,1,1,5,0]},{"type":"text","position":[1,1,1,1,9,0]},{"type":"attr","position":[1,1,1,1,11]},{"type":"if","position":[1,1,1,1,11],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,1,1,1,13]},{"type":"if","position":[1,1,1,1,13],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"if","position":[1,3,1],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,3]},{"type":"if","position":[1,3,3],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,5]},{"type":"if","position":[1,3,5],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,3,7]},{"type":"if","position":[1,3,7],"cases":{"true":{"dynamicNodes":[]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"for","position":[1,5,1],"dynamicNodes":[{"type":"text","position":[1,1,1]},{"type":"text","position":[1,3,1,0]},{"type":"text","position":[1,3,3,0]},{"type":"text","position":[1,3,5,0]},{"type":"text","position":[1,3,7,0]}]}]}},"default":{}}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1,1,21]},{"type":"if","position":[1,1,1,21],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1,0]}]}},"default":{}}]}},"default":{}}]}},"default":{}}],
_observedAttributes :["ltPropAppearance","ltPropFormat","ltPropType","ltPropMode","ltPropDuration","ltPropEndDate","ltPropStartTime","ltPropEndTime","ltPropAlarm","ltPropUnitLabel","ltPropUnits","ltPropHours","ltPropMinutes","ltPropSeconds","ltPropTimeMeridiem","ltPropStopHours","ltPropStopMinutes","ltPropStopSeconds","ltPropStopMilliSeconds","ltPropShowStopStart","ltPropShowStopPause","ltPropShowStopReset","ltPropShowStopLap","ltPropShowSWHours","ltPropShowSWMilliSeconds","ltPropShowDate","ltPropPause","stopWatchRunning","ltPropDate","ltPropLapTime","ltPropTimerHours","ltPropTimerMinutes","ltPropTimerSeconds","ltPropTimerDays","ltPropTimerMonths","ltPropTimerYears","ltPropShowYears","ltPropShowMonths","ltPropShowDays","ltPropShowHours","ltPropShowMinutes","ltPropShowSeconds","ltPropCurrentDate","ltPropGivenDate","timerPaused","userDefinedUnits"],
	data : function(){
		return {

			/**
			 * @prop {string} ltPropAppearance
			 * @default default
			 * @options default,frame
			 */

			ltPropAppearance: Lyte.attr('string' , {default : 'default'}),

			/**
			 * @prop {string} ltPropFormat
			 * @default 12
			 * @options 12,24
			 */

			ltPropFormat : Lyte.attr('string' , {default : '12'}),

			/**
			 * @prop {string} ltPropType
			 * @default digital
			 * @options digital,analog
			 */

			ltPropType : Lyte.attr('string' , {default : 'digital'}),

			/**
			 * @prop {string} ltPropMode
			 * @default watch
			 * @options watch, timer, stopWatch, forwardtimer
			 */

			ltPropMode : Lyte.attr('string' , {default : 'watch'}),

			/**
			 * @prop {string} ltPropDuration
			 * @default 00:00:00
			 */

			ltPropDuration :Lyte.attr('string',{default : '00:00:00'}),

			/**
			 * @prop {string} ltPropEndDate
			 * @default 00/00/0000
			 */

			ltPropEndDate :Lyte.attr('string',{default : '00/00/0000'}),

			/**
			 * @prop {string} ltPropStartTime
			 * @default 00:00:00
			 */

			ltPropStartTime : Lyte.attr('string',{default : '00:00:00'}),

			/**
			 * @prop {string} ltPropEndTime
			 * @default 00:00:00
			 */

			ltPropEndTime : Lyte.attr('string',{default : '00:00:00'}),

			/**
			 * @prop {string} ltPropAlarm
			 * @default 00:00:00
			 */

			ltPropAlarm : Lyte.attr('string' , {default : '00:00:00'}),

			/**
			 * @prop {object} ltPropUnitLabel
			 */

			ltPropUnitLabel : Lyte.attr('object' , {
				default : {
					year  : 'Yrs',
					month : 'Mths',
					day   : 'Days',
					hour	: 'Hrs',
					minute : 'Mins',
					second : 'Secs'
				}
			}),

			/**
			 * @prop {object} ltPropUnits
			 */

			 ltPropUnits : Lyte.attr('array' , {
				 default : []
			 }),


			ltPropHours : Lyte.attr('string' , {default : '00'}),
			ltPropMinutes : Lyte.attr('string' , {default : '00'}),
			ltPropSeconds : Lyte.attr('string' , {default : '00'}),
			ltPropTimeMeridiem : Lyte.attr('string' , {default : ''}),
			ltPropStopHours : Lyte.attr('string' , {default : '00'}),
			ltPropStopMinutes : Lyte.attr('string' , {default : '00'}),
			ltPropStopSeconds : Lyte.attr('string' , {default : '00'}),
			ltPropStopMilliSeconds : Lyte.attr('string' , {default : '00'}),

			ltPropShowStopStart : Lyte.attr('boolean' , {default:true}),
			ltPropShowStopPause : Lyte.attr('boolean' , {default:false}),
			ltPropShowStopReset : Lyte.attr('boolean' , {default:false}),
			ltPropShowStopLap : Lyte.attr('boolean' , {default:false}),

			ltPropShowSWHours : Lyte.attr('boolean' , {default : false}),
			ltPropShowSWMilliSeconds : Lyte.attr('boolean' , {default : true}),



			ltPropShowDate : Lyte.attr('boolean' , {default : false}),

			ltPropPause : Lyte.attr('boolean' , {default : false}),
			stopWatchRunning : Lyte.attr('boolean' , {default : false}),
			ltPropDate : Lyte.attr('string' , {default : ''}),
			ltPropLapTime : Lyte.attr('array' , {
				default : []
			}),



			ltPropTimerHours : Lyte.attr('string' , {default : '00'}),
			ltPropTimerMinutes : Lyte.attr('string' , {default : '00'}),
			ltPropTimerSeconds : Lyte.attr('string' , {default : '00'}),

			ltPropTimerDays : Lyte.attr('string' , {default : '00'}),
			ltPropTimerMonths : Lyte.attr('string' , {default : '00'}),
			ltPropTimerYears : Lyte.attr('string' , {default : '00'}),

			ltPropShowYears : Lyte.attr('boolean' , {default : false}),
			ltPropShowMonths : Lyte.attr('boolean' , {default : false}),
			ltPropShowDays : Lyte.attr('boolean' , {default : false}),
			ltPropShowHours : Lyte.attr('boolean' , {default : true}),
			ltPropShowMinutes : Lyte.attr('boolean' , {default : true}),
			ltPropShowSeconds : Lyte.attr('boolean' , {default : true}),

			ltPropCurrentDate : Lyte.attr('string',{default : '00/00/0000'}),
			ltPropGivenDate : Lyte.attr('string',{default : '00/00/0000'}),
			timerPaused : Lyte.attr('boolean' , {
				default : false
			}),
			userDefinedUnits : Lyte.attr('boolean', {
				default : false
			})

		}
	},

	init : function(){

		var _this = this

		var units = this.getData('ltPropUnits')

		if(units.length > 0){
			this.setData('userDefinedUnits' , true)
			_this.setData('ltPropShowYears' , false)
			_this.setData('ltPropShowMonths' , false)
			_this.setData('ltPropShowDays' , false)
			_this.setData('ltPropShowHours' , false)
			_this.setData('ltPropShowMinutes' , false)
			_this.setData('ltPropShowSeconds' , false)
			for(var i=0;i<units.length;i++){
				switch (units[i]) {
					case 'year':
						_this.setData('ltPropShowYears' , true)
					break;
					case 'month':
						_this.setData('ltPropShowMonths' , true)
					break;
					case 'day':
						_this.setData('ltPropShowDays' , true)
					break;
					case 'hour':
						_this.setData('ltPropShowHours' , true)
					break;
					case 'minute':
						_this.setData('ltPropShowMinutes' , true)
					break;
					case 'second':
						_this.setData('ltPropShowSeconds' , true)
					break;
				}
			}
		}

		this.$node.pauseTimer = function(){

			_this.setData('timerPaused' , true)

		};

		this.$node.resumeTimer = function(){

			_this.setData('timerPaused' , false)

			if(_this.getData('ltPropMode') === 'timer'){

				_this.lyteTimer();

			} else if(_this.getData('ltPropMode') === 'forwardtimer'){

				_this.lyteForwardTimer()

			}

		};

	},

	methods : {
		onTimerStart : function(){

		},
		onTimerEnd : function(){

		},
		onTimeReached : function(){

		},
		onTimerPassed : function(){

		}
	},


	modeChange : function(){
		if(this.getData('ltPropType') === 'digital'){
			this.lyteDigitalWatch();
		} else if(this.getData('ltPropType') === 'analog'){
			this.lyteAnalogWatch();
		}
	}.observes(
		'ltPropMode'
	),

	timerChange : function(){
		clearInterval(this.timerCaseD)
		clearInterval(this.timerCaseT)
		clearInterval(this.timerCaseET)
		this.setData('ltPropTimerYears',0);
		this.setData('ltPropTimerMonths',0);
		this.setData('ltPropTimerDays',0);
		this.setData('ltPropTimerHours',0);
		this.setData('ltPropTimerMinutes',0);
		this.setData('ltPropTimerSeconds',0);

		if(!this.getData('userDefinedUnits')){
			this.setData('ltPropShowYears' , true)
			this.setData('ltPropShowMonths' , true)
			this.setData('ltPropShowDays' , true)
			this.setData('ltPropShowHours' , true)
			this.setData('ltPropShowMinutes' , true)
			this.setData('ltPropShowSeconds' , true)
		}


		this.lyteTimer();
	}.observes(
		'ltPropEndDate',
		'ltPropDuration',
		'ltPropEndTime'
	),

	didConnect : function(){
		if(this.getData('ltPropType') === 'digital'){
			this.lyteDigitalWatch();
		} else if(this.getData('ltPropType') === 'analog'){
			this.lyteAnalogWatch();
		}

		var unitLabels = {}

		unitLabels.year = this.getData('ltPropUnitLabel').year || 'Yrs'
		unitLabels.month = this.getData('ltPropUnitLabel').month || 'Mths'
		unitLabels.day = this.getData('ltPropUnitLabel').day || 'Days'
		unitLabels.hour = this.getData('ltPropUnitLabel').hour || 'Hrs'
		unitLabels.minute = this.getData('ltPropUnitLabel').minute || 'Mins'
		unitLabels.second = this.getData('ltPropUnitLabel').second || 'Secs'

		this.setData('ltPropUnitLabel' , unitLabels)

		var _this = this;

		this.$node.startTimer = function(){

			_this.lyteTimer();

		}

		var time = new Date();
		this.setData('ltPropDate' , time.getDate());
	},

	lyteTimer : function(){

		this.executeMethod('onTimerStart')

		// Static Variables that are global for lyteTimer function
		var currentTime = new Date();
		var cT = currentTime.getHours()-12+':'+currentTime.getMinutes()+':'+currentTime.getSeconds();
		var _this = this;
		var liveDate;

		// Variables common for switch
		var timerType = '';
		var secTime = this.getData('ltPropDuration');
		var dayTime = this.getData('ltPropEndDate');
		var endTime = this.getData('ltPropEndTime');
		var alarmTime = this.getData('ltPropAlarm').split(':').map(function(x){return parseInt(x)})

		// Variables used for case : 'D' where the user gives only timer duration in date
		var timerCaseD;
		var durationDate;

		// Variables used for case : 'T' where the user gives only timer duration in time
		var durationTime;
		var updateTimer;
		var clearTimer;

		// Variables used for case : 'ET' where the user gives the end time when the timer has to stop
		var endTimeAr;
		var timerCaseET;

		// Conditions for selecting the timer type
		if((secTime !== '00:00:00')&&(dayTime !== '00/00/0000')){
			timerType = 'D&T';
		} else {
			if(dayTime !== '00/00/0000'){
				timerType = 'D';
			} if(secTime !== '00:00:00'){
				timerType = 'T';
			}
		}

		if((endTime !== '00:00:00')&&(dayTime==='00/00/0000')){
			timerType = 'ET';
		} else if((endTime !== '00:00:00')&&(dayTime!=='00/00/0000')) {
			timerType = 'D';
		}

		switch (timerType) {
			case 'D':

			{
				// Case runs when the user has given only the ltPropEndDate property


				durationDate = this.getData('ltPropEndDate').split('/').map(function(x){return parseInt(x)});

				var cd = (currentTime.getMonth()+1)+'/'+currentTime.getDate()+'/'+currentTime.getFullYear();
				var gd = _this.getData('ltPropEndDate')+" "+_this.getData('ltPropEndTime');
				var currentDate = new Date(cd);
				var givenDate = new Date(gd)


				_this.setData('ltPropCurrentDate',cd);
				_this.setData('ltPropGivenDate',gd);

				isTimePassedFun(givenDate);
				var diffDays = getTotalDaysRemaining(cd,gd);
				var rValue = getDifferenceCaseD(currentDate,givenDate);

				if(givenDate < currentDate){
					_this.executeMethod('onTimerPassed')
				}

				if((diffDays<=366)&&(diffDays>0)){

					timerCaseD =function(){

						isTimePassedFun(givenDate);
						rValue = getDifferenceCaseD(currentDate,givenDate);
						_this.setData('ltPropTimerYears',0);
						if(!_this.getData('userDefinedUnits')){
							_this.setData('ltPropShowYears' , false)
						}
						_this.setData('ltPropTimerMonths',rValue.months);
						_this.setData('ltPropTimerDays',rValue.days);
						_this.setData('ltPropTimerHours',rValue.hours);
						_this.setData('ltPropTimerMinutes',rValue.minutes);
						_this.setData('ltPropTimerSeconds',rValue.seconds);


						liveDate = new Date();

						if(
							alarmTime[0]+":"+alarmTime[1]+":"+alarmTime[2] === (liveDate.getHours()+":"+liveDate.getMinutes()+":"+liveDate.getSeconds())
						){
							_this.executeMethod('onTimeReached');
						}


						if(rValue.months <= 0){
							_this.setData('ltPropShowMonths' , false)
							if(rValue.days <= 0){
								_this.setData('ltPropShowDays' , false)
								if(rValue.hours <= 0){
									if(rValue.minutes <= 0){
										if(rValue.seconds < 1){
											clearInterval(clearThisTimer());
										}
									}
								}
							} else {
									_this.setData('ltPropShowSeconds' , false)
							}
						} else {
							if(!_this.getData('userDefinedUnits')){
								_this.setData('ltPropShowMinutes' , false)
								_this.setData('ltPropShowSeconds' , false)
							}
						}
					}

				} else {

					var remYears = givenDate.getFullYear() - currentDate.getFullYear();
					var remMonths;
					if(givenDate.getMonth() > currentDate.getMonth()){
						remMonths = givenDate.getMonth() - currentDate.getMonth();
					} else {
						remMonths = 12 - currentDate.getMonth() + givenDate.getMonth();

						if(currentDate.getDate() > givenDate.getDate()){
							remMonths -= 1;
						}

						remYears -= 1;

						if(remMonths === 12){
							remMonths = 0;
							remYears +=1;
						}

					}

					if(remYears<=0){
						remYears = 0;
						remMonths = 0;
						_this.executeMethod('onTimerPassed')
					}


					_this.setData('ltPropTimerYears',remYears);
					_this.setData('ltPropTimerMonths',remMonths);
					if(!_this.getData('userDefinedUnits')){
						_this.setData('ltPropShowYears' , true)
						_this.setData('ltPropShowMonths' , true)
					}
					_this.setData('ltPropTimerDays', 0 );
					_this.setData('ltPropTimerHours', 0 );
					_this.setData('ltPropTimerMinutes', 0 );
					_this.setData('ltPropTimerSeconds', 0 );

					if(!_this.getData('userDefinedUnits')){
						_this.setData('ltPropShowDays' , false)
						_this.setData('ltPropShowHours' , false)
						_this.setData('ltPropShowMinutes' , false)
						_this.setData('ltPropShowSeconds' , false)
					}

					clearInterval(_this.timerCaseD)

				}

				if((!(rValue.minutes < 0))&&(diffDays<=366)){
					_this.setData('ltPropTimerYears',0);
					if(!_this.getData('userDefinedUnits')){
						_this.setData('ltPropShowYears' , false)
					}
					_this.setData('ltPropTimerMonths',rValue.months);
					_this.setData('ltPropTimerDays',rValue.days);
					_this.setData('ltPropTimerHours',rValue.hours);
					_this.setData('ltPropTimerMinutes',rValue.minutes);
					_this.setData('ltPropTimerSeconds',rValue.seconds);
					if(rValue.months <= 0){
						if(!_this.getData('userDefinedUnits')){
							_this.setData('ltPropShowMonths' , false)
						}
						if(rValue.days <= 0){
							if(!_this.getData('userDefinedUnits')){
								_this.setData('ltPropShowDays' , false)
							}
						} else {
							if(!_this.getData('userDefinedUnits')){
									_this.setData('ltPropShowSeconds' , false)
								}
						}
					} else {
						if(!_this.getData('userDefinedUnits')){
							_this.setData('ltPropShowMinutes' , false)
							_this.setData('ltPropShowSeconds' , false)
						}
					}
					this.timerCaseD = setInterval(timerCaseD , 1000);
				}
				function clearThisTimer(){
					clearInterval(_this.timerCaseD)
					_this.executeMethod('onTimerEnd')
				}


			}

			break;
			case 'T':
			{

				// Case runs when the user has given only the ltPropDuration property

				durationTime = this.getData('ltPropDuration').split(':').map(function(x){return parseInt(x)});
				_this.setData('ltPropTimerSeconds' , durationTime[2])
				_this.setData('ltPropTimerMinutes' , durationTime[1])
				_this.setData('ltPropTimerHours' , durationTime[0])

				if(!_this.getData('userDefinedUnits')){
					_this.setData('ltPropShowYears' , false)
					_this.setData('ltPropShowMonths' , false)
					_this.setData('ltPropShowDays' , false)
				}

				updateTimer = function(){
					// Function that has been passed to the setInterval for every one second

					if(_this.getData('timerPaused')){
						clearInterval(_this.timerCaseT);
						return
					}

					_this.setData('ltPropTimerSeconds' , updateSeconds(_this.getData('ltPropTimerSeconds')))
					if(_this.getData('ltPropTimerSeconds')>=59){
						if(_this.getData('ltPropTimerHours')>0){
							_this.setData('ltPropTimerMinutes' , updateMinutes(60))
						} else {
							_this.setData('ltPropTimerMinutes' , updateMinutes(_this.getData('ltPropTimerMinutes')))
						}
						_this.setData('ltPropTimerHours' , updateHours(_this.getData('ltPropTimerHours')))
					}
					_this.setData('ltPropDuration' , parseFloat(_this.getData('ltPropTimerHours'))+':'+parseFloat(_this.getData('ltPropTimerMinutes'))+':'+parseFloat(_this.getData('ltPropTimerSeconds')))

					if(
							(parseFloat(_this.getData('ltPropTimerSeconds'))===alarmTime[2]) &&
							(parseFloat(_this.getData('ltPropTimerMinutes'))===alarmTime[1]) &&
							(parseFloat(_this.getData('ltPropTimerHours'))===alarmTime[0])
						){
							_this.executeMethod('onTimeReached');
					}

					if(
							(parseFloat(_this.getData('ltPropTimerSeconds'))===0) &&
							(parseFloat(_this.getData('ltPropTimerMinutes'))===0) &&
							(parseFloat(_this.getData('ltPropTimerHours'))===0)
						){
						_this.setData('ltPropDuration' , parseFloat(_this.getData('ltPropTimerHours'))+':'+parseFloat(_this.getData('ltPropTimerMinutes'))+':'+parseFloat(_this.getData('ltPropTimerSeconds')))
						endTimerCaseT();
					}

				}

				this.timerCaseT = setInterval(updateTimer , 1000);
				function endTimerCaseT(){
					clearInterval(_this.timerCaseT);
					_this.executeMethod('onTimerEnd')
				}

			}
			break;
			case 'ET':

			{

				var endTimeAr = this.getData('ltPropEndTime').split(':').map(function(x){return parseInt(x)});
				var cd = (currentTime.getMonth()+1)+'/'+currentTime.getDate()+'/'+currentTime.getFullYear();
				var gd = (currentTime.getMonth()+1)+'/'+currentTime.getDate()+'/'+currentTime.getFullYear()+" "+_this.getData('ltPropEndTime');
				var currentDate = new Date(cd);
				var givenDate = new Date(gd);

				_this.setData('ltPropCurrentDate',cd);
				_this.setData('ltPropGivenDate',gd);

				var rValue = getDifferenceCaseD(currentDate,givenDate);

				timerCaseET = function(){

					rValue = getDifferenceCaseD(currentDate,givenDate);

					_this.setData('ltPropTimerHours',rValue.hours);
					_this.setData('ltPropTimerMinutes',rValue.minutes);
					_this.setData('ltPropTimerSeconds',rValue.seconds);

					liveDate = new Date();

					if(
						alarmTime[0]+":"+alarmTime[1]+":"+alarmTime[2] === (liveDate.getHours()+":"+liveDate.getMinutes()+":"+liveDate.getSeconds())
					){
						_this.executeMethod('onTimeReached');
					}


					if(rValue.hours <= 0){
						if(rValue.minutes <= 0){
							if(rValue.seconds < 1){
								clearInterval(clearThisTimerET());
							}
						}
					}
				}

				if(!(rValue.minutes < 0)){
					_this.setData('ltPropTimerHours',rValue.hours);
					_this.setData('ltPropTimerMinutes',rValue.minutes);
					_this.setData('ltPropTimerSeconds',rValue.seconds);
					this.timerCaseEt = setInterval(timerCaseET , 1000);
				}
				function clearThisTimerET(){
					clearInterval(_this.timerCaseEt)
					_this.executeMethod('onTimerEnd')
				}





			}

			break;

		}

		function updateSeconds(sec){
			// Function that decrements the seconds value by 1
			if(sec>0){
				return sec-1;
			}
			return 59;
		}
		function updateMinutes(min){
			// Function that decrements the minutes value by 1
			if(min > 0){
				return min-1;
			}
			return 0;
		}
		function updateHours(hrs){
			// Function that decrements the hours value by 1
			if(hrs > 0){
				return hrs-1;
			}
			return 0;
		}


		function getTotalDaysRemaining(c,g){
			// Function that returns the total number of days

			var currentDate = new Date(c);
			var givenDate = new Date(g);
			var diffTime = givenDate - currentDate;
			var diffDays = Math.abs(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
			return diffDays;
		}

		function getNumberOfDaysInAMonth(date){
			// Function that returns the number of days present in a given month

			var year = date.getFullYear();
			var month = date.getMonth();
			var totalMonths = new Date(year, month, 0).getDate()
			return totalMonths ;
		}

		function getMonthsDif(c, g) {
			// Function that returns the number of months present between the two given dates

			var monthGap;

			if(c.getMonth() >= g.getMonth()){
				if(isDayPassedFun(g)){
					monthGap = 11 - c.getMonth() + g.getMonth() + 1
				} else {
					monthGap = 11 - c.getMonth() + g.getMonth()
				}

			} else {
				monthGap = g.getMonth() - c.getMonth();
				if(!isDayPassedFun(g)){
					if(c.getDate() === g.getDate()){
						if(!isMinutesPassedFun(g)){
							monthGap -= 1;
						} else {
							monthGap;
						}
					} else {
						monthGap -= 1;
					}
				}
			}

			if(c.getMonth() === g.getMonth()){
				if(isDayPassedFun(g)){
					monthGap = g.getMonth() - c.getMonth();
				} else {
					monthGap = 11 - c.getMonth() + g.getMonth() + 1
					if(!isDayPassedFun(g)){
						monthGap -= 1;
					}
					if(g.getDate() === c.getDate()){
						monthGap = 0;
					}
				}
			}

			if(monthGap<1){
				if(!_this.getData('userDefinedUnits')){
					_this.setData('ltPropShowMonths' , false)
				}
			} else {
				if(!_this.getData('userDefinedUnits')){
					_this.setData('ltPropShowMonths' , true)
				}
			}

			return monthGap;
		}

		function getDaysDiff(c,g){
			// Function that returns the remaining number of days after remaining months been calculated

			var ct = new Date();
			var daysInCurrentMonth = getNumberOfDaysInAMonth(c);
			var daysInGivenMonth = getNumberOfDaysInAMonth(g);
			var dayStarted = 0;
			var daysDiff = 0;
			var remainingDaysInCurrentMonth = daysInCurrentMonth - c.getDate();
			var remainingDaysInGivenMonth = g.getDate() - dayStarted;

			if(c.getDate() > g.getDate()){
				daysDiff = (getNumberOfDaysInAMonth(g) - c.getDate()) + g.getDate() -1
				if(g.getHours() === ct.getHours()){
					if(!isMinutesPassedFun(g)){
						daysDiff -=1;
					}
				}
			} else {
				daysDiff = g.getDate() - c.getDate();
				if(g.getDate() === c.getDate()){
					if(g.getHours() === ct.getHours()){
						if(!isMinutesPassedFun(g)){
							daysDiff = (getNumberOfDaysInAMonth(g) - c.getDate()) + (g.getDate() - 1)
						}
					}
				} else {
					if(g.getHours() === ct.getHours()){
						if(!isMinutesPassedFun(g)){
							daysDiff -= 1;
						}
					} if(g.getHours() < ct.getHours()){
						daysDiff -=1;
					}
				}
			}

			if(daysDiff<1){
				if(!_this.getData('userDefinedUnits')){
					_this.setData('ltPropShowDays' , false)
				}
			} else {
				if(!_this.getData('userDefinedUnits')){
					_this.setData('ltPropShowDays' , true)
				}
			}
			return daysDiff
		}

		function getHoursDiff(c,g){
			// Function that returns the remaining number of hours after

			var ct = new Date();
			var hrDif = (24 - Math.abs(ct.getHours() - g.getHours()));
			var millisecondDiff = g - ct;
			var secDiff = Math.floor( (g - ct) / 1000 );
			var minutesDiff = Math.floor( secDiff / 60 );
			var hrDif = Math.floor( minutesDiff / 60 );

			if(ct.getHours() >= g.getHours()){
				hrDif = 23 - ct.getHours() + g.getHours();
				if(ct.getHours() === g.getHours()){
					if(isMinutesPassedFun(g)){
						hrDif = ct.getHours() - g.getHours();
					}
				}
			} else {
				hrDif = g.getHours() - ct.getHours();
				if(!isMinutesPassedFun(g)){
					hrDif -= 1;
				}
			}

			return hrDif
		}

		function getMinutesDiff(c,g){
			// Function that returns the remaining number of minutes after

			var ct = new Date();
			var millisecondDiff = g - ct;
			var secDiff = Math.floor( (g - ct) / 1000 );
			var minDif = Math.floor( secDiff / 60 );

			if(minDif >= 59){
				if(ct.getMinutes() > g.getMinutes()){
					minDif = 59 - (ct.getMinutes() - g.getMinutes());
				} else {
					if(ct.getMinutes() === g.getMinutes()){
						if(!isSecondsPassedFun(g)){
							minDif = 59 - (ct.getMinutes() - g.getMinutes());
						}
					} else {
						minDif = g.getMinutes() - ct.getMinutes();
						if(!isSecondsPassedFun(g)){
							minDif -= 1;
						}
					}
				}
			}
			return minDif;
		}

		function getSecondsDiff(c,g){
			// Function that returns the remaining number of seconds after

			var ct = new Date();
			return (60 - Math.abs(ct.getSeconds() - g.getSeconds()) - 1);
		}

		function isDayPassedFun(g){
			// Function returns a boolean checking whether the current time has crossed the user given time
			// eg givenDate = 10 , currentDate = 6 true

			var ct = new Date();
			return ((g.getDate()>ct.getDate()) ? true : false);
		}

		function isTimePassedFun(g){
			// Function returns a boolean checking whether the current time has crossed the user given time
			// eg givenHour = 10 , currentHour = 16 true

			var ct = new Date();
			return ((g.getHours()>ct.getHours()) ? true : false);
		}
		function isMinutesPassedFun(g){
			// Function returns a boolean checking whether the current time has crossed the user given time
			// eg givenMinute = 15 , currentMinute = 00 true

			var ct = new Date();
			return ((g.getMinutes()>ct.getMinutes()) ? true : false);
		}
		function isSecondsPassedFun(g){
			// Function returns a boolean checking whether the current time has crossed the user given time

			var ct = new Date();
			return ((g.getSeconds()>ct.getSeconds()) ? true : false);
		}


		function getDifferenceCaseD(c,g){

			// Function returns the object that has all the remaining values

			var daysInCurrentMonth = getNumberOfDaysInAMonth(c);
			var daysInGivenMonth = getNumberOfDaysInAMonth(g);

			getHoursDiff(c,g)

			var remaining = {}
			remaining.months = getMonthsDif(c,g);
			remaining.days = getDaysDiff(c,g);
			remaining.hours = getHoursDiff(c,g);
			remaining.minutes = getMinutesDiff(c,g);
			remaining.seconds = getSecondsDiff(c,g);

			return remaining;

		}

	},

	lyteForwardTimer : function(){

		var startTime = this.getData('ltPropStartTime').split(':').map(function(x){return parseInt(x)})

		var startSec = startTime[2];
		var startMin = startTime[1];
		var startHr  = startTime[0];

		this.setData('ltPropSeconds' , startTime[2])
		this.setData('ltPropMinutes' , startTime[1])
		this.setData('ltPropHours' , startTime[0])

		var _this = this
		_this.executeMethod('onTimerStart')

		var setForwardTimer = function(){

			if(_this.getData('timerPaused')){
				clearForwardTimer()
				return
			}

			startSec += 1

			if(startSec === 60){
				startSec = 0
				startMin += 1
			}
			if(startMin === 60){
				startMin = 0
				startHr +=1
			}
			if(startHr === 24){
				_this.executeMethod('onTimerEnd')
				startSec = 0;
				startMin = 0;
				startHr  = 0;
			}

			_this.setData('ltPropSeconds' , startSec)
			_this.setData('ltPropMinutes' , startMin)
			_this.setData('ltPropHours' , startHr)

			var setTime = startHr+':'+startMin +':'+ startSec

			_this.setData('ltPropStartTime' , setTime)

		}

		this.forwardTimer = setInterval(setForwardTimer , 1000);

		function clearForwardTimer(){
			clearInterval(_this.forwardTimer)
		}

	},

	lyteDigitalWatch : function(){

			var currentTime = new Date();
			var _this = this;
			var stopWatchMilliSec = 0;
			var stopWatchSec = 1;
			var stopWatchMin = 1;
			var stopWatchHrs = 1;
			var alarmTime = this.getData('ltPropAlarm').split(':').map(function(x){return parseInt(x)})

			var setTime = function(){
				var currentTime = new Date();
				if(
					alarmTime[0]+":"+alarmTime[1]+":"+alarmTime[2] === (currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds())
				){
					_this.executeMethod('onTimeReached');
				}
				_this.setData('ltPropSeconds' , currentTime.getSeconds());
				if(currentTime.getSeconds() === 0){
					_this.setData('ltPropMinutes' , currentTime.getMinutes());
				}
				if(currentTime.getMinutes() === 0){
					if(_this.getData('ltPropFormat') === '12'){
						if(currentTime.getHours() > 12){
							_this.setData('ltPropHours' , (currentTime.getHours()-11));
						}else {
							_this.setData('ltPropHours' , currentTime.getHours());
						}
					} else {
						_this.setData('ltPropHours' , currentTime.getHours());
					}
				}
				if(_this.getData('ltPropFormat') === '12'){
					if(currentTime.getHours() > 11){
						_this.setData('ltPropTimeMeridiem' , 'PM');
					} else {
						_this.setData('ltPropTimeMeridiem' , 'AM');
					}
				}
			}
			if(this.getData('ltPropMode') === 'watch'){
				if(this.getData('ltPropFormat') === '12'){
					if(currentTime.getHours() > 12){
						this.setData('ltPropHours' , (currentTime.getHours()-12));
					}else {
						this.setData('ltPropHours' , currentTime.getHours());
					}
				}else {
					this.setData('ltPropHours' , currentTime.getHours());
				}
				this.setData('ltPropMinutes' , currentTime.getMinutes());
				this.setData('ltPropSeconds' , currentTime.getSeconds());
				_this.digiWatch = setInterval(setTime , 1000);
			}
			if(_this.getData('ltPropFormat') === '12'){
				if(currentTime.getHours() > 11){
					_this.setData('ltPropTimeMeridiem' , 'PM');
				} else {
					_this.setData('ltPropTimeMeridiem' , 'AM');
				}
			}
			if(this.getData('ltPropMode') === 'stopWatch'){

				_this.lyteStopWatch();

			}	else if(this.getData('ltPropMode') === 'timer'){

				_this.lyteTimer();

			} else if(this.getData('ltPropMode') === 'forwardtimer'){

				_this.lyteForwardTimer();

			}
	},
	lyteStopWatch : function(){

			var _this = this;

			var stopWatchMilliSec = 0;
			var stopWatchSec = 1;
			var stopWatchMin = 1;
			var stopWatchHrs = 1;

			var pauseMilliValue;
			var pauseSecValue ;
			var pauseMinValue ;
			var pauseHrsValue ;

			var currentClock = this.$node;

			startClock = function(){
				pauseMilliValue = _this.getData('ltPropStopMilliSeconds');
				pauseSecValue = _this.getData('ltPropStopSeconds');
				pauseMinValue = _this.getData('ltPropStopMinutes');
				pauseHrsValue = _this.getData('ltPropStopHours');
				if(!_this.getData('ltPropPause')){
					_this.setData('ltPropStopMilliSeconds' , stopWatchMilliSec++);
					if(stopWatchMilliSec === 100){
						stopWatchMilliSec = 0;
						_this.setData('ltPropStopSeconds' , stopWatchSec++);
					}
					if(stopWatchSec === 60){
						stopWatchSec = 0;
						_this.setData('ltPropStopMinutes' , stopWatchMin++);
					}
					if(stopWatchMin === 60){
						stopWatchMin = 0;
						_this.setData('ltPropStopHours' , stopWatchHrs++);
					}
				}
				if(stopWatchHrs > 1){
					_this.setData('ltPropShowSWHours' , true);
					_this.setData('ltPropShowSWMilliSeconds' , false);
				}
			}
			var stopInterval;

			function stopWatchStart(){
				if(!_this.getData('stopWatchRunning')){
					_this.setData('ltPropPause' , false);
					_this.stopInterval = setInterval(startClock , 10);
				}
				_this.setData('stopWatchRunning' , true);
				_this.setData('ltPropShowStopPause' , true);
				_this.setData('ltPropShowStopLap' , true);
				_this.setData('ltPropShowStopStart' , false);
				_this.setData('ltPropShowStopReset' , false);
				$L(currentClock).find('.lyteClockSWPause')[0].addEventListener('click' , stopWatchPause);
				$L(currentClock).find('.lyteClockSWLap')[0].addEventListener('click' , stopWatchLap);
			}
			function stopWatchPause(){
				clearInterval(_this.stopInterval);
				_this.setData('stopWatchRunning' , false);
				_this.setData('ltPropPause' , true);
				_this.setData('ltPropStopHours' , pauseHrsValue);
				_this.setData('ltPropStopMinutes' , pauseMinValue);
				_this.setData('ltPropStopSeconds' , pauseSecValue);
				_this.setData('ltPropStopMilliSeconds' , pauseMilliValue);
				_this.setData('ltPropShowStopPause' , false);
				_this.setData('ltPropShowStopLap' , false);
				_this.setData('ltPropShowStopStart' , true);
				_this.setData('ltPropShowStopReset' , true);
				$L(currentClock).find('.lyteClockSWStart')[0].addEventListener('click' , stopWatchStart);
				$L(currentClock).find('.lyteClockSWReset')[0].addEventListener('click' , stopWatchReset);
			}
			function stopWatchLap(){
				var lapTime = {};
				lapTime.lapMilliSecs  = _this.getData('ltPropStopMilliSeconds');
				lapTime.lapSeconds  = _this.getData('ltPropStopSeconds');
				lapTime.lapMinutes  = _this.getData('ltPropStopMinutes');
				lapTime.lapHours  = _this.getData('ltPropStopHours');
				var lapTimeArr = _this.getData('ltPropLapTime');
				Lyte.arrayUtils(lapTimeArr ,'push',lapTime);
				_this.setData('ltPropLapTime' , lapTimeArr);
			}

			function stopWatchReset(){
				clearInterval(_this.stopInterval);
				_this.setData('ltPropStopHours' , '00');
				_this.setData('ltPropStopMinutes' , '00');
				_this.setData('ltPropStopSeconds' , '00');
				_this.setData('ltPropStopMilliSeconds' ,'00');
				_this.setData('ltPropLapTime' , []);
				pauseHrsValue = pauseMinValue = pauseSecValue = pauseMilliValue = "00"
				stopWatchMilliSec = 0;
				stopWatchSec = 1;
				stopWatchMin = 1;
				stopWatchHrs = 1;
				_this.setData('ltPropShowStopPause' , false);
				_this.setData('ltPropShowStopLap' , false);
				_this.setData('ltPropShowStopStart' , true);
				_this.setData('ltPropShowStopReset' , false);
				_this.setData('ltPropShowSWHours' , false);
				_this.setData('ltPropShowSWMilliSeconds' , true);
			}

			$L(currentClock).find('.lyteClockSWStart')[0].addEventListener('click' , stopWatchStart);
	},
	lyteAnalogWatch : function(){

		var secondsDial = $L('.lyteClockSecDial')[0];
		var minutesDial = $L('.lyteClockMinDial')[0];
		var hoursDial = $L('.lyteClockHrDial')[0];
		var time = new Date();
		var hrs = time.getHours();
		var min = time.getMinutes();
		var sec = time.getSeconds();
		var secRot = sec*6;
		var minRot = min*6;
		var hrsRot = ((hrs-12) * 30) + (min*.5);

		secondsDial.style.transform = 'rotate(' + secRot + 'deg)';
		minutesDial.style.transform = 'rotate(' + minRot + 'deg)';
		hoursDial.style.transform = 'rotate(' + hrsRot + 'deg)';

		var setAnalogSec = function(){
			var currentSecAngle = secondsDial.style.transform;
			currentSecAngle = currentSecAngle.replace('rotate(','').replace('deg)','');

			time = new Date();
			sec = time.getSeconds();
			// sec = currentSecAngle + 6;
			if(parseFloat(currentSecAngle)>=360){
				currentSecAngle = 0;
			}
			secRot = parseFloat(currentSecAngle) + .6;

			// secRot = (sec*6) + (time.getMilliseconds() * (6/1000));

			secondsDial.style.transform = 'rotate(' + secRot + 'deg)';
		}
		var setAnalogTime = function(){
			time = new Date();
			hrs = time.getHours();
			min = time.getMinutes();

			minRot = min * 6;
			hrsRot = ((hrs-12) * 30) + (min*.5);


			minutesDial.style.transform = 'rotate(' + minRot + 'deg)';
			hoursDial.style.transform = 'rotate(' + hrsRot + 'deg)';
		}


		this.analogSecTimeInt = setInterval(setAnalogSec , 100)
		this.analogTimeInt = setInterval(setAnalogTime , 1000);


	},
	didDestroy : function(){
		function clearIntervalFun(fun){
			if(fun){
				clearInterval(fun);
			}
		}
		clearIntervalFun(this.timerCaseD);
		clearIntervalFun(this.timerCaseT);
		clearIntervalFun(this.timerCaseET);
		clearIntervalFun(this.digiWatch)
		clearIntervalFun(this.forwardTimer)
		clearIntervalFun(this.stopInterval);
		clearIntervalFun(this.analogSecTimeInt);
		clearIntervalFun(this.analogTimeInt);
	}
});


/**
 * @yieldedSyntax
 * <lyte-clock></lyte-clock>
 */
