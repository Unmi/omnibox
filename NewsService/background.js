chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + "id=", description: "show news content by id"},
      {content: text + "symbol=", description: "search news by symbole"}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
	if(text.indexOf("id=")==0){
		var newsId = text.substring(3);
		var newsContentUrl = "http://newsservice.morningstar.com/news/services/newsRS/view?productcode=RMOB&resourceId="+newsId;
		//window.location = newsContentUrl;
		chrome.tabs.getSelected(null, function(tab){
			chrome.tabs.update(tab.id, {url: newsContentUrl});
		});
	}
  });
