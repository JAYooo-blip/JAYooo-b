var Discord = require('discord.js');
var botconfig = require('./botconfig.json');
var {MessageEmbed} = require('discord.js');
var superagent = require('superagent');
var moment = require('moment');
var bot = new Discord.Client();

const token = process.env.token;

const PREFIX = '.';

bot.on('ready', () => {
    console.log('im ready!!');
    bot.user.setActivity('Dinera | .', { type: 'WATCHING'}).catch(console.error);
})

bot.on('message', async message=> {

    if(!message.content.startsWith(PREFIX)) return; 
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('Pong!')
            break;
        case 'website':
            message.reply('Sorry! Our website is in progress. If you have any questions, please DM our staffs. Thank you!')
            break;
        case 'clear':
            if(!args[1]) return message.reply('Error, please enter a number.')
            message.channel.bulkDelete(args[1]);
            break;
        case 'avatar':
            message.channel.send(message.author.displayAvatarURL());
            break;
        case '8ball':
            if(!args[2]) return message.reply("Error! Please ask a full question!");
            let replies = ["Yes!", "No...", "I don't know.", "Duh.", "Ask again!", "Of course.", "No way!", "Probably."];

            let result = Math.floor((Math.random() * replies.length));
            let question = args.slice(1).join(" ");

            message.channel.send(replies[result]);
            break;
        case 'flip':
            let Sreplies = ["Your coin landed on heads!", "Your coin landed on tails!"];

            let Sresult = Math.floor((Math.random() * Sreplies.length));
            
            message.channel.send(Sreplies[Sresult]);
            break;
        case 'poll':
            message.delete();
            let msgArgs = args.slice(1).join(" ");

            message.channel.send(msgArgs).then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            });
            break;
        case 'help':
            message.author.send("Hey! If you need help, please ping or DM our lovely staffs and I'm sure that they will help you.")
            break;
        case 'rolldice':
            let rollDice = () => Math.floor(Math.random() * 6) + 1;
            message.reply("Rolled a " + rollDice());
            break;
        case 'say':
            message.delete();
            let announcement = message.content.substring(5);
            message.channel.send(announcement);
            break;
        case 'dm':
            message.delete();
            
            let mention = message.mentions.users.first();
            let mentionMessage = message.content.substring(25);
            if(mention == null) { return; }
            mention.send(mentionMessage);

            message.channel.send ("Sent!");
            break;
        case 'suggest':
            message.delete();
            const channel = message.guild.channels.cache.find(ch => ch.name === '»»——suggestion——««');
            if (!channel) return;

                let mesgArgs = args.slice(1).join(" ");
    
                channel.send(mesgArgs).then(messageReaction => {
                    messageReaction.react("👍");
                    messageReaction.react("👎");

                    message.channel.send("Your suggestion has been submitted!")
                
                });
        }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'join');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}! Please say "!verify" to access Dinera!`);
  });

  bot.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'leave');
    if (!channel) return;
    channel.send(`Ermagherd, ${member} left the server. I hope they have a good time here in Dinera!`);
  });

bot.on('message', message=>{
    if(message.content === "HI JAYBOT"){
        message.reply('Hi friend! I hope you will have a splendid day/night here at Dinera!')
    }
    if(message.content === "Hotel"){
        message.channel.send('Trivago')
    }
    if(message.content === "LOL"){
        message.channel.send('LOL! That was funny!')
    }
    if(message.content === "Lol"){
        message.channel.send('LOL! That was funny!')
    }
    if(message.content === "lol"){
        message.channel.send('LOL! That was funny!')
    }

    

});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}serverinfo`){
        let embedContent = new MessageEmbed();
        
        embedContent.setColor("0x00FFFF")
        .setTitle("Server Information")
        .setImage(message.author.displayAvatarURL)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField("**Guild Name:**", `${message.guild.name}`)
        .addField("**Guild Owner:**", `${message.guild.owner}`)
        .addField("**Member Count:**", `{message.guild.memberCount}`)
        .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL);
        message.channel.send({embed: embedContent});
    }

    if(cmd === `${prefix}cat`) {
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Please try again!")
                     
            let cEmbed = new Discord.MessageEmbed()
            .setColor("0x00FFFF")
            .setAuthor('Here is a cat for you!', message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed})

            msg.delete();
    }

    if(cmd === `${prefix}dog`) {
        let msg = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Please try again!")
                     
            let dEmbed = new Discord.MessageEmbed()
            .setColor("0x00FFFF")
            .setAuthor('Here is a dog for you!', message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(`Created by JAYooo#9748`, bot.user.displayAvatarURL)

            message.channel.send({embed: dEmbed})

            msg.delete();
            
    }
})

bot.login(token);
