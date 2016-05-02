$(document).ready(function(){

	//Change to appropriate date and time
	
	function updateTime(){ $(".date").html(moment().format('dddd')+', '+ moment().format('MMMM Do') + "<br>" + moment().format("h:mm a")); 
	}
	updateTime();
	setTimeout(updateTime, 30000);

	// $("#journalTextarea").change
	$('#journalTextarea').on('input propertychange paste', function() {
    	if ($("#journalTextarea").val() != ""){
    		$("#submitJournal").css("visibility","visible");
    	} else {
    		$("#submitJournal").css("visibility","hidden");
    	}
	});

	//Collapse entries and expand textbox while writing
	$('#journalTextarea').on('click', function() {
    	$(".preview").css('display'," block");
		$(".entryFull").css('display',"none");
		$(".entry").css('min-height','0px');
		$(".entry").css('height','20px');
		$(".entry").css('background-color', "#8c315d");
		$(".entry").removeClass('expanded');
		$(this).css('height','150px');

	});


	//Display journal entry date on hover
	$("#prevJournalEntries").on('mouseover', '.entry', function(){

            $(this).find(".previewText").css('display','block');
            $(this).find(".previewDate").css('display','block');


             // $(this).css('right','5px');
	});
	//Remove preview date off hover
	$("#prevJournalEntries").on('mouseleave', '.entry', function(){
		$(this).find(".previewDate").css('display','none');
            // $(this).css('right','0px');
	});

	//Delete post (hides visibility of it...)
	$("#prevJournalEntries").on('click', '.delete', function(){
		var entry = $(this).closest('.entry');
		entry.fadeOut();
	});

	//Edit post (hides visibility of it...)
	$("#prevJournalEntries").on('click', '.edit', function(){
		var entry = $(this).closest('.entry');
		var entryText = $(entry).find(".entryText");

		//Change back to noneditable
		if ($(entryText).hasClass("editable")){
			$(entryText).removeClass("editable");
			$(entryText).attr("contentEditable" , "false");
			$(this).html('edit');
		} else {
			$(this).html('done');
			$(entryText).attr("contentEditable" , "true");
			$(entryText).addClass("editable");
		}



		// $(entryText).hide();
		// var editTextarea = $(entry).find('.editTextarea')
		// console.log($(entryText).html());
		// editTextarea.value = $(entryText).html() ;
		// $(editTextarea).show();

	});




	$("#prevJournalEntries").on('click', '.entry', function(){
		//Make sure the rest of the things are collapsed

		$(".preview").css('display'," block");
		$(".entryFull").css('display',"none");

		$(".entry").css('min-height','0px');
		$(".entry").css('height','20px');
		$(".entry").css('background-color', "#8c315d");
		$('#journalTextarea').css('height','30px');


		

		// if ($(this).hasClass('expanded')){
		// 	$(".entry").removeClass('expanded');
		// 	console.log("is expanded");
		// 	$(this).removeClass('expanded');

		// 	$(this).css('min-height','0px');
		// 	$(this).css('height','20px');
		// 	$(this).css('background-color', "#8c315d");
		// 	$(this).children(".entryFull").css('display',"none");
		// 	$(this).children(".preview").css('display', "block");
		// } else {
			$(".entry").removeClass('expanded');
			$(this).addClass('expanded');
			$(this).css('min-height','60px');
			$(this).css('height','auto');
			$(this).css('background-color', "#C63F7E");
			$(this).children(".entryFull").css('display',"block");
			$(this).children(".preview").css('display', "none");
		// }
		
		


	})

	//When submitting new journal, create new .entry div and append to pastdivs
	// $("#prevJournalEntries").ChildNodes();


	$("#submitJournal").on('click', function(){
		if ($("#journalTextarea").val() == ""){
			return;
		}
		var entryText = $("#journalTextarea").val();
		$("#journalTextarea").val("");
		var previewText;
		if (entryText.length > 26){
			previewText = entryText.substring(0,25);
			previewText = previewText +"...";
		} else{
			previewText = entryText;
		}

		var entry = document.createElement("div");
		var preview = document.createElement("div");
		var entryFull = document.createElement("div");
		var previewDate = document.createElement("div");
		var previewTxt = document.createElement("div");
		var fullDate = document.createElement("div");
		var fullText = document.createElement("div");

		var entryActions = document.createElement("div");
		var deleteSpan = document.createElement("span");
		var editSpan = document.createElement("span");

		entry.className = "entry c";
		preview.className = "preview";
		previewTxt.className = "previewText";
		previewDate.className = "previewDate";
		entryActions.className = "entryActions";
		deleteSpan.className = "delete";
		editSpan.className = "edit";

		previewTxt.innerHTML = previewText;
		previewDate.innerHTML = moment().format('MMM Do');
		fullText.innerHTML = entryText;
		fullText.className = "entryText";

		deleteSpan.innerHTML = "delete";
		editSpan.innerHTML = "edit ";


		entryFull.className = "entryFull";
		fullDate.className = "fullDate";
		fullDate.innerHTML = moment().format('dddd') + ", " + moment().format("MMMM Do YY") + "<br>" + moment().format( 'h:mm a'); 

		$(entryActions).append(editSpan, deleteSpan);

		$(entryFull).append(fullDate, fullText,entryActions);

		$(preview).append(previewTxt, previewDate);
		// $(entryFull).append(fullDate,fullText);


		$(entry).append(preview,entryFull);


		$("#prevJournalEntries").prepend(entry);
		$("#submitJournal").css("visibility","hidden");



		
	});



});