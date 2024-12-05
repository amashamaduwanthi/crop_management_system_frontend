
$("#dashboard-section").css({display: 'block'});
$("#field-section").css({display:'none'});
$("#crop-section").css({display:'none'});
$("#staff-section").css({display:'none'});
$("#vehicle-section").css({display:'none'});
$("#equipment-section").css({display:'none'});
$("#monitoring-section").css({display:'none'});

$('#nav-dashboard').on('click', () => {
    $('#dashboard-section').css({display: 'block'});
    $('#field-section').css({display: 'none'});
    $("#crop-section").css({display:'none'});
    $("#staff-section").css({display:'none'});
    $("#vehicle-section").css({display:'none'});
    $("#equipment-section").css({display:'none'});
    $("#monitoring-section").css({display:'none'});
})

$('#nav-field').on('click', () => {
    $('#field-section').css({display: 'block'});
    $('#dashboard-section').css({display: 'none'});
    $("#staff-section").css({display:'none'});
    $("#crop-section").css({display:'none'});
    $("#vehicle-section").css({display:'none'});
    $("#equipment-section").css({display:'none'});
    $("#monitoring-section").css({display:'none'});
})
$('#nav-crop').on('click', () => {
    $('#crop-section').css({display: 'block'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $("#staff-section").css({display:'none'});
    $("#vehicle-section").css({display:'none'});
    $("#equipment-section").css({display:'none'});
    $("#monitoring-section").css({display:'none'});
})
$('#nav-staff').on('click', () => {
    $("#staff-section").css({display:'block'});
    $('#crop-section').css({display: 'none'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $("#vehicle-section").css({display:'none'});
    $("#equipment-section").css({display:'none'});
    $("#monitoring-section").css({display:'none'});

})
$('#nav-vehicle').on('click', () => {
    $("#vehicle-section").css({display:'block'});
    $("#staff-section").css({display:'none'});
    $('#crop-section').css({display: 'none'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $("#equipment-section").css({display:'none'});
    $("#monitoring-section").css({display:'none'});
});

$('#nav-equipment').on('click', () => {
    $("#equipment-section").css({display:'block'});
    $("#vehicle-section").css({display:'none'});
    $("#staff-section").css({display:'none'});
    $('#crop-section').css({display: 'none'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $("#monitoring-section").css({display:'none'});
});

$('#nav-monitoring-log').on('click', () => {
    $("#equipment-section").css({display:'none'});
    $("#vehicle-section").css({display:'none'});
    $("#staff-section").css({display:'none'});
    $('#crop-section').css({display: 'none'});
    $('#dashboard-section').css({display: 'none'});
    $('#field-section').css({display: 'none'});
    $("#monitoring-section").css({display:'block'});
});
function togglePanel(button) {
    const panelContent = button.nextElementSibling;
    if (panelContent.style.display === "block") {
        panelContent.style.display = "none";
        button.textContent = "Show Details";
    } else {
        panelContent.style.display = "block";
        button.textContent = "Hide Details";
    }
}



