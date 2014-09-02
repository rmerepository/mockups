var Mailbox =
	{
	type : 'all',
	page : 0,
	omail : 0,

	tucnt : 0,
	nucnt : 0,
	mucnt : 0,



	/*-- Initializes the mail display and load listing -----------------------*/
	page_start : function ()
		{
		if (typeof cltype !== 'undefined' && cltype)
		  Mailbox.type = cltype;
		if (typeof clpage !== 'undefined' && clpage)
		  Mailbox.page = clpage;
		if (typeof clmail !== 'undefined' && clmail)
		  Mailbox.omail = clmail;

		if (typeof tucnt !== 'undefined' && tucnt)
		  Mailbox.tucnt = tucnt;
		if (typeof nucnt !== 'undefined' && nucnt)
		  Mailbox.nucnt = nucnt;
		if (typeof mucnt !== 'undefined' && mucnt)
		  Mailbox.mucnt = mucnt;


		Mailbox.load_thread_list();
		if (Mailbox.omail > 0)
			{
			Mailbox.open_mail();
			}
		},//end page_start
	/*------------------------------------------------------------------------*/

	/*-- Load the threadlist -------------------------------------------------*/
	load_thread_list : function ()
		{
		var fullurl = "/mailbox/get_message_list/" + Mailbox.type + "/"
		  + Mailbox.page;

		$.ajax(
			{
			url : fullurl,

			success : function(data)
				{
				try
					{
					var jsonobj = jQuery.parseJSON(data);

					$('.mail-items').append($(jsonobj.maillist));

					Mailbox.select_open_mail();
					}
				catch (e) {}
				},
			error : function (xhr, status) {}
			});

		},//end load_thread_list
	/*------------------------------------------------------------------------*/




	/*------------------------------------------------------------------------*/
	/*-- FILTERS -------------------------------------------------------------*/
	/*------------------------------------------------------------------------*/

	/*-- Enable filter selection of mails ------------------------------------*/
	filter_enable : function ()
		{
		$('.menuitem').on('click', function()
			{
			var el = $(this);
			var filter = el.attr("id");
			var filterTag = el.data('filter-label');

			el.closest(".dropdown").removeClass('open')

			Mailbox.type = filter.substr(5);
			Mailbox.page = 0;


			$('.mail-items').empty();
			Mailbox.load_thread_list();

			$('#filter_label').text(filterTag);

			return false;
			});			
		
		$('.mailfilterdd').on('show.bs.dropdown', function ()
			{
			var ds = $('[aria-labelledby=mailfilter] li').length;
			var d = $('.mailwrap').height();
			console.log(d);
			$('[aria-labelledby=mailfilter]').css({'height':d});

		});


		$('.mailfilterdd').on('hide.bs.dropdown', function ()
			{
			return false;
			});

		},//end filter_enable
	/*------------------------------------------------------------------------*/

	/*-- Update the filter counters ------------------------------------------*/
	update_filter_counters : function ()
		{
		if (Mailbox.tucnt <= 0)
			{
			$('#all_unread').text('0');
			$('.mc_all').addClass('hide');
			}
		else
			{
			$('#all_unread').text(Mailbox.tucnt);
			$('.mc_all').removeClass('hide');
			}

		if (Mailbox.mucnt <= 0)
			{
			$('#message_unread').text('0');
			$('.mc_message').addClass('hide');
			}
		else
			{
			$('#message_unread').text(Mailbox.mucnt);
			$('.mc_message').removeClass('hide');
			}

		if (Mailbox.nucnt <= 0)
			{
			$('#notification_unread').text('0');
			$('.mc_notification').addClass('hide');
			}
		else
			{
			$('#notification_unread').text(Mailbox.nucnt);
			$('.mc_notification').removeClass('hide');
			}
		},
	/*------------------------------------------------------------------------*/




	/*------------------------------------------------------------------------*/
	/*-- MAIL READING --------------------------------------------------------*/
	/*------------------------------------------------------------------------*/

	/*-- Enable opening of mail via selecting thread -------------------------*/
	open_mail_enable : function ()
		{
		$(document).on('click', 'a.thread_list', function()
			{
			var thread = $(this).attr("id");

			Mailbox.omail = thread.substr(7);
			Mailbox.open_mail();
			Mailbox.select_open_mail()

			return false;
			});
		},//open_mail_enable
	/*------------------------------------------------------------------------*/

	/*-- Select the message from the thread list -----------------------------*/
	select_open_mail : function ()
		{
		var thread_id = 'thread-' + Mailbox.omail;

		$('a.thread_list').each(function()
			{
			$(this).removeClass('selected');
			});

		$('#' + thread_id).removeClass('unread');
		$('#' + thread_id).addClass('selected');
		$('#' + thread_id).addClass('read');
		},
	/*------------------------------------------------------------------------*/

	/*-- Open the mail -------------------------------------------------------*/
	open_mail : function ()
		{
		if (Mailbox.omail <= 0) return false;

		var fullurl = "/mailbox/open_mail/" + Mailbox.omail;

		$('.mi-info-wrap').empty();
		$('.delete-msg').addClass('hide');

		$.ajax(
			{
			url : fullurl,

			success : function(data)
				{
				try
					{
					var jsonobj = jQuery.parseJSON(data);

					if (jsonobj.status == "ERROR")
						{
						uiAlertMsg("Cannot open message. "
							+ jsonobj.message);
						}
					else
						{
						$('.mi-info-wrap').html(jsonobj.mail);

						if (jsonobj.type == "message")
							{
							$('.mi-info-wrap').scrollTop(
							  $('.mi-info-wrap')[0].scrollHeight);

							$('.delete-msg').text("Delete Thread");

							$('.msging-send').attr("data-id", jsonobj.rcpt + '-'
							  + jsonobj.thread_id);

							Mailbox.tucnt = Mailbox.tucnt - jsonobj.uaffected;
							Mailbox.mucnt = Mailbox.mucnt - jsonobj.uaffected;
							}
						else
							{
							$('.delete-msg').text("Delete Notification");

							Mailbox.tucnt = Mailbox.tucnt - jsonobj.uaffected;
							Mailbox.nucnt = Mailbox.nucnt - jsonobj.uaffected;
							}

						$('.delete-msg').attr('data-id',
						  'delbtn-' + jsonobj.mail_id);
						$('.delete-msg').removeClass('hide');

						Mailbox.update_filter_counters();
						}
					}
				catch (e) {}
				},
			error : function (xhr, status) {}
			});
		},//open_mail
	/*------------------------------------------------------------------------*/


	/*------------------------------------------------------------------------*/
	/*-- MAIL SENDING --------------------------------------------------------*/
	/*------------------------------------------------------------------------*/

	/*-- Enable send mail button ---------------------------------------------*/
	send_mail_enable : function ()
		{
		$(document).on('click', '.msging-send', function()
			{
			var message = $('.message_box').val();
			var dataid = $('.msging-send').attr('data-id');
			var darray = dataid.split('-');

			$.ajax(
				{
				url : "/mailbox/send_thread_message",
				type : 'POST',
				data : 'thread=' + darray[1]
				  + '&rcpt=' + darray[0]
				  + '&message=' + message,

				success : function(data)
					{
					try
						{
						var jsonobj = jQuery.parseJSON(data);

						if (jsonobj.status == "SUCCESS")
							{
							$('.conversation').append($(jsonobj.content));
							$('.message_box').val("");

							$('.mi-info-wrap').scrollTop(
							  $('.mi-info-wrap')[0].scrollHeight);
							}
						else uiAlertMsg("Error sending message. "
						  + jsonobj.message);
						}
					catch (e) {}
					},
				error : function (xhr, status) {}
				});
			});
		},//end send_mail_enable
	/*------------------------------------------------------------------------*/




	/*------------------------------------------------------------------------*/
	/*-- MAIL DELETION -------------------------------------------------------*/
	/*------------------------------------------------------------------------*/

	/*-- Enable the main delete button ---------------------------------------*/
	delete_mail_enable : function ()
		{
		$('.delete-msg').on('click', function()
			{
			var dataid = $(this).attr('data-id');
			dataid = dataid.substr(7);

			var fullurl = "/mailbox/delete_message/" + dataid + "/1";

			$.ajax(
				{
				url : fullurl,

				success : function(data)
					{
					try
						{
						var jsonobj = jQuery.parseJSON(data);

						if (jsonobj.status == "SUCCESS")
							{
							uiAlertMsg("Successfully deleted "
							  + "thread.", 'success');

							$('#maillist-' + dataid).remove();
							$('.mi-info-wrap').empty();
							$('.delete-msg').addClass('hide');

							if ($(".mail-items").children().length <= 0)
							  $('.mail-items').append($(jsonobj.ifempty));
							}
						else uiAlertMsg("Error Deleting Messages. "
						  + jsonobj.message);
						}
					catch (e) {}
					},
				error : function (xhr, status) {}
				});

			return false;
			});
		},//end delete_mail_enable
	/*------------------------------------------------------------------------*/




	/*-- Initialize mailbox js -----------------------------------------------*/
	init : function ()
		{
		this.filter_enable();
		this.open_mail_enable();
		this.delete_mail_enable();
		this.send_mail_enable();
		this.page_start();
		}//end init
	/*------------------------------------------------------------------------*/
	}
Mailbox.init();