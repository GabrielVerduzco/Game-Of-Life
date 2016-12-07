var tbody=document.createElement('tbody');

function generate_table(){
    var size = $('#size').val();
    //console.log(size); 
    var table=document.createElement('table');
    table.appendChild(tbody);
    table.setAttribute("class","table table-bordered");
    document.body.appendChild(table);
    
    for (var i = 0; i <size ; i++) {
        tbody.appendChild(document.createElement('tr'));
        for (var j = 0; j < size; j++) 
        {
            tbody.childNodes[i].appendChild(document.createElement('td'));
            tbody.childNodes[i].childNodes[j].appendChild(document.createTextNode('0'));
            tbody.childNodes[i].childNodes[j].setAttribute( "class", "dead" );
           
         }
    }
}