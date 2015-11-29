/*! bootstrap-commonmark-editor 0.4.0 Copyright (c) 2014, 2015 Mike Lowen */
!function(){var e=function(e,n){var t=function(t){var i=this,o=n.Parser(),l=n.HtmlRenderer();i.element=e('<div class="'+t+'"></div>'),i.hide=function(){i.element.hide()},i.show=function(){i.element.show()},i.toggle=function(){i.element.toggle()},i.visible=function(){i.element.is(":visible")},i.commonmark=function(e){i.element.html(l.render(o.parse(e)))},i.html=function(){i.element.html()}},i=function(n){var t=this,i={preview:"cm-editor-header-preview",edit:"cm-editor-header-edit",toggle:"cm-editor-header-toggle"};t.element=e('<div class="cm-editor-header"></div>'),t.on={preview:function(e){t.element.on(i.preview,e)},edit:function(e){t.element.on(i.edit,e)},toggle:function(e){t.element.on(i.toggle,e)}},t.trigger={preview:function(n){t.element.trigger(new e.Event(i.preview,n))},edit:function(n){t.element.trigger(new e.Event(i.edit,n))},toggle:function(n){t.element.trigger(new e.Event(i.toggle))}},t.toggle=function(){n.toggle&&(c.hasClass(r)?c.removeClass(r).addClass(a):c.removeClass(a).addClass(r)),l&&l.toggle(),o.toggle()};var o=e('<ul class="tabs"></ul>').append(e("<li></li>").append(e('<a href="#" class="active">Edit</a>').click(function(){return t.trigger.edit({element:this}),!1}))).append(e("<li></li>").append(e('<a href="#">Preview</a>').click(function(){return t.trigger.preview({element:this}),!1})));if(n.inline){var l=null;if(n.toggle){var r="glyphicon-pencil",a="glyphicon-remove",c=e('<span class="glyphicon"></span>').addClass(r),g=e('<a href="#" class="pull-right toggle"></a>').append(c);g.click(function(e){e.preventDefault(),t.trigger.toggle()}),t.element.append(g)}o.hide(),n.title&&(l=e('<strong class="title"></strong>').text(n.title),t.element.append(l))}n.header||t.element.addClass("transparent"),t.element.append(o);var d=function(n){t.element.find("li a.active").removeClass("active"),e(n.element).addClass("active")};t.on.edit(d),t.on.preview(d)},o=function(n){var i=this,o=null,l={change:"cm-editor-content-change"},r=e('<textarea class="form-control"></textarea>'),a=new t("preview");n.name&&r.attr("name",n.name),i.states={edit:1,preview:2},i.element=e('<div class="cm-editor-content"></div>').append(r).append(a.element),i.state=function(e){return"undefined"==typeof e?o:void(e!=o&&(o=e,o==i.states.edit?(r.show(),a.hide()):(r.hide(),a.show())))},i.val=function(e){return"undefined"!=typeof e&&r.val()!==e&&(r.val(e),r.change()),r.val()},i.html=function(){return a.html()},i.show=function(){i.element.show()},i.hide=function(){i.element.hide()},i.toggle=function(){i.element.toggle()},i.on={change:function(e){i.element.on(l.change,e)}},i.trigger={change:function(n){i.element.trigger(new e.Event(l.change,n))}};var c=function(){var e=r.val();a.commonmark(e),i.trigger.change({text:e})};r.change(c).keydown(c).keyup(c),i.state(i.states.edit)},l=function(){var n=this,t="disabled",i=e('<button class="btn btn-default">Revert changes</button>'),o=e('<button class="btn btn-success pull-right">Save</button>'),l={save:"cm-editor-footer-save",revert:"cm-editor-footer-revert"};n.element=e('<div class="cm-editor-footer"></div>'),n.disable=function(){o.prop(t,!0),i.prop(t,!0)},n.enable=function(){o.prop(t,!1),i.prop(t,!1)},n.show=function(){n.element.show()},n.hide=function(){n.element.hide()},n.toggle=function(){n.element.toggle()},n.on={save:function(e){n.element.on(l.save,e)},revert:function(e){n.element.on(l.revert,e)}},n.trigger={save:function(){n.element.trigger(new e.Event(l.save))},revert:function(){n.element.trigger(new e.Event(l.revert))}},o.click(function(e){e.preventDefault(),n.trigger.save()}),i.click(function(e){e.preventDefault(),n.trigger.revert()}),n.element.append(i).append(o),n.disable()},r=function(n,r){var a=this,c="",g={change:"cm-editor-changed",inlineToggle:"cm-editor-inline-toggle"},d=function(){m.toggle(),v.toggle(),s.toggle(),r.save&&u.toggle(),a.trigger.inlineToggle()};a.element=e(n),a.text=function(e){return"undefined"==typeof e?c:void(c!==e&&(c=e,m.val(c),v&&v.commonmark(c),a.trigger.change({text:c})))},a.inline=function(e){if(!r.inline)return!1;var n=v.visible();return"undefined"==typeof e?n:void(n!=e&&d())},a.on={change:function(e){a.element.on(g.change,e)},inlineToggle:function(e){a.element.on(g.inlineToggle,e)}},a.trigger={change:function(n){a.element.trigger(new e.Event(g.change,n))},inlineToggle:function(){a.element.trigger(new e.Event(g.inlineToggle))}};var s=new i(r),m=new o(r),u=r.save?new l:null,v=r.inline?new t("inline-content"):null;s.on.edit(function(){m.state(m.states.edit)}),s.on.preview(function(){m.state(m.states.preview)}),m.on.change(function(e){r.save?e.text===c?u.disable():u.enable():a.text(e.text)}),r.save&&(u.on.save(function(){a.text(m.text())}),u.on.revert(function(){m.text(a.text())})),r.inline&&(m.hide(),r.save&&u.hide(),s.on.toggle(d));var f=e('<div class="cm-editor-body"></div>').append(m.element);u&&f.append(u.element),v&&f.append(v.element),a.element.addClass("commonmark-editor").append(s.element).append(f),a.text(r.text)};e.fn.commonMarkEditor=function(n){return n=e.extend({header:!0,inline:!1,name:null,save:!1,text:"",title:"",toggle:!0},n),this.map(function(e,t){return new r(t,n)})}},n="function"==typeof define&&define.amd;n&&define(["jquery","commonmark"],e),jQuery&&commonmark?e(jQuery,commonmark):n||console.log("Unavble to load dependency for Bootstrap Commonmark Editor.")}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC1jb21tb25tYXJrLWVkaXRvci5qcyIsInByZWZpeC5qcyIsInJlbmRlcmVyLmpzIiwiaGVhZGVyLmpzIiwiY29udGVudC5qcyIsImZvb3Rlci5qcyIsImVkaXRvci5qcyIsImJpbmRpbmcuanMiLCJzdWZmaXguanMiXSwibmFtZXMiOlsiaW5pdCIsIiQiLCJjb21tb25tYXJrIiwiUmVuZGVyZXIiLCJjbGFzc05hbWUiLCJzZWxmIiwidGhpcyIsInJlYWRlciIsIlBhcnNlciIsIndyaXRlciIsIkh0bWxSZW5kZXJlciIsImVsZW1lbnQiLCJoaWRlIiwic2hvdyIsInRvZ2dsZSIsInZpc2libGUiLCJpcyIsInRleHQiLCJodG1sIiwicmVuZGVyIiwicGFyc2UiLCJIZWFkZXIiLCJvcHRpb25zIiwiZXZlbnRzIiwicHJldmlldyIsImVkaXQiLCJvbiIsImNhbGxiYWNrIiwidHJpZ2dlciIsImRhdGEiLCJFdmVudCIsImdseXBoIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY2FuY2VsIiwidGl0bGUiLCJ0YWJzIiwiYXBwZW5kIiwiY2xpY2siLCJpbmxpbmUiLCJlIiwicHJldmVudERlZmF1bHQiLCJoZWFkZXIiLCJmaW5kIiwiQ29udGVudCIsInN0YXRlIiwiY2hhbmdlIiwidGV4dGFyZWEiLCJuYW1lIiwiYXR0ciIsInN0YXRlcyIsInMiLCJ2YWwiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwia2V5ZG93biIsImtleXVwIiwiRm9vdGVyIiwicHJvcGVydHkiLCJyZXZlcnQiLCJzYXZlIiwiZGlzYWJsZSIsInByb3AiLCJlbmFibGUiLCJFZGl0b3IiLCJpbmxpbmVUb2dnbGUiLCJ0b2dnbGVJbmxpbmUiLCJjb250ZW50IiwiaW5saW5lQ29udGVudCIsImZvb3RlciIsImlzSW5saW5lIiwiYm9keSIsImZuIiwiY29tbW9uTWFya0VkaXRvciIsImV4dGVuZCIsIm1hcCIsImluZGV4IiwiaXRlbSIsImFtZEF2YWlsYWJsZSIsImRl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QUFBQSxPQUFBQyxHQUVBRixJQUNBQyxRQUFBLFNBQUEsY0FBQWhGLEdBRUFrRixRQUFBaEYsV0FDQUYsRUFBQWtGLE9BQUFoRixZQUNBNkUsR0FDQUksUUFBQUMsSUFBQSIsImZpbGUiOiJib290c3RyYXAtY29tbW9ubWFyay1lZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIihmdW5jdGlvbigpIHtcclxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCQsIGNvbW1vbm1hcmspIHsiLCJ2YXIgUmVuZGVyZXIgPSBmdW5jdGlvbihjbGFzc05hbWUpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHJcblx0dmFyIHJlYWRlciA9IGNvbW1vbm1hcmsuUGFyc2VyKCk7XHJcblx0dmFyIHdyaXRlciA9IGNvbW1vbm1hcmsuSHRtbFJlbmRlcmVyKCk7XHJcblxyXG5cdHNlbGYuZWxlbWVudCA9ICQoJzxkaXYgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiPjwvZGl2PicpO1xyXG5cclxuXHRzZWxmLmhpZGUgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LmhpZGUoKTsgfTtcclxuXHRzZWxmLnNob3cgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnNob3coKTsgfTtcclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQudG9nZ2xlKCk7IH07XHJcblx0c2VsZi52aXNpYmxlID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC5pcygnOnZpc2libGUnKTsgfTtcclxuXHRcclxuXHRzZWxmLmNvbW1vbm1hcmsgPSBmdW5jdGlvbih0ZXh0KSB7XHJcblx0XHRzZWxmLmVsZW1lbnQuaHRtbCh3cml0ZXIucmVuZGVyKHJlYWRlci5wYXJzZSh0ZXh0KSkpO1xyXG5cdH07XHJcblx0XHJcblx0c2VsZi5odG1sID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC5odG1sKCk7IH07XHJcbn07IiwidmFyIEhlYWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIGV2ZW50cyA9IHsgcHJldmlldzogJ2NtLWVkaXRvci1oZWFkZXItcHJldmlldycsIGVkaXQ6ICdjbS1lZGl0b3ItaGVhZGVyLWVkaXQnLCB0b2dnbGU6ICdjbS1lZGl0b3ItaGVhZGVyLXRvZ2dsZScgfTtcclxuXHRcclxuXHQvKiBQdWJsaWMgQVBJICovXHJcblx0c2VsZi5lbGVtZW50ID0gJCgnPGRpdiBjbGFzcz1cImNtLWVkaXRvci1oZWFkZXJcIj48L2Rpdj4nKTtcclxuXHRcclxuXHQvLyBFdmVudHNcclxuXHRzZWxmLm9uID0ge1xyXG5cdFx0cHJldmlldzogZnVuY3Rpb24oY2FsbGJhY2spIHsgc2VsZi5lbGVtZW50Lm9uKGV2ZW50cy5wcmV2aWV3LCBjYWxsYmFjayk7IH0sXHJcblx0XHRlZGl0OiBmdW5jdGlvbihjYWxsYmFjaykgeyBzZWxmLmVsZW1lbnQub24oZXZlbnRzLmVkaXQsIGNhbGxiYWNrKTsgfSxcclxuXHRcdHRvZ2dsZTogZnVuY3Rpb24oY2FsbGJhY2spIHsgc2VsZi5lbGVtZW50Lm9uKGV2ZW50cy50b2dnbGUsIGNhbGxiYWNrKTsgfVxyXG5cdH07XHJcblx0XHJcblx0c2VsZi50cmlnZ2VyID0ge1xyXG5cdFx0cHJldmlldzogZnVuY3Rpb24oZGF0YSkgeyBzZWxmLmVsZW1lbnQudHJpZ2dlcihuZXcgJC5FdmVudChldmVudHMucHJldmlldywgZGF0YSkpOyB9LFxyXG5cdFx0ZWRpdDogZnVuY3Rpb24oZGF0YSkgeyBzZWxmLmVsZW1lbnQudHJpZ2dlcihuZXcgJC5FdmVudChldmVudHMuZWRpdCwgZGF0YSkpOyB9LFxyXG5cdFx0dG9nZ2xlOiBmdW5jdGlvbihkYXRhKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy50b2dnbGUpKTsgfVxyXG5cdH07XHJcblx0XHJcblx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGlmKG9wdGlvbnMudG9nZ2xlKSB7XHJcblx0XHRcdGlmKGdseXBoLmhhc0NsYXNzKGVkaXQpKSB7XHJcblx0XHRcdFx0Z2x5cGgucmVtb3ZlQ2xhc3MoZWRpdCkuYWRkQ2xhc3MoY2FuY2VsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRnbHlwaC5yZW1vdmVDbGFzcyhjYW5jZWwpLmFkZENsYXNzKGVkaXQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHJcblx0XHRpZih0aXRsZSkgdGl0bGUudG9nZ2xlKCk7XHJcblx0XHJcblx0XHR0YWJzLnRvZ2dsZSgpO1xyXG5cdH07XHJcblx0XHJcblx0LyogQ29uc3RydWN0b3IgKi9cclxuXHRcclxuXHR2YXIgdGFicyA9ICQoJzx1bCBjbGFzcz1cInRhYnNcIj48L3VsPicpXHJcblx0XHQuYXBwZW5kKFxyXG5cdFx0XHQkKCc8bGk+PC9saT4nKS5hcHBlbmQoXHJcblx0XHRcdFx0JCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiPkVkaXQ8L2E+JykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRzZWxmLnRyaWdnZXIuZWRpdCh7IGVsZW1lbnQ6IHRoaXMgfSk7XHJcblx0XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KVxyXG5cdFx0KVxyXG5cdFx0LmFwcGVuZChcclxuXHRcdFx0JCgnPGxpPjwvbGk+JykuYXBwZW5kKFxyXG5cdFx0XHRcdCQoJzxhIGhyZWY9XCIjXCI+UHJldmlldzwvYT4nKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHNlbGYudHJpZ2dlci5wcmV2aWV3KHsgZWxlbWVudDogdGhpcyB9KTtcclxuXHRcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpXHJcblx0XHQpO1xyXG5cdFxyXG5cdGlmKG9wdGlvbnMuaW5saW5lKSB7XHJcblx0XHR2YXIgdGl0bGUgPSBudWxsO1xyXG5cdFxyXG5cdFx0aWYob3B0aW9ucy50b2dnbGUpIHtcclxuXHRcdFx0dmFyIGVkaXQgPSAnZ2x5cGhpY29uLXBlbmNpbCc7XHJcblx0XHRcdHZhciBjYW5jZWwgPSAnZ2x5cGhpY29uLXJlbW92ZSc7XHJcblx0XHJcblx0XHRcdHZhciBnbHlwaCA9ICQoJzxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uXCI+PC9zcGFuPicpLmFkZENsYXNzKGVkaXQpO1xyXG5cdFx0XHR2YXIgdG9nZ2xlID0gJCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInB1bGwtcmlnaHQgdG9nZ2xlXCI+PC9hPicpLmFwcGVuZChnbHlwaCk7XHJcblx0XHJcblx0XHRcdHRvZ2dsZS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdHNlbGYudHJpZ2dlci50b2dnbGUoKTtcclxuXHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdHNlbGYuZWxlbWVudC5hcHBlbmQodG9nZ2xlKTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHRhYnMuaGlkZSgpO1xyXG5cdFxyXG5cdFx0aWYob3B0aW9ucy50aXRsZSkge1xyXG5cdFx0XHR0aXRsZSA9ICQoJzxzdHJvbmcgY2xhc3M9XCJ0aXRsZVwiPjwvc3Ryb25nPicpLnRleHQob3B0aW9ucy50aXRsZSk7XHJcblx0XHRcdHNlbGYuZWxlbWVudC5hcHBlbmQodGl0bGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRpZighb3B0aW9ucy5oZWFkZXIpXHJcblx0XHRzZWxmLmVsZW1lbnQuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XHJcblx0XHJcblx0c2VsZi5lbGVtZW50LmFwcGVuZCh0YWJzKTtcclxuXHRcclxuXHQvLyBUaWUgdXAgaW50ZXJuYWwgZXZlbnRzXHJcblx0dmFyIGNsaWNrID0gZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0c2VsZi5lbGVtZW50LmZpbmQoJ2xpIGEuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0JChkYXRhLmVsZW1lbnQpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR9O1xyXG5cdFxyXG5cdHNlbGYub24uZWRpdChjbGljayk7XHJcblx0c2VsZi5vbi5wcmV2aWV3KGNsaWNrKTtcclxufSIsInZhciBDb250ZW50ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR2YXIgc3RhdGUgPSBudWxsO1xyXG5cdHZhciBldmVudHMgPSB7IGNoYW5nZTogJ2NtLWVkaXRvci1jb250ZW50LWNoYW5nZScgfTtcclxuXHJcblx0dmFyIHRleHRhcmVhID0gJCgnPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC90ZXh0YXJlYT4nKTtcclxuXHR2YXIgcHJldmlldyA9IG5ldyBSZW5kZXJlcigncHJldmlldycpO1xyXG5cclxuXHRpZihvcHRpb25zLm5hbWUpXHJcblx0XHR0ZXh0YXJlYS5hdHRyKCduYW1lJywgb3B0aW9ucy5uYW1lKTtcclxuXHJcblx0LyogUHVibGljIEFQSSAqL1xyXG5cdHNlbGYuc3RhdGVzID0geyBlZGl0OiAxLCBwcmV2aWV3OiAyIH1cclxuXHRzZWxmLmVsZW1lbnQgPSAkKCc8ZGl2IGNsYXNzPVwiY20tZWRpdG9yLWNvbnRlbnRcIj48L2Rpdj4nKVxyXG5cdFx0LmFwcGVuZCh0ZXh0YXJlYSlcclxuXHRcdC5hcHBlbmQocHJldmlldy5lbGVtZW50KTtcclxuXHJcblx0Ly8gTWV0aG9kc1xyXG5cdHNlbGYuc3RhdGUgPSBmdW5jdGlvbihzKSB7XHJcblx0XHRpZih0eXBlb2YgcyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBzdGF0ZTtcclxuXHRcdGlmKHMgPT0gc3RhdGUpIHJldHVybjtcclxuXHJcblx0XHRzdGF0ZSA9IHM7XHJcblxyXG5cdFx0aWYoc3RhdGUgPT0gc2VsZi5zdGF0ZXMuZWRpdCkge1xyXG5cdFx0XHR0ZXh0YXJlYS5zaG93KCk7XHJcblx0XHRcdHByZXZpZXcuaGlkZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGV4dGFyZWEuaGlkZSgpO1xyXG5cdFx0XHRwcmV2aWV3LnNob3coKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLnZhbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHQvLyBMZXRzIG5vdCBjYXVzZSB1bm5lY2Vzc2FyeSByZXNldHRpbmcgb2YgdGV4dCBhbmQgZmlyZSB1bm5lZWRlZCBldmVudHMuXHJcblx0XHRpZih0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHRleHRhcmVhLnZhbCgpICE9PSB2YWx1ZSkge1x0XHJcblx0XHRcdHRleHRhcmVhLnZhbCh2YWx1ZSk7XHJcblx0XHRcdHRleHRhcmVhLmNoYW5nZSgpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGV4dGFyZWEudmFsKCk7XHJcblx0fTtcclxuXHRcclxuXHRzZWxmLmh0bWwgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHByZXZpZXcuaHRtbCgpOyB9O1xyXG5cclxuXHRzZWxmLnNob3cgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnNob3coKTsgfTtcclxuXHRzZWxmLmhpZGUgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LmhpZGUoKTsgfTtcclxuXHRzZWxmLnRvZ2dsZSA9IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQudG9nZ2xlKCk7IH07XHJcblxyXG5cdC8vIEV2ZW50c1xyXG5cdHNlbGYub24gPSB7IGNoYW5nZTogZnVuY3Rpb24oY2FsbGJhY2spIHsgc2VsZi5lbGVtZW50Lm9uKGV2ZW50cy5jaGFuZ2UsIGNhbGxiYWNrKTsgfSB9O1xyXG5cdHNlbGYudHJpZ2dlciA9IHsgY2hhbmdlOiBmdW5jdGlvbihkYXRhKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy5jaGFuZ2UsIGRhdGEpKTsgfSB9O1xyXG5cclxuXHQvLyBDb25zdHJ1Y3RcclxuXHJcblx0dmFyIG9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgdGV4dCA9IHRleHRhcmVhLnZhbCgpO1xyXG5cclxuXHRcdHByZXZpZXcuY29tbW9ubWFyayh0ZXh0KTtcclxuXHRcdHNlbGYudHJpZ2dlci5jaGFuZ2UoeyB0ZXh0OiB0ZXh0IH0pO1xyXG5cdH07XHJcblxyXG5cdHRleHRhcmVhLmNoYW5nZShvbkNoYW5nZSkua2V5ZG93bihvbkNoYW5nZSkua2V5dXAob25DaGFuZ2UpO1xyXG5cclxuXHRzZWxmLnN0YXRlKHNlbGYuc3RhdGVzLmVkaXQpO1xyXG59IiwidmFyIEZvb3RlciA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBzZWxmID0gdGhpcztcclxuXHR2YXIgcHJvcGVydHkgPSAnZGlzYWJsZWQnO1xyXG5cdHZhciByZXZlcnQgPSAkKCc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCI+UmV2ZXJ0IGNoYW5nZXM8L2J1dHRvbj4nKTtcclxuXHR2YXIgc2F2ZSA9ICQoJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgcHVsbC1yaWdodFwiPlNhdmU8L2J1dHRvbj4nKTtcclxuXHR2YXIgZXZlbnRzID0geyBzYXZlOiAnY20tZWRpdG9yLWZvb3Rlci1zYXZlJywgcmV2ZXJ0OiAnY20tZWRpdG9yLWZvb3Rlci1yZXZlcnQnIH07XHJcblxyXG5cdC8qIFB1YmxpYyBBUEkgKi9cclxuXHRzZWxmLmVsZW1lbnQgPSAkKCc8ZGl2IGNsYXNzPVwiY20tZWRpdG9yLWZvb3RlclwiPjwvZGl2PicpO1xyXG5cclxuXHQvLyBNZXRob2RzXHJcblx0c2VsZi5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzYXZlLnByb3AocHJvcGVydHksIHRydWUpO1xyXG5cdFx0cmV2ZXJ0LnByb3AocHJvcGVydHksIHRydWUpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZW5hYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRzYXZlLnByb3AocHJvcGVydHksIGZhbHNlKTtcclxuXHRcdHJldmVydC5wcm9wKHByb3BlcnR5LCBmYWxzZSk7XHJcblx0fTtcclxuXHJcblx0c2VsZi5zaG93ID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC5zaG93KCk7IH07XHJcblx0c2VsZi5oaWRlID0gZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC5oaWRlKCk7IH07XHJcblx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnRvZ2dsZSgpOyB9O1xyXG5cclxuXHQvLyBFdmVudHNcclxuXHRzZWxmLm9uID0ge1xyXG5cdFx0c2F2ZTogZnVuY3Rpb24oY2FsbGJhY2spIHsgc2VsZi5lbGVtZW50Lm9uKGV2ZW50cy5zYXZlLCBjYWxsYmFjayk7IH0sXHJcblx0XHRyZXZlcnQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMucmV2ZXJ0LCBjYWxsYmFjayk7IH0sXHJcblx0fTtcclxuXHJcblx0c2VsZi50cmlnZ2VyID0ge1xyXG5cdFx0c2F2ZTogZnVuY3Rpb24oKSB7IHNlbGYuZWxlbWVudC50cmlnZ2VyKG5ldyAkLkV2ZW50KGV2ZW50cy5zYXZlKSk7IH0sXHJcblx0XHRyZXZlcnQ6IGZ1bmN0aW9uKCkgeyBzZWxmLmVsZW1lbnQudHJpZ2dlcihuZXcgJC5FdmVudChldmVudHMucmV2ZXJ0KSk7IH0sXHJcblx0fTtcclxuXHJcblx0LyogQ29uc3RydWN0ICovXHJcblx0c2F2ZS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRzZWxmLnRyaWdnZXIuc2F2ZSgpO1xyXG5cdH0pO1xyXG5cclxuXHRyZXZlcnQuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0c2VsZi50cmlnZ2VyLnJldmVydCgpO1xyXG5cdH0pO1xyXG5cclxuXHRzZWxmLmVsZW1lbnQuYXBwZW5kKHJldmVydCkuYXBwZW5kKHNhdmUpO1xyXG5cdHNlbGYuZGlzYWJsZSgpO1xyXG59OyIsInZhciBFZGl0b3IgPSBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XHJcblx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdHZhciB0ZXh0ID0gJyc7XHJcblxyXG5cdHZhciBldmVudHMgPSB7IGNoYW5nZTogJ2NtLWVkaXRvci1jaGFuZ2VkJywgaW5saW5lVG9nZ2xlOiAnY20tZWRpdG9yLWlubGluZS10b2dnbGUnIH07XHJcblxyXG5cdC8qIFV0aWxpdHkgZnVuY3Rpb25zICovXHJcblx0dmFyIHRvZ2dsZUlubGluZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29udGVudC50b2dnbGUoKTtcclxuXHRcdGlubGluZUNvbnRlbnQudG9nZ2xlKCk7XHJcblx0XHRoZWFkZXIudG9nZ2xlKCk7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5zYXZlKVxyXG5cdFx0XHRmb290ZXIudG9nZ2xlKCk7XHJcblxyXG5cdFx0c2VsZi50cmlnZ2VyLmlubGluZVRvZ2dsZSgpO1xyXG5cdH07XHJcblxyXG5cdC8qIFB1YmxpYyBBUEkgKi9cclxuXHRzZWxmLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG5cclxuXHQvLyBNZXRob2RzXHJcblx0c2VsZi50ZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHJldHVybiB0ZXh0O1xyXG5cclxuXHRcdGlmKHRleHQgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG5cdFx0dGV4dCA9IHZhbHVlO1xyXG5cdFx0Y29udGVudC52YWwodGV4dCk7XHJcblxyXG5cdFx0aWYoaW5saW5lQ29udGVudClcclxuXHRcdFx0aW5saW5lQ29udGVudC5jb21tb25tYXJrKHRleHQpO1xyXG5cclxuXHRcdHNlbGYudHJpZ2dlci5jaGFuZ2UoeyB0ZXh0OiB0ZXh0IH0pO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuaW5saW5lID0gZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdGlmKCFvcHRpb25zLmlubGluZSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHZhciBpc0lubGluZSA9IGlubGluZUNvbnRlbnQudmlzaWJsZSgpO1xyXG5cclxuXHRcdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXHJcblx0XHRcdHJldHVybiBpc0lubGluZTtcclxuXHJcblx0XHRpZihpc0lubGluZSAhPSB2YWx1ZSlcclxuXHRcdFx0dG9nZ2xlSW5saW5lKCk7XHJcblx0fTtcclxuXHJcblx0Ly8gRXZlbnRzXHJcblxyXG5cdHNlbGYub24gPSB7XHJcblx0XHRjaGFuZ2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMuY2hhbmdlLCBjYWxsYmFjayk7IH0sXHJcblx0XHRpbmxpbmVUb2dnbGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7IHNlbGYuZWxlbWVudC5vbihldmVudHMuaW5saW5lVG9nZ2xlLCBjYWxsYmFjayk7IH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLnRyaWdnZXIgPSB7XHJcblx0XHRjaGFuZ2U6IGZ1bmN0aW9uKGRhdGEpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLmNoYW5nZSwgZGF0YSkpOyB9LFxyXG5cdFx0aW5saW5lVG9nZ2xlOiBmdW5jdGlvbigpIHsgc2VsZi5lbGVtZW50LnRyaWdnZXIobmV3ICQuRXZlbnQoZXZlbnRzLmlubGluZVRvZ2dsZSkpOyB9XHJcblx0fTtcclxuXHJcblx0LyogQ29uc3RydWN0b3IgKi9cclxuXHR2YXIgaGVhZGVyID0gbmV3IEhlYWRlcihvcHRpb25zKTtcclxuXHR2YXIgY29udGVudCA9IG5ldyBDb250ZW50KG9wdGlvbnMpO1xyXG5cdHZhciBmb290ZXIgPSBvcHRpb25zLnNhdmUgPyBuZXcgRm9vdGVyKCkgOiBudWxsO1xyXG5cdHZhciBpbmxpbmVDb250ZW50ID0gb3B0aW9ucy5pbmxpbmUgPyBuZXcgUmVuZGVyZXIoJ2lubGluZS1jb250ZW50JykgOiBudWxsO1xyXG5cclxuXHQvLyBTdWJzY3JpYmUgdG8gZXZlbnRzXHJcblxyXG5cdGhlYWRlci5vbi5lZGl0KGZ1bmN0aW9uKCkgeyBjb250ZW50LnN0YXRlKGNvbnRlbnQuc3RhdGVzLmVkaXQpOyB9KTtcclxuXHRoZWFkZXIub24ucHJldmlldyhmdW5jdGlvbigpIHsgY29udGVudC5zdGF0ZShjb250ZW50LnN0YXRlcy5wcmV2aWV3KTsgfSk7XHJcblxyXG5cdGNvbnRlbnQub24uY2hhbmdlKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdGlmKG9wdGlvbnMuc2F2ZSkge1xyXG5cdFx0XHRpZihkYXRhLnRleHQgPT09IHRleHQpIGZvb3Rlci5kaXNhYmxlKCk7XHJcblx0XHRcdGVsc2UgZm9vdGVyLmVuYWJsZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2VsZi50ZXh0KGRhdGEudGV4dCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdGlmKG9wdGlvbnMuc2F2ZSkge1xyXG5cdFx0Zm9vdGVyLm9uLnNhdmUoZnVuY3Rpb24oKSB7IHNlbGYudGV4dChjb250ZW50LnRleHQoKSk7IH0pO1xyXG5cdFx0Zm9vdGVyLm9uLnJldmVydChmdW5jdGlvbigpIHsgY29udGVudC50ZXh0KHNlbGYudGV4dCgpKTsgfSk7XHJcblx0fVxyXG5cclxuXHRpZihvcHRpb25zLmlubGluZSkge1xyXG5cdFx0Y29udGVudC5oaWRlKCk7XHJcblxyXG5cdFx0aWYob3B0aW9ucy5zYXZlKVxyXG5cdFx0XHRmb290ZXIuaGlkZSgpO1xyXG5cclxuXHRcdGhlYWRlci5vbi50b2dnbGUodG9nZ2xlSW5saW5lKTtcclxuXHR9XHJcblxyXG5cdC8vIEFkZCBhbGwgdGhlIGVsZW1lbnRzXHJcblx0dmFyIGJvZHkgPSAkKCc8ZGl2IGNsYXNzPVwiY20tZWRpdG9yLWJvZHlcIj48L2Rpdj4nKS5hcHBlbmQoY29udGVudC5lbGVtZW50KTtcclxuXHJcblx0aWYoZm9vdGVyKVxyXG5cdFx0Ym9keS5hcHBlbmQoZm9vdGVyLmVsZW1lbnQpO1xyXG5cclxuXHRpZihpbmxpbmVDb250ZW50KVxyXG5cdFx0Ym9keS5hcHBlbmQoaW5saW5lQ29udGVudC5lbGVtZW50KTtcclxuXHJcblx0c2VsZi5lbGVtZW50LmFkZENsYXNzKCdjb21tb25tYXJrLWVkaXRvcicpXHJcblx0XHQuYXBwZW5kKGhlYWRlci5lbGVtZW50KVxyXG5cdFx0LmFwcGVuZChib2R5KTtcclxuXHJcblx0c2VsZi50ZXh0KG9wdGlvbnMudGV4dCk7XHJcbn0iLCIkLmZuLmNvbW1vbk1hcmtFZGl0b3IgPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcblx0b3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuXHRcdGhlYWRlcjogdHJ1ZSxcclxuXHRcdGlubGluZTogZmFsc2UsXHJcblx0XHRuYW1lOiBudWxsLFxyXG5cdFx0c2F2ZTogZmFsc2UsXHJcblx0XHR0ZXh0OiAnJyxcclxuXHRcdHRpdGxlOiAnJyxcclxuXHRcdHRvZ2dsZTogdHJ1ZVxyXG5cdH0sIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHsgcmV0dXJuIG5ldyBFZGl0b3IoaXRlbSwgb3B0aW9ucyk7IH0pO1xyXG59OyIsIlx0fTtcclxuXHJcblx0dmFyIGFtZEF2YWlsYWJsZSA9IHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZDsgXHJcblxyXG5cdGlmKGFtZEF2YWlsYWJsZSlcclxuXHRcdGRlZmluZShbICdqcXVlcnknLCAnY29tbW9ubWFyaycgXSwgaW5pdCk7XHJcblx0XHJcblx0aWYoalF1ZXJ5ICYmIGNvbW1vbm1hcmspXHJcblx0XHRpbml0KGpRdWVyeSwgY29tbW9ubWFyaylcclxuXHRlbHNlIGlmKCFhbWRBdmFpbGFibGUpXHJcblx0XHRjb25zb2xlLmxvZygnVW5hdmJsZSB0byBsb2FkIGRlcGVuZGVuY3kgZm9yIEJvb3RzdHJhcCBDb21tb25tYXJrIEVkaXRvci4nKTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
