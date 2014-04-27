chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + "id=", description: "show news content by id"},
      {content: text + "symbol=", description: "search news by symbol"}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(function(text) {
  var params = [];
  var paramsInArray = text.split(" ");

  for(i=0; i< paramsInArray.length; i++){
    var keyValue = paramsInArray[i].split("=");
    if(keyValue.length >= 2){
      params[keyValue[0]] = keyValue[1];
    }
  }

  var baseNewsServiceUrl = "http://newsservice.morningstar.com/news/services/newsRS";
	if(params["id"] !== undefined){
		var newsId = params["id"];
		var newsContentUrl = baseNewsServiceUrl +"/view?productcode=RMOB&resourceId="+newsId;
		openUrlInCurrentTab(newsContentUrl);
	}else if(params["symbol"] !== undefined){
		var symbol = params["symbol"];
    var type = symbol.indexOf(":") == -1 ? "SC" : "CS";
		var newsUrl = baseNewsServiceUrl + "/list?productCode=RMOB&idType="+type+"&symbol="+symbol;
    if(params["template"] !== undefined){
      newsUrl += "&template=" + params["template"];
    }
		openUrlInCurrentTab(newsUrl);
	}
});

function openUrlInCurrentTab(newUrl){
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.update(tab.id, {url: newUrl});
	});
}
