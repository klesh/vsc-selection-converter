
/**
 * A converter takes in a chunk of input text, and spit out an arbitray chunk of text
 * 
 * @param {string} text 
 * @return {string}
 */
function myConverter(text: string): string {
  return text.replace('hello world', 'Hello World');
}


/**
 * You may want to debug your converter
 */
if (require.main === module) {
  console.log(myConverter('Every programming language starts with a "hello world"'));
}


/**
 * Don't forget to export your convert
 */
module.exports = {
  myConverter
};