window.onload = init;

function Node( name, id=null, className=null ){
    var node    = document.createElement( name );

    if ( id )        node.id = id;
    if ( className ) node.classList.add( className );

    return node;
}

function lower( value ){ return value.toLowerCase(); }

async function init(){
    var summary = await fetch("./data.json").then(data=>data.json());
    const ParentElement = document.getElementById("list-results");

    for ( var result of summary ){
        const { category, score, icon } = result;

        const ListItem       = Node( "li", lower( category ), "summary-info" );
        const ResultType     = Node( "div", "", "result-type" );
        const ResultInfo     = Node( "div", "", "result-info" );
        const ImageCategory  = Node( "img", "icon-result", "" );
        const CategoryText   = Node( "p", "", "" );
        const Scored         = Node( "p", "result-scored", "" );
        const TotalScore     = Node( "span", "", "stat-transp" );

        ImageCategory.src = icon;
        CategoryText.textContent = category;
        Scored.innerHTML = score+"&nbsp";
        TotalScore.textContent = "/ 100";

        /* Inherance */
        ParentElement.appendChild( ListItem );

        ListItem.appendChild( ResultType );
        ListItem.appendChild( ResultInfo );

        ResultType.appendChild( ImageCategory );
        ResultType.appendChild( CategoryText );

        ResultInfo.appendChild( Scored );
        ResultInfo.appendChild( TotalScore );

    }
}