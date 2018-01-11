var registration = {};

(function() {
	/** 
	 *
	 *	Registration lib (login/register/welcome/lost_password)
	 *
	**/
	registration = {
		form: null,															// jQuery form object
		action: null,														// login/register/welcome/lost_password
		rules: {															// input fields validation rules
			login: {
				email: {required: true, valid_email: true},
				password: {required: true, special_chars: true}
			},														
			register: {
				email: {required: true, valid_email: true},
				password: {required: true, min_length: 5, special_chars: true}
			},
			lost_password: {
				email: {required: true, valid_email: true}
			}
		},
		
		/** 
		 *	Initialize validation
		 * 
		 *	@param: string action
		**/
		init: function(action) {
			this.form = $('#content form.js-validate');						// get form
			this.action = action;
			if (this.form.length) {
				this.form.find('input').first().focus();
				this.bindInputs();
			}
			this.sendMessage({height: $('#container').height()+15, width: $('#container').width()+300});
		},
		
		/** 
		 *	Bind events on input fields
		**/
		bindInputs: function() {
			var self = this;												// lib object
				
			$('#header').on('click', '.js-close', function() {				// CLOSE BUTTON EVENT
				self.sendMessage({destroy: true});
			});
			
			this.form.on('submit', function() {								// SUBMIT EVENT
				var he = false,												// have errors (true|false)
					rm = self.form.find('.response');						// response message
				
				if (rm.length) {											// remove response message if it already existis
					rm.remove();
				}
				
				self.form.find('input').each(function() {					// validate all text input fields
					var el = $(this),										// current element
						er = self.validateValue(el.val(), el.prop('name'), el.parent().find('label').text());
					
					if (er && er.length > 0) {
						he = true;
						self.displayError(el.parent(), er);
					}
				});
				
				if (!he) {													// make and ajax call if there is no errors
					$.post('/registration/ajax/', self.form.serialize()+'&action='+self.action, function(res) {
						if (res.error) {
							self.form.find('input').last().parent().append($('<span />', {'html': res.error, 'class': 'message error response'}));
							self.trackGA('Login|Registration Error', self.action, res.ga_error);
						}
						else if (res.action) {
							if (res.ga_error && res.ga_error.length > 0) {
								self.trackGA('Login|Registration Error', self.action, res.ga_error);
								setTimeout('location.href = "/registration/'+res.action+'.php'+(res.vars ? '?'+$.param(res.vars) : '')+'"', 200);
							}
							else {
								location.href = '/registration/'+res.action+'.php'+(res.vars ? '?'+$.param(res.vars) : '');
							}
						}
						else if (res.update) {
							if (self.action === 'lost_password') {
								_gas.push(['_trackPageview', '/vpv/password-recovery-form-complete']);
							}
							$('#content').html(res.update);
						}
						else {
							if (self.action === 'login') {
								_gas.push(['_trackPageview', '/vpv/login-complete']);
							}
							else if (self.action === 'welcome') {
								self.trackGA('Registration', 'Registration Optional Step Completed', 'Registration Optional Step - user clicked save');
							}
							setTimeout('registration.sendMessage({success: true})', 200);
						}
					}, 'json');
				}
				return false;
			})
			.on('focusin', 'input', function() {							// FOCUSIN EVENT
				var el = $(this);											// current element
				
				el.addClass('active');
				self.hideError(el.parent());
			})
			.on('focusout', 'input', function() {							// FOCUSOUT EVENT
				var el = $(this)											// current element
					er = self.validateValue(el.val(), el.prop('name'), el.parent().find('label').text(), false);
				
				if (er && er.length > 0) {
					self.displayError(el.parent(), er);
				}
				el.removeClass('active');
			});
																			// EXTRA EVENTS (just for some off the pages)
			if (this.form.find('.js-dropdown').length) {
				this.form.on('change', '.js-dropdown select', function() {	// DROP-DOWN EVENT (trick for overlay)
					var el = $(this);										// current element
					el.parent().children('label').text(el.find('option:selected').text());
				});
			}
			
			if (this.form.find('.js-select').length) {
				this.form.on('click', '.js-select > div', function() {		// SELECT EVENT (on some div's with images)
					var el = $(this),										// current element
						elp = el.parent(),									// elements parent
						vls = [];											// selected values
					
					if (!el.hasClass('selected')) {							// (mark|unmark) as selected
						if (el.data('type') === 'unique') {
							elp.children().removeClass('selected');
						}
						else {
							elp.children('[data-type="unique"]').removeClass('selected');
						}
						el.addClass('selected');
					}
					else {
						el.removeClass('selected');
					}
					
					elp.find('.selected').each(function(key) {				// get the values and set form input
						vls[key] = $(this).data('value');
					});
					self.form.find('[name="'+elp.data('input')+'"]').val(vls.join('+'));
				});
			}
		},
		
		/** 
		 *	Display error message
		 * 
		 *	@param: object el - elements parent object (with error)
		 * 	@param: string er - error message
		**/
		displayError: function(elp, er) {
			if (!elp.hasClass('error')) {
				var erm = $('<span />', {'html': er, 'class': 'message error'}); // new error message object
				elp.addClass('error').append(erm);
			}
		},
		
		/** 
		 *	Hide error message
		 * 
		 *	@param: object el - elements parent object (with error)
		**/
		hideError: function(elp) {
			if (elp.hasClass('error')) {
				elp.removeClass('error').find('span.error').remove();
			}
		},
		
		/** 
		 *	Validates value based on the rules
		 * 
		 *	@param: string val - value to validate
		 * 	@param: string nm - input field name
		 *	@param: string lb - input label
		 *	@param: bool ga - ga event tracking
		**/
		validateValue: function(val, nm, lb, ga) {
			ga = (typeof ga !== 'undefined' ? ga : true);					// set default value
			var self = this,												// lib object
				rules = false,
				ga_err = '',
				err = '';
			if (this.rules[this.action]) {
				rules = this.rules[this.action][nm];						// array object of rules
			}
			
			if (rules) {
				for (var key in rules) {
					if (key === 'required' && ga === true) {				// don't display required error on focus out event, using ga var just because it work in this use case, should implement different var
						if (val.length <= 0) {
							ga_err = lb+' field left empty';
							err = lb+' is required.';
							break;
						}
					}
					else if (key === 'valid_email' && val.length > 0) {
						var pattern = new RegExp(/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|aero|asia|biz|cat|com|coop|info|int|jobs|mobi|museum|name|net|org|pro|tel|travel|xxx|edu|gov|mil)\b$/);
						if (!pattern.test(val)) {
							ga_err = 'incorrect email address structure';
							err = 'Please enter a valid email address.';
							break;
						}
					}
					else if (key === 'min_length' && val.length > 0) {
						if (val.length < rules[key]) {
							ga_err = lb+' is under '+rules[key]+' characters';
							err = 'Please enter a minimum of '+rules[key]+' characters.';
							break;
						}
					}
					else if (key === 'max_length' && val.length > 0) {
						if (val.length > rules[key]) {
							ga_err = lb+' is above '+rules[key]+' characters';
							err = 'Please enter a maximum of '+rules[key]+' characters.';
							break;
						}
					}
					else if (key === 'special_chars' && val.length > 0) {
						var pattern = new RegExp(/[/:;\>\<&\*`\|\.,"#']+/);
						if (pattern.test(val)) {
							ga_err = lb+' includes unaccepted characters';
							err = 'Don\'t use these characters:<br />/ : ; > < & * ` | . , " # \'';
							break;
						}
					}
				}
				if (err !== '') {
					if (ga === true) {
						self.trackGA('Login|Registration Error', self.action, ga_err);
					}
					return err;
				}
			}
			return false;
		},
		
		/** 
		 *	Send message to parent window
		 * 
		 *	@param: object msg - json type object to send ({var : message})
		**/
		sendMessage: function(msg) {
			pm({
				target:	window.parent,
				type: 'registration',
				url: parent_url,
				data: msg
			});
		},
		
		/** 
		 *	GA event tracking
		 * 
		 *  @param: string ga_category
		 *	@param: string ga_action
		 *	@param: string ga_label
		**/
		trackGA: function(ga_category, ga_action, ga_label) {
			if (ga_category === 'Login|Registration Error') {
				if (ga_action === 'login') {
					ga_action = 'login error';
				}
				else if (ga_action === 'register') {
					ga_action = 'registration error';
				}
				else if (ga_action === 'lost_password') {
					ga_action = 'password recovery error';
				}
				ga_label = ga_label.toLowerCase();
			}
			_gas.push(['_trackEvent', ga_category, ga_action, ga_label]);
		}
	}
})();