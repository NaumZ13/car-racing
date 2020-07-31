$(function(){

	let carWidth=$("#car1").width();
	let raceTrackWidth=$(window).width()-carWidth;
	$('#start-over').attr("disabled", true)

	function checkIfComplete()  {
		let flag = $("#flag");

		if(isComplete==false){
			isComplete=true;
			flag.css("display", "block")
			flag.css("opacity", "1")

			$('#race-track').css("opacity", "0.5")
			$('#start-over').removeAttr("disabled")
		}
		else{
			place='second'; 
		}
	}


	let isComplete=false;
	let place='first';

	$("#start-race").on('click',function(){
		$(this).attr("disabled", true)
		$('#start-over').attr("disabled",true)
		let raceTimeOne=Math.floor((Math.random()*5000)+1);
		let raceTimeTwo=Math.floor((Math.random()*5000)+1);

		var counter = 4;
		let interval = setInterval(function(){
			counter--;
			// let counterNumbers = $('#counter')
			// counterNumbers.text("")
			$('#race-track').css('opacity', '0.5')
			$('#counter').html(counter);
			if(counter == 0){
				clearInterval(interval);
				$('#counter').remove();
				$('#race-track').css('opacity', '1');
				$("#car1").animate({
					left: raceTrackWidth
				},raceTimeOne,function(){
					checkIfComplete();
					 let rowOne = document.createElement("tr");
					rowOne.setAttribute("class", "border");
					rowOne.innerHTML += `Finished in: <span class="car-1-color">${place}</span> place with a time of <span class="car-1-color">${raceTimeOne}</span> miliseconds.`;
					$(".tableOne").append(rowOne);
						 
					
					localStorage.setItem("carOnePlace", place);
					localStorage.setItem("carOneDuration", raceTimeOne);
				});
				
				$("#car2").animate({
					left: raceTrackWidth
				},raceTimeTwo,function(){
					checkIfComplete();
					let rowTwo = document.createElement("tr");
					rowTwo.setAttribute("class", "border");
					rowTwo.innerHTML += `Finished in: <span class="car-2-color">${place}</span> place with a time of <span class="car-2-color">${raceTimeTwo}</span> miliseconds.`;
					$(".tableTwo").append(rowTwo);
					localStorage.setItem("carTwoPlace", place);
					localStorage.setItem("carTwoDuration", raceTimeTwo);
				});
			}
		}, 800)
	});
	
	$("#start-over").on('click',function(){
		$("#flag").css("display", "none")
		$('#start-race').removeAttr("disabled");
		$('#car1').removeAttr("style");
		$("#car2").removeAttr("style");
		isComplete = false;
		place = "First";
		counter = 4;
		counter--;
			$('#race-track').css('opacity', '0.5')
			$('#counter').html(counter);
		$('#race-track').css('opacity', '1');

	});

	
    let visitCount = localStorage.getItem("on_load_counter");
   if(visitCount === null){
	visitCount = 0;
	$('.previous-results-th').css("display", "none")
	$('.previous-results-table').css("display", "none");
}
visitCount++;
localStorage.setItem("on_load_counter", visitCount);
if(visitCount != 0) {
	$('.previous-results-table').css("display", "block")
    $('.previous-results-th').css("display", "block")
	let rowOne = document.createElement("tr");
	rowOne.setAttribute("class", "border");
	rowOne.innerHTML = `<span class="car-1-color">Car 1</span> Finished in <span class="car-1-color">${localStorage.getItem("carOnePlace")}</span> place with a time of <span class="car-1-color">${localStorage.getItem("carOneDuration")}</span> miliseconds.`;
	$(".previous-results-table").append(rowOne);

	let rowTwo = document.createElement("tr");
	rowTwo.setAttribute("class", "border");
	rowTwo.innerHTML = `<span class="car-2-color">Car 2</span> Finished in <span class="car-2-color">${localStorage.getItem("carTwoPlace")}</span> place with a time of <span class="car-2-color">${localStorage.getItem("carTwoDuration")}</span> miliseconds.`;
	$(".previous-results-table").append(rowTwo);
}

})
