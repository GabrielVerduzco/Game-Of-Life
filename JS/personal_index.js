var tbody=document.createElement('tbody');



function generate_table(){
    var size = parseInt($('#size').val());
    //size=size+2;
    console.log(size); 
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
            tbody.childNodes[i].childNodes[j].setAttribute( "id", i+"-"+j);
            tbody.childNodes[i].childNodes[j].setAttribute("onclick","resurrect("+i+","+j+")");

         }
    }

    //hideTable(size);
    document.getElementById("generate").disabled = true;

}

/*function hideTable(size){
    tbody.childNodes[0].setAttribute("hidden", 'true');
    for (var i = 0; i <size ; i++) 
    { 
         
         for (var j = 0; j <size ; j++) {
             tbody.childNodes[i].childNodes[0].setAttribute("hidden", 'true');
             tbody.childNodes[i].childNodes[size-1].setAttribute("hidden", 'true');
             
         }
    }
    tbody.childNodes[size-1].setAttribute("hidden", 'true');

}*/

function resurrect(x,y){
    tbody.childNodes[x].childNodes[y].textContent="1";
    tbody.childNodes[x].childNodes[y].setAttribute( "class", "live" );
 //   console.log('Cordenadas'+x+','+y);
}


function play(){
    var size = $('#size').val();
    
    for(var i=0;i<size;i++)
    {
		for(var j=0;j<size;j++)
		{
            //var state = $("#"+i+"-"+j).attr('class');
            if(i==0 || j==0 ||i==size-1 || j==size-1){}
            else
            {
            
                //console.log(i,j);
                var limitDownI=0, limitDownJ=0, limitUpI=0, limitUpJ=0;     
                limitDownI = i+1;
                limitDownJ = j+1;
                limitUpI = i-1;
                limitUpJ = j-1;
                //console.log('limites abajo:'+limitDownI+','+limitDownJ);
                //console.log('limites arriba:'+limitUpI+','+limitUpJ);
                var stateCell2 = $("#"+i+"-"+j).attr('class');
                var auxSum=0;
                for(var x=limitUpI;x<=limitDownI;x++)
                {
                        for(var y=limitUpJ;y<=limitDownJ;y++)
                        {
                            var stateCell = $("#"+x+"-"+y).attr('class');
                            var valCel=parseInt(tbody.childNodes[x].childNodes[y].textContent);
                            auxSum = auxSum + valCel;         
                            //console.log('estado de la celda=='+stateCell+'==posicion===>'+x+','+y);
                        }
                }

                    console.log(auxSum);
                    conditionSum(auxSum,i,j);
            }
            
        }
   }

}

function conditionSum(auxSum,x, y ){

    auxSum-=parseInt(tbody.childNodes[x].childNodes[y].textContent);
    console.log(parseInt(tbody.childNodes[x].childNodes[y].textContent));
    if (auxSum == 2)
    {
    
    }
    else if (auxSum < 2)
    {
        if (parseInt(tbody.childNodes[x].childNodes[y].textContent)== 1) 
        {
            $("#"+x+"-"+y).html('0').removeClass('live'); 
        }
    }
    else if (auxSum > 3)
    {
        if (parseInt(tbody.childNodes[x].childNodes[y].textContent)== 1) 
        {
            $("#"+x+"-"+y).html('0').removeClass('live'); ; 
        }
    }
    else if (auxSum == 3)
    {                           
        if (parseInt(tbody.childNodes[x].childNodes[y].textContent)== 0) 
        {
            $("#"+x+"-"+y).html('1').removeClass('dead').addClass('live');
        }
    }
}



