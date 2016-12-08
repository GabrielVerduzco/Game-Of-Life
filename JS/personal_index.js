var timeoutID;
var tbody=document.createElement('tbody');
var timerId;
var to

function timer(){
     timerId= setInterval(function(){ play();}, 3000);
}

function stop(){
     clearInterval(timerId);
}


function generate_table(){
    var size = parseInt($('#size').val());
    size = size +2;
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
    document.getElementById("generate");
    document.getElementById("size");
    document.getElementById("generate").disabled = true;
    document.getElementById("size").disabled = true;
    hideTable(size);
    
}

function hideTable(size){
     
     for (var i = 0; i <size ; i++) 
     { 
          
          for (var j = 0; j <size ; j++) {
              
              tbody.childNodes[i].childNodes[0].setAttribute("class", 'border');
              $("#"+i+"-"+'0').removeClass('dead');
              tbody.childNodes[j].childNodes[size-1].setAttribute("class", 'border');
               $("#"+j+"-"+size-1).removeClass('dead');
              
              
          }
     }
     tbody.childNodes[0].setAttribute("class", 'border');
     $().removeClass('dead');
     tbody.childNodes[size-1].setAttribute("class", 'border');
     $().removeClass('dead');
     
   
     
 
 }


function resurrect(x,y){
 
    if  (tbody.childNodes[x].childNodes[y].textContent=="0" && tbody.childNodes[x].childNodes[y].classList.contains('dead')) 
    {
        
        tbody.childNodes[x].childNodes[y].textContent="1";
        tbody.childNodes[x].childNodes[y].setAttribute( "class", "live" );
    } 
    else 
    {
        $("#"+x+"-"+y).html('0').removeClass('live').addClass('dead');
    }
    
}

function play(){
    
    var size = $('#size').val();
    var cells = [];
    var limitDownI=0, limitDownJ=0, limitUpI=0, limitUpJ=0; 
    for(var i=0;i<size;i++)
    {
         cells[i] = [];
		for(var j=0;j<size;j++)
		{            
            if(i==0 || j==0 ||i==size-1 || j==size-1){
                
            }
            else
            {
                limitDownI = i+1;
                limitDownJ = j+1;
                limitUpI = i-1;
                limitUpJ = j-1;  
                
            }
          
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





