require("dotenv").config();
const { Client, Intents, MessageEmbed } = require("discord.js");

const axios = require("axios").default;
const embeds = require("./embeds");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const apiUrl = "http://awaken.imbrett.io/api/";
const baseUrl = apiUrl.replace("api/", "");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("~") || message.author === client.user) {
    return;
  }

  const args = message.content.split(" ");
  const endpoint = args[0].replace("~", "");
  const search = args[1];

  // format everyting after the search as `&filters[]={ what you typed }`
  const filters = args
    .slice(2)
    .map((filter) => filter.replace(/^/, "&filters[]="))
    .join(" ")
    .replace(/\s/g, "");

  const url = `${apiUrl}${endpoint}?search=${search}${filters}&per_page=25`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = response.data.data;

    if (!data) {
      return message.reply({ embeds: [embeds.noResultsEmbed] });
    }

    if (data.length > 1) {
      const embed = new MessageEmbed()
        .setColor("21ba45")
        .setTitle("Search Results")
        .setURL(`${url}`);

      data.map((d) => {
        embed.addField(
          `Name`,
          `[${d.name ?? d.slug}](${baseUrl}${endpoint}/${d.slug})`,
          true
        );
      });

      return message.reply({ embeds: [embed] });
    } else {
      switch (endpoint) {
        case "heroes":
          const heroEmbed = new MessageEmbed()
            .setColor("21ba45")
            .setTitle(`${data[0].name}`)
            .setURL(`${url}`)
            .addFields([
              {
                name: "Grade",
                value: `[${data[0].faction.name}](${baseUrl}${endpoint}/${data[0].faction.slug})`,
                inline: true,
              },
              {
                name: "Attack",
                value: `${data[0].stats[0].attack}`,
                inline: true,
              },
              {
                name: "Defense",
                value: `${data[0].stats[0].defense}`,
                inline: true,
              },
              {
                name: "Element",
                value: `[${data[0].element.name}](${baseUrl}${endpoint}/${data[0].element.slug})`,
                inline: true,
              },
              {
                name: "Health",
                value: `${data[0].stats[0].health}`,
                inline: true,
              },
              {
                name: "Speed",
                value: `${data[0].stats[0].speed}`,
                inline: true,
              },
              {
                name: "Combat Type",
                value: `[${data[0].combat_type.name}](${baseUrl}${endpoint}/${data[0].combat_type.slug})`,
                inline: true,
              },
              {
                name: "Faction",
                value: `[${data[0].faction.name}](${baseUrl}${endpoint}/${data[0].faction.slug})`,
                inline: true,
              },
              {
                name: "Crit Rate",
                value: `${data[0].stats[0].crit_rate}`,
                inline: true,
              },
            ]);

          await message.reply({ embeds: [heroEmbed] });
          break;
        case "stats":
          // Stats embed
          const statsEmbed = new MessageEmbed()
            .setColor("21ba45")
            .setTitle("Hero Stats")
            .setURL(`${url}`)
            .addFields([
              { name: "Attack", value: `${data[0].attack}` },
              { name: "Health", value: `${data[0].health}` },
              { name: "Defense", value: `${data[0].defense}` },
              { name: "Speed", value: `${data[0].speed}` },
              { name: "Crit Rate", value: `${data[0].crit_rate}` },
            ]);
          await message.reply({ embeds: [statsEmbed] });
          break;
        case "factions":
          // Faction embed
          const factionEmbed = new MessageEmbed()
            .setColor("21ba45")
            .setTitle("Faction")
            .setURL(`${url}`);
          // .addFields([
          //   {
          //     name: "Heroes",
          //     value: data[0].heroes.map((hero) => `[${hero.name}](${hero.slug})`),
          //     inline: true,
          //   },
          // ]);
          await message.reply({ embeds: [factionEmbed] });
          break;
        default:
          return;
      }
    }
  } catch (e) {
    console.log(e);
    return message.reply({ embeds: [embeds.malformedRequestEmbed] });
  }
});

client.login(process.env.AUTH_TOKEN);
