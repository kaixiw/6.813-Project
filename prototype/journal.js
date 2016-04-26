$(document).ready(function(){
	// $("#journalTextarea").change
	$('#journalTextarea').on('input propertychange paste', function() {
    	if ($("#journalTextarea").val() != ""){
    		$("#submitJournal").css("display","block");
    	} else {
    		$("#submitJournal").css("display","none");
    	}
	});


	//Display journal entry date on hover
	$("#prevJournalEntries").on('mouseover', '.entry', function(){
		console.log("mouseover");
            $(this).find(".previewText").css('display','block');
            $(this).find(".previewDate").css('display','block');


             // $(this).css('right','5px');
	});

	$("#prevJournalEntries").on('mouseleave', '.entry', function(){
		$(this).find(".previewDate").css('display','none');
            // $(this).css('right','0px');
	});





	$("#prevJournalEntries").on('click', '.entry', function(){
		//Make sure the rest of the things are collapsed
		console.log('entry clicked');
		$(".preview").css('display'," block");
		$(".entryFull").css('display',"none");
		$(".entry").css('height','20px');


		
		
		// $(this).children(".entryFull").toggleClass('hid','vis');

		// $(this).children(".preview").toggleClass('hid','vis');
		if ($(this).hasClass('expanded')){
			$(".entry").removeClass('expanded');
			console.log("is expanded");
			$(this).removeClass('expanded');
			$(this).css('height','20px');
			$(this).children(".entryFull").css('display',"none");
			$(this).children(".preview").css('display', "block");
		} else {
			$(".entry").removeClass('expanded');
			$(this).addClass('expanded');
			$(this).css('height','200px');
			$(this).children(".entryFull").css('display',"block");
			$(this).children(".preview").css('display', "none");
		}
		
		


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

		entry.className = "entry a";
		preview.className = "preview";
		previewTxt.className = "previewText";
		previewDate.className = "previewDate";

		console.log(previewText);
		previewTxt.innerHTML = previewText;
		console.log(previewTxt.innerHTML);
		previewDate.innerHTML = moment().format('MMM Do');
		console.log(previewDate.innerHTML)
		fullText.innerHTML = entryText;
		fullText.className = "entryText";

		entryFull.className = "entryFull";
		fullDate.className = "fullDate";
		fullDate.innerHTML = moment().format('dddd') + ", " + moment().format("MMM Do YY") + "<br>" + moment().format( 'h:mm a'); 


		$(entryFull).append(fullDate, fullText);

		$(preview).append(previewTxt, previewDate);
		// $(entryFull).append(fullDate,fullText);


		$(entry).append(preview,entryFull);


		$("#prevJournalEntries").prepend(entry);
		$("#submitJournal").css("display","none");



		
	});



});