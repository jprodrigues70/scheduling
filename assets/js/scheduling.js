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

function SortByArrival(a, b){
  var aArrival = a.off.toLowerCase();
  var bArrival = b.off.toLowerCase();
  return ((aArrival < bArrival) ? -1 : ((aArrival > bArrival) ? 1 : 0));
}

function getJob(i) {
  var job = 65 + i;
  return String.fromCharCode(job);
}

function fifo(arr) {
  arr.sort(SortByArrival);

  for (var i = 0; i < arr.length; i++) {
    var diff = 0;

    if (arr[i].execution != 0) {

      if (i > 0) diff = (parseInt(arr[i].distance) + parseInt(arr[i - 1].distance) + parseInt(arr[i - 1].execution) - parseInt(arr[i].off)).toString();

      if (diff > parseInt(arr[i].distance)) arr[i].distance = diff;


      wait = (parseInt(arr[i].distance) - parseInt(arr[i].off)).toString();
      if (parseInt(wait) < 0) wait = '0';


      $('#fifo').append('<dd class="job execution-' + arr[i].execution + ' wait-' + wait + ' distance-' + arr[i].distance + ' off-' + arr[i].off + '"><span class="text">' + getJob(i) + '</span></dd>');
    }
  }
}
