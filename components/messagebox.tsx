import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import Markdown from './markdown';

type Props = {
  role: string,
  content: string
};

const MessageBox = ({ role, content }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm">
        {/* {content} */}
        <Markdown text={content} />
      </CardContent>
      {role !== "user" && (
        <CardFooter className="border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
          Disclaimer: The legal information provided by this application is for informational purposes only and should not
          replace professional legal advice, consultation, or representation.
        </CardFooter>
      )}
    </Card>
  );
};

export default MessageBox;
