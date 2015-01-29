$(function() {
	var searchTimeout = null;
  $("#q").keyup(function(data, handler) {
    if (searchTimeout != null) {
	    clearTimeout(searchTimeout);
	  }
	  searchTimeout = setTimeout(function() {
	    searchTimeout = null;  
	    if (!$("#q").val()) {
		    $("#result").html(null);
	    } else {
	    	$.get("/search?q="+$("#q").val(), function(data) {
		      $("#result").html(data);
		    });
	    }
	  }, 200); 
  });
});
