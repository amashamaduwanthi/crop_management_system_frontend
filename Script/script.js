
$("#dashboard-section").css({display: 'block'});
$("#field-section").css({display:'none'});
$("#crop-section").css({display:'none'});

$('#nav-dashboard').on('click', () => {
    $('#dashboard-section').css({display: 'block'});
    $('#field-section').css({display: 'none'});
    $("#crop-section").css({display:'none'});
})

$('#nav-field').on('click', () => {
    $('#field-section').css({display: 'block'});
    $('#dashboard-section').css({display: 'none'});
})
$('#nav-crop').on('click', () => {
    $('#crop-section').css({display: 'block'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
})