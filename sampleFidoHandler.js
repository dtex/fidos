$AM.showFDO = function(fdo, params) {

  // This creates a deep copy of the fdo so that we do not alter the original
	fdo = $AM.extend(true, {}, fdo);
	
	var mBox = $AM('#SAMdrawer'),
		rules = {};
	
	// If SAMdrawer has not already been added to the DOM
	if (mBox.length === 0) {
		mBox = $AM('body').append('<div id="SAMdrawer"></div>');
	}
	
	/* ---------------------------
	// We should be building the drawer outside of the rendered page. Right now every append triggers a redraw
	// No es bueno
	--------------------------- */
	
	// Return drawer to home position
	$AM("#SAMdrawer").html('').css({'left': ($AM(document).width() - $AM("#SAMdrawer").outerWidth()) / 2, 'top': -2000});
	
	// Insert the title if it exists
	if ($AM._.has(fdo, 'title')) {
		$AM("#SAMdrawer").append('<h1>'+fdo.title+'</h1>');
		delete fdo.title;
	}
	
	if ($AM._.isUndefined(fdo, 'class')) { fdo.class = '' };
	$AM("#SAMdrawer").append('<form action="default.asp" method="POST" class="'+fdo.class+'" id="SAMdrawerForm"></form>');
	delete fdo.class;
	
	$AM("#SAMdrawerForm").append('<div id="SAMdrawerLiveArea"></div>');
	
	if ($AM._.has(fdo, 'instructions')) {
		$AM("#SAMdrawerLiveArea").append('<p>'+fdo.instructions+'</p>');
		delete fdo.instructions;
	}
	
	$AM("#SAMdrawerLiveArea").append('<div id="SAMdrawerLiveAreatop" /><div id="SAMdrawerLiveArealeft" /><div id="SAMdrawerLiveArearight" /><div id="SAMdrawerLiveAreabottom" /><div class="clear" />');
	
	// Loop through each of the fields in this form
	$AM.each(fdo.fields, function(i, v) {

		var fieldDiv = jQuery('<div style="' + (v.style || '') + '"  />');
		
		$AM("#SAMdrawerLiveArea"+v.column).append(fieldDiv);
		
		if (typeof v.label !== 'undefined' && v.type !== 'checkbox') {
			if (typeof v.tooltip !== 'undefined') {
				v.tooltip = '<img src=/admin/graphics/tooltipArrow.png />' + v.tooltip;
				fieldDiv.append('<label for="'+i+'" class="samTooltip SAMType'+v.type+'" title="'+v.tooltip+'">'+v.label+'</label>');
			} else {
				fieldDiv.append('<label for="'+i+' class="SAMType'+v.type+'">'+v.label+'</label>');
			}
		}
		
		if (v.type === 'textarea') {
			fieldDiv.append('<textarea id="'+i+'" name="'+i+'" class="'+v.class+'">'+v.value+'</textarea>');
		} else if (v.type ==='checkbox') {
			if (v.value === 1) {
				fieldDiv.append('<input type="'+v.type+'" id="'+i+'" name="'+i+'" class="'+v.class+'" checked="yes" />');
			} else {
				fieldDiv.append('<input type="'+v.type+'" id="'+i+'" name="'+i+'" class="'+v.class+'" />');
			}
		} else if (v.type ==='select') {
			fieldDiv.append('<select name="'+i+'" id="'+i+'" class="'+v.class+'" />');
			$AM.each(v.options, function(idx, option) {
				$AM('#'+i).append('<option value="'+option.value+'">'+option.label+'</option>');
			});
		} else if (v.type ==='tree') {
			fieldDiv.append('<div id="SAMtree" /><input type="hidden" id="targetID" name="targetID" />');
		} else if (v.type ==='div') {
			fieldDiv.append('<div id="'+i+'" class="'+v.class+'" />');
		} else if (v.type ==='sequence') {
			fieldDiv.append('<ul id="SAMsequence" /><input type="hidden" id="'+i+'" name="'+i+'" />');
		} else {
			fieldDiv.append('<input type="'+v.type+'" id="'+i+'" name="'+i+'" class="'+v.class+'" value="'+v.value+'" />');
		}
		
		if (typeof v.label !== 'undefined' && v.type === 'checkbox') {
			if (typeof v.tooltip !== 'undefined') {
				v.tooltip = '<img src=/admin/graphics/tooltipArrow.png />' + v.tooltip;
				fieldDiv.append('<label for="'+i+'" class="samTooltip SAMType'+v.type+'" title="'+v.tooltip+'">'+v.label+'</label>');
			} else {
				fieldDiv.append('<label for="'+i+' class="SAMType'+v.type+'">'+v.label+'</label>');
			}
		}
		
		if (typeof v.rules !== 'undefined') {
			if (typeof v.rules.SAMmaxlength !== 'undefined' || typeof v.rules.SAMreclength !== 'undefined') {
				fieldDiv.append('<div class="SAMFieldLength" />');
			}
		}
		 
		// Add tooltip
		rules[i] = v.rules;
		// Add to messages object
		
	});
	
	$AM("#SAMdrawerLiveArea").append('<div class="clear" />');
	$AM('#SAMdrawerForm').append('<input type="submit" class="submit" value="Save" />');
	$AM('#SAMdrawerForm').append('<input type="button" class="cancel" value="Cancel" id="cancelSamDrawer" />');
	$AM('#SAMdrawer').css({'top': 50 - $AM('#SAMdrawer').outerHeight()});
	$AM('.samTooltip').tooltip({tipClass: 'SAMToolTip', position: 'bottom right'});
	$AM('#SAMdrawer').animate({'top': 60}, 300, 'easeOutQuad');
	$AM('#SAMdrawer').expose({ color: '#000', maskId: 'SAMHintMask', closeOnClick: false, closeOnEsc: false });
	
	
	$AM("#SAMdrawerForm").validate({
		'rules': rules,
		'errorElement': "em"
	}).form();
	
	$AM(".SAMFieldLength").prev('input, textarea').on('keyup', function() { $AM("#SAMdrawerForm").validate().form() });
	
	if ($AM._.has(fdo, 'init')) fdo.init( params, true );
	
}
