// Updating data every minute
window.setInterval(function(){
	var requestURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.onload = function () {
		var currentPrices = JSON.parse(request.responseText);
		window.usdPrice = currentPrices.bpi.USD.rate_float;
		window.gbpPrice = currentPrices.bpi.GBP.rate_float;
		window.eurPrice = currentPrices.bpi.EUR.rate_float;
		updateConversionRates("usd", usdPrice);
		updateConversionRates("eur", eurPrice);
		updateConversionRates("gbp", gbpPrice);		
	};
	request.send();

}, 1 * 1000);


function updateConversionRates(currencySelected, fieldToUpdate) {
	var btcAmount = $("#btcAmount").val();				//get value from bitcoin field
	window.convertedPrice = fieldToUpdate * btcAmount;
	//var formatedPrice = convertedPrice.formatMoney();
	$('#'+currencySelected+'Amount').val(convertedPrice);
};


$(".addBtn").on("click", function(){
	window.selectedValue = $("#addCurrencyBox").val();					//retrieves value from dropbox field
	window.currencyPrice = selectedValue + "Price";
	$("#addCurrencyBox option[value=" + selectedValue + "]").remove();	//removes it from dropdown
	addCurrency(selectedValue);
	updateConversionRates(selectedValue, window[currencyPrice]);
	checkIfElementExists();
});

function checkIfElementExists() {
	var usd = $(".usdCurrency").length;
	var eur = $(".eurCurrency").length;
	var gbp = $(".gbpCurrency").length;
	if(usd && eur && gbp) {
		$(".currenciesToAdd").hide();
	} else {
		$(".currenciesToAdd").show(10);
	};
}

function addCurrency(cur) {
	$(".currenciesBlock").append("<div class=" + cur + "Currency><input type='number' id='" + cur + "Amount'><span class='currencyName'>" + cur.toUpperCase() + "</span><button class='removeBtn'>remove</button></div>");		//gives back selected Value
};


$(".currenciesBlock").on("click", ".removeBtn", function(){			//Event delegation
	$(this).closest("div").remove();								//Removes element closest to div up
	var removedDiv = $(this.closest("div"));
	var found = $(removedDiv).find("span").text();								//Adds element back to the dropdown list
	$("#addCurrencyBox").append($("<option>",{
		value: found.toLowerCase(),
		text: found.toUpperCase()
	}));
	checkIfElementExists();
});

function removeCurrency(currency) {

};


// Formats money to 21,198.03
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };



// var formatter = new Intl.NumberFormat('en-US', {
// 	style: 'currency',
// 	currency: 'USD',
// 	minimumFractionDigits: 2
// });
