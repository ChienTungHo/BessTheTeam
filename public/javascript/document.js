$(document).ready(function(){
	var url=window.location.toString();
	var str="Guys";
	var user_value="";
	if(url.indexOf("?")!=-1){
	    var ary=url.split("?")[1].split("&");
	    for(var i in ary){
	        str=ary[i].split("=")[0];
	        if (str == "uname") {
	            user_value = decodeURI(ary[i].split("=")[1]);
	            break;
	        }
	    }
	}
	$('#user').html('Hi, ' + user_value + ' !');

    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        var Target = this.hash, $Target = $(Target);
        $('html, body').stop().animate({
            'scrollTop': $Target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = Target;
        });
    });

	var Product = Backbone.Model.extend({});

	var ProductCollection = Backbone.Collection.extend({
		model: Product
	});

	var ProductView = Backbone.View.extend({
		template: _.template($('#ProductTmp').html()),
		render: function(folder){
		    $(this.el).html(this.template({
		    	productList: this.model.toJSON(),
		    	folder: folder
		    }));
		    $(this.el).find("a.fancybox").each(function(){
		       $(this).fancybox({}); 
		    });
		    return this;
		}
	});

	var ProductCollectionView = Backbone.View.extend({

		render: function(dv, folder){
			this.folder = folder;
    		this.collection.forEach(this.addView, this);
    		$(dv).append(this.el);
		},
		addView: function(product){
			var productView = new ProductView({model: product});
			this.$el.append(productView.render(this.folder).el);
		}
	});

	$.getJSON("json/dog.json", function(json) {
    	var productCollection = new ProductCollection({});
		productCollection.reset(json);
		
		var productCollectionView = new ProductCollectionView({collection: productCollection});
		productCollectionView.render('#DogView','dog');
	
		$("a.fancybox").click(function(){	
			this.sell_id = $(this).attr("rel");
			this.item_id = $(this).attr("title");
			var clickurl = "/click/add/" + this.item_id + '/' + this.sell_id + '/' + user_value;
			var adduserurl = "/user/add/" + user_value;
			$.get(
				clickurl,
				{},
				function(data){}
			);
			$.get(
				adduserurl,
				{},
				function(data){}
			);
		});

	});

	$.getJSON("json/horse.json", function(json) {
    	var productCollection = new ProductCollection({});
		productCollection.reset(json);
		
		var productCollectionView = new ProductCollectionView({collection: productCollection});
		productCollectionView.render('#HorseView','horse');

		$("a.fancybox").click(function(){	
			this.sell_id = $(this).attr("rel");
			this.item_id = $(this).attr("title");
			var clickurl = "/click/add/" + this.item_id + '/' + this.sell_id + '/' + user_value;
			var adduserurl = "/user/add/" + user_value;
			$.get(
				clickurl,
				{},
				function(data){}
			);
			$.get(
				adduserurl,
				{},
				function(data){}
			);
		});
		
	});

	
});
