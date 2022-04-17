const { MessageEmbed } = require("discord.js");

const noResultsEmbed = new MessageEmbed()
  .setColor("c10015")
  .setTitle("No Results")
  .setURL("https://google.com")
  .addField(
    "Houston, we have a problem",
    "You're not intentionally heading for a black hole, are you?"
  );

const malformedRequestEmbed = new MessageEmbed()
  .setColor("c10015")
  .setTitle("Invalid request")
  .setURL("https://google.com")
  .addField(
    "What exactly are you trying to search for?",
    "You probably have a typo in your request and the server couldn't join the tables you are trying to search through"
  );

module.exports = { noResultsEmbed, malformedRequestEmbed };
