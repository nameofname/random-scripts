var table = jQuery('<table>'); 

jQuery('input').each(function(){
    var tr = jQuery('<tr>'); 
    var name = jQuery(this).attr('name'); 
    var td1 = jQuery('<td>').html(name); 
    var value = jQuery(this).attr('value'); 
    var td2 = jQuery('<td>').html(value); 
    var type = jQuery(this).attr('type'); 
    var td3 = jQuery('<td>').html(type); 
    jQuery(tr).append(td1, td2, td3); 
    jQuery(table).append(tr); 
    console.log(jQuery(this)); 
    console.log(jQuery(this).attr('name')); 
});
