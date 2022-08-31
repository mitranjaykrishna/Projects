import React from "react";
import Entry from "./Entry";

function Create(EmojiPedia)
{
    return(
    <Entry 
        key={EmojiPedia.id}
        emoji={EmojiPedia.emoji}
        name={EmojiPedia.name}
        meaning={EmojiPedia.meaning}
    />
    );

}

export default Create;