import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { theme } from "../../syntax-theme";

interface Props {
  language: string;
  code: string;
  showLineNumbers?: boolean;
}

function Code({ language, code, showLineNumbers }: Props) {
  return (
    <SyntaxHighlighter language={language} showLineNumbers={showLineNumbers} style={theme}>
      {code}
    </SyntaxHighlighter>
  )
}

export default Code;
