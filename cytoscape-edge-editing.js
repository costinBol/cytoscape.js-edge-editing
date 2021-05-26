!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.cytoscapeEdgeEditing=t():e.cytoscapeEdgeEditing=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";var o={currentCtxEdge:void 0,currentCtxPos:void 0,currentAnchorIndex:void 0,ignoredClasses:void 0,setIgnoredClasses:function(e){this.ignoredClasses=e},syntax:{bend:{edge:"segments",class:"edgebendediting-hasbendpoints",multiClass:"edgebendediting-hasmultiplebendpoints",weight:"cyedgebendeditingWeights",distance:"cyedgebendeditingDistances",weightCss:"segment-weights",distanceCss:"segment-distances",pointPos:"bendPointPositions"},control:{edge:"unbundled-bezier",class:"edgecontrolediting-hascontrolpoints",multiClass:"edgecontrolediting-hasmultiplecontrolpoints",weight:"cyedgecontroleditingWeights",distance:"cyedgecontroleditingDistances",weightCss:"control-point-weights",distanceCss:"control-point-distances",pointPos:"controlPointPositions"}},getEdgeType:function(e){return e?e.hasClass(this.syntax.bend.class)?"bend":e.hasClass(this.syntax.control.class)?"control":e.css("curve-style")===this.syntax.bend.edge?"bend":e.css("curve-style")===this.syntax.control.edge?"control":e.data(this.syntax.bend.pointPos)&&e.data(this.syntax.bend.pointPos).length>0?"bend":e.data(this.syntax.control.pointPos)&&e.data(this.syntax.control.pointPos).length>0?"control":"inconclusive":"inconclusive"},initAnchorPoints:function(e,t,n){for(var o=0;o<n.length;o++){var i=n[o],s=this.getEdgeType(i);if("inconclusive"!==s&&!this.isIgnoredEdge(i)){var a;"bend"===s?a=e.apply(this,i):"control"===s&&(a=t.apply(this,i));var d=this.convertToRelativePositions(i,a);d.distances.length>0&&(i.data(this.syntax[s].weight,d.weights),i.data(this.syntax[s].distance,d.distances),i.addClass(this.syntax[s].class),d.distances.length>1&&i.addClass(this.syntax[s].multiClass))}}},isIgnoredEdge:function(e){var t=e.source().position("x"),n=e.source().position("y"),o=e.target().position("x"),i=e.target().position("y");if(t==o&&n==i||e.source().id()==e.target().id())return!0;for(var s=0;this.ignoredClasses&&s<this.ignoredClasses.length;s++)if(e.hasClass(this.ignoredClasses[s]))return!0;return!1},getLineDirection:function(e,t){return e.y==t.y&&e.x<t.x?1:e.y<t.y&&e.x<t.x?2:e.y<t.y&&e.x==t.x?3:e.y<t.y&&e.x>t.x?4:e.y==t.y&&e.x>t.x?5:e.y>t.y&&e.x>t.x?6:e.y>t.y&&e.x==t.x?7:8},getSrcTgtPointsAndTangents:function(e){var t=e.source(),n=e.target(),o=(n.position(),t.position(),t.position()),i=n.position(),s=(i.y-o.y)/(i.x-o.x);return{m1:s,m2:-1/s,srcPoint:o,tgtPoint:i}},getIntersection:function(e,t,n){void 0===n&&(n=this.getSrcTgtPointsAndTangents(e));var o,i,s=n.srcPoint,a=(n.tgtPoint,n.m1),d=n.m2;if(a==1/0||a==-1/0)o=s.x,i=t.y;else if(0==a)o=t.x,i=s.y;else{var r=s.y-a*s.x;i=a*(o=(t.y-d*t.x-r)/(a-d))+r}return{x:o,y:i}},getAnchorsAsArray:function(e){var t=this.getEdgeType(e);if("inconclusive"!==t&&e.css("curve-style")===this.syntax[t].edge){for(var n=[],o=e.pstyle(this.syntax[t].weightCss)?e.pstyle(this.syntax[t].weightCss).pfValue:[],i=e.pstyle(this.syntax[t].distanceCss)?e.pstyle(this.syntax[t].distanceCss).pfValue:[],s=Math.min(o.length,i.length),a=e.source().position(),d=e.target().position(),r=d.y-a.y,c=d.x-a.x,l=Math.sqrt(c*c+r*r),g={x:c/l,y:r/l},u=-g.y,h=g.x,y=0;y<s;y++){var v=o[y],f=i[y],p=1-v,x=v,m={x1:a.x,x2:d.x,y1:a.y,y2:d.y},b={x:m.x1*p+m.x2*x,y:m.y1*p+m.y2*x};n.push(b.x+u*f,b.y+h*f)}return n}},convertToRelativePosition:function(e,t,n){void 0===n&&(n=this.getSrcTgtPointsAndTangents(e));var o,i=this.getIntersection(e,t,n),s=i.x,a=i.y,d=n.srcPoint,r=n.tgtPoint;o=s!=d.x?(s-d.x)/(r.x-d.x):a!=d.y?(a-d.y)/(r.y-d.y):0;var c=Math.sqrt(Math.pow(a-t.y,2)+Math.pow(s-t.x,2)),l=this.getLineDirection(d,r),g=this.getLineDirection(i,t);return l-g!=-2&&l-g!=6&&0!=c&&(c*=-1),{weight:o,distance:c}},convertToRelativePositions:function(e,t){for(var n=this.getSrcTgtPointsAndTangents(e),o=[],i=[],s=0;t&&s<t.length;s++){var a=t[s],d=this.convertToRelativePosition(e,a,n);o.push(d.weight),i.push(d.distance)}return{weights:o,distances:i}},getDistancesString:function(e,t){for(var n="",o=e.data(this.syntax[t].distance),i=0;o&&i<o.length;i++)n=n+" "+o[i];return n},getWeightsString:function(e,t){for(var n="",o=e.data(this.syntax[t].weight),i=0;o&&i<o.length;i++)n=n+" "+o[i];return n},addAnchorPoint:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;void 0!==e&&void 0!==t||(e=this.currentCtxEdge,t=this.currentCtxPos),void 0===n&&(n=this.getEdgeType(e));for(var o,i=this.syntax[n].weight,s=this.syntax[n].distance,a=this.convertToRelativePosition(e,t),d=a.weight,r=e.source().position("x"),c=e.source().position("y"),l=e.target().position("x"),g=e.target().position("y"),u=this.convertToRelativePosition(e,{x:r,y:c}).weight,h=this.convertToRelativePosition(e,{x:l,y:g}).weight,y=[u].concat(e.data(i)?e.data(i):[]).concat([h]),v=this.getAnchorsAsArray(e),f=1/0,p=[r,c].concat(v||[]).concat([l,g]),x=-1,m=0;m<y.length-1;m++){var b=y[m],A=y[m+1],w=this.compareWithPrecision(d,b,!0),P=this.compareWithPrecision(d,A),E=this.compareWithPrecision(d,A,!0),C=this.compareWithPrecision(d,b);if(w&&P||E&&C){var T={x:r=p[2*m],y:c=p[2*m+1]},M={x:l=p[2*m+2],y:g=p[2*m+3]},I=(c-g)/(r-l),S=-1/I,R={srcPoint:T,tgtPoint:M,m1:I,m2:S},D=this.getIntersection(e,t,R),O=Math.sqrt(Math.pow(t.x-D.x,2)+Math.pow(t.y-D.y,2));O<f&&(f=O,o=D,x=m)}}void 0!==o&&(t=o),a=this.convertToRelativePosition(e,t),void 0===o&&(a.distance=0);var F=e.data(i),k=e.data(s);return k=k||[],0===(F=F||[]).length&&(x=0),-1!=x&&(F.splice(x,0,a.weight),k.splice(x,0,a.distance)),e.data(i,F),e.data(s,k),e.addClass(this.syntax[n].class),(F.length>1||k.length>1)&&e.addClass(this.syntax[n].multiClass),x},removeAnchor:function(e,t){void 0!==e&&void 0!==t||(e=this.currentCtxEdge,t=this.currentAnchorIndex);var n=this.getEdgeType(e);if(!this.edgeTypeInconclusiveShouldntHappen(n,"anchorPointUtilities.js, removeAnchor")){var o=this.syntax[n].weight,i=this.syntax[n].distance,s=this.syntax[n].pointPos,a=e.data(o),d=e.data(i),r=e.data(s);a.splice(t,1),d.splice(t,1),r&&r.splice(t,1),1==a.length||1==d.length?e.removeClass(this.syntax[n].multiClass):0==a.length||0==d.length?(e.removeClass(this.syntax[n].class),e.data(o,[]),e.data(i,[])):(e.data(o,a),e.data(i,d))}},removeAllAnchors:function(e){void 0===e&&(e=this.currentCtxEdge);var t=this.getEdgeType(e);if(!this.edgeTypeInconclusiveShouldntHappen(t,"anchorPointUtilities.js, removeAllAnchors")){e.removeClass(this.syntax[t].class),e.removeClass(this.syntax[t].multiClass);var n=this.syntax[t].weight,o=this.syntax[t].distance,i=this.syntax[t].pointPos;e.data(n,[]),e.data(o,[]),e.data(i)&&e.data(i,[])}},calculateDistance:function(e,t){var n=e.x-t.x,o=e.y-t.y;return Math.sqrt(Math.pow(n,2)+Math.pow(o,2))},compareWithPrecision:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.01,i=e-t;return Math.abs(i)<=o||(n?e<t:e>t)},edgeTypeInconclusiveShouldntHappen:function(e,t){return"inconclusive"===e&&(console.log("In "+t+": edge type inconclusive should never happen here!!"),!0)}};e.exports=o},function(e,t,n){"use strict";var o,i,s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=(o=Math.max,i=Date.now||function(){return(new Date).getTime()},function(e,t,n){var a,d,r,c,l,g,u,h,y,v=0,f=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");if(t=t<0?0:+t||0,!0===n){var x=!0;p=!1}else y=void 0===(h=n)?"undefined":s(h),!h||"object"!=y&&"function"!=y||(x=!!n.leading,f="maxWait"in n&&o(+n.maxWait||0,t),p="trailing"in n?!!n.trailing:p);function m(t,n){n&&clearTimeout(n),d=g=u=void 0,t&&(v=i(),r=e.apply(l,a),g||d||(a=l=void 0))}function b(){var e=t-(i()-c);e<=0||e>t?m(u,d):g=setTimeout(b,e)}function A(){m(p,g)}function w(){if(a=arguments,c=i(),l=this,u=p&&(g||!x),!1===f)var n=x&&!g;else{d||x||(v=c);var o=f-(c-v),s=o<=0||o>f;s?(d&&(d=clearTimeout(d)),v=c,r=e.apply(l,a)):d||(d=setTimeout(A,o))}return s&&g?g=clearTimeout(g):g||t===f||(g=setTimeout(b,t)),n&&(s=!0,r=e.apply(l,a)),!s||g||d||(a=l=void 0),r}return w.cancel=function(){g&&clearTimeout(g),d&&clearTimeout(d),v=0,d=g=u=void 0},w});e.exports=a},function(e,t,n){"use strict";var o,i,s;i=n(0),n(1),s=function(e,t,o){var s=n(3);if(e&&t&&o){var a,d={bendPositionsFunction:function(e){return e.data("bendPointPositions")},controlPositionsFunction:function(e){return e.data("controlPointPositions")},initAnchorsAutomatically:!0,ignoredClasses:[],undoable:!1,anchorShapeSizeFactor:3,zIndex:999,enabled:!0,bendRemovalSensitivity:8,addBendMenuItemTitle:"Add Bend Point",removeBendMenuItemTitle:"Remove Bend Point",removeAllBendMenuItemTitle:"Remove All Bend Points",addControlMenuItemTitle:"Add Control Point",removeControlMenuItemTitle:"Remove Control Point",removeAllControlMenuItemTitle:"Remove All Control Points",disableTagDragCreate:!1,moveSelectedAnchorsOnKeyEvents:function(){return!0},enableMultipleAnchorRemovalOption:!1},r=!1;e("core","edgeEditing",(function(e){var t=this;return"initialized"===e?r:("get"!==e&&(a=function(e,t){var n={};for(var o in e)n[o]=e[o];for(var o in t)if("bendRemovalSensitivity"==o){var i=t[o];isNaN(i)||(n[o]=i>=0&&i<=20?t[o]:i<0?0:20)}else n[o]=t[o];return n}(d,e),r=!0,t.style().selector(".edgebendediting-hasbendpoints").css({"curve-style":"segments","segment-distances":function(e){return i.getDistancesString(e,"bend")},"segment-weights":function(e){return i.getWeightsString(e,"bend")},"edge-distances":"node-position"}),t.style().selector(".edgecontrolediting-hascontrolpoints").css({"curve-style":"unbundled-bezier","control-point-distances":function(e){return i.getDistancesString(e,"control")},"control-point-weights":function(e){return i.getWeightsString(e,"control")},"edge-distances":"node-position"}),i.setIgnoredClasses(a.ignoredClasses),a.initAnchorsAutomatically&&i.initAnchorPoints(a.bendPositionsFunction,a.controlPositionsFunction,t.edges(),a.ignoredClasses),a.enabled?s(a,t):s("unbind",t)),r?{getAnchorsAsArray:function(e){return i.getAnchorsAsArray(e)},initAnchorPoints:function(e){i.initAnchorPoints(a.bendPositionsFunction,a.controlPositionsFunction,e)},deleteSelectedAnchor:function(e,t){i.removeAnchor(e,t)}}:void 0)}))}},e.exports&&(e.exports=s),void 0===(o=function(){return s}.call(t,n,t,e))||(e.exports=o),"undefined"!=typeof cytoscape&&$&&Konva&&s(cytoscape,$,Konva)},function(e,t,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var s=n(1),a=n(0),d=n(4),r=n(5),c=0;e.exports=function(e,t){var n,l,g,u,h,y,v,f,p,x,m,b,A,w,P,E,C,T,M=e,I="cy-edge-bend-editing-cxt-add-bend-point"+c,S="cy-edge-bend-editing-cxt-remove-bend-point"+c,R="cy-edge-bend-editing-cxt-remove-multiple-bend-point"+c,D="cy-edge-control-editing-cxt-add-control-point"+c,O="cy-edge-control-editing-cxt-remove-control-point"+c,F="cy-edge-bend-editing-cxt-remove-multiple-control-point"+c,k=null,B=null,K=!1,W={init:function(){r(t,a,e);var o=e,M=$(this),W="cy-node-edge-editing-stage"+c;c++;var z,j,L=$('<div id="'+W+'"></div>');M.find("#"+W).length<1&&M.append(L),(z=Konva.stages.length<c?new Konva.Stage({id:"node-edge-editing-stage",container:W,width:M.width(),height:M.height()}):Konva.stages[c-1]).getChildren().length<1?(j=new Konva.Layer,z.add(j)):j=z.getChildren()[0];var U={edge:void 0,edgeType:"inconclusive",anchors:[],touchedAnchor:void 0,touchedAnchorIndex:void 0,bindListeners:function(e){e.on("mousedown touchstart",this.eMouseDown)},unbindListeners:function(e){e.off("mousedown touchstart",this.eMouseDown)},eMouseDown:function(e){t.autounselectify(!1),K=!0,U.touchedAnchor=e.target,T=!1,U.edge.unselect();var n=a.syntax[U.edgeType].weight,o=a.syntax[U.edgeType].distance,i=U.edge;fe={edge:i,type:U.edgeType,weights:i.data(n)?[].concat(i.data(n)):[],distances:i.data(o)?[].concat(i.data(o)):[]},function(){E=t.style()._private.coreStyle["active-bg-opacity"]?t.style()._private.coreStyle["active-bg-opacity"].value:.15;t.style().selector("core").style("active-bg-opacity",0).update()}(),le(),t.autoungrabify(!0),j.getStage().on("contentTouchend contentMouseup",U.eMouseUp),j.getStage().on("contentMouseout",U.eMouseOut)},eMouseUp:function(e){K=!1,U.touchedAnchor=void 0,T=!1,U.edge.select(),t.style().selector("core").style("active-bg-opacity",E).update(),ge(),t.autounselectify(!0),t.autoungrabify(!1),j.getStage().off("contentTouchend contentMouseup",U.eMouseUp),j.getStage().off("contentMouseout",U.eMouseOut)},eMouseOut:function(e){T=!0},clearAnchorsExcept:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,n=!1;this.anchors.forEach((function(o,i){t&&o===t?n=!0:(e.unbindListeners(o),o.destroy())})),n?this.anchors=[t]:(this.anchors=[],this.edge=void 0,this.edgeType="inconclusive")},renderAnchorShapes:function(e){if(this.edge=e,this.edgeType=a.getEdgeType(e),e.hasClass("edgebendediting-hasbendpoints")||e.hasClass("edgecontrolediting-hascontrolpoints")){for(var t=a.getAnchorsAsArray(e),n=.65*de(e),o=(e.source().position(),e.target().position(),0);t&&o<t.length;o+=2){var i=t[o],s=t[o+1];this.renderAnchorShape(i,s,n)}j.draw()}},renderAnchorShape:function(e,n,o){var i=se({x:e-o/2,y:n-o/2});o*=t.zoom();var s=new Konva.Rect({x:i.x,y:i.y,width:o,height:o,fill:"black",strokeWidth:0,draggable:!0});this.anchors.push(s),this.bindListeners(s),j.add(s)}},_=function(e){q(e,"bend")},N=function(e){q(e,"control")},q=function(e,n){var o=e.target||e.cyTarget;if(!a.isIgnoredEdge(o)){var i,s,d,r,c=a.getEdgeType(o);"inconclusive"===c?(i=[],s=[]):(d=a.syntax[c].weight,r=a.syntax[c].distance,i=o.data(d)?[].concat(o.data(d)):o.data(d),s=o.data(r)?[].concat(o.data(r)):o.data(r));var l={edge:o,type:c,weights:i,distances:s};a.addAnchorPoint(void 0,void 0,n),ie().undoable&&t.undoRedo().do("changeAnchorPoints",l)}ae(),o.select()},H=function(e){var n=U.edge,o=a.getEdgeType(n);if(!a.edgeTypeInconclusiveShouldntHappen(o,"UiUtilities.js, cxtRemoveAnchorFcn")){var i={edge:n,type:o,weights:[].concat(n.data(a.syntax[o].weight)),distances:[].concat(n.data(a.syntax[o].distance))};a.removeAnchor(),ie().undoable&&t.undoRedo().do("changeAnchorPoints",i),setTimeout((function(){ae(),n.select()}),50)}},V=function(e){var n=U.edge,o=a.getEdgeType(n),i={edge:n,type:o,weights:[].concat(n.data(a.syntax[o].weight)),distances:[].concat(n.data(a.syntax[o].distance))};a.removeAllAnchors(),ie().undoable&&t.undoRedo().do("changeAnchorPoints",i),setTimeout((function(){ae(),n.select()}),50)},X=o.handleReconnectEdge,G=o.validateEdge,J=o.actOnUnsuccessfulReconnection,Q=[{id:I,content:o.addBendMenuItemTitle,selector:"edge",onClickFunction:_},{id:S,content:o.removeBendMenuItemTitle,selector:"edge",onClickFunction:H},{id:R,content:o.removeAllBendMenuItemTitle,selector:o.enableMultipleAnchorRemovalOption&&":selected.edgebendediting-hasmultiplebendpoints",onClickFunction:V},{id:D,content:o.addControlMenuItemTitle,selector:"edge",coreAsWell:!0,onClickFunction:N},{id:O,content:o.removeControlMenuItemTitle,selector:"edge",coreAsWell:!0,onClickFunction:H},{id:F,content:o.removeAllControlMenuItemTitle,selector:o.enableMultipleAnchorRemovalOption&&":selected.edgecontrolediting-hasmultiplecontrolpoints",onClickFunction:V}];if(t.contextMenus){var Y=t.contextMenus("get");Y.isActive()?Y.appendMenuItems(Q):t.contextMenus({menuItems:Q})}else if(t.cxtmenu&&o.cxtmenuOptions&&!o.cxtmenuSkip){t.on("cxttapstart taphold",(function(e){e.target===t?console.log("cxttapstart  on background"):console.log("cxttapstart  on some element"),window.currentEvent=e}));var Z=[{content:'<span class="fas fa-bezier-curve fa-2x"></span> Add curve',select:function(e){console.log(e.data("name"));var t=window.currentEvent.position||window.currentEvent.cyPosition;a.currentCtxPos=t,a.currentCtxEdge=e,window.currentEvent.target=e,N(window.currentEvent)},enabled:!0},{content:'<span class="fas fa-chart-line fa-2x"></span> Add corner',select:function(e){console.log(e.data("name"));var t=window.currentEvent.position||window.currentEvent.cyPosition;a.currentCtxPos=t,a.currentCtxEdge=e,window.currentEvent.target=e,_(window.currentEvent)},enabled:!0},{content:'<span class="fas fa-times fa-2x"></span> Remove anchors',select:function(e){console.log(e.data("name"));var t=window.currentEvent.position||window.currentEvent.cyPosition;a.currentCtxPos=t,a.currentCtxEdge=e,window.currentEvent.target=e,V(window.currentEvent)},enabled:!0}];o.cxtmenuOptions.commands=[].concat(i(o.cxtmenuOptions.commands),Z)}var ee=s((function(){L.attr("height",M.height()).attr("width",M.width()).css({position:"absolute",top:0,left:0,"z-index":ie().zIndex}),setTimeout((function(){var e=L.offset(),n=M.offset();L.css({top:-(e.top-n.top),left:-(e.left-n.left)}),j.getStage().setWidth(M.width()),j.getStage().setHeight(M.height()),t&&ae()}),0)}),250);function te(){ee()}te(),$(window).bind("resize",(function(){te()}));var ne,oe=M.data("cyedgeediting");function ie(){return ne||(ne=M.data("cyedgeediting").options)}function se(e){var n=t.pan(),o=t.zoom();return{x:e.x*o+n.x,y:e.y*o+n.y}}function ae(){U.clearAnchorsExcept(U.touchedAnchor),null!==k&&(k.destroy(),k=null),null!==B&&(B.destroy(),B=null),j.draw(),C&&(U.renderAnchorShapes(C),function(e){if(!e)return;var n=a.getAnchorsAsArray(e);void 0===n&&(n=[]);var o=e.sourceEndpoint(),i=e.targetEndpoint();if(n.unshift(o.y),n.unshift(o.x),n.push(i.x),n.push(i.y),!n)return;var s={x:n[0],y:n[1]},d={x:n[n.length-2],y:n[n.length-1]},r={x:n[2],y:n[3]},c={x:n[n.length-4],y:n[n.length-3]},l=.65*de(e);!function(e,n,o,i,s){var a=e.x-o/2,d=e.y-o/2,r=n.x-o/2,c=n.y-o/2,l=i.x-o/2,g=i.y-o/2,u=s.x-o/2,h=s.y-o/2,y=se({x:a,y:d}),v=se({x:r,y:c});o=o*t.zoom()/2;var f=se({x:l,y:g}),p=se({x:u,y:h}),x=o,m=Math.sqrt(Math.pow(f.x-y.x,2)+Math.pow(f.y-y.y,2)),b=y.x+x/m*(f.x-y.x),A=y.y+x/m*(f.y-y.y),w=Math.sqrt(Math.pow(p.x-v.x,2)+Math.pow(p.y-v.y,2)),P=v.x+x/w*(p.x-v.x),E=v.y+x/w*(p.y-v.y);null===k&&(k=new Konva.Circle({x:b+o,y:A+o,radius:o,fill:"black"}));null===B&&(B=new Konva.Circle({x:P+o,y:E+o,radius:o,fill:"black"}));j.add(k),j.add(B),j.draw()}(s,d,l,r,c)}(C))}function de(e){var t=ie().anchorShapeSizeFactor;return parseFloat(e.css("width"))<=2.5?2.5*t:parseFloat(e.css("width"))*t}function re(e,t,n,o,i){return e>=o-n/2&&e<=o+n/2&&t>=i-n/2&&t<=i+n/2}function ce(e,t,n){var o=a.getEdgeType(n);if("inconclusive"===o)return-1;if(null==n.data(a.syntax[o].weight)||0==n.data(a.syntax[o].weight).length)return-1;for(var i=a.getAnchorsAsArray(n),s=de(n),d=0;i&&d<i.length;d+=2){if(re(e,t,s,i[d],i[d+1]))return d/2}return-1}function le(){A=t.panningEnabled(),w=t.zoomingEnabled(),P=t.boxSelectionEnabled(),t.zoomingEnabled(!1).panningEnabled(!1).boxSelectionEnabled(!1)}function ge(){t.zoomingEnabled(w).panningEnabled(A).boxSelectionEnabled(P)}null==oe&&(oe={}),oe.options=o;var ue=s((function(e,t,n,o){var i=e.data(a.syntax[t].weight),s=e.data(a.syntax[t].distance),d=a.convertToRelativePosition(e,o);i[n]=d.weight,s[n]=d.distance,e.data(a.syntax[t].weight,i),e.data(a.syntax[t].distance,s)}),5);A=t.panningEnabled(),w=t.zoomingEnabled(),P=t.boxSelectionEnabled();var he,ye,ve,fe,pe,xe,me,be,Ae,we=(Me=t.edges(":selected")).length;1===we&&(C=Me[0]),t.bind("zoom pan",u=function(){C&&ae()}),t.on("data","edge",(function(){C&&ae()})),t.on("style","edge.edgebendediting-hasbendpoints:selected, edge.edgecontrolediting-hascontrolpoints:selected",n=function(){setTimeout((function(){ae()}),50)}),t.on("remove","edge",l=function(){if(this.selected()){if(we-=1,t.startBatch(),C&&C.removeClass("cy-edge-editing-highlight"),1===we){var e=t.edges(":selected");1===e.length?(C=e[0]).addClass("cy-edge-editing-highlight"):C=void 0}else C=void 0;t.endBatch()}ae()}),t.on("add","edge",g=function(){this.selected()&&(we+=1,t.startBatch(),C&&C.removeClass("cy-edge-editing-highlight"),1===we?(C=this).addClass("cy-edge-editing-highlight"):C=void 0,t.endBatch()),ae()}),t.on("select","edge",h=function(){0!=this.target().connectedEdges().length&&0!=this.source().connectedEdges().length&&(we+=1,t.startBatch(),C&&C.removeClass("cy-edge-editing-highlight"),1===we?(C=this).addClass("cy-edge-editing-highlight"):C=void 0,t.endBatch(),ae())}),t.on("unselect","edge",y=function(){if(!t.autolock()){if(we-=1,t.startBatch(),C&&C.removeClass("cy-edge-editing-highlight"),1===we){var e=t.edges(":selected");1===e.length?(C=e[0]).addClass("cy-edge-editing-highlight"):C=void 0}else C=void 0;t.endBatch(),ae()}});var Pe,Ee,Ce,Te,Me,Ie=!1;t.on("tapstart",v=function(e){ye=e.position||e.cyPosition}),t.on("tapstart","edge",f=function(e){if(C&&C.id()===this.id()){ve=this;var n=a.getEdgeType(this);"inconclusive"===n&&(n="bend");var o=function(e,t,n){var o=de(n),i=n._private.rscratch.allpts,s={x:i[0],y:i[1]},a={x:i[i.length-2],y:i[i.length-1]};return se(s),se(a),re(e,t,o,s.x,s.y)?0:re(e,t,o,a.x,a.y)?1:-1}(ye.x,ye.y,this);if(0==o||1==o){this.unselect(),xe=o,be=0==o?ve.source():ve.target();var i=0==o?"source":"target",s=d.disconnectEdge(ve,t,e.renderedPosition,i);me=s.dummyNode,ve=s.edge,le()}else he=void 0,pe=!0}else pe=!1}),t.on("drag","node",b=function(e){t.edges().unselect(),this.selected()||t.nodes().unselect()}),t.on("tapdrag",p=function(e){t.edges(":selected").length>0&&t.autounselectify(!1);var n=ve;if(void 0===ve||!a.isIgnoredEdge(n)){var o=a.getEdgeType(n);if(pe&&!K&&"inconclusive"!==o){var i=a.syntax[o].weight,s=a.syntax[o].distance;fe={edge:n,type:o,weights:n.data(i)?[].concat(n.data(i)):[],distances:n.data(s)?[].concat(n.data(s)):[]},n.unselect(),he=a.addAnchorPoint(n,ye),ve=n,pe=void 0,Ie=!0,le()}if(K||void 0!==ve&&(void 0!==he||void 0!==xe)){var d=e.position||e.cyPosition;-1!=xe&&me?me.position(d):null!=he?ue(n,o,he,d):K&&(void 0===U.touchedAnchorIndex&&ye&&(U.touchedAnchorIndex=ce(ye.x,ye.y,U.edge)),void 0!==U.touchedAnchorIndex&&ue(U.edge,U.edgeType,U.touchedAnchorIndex,d)),e.target&&e.target[0]&&e.target.isNode()&&(Ae=e.target)}}}),t.on("tapend",x=function(e){T&&j.getStage().fire("contentMouseup");var n=ve||U.edge;if(void 0!==n){var o=U.touchedAnchorIndex;if(null!=o){var i,s=n.source().position("x"),r=n.source().position("y"),c=n.target().position("x"),l=n.target().position("y"),g=a.getAnchorsAsArray(n),u=[s,r].concat(g).concat([c,l]),h=o+1,y=h-1,v=h+1,f={x:u[2*h],y:u[2*h+1]},p={x:u[2*y],y:u[2*y+1]},x={x:u[2*v],y:u[2*v+1]};if(f.x===p.x&&f.y===p.y||f.x===p.x&&f.y===p.y)i=!0;else{var m,b=(p.y-x.y)/(p.x-x.x),A={srcPoint:p,tgtPoint:x,m1:b,m2:-1/b},w=a.getIntersection(n,f,A),P=Math.sqrt(Math.pow(f.x-w.x,2)+Math.pow(f.y-w.y,2));"bend"===(m=a.getEdgeType(n))&&P<ie().bendRemovalSensitivity&&(i=!0)}i&&a.removeAnchor(n,o)}else if(null!=me&&(0==xe||1==xe)){var E=be,C="valid",M=0==xe?"source":"target";if(Ae){var I=0==xe?Ae:n.source(),S=1==xe?Ae:n.target();"function"==typeof G&&(C=G(n,I,S)),E="valid"===C?Ae:be}I=0==xe?E:n.source(),S=1==xe?E:n.target();if(n=d.connectEdge(n,be,M),be.id()!==E.id())if("function"==typeof X){var R=X(I.id(),S.id(),n.data());if(R&&(d.copyEdge(n,R),a.initAnchorPoints(ie().bendPositionsFunction,ie().controlPositionsFunction,[R])),R&&ie().undoable){var D={newEdge:R,oldEdge:n};t.undoRedo().do("removeReconnectedEdge",D),n=R}else R&&(t.remove(n),n=R)}else{var O=0==xe?{source:E.id()}:{target:E.id()},F=0==xe?{source:be.id()}:{target:be.id()};if(ie().undoable&&E.id()!==be.id()){var k={edge:n,location:O,oldLoc:F};n=t.undoRedo().do("reconnectEdge",k).edge}}"valid"!==C&&"function"==typeof J&&J(),n.select(),t.remove(me)}}"inconclusive"===(m=a.getEdgeType(n))&&(m="bend"),void 0!==U.touchedAnchorIndex||Ie||(fe=void 0);var B=a.syntax[m].weight;void 0!==n&&void 0!==fe&&(n.data(B)?n.data(B).toString():null)!=fe.weights.toString()&&(Ie&&(n.select(),t.autounselectify(!0)),ie().undoable&&t.undoRedo().do("changeAnchorPoints",fe)),he=void 0,ve=void 0,fe=void 0,pe=void 0,xe=void 0,me=void 0,be=void 0,Ae=void 0,ye=void 0,Ie=!1,U.touchedAnchorIndex=void 0,ge(),setTimeout((function(){ae()}),50)}),t.on("edgeediting.movestart",(function(e,t){Te=!1,null!=t[0]&&t.forEach((function(e){null==a.getAnchorsAsArray(e)||Te||(Ee={x:a.getAnchorsAsArray(e)[0],y:a.getAnchorsAsArray(e)[1]},Pe={firstTime:!0,firstAnchorPosition:{x:Ee.x,y:Ee.y},edges:t},Ce=e,Te=!0)}))})),t.on("edgeediting.moveend",(function(e,n){if(null!=Pe){var o=Pe.firstAnchorPosition,i={x:a.getAnchorsAsArray(Ce)[0],y:a.getAnchorsAsArray(Ce)[1]};Pe.positionDiff={x:-i.x+o.x,y:-i.y+o.y},delete Pe.firstAnchorPosition,ie().undoable&&t.undoRedo().do("moveAnchorPoints",Pe),Pe=void 0}})),t.on("cxttap",m=function(e){var n,i,s=e.target||e.cyTarget,d=!1;try{d=s.isEdge()}catch(e){}d?(n=s,i=a.getEdgeType(n)):(n=U.edge,i=U.edgeType);var r=t.contextMenus("get");if(!C||C.id()!=n.id()||a.isIgnoredEdge(n)||C!==n)return r.hideMenuItem(S),r.hideMenuItem(I),r.hideMenuItem(O),void r.hideMenuItem(D);var c=e.position||e.cyPosition,l=ce(c.x,c.y,n);-1==l?(r.hideMenuItem(S),r.hideMenuItem(O),"control"===i&&d?(r.showMenuItem(D),r.hideMenuItem(I)):"bend"===i&&d?(r.showMenuItem(I),r.hideMenuItem(D)):d?(r.showMenuItem(I),r.showMenuItem(D)):(r.hideMenuItem(I),r.hideMenuItem(D)),a.currentCtxPos=c):(r.hideMenuItem(I),r.hideMenuItem(D),"control"===i?(r.showMenuItem(O),r.hideMenuItem(S),o.enableMultipleAnchorRemovalOption&&n.hasClass("edgecontrolediting-hasmultiplecontrolpoints")&&r.showMenuItem(F)):"bend"===i?(r.showMenuItem(S),r.hideMenuItem(O)):(r.hideMenuItem(S),r.hideMenuItem(O),r.hideMenuItem(F)),a.currentAnchorIndex=l),a.currentCtxEdge=n}),t.on("cyedgeediting.changeAnchorPoints","edge",(function(){t.startBatch(),t.edges().unselect(),t.trigger("bendPointMovement"),t.endBatch(),ae()}));var Se=!1,Re={37:!1,38:!1,39:!1,40:!1};document.addEventListener("keydown",(function(e){if("function"==typeof ie().moveSelectedAnchorsOnKeyEvents?ie().moveSelectedAnchorsOnKeyEvents():ie().moveSelectedAnchorsOnKeyEvents){var n,o,i=document.activeElement.tagName;if("TEXTAREA"!=i&&"INPUT"!=i){switch(e.keyCode){case 37:case 39:case 38:case 40:case 32:e.preventDefault()}if(e.keyCode<"37"||e.keyCode>"40")return;if(Re[e.keyCode]=!0,t.edges(":selected").length!=t.elements(":selected").length||1!=t.edges(":selected").length)return;Se||(Me=t.edges(":selected"),t.trigger("edgeediting.movestart",[Me]),Se=!0);var s=3;if(e.altKey&&e.shiftKey)return;e.altKey?s=1:e.shiftKey&&(s=10);var d=0,r=0;d+=Re[39]?s:0,d-=Re[37]?s:0,r+=Re[40]?s:0,r-=Re[38]?s:0,n={x:d,y:r},(o=Me).forEach((function(e){var t=a.getAnchorsAsArray(e),o=[];if(null!=t){for(var i=0;i<t.length;i+=2)o.push({x:t[i]+n.x,y:t[i+1]+n.y});var s=a.getEdgeType(e);if(a.edgeTypeInconclusiveShouldntHappen(s,"UiUtilities.js, moveAnchorPoints"))return;e.data(a.syntax[s].pointPos,o)}})),a.initAnchorPoints(ie().bendPositionsFunction,ie().controlPositionsFunction,o),t.trigger("bendPointMovement")}}}),!0),document.addEventListener("keyup",(function(e){e.keyCode<"37"||e.keyCode>"40"||(e.preventDefault(),Re[e.keyCode]=!1,("function"==typeof ie().moveSelectedAnchorsOnKeyEvents?ie().moveSelectedAnchorsOnKeyEvents():ie().moveSelectedAnchorsOnKeyEvents)&&(t.trigger("edgeediting.moveend",[Me]),Me=void 0,Se=!1))}),!0),M.data("cyedgeediting",oe)},unbind:function(){t.off("remove","node",l).off("add","node",g).off("style","edge.edgebendediting-hasbendpoints:selected, edge.edgecontrolediting-hascontrolpoints:selected",n).off("select","edge",h).off("unselect","edge",y).off("tapstart",v).off("tapstart","edge",f).off("tapdrag",p).off("tapend",x).off("cxttap",m).off("drag","node",b),t.unbind("zoom pan",u)}};return W[M]?W[M].apply($(t.container()),Array.prototype.slice.call(arguments,1)):"object"!=(void 0===M?"undefined":o(M))&&M?($.error("No such function `"+M+"` for cytoscape.js-edge-editing"),$(this)):W.init.apply($(t.container()),arguments)}},function(e,t,n){"use strict";e.exports={disconnectEdge:function(e,t,n,o){var i={data:{id:"nwt_reconnectEdge_dummy",ports:[]},style:{width:1,height:1,visibility:"hidden"},renderedPosition:n};t.add(i);var s="source"===o?{source:i.data.id}:{target:i.data.id};return e=e.move(s)[0],{dummyNode:t.nodes("#"+i.data.id)[0],edge:e}},connectEdge:function(e,t,n){if(e.isEdge()&&t.isNode()){var o={};if("source"===n)o.source=t.id();else{if("target"!==n)return;o.target=t.id()}return e.move(o)[0]}},copyEdge:function(e,t){this.copyAnchors(e,t),this.copyStyle(e,t)},copyStyle:function(e,t){e&&t&&(t.data("line-color",e.data("line-color")),t.data("width",e.data("width")),t.data("cardinality",e.data("cardinality")))},copyAnchors:function(e,t){if(e.hasClass("edgebendediting-hasbendpoints")){var n=e.data("cyedgebendeditingDistances"),o=e.data("cyedgebendeditingWeights");t.data("cyedgebendeditingDistances",n),t.data("cyedgebendeditingWeights",o),t.addClass("edgebendediting-hasbendpoints")}else if(e.hasClass("edgecontrolediting-hascontrolpoints")){n=e.data("cyedgecontroleditingDistances"),o=e.data("cyedgecontroleditingWeights");t.data("cyedgecontroleditingDistances",n),t.data("cyedgecontroleditingWeights",o),t.addClass("edgecontrolediting-hascontrolpoints")}e.hasClass("edgebendediting-hasmultiplebendpoints")?t.addClass("edgebendediting-hasmultiplebendpoints"):e.hasClass("edgecontrolediting-hasmultiplecontrolpoints")&&t.addClass("edgecontrolediting-hasmultiplecontrolpoints")}}},function(e,t,n){"use strict";e.exports=function(e,t,n){if(null!=e.undoRedo){var o=e.undoRedo({defaultActions:!1,isDebug:!0});o.action("changeAnchorPoints",i,i),o.action("moveAnchorPoints",s,s),o.action("reconnectEdge",a,a),o.action("removeReconnectedEdge",d,d)}function i(n){var o,i,s,a,d=e.getElementById(n.edge.id()),r="inconclusive"!==n.type?n.type:t.getEdgeType(d);"inconclusive"!==n.type||n.set?(s=t.syntax[r].weight,a=t.syntax[r].distance,o=n.set?d.data(s):n.weights,i=n.set?d.data(a):n.distances):(o=[],i=[]);var c={edge:d,type:r,weights:o,distances:i,set:!0};if(n.set){var l=n.weights&&n.weights.length>0,g=l&&n.weights.length>1;l?d.data(s,n.weights):d.removeData(s),l?d.data(a,n.distances):d.removeData(a);var u=t.syntax[r].class,h=t.syntax[r].multiClass;l||g?l&&!g?(d.addClass(u),d.removeClass(h)):d.addClass(u+" "+h):d.removeClass(u+" "+h),d.selected()?(d.unselect(),d.select()):d.select()}return d.trigger("cyedgeediting.changeAnchorPoints"),c}function s(e){if(e.firstTime)return delete e.firstTime,e;var o=e.edges,i=e.positionDiff,s={edges:o,positionDiff:{x:-i.x,y:-i.y}};return function(e,o){o.forEach((function(n){var o=t.getEdgeType(n),i=t.getAnchorsAsArray(n),s=[];if(null!=i){for(var a=0;a<i.length;a+=2)s.push({x:i[a]+e.x,y:i[a+1]+e.y});n.data(t.syntax[o].pointPos,s)}})),t.initAnchorPoints(n.bendPositionsFunction,n.controlPositionsFunction,o)}(i,o),s}function a(e){var t=e.edge,n=e.location,o=e.oldLoc,i={edge:t=t.move(n)[0],location:o,oldLoc:n};return t.unselect(),i}function d(t){var n=t.oldEdge;(o=e.getElementById(n.data("id")))&&o.length>0&&(n=o);var o,i=t.newEdge;return(o=e.getElementById(i.data("id")))&&o.length>0&&(i=o),n.inside()&&(n=n.remove()[0]),i.removed()&&(i=i.restore()).unselect(),{oldEdge:i,newEdge:n}}}}])}));