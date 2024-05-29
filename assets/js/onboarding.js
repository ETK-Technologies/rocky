//globals
var event_bound_plan_selection = ['cialis',"viagra","variety-pack","finasteride-minoxidil","finasteride-propecia","organic-hair-kit","minoxidil"];
var upsell_product_id =  {'cialis':0,"viagra":0,"variety-pack":0,"finasteride-minoxidil":0,"finasteride-propecia":0,"organic-hair-kit":0,"minoxidil":0};
var upsell_product_price = {'cialis':0,"viagra":0,"variety-pack":0,"finasteride-minoxidil":0,"finasteride-propecia":0,"organic-hair-kit":0,"minoxidil":0};
var upsell_product_price_crossed = {'cialis':0,"viagra":0,"variety-pack":0,"finasteride-minoxidil":0,"finasteride-propecia":0,"organic-hair-kit":0,"minoxidil":0};
var cross_sells = ['cialis',"viagra","variety-pack","finasteride-minoxidil","finasteride-propecia","organic-hair-kit","minoxidil"];

jQuery (document).ready (function(){

	/* START DOB fields auto shift to next field */ 
	var input_3_6_1 = jQuery('#input_3_6_1');
	var input_3_6_2 = jQuery('#input_3_6_2');
	var input_3_6_3 = jQuery('#input_3_6_3');

	if ( input_3_6_1!=null && input_3_6_1 != undefined ) {

		input_3_6_1.keyup(function(){

			//console.log("input_3_6_1");
			//console.log(input_3_6_1.length);

			if (input_3_6_1.val().length == 2) {

				input_3_6_2.focus();

			}


		});
	} 

	if ( input_3_6_2!=null && input_3_6_2!= undefined ) {

		
		input_3_6_2.keyup(function(){
			
			//console.log("input_3_6_2");

			if (input_3_6_2.val().length == 2) {

				input_3_6_3.focus();

			}


		});
	}

	/* END of DOB fields auto shift to next field */

	/* Start Plan Selection Boxes Logic ED Flow */

	if (jQuery('body').hasClass('page-template-page-ed-flow') || jQuery('body').hasClass('page-template-page-ed-flow-special') || jQuery('body').hasClass('page-template-page-ed-landing-flow') || jQuery('body').hasClass('page-template-Sex-Landing-Flexible') || jQuery('body').hasClass('page-template-ED-Landing-Flexible') ){

		update_plan_slider_buttons_ed_flow();

		// On before slide change
		jQuery('.plan-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

	  		update_plan_slider_buttons_ed_flow();

		});

		/* Cross Sells Checkboxes */

		//jQuery("input.cross-sell").prop("checked",false);

		/*jQuery("input.cross-sell").change(function(e){

			build_add_to_cart_url_for_cross_sell_ed();
			
		});*/
	} 

	/* Start Plan Selection Boxes Logic Hair Flow */

	if (jQuery('body').hasClass('page-template-page-hair-flow') || jQuery('body').hasClass('page-template-page-hair-flow-freedom') ){

		update_plan_slider_buttons_hair_flow();

		// On before slide change
		jQuery('.plan-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){

	  		update_plan_slider_buttons_hair_flow();

		});


		/* Cross Sells Checkboxes */
		jQuery("input.cross-sell").prop("checked",false);

		jQuery("input.cross-sell").change(function(e){

			//url = cart_url+product_data[0]+"&consultation-required="+product_data[3]+"&convert_to_sub_"+product_data[0]+"="+product_data[2];
	
			var add_to_cart_url = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href");
			var id = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("id");
			var vari = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("var");
			var cr = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("consultation");

			var string_1 = id;
			var string_2 = "&consultation-required="+cr;
			var string_3 = "&convert_to_sub_"+id+"="+vari;

			var old_url = cart_url+string_1+string_2+string_3;


			jQuery("input.cross-sell").each(function() {

				if ( jQuery(this).is(":checked") ) {

					var cross_sell_id = jQuery(this).val();
					var cross_sell_type = jQuery(this).data('type');
					var cross_sell_var = jQuery(this).data('var');

					if (cross_sell_type == "subscription") {

						string_1 += ","+cross_sell_id;
						string_3 += "&convert_to_sub_"+cross_sell_id+"="+cross_sell_var;

					} else if ( cross_sell_type == "simple" ) {

						string_1 += ","+cross_sell_id;

					}
				}
			});

			var new_url = cart_url+string_1+string_2+string_3;
			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href",new_url);
			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn.no-thanks").attr("href",old_url);
			
		});


	} 

	/* Stop Plan Selection Boxes Logic */

	//product upsell page
	jQuery(".product-cross-sell.popup-onpage input.cross-sell").prop("checked",false);

	jQuery(".product-cross-sell.popup-onpage input.cross-sell").change(function(e){

		build_add_to_cart_url_for_cross_sell_ed(jQuery(this));
		
	});


	/* 2 Step Checkout */

	if (jQuery('body').hasClass('woocommerce-checkout') && jQuery( window ).width()<=768) {

		jQuery(".woocommerce-additional-fields").after("<button type='button' class='checkout_continue_button'>Continue</button>");
		show_checkout_step_1();	

	}

	

});



function update_plan_slider_buttons_ed_flow () {


	update_plan_slider_item ("cialis");
	update_plan_slider_item ("viagra");
	update_plan_slider_item ("variety-pack"); 

}


function update_plan_slider_item (product_label) {


	var product_data = get_plan_cart_item_id( product_label );
	set_plan_button_text(product_data , product_label);

	if (event_bound_plan_selection[product_label]==null || event_bound_plan_selection[product_label]==undefined) {
		
		jQuery(".slider-item.product-"+product_label+" input.preference").change(function() {

			product_data = get_plan_cart_item_id( product_label );
			set_plan_button_text(product_data , product_label);


		});


		jQuery(".slider-item.product-"+product_label+" input.frequency").change(function() {

			product_data = get_plan_cart_item_id( product_label );
			set_plan_button_text(product_data , product_label);

		});


		jQuery(".slider-item.product-"+product_label+" input.pills").change(function() {

			_product = jQuery(".slider-item.product-"+product_label);
			var id = _product.find("input.pills:checked").val();
			var price = _product.find("input.pills:checked").data("price");
			var qty = _product.find("input.pills:checked").data("qty");

			var preference = _product.find("input.preference:checked").val();
			var frequency = _product.find("input.frequency:checked").val();

			if (preference=="brand") {

				upsell_product_id[product_label] = _product.find(".pills-"+frequency+"-generic input[data-qty="+qty+"]").val();
				upsell_product_price[product_label] = _product.find(".pills-"+frequency+"-generic input[data-qty="+qty+"]").data("price");

			} else {

				cross_sells[product_label] = true;
			}

			//console.log([product_label, upsell_product_id[product_label] , upsell_product_price[product_label]] );

			set_plan_button_text([id,price] , product_label);

		});



		/* setup buttons on popups */
		if (jQuery('body').hasClass('page-template-page-ed-landing-flow')) {


			jQuery(".myrocky_modal_popup.product-"+product_label+" input.pills-upsell").change(function() {

				var id = jQuery(".myrocky_modal_popup.product-"+product_label).find("input.pills-upsell:checked").val();
				//var price = jQuery(".myrocky_modal_popup.product-"+product_label).find("input.pills-upsell:checked").data("price");
				
				jQuery(".myrocky_modal_popup.product-"+product_label).find(".add_to_cart_btn.add-to-plan").attr("href",cart_url+id);

			});



		}

		event_bound_plan_selection[product_label] = true;
	}




}

function set_plan_button_text (product_data, product ) {

	

	var _product = jQuery(".slider-item.product-"+product); 

	_product.find(".cart_url a").attr("href" , cart_url+product_data[0]);
	_product.find(".cart_url a").html("$"+product_data[1]+" - Buy Now");
	_product.find(".cart_url a").data("product",product);


	if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

		jQuery(".cart_url_outer a").attr("href" , cart_url+product_data[0]);
		jQuery(".cart_url_outer a").html("$"+product_data[1]+" - Buy Now"); 
		jQuery(".cart_url_outer a").data("product",product);

	}

	//console.log([product, upsell_product_id[product] , upsell_product_price[product]] );

	//let buttons do default functions 
	_product.find(".cart_url a").unbind("click");
	jQuery(".cart_url_outer a").unbind("click");

	//if upsell exists show upsell popup on click
	//un comment below to enable popups.
	/*if ( upsell_product_id[product] != 0  && upsell_product_price[product] > 0) {

		upsell_product_price_crossed[product] = product_data[1];
		jQuery(".myrocky_modal_popup .new-pricing-box del").html("$"+product_data[1]);
		jQuery(".myrocky_modal_popup .new-pricing-box span").html("$"+upsell_product_price[product]);
		jQuery(".myrocky_modal_popup .add_to_cart_btn").attr("href" , cart_url+upsell_product_id[product]);
		jQuery(".myrocky_modal_popup .add_to_cart_btn.no-thanks").attr("href" , cart_url+product_data[0]);

		_product.find(".cart_url a").unbind("click").click(function(e){


			var this_product =  jQuery(this).data("product");

			console.log("ED");
			console.log(this_product);
			jQuery(".myrocky_modal_popup .new-pricing-box del").html("$"+upsell_product_price_crossed[this_product]);
			jQuery(".myrocky_modal_popup .new-pricing-box span").html("$"+upsell_product_price[this_product]);
			jQuery(".myrocky_modal_popup .add_to_cart_btn").attr("href" , cart_url+upsell_product_id[this_product]);
			jQuery(".myrocky_modal_popup .add_to_cart_btn.no-thanks").attr("href" , jQuery(this).attr("href"));
			e.preventDefault();
			jQuery(".myrocky_modal_popup.product-upsell").show();



		}); 


		if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

			jQuery(".cart_url_outer a").unbind("click").click(function(e){

				var this_product =  jQuery(this).data("product");
				console.log("E2");
				console.log(this_product);
				jQuery(".myrocky_modal_popup .new-pricing-box del").html("$"+upsell_product_price_crossed[this_product]);
				jQuery(".myrocky_modal_popup .new-pricing-box span").html("$"+upsell_product_price[this_product]);
				jQuery(".myrocky_modal_popup .add_to_cart_btn").attr("href" , cart_url+upsell_product_id[this_product]);
				jQuery(".myrocky_modal_popup .add_to_cart_btn.no-thanks").attr("href" , jQuery(this).attr("href"));
				
				e.preventDefault();
				jQuery(".myrocky_modal_popup.product-upsell").show();


			});

		} 

	} else*/ 

	//if ( cross_sells[product] == true) {

		
		/*
		// old cross-sell popups
		_product.find(".cart_url a").unbind("click").click(function(e){

			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href" , jQuery(this).attr('href'));
			e.preventDefault();
			jQuery(".myrocky_modal_popup.product-cross-sell").show();
			jQuery("input.cross-sell").prop("checked",false);

		});

		if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

			jQuery(".cart_url_outer a").unbind("click").click(function(e){

				jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href" , jQuery(this).attr('href'));
				e.preventDefault();
				jQuery(".myrocky_modal_popup.product-cross-sell").show();
				jQuery("input.cross-sell").prop("checked",false);

			});

		}
		*/

		//link to cross-sell-page
		//var new_url_cross_sell = ed_upsell_cross_sell_page_url +'?cross-sell=1&redirect_to='+encodeURIComponent(_product.find(".cart_url a").attr("href"));
		
		//_product.find(".cart_url a").attr("href",new_url_cross_sell);
		//jQuery(".cart_url_outer a").attr("href",new_url_cross_sell);


	/*} else {

		_product.find(".cart_url a").unbind("click");
		jQuery(".cart_url_outer a").unbind("click");

	}*/



	if (jQuery('body').hasClass('page-template-page-ed-landing-flow')) {

		var button_text = "";

		if (product == "cialis") {

			button_text = "I choose 4 pills of <strong>Cialis</strong>";

		} else if (product == "viagra") {

			button_text = "I choose 4 pills of <strong>Viagra</strong>";

		} else if (product == "variety-pack") {

			button_text = "I choose 2 of each";

		}

		_product.find(".cart_url a").html(button_text).unbind("click").click(function(e){

			e.preventDefault();
			jQuery(".myrocky_modal_popup.product-"+product).show();
			var upsell_id = jQuery(".myrocky_modal_popup.product-"+product+" input.pills-upsell:checked").val();
			jQuery(".myrocky_modal_popup.product-"+product).find(".add_to_cart_btn.add-to-plan").attr("href",cart_url+upsell_id);

			return false;

		});

		if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

			jQuery(".cart_url_outer a").html(button_text); 
			jQuery(".cart_url_outer a").unbind("click");

			jQuery(".cart_url_outer a").click(function(e){

				e.preventDefault();
				jQuery(".myrocky_modal_popup.product-"+product).show();
				var upsell_id = jQuery(".myrocky_modal_popup.product-"+product+" input.pills-upsell:checked").val();
				jQuery(".myrocky_modal_popup.product-"+product).find(".add_to_cart_btn.add-to-plan").attr("href",cart_url+upsell_id);

				return false;

			});
		}

	}

}

function get_plan_cart_item_id ( product )   {

	var _product = jQuery(".slider-item.product-"+product);

	if ( !_product || _product==null || _product==undefined ) {

		return false;

	}
	var preference = _product.find("input.preference:checked").val();
	var frequency = _product.find("input.frequency:checked").val();
	var product_id = _product.find("input.pills:checked").val();
	var qty = _product.find("input.pills:checked").data("qty");
	var price = _product.find("input.pills:checked").data("price");

	upsell_product_id[product] = 0;
	upsell_product_price[product] = 0;
	cross_sells[product] = false;

	//console.log(preference);
	//console.log(frequency);
	//console.log(qty);


	if (preference=="generic" && frequency=="one-month") {

		_product.find(".product-variation-pills").hide();
		_product.find(".pills-one-month-generic").show();
		_product.find(".pills-one-month-generic input[type=radio]").attr("checked",false);

		if ( qty == 4 ) {

			_product.find(".pills-one-month-generic input.pills[data-qty=4]").prop("checked",true);

		} else if ( qty == 8) {

			_product.find(".pills-one-month-generic input.pills[data-qty=8]").prop("checked",true);
		} else if ( qty >= 12) {

			_product.find(".pills-one-month-generic input[data-qty=12]").prop("checked",true);
		
		} else {

			_product.find(".pills-one-month-generic input.pills[data-qty=4]").prop("checked",true);

		}

		cross_sells[product] = true;

	}

	if (preference=="brand" && frequency=="one-month") {

		_product.find(".product-variation-pills").hide();
		_product.find(".pills-one-month-brand").show();
		_product.find(".pills-one-month-brand input[type=radio]").prop("checked",false);

		

		if ( qty == 4 ) {

			upsell_product_id[product] = _product.find(".pills-one-month-generic input[data-qty=4]").val();
			upsell_product_price[product] = _product.find(".pills-one-month-generic input[data-qty=4]").data("price");

			_product.find(".pills-one-month-brand input[data-qty=4]").prop("checked",true);

		} else if ( qty == 8) {

			upsell_product_id[product]  = _product.find(".pills-one-month-generic input[data-qty=8]").val();
			upsell_product_price[product]  = _product.find(".pills-one-month-generic input[data-qty=8]").data("price");
			_product.find(".pills-one-month-brand input[data-qty=8]").prop("checked",true);
		
		} else if ( qty >= 12) {

			upsell_product_id[product]  = _product.find(".pills-one-month-generic input[data-qty=12]").val();
			upsell_product_price[product]  = _product.find(".pills-one-month-generic input[data-qty=12]").data("price");
			_product.find(".pills-one-month-brand input[data-qty=12]").prop("checked",true);
		
		} else {

			_product.find(".pills-one-month-brand input[data-qty=4]").prop("checked",true);
			
		}



	}

	if (preference=="generic" && frequency=="three-months") {

		_product.find(".product-variation-pills").hide();
		_product.find(".pills-three-months-generic").show();
		_product.find(".pills-three-months-generic input[type=radio]").attr("checked",false);

		if ( qty == 12 || qty < 12) {

			_product.find(".pills-three-months-generic input.pills[data-qty=12]").prop("checked",true);

		} else if ( qty == 24) {

			_product.find(".pills-three-months-generic input.pills[data-qty=24]").prop("checked",true);
		} else if ( qty == 36) {

			_product.find(".pills-three-months-generic input[data-qty=36]").prop("checked",true);
		
		} else {

			_product.find(".pills-three-months-generic input.pills[data-qty=12]").prop("checked",true);

		}

		cross_sells[product] = true;

	}

	if (preference=="brand" && frequency=="three-months") {

		_product.find(".product-variation-pills").hide();
		_product.find(".pills-three-months-brand").show();
		_product.find(".pills-three-months-brand input[type=radio]").attr("checked",false);

		if ( qty == 12 || qty < 12) {

			upsell_product_id[product]  = _product.find(".pills-three-months-generic input[data-qty=12]").val();
			upsell_product_price[product]  = _product.find(".pills-three-months-generic input[data-qty=12]").data("price");

			_product.find(".pills-three-months-brand input.pills[data-qty=12]").prop("checked",true);

		} else if ( qty == 24) {

			upsell_product_id[product]  = _product.find(".pills-three-months-generic input[data-qty=24]").val();
			upsell_product_price[product]  = _product.find(".pills-three-months-generic input[data-qty=24]").data("price");

			_product.find(".pills-three-months-brand input.pills[data-qty=24]").prop("checked",true);

		} else if ( qty == 36) {

			upsell_product_id[product]  = _product.find(".pills-three-months-generic input[data-qty=36]").val();
			upsell_product_price[product] = _product.find(".pills-three-months-generic input[data-qty=36]").data("price");

			_product.find(".pills-three-months-brand input[data-qty=36]").prop("checked",true);
		
		} else {

			_product.find(".pills-three-months-brand input.pills[data-qty=12]").prop("checked",true);

		}

	}


	console.log([product, upsell_product_id[product] , upsell_product_price[product]] );

	var product_id = _product.find("input.pills:checked").val();
	var product_price = _product.find("input.pills:checked").data("price");

	return [product_id,product_price];


}

/* Hair Flow Logic*/
function update_plan_slider_buttons_hair_flow () {


	update_hair_plan_slider_item ("finasteride-minoxidil");
	update_hair_plan_slider_item ("finasteride-propecia");
	update_hair_plan_slider_item ("organic-hair-kit");
	update_hair_plan_slider_item ("minoxidil");

}


function update_hair_plan_slider_item (product_label) {


	var product_data = get_hair_plan_cart_item_id( product_label );
	set_hair_plan_button_text(product_data , product_label);

	if (event_bound_plan_selection[product_label]==null || event_bound_plan_selection[product_label]==undefined) {
		
		jQuery(".slider-item.product-"+product_label+" input.frequency").change(function() {

			product_data = get_hair_plan_cart_item_id( product_label );
			
			/*var _product = jQuery(".slider-item.product-"+product_label);
			
			if (product_data[2]=="1_month_12") {

				upsell_product_id[product_label] = _product.find(".frequency[data-var='3_month_12']").data("id");
				upsell_product_price[product_label] = _product.find(".frequency[data-var='3_month_12']").data("price");

			} else {

				cross_sells[product_label] = true;
				upsell_product_id[product_label] = 0;
				upsell_product_price[product_label] = 0;

			}*/

			set_hair_plan_button_text(product_data , product_label);

		});

		event_bound_plan_selection[product_label] = true;
	}


}

function get_hair_plan_cart_item_id ( product_label )   {

	var _product = jQuery(".slider-item.product-"+product_label);

	if ( !_product || _product==null || _product==undefined ) {

		return false;

	}

	var variation = _product.find("input.frequency:checked").data('var');
	var product_id = _product.find("input.frequency:checked").data('id');
	var price = _product.find("input.frequency:checked").data("price");
	var consultation = _product.find("input.frequency:checked").data("consultation");


	if (variation=="1_month_12") {

		upsell_product_id[product_label] = _product.find(".frequency[data-var='3_month_12']").data("id");
		upsell_product_price[product_label] = _product.find(".frequency[data-var='3_month_12']").data("price");

	} else {

		cross_sells[product_label] = true;
		upsell_product_id[product_label] = 0;
		upsell_product_price[product_label] = 0;

	}

	//console.log(variation);
	//console.log(product_id);
	//console.log(price);
	//console.log(consultation);

	//always show crosssell on hair products
	//cross_sells[product] = true;

	return [product_id,price,variation,consultation];


}

function set_hair_plan_button_text (product_data, product_label) {

	var _product = jQuery(".slider-item.product-"+product_label); 

	url = cart_url+product_data[0]+"&consultation-required="+product_data[3]+"&convert_to_sub_"+product_data[0]+"="+product_data[2];

	//console.log([product_label, upsell_product_id[product_label] , upsell_product_price[product_label]] );
	//console.log(url);

	_product.find(".cart_url a").attr("href",url);
	_product.find(".cart_url a").html("$"+product_data[1]+" - Buy Now");
	_product.find(".cart_url a").data("product",product_label); 

	if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

		jQuery(".cart_url_outer a").attr("href" ,url);
		jQuery(".cart_url_outer a").html("$"+product_data[1]+" - Buy Now"); 
		jQuery(".cart_url_outer a").data("product",product_label); 

	}

	_product.find(".cart_url a").unbind("click");
	jQuery(".cart_url_outer a").unbind("click");


	//if upsell exists show upsell popup on click
	//un comment below to enable popups. 
	/*if ( upsell_product_id[product_label] != 0  && upsell_product_price[product_label] > 0) {

		var new_url = cart_url+product_data[0]+"&consultation-required="+product_data[3]+"&convert_to_sub_"+product_data[0]+"=3_month_12";

		upsell_product_price_crossed[product_label] = product_data[1]*3;
		jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box del").html("$"+(product_data[1]*3));
		jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box span").html("$"+upsell_product_price[product_label]);
		jQuery(".myrocky_modal_popup.product-upsell .upsell-savings").html("$"+(product_data[1]*3-upsell_product_price[product_label]));
		jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn").attr("href" , new_url);
		jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn.no-thanks").attr("href" , url);

		_product.find(".cart_url a").unbind("click").click(function(e){

			var this_product =  jQuery(this).data("product");
			console.log("Hair 1");
			console.log(this_product);

			jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box del").html("$"+upsell_product_price_crossed[this_product]);
			jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box span").html("$"+upsell_product_price[this_product]);
			jQuery(".myrocky_modal_popup.product-upsell .upsell-savings").html("$"+(upsell_product_price_crossed[this_product]-upsell_product_price[this_product]));
			jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn").attr("href" , new_url);
			jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn.no-thanks").attr("href" , jQuery(this).attr("href"));
			e.preventDefault();
			jQuery(".myrocky_modal_popup.product-upsell").show();



		}); 


		if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

			jQuery(".cart_url_outer a").unbind("click").click(function(e){

				var this_product =  jQuery(this).data("product");
				console.log("Hair 2");
				console.log(this_product);
				
				jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box del").html("$"+upsell_product_price_crossed[this_product]);
				jQuery(".myrocky_modal_popup.product-upsell .new-pricing-box span").html("$"+upsell_product_price[this_product]);
				jQuery(".myrocky_modal_popup.product-upsell .upsell-savings").html("$"+(upsell_product_price_crossed[this_product]-upsell_product_price[this_product]));
				jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn").attr("href" , new_url);
				jQuery(".myrocky_modal_popup.product-upsell .add_to_cart_btn.no-thanks").attr("href" , jQuery(this).attr("href"));
				
				e.preventDefault();
				jQuery(".myrocky_modal_popup.product-upsell").show();


			});

		} 

	} else if ( cross_sells[product_label] == true) {

		
		_product.find(".cart_url a").unbind("click").click(function(e){

			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href" , jQuery(this).attr('href'));
			
			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("id",product_data[0]);
			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("var",product_data[2]);
			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("consultation",product_data[3]);
			
			e.preventDefault();
			jQuery(".myrocky_modal_popup.product-cross-sell").show();
			jQuery("input.cross-sell").prop("checked",false);

			//do not show oil and shampoo for the organic kit
			if (product_data[0] == 786) {

				jQuery(".cross-sell-product-1,.cross-sell-product-2").hide();

			//show all
			} else {

				jQuery(".cross-sell-product").show();

			}

		});

		if (_product.hasClass("slick-current") && _product.hasClass("slick-active")) {

			jQuery(".cart_url_outer a").unbind("click").click(function(e){

				jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href" , jQuery(this).attr('href'));
				jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("id",product_data[0]);
				jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("var",product_data[2]);
				jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").data("consultation",product_data[3]);
			
				e.preventDefault();
				jQuery(".myrocky_modal_popup.product-cross-sell").show();
				jQuery("input.cross-sell").prop("checked",false);

				//do not show oil and shampoo for the organic kit
				if (product_data[0] == 786) {

					jQuery(".cross-sell-product-1,.cross-sell-product-2").hide();

				//show all
				} else {

					jQuery(".cross-sell-product").show();

				}

			});

		} 

		


	} else {

		_product.find(".cart_url a").unbind("click");
		jQuery(".cart_url_outer a").unbind("click");

	}*/

}



function show_checkout_step_1 () {

	jQuery(".woocommerce-billing-fields").slideDown();
	jQuery(".woocommerce-form-login-toggle").slideDown();
	jQuery(".woocommerce-account-fields").slideDown();


	jQuery(".woocommerce-shipping-fields").slideDown();
	jQuery(".woocommerce-additional-fields").slideDown();
	
	jQuery(".col-2").hide();
	jQuery(".woocommerce-form-coupon-toggle").hide();

	jQuery(".checkout_continue_button").html("Continue").removeClass("small-plain");

	jQuery(".checkout_continue_button").unbind('click').click(function(){

		show_checkout_step_2 ();

	});

}


function show_checkout_step_2 () {


	jQuery(".woocommerce-billing-fields").slideUp();
	jQuery(".woocommerce-form-login-toggle").slideUp();
	
	jQuery(".woocommerce-account-fields").slideUp();
	jQuery(".woocommerce-shipping-fields").slideUp();
	jQuery(".woocommerce-additional-fields").slideUp();

	jQuery(".col-2").slideDown();
	jQuery(".woocommerce-form-coupon-toggle").slideDown();

	jQuery(".checkout_continue_button").html('&laquo; Back to billing details').addClass("small-plain");

	jQuery(".checkout_continue_button").unbind('click').click(function(){

		show_checkout_step_1();

	});
	
}

function build_add_to_cart_url_for_cross_sell_ed ( this_is_changed ) {


	var old_url = jQuery(".popup-onpage-footer .add_to_cart_btn.no-thanks").attr("href");
	var lidocaine_spray_addon = "";
	var lidocaine_addon = "";
	var condom_addon = "";
	var new_url = old_url;
	var frequency_string = '';
	var add_string = '&add-product-subscription=';
	var qty_string = '';

	if ( this_is_changed.hasClass("cross-sell-condom-2")) {
		jQuery(".cross-sell-condom-1").prop("checked",false);
	} else if ( this_is_changed.hasClass("cross-sell-condom-1")) {
		jQuery(".cross-sell-condom-2").prop("checked",false);
	}

//https://myrocky.ca/,52161,275,13535&convert_to_sub_52161=1_month_1&convert_to_sub_275=1_month_1&quantity=1&add-product-subscription=52161,275,
	jQuery("input.cross-sell").each(function(){

		var x_this = jQuery(this);

		if (x_this.is(":checked")) {

			var frequency_type = x_this.data('frequency-type');
			var val = x_this.val();

			new_url = new_url + "," + val; 

			if (frequency_type == 'subscription') {

				var frequency = x_this.data('frequency');

				//qty except 1 is not supported as of now
				//var qty = x_this.data('quantity');

				add_string = add_string + val + ','; 
				frequency_string = frequency_string + '&convert_to_sub_'+val+'='+frequency;


			} else if (frequency_type == 'one-time') {

				//do nothing

			}
		}

		//url string format
		//&amp;convert_to_sub_52161=1_month_1&amp;quantity=1&amp;add-product-subscription=52161
		


		//If Lidocaine Spray
		/*if ( jQuery(this).is(":checked") && jQuery(this).hasClass("cross-sell-lidocaine-spray") ) {

			lidocaine_spray_addon = jQuery(this).val();
		}

		//If Lidocaine
		if ( jQuery(this).is(":checked") && jQuery(this).hasClass("cross-sell-lidocaine") ) {

			lidocaine_addon = jQuery(this).val();
		}

		//If Condom1
		if ( jQuery(this).is(":checked") && jQuery(this).hasClass("cross-sell-condom-1")) {

			condom_addon = jQuery(this).val();
			//jQuery(".cross-sell-condom-2").prop("checked",false);
		
		}

		//If Condom2
		if ( jQuery(this).is(":checked") && jQuery(this).hasClass("cross-sell-condom-2")) {

			condom_addon = jQuery(this).val();
			//jQuery(".cross-sell-condom-1").prop("checked",false);
		
		}*/
	
	});

	new_url = new_url + frequency_string + qty_string;
	if (add_string!='&add-product-subscription=') {
		new_url = new_url + add_string;
	}

	/*if (condom_addon!="") {

		new_url = new_url + "," + condom_addon; 
	}

	if (lidocaine_addon!="") {

		new_url = new_url + "," + lidocaine_addon; 
	}

	if (lidocaine_spray_addon!="") {

		new_url = new_url + "," + lidocaine_spray_addon; 
	}*/

	jQuery(".popup-onpage-footer .add_to_cart_btn.add-to-plan").attr("href",new_url);
	jQuery(".popup-onpage-footer .add_to_cart_btn.no-thanks").attr("href",old_url); 



	/*if ( jQuery(this).is(":checked") ) {

		var crosssell_val = jQuery(this).val();
		var old_url = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn").attr("href");
		var new_url = old_url+crosssell_val;
		jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn.add-to-plan").attr("href",new_url);
		jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn.add-to-plan").data("continue",old_url); 

	} else {

		var old_url = jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn.add-to-plan").data("continue");
		if (old_url!='' && old_url!=undefined) {

			jQuery(".myrocky_modal_popup.product-cross-sell .add_to_cart_btn.add-to-plan").attr("href",old_url);
		
		}

	}*/


}