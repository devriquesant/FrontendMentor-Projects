/**
 * Gets an specified HTMLElement from the DOM
 * @param {String} name - Element's tag, id or class name.
 * @returns {HTMLElement} - A HTMLElement
 */
function GetNode( name ){ return document.querySelector(name); }

/**
 * Gets all HTMLElement with the specified name to query
 * @param {String} name - Element's tag, id or class name
 * @returns {NodeList} - An array of nodes from the DOM
 */
function GetAll( name ){ return document.querySelectorAll(name); }

/**
 * Transforms the text given to uppercase format
 * @param {String} text - A String to be converted
 * @returns {String} - A uppercase converted string
 */
function Upper( text ){ return text.toUpperCase(); }

/**
 * Creates a string with size `quantity` of a `value`
 * @param {String} value - String to be inserted / repeated
 * @param {Number} quantity - Of repeatitions of the `value`
 * @returns {String} - The repeated string
 */
function itVal( value, quantity ){ return Array( quantity ).fill( value ).join(''); } 

/**
 * Creates a space-separated string in a format of credit card number 
 * @param {String[] | Number[]} list - List of numbers of a credit card
 * @returns {String} A string with a credit card format, space-separeted
 */
function FillCard( list ){
    return Array(4).fill().map((e,i)=>{
        return Array(4).fill().map((j,k)=>{	
            let fromList = list[ i*4 + k ];
            return fromList ? fromList : 0;
        }).join('');
    }).join(' ')
}

/**
 * Puts a number in a string set in a range, filling the blank spaces (left zeros).
 * @param {Number | String} x - Number value to be set into a range
 * @param {Number} l - Number of digits
 * @returns {String} - A string with length `l` filled with zeros or te value given
 */
function fillZero( x, l=2 ){
    var r = Array(l).fill("0");
    var u = String(x).split``;
    r.splice( l-u.length, u.length, ...u );
    return r.join("");
}

/**
 * Creates the possible errors to be handles and appearing in the filling of the form.
 * @returns {Object} Object of Error functions verifiers and its menssages
 */
function Errors(){
    const hasLetter = value => value.split` `.join('').split``.filter(e=>isNaN(e)).length != 0;
    const hasNum = value => value.split``.filter(e=>Number(e)).length != 0;
    const inRange = (value, range) => {
        return parseInt(value) < range[0] || parseInt(value) > range[1];
    }
    const rangeXpMM = (value) => inRange.bind(this, value, [1,12])() ;
    const rangeXpYY = (value) => inRange.bind(this, value, [0,99])();
    const rangeCVC = (value) => inRange.bind(this, value, [0,999])();
    const hasSomething = (value) => value == "";

    const ERR = {
        Num: "Name musn't contain numbers",
        Char: "Wrong format, numbers only",
        Blank: "Can't be blank",
        Range: "Out of range"
    }

    return {
        "name": {
            errors: [hasSomething, hasNum],
            msgs: [ERR.Blank, ERR.Num]
        },
        "card": {
            errors: [hasSomething, hasLetter],
            msgs: [ERR.Blank, ERR.Char]
        },
        "exp_mm": {
            errors: [hasSomething, hasLetter, rangeXpMM],
            msgs: [ERR.Blank, ERR.Char, ERR.Range]
        },
        "exp_yy": {
            errors: [hasSomething, hasLetter, rangeXpYY],
            msgs: [ERR.Blank, ERR.Char, ERR.Range]
        },
        "cvc": {
            errors: [hasSomething, hasLetter, rangeCVC],
            msgs: [ERR.Blank, ERR.Char, ERR.Range]
        }
    }
}

/**
 * Verify if any of the fields contains an error, if so it loads it, send and verify the others
 * @returns {Boolean} True or False for if it has errors
 */
function VerifyErrors(){
    var errors = Errors();

    var hasErrors = false;
    for ( var keyname in errors ){
        for ( var i = 0; i < errors[keyname].errors.length; i++ ){
            var Event = errors[keyname].errors[i];
            var Msg = errors[keyname].msgs[i];

            var errorMsg = GetNode(`#${keyname}-error`)
                errorMsg.textContent = "";
            if ( Event( Raw[keyname].absolute ) ){
                hasErrors = true;
                Raw[keyname].classList.add("error");
                errorMsg.textContent = Msg;
                break;
            }
        }
    }

    return hasErrors;

}

/**
 * Remove the `error` class from an element if it contains one
 * @param {HTMLElement} element - An HTMLElement to haves its `error` class removed
 */
function removeErrorClass( element ){
    if ( element.classList.contains("error") ){
        element.classList.remove("error");
    }
}

/**
 * Confirms the credit-card informations and pass to the next screen.
 */
function confirmCreditCard(){
    [...GetAll( ".input-stack" )].map(node=>{
        node.classList.remove("flex-field");
        node.classList.add("form-input-handler");

        setTimeout( function(){
            node.remove();
        }, 500);
    })

    setTimeout( function(){
        var confirm = GetNode("#confirm-label");
        confirm.classList.add("intro-confirm");
    }, 500);

    GetNode("#submit-btn").textContent = "Continue";
}

export{ 
    FillCard, fillZero, removeErrorClass, GetNode, VerifyErrors, confirmCreditCard, Upper, itVal
 }