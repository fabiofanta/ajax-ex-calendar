$(document).ready(function() {

	//handlebars
	var htmlDay = $('#calendar-template').html();
	var dayTemplate = Handlebars.compile(htmlDay);
	//end handlebars

	var startDate = moment('2018-01-01');
	stampMonthDays(startDate);
	printHolidays(0);

	$('.next-month').click(function () {
		startDate.add(1,'month');
		stampMonthDays(startDate);
		var mthName = startDate.format('M') - 1;
		printHolidays(mthName);
	});

	$('.previous-month').click(function () {
		startDate.subtract(1,'month');
		stampMonthDays(startDate);
		var mthName = startDate.format('M') - 1;
		printHolidays(mthName);
	});

	function printHolidays(mth) {
		$.ajax({
			url:'https://flynn.boolean.careers/exercises/api/holidays',
			method:'GET',
			data: {
				year:2018,
				month:mth,
			},
			success: function (data) {
				var holidays = data.response;
				for (var i = 0; i < holidays.length; i++) {
					var holiday = holidays[i];
					var holidayName = holiday.name;
					var holidayDate = holiday.date;
					$('#calendar li[data-day="' + holidayDate + '"]').addClass('holiday').append('-' + holidayName);
				};
			}
		})
	}


	function stampMonthDays(monthToStamp) {
		$('#calendar').empty();
		var standardDay = monthToStamp.clone();
		var monthDate = monthToStamp.daysInMonth();
		var monthName = monthToStamp.format('MMMM');
		$('#month-name').text(monthName);
		for (var i = 1; i <= monthDate; i++) {
			var dayToPush = {day:i + ' ' + monthName,dayDate:standardDay.format('2018-MM-DD')};
			var finalTemplate = dayTemplate(dayToPush);
			$('#calendar').append(finalTemplate);
			standardDay.add(1,'day');
		}
	}
})
