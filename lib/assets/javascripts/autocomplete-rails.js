/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
$(document).ready(function(){$("input[data-autocomplete]").railsAutocomplete()}),function(a){var b=null;a.fn.railsAutocomplete=function(){return this.live("focus",function(){this.railsAutoCompleter||(this.railsAutoCompleter=new a.railsAutocomplete(this))})},a.railsAutocomplete=function(a){_e=a,this.init(_e)},a.railsAutocomplete.currentResults=[],a.railsAutocomplete.fn=a.railsAutocomplete.prototype={railsAutocomplete:"0.0.1"},a.railsAutocomplete.fn.extend=a.railsAutocomplete.extend=a.extend,a.railsAutocomplete.fn.extend({init:function(b){function c(a){return a.split(b.delimiter)}function d(a){return c(a).pop().replace(/^\s+/,"")}b.delimiter=$(b).attr("data-delimiter")||null,$(b).autocomplete({source:function(c,f){$.getJSON($(b).attr("data-autocomplete"),{term:d(c.term)},function(){a.railsAutocomplete.currentResults=arguments[0],$(this).trigger("railsAutocomplete.dataLoaded"),$(arguments[0]).each(function(a,c){var d={};d[c.id]=c,$(b).data(d)}),f.apply(null,arguments)})},search:function(){var a=d(this.value);if(a.length<2)return!1},focus:function(){return!1},select:function(a,d){var f=c(this.value);f.pop(),f.push(d.item.value);if(b.delimiter!=null)f.push(""),this.value=f.join(b.delimiter);else{this.value=f.join(""),$(this).attr("data-id-element")&&$($(this).attr("data-id-element")).val(d.item.id);if($(this).attr("data-update-elements")){var g=$(this).data(d.item.id.toString()),h=$.parseJSON($(this).attr("data-update-elements"));for(var i in h)$(h[i]).val(g[i])}}var j=this.value;return $(this).bind("keyup.clearId",function(){$(this).val().trim()!=j.trim()&&($($(this).attr("data-id-element")).val(""),$(this).unbind("keyup.clearId"))}),$(this).trigger("railsAutocomplete.select",d),!1}})}})}(jQuery)