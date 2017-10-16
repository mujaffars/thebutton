var messages = [
    {txt: "", func: ''},
    {txt: "Hello, user", func: ''},
    {txt: "There is no game, Don't waste your time", func: ''},
    {txt: "Don't press that button again", func: ''},
    {txt: "You pressed it again", func: ''},
    {txt: "Don't press", func: ''},
    {txt: "Stop it ...", func: ''},
    {txt: "You don't know English?", func: ''},
    {txt: "Ok Then", func: ''},
    {txt: "不要按下按钮", func: ''},
    {txt: "You are such an stubborn", func: ''},
    {txt: "Ok fine, Keep pressing", func: ''},
    {txt: "1", func: ''},
    {txt: "2", func: ''},
    {txt: "3", func: ''},
    {txt: "4", func: ''},
    {txt: "5", func: ''},
    {txt: "Six", func: ''},
    {txt: "Seven", func: ''},
    {txt: "I can go till infinite", func: ''},
    {txt: "9", func: ''},
    {txt: "10", func: ''},
    {txt: "OK, I am tired ...", func: ''},
    {txt: "Don't press it again, I want to have some rest", func: ''},
    {txt: "Don't you think instructing all you is tedious job? Even though you are not listening to me", func: ''},
    {txt: "Don't you have anything else to do", func: ''},
    {txt: "You have pressed 24 times, Your finger might swollen. I am worried about you", func: ''},
    {txt: "You might have done anything else which will be productive", func: ''},
    {txt: "Ok let's make a promise", func: ''},
    {txt: "I will give you a Gift, Then you will leave me alone", func: ''},
    {txt: "Here is your Gift, Touch on it to Open", func: 'gift1'},
    {txt: "Ahaa! A brand new bicycle", func: ''},
    {txt: "Did you like the gift?", func: ''},
    {txt: "Did you like the gift?", func: ''},
]

var giftMsg = [
    {txt: "", func: ''},
    {txt: "Touch the Gift to open", func: ''},
    {txt: "Open the gift first for next message", func: ''},
    {txt: "Are you awake? Did you understand what I say? Touch the Gift to open", func: ''}
]

function createDb() {
    dbShell = window.openDatabase("dbbtn43", 2, "dbbtn1", 1000000);
    //run transaction to create initial tables
    dbShell.transaction(setupTable, dbErrorHandler);
}

//I just create our initial table - all one of em
function setupTable(tx) {
//    dbShell.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS setting(id INTEGER PRIMARY KEY, theme, msg_id, appVersion)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS levels(id INTEGER PRIMARY KEY, completed INTEGER, locked INTEGER)");
    tx.executeSql("CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY, text, func, complete)");

    createSetting();

//    }, dbErrorHandler);

}

function createSetting() {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT id, theme FROM setting WHERE id = ?", [1], function (tx, results) {
            if (results.rows.length == 0) {
                dbShell.transaction(function (tx) {
                    tx.executeSql("INSERT INTO setting(id,theme,msg_id) values(?,?,?)", [1, 'basic', 0]);
                }, dbErrorHandler);
                for (i = 1; i < messages.length; i++) {
                    tx.executeSql("INSERT INTO messages(id,text,func,complete) values(?,?,?,?)", [i, messages[i].txt, messages[i].func, 0]);
                }
            } else {
                // Check wheter necessary columns present
                // checkColumns();
//                tx.executeSql("SELECT count(id) As rowCount FROM levels", [], function (tx, res) {
//                    if (res.rows[0].rowCount < puzzle.length) {
//                        for (i = eval(res.rows[0].rowCount + 1); i < puzzle.length; i++) {
//                            var locked = 1;
//                            var ionly = 0;
//                            if (puzzle[i].initials_only !== undefined) {
//                                ionly = 1;
//                            }
//                            tx.executeSql("INSERT INTO levels(id,completed,answer,alphabts,locked,shown_full,for_date, only_initials) values(?,?,?,?,?,?,?,?)", [i, 0, puzzle[i].answer, puzzle[i].alphabts, locked, 'false', 'N/A', ionly]);
//                        }
//                    }
//                })

            }
        })
    }, dbErrorHandler);
}

function getProfileDtl(callback) {
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT * FROM setting WHERE id = ?", [1], function (tx, res) {
            var result = res.rows[0];
            callback(result);
            return;
        });
    }, dbErrorHandler);
}

// Update Current msg id in profile 
function updateMsgId(msgId) {
    dbShell.transaction(function (tx) {
        tx.executeSql("UPDATE setting SET msg_id = ? WHERE id = ?", [msgId, 1], function (tx, res) {
            return 'done';
        });
    }, dbErrorHandler);
}

function getMessageDtl(msgId, callback) {
    console.log(msgId);
    dbShell.transaction(function (tx) {
        tx.executeSql("SELECT * FROM messages WHERE id = ?", [msgId], function (tx, res) {
            var result = res.rows[0];
            callback(result);
            return;
        });
    }, dbErrorHandler);
}

function dbErrorHandler(err) {
    console.log("DB Error: " + err.message + "\nCode=" + err.code);
}