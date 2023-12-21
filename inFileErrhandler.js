try {

  //codes here

        } catch (err) {
            const stack = err.stack.split('\n')[1].trim();
            const stackTrace = err.stack;
            const regex = /\((\S+)\)/;
            const match = regex.exec(stackTrace);
            const lineNumber = match ? match[1] : "unknown";
            const errEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("⚠️ Error Occurred ⚠️")
                .addFields([
                    { name: '🖥️ **ERROR:**', value: `\`\`\`md\n${err}\`\`\``, inline: false },
                    { name: '🖥️ **ERR:**', value: `\`\`\`md\n${err.message}\`\`\``, inline: true },
                    { name: '🖥️ **Event no:**', value: `\`\`\`md\n${lineNumber}\`\`\``, inline: true },
                    { name: '👤 **Triggered By:**', value: `\`\`\`md\n${interaction.user.username} #${interaction.user.discriminator}\`\`\``, inline: true },
                    { name: '🖥️ **Path:**', value: `\`\`\`${stack}\`\`\``, inline: true },
                ])
                .setFooter({ text: `Command -- ${interaction.commandName}` })
                .setTimestamp();
            client.channels.cache.get(process.env.ERRORCHANNEL_ID).send({ embeds: [errEmbed] })
        }
    },
};
