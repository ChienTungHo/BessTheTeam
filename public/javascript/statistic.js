function sortNumber(a, b){
	return b - a;
}

$(document).ready(function(){
	$('#Total a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})

	$.get(
		"/click/show/total",
		{},
		function(data){
			var sortable = [];
			for(var key in data.count_list)
      			sortable.push([key, data.count_list[key]])
			sortable.sort(function(a, b) {return b[1] - a[1]})

			var maptbl = data.name_list;
			for(var i = 0 ; i < sortable.length ; i++){
				var item_id = sortable[i][0];
				var count = sortable[i][1];
				var sell_id = maptbl[item_id];
				var html = "<tr><td>" + item_id + "</td><td>" + sell_id + "</td><td>" + count + "</td></tr>";

				$('#item_record').append(html);
			}
		}
	);

	$.get(
		"/user/list",
		{},
		function(data){
			for(var i = 0 ; i < data.length ; i++){
				var html = "<option value=\"" + data[i] + "\">" + data[i] + "</option>";
				$('#user').append(html);
			}

			$('#user').change(function(){
				var val = $("#user option:selected").text();
				console.log(val);
				var url = "/user/show-click/" + val;
				console.log(url);
				$.get(
					url,
					{},
					function(data){
						console.log(data);
						$('#user_record').html("");
						for(var i = 0 ; i < data.length ; i++){
							var item_id = data[i].item_id;
							var sell_id = data[i].sell_id;
							var user = data[i].user;
							var ctime = data[i].updatedAt;
							var html = "<tr><td>" + user + "</td><td>" + item_id + "</td><td>" + sell_id + "</td><td>" + ctime + "</td></tr>";

							$('#user_record').append(html);
						}
					}
				);
			});
		}
	);

});

