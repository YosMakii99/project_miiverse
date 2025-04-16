import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Meh, Frown, AlertCircle, MessageSquare } from "lucide-react";

export default function CommentBox() {
  const [comment, setComment] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [reaction, setReaction] = useState(null);

  const reactions = [
    { icon: <Smile />, label: "Happy" },
    { icon: <Meh />, label: "Neutral" },
    { icon: <Frown />, label: "Sad" },
    { icon: <AlertCircle />, label: "Surprised" },
  ];

  return (
    <Card className="p-4 max-w-md mx-auto border-4 border-transparent focus-within:border-green-500 rounded-lg transition-all">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2 text-green-600">Comment on Post</h3>
        <div className="flex space-x-2 mb-2 bg-gray-200 p-2 rounded-lg">
          {reactions.map((r, index) => (
            <Button
              key={index}
              variant={reaction === r.label ? "default" : "outline"}
              onClick={() => setReaction(r.label)}
            >
              {r.icon}
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <Button variant="default" className="bg-green-500 text-white p-2 rounded-lg">
            <MessageSquare />
          </Button>
          <Textarea
            placeholder="Add a comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-2 border-gray-300 p-2 rounded-lg focus:border-green-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button variant={spoiler ? "default" : "outline"} onClick={() => setSpoiler(!spoiler)}>
            {spoiler ? "Spoiler On" : "Spoiler Off"}
          </Button>
          <Button disabled={!comment.trim()} onClick={() => alert("Comment Posted!")} className="bg-green-500 text-white">
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
