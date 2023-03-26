import {
    FillCard, fillZero, removeErrorClass, GetNode,
    VerifyErrors, confirmCreditCard, Upper, itVal
} from './module-def.js';


window.onload = init;

const Raw = {}; const Display = {};
const Form = GetNode("#form-insert");
Form.onsubmit = function(e){
    if ( !this.formSent ) {
        e.preventDefault();
        var hasErrors = VerifyErrors();
        if ( !hasErrors ){ 
            confirmCreditCard(); 
            this.formSent = true;
        }
    }
}

window.Raw = Raw;
function init (){
    Form.reset();

    var inputs = [ "name", "card", "exp_mm", "exp_yy", "cvc" ];
    var inputOnValidNumber = {
        "exp_mm": (e, value)=>value.length + 1 > 2 || parseInt(value+e.key) > 12,
        "exp_yy": (e, value)=>value.length + 1 > 2,
        "cvc": (e, value)=>value.length + 1 > 3
    }
    var inputConditional = {
        "card": (obj, value)=>{ 
            if ( (value.length+1) % 5 == 0 ){ 
                obj.value += ' ';
            }
        }
    }

    // Creates the form fields
    for ( var i of inputs ){
        const KeyName = i;
        var name = i.includes("exp") ? "exp" : i;
        Raw[i] = GetNode( `#${i}-input` );
        Raw[i].raw_name = i;
        Raw[i].onfocus = function(){ removeErrorClass( this ); }

        if ( inputConditional[KeyName] || inputOnValidNumber[KeyName] ){
            Raw[KeyName].addEventListener( 'keydown', function( event ){
                FieldListener.bind(
                    this, 
                    event, 
                    inputOnValidNumber[KeyName] ? inputOnValidNumber[KeyName] : ()=>false,
                    inputConditional[KeyName] ? inputConditional[KeyName] : ()=>false
                )()
            })
        }

        if ( !Display[name] ) { Display[name] = GetNode( `#${name}-display` );  }
    }

    // Defines the range to year
    var year = new Date()
        year = year.getFullYear();

    Raw["exp_yy"].range = [year-2000, year-2000+45];

    Display["exp"].query = {month:"00", year:"00"};

    RealTime();
}

function FieldListener( e, joinNaVN=()=>false, conditional=()=>false ){
    var value = this.value;
    if ( e.key.length == 1 ){
        if ( !( Number( e.key ) + 1 ) || joinNaVN( e, value ) ) { e.preventDefault(); return; }
        conditional( this, value );
    }
}

const AsesssProperties = {
    name(){
        var name = Raw["name"].value ? Raw["name"].value : "Jane Appleseed";
        Display["name"].textContent = Upper( name );
        Raw["name"].absolute = Raw["name"].value;
    },
    card(){
        var card = FillCard( Raw["card"].value.split` `.join('').split`` );
        Display["card"].textContent = card;
        Raw["card"].absolute = card.split` `.join('') == itVal( '0', 16 ) ? "" : card.split` `.join('');
    },
    exp(){
        Display["exp"].query.month = Raw["exp_mm"].value ? Raw["exp_mm"].value : "00";
        Display["exp"].query.year = Raw["exp_yy"].value ? Raw["exp_yy"].value : "00";
    },
    exp_mm(){
        var month = fillZero( Display["exp"].query.month );
        var year = fillZero( Display["exp"].query.year );
        Display["exp"].textContent = `${ month }/${ year }`;
        Raw["exp_mm"].absolute = month == "00" ? "" : month;
    },
    exp_yy(){
        var month = fillZero( Display["exp"].query.month );
        var year = fillZero( Display["exp"].query.year );
        Display["exp"].textContent = `${ month }/${ year }`;
        Raw["exp_yy"].absolute = year == "00" ? "" : year;
    },
    cvc(){
        var cvc = Raw["cvc"].value ? Raw["cvc"].value : "000";
        Display["cvc"].textContent = fillZero( cvc, 3 );
        Raw["cvc"].absolute = cvc == "000" ? "" : cvc;
    }
}

function RealTime(){
    requestAnimationFrame( RealTime );

    for ( var property in AsesssProperties ){ AsesssProperties[ property ](); }

}
