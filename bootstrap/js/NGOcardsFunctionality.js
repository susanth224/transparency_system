    var prevRowId='',prevPID = 0,prevColWidth='';
  var TIME_MILLI_SECONDS = 800,flag=-1;
  function setColWidth(colWidth){
    prevColWidth=colWidth;
  }
  function slidingDiv(divId,proposalId){
    if(divId === prevRowId ){
      if(prevPID === proposalId){
        $("#"+divId).slideUp(TIME_MILLI_SECONDS);
        console.log("collapse");
        $("#"+proposalId).removeClass("is-expanded").addClass("is-collapsed");
        prevPID = -1;
        flag=0;
        return;
      }
      else{
        console.log("prevPID",prevPID);
        $("#"+prevPID).removeClass("is-expanded").addClass("is-collapsed");
        $("#"+divId).slideDown(TIME_MILLI_SECONDS);
        console.log("expand");        
        $("#"+proposalId).removeClass("is-collapsed").addClass("is-expanded");
        flag=1;       
      }
    }
    else{
      $('[id^=up_]').slideUp(TIME_MILLI_SECONDS);
      $("#"+divId).slideDown(TIME_MILLI_SECONDS);
      $("#"+proposalId).removeClass("is-collapsed").addClass("is-expanded");  
      if(prevPID!=0) {
        $("#"+prevPID).removeClass("is-expanded").addClass("is-collapsed");
      }
      console.log("prevPIDD == >",prevPID);
      flag=1;       
    }
        prevRowId = divId;
        prevPID = proposalId;
      }