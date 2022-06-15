var api = "https://api.exchangerate-api.com/v4/latest/USD";

$(document).ready(function () {
  $(".selectCurrencybtn").click(function () {
    $(".listOfCurrencies").toggleClass("newlist");
    $(".arrow").toggleClass("rotate");

    if ($(".arrow").hasClass("rotate")) {
      $(".currencyValue").hide();
      $(".usd").hide();
      $("#tocurrency").hide();
    } else {
      $(".currencyValue").show();
      $(".usd").show();
      $("#tocurrency").show();
    }
  });

  $(".selectCurrencybtn2").click(function () {
    $(".listOfCurrencies2").toggleClass("newlist");
    $(".arrow2").toggleClass("rotate");

    if ($(".arrow2").hasClass("rotate")) {
      $(".currencyValue").hide();
      $(".usd").hide();
    } else {
      $(".currencyValue").show();
      $(".usd").show();
    }
  });

  $(".links").click(function (event) {
    $("#selectCurrencytext")[0].innerText = event.target.innerText;

    $(".listOfCurrencies").toggleClass("newlist");
    $(".arrow").toggleClass("rotate");
    $(".currencyValue").show();
    $("#tocurrency").show();
    $(".usd").show();
    $("#valueToChange").val("");
    $(".resultMessage").css("display", "none");
    $("#finalresult")[0].innerText = "Result : 0";
  });

  $(".links2").click(function (event) {
    $("#selectCurrencytext2")[0].innerText = event.target.innerText;

    $(".listOfCurrencies2").toggleClass("newlist");
    $(".arrow2").toggleClass("rotate");
    $(".currencyValue").show();
    $(".usd").show();
    $("#valueToChange").val("");
    $(".resultMessage").css("display", "none");
    $("#finalresult")[0].innerText = "Result : 0";
  });

  if ($(".usd").css("display") == "block") {
    $(".usd").click(async function () {
      apicall();
    });
  } else {
    console.log("display is none");
    $("#valueToChange").keyup(async function () {
      apicall();
    });
  }

  async function apicall() {
    if ($("#selectCurrencytext")[0].innerText == "Select Currency") {
      $(".resultMessage").css("display", "block");
      $("#failure").css("display", "block");
      $("#success").css("display", "none");
      $("#novalue").css("display", "none");
      $("#finalresult")[0].innerText = "Result : 0";
    } else if (!$("#valueToChange").val()) {
      $(".resultMessage").css("display", "block");
      $("#novalue").css("display", "block");
      $("#failure").css("display", "none");
      $("#success").css("display", "none");
      $("#finalresult")[0].innerText = "Result : 0";
    } else {
      $(".resultMessage").css("display", "block");
      $("#novalue").css("display", "none");
      $("#failure").css("display", "none");
      $("#success").css("display", "block");
      console.log($("#selectCurrencytext")[0].innerText);
      // let resp = await fetch(api);
      // let jsonbody = await resp.json();
      // displayResults(jsonbody);

      $.ajax({
        type: "GET",
        url: api,
        dataType: "json",
        success: function (result, status, xhr) {
          console.log(result.rates);
          displayResults(result);
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });
    }
  }

  function displayResults(currency) {
    
    let fromRate = currency.rates[$("#selectCurrencytext")[0].innerText];
    let toRate = currency.rates[$("#selectCurrencytext2")[0].innerText];
    


    if ($("#valueToChange")[0].value == "") {
      $("#finalresult")[0].innerText = 'Result : 0';
    } else {
      $("#finalresult")[0].innerText =
        "Result : " +
        ((toRate / fromRate) * parseInt($("#valueToChange")[0].value)).toFixed(
          2
        );
    }
  }

  if ($(window).width() < 400) {
    $(".resultMessage").insertBefore(".usd");
  }
});
