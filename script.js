

document.getElementById('newSmall').onclick = function(){generateTable(20,20)};
document.getElementById('newLong').onclick = function(){generateTable(40,20)};
document.getElementById('newLarge').onclick = function(){generateTable(40,40)};

var currentCell;

function generateTable(x,y){
    var tables = (document.getElementsByTagName('table'));
    if(document.getElementsByTagName('table').length > 0){
        tables[0].parentElement.removeChild(tables[0]);
    }
    var container = document.getElementById('level');
    var table = document.createElement('table');
    table.id = "room" 
    table.classList = "table-bordered";
    container.appendChild(table);
    for(var i = 0; i < y; i++){
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for(var j = 0; j < x; j++){
            var td = document.createElement("td");
            tr.appendChild(td);
            var a = document.createElement("a");
            a.id = `${j},${i}`;
            td.appendChild(a);
            a.setAttribute("onclick",`openMenu(${j},${i})`);
        }
    }
}

function openMenu(x,y){
    var title = document.getElementById('card-title');
    currentCell = document.getElementById(`${x},${y}`);
    title.textContent = `Cell: ${x},${y}`;
    displayEntities();
    displayEnemies();
    displayEnvironments();
}

function clearList(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function displayEntities(){
    var list = document.getElementById('entityList');
    clearList(list);
    entities.map(function(entity) {
        var li = document.createElement("li");
        li.textContent = entity.name;
        li.id = entity.id;
        li.classList = li.id;
        li.setAttribute("onclick",`attachEntity(${entity.id})`);
        list.appendChild(li);        
    });
}

function displayEnemies(){
    var list = document.getElementById('enemyList');
    clearList(list);
    enemies.map(function(enemy) {
        var li = document.createElement("li");
        li.textContent = enemy.name;
        li.id = enemy.id;
        li.setAttribute("onclick",`attachEnemy(${enemy.id})`);
        list.appendChild(li);
    });
}

function displayEnvironments(){
    var list = document.getElementById('environmentList');
    clearList(list);
    environments.map(function(environment) {
        var li = document.createElement("li");
        li.textContent = environment.name;
        li.id = environment.id;
        li.setAttribute("onclick",`attachEnvironment(${environment.id})`);
        list.appendChild(li);
    });
}

function attachEntity(entityId) {
    removeAttributes();
    currentCell.setAttribute("entity", entityId);
}

function attachEnemy(enemyId){
    removeAttributes();
    currentCell.setAttribute("enemy",enemyId);
}

function attachEnvironment(environmentId){
    removeAttributes();
    currentCell.setAttribute("environment", environmentId);
}

function removeAttributes(){
    currentCell.removeAttribute("entity");
    currentCell.removeAttribute("enemy");
    currentCell.removeAttribute("environment");
}

function exportJson(){
    var table = document.getElementById('room');
    var rows = table.children;
    var x = table.firstElementChild.childElementCount;
    var y = table.childElementCount;
    console.log(`${x},${y}`);
    for(var row of rows){
        var cols = row.children;
        for(var col of cols){
            var cell = col.firstChild;
            var jsCell = {
                id: cell.id,
                entity: cell.getAttribute("entity"),
                enemy: cell.getAttribute("enemy"),
                environment: cell.getAttribute("environment"),
                rotation: cell.getAttribute("rotation")
            };
            jsonRoom.cells.push(jsCell);
            
        }
    }
    console.log(jsonRoom);
    downloadObjectAsJson(jsonRoom, "TEST");
        
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

//jsonRoom["cells"].filter(x => x.id == "5,1")

var entities = [
    {
        "name": "Speed Boost",
        "id": 0
    },
    {
        "name": "Firerate Boost",
        "id": 1
    }
]

var environments = [
    {
    "name":"cube",
    "id": 0
    },
    {
    "name":"rbCube",
    "id": 1
    }
]

var enemies = [
    {
        "name":"evilCube",
        "id" : 0
    }
]

var jsonRoom = {
    cells: []
};

