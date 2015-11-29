/*! bootstrap-commonmark-editor 0.4.0 Copyright (c) 2014, 2015 Mike Lowen */
!function(){var e=function(e,n){var t=function(t){var i=this,o=n.Parser(),l=n.HtmlRenderer();i.element=e('<div class="'+t+'"></div>'),i.hide=function(){i.element.hide()},i.show=function(){i.element.show()},i.toggle=function(){i.element.toggle()},i.visible=function(){i.element.is(":visible")},i.commonmark=function(e){i.element.html(l.render(o.parse(e)))},i.html=function(){i.element.html()}},i=function(n){var t=this,i={preview:"cm-editor-header-preview",edit:"cm-editor-header-edit",toggle:"cm-editor-header-toggle"};t.element=e('<div class="cm-editor-header"></div>'),t.on={preview:function(e){t.element.on(i.preview,e)},edit:function(e){t.element.on(i.edit,e)},toggle:function(e){t.element.on(i.toggle,e)}},t.trigger={preview:function(n){t.element.trigger(new e.Event(i.preview,n))},edit:function(n){t.element.trigger(new e.Event(i.edit,n))},toggle:function(n){t.element.trigger(new e.Event(i.toggle))}},t.toggle=function(){n.toggle&&(c.hasClass(r)?c.removeClass(r).addClass(a):c.removeClass(a).addClass(r)),l&&l.toggle(),o.toggle()};var o=e('<ul class="tabs"></ul>').append(e("<li></li>").append(e('<a href="#" class="active">Edit</a>').click(function(){return t.trigger.edit({element:this}),!1}))).append(e("<li></li>").append(e('<a href="#">Preview</a>').click(function(){return t.trigger.preview({element:this}),!1})));if(n.inline){var l=null;if(n.toggle){var r="glyphicon-pencil",a="glyphicon-remove",c=e('<span class="glyphicon"></span>').addClass(r),g=e('<a href="#" class="pull-right toggle"></a>').append(c);g.click(function(e){e.preventDefault(),t.trigger.toggle()}),t.element.append(g)}o.hide(),n.title&&(l=e('<strong class="title"></strong>').text(n.title),t.element.append(l))}n.header||t.element.addClass("transparent"),t.element.append(o);var d=function(n){t.element.find("li a.active").removeClass("active"),e(n.element).addClass("active")};t.on.edit(d),t.on.preview(d)},o=function(n){var i=this,o=null,l={change:"cm-editor-content-change"},r=e('<textarea class="form-control"></textarea>'),a=new t("preview");n.name&&r.attr("name",n.name),i.states={edit:1,preview:2},i.element=e('<div class="cm-editor-content"></div>').append(r).append(a.element),i.state=function(e){return"undefined"==typeof e?o:void(e!=o&&(o=e,o==i.states.edit?(r.show(),a.hide()):(r.hide(),a.show())))},i.text=function(e){return"undefined"==typeof e?r.val():void(r.val()!==e&&(r.val(e),r.change()))},i.show=function(){i.element.show()},i.hide=function(){i.element.hide()},i.toggle=function(){i.element.toggle()},i.on={change:function(e){i.element.on(l.change,e)}},i.trigger={change:function(n){i.element.trigger(new e.Event(l.change,n))}};var c=function(){var e=r.val();a.commonmark(e),i.trigger.change({text:e})};r.change(c).keydown(c).keyup(c),i.state(i.states.edit)},l=function(){var n=this,t="disabled",i=e('<button class="btn btn-default">Revert changes</button>'),o=e('<button class="btn btn-success pull-right">Save</button>'),l={save:"cm-editor-footer-save",revert:"cm-editor-footer-revert"};n.element=e('<div class="cm-editor-footer"></div>'),n.disable=function(){o.prop(t,!0),i.prop(t,!0)},n.enable=function(){o.prop(t,!1),i.prop(t,!1)},n.show=function(){n.element.show()},n.hide=function(){n.element.hide()},n.toggle=function(){n.element.toggle()},n.on={save:function(e){n.element.on(l.save,e)},revert:function(e){n.element.on(l.revert,e)}},n.trigger={save:function(){n.element.trigger(new e.Event(l.save))},revert:function(){n.element.trigger(new e.Event(l.revert))}},o.click(function(e){e.preventDefault(),n.trigger.save()}),i.click(function(e){e.preventDefault(),n.trigger.revert()}),n.element.append(i).append(o),n.disable()},r=function(n,r){var a=this,c="",g={change:"cm-editor-changed",inlineToggle:"cm-editor-inline-toggle"},d=function(){m.toggle(),u.toggle(),s.toggle(),r.save&&v.toggle(),a.trigger.inlineToggle()};a.element=e(n),a.text=function(e){return"undefined"==typeof e?c:void(c!==e&&(c=e,m.text(c),u&&u.commonmark(c),a.trigger.change({text:c})))},a.inline=function(e){if(!r.inline)return!1;var n=u.visible();return"undefined"==typeof e?n:void(n!=e&&d())},a.on={change:function(e){a.element.on(g.change,e)},inlineToggle:function(e){a.element.on(g.inlineToggle,e)}},a.trigger={change:function(n){a.element.trigger(new e.Event(g.change,n))},inlineToggle:function(){a.element.trigger(new e.Event(g.inlineToggle))}};var s=new i(r),m=new o(r),v=r.save?new l:null,u=r.inline?new t("inline-content"):null;s.on.edit(function(){m.state(m.states.edit)}),s.on.preview(function(){m.state(m.states.preview)}),m.on.change(function(e){r.save?e.text===c?v.disable():v.enable():a.text(e.text)}),r.save&&(v.on.save(function(){a.text(m.text())}),v.on.revert(function(){m.text(a.text())})),r.inline&&(m.hide(),r.save&&v.hide(),s.on.toggle(d));var f=e('<div class="cm-editor-body"></div>').append(m.element);v&&f.append(v.element),u&&f.append(u.element),a.element.addClass("commonmark-editor").append(s.element).append(f),a.text(r.text)};e.fn.commonMarkEditor=function(n){return n=e.extend({header:!0,inline:!1,name:null,save:!1,text:"",title:"",toggle:!0},n),this.map(function(e,t){return new r(t,n)})}},n="function"==typeof define&&define.amd;n&&define(["jquery","commonmark"],e),jQuery&&commonmark?e(jQuery,commonmark):n||console.log("Unavble to load dependency for Bootstrap Commonmark Editor.")}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC1jb21tb25tYXJrLWVkaXRvci5qcyIsInByZWZpeC5qcyIsInJlbmRlcmVyLmpzIiwiaGVhZGVyLmpzIiwiY29udGVudC5qcyIsImZvb3Rlci5qcyIsImVkaXRvci5qcyIsImJpbmRpbmcuanMiLCJzdWZmaXguanMiXSwibmFtZXMiOlsiaW5pdCIsIiQiLCJjb21tb25tYXJrIiwiUmVuZGVyZXIiLCJjbGFzc05hbWUiLCJzZWxmIiwidGhpcyIsInJlYWRlciIsIlBhcnNlciIsIndyaXRlciIsIkh0bWxSZW5kZXJlciIsImVsZW1lbnQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZSIsInZpc2libGUiLCJpcyIsInRleHQiLCJodG1sIiwicmVuZGVyIiwicGFyc2UiLCJIZWFkZXIiLCJvcHRpb25zIiwiZXZlbnRzIiwicHJldmlldyIsImVkaXQiLCJvbiIsImNhbGxiYWNrIiwidHJpZ2dlciIsImRhdGEiLCJFdmVudCIsImdseXBoIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2FuY2VsIiwidGl0bGUiLCJ0YWJzIiwiYXBwZW5kIiwiY2xpY2siLCJpbmxpbmUiLCJlIiwicHJldmVudERlZmF1bHQiLCJoZWFkZXIiLCJmaW5kIiwiQ29udGVudCIsInN0YXRlIiwiY2hhbmdlIiwidGV4dGFyZWEiLCJuYW1lIiwiYXR0ciIsInN0YXRlcyIsInMiLCJ2YWwiLCJvbkNoYW5nZSIsImtleWRvd24iLCJrZXl1cCIsIkZvb3RlciIsInByb3BlcnR5IiwicmV2ZXJ0Iiwic2F2ZSIsImRpc2FibGUiLCJwcm9wIiwiZW5hYmxlIiwiRWRpdG9yIiwiaW5saW5lVG9nZ2xlIiwidG9nZ2xlSW5saW5lIiwiY29udGVudCIsImlubGluZUNvbnRlbnQiLCJmb290ZXIiLCJ2YWx1ZSIsImlzSW5saW5lIiwiYm9keSIsImZuIiwiY29tbW9uTWFya0VkaXRvciIsImV4dGVuZCIsIm1hcCIsImluZGV4IiwiaXRlbSIsImFtZEF2YWlsYWJsZSIsImRl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QSxjQUFBaEYsR0FFQWtGLFFBQUFoRixXQUNBRixFQUFBa0YsT0FBQWhGLFlBQ0E2RSxHQUNBSSxRQUFBQyxJQUFBIiwiZmlsZSI6ImJvb3RzdHJhcC1jb21tb25tYXJrLWVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbbnVsbCwiKGZ1bmN0aW9uKCkge1xyXG5cdHZhciBpbml0ID0gZnVuY3Rpb24oJCwgY29tbW9ubWFyaykgeyIsInZhciBSZW5kZXJlciA9IGZ1bmN0aW9uKGNsYXNzTmFtZSkge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHRcclxuXHR2YXIgcmVhZGVyID0gY29tbW9ubWFyay5QYXJzZXIoKTtcclxuXHR2YXIgd3JpdGVyID0gY29tbW9ubWFyay5IdG1sUmVuZGVyZXIoKTtcclxuXHJcblx0c2VsZi5lbGVtZW50ID0gJCgnPGRpdiBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCI+PC9kaXY+Jyk7XHJcblxyXG5cdHNlbGYuaGlkZSA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQuaGlkZSgpOyB9O1xyXG5cdHNlbGYuc2hvdyA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQuc2hvdygpOyB9O1xyXG5cdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC50b2dnbGUoKTsgfTtcclxuXHRzZWxmLnZpc2libGUgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LmlzKCc6dmlzaWJsZScpOyB9O1xyXG5cdFxyXG5cdHNlbGYuY29tbW9ubWFyayA9IGZ1bmN0aW9uKHRleHQpIHtcclxuXHRcdHNlbGYuZWxlbWVudC5odG1sKHdyaXRlci5yZW5kZXIocmVhZGVyLnBhcnNlKHRleHQpKSk7XHJcblx0fTtcclxuXHRcclxuXHRzZWxmLmh0bWwgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50Lmh0bWwoKTsgfTtcclxufTsiLCJ2YXIgSGVhZGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR2YXIgZXZlbnRzID0geyBwcmV2aWV3OiAnY20tZWRpdG9yLWhlYWRlci1wcmV2aWV3JywgZWRpdDogJ2NtLWVkaXRvci1oZWFkZXItZWRpdCcsIHRvZ2dsZTogJ2NtLWVkaXRvci1oZWFkZXItdG9nZ2xlJyB9O1xyXG5cdFxyXG5cdC8qIFB1YmxpYyBBUEkgKi9cclxuXHRzZWxmLmVsZW1lbnQgPSAkKCc8ZGl2IGNsYXNzPVwiY20tZWRpdG9yLWhlYWRlclwiPjwvZGl2PicpO1xyXG5cdFxyXG5cdC8vIEV2ZW50c1xyXG5cdHNlbGYub24gPSB7XHJcblx0XHRwcmV2aWV3OiBmdW5jdGlvbihjYWxsYmFjaykgeyBzZWxmLmVsZW1lbnQub24oZXZlbnRzLnByZXZpZXcsIGNhbGxiYWNrKTsgfSxcclxuXHRcdGVkaXQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMuZWRpdCwgY2FsbGJhY2spOyB9LFxyXG5cdFx0dG9nZ2xlOiBmdW5jdGlvbihjYWxsYmFjaykgeyBzZWxmLmVsZW1lbnQub24oZXZlbnRzLnRvZ2dsZSwgY2FsbGJhY2spOyB9XHJcblx0fTtcclxuXHRcclxuXHRzZWxmLnRyaWdnZXIgPSB7XHJcblx0XHRwcmV2aWV3OiBmdW5jdGlvbihkYXRhKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy5wcmV2aWV3LCBkYXRhKSk7IH0sXHJcblx0XHRlZGl0OiBmdW5jdGlvbihkYXRhKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy5lZGl0LCBkYXRhKSk7IH0sXHJcblx0XHR0b2dnbGU6IGZ1bmN0aW9uKGRhdGEpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLnRvZ2dsZSkpOyB9XHJcblx0fTtcclxuXHRcclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYob3B0aW9ucy50b2dnbGUpIHtcclxuXHRcdFx0aWYoZ2x5cGguaGFzQ2xhc3MoZWRpdCkpIHtcclxuXHRcdFx0XHRnbHlwaC5yZW1vdmVDbGFzcyhlZGl0KS5hZGRDbGFzcyhjYW5jZWwpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGdseXBoLnJlbW92ZUNsYXNzKGNhbmNlbCkuYWRkQ2xhc3MoZWRpdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcclxuXHRcdGlmKHRpdGxlKSB0aXRsZS50b2dnbGUoKTtcclxuXHRcclxuXHRcdHRhYnMudG9nZ2xlKCk7XHJcblx0fTtcclxuXHRcclxuXHQvKiBDb25zdHJ1Y3RvciAqL1xyXG5cdFxyXG5cdHZhciB0YWJzID0gJCgnPHVsIGNsYXNzPVwidGFic1wiPjwvdWw+JylcclxuXHRcdC5hcHBlbmQoXHJcblx0XHRcdCQoJzxsaT48L2xpPicpLmFwcGVuZChcclxuXHRcdFx0XHQkKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCI+RWRpdDwvYT4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNlbGYudHJpZ2dlci5lZGl0KHsgZWxlbWVudDogdGhpcyB9KTtcclxuXHRcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpXHJcblx0XHQpXHJcblx0XHQuYXBwZW5kKFxyXG5cdFx0XHQkKCc8bGk+PC9saT4nKS5hcHBlbmQoXHJcblx0XHRcdFx0JCgnPGEgaHJlZj1cIiNcIj5QcmV2aWV3PC9hPicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0c2VsZi50cmlnZ2VyLnByZXZpZXcoeyBlbGVtZW50OiB0aGlzIH0pO1xyXG5cdFxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdClcclxuXHRcdCk7XHJcblx0XHJcblx0aWYob3B0aW9ucy5pbmxpbmUpIHtcclxuXHRcdHZhciB0aXRsZSA9IG51bGw7XHJcblx0XHJcblx0XHRpZihvcHRpb25zLnRvZ2dsZSkge1xyXG5cdFx0XHR2YXIgZWRpdCA9ICdnbHlwaGljb24tcGVuY2lsJztcclxuXHRcdFx0dmFyIGNhbmNlbCA9ICdnbHlwaGljb24tcmVtb3ZlJztcclxuXHRcclxuXHRcdFx0dmFyIGdseXBoID0gJCgnPHNwYW4gY2xhc3M9XCJnbHlwaGljb25cIj48L3NwYW4+JykuYWRkQ2xhc3MoZWRpdCk7XHJcblx0XHRcdHZhciB0b2dnbGUgPSAkKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwicHVsbC1yaWdodCB0b2dnbGVcIj48L2E+JykuYXBwZW5kKGdseXBoKTtcclxuXHRcclxuXHRcdFx0dG9nZ2xlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0c2VsZi50cmlnZ2VyLnRvZ2dsZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0c2VsZi5lbGVtZW50LmFwcGVuZCh0b2dnbGUpO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0dGFicy5oaWRlKCk7XHJcblx0XHJcblx0XHRpZihvcHRpb25zLnRpdGxlKSB7XHJcblx0XHRcdHRpdGxlID0gJCgnPHN0cm9uZyBjbGFzcz1cInRpdGxlXCI+PC9zdHJvbmc+JykudGV4dChvcHRpb25zLnRpdGxlKTtcclxuXHRcdFx0c2VsZi5lbGVtZW50LmFwcGVuZCh0aXRsZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGlmKCFvcHRpb25zLmhlYWRlcilcclxuXHRcdHNlbGYuZWxlbWVudC5hZGRDbGFzcygndHJhbnNwYXJlbnQnKTtcclxuXHRcclxuXHRzZWxmLmVsZW1lbnQuYXBwZW5kKHRhYnMpO1xyXG5cdFxyXG5cdC8vIFRpZSB1cCBpbnRlcm5hbCBldmVudHNcclxuXHR2YXIgY2xpY2sgPSBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRzZWxmLmVsZW1lbnQuZmluZCgnbGkgYS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHQkKGRhdGEuZWxlbWVudCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdH07XHJcblx0XHJcblx0c2VsZi5vbi5lZGl0KGNsaWNrKTtcclxuXHRzZWxmLm9uLnByZXZpZXcoY2xpY2spO1xyXG59IiwidmFyIENvbnRlbnQgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHZhciBzdGF0ZSA9IG51bGw7XHJcblx0dmFyIGV2ZW50cyA9IHsgY2hhbmdlOiAnY20tZWRpdG9yLWNvbnRlbnQtY2hhbmdlJyB9O1xyXG5cclxuXHR2YXIgdGV4dGFyZWEgPSAkKCc8dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj48L3RleHRhcmVhPicpO1xyXG5cdHZhciBwcmV2aWV3ID0gbmV3IFJlbmRlcmVyKCdwcmV2aWV3Jyk7Ly8gJCgnPGRpdiBjbGFzcz1cInByZXZpZXdcIj48L2Rpdj4nKTtcclxuXHJcblx0aWYob3B0aW9ucy5uYW1lKVxyXG5cdFx0dGV4dGFyZWEuYXR0cignbmFtZScsIG9wdGlvbnMubmFtZSk7XHJcblxyXG5cdC8qIFB1YmxpYyBBUEkgKi9cclxuXHRzZWxmLnN0YXRlcyA9IHsgZWRpdDogMSwgcHJldmlldzogMiB9XHJcblx0c2VsZi5lbGVtZW50ID0gJCgnPGRpdiBjbGFzcz1cImNtLWVkaXRvci1jb250ZW50XCI+PC9kaXY+JylcclxuXHRcdC5hcHBlbmQodGV4dGFyZWEpXHJcblx0XHQuYXBwZW5kKHByZXZpZXcuZWxlbWVudCk7XHJcblxyXG5cdC8vIE1ldGhvZHNcclxuXHRzZWxmLnN0YXRlID0gZnVuY3Rpb24ocykge1xyXG5cdFx0aWYodHlwZW9mIHMgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gc3RhdGU7XHJcblx0XHRpZihzID09IHN0YXRlKSByZXR1cm47XHJcblxyXG5cdFx0c3RhdGUgPSBzO1xyXG5cclxuXHRcdGlmKHN0YXRlID09IHNlbGYuc3RhdGVzLmVkaXQpIHtcclxuXHRcdFx0dGV4dGFyZWEuc2hvdygpO1xyXG5cdFx0XHRwcmV2aWV3LmhpZGUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRleHRhcmVhLmhpZGUoKTtcclxuXHRcdFx0cHJldmlldy5zaG93KCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi50ZXh0ID0gZnVuY3Rpb24odGV4dCkge1xyXG5cdFx0aWYodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGV4dGFyZWEudmFsKCk7XHJcblxyXG5cdFx0Ly8gTGV0cyBub3QgY2F1c2UgdW5uZWNlc3NhcnkgcmVzZXR0aW5nIG9mIHRleHQgYW5kIGZpcmUgdW5uZWVkZWQgZXZlbnRzLlxyXG5cdFx0aWYodGV4dGFyZWEudmFsKCkgPT09IHRleHQpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR0ZXh0YXJlYS52YWwodGV4dCk7XHJcblx0XHR0ZXh0YXJlYS5jaGFuZ2UoKTtcclxuXHR9XHJcblxyXG5cdHNlbGYuc2hvdyA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQuc2hvdygpOyB9O1xyXG5cdHNlbGYuaGlkZSA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQuaGlkZSgpOyB9O1xyXG5cdHNlbGYudG9nZ2xlID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC50b2dnbGUoKTsgfTtcclxuXHJcblx0Ly8gRXZlbnRzXHJcblx0c2VsZi5vbiA9IHsgY2hhbmdlOiBmdW5jdGlvbihjYWxsYmFjaykgeyBzZWxmLmVsZW1lbnQub24oZXZlbnRzLmNoYW5nZSwgY2FsbGJhY2spOyB9IH07XHJcblx0c2VsZi50cmlnZ2VyID0geyBjaGFuZ2U6IGZ1bmN0aW9uKGRhdGEpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLmNoYW5nZSwgZGF0YSkpOyB9IH07XHJcblxyXG5cdC8vIENvbnN0cnVjdFxyXG5cclxuXHR2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB0ZXh0ID0gdGV4dGFyZWEudmFsKCk7XHJcblxyXG5cdFx0cHJldmlldy5jb21tb25tYXJrKHRleHQpO1xyXG5cdFx0c2VsZi50cmlnZ2VyLmNoYW5nZSh7IHRleHQ6IHRleHQgfSk7XHJcblx0fTtcclxuXHJcblx0dGV4dGFyZWEuY2hhbmdlKG9uQ2hhbmdlKS5rZXlkb3duKG9uQ2hhbmdlKS5rZXl1cChvbkNoYW5nZSk7XHJcblxyXG5cdHNlbGYuc3RhdGUoc2VsZi5zdGF0ZXMuZWRpdCk7XHJcbn0iLCJ2YXIgRm9vdGVyID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHZhciBwcm9wZXJ0eSA9ICdkaXNhYmxlZCc7XHJcblx0dmFyIHJldmVydCA9ICQoJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj5SZXZlcnQgY2hhbmdlczwvYnV0dG9uPicpO1xyXG5cdHZhciBzYXZlID0gJCgnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBwdWxsLXJpZ2h0XCI+U2F2ZTwvYnV0dG9uPicpO1xyXG5cdHZhciBldmVudHMgPSB7IHNhdmU6ICdjbS1lZGl0b3ItZm9vdGVyLXNhdmUnLCByZXZlcnQ6ICdjbS1lZGl0b3ItZm9vdGVyLXJldmVydCcgfTtcclxuXHJcblx0LyogUHVibGljIEFQSSAqL1xyXG5cdHNlbGYuZWxlbWVudCA9ICQoJzxkaXYgY2xhc3M9XCJjbS1lZGl0b3ItZm9vdGVyXCI+PC9kaXY+Jyk7XHJcblxyXG5cdC8vIE1ldGhvZHNcclxuXHRzZWxmLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNhdmUucHJvcChwcm9wZXJ0eSwgdHJ1ZSk7XHJcblx0XHRyZXZlcnQucHJvcChwcm9wZXJ0eSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5lbmFibGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdHNhdmUucHJvcChwcm9wZXJ0eSwgZmFsc2UpO1xyXG5cdFx0cmV2ZXJ0LnByb3AocHJvcGVydHksIGZhbHNlKTtcclxuXHR9O1xyXG5cclxuXHRzZWxmLnNob3cgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnNob3coKTsgfTtcclxuXHRzZWxmLmhpZGUgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LmhpZGUoKTsgfTtcclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQudG9nZ2xlKCk7IH07XHJcblxyXG5cdC8vIEV2ZW50c1xyXG5cdHNlbGYub24gPSB7XHJcblx0XHRzYXZlOiBmdW5jdGlvbihjYWxsYmFjaykgeyBzZWxmLmVsZW1lbnQub24oZXZlbnRzLnNhdmUsIGNhbGxiYWNrKTsgfSxcclxuXHRcdHJldmVydDogZnVuY3Rpb24oY2FsbGJhY2spIHsgc2VsZi5lbGVtZW50Lm9uKGV2ZW50cy5yZXZlcnQsIGNhbGxiYWNrKTsgfSxcclxuXHR9O1xyXG5cclxuXHRzZWxmLnRyaWdnZXIgPSB7XHJcblx0XHRzYXZlOiBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLnNhdmUpKTsgfSxcclxuXHRcdHJldmVydDogZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy5yZXZlcnQpKTsgfSxcclxuXHR9O1xyXG5cclxuXHQvKiBDb25zdHJ1Y3QgKi9cclxuXHRzYXZlLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHNlbGYudHJpZ2dlci5zYXZlKCk7XHJcblx0fSk7XHJcblxyXG5cdHJldmVydC5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRzZWxmLnRyaWdnZXIucmV2ZXJ0KCk7XHJcblx0fSk7XHJcblxyXG5cdHNlbGYuZWxlbWVudC5hcHBlbmQocmV2ZXJ0KS5hcHBlbmQoc2F2ZSk7XHJcblx0c2VsZi5kaXNhYmxlKCk7XHJcbn07IiwidmFyIEVkaXRvciA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIHRleHQgPSAnJztcclxuXHJcblx0dmFyIGV2ZW50cyA9IHsgY2hhbmdlOiAnY20tZWRpdG9yLWNoYW5nZWQnLCBpbmxpbmVUb2dnbGU6ICdjbS1lZGl0b3ItaW5saW5lLXRvZ2dsZScgfTtcclxuXHJcblx0LyogVXRpbGl0eSBmdW5jdGlvbnMgKi9cclxuXHR2YXIgdG9nZ2xlSW5saW5lID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb250ZW50LnRvZ2dsZSgpO1xyXG5cdFx0aW5saW5lQ29udGVudC50b2dnbGUoKTtcclxuXHRcdGhlYWRlci50b2dnbGUoKTtcclxuXHJcblx0XHRpZihvcHRpb25zLnNhdmUpXHJcblx0XHRcdGZvb3Rlci50b2dnbGUoKTtcclxuXHJcblx0XHRzZWxmLnRyaWdnZXIuaW5saW5lVG9nZ2xlKCk7XHJcblx0fTtcclxuXHJcblx0LyogUHVibGljIEFQSSAqL1xyXG5cdHNlbGYuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcblxyXG5cdC8vIE1ldGhvZHNcclxuXHRzZWxmLnRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0aWYodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJylcclxuXHRcdFx0cmV0dXJuIHRleHQ7XHJcblxyXG5cdFx0aWYodGV4dCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcblx0XHR0ZXh0ID0gdmFsdWU7XHJcblx0XHRjb250ZW50LnRleHQodGV4dCk7XHJcblxyXG5cdFx0aWYoaW5saW5lQ29udGVudClcclxuXHRcdFx0aW5saW5lQ29udGVudC5jb21tb25tYXJrKHRleHQpO1xyXG5cclxuXHRcdHNlbGYudHJpZ2dlci5jaGFuZ2UoeyB0ZXh0OiB0ZXh0IH0pO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuaW5saW5lID0gZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdGlmKCFvcHRpb25zLmlubGluZSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHZhciBpc0lubGluZSA9IGlubGluZUNvbnRlbnQudmlzaWJsZSgpO1xyXG5cclxuXHRcdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHJldHVybiBpc0lubGluZTtcclxuXHJcblx0XHRpZihpc0lubGluZSAhPSB2YWx1ZSlcclxuXHRcdFx0dG9nZ2xlSW5saW5lKCk7XHJcblx0fTtcclxuXHJcblx0Ly8gRXZlbnRzXHJcblxyXG5cdHNlbGYub24gPSB7XHJcblx0XHRjaGFuZ2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMuY2hhbmdlLCBjYWxsYmFjayk7IH0sXHJcblx0XHRpbmxpbmVUb2dnbGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMuaW5saW5lVG9nZ2xlLCBjYWxsYmFjayk7IH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLnRyaWdnZXIgPSB7XHJcblx0XHRjaGFuZ2U6IGZ1bmN0aW9uKGRhdGEpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLmNoYW5nZSwgZGF0YSkpOyB9LFxyXG5cdFx0aW5saW5lVG9nZ2xlOiBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLmlubGluZVRvZ2dsZSkpOyB9XHJcblx0fTtcclxuXHJcblx0LyogQ29uc3RydWN0b3IgKi9cclxuXHR2YXIgaGVhZGVyID0gbmV3IEhlYWRlcihvcHRpb25zKTtcclxuXHR2YXIgY29udGVudCA9IG5ldyBDb250ZW50KG9wdGlvbnMpO1xyXG5cdHZhciBmb290ZXIgPSBvcHRpb25zLnNhdmUgPyBuZXcgRm9vdGVyKCkgOiBudWxsO1xyXG5cdHZhciBpbmxpbmVDb250ZW50ID0gb3B0aW9ucy5pbmxpbmUgPyBuZXcgUmVuZGVyZXIoJ2lubGluZS1jb250ZW50JykgOiBudWxsO1xyXG5cclxuXHQvLyBTdWJzY3JpYmUgdG8gZXZlbnRzXHJcblxyXG5cdGhlYWRlci5vbi5lZGl0KGZ1bmN0aW9uKCkgeyBjb250ZW50LnN0YXRlKGNvbnRlbnQuc3RhdGVzLmVkaXQpOyB9KTtcclxuXHRoZWFkZXIub24ucHJldmlldyhmdW5jdGlvbigpIHsgY29udGVudC5zdGF0ZShjb250ZW50LnN0YXRlcy5wcmV2aWV3KTsgfSk7XHJcblxyXG5cdGNvbnRlbnQub24uY2hhbmdlKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGlmKG9wdGlvbnMuc2F2ZSkge1xyXG5cdFx0XHRpZihkYXRhLnRleHQgPT09IHRleHQpIGZvb3Rlci5kaXNhYmxlKCk7XHJcblx0XHRcdGVsc2UgZm9vdGVyLmVuYWJsZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2VsZi50ZXh0KGRhdGEudGV4dCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGlmKG9wdGlvbnMuc2F2ZSkge1xyXG5cdFx0Zm9vdGVyLm9uLnNhdmUoZnVuY3Rpb24oKSB7IHNlbGYudGV4dChjb250ZW50LnRleHQoKSk7IH0pO1xyXG5cdFx0Zm9vdGVyLm9uLnJldmVydChmdW5jdGlvbigpIHsgY29udGVudC50ZXh0KHNlbGYudGV4dCgpKTsgfSk7XHJcblx0fVxyXG5cclxuXHRpZihvcHRpb25zLmlubGluZSkge1xyXG5cdFx0Y29udGVudC5oaWRlKCk7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5zYXZlKVxyXG5cdFx0XHRmb290ZXIuaGlkZSgpO1xyXG5cclxuXHRcdGhlYWRlci5vbi50b2dnbGUodG9nZ2xlSW5saW5lKTtcclxuXHR9XHJcblxyXG5cdC8vIEFkZCBhbGwgdGhlIGVsZW1lbnRzXHJcblx0dmFyIGJvZHkgPSAkKCc8ZGl2IGNsYXNzPVwiY20tZWRpdG9yLWJvZHlcIj48L2Rpdj4nKS5hcHBlbmQoY29udGVudC5lbGVtZW50KTtcclxuXHJcblx0aWYoZm9vdGVyKVxyXG5cdFx0Ym9keS5hcHBlbmQoZm9vdGVyLmVsZW1lbnQpO1xyXG5cclxuXHRpZihpbmxpbmVDb250ZW50KVxyXG5cdFx0Ym9keS5hcHBlbmQoaW5saW5lQ29udGVudC5lbGVtZW50KTtcclxuXHJcblx0c2VsZi5lbGVtZW50LmFkZENsYXNzKCdjb21tb25tYXJrLWVkaXRvcicpXHJcblx0XHQuYXBwZW5kKGhlYWRlci5lbGVtZW50KVxyXG5cdFx0LmFwcGVuZChib2R5KTtcclxuXHJcblx0c2VsZi50ZXh0KG9wdGlvbnMudGV4dCk7XHJcbn0iLCIkLmZuLmNvbW1vbk1hcmtFZGl0b3IgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuXHRcdGhlYWRlcjogdHJ1ZSxcclxuXHRcdGlubGluZTogZmFsc2UsXHJcblx0XHRuYW1lOiBudWxsLFxyXG5cdFx0c2F2ZTogZmFsc2UsXHJcblx0XHR0ZXh0OiAnJyxcclxuXHRcdHRpdGxlOiAnJyxcclxuXHRcdHRvZ2dsZTogdHJ1ZVxyXG5cdH0sIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHsgcmV0dXJuIG5ldyBFZGl0b3IoaXRlbSwgb3B0aW9ucyk7IH0pO1xyXG59OyIsIlx0fTtcclxuXHJcblx0dmFyIGFtZEF2YWlsYWJsZSA9IHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZDsgXHJcblxyXG5cdGlmKGFtZEF2YWlsYWJsZSlcclxuXHRcdGRlZmluZShbICdqcXVlcnknLCAnY29tbW9ubWFyaycgXSwgaW5pdCk7XHJcblx0XHJcblx0aWYoalF1ZXJ5ICYmIGNvbW1vbm1hcmspXHJcblx0XHRpbml0KGpRdWVyeSwgY29tbW9ubWFyaylcclxuXHRlbHNlIGlmKCFhbWRBdmFpbGFibGUpXHJcblx0XHRjb25zb2xlLmxvZygnVW5hdmJsZSB0byBsb2FkIGRlcGVuZGVuY3kgZm9yIEJvb3RzdHJhcCBDb21tb25tYXJrIEVkaXRvci4nKTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
