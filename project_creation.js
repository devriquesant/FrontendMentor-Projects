const USER = "devriquesant";
const FOCUS_REPO = "FrontendMentor-Projects";
const getPath = (path="") => `https://api.github.com/repos/${USER}/${FOCUS_REPO}/contents/Projects/${path}`;

class ReposInfo{
    constructor( imgLink, projectName, gitLink, liveLink, difficult ){
        this.imgLink = imgLink;
        this.projectName = projectName;
        this.gitLink = gitLink;
        this.liveLink = liveLink;
        this.difficult = difficult;
    }
}

class TreeNode{
    constructor( name, identifiers={} ){
        const { id, cl } = identifiers;
        this.node = document.createElement( name );
        
        if ( id ) this.node.id = id;
        if ( cl ) {
            for ( var cln of cl.split` ` ){
                this.node.classList.add( cln );
            }
        }
    }
    add( ...treeNodes ){
        for ( var node of treeNodes ){ this.node.append( node.node ); }
        return this;
    }
}

async function GET( path ){
    const URL = await fetch( path ).then( data => data.json() );
    return URL;
}

function TouchFocus(e){
    var touchFocus = document.querySelectorAll(".project-touch");
    for ( var focus of touchFocus ){
        if ( !focus.contains(e.target) ){
            focus.classList.remove("project-touch");
        }
    }
}

function getDiff( name ){
    var diffs = ["newbie","junior","intermediate","advanced","guru"];
    return {
        value: name[0].toUpperCase()+name.slice(1).toLowerCase(),
        num  : diffs.indexOf(name)+1
    }
}

function createProject( properties ){
    const { imgLink, projectName, gitLink, liveLink, difficult } = properties;
    const parent = document.getElementById("project-container");

    const Box               = new TreeNode( "div", {cl:`project-box bk-${difficult}`} );
    const Content           = new TreeNode( "div", {cl:"project-content"} );
    const BannerCont        = new TreeNode( "div", {cl:"project-banner-container"} );
    const Banner            = new TreeNode( "img", {cl:"project-banner"} );
    const Description       = new TreeNode( "div", {cl:`project-description bka-${difficult}`} );
    const Title             = new TreeNode( "h1" );
    const Links             = new TreeNode( "div", {cl:"project-links"});
    const GitLink           = new TreeNode( "a" );
    const GitImg            = new TreeNode( "img", {cl:"project-link-img"} );
    const LiveLink          = new TreeNode( "a" );
    const LiveImg           = new TreeNode( "img", {cl:"project-link-img"} );
    const Difficulty        = new TreeNode( "div", {cl:`project-difficulty bk-${difficult}`} );
    const DiffContainer     = new TreeNode( "div", {cl:"diff-container"} );
    const DiffName          = new TreeNode( "p", {cl:"diff-name"} );
    const DiffNum           = new TreeNode( "p", {cl:`diff-num bk-${difficult}`});

    let diffGetter = getDiff( difficult );

    Banner.node.src           = imgLink;
    Title.node.textContent    = projectName;
    DiffName.node.textContent = diffGetter.value;
    DiffNum.node.textContent  = diffGetter.num;
    GitLink.node.href         = gitLink;
    LiveLink.node.href        = liveLink;
    
    GitImg.node.src  = "./src/github.png";
    LiveImg.node.src = "./src/webpage.png";

    Box.node.addEventListener("touchstart", function(e){
        this.classList.add("project-touch");
    });

    parent.appendChild( Box.node );
    Box.add( 
        Content.add(
            BannerCont.add( Banner ),
            Description.add(
                Title,
                Links.add(
                    GitLink.add( GitImg ),
                    LiveLink.add( LiveImg )
                )
            )
        ),
        Difficulty.add(
            DiffContainer.add(
                DiffName, DiffNum
            )
        )
    );
    
}

export{
    createProject, GET, getPath, TouchFocus, ReposInfo
}