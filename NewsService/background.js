chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      ////must escape & to &amp;, or else can't show any suggestion
      {content: "symbol", description: "symbol=region:ticker, performanceId&amp;template="}, 
      {content: "template1", description: "Generic, DJNA, MorningstarArticle, StockAnalystNotes, CompanyReport"},
      {content: "template2", description: "FundAnalysisNew, ETFAnalysis, CEFAnalysis, Videos, MarketUpdate"}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(function(text) {
  text = text.trim();
  var newsserviceUrl = "http://newsservice.morningstar.com/news/services/newsRS";

  if(text.indexOf("=") == -1){
    newsserviceUrl += "/view?productcode=RMOB&resourceId="+text;
  }else{
    var type = "SC";
    var params = text.split("&");
    for(var i=0; i<params.length; i++){
      if(params[i].indexOf("symbol=") != -1 && params[i].substring(7).indexOf(":") != -1){
        type = "CS";
      }
    }

    newsserviceUrl += "/list?productCode=RMOB&idType="+type+"&" + text;
  }
	
  openUrlInCurrentTab(newsserviceUrl);

});

function openUrlInCurrentTab(newUrl){
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.update(tab.id, {url: newUrl});
	});
}
