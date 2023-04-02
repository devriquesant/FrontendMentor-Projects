const GET = x=>document.querySelector(x);
const GETAll = x=>document.querySelectorAll(x);

function limitDigits( x, l=2 ){
    let repeats = l - String(x).length;
    return `${"0".repeat(repeats)}${x}`;
}

function leap(y){
    const by4 = y%4==0;
    const by100 = y%100==0;
    const by400 = y%400==0;

    return ( by4 && !by100 ) || ( by4 && by100 && by400 )
}

function getMonthLimit( i, y ){
    return [
        y=>31,y=>28+Number(leap()),y=>31,y=>30,y=>31,y=>30,y=>31,y=>31,y=>30,y=>31,y=>30,y=>31
    ][i](y);
}

function timeDiff( d1, d2 ){
    var year, month, day;

    var Md1 = d1.getMonth();
    var Md2 = d2.getMonth();
    var Dd1 = d1.getDate();
    var Dd2 = d2.getDate();

  year = Math.abs( d1.getFullYear() - d2.getFullYear() );

    const YearDiff = (Md1 < Md2) || ( Md1 == Md2 && Dd1 < Dd2 );
    const MonthDiff = (Dd1 < Dd2);

    year -= Number( YearDiff );
    month = ( ( 12 + Md1 ) - Md2 ) % 12 - Number( MonthDiff );

    let last_month = (12+(Dd1-1)%12)%12;
    day = ( Dd2 != Dd1 ? getMonthLimit(last_month, d1.getFullYear()) : 0 ) - Dd2 + Dd1;
    
    return {
        y:year, m:month, d:day
    };
}

function initCalc( birth ){
    var birthDate = new Date( ...birth );
    var actual = new Date();

    var diff = timeDiff( actual, birthDate );
    var txt_increase = {};

    for ( var k in diff ){
        const K = k;
        txt_increase[k] = GET(`#${k}-value`);
        txt_increase[k].goesTo = diff[k]

        txt_increase[k].timer = setInterval( function (){
            txt_increase[K].textContent = 
            txt_increase[K].textContent == "--" ? limitDigits(0) : limitDigits(parseInt(txt_increase[K].textContent)+1);

            if ( parseInt(txt_increase[K].textContent) == txt_increase[K].goesTo ){ clearInterval( txt_increase[K].timer ); }
        }, 50);
    }

}

function calculate( ){
    var ids = ["day", "month", "year"];
    const [ day, month, year ] = ids.map( e=>GET(`#${e}`).value );

    const arrErrors = AssessPossibleErrors( day, month, year );
    const hasErrors = arrErrors[1];

    ids.map( (e) => {
        const Txt_err = GET(`#${e}-error`);
        const Label = GET(`#label-${e}`);
        const Input = GET(`#${e}`);

        if ( arrErrors[0][e] ){
            Txt_err.textContent = arrErrors[0][e];
            Label.classList.add("error-label");
            Input.classList.add("error");
        }else{
            Txt_err.textContent = "";
            Label.classList.remove("error-label");
            Input.classList.remove("error");
        }
    })

    if ( !hasErrors ){
        initCalc( [+year, (+month)-1, +day] )
    }

}

function AssessPossibleErrors( day=false, month=false, year=false ){
    var errors = {  day: [],    month: [],  year: []  };

    const Errors = {
        empty: ()=>"This field is required",
        range: x=>`Must be a valid ${x}`,
        yrange: ()=>`Must be in the past`,
    }

    function validateDay( day ){
        if ( !day ) { errors.day.push( Errors.empty() ); return false; }
        day = parseInt(day);
        const inDayRange = inRange( day, 1, 31 );
        if ( !inDayRange ) { errors.day.push( Errors.range('day') ); return false; }
        return true;
    }

    function validateMonth( month ){
        if ( !month ) { errors.month.push( Errors.empty() ); return false; }
        month = parseInt(month);
        const inMonthRange = inRange( month, 1, 12 );
        if ( !inMonthRange ) { errors.month.push( Errors.range('month') ); return false; }
        return true;
    }

    function validateYear( year, cyear ){
        if ( !year ) { errors.year.push( Errors.empty() ); return false; }
        year = parseInt(year);

        const inYearRange = inRange( year, -10000, cyear );

        if ( !inYearRange ) { errors.year.push( Errors.yrange() ); return false; }
        return true;
    }

    function validateTime( hasPermition, diffMonth, diffDay ){
        if ( hasPermition ){
            const date = new Date( ...[+year, (+month)-1, +day] );
            if ( date.getFullYear() != parseInt(year) || 
                date.getMonth() != parseInt(month)-1 ||
                date.getDate() != parseInt(day) ){
                    errors.day.push( Errors.range("date") );
                    return false;
            }

            if ( parseInt(year) == Year && ( (diffMonth < 0) || (diffMonth == 0 && diffDay < 0) ) ){
                errors.day.push( Errors.yrange() ); return false;
            }
            return true;
        }
    }

    const CurrentDate = new Date();
    const inRange = (x, a, b)=> x>=a&&x<=b;
    const [ Day, Month, Year ]
    =
    [ CurrentDate.getDate(), CurrentDate.getMonth(), CurrentDate.getFullYear() ]

    const diffs = [ Month-parseInt(month), Day-parseInt(day) ];

    /* Validate Day */
    const ValidDay = validateDay( day, Day );

    /* Validate Month */
    const ValidMonth = validateMonth( month, Month );

    /* Validate Year */
    const ValidYear = validateYear( year, Year );

    /* Validate Time */
    const ValidTime = validateTime( ValidDay && ValidMonth && ValidYear, ...diffs  );

    for ( var k in errors ){ errors[k] = errors[k][0]; }
    
    return [ errors, !ValidDay || !ValidMonth || !ValidYear || !ValidTime ];
    
}


window.onload = init;

function init(){
    [...GETAll(".input-value")].map( input => {
        input.addEventListener( "keydown", function(e){
            if ( !(e.key.match(/Enter|Tab|Home|End|Arrow|Delete|Backspace|[0-9]/)) ) e.preventDefault(); 
        } )
    } )

    GET("form").reset();
    GET("form").onsubmit = function(e){ e.preventDefault(); }
}