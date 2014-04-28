//chrome.omnibox.setDefaultSuggestion({description: "securityId/view, viewall, Info, Quote, Details, News, DailyPriceVolume, IntradayPriceVolume, filter=, News/[Generic, Research, Commentary, Video] analyst_reports, analyst_reports/latest, "});


chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      {content: "sample1", description: "securityId/view, Info, Quote, Details, News, DailyPriceVolume, IntradayPriceVolume, filter="},
      {content: "sample2", description: "securityId/News/[Generic, Research, Commentary, Video], analyst_reports, analyst_reports/latest"}，
      {content: "sample3", description: "securityIds/top_news, viewall, securityId/search/{key}"}
    ]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  text = text.trim();
  var url = "https://mobileservice.morningstar.com/service/1.0/locales/en-US/products/RT/securities/";

  url += text;
	
  openUrlInCurrentTab(url);

});

function openUrlInCurrentTab(newUrl){
	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.update(tab.id, {url: newUrl});
	});
}
