$(document).ready(function() {

	//handlebars
	var htmlDay = $('#calendar-template').html();
	var dayTemplate = Handlebars.compile(htmlDay);

	var htmlWeekDay = $('#weekday-template').html();
	var weekDayTemplate = Handlebars.compile(htmlWeekDay);
	//end handlebars

	var startDate = moment('2018-01-01');
	var minDate = moment('2018-01-01');
	var maxDate = moment('2018-12-01');
	stampWeekDay(startDate);
	stampMonthDays(startDate);
	printHolidays(startDate);

	$('.next-month').click(function () {
		if (startDate.isSameOrAfter(maxDate)) {
			alert('Stop');
		} else {
			$('.previous-month').prop('disabled',false);
			startDate.add(1,'month');
			stampMonthDays(startDate);
			printHolidays(startDate);
			if (startDate.isSameOrAfter(maxDate)) {
				$('.next-month').prop('disabled',true);
			}
		}
	});

	$('.previous-month').click(function () {
		if (startDate.isSameOrBefore(minDate)) {
			alert('Stop');
		} else {
			$('.next-month').prop('disabled',false);
			startDate.subtract(1,'month');
			stampMonthDays(startDate);
			printHolidays(startDate);
			if (startDate.isSameOrBefore(minDate)) {
				$('.previous-month').prop('disabled',true);
			}
		}
	});





	function printHolidays(mth) {
		$.ajax({
			url:'https://flynn.boolean.careers/exercises/api/holidays',
			method:'GET',
			data: {
				year:2018,
				month:mth.month(),
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
		var firstOfMonth = standardDay.startOf('month').weekday();
		if (firstOfMonth != 0) {
			for (var i = 0; i < firstOfMonth; i++) {
				var fakeDayToPush = {day:"",dayDate:""};
				var fakeFinalTemplate = dayTemplate(fakeDayToPush);
				$('#calendar').append(fakeFinalTemplate);
				standardDay.add(1,'day');
			}
		}

		for (var i = 1; i <= monthDate; i++) {
			var dayToPush = {day:i + ' ' + monthName,dayDate:standardDay.format('YYYY-MM-DD')};
			var finalTemplate = dayTemplate(dayToPush);
			$('#calendar').append(finalTemplate);
			standardDay.add(1,'day');
		}
	}

	function stampWeekDay(monthToStamp) {
		for (var i = 1; i <= 7; i++) {
			var standardDay = monthToStamp.clone();
			var weekDayToPush = {dayofWeek:standardDay.isoWeekday(i).format('dddd')};
			var finalTemplate = weekDayTemplate(weekDayToPush);
			$('#weekday').append(finalTemplate);
		}
	}
})
