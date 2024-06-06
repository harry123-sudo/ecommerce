;(function(){

    if(lyteDomObj){

    lyteDomObj.prototype.selector = function(selections){

      if(!selections){
        selections = {}
      }

      var imageTagOriginal = this[0];
      var selectionArray = [];
      selectionArray = $L(imageTagOriginal).data('classes');
      var currentClass = ''
      var parentDiv = imageTagOriginal.parentElement;
      var wrapperDiv = document.createElement('DIV');
      var imageTag = document.createElement('IMG');
      imageTag.src = imageTagOriginal.src;
      imageTag.setAttribute('class' , 'lyteSelectorBackImage' )
      var selectionData = {};

      var imageMinWidth,imageMinHeight;

      if(selections.minWidth){
        imageMinWidth = selections.minWidth
      } else {
        imageMinWidth = 20
      }
      if(selections.minHeight){
        imageMinHeight = selections.minHeight
      } else {
        imageMinHeight = 20
      }

      var imageTop,imageLeft,imageRight,imageBottom,imageHeight,imageWidth;

      var currentX , currentY;
      var prevLeft, prevTop, prevRight, prevBottom; // VARIABLES USED IN moveSelection FUNCTION
      var rpLeft, rpTop, rpRight, rpBottom, rpWidth, rpHeight; // VARIABLES USED IN resizeSelectionBox FUNCTION RESIZE PREVIOUS VALUES
      var currentHandle; // CURRENT HANDLE HOLDED FOR RESIZING THE SELECTION BOX

      var currentDeleteBtn; // CURRENT DELETE BTN
      var deleteAllButton={};
      // var selectionStart = selectionEnd = deleteSingle = deleteMul = function(){};


      var onCreate = function(){}
      ,onDragStart = function(){}
      ,onDragEnd = function(){}
      ,onResizeStart = function(){}
      ,onResizeEnd = function(){}
      ,onDeleteOne = function(){}
      ,onDeleteAll = function(){}

      // if(!preventEvent){
        parentDiv.addEventListener('mousedown' , mainFun)
      // } else {
      //   preventEvent = true;
      // }


      if(selections){

        if(selections.onCreate){
          onCreate = selections.onCreate
        }
        if(selections.onDragStart){
          onDragStart = selections.onDragStart
        }
        if(selections.onDragEnd){
          onDragEnd = selections.onDragEnd
        }
        if(selections.onResizeStart){
          onResizeStart = selections.onResizeStart
        }
        if(selections.onResizeEnd){
          onResizeEnd = selections.onResizeEnd
        }
        if(selections.onDeleteOne){
          onDeleteOne = selections.onDeleteOne
        }
        if(selections.onDeleteAll){
          onDeleteAll = selections.onDeleteAll
        }

        if(selections.selections){

          selections = selections.selections;

          imageTag.onload = function(){

            if(!$L('.lyteSelectorBackImage')[0]){
              wrapperDiv.appendChild(imageTag);
              imageTag.style.height = imageTagOriginal.getBoundingClientRect().height + "px";
              imageTag.style.width = imageTagOriginal.getBoundingClientRect().width + "px";

              imageTagOriginal.style.display = "none"
            }

            if(!$L('.lyteSelectionWrapperBox')[0]){

              wrapperDiv.setAttribute('class' , 'lyteSelectionWrapperBox');
              parentDiv.appendChild(wrapperDiv);
              wrapperDiv.style.height = imageTag.getBoundingClientRect().height+"px";
              wrapperDiv.style.width = "auto";

              if(!($L('.lyteSelectionFreezeLayer')[0])){
                var freezeLayer = document.createElement('DIV');
                freezeLayer.setAttribute('class' , 'lyteSelectionFreezeLayer');
                wrapperDiv.appendChild(freezeLayer);
                freezeLayer.style.top = "0px";
                freezeLayer.style.left = "0px";
                freezeLayer.style.height = imageTag.getBoundingClientRect().height + "px";
                freezeLayer.style.width = imageTag.getBoundingClientRect().width + "px";
              }



              for(var i=0;i<selections.length;i++){

                var dummyDiv = document.createElement('DIV');
                dummyDiv.classList.add('lyteSelectionBox')
                dummyDiv.classList.add('lyteSelector'+(i+1));
                currentClass = 'lyteSelector'+(i+1);

                if(!selectionArray){
                  selectionArray = []
                }

                selectionArray.push(currentClass)
                $L(imageTagOriginal).data('classes' , selectionArray)

                var tlCorner = document.createElement('DIV');
                var trCorner = document.createElement('DIV');
                var brCorner = document.createElement('DIV');
                var blCorner = document.createElement('DIV');

                var tEdge = document.createElement('DIV');
                var bEdge = document.createElement('DIV');
                var rEdge = document.createElement('DIV');
                var lEdge = document.createElement('DIV');

                var deleteBtn = document.createElement('DIV');
                var workArea = document.createElement('DIV');

                var selectorLabelTop = document.createElement('DIV');
                var selectorLabelBottom = document.createElement('DIV');



                tlCorner.setAttribute('class' , 'lyteSelectorHandles lyteTLCorner')
                trCorner.setAttribute('class' , 'lyteSelectorHandles lyteTRCorner')
                brCorner.setAttribute('class' , 'lyteSelectorHandles lyteBRCorner')
                blCorner.setAttribute('class' , 'lyteSelectorHandles lyteBLCorner')
                tEdge.setAttribute('class' , 'lyteSelectorHandles lyteTEdge')
                bEdge.setAttribute('class' , 'lyteSelectorHandles lyteBEdge')
                rEdge.setAttribute('class' , 'lyteSelectorHandles lyteREdge')
                lEdge.setAttribute('class' , 'lyteSelectorHandles lyteLEdge')

                deleteBtn.setAttribute('class' , 'lyteSelectorDeleteBtn')
                workArea.setAttribute('class' , 'lyteSelectorWorkArea')

                selectorLabelTop.setAttribute('class' , 'lyteSelectorLabel')
                selectorLabelBottom.setAttribute('class' , 'lyteSelectorLabel')

                onCreate(workArea)


                dummyDiv.appendChild(tlCorner)
                dummyDiv.appendChild(trCorner)
                dummyDiv.appendChild(brCorner)
                dummyDiv.appendChild(blCorner)
                dummyDiv.appendChild(tEdge)
                dummyDiv.appendChild(bEdge)
                dummyDiv.appendChild(rEdge)
                dummyDiv.appendChild(lEdge)
                dummyDiv.appendChild(deleteBtn)
                dummyDiv.appendChild(workArea)

                dummyDiv.appendChild(selectorLabelTop)
                dummyDiv.appendChild(selectorLabelBottom)

                if(selections[i].borderColor){
                  dummyDiv.style.borderColor = selections[i].borderColor;
                }

                if(selections[i].dataLabel){
                  selectorLabelTop.classList.add('lyteSelectorLabelTop')
                  selectorLabelBottom.classList.add('lyteSelectorLabelBottom')
                  selectorLabelTop.classList.add(selections[i].dataLabel[0].className)
                  selectorLabelBottom.classList.add(selections[i].dataLabel[1].className)
                  selectorLabelTop.innerText = selections[i].dataLabel[0].label;
                  selectorLabelBottom.innerText = selections[i].dataLabel[1].label;
                }

                wrapperDiv.appendChild(dummyDiv)

                var ar = imageTag.naturalWidth / imageTag.getBoundingClientRect().width;

                $L('.'+currentClass)[0].style.width = selections[i].width / ar + "px";
                $L('.'+currentClass)[0].style.height = selections[i].height / ar + "px";
                $L('.'+currentClass)[0].style.top = selections[i].top / ar + "px";
                $L('.'+currentClass)[0].style.left = selections[i].left / ar + "px";

                $L('.'+currentClass)[0].style.backgroundImage = "url('"+ imageTag.src +"')"
                $L('.'+currentClass)[0].style.backgroundPosition = (-($L('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
                $L('.'+currentClass)[0].style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
                $L('.'+currentClass)[0].style.backgroundRepeat = "no-repeat";

              }

            }
          }

        }
      }

      function mainFun(){

        imageTop = imageTag.getBoundingClientRect().top;
        imageLeft = imageTag.getBoundingClientRect().left;
        imageRight = imageTag.getBoundingClientRect().left + imageTag.getBoundingClientRect().width;
        imageBottom = imageTag.getBoundingClientRect().top + imageTag.getBoundingClientRect().height;
        imageHeight = imageTag.getBoundingClientRect().height;
        imageWidth = imageTag.getBoundingClientRect().width;

        event.preventDefault();

        if((event.target.nodeName === 'IMG')||(event.target.className === 'lyteSelectionFreezeLayer')){

          currentX = event.clientX;
          currentY = event.clientY;

          if((!selectionArray) || (selectionArray.length < 1)){
            selectionArray = [];
            selectionArray.push('lyteSelector1')
            currentClass = 'lyteSelector1'
            $L(imageTagOriginal).data('classes' , selectionArray)
            // getSelectedData();
          } else {
            var arr = $L(imageTagOriginal).data('classes');
            var regex = /\d+/g
            var test = parseInt(arr[arr.length-1].match( regex )[0])
            test +=1
            var newClass = arr[arr.length-1].replace(regex , test);
            selectionArray.push(newClass)
            currentClass = newClass
            $L(imageTagOriginal).data('classes' , selectionArray)
          }
          createSelection()

          document.addEventListener('mousemove' , setDim);
        } else if($L(event.target).hasClass('lyteSelectionBox')) {

          onDragStart();


          currentX = event.clientX;
          currentY = event.clientY;

          if($L('.lyteSelectorActiveBox')[0]){
            $L('.lyteSelectorActiveBox')[0].classList.remove('lyteSelectorActiveBox');
          }

          var elem = event.target;
          elem.classList.add('lyteSelectorActiveBox')
          prevLeft = elem.getBoundingClientRect().left;
          prevTop = elem.getBoundingClientRect().top;
          prevRight = elem.getBoundingClientRect().left+elem.getBoundingClientRect().width;
          prevBottom = elem.getBoundingClientRect().top + elem.getBoundingClientRect().height;
          document.addEventListener('mousemove' , moveSelection);

        } else if($L(event.target).hasClass('lyteSelectorHandles')){

          onResizeStart();


          var acele = $L('.lyteSelectorActiveBox')[0]; // ACTIVE ELEMENT acele

          var currentHold = event.target.className.split(' ');
          currentHandle = currentHold[1];

          currentX = event.clientX;
          currentY = event.clientY;

          rpLeft = acele.getBoundingClientRect().left;
          rpTop = acele.getBoundingClientRect().top;
          rpBottom = acele.getBoundingClientRect().top + acele.getBoundingClientRect().height;
          rpRight = acele.getBoundingClientRect().left + acele.getBoundingClientRect().width;

          rpWidth = acele.getBoundingClientRect().width;
          rpHeight = acele.getBoundingClientRect().height;

          document.addEventListener('mousemove' , resizeSelectionBox);

        } else if($L(event.target).hasClass('lyteSelectorDeleteBtn')){

          deleteOne();

        }



      }

      function createSelection(){



        var div = document.createElement('DIV');
        div.setAttribute('class' , currentClass);
        div.classList.add('lyteSelectionBox');

        if(!$L('.lyteSelectorBackImage')[0]){
          wrapperDiv.appendChild(imageTag);
          imageTag.style.height = imageTagOriginal.getBoundingClientRect().height + "px";
          imageTag.style.width = imageTagOriginal.getBoundingClientRect().width + "px";

          imageTagOriginal.style.display = "none"
        }


        var tlCorner = document.createElement('DIV');
        var trCorner = document.createElement('DIV');
        var brCorner = document.createElement('DIV');
        var blCorner = document.createElement('DIV');

        var tEdge = document.createElement('DIV');
        var bEdge = document.createElement('DIV');
        var rEdge = document.createElement('DIV');
        var lEdge = document.createElement('DIV');

        var deleteBtn = document.createElement('DIV');
        var workArea = document.createElement('DIV');

        var selectorLabelTop = document.createElement('DIV');
        var selectorLabelBottom = document.createElement('DIV');
        tlCorner.setAttribute('class' , 'lyteSelectorHandles lyteTLCorner')
        trCorner.setAttribute('class' , 'lyteSelectorHandles lyteTRCorner')
        brCorner.setAttribute('class' , 'lyteSelectorHandles lyteBRCorner')
        blCorner.setAttribute('class' , 'lyteSelectorHandles lyteBLCorner')
        tEdge.setAttribute('class' , 'lyteSelectorHandles lyteTEdge')
        bEdge.setAttribute('class' , 'lyteSelectorHandles lyteBEdge')
        rEdge.setAttribute('class' , 'lyteSelectorHandles lyteREdge')
        lEdge.setAttribute('class' , 'lyteSelectorHandles lyteLEdge')

        selectorLabelTop.setAttribute('class' , 'lyteSelectorLabel')
        selectorLabelBottom.setAttribute('class' , 'lyteSelectorLabel')

        deleteBtn.setAttribute('class' , 'lyteSelectorDeleteBtn')
        workArea.setAttribute('class' , 'lyteSelectorWorkArea')

        onCreate(workArea)


        div.appendChild(tlCorner)
        div.appendChild(trCorner)
        div.appendChild(brCorner)
        div.appendChild(blCorner)
        div.appendChild(tEdge)
        div.appendChild(bEdge)
        div.appendChild(rEdge)
        div.appendChild(lEdge)

        div.appendChild(selectorLabelTop)
        div.appendChild(selectorLabelBottom)
        wrapperDiv.appendChild(div)

        if(!$L('.lyteSelectionWrapperBox')[0]){
          wrapperDiv.setAttribute('class' , 'lyteSelectionWrapperBox');
          parentDiv.appendChild(wrapperDiv);
          wrapperDiv.style.height = imageTag.getBoundingClientRect().height+"px";
          wrapperDiv.style.width = imageTag.getBoundingClientRect().width+"px";;
        }

        if($L('.lyteSelectorActiveBox')[0]){
          $L('.lyteSelectorActiveBox')[0].classList.remove('lyteSelectorActiveBox');
        }

        if(!($L(div).hasClass('lyteSelectorActiveBox'))){
          div.classList.add('lyteSelectorActiveBox');
        }

        if(!($L('.lyteSelectionFreezeLayer')[0])){
          var freezeLayer = document.createElement('DIV');
          freezeLayer.setAttribute('class' , 'lyteSelectionFreezeLayer');
          wrapperDiv.appendChild(freezeLayer);
          freezeLayer.style.height = imageTag.getBoundingClientRect().height + "px";
          freezeLayer.style.top = 0 + "px";
          freezeLayer.style.width = imageTag.getBoundingClientRect().width + "px";
        }

        $L('.'+currentClass)[0].style.backgroundImage = "url('"+ imageTag.src +"')"
        $L('.'+currentClass)[0].style.backgroundPosition = (-($L('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
        $L('.'+currentClass)[0].style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
        $L('.'+currentClass)[0].style.backgroundRepeat = "no-repeat";

        document.addEventListener('mouseup' , removeEve)

        function removeEve(){
          document.removeEventListener('mousemove' , setDim);
          document.removeEventListener('mouseup' , removeEve);
          document.removeEventListener('mousedown' , mainFun);
          if($L('.'+currentClass)[0]){
            if(($L('.'+currentClass)[0].getBoundingClientRect().width<5)||($L('.'+currentClass)[0].getBoundingClientRect().height<5)){
              $L('.'+currentClass)[0].style.width = imageMinWidth + 'px';
              $L('.'+currentClass)[0].style.height = imageMinHeight + 'px';
              $L('.'+currentClass)[0].style.top = currentY - imageTag.getBoundingClientRect().top+'px';
              $L('.'+currentClass)[0].style.left = currentX - imageTag.getBoundingClientRect().left+'px';
              $L('.'+currentClass)[0].style.backgroundImage = "url('"+ imageTag.src +"')"
              $L('.'+currentClass)[0].style.backgroundPosition = (-($L('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"
              $L('.'+currentClass)[0].style.backgroundSize = imageTag.getBoundingClientRect().width + "px " + imageTag.getBoundingClientRect().height + "px";
              $L('.'+currentClass)[0].style.backgroundRepeat = "no-repeat";
            }
          }
          div.appendChild(deleteBtn)
          div.appendChild(workArea)
        }

      }

      function setDim(){

        var xChange = currentX - event.clientX;
        var yChange = currentY - event.clientY;
        if(xChange < 0){
          $L('.'+currentClass)[0].style.left = currentX - imageTag.getBoundingClientRect().left + 'px'
        } else {
          $L('.'+currentClass)[0].style.left = event.clientX - imageTag.getBoundingClientRect().left + 'px'
        }
        if(yChange < 0){
          $L('.'+currentClass)[0].style.top = currentY - imageTag.getBoundingClientRect().top + 'px'
        } else {
          $L('.'+currentClass)[0].style.top = event.clientY - imageTag.getBoundingClientRect().top + 'px'
        }


        $L('.'+currentClass)[0].style.width = Math.abs(xChange) + 'px'
        $L('.'+currentClass)[0].style.height = Math.abs(yChange) + 'px'

        if(event.clientX <= imageTag.getBoundingClientRect().left ){

          $L('.'+currentClass)[0].style.left = '0px';
          $L('.'+currentClass)[0].style.width = currentX - imageTag.getBoundingClientRect().left + 'px';

        }

        if(event.clientY <= imageTag.getBoundingClientRect().top ){

          $L('.'+currentClass)[0].style.top = '0px';
          $L('.'+currentClass)[0].style.height = currentY - imageTag.getBoundingClientRect().top + 'px';

        }

        if(event.clientX >= (imageTag.getBoundingClientRect().left + imageTag.getBoundingClientRect().width)){

          $L('.'+currentClass)[0].style.width = ( ( imageTag.getBoundingClientRect().left +  imageTag.getBoundingClientRect().width ) - currentX) + 'px';

        }

        if(event.clientY >= (imageTag.getBoundingClientRect().top + imageTag.getBoundingClientRect().height) ){

          $L('.'+currentClass)[0].style.height = ( (imageTag.getBoundingClientRect().top + imageTag.getBoundingClientRect().height) - currentY) + 'px';

        }

        $L('.'+currentClass)[0].style.backgroundPosition = (-($L('.'+currentClass)[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.'+currentClass)[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"

      }

      function moveSelection(){


        var leftVal = prevLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left;
        var topVal = prevTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top

        if(leftVal < 0){

          leftVal = 0;

        }

        if(topVal < 0){

          topVal = 0;

        }

        if((leftVal + $L('.lyteSelectorActiveBox')[0].getBoundingClientRect().width) >= imageTag.getBoundingClientRect().width){

          leftVal = imageTag.getBoundingClientRect().width - $L('.lyteSelectorActiveBox')[0].getBoundingClientRect().width

        }

        if((topVal + $L('.lyteSelectorActiveBox')[0].getBoundingClientRect().height) >= imageTag.getBoundingClientRect().height){

          topVal = imageTag.getBoundingClientRect().height - $L('.lyteSelectorActiveBox')[0].getBoundingClientRect().height

        }

        $L('.lyteSelectorActiveBox')[0].style.left = leftVal + "px";
        $L('.lyteSelectorActiveBox')[0].style.top = topVal + "px";

        $L('.lyteSelectorActiveBox')[0].style.backgroundPosition = (-($L('.lyteSelectorActiveBox')[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.lyteSelectorActiveBox')[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"


        document.addEventListener('mouseup' , removeMoveEve)


      }

      function removeMoveEve(){
        onDragEnd();
        document.removeEventListener('mousemove' , moveSelection);
        document.removeEventListener('mouseup' , removeMoveEve);
        document.removeEventListener('mousedown' , mainFun);
      }

      function resizeSelectionBox(){


        var th = $L('.lyteSelectorActiveBox')[0];

        switch (currentHandle) {

          case 'lyteTLCorner':
          th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
          th.style.top = rpTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top + "px";
          th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
          th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";

          if(event.clientX <= imageLeft){
            th.style.width = rpRight - imageLeft - 2 + "px";
            th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
          }
          if(event.clientX >= rpRight){
            th.style.width = "1px";
            th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
          }
          if(event.clientY <= imageTop){
            th.style.height = rpBottom - imageTop - 2 + "px";
            th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
          }
          if(event.clientY >= rpBottom){
            th.style.height = "1px";
            th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
          }

          break;
          case 'lyteTRCorner':
          th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
          th.style.top = rpTop - (currentY - event.clientY) - imageTag.getBoundingClientRect().top + "px";
          th.style.width = rpWidth - (currentX - event.clientX) - 2 + "px";
          if(event.clientY <= imageTop){
            th.style.height = rpBottom - imageTop - 2 + "px";
            th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
          }
          if(event.clientY >= rpBottom){
            th.style.height = "1px";
            th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
          }
          if(event.clientX >= imageRight){
            th.style.width = imageRight - rpLeft + "px"
          }
          if(event.clientX <= rpLeft){
            th.style.width = "1px";
          }
          break;
          case 'lyteBRCorner':
          th.style.width = rpWidth - (currentX - event.clientX) - 2 + "px";
          th.style.height = rpHeight - (currentY - event.clientY) - 2 + "px";
          if(event.clientY >= imageBottom){
            th.style.height = imageBottom - rpTop + "px";
          }
          if(event.clientY <= rpTop){
            th.style.height = '1px'
          }
          if(event.clientX >= imageRight){
            th.style.width = imageRight - rpLeft + "px"
          }
          if(event.clientX <= rpLeft){
            th.style.width = "1px";
          }
          break;
          case 'lyteBLCorner':
          th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
          th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";
          th.style.height = rpHeight - (currentY - event.clientY) + "px";
          if(event.clientX <= imageLeft){
            th.style.width = rpRight - imageLeft - 2 + "px";
            th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
          }
          if(event.clientX >= rpRight){
            th.style.width = "1px";
            th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
          }

          if(event.clientY >= imageBottom){
            th.style.height = imageBottom - rpTop + "px";
          }
          if(event.clientY <= rpTop){
            th.style.height = '1px'
          }
          break;
          case 'lyteTEdge':
          th.style.height = rpHeight + (currentY - event.clientY) - 2 + "px";
          th.style.top = rpTop - imageTag.getBoundingClientRect().top - (currentY - event.clientY) + "px";

          if(event.clientY <= imageTop){
            th.style.height = rpBottom - imageTop - 2 + "px";
            th.style.top = imageTop - imageTag.getBoundingClientRect().top + "px";
          }
          if(event.clientY >= rpBottom){
            th.style.height = "1px";
            th.style.top = rpBottom-3 - imageTag.getBoundingClientRect().top + "px";
          }

          break;
          case 'lyteBEdge':
          th.style.height = rpHeight - (currentY - event.clientY) + "px";
          if(event.clientY >= imageBottom){
            th.style.height = imageBottom - rpTop + "px";
          }
          if(event.clientY <= rpTop){
            th.style.height = '1px'
          }
          break;
          case 'lyteREdge':
          th.style.width = rpWidth - (currentX - event.clientX) + "px";
          if(event.clientX >= imageRight){
            th.style.width = imageRight - rpLeft + "px"
          }
          if(event.clientX <= rpLeft){
            th.style.width = "1px";
          }
          break;
          case 'lyteLEdge':

          th.style.width = rpWidth + (currentX - event.clientX) - 2 + "px";
          th.style.left = rpLeft - (currentX - event.clientX) - imageTag.getBoundingClientRect().left + "px";

          if(event.clientX <= imageLeft){
            th.style.width = rpRight - imageLeft - 2 + "px";
            th.style.left = imageLeft - imageTag.getBoundingClientRect().left + "px";
          }
          if(event.clientX >= rpRight){
            th.style.width = "1px";
            th.style.left = rpRight-3 - imageTag.getBoundingClientRect().left + "px";
          }

          break;

        }

        $L('.lyteSelectorActiveBox')[0].style.backgroundPosition = (-($L('.lyteSelectorActiveBox')[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)-1) + "px " + (-($L('.lyteSelectorActiveBox')[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)-1) + "px"

        document.addEventListener('mouseup' , removeReEve)

      }
      function removeReEve(){
        onResizeEnd()
        document.removeEventListener('mousemove' , resizeSelectionBox)
        document.removeEventListener('mouseup' , removeReEve)
        document.removeEventListener('mousedown' , mainFun);
      }

      function deleteOne(){

        event.preventDefault();

        onDeleteOne()

        var delElem = $L('.lyteSelectorActiveBox')[0];
        wrapperDiv.removeChild(delElem);

        var currentElemArr = $L(imageTagOriginal).data('classes');
        var delElemClass = delElem.classList[0];

        currentElemArr.splice( currentElemArr.indexOf(delElemClass) , 1 )

        if(currentElemArr.length < 1){

          wrapperDiv.removeChild($L('.lyteSelectionFreezeLayer')[0]);
          selectionArray = [];
          parentDiv.removeChild(wrapperDiv)
          imageTagOriginal.style.display = "block";

        }

      }

      function getSelectedData(){

        var returnData = {};

        returnData.imageNaturalWidth = imageTag.naturalWidth;
        returnData.imageNaturalHeight = imageTag.naturalHeight;

        returnData.imageWidth = imageTag.getBoundingClientRect().width;
        returnData.imageHeight = imageTag.getBoundingClientRect().height;

        var totalBoxes = $L(imageTagOriginal).data('classes').length;
        var classesArr = $L(imageTagOriginal).data('classes');
        var imageSelections = [];


        for(var i=0;i<totalBoxes;i++){

          var dummy = {};

          var ratioChange = imageTag.naturalWidth / imageTag.getBoundingClientRect().width;

          dummy.width = $L('.'+classesArr[i])[0].getBoundingClientRect().width;
          dummy.height = $L('.'+classesArr[i])[0].getBoundingClientRect().height;
          dummy.left = $L('.'+classesArr[i])[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left;
          dummy.top = $L('.'+classesArr[i])[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top;
          dummy.naturalWidth = $L('.'+classesArr[i])[0].getBoundingClientRect().width * ratioChange;
          dummy.naturalHeight = $L('.'+classesArr[i])[0].getBoundingClientRect().height * ratioChange;
          dummy.naturalLeft = ( $L('.'+classesArr[i])[0].getBoundingClientRect().left - imageTag.getBoundingClientRect().left)*ratioChange;
          dummy.naturalTop = ($L('.'+classesArr[i])[0].getBoundingClientRect().top - imageTag.getBoundingClientRect().top)*ratioChange;

          imageSelections.push(dummy);

        }

        returnData.imageSelections = imageSelections;


        return returnData;


      }

      selectionData.getData = function(){

        return getSelectedData()

      }


      selectionData.deleteAll = function (){

        onDeleteAll();

        var classArr = $L(imageTagOriginal).data().classes;

        for(var i=0;i<classArr.length;i++){
          wrapperDiv.removeChild( $L('.'+classArr[i])[0] )
        }

        wrapperDiv.removeChild($L('.lyteSelectionFreezeLayer')[0]);
        selectionArray = [];
        currentClass = '';

        parentDiv.removeChild(wrapperDiv)
        imageTagOriginal.style.display = "block";

      }

      $L(imageTagOriginal).data('lyteSelector' , selectionData);

    }

  }

}());
