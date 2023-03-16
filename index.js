import { createProject, GET, getPath, TouchFocus, ReposInfo } from "./project_creation.js";

window.onload = init;
window.addEventListener("touchstart", TouchFocus);

async function init(){
    var projects = await GET( getPath( ) );

    for ( var repo of projects ){
        const adjustName  = repo.name.split`-`.filter(e=>e).join(" ");
        var diff = await GET( `https://api.github.com/repos/devriquesant/FrontendMentor-Projects/contents/Projects/${repo.name}/prjct_diff` );

        const Difficulty  = atob(diff.content).split('\n').join('');
        const GHDirLink   = `https://github.com/devriquesant/FrontendMentor-Projects/tree/main/Projects/${repo.name}`;
        const LivePage    = `https://devriquesant.github.io/FrontendMentor-Projects/Projects/${repo.name}`;
        const BannerImage = `https://raw.githubusercontent.com/devriquesant/FrontendMentor-Projects/main/Projects/${repo.name}/screenshot.png`;
        const ProjectName = adjustName;

        createProject( new ReposInfo( BannerImage, ProjectName, GHDirLink, LivePage, Difficulty ) );

    }
}