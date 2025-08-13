import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

export async function POST(request) {
    const body = await request.json();
    const userMessage = body.message;

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant. "},
            { role: "user", content: userMessage }
        ],
    });

    const aiReply = completion.choices[0].message.content;

    return new Response(
        JSON.stringify({ reply: aiReply }),
        { headers: { "Content-Type": "application/json" }}
    );
}



export async function GET(request) {
    return new Response(JSON.stringify({ message: "API route works!"}), {
        headers: { "Content-Type": "application/json" },
    });
}

