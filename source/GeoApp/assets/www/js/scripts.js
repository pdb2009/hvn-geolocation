$(document).ready(function(){
	/*$.ajax({
		url: 'http://thiencong.com/gapp/index.php/api/category',
		dataType: 'json',
		success: function(data) {
			var lstData = $('#lstData');
			var str = '';
			$.each(data, function(key, val) {	
				str += '<li><a data-identity="cat' + val.id + '" data-url="?catid=' + val.id + '" href="javascript:void(0);"><img src="http://thiencong.com/gapp/images/categoy/' + val.icon + '" /><h3>' + val.title + '</h3><p>' + val.description + '</p></a><a href="#">' + val.title + '</a></li>';												
			});
			if(str != '') {
				lstData.html('<ul>' + str + '</ul>');
				lstData.listview("refresh");
			}
		},
		error: function() {
		}
	});*/
});