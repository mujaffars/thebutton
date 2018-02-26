var dbShell;
var btnActive = true;

(function () {
    changeCss('body', 'font-size:' + fontSize + 'px;');
    changeCss('.btn-circle', 'height:' + btnchw + 'px; width:' + btnchw + 'px;');
    changeCss('#divMessageParent', 'height:' + eval(screenHeight * 25 / 100) + 'px;');
    changeCss('#divContent', 'height:' + eval(screenHeight * 50 / 100) + 'px;');
    changeCss('.fa', 'font-size:' + eval(screenHeight * 35 / 100) + 'px;');
    changeCss('.navbar-brand', 'font-size:' + eval(fontSize / 2) + 'px;');
    changeCss('#divCallRecords', 'font-size:' + recordFontSize + 'px;');
    changeCss('label.error', 'font-size:' + eval(fontSize / 1.5) + 'px;');
    changeCss('.imgLoader', 'height:' + eval(fontSize / 2) + 'px;');
    changeCss('#GridView1, #sltUsers', 'font-size:' + eval(fontSize / 2.2) + 'px;');

    getSetLocalstorage('msgid', '', 'define')
    
    $('body').css({
        height: $(window).height(),
        width: parseInt($(window).height()) * 56.25 / 100
    })
    
    createDb();

    $(".btn-circle").click(function () {
        if (btnActive) {
            getProfileDtl(proDtlForNextMsg);
            btnActive = false;
            setTimeout(function () {
                btnActive = true;
            }, 10)
        }
    })

})();

function proDtlForNextMsg(respData) {
    //console.log(log);
    var nextMsgId = eval(parseInt(respData.msg_id) + 1);
    getMessageDtl(nextMsgId, showMessage);
}

function showMessage(respData) { 
    // If func is defined trigger it
    if (respData.func !== "") {
        window[respData.func](respData);
    } else {
        $('#divMessage').html(respData.txt);
        updateMsgId(respData.id);
    }
}

function gift1(respData) {
    // Check if the counter field present
    var funCnt = $("#divContent").find("#txtFunCnt").val();
    if (funCnt === undefined) {
        $('#divMessage').html(respData.text);
        $('#divContent').html('<i class="fa fa-gift" aria-hidden="true"></i>');
        $('#divContent').append("<input type='hidden' id='txtFunCnt' value='1'/>");

        $(".fa-gift").click(function () {
            $('#divContent').html('<i class="fa fa-bicycle" aria-hidden="true"></i>');
            getProfileDtl(updateMsgId2);
        })
        funCnt = 1;
    }
    console.log(funCnt);
    console.log(giftMsg[funCnt]);
    $('#divMessage').html(giftMsg[funCnt].txt);    
    $('#divContent').find("#txtFunCnt").val(eval(parseInt(funCnt) + 1));
}

function removegift1(){
    $('#divContent').find('.fa-bicycle').fadeOut('slow');
}

function updateMsgId2(respData){
    updateMsgId(eval(parseInt(respData.msg_id) + 1));
    getProfileDtl(proDtlForNextMsg);
}

function giftLike(respData) {
    // Check if the counter field present
    var funCnt = $("#divContent").find("txtFunCnt").val();
    if (funCnt === undefined) {
        $('#divMessage').html(respData.text);
        $('#divContent').append("<div><input type='button' id='btnGiftLike' class='btn btn-info' value='Like'/>&nbsp;<input type='button' id='btnGiftDislike' class='btn btn-error' value='Like'/></div>");
   
        $("#btnGiftLike").click(function () {
            $('#divContent').html('You');
        })
        funCnt = 1;
    }
    $('#divMessage').html(giftMsg[funCnt].text);
    $('#divContent').find("#txtFunCnt").val(eval(funCnt + 1));
}

function onLoad() {
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
}

function initApp() {
}

$(function () {

});

function changeCss(className, classValue) {
    // we need invisible container to store additional css definitions
    var cssMainContainer = $('#css-modifier-container');
    if (cssMainContainer.length == 0) {
        var cssMainContainer = $('<div id="css-modifier-container"></div>');
        cssMainContainer.hide();
        cssMainContainer.appendTo($('head'));
    }

    // and we need one div for each class
    classContainer = cssMainContainer.find('div[data-class="' + className + '"]');
    if (classContainer.length == 0) {
        classContainer = $('<div data-class="' + className + '"></div>');
        classContainer.appendTo(cssMainContainer);
    }

    // append additional style
    classContainer.html('<style>' + className + ' {' + classValue + '}</style>');
}