// example code:
// var http_request = new XMLHttpRequest();
// http_request.open("GET", 'urteile.json', true);
// http_request.onreadystatechange = function () {
//  var done = 4, ok = 200;
//  if (http_request.readyState === done && http_request.status === ok) {
//   bsginfo = JSON.parse(http_request.responseText);
//   urteilsliste(document.getElementById('urteile'), bsginfo);
//  }
// };
// http_request.send(null);

function urteilsliste(htmlelement,sginfo) {
 var oldDiv = htmlelement, 
     newDiv = oldDiv.cloneNode();

 for(var bsg = 0; bsg < sginfo.length; bsg++) {
  var t = document.createElement('table');

  var tc = document.createElement('caption');
  var b = document.createElement('h3');
  b.appendChild(document.createTextNode(sginfo[bsg].BSG));
  b.appendChild(document.createTextNode(". Bundesschiedsgericht "));
  b.appendChild(document.createTextNode(sginfo[bsg].Zeitraum));
  tc.appendChild(b);

  var p = document.createElement('p');
  for (var richter = 0; richter < sginfo[bsg].Richter.length; richter++) {
   if (richter > 0) {
    p.appendChild(document.createTextNode(', '));
    if ((richter % 4) == 0) { p.appendChild(document.createElement('br')); }
   }

   if (typeof sginfo[bsg].Richter[richter].Link != 'undefined') {
    var a = document.createElement('a');
    a.appendChild(document.createTextNode(sginfo[bsg].Richter[richter].Name));
    a.href = sginfo[bsg].Richter[richter].Link;
    p.appendChild(a);
   } else {
    p.appendChild(document.createTextNode(sginfo[bsg].Richter[richter].Name));
   }
   if (typeof sginfo[bsg].Richter[richter].Vorsitz != 'undefined') {
    p.appendChild(document.createTextNode(" (Vorsitzender Richter)"));
   }
   if (typeof sginfo[bsg].Richter[richter].Ersatz != 'undefined') {
    p.appendChild(document.createTextNode(" (Ersatzrichter)"));
   }
  }
  p.appendChild(document.createElement('br'));
  var sm = document.createElement('small');
  sm.innerHTML = 'gew&auml;hlt am ' + sginfo[bsg].Wahl;
  if (typeof sginfo[bsg].Abschlussbericht != 'undefined') {
   sm.appendChild(document.createTextNode(", "));
   var a = document.createElement('a');
   a.appendChild(document.createTextNode("Abschlussbericht"));
   a.href = sginfo[bsg].Abschlussbericht;
   sm.appendChild(a);
  }
  p.appendChild(sm);
  tc.appendChild(p);
  t.appendChild(tc);

  var tr = document.createElement('tr');
  tr.className = "head";
  var th = document.createElement('th');
  th.appendChild(document.createTextNode("Aktenzeichen"));
  tr.appendChild(th);
  var th = document.createElement('th');
  th.appendChild(document.createTextNode("Anrufung"));
  tr.appendChild(th);
  var th = document.createElement('th');
  th.appendChild(document.createTextNode("Erledigung"));
  tr.appendChild(th);
  var th = document.createElement('th');
  th.appendChild(document.createTextNode("Ergebnis"));
  tr.appendChild(th);
  t.appendChild(tr);

  urteile = sginfo[bsg].Urteile;
  if (urteile.length == 0) {
   var tr = document.createElement('tr');
   tr.className="bl";
   var td = document.createElement('td');
   td.innerHTML = "&mdash;"
   tr.appendChild(td);
   var td = document.createElement('td');
   td.innerHTML = "&mdash;"
   tr.appendChild(td);
   var td = document.createElement('td');
   td.innerHTML = "&mdash;"
   tr.appendChild(td);
   var td = document.createElement('td');
   td.innerHTML = "&mdash;"
   tr.appendChild(td);
   t.appendChild(tr);
  }

  for(var i = 0; i < urteile.length; i++){
   var tr = document.createElement('tr');
   tr.className = "az";

   var td = document.createElement('td');
   if (typeof urteile[i].Urteil != 'undefined') {
    var a = document.createElement('a');
    a.appendChild(document.createTextNode(urteile[i].Aktenzeichen));
    a.href = urteile[i].Urteil;
    td.appendChild(a);
   } else {
    td.appendChild(document.createTextNode(urteile[i].Aktenzeichen));
   }

   td.rowSpan=2;
   tr.appendChild(td);
   var td = document.createElement('td');
   td.appendChild(document.createTextNode(urteile[i].Anrufung));
   tr.appendChild(td);
   var td = document.createElement('td');
   td.appendChild(document.createTextNode(urteile[i].Erledigung));
   tr.appendChild(td);
   var td = document.createElement('td');
   td.appendChild(document.createTextNode(urteile[i].Ergebnis));
   tr.appendChild(td);

   t.appendChild(tr);

   var tr = document.createElement('tr');
   tr.className = "ds";
   var td = document.createElement('td');
   td.innerHTML = urteile[i].Zusammenfassung;
   td.colSpan = 3;
   tr.appendChild(td);
   t.appendChild(tr);
  }
  newDiv.appendChild(t);
 }
 oldDiv.parentNode.replaceChild(newDiv, oldDiv);
}
