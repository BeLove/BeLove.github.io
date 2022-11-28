jQuery(document).ready(function($) {


	var mastheadheight = $('.ds-header').outerHeight();
	//console.log(mastheadheight);
	$(".ds-banner,.ds-main-section").css("margin-top" , mastheadheight);

	$(window).scroll(function(){
	    if ($(window).scrollTop() >= 10) {
	        $('.ds-header').addClass('ds-fixed-header');
	    }
	    else {
	        $('.ds-header').removeClass('ds-fixed-header');
	    }
	}).scroll();


});


// wrote this small snippet to show the last posts from my blog, unfortunately, medium doesn't support any CORS api to retrieve it, have to rely on the external service
function extractContent(html) {
    return new DOMParser()
        .parseFromString(html, "text/html")
        .body
        .getElementsByTagName('p')[0].textContent;
}

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sergeybelove")
.then((res) => res.json())
.then((data) => {
for (const post of data.items) {
	 // todo - add limit of articles
  short = extractContent(post.description);
  document.getElementById('posts').innerHTML += '<div class="ds-work-list">\
          <div class="row">\
              <div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7">\
                  <section>\
                      <h3 class="ds-work-tilte">'+post.title+'</h3>\
                      <p><i>'+new Date(Date.parse(post.pubDate)).toLocaleDateString("en-GB",  {year: 'numeric', month: 'short', day: 'numeric'})+'</i></p>\
                      <p>'+short+'</p><a target="_blank" href="'+post.link+'" class="ds-button">Read more</a>\
                  </section>\
              </div>\
              <div class="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">\
                  <figure><img src="'+post.thumbnail+'"></figure>\
              </div>\
          </div>\
        </div>';;
}
});