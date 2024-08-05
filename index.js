var api = "https://api.exchangerate-api.com/v4/latest/USD";

$(document).ready(function () {
  $(".selectCurrencybtn").click(function () {
    
    $(".listOfCurrencies").toggleClass("newlist"); 
    $(".arrow").toggleClass("rotate");

    if($(".arrow").hasClass("rotate")){
      $('.currencyValue').hide();
      $('.usd').hide();
    }
    else{
      $('.currencyValue').show();
      $('.usd').show();
    }
  });


  $(".links").click(function (event) {
    $("#selectCurrencytext")[0].innerText = event.target.innerText;
    
    $(".listOfCurrencies").toggleClass("newlist");
    $(".arrow").toggleClass("rotate");
    $('.currencyValue').show();
    $('.usd').show();
    $('#valueToChange').val("");
    $('.resultMessage').css('display','none');
    $('#finalresult')[0].innerText='$ 0';
  });

  if($('.usd').css('display') == 'block'){
    $('.usd').click(async function(){
      apicall();
    })
  }
  else{
    console.log('display is none');
    $("#valueToChange").keyup(async function(){
          apicall();
    });
  }

  async function apicall(){
    if ($("#selectCurrencytext")[0].innerText == "Select Currency") {
      $('.resultMessage').css('display','block');
      $('#failure').css('display','block');
      $('#success').css('display','none');
      $('#novalue').css('display','none');
      $("#finalresult")[0].innerText = '$ 0';
    } 
    
    else if(!$("#valueToChange").val()){
      $('.resultMessage').css('display','block');
      $('#novalue').css('display','block');
      $('#failure').css('display','none');
      $('#success').css('display','none');
      $("#finalresult")[0].innerText = '$ 0';
    }
    
    else {
      $('.resultMessage').css('display','block');
      $('#novalue').css('display','none');
      $('#failure').css('display','none');
      $('#success').css('display','block');
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
          if (window.dataLayer) {
            // window.dataLayer.push({
            //   event: 'fetch_currency',
            //   from_currency_code: 'test',
            //   value: 'test'
            // });
            // window.dataLayer.push({
            //   event: 'add_payment_info',
            //   items: 'test items',
            //   transaction_id: 'test123'
            // });
            // window.dataLayer.push({
            //   event: 'add_shipping_info',
            //   items: 'test items',
            //   transaction_id: 'test123'
            // });
            let lineItemObject = {};
            lineItemObject.item_id = 'WARP-123';
            lineItemObject.item_name = 'Half sleeve shirt (zara)';
            lineItemObject.affiliation = 'Currency calculator';
            lineItemObject.discount = 0;
            lineItemObject.item_brand = 'modware';
            lineItemObject.item_category = 'test';
            lineItemObject.item_category2 = 'test2';
            lineItemObject.item_category3 = 'test3';
            lineItemObject.item_list_name = 'item list name';
            lineItemObject.item_list_id = 'itemListId';
            lineItemObject.item_variant = 'colorful';
            lineItemObject.price = 100;
            lineItemObject.quantity = 1;
            lineItemObject.index = 0;

          let items = [];
          items.push(lineItemObject);

          window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
              currency: 'usd',
              value: 200.54,
              items: items
            },
          });
        }

        },
        error: function (xhr, status, error) {
           console.log(error);
        }
    });
    }
  }

  function displayResults(currency) {
    let fromRate = currency.rates[$("#selectCurrencytext")[0].innerText];
    let usdRate = currency.rates["USD"];

    if ($("#valueToChange")[0].value == "") {
      $("#finalresult")[0].innerText = "$" + 0;
    } else {
      $("#finalresult")[0].innerText =
        "$ "+
        ((usdRate / fromRate) * parseInt($("#valueToChange")[0].value)).toFixed(
          2
        );
    }
  }

  if($(window).width()<400){
    $('.resultMessage').insertBefore('.usd');
  }
});
