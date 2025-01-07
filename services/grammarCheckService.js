import axios from "axios";

const LANGUAGE_TOOL_API_URL = "https://api.languagetool.org/v2/check";

const checkGrammar = async (text, language) => {
  try {
    const response = await axios.post(
      LANGUAGE_TOOL_API_URL,
      {
        text: text,
        language: language,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.matches;
  } catch (error) {
    throw new Error("Failed to check grammar. Please try again later.");
  }
};

export default checkGrammar;
