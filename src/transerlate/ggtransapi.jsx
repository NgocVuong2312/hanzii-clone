import axios from "axios";

export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const res = await axios.post("https://translate.argosopentech.com/translate", {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return res.data.translatedText;
  } catch (err) {
    console.error("Lỗi khi dịch:", err);
    return "Lỗi khi dịch văn bản";
  }
};
