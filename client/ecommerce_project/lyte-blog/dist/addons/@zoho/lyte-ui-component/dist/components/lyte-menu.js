/**
 * A menu is a group of options available to perform some reasonable actions in the page
 * @component lyte-menu
 * @version 1.0.0
 * @methods onBeforeOpen,onOpen,onBeforeClose,onClose,onMenuClick,onPositionChanged
 */

Lyte.Component.register("lyte-menu", {
_template:"<template tag-name=\"lyte-menu\"> <lyte-menu-box class=\"{{ltPropWrapperClass}}\" onmousemove=\"{{action('mousemove',event,this)}}\"> <template is=\"if\" value=\"{{ltPropBindToBody}}\"><template case=\"true\"> <template is=\"if\" value=\"{{expHandlers(ltPropYield,'==',false)}}\"><template case=\"true\"> <lyte-menu-body id=\"{{ltPropId}}\" class=\"{{ltPropClass}}\" tabindex=\"1\"> <template is=\"for\" items=\"{{ltPropContent}}\" item=\"menu\" index=\"indexVal\"><template is=\"if\" value=\"{{lyteUiOptGroupCheck(menu)}}\"><template case=\"true\"> <lyte-menu-group elemorder=\"{{indexVal}}\"> <template is=\"if\" value=\"{{lyteUiReturnOnlyKey(menu)}}\"><template case=\"true\"> <lyte-menu-header> {{lyteUiReturnOnlyKey(menu)}} </lyte-menu-header> </template></template> <template is=\"for\" items=\"{{lyteUiReturnOnlyValue(menu)}}\" item=\"menu1\" index=\"indexVal1\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu1),'==',false)}}\"><template case=\"true\"> <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" data-value=\"{{menu1}}\"> <lyte-menu-label>{{menu1}}</lyte-menu-label> </lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item grporder=\"{{indexVal}}\" elemorder=\"{{indexVal1}}\" id=\"{{menu1.id}}\" class=\"{{menu1.class}}\" data-value=\"{{menu1[ltPropSystemValue]}}\"> <lyte-menu-label>{{menu1[ltPropUserValue]}}</lyte-menu-label> <template is=\"if\" value=\"{{menu1[ltPropDescription]}}\"><template case=\"true\"> <lyte-menu-description> {{menu1[ltPropDescription]}}</lyte-menu-description> </template></template> </lyte-menu-item> </template></template></template> </lyte-menu-group> </template><template case=\"false\"><template is=\"if\" value=\"{{expHandlers(lyteUiIsObject(menu),'==',false)}}\"><template case=\"true\"> <lyte-menu-item elemorder=\"{{indexVal}}\" data-value=\"{{menu}}\"> <lyte-menu-label>{{menu}}</lyte-menu-label> </lyte-menu-item> </template><template case=\"false\"> <lyte-menu-item elemorder=\"{{indexVal}}\" id=\"{{menu.id}}\" class=\"{{menu.class}}\" data-value=\"{{menu[ltPropSystemValue]}}\"> <lyte-menu-label>{{menu[ltPropUserValue]}}</lyte-menu-label> <template is=\"if\" value=\"{{menu[ltPropDescription]}}\"><template case=\"true\"> <lyte-menu-description> {{menu[ltPropDescription]}}</lyte-menu-description> </template></template> </lyte-menu-item> </template></template></template></template></template> </lyte-menu-body> </template><template case=\"false\"> <lyte-yield yield-name=\"yield\"></lyte-yield> </template></template> </template></template> </lyte-menu-box> </template>",
_dynamicNodes : [{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"if","position":[1],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"for","position":[1,1],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"attr","position":[1,1]},{"type":"if","position":[1,1],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"attr","position":[1,3]},{"type":"for","position":[1,3],"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[0]},{"type":"if","position":[0],"cases":{"true":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,1,0]},{"type":"componentDynamic","position":[1,1]},{"type":"attr","position":[1,3]},{"type":"if","position":[1,3],"cases":{"true":{"dynamicNodes":[{"type":"text","position":[1,1]},{"type":"componentDynamic","position":[1]}]}},"default":{}},{"type":"componentDynamic","position":[1]}]}},"default":{}}]}},"default":{}}]},{"type":"componentDynamic","position":[1]}]},"false":{"dynamicNodes":[{"type":"insertYield","position":[1]}]}},"default":{}}]}},"default":{}},{"type":"componentDynamic","position":[1]}],
_observedAttributes :["ltPropContent","ltPropId","ltPropClass","ltPropQuery","ltPropEvent","ltPropYield","ltPropUserValue","ltPropSystemValue","ltPropCallout","ltPropPosition","ltPropDescription","ltPropTabIndex","ltPropFreeze","ltPropShow","ltPropWidth","ltPropHeight","ltPropQueryClass","ltPropBoundary","ltPropScope","ltPropPreventInsideClick","ltPropAnimate","ltPropSetCss","ltPropWrapperClass","ltPropWrapperId","ltPropBindToBody","ltPropAria","ltPropAriaAttributes","ltPropOffset","ltPropHeightResetOnScroll","eventListeners","pos","parIndex","lyteUnbound"],
    init: function () {
        var event = this.getData('ltPropEvent');
        var evt = this.checkElementForMenu.bind(this);
        this.setData('eventListeners.event', evt);
        this._close = this.closing.bind(this);
        this._trsend = this.tranEnd.bind(this);
        this._hoverclose = this.hoverClose.bind(this);
        document.addEventListener(/^(mouseenter|mousemove|mouseover|hover)$/.test(event) ? 'mousemove' : event, evt, true);

        if (!document.getElementsByClassName('lytemenufreezelayer')[0] && this.getData('ltPropFreeze')) {
            this.appendFreeze.call(this, 'lytemenufreezelayer left lyteMenuHidden')
            this.appendFreeze.call(this, 'lytemenufreezelayer top lyteMenuHidden')
            this.appendFreeze.call(this, 'lytemenufreezelayer bottom lyteMenuHidden')
            this.appendFreeze.call(this, 'lytemenufreezelayer right lyteMenuHidden')
            var freezeLayer = this.appendFreeze.call(this, 'lytemenufreezelayer nogroup lyteMenuHidden');
            freezeLayer.addEventListener('wheel', this.preventEvent);
            freezeLayer.addEventListener('touchmove', this.preventEvent);
        }
        if (!document.hasOwnProperty('_lyteMenu')) {
            document.documentElement.addEventListener('click', lyteCloseMenu, true);
            document.documentElement.addEventListener('keydown', this.keydownCheck, true);
            document.documentElement.addEventListener('keypress', menukeypress, true);
            window.addEventListener('orientationchange', this.resizeFunc, true);
            window.addEventListener('resize', this.resizeFunc, true);
            document._lyteMenu = {};
            document._lyteMenu.eventFlag = true;
        }
        /**
         * @method beforeRender
         * @version 1.0.1
         */
        this.getMethods('beforeRender') && this.executeMethod('beforeRender', this.$node);
    },

    rtlfunc: function (lft, bcr, ww) {
        if (this._dir) {
            if (bcr) {
                if (lft == 'right') {
                    return ww - bcr.left;
                }
                return ww - bcr.right;
            } else if (lft == 'left') {
                return 'right';
            }
        }
        return bcr ? bcr[lft] : 'left';
    },

    actions: {
        mousemove: function (evt, _this) {
            var node = evt.target
            while (node && node.tagName != "BODY") {
                if (node.tagName == 'LYTE-MENU-ITEM') {
                    break
                }
                node = node.parentNode;
            }
            if (node && node.tagName == 'LYTE-MENU-ITEM') {

                var prev = _this.querySelector('.lyteMenuSelection');
                if (prev == node) {
                    return
                } else if (prev) {
                    prev.classList.remove('lyteMenuSelection')
                    node.classList.add('lyteMenuSelection')
                } else if (!prev) {
                    node.classList.add('lyteMenuSelection')
                }
            }
        }
    },

    arrayFrom: function (nodeList) {
        var arrayList = [];
        for (var i = 0; i < nodeList.length; i++) {
            arrayList.push(nodeList[i]);
        }
        return arrayList.slice();
    },

    appendFreeze: function (className) {
        var freezeLayer = document.createElement('div');
        freezeLayer.setAttribute('class', className);
        return document.body.appendChild(freezeLayer);
    },

    resizeFunc: function (event) {
        if (event && event.type == 'resize' && _lyteUiUtils.isMobile) {
            return;
        }
        clearTimeout(this._resizeTimeout)
        this._resizeTimeout = setTimeout(function () {
            var activeMenu = document.getElementsByTagName('lyte-menu');
            for (var i = 0; i < activeMenu.length; i++) {
                var current = activeMenu[i],
                    comp = current.component;
                if (current.classList.contains('lyteMenuClosed')) {
                    continue;
                }
                if (!comp.hasOwnProperty('parentMenu')) {
                    comp.callScrollFunc(event);
                    if (comp.getData('ltPropFreeze') && !comp.parentMenu) {
                        setTimeout(comp.setZIndex.bind(comp), 100);
                    }
                }
            }
        }.bind(this), event && event.type == "orientationchange" ? 500 : 16)
    },

    keydownCheck: function (event) {
        var keyCode = event.which || event.keyCode;
        if (keyCode == 27) {
            lyteCloseMenu(event, undefined, true);
        } else if (/^(38|40|13|36|35)$/.test(keyCode)) {
            var menus = document.getElementsByTagName('lyte-menu');
            // if( menus.length ) {
            // event.preventDefault()
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].classList.contains('lyteMenuClosed') || menus[i].getAttribute('lyte-rendered') == null) {
                    continue;
                }
                var menu = menus[i].component;
                if (!menu.childMenu) {
                    menu.traverseList.call(menu, event);
                    if (/^(38|40)$/.test(keyCode) || (menu.data.ltPropAria && /^(35|36)$/.test(keyCode))) {
                        event.preventDefault();
                    }
                    break;
                }
            }
            // }
        } else if (/^(37|39)$/.test(keyCode)) {
            var menus = document.getElementsByTagName('lyte-menu');
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].classList.contains('lyteMenuClosed') || menus[i].getAttribute('lyte-rendered') == null) {
                    continue;
                }
                var menu = menus[i].component;
                if (menu.parentMenu && !menu.childMenu && menu.data.ltPropAria) {
                    var exstSel = $L('.lyteMenuSelection', menu.childComp);
                    if (exstSel.length) {
                        if (/right/i.test(menu.data.pos) && keyCode == 37 || /left/i.test(menu.data.pos) && keyCode == 39) {
                            menu.$node.ltProp('show', false);
                        }
                        event.preventDefault();
                    } else {
                        menu.scrIntoView($L('lyte-menu-item:not(.lyteMenuSelection)', menu.childComp).eq(0).addClass('lyteMenuSelection').get(0));
                    }
                    break;
                }
            }
        } else if (keyCode == 32) {
            var menus = document.getElementsByTagName('lyte-menu');
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].classList.contains('lyteMenuClosed') || menus[i].getAttribute('lyte-rendered') == null) {
                    continue;
                }
                var menu = menus[i],
                    box = menu.component.childComp,
                    target = event.target,
                    _this = menu.component;

                if (_this.eligibleForClose(_this, target)) {
                    break;
                }
                if (menu.ltProp('freeze')) {
                    event.preventDefault();
                    break;
                }
            }
        }
    },

    searchFilter: function (val) {
        this._typed = '';
        if (!val) {
            return
        }
        var items = this.childComp.getElementsByTagName('lyte-menu-item'), sel = {};
        for (var i = 0; i < items.length; i++) {
            var txt = items[i].textContent.trim().toLowerCase(), idx = txt.indexOf(val);
            if (idx != -1 && (idx < sel.index || sel.index == undefined)) {
                sel.item = items[i]; sel.index = idx;
            }
        }
        if (sel.item) {
            var prevS = this.childComp.getElementsByClassName('lyteMenuSelection')[0];
            if (sel.item == prevS) {
                return;
            }
            if (prevS) {
                prevS.classList.remove('lyteMenuSelection');
            }
            sel.item.classList.add('lyteMenuSelection');
            this.scrIntoView.call(this, sel.item)
        }
    },

    scrIntoView: function (elem) {
        if (!elem) {
            return;
        }
        $L.fastdom.measure(function () {
            var off = elem.getBoundingClientRect(), scr = this.findscrElem.call(this, elem), hgt = scr.getBoundingClientRect();
            $L.fastdom.mutate(function () {
                if (off.bottom > hgt.bottom) {
                    scr.scrollTop += parseInt(off.bottom - hgt.bottom);
                } else if (off.top < hgt.top) {
                    scr.scrollTop += parseInt(off.top - hgt.top);
                }
            }.bind(this))
        }.bind(this))
    },

    findscrElem: function (el) {
        var nde = el.parentNode;
        while (nde && nde.nodeName != "LYTE-MENU-BODY") {
            var st = window.getComputedStyle(nde).getPropertyValue('overflow-y')
            if (nde.scrollHeight > nde.offsetHeight && (st == 'auto' || st == 'scroll')) {
                break;
            }
            nde = nde.parentNode;
        }
        return nde;
    },

    didDestroy: function () {

        if (this.childComp) {
            var allNodes = this.childComp.getElementsByTagName('lyte-menu-item')
            for (var i = 0; i < allNodes.length; i++) {
                var curValue = allNodes[i].getAttribute('lyte-shortcut')
                if (curValue) {
                    allNodes[i].setAttribute('lyte-shortcut', JSON.stringify({}))
                }
            }
            this.childComp.parentElement && this.childComp.parentElement.removeChild(this.childComp);
            delete this.childComp.parent;
            delete this.childComp; /*delete this.$node.toggle;*/
        }
        var removeEvents = this.getData('eventListeners'), event = this.getData('ltPropEvent');
        if (document.body.querySelectorAll('lyte-menu').length == 0) {
            var freezeLayers = document.body.querySelectorAll('div.lytemenufreezelayer')
            for (var i = 0; i < freezeLayers.length; i++) {
                document.body.removeChild(freezeLayers[i]);
            }
            if (document._lyteMenu) {
                delete document._lyteMenu
                document.documentElement.removeEventListener('keydown', this.keydownCheck, true);
                document.documentElement.removeEventListener('keypress', menukeypress, true)
                document.documentElement.removeEventListener('click', lyteCloseMenu, true);
                window.removeEventListener('resize', this.resizeFunc, true);
                window.removeEventListener('orientationchange', this.resizeFunc, true);
            }
        } else if (this.data.ltPropShow && this.data.ltPropFreeze) {
            document.body.classList.remove('lyteBodyWrapper');
            if (document.menu == this) {
                delete document.menu;
            }
            this.removeFreeze();
        }
        window.removeEventListener('scroll', this.addScrollPos, true);
        var ltPropQuery = this.getData('ltPropQuery'), parIndex = this.getData('parIndex'), nodeList;
        if (ltPropQuery || parIndex != undefined) {
            if (ltPropQuery) {
                nodeList = document.querySelectorAll(ltPropQuery);
            }
            document.removeEventListener(/^(mouseenter|mousemove|mouseover|hover)$/.test(event) ? 'mousemove' : event, removeEvents.event, true);
            if (ltPropQuery) {
                for (var i = 0; i < nodeList.length; i++) {
                    delete nodeList[i].menu;
                }
            }
        }
        clearTimeout(this._typetime)

        if (this.menuBody) {
            delete this.menuBody.parent;
            delete this.menuBody
        }
        if (document.menu == this) {
            delete document.menu;
        }
    },

    closestFind: function (path, query) {
        var parIndex = this.getData('parIndex'),
            elements = this.arrayFrom.call(this, (parIndex != undefined ? (this.$node.parentNode.parentNode.querySelectorAll('lyte-menu-item:nth-of-type(' + ++parIndex + ')')) : document.querySelectorAll(query.trim())));
        for (var i = 0; i < path.length; i++) {
            if (Array.prototype.indexOf.call(elements, path[i]) != -1) {
                return path[i];
            }
        }
        return null;
    },

    isHoverAnimate: function () {
        return this.data.ltPropAnimate && /^(mouseenter|mousemove|mouseover|hover)$/.test(this.data.ltPropEvent);
    },

    checkElementForMenu: function (event) {
        if (!event.menuFlag) {
            var query = this.getData('ltPropQuery');
            var closetElem = this.closestFind.call(this, event.path ? event.path : this.composePath.call(this, event), query);
            if (closetElem != null) {
                var isHover = this.isHoverAnimate();
                if (!isHover) {
                    if (this._evtadded) {
                        if (this.data.ltPropAnimate && parseInt(this.menuBody.style.height) == 0) {
                            this.setData('ltPropShow', false)
                        }
                        return;
                    }
                }
                if (event.type == 'contextmenu') {
                    event.preventDefault();
                    lyteCloseMenu(event, this.$node);
                }
                var isOpen = !this.childComp.classList.contains('lyteMenuHidden');
                if (isOpen && this.$node.element != closetElem) {
                    if (isHover) {
                        if (this._openstart) {
                            this.tranEnd();
                        }
                        this.data.ltPropAnimate = false;
                        if (this._hideStarts) {
                            clearTimeout(this._time3);
                            this.closing(true, event);
                        } else {
                            this.hideMenu(true, event);
                        }
                        this.data.ltPropAnimate = true;
                    } else {
                        // for opening same menu at diff position menu body should be hided and its animation need to be prevented
                        this.childComp.classList.remove('lyteAnimate')
                        this._hideStarts = true
                        this._closest = closetElem, this._event = event
                        var prom = new Promise(function (resolve, reject) {
                            this._promResolve = resolve, this._promReject = reject
                            this.hideMenu.call(this, true, event);
                        }.bind(this))

                        Promise.resolve(prom).then(function () {
                            this.openingMenu(this._closest, this._event)
                            delete this._closest; delete this._event; delete this._promReject; delete this._promResolve;
                        }.bind(this), function () {
                            delete this._closest; delete this._event; delete this._promReject; delete this._promResolve;
                        }.bind(this))
                        return
                    }
                } else if (isOpen && this.$node.element == closetElem) {
                    if (isHover) {
                        if (this._openstart) {
                            return;
                        }
                    } else {
                        return;
                    }
                }
                this.openingMenu(closetElem, event)
            } else if (event.type == "contextmenu") {
                lyteCloseMenu(event, undefined, true);
            }
        }
    },

    openingMenu: function (closetElem, event) {
        if (closetElem.tagName == "LYTE-MENU-ITEM" && event.type == 'click') {
            event.stopPropagation();
        }
        event.menuFlag = true;
        // $L.fastdom.mutate(function(){
        this.$node.element = closetElem;
        closetElem.menu = this.$node;
        if (!this.parentMenu) {
            if (event.type != "contextmenu") {
                this._open_fast = $L.fastdom.mutate(this.$node.toggle.bind(this.$node, event));
            } else {
                this.$node.toggle(event || {});
            }
        }
        // }.bind(this))
    },

    didConnect: function () {

        var menuBox = this.$node.getElementsByTagName('lyte-menu-box')[0];
        this.$node.toggle = function (event, flag) {
            delete this._open_fast;
            if (this.childComp.classList.contains('lyteMenuHidden') || flag) {
                if (['mousedown', 'mouseup'].indexOf(event.type) > -1) {
                    document._lyteMenu.preventClick = false;
                }
                this.openMenu.call(this, event)
            }
            else {
                if (!this.childMenu && event.type.indexOf('mouse') == -1 && !this._hideStarts) {
                    this.hideMenu.call(this, true, event)
                }
            }
        }.bind(this);

        this.$node.setCss = this.setCss.bind(this);

        menuBox.parent = this.$node;
        this.childComp = menuBox;
        menuBox.classList.add('lyteMenuHidden');
        this.$node.classList.add('lyteMenuClosed');
        menuBox.style.width = this.getData('ltPropWidth');

        // Lyte.Component.appendChild(document.body, menuBox);
        if (this.data.ltPropCallout && /^(mouseenter|mousemove|mouseover|hover)$/.test(this.data.ltPropEvent)) {
            this.childComp.classList.add('lyteHoverMenu')
        }
        if (this.getMethods('afterRender')) {
            /**
             * @method afterRender
             * @version 1.0.1
             */
            this.executeMethod('afterRender', this.$node);
        }
        $L.fastdom.measure(function () {
            this._dir = _lyteUiUtils.getRTL();
        }.bind(this))
    },

    bToBody: function () {
        if (this.data.ltPropBindToBody && this.childComp.parentNode != document.body) {
            var menuBody = this.childComp.querySelector('lyte-menu-body');
            menuBody.addEventListener('click', this.optionSelect.bind(this));
            menuBody.parent = this.$node;
            this.menuBody = menuBody;
            var span = document.createElement('span');
            span.setAttribute('class', 'lyteArrow' + (this.data.ltPropCallout ? '' : ' lyteMenuHidden'));
            menuBody.insertBefore(span, menuBody.children[0]);
            this.menuBody.style.height = this.data.ltPropHeight;
            if (this._dir) {
                this.menuBody.classList.add('lyteRTL');
            }
            _lyteUiUtils.appendChild(document.body, this.childComp);
        } else if (!this.data.ltPropBindToBody) {
            this.$node.ltProp('show', false);
            if (this.menuBody) {
                delete this.menuBody.parent;
                delete this.menuBody;
            }
        }
    }.observes('ltPropBindToBody').on('didConnect'),

    calloutObs: function (arg) {
        var arrow = this.childComp.querySelector('span.lyteArrow')
        if (arg.newValue) {
            arrow.classList.remove('lyteMenuHidden')
        } else {
            arrow.classList.add('lyteMenuHidden')
        }
    }.observes('ltPropCallout'),

    data: function () {
        return {
            // user data
            /**
            * @componentProperty {string[] | object[]} ltPropContent
            * @default []
            * @version 1.0.0
            */
            ltPropContent: Lyte.attr('array', { 'default': [] }),
            /**
             * @componentProperty {string} ltPropId=''
             * @version 1.0.0
             */
            ltPropId: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {string} ltPropClass=''
             * @version 1.0.0
             */
            ltPropClass: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {string} ltPropQuery=''
             * @version 1.0.0
             */
            ltPropQuery: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {string} ltPropEvent=click
             * @version 1.0.0
             */
            ltPropEvent: Lyte.attr('string', { 'default': 'click' }),
            /**
             * @componentProperty {boolean} ltPropYield=false
             * @version 1.0.0
             */
            ltPropYield: Lyte.attr('boolean', { 'default': false }),
            /**
             * @componentProperty {string} ltPropUserValue=''
             * @version 1.0.0
             */
            ltPropUserValue: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {string} ltPropSystemValue=''
             * @version 1.0.0
             */
            ltPropSystemValue: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {boolean} ltPropCallout=false
             * @version 1.0.0
             */
            ltPropCallout: Lyte.attr('boolean', { 'default': false }),
            /**
             * @componentProperty {down | up | left | right | upRight | upLeft | downRight | downLeft | downAlignLeft | downAlignRight | upAlignLeft | upAlignRight} ltPropPosition=down
             * @version 1.0.0
             */
            ltPropPosition: Lyte.attr('string', { 'default': 'down' }),
            /**
             * @componentProperty {string} ltPropDescription=''
             * @version 1.0.0
             */
            ltPropDescription: Lyte.attr('string', { 'default': '' }),
            /**
             * @experimental ltPropTabIndex
             */
            ltPropTabIndex: Lyte.attr('number', { 'default': 0 }),
            /**
             * @componentProperty {boolean} ltPropFreeze=true
             * @version 1.0.0
             */
            ltPropFreeze: Lyte.attr('boolean', { 'default': true }),
            /**
             * @componentProperty {boolean} ltPropShow=false
             * @version 1.0.1
             */
            ltPropShow: Lyte.attr('boolean', { 'default': false }),
            /**
             * @componentProperty {string} ltPropWidth=auto
             * @version 1.0.0
             */
            ltPropWidth: Lyte.attr('string', { 'default': 'auto' }),
            /**
             * @componentProperty {string} ltPropHeight=auto
             * @version 1.0.0
             */
            ltPropHeight: Lyte.attr('string', { 'default': 'auto' }),
            /**
             * @componentProperty {string} ltPropQueryClass=lyteMenuSelected
             * @version 1.0.0
             */
            ltPropQueryClass: Lyte.attr('string', { 'default': 'lyteMenuSelected' }),
            /**
             * @componentProperty {object} ltPropBoundary
             * @default {}
             * @version 1.0.0
             */
            ltPropBoundary: Lyte.attr('object', { 'default': {} }),
            /**
             * @componentProperty {string} ltPropScope=''
             * @version 1.0.0
             */
            ltPropScope: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {boolean} ltPropPreventInsideClick=false
             * @version 1.0.0
             */
            ltPropPreventInsideClick: Lyte.attr('boolean', { default: false }),
            /**
             * @componentProperty {boolean} ltPropAnimate=false
             * @version 1.0.3
             */
            ltPropAnimate: Lyte.attr('boolean', { default: false }),
            /**
             * @componentProperty {boolean} ltPropSetCss=true
             * @version 1.0.4
             */
            ltPropSetCss: Lyte.attr('boolean', { default: true }),
            /**
             * @componentProperty {string} ltPropWrapperClass=''
             * @version 1.0.4
             */
            ltPropWrapperClass: Lyte.attr('string', { 'default': '' }),
            /**
             * @componentProperty {string} ltPropWrapperId=''
             * @version 1.0.4
             */
            ltPropWrapperId: Lyte.attr('string', { default: "" }),
            /**
             * @componentProperty {boolean} ltPropBindToBody=true
             * @version 2.1.0
             */
            ltPropBindToBody: Lyte.attr('boolean', { default: true }),
            /**
             * @componentProperty {boolean} ltPropAria=false
             * @version 3.1.0
             */
            ltPropAria: Lyte.attr('boolean', { default: false }),
            /**
             * @componentProperty {object} ltPropAriaAttributes
             * @default {"role":"menu"}
             * @version 3.1.0
             */
            ltPropAriaAttributes: Lyte.attr('object', { default: { role: "menu" } }),
            /**
             * @typedef {object} menuOffset
             * @property {number} left
             * @property {number} right
             * @property {number} top
             * @property {number} bottom
             */

            /**
             * @componentProperty {menuOffset} ltPropOffset
             * @default {}
             * @version 2.2.11
             */
            ltPropOffset: Lyte.attr('object', { default: {} }),
            /**
             * @experimental ltPropHeightResetOnScroll
             */
            ltPropHeightResetOnScroll: Lyte.attr('boolean', { default: true }),

            // system data 
            eventListeners: Lyte.attr('object', { 'default': {} }),
            pos: Lyte.attr('string', { default: '' }),
            parIndex: Lyte.attr('number'),
            lyteUnbound: Lyte.attr('boolean', { default: false })
        }
    },

    firePosCallBack: function () {
        if (this.getMethods('onPositionChanged')) {
            this.executeMethod('onPositionChanged', this.getData('pos'), this.$node);
        }
    }.observes('pos'),

    contentChangeObs: function () {
        this.contentChange.call(this);
    }.observes('ltPropContent.[]'),

    contentChange: function () {
        if (!this.childComp.classList.contains('lyteMenuHidden')) {
            this.setCss.call(this);
            this.menuBody.style.removeProperty('height');
        }
    },

    setContextCss: function (evt, position) {
        var element = this.$node.element;
        var menuBody = this.childComp;
        $L.fastdom.measure(function () {
            var evt1 = evt,
                nbr = element.getBoundingClientRect();
            if (!evt) {
                evt = { clientX: nbr.left + nbr.width / 2, clientY: nbr.top + nbr.height / 2 }
            }
            var clientRect = menuBody.getBoundingClientRect(),
                menuBodyBcr = this.menuBody.getBoundingClientRect(),
                menuBodystyle = window.getComputedStyle(this.menuBody),
                padding = (menuBodystyle.boxSizing == 'content-box' ? (parseFloat(menuBodystyle.paddingTop) + parseFloat(menuBodystyle.paddingBottom)) : 0),
                bodyHeight = menuBodyBcr.height - padding,
                innerHeightt = window.innerHeight,
                innerWidtht = window.innerWidth,
                offset = this.data.ltPropOffset || {},
                topoff = offset.top || 0,
                btmoff = offset.bottom || 0,
                lftoff = offset.left || 0,
                rgtoff = offset.right || 0,
                x = (window.pageXOffset || document.documentElement.scrollLeft) * (this._dir ? - 1 : 1),
                y = window.pageYOffset || document.documentElement.scrollTop,
                lT = this.rtlfunc.call(this, 'left'),
                cX = this.__cX != undefined ? (this.__cX + this.rtlfunc('left', nbr, innerWidtht)) : (!this._dir ? evt.clientX : (innerWidtht - evt.clientX)),
                cY = this.__cY != undefined ? (this.__cY + nbr.top) : (evt.clientY);
            // $L.fastdom.mutate(function(){
            if (!position) {
                position = this.data.ltPropPosition;
            }
            switch (position) {
                case 'up': {
                    menuBody.style[lT] = cX + x + 'px';
                    // menuBody.style.top = ( cY - clientRect.height + y ) + 'px';
                    if (cY > innerHeightt - cY) {
                        // if( parseInt( menuBody.style.top ) < y )
                        //     {
                        menuBody.style.top = (cY + y) + 'px';
                        // }
                    } else {
                        // if( ( parseInt( menuBody.style.top ) + clientRect.height) > innerHeightt + y )
                        //     {
                        //         menuBody.style.top = ( cY - clientRect.height + y ) + 'px';
                        //     } 
                        menuBody.style.top = (cY - clientRect.height + y) + 'px';
                    }
                    this.setData('pos', 'up')
                    break;
                }
                default: {
                    menuBody.style[lT] = cX + x + 'px';
                    // menuBody.style.top = cY + y + 'px';
                    if (cY < innerHeightt - cY) {
                        // if( ( parseInt( menuBody.style.top ) + clientRect.height ) > innerHeightt + y ) {
                        //     menuBody.style.top = ( cY - clientRect.height + y ) + 'px';
                        // }
                        menuBody.style.top = cY + y + 'px';
                    } else {
                        // if( parseInt( menuBody.style.top ) < y ) {
                        //     menuBody.style.top = ( cY + y ) + 'px';
                        // }
                        menuBody.style.top = (cY - clientRect.height + y) + 'px';
                    }
                    this.setData('pos', 'down')
                }
            }
            if (clientRect.left < lftoff) {
                menuBody.style[lT] = (cX + lftoff) + 'px';
            }
            else if (this.rtlfunc.call(this, 'right', clientRect, innerWidtht) > (innerWidtht - rgtoff)) {
                menuBody.style[lT] = (cX - clientRect.width) + 'px';
            }
            if (evt1) {
                // if( evt1.type == 'contextmenu' ){
                if (parseFloat(menuBody.style.top) - y + bodyHeight > innerHeightt - btmoff && cY <= innerHeightt) {
                    this.menuBody.style.height = (innerHeightt - btmoff - parseFloat(menuBody.style.top) + y) + 'px';
                    bodyHeight = parseFloat(this.menuBody.style.height);
                }
                if (parseFloat(menuBody.style.top) - y < topoff && cY >= topoff) {
                    this.menuBody.style.height = (parseFloat(menuBody.style.top) - y - topoff + bodyHeight) + 'px';
                    menuBody.style.top = (y + topoff) + 'px';
                    bodyHeight = parseFloat(this.menuBody.style.height);
                }
                this._hgt = bodyHeight;
                // }
                if (this.__cX == undefined) {
                    this.__cX = cX - this.rtlfunc('left', nbr, innerWidtht);
                }
                if (this.__cY == undefined) {
                    this.__cY = cY - nbr.top;
                }
            }
            // }.bind(this))
        }.bind(this))

    },


    openMenu: function (event, flagg) {
        var onBeforeOpen, eventType = this.getData('ltPropEvent'), targetDiv;
        event = event ? event : {}
        if (!flagg) {
            targetDiv = this.targetElem.call(this, event.target);
            if (targetDiv[0]) {
                targetDiv[0].originMenu = targetDiv[1].component
            }
        }
        if (flagg && eventType != 'contextmenu') {
            if (!this.$node.element) {
                var query = this.getData('ltPropQuery');
                this.$node.element = document.body.querySelector(query.trim());
            }
            if (this.$node.element.tagName == 'LYTE-MENU-ITEM') {
                targetDiv = this.targetElem.call(this, this.$node.element);
            }
            else if (!targetDiv) {
                targetDiv = [];
            }
        }
        if (this.getMethods('onBeforeOpen')) {
            onBeforeOpen = this.executeMethod('onBeforeOpen', this.$node, event, this.$node.element);
        }

        if (targetDiv && targetDiv[0] && targetDiv[1].tagName == 'LYTE-MENU') {
            if (!targetDiv[1].ltProp('show')) {
                onBeforeOpen = false;
            }
        }

        if (onBeforeOpen != false && this.$node.element) {
            if (!this.data.ltPropBindToBody) {
                this.$node.ltProp('bindToBody', true);
            }
            //Actual opening process
            // $L.fastdom.measure(function(){
            //     // to set initial position if its scrolled previously

            // }.bind(this))
            // $L.fastdom.mutate(function(){
            // to set initial position if its scrolled previously
            this.childComp.scrollTop = 0;
            this.childComp.classList.remove('lyteMenuHidden', 'lyteAnimate');
            this.$node.classList.remove('lyteMenuClosed');
            this.$node.element && this.$node.element.setAttribute('aria-expanded', 'true');
            this.childComp.style.display = 'block'

            if (this.getData('ltPropHeight')) {
                this.menuBody.style.height = this.getData('ltPropHeight')
            } else {
                this.menuBody.style.removeProperty('height')
            }
            if (targetDiv[0]) {
                if (targetDiv[1].tagName == 'LYTE-MENU') {
                    targetDiv[1].component.childMenu = this
                    this.parentMenu = targetDiv[1].component
                    targetDiv[1].component.childComp.addEventListener('mousemove', this.mouseleave)
                }
            }
            if (!this.parentMenu) {
                this.$node.element.classList.add(this.getData('ltPropQueryClass'))
            }
            if (!this.parentMenu && this.$node.element.tagName != 'LYTE-MENU-ITEM') {
                lyteCloseMenu(event, this.$node)
            }
            if (this.getData('ltPropFreeze') && !this.parentMenu) {
                this.setZIndex.call(this)
            }
            else if (!document.menu) {
                window.addEventListener('scroll', this.addScrollPos, true)
                document.menu = this
            }
            if ((/^(mouseenter|mousemove|mouseover|hover)$/.test(eventType)) && !this.childMenu && !this.parentMenu && !targetDiv[0]) {
                document.addEventListener('mousemove', this._hoverclose);
                // this.$node.element.addEventListener('mousemove', this.preventEvent);
                // this.menuBody.addEventListener('mousemove', this.preventEvent);
            }
            this._openFastdom = $L.fastdom.measure(function () {
                var mbcr = this.menuBody.getBoundingClientRect(),
                    iH = window.innerHeight,
                    yOff = window.pageYOffset || document.documentElement.scrollTop;
                this._dontCall = true;
                this.$node.ltProp('show', true);
                delete this._dontCall; delete this._openFastdom;
                if (this.getData('ltPropEvent') == 'contextmenu') {
                    this.setContextCss.call(this, event);
                }
                else {
                    this.setCss.call(this);
                }
                if (event.type != 'contextmenu') {
                    // this._hgt =  this.heightCheck.call(this, this.menuBody, mbcr, yOff, iH );
                    if (this.getData('ltPropAnimate') && this._hgt != 0) {
                        this._openstart = true;
                        // for animating height height need to set as zero and animate class need to be added
                        this.menuBody.style.height = 0;
                        if (['up', 'upLeft', 'upRight'].indexOf(this.getData('pos')) != -1) {
                            this.childComp.style.top = parseInt(this.childComp.style.top) + this._hgt + 'px';
                        }
                        this._time1 = setTimeout(this.animeClassAdd.bind(this), 20)
                    }
                }
                if (this.getMethods('onOpen')) {
                    this.executeMethod('onOpen', this.$node, event, this.$node.element);
                }
            }.bind(this))

        } else {
            this._dontCall = true;
            delete this.$node.element;
            this.setData('ltPropShow', false)
            delete this._dontCall;
            if (this._promReject) {
                this._promReject();
            }
        }
    },

    animeClassAdd: function () {
        this.childComp.classList.add('lyteAnimate');
        this._time2 = setTimeout(this.heightSet.bind(this), 20)
    },

    heightSet: function () {

        var style = window.getComputedStyle(this.menuBody);

        this._transdur = Math.max(400, this.returntran(style.transitionDuration) + this.returntran(style.transitionDelay) + 20);

        // for invert animation
        this._evtadded = true;
        // this.childComp.removeEventListener( 'transitionend', this._trsend )
        this.childComp.addEventListener('transitionend', this._trsend)
        if (['up', 'upLeft', 'upRight'].indexOf(this.getData('pos')) != -1) {
            this.childComp.style.top = parseInt(this.childComp.style.top) - this._hgt + 'px';
        }
        // animation start
        this.menuBody.style.height = this._hgt + 'px';
    },

    tranEnd: function (evt) {
        this.childComp.removeEventListener('transitionend', this._trsend)
        this.childComp.classList.remove('lyteAnimate');
        clearTimeout(this._time2);
        clearTimeout(this._time1);
        this.clearFastdom();
        if (this._dont_modify) {
            this.menuBody.style.height = '';
            delete this._dont_modify;
        }
        delete this._openstart;
    },

    clearFastdom: function () {
        $L.fastdom.clear(this._openFastdom);
        $L.fastdom.clear(this._open_fast);
        delete this._open_fast;
        delete this._openFastdom;
    },

    // heightCheck : function(menuBody, bcr, extsYoff, iH ){
    //         if(  !this.data.ltPropSetCss ) {
    //             return
    //         }
    //     // here fastdom is removed for proper on open callback
    //         // menu body properties are required for enable scroll when window size is too small to view full menu body
    //         var clientRect = bcr || menuBody.getBoundingClientRect(), hgt, yoff = extsYoff == undefined ? ( window.pageYOffset || document.documentElement.scrollTop ) : extsYoff,
    //         windowHgt = iH || window.innerHeight;
    //         hgt = clientRect.bottom - clientRect.top;
    //         if(clientRect.bottom > windowHgt)
    //             {
    //                 this.menuBody.style.height = (windowHgt - clientRect.top) + 'px';
    //                 hgt = windowHgt - clientRect.top;
    //             }       
    //         if(clientRect.top < 0)
    //             {
    //                 this.menuBody.style.height = clientRect.bottom + 'px';
    //                 this.childComp.style.top = yoff + 'px';
    //                 hgt = clientRect.bottom;
    //             }   
    //         this._dontCall = true;
    //         this.$node.ltProp('show', true);
    //         delete this._dontCall;
    //         return hgt;
    // },

    composePath: function (event) {
        var arr = [], node = event.target;
        while (node && node.tagName != 'HTML') {
            arr.push(node);
            node = node.parentNode;
        }
        return arr;
    },

    elementsFromPointCal: function (x, y) {
        var arr = [], element = document.elementFromPoint(x, y), prev;
        while (element != document && element != document.documentElement && element != document.body && element.tagName != 'LYTE-MENU-BODY') {
            element._pe = element.style.pointerEvents;
            element.style.pointerEvents = 'none';
            arr.push(element);
            prev = element;
            element = document.elementFromPoint(x, y);
            if (prev == element) {
                break
            }
        }
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.pointerEvents = arr[i]._pe;
            delete arr[i]._pe;
        }
        return arr;
    },

    eligibleForClose: function (_this, target) {
        if (!target) {
            return false;
        }
        if (_this.childComp && _this.childComp.contains(target)) {
            return true;
        }
        if (_this.childMenu) {
            return this.eligibleForClose(_this.childMenu, target);
        }
        return false;
    },

    hoverClose: function (event) {
        if (this.$node) {
            var elements = document.elementsFromPoint ? document.elementsFromPoint(event.clientX, event.clientY) : this.elementsFromPointCal(event.clientX, event.clientY);
            if (elements.indexOf(this.$node.element) == -1 && elements.indexOf(this.childComp) == -1 && !this.eligibleForClose(this, elements[0])) {
                this.hideMenu(true, event);
            }
            // if((document.elementsFromPoint ? document.elementsFromPoint(event.clientX, event.clientY) : this.elementsFromPointCal.call(this, event.clientX, event.clientY)).indexOf(this.$node.element) == -1)
            //     {
            //         this.hideMenu.call(this, true, event);
            //     }
        }
    },

    mouseleave: function (event) {
        var component = this.parent.component, target = component.targetElem.call(component, event.target);
        if (component.childMenu) {
            if (target[1] == component.$node && target[0] != component.childMenu.$node.element && target[0]) {
                this.removeEventListener('mousemove', component.childMenu.mouseleave)
                component.childMenu.hideMenu.call(component.childMenu, true, event)
            }
        }
    },

    hideToggle: function (arg) {
        if (this._dontCall) {
            return;
        }
        if (arg.newValue == false) {
            this.hideMenu(true, {});
        }
        else {
            this.openMenu({}, true);
        }
    }.observes('ltPropShow'),

    hideMenu: function (flag, event, flag2) {
        this.tranEnd();
        var onBeforeClose;
        if (this.childMenu) {
            if (!this.childMenu.childComp.contains(event.target) || flag2) {
                if (!this.childMenu.hideMenu.call(this.childMenu, flag, event, flag2)) {
                    return
                }
            } else {
                return
            }
        }
        if (this.getMethods('onBeforeClose')) {
            onBeforeClose = this.executeMethod('onBeforeClose', this.$node, event);
        }
        if (onBeforeClose != false) {
            this.clearFastdom();
            delete this.__cX; delete this.__cY;
            if (this.parentMenu) {
                delete this.parentMenu.childMenu
                delete this.parentMenu
            }
            else {
                // this.$node.element && this.$node.element.classList.remove(this.getData('ltPropQueryClass'))
                delete document.menu
                window.removeEventListener('scroll', this.addScrollPos, true)
            }
            this._arguments = arguments;
            if (/^(mouseenter|mousemove|mouseover|hover)$/.test(this.data.ltPropEvent) != -1) {
                // this.$node.element.removeEventListener('mousemove', this.preventEvent);
                // this.menuBody.removeEventListener('mousemove', this.preventEvent);
                document.removeEventListener('mousemove', this._hoverclose);
            }
            this._hideStarts = true;
            // $L.fastdom.mutate( function(){
            if (this.menuBody && this.data.ltPropAnimate && this.data.ltPropEvent != 'contextmenu' && this._hgt) {
                this.menuBody.style.height = this._hgt + 'px';
                this.childComp.classList.add('lyteAnimate')// for hide height is set to zero
                // clearTimeout( this.hidetime )
                this._time3 = setTimeout(function () {
                    if (this.menuBody.style.height != '0px') {
                        this.menuBody.style.height = 0;
                        if (['up', 'upLeft', 'upRight'].indexOf(this.getData('pos')) != -1) {
                            this.childComp.style.top = parseInt(this.childComp.style.top) + this._hgt + 'px';
                        }
                        this.menuBody.removeEventListener('transitionend', this._close)
                        this.menuBody.addEventListener('transitionend', this._close)
                        this._hidetimeout = setTimeout(this.closing.bind(this, flag, event), this._transdur);
                    } else {
                        this.closing(flag, event);
                    }
                }.bind(this), 20)
            } else {
                delete this._arguments;
                this.closing(flag, event)
            }
            // }.bind(this))
            return true
        } else {
            this._dontCall = true;
            this.setData('ltPropShow', true)
            delete this._dontCall;
            delete this._hideStarts;
            if (this._promReject) {
                this._promReject();
            }
        }
    },

    closing: function () {
        var flag, evt;
        if (this._arguments) {
            flag = this._arguments[0];
            evt = this._arguments[1];
            // height set to its original
            this.menuBody.style.height = this._hgt + 'px';
            delete this._hgt;
            delete this._arguments;
        } else {
            flag = arguments[0];
            evt = arguments[1];
        }
        this.menuBody && this.menuBody.removeEventListener('transitionend', this._close)
        this.childComp.classList.add('lyteMenuHidden')
        delete this._hideStarts;
        this.$node.classList.add('lyteMenuClosed');
        if (this.getData('ltPropFreeze') && !this.parentMenu) {
            this.setZIndex.call(this, flag)
        }
        this._dontCall = true;
        this.$node.ltProp('show', false);
        
        if( this.$node.element ){
            this.$node.element.removeAttribute( 'aria-expanded' );
            this.$node.element.classList.remove( this.getData( 'ltPropQueryClass' ) );
        }
        delete this._dontCall;
        delete this.$node.element; delete this._evtadded;
        this.childComp.classList.remove('lyteAnimate');
        this.childComp.style.left = '';
        this.childComp.style.top = '';
        var selection = this.childComp.querySelector('.lyteMenuSelection')
        if (selection) {
            selection.classList.remove('lyteMenuSelection')
        }
        clearTimeout(this._hidetimeout);
        delete this._hidetimeout;
        $L.fastdom.measure(function () {
            if (this.getMethods('onClose')) {
                this.executeMethod('onClose', this.$node, evt);
            }
            if (this._promResolve) {
                $L.fastdom.mutate(this._promResolve.bind(this))
            }
            this.clearFastdom();
        }.bind(this))
    },

    targetElem: function (nodeName) {
        var currNode;
        nodeName = nodeName.correspondingElement || nodeName;
        while (nodeName && nodeName.tagName != 'LYTE-MENU-BODY' && nodeName.tagName != 'BODY') {
            if (nodeName.tagName == 'LYTE-MENU-ITEM') {
                currNode = nodeName
            }
            nodeName = nodeName.parentNode;
        }
        return [currNode, nodeName ? nodeName.parent : null]
    },

    optionSelect: function (event) {
        var nodeName = this.targetElem.call(this, event.target)[0], flag
        if ((event.ctrlKey == true || event.metaKey == true || event.which == 2) && event.target.href != undefined && event.target.href.indexOf('javascript:') != -1 && event.target.target == '_blank') { return false; }
        if (this.getMethods('onMenuClick') && nodeName) {
            var value;
            if (this.getData('ltPropYield')) {
                value = nodeName.getAttribute('data-value')
            }
            else {
                var ltPropContent = this.getData('ltPropContent')
                if (nodeName.hasAttribute('grporder')) {
                    var grp = ltPropContent[parseInt(nodeName.getAttribute('grporder'))]
                    value = grp[Object.keys(grp)[0]][parseInt(nodeName.getAttribute('elemorder'))]
                }
                else {
                    value = ltPropContent[parseInt(nodeName.getAttribute('elemorder'))]
                }
            }
            flag = this.executeMethod('onMenuClick', value, event, this.$node, this.$node.element, { element: nodeName, submenu: !!nodeName.originMenu });
        }
        if (this.childMenu && !flag) {
            event.stopPropagation()
        }
        if (nodeName || (!nodeName && this.getData('ltPropPreventInsideClick'))) {
            lyteCloseMenu(event, undefined, true)
            // this.hideMenu( false, event, true )
        }
    },
    /*
        Calculate left of menu container when it has to come below/above the select element when it exceeds window.innerWidth and there is space to the right
    */
    setLeftExceedForDown: function (element, container, bcr, containerbcr, xscroll, ww) {
        var scrolledLeft = xscroll,
            elementBCR = bcr,
            elementLeft = this.rtlfunc.call(this, 'left', elementBCR, ww),
            elementWidth = elementBCR.width,
            containerBCR = containerbcr,
            containerWidth = containerBCR.width,
            total = scrolledLeft + elementLeft + elementWidth - containerWidth;

        return total
    },
    /*
        Calculate left of menu container when it has to come below/above the select element when it doesn't exceed window.innerWidth
    */
    setLeftNotExceedForDown: function (element, bcr, xscroll, ww) {
        var scrolledLeft = xscroll,
            elementBCR = bcr,
            elementLeft = this.rtlfunc.call(this, 'left', elementBCR, ww),
            total = scrolledLeft + elementLeft;

        return total
    },
    /*
        Calculate top of menu container when it has to come above the select element
    */
    setTopAboveForDown: function (element, container, bcr, containerbcr, yscroll) {
        var scrolledHeight = yscroll,
            elementBCR = bcr,
            elementTop = elementBCR.top,
            containerBCR = containerbcr,
            containerHeight = containerBCR.height,
            total = scrolledHeight + elementTop - containerHeight;

        return total
    },
    /*
        Calculate top of menu container when it has to come below the select element
    */
    setTopBelowForDown: function (element, bcr, yscroll) {
        var scrolledHeight = yscroll,
            elementBCR = bcr,
            elementTop = elementBCR.top,
            elementHeight = elementBCR.height,
            total = scrolledHeight + elementTop + elementHeight;

        return total
    },
    /*
        Calculate left of menu container when it has to come to right of the select element
    */
    setLeftForRight: function (element, bcr, xscroll, ww) {
        var scrolledWidth = xscroll,
            elementBCR = bcr,
            elementLeft = this.rtlfunc.call(this, 'left', elementBCR, ww),
            elementWidth = elementBCR.width,
            total = scrolledWidth + elementLeft + elementWidth;

        return total
    },
    /*
        Calculate right of menu container when it has to come to left of the select element of right menu
    */
    setRightForRight: function (element, container, bcr, elembcr, xscroll, ww) {
        var scrolledWidth = xscroll,
            elementBCR = bcr,
            containerBCR = elembcr,
            elementLeft = this.rtlfunc.call(this, 'left', elementBCR, ww),
            containerWidth = containerBCR.width,
            total = scrolledWidth + elementLeft - containerWidth;

        return total
    },
    /*
        Calculate top of menu container when it has to come to right of menu and there is space below
    */
    setTopForRight: function (element, bcr, yscroll) {
        var scrolledHeight = yscroll,
            elementBCR = bcr,
            elementTop = elementBCR.top,
            total = scrolledHeight + elementTop;

        return total
    },
    /*
        Calculate top of menu container when it has to come to right of menu and there is no space below
    */
    setTopForRightAbove: function (element, container, bcr, elembcr, yscroll) {
        var scrolledHeight = yscroll,
            elementBCR = bcr,
            elementTop = elementBCR.top,
            elementHeight = elementBCR.height,
            containerBCR = elembcr,
            containerHeight = containerBCR.height,
            total = scrolledHeight + elementTop + elementHeight - containerHeight;

        return total
    },
    /**
        Remove wrong arrow and append proper arrow
        @param string correct - the correct class
    */
    setCorrectClass: function (cls) {
        var arrow = this.childComp.querySelector('.lyteArrow'),
            list = arrow.classList, i = 0;
        for (; i < list.length; i++) {
            if (list[i] == 'lyteArrow' || list[i] == cls) {
                continue;
            }
            else {
                arrow.classList.remove(list[i]);
                i--;
            }
        }

        arrow.classList.add(cls);
    },

    /**
     * Set the CSS for your menu
     * refer commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 and previous for the previous stable setCSS function.
     * commit ID 583ee6ccbeaa6b3729178bf9df0139032b016d19 also gives a better understanding about the hard coded values in this function.
     */
    setCss: function (onlyScroll) {
        var link = this.childComp;

        if (!link
            || link.classList.contains('lyteMenuHidden') || !this.getData('ltPropSetCss')
        ) {
            return;
        }

        // Get properties
        var callout = this.getData('ltPropCallout');


        // Get button
        var body = link,
            par = this.$node.element;

        // Get Geometric propotions
        var wwidth, wheight, wleft, wtop, iwdt = window.innerWidth;
        var query = this.getData('ltPropScope'), flag;
        if (query) {
            var temp = { target: par };
            var elemm = this.closestFind.call(this, this.composePath.call(this, temp), query);
            if (elemm) {
                var rec = elemm.getBoundingClientRect();
                wleft = this.rtlfunc.call(this, 'left', rec, iwdt) < 0 ? 0 : this.rtlfunc.call(this, 'left', rec, iwdt);
                wwidth = iwdt > this.rtlfunc.call(this, 'right', rec, iwdt) ? this.rtlfunc.call(this, 'right', rec, iwdt) : iwdt;
                flag = true
            }
        }
        if (!flag) {
            wwidth = iwdt;
            wleft = 0;
        }
        var wheight = window.innerHeight;
        var wtop = 0,
            drop = body.getBoundingClientRect(),
            menuBodyBcr = this.menuBody.getBoundingClientRect(),
            menuBodystyle = window.getComputedStyle(this.menuBody),
            padding = (menuBodystyle.boxSizing == 'content-box' ? (parseFloat(menuBodystyle.paddingTop) + parseFloat(menuBodystyle.borderTopWidth) + parseFloat(menuBodystyle.borderBottomWidth) + parseFloat(menuBodystyle.paddingBottom)) : 0),
            bodyHeight = menuBodyBcr.height - padding,
            x = (window.pageXOffset || document.documentElement.scrollLeft) * (this._dir ? - 1 : 1),
            y = window.pageYOffset || document.documentElement.scrollTop,
            height = body.offsetHeight,
            width = body.offsetWidth,
            arrow = link.querySelector('.lyteArrow'),
            position = this.getData('ltPropPosition'),
            offsets = par.getBoundingClientRect(),
            arrowBcr = arrow ? arrow.getBoundingClientRect() : { width: 0, height: 0 },
            aHeight = arrowBcr.height / 2,
            aWidth = arrowBcr.width / 2,
            offset = this.data.ltPropOffset || {};

        if (offset.left) {
            wleft += offset.left;
        }
        if (offset.top) {
            wtop += offset.top;
        }
        if (offset.right) {
            wwidth -= offset.right;
        }
        if (offset.bottom) {
            wheight -= offset.bottom;
        }

        // Intialize flags
        var downPos,
            rightPos,
            topPos,
            leftPos;

        // temp stores
        var tempStore,
            tempTop,
            tempLeft,
            tempMarginLeft,
            tempMarginTop,
            tempNum,
            tempDenom,
            pos,
            tempPer,
            oL = this.rtlfunc.call(this, 'left', offsets, iwdt),
            lT = this.rtlfunc.call(this, 'left');

        if (arrow) {
            arrow.style.removeProperty('left');
            arrow.style.removeProperty('top');
            arrow.style.removeProperty('bottom');
            arrow.style.removeProperty('right')
        }
        if (position === 'down') {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if (tempTop + height > wheight
                /*&& offsets.top > height */
            ) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            rightPos = true;
            tempLeft = oL;
            if (tempLeft + width > wwidth
                && tempLeft > tempLeft + offsets.width - body.offsetWidth
            ) {
                rightPos = false;

            }
            else if (oL + width <= wwidth) {
                rightPos = true;
            }

            if (offsets.width > width && arrow) {
                arrow.style[lT] = ((width / 2 - 0) / width) * 100 + "%";
            }

            if (downPos) {
                pos = 'down'
                if (callout) {
                    this.setCorrectClass('lyteArrowTop');
                    tempStore = this.setTopBelowForDown(par, offsets, y) + aHeight + 'px';
                }
                else {
                    body.style.top = this.setTopBelowForDown(par, offsets, y) + 'px';
                }

            }
            else {
                pos = 'up';
                if (callout) {
                    this.setCorrectClass('lyteArrowBottom');
                    tempStore = this.setTopAboveForDown(par, body, offsets, drop, y) - aHeight + 'px';
                }
                else {
                    body.style.top = this.setTopAboveForDown(par, body, offsets, drop, y) + 'px';
                }
            }

            if (rightPos) {
                if (callout) {
                    tempNum = Math.max(Math.min(offsets.width, width) / 2 - aWidth, aWidth / 2); // We removed arrow.offsetWidth because it was giving width as 0 px
                    tempDenom = width / 100;
                    tempPer = tempNum / tempDenom;
                    arrow.style[lT] = tempPer + '%';
                }

                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[lT] = this.setLeftNotExceedForDown(par, offsets, x, iwdt) + 'px';
            }
            else {
                if (callout) {
                    tempDenom = width / 100;
                    tempNum = width - (Math.min(offsets.width, width) / 2) - aWidth; // We removed arrow.offsetWidth because it was giving width as 0 px
                    tempPer = tempNum / tempDenom;
                    arrow.style[lT] = tempPer + '%';
                }

                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[lT] = this.setLeftExceedForDown(par, body, offsets, drop, x, iwdt) + 'px'
            }


        }
        else if (position === 'right') {
            rightPos = true;
            if (oL + offsets.width + width > wwidth
                && oL - drop.width > wleft
            ) {
                rightPos = false;

            }
            else {
                rightPos = true;
            }

            downPos = true;
            if (offsets.top + drop.height > wheight) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }

            if (rightPos) {
                pos = 'right';
                if (callout) {
                    this.setCorrectClass('lyteArrowLeft');
                    tempStore = this.setLeftForRight(par, offsets, x, iwdt) + aWidth + 'px';
                }
                else {
                    body.style[lT] = this.setLeftForRight(par, offsets, x, iwdt) + 'px'
                }
            }
            else {
                pos = 'left';
                if (callout) {
                    this.setCorrectClass('lyteArrowRight');
                    tempStore = (this.setRightForRight(par, body, offsets, drop, x, iwdt) - aWidth) + 'px';
                }
                else {
                    body.style[lT] = this.setRightForRight(par, body, offsets, drop, x, iwdt) + 'px';
                }
            }

            if (downPos) {
                if (callout) {
                    arrow.style.top = Math.max(offsets.height / 2 - aHeight, aHeight / 2) + 'px';
                }

                body.style[lT] = tempStore ? tempStore : body.style[lT];
                body.style.top = this.setTopForRight(par, offsets, y, iwdt) + 'px'
            }
            else {
                if (callout) {
                    arrow.style.bottom = Math.max(offsets.height / 2 - aHeight, aHeight / 2) + 'px';
                }

                body.style[lT] = tempStore ? tempStore : body.style[lT];
                body.style.top = this.setTopForRightAbove(par, body, offsets, drop, y, iwdt) + 'px'
            }
        }
        else if (position === 'up') {
            topPos = true
            if (offsets.top - drop.height < wtop
                /*&& offsets.top + offsets.height + height < wheight */
            ) {
                topPos = (wheight - offsets.top) < (offsets.bottom - wtop)
            }

            rightPos = true
            if (oL + width > wwidth
                && oL > oL + offsets.width - body.offsetWidth
            ) {
                rightPos = false
            }
            else if (oL + width <= wwidth) {
                rightPos = true
            }

            if (offsets.width > width && arrow) {
                arrow.style[lT] = ((width / 2 - 0) / width) * 100 + '%';
            }

            if (topPos) {
                pos = 'up';
                if (callout) {
                    this.setCorrectClass('lyteArrowBottom');
                    tempStore = this.setTopAboveForDown(par, body, offsets, drop, y) - aHeight + 'px';
                }
                else {
                    body.style.top = this.setTopAboveForDown(par, body, offsets, drop, y) + 'px';
                }
            }
            else {
                pos = 'down';
                if (callout) {
                    this.setCorrectClass('lyteArrowTop');
                    tempStore = this.setTopBelowForDown(par, offsets, y) + aHeight + 'px';
                }
                else {
                    body.style.top = this.setTopBelowForDown(par, offsets, y, iwdt) + 'px'
                }
            }
            if (rightPos) {
                if (callout) {
                    tempNum = Math.max(Math.min(offsets.width, width) / 2 - aWidth, aWidth / 2); // We removed arrow.offsetWidth because it was giving width as 0 px
                    tempDenom = width / 100;
                    tempPer = tempNum / tempDenom;
                    arrow.style[lT] = tempPer + '%'
                }

                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[lT] = this.setLeftNotExceedForDown(par, offsets, x, iwdt) + 'px';
            }
            else {
                if (callout) {
                    tempDenom = width / 100;
                    tempNum = width - (Math.min(offsets.width, width) / 2) - aWidth; // We removed arrow.offsetWidth because it was giving width as 0 px
                    tempPer = tempNum / tempDenom;
                    arrow.style[lT] = tempPer + '%';
                }

                body.style.top = tempStore ? tempStore : body.style.top;
                body.style[lT] = this.setLeftExceedForDown(par, body, offsets, drop, x, iwdt) + 'px';
            }
        }
        else if (position === 'left') {
            leftPos = true;
            if (oL - drop.width < wleft
                && oL + drop.width < wwidth
            ) {
                leftPos = false;
            }
            else {
                leftPos = true;
            }

            downPos = true;
            if (offsets.top + drop.height > wheight) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }

            if (leftPos) {
                pos = 'left';
                if (callout) {
                    this.setCorrectClass('lyteArrowRight');
                    tempStore = (this.setRightForRight(par, body, offsets, drop, x, iwdt) - aWidth) + 'px';
                }
                else {
                    body.style[lT] = this.setRightForRight(par, body, offsets, drop, x, iwdt) + 'px';
                }
            }
            else {
                pos = 'right';
                if (callout) {
                    this.setCorrectClass('lyteArrowLeft');
                    tempStore = (this.setLeftForRight(par, offsets, x, iwdt) + aWidth) + 'px';
                }
                else {
                    body.style[lT] = this.setLeftForRight(par, offsets, x) + 'px';
                }
            }
            if (downPos) {
                if (callout) {
                    arrow.style.top = Math.max(offsets.height / 2 - aHeight, aHeight / 2) + 'px';
                }

                body.style[lT] = tempStore ? tempStore : body.style[lT];
                body.style.top = this.setTopForRight(par, offsets, y) + 'px';
            }
            else {
                if (callout) {
                    arrow.style.bottom = Math.max(offsets.height / 2 - aHeight, aHeight / 2) + 'px';
                }

                body.style[lT] = tempStore ? tempStore : body.style[lT];
                body.style.top = this.setTopForRightAbove(par, body, offsets, drop, y) + 'px';
            }
        } else if (position === 'downLeft') {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if (tempTop + height > wheight /*&& offsets.top > height*/) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            if (!downPos) {
                tempTop = offsets.top - height;
            }
            rightPos = false

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.max(oL + offsets.width / 2 - width, oL - width + 2 * aHeight);
            if (tempLeft < wleft) {
                tempLeft = wleft
                rightPos = true
            } else {
                rightPos = false
            }
            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = (oL + 0.25 * offsets.width - tempLeft) + 'px';
                } else {
                    newArrowLeft = Math.min(width - 0.25 * offsets.width, width - (aHeight * 1.5) - 3) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downLeft';
            } else {
                pos = 'upLeft';
            }

        } else if (position === 'downRight') {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if (tempTop + height > wheight /*&& offsets.top > height*/) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }

            if (!downPos) {
                tempTop = offsets.top - height
            }

            rightPos = true

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.min(oL + offsets.width / 2, oL + offsets.width - 2 * aHeight);
            if (tempLeft + width > wwidth) {
                tempLeft = wwidth - width;
                rightPos = false;
            } else {
                rightPos = true;
            }

            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = Math.max(0.25 * offsets.width, aWidth / 2) + 'px';
                } else {
                    newArrowLeft = (oL + 0.25 * offsets.width - tempLeft) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downRight';
            } else {
                pos = 'upRight';
            }
        } else if (position === 'upLeft') {
            downPos = false;
            tempTop = offsets.top - height;
            if (tempTop < wtop) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            if (downPos) {
                tempTop = offsets.top + offsets.height;
            }
            rightPos = false
            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.max(oL + offsets.width / 2 - width, oL - width + 2 * aHeight);
            if (tempLeft < wleft) {
                tempLeft = wleft
                rightPos = true
            } else {
                rightPos = false
            }
            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = (oL + 0.25 * offsets.width - tempLeft) + 'px';
                } else {
                    newArrowLeft = Math.min(width - 0.25 * offsets.width, width - (aHeight * 1.5) - 3) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downLeft';
            } else {
                pos = 'upLeft';
            }

        } else if (position === 'upRight') {
            downPos = false;
            tempTop = offsets.top - height;
            if (tempTop < wtop) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            if (downPos) {
                tempTop = offsets.top + offsets.height
            }

            rightPos = true

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.min(oL + offsets.width / 2, oL + offsets.width - 2 * aHeight);
            if (tempLeft + width > wwidth) {
                tempLeft = wwidth - width;
                rightPos = false;
            } else {
                rightPos = true;
            }

            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = Math.max(0.25 * offsets.width, aWidth / 2) + 'px';
                } else {
                    newArrowLeft = (oL + 0.25 * offsets.width - tempLeft) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downRight';
            } else {
                pos = 'upRight';
            }
        } else if (position === 'downAlignLeft') {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if (tempTop + height > wheight /*&& offsets.top > height*/) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }

            if (!downPos) {
                tempTop = offsets.top - height
            }

            rightPos = false

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.max(oL + offsets.width - width, oL - width + 2 * aHeight);
            if (tempLeft < wleft) {
                tempLeft = Math.max(Math.min(oL, oL + offsets.width - 2 * aHeight), wleft)
                rightPos = true
            } else {
                tempLeft = Math.min(wwidth - width, tempLeft)
                rightPos = false
            }
            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = (offsets.right - tempLeft) / 2 + 'px';
                } else {
                    newArrowLeft = Math.min((oL - tempLeft + Math.max(width, offsets.width)) / 2, Math.max(width, offsets.width) - (aHeight * 1.5) - 3) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downAlignLeft';
            } else {
                pos = 'upAlignLeft';
            }

        } else if (position === 'downAlignRight') {
            downPos = true;
            tempTop = offsets.top + offsets.height;
            if (tempTop + height > wheight /*&& offsets.top > height*/) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }

            if (!downPos) {
                tempTop = offsets.top - height;
            }

            rightPos = true

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.min(oL, oL + offsets.width - 2 * aHeight);
            if (tempLeft + width > wwidth) {
                tempLeft = Math.min(Math.max(oL + offsets.width - width, oL - width + 2 * aHeight), wwidth - width);
                rightPos = false;
            } else {
                tempLeft = Math.max(tempLeft, 0)
                rightPos = true;
            }

            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = Math.max(0.5 * (Math.min(this.rtlfunc.call(this, 'right', offsets, iwdt) - tempLeft, width) - aWidth), aWidth / 2) + 'px';
                } else {
                    newArrowLeft = (0.5 * (-tempLeft + width + oL)) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downAlignRight';
            } else {
                pos = 'upAlignRight';
            }
        } else if (position === 'upAlignLeft') {
            downPos = false;
            tempTop = offsets.top - height;
            if (tempTop < wtop) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            if (downPos) {
                tempTop = offsets.top + offsets.height;
            }
            rightPos = false
            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.max(oL + offsets.width - width, oL - width + 2 * aHeight);
            if (tempLeft < wleft) {
                tempLeft = Math.max(Math.min(oL, oL + offsets.width - 2 * aHeight), wleft)
                rightPos = true
            } else {
                tempLeft = Math.min(wwidth - width, tempLeft)
                rightPos = false
            }
            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = (offsets.right - tempLeft) / 2 + 'px';
                } else {
                    newArrowLeft = Math.min((oL - tempLeft + Math.max(width, offsets.width)) / 2, Math.max(width, offsets.width) - (aHeight * 1.5) - 3) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downAlignLeft';
            } else {
                pos = 'upAlignLeft';
            }
        } else if (position === 'upAlignRight') {
            downPos = false;
            tempTop = offsets.top - height;
            if (tempTop < wtop) {
                downPos = (wheight - offsets.top) > (offsets.bottom - wtop);
            }
            if (downPos) {
                tempTop = offsets.top + offsets.height;
            }
            rightPos = true

            if (callout) {
                this.setCorrectClass(downPos ? 'lyteArrowTop' : 'lyteArrowBottom');
            }
            tempLeft = Math.min(oL, oL + offsets.width - 2 * aHeight);
            if (tempLeft + width > wwidth) {
                tempLeft = Math.min(Math.max(oL + offsets.width - width, oL - width + 2 * aHeight), wwidth - width);
                rightPos = false;
            } else {
                tempLeft = Math.max(tempLeft, wleft)
                rightPos = true;
            }

            body.style.top = tempTop + aHeight * (downPos ? 1 : -1) + y + 'px';

            body.style[lT] = tempLeft + x + 'px';
            if (callout) {
                var newArrowLeft;
                if (rightPos) {
                    newArrowLeft = Math.max(0.5 * (Math.min(this.rtlfunc.call(this, 'right', offsets, iwdt) - tempLeft, width) - aWidth), aWidth / 2) + 'px';
                } else {
                    newArrowLeft = (0.5 * (-tempLeft + width + oL)) + 'px';
                }
                arrow.style[lT] = newArrowLeft;
            }
            if (downPos) {
                pos = 'downAlignRight';
            } else {
                pos = 'upAlignRight';
            }
        }
        if (parseFloat(body.style.top) - y + bodyHeight > wheight && offsets.top <= wheight) {
            this.menuBody.style.height = (wheight - parseFloat(body.style.top) + y - padding) + 'px';
            bodyHeight = parseFloat(this.menuBody.style.height);
            this._dont_modify = true;
        }
        if (parseFloat(body.style.top) - y < wtop && offsets.bottom >= wtop) {
            this.menuBody.style.height = (parseFloat(body.style.top) - y + bodyHeight - wtop) + 'px';
            body.style.top = (wtop + y) + 'px';
            bodyHeight = parseFloat(this.menuBody.style.height);
            this._dont_modify = true;
        }

        this._hgt = bodyHeight;

        if (body.classList.contains('lyteHoverMenu')) {
            $L(body).removeClass("topPlace", "bottomPlace", "rightPlace", "leftPlace");
            if (/up/.test(pos)) {
                body.classList.add('topPlace');
            } else if (/down/.test(pos)) {
                body.classList.add('bottomPlace');
            } else if (/right/.test(pos)) {
                body.classList.add('rightPlace');
            } else if (/left/.test(pos)) {
                body.classList.add('leftPlace');
            }
        }
        if (downPos) {
            $L(this.childComp).removeClass('lyteMenuUp').addClass('lyteMenuDown');
        } else {
            $L(this.childComp).removeClass('lyteMenuDown').addClass('lyteMenuUp');
        }
        this.setData('pos', pos);
    },

    returntran: function (prop) {
        var ret = 0;
        if (/\d+/.test(prop || '')) {
            var match = prop.match(/(\d+)(s|ms){0,}$/);
            ret = parseFloat(prop) * (match[2] == "s" ? 1000 : 1);
        }
        return ret;
    },

    checkForBoundary: function (clientRect, ww) {
        // var clientRect = this.$node.element.getBoundingClientRect(), ww = window.innerWidth;
        var boundary = this.getData('ltPropBoundary');
        if ((boundary.hasOwnProperty('left') ? (this.rtlfunc.call(this, 'left', clientRect, ww) < this.rtlfunc.call(this, 'left', boundary, ww)) : false) || (boundary.hasOwnProperty('right') ? (this.rtlfunc.call(this, 'right', clientRect, ww) > this.rtlfunc.call(this, 'right', boundary, ww)) : false) || (boundary.hasOwnProperty('top') ? (clientRect.top < boundary.top) : false) || (boundary.hasOwnProperty('bottom') ? (clientRect.bottom > boundary.bottom) : false)) {
            this.hideMenu.call(this);
        }
    },

    traverseList: function (event) {
        var kc = event.keyCode || event.which;
        if ((this.childComp && this.childComp.classList.contains('lyteMenuHidden')) || (kc != 13 && kc != 40 && kc != 38 && kc != 36 && kc != 35)) {
            return
        }
        var cursel = this.childComp.querySelector('.lyteMenuSelection')
        if (!cursel || !cursel.offsetParent) {
            if (kc != 35) {
                var elem = this.childComp.querySelector('lyte-menu-item:not(.lyteSearchHidden)')
                if (elem && elem.offsetParent) {
                    elem.classList.add('lyteMenuSelection')
                    return;
                }
            } else {
                $L('lyte-menu-item:not(.lyteSearchHidden)', this.childComp).eq(-1).addClass('lyteMenuSelection');
            }
        }

        var elements = this.childComp.querySelectorAll('lyte-menu-item:not(.lyteSearchHidden)')
        for (var i = 0; i < elements.length; i++) {
            if (!elements[i].offsetParent) {
                continue;
            }
            if (elements[i].classList.contains('lyteMenuSelection')) {
                break;
            }
        }

        if (!elements[i]) {
            return;
        }

        if (kc == 13) {
            elements[i].dispatchEvent(new Event('click', { bubbles: true }))
            event.preventDefault()
        }
        else if (kc == 38 && i != 0) {
            var j = i
            i = i - 1
            for (; i > -1; i--) {
                if (!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered') && elements[i].offsetParent) {
                    break;
                }
            }
            if (i != -1) {
                elements[j].classList.remove('lyteMenuSelection')
                elements[i].classList.add('lyteMenuSelection')
                this.scrIntoView.call(this, elements[i])
            }
        }
        else if (kc == 40 && i != elements.length - 1) {
            var j = i
            i = i + 1
            for (; i < elements.length; i++) {
                if (!elements[i].classList.contains('lyteMenuActive') && !elements[i].classList.contains('lyteMenuFiltered') && elements[i].offsetParent) {
                    break;
                }
            }
            if (i != elements.length) {
                elements[j].classList.remove('lyteMenuSelection')
                elements[i].classList.add('lyteMenuSelection')
                this.scrIntoView.call(this, elements[i])
            }
        } else if (kc == 36 && elements.length && this.data.ltPropAria) {
            if (cursel == elements[0]) {
                return;
            }
            cursel.classList.remove('lyteMenuSelection');
            elements[0].classList.add('lyteMenuSelection');
            this.scrIntoView.call(this, elements[0])
        } else if (kc == 35 && elements.length && this.data.ltPropAria) {
            if (cursel == $L(elements).get(-1)) {
                return;
            }
            cursel.classList.remove('lyteMenuSelection');
            $L(elements).get(-1).classList.add('lyteMenuSelection');
            this.scrIntoView.call(this, $L(elements).get(-1));
        }
    },
    setFreeze: function (nodeName) {
        var fz = document.body.querySelectorAll('.lytemenufreezelayer:not(.nogroup)')
        // freeze bound calculation
        $L.fastdom.measure(function () {
            var node = document.body.querySelector('.lytemenufreezelayer.left'), rect = nodeName.getBoundingClientRect(),
                iwdt = window.innerWidth
            $L.fastdom.mutate(function () {
                node.style.height = rect.height + "px"
                node.style.width = Math.max(rect.left, 0) + "px"
                node.style.top = rect.top + "px"
                node = document.body.querySelector('.lytemenufreezelayer.right')
                node.style.height = rect.height + "px"
                node.style.width = Math.max(iwdt - rect.right, 0) + "px"
                node.style.top = rect.top + "px"
                node = document.body.querySelector('.lytemenufreezelayer.top')
                node.style.height = rect.top + "px"
                node = document.body.querySelector('.lytemenufreezelayer.bottom')
                node.style.height = (window.innerHeight - rect.bottom) + "px"
                for (var i = 0; i < fz.length; i++) {
                    fz[i].classList.remove('lyteMenuHidden')
                    fz[i].addEventListener('wheel', this.preventEvent);
                    fz[i].addEventListener('touchmove', this.preventEvent);
                }
            }.bind(this))
        }.bind(this))
    },
    preventEvent: function (event) {
        if (!(event.metaKey || event.shiftKey || event.ctrlKey)) {
            var isTch = event.type == "touchmove";
            if (isTch && event.touches.length != 1) {
                return;
            }
            if (event.type == 'wheel' || isTch) {
                event.stopImmediatePropagation()
            }
            event.preventDefault();
            event.stopPropagation();
        }
    },
    addScrollPos: function (event) {
        if (!document.menu) {
            return
        }
        if (event.target != window && (document.menu.childComp.contains(event.target))) {
            return
        }
        var component = document.menu;
        component.callScrollFunc(event, true);

    },
    removeFreeze: function () {
        if (!document.menu || (this.data.ltPropAnimate && this.data.ltPropFreeze)) {
            var fz = document.body.querySelectorAll('.lytemenufreezelayer')
            for (var i = 0; i < fz.length; i++) {
                fz[i].classList.add('lyteMenuHidden');
                fz[i].removeEventListener('wheel', this.preventEvent);
            }
            document.body.classList.remove('lyteBodyWrapper');
        }
    },
    setZIndex: function (flag) {
        var nodeName = this.$node.element;
        if (nodeName) {
            while (nodeName && nodeName.tagName != 'HTML') {
                if (nodeName.classList.contains('lyteMenuGroup')) {
                    if (!flag) {
                        this.setFreeze.call(this, nodeName)
                        document.body.classList.add('lyteBodyWrapper');
                    }
                    else {
                        this.removeFreeze.call(this)
                    }
                    break
                }
                else {
                    nodeName = nodeName.parentNode;
                }
            }
            if (nodeName && nodeName.tagName == 'HTML' || !nodeName) {
                if (flag && (!document.menu || (document.menu && !document.menu.data.ltPropFreeze))) {
                    this.removeFreeze.call(this)
                }
                else {
                    var freezeLayer = document.body.querySelector('.lytemenufreezelayer.nogroup');
                    freezeLayer.classList.remove('lyteMenuHidden');
                    document.body.classList.add('lyteBodyWrapper');
                }
            }
        }

    },

    ariaObs: function (arg) {
        this.data.ltPropAria && _lyteUiUtils.setAttribute(this.childComp, this.data.ltPropAriaAttributes || {}, arg ? arg.oldValue : {})
    }.observes('ltPropAriaAttributes', 'ltPropAriaAttributes.{}').on('didConnect'),

    callScrollFunc: function (evt, callBoundary) {
        var comp = this,
            menubody = comp.menuBody,
            height = menubody.style.height.indexOf('px') != -1,
            boundaryKeys = Object.keys(this.data.ltPropBoundary || {}).length,
            bcr = callBoundary && boundaryKeys && comp.$node.element ? comp.$node.element.getBoundingClientRect() : undefined,
            ww = callBoundary && boundaryKeys && comp.$node.element ? window.innerWidth : undefined,
            given = comp.$node.ltProp('height'),
            allowreset = this.data.ltPropHeightResetOnScroll,
            isContext = comp.$node.ltProp('event') == 'contextmenu';
        if (height && allowreset) {
            menubody.style.height = given || '';
            callBoundary && boundaryKeys && $L.fastdom.measure(comp.checkForBoundary.bind(comp, bcr, ww));
            $L.fastdom.measure(comp[isContext ? 'setContextCss' : 'setCss'].bind(comp, evt));
        } else {
            comp[isContext ? 'setContextCss' : 'setCss'](evt);
            callBoundary && boundaryKeys && comp.checkForBoundary(bcr, ww);
        }
        if (comp.childMenu) {
            comp.childMenu.callScrollFunc();
        }
    }
});

var lyteCloseMenu = function (event, element, flag) {
    if (document._lyteMenu.preventClick != false || element) {
        if ((event && event.button != 2) || element || flag) {
            var menus = document.body.querySelectorAll('lyte-menu:not(.lyteMenuClosed)[lyte-rendered]');
            for (var i = 0; i < menus.length; i++) {
                if (menus[i] != element && !menus[i].component.childComp.classList.contains('lyteMenuHidden')) {
                    if (flag || (!menus[i].component.childComp.contains(event.target))) {
                        if (!menus[i].component._hideStarts) {
                                                /*var ret =*/ menus[i].component.hideMenu.call(menus[i].component, element ? false : true, event, flag)
                            // if( ret ){
                            //     menus[i].component._hideStarts = true
                            // }
                        }
                    }
                }
            }
        }
    }
    if (event && event.type == 'click') {
        document._lyteMenu.preventClick = true;
    }
};

if (!_lyteUiUtils.registeredCustomElements['lyte-menu-item']) {

    _lyteUiUtils.registeredCustomElements['lyte-menu-item'] = true;

    function menukeypress(evt) {
        var menus = document.querySelectorAll('lyte-menu:not(.lyteMenuClosed)[lyte-rendered]');
        for (var i = 0; i < menus.length; i++) {
            var _this = menus[i].component;
            if (!_this.childMenu) {
                _this._typed = _this._typed || '';
                _this._typed += String.fromCharCode(evt.which || evt.keyCode);
                clearTimeout(_this._typetime);
                _this._typetime = setTimeout(_this.searchFilter.bind(_this, _this._typed.trim().toLowerCase()), 400)
                break;
            }
        }
    }

    /**
     * @customElement lyte-menu-item,
     *                lyte-menu-body,
     *                lyte-menu-description,
     *                lyte-menu-label,
     *                lyte-menu-group,
     *                lyte-menu-header
     */
    Lyte.createCustomElement("lyte-menu-item", {
        static: {
            "observedAttributes": {
                get: function () {
                    return ['lyte-shortcut'];
                }
            }
        },
        "attributeChangedCallback": function (attributeName, oldValue, newValue) {
            if (typeof shortcut == "function") {
                if (!newValue) {
                    return;
                }
                newValue = JSON.parse(newValue);
                var newKey = newValue.key;
                var type = newValue.type;
                var wait = newValue.wait;
                if (!oldValue) {
                    oldValue = {};
                }
                else {
                    oldValue = JSON.parse(oldValue)
                }
                shortcut.push({
                    newKey: newKey,
                    type: type,
                    wait: wait,
                    oldKey: oldValue.key,
                    value: this
                });
            }
        },

        connectedCallback: function () {
            var closestBody = $L(this).closest('lyte-menu-box').get(0);
            if (closestBody && closestBody.parent) {
                var aria = closestBody.parent.ltProp('aria');
                if (aria) {
                    $L(this).attr('role', 'menuitem')
                }
            }
        },

        disconnectedCallback: function () {
            var curValue = this.getAttribute('lyte-shortcut');
            if (curValue) {
                this.setAttribute('lyte-shortcut', JSON.stringify({}));
            }
        }
    });
}

/**
 * @syntax nonYielded
 * <lyte-menu  lt-prop-content='[{"label" : "Open File", "description" : "Ctrl + O"},{"label" : "New File", "description" : "Ctrl + N"},{"label" : "Save File", "description" : "Ctrl + S"}]' lt-prop-user-value = 'label' lt-prop-description = 'description' lt-prop-event="click" ></lyte-menu>
 */

/**
 * @syntax yielded
 * <lyte-menu lt-prop-yield="true"  lt-prop-event='click' >
 *   <template is="registerYield" yield-name="yield">
 *      <lyte-menu-body>
 *          <lyte-menu-item data-value = "1">
 *               <lyte-menu-label >
 *                   New File
 *               </lyte-menu-label>
 *          <lyte-menu-item>
 *          <lyte-menu-item data-value = "2">
 *              <lyte-menu-label >
 *                  Open File
 *              </lyte-menu-label>
 *           </lyte-menu-item>
 *           <lyte-menu-item data-value = "3">
 *              <lyte-menu-label >
 *                  Save File
 *              </lyte-menu-label>
 *           </lyte-menu-item>
 *     </lyte-menu-body>
 *   </template>
 * </lyte-menu>
 */