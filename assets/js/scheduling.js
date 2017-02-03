function newJobInfo(element) {
  var count = parseInt($('#plus').attr('value')) || 1;
  $('#job .container').append('\
    <div class="job-info">\
      <label for="arrival-' + count + '">T. Chegada</label>\
      <input id="arrival-' + count + '" value="0" min="0" step="any" class="count" type="number" name="arrival-' + count + '">\
      <label for="execution-' + count + '">T. Execução</label>\
      <input id="execution-' + count + '" value="0" min="0" step="any" type="number" name="execution-' + count + '">\
      <label for="deadline-' + count + '">Deadline</label>\
      <input id="deadline-' + count + '" value="0" min="0" step="any" type="number" name="deadline-' + count + '">\
    </div>');

  count = count + 1;
  $('#plus').attr('value', count);
}

function mountArray(event) {
  event.preventDefault();
  $('.job').remove();
  var arr = [];

  for (var i = 0; i < $('.count').length; i++) {
    exec = $('#execution-' + i).val();
    arrival = $('#arrival-' + i).val();
    dist = arrival;
    arr.push({execution: exec.toString(), off: arrival.toString(), distance: dist.toString()});
  }

  return arr;
}
