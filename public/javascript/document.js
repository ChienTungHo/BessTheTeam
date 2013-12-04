$(document).ready(function(){
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        var target = this.hash, $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });

    var $modal = $('#myModal').modal({
    	show: false
	});

	$('.panel').on('click', function() {
    	$modal.modal('show');
	});
});
