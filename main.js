document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      locale: 'ja',
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title',
        end: 'prev,today,next'
      },
      dayCellContent: function (info) { // htmlを返すように
        var number = document.createElement("a");
        number.classList.add("fc-daygrid-day-number");
        number.innerHTML = info.dayNumberText.replace('日', '');
        if (info.view.type === "dayGridMonth") {
          return {
            html: number.outerHTML
          };
        }
        return {
          domNodes: []
        };
      },
    });
    calendar.render();
  });
