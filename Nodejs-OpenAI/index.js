import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
});

const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
        { "role": "user", "content": "write a haiku about ai" },
    ],
});

completion.then((result) => console.log(result.choices[0].message));
