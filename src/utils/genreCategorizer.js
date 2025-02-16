import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const categorizeTask = async (taskText, dynamicGenres) => {
  const prompt = `以下のタスクのジャンルを「${dynamicGenres}」の中から選んで答えてください:\n\nタスク: ${taskText}\n\nジャンル:`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 10,
    });

    return response.choices[0]?.message?.content.trim() || "その他";
  } catch (error) {
    console.error("GPT API Error:", error);
    return "その他"; // エラー時は「その他」を返す
  }
};

