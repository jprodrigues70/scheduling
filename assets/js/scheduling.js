/**
 * Generates new group of inputs to register a job
 * @return {void}
 */
function newJobInfo() {
  var count = parseInt($('#plus').attr('value')) || 1;
  $('#job .container').append('\
    <div class="job-info">\
      <div class="field-group-inline">\
        <label for="arrival-' + count + '">T. Chegada</label>\
        <input id="arrival-' + count + '" value="0" min="0" step="any" class="count" type="number" name="arrival-' + count + '">\
      </div>\
      <div class="field-group-inline">\
        <label for="execution-' + count + '">T. Execução</label>\
        <input id="execution-' + count + '" value="0" min="0" step="any" type="number" name="execution-' + count + '">\
      </div>\
      <div class="field-group-inline">\
        <label for="deadline-' + count + '">Deadline</label>\
        <input id="deadline-' + count + '" value="0" min="0" step="any" type="number" name="deadline-' + count + '">\
      </div>\
    </div>');

  count = count + 1;
  $('#plus').attr('value', count);
}

/**
 * Mounts an array with the inputted values
 * @param  {event} event JS event to execute preventDefault
 * @return {Array}
 */
function mountArray(event) {
  event.preventDefault();
  $('.job').remove();
  var arr = [];

  for (var i = 0; i < $('.count').length; i++) {
    exec = parseFloat($('#execution-' + i).val());
    arrival = parseFloat($('#arrival-' + i).val());

    arr.push({execution: exec, off: arrival, distance: arrival});
  }

  return arr;
}

/**
 * Returns an ascii table element from 65
 * @param  {integer} i  an integer to be added to 65
 * @return {String}     ascii charater
 */
function getJob(i) {
  var job = 65 + i;
  return String.fromCharCode(job);
}

/**
 * Returns a HTML element that represents the job
 * @param  {float} execution Job execution time
 * @param  {float} wait      Job Wait time
 * @param  {float} distance  Time between 0 and job execution start
 * @param  {float} off       Time between 0 and job arrival time
 * @param  {integer} i       iterate value
 * @return {String}          HTML Element that represents the job
 */
function mountHtml(execution, wait, distance, off, i) {
  eFloat = getDecimal(execution);
  execution = getInteger(execution);
  wFloat = getDecimal(wait);
  wait = getInteger(wait);
  dFloat = getDecimal(distance);
  distance = getInteger(distance);
  oFloat = getDecimal(off);
  off = getInteger(off);

  return '<dd class="job execution-' + execution + ' e-float-' + eFloat + ' wait-' + wait + ' w-float-' + wFloat + ' distance-' + distance + ' d-float-' + dFloat + ' off-' + off + ' o-float-' + oFloat + '"><span class="text">' + getJob(i) + '</span></dd>';
}

/**
 * Returns number's integer part
 * @param  {float} value number to be explored
 * @return {string}
 */
function getInteger(value) {
  return Math.floor(value).toString();
}

/**
 * Return number's decimal part
 * @param  {float} value number to be explored
 * @return {string}
 */
function getDecimal(value) {
  return Math.floor(value % 1 * 100).toString();
}

/**
 * Argument to sort by Arrival
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByArrival(a, b){
  var aArrival = a.off;
  var bArrival = b.off;
  return ((aArrival < bArrival) ? -1 : ((aArrival > bArrival) ? 1 : 0));
}

/**
 * Argument to sort by Arrival and Execution
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByArrivalAndExecution(a, b){
  if (a.off < b.off) return -1;
  if (a.off > b.off) return 1;
  if (a.off == b.off) {
	  
	  if (a.execution < b.execution) return -1;
	  
	  if (a.execution > b.execution) return 1;
  }
  return 0
}



/**
 * Calculates the Turnaround
 * @param  {Array} arr  Job Array
 * @param  {String} to  Sxheduling algorithm name
 * @return {Float}
 */
function turnAround(arr, to) {
  var sum = 0;
  var jobs = arr.length;

  for (var i = 0; i < arr.length; i++) {
    (arr[i].execution != 0)? sum = sum + arr[i].wait + arr[i].execution: jobs = jobs - 1;
  }

  tA = sum/jobs

  $("#turnAround" + to).text("Turnaround: " + tA.toFixed(2).toString());

  return tA;
}

/**
 * Scheduling by Arrival
 * @param  {Array} arr  Job Array
 * @return {void}
 */
function fifo(arr) {
  arr.sort(SortByArrival);

  for (var i = 0; i < arr.length; i++) {
    var diff = 0;

    if (arr[i].execution != 0) {

      if (i > 0) diff = (arr[i].distance + arr[i - 1].distance + arr[i - 1].execution - arr[i].off);

      if (diff > arr[i].distance) arr[i].distance = diff;

      arr[i].wait = (arr[i].distance - arr[i].off);

      if (arr[i].wait < 0) arr[i].wait = 0;


      $('#fifo').append(mountHtml(arr[i].execution, arr[i].wait, arr[i].distance, arr[i].off, i));
    }
  }
  turnAround(arr, 'Fifo');
}

function sjf(arr) {
  arr.sort(SortByArrivalAndExecution);
  var ExecutingTime = 0;
  for (var i = 0; i < arr.length; i++) {
  	if (arr[i].execution != 0) {
		if(i > 0){
			arr[i].wait = (arr[i-1].distance + arr[i-1].execution) - arr[i].off;
			arr[i].distance = arr[i-1].off + arr[i-1].execution + arr[i-1].wait;
		}else{
			arr[i].wait = 0;
			arr[i].distance = arr[i].off;
		}
		$('#sjf').append(mountHtml(arr[i].execution, arr[i].wait, arr[i].distance, arr[i].off, i));
		ExecutingTime = arr[i].execution + arr[i].distance;
	}
  }
  turnAround(arr, 'Sjf');
}

