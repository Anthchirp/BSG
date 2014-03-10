// based on http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function() {
 var hash = 0;
 if (this.length == 0) return hash;
 for (i = 0; i < this.length; i++) {
  char = this.charCodeAt(i);
  hash = ((hash<<5)-hash)+char;
  hash |= 0; // Convert to 32bit integer
 }
 return Math.abs(hash);
}


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
    a.innerHTML = sginfo[bsg].Richter[richter].Name;
    a.href = sginfo[bsg].Richter[richter].Link;
    p.appendChild(a);
   } else {
    var n = document.createElement('span');
    n.innerHTML = sginfo[bsg].Richter[richter].Name;
    p.appendChild(n);
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
   var tb = document.createElement('tbody');
   var tr = document.createElement('tr');
   tr.className = "az";

   var td = document.createElement('td');
   {
    var d = document.createElement('div');
    var img = document.createElement('img');
    img.src = "link.png";
    d.appendChild(img); // document.createTextNode(urteile[i].Aktenzeichen.hashCode()));
    d.id = urteile[i].Aktenzeichen.hashCode();
    d.className = "anchor";
    d.onclick = function() { window.location.hash = "#" + this.id; };
    td.appendChild(d);
   }
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

   tb.appendChild(tr);

   var tr = document.createElement('tr');
   tr.className = "ds";
   var td = document.createElement('td');
   td.innerHTML = urteile[i].Zusammenfassung;
   td.colSpan = 3;
   tr.appendChild(td);
   tb.appendChild(tr);
   t.appendChild(tb);
  }
  newDiv.appendChild(t);
 }
 oldDiv.parentNode.replaceChild(newDiv, oldDiv);

 // Scroll script from: http://stackoverflow.com/questions/4801655/how-to-go-to-a-specific-element-on-page
 // Finds y value of given object
 function findPos(obj) {
  var curtop = 0;
  if (obj.offsetParent) {
   do {
    curtop += obj.offsetTop;
   } while (obj = obj.offsetParent);
   return [curtop];
  }
 }
 function scrollTo(hash) {
  window.scroll(0,findPos(document.getElementById(hash)));
 }
 if (window.location.hash != '') {
  scrollTo(window.location.hash.substring(1));
 }
}
