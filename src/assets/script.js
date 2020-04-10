// function initMenu() {
//   $('#menu ul').hide();
//   $('#menu ul').children('.current').parent().show();
//   //$('#menu ul:first').show();
//   $('#menu li a').click(
//     function() {
//       const checkElement = $(this).next();
//       if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
//         checkElement.slideUp('fast');
//         return false;
//       }
//       if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
//         $('#menu ul:visible').slideUp('fast');
//         checkElement.slideDown('fast');
//         return false;
//       }
//     }
//   );
// }
// $(document).ready(function() {
//   initMenu();
// });
function InitialiseDataTable(tableName, columnsToBeSorted) {
  $('#' + tableName).DataTable(columnsToBeSorted);
}
function InitialiseAddClientTypeDataTable(tableName) {
  $('#' + tableName).DataTable({
    "columns": [
      {"name": "Name", "orderable": true},
      {"name": "Code", "orderable": true},
      {"name": "Description", "orderable": false},
      {"name": "Status", "orderable": false},
      {"name": "Actions", "orderable": false}
    ]
  });
}
function hideBootStrapModal(modalId) {
  $('#'+ modalId).modal('hide');
}
function destroyDataTable(tableName) {
  $('#' + tableName).dataTable().fnDestroy();
}
function initialiseMultipleSelectBox(selectBoxId) {
  $('#' + selectBoxId).selectpicker();
}
function selectOptionsMultipleSelectBox(selectBoxId, data) {
  console.log('selectBoxId, data', selectBoxId, data);
  $('#' + selectBoxId).selectpicker(data);
}
