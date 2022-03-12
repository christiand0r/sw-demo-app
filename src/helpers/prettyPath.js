//Parsed the string in a friend format, example: Luke Skywalker to luke-skywalker
export default path => path.toLowerCase().replaceAll(' ', '-');
