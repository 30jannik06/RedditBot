import {
    Client,
    Colors,
    EmbedBuilder,
    GatewayIntentBits,
    Partials,
} from "discord.js";
import RedditImageFetcher from "reddit-image-fetcher";
import { log, cmd, clear } from "./util/logHelper";
import { token, prefix } from "./util/settings";
import {subreddit} from "./lib/subredits"
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
    ],
});

client.on("ready", () => {
    clear;
    log(`Logged in as ${client.user.tag}`);
    log(`Prefix: ${prefix}`);
});

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot || !message.guild) return;
        let args = message.content.slice(prefix.length).trim().split(/ +/);
        let cmd = args.shift()?.toLowerCase();
        switch (cmd) {
            case (cmd = "reddit"):
                RedditImageFetcher.fetch({
                    type: "meme",
                    subreddit: subreddit,
                }).then((result) => {
                    const redditEmbed = new EmbedBuilder()
                        .setTitle("Reddit Meme")
                        .setColor(Colors.White)
                        .setImage(result[0].image)
                        .setTimestamp(Date.now())
                        .setFooter({
                            text: "Reddit Bot by .jannik#6908",
                            iconURL:
                                "https://cdn.discordapp.com/avatars/268084996235853824/e09c22b75fad167efe7e86ce4526c6c0.png?size=2048",
                        });
                    message.reply({ embeds: [redditEmbed] });
                });

                break;
            default:
                break;
        }
    } catch (error) {
        error(error);
    }
});

client.login(token);
