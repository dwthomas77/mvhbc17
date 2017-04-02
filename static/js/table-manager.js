// DATA LOAD
//
// process submissions into Style objects
processSubmissions();
// process styles into Category objects
processStyles();
// process tables
processTables();


// only for table manager
if(window.location.pathname.indexOf('table-manager') !== -1){
    // Load the Visualization API and the piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(initPage);
}
// only for view judges
if(window.location.pathname.indexOf('view-judges') !== -1){
    //process submission totals
    judgeSubmissionTotals();
    stewardSubmissionTotals();
    printViewJudges();
}
// only for view brewers
if(window.location.pathname.indexOf('view-brewers') !== -1){
    //process submission totals
    //processBrewers();
    //printBrewers();
}

// process brewers
function processBrewers(){
    var brewer = {};
    _.forEach(submissions, function(s){
        //find the matching brewer
        brewer = _.findWhere(brewers, {'id': s.brewerId});
        if(brewer){
            brewer.submissions.push(s.competition_id);
        }
    });
}

function printBrewers(){
    var str = '', address= '';
    _.forEach(brewers, function(b){
        address = b.street1;
        if(b.street2){
            address += '<br>' + b.street2;
        }
        address += '<br>' + b.city + ', ' + b.state + ' ' + b.zipcode;
        str += '<tr><td>'+b.name+'</td><td>'+address+'</td><td>'+b.email+'</td><td>'+b.submissions+'</td></tr>';
    });

            $('.js-brewers-table').append(str);
}

// process submission totals for judges and stewards
function judgeSubmissionTotals(){

    var totalSubmissions = 0
        curTable = {};

    _.forEach(judges, function(judge){

        totalSubmissions = 0;

        // AM Session

        // find table
        curTable = _.findWhere(tables, {id:judge.tableAM});

        if(curTable){
           // calculate total submissions when table is drawn
            _.forEach(curTable.savedCategories, function(cat){
                judge.catAM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
            _.forEach(curTable.unsavedCategories, function(cat){
                judge.catAM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
        }

        judge.amTotalSubmissions = totalSubmissions;

        totalSubmissions = 0;

        // PM Session

        // find table
        curTable = _.findWhere(tables, {id:judge.tablePM});

        if(curTable){
           // calculate total submissions when table is drawn
            _.forEach(curTable.savedCategories, function(cat){
                judge.catPM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
            _.forEach(curTable.unsavedCategories, function(cat){
                judge.catPM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
        }

        judge.pmTotalSubmissions = totalSubmissions;


    });
}

// process submission totals for judges and stewards
function stewardSubmissionTotals(){

    var totalSubmissions = 0
        curTable = {};

    _.forEach(stewards, function(judge){

        totalSubmissions = 0;

        // AM Session

        // find table
        curTable = _.findWhere(tables, {id:judge.tableAM});

        if(curTable){
           // calculate total submissions when table is drawn
            _.forEach(curTable.savedCategories, function(cat){
                judge.catAM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
            _.forEach(curTable.unsavedCategories, function(cat){
                judge.catAM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
        }

        judge.amTotalSubmissions = totalSubmissions;

        totalSubmissions = 0;

        // PM Session

        // find table
        curTable = _.findWhere(tables, {id:judge.tablePM});

        if(curTable){
           // calculate total submissions when table is drawn
            _.forEach(curTable.savedCategories, function(cat){
                judge.catPM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
            _.forEach(curTable.unsavedCategories, function(cat){
                judge.catPM.push(cat);
                _.forEach(cat.styles, function(style){
                    totalSubmissions += style.submissions.length;
                })
            })
        }

        judge.pmTotalSubmissions = totalSubmissions;


    });
}

// View Judges
function printViewJudges(){
    var compiled = _.template($('#view-judges-tmpl').html());
    $('.js-view-judges-container').append(compiled({ 'judges': judges }));
    compiled = _.template($('#view-stewards-tmpl').html());
    $('.js-view-stewards-container').append(compiled());
}

// Once Google API is ready print content to the page
function initPage() {
    $(document).ready(function(){
        var curTable;
        // print functions
        printCategories();
        // set current table
        if(!localStorage.getItem('curTable')){
            curTable = 'Table 1';
        }else{
            curTable = localStorage.getItem('curTable');
        }
        printTablePane(_.findWhere(tables, {'name': curTable}));
        printTables();
    });
}

// Switch Table Session
function switchTableEventHandler(e){
    var val;
    // get the table id
    val = $('#table-pane1').data('id');
    // update form fields
    $('#switchTableId').val(val);
    $('#switch-table').submit();
}

// Add a judge to a table
function changeJudgeEventHandler(e){
    var val;
    // get the target value
    val = $(e.target).val();
    if(val){
        $('.js-add-judge').attr('disabled', false);
    }else{
        $('.js-add-judge').attr('disabled', true);
    }
}

// Add a judge to a table
function changeStewardEventHandler(e){
    var val;
    // get the target value
    val = $(e.target).val();
    if(val){
        $('.js-add-steward').attr('disabled', false);
    }else{
        $('.js-add-steward').attr('disabled', true);
    }
}

// add the judge
function addJudgeEventHandler(e){
    var judgeVal, tableId;
    judgeVal = $('.js-add-judge-select').val();
    // get current table id
    tableId = $('#table-pane1').data('id');
    // update form fields
    $('#form-judgeAdd').val(judgeVal);
    $('#form-tableAddJudge').val(tableId);
    $('#add-judge').submit();
}

// add the steward
function addStewardEventHandler(e){
    var stewardVal, tableId;
    stewardVal = $('.js-add-steward-select').val();
    // get current table id
    tableId = $('#table-pane1').data('id');
    // update form fields
    $('#form-stewardAdd').val(stewardVal);
    $('#form-tableAddSteward').val(tableId);
    $('#add-steward').submit();
}

// remove the judge
function removeJudgeEventHandler(e){
    var judgeId, tableId;
    // judge id
    judgeId = $(e.target).closest('button').data('id');
    // get current table id
    tableId = $('#table-pane1').data('id');
    // update form fields
    $('#form-judgeRemove').val(judgeId);
    $('#form-tableRemoveJudge').val(tableId);
    $('#remove-judge').submit();
}

// remove the steward
function removeStewardEventHandler(e){
    var stewardId, tableId;
    // steward id
    stewardId = $(e.target).closest('button').data('id');
    // get current table id
    tableId = $('#table-pane1').data('id');
    // update form fields
    $('#form-stewardRemove').val(stewardId);
    $('#form-tableRemoveSteward').val(tableId);
    $('#remove-steward').submit();
}

// save Category's Styles association to Table in the Database
function lockCategoryEventHandler(e){
    var tableId, catName;
    // get current table id
    tableId = $('#table-pane1').data('id');
    $('#form-tableId').val(tableId);
    // get category name
    catName = $(e.target).closest('button').data('name');
    $('#form-categoryName').val(catName);
    $('#category-lock').submit();

}

// remove Category's Styles association to Table in the Database
function unlockCategoryEventHandler(e){
    var tableId, catName;
    // get current table id
    tableId = $('#table-pane1').data('id');
    $('#form-tableIdB').val(tableId);
    // get category name
    catName = $(e.target).closest('button').data('name');
    $('#form-categoryNameB').val(catName);
    $('#category-unlock').submit();
}

// removed unsaved category from table locally
function removeCategoryClickHandler(e){
    var categoryName = '',
        category = {},
        tableName = '',
        table = {};
    // find category name
    categoryName = $(e.target).closest('button').data('name');
    // find category object
    category = _.findWhere(categories, {'name': categoryName});
    if(category){
        // remove table from category object
        category.table = null;
        // find table object
        table = _.findWhere(tables, {'id': $('#table-pane1').data('id') + ''});
        // remove category from table object
        table.unsavedCategories = _.reject(table.unsavedCategories, function(tableCategory){
            return category.name === tableCategory.name;
        });
         // reload the table pane
        printTablePane(table);
        // print the categories
        printCategories();

    }else {
        console.log("ERROR: Category not found");
    }


}

// add category to table locally
function addCategoryClickHandler(e){
    var categoryId, category, tableId, table;
    // get category id
    categoryId = $(e.target).closest('.list-group-item').data('name');
    // get category
    category = _.findWhere(categories, {'name': categoryId});
    // get active table id
    tableId = $('#table-pane1').data('id');
    // get table obj
    table = _.findWhere(tables, {'id':tableId+''});
    // add category to unsaved categorys list
    table.unsavedCategories.push(category);
    // set category table
    category.table = table.name;
    // reload the table pane
    printTablePane(table);
    // print the categories
    printCategories();
}

// load new table pane
function tableListClickHandler(e){
    // find id of table clicked
    var tableId = $(e.target).closest('.table-item').data('id');
    printTablePane(_.findWhere(tables, {'id':tableId+''}));

}


function processSubmissions(){
    var regex, styleObj, matchingJudge;
    // for each submission
    _.forEach(submissions, function(submission){
        // find the submission's style
        styleObj = _.find(styles, function(style){
            regex = new RegExp("^" + style.style_id);
            return regex.test(submission.style);
        });
        if(styleObj){
            styleObj.submissions.push(submission.id)
        }
        // update judges array for valid submissions
        matchingJudge = _.findWhere(judges, {'id': submission.brewerId});
        if(matchingJudge){
            // add style pk to matching judge if it doesn't exist already
            if(!_.includes(matchingJudge.restrictedStyles, styleObj.id)){
                matchingJudge.restrictedStyles.push(styleObj.id);
            }
        }
    });
}

function processStyles(){
    var uCats, tCat, curStyles, totalSubmissions, savedTable, table;
    // build array or unique categories
    uCats = _.pluck(styles, 'category');
    uCats = _.uniq(uCats);
    _.forEach(uCats, function(category) {
        totalSubmissions = 0;
        savedTable = null;
        table = null;
        // get a list of all styles that match the category
        curStyles = _.filter(styles, function(style) {
            return style.category === category
        });
        // calculate total submissions for this category
        _.forEach(curStyles, function(style) {
            totalSubmissions += style.submissions.length;
        });
        // check if category has styles saved to a table
        if(_.some(curStyles, 'table')){
            // assign saved table for this category
            savedTable = curStyles[0].table;
            // find corresponsing table object
            table = _.findWhere(tables, {'name': savedTable});
        }
        // push finalized category into arrays
        tCat = {
            'name': category,
            'styles': curStyles,
            'totalSubmissions': totalSubmissions,
            'table': null,
            'savedtable': savedTable
        };
        categories.push(tCat);
        if(table){
            table.savedCategories.push(tCat);
        }
    });

}

function processTables(){
    var judge = {};
    // assign tables to judges
    _.forEach(tables, function(table){
        _.forEach(table.judges, function(id){
            // find judge object
            judge = _.findWhere(judges, {'id':id+''});
            if(judge){
                if(table.session === 'AM'){
                    judge.tableAM = table.id;
                }else if(table.session === 'PM'){
                    judge.tablePM = table.id;
                }
            }
        });
        _.forEach(table.stewards, function(id){
            // find judge object
            judge = _.findWhere(stewards, {'id':id+''});
            if(judge){
                if(table.session === 'AM'){
                    judge.tableAM = table.id;
                }else if(table.session === 'PM'){
                    judge.tablePM = table.id;
                }
            }
        });
    });
}

function printCategories(){
    $('.js-style-container').html('');
    var compiled = _.template($('#category-list').html());
    $('.js-style-container').append(compiled());
    // event handlers
    $('.js-add-style').on('click', addCategoryClickHandler);
    $('.js-remove-category').click(removeCategoryClickHandler);
}

function printTables(){
    var totalSubmissions = 0;
    _.forEach(tables, function(table){
        totalSubmissions = 0;
        // calculate total submissions when table is drawn
        _.forEach(table.savedCategories, function(cat){
            _.forEach(cat.styles, function(style){
                totalSubmissions += style.submissions.length;
            })
        })
        _.forEach(table.unsavedCategories, function(cat){
            _.forEach(cat.styles, function(style){
                totalSubmissions += style.submissions.length;
            })
        })
        table.totalSubmissions = totalSubmissions;
    });

    var compiled = _.template($('#table-list').html());
    $('.js-table-scroller').append(compiled({ 'tables': tables }));
    // event handlers
    $('.table-item').on('click', tableListClickHandler);
}

function printTablePane(table){
    var totalSubmissions = 0;
    var $container = $('.js-pane-container');
    var thisJudge = {};

    localStorage.setItem('curTable', table.name);

    table = table || tables[0];

    // calculate total submissions when table is drawn
    _.forEach(table.savedCategories, function(cat){
        _.forEach(cat.styles, function(style){
            totalSubmissions += style.submissions.length;
        })
    })
    _.forEach(table.unsavedCategories, function(cat){
        _.forEach(cat.styles, function(style){
            totalSubmissions += style.submissions.length;
        })
    })
    table.totalSubmissions = totalSubmissions;

    // put list of available judges together
    table.availableJudges = judges;

    // put list of available stewards togther
    table.availableStewards = stewards;

    // start with clean array for restricted styles
    table.restrictedStyles = [];
    table.displayJudges = [];
    table.displayStewards = [];

    // restricted styles for judges
    _.forEach(table.savedCategories.concat(table.unsavedCategories), function(obj) {
        table.restrictedStyles = table.restrictedStyles.concat(obj.styles);
    });

    // pluck only style ids
    table.restrictedStyles = _.pluck(table.restrictedStyles, 'id');

    // populate assigned judge objects
    _.forEach(table.judges, function(judge){
        thisJudge = _.findWhere(judges, {'id': judge+''});
        // check if judge is on session already
        thisJudge.inSession = table.session === 'AM' ? !!thisJudge.tableAM : !!thisJudge.tablePM;
        if(thisJudge){
            table.displayJudges.push(thisJudge);
        }else{
            console.log("WTF");
        }
    });

    // populate assigned steward objects
    _.forEach(table.stewards, function(steward){
        thisSteward = _.findWhere(stewards, {'id': steward+''});
        // check if judge is on session already
        thisSteward.inSession = table.session === 'AM' ? !!thisSteward.tableAM : !!thisSteward.tablePM;
        if(thisSteward){
            table.displayStewards.push(thisSteward);
        }else{
            console.log("WTF");
        }
    });


    // clear container before printing table
    $container.html('');
    var compiled = _.template($('#table-pane-container').html());
    $container.append(compiled({'table':table}));

    drawTableChart(table);

    // initialize tooltips
    //$('[data-toggle="tooltip"]').tooltip();

    // event handlers
    $('.js-lock-category').click(lockCategoryEventHandler);
    $('.js-unlock-category').click(unlockCategoryEventHandler);
    $('.js-add-judge').click(addJudgeEventHandler);
    $('.js-add-judge-select').change(changeJudgeEventHandler);
    $('.js-remove-judge').click(removeJudgeEventHandler);
    $('.js-switch-sessions').click(switchTableEventHandler);
    $('.js-add-steward-select').change(changeStewardEventHandler);
    $('.js-add-steward').click(addStewardEventHandler);
    $('.js-remove-steward').click(removeStewardEventHandler);
}

function drawTableChart(table){

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Entries');
    var rows = [];
    _.forEach(table.savedCategories, function(category){
        rows.push([category.name, category.totalSubmissions]);
    });
    _.forEach(table.unsavedCategories, function(category){
        rows.push([category.name, category.totalSubmissions]);
    });

    data.addRows(rows);

    // Set chart options
    var options = {'title':'Table 1 Styles'};

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.PieChart(document.getElementById('style-pie-chart'));
    chart.draw(data, options);

}
