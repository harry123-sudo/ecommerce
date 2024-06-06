Lyte.Component.register("lyte-dual-listbox", {
_template:"<template tag-name=\"lyte-dual-listbox\"> <div class=\"lyteListboxWrapper\"> <div class=\"lyteListboxLeftPanel lyteListboxPanels\"> <lyte-search class=\"lyteListBoxSearch\" lt-prop-query-selector=\"{&quot;scope&quot; : &quot;.{{ltPropSearchScope}}&quot;, &quot;search&quot; : &quot;.lyteLBMandatory&quot;, &quot;target&quot; : &quot;.lyteListBoxLeftWrap&quot;}\" lt-prop-check-from-parent=\"true\" lt-prop-component=\"duallistbox\" on-search=\"{{method('onSearch')}}\"></lyte-search> <template is=\"for\" items=\"{{ltPropLeftData}}\" item=\"item\" index=\"index\"> <template is=\"if\" value=\"{{item.childrenList}}\"><template case=\"true\"> <div class=\"lyteListBoxLeftWrap {{if(expHandlers(item.childrenList.length,'===',0),'lyteLBoxDisabledParent','')}} {{if(childitem.required,'lyteListBoxRequiredParent','')}}\"> <div class=\"lyteListBoxLeftElement lyteListBoxLeftParentElement lyteLeftLvl1 {{if(item.required,'lyteListBoxRequiredItem','')}} {{if(expHandlers(item.childrenList.length,'===',0),'lyteLBoxDisabledParent','')}}\" ondblclick=\"{{action('moveElementRight',this,'doubleClick')}}\" onclick=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\"> <lyte-lb-collapse onclick=\"{{action('collapseFunction',this,'left')}}\"></lyte-lb-collapse> <lyte-yield yield-name=\"leftWidget\" left-widget-value=\"{{item}}\"></lyte-yield> <template is=\"if\" value=\"{{expHandlers(item.required,'!')}}\"><template case=\"true\"><lyte-lb-add class=\"lyteLbAdd\" onclick=\"{{action('addElementToRight',this)}}\"></lyte-lb-add></template></template> </div> <div class=\"lyteLBLeftChildWrap\"> <template is=\"for\" items=\"{{item.childrenList}}\" item=\"childitem\" index=\"ind\"> <div class=\"lyteListBoxLeftWrap lyteLeftLvl2Wrap {{if(childitem.required,'lyteListBoxRequiredParent','')}}\"> <div class=\"lyteListBoxLeftElement lyteLeftLvl2 {{if(childitem.required,'lyteListBoxRequiredItem','')}}\" ondblclick=\"{{action('moveElementRight',this,'doubleClick')}}\" onclick=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(ind,index)}}\"> <lyte-yield yield-name=\"leftWidget\" left-widget-value=\"{{childitem}}\"></lyte-yield> <template is=\"if\" value=\"{{expHandlers(childitem.required,'!')}}\"><template case=\"true\"><lyte-lb-add class=\"lyteLbAdd\" onclick=\"{{action('addElementToRight',this)}}\"></lyte-lb-add></template></template> </div> </div> </template> </div> </div> </template><template case=\"false\"> <div class=\"lyteListBoxLeftWrap {{if(item.required,'lyteListBoxRequiredParent','')}}\"> <div class=\"lyteListBoxLeftElement lyteLeftLvl1 {{if(item.required,'lyteListBoxRequiredItem','')}}\" ondblclick=\"{{action('moveElementRight',this,'doubleClick')}}\" onclick=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\"> <lyte-yield yield-name=\"leftWidget\" left-widget-value=\"{{item}}\"></lyte-yield> <template is=\"if\" value=\"{{expHandlers(item.required,'!')}}\"><template case=\"true\"><lyte-lb-add class=\"lyteLbAdd\" onclick=\"{{action('addElementToRight',this)}}\"></lyte-lb-add></template></template> </div> </div> </template></template> </template> <template is=\"if\" value=\"{{noResultsFound}}\"><template case=\"true\"><div class=\"lyteListBoxNoResultsFound\">{{ltPropNoResultMessage}}</div></template></template> </div> <template is=\"if\" value=\"{{ltPropShowToolbar}}\"><template case=\"true\"><div class=\"lyteListboxToolbar\"> <template is=\"if\" value=\"{{moveRight}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveRight\" onclick=\"{{action('moveElementRight',this,'toolbarClick')}}\" lt-prop-title=\"Move Right\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveLeft}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveLeft\" onclick=\"{{action('moveElementLeft',this,'toolbarClick')}}\" lt-prop-title=\"Move Left\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveTop}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveUp\" onclick=\"{{action('moveElementUp')}}\" lt-prop-title=\"Move Up\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{moveBottom}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBMoveDown\" onclick=\"{{action('moveElementDown')}}\" lt-prop-title=\"Move Down\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> <template is=\"if\" value=\"{{deleteElement}}\"><template case=\"true\"><div class=\"lyteLBToolbarItems lyteLBTBDeleteMarked\" onclick=\"{{action('deleteElement')}}\" lt-prop-title=\"Delete\" lt-prop-tooltip-config=\"{ &quot;position&quot;:&quot;bottom&quot;}\"></div></template></template> </div></template></template> <div class=\"lyteListboxRightPanel lyteListboxPanels\"> <template is=\"for\" items=\"{{ltPropRightData}}\" item=\"item\" index=\"index\"> <div class=\"lyteListBoxRightWrap {{if(item.required,'lyteListBoxRequiredParent','')}}\"> <div class=\"lyteListBoxRightElement lyteRightLvl1 {{if(item.required,'lyteListBoxRequiredItem','')}}\" ondblclick=\"{{action('moveElementLeft',this,'doubleClick')}}\" onclick=\"{{action('elementFN',this,event)}}\" index=\"{{lyteListBoxIndex(index)}}\" setparent=\"{{lyteListBoxParentIndex(this,item,ltPropAssociateParent)}}\"> <lyte-yield yield-name=\"rightWidget\" right-widget-value=\"{{item}}\"></lyte-yield> <template is=\"if\" value=\"{{expHandlers(item.required,'!')}}\"><template case=\"true\"><lyte-lb-remove class=\"lyteLbAdd\" onclick=\"{{action('removeElementFromRight',this)}}\"></lyte-lb-remove></template></template> </div> </div> </template> </div> <template is=\"if\" value=\"{{moreLBElements}}\"><template case=\"true\"><lyte-badge class=\"lyteListboxBadge\" lt-prop-position=\"topRight\" lt-prop-max-length=\"3\"></lyte-badge></template></template> </div> </template>",
_dynamicNodes : [{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"for","position":[1,1,3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"componentDynamic","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"insertYield","position":[1,1,3]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}},{"type":"attr","position":[1,3,1]},{"type":"for","position":[1,3,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]}},"default":{}}]},{"type":"attr","position":[1,1,5]},{"type":"if","position":[1,1,5],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[0,0]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0,1]},{"type":"if","position":[0,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,3]},{"type":"if","position":[0,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,5]},{"type":"if","position":[0,5],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,7]},{"type":"if","position":[0,7],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}},{"type":"attr","position":[0,9]},{"type":"if","position":[0,9],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]}]}},"default":{}}]}},"default":{}},{"type":"attr","position":[1,5,1]},{"type":"for","position":[1,5,1],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"attr","position":[1,1,1]},{"type":"insertYield","position":[1,1,1]},{"type":"attr","position":[1,1,3]},{"type":"if","position":[1,1,3],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"componentDynamic","position":[0]}]}},"default":{}}]},{"type":"attr","position":[1,7]},{"type":"if","position":[1,7],"cases":{"true":{"dynamicNodes":[{"type":"componentDynamic","position":[0]}]}},"default":{}}],
_observedAttributes :["ltPropLeftData","ltPropRightData","ltPropSortable","ltPropShortcut","ltPropAssociateParent","ltPropShowToolbar","ltPropSearchScope","ltPropToolbarItems","ltPropMaxCount","ltPropDoubleClick","ltPropSelectAllChild","ltPropNoResultMessage","noResultsFound","moveRight","moveLeft","moveTop","moveBottom","deleteElement","moreLBElements","selectedIndexLeft","selectedIndexRight","leftShiftSelectIndex","rightShiftSelectIndex","insertAtLeftInd","insertAtRightInd","elementPosition"],
  data: function() {
    return {
      ltPropLeftData: Lyte.attr('array', {
        default: []
      }),
      ltPropRightData: Lyte.attr('array', {
        default: []
      }),
      ltPropSortable: Lyte.attr('boolean', {
        default: false
      }),
      ltPropShortcut: Lyte.attr('boolean', {
        default: false
      }),
      ltPropAssociateParent: Lyte.attr('string', {
        default: 'value'
      }),
      ltPropShowToolbar: Lyte.attr('boolean', {
        default: false
      }),
      ltPropSearchScope: Lyte.attr('string', {
        default: 'lyteListboxLeftPanel'
      }),
      ltPropToolbarItems: Lyte.attr('array', {
        default: ['moveRight', 'moveLeft', 'moveTop', 'moveBottom']
      }),
      ltPropMaxCount: Lyte.attr('number', {
        default: -1
      }),
      ltPropDoubleClick: Lyte.attr('boolean', {
        default: true
      }),
      ltPropSelectAllChild : Lyte.attr('boolean',{
        default: false
      }),
      ltPropNoResultMessage : Lyte.attr('string' , {
        default : 'No Results Found'
      }),



      noResultsFound : Lyte.attr('boolean' , {
        default : false
      }),
      moveRight: Lyte.attr('boolean', {
        default: false
      }),
      moveLeft: Lyte.attr('boolean', {
        default: false
      }),
      moveTop: Lyte.attr('boolean', {
        default: false
      }),
      moveBottom: Lyte.attr('boolean', {
        default: false
      }),
      deleteElement: Lyte.attr('boolean', {
        default: false
      }),
      moreLBElements: Lyte.attr('boolean', {
        default: false
      }),
      selectedIndexLeft: Lyte.attr('array', {
        default: []
      }),
      selectedIndexRight: Lyte.attr('array', {
        default: []
      }),
      leftShiftSelectIndex: Lyte.attr('string', {
        default: ""
      }),
      rightShiftSelectIndex: Lyte.attr('string', {
        default: ""
      }),
      insertAtLeftInd: Lyte.attr('number', {
        default: 0
      }),
      insertAtRightInd: Lyte.attr('number', {
        default: 0
      }),
      elementPosition : Lyte.attr('number', {
        default : 0
      })
    }
  },
  init: function() {
    var th = this;

    if (this.getData('ltPropShortcut')) {
      shortcut.register('right', function() {
        th.actions.moveElementRight(th);
      });
      shortcut.register('shift+right', function() {
        th.actions.moveAllElementsRight(th);
      });
      shortcut.register('left', function() {
        th.actions.moveElementLeft(th);
      });
      shortcut.register('shift+left', function() {
        th.actions.moveAllElementsLeft(th);
      });
      shortcut.register('up', function() {
        th.actions.moveElementUp(th);
      });
      shortcut.register('down', function() {
        th.actions.moveElementDown(th);
      });
      shortcut.register('backspace', function() {
        th.actions.deleteElement(th);
      });
    }
  },
  dragDropFun: function() {

    var lB = this.$node

    var thisConnectedWith = $L(this.$node).find(".lyteListboxPanels")
    var childrenList = $L(this.$node).find('.lyteLBLeftChildWrap')

    var sortableObject = {
      multiSortable: true,
      cancel: ".lyteListBoxSearch,.lyteLBoxDisabledParent,.lyteListBoxRequiredParent,.lyteLBDisabledElement .lyteListBoxLeftWrap .lyteListBoxNoResultsFound",
      onSelect: function(cElem, fInd, src) {
        if (($L(cElem).find('.lyteLBLeftActive').length > 0) || ($L(cElem).find('.lyteLBRightActive').length > 0)) {
          return true
        }
        return false

      }.bind(this),
      helper: function(ele) {


        var th = $L(ele).closest('lyte-dual-listbox')[0];


        var element = document.createElement("DIV");
        element.setAttribute('class', 'lyteLBDragElement')

        var allActive
        var currentActive

        var activeString

        if ($L(ele).hasClass('lyteListBoxRightWrap')) {
          activeString = ".lyteLBRightActive"
          allActive = $L(th).find('.lyteLBRightActive')
          currentActive = $L(ele).find('.lyteLBRightActive')
        } else if ($L(ele).hasClass('lyteListBoxLeftWrap')) {
          activeString = ".lyteLBLeftActive"
          allActive = $L(th).find('.lyteLBLeftActive')
          currentActive = $L(ele).find('.lyteLBLeftActive')
        }

        if (currentActive.length > 0) {
          var index = allActive.indexOf(currentActive[0])
          var i = index
          if (allActive.length > 5) {
            var startInd = i - 2
            if (allActive.length / 2 > 0) {
              i += 1
            }
            var endInd = i + 2

            if (startInd < 0) {
              endInd = endInd + (-1 * startInd)
              startInd = 0
            }
            if (endInd > allActive.length - 1) {
              startInd = index - (endInd - (allActive.length - 2))
              endInd = allActive.length
            }

            for (var i = startInd; i <= index - 1; i++) {
              if ($L(th).find(activeString)[i]) {
                var e = $L(th).find(activeString)[i].cloneNode(true)
                $L(e).addClass('lyteLBdragClone')
                element.appendChild(e)
              }
            }
            var currentClone = currentActive[0].cloneNode(true)
            $L(currentClone).addClass('lyteLBdragClone')
            element.appendChild(currentClone)
            for (var i = index + 1; i < endInd; i++) {
              if ($L(th).find(activeString)[i]) {
                var e = $L(th).find(activeString)[i].cloneNode(true)
                $L(e).addClass('lyteLBdragClone')
                element.appendChild(e)
              }
            }


          } else {
            for (var i = 0; i <= index - 1; i++) {
              if ($L(th).find(activeString)[i]) {
                var e = $L(th).find(activeString)[i].cloneNode(true)
                $L(e).addClass('lyteLBdragClone')
                element.appendChild(e)
              }
            }
            var currentClone = currentActive[0].cloneNode(true)
            $L(currentClone).addClass('lyteLBdragClone')
            element.appendChild(currentClone)
            for (var i = index + 1; i < allActive.length; i++) {
              if ($L(th).find(activeString)[i]) {
                var e = $L(th).find(activeString)[i].cloneNode(true)
                $L(e).addClass('lyteLBdragClone')
                element.appendChild(e)
              }
            }
          }
        }

        if (event.detail !== 2) {
          return element
        }
      },
      onDragStart: function(draggableElement, source) {
        var th = $L(draggableElement).closest('lyte-dual-listbox')[0];
        var ind = 0
        if($L(th).find('.lyteLBLeftActive').length <= 0){
          ind = $L(th).find('.lyteLBRightActive').length - 5 - $L(th).find('.lyteLBdragClone').length
        } else {
          ind = $L(th).find('.lyteLBLeftActive').length - 5 - $L(th).find('.lyteLBdragClone').length
        }
        $L(th)[0].component.setData('moreLBElements', true)
        var element = $L(th).find('.lyteLBDragElement')[0]
        $L(th).find('.lyteListboxBadge')[0].component.setData('ltPropData', ind)
        var badge = $L(th).find('.lyteListboxBadge')[0].cloneNode(true);
        badge.style.display = "block";
        element.style.position = "relative";
        if (ind > 0) {
          element.appendChild(badge)
        }
      }.bind(this),
      onEnter: function(event, object) {
        var th = $L(object.sortable).closest('lyte-dual-listbox')[0]
        if (($L(object.sortable).hasClass('lyteListboxLeftPanel')) && (!$L(object.element._origin).hasClass('lyteListBoxLeftWrap'))) {
          if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
            $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
          }
          var leftPanelDropZone = document.createElement('DIV');
          var leftPanelDropZoneBorder = document.createElement('DIV');
          leftPanelDropZone.setAttribute('class', 'lyteLBLeftPanelDropZone')
          leftPanelDropZoneBorder.setAttribute('class', 'lyteLBLeftPanelDropZoneB')
          leftPanelDropZone.appendChild(leftPanelDropZoneBorder);
          object.sortable.appendChild(leftPanelDropZone)
          leftPanelDropZone.style.width = object.sortable.getBoundingClientRect().width + "px";
        } else {
          if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
            $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
          }
        }
      },
      onMultiSelectDrag: function(cElem, evt, placeholder, pParent) {
        cElem.style.top = (cElem.offsetTop - (cElem.getBoundingClientRect().height * $L(cElem).find('.lyteLBdragClone').length) / 2) + 'px';
      }.bind(this),
      onBeforeDrop: function(droppableElement, belowElement, placeholderElement, fromIndex, toIndex, source, destination) {
        $L(source).closest('lyte-dual-listbox')[0].component.executeMethod('onBeforeDrop', source, destination)
        var th = $L(droppableElement).closest('lyte-dual-listbox')[0];
        if ($L(th).find('.lyteLBLeftPanelDropZone').length > 0) {
          $L(th).find('.lyteLBLeftPanelDropZone')[0].remove()
        }
        var elementData;
        $L(source).hasClass('lyteListboxRightPanel')

        if (
          (($L(source).hasClass('lyteListboxLeftPanel')) || ($L(source).hasClass('lyteLBLeftChildWrap'))) &&
          ($L(destination).hasClass('lyteListboxRightPanel'))
        ) {
          th.component.setData('insertAtRightInd', toIndex)
          th.component.mERFN();
        }
        if (
          ($L(source).hasClass('lyteListboxRightPanel')) &&
          (($L(destination).hasClass('lyteListboxLeftPanel')) || ($L(destination).hasClass('lyteLBLeftChildWrap')))
        ) {
          th.component.setData('insertAtLeftInd', toIndex)
          th.component.mELFN();
        } else if ((source === destination) && ($L(source).hasClass('lyteListboxRightPanel'))) {
          th.component.setData('insertAtLeftInd', toIndex)
          $L(source).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
          var actives = th.component.getActiveElements($L(th).find('.lyteLBRightActive'), 'ltPropRightData');
          th.component.sESPF($L(th).find('.lyteLBRightActive'), actives, 'ltPropRightData', toIndex, '.lyteRightLvl1');
        }
        $L(source).closest('lyte-dual-listbox')[0].component.executeMethod('onDrop', source, destination)
        if (th.component.getData('ltPropSortable')) {
          th.component.dragDropFun();
        }
        return false;
      }.bind(this)
    }

    $L(this.$node).find(".lyteListboxPanels", this.$node).sortable(Object.assign({
      connectedWith: Array.from(thisConnectedWith)
    }, sortableObject));
    var thisConnectedWithChild = []

    for (var i = 0; i < childrenList.length; i++) {
      thisConnectedWithChild = []
      thisConnectedWithChild.push(childrenList[i]);
      thisConnectedWithChild.push(thisConnectedWith[1]);
      $L(childrenList[i]).sortable(Object.assign({
        connectedWith: Array.from(thisConnectedWithChild)
      }, sortableObject));
    }


  },

  didConnect: function() {

    if ((this.getData('ltPropMaxCount') <= this.getData('ltPropRightData').length) && (this.getData('ltPropMaxCount') > -1)) {
      $L(this.$node).find('.lyteListboxLeftPanel').addClass('lyteLBDisabledElement')
    }

    if (this.getData('ltPropSortable')) {
      this.dragDropFun();
    }

    var toolbarItems = this.getData('ltPropToolbarItems')

    for (var i = 0; i < this.getData('ltPropToolbarItems').length; i++) {
      this.setData(toolbarItems[i], true);
    }

    this.setData('insertAtLeftInd', this.getData('ltPropLeftData').length)
    this.setData('insertAtRightInd', this.getData('ltPropRightData').length)

    var lB = $L(this)[0].$node;
    var leftPanel = $L(lB).find('.lyteListboxLeftPanel')[0];

  },
  methods: {
    onBeforeDrop: function() {},
    onDrop: function() {},
    onBeforeRight: function() {},
    onMoveRight: function() {},
    onBeforeLeft: function() {},
    onMoveLeft: function() {},
    onMoveElementUp: function() {},
    onMoveElementDown: function() {},
    onMoveAllRight: function() {},
    onMaxCountReached: function() {},
    onMoveAllLeft: function() {},
    onDeleteElement: function() {},
    onBeforeOpen: function() {},
    onBeforeClose: function() {},
    onOpen: function() {},
    onClose: function() {},
    onSearch : function(arr){
      if(arr.length === 0){
        console.log(this.setData('noResultsFound' , true));
      } else {
        console.log(this.setData('noResultsFound' , false));
      }
    }
  },
  indexCallback: function(x) {
    return parseInt(x)
  },

  moveElementInView: function(parent, elem) {
    var parentHeight = parent.getBoundingClientRect().height
    var elemTop = (elem.getBoundingClientRect().top - parent.getBoundingClientRect().top)
    var elemBottom = elemTop + elem.getBoundingClientRect().height

    if (elemBottom > parentHeight) {
      parent.scrollTo({
        top: (parent.scrollTop + (elemBottom - parentHeight)),
        behavior: "smooth"
      });
    }
    if (elemTop < 0) {
      parent.scrollTo({
        top: (parent.scrollTop + elemTop),
        behavior: "smooth"
      });
    }
  },

  actions: {

    addElementToRight: function(th) {
      var elem = $L(th).closest('.lyteListBoxLeftElement')
      this.selectionFunction(elem[0] , 'byBtn');
      this.mERFN();
      if (this.getData('ltPropSortable')) {
        this.dragDropFun();
      }
    },

    removeElementFromRight: function(th) {
      var elem = $L(th).closest('.lyteListBoxRightElement')
      this.selectionFunction(elem[0]);
      this.mELFN();
      if (this.getData('ltPropSortable')) {
        this.dragDropFun();
      }
    },

    collapseFunction: function(th, side) {
      event.stopPropagation();

      _this = this;
      var wrap
      var childWrap
      var elem
      var side

      if (side === 'left') {
        wrap = $L(th).closest('.lyteListBoxLeftWrap')
        childWrap = $L(wrap).find('.lyteLBLeftChildWrap')[0]
        elem = $L(wrap).find('.lyteListBoxLeftElement')
        side = 'left'
      } else {
        wrap = $L(th).closest('.lyteListBoxRightWrap')
        childWrap = $L(wrap).find('.lyteLBRightChildWrap')[0]
        elem = $L(wrap).find('.lyteListBoxRightElement')
        side = 'right'
      }

      var ind = parseInt(elem[0].getAttribute('index'))

      if (childWrap.getBoundingClientRect().height > 0) {

        if (side === "left") {
          _this.executeMethod('onBeforeClose', _this.getData('ltPropLeftData')[ind]);
        } else {
          _this.executeMethod('onBeforeClose', _this.getData('ltPropRightData')[ind]);
        }

        childWrap.style.height = childWrap.getBoundingClientRect().height + "px";

        setTimeout(function() {
          childWrap.style.height = "0px";

          if ($L(th.parentElement).hasClass('lyteListboxParentElementOpen')) {
            $L(th.parentElement).removeClass('lyteListboxParentElementOpen')
          }
          $L(th.parentElement).addClass('lyteListboxParentElementClose')

          if (side === "left") {
            _this.executeMethod('onClose', _this.getData('ltPropLeftData')[ind]);
          } else {
            _this.executeMethod('onClose', _this.getData('ltPropRightData')[ind]);
          }

        }, 10)

      } else {

        if ($L(th.parentElement).hasClass('lyteListboxParentElementClose')) {
          $L(th.parentElement).removeClass('lyteListboxParentElementClose')
        }
        $L(th.parentElement).addClass('lyteListboxParentElementOpen')

        if (side === "left") {
          _this.executeMethod('onBeforeOpen', _this.getData('ltPropLeftData')[ind]);
        } else {
          _this.executeMethod('onBeforeOpen', _this.getData('ltPropRightData')[ind]);
        }

        childWrap.style.height = "auto"
        var height = childWrap.getBoundingClientRect().height
        childWrap.style.height = "0px"

        setTimeout(function() {
          childWrap.style.height = height + "px"
          childWrap.addEventListener('transitionend', setHeight)
        }, 10)

        function setHeight() {
          childWrap.style.height = "auto"
          childWrap.removeEventListener('transitionend', setHeight)
          if (side === "left") {
            _this.executeMethod('onOpen', _this.getData('ltPropLeftData')[ind]);
          } else {
            _this.executeMethod('onOpen', _this.getData('ltPropRightData')[ind]);
          }
        }

      }

    },

    elementFN: function(th, ev) {
      this.selectionFunction(th);
    },

    moveElementRight: function(th, clickType) {
      if ((this.getData('ltPropDoubleClick')) || (clickType === 'toolbarClick')) {
        if ($L(th).hasClass('lyteListBoxRequiredItem')) {
          return
        }
        this.mERFN();
        if (this.getData('ltPropSortable')) {
          this.dragDropFun();
        }
      }
    },
    moveElementLeft: function(th, clickType) {
      if ((this.getData('ltPropDoubleClick')) || (clickType === 'toolbarClick')) {
        if ($L(th).hasClass('lyteListBoxRequiredItem')) {
          return
        }
        this.mELFN();
        if (this.getData('ltPropSortable')) {
          this.dragDropFun();
        }
      }
    },
    moveElementUp: function(th) {
      if (!th) {
        th = this;
      }


      var lB = th.$node;
      var activeElement;
      var elementArr;
      var index;

      var leftClickedElement = $L(lB).find('.lyteLBLeftMoveElement')[0];
      var rightClickedElement = $L(lB).find('.lyteLBRightMoveElement')[0];
      var leftEles
      var rightEles
      var index;
      var elementData
      var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]

      var lastActiveLeft = this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]
      if (($L(lB).find('.lyteLBLeftActive.lyteLeftLvl1').length === 1) || ($L(lB).find('.lyteLBRightActive.lyteRightLvl1').length === 1)) {
        if (!(th.panelSide(leftClickedElement) === 'left')) {
          index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
          if (index.length > 1) {
            if (index[1] > 0) {
              elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]]
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'insertAt', index[1] - 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
              var rightChildren = $L(rightEles).find('.lyteRightLvl2')
              $L(rightChildren[index[1] - 1]).addClass('lyteLBRightActive')
              $L(rightChildren[index[1] - 1]).addClass('lyteLBRightMoveElement')
            }
          } else {
            if (index[0] > 0) {
              elementData = th.getData('ltPropRightData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] - 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1');
              $L(rightEles[index[0] - 1]).addClass('lyteLBRightActive')
              $L(rightEles[index[0] - 1]).addClass('lyteLBRightMoveElement')
              this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
            }
          }
        }
      }

      th.executeMethod('onMoveElementUp', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), elementData)

      if (th.getData('ltPropSortable')) {
        th.dragDropFun();
      }
    },
    moveElementDown: function(th) {
      if (!th) {
        th = this;
      }
      var lB = th.$node;
      var activeElement;
      var elementArr;
      var index;
      var leftClickedElement = $L(lB).find('.lyteLBLeftMoveElement')[0];
      var rightClickedElement = $L(lB).find('.lyteLBRightMoveElement')[0];
      var leftEles
      var rightEles
      var index;
      var elementData
      var lastActiveLeft = this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]
      var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0]

      if (($L(lB).find('.lyteLBLeftActive.lyteLeftLvl1').length === 1) || ($L(lB).find('.lyteLBRightActive.lyteRightLvl1').length === 1)) {

        if (!(th.panelSide(leftClickedElement) === 'left')) {
          index = rightClickedElement.getAttribute("index").split(" ").map(this.indexCallback)
          if (index.length > 1) {
            rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
            var rightChildren = $L(rightEles).find('.lyteRightLvl2')
            if (index[1] < rightChildren.length - 1) {
              elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]]
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'insertAt', index[1] + 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1')[index[0]].closest('.lyteListBoxRightWrap')
              rightChildren = $L(rightEles).find('.lyteRightLvl2')
              $L(rightChildren[index[1] + 1]).addClass('lyteLBRightActive')
              $L(rightChildren[index[1] + 1]).addClass('lyteLBRightMoveElement')
            }
          } else {
            rightEles = $L(lB).find('.lyteRightLvl1');
            if (index[0] < rightEles.length - 1) {
              elementData = th.getData('ltPropRightData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', index[0] + 1, elementData);
              rightEles = $L(lB).find('.lyteRightLvl1');
              $L(rightEles[index[0] + 1]).addClass('lyteLBRightActive')
              $L(rightEles[index[0] + 1]).addClass('lyteLBRightMoveElement')
              this.moveElementInView(rightPanel, $L(lB).find('.lyteLBRightActive')[0])
            }
          }
        }


      }

      th.executeMethod('onMoveElementDown', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), elementData)

      if (th.getData('ltPropSortable')) {
        th.dragDropFun();
      }
    },
    moveAllElementsRight: function(th) {
      var lB = this.$node;
      $L(lB).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive');
      this.mERFN();
    },
    moveAllElementsLeft: function(th) {
      if (!th) {
        th = this;
      }
      if (th.getData('ltPropRightData').length > 0) {
        var rightData = th.getData('ltPropRightData');
        Lyte.arrayUtils(th.getData('ltPropLeftData'), 'push', th.getData('ltPropRightData'));
        th.setData('ltPropRightData', [])
      }
      th.executeMethod('onMoveAllLeft');
      if (th.getData('ltPropSortable')) {
        th.dragDropFun();
      }
    },
    deleteElement: function(th) {
      if (!th) {
        th = this;
      }
      var lB = th.$node;
      if ($L(lB).find('.lyteLBLeftActive')[0]) {
        var leftElements = $L(lB).find('.lyteListBoxLeftElement');
        var activeElement = $L(lB).find('.lyteLBLeftActive')

        for (var i = 0; i < activeElement.length; i++) {
          var elementData
          index = activeElement[i].getAttribute('index').split(' ').map(this.indexCallback);
          if ((index.length > 1) || ($L(activeElement[i]).hasClass('lyteListBoxLeftParentElement'))) {
            var childWrap = $L(activeElement[i]).closest('.lyteListBoxLeftWrap').find('.lyteLBLeftChildWrap')
            if (($L(activeElement[i]).hasClass('lyteListBoxLeftParentElement')) && (($L(childWrap[0]).find('.lyteLeftLvl2').length < 1) || ($L(childWrap[0]).find('.lyteLBLeftActive').length === $L(childWrap[0]).find('.lyteLeftLvl2').length))) {
              i += $L(childWrap[0]).find('.lyteLBLeftActive').length
              elementData = th.getData('ltPropLeftData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', index[0], 1);
            }
            if (index.length > 1) {
              elementData = th.getData('ltPropLeftData')[index[0]].childrenList[index[1]];
              Lyte.arrayUtils(th.getData('ltPropLeftData')[index[0]].childrenList, 'removeAt', index[1], 1);
            }
          } else {
            elementData = th.getData('ltPropLeftData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', index[0], 1);
          }
        }

      } else if ($L(lB).find('.lyteLBRightActive')[0]) {
        var rightElements = $L(lB).find('.lyteListBoxRightElement');
        var activeElement = $L(lB).find('.lyteLBRightActive');
        for (var i = 0; i < activeElement.length; i++) {
          var elementData
          index = activeElement[i].getAttribute('index').split(' ').map(this.indexCallback);
          if ((index.length > 1) || ($L(activeElement[i]).hasClass('lyteListBoxRightParentElement'))) {
            var childWrap = $L(activeElement[i]).closest('.lyteListBoxRightWrap').find('.lyteLBRightChildWrap')
            if (($L(activeElement[i]).hasClass('lyteListBoxRightParentElement')) && (($L(childWrap[0]).find('.lyteRightLvl2').length < 1) || ($L(childWrap[0]).find('.lyteLBRightActive').length === $L(childWrap[0]).find('.lyteRightLvl2').length))) {
              i += $L(childWrap[0]).find('.lyteLBRightActive').length
              elementData = th.getData('ltPropRightData')[index[0]];
              Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
            }
            if (index.length > 1) {
              elementData = th.getData('ltPropRightData')[index[0]].childrenList[index[1]];
              Lyte.arrayUtils(th.getData('ltPropRightData')[index[0]].childrenList, 'removeAt', index[1], 1);
            }
          } else {
            elementData = th.getData('ltPropRightData')[index[0]];
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', index[0], 1);
          }

        }
      }


      th.executeMethod('onDeleteElement');


      if (th.getData('ltPropSortable')) {
        th.dragDropFun();
      }
    }
  },


  selectionFunction: function(th , by) {

    var clickedEle = th;
    var lB = this.$node
    event.stopPropagation();
    var self = this

    if(by === 'byBtn'){
      if ($L(clickedEle).hasClass('lyteListBoxLeftParentElement')) {
        $L(clickedEle.parentElement).find('.lyteLeftLvl2').addClass('lyteLBLeftActive')
        return
      }
    }

    var leftEles = $L(lB).find('.lyteListBoxLeftElement').toArray()
    var rightEles = $L(lB).find('.lyteListBoxRightElement').toArray()
    var leftPanel = $L(lB).find('.lyteListboxLeftPanel')[0];
    var rightPanel = $L(lB).find('.lyteListboxRightPanel')[0];
    var wrap = clickedEle.parentElement

    var selectAllChild = this.getData('ltPropSelectAllChild')

    var lastActiveLeft = leftEles[this.getData('selectedIndexLeft')[this.getData('selectedIndexLeft').length - 1]]
    var lastActiveRight = rightEles[this.getData('selectedIndexRight')[this.getData('selectedIndexRight').length - 1]]

    var notDisabled = (clickedEle.getAttribute("index").split(" ").map(this.indexCallback))
    // notDisabled = notDisabled[notDisabled.length-1]

    var isCurrentElementDisabled = false;

    if ($L(clickedEle).hasClass('lyteListBoxRightElement')) {
      if (notDisabled.length > 1) {
        isCurrentElementDisabled = this.getData('ltPropRightData')[notDisabled[0]].childrenList[notDisabled[1]].required
      } else {
        isCurrentElementDisabled = this.getData('ltPropRightData')[notDisabled[0]].required
      }
    } else {
      if (notDisabled.length > 1) {
        isCurrentElementDisabled = this.getData('ltPropLeftData')[notDisabled[0]].childrenList[notDisabled[1]].required
      } else {
        isCurrentElementDisabled = this.getData('ltPropLeftData')[notDisabled[0]].required
      }
    }

    if (
      ($L(clickedEle).closest('.lyteListboxLeftPanel').hasClass('lyteLBoxDisabledParent')) ||
      ($L(clickedEle).closest('.lyteListboxLeftPanel').hasClass('lyteLBDisabledElement')) ||
      ($L(clickedEle).hasClass('lyteLBoxDisabledParent'))
    ) {
      isCurrentElementDisabled = true
    }

    if ((event.shiftKey) && (lastActiveLeft || lastActiveRight)) {

      /*

      * Shift key down and select elements

      */

      var initialElement,initialWrap,initialParentWrap,initialChildren
      var previousElement,previousWrap,previousParentWrap,previousChildren
      var currentElement,currentWrap,currentParentWrap,currentChildren
      var atrStr
      var nextPrevCheck
      var newSelection = true

      function setUpLeftElems(){
        atrStr = "'" + self.getData('leftShiftSelectIndex') + "'";

        initialElement = lastActiveLeft
        initialWrap = $L(initialElement).closest('.lyteListBoxLeftWrap');
        initialParentWrap = $L(initialWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        initialChildren = initialParentWrap.find('.lyteListBoxLeftWrap')

        previousElement = $L(lB).find('.lyteListboxLeftPanel').find("[index*=" + atrStr + "]")[0]
        if(!previousElement){
          previousElement = initialElement
          newSelection = true
        } else {
          newSelection = false
        }
        previousWrap = $L(previousElement).closest('.lyteListBoxLeftWrap');
        if (!previousWrap[0]) {
          previousWrap = initialWrap;
        }
        previousParentWrap = $L(previousWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        previousChildren = previousParentWrap.find('.lyteListBoxLeftWrap')

        currentElement = clickedEle
        currentWrap = $L(currentElement).closest('.lyteListBoxLeftWrap');
        currentParentWrap = $L(currentWrap).closest('.lyteLBLeftChildWrap').closest('.lyteListBoxLeftWrap')
        currentChildren = currentParentWrap.find('.lyteListBoxLeftWrap')

        if($L(currentElement).hasClass('lyteListBoxLeftParentElement')){
          currentChildren = currentWrap.find('.lyteListBoxLeftWrap')
        }
      }

      if (this.panelSide(clickedEle) === "left") {

          setUpLeftElems()

      } else {
        atrStr = "'" + this.getData('rightShiftSelectIndex') + "'";
        previousElement = $L(lB).find('.lyteListboxRightPanel').find("[index*=" + atrStr + "]")[0]
        previousWrap = $L(previousElement).closest('.lyteListBoxRightWrap');
        currentWrap = $L(clickedEle).closest('.lyteListBoxRightWrap');
        initialWrap = $L(lastActiveRight).closest('.lyteListBoxRightWrap');
        wrapArray = $L(lB).find('.lyteListBoxRightWrap')
        if(!previousElement){
          previousWrap = initialWrap
          previousElement = lastActiveRight
        }
      }

      /*

      To get indexes ===================================================================

      */

      function getClickedElemLevel(){
        if($L(clickedEle).hasClass('lyteLeftLvl1')){
          return 'lvl1'
        } else {
          return 'lvl2'
        }
      }

      function getPrevElemLevel(){
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if($L(previousElement).hasClass('lyteLeftLvl1')){
          return 'lvl1'
        } else {
          return 'lvl2'
        }
      }

      function getPrevElemType(){
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if($L(previousElement).hasClass('lyteListBoxLeftParentElement')){
          return 'parent'
        }
        return
      }

      function getClickedElemType(){
        if($L(clickedEle).hasClass('lyteListBoxLeftParentElement')){
          return 'parent'
        }
        return
      }

      function getIniParInd(){
        var iniEL = $L(initialWrap).find('.lyteListBoxLeftElement')[0]
        return parseInt($L(iniEL).attr('index').split(" ")[0]);
      }

      function getIniChildInd(){
        var iniEL = $L(initialWrap).find('.lyteListBoxLeftElement')[0]
        return parseInt($L(iniEL).attr('index').split(" ")[1]);
      }

      function getPreParInd() {
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        return parseInt($L(previousElement).attr('index').split(" ")[0]);
      }

      function getCurParInd() {
        return parseInt($L(clickedEle).attr('index').split(" ")[0]);
      }

      function getPreChildInd() {
        if (!previousElement) {
          previousElement = $L(previousWrap).find('.lyteListBoxLeftElement')[0]
        }
        if(!$L(previousElement).attr('index').split(" ")[1]){
          return 0
        }
        return parseInt($L(previousElement).attr('index').split(" ")[1]);
      }

      function getCurChildInd() {
        if (!clickedEle) {
          clickedEle = $L(currentWrap).find('.lyteListBoxLeftElement')[0]
        }
        if(!$L(clickedEle).attr('index').split(" ")[1]){
          return 0
        }
        return parseInt($L(clickedEle).attr('index').split(" ")[1]);
      }

      function getCurLastIndex(){
        if(!currentChildren.length){
          return currentWrap.find('.lyteLeftLvl2Wrap').length-1
        }
        return currentChildren.length-1
      }

      function getPreLastIndex(){
        if(!previousChildren.length){
          return previousWrap.find('.lyteLeftLvl2Wrap').length-1
        }
        return previousChildren.length-1
      }

      /*

      To get indexes ends ===================================================================

      */

      if(clickedEle.getAttribute('index') === previousElement.getAttribute('index')){
        return
      }

      if ($L(clickedEle).hasClass('lyteListBoxLeftElement') && !(clickedEle === lastActiveLeft)) {

        // $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
        $L(lB).find('.leftShiftElement').find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')

        if(getIniParInd() < getCurParInd()){
          /*

          Selection from top to bottom

          */

          if((getIniParInd() > getPreParInd()) && (getCurParInd() > getIniParInd()) ||
             (getIniChildInd() > getPreChildInd()) && (getCurParInd() > getIniParInd())
            ){
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
            previousElement = initialElement
            previousWrap  = initialWrap
            previousParentWrap  = initialParentWrap
            previousChildren  = initialChildren
          }

          if(getPreParInd() < getCurParInd()){
            // console.log('add top to bottom');
            $L(previousWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
            if(getClickedElemLevel() === 'lvl1'){
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentWrap).addClass('leftShiftElement')
                $L(previousParentWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
                $L(currentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).nextUntil(currentWrap,'',true).addClass('leftShiftElement')
              }
              $L(previousWrap).nextUntil(currentWrap,'',true).addClass('leftShiftElement')
              if((getClickedElemType() === 'parent')){
                $L(previousWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
            } else {
              $L(previousWrap).nextUntil(currentParentWrap,'',true).addClass('leftShiftElement')
              $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentParentWrap).addClass('leftShiftElement')
                $L(currentParentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).addClass('leftShiftElement')
              }
              if(getCurChildInd() === 0){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            }
          } else if(getPreParInd() > getCurParInd()){
            // console.log('remove' , getClickedElemType());
            if(getClickedElemLevel() === 'lvl1'){
              // console.log('remove parent');
              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
            } else {
              // console.log('remove child 1');
              $L(previousWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
              if(getCurLastIndex() === getCurChildInd()){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).removeClass('leftShiftElement')
              }
              $L(currentParentWrap).addClass('leftShiftElement')
            }
            $L(currentWrap).addClass('leftShiftElement')
          } else if(getPreParInd() === getCurParInd()){
            if(getPreChildInd() <= getCurChildInd()){
              // console.log('add child');
              if(getCurChildInd() <= 0){
                $L(currentChildren[0]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            } else {
              // console.log('remove child');
              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(currentWrap).addClass('leftShiftElement')
            }
          }


          /*

          Selection from top to bottom ends

          */


        } else if(getIniParInd() > getCurParInd()){
          /*

          Selection from bottom to top

          */
          // console.log('bottom to top');

          if((getIniParInd() < getPreParInd()) && (getCurParInd() < getIniParInd()) ||
             (getIniChildInd() < getPreChildInd()) && (getCurParInd() < getIniParInd())
            ){
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
            previousElement = initialElement
            previousWrap  = initialWrap
            previousParentWrap  = initialParentWrap
            previousChildren  = initialChildren
          }

          if(getPreParInd() > getCurParInd()){

            // console.log('add bottom to top');
            if(getClickedElemLevel() === 'lvl1'){
              $L(previousWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
              if(getPrevElemType() === 'parent'){
                $L(previousWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
                $L(previousWrap).prevUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
                $L(previousParentWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
              if(getPreChildInd()!==0){
                $L(previousParentWrap).prevUntil(currentWrap,'',true).addClass('leftShiftElement')
                $L(previousParentWrap).prevUntil(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }
              $L(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              $L(previousParentWrap).addClass('leftShiftElement')

            } else {
              $L(previousParentWrap).addClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              if(getCurChildInd() !== 0){
                $L(previousParentWrap).prevUntil(currentParentWrap).addClass('leftShiftElement')
              } else {
                $L(previousParentWrap).addClass('leftShiftElement')
              }
              $L(previousChildren[getPreChildInd()]).prevUntil(previousChildren[0],'',true).addClass('leftShiftElement')
              if(getCurChildInd() === getCurLastIndex()){
                $L(currentChildren[getCurLastIndex()]).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              }
            }


          } else if(getPreParInd() < getCurParInd()){

            // console.log('remove bottom to top');

            if(getClickedElemLevel() === 'lvl1'){
              $L(previousWrap).nextUntil(currentWrap).removeClass('leftShiftElement')
              $L(previousParentWrap).nextUntil(currentWrap).removeClass('leftShiftElement')
              if(getClickedElemType() === 'parent'){
                $L(previousWrap).nextUntil(currentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              }
              $L(previousWrap).removeClass('leftShiftElement')
            } else {
              if(getPrevElemLevel() === 'lvl2'){
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                $L(previousParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              }
              if(getCurChildInd()===0){
                $L(currentChildren[0]).removeClass('leftShiftElement')
              } else {
                $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()],'',true).removeClass('leftShiftElement')
              }
            }
            $L(currentWrap).addClass('leftShiftElement')

          } else if(getPreParInd() === getCurParInd()){

            // console.log('bottom to top same parent');

            if((getPreChildInd() > getCurChildInd()) || (getClickedElemType() === 'parent')){

              // console.log('add child bottom to top');
              $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()],'',true).addClass('leftShiftElement')
              if(getPreParInd() === getCurParInd()){
                $L(currentWrap).find('.lyteLeftLvl2Wrap').addClass('leftShiftElement')
              }

            } else {

              // console.log('remove child bottom to top');
              if(getPrevElemType() === 'parent'){
                $L(previousWrap).removeClass('leftShiftElement')
                if(getCurChildInd()!==0){
                  $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).removeClass('leftShiftElement')
              }

            }
            $L(currentWrap).addClass('leftShiftElement')

          }


          /*

          Selection from bottom to top ends

          */


        } else if(getIniParInd() === getCurParInd()){
          // console.log('same parent');
          /*

          Selection within the same parent and child

          */

          if(getCurChildInd() < getIniChildInd()){
            if((getIniChildInd() < getPreChildInd()) && (getCurChildInd() < getIniChildInd()) ||
               (getIniChildInd() > getCurChildInd()) && (getCurParInd()<getPreParInd())
              ){
              $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
              previousElement = initialElement
              previousWrap  = initialWrap
              previousParentWrap  = initialParentWrap
              previousChildren  = initialChildren
            }
            // console.log('bottom to top in same parent');

            if(((getPreChildInd() > getCurChildInd()) || (getClickedElemType() === 'parent')) && (getPreParInd() === getCurParInd())){
              // console.log('add bottom to top same parent');
              if(getClickedElemType() === 'parent'){
                $L(currentWrap).addClass('leftShiftElement');
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[0] , '' , true).addClass('leftShiftElement')
              } else {
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).addClass('leftShiftElement')
              }
            } else {
              // console.log('remove bottom to top same parent');
              if(getPreParInd() === getCurParInd()){
                  $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                  $L(currentParentWrap).removeClass('leftShiftElement')
              } else {
                $L(previousWrap).nextUntil(currentWrap,'',true).removeClass('leftShiftElement')
                $L(previousWrap).nextUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                $L(previousParentWrap).nextUntil(currentParentWrap,'',true).removeClass('leftShiftElement')
                if(getPrevElemType() === 'parent'){
                  $L(previousWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
                }
                if(getCurChildInd() === 0){
                  $L(currentChildren[getCurChildInd()]).removeClass('leftShiftElement')
                } else {
                  $L(currentChildren[0]).nextUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              }
              $L(currentWrap).addClass('leftShiftElement')
            }

          } else {
            // console.log('top to bottom in same parent');

            if((getIniChildInd() > getPreChildInd()) && (getCurChildInd() > getIniChildInd())){
              $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
              previousElement = initialElement
              previousWrap  = initialWrap
              previousParentWrap  = initialParentWrap
              previousChildren  = initialChildren
            }

            if(((getPreChildInd() < getCurChildInd()) || (getClickedElemType() === 'parent')) && (getPreParInd() === getCurParInd())){

              // console.log('add top to bottom in same parent');

              $L(currentChildren[getPreChildInd()]).nextUntil(currentChildren[getCurChildInd()] , '' , true).addClass('leftShiftElement')

            } else {

              // console.log('remove top to bottom in same parent');

              $L(previousWrap).prevUntil(currentWrap,'',true).removeClass('leftShiftElement')
              $L(previousWrap).prevUntil(currentParentWrap).find('.lyteLeftLvl2Wrap.leftShiftElement').removeClass('leftShiftElement')
              $L(previousParentWrap).prevUntil(currentParentWrap,'',true).removeClass('leftShiftElement')

              if(getPreParInd() === getCurParInd()){
                $L(currentChildren[getPreChildInd()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
              } else {
                if(getCurChildInd() === getCurLastIndex()){
                  $L(currentChildren[getCurLastIndex()]).addClass('leftShiftElement')
                } else {
                  $L(currentChildren[getCurLastIndex()]).prevUntil(currentChildren[getCurChildInd()] , '' , true).removeClass('leftShiftElement')
                }
              }


              $L(currentWrap).addClass('leftShiftElement')
            }

          }

          /*

          Selection within the same parent and child ends

          */

        }

        $L(lB).find('.lyteListBoxRequiredParent').removeClass('leftShiftElement')
				$L(lB).find('.leftShiftElement').children('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')

				this.setData('leftShiftSelectIndex' , $L(clickedEle)[0].getAttribute('index'));

      } else if ($L(clickedEle).hasClass('lyteListBoxRightElement') && !(clickedEle === lastActiveRight)) {

        if ($L(lB).find('.lyteLBLeftActive').length > 0) {
          $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
        }

        if (!isCurrentElementDisabled) {

          var lastActiveRightInd
          if (!(lastActiveRight.getAttribute('index').split(" ").length > 1)) {
            lastActiveRightInd = rightEles.indexOf(lastActiveRight)
          }
          lastActiveRight = rightEles[lastActiveRightInd]
          prevWrap = $L(lastActiveRight).closest('.lyteListBoxRightWrap');
          nextPrevCheck = parseInt(clickedEle.getAttribute('index')) < parseInt(lastActiveRight.getAttribute('index'))

          if (nextPrevCheck) {
            $L(previousWrap).prevUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            if (
              (wrapArray.indexOf(currentWrap[0]) > wrapArray.indexOf(previousWrap[0])) &&
              (wrapArray.indexOf(previousWrap[0]) < wrapArray.indexOf(prevWrap[0]))
            ) {
              $L(currentWrap).prevUntil(previousWrap,"",true).removeClass('rightShiftElement')
              $L(currentWrap).prevUntil(previousWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            }
            $L(previousWrap).prevUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).prevUntil(prevWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(prevWrap).prevUntil(currentWrap, '.lyteListBoxRightWrap',true).addClass('rightShiftElement')
          } else {
            $L(previousWrap).nextUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            if (
              (wrapArray.indexOf(currentWrap[0]) < wrapArray.indexOf(previousWrap[0])) &&
              (wrapArray.indexOf(previousWrap[0]) > wrapArray.indexOf(prevWrap[0]))
            ) {
              $L(currentWrap).nextUntil(previousWrap,"",true).removeClass('rightShiftElement')
              $L(currentWrap).nextUntil(previousWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            }
            $L(previousWrap).nextUntil(prevWrap,"",true).removeClass('rightShiftElement')
            $L(previousWrap).nextUntil(prevWrap,"",true).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(prevWrap).nextUntil(currentWrap, '.lyteListBoxRightWrap',true).addClass('rightShiftElement')
          }

          $L(lB).find('.lyteListBoxRequiredParent').removeClass('rightShiftElement')
          $L(lB).find('.rightShiftElement').children('.lyteListBoxRightElement').addClass('lyteLBRightActive')

          this.setData('rightShiftSelectIndex', $L(clickedEle)[0].getAttribute('index'));

        }
      }


    } else if ($L(clickedEle).hasClass('lyteListBoxLeftElement') || $L(clickedEle).hasClass('lyteListBoxRightElement')) {

      if (event.metaKey || event.ctrlKey) {

        /*

        * CTRL/CMD key down and select elements

        */


        if (this.panelSide(clickedEle) === "left") {
          if ($L(lB).find('.lyteLBRightActive').length > 0) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
          }


          if (!isCurrentElementDisabled) {

            if ($L(clickedEle).hasClass('lyteListBoxLeftElement') && !$L(clickedEle).hasClass('lyteLBLeftActive')) {

              this.setData('leftShiftSelectIndex', '')
              var cwrap = clickedEle.parentElement
              cwrap = $L(cwrap).find('.lyteListBoxLeftWrap');
              if (cwrap.length > 1) {
                $L(cwrap).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')
              }

              $L(clickedEle).addClass('lyteLBLeftActive')
              Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))
              this.setData('leftShiftSelectIndex', '')
              $L(clickedEle).data('elementData', this.getData('ltPropLeftData')[leftEles.indexOf(clickedEle)]);

            } else {

              if (wrap.length > 1) {
                $L(wrap).find('.lyteListBoxLeftElement').removeClass('lyteLBLeftActive')
              }
              $L(clickedEle).removeClass('lyteLBLeftActive')
              Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'removeAt', $L(clickedEle).data().selectOrder - 1, 1)
              $L(clickedEle).data()
            }
          }

        } else {
          if ($L(lB).find('.lyteLBLeftActive').length > 0) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
          }
          if ((!(this.getData('ltPropRightData')[notDisabled].required))) {

            if ($L(clickedEle).hasClass('lyteListBoxRightElement') && !$L(clickedEle).hasClass('lyteLBRightActive')) {

              this.setData('rightShiftSelectIndex', $L(clickedEle)[0].getAttribute('index'));
              var cwrap = $L(clickedEle).closest('.lyteListBoxRightWrap')[0]
              cwrap = $L(cwrap).find('.lyteListBoxRightWrap');
              if (cwrap.length > 1) {
                $L(cwrap).find('.lyteListBoxRightElement').addClass('lyteLBRightActive')
              }

              // $L(clickedEle).closest('.lyteListBoxRightWrap').addClass('rightShiftElement')

              $L(clickedEle).addClass('lyteLBRightActive')
              Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))
              this.setData('rightShiftSelectIndex', rightEles.indexOf(clickedEle) - 1)
              $L(clickedEle).data('elementData', this.getData('ltPropRightData')[rightEles.indexOf(clickedEle)]);

            } else {

              if (wrap.length > 1) {
                $L(wrap).find('.lyteListBoxRightElement').removeClass('lyteLBRightActive')
              }

              $L(clickedEle).removeClass('lyteLBRightActive')
              Lyte.arrayUtils(this.getData('selectedIndexRight'), 'removeAt', $L(clickedEle).data().selectOrder - 1, 1)
              $L(clickedEle).data()
            }

          }
        }





      } else {


        /*

        * Normal mouse clicks

        */

        if (this.panelSide(clickedEle) === "left") {
          if ($L(lB).find('.lyteLBRightActive').length > 0) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
          }
          if ($L(lB).find('.leftShiftElement').length > 0) {
            $L(lB).find('.leftShiftElement').removeClass('leftShiftElement')
          }

          if (!isCurrentElementDisabled) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            $L(lB).find('.lyteLBLeftMoveElement').removeClass('lyteLBLeftMoveElement')
            this.setData('selectedIndexLeft', [])


            if (!$L(clickedEle).hasClass('lyteLBLeftActive')) {

              this.setData('leftShiftSelectIndex', "");

              if ($L(clickedEle).hasClass('lyteListBoxLeftElement')) {

                if (clickedEle.getAttribute('index').split(" ").length > 1) {

                  $L(clickedEle).addClass('lyteLBLeftActive');
                  $L(clickedEle).addClass('lyteLBLeftMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))

                } else {
                  if (wrap.length > 1) {
                    $L(wrap).find('.lyteListBoxLeftElement').addClass('lyteLBLeftActive')
                  }

                  $L(clickedEle).addClass('lyteLBLeftActive');
                  $L(clickedEle).addClass('lyteLBLeftMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexLeft'), 'push', leftEles.indexOf(clickedEle))

                }

              }

            }
          }

        } else {
          if ($L(lB).find('.lyteLBLeftActive').length > 0) {
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
          }
          if ($L(lB).find('.rightShiftElement').length > 0) {
            $L(lB).find('.rightShiftElement').removeClass('rightShiftElement')
          }
          if ((!(this.getData('ltPropRightData')[notDisabled].required))) {
            $L(lB).find('.lyteLBRightActive').removeClass('lyteLBRightActive')
            $L(lB).find('.lyteLBRightMoveElement').removeClass('lyteLBRightMoveElement')
            this.setData('selectedIndexRight', [])

            if (!$L(clickedEle).hasClass('lyteLBRightActive')) {

              this.setData('rightShiftSelectIndex', "");

              if ($L(clickedEle).hasClass('lyteListBoxRightElement')) {
                if (clickedEle.getAttribute('index').split(" ").length > 1) {


                  $L(clickedEle).addClass('lyteLBRightActive');
                  $L(clickedEle).addClass('lyteLBRightMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))

                } else {

                  if (wrap.length > 1) {
                    $L(wrap).find('.lyteListBoxRightElement').addClass('lyteLBRightActive')
                  }

                  // $L(clickedEle).closest('.lyteListBoxRightWrap').addClass('rightShiftElement')
                  $L(clickedEle).addClass('lyteLBRightActive');
                  $L(clickedEle).addClass('lyteLBRightMoveElement');

                  Lyte.arrayUtils(this.getData('selectedIndexRight'), 'push', rightEles.indexOf(clickedEle))


                }

              }

            }
          }

        }




      }
    }

  },

  panelSide: function(ele) {

    if ($L(ele).hasClass('lyteListBoxLeftElement')) {
      return 'left'
    } else if ($L(ele).hasClass('lyteListBoxRightElement')) {
      return 'right'
    }

  },

  updateInsertIndex: function(th) {
    this.setData('insertAtRightInd', this.getData('insertAtRightInd') + 1)
  },
  reduceInsertIndex: function(th) {
    this.setData('insertAtRightInd', this.getData('insertAtRightInd') - 1)
  },

  getActiveElements: function(activeEles, dataString) {
    var th = this
    var toMoveDatas = []
    var parInd;
    for (var i = 0; i < activeEles.length; i++) {
      var index = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
      var elemData;
      if (!$L(activeEles[i]).hasClass('lyteListBoxLeftParentElement')) {
        if (index.length > 1) {
          elemData = th.getData(dataString)[index[0]].childrenList[index[1]]
          if (!parInd) {
            parInd = toMoveDatas.length - 1;
          }
          toMoveDatas.push(elemData)
        } else {
          elemData = th.getData(dataString)[index[0]]
          elemData = Object.assign({}, elemData);
          if (elemData.childrenList) {
            elemData.childrenList = []
          }
          toMoveDatas.push(elemData)
          if (parInd) {
            parInd = undefined
          }
        }
      }
    }
    return toMoveDatas
  },

  sESPF: function(activeEles, toMoveDatas, mainData, dropIndex, allElements) {
    /*
     *  sort elements in same panel function
     */
    var startInd = activeEles[0].getAttribute('index').split(" ").map(this.indexCallback);
    var dropElem = $L(this.$node).find(allElements)[dropIndex]
    for (var i = 0; i < activeEles.length; i++) {

      if ((!($L(activeEles[i]).hasClass('lyteListBoxLeftParentElement'))) && (!($L(activeEles[i]).hasClass('lyteListBoxRightParentElement')))) {
        var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
        Lyte.arrayUtils(this.getData(mainData), 'removeAt', ind, 1);
      }
    }
    dropIndex = dropElem.getAttribute('index').split(" ").map(this.indexCallback)[0];
    Lyte.arrayUtils(this.getData(mainData), 'insertAt', dropIndex, toMoveDatas);

  },


  mERFN: function(th) {

    /*

    *  Move Elements Right Function
    *  Used to move either a selected single or more elements to move from left panel to right panel

    */

    if (!th) {
      th = this;
    }
    var lB = th.$node;


    $L(lB).find('.lyteLBLeftActive.lyteLBdragClone').removeClass('lyteLBLeftActive')
    var activeEles = $L(lB).find('.lyteLBLeftActive')

    if ((th.getData('ltPropRightData').length + activeEles.length > th.getData('ltPropMaxCount')) && ((this.getData('ltPropMaxCount') > -1))) {
      $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
      th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
      return
    }

    var value = this.getData('ltPropAssociateParent')

    var parInd;

    var toMoveDatas = th.getActiveElements(activeEles, 'ltPropLeftData');

    th.executeMethod('onBeforeRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);

    toMoveDatas = []
    parInd = undefined

    function getIndex(arr, par) {
      var v = arr.findIndex(function(item) {
        return item[value] == par[value]
      })
      return v
    }


    for (var i = 0; i < activeEles.length; i++) {
      var elementData;
      var elemData;
      var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
      var currentData = th.getData('ltPropLeftData')[ind[0]]

      var parentElement = $L(lB).find('.lyteListBoxLeftElement')[ind[0]]

      if ((!$L(activeEles[i]).hasClass('lyteListBoxLeftParentElement')) && (!$L(activeEles[i]).closest('.lyteListBoxLeftWrap').hasClass('lyteLBDisabledElement'))) {
        if ((ind.length > 1)) {
          elementData = th.getData('ltPropLeftData')[ind[0]].childrenList[ind[1]]
          elemData = elementData
          var parentDiv = $L(activeEles[i]).closest('.lyteLBLeftChildWrap')
          var parData = th.getData('ltPropLeftData')[ind[0]]
          if (elementData) {
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
            var selectedDiv = $L(lB).find('.lyteListBoxRightElement')[th.getData('insertAtRightInd')]
            selectedDiv.setAttribute('setParent', th.getData('ltPropLeftData')[ind[0]][th.getData('ltPropAssociateParent')])
            th.updateInsertIndex();
            Lyte.arrayUtils(th.getData('ltPropLeftData')[ind[0]].childrenList, 'removeAt', ind[1], 1);
            $L(lB).find('.lyteLBLeftActive').removeClass('lyteLBLeftActive')
            if (th.getData('ltPropLeftData')[ind[0]].childrenList.length <= 0) {
              $L(parentDiv).closest('.lyteListBoxLeftWrap').addClass('lyteLBoxDisabledParent')
            } else {
              $L(parentDiv).closest('.lyteListBoxLeftWrap').removeClass('lyteLBoxDisabledParent')
            }
          }
        } else {
          if (!(currentData.childrenList)) {
            elementData = th.getData('ltPropLeftData')[ind]
            Lyte.arrayUtils(th.getData('ltPropRightData'), 'insertAt', th.getData('insertAtRightInd'), elementData);
            th.updateInsertIndex();
            Lyte.arrayUtils(th.getData('ltPropLeftData'), 'removeAt', ind, 1);
            toMoveDatas.push(elementData)
          }
        }
      }
    }

    th.setData('selectedIndexLeft', [])
    th.setData('leftShiftSelectIndex', "")


    if ((th.getData('ltPropRightData').length >= th.getData('ltPropMaxCount')) && (this.getData('ltPropMaxCount') > -1)) {
      th.executeMethod('onMaxCountReached', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);
      $L(lB).find('.lyteListboxLeftPanel').addClass('lyteLBDisabledElement')
    }


    th.executeMethod('onMoveRight', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas)


    // after

  },


  mELFN: function(th) {


    /*

    *  Move Elements Left Function
    *  Used to move either a selected single or more elements to move from Right panel to left panel

    */

    if (!th) {
      th = this;
    }
    var lB = th.$node;
    $L(lB).find('.lyteLBRightActive.lyteLBdragClone').removeClass('lyteLBRightActive')
    var activeEles = $L(lB).find('.lyteLBRightActive')

    var value = this.getData('ltPropAssociateParent')

    var toMoveDatas = []
    var parInd;

    var toMoveDatas = th.getActiveElements(activeEles, 'ltPropRightData');

    th.executeMethod('onBeforeLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas);

    toMoveDatas = []
    parInd = undefined

    function getIndex(arr, par) {
      var v = arr.findIndex(function(item) {
        return item[value] == par[value]
      })
      return v
    }

    function getI(arr, val) {
      var i = arr.findIndex(function(item) {
        return item[value] == val
      })
      return i;
    }

    for (var i = 0; i < activeEles.length; i++) {
      var elementData;
      var elemData;
      var ind = activeEles[i].getAttribute('index').split(" ").map(this.indexCallback);
      var currentData = th.getData('ltPropRightData')[ind[0]]

      var parentElement = $L(lB).find('.lyteListBoxRightElement')[ind[0]]

      if ($L(activeEles[i])[0].getAttribute('setParent').length > 0) {

        var parI = getI(th.getData('ltPropLeftData'), $L(activeEles[i])[0].getAttribute('setParent'));
        elementData = th.getData('ltPropRightData')[ind]
        Lyte.arrayUtils(th.getData('ltPropLeftData')[parI].childrenList, 'push', elementData);
        Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
        th.reduceInsertIndex();

      } else {

        elementData = th.getData('ltPropRightData')[ind]
        Lyte.arrayUtils(th.getData('ltPropLeftData'), 'push', elementData);
        Lyte.arrayUtils(th.getData('ltPropRightData'), 'removeAt', ind, 1);
        th.reduceInsertIndex();
        toMoveDatas.push(elementData)

      }

      if ($L(lB).find('.lyteLBoxDisabledParent')) {
        if ($L(lB).find('.lyteLBoxDisabledParent').find('.lyteLBLeftChildWrap').length > 0) {
          $L(lB).find('.lyteLBoxDisabledParent').removeClass('lyteLBoxDisabledParent')
        }
      }

    }

    th.setData('selectedIndexRight', [])
    th.setData('rightShiftSelectIndex', "")

    if (th.getData('ltPropRightData').length < th.getData('ltPropMaxCount')) {
      $L(lB).find('.lyteLBDisabledElement').removeClass('lyteLBDisabledElement')
    }

    th.executeMethod('onMoveLeft', th.getData('ltPropLeftData'), th.getData('ltPropRightData'), toMoveDatas)

    // after

  },
  didDestroy: function() {
    this.setData('selectedIndexLeft', [])
    this.setData('selectedIndexRight', [])
    this.setData('leftShiftSelectIndex', '')
    this.setData('rightShiftSelectIndex', '')
    this.setData('insertAtLeftInd', 0)
    this.setData('insertAtRightInd', 0)
  }
});
