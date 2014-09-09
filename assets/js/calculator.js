/*----------------------------------------------------------------------------*/
$('#calculator').modal(
   {
   backdrop: false,
   show: false
   }).css(
   {
   width: 'auto',
      'margin-left': function () 
         {
         return -($(this).width() / 2);
         }
   });
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
jQuery(document).ready(function()
   {
   jQuery("#first_amount").keydown(function(event)
      {
      /*-- Numeric values (48-57) Numpad (96-105) backspace (8) delete (46) --*/
      /*--   decimal point (110 & 190)                                      --*/
      if ((event.keyCode >= 48 && event.keyCode <= 57) 
         || (event.keyCode >= 96 && event.keyCode <= 105)
         || event.keyCode == 8 || event.keyCode == 46
         || event.keyCode == 110 || event.keyCode == 190)
         {
         }
      else event.preventDefault();
      });

   jQuery("#first_amount").keyup(function()
      {
      rent_convert();
      });

   jQuery("#rent").change(function()
      {
      rent_convert();
      });
   })
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
function number_format (number, decimals, dec_point, thousands_sep) 
   {
   // Strip all characters but numerical ones.
   number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

   var n = !isFinite(+number) ? 0 : +number,
       prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
       sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
       dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
       s = '',
       toFixedFix = function (n, prec) 
          {
           var k = Math.pow(10, prec);
           return '' + Math.round(n * k) / k;
           };

   // Fix for IE parseFloat(0.55).toFixed(0) = 0;
   s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
   if (s[0].length > 3) 
      {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
      }
   if ((s[1] || '').length < prec) 
      {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
      }
   return s.join(dec);
   }
/*----------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/
function rent_convert ()
   {
   var value = $("#first_amount").val();
   var rentopt = $("#rent").val();

   var daily = 0, weekly = 0, fortnightly = 0, monthly = 0, yearly = 0;

   if (value > 0)
      {
      /*-- Get Daily --*/
      switch (rentopt)
         {
         /*-- FROM DAILY ---------------------------------*/
         case '1' :
            daily = value;
            break;
         /*-- FROM WEEKLY --------------------------------*/
         case '2' :
            daily = value / 7;
            weekly = value;
            break;
         /*-- FROM FORTNIGHTLY ---------------------------*/
         case '3' :
            daily = value / 14;
            fortnightly = value;
            break;
         /*-- FROM MONTHLY -------------------------------*/
         case '4' :
            daily = (value * 12) / 365;
            monthly = value;
            break;
         /*-- FROM YEARLY --------------------------------*/
         case '5' :
            daily = value / 365;
            yearly = value;
            break;
         }

      /*-- From daily convert to the other values --*/
      if (weekly == 0) weekly = daily * 7;
      if (fortnightly == 0 ) fortnightly = daily * 14;
      if (yearly == 0) yearly = daily * 365;
      if (monthly == 0) monthly = yearly / 12;

      }

   /*- Update the values of the span --*/
   $("#rent_daily").text(number_format(daily, 2));
   $("#rent_weekly").text(number_format(weekly, 2));
   $("#rent_fortnightly").text(number_format(fortnightly, 2));
   $("#rent_monthly").text(number_format(monthly, 2));
   $("#rent_yearly").text(number_format(yearly, 2));

   return;
   }
/*----------------------------------------------------------------------------*/

