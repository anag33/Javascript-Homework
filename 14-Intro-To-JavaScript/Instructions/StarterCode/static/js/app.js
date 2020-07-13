// find global variable -data read in
var tableData = data;

// Initiate page load
$(document).ready(function() {
    //init load
    stFilter();
    cntryFilter();
    shpFilter();
    buildTable();


    // Event Listeners
    $('#filter-btn').on("click", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#form').on("submit", function(event) {
        event.preventDefault();
        buildTable();
    });
    $('#stFilter, #cntryFilter, #shpFilter').on("change", function(event) {
        event.preventDefault();
        buildTable();
    });

});

// Create Dynamic Filters
function stFilter() {
    var states = [...new Set(tableData.map(x => x.state))];
    states.sort();

    states.forEach(function(state) {
        let Selec = `<option>${state}</option>`
        $('#stFilter').append(Selec);
    });
}

function cntryFilter() {
    var countries = [...new Set(tableData.map(x => x.country))];
    countries.sort();

    countries.forEach(function(country) {
        let Selec = `<option>${country}</option>`
        $('#cntryFilter').append(Selec);
    });
}

function shpFilter() {
    var shapes = [...new Set(tableData.map(x => x.shape))];
    shapes.sort();

    shapes.forEach(function(shape) {
        let Selec = `<option>${shape}</option>`
        $('#shpFilter').append(Selec);
    });
}

function buildTable() {
    //get filters
    var inputValue = $('#datetime').val();
    var stFilter = $('#stFilter').val();
    var cntryFilter = $('#cntryFilter').val();
    var shpFilter = $('#shpFilter').val();

    //Use the form input to fileter the data
    var sub_data = tableData;
    if (inputValue !== "") {
        sub_data = tableData.filter(x => Date.parse(x.datetime) === Date.parse(inputValue));
    }

    if (stFilter != "All") {
        sub_data = sub_data.filter(x => x.state === stFilter);
    }

    if (cntryFilter != "All") {
        sub_data = sub_data.filter(x => x.country === cntryFilter);
    }

    if (shpFilter != "All") {
        sub_data = sub_data.filter(x => x.shape === shpFilter);
    }

    //Build Table 
    $('#ufo-table').DataTable().clear().destroy(); //clear datatable
    $('#ufo-table tbody').empty();
    sub_data.forEach(function(thing) {
        let row = "<tr>"
        Object.entries(thing).forEach(function([key, value]) {
            row += `<td>${value}</td>`;
        });
        row += "</tr>";
        $('#ufo-table tbody').append(row);
    });
    $('#ufo-table').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copyHtml5',
                'csvHtml5',
            ]
        }) //rebuild it

}