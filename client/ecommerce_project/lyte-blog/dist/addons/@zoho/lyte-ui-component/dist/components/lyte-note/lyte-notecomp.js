Lyte.Component.register( 'lyte-notecomp', {
_template:"<template tag-name=\"lyte-notecomp\"> <div class=\"lyteNoteMainComment\"> <template is=\"if\" value=\"{{ltPropAvatar}}\"><template case=\"true\"> <img src=\"{{ltPropAvatar}}\" class=\"lyteNoteMainCommentAvatar\"> </template></template> <lyte-note-editor from-main=\"true\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-edit-mode=\"{{lbind(ltPropEditMode)}}\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" close-comment=\"{{method('close_comment')}}\" sanitizer=\"{{sanitizer}}\"></lyte-note-editor> </div> <div class=\"lyteNoteCommentWrapper\"> <template is=\"for\" items=\"{{ltPropPinnedComments}}\" item=\"item\" index=\"index\"> <lyte-comment lt-prop-pinned-comment=\"true\" id=\"pinned_{{item.id}}\" data-index=\"pin_{{index}}\" class=\"lyteNotePinnedComment\" onclick=\"{{action('pinned',event,this,item)}}\" onmouseenter=\"{{action('pinEnter',this,event)}}\" lt-prop-value=\"{{lbind(item.value)}}\" sanitizer=\"{{sanitizer}}\"> <template is=\"registerYield\" yield-name=\"lyte-pinned-note\" from-parent=\"\" item=\"{{item}}\"></template> </lyte-comment> </template><template is=\"for\" items=\"{{ltPropComments}}\" item=\"item\" index=\"index\"> <lyte-comment id=\"{{item.id}}\" class=\"lyteNoteComment {{item.class}}\" lt-prop=\"{{stringify(item)}}\" lt-prop-edit=\"{{item.edit}}\" lt-prop-delete=\"{{item.delete}}\" lt-prop-value=\"{{lbind(item.value)}}\" on-time-conversion=\"{{method('timeConversion')}}\" data-index=\"{{concat(index)}}\" lt-prop-reply=\"{{item.reply}}\" lt-prop-header=\"{{item.header}}\" lt-prop-footer=\"{{item.footer}}\" lt-prop-emoji=\"{{item.emoji}}\" lt-prop-edit-mode=\"{{lbind(item.editmode)}}\" lt-prop-buttons=\"{{ltPropButtons}}\" on-trigger=\"{{method('onTrigger')}}\" lt-prop-text-editor=\"{{ltPropTextEditor}}\" lt-prop-editor-panel=\"{{ltPropEditorPanel}}\" lt-prop-file-upload=\"{{ltPropFileUpload}}\" lt-prop-attachments=\"{{item.attachments}}\" lt-prop-style=\"{{item.style}}\" lt-prop-editor-animation=\"{{ltPropEditorAnimation}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" lt-prop-voice-note=\"{{item.voiceNote}}\" lt-prop-pin=\"{{item.pin}}\" sanitizer=\"{{sanitizer}}\"> <template is=\"registerYield\" yield-name=\"lyte-note-checkin\" from-parent=\"\"></template> </lyte-comment> </template><template is=\"if\" value=\"{{ltPropPinnedComments.length}}\"><template case=\"true\"> <lyte-menu lt-prop-yield=\"true\" lt-prop-query=\".lyteNoteUnpinIcon\" on-menu-click=\"{{method('unpinSelect')}}\" lt-prop-wrapper-class=\"lyteNoteUnpinMenu\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item data-value=\"unpin\" class=\"lyteNoteUnpinOption\">{{ltPropText.unpin}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <lyte-hovercard lt-prop-class=\"lyteNotePinTooltipWrapper\" lt-prop-show=\"{{lbind(pinShow)}}\" lt-prop-origin-elem=\".lyteNotePinOrigin\" on-hovercard-hide=\"{{method('pinHide')}}\" lt-prop-hide-on-click=\"true\" lt-prop-keep-alive=\"true\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <span class=\"lyteNotePinMessage\">{{unescape(pin.message)}}</span> <span class=\"lyteNotePinnedTime\">{{pin.time}}</span> </lyte-hovercard-content> </template> </lyte-hovercard> </template></template> </div> <lyte-popover class=\"lyteNoteEmojiPopover\" lt-prop=\"{{stringify(ltPropPopover)}}\" lt-prop-origin-elem=\".lyte_note_origin_elem\" lt-prop-show=\"{{lbind(popoverShow)}}\"> <template is=\"registerYield\" yield-name=\"popover\"> <lyte-emoji lt-prop=\"{{stringify(ltPropEmojiProps)}}\" on-emoji-select=\"{{method('emojiselect')}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></lyte-emoji> </template> </lyte-popover> <template is=\"if\" value=\"{{expHandlers(ltPropColors,'!')}}\"><template case=\"true\"> <lyte-colorpicker lt-prop=\"{{stringify(ltPropColorPicker)}}\" lt-prop-origin-element=\".lyte_note_bgswitch_elem\" lt-prop-show=\"{{lbind(bgSwitch)}}\" on-select=\"{{method('colorPickerSelect')}}\" lt-prop-wrapper-class=\"lyteNoteBgSwitcherPopover\"></lyte-colorpicker> </template></template> <lyte-messagebox lt-prop-type=\"info\" lt-prop-show=\"{{lbind(messageShow)}}\" lt-prop-message=\"{{message}}\"></lyte-messagebox> <lyte-menu lt-prop-wrapper-class=\"lyteNoteOptionsMenu\" lt-prop-yield=\"true\" lt-prop-query=\".lyteNoteCommentMoreOptions\" on-menu-click=\"{{method('optionsMenuSelect')}}\" on-before-open=\"{{method('beforeOpenOptionsMenu')}}\" on-before-close=\"{{method('beforeCloseOptionsMenu')}}\"> <template is=\"registerYield\" yield-name=\"yield\"> <lyte-menu-body> <lyte-menu-item data-value=\"delete\" class=\"lyteNoteDeleteOption {{if(isDelete,'','lyteEditorHide')}}\">{{ltPropText.delete}}</lyte-menu-item> <lyte-menu-item data-value=\"pin\" class=\"lyteNotePinOption {{if(isPin,'','lyteEditorHide')}}\">{{if(isPinned,ltPropText.unpin,ltPropText.pin)}}</lyte-menu-item> <lyte-menu-item data-value=\"view\" class=\"lyteNoteViewReactionsOption {{if(isReact,'','lyteEditorHide')}}\">{{ltPropText.viewReactions}}</lyte-menu-item> </lyte-menu-body> </template> </lyte-menu> <template is=\"if\" value=\"{{renderView}}\"><template case=\"true\"> <lyte-reaction-view lt-prop-show=\"{{lbind(showViewArray)}}\" lt-prop-comment=\"{{lbind(currentComment)}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-text=\"{{ltPropText}}\" on-time-conversion=\"{{method('timeConversion')}}\" lt-prop=\"{{ltPropReaction}}\"></lyte-reaction-view> </template></template><template is=\"if\" value=\"{{editAlertRender}}\"><template case=\"true\"> <lyte-alert lt-prop-top=\"0\" lt-prop-yield=\"true\" lt-prop-wrapper-class=\"lyteNoteAlert\" lt-prop-show=\"{{lbind(alertShow)}}\"> <template is=\"registerYield\" yield-name=\"alert\"> <lyte-alert-header>{{ltPropText.editAlertHeader}}</lyte-alert-header> <lyte-alert-content>{{ltPropText.editAlertMessage}}</lyte-alert-content> <lyte-alert-footer> <lyte-button class=\"lyteNoteKeepEditingButton\" onclick=\"{{action('keepedit')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropText.keepEditing}} </template> </lyte-button> <lyte-button class=\"lyteNoteContinueButton\" lt-prop-appearance=\"failure\" onclick=\"{{action('continue')}}\"> <template is=\"registerYield\" yield-name=\"text\"> {{ltPropText.continue}} </template> </lyte-button> </lyte-alert-footer> </template> </lyte-alert> </template></template> <lyte-hovercard lt-prop-class=\"lyteNoteEmojiTooltipWrapper\" lt-prop-show=\"{{lbind(hovercardShow)}}\" lt-prop-origin-elem=\".lyteNoteHoverOrigin\" on-hovercard-hide=\"{{method('hoverHide')}}\" lt-prop-hide-on-click=\"true\" lt-prop-keep-alive=\"true\"> <template is=\"registerYield\" yield-name=\"hoverCardYield\"> <lyte-hovercard-content> <div class=\"lyteNoteEmojiTooltipTitle\">{{hoverEmoji.name}}</div> <ul class=\"lyteNoteEmojiTooltipNames\"> <template is=\"for\" items=\"{{hoverEmoji.reacted}}\" item=\"item\" index=\"index\"> <li class=\"lyteNoteEmojiIndividualName\">{{item}}</li> </template> </ul> </lyte-hovercard-content> </template> </lyte-hovercard> <lyte-colorbox lt-prop-yield=\"true\" on-before-open=\"{{method('cboxBeforeOpen')}}\" on-navigate=\"{{method('cboxNavigate')}}\" on-close=\"{{method(&quot;cboxClose&quot;)}}\"> <template is=\"registerYield\" yield-name=\"colorBoxYield\"> <div id=\"lyteColorbox\" class=\"lyteColorbox lyteCBox lyteNoteComponentColorbox\"> <div class=\"lyteColorboxFreezeLayer lyteCBoxOverlay\"></div> <div class=\"lyteColorboxWrapper\"> <div class=\"lyteColorboxUtilDiv {{if(isImage,'','lyteCBoxDNImp')}}\"> <span class=\"lyteCBoxZoomOut lyteColorboxZoomOut lyteColorboxDisabled\"></span> <span class=\"lyteCBoxReset lyteColorboxReset lyteColorboxDisabled\"></span> <span class=\"lyteCBoxZoomIn lyteColorboxZoomIn\"></span> </div> <div class=\"lyteColorboxContent lyteCBoxContent\" style=\"position: unset;\"> <span class=\"lyteColorboxLoadingImg\"></span> <template is=\"if\" value=\"{{isNoPreview}}\"><template case=\"true\"> <div class=\"lyteNoteComponentNoPreviewWrap\"> <span class=\"lyteNoteComponentNoPreviewIcon {{previewType}}\"></span> <span class=\"lyteNoteComponentNoPreviewMessage\">{{ltPropText.noPreviewMessage}}</span> </div> </template></template> </div> <div class=\"lyteColorboxHeader\"> <div class=\"lyteNoteComponentFileDetailWrapper\"> <div class=\"lyteColorboxTitle lyteCBoxTitle\" onmouseenter=\"{{action('enter',this)}}\" lt-prop-tooltip-title=\"lyteNoteColorBoxTooltip\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\"></div> <div class=\"lyteNoteComponentFileDetail\"> <span class=\"lyteNoteComponentFileDate\" lt-prop-title=\"{{previewDate.tooltip}}\" lt-prop-tooltip-config=\"{{ltPropTooltipConfig}}\" lt-prop-tooltip-class=\"lyteNoteColorboxTooltip\">{{previewDate.display}}</span> <span class=\"lyteNoteComponentFileSize\">{{fileSize}}</span> </div> </div> <div class=\"lyteColorboxDownloadDiv lyteCBoxDownload\"> <span class=\"lyteColorboxDownloadImg\"></span> </div> </div> </div> <div class=\"lyteColorboxCloseIcon lyteCBoxClose\"></div> <div class=\"lyteColorboxIconDiv lyteCBoxPrevious {{prevIconClass}}\"> <div class=\"lyteColorboxPreviousIcon\"></div> </div> <div class=\"lyteColorboxIconDiv lyteCBoxNext {{nextIconClass}}\"> <div class=\"lyteColorboxNextIcon\"></div> </div> <div class=\"lyteColorboxThumbInnerWrapper\"> <template is=\"for\" items=\"{{thumbnails}}\" item=\"item\" index=\"index\"> <div class=\"lyteColorboxThumb {{if(ifEquals(index,thumbIndex),'thumb-on','')}}\" data-thumb-val=\"{{thumbnailValue}}\" onclick=\"{{action('thumbClick',index)}}\"> <template is=\"if\" value=\"{{expHandlers(item.ctype,'==',&quot;photo&quot;)}}\"><template case=\"true\"> <img class=\"lyteNoteColorboxImg\" src=\"{{item.src}}\"> </template><template case=\"false\"> <div class=\"lyteCBoxIframeWrap\"> <div class=\"lyteCBoxIframeIcon\"></div> <div class=\"lyteCBoxIframeLabel\">{{item.fileType}}</div> </div> </template></template> </div> </template> </div> </div> </template> </lyte-colorbox> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[3,1]},{"type":"for","position":[3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,2]},{"type":"for","position":[3,2],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[]},{"type":"componentDynamic","position":[1]}]},{"type":"attr","position":[3,3]},{"type":"if","position":[3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[1]},{"type":"attr","position":[3]},{"type":"registerYield","position":[3,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[3]}]}},"default":{}},{"type":"attr","position":[5]},{"type":"registerYield","position":[5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[5]},{"type":"attr","position":[7]},{"type":"if","position":[7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[9]},{"type":"componentDynamic","position":[9]},{"type":"attr","position":[11]},{"type":"registerYield","position":[11,1],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"text","position":[1,3,0]},{"type":"componentDynamic","position":[1,3]},{"type":"attr","position":[1,5]},{"type":"text","position":[1,5,0]},{"type":"componentDynamic","position":[1,5]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[11]},{"type":"attr","position":[13]},{"type":"if","position":[13],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[14]},{"type":"if","position":[14],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"registerYield","position":[1,1],"dynamicNodes":[{"type":"text","position":[1,0]},{"type":"componentDynamic","position":[1]},{"type":"text","position":[3,0]},{"type":"componentDynamic","position":[3]},{"type":"attr","position":[5,1]},{"type":"registerYield","position":[5,1,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,1]},{"type":"attr","position":[5,3]},{"type":"registerYield","position":[5,3,1],"dynamicNodes":[{"type":"text","position":[1]}]},{"type":"componentDynamic","position":[5,3]},{"type":"componentDynamic","position":[5]}]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[16]},{"type":"registerYield","position":[16,1],"dynamicNodes":[{"type":"text","position":[1,1,0]},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"text","position":[1,0]}]},{"type":"componentDynamic","position":[1]}]},{"type":"componentDynamic","position":[16]},{"type":"attr","position":[18]},{"type":"registerYield","position":[18,1],"dynamicNodes":[{"type":"attr","position":[1,3,1]},{"type":"attr","position":[1,3,3,3]},{"type":"if","position":[1,3,3,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]}]}},"default":{}},{"type":"attr","position":[1,3,5,1,1]},{"type":"attr","position":[1,3,5,1,3,1]},{"type":"text","position":[1,3,5,1,3,1,0]},{"type":"text","position":[1,3,5,1,3,3,0]},{"type":"attr","position":[1,7]},{"type":"attr","position":[1,9]},{"type":"attr","position":[1,11,1]},{"type":"for","position":[1,11,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]}]},"false":{"dynamicNodes":[{"type":"text","position":[1,3,0]}]}},"default":{}}]}]},{"type":"componentDynamic","position":[18]}],
_observedAttributes :["ltPropComments","ltPropEditMode","ltPropPopover","ltPropColorPicker","ltPropButtons","ltPropTooltipConfig","ltPropAvatar","ltPropTextEditor","ltPropEditorPanel","ltPropColors","ltPropFileUpload","ltPropEditorAnimation","ltPropEmojiProps","ltPropUploadInfoMessage","ltPropEmptyInfoMessage","ltPropText","ltPropScrollDuration","ltPropReaction","ltPropEditAlert","ltPropUserId","ltPropMaxTooltipNames","ltPropPinnedComments","popoverShow","bgSwitch","messageShow","message","fileDate","fileTime","fileSize","isImage","isNoPreview","previewType","thumbnails","thumbnailValue","thumbIndex","prevIconClass","nextIconClass","renderView","currentComment","showViewArray","previewDate","editAlertRender","alertShow","hovercardShow","hoverEmoji","isDelete","isPin","isReact","isPinned","pinShow","pin","sanitizer"],
	data: function() {
			return {

				// comment

				ltPropComments : Lyte.attr( 'array', { default : [] } ),
				ltPropEditMode : Lyte.attr( 'boolean', { default : false } ),

				ltPropPopover : Lyte.attr( 'object', { default : { 
					freeze : false ,
					wrapperClass : 'lyteNoteEmojiPopover',
					type : 'box',
					showCloseButton : false
				} } ),

				ltPropColorPicker : Lyte.attr( 'object', { default : { 
					freeze : false ,
					wrapperClass : 'lyteNoteBgSwitchPopover',
					type : 'box',
					showCloseButton : false,
					noFillButton : true
				} } ),

				ltPropButtons : Lyte.attr( 'string', { default : '[{"text":"Cancel","method":"cancel","properties":{"size":"small"}},{"text":"Save","method":"save","properties":{"appearance":"primary","size":"small"}}]' } ),

				ltPropTooltipConfig : Lyte.attr( 'object', { default : { position : "bottom" } } ),

				ltPropAvatar : Lyte.attr( 'string', { default : '' } ),

				ltPropTextEditor : Lyte.attr( 'object', { default : { wordStyle : {
						whiteSpace: "break-spaces"
					},
					placeholder : "Add a note ...",
					checkbox : {
						prevent : true
					}
				} } ),

				ltPropEditorPanel : Lyte.attr( 'object', { default : {
					tooltipConfig : {
						position : "bottom"
					},
					icons : [
								{
									class : "formatting",
									subIcons : [
										{
											type : "switch",
											name : "bold",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'fontWeight', 'bold' ],
											title : "bold",
											active : false
										},
										{
											type : "switch",
											name : "italic",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'fontStyle', 'italic' ],
											title : "italic",
											active : false
										},
										{
											type : "switch",
											name : "underline",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'textDecoration', 'underline' ],
											title : "underline",
											active : false
										},
										{
											type : "switch",
											name : "strike",
											display : '',
											functionName : "toggleWordClass",
											arguments : [ 'textDecoration', 'line-through' ],
											title : "strike",
											active : false
										}
									]
								},
								{
									class : "formatting",
									subIcons : [
										{
											type : "switch",
											name : "ul",
											display : "",
											functionName : "list",
											selected : "",
											arguments : [ '{{selected}}' ],
											title : "ul",
											active : false
										},
										{
											type : "switch",
											name : "decimal",
											display : "",
											functionName : "ordered",
											selected : "",
											arguments : [ '3' ],
											title : "ol",
											active : false
										},
										{
											type : "anchor",
											name : "anchor",
											display : "",
											functionName : "toggleWordClass",
											arguments : [ 'lyteEditorAnchor' ],
											title : "anchor",
											active : false
										}
									]
								},
								{
									class : 'colorpicker',
									subIcons : [
										{
											type : "colorpicker",
											name : "color",
											display : "",
											selected : "black",
											functionName : "toggleWordClass",
											arguments : [ 'color', '{{selected}}' ],
											title : "color",
											active : false
										},
										{
											type : "colorpicker",
											name : "bg",
											display : "",
											selected : "white",
											functionName : "toggleWordClass",
											arguments : [ 'backgroundColor', '{{selected}}' ],
											title : "background",
											active : false
										}
									]
								},
								{
									class : 'clearformatting',
									subIcons : [
										{
											type : "switch",
											name : "clear",
											display : "",
											functionName : "clearFormat",
											title : "clear format",
											arguments : [ '' ],
											action : false
										}
									]
								}				
							]
				} } ),

				ltPropColors : Lyte.attr( 'array', { default : [
					{
					      background: '#DDF2D9',
					      border: '1px solid #A9E198'
					},
					{
					      background: '#CEF7F8',
					      border: '1px solid #97E4E3'
					},
					{
					      background: '#F8DDCE',
					      border: '1px solid #F5B388'
					},
					{
					      background: '#F5E5FA',
					      border: '1px solid #E3B2EE'
					},
					{
					      background: '#F8DCEA',
					      border: '1px solid #F39BBF'
					},
					{
					      background: '#fff',
					      border: ''
					}
				] } ),

				ltPropFileUpload : Lyte.attr( 'object', { default : { filesCount : 5, totalFilesSize : '20MB', thumb : true, appearance : "Btn", ajax : { url : "/imageupload" } } } ),

				ltPropEditorAnimation : Lyte.attr( 'string', { default : 'slide' } ),

				ltPropEmojiProps : Lyte.attr( 'object', { default : {} } ),

				ltPropUploadInfoMessage : Lyte.attr( "string" ),

				ltPropEmptyInfoMessage : Lyte.attr( "string" ),

				ltPropText : Lyte.attr( "object", { default : {
					fileUpload : "File upload",
					storage : "Storage",
					limit : "( Limit 5 files )",
					smileyIcon : "smileys",
					attachFiles : "Attach files",
					noteBackground : "Note background",
					more : "More",
					failureMessage : "Attachment failed", 
					retryText : "Retry",
					noPreviewMessage : "Sorry, No preview is available for this format",
					thumbnailIndex : "{{index}} of {{total}}",
					noResult : "No results found",
					all : "All",
					editAlertHeader : "Discard the changes in current note?",
					editAlertMessage : "You will lose any unsaved changes in your note",
					keepEditing : "Cancel",
					continue : "Discard",
					delete : "Delete",
					pin : "Pin",
					unpin : "Unpin",
					viewReactions : "View reactions",
					pinnedBy : "Pinned by <span class = \"lyteNotePinnedBy\">{{0}}</span>"
				} } ),

				ltPropScrollDuration : Lyte.attr( 'number', { default : 400 } ),

				ltPropReaction : Lyte.attr( 'string', { default : '{}' } ),

				ltPropEditAlert : Lyte.attr( 'boolean', { default : true } ),

				ltPropUserId : Lyte.attr( 'string' ),

				ltPropMaxTooltipNames : Lyte.attr( 'number', { default : 6 } ),

				ltPropPinnedComments : Lyte.attr( 'array', { default : [] } ),

				// system

				popoverShow : Lyte.attr( 'boolean', { default : false } ),

				bgSwitch : Lyte.attr( 'boolean', { default : false } ),

				messageShow : Lyte.attr( "boolean", { default : false } ),

				message : Lyte.attr( "string", { default : "" } ),

				fileDate : Lyte.attr( 'string' ),

				fileTime : Lyte.attr( 'string' ),

				fileSize : Lyte.attr( 'string' ),

				isImage : Lyte.attr( 'boolean' ),

				isNoPreview : Lyte.attr( 'boolean' ),

				previewType : Lyte.attr( 'string' ),

				thumbnails : Lyte.attr( 'array', { default : [] } ),

				thumbnailValue : Lyte.attr( 'string' ),

				thumbIndex : Lyte.attr( 'number' ),

				prevIconClass : Lyte.attr( 'string' ),

				nextIconClass : Lyte.attr( 'string' ),

				renderView : Lyte.attr( 'boolean', { default : false } ),

				currentComment : Lyte.attr( 'object', { default : {} } ),

				showViewArray : Lyte.attr( 'boolean', { default : false } ),

				previewDate : Lyte.attr( 'object', { default : {} } ),

				editAlertRender : Lyte.attr( 'boolean' ),

				alertShow : Lyte.attr( 'boolean' ),

				hovercardShow : Lyte.attr( 'boolean', { default : false }),

				hoverEmoji : Lyte.attr( 'object', { default : {} } ),

				isDelete : Lyte.attr( 'boolean' ),
				isPin : Lyte.attr( 'boolean' ),
				isReact : Lyte.attr( 'boolean' ),
				isPinned : Lyte.attr( 'boolean' ),

				pinShow : Lyte.attr( 'boolean' ),
				pin : Lyte.attr( 'object' ),

				sanitizer : Lyte.attr( 'object', {
					default : {
						attr : Lyte.Security.createSanitizer( { ADD_URI_SAFE_ATTR : [ "style" ], ALLOWED_STYLE : "ALL", STYLE_VALIDATION : false })
					}
				})
		}
	},

	clear_cbox : function(){
		delete this.__comment;
		delete this.__index;
		this.setData( 'thumbnails', [] );
	},

	clear_alert : function(){
		delete this.__promeditor;
		delete this.__promcomment;
		delete this.__executeArg;
	},

	didDestroy : function(){
		this.clear_cbox();
		this.clear_alert();

		clearTimeout( this.__pintime );
	},

	comments_obs : function( arg ){
		if( arg.insertedItems ){
			var index = arg.index,
			wrapper = $L( this.$node ).children( '.lyteNoteCommentWrapper' ),
			comment = wrapper.children().get( this.data.ltPropPinnedComments.length + index ),
			_top = this.get_scrolltop( wrapper.get( 0 ), comment );

			wrapper.scrollTo( { top : _top }, {
				duration : this.data.ltPropScrollDuration,
				onAfter : function(){
					$L( comment ).addClass( "lyteNoteNewComment" );
				}.bind( this )	
			} );

		}
	}.observes( 'ltPropComments.[]' ),

	didConnect : function(){
		this.$node.removeAllFiles = this.removeAllFiles.bind( this );

		this.$node.getBackground = function( editor ){
			var note_comp = $L( editor ).closest( 'lyte-note-editor' ).get( 0 ),
			obj = {};

			[ 'background', 'border' ].forEach( function( item ){
				obj[ item ] = note_comp.ltProp( item );
			});

			return obj;
		};

		this.$node.setBackground = function( editor, obj ){
			$L( editor ).closest( 'lyte-note-editor' ).get( 0 ).ltProp( obj );
		};

		this.$node.viewReactions = this.viewReactions.bind( this );
	},

	viewReactions : function( comment_obj ){
		this.setData( 'renderView', true );
		this.setData( 'currentComment', comment_obj );
		this.setData( 'showViewArray', true );
	},	

	get_element : function( selector ){
		if( !selector || selector.constructor == String ){
			return $L( selector ? ( '#' + selector ) : ( ".lyteNoteMainComment" ), this.$node );
		}
		return $L( selector ).closest( '.lyteNoteEditorWrapper' );
	},

	removeAllFiles : function( editor ){
		var file = this.get_element( editor ).find( 'lyte-fileupload' ).get( 0 ),
		queueList = file.component.data.queueList,

		files = queueList.map( function( item ){
			return item.id;
		});

		files.forEach( function( item ){
			file.removeUpload( item );
		});
	},

	setup_file_data : function( comment, index ){
		var attachments = comment.ltProp( 'attachments' ),
		 current = attachments[ index ],
		 time = comment.ltProp( 'createdTime' ),
		 ctype = current.ctype,
		 arrow_class = 'lyteColorboxHideVisibility';

		 if( time ){
		 	 this.setData( 'previewDate', this.timeConversion( time, 'colorbox' ) );
		 }

		 this.setData( 'fileSize', Lyte.Component.registeredHelpers.lyteUiFileSize( current.size, '', 1 ) );

		 this.setData( 'isImage', ctype == 'photo' );

		 this.setData( 'previewType', $L( ctype.split( '/' ) ).get( -1 ) );
		 this.setData( 'isNoPreview', /^custom/i.test( ctype ) );

		 this.setData( 'thumbnailValue', this.get_thumb_index( index, attachments ) );

		 this.setData( 'thumbIndex', index );

		 this.setData( 'prevIconClass', index == 0 ? arrow_class : '' );
		 this.setData( 'nextIconClass', ++index == attachments.length ? arrow_class : '' );
	},

	get_thumb_index : function( index, attachments ){
		return this.data.ltPropText.thumbnailIndex.replace( "{{index}}", ++index ).replace( "{{total}}", attachments.length );
	},

	timeConversion : function(){
		var name = 'onTimeConversion';
		if( this.getMethods( name ) ){
			var arg = Array.from( arguments );
			arg.unshift( name );
			return this.executeMethod.apply( this, arg );
		}
	},

	construct_react : function( obj, id, count ){
		var arr = [],
		_reacted = obj.reacted,
		_index,
		i = 0;

		if( obj.selected ){
			_reacted.every( function( item, index ){
				if( item.id == id ){
					arr.push( 'you' /*item.name*/ );
					_index = index;
					return false;
				}
				return true;
			});
			count--;
		}

		while( true ){
			if( i == _index && ++i ){
				continue;
			}

			if( _reacted[ i ] == void 0 ){
				break;
			}

			arr.push( _reacted[ i++ ].name );

			if( arr.length == count ){
				arr.push( '+' + ( _reacted.length - count ) + 'more...' );
				break;
			}
		}
		return arr;
	},

	methods : {

		pinHide : function(){
			$L( '.lyteNotePinOrigin', this.$node ).removeClass( 'lyteNotePinOrigin' );
			this.setData( 'pin', {} );
		},

		unpinSelect : function(){
			var cb = 'onCommentUnpin',
			args = arguments;

			if( this.getMethods( cb ) ){
				var elem = args[ 3 ],
				comment = this.$node.querySelector( 'lyte-comment#' + elem.parentNode.id );
				return this.executeMethod( cb, args[ 1 ], elem, comment, this.get_comment_index( comment ) );
			}
		},

		optionsMenuSelect : function( type, evt, menu, element ){
			var cb,
			data = this.data;

			switch( type ){
				case 'view' : {
					if( data.isReact ){
						cb = 'onViewReaction';
					}
				}
				break;
				case 'delete' : {
					if( data.isDelete ){
						cb = "onCommentDelete";
					}
				}
				break;
				case 'pin' : {
					if( data.isPin ){
						if( data.isPinned ){
							cb = "onCommentUnpin";
						} else{
							cb = "onCommentPin";
						}
					}
				}
			}

			if( cb && this.getMethods( cb ) ){
				var comment = element.closest( 'lyte-comment' );
				return this.executeMethod( cb, evt, element, comment, this.get_comment_index( comment ) );
			}
		},

		beforeCloseOptionsMenu : function( menu ){
			$L( menu.element ).closest( 'lyte-comment' ).removeClass( 'lyteNoteOptionsMenuOpened' );
		},

		beforeOpenOptionsMenu : function(){
			var comment = arguments[ 2 ].closest( 'lyte-comment' ),
			data = comment.component.data;

			$L( comment ).addClass( 'lyteNoteOptionsMenuOpened' );

			this.setData({
				isDelete : 	data.ltPropDelete,
				isPin : data.ltPropPin,
				isReact : data.isReacted,
				isPinned : this.data.ltPropPinnedComments.findIndex( function( item ){
					return item.id == comment.id;
				}) != -1
			});
		},

		hoverHide : function(){
			$L( '.lyteNoteHoverOrigin', this.$node ).removeClass( 'lyteNoteHoverOrigin' );
			this.setData( 'hoverEmoji', {} );
		},

		hovercard_show : function( evt, element, comment, comment_data ){
			var $element = $L( element ), 
			index = Number( $element.parent().attr( 'data-index' ) ),
			data = comment_data.sectionArray[ comment_data.sectionIndex ],
			current_emoji = data.emoji[ index ],
			count = this.data.ltPropMaxTooltipNames,
			id = this.data.ltPropUserId;

			$element.addClass( 'lyteNoteHoverOrigin' );

			this.setData( 'hoverEmoji', {
				name : current_emoji.name,
				reacted : this.construct_react( current_emoji, id, count )
			});

			this.setData( 'hovercardShow', true );
		},

		close_comment : function(){
			return this.close_all_comments();
		},

		cboxClose : function(){
			this.clear_cbox();
		},	

		cboxBeforeOpen : function(){
			this.setup_file_data( this.__comment, this.__index );
		},

		cboxNavigate : function(){
			this.setup_file_data( this.__comment, arguments[ 2 ] - 1 );
		},

		timeConversion : function(){
			return this.timeConversion.apply( this, arguments );
		},

		emojiselect : function( obj ){
			var origin = $L( '.lyte_note_origin_elem', this.$node );

			if( origin.hasClass( 'lyteNoteSmileyIcon' ) ){
				var editor = origin.closest( '.lyteNoteEditorWrapper' ).find( 'lyte-texteditor' ).get( 0 );
				
				editor.insertHTML( obj.encode );
				editor.focus();

			} else {
				var callback = 'onEmojiSelect';
				if( this.getMethods( callback ) ){
					this.executeMethod( callback, obj, this.get_comment_index( $L( '.lyte_note_origin_elem' ).closest( 'lyte-comment' ).get( 0 ) ) );
				}
			}
			this.setData( 'popoverShow', false );
		},

		onTrigger : function( value, position, editor ){
			if( this.getMethods( 'onTrigger' ) ){
				return this.executeMethod( 'onTrigger', value, position, editor );
			}
		},

		colorPickerSelect : function(){
			$L( '.lyte_note_bgswitch_elem', this.$node ).closest( 'lyte-note-editor' ).get( 0 ).ltProp( 'background', arguments[ 1 ].hex );
			this.setData( 'bgSwitch', false );
		}
	},

	emoji_obs : function(){
		if( !this.data.popoverShow ){
			$L( $L( 'lyte-popover.lyteNoteEmojiPopover', this.$node ).get( 0 ).component.actualModalDiv ).find( 'lyte-emoji' ).get( 0 ).resetValue();
		}
	}.observes( 'popoverShow' ),

	get_comment_index : function( comment, prev ){

		var index = this.get_comment_index_fork( comment, prev ),
		format = this.get_correct_data( index, this.data.ltPropComments ); 

		index.sectionArray = format.array;
		index.sectionIndex = format.index;

		return index;
	},

	get_comment_index_fork : function( comment, prev ){
		var jobj = $L( comment ),
		obj = {
			node : comment,
			index : parseInt( jobj.attr( 'data-index' ) )
		},
		parent_comment = jobj.parent().closest( 'lyte-comment' ).get( 0 );

		if( prev ){
			obj.child = prev;
		}

		if( parent_comment ){
			return this.get_comment_index_fork( parent_comment, obj );
		}
		return obj;
	},

	find_index : function( array, key, value ){
		var index = -1;

		array.every( function( item, _index ){

			if( item[ key ] == value ){
				index = _index;
			}

			return index == -1;
		});

		return index;
	},

	preview_click : function(){ 
		var arg = arguments,
		comment = arg[ 3 ],
		image = $L( arg[ 2 ] ),
		index = Number( image.attr( "data-index" ) ),
		attachments = comment.ltProp( "attachments" ),
		colorbox = $L( this.$node ).children().get( -1 );

		this.__comment = comment;
		this.__index = index;

		this.setData( 'thumbnails', attachments );

		colorbox.ltProp( "selectors", [ "." + comment.id +"_preview" ] );

		return false;
	},

	get_files : function( editor ){
		var file = $L( editor ).closest( '.lyteNoteEditorWrapper' ).find( 'lyte-fileupload' ).get( 0 ),
		queueList = file.component.data.queueList,
		fn = function( name ){
			return queueList.filter( function( item ){
				return item.status == name;
			});
		};

		return[ fn( "success" ), fn( "uploading" ), fn( "failure" ) ]; 
	},

	/*
		Recursive function for finding exact data for comment / reply

		data format will be 

		{
			node : comment / reply element,
			index : comment / reply index,
			child : {
				// same set. inner most child is the comment to be altered
			}
		}
	*/

	get_correct_data : function( data, array ){
		if( data.child ){
			return this.get_correct_data( data.child, array[ data.index ].reply );
		} 
		return {
			array : array,
			index : data.index
		};
	},

	make_main_draft : function(){
		if( this.data.ltPropEditMode ){
			var editor_comp = $L( 'lyte-note-editor', this.$node ).eq( 0 ),
			text_editor = editor_comp.find( 'lyte-texteditor' ).get( 0 ),
			files = this.get_files( text_editor ),
			isEmpty = text_editor.getData( 'showPlaceholder' ),
			is_zero = function( arr ){
				return arr.length == 0;
			},
			_this = this,
			draft_need = !( isEmpty && is_zero( files[ 0 ] ) && is_zero( files[ 1 ] ) && is_zero( files[ 2 ] ) ),
			fn = function(){
				_this.$node.ltProp( 'editMode', false ); 
			};

			if( draft_need ){
				// if( _this.data.ltPropEditAlert ){
				// 	this.render_edit_alert( text_editor );
				// 	return true;
				// } else {
					editor_comp.get( 0 ).setData( 'draftMode', true );
					fn();
				// }
			} else {
				fn();
			}
		}
	},

	render_edit_alert : function( editor ){
		this.setData( 'editAlertRender', true );
		this.setData( 'alertShow', true );
		this.__promeditor = editor;
	},

	close_all_comments : function( arg ){
		var _this = this,
		ret;

		( arg || _this.data.ltPropComments ).every( function( item ){
			if( item.editmode ){
				var comment = $L( '#' + item.id, _this.$node ),
				editor = comment.find( 'lyte-texteditor' ).get( 0 );

				if( _this.data.ltPropEditAlert ){ 
					_this.__promcomment = comment;
					_this.render_edit_alert( editor );
					ret = true;
				} else {
					_this.call_cancel( editor, comment );
				}
			}
			if( _this.close_all_comments( item.reply || [] ) ){
				return false;
			}
			return !ret;
		}); 

		return ret;
	},

	call_cancel : function( editor, comment, name ){
		return this.execute( [ name || 'onCommentCancel', editor, this.get_comment_index( comment ) ].concat( this.get_files( editor ) ) );
	},

	get_scrolltop : function( wrapper, comment ){
		var sH = wrapper.scrollHeight,
		oH = wrapper.offsetHeight,
		oT = comment.offsetTop,
		elems = Array.from( wrapper.querySelectorAll( '.lyteNotePinnedComment' ) ),
		off = 0,
		max_scroll = sH - oH;

		elems.forEach( function( item ){
			off += item.offsetHeight;
		});

		return Math.min( oT - off - 10, max_scroll );
	},

	actions : {

		pinEnter : function( _this, evt ){
			var fn = function(){
				
				var index = Number( $L( _this ).addClass( 'lyteNotePinOrigin' ).attr( 'data-index' ).replace( 'pin_', '' ) ),
				obj = this.data.ltPropPinnedComments[ index ].pinnedBy,
				time = ( this.timeConversion( obj.pinnedTime, 'pin' ) || { display : "" } ).display,
				cb = "onTimeConversion";

				this.setData( 'pin',{
					message : this.data.ltPropText.pinnedBy.replace( "{{0}}", obj.name ),
					time : time
				});
				this.setData( 'pinShow', true );
			}.bind( this );
			
			if( this.data.pinShow ){
				this.__pintime = setTimeout( fn, 500 );
			} else {
				fn();
			}
		},

		pinned : function( evt, fake_comment, data ){
			var comment = $L( 'lyte-comment#' + data.id, this.$node ).get( 0 );

			if( $L( evt.target ).hasClass( 'lyteNoteUnpinIcon' ) ){
				return;
			}

			$L.fastdom.measure( function(){
				var wrapper = $L( this.$node ).children( '.lyteNoteCommentWrapper' ),
				cls_name = "lyteNotePinnedCommentClick",
				fn = function( _evt ){
					$L( _evt.currentTarget ).removeClass( cls_name ).off( {
						animationend : fn,
						transitionend : fn	
					});
				};
				wrapper.scrollTo( { top : this.get_scrolltop( wrapper.get( 0 ), comment ) }, {
					duration : this.data.ltPropScrollDuration,
					onAfter : function(){
						$L( comment ).addClass( cls_name ).on( {
							animationend : fn,
							transitionend : fn	
						});
					}.bind( this )	
				});
			}.bind( this ));
		},

		keepedit : function(){
			this.setData( 'alertShow', false );
			this.__promeditor.focus();
			this.clear_alert();
		},

		continue : function(){
			this.setData( 'alertShow', false );
			
			var exe_arg = this.__executeArg,
			comment = this.__promcomment,
			editor = this.__promeditor;

			if( comment ){
				this.call_cancel( editor, comment );
			}

			if( exe_arg ){
				if( !comment ){
					this.execute( [ 'onMainCommentCancel', editor, this.$node ].concat( this.get_files( editor ) ) )
				}
				this.execute( Array.from( exe_arg ) );
			} else {
				this.$node.ltProp( 'editMode', true );
			}
			this.clear_alert();
		},

		enter : function( _this ){
			var $this = $L( _this );

			$this.attr( 'lt-prop-title', _this.scrollWidth > _this.offsetWidth ? $this.text() : '' );
		},

		thumbClick : function( index ){
			$L( this.$node ).children().get( -1 ).open( index + 1 );
			this.setup_file_data( this.__comment, index );
		},

		save : function( editor ){
			return this.execute( [ 'onMainCommentSave', editor, this.$node ].concat( this.get_files( editor ) ) );
		},

		cancel : function( editor ){
			return this.execute( [ 'onMainCommentCancel', editor, this.$node ].concat( this.get_files( editor ) ) )
		},

		common_action : function( name ){

			switch( name ){
				case 'onPreviewClick' : {
					return this.preview_click.apply( this, arguments );
				}
				break;
				case 'onCommentEdit' : {
					if( this.close_all_comments() || this.make_main_draft() ){
						this.__executeArg = arguments;
						return;
					}
				}
				default : {
					return this.execute( Array.from( arguments ) );
				}
			}
		},

		update_comment : function( editor, comment ){
			return this.call_cancel( editor, comment, 'onCommentSave' );
		},

		cancel_comment : function(){
			return this.call_cancel.apply( this, arguments );
		},

		show_emoji : function( elem ){
			this.show_emoji( elem );
		},

		bg_switch : function( editor ){
			var colors = this.data.ltPropColors,
			$editor = $L( editor ),
			elem = $editor.parent().children( '.lyteNoteBgSwitcher' );

			if( colors ){
				var note = $editor.closest( 'lyte-note-editor' ).get( 0 ),
				_color = note.ltProp( 'background' ),
				index = this.find_index( colors, 'background', _color ),
				final = colors[ ( index + 1 ) % colors.length ];

				[ 'background', 'border' ].forEach( function( item ){
					note.ltProp( item, final[ item ] );
				});

			} else {
				$L( '.lyte_note_bgswitch_elem', this.$node ).removeClass( 'lyte_note_bgswitch_elem' );
				elem.addClass( 'lyte_note_bgswitch_elem' );

				this.setData( 'bgSwitch', true );
			}
			return false;
		},

		show_smiley : function( editor ){
			this.show_emoji( $L( editor.parentNode.parentNode ).find( '.lyteNoteSmileyIcon' ).get( 0 ) );
			return false;
		},

		file_before_send : function(){
			return this.execute_file_method( arguments, 3, 'onBeforeSend' );
		},

		file_success : function(){
			return this.execute_file_method( arguments, 2, 'onSuccess' );
		},

		file_failure : function(){
			return this.execute_file_method( arguments, 2, 'onFailure' );
		},

		file_remove : function(){
			return this.execute_file_method( arguments, 2, 'onRemove' );
		},

		file_before_remove : function(){
			return this.execute_file_method( arguments, 2, 'onBeforeRemove' );
		},

		on_editor_paste : function(){
			return this.execute_file_method( arguments, 2, 'onEditorPaste' );
		}
	},

	execute_file_method : function( args, index, name ){

		var args = Array.from( args ),
		comment = $L( args[ index ] ).closest( 'lyte-comment', this.$node ).get( 0 );

		if( comment ){
			args.push( this.get_comment_index( comment ) );
		}

		args.unshift( name );

		if( this.getMethods( name ) ){
			this.executeMethod.apply( this, args );
		}
		return false;
	},

	show_emoji : function( elem ){
		if( this.data.popoverShow ){
			return;
		}
		$L( '.lyte_note_origin_elem' ).removeClass( 'lyte_note_origin_elem' );
		$L( elem ).addClass( 'lyte_note_origin_elem' );
		this.setData( 'popoverShow', true );
	},

	execute : function( __arg ){
		var name = __arg.shift();

		if( /commentsave/i.test( name ) ){
			if( this.should_prevent.apply( this, __arg ) ){
				return;
			}
		}

		return this.execute_file_method( __arg, 2, name );
	},

	should_prevent : function( editor, notecomp, success, uploading ){
		var html = editor.getHTML(),
		message;

		if( !html.replace( '<br>', '' ) ){
			message = 'Empty';
		}

		if( uploading.length ){
			message = 'Upload';
		}

		if( message ){
			var value = this.data[ 'ltProp' + message + 'InfoMessage' ];

			if( value ){
				this.setData( 'message', value );
				this.setData( 'messageShow', true );
				return 1;
			}
		}
	}
});
