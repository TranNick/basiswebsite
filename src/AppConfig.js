var parseVars;

if(!!window.location.href.match(/8080/)){
    parseVars = {
        ParseApplicationId: 'website-appId',
        ParseServerURL: 'http://localhost:9000/parse'
    }
} else {
    parseVars = {
        ParseApplicationId: 'website-appId',
        ParseServerURL: 'http://website-parse.herokuapp.com/parse'
    }
}
export default parseVars