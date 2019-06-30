/**
 * Generates new group of inputs to register a job
 * @return {void}
 */
function newJobInfo() {
  var count = parseInt($('#plus').attr('value')) || 1;
  $('#job .container').append('\
    <div class="job-info">\
      <div class="field-group-inline">\
        <label for="name-' + count + '">Processo</label>\
        <input disabled id="name-' + count + '" value="' + getJob(count) + '" type="text" name="name-' + count + '">\
      </div>\
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
    deadline = parseFloat($('#deadline-' + i).val());
    n = $('#name-' + i).val();

    arr.push({execution: exec, off: arrival, distance: arrival, deadline: deadline, name: n});
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
function mountHtml(name, execution, wait, distance, off, i, over = 0, aClass = '') {
  eFloat = getDecimal(execution);
  execution = getInteger(execution);
  wFloat = getDecimal(wait);
  wait = getInteger(wait);
  dFloat = getDecimal(distance);
  distance = getInteger(distance);
  oFloat = getDecimal(off);
  off = getInteger(off);
  ov = parseInt($('#overload').val());
  over = (over > 0) ? "class=\"overload " + getInteger(over) + "\" style = \"left: " + ((execution*20)  - 20*ov)+ "px; width: " + 20*ov + "px\"": '';
  return '<dd class="' + aClass + ' job execution-' + execution + ' e-float-' + eFloat + ' wait-' + wait + ' w-float-' + wFloat + ' distance-' + distance + ' d-float-' + dFloat + ' off-' + off + ' o-float-' + oFloat + '"><span class="text">' + name + '</span><div ' + over + '></div></dd>';
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
  if (aArrival == bArrival) {
    return (a.name > b.name)
  }
  return ((aArrival < bArrival) ? -1 : ((aArrival > bArrival) ? 1 : 0));
}

/**
 * Argument to sort by Name
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByNameDesc(a, b){
  return (a.name < b.name)
}

/**
 * Argument to sort by Arrival
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByArrivalNameDesc(a, b){
  var aArrival = a.off;
  var bArrival = b.off;
  if (aArrival == bArrival) {
    return (a.name < b.name)
  }
  return ((aArrival < bArrival) ? -1 : ((aArrival > bArrival) ? 1 : 0));
}

/**
 * Argument to sort by Execution
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByExecution(a, b){
  var aExecution = a.execution;
  var bExecution = b.execution;
  return ((aExecution < bExecution) ? -1 : ((aExecution > bExecution) ? 1 : 0));
}

/**
 * Argument to sort by Execution
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByDeadline(a, b){

  var adeadline = a.deadline;
  var bdeadline = b.deadline;
  return ((adeadline < bdeadline) ? -1 : ((adeadline > bdeadline) ? 1 : 0));
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
 * Argument to sort by Arrival and Deadline
 * @param {number} a element to be compared
 * @param {number} b element to be compared
 * @return {number}
 */
function SortByArrivalAndDeadline(a, b){

  if (a.off < b.off) return -1;
  if (a.off > b.off) return 1;
  if (a.off == b.off) {

    if (a.deadline < b.deadline) return -1;

    if (a.deadline > b.deadline) return 1;
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


      $('#fifo').append(mountHtml(arr[i].name, arr[i].execution, arr[i].wait, arr[i].distance, arr[i].off, i));
    }
  }
  turnAround(arr, 'Fifo');
}

function sjf(arr) {

  var ExecutingTime = 0;
  var arr3 = [];

  while (arr.length > 0){

    arr.sort(SortByArrivalAndExecution);

    var arr2 = [];
    for(var i = 0; i < arr.length; i++){
      if(arr[i].off <= ExecutingTime){
        arr2.push(arr[i]);
      }
    }

    if(typeof arr2[0] !== 'undefined'){
      if(arr2[0].off <= ExecutingTime){
        arr2.sort(SortByExecution);
        arr.splice.apply(arr, [0, arr2.length].concat(arr2));
        arr[0].distance = ExecutingTime;
        arr[0].wait = ExecutingTime - arr[0].off;
        $('#sjf').append(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i));
        ExecutingTime = (arr[0].distance + arr[0].execution)-1;
        arr3.push(arr[0]);
        arr.splice(0, 1);
      }
    }

    ExecutingTime++;

  }
  turnAround(arr3, 'Sjf');
}

function father(obj) {
  return (obj.name == this && obj.aClass == 'hasChild');
}

function roundRobin(arr) {
  var quantum = parseInt($('#quantum').val());
  var over = parseInt($('#overload').val());
  var ExecutingTime = 0;
  var arr3 = [];

  while(arr.length > 0){
    var overVerify = 0;
    var nextProccess = {};
    var name = '';
    var next;

    arr.sort(SortByArrival);

    var arr2 = [];
    for(var i = 0; i < arr.length; i++){
      if(arr[i].off <= ExecutingTime){
        arr2.push(arr[i]);
      }
    }

    if(typeof arr2[0] !== 'undefined'){
      if(arr2[0].off <= ExecutingTime){

        arr.splice.apply(arr, [0, arr2.length].concat(arr2));
        if (arr[0].execution > quantum) {
          next = arr[0].execution;
          name = arr[0].name;
          arr[0].execution = quantum + over;
          nextProccess.name = name;
          nextProccess.execution = next - quantum;
          nextProccess.off = ExecutingTime + quantum + over;
          nextProccess.distance =  ExecutingTime + quantum + over;
          nextProccess.aClass = 'child';
          arr.push(nextProccess);
          if (arr[0].aClass == undefined) arr[0].aClass = 'hasChild';
          overVerify = 1;
        } else {
          arr[0].aClass = (arr[0].aClass != undefined)? 'child': '';
        }

        arr[0].distance = ExecutingTime;
        arr[0].wait = ExecutingTime - arr[0].off;

      

        if (overVerify > 0) {
          if (arr[0].aClass != 'child') {
            $('#rr').append(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, over, 'rr' + arr[0].name));
          } else {
            $('.rr' + arr[0].name).prepend(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, over, 'child'));
          }
        } else {
          if (arr[0].aClass != 'child') {
            $('#rr').append(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, 0, 'rr' + arr[0].name));
          } else {
            $('.rr' + arr[0].name).prepend(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, 0, 'child'));
          }
        }

        ExecutingTime = (arr[0].distance + arr[0].execution)-1;

        var f = arr3.find(father, arr[0].name);
        var index = arr3.indexOf(f);

        if (index > -1) {
          arr3[index].wait = arr3[index].wait + arr[0].wait;  
          arr3[index].execution = arr3[index].execution + arr[0].execution;  
        } else {
          arr3.push(arr[0]);
        }

        arr.splice(0, 1);
      }
    }

    ExecutingTime++;

  }

  turnAround(arr3, 'Rr');
}

function father(obj) {
  return (obj.name == this && obj.aClass == 'hasChild');
}

function edf(arr) {
  var quantum = parseInt($('#quantum').val());
  var over = parseInt($('#overload').val());
  var ExecutingTime = 0;
  var arr3 = [];

  while(arr.length > 0){
    var overVerify = 0;
    var nextProccess = {};
    var name = '';
    var next;

    arr.sort(SortByArrivalAndDeadline);

    var arr2 = [];
    for(var i = 0; i < arr.length; i++){
      if(arr[i].off <= ExecutingTime){
        arr2.push(arr[i]);
      }
    }

    if(typeof arr2[0] !== 'undefined'){
      if(arr2[0].off <= ExecutingTime){
        arr2.sort(SortByDeadline);

        arr.splice.apply(arr, [0, arr2.length].concat(arr2));
        if (arr[0].execution > quantum) {
          next = arr[0].execution;
          name = arr[0].name;
          arr[0].execution = quantum + over;
          nextProccess.name = name;
          nextProccess.execution = next - quantum;
          nextProccess.off = ExecutingTime + quantum + over;
          nextProccess.distance =  ExecutingTime + quantum + over;
          nextProccess.aClass = 'child';
          arr.push(nextProccess);
          if (arr[0].aClass == undefined) arr[0].aClass = 'hasChild';
          overVerify = 1;
        } else {
          arr[0].aClass = (arr[0].aClass != undefined)? 'child': '';
        }

        arr[0].distance = ExecutingTime;
        arr[0].wait = ExecutingTime - arr[0].off;

      

        if (overVerify > 0) {
          if (arr[0].aClass != 'child') {
            $('#edf').append(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, over, 'edf' + arr[0].name));
          } else {
            $('.edf' + arr[0].name).prepend(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, over, 'child'));
          }
        } else {
          if (arr[0].aClass != 'child') {
            $('#edf').append(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, 0, 'edf' + arr[0].name));
          } else {
            $('.edf' + arr[0].name).prepend(mountHtml(arr[0].name, arr[0].execution, arr[0].wait, arr[0].distance, arr[0].off, i, 0, 'child'));
          }
        }

        ExecutingTime = (arr[0].distance + arr[0].execution)-1;

        var f = arr3.find(father, arr[0].name);
        var index = arr3.indexOf(f);

        if (index > -1) {
          arr3[index].wait = arr3[index].wait + arr[0].wait;  
          arr3[index].execution = arr3[index].execution + arr[0].execution;  
        } else {
          arr3.push(arr[0]);
        }

        arr.splice(0, 1);
      }
    }
    ExecutingTime++;

  }
  turnAround(arr3, 'Edf');
}
