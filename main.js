$(document).ready(function(){
	
	// detect IE
	var IEversion = detectIE();
	if (IEversion > 0 && IEversion < 8) {
		alert ('Ваш браузер устарел. Для полноценной работы сайта его необходимо обновить.');
	} else {

		//chosen
		$('.streets-select').chosen();
		
		//masked input
		$("#field_phone").mask("+7 (999) 999 99 99");

		if ($('.mainPopupBlock').length == 0) {
			openMainPopupSubstitute();
		}
		
		if (!$.cookie('penelite_city_id')) {
			updateCityCookies();
			updateShippingInfo();
			updateShippingOptionsShort();
		}
		
		$('.affirmCity').on('click', function(e) {
			e.preventDefault();
			closeFirstPopup();
			$.cookie('penelite_already_visited', '1', { expires: 30, path: '/' });
		});
		
		$('.col_3 button').on('click', function(e) {
			e.preventDefault();
			activateShippingOption($(this));
		});	

		$('.firstPopupBlock .closePopup').on('click', function(e) {
			e.preventDefault();
			closeFirstPopup();
			$.cookie('penelite_already_visited', '1', { expires: 30, path: '/' });
		});	
		
		$('.cartPopupBlock .closeBtn').on('click', function(e) {
			e.preventDefault();
			closeCartPopup();
		});	

		$('.pointDetailedInfoBlock .closePopup').on('click', function(e) {
			e.preventDefault();
			closeDetailedInfo();
		});	

		$('.addToBasketBlock .closePopup').on('click', function(e) {
			e.preventDefault();
			closeAddToBasketPopup();
		});	
		
		$('.mainPopupBlock .closePopup, .mainPopupBlock .big_close_btn').on('click', function(e) {
			e.preventDefault();
			closeMainPopup();
		});

		$('.chooseAnotherCity').on('click', function(e) {
			e.preventDefault();
			closeFirstPopup();
			openMainPopup();
			$('input#city_name').val('');
			$('.region_area').empty();
			$('td.col_3').hide();
			$.cookie('penelite_already_visited', '1', { expires: 30, path: '/' });
		});
		
		$('p.chooseCityLink a, a.region_city_name').on('click', function(e) {
			e.preventDefault();
			//closeFirstPopup();
			if ($('.mainPopupBlock').length) {
				openMainPopup();
			} else {
				$('html,body').animate({
				scrollTop: $(".b-content_column").offset().top},
				'slow');
			}
		});


		if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
			$('input#check_for_city').val('1');
		}
		
		$('.firstPopupBlock .closePopup').on('click', function(e) {
			e.preventDefault();
			closeCartPopup();
			$.cookie('penelite_already_visited', '1', { expires: 30, path: '/' });
		});	


		// TRIGGER 1
		$('.b-cart_table_quantity input').on('input', function() {
			//alert('first');
			startLoader();
			tr1 = 0;
		});

		// TRIGGER 1a
		$('a.b-cart_table_delete_btn').on('click', function() {
			//alert('first');
			startLoader();
			tr1 = 0;
		});

		// TRIGGER 2
		$('#weight_input').change(function(){
			var input = $(this);
			var old = input.attr("data-old-value");
			var current = input.val();
			if (old !== current) { 
			  input.attr("data-old-value", current);
			  $(':radio:checked.delivery_choose').get(0).click();
			} 
		})

		// TRIGGER 3
		$('#summary_input').change(function(){
			var input = $(this);
			var old = input.attr("data-old-value");
			var current = input.val();
			if (old !== current) { 
			  input.attr("data-old-value", current);
			  //$('.b-cart_table_delivery').css('background','#FFF');
			} 
		})
		
		// TRIGGER 4
		var tr1 = 0;
		$('#delivery_input').change(function(){
			tr1++;
			if (tr1 == 2) {
				//alert('hop');
				endLoader();
				tr1 = 0;
			}
		})
		
		/* moscow streets */
		$('.moscow_streets_btn').on('click', function(e) {
			e.preventDefault();
			var moscowStreet = $('.streets-select').val();
			var moscowHouse = $('.house-input').val();
			if (!moscowStreet || !moscowHouse) {
				showCartPopup('Пожалуйста, укажите Ваш адрес - улицу и дом!');
			} else {
				$.cookie('penelite_moscow_street', moscowStreet, { expires: 30, path: '/' });
				$.cookie('penelite_moscow_house', moscowHouse, { expires: 30, path: '/' });
				$(':radio:checked.delivery_choose').get(0).click();
				startLoader();
				tr1 = 0;
				deliveryChange();
				$('button.moscow_streets_btn').addClass('selected_street').text('Сохранено');	
			}
		});	

		$('.content_mode.pickup input, .content_mode.pickup label').on('click', function() {
			updateMapPoints();
		});
		
		$('select#delivery_office_id').on('change', function() {
			var value = $('select#delivery_office_id').val();
			if (value) {
				var coords = $('option:selected', $('select#delivery_office_id')).attr('coords');
				var address = $('option:selected', $('select#delivery_office_id')).attr('address');
				var working_time = $('option:selected', $('select#delivery_office_id')).attr('working_time');
				var code = $('option:selected', $('select#delivery_office_id')).attr('value');
				var balloon = $('option:selected', $('select#delivery_office_id')).attr('balloon');
				var pickup_type = $('option:selected', $('select#delivery_office_id')).attr('pickup_type');
				openBalloon(value,coords,balloon,pickup_type,address,working_time,code);
			} else {
				$.removeCookie("pickup_type", { path: '/' });
				$.removeCookie("pickup_point", { path: '/' }); 
				$.removeCookie("pickup_address", { path: '/' }); 
				$.removeCookie("pickup_working_time", { path: '/' }); 
				$.removeCookie("pickup_code", { path: '/' }); 
				myMap.balloon.close();
			}
			if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
				$(':radio:checked.delivery_choose').get(0).click();
			}
			startLoader();
			tr1 = 0;
			deliveryChange();
		});
		
		$('select#courier_tarif_id').on('change', function() {
			var value = $('select#courier_tarif_id').val();
			$.cookie('dpd_tarif', value, { expires: 30, path: '/' });
			if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
				$(':radio:checked.delivery_choose').get(0).click();
			}
			startLoader();
			tr1 = 0;
			deliveryChange();
		});
		
		// main city autocomplete
		var typingTimer;

		$("#city_name").keyup(function(){
			popupCenterVertical();
			activateSingleOptionKeyup(typingTimer);
			if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
				$('input#check_for_city').val('');
				$('tr.b-cart_table_delivery_price td.b-cart_table_price').text('');
				$('tr.b-cart_table_footer td.b-cart_table_price').text('');
			}
			$.ajax({
				type: "POST",
				url: "/ajaxGetCity.php",
				data:'keyword='+$(this).val(),
				beforeSend: function(){
					//$("#city_name").css("background","#FFF url(/autoshipping/img/LoaderIcon20.gif) no-repeat 255px");
					$(".region_area").hide();
					$(".choice_location .company_modes .col_3").hide();
					$('.companies').hide();
					$("#ymap_location").hide(); 
					$(".wrap_offices").hide(); 
					$(".wrap_tarifs").hide(); 
					$("#map").empty(); 
					$('.pochta').empty(); 
					$("#post_index_id").val(''); 
					$('#courier_tarif_id').empty();
					$('p.cash_pay_service').hide();
				},
				success: function(data){
					$("#suggesstion-box").show();
					$("#suggesstion-box").html(data);
					//$("#city_name").css("background","#FFF");
				}
			});
		});
		
		// main postcode autocomplete
		$("#post_index_id").on('input', function() {
			popupCenterVertical();
			if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
				$('input#check_for_city').val('1');
				$('tr.b-cart_table_delivery_price td.b-cart_table_price').text('');
				$('tr.b-cart_table_footer td.b-cart_table_price').text('');
			}
			var value = $(this).val();
			if ( value.length < 6 ) {
				$(".region_area").hide();
				$(".choice_location .company_modes .col_3").hide();
				$('.companies').hide();
				$("#ymap_location").hide(); 
				$(".wrap_offices").hide(); 
				$(".wrap_tarifs").hide(); 
				$("#map").empty(); 
				$('.pochta').empty(); 
				$(".post_index .error").show(); 
			}
			if ( value.length == 6 ) { 
				$(".post_index .error").hide(); 
				$.ajax({
					type: "POST",
					url: "/ajaxGetCityByPostcode.php",
					data:'postcode='+value,
					beforeSend: function(){
						$(".temp_block").show();
						$(".temp_block").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
					},
					
					success: function(data){
						$(".temp_block").css("background","none");
						var returnedData = JSON.parse(data);
						var city_name = returnedData['city_name'];	
						var city_id = returnedData['id'];	
						var region_code = returnedData['region_code'];	
						var region_name = returnedData['region_name'];	
						selectCity(city_name, city_id, region_code, region_name);
						$.cookie('penelite_postcode', value, { expires: 30, path: '/' });
					}
				});
			}
		});
		
		// product page
		if ($('.object_page_shipping_info').length > 0) {
			var capitals_area = $.cookie('capitals_area');
			if (capitals_area == 'moscow_subregion') {
				$('.object_page_shipping_info.moscow').show();
			} else if (capitals_area == 'peterburg_subregion') {
				$('.object_page_shipping_info.spb').show();
			} else {
				$('.object_page_shipping_info.regions').show();
			}
		}

		// beznal oplata
		$("input[name='payment-id']").on('change', function() {
			if ($("#delivery-id").val() == '1613' || $("#delivery-id").val() == '150637') {
				if ($("input:radio[name='payment-id']:checked").val() == '1630') {
					$('label.b-form_box_title.field_lname').html('Фамилия');
					$('input#field_lname').removeAttr('data-required');
					$('.b-form_box.lname_box').removeClass('g-success').removeClass('g-error');
					$('.b-form_box.lname_box .b-form_box_field_error').remove();
					$(".b-form_fieldset.requisites input[id!=field_kpp]").attr('data-required','false');
				} else {
					$('label.b-form_box_title.field_lname').html('Фамилия <span>*</span>');
					$('input#field_lname').attr('data-required','true');
				}
			} 
			if ($("input:radio[name='payment-id']:checked").val() == '244794') {
				$(".b-form_fieldset.requisites").slideDown('medium');
				$(".b-form_fieldset.requisites input[id!=field_kpp]").attr('data-required','true');
			} else {
				$(".b-form_fieldset.requisites").slideUp('medium');
				$(".b-form_fieldset.requisites input").removeAttr('data-required');
			}
		})
		
		// courier time range
		$("select.courier_time_from").on('change', function() {
			var select_to = $("select.courier_time_to");
			select_to.empty();
			// for region
			if ($.cookie('moscow_or_peterburg_region_only') == '1' && $.cookie('capitals_area') == 'moscow_subregion') {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					if ($(this).val() == '10:00') {
						select_to.append('<option value="">--:--</option><option value="18:00">18:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '15:00') {
						select_to.append('<option value="">--:--</option><option value="22:00">22:00</option>');
					} 
				} else {
					select_to.append('<option value="">--:--</option><option value="20:00">20:00</option>');
				}
			} else if ($.cookie('moscow_or_peterburg_region_only') == '1' && $.cookie('capitals_area') == 'peterburg_subregion') {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					if ($(this).val() == '10:00') {
						select_to.append('<option value="">--:--</option><option value="22:00">22:00</option>');
					} 
				} else {
					select_to.append('<option value="">--:--</option><option value="20:00">20:00</option>');
				}
			} else {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					if ($(this).val() == '10:00' || $(this).val() == '11:00' || $(this).val() == '12:00') {
						select_to.append('<option value="">--:--</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '13:00') {
						select_to.append('<option value="">--:--</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '14:00') {
						select_to.append('<option value="">--:--</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '15:00') {
						select_to.append('<option value="">--:--</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '16:00') {
						select_to.append('<option value="">--:--</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '17:00') {
						select_to.append('<option value="">--:--</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '18:00') {
						select_to.append('<option value="">--:--</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
					} else if ($(this).val() == '19:00') {
						select_to.append('<option value="">--:--</option><option value="22:00">22:00</option>');
					}
				} else {
					if ($(this).val() == '10:00' || $(this).val() == '11:00' || $(this).val() == '12:00') {
						select_to.append('<option value="">--:--</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
					} else if ($(this).val() == '13:00') {
						select_to.append('<option value="">--:--</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
					} else if ($(this).val() == '14:00') {
						select_to.append('<option value="">--:--</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
					} else if ($(this).val() == '15:00') {
						select_to.append('<option value="">--:--</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
					} else if ($(this).val() == '16:00') {
						select_to.append('<option value="">--:--</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
					} else if ($(this).val() == '17:00') {
						select_to.append('<option value="">--:--</option><option value="20:00">20:00</option>');
					}
				}
			}
		})
		$("input[name='courier_day_type']").on('change', function() {
			var select_from = $("select.courier_time_from");
			var select_to = $("select.courier_time_to");
			select_from.empty();
			select_to.empty();
			if ($.cookie('moscow_or_peterburg_region_only') == '1' && $.cookie('capitals_area') == 'moscow_subregion') {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option><option value="15:00">15:00</option>');
					select_to.append('<option value="">--:--</option><option value="18:00">18:00</option><option value="22:00">22:00</option>');
				} else {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option>');
					select_to.append('<option value="">--:--</option><option value="20:00">20:00</option>');
				}
			} else if ($.cookie('moscow_or_peterburg_region_only') == '1' && $.cookie('capitals_area') == 'peterburg_subregion') {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option>');
					select_to.append('<option value="">--:--</option><option value="22:00">22:00</option>');
				} else {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option>');
					select_to.append('<option value="">--:--</option><option value="20:00">20:00</option>');
				}
			} else {
				if ($("input:radio[name='courier_day_type']:checked").val() == 'working-day') {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option>');
					select_to.append('<option value="">--:--</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option>');
				} else {
					select_from.append('<option value="">--:--</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option>');
					select_to.append('<option value="">--:--</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option>');
				}
			}
		})
		
		$("select.streets-select, input.house-input").on('input', function() {
			$('button.moscow_streets_btn').removeClass('selected_street').text('Сохранить и рассчитать');	
		})	
	}
});


function popupCenterVertical() {
	var winH = $(window).height();
	var popH = $(".mainPopupBlock").height();
	if (winH < (popH - 20)) {
		$(".mainPopupBlock").css('top', '200px');
	} else {
		$(".mainPopupBlock").css('top', (winH/2) - (popH/2) + 140 + 'px');
	}
}
	
function closeFirstPopup() {
	$('.firstPopupBlock').hide();
    //$('.popup_bg').hide();
}

function closeMainPopup() {
	
	/*if ($.cookie('penelite_city_id') !== $("input#popup_city_id").val()) {
		updateHeaderCity();
	} */
	
	$('.mainPopupBlock').hide();
   	$('.popup_bg').hide();
	
	/*if ($.cookie('penelite_city_id') !== $("input#popup_city_id").val()) {
		updateCityCookies();
		updateShippingInfo();
	} */
}

function openMainPopup() {

	// update
    var currentCityId = $('span#currentCityIdValue').text();
	var currentCityName = $("a#currentCityNameValue").text();
	var currentRegionName = $("span#currentCityRegionNameValue").text();
    var currentCityRegionId = $('span#currentCityRegionIdValue').text();
	
	$("#city_name").val(currentCityName);
	$(".region_area").text(currentRegionName);
	$("input#popup_city_id").val(currentCityId);
	$("input#popup_region_code").val(currentCityRegionId);
	
	popupCenterVertical();
    $('.popup_bg').show();
	$('.mainPopupBlock').show();
	
	$('.boxberry_pickup_list_item').hide();
	$('.dpd_pickup_list_item').hide();

	var capitals_area = $.cookie('capitals_area');
	if (capitals_area == 'moscow_subregion' || capitals_area == 'peterburg_subregion') {
		$(".pickup.col_3").show();
		$(".courier.col_3").show();
		$(".courier.col_3").addClass('no-right-border');
	} else {
		var shipping_options_array = $.cookie('shipping_options_array');
		var returnedData = JSON.parse(shipping_options_array);
		if(returnedData['boxberryPickup'] > 0 || returnedData['DPDPickup'] > 0) {
			$(".pickup.col_3").show();
		}
		if(returnedData['boxberryPickup'] > 0) {
			$('.boxberry_pickup_list_item').show();
		}
		if(returnedData['DPDPickup'] > 0) {
			$('.dpd_pickup_list_item').show();
		}
		if(returnedData['DPDCourier']) {
			$(".courier.col_3").show();
		}
		
		if ($(".courier.col_3").hasClass('no-right-border')) $(".courier.col_3").removeClass('no-right-border');
		$(".russian_post.col_3").show();
	}
	
	activateShippingOptionFromCookie();
	
	$('.shipping.boxberry_pickup_days span').text($.cookie('boxberry_pickup_days')+' '+getDays($.cookie('boxberry_pickup_days')));
	$('.shipping.boxberry_pickup_days strong').text($.cookie('boxberry_pickup_cost'));
	$('.shipping.dpd_pickup_days span').text($.cookie('dpd_pickup_days')+' '+getDays($.cookie('dpd_pickup_days')));
	$('.shipping.dpd_pickup_days strong').text($.cookie('dpd_pickup_cost'));
	$('.shipping.dpd_courier_days span').text($.cookie('dpd_courier_days')+' '+getDaysDecl($.cookie('dpd_courier_days')));
	$('.shipping.dpd_courier_days strong').text($.cookie('dpd_courier_cost'));
	
	var penelite_postcode = $.cookie('penelite_postcode');
	if (penelite_postcode) $('#post_index_id').val(penelite_postcode);
	
}

function openMainPopupSubstitute() {
		
	setTimeout(
	  function() 
	  {
		// update
		var currentCityId = $('span#currentCityIdValue').text();
		var currentCityName = $("a#currentCityNameValue").text();
		var currentRegionName = $("span#currentCityRegionNameValue").text();
		var currentCityRegionId = $('span#currentCityRegionIdValue').text();
		
		$("#city_name").val(currentCityName);
		$(".region_area").text(currentRegionName);
		$("input#popup_city_id").val(currentCityId);
		$("input#popup_region_code").val(currentCityRegionId);
		
		$('.boxberry_pickup_list_item').hide();
		$('.dpd_pickup_list_item').hide();
	
		var capitals_area = $.cookie('capitals_area');
		if (capitals_area == 'moscow_subregion' || capitals_area == 'peterburg_subregion') {
			$(".pickup.col_3").show();
			$(".courier.col_3").show();
			$(".courier.col_3").addClass('no-right-border');
		} else {
			var shipping_options_array = $.cookie('shipping_options_array');
			var returnedData = JSON.parse(shipping_options_array);
			if(returnedData['boxberryPickup'] > 0 || returnedData['DPDPickup'] > 0) {
				$(".pickup.col_3").show();
			}
			if(returnedData['boxberryPickup'] > 0) {
				$('.boxberry_pickup_list_item').show();
			}
			if(returnedData['DPDPickup'] > 0) {
				$('.dpd_pickup_list_item').show();
			}
			if(returnedData['DPDCourier']) {
				$(".courier.col_3").show();
			}
			
			if ($(".courier.col_3").hasClass('no-right-border')) $(".courier.col_3").removeClass('no-right-border');
			$(".russian_post.col_3").show();
		}
		
		activateShippingOptionFromCookie();
		
		$('.shipping.boxberry_pickup_days span').text($.cookie('boxberry_pickup_days')+' '+getDays($.cookie('boxberry_pickup_days')));
		$('.shipping.boxberry_pickup_days strong').text($.cookie('boxberry_pickup_cost'));
		$('.shipping.dpd_pickup_days span').text($.cookie('dpd_pickup_days')+' '+getDays($.cookie('dpd_pickup_days')));
		$('.shipping.dpd_pickup_days strong').text($.cookie('dpd_pickup_cost'));
		$('.shipping.dpd_courier_days span').text($.cookie('dpd_courier_days')+' '+getDaysDecl($.cookie('dpd_courier_days')));
		$('.shipping.dpd_courier_days strong').text($.cookie('dpd_courier_cost'));
		
		var penelite_postcode = $.cookie('penelite_postcode');
		if (penelite_postcode) $('#post_index_id').val(penelite_postcode);
	  }, 1000);

	
}

function selectCity(city_name, city_id, region_code, region_name) {
	$.removeCookie("shipping_options_array", { path: '/' }); 
	$.removeCookie("shipping_option_selected", { path: '/' }); 
	$.removeCookie("boxberry_pickup_days", { path: '/' }); 
	$.removeCookie("pickup_type", { path: '/' });
	$.removeCookie("pickup_point", { path: '/' }); 
	$.removeCookie("pickup_address", { path: '/' }); 
	$.removeCookie("pickup_working_time", { path: '/' }); 
	$.removeCookie("pickup_code", { path: '/' }); 
	$.removeCookie("dpd_pickup_days", { path: '/' }); 
	$.removeCookie("dpd_courier_days", { path: '/' }); 
	$.removeCookie("dpd_courier_cost", { path: '/' }); 
	$.removeCookie("dpd_classic_days", { path: '/' }); 
	$.removeCookie("dpd_consumer_days", { path: '/' }); 
	$.removeCookie("dpd_cash_pay", { path: '/' }); 
	$.removeCookie("dpd_tarif", { path: '/' }); 
	$.removeCookie("penelite_postcode", { path: '/' }); 
	$.removeCookie("capitals_area", { path: '/' }); 
	$.removeCookie("penelite_moscow_street", { path: '/' });
	$.removeCookie("penelite_moscow_house", { path: '/' });

	$('#delivery_office_id').empty();
	$("#suggesstion-box").hide();
	$(".region_area").show();
	$("#city_name").val(city_name);
	$("div.region_area").text(region_name);
	$("input#popup_city_id").val(city_id);
	$("input#popup_region_code").val(region_code);
	$(".moscow_streets").hide();
	
	if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
		$('input#check_for_city').val('1');
	}

	updateShippingOptions();
	
}

function updateHeaderCity() {
	
	var popupCityName = $("#city_name").val();
	var popupCityId = $("input#popup_city_id").val();
	var popupCityRegionName = $("div.region_area").text();
	var popupCityRegionCode = $("input#popup_region_code").val();
	
	$('a#currentCityNameValue').text(popupCityName);
	$('span#currentCityIdValue').text(popupCityId);
	$('span#currentCityRegionNameValue').text(popupCityRegionName);
	$('span#currentCityRegionIdValue').text(popupCityRegionCode);
	
}

function updateCityCookies() {
	
	// save city ID
    var currentCityId = $('span#currentCityIdValue').text();
	if (currentCityId) $.cookie('penelite_city_id', currentCityId, { expires: 30, path: '/' });
	// save city NAME
    var currentCityName = $('a#currentCityNameValue').text();
	if (currentCityName) $.cookie('penelite_city_name', currentCityName, { expires: 30, path: '/' });
	// save city REGION ID
    var currentCityRegionId = $('span#currentCityRegionIdValue').text();
	if (currentCityRegionId) $.cookie('penelite_city_region_id', currentCityRegionId, { expires: 30, path: '/' });
	// save city REGION NAME
    var currentCityRegionName = $('span#currentCityRegionNameValue').text();
	if (currentCityRegionName) $.cookie('penelite_city_region_name', currentCityRegionName, { expires: 30, path: '/' });

}

function updateShippingInfo() {

		$.ajax({
			type: "POST",
			url: "/ajaxGetTelephone.php",
			data:'cityId='+$('span#currentCityIdValue').text()+'&cityName='+$('a#currentCityNameValue').text()+'&regionId='+$('span#currentCityRegionIdValue').text(),
			beforeSend: function(){
				$(".b-header_section_phone span").empty();
			},
			success: function(data){
			
				// TELEPHONE
				var returnedData = JSON.parse(data);
				
				if (returnedData['number']) {
					telephone = returnedData['number'];
					telephone_info = returnedData['info'];
				} else {
					telephone = $("#penelite_default_telephone").val();
					telephone_info = $("#penelite_default_telephone_info").val();
				}
				
				moscow_phone = $("#penelite_moscow_telephone").val();
				moscow_phone_info = $("#penelite_moscow_telephone_info").val();
				
				if (returnedData['moscow_region']) {
					telephone_full_info = '<span class="moscow_phone">'+moscow_phone+'</span><span class="moscow_phone_info">'+moscow_phone_info+'</span><span class="default_phone">'+telephone+'</span><span class="default_phone_info">'+telephone_info+'</span>';
				} else {
					telephone_full_info = '<span class="default_phone">'+telephone+'</span><span class="default_phone_info">'+telephone_info+'</span><span class="moscow_phone">'+moscow_phone+'</span><span class="moscow_phone_info">'+moscow_phone_info+'</span>';
				}
				$(".b-header_section_phone").html(telephone_full_info);
				
				$.cookie('penelite_second_telephone', telephone, { expires: 30, path: '/' });
				$.cookie('penelite_second_telephone_info', telephone_info, { expires: 30, path: '/' });
				
				$.ajax({
					type: "POST",
					url: "/ajaxGetShippingInfo.php",
					data:'cityId='+$('span#currentCityIdValue').text()+'&cityName='+$('a#currentCityNameValue').text()+'&regionId='+$('span#currentCityRegionIdValue').text(),
					beforeSend: function(){
						$("p.choosenCityInfo").empty();
						$("p.choosenCityInfo").append( "<span class='loader'>Производится расчет стоимости доставки</span>" );
						$("p.choosenCityInfo").css("background","url(/autoshipping/img/LoaderIcon.gif) top center no-repeat");
					},
					success: function(data){
						var returnedData = JSON.parse(data);
						
						// SHIPPING HEADER
						$("p.choosenCityInfo .loader").remove();
						$("p.choosenCityInfo").css("background","none");
						$("p.choosenCityInfo").html(returnedData['shipping']);
						var currentCityShippingInfo = $('p.choosenCityInfo').html();
						if (currentCityShippingInfo) $.cookie('penelite_city_shipping_info', currentCityShippingInfo, { expires: 30, path: '/' });
						
						// moscow/peterburg region
						if (returnedData['moscow_or_peterburg_region_only'] == '1') {
							$.cookie('moscow_or_peterburg_region_only', '1', { expires: 30, path: '/' });
							$.cookie('distance_from_mkad', returnedData['distance_from_mkad'], { expires: 30, path: '/' });
						} else {
							$.removeCookie("moscow_or_peterburg_region_only", { path: '/' });
							$.removeCookie("distance_from_mkad", { path: '/' });
						}

						// PRODUCT PAGE
						if (returnedData['courier_shipping_price'] > 0) {
							$.cookie('penelite_courier_start_cost', returnedData['courier_shipping_price'], { expires: 30, path: '/' });
						} else {
							$.removeCookie("penelite_courier_start_cost", { path: '/' });
						}
						if ($('.object_page_shipping_info').length > 0) {
							$('.object_page_shipping_info').hide();
							var capitals_area = $.cookie('capitals_area');
							var penelite_city_name = $.cookie('penelite_city_name');
							if (capitals_area == 'moscow_subregion') {
								$('.object_page_shipping_info.moscow').show();
							} else if (capitals_area == 'peterburg_subregion') {
								$('.object_page_shipping_info.spb').show();
							} else {
								if (returnedData['courier_shipping_price'] > 0) {
									$('.object_page_shipping_info.regions a.region_city_name').text(penelite_city_name);
									$('.object_page_shipping_info.regions span.region_city_courier_price').text(returnedData['courier_shipping_price']);
									$('.object_page_shipping_info.regions').show();
								}
							}
						}
						
					}
					
				});
			}
			
		});


}

function updateShippingOptions() {
	
		$.ajax({
			type: "POST",
			url: "/ajaxGetShippingOptions.php",
			data:'cityId='+$("input#popup_city_id").val()+'&cityName='+$("#city_name").val()+'&regionId='+$("input#popup_region_code").val()+'&regionName='+$(".region_area").html(),
			beforeSend: function(){
				$('button.not_selected').show();
				$('button.selected').hide();
				$('.boxberry_pickup_list_item').hide();
				$('.dpd_pickup_list_item').hide();
				$('td.col_3').removeClass('active');
				$(".temp_block").show();
				$(".temp_block").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
			},
			success: function(data){
				$(".temp_block").hide();
				var returnedData = JSON.parse(data);
				// if moscow_subregion or peterburg_subregion
				if(returnedData['capitals_area'] == 'moscow_subregion' || returnedData['capitals_area'] == 'peterburg_subregion') {
					$(".pickup.col_3").show();
					$(".courier.col_3").show();
					$(".courier.col_3").addClass('no-right-border');
					$.cookie('capitals_area', returnedData['capitals_area'], { expires: 30, path: '/' });
				} 
				// if regions
				else {
					$.cookie('shipping_options_array', data, { expires: 30, path: '/' });
					if(returnedData['boxberryPickup'] > 0 || returnedData['DPDPickup'] > 0) {
						$(".pickup.col_3").show();
					}
					if(returnedData['boxberryPickup'] > 0) {
						$('.boxberry_pickup_list_item').show();
						$('.shipping.boxberry_pickup_days span').text(returnedData['boxberryPickup']+' '+getDays(returnedData['boxberryPickup']));
						$('.shipping.boxberry_pickup_days strong').text(returnedData['boxberryPickupCost']);
						$.cookie('boxberry_pickup_days', returnedData['boxberryPickup'], { expires: 30, path: '/' });
						$.cookie('boxberry_pickup_cost', returnedData['boxberryPickupCost'], { expires: 30, path: '/' });
					} else {
						$('.boxberry_pickup_list_item').hide();
						$.removeCookie("boxberry_pickup_days"); 
						$.removeCookie("boxberry_pickup_cost"); 
					}
					if(returnedData['DPDPickup'] > 0) {
						$('.dpd_pickup_list_item').show();
						$('.shipping.dpd_pickup_days span').text(returnedData['DPDPickup']+' '+getDays(returnedData['DPDPickup']));
						$('.shipping.dpd_pickup_days strong').text(returnedData['DPDPickupCost']);
						$.cookie('dpd_pickup_days', returnedData['DPDPickup'], { expires: 30, path: '/' });
						$.cookie('dpd_pickup_cost', returnedData['DPDPickupCost'], { expires: 30, path: '/' });
					} else {
						$('.dpd_pickup_list_item').hide();
						$.removeCookie("dpd_pickup_days"); 
						$.removeCookie("dpd_pickup_cost"); 
					}
					if(returnedData['DPDCourier']) {
						$(".courier.col_3").show();
						$('.shipping.dpd_courier_days span').text(returnedData['DPDCourier']+' '+getDaysDecl(returnedData['DPDCourier']));
						$('.shipping.dpd_courier_days strong').text(returnedData['DPDCourierCost']);
						$.cookie('dpd_courier_days', returnedData['DPDCourier'], { expires: 30, path: '/' });
						$.cookie('dpd_courier_cost', returnedData['DPDCourierCost'], { expires: 30, path: '/' });
					}
					
					$.cookie('dpd_classic_days', returnedData['DPDClassic'], { expires: 30, path: '/' });
					$.cookie('dpd_consumer_days', returnedData['DPDConsumer'], { expires: 30, path: '/' });
					$.cookie('dpd_classic_cost', returnedData['DPDClassicCost'], { expires: 30, path: '/' });
					$.cookie('dpd_consumer_cost', returnedData['DPDConsumerCost'], { expires: 30, path: '/' });
					if (returnedData['DPDCashPay'] == 1) $.cookie('dpd_cash_pay', returnedData['DPDCashPay'], { expires: 30, path: '/' });

					if ($(".courier.col_3").hasClass('no-right-border')) $(".courier.col_3").removeClass('no-right-border');
					$(".russian_post.col_3").show();
					
					$.cookie('russian_post_days', returnedData['RussianPostDays'], { expires: 30, path: '/' });
					$.cookie('russian_post_cost', returnedData['RussianPostCost'], { expires: 30, path: '/' });
				}
				
				if ($.cookie('penelite_city_id') !== $("input#popup_city_id").val()) {
					updateHeaderCity();
					updateCityCookies();
					updateShippingInfo();
				} 
				
				// load 38 page info
				if ($('.mainPopupBlock').length == 0) {
					$.ajax({
						type: "POST",
						url: "/ajaxGetShippingConditions.php",
						data:'cityName='+$('a#currentCityNameValue').text()+'&regionId='+$('span#currentCityRegionIdValue').text(),
						beforeSend: function(){
							$(".mainPopupInPageArticle").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
						},
						success: function(data){
							//alert(data);
							data = $('<div>').append(data).html();
							$(".mainPopupInPageArticle").css("background","none");
							$(".mainPopupInPageArticle").html(data);
						}
					});
				}
				
				if ($('.contactsPage').length > 0) {
					$.ajax({
						type: "POST",
						url: "/ajaxGetContactsPage.php",
						data:'cityName='+$('a#currentCityNameValue').text()+'&regionId='+$('span#currentCityRegionIdValue').text(),
						beforeSend: function(){
							$(".contactsPage").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
						},
						success: function(data){
							//alert(data);
							data = $('<div>').append(data).html();
							$(".contactsPage").css("background","none");
							$(".contactsPage").html(data);
						}
					});
				}

			}
		});

}

function updateShippingOptionsShort() {

		$.ajax({
			type: "POST",
			url: "/ajaxGetShippingOptions.php",
			data:'cityId='+$.cookie('penelite_city_id')+'&cityName='+$.cookie('penelite_city_name')+'&regionId='+$.cookie('penelite_city_region_id')+'&regionName='+$.cookie('penelite_city_region_name'),
			beforeSend: function(){
				$('button.not_selected').show();
				$('button.selected').hide();
				$('.boxberry_pickup_list_item').hide();
				$('.dpd_pickup_list_item').hide();
				$('td.col_3').removeClass('active');
				$(".temp_block").show();
				$(".temp_block").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
			},
			success: function(data){
				$(".temp_block").hide();
				var returnedData = JSON.parse(data);
				// if moscow_subregion or peterburg_subregion
				if(returnedData['capitals_area'] == 'moscow_subregion' || returnedData['capitals_area'] == 'peterburg_subregion') {
					$(".pickup.col_3").show();
					$(".courier.col_3").show();
					$(".courier.col_3").addClass('no-right-border');
					$.cookie('capitals_area', returnedData['capitals_area'], { expires: 30, path: '/' });
				} 
				// if regions
				else {
					$.cookie('shipping_options_array', data, { expires: 30, path: '/' });
					if(returnedData['boxberryPickup'] > 0 || returnedData['DPDPickup'] > 0) {
						$(".pickup.col_3").show();
					}
					if(returnedData['boxberryPickup'] > 0) {
						$('.boxberry_pickup_list_item').show();
						$('.shipping.boxberry_pickup_days span').text(returnedData['boxberryPickup']+' '+getDays(returnedData['boxberryPickup']));
						$('.shipping.boxberry_pickup_days strong').text(returnedData['boxberryPickupCost']);
						$.cookie('boxberry_pickup_days', returnedData['boxberryPickup'], { expires: 30, path: '/' });
						$.cookie('boxberry_pickup_cost', returnedData['boxberryPickupCost'], { expires: 30, path: '/' });
					}
					if(returnedData['DPDPickup'] > 0) {
						$('.dpd_pickup_list_item').show();
						$('.shipping.dpd_pickup_days span').text(returnedData['DPDPickup']+' '+getDays(returnedData['DPDPickup']));
						$('.shipping.dpd_pickup_days strong').text(returnedData['DPDPickupCost']);
						$.cookie('dpd_pickup_days', returnedData['DPDPickup'], { expires: 30, path: '/' });
						$.cookie('dpd_pickup_cost', returnedData['DPDPickupCost'], { expires: 30, path: '/' });
					}
					if(returnedData['DPDCourier']) {
						$(".courier.col_3").show();
						$('.shipping.dpd_courier_days span').text(returnedData['DPDCourier']+' '+getDaysDecl(returnedData['DPDCourier']));
						$('.shipping.dpd_courier_days strong').text(returnedData['DPDCourierCost']);
						$.cookie('dpd_courier_days', returnedData['DPDCourier'], { expires: 30, path: '/' });
						$.cookie('dpd_courier_cost', returnedData['DPDCourierCost'], { expires: 30, path: '/' });
					}
					
					$.cookie('dpd_classic_days', returnedData['DPDClassic'], { expires: 30, path: '/' });
					$.cookie('dpd_consumer_days', returnedData['DPDConsumer'], { expires: 30, path: '/' });
					$.cookie('dpd_classic_cost', returnedData['DPDClassicCost'], { expires: 30, path: '/' });
					$.cookie('dpd_consumer_cost', returnedData['DPDConsumerCost'], { expires: 30, path: '/' });
					if (returnedData['DPDCashPay'] == 1) $.cookie('dpd_cash_pay', returnedData['DPDCashPay'], { expires: 30, path: '/' });

					if ($(".courier.col_3").hasClass('no-right-border')) $(".courier.col_3").removeClass('no-right-border');
					$(".russian_post.col_3").show();
					
					$.cookie('russian_post_days', returnedData['RussianPostDays'], { expires: 30, path: '/' });
					$.cookie('russian_post_cost', returnedData['RussianPostCost'], { expires: 30, path: '/' });
				}
			}
		});

}

function activateShippingOption(el) {
	
	if ($(el).hasClass('not_selected')) {
		$('button.not_selected').show();
		$('button.selected').hide();
		$('td.col_3').removeClass('active');
		$(el).hide();
		$(el).parent().find('button.selected').show();
		$(el).parent().addClass('active');
		
		var selected_option = $(el).parent().find('input.shipping_option_selected').val();
		$.cookie('shipping_option_selected', selected_option, { expires: 30, path: '/' });
		
		showDetailedShippingOption(selected_option);
		
	}

	updateShippingRadioList();
	
}

function activateShippingOptionFromCookie() {
	
	var option_selected_from_cookie = $.cookie('shipping_option_selected');
	
	if (option_selected_from_cookie) {
		if (option_selected_from_cookie == 'pickup') {
			choice = $('.col_3.pickup button.not_selected');
		} else if (option_selected_from_cookie == 'courier') {
			choice = $('.col_3.courier button.not_selected');
		} else if (option_selected_from_cookie == 'russian_post') {
			choice = $('.col_3.russian_post button.not_selected');
		}
		
		choice.parent().find('button.not_selected').hide();
		choice.parent().find('button.selected').show();
		choice.parent().addClass('active');
			
		showDetailedShippingOption(option_selected_from_cookie);
		
	}
		
	updateShippingRadioList();
	
}

function showDetailedShippingOption(option) {
	
	$('.companies').show();
	$('.companies .content_mode').hide();
	
	if (option == 'pickup') {
		$('.companies .content_mode.pickup').show();
		$("#ymap_location").show(); 
		$(".wrap_offices").show(); 
		$(".wrap_offices .self_delivery").show(); 
		$(".wrap_offices .pochta").hide(); 
		$(".wrap_tarifs").hide(); 
		$('#map').empty();
		$(".moscow_streets").hide();
		
		$(".companies .content_mode.pickup li").hide();
		$("input#boxberry_pickup_checkbox, input#dpd_pickup_checkbox").prop('checked','checked');
		var capitals_area = $.cookie('capitals_area');
		if (capitals_area == 'moscow_subregion') {
			$(".companies .content_mode.pickup li.moscow_pickup").show();
		} else if (capitals_area == 'peterburg_subregion') {
			$(".companies .content_mode.pickup li.spb_pickup").show();
		} else {
			if ($.cookie('boxberry_pickup_days')) {
				$(".companies .content_mode.pickup li.boxberry_pickup_list_item").show();
			}
			if ($.cookie('dpd_pickup_days')) {
				$(".companies .content_mode.pickup li.dpd_pickup_list_item").show();
			}
		}
		
		yMapsLoad('all');
		
	}
	
	if (option == 'courier') {
		$('.companies .content_mode.courier').show();
		$("#ymap_location").hide(); 
		$(".wrap_offices").hide(); 
		$(".wrap_offices .self_delivery").hide(); 
		$(".wrap_offices .pochta").hide(); 
		$(".moscow_streets").hide();
		
		$(".companies .content_mode.courier li").hide();
		if ($.cookie('penelite_city_id') == 15536) {
			$(".moscow_streets").show();		
		}
		var capitals_area = $.cookie('capitals_area');
		if (capitals_area == 'moscow_subregion') {
			$(".companies .content_mode.courier li.moscow_option").show();
		} else if (capitals_area == 'peterburg_subregion') {
			$(".companies .content_mode.courier li.spb_option").show();
		} else {
			$(".wrap_tarifs").show(); 
			$(".companies .content_mode.courier li.dpd_option").show();
			
			var DPDClassic = $.cookie('dpd_classic_days');
			var DPDConsumer = $.cookie('dpd_consumer_days');
			var DPDClassicCost = $.cookie('dpd_classic_cost');
			var DPDConsumerCost = $.cookie('dpd_consumer_cost');
			var DPDCashPay = $.cookie('dpd_cash_pay');
			var DPDTarif = $.cookie('dpd_tarif');
			
			if ($("#courier_tarif_id").text().length < 1) {
				$('#courier_tarif_id').append($("<option></option>").attr("value",'').text('Выберите'));
				$('.courier_tarifs').show();
				if ((DPDClassic == DPDConsumer) && DPDClassic !== 'null') {
						$('.courier_tarifs').hide();
						$('#courier_tarif_id').append($("<option></option>").attr("value","DPDClassic").text("Тариф DPD CLASSIC Parcel - от "+DPDClassicCost+" руб., "+DPDClassic+" "+getDays(DPDClassic))); 
						$("#courier_tarif_id option[value='DPDClassic']").prop('selected', 'true');
						$.cookie('dpd_tarif', 'DPDClassic', { expires: 30, path: '/' });
				} else {
					if(DPDClassic && DPDClassic !== 'null') {
						$('#courier_tarif_id').append($("<option></option>").attr("value","DPDClassic").text("Тариф DPD CLASSIC Parcel - от "+DPDClassicCost+" руб., "+DPDClassic+" "+getDays(DPDClassic))); 
					}
					if(DPDConsumer && DPDConsumer !== 'null') {
						$('#courier_tarif_id').append($("<option></option>").attr("value","DPDConsumer").text("Тариф DPD CONSUMER - от "+DPDConsumerCost+" руб., "+DPDConsumer+" "+getDays(DPDConsumer))); 
					}
				}
				if(DPDCashPay) {
					$('p.cash_pay_service.not-possible').hide();
					$('p.cash_pay_service.possible').show();
				} else {
					$('p.cash_pay_service.possible').hide();
					$('p.cash_pay_service.not-possible').show();
				}
				if(DPDTarif) {
					$("#courier_tarif_id option[value=" + DPDTarif + "]").prop('selected', 'true');
				}
			}
		}
		
	}
	
	if (option == 'russian_post') {
		$('.companies .content_mode.russian_post').show();
		$("#ymap_location").hide(); 
		$(".wrap_offices").hide(); 
		$(".wrap_offices .self_delivery").hide(); 
		$(".wrap_tarifs").hide(); 
		$('#map').empty();
		$(".wrap_offices").hide(); 
		$(".enter_your_postcode").show(); 
		$(".moscow_streets").hide();
		
		var RussianPostDays = $.cookie('russian_post_days');
		$(".shipping.russian_post_days span").text(RussianPostDays+' '+getDays(RussianPostDays));
		var RussianPostCost = $.cookie('russian_post_cost');
		$(".shipping.russian_post_days strong").text(RussianPostCost);
		
		if ($.cookie('penelite_postcode')) {
			$(".enter_your_postcode").hide(); 
			$(".wrap_offices").show(); 
			$(".wrap_offices .pochta").show(); 
			$("#ymap_location").show(); 
			loadRussianPostInfo();
		}
	}
	
	popupCenterVertical();
	
}

function yMapsLoad(mode) {

		$('#delivery_office_id').empty();
		
		// ymaps		
		if ($("#map").text().length < 1) {
			$.ajax({
				type: "POST",
				url: "/ajaxGetMapPoints.php",
				data:'cityId='+$.cookie('penelite_city_id')+'&cityName='+$.cookie('penelite_city_name')+'&regionId='+$.cookie('penelite_city_region_id')+'&regionName='+$.cookie('penelite_city_region_name')+'&mode='+mode,
				beforeSend: function(){
					$("#map").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
				},
				success: function(data){
					//alert(data);
					$("#map").css("background","none");
					$("#ymap_location").css("margin-top","10px");
					var points = JSON.parse(data);
					var myMap = false;
					var myPlacemark = false;
					ymaps.ready(function(){
						ymapsInit(points);
						var PickupPoint = $.cookie('pickup_point');
						if(PickupPoint) {
							$("#delivery_office_id option[value=" + PickupPoint + "]").prop('selected', 'true');
							var value = PickupPoint;
							var coords = $('option:selected', $('select#delivery_office_id')).attr('coords');
							var address = $('option:selected', $('select#delivery_office_id')).attr('address');
							var working_time = $('option:selected', $('select#delivery_office_id')).attr('working_time');
							var code = $('option:selected', $('select#delivery_office_id')).attr('value');
							var balloon = $('option:selected', $('select#delivery_office_id')).attr('balloon');
							var pickup_type = $('option:selected', $('select#delivery_office_id')).attr('pickup_type');
							openBalloon(value,coords,balloon,pickup_type,address,working_time,code);
						}
					});
					var myMap, myPlacemark;
					updateMapSelectbox(points);

				}
			});
		}

}

function updateMapPoints() {
	
	$("#map").empty(); 
	$("#delivery_office_id").empty(); 
	
	if ($('#boxberry_pickup_checkbox').is(':checked') && $('#dpd_pickup_checkbox').is(':checked')) {
		yMapsLoad('all');
	} else if ($('#boxberry_pickup_checkbox').is(':checked')) {
		yMapsLoad('boxberry');
	} else if ($('#dpd_pickup_checkbox').is(':checked')) {
		yMapsLoad('dpd');
	} 
		 
}

function ymapsInit(points){  
   
	  var myCollection = new ymaps.GeoObjectCollection();
	  myMap = new ymaps.Map("map", {
		center: [50, 50], // Начальные значения центра карты
		zoom: 14         // Начальное значение зума карты
	  });
	
	  for (i = 0; i < points.length; i++ ){
		var myPlacemark = new ymaps.Placemark([
		  points[i][0], points[i][1]], {
			balloonContent: '<div class="company_name">'+points[i][2]+'</div><strong>Адрес:</strong><br/>'+points[i][4]+'<br/><strong>Режим работы:</strong><br/>'+points[i][5]+'<button class="balloon_btn not_selected choose_button" onclick="updateBalloonButton(this);return false;">Выбрать</button><button class="balloon_btn selected choose_button" onclick="updateBalloonButton(this);return false;">Выбран</button><input type="hidden" class="pickup_point" value="'+points[i][3]+'" />'
		  }
		);
		myCollection.add(myPlacemark);
	  }
	
	  myMap.geoObjects.add( myCollection );	
	  myMap.setBounds( myCollection.getBounds(), {
     	checkZoomRange: true }
	  );
		
}

        
function updateMapSelectbox(points){ 
 
	  $('#delivery_office_id')
			 .append($("<option></option>")
			 .attr("value",'')
			 .text('Выберите'));
			 
	  for (i = 0; i < points.length; i++ ){
			var work_time = points[i][5].split('<br');
			$('#delivery_office_id')
			 .append($("<option></option>")
			 .attr("value",points[i][3])
			 .attr("coords",points[i][0]+','+points[i][1])
			 .attr("address",points[i][4])
			 .attr("pickup_type",points[i][2])
			 .attr("working_time",work_time[0])
			 .attr("balloon",'<div class="company_name">'+points[i][2]+'</div><strong>Адрес:</strong><br/>'+points[i][4]+'<br/><strong>Режим работы:</strong><br/>'+points[i][5]+'<button class="balloon_btn not_selected choose_button" onclick="updateBalloonButton(this);return false;">Выбрать</button><button class="balloon_btn selected choose_button" onclick="updateBalloonButton(this);return false;">Выбран</button><input type="hidden" class="pickup_point" value="'+points[i][3]+'" />')
			 .text(points[i][4])); 
	  }
		
}

function openBalloon(value,coords,balloon,pickup_type,address,working_time,code) {
	//alert(coords);
	
	var balloon_changed = balloon.replace('<button class="balloon_btn not_selected choose_button" onclick="updateBalloonButton(this);return false;">Выбрать</button><button class="balloon_btn selected choose_button" onclick="updateBalloonButton(this);return false;">Выбран</button>', '<button class="balloon_btn not_selected choose_button" onclick="updateBalloonButton(this);return false;" style="display: none;">Выбрать</button><button class="balloon_btn selected choose_button" onclick="updateBalloonButton(this);return false;" style="display: inline-block;">Выбран</button>');
   	balloon = balloon_changed;

	var array = coords.split(',');
	myMap.balloon.open(array, balloon);
	myMap.balloon.autoPan();
	
	$.cookie('pickup_type', pickup_type, { expires: 30, path: '/' });
	$.cookie('pickup_point', value, { expires: 30, path: '/' });
	$.cookie('pickup_address', address, { expires: 30, path: '/' });
	$.cookie('pickup_working_time', working_time, { expires: 30, path: '/' });
	$.cookie('pickup_code', code, { expires: 30, path: '/' });
}


function updateBalloonButton(el) {
	
	if ($(el).hasClass('not_selected')) {
		$('.balloon_btn.not_selected').show();
		$('.balloon_btn.selected').hide();
		$(el).hide();
		$(el).parent().find('.balloon_btn.selected').show();
		
		var pickup_point = $(el).parent().find('.pickup_point').val();
		$("select#delivery_office_id option[value='']").prop('selected', 'true');
		$("select#delivery_office_id option[value='" + pickup_point + "']").prop('selected', 'true');

		var value = $('select#delivery_office_id').val();
		var pickup_type = $('option:selected', $('select#delivery_office_id')).attr('pickup_type');
		var address = $('option:selected', $('select#delivery_office_id')).attr('address');
		var working_time = $('option:selected', $('select#delivery_office_id')).attr('working_time');
		var code = $('option:selected', $('select#delivery_office_id')).attr('code');
		
		$.cookie('pickup_type', pickup_type, { expires: 30, path: '/' });
		$.cookie('pickup_point', value, { expires: 30, path: '/' });
		$.cookie('pickup_address', address, { expires: 30, path: '/' });
		$.cookie('pickup_working_time', address, { expires: 30, path: '/' });
		$.cookie('pickup_code', code, { expires: 30, path: '/' });
		
		/*var selected_option = $(el).parent().find('input.shipping_option_selected').val();
		$.cookie('shipping_option_selected', selected_option, { expires: 30, path: '/' });*/
		
		if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
			$(':radio:checked.delivery_choose').get(0).click();
		}
		startLoader();
		tr1 = 0;
		deliveryChange();
		
	}
	return false;
}

function loadRussianPostInfo() {
	
		if ($("#map").text().length < 1) {
			$.ajax({
				type: "POST",
				url: "/ajaxGetRussianPostInfo.php",
				data:'postcode='+$.cookie('penelite_postcode'),
				beforeSend: function(){
					$("#map").css("background","url(/autoshipping/img/LoaderIcon40.gif) center center no-repeat");
				},
				success: function(data){
					//alert(data);
					$("#map").css("background","none");
					var returnedData = JSON.parse(data);
					var address = returnedData['address'];	
					var telephone = returnedData['telephone'];	
					$(".wrap_offices").show(); 
					
					if (address && telephone) {
						$("#ymap_location").css("margin-top","90px");
						$('.pochta').html('<table class="table"><tbody><tr><th>Индекс</th><td>'+$('#post_index_id').val()+'</td></tr><tr class="address"><th>Адрес</th><td>'+address+'</td></tr><tr class="phone"><th>Телефон</th><td>'+telephone+'</td></tr></tbody></table>');
					} else if (address && !telephone) {
						$("#ymap_location").css("margin-top","70px");
						$('.pochta').html('<table class="table"><tbody><tr><th>Индекс</th><td>'+$('#post_index_id').val()+'</td></tr><tr class="address"><th>Адрес</th><td>'+address+'</td></tr></tbody></table>');
					} else if (!address && telephone) {
						$("#ymap_location").css("margin-top","50px");
						$('.pochta').html('<table class="table"><tbody><tr><th>Индекс</th><td>'+$('#post_index_id').val()+'</td></tr><tr class="phone"><th>Телефон</th><td>'+telephone+'</td></tr></tbody></table>');
					} else {
						$("#ymap_location").css("margin-top","30px");
						$('.pochta').html('<table class="table"><tbody><tr><th>Индекс</th><td>'+$('#post_index_id').val()+'</td></tr></tbody></table>');
					}
					
					var myMap = false;
					var myPlacemark = false;
					ymaps.ready(function(){
						ymapsInit2(address, telephone);
					});
					var myMap, myPlacemark;
					
				}
			});
		}
	
}

function ymapsInit2(address, telephone){ 



	  var myCollection = new ymaps.GeoObjectCollection();
	  myMap = new ymaps.Map("map", {
		center: [50, 50], // Начальные значения центра карты
		zoom: 14         // Начальное значение зума карты
	  });
	
		var myGeocoder = ymaps.geocode(address, { json: true } );
		myGeocoder.then(
			function (res) {
				
				var longitude = res['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['Point']['coordinates'][0];
				var latitude = res['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['Point']['coordinates'][1];
				
				if (address && telephone) {
					var myPlacemark = new ymaps.Placemark([latitude,longitude], {
						balloonContent: '<strong>Почтовое отделение</strong><br/>'+address+'<br/>Тел. '+telephone
					  }
					);
				} else if (address && !telephone) {
					var myPlacemark = new ymaps.Placemark([latitude,longitude], {
						balloonContent: '<strong>Почтовое отделение</strong><br/>'+address
					  }
					);
				} else if (!address && telephone) {
					var myPlacemark = new ymaps.Placemark([latitude,longitude], {
						balloonContent: '<strong>Почтовое отделение</strong><br/>Тел. '+telephone
					  }
					);
				} else {
					var myPlacemark = new ymaps.Placemark([latitude,longitude], {
						balloonContent: '<strong>Почтовое отделение</strong>'
					  }
					);
				}
				
				myCollection.add(myPlacemark);
				
			  myMap.geoObjects.add( myCollection );	
			  myMap.setBounds( myCollection.getBounds(), {
				checkZoomRange: true }
			  );
				
				//var stringify = JSON.stringify(res);
				//var coordinates = res['GeoObjectCollection']['metaDataProperty']['GeocoderResponseMetaData']['Point']['coordinates'][0];
				//alert(coordinates);
				
			},
			function (err) {
				// обработка ошибки
			}
		);

		
}


function getCoords(address, telephone){ 


            var cord = $('#coords').text() // адрес           
            myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            }); 
          
          var myGeocoder = ymaps.geocode(cord); // пытаюсь передать переменную 
            myGeocoder.then(
                function (res) {
                     var adres = result.geoObjects.get(0).properties.get('metaDataProperty').getAll(); // записываю координаты в переменную
          });

          
}

function updateShippingRadioList(){ 
		
		var option_selected_from_cookie = $.cookie('shipping_option_selected');
		var penelite_city_id = $.cookie('penelite_city_id');
	
		if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
			var $radios = $('input:radio[name=delivery-id]');
			if (option_selected_from_cookie == 'pickup') {
				var capitals_area = $.cookie('capitals_area');
				if (capitals_area == 'moscow_subregion') {
					$radios.filter('[value=1613]').prop('checked', true);
				} else if (capitals_area == 'peterburg_subregion') {
					$radios.filter('[value=150637]').prop('checked', true);
				} else {
					$radios.filter('[value=237350]').prop('checked', true);
				}
			} else if (option_selected_from_cookie == 'courier') {
				var capitals_area = $.cookie('capitals_area');
				if (capitals_area == 'moscow_subregion') {
					$radios.filter('[value=451]').prop('checked', true);
				} else if (capitals_area == 'peterburg_subregion') {
					$radios.filter('[value=150632]').prop('checked', true);
				} else {
					$radios.filter('[value=150638]').prop('checked', true);
				}
			} else if (option_selected_from_cookie == 'russian_post') {
				$radios.filter('[value=1614]').prop('checked', true);
			} else {
				$radios.filter('[value=1613]').prop('checked', true);
			}
			
		$(':radio:checked.delivery_choose').get(0).click();
		startLoader();
		tr1 = 0;
		deliveryChange();
		}
		
}

function startLoader() {
	if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
		//$('.b-cart_table_delivery').css('background','#999');
		$(".b-cart_table").append('<div class="cart_loader"></div>');
		$(".b-cart_table tr").fadeTo(0, 0.3);
		$(".b-cart_table tr.b-cart_table_delivery").hide();
		$(".b-cart_buttons button").prop("disabled", "disabled");
	}
}

function endLoader() {
	if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
		//$('.b-cart_table_delivery').css('background','#FFF');
		$(".b-cart_table .cart_loader").remove();
		$(".b-cart_table tr").fadeTo(0, 1);
		$(".b-cart_table tr.b-cart_table_delivery").hide();
		$(".b-cart_buttons button").prop("disabled", false);
	}
}


function deliveryChange() {
	if ($('.mainPopupBlock').length == 0 && $('.mainPopupInPage.contentPage').length == 0) {
		$('#delivery_input').change(function(){
			endLoader();
		})
	}
}

function validateShipping() {
	
	var penelite_city_id = $.cookie('penelite_city_id');

	var current_sum = $('input#summary_input').val() - $('input#delivery_input').val();
	var minimal_sum = $('input#minimal_sum').val();
	if(current_sum < minimal_sum) {
		showCartPopup('Минимальная сумма заказа - '+minimal_sum+' руб.!');
		return false;
	}
	
	var check_for_city = $('input#check_for_city').val();
	if(!check_for_city) {
		showCartPopup('Пожалуйста, выберите город!');
		return false;
	}
	
	var option_selected_from_cookie = $.cookie('shipping_option_selected');
	
	if(!option_selected_from_cookie) {
		showCartPopup('Пожалуйста, выберите способ доставки!');
		return false;
	}
	
	if (option_selected_from_cookie) {
		if (option_selected_from_cookie == 'pickup') {
			var value = $('select#delivery_office_id').val();
			if (!value)  {
				showCartPopup('Пожалуйста, выберите пункт выдачи!');
				return false;
			}
		} else if (option_selected_from_cookie == 'courier') {
			
			if (penelite_city_id == 15536) {
				var moscowStreet = $('.streets-select').val();
				var moscowHouse = $('.house-input').val();
				var penelite_moscow_street = $.cookie('penelite_moscow_street');
				var penelite_moscow_house = $.cookie('penelite_moscow_house');
				if (!moscowStreet || !moscowHouse || !penelite_moscow_street || !penelite_moscow_house || (moscowStreet !== penelite_moscow_street) || (moscowHouse !== penelite_moscow_house)) {
					showCartPopup('Пожалуйста, укажите Ваш адрес - улицу и дом!');
					return false;
				}
			} 
	
			var value = $('select#courier_tarif_id').val();
			
			var capitals_area = $.cookie('capitals_area');
			if (capitals_area !== 'moscow_subregion' && capitals_area !== 'peterburg_subregion') {
				if (!value )  {
					showCartPopup('Пожалуйста, выберите тариф доставки!');
					return false;
				}
			}
		} 
	}
	
	$('form').submit();
}


function showCartPopup(text) {
	$('.cartPopupBlock .popupContent').text(text);
	$('.cartPopupBlock').show();
    $('.popup_bg').show();
}

function closeCartPopup() {
	$('.cartPopupBlock').hide();
    $('.popup_bg').hide();
}

$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27  && $('.mainPopupBlock').is(':visible')) { // ESC
        e.preventDefault();
		closeMainPopup();
    }
});


function activateSingleOptionKeyup(typingTimer) {
	var doneTypingInterval = 1000; 
	clearTimeout(typingTimer);
	typingTimer = setTimeout(doneTyping, doneTypingInterval);
}
	
/*function activateSingleOptionKeydown() {
	clearTimeout(typingTimer);
}*/

function doneTyping() {
	if ($('li.hiddenOnly').length) {
		setTimeout(
		  function() 
		  {
			$('li.hiddenOnly').click();
			$('#city_name').blur();
		  }, 500);
	}
}


// days ending
function getDays(num) {
    var result;
    count = num % 100;
    if (count >= 5 && count <= 20) {
        result = 'дней';
    } else {
        count = count % 10;
        if (count == 1) {
            result = 'день';
        } else if (count >= 2 && count <= 4) {
            result = 'дня';
        } else {
            result = 'дней';
        }
    }
    return result;
}

function getDaysDecl(num) {
    var result;
    count = num % 100;
    if (count >= 5 && count <= 20) {
        result = 'дней';
    } else {
        count = count % 10;
        if (count == 1) {
            result = 'дня';
        } /*else if (count >= 2 && count <= 4) {
            result = 'дня';
        }*/ else {
            result = 'дней';
        }
    }
    return result;
}

function showDetailedInfo(elem) {
	info = $(elem).attr('data');
	$('.pointDetailedInfoBlockContent').html(info);
	$('.pointDetailedInfoBlock').show();
    $('.popup_bg').show();
	if ($('.mainPopupBlock').length !== 0) {
		$('.mainPopupBlock').css('z-index','10');
	}
}

function closeDetailedInfo() {
	$('.pointDetailedInfoBlock').hide();
	$('.mainPopupBlock').css('z-index','100');
	if ($('.mainPopupBlock').length == 0) {
		$('.popup_bg').hide();
	}
}

function showAddToBasketPopup(info) {
	$('.addToBasketBlockContent').html(info);
	$('.addToBasketBlock').show();
    $('.popup_bg').show();
}

function closeAddToBasketPopup() {
	$('.addToBasketBlock').hide();
    $('.popup_bg').hide();
}


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}
