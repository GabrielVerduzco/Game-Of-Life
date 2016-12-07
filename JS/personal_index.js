var tbody=document.createElement('tbody');
function generate_table(){
    var size = parseInt($('#size').val());
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
    document.getElementById("generate").disabled = true;
}


function resurrect(x,y){
    tbody.childNodes[x].childNodes[y].textContent="1";
    tbody.childNodes[x].childNodes[y].setAttribute( "class", "live" );
}


function play(){
    var size = $('#size').val();
    var cells = [];
    for(var i=0;i<size;i++)
    {
         cells[i] = [];
		for(var j=0;j<size;j++)
		{

            
            if(i==0 || j==0 ||i==size-1 || j==size-1){}
            else
            {
                var limitDownI=0, limitDownJ=0, limitUpI=0, limitUpJ=0;     
                limitDownI = i+1;
                limitDownJ = j+1;
                limitUpI = i-1;
                limitUpJ = j-1;
                var stateCell2 = $("#"+i+"-"+j).attr('class');
                var auxSum=0;
                for(var x=limitUpI;x<=limitDownI;x++)
                {
                        for(var y=limitUpJ;y<=limitDownJ;y++)
                        {
                            var stateCell = $("#"+x+"-"+y).attr('class');
                            var valCel=parseInt(tbody.childNodes[x].childNodes[y].textContent);
                            auxSum = auxSum + valCel;         
                        }
                }
                auxSum-=parseInt(tbody.childNodes[i].childNodes[j].textContent);
                cells[i][j]=auxSum;
            }
            
        }
   }

    conditionSum(cells, size);

}

function conditionSum(cells, size){
    for(var i=0;i<size;i++)
    {
	    for(var j=0;j<size;j++)
        {
       
        if (cells[i][j] < 2)
        {
            if (parseInt(tbody.childNodes[i].childNodes[j].textContent)== 1) 
                {
                    $("#"+i+"-"+j).html('0').removeClass('live'); 
                   
                }
        }
        else if (cells[i][j]  > 3)
        {
            if (parseInt(tbody.childNodes[i].childNodes[j].textContent)== 1) 
            {
                $("#"+i+"-"+j).html('0').removeClass('live');
                 
            }
        }
        else if (cells[i][j] == 3)
        {                           
            if (parseInt(tbody.childNodes[i].childNodes[j].textContent)== 0) 
            {
                $("#"+i+"-"+j).html('1').removeClass('dead').addClass('live');
                
            }
         }

        }
    }

}





