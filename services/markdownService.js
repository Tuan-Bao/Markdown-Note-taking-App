import { marked } from "marked";

const renderMarkdown = (markdownText) => {
  return marked(markdownText);
};

export default renderMarkdown;
