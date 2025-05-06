import { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const MatchUpdates: React.FC = () => {
  const [commentaryList, setCommentaryList] = useState<string[]>([]); // Commentary lines as string[]
  const [showConfetti, setShowConfetti] = useState<boolean>(false);   // Boolean state

  const { width, height } = useWindowSize(); // Get window dimensions

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/get-update");

    // Handle incoming server-sent events
    eventSource.onmessage = (event: MessageEvent) => {
      console.log(">>>>>>>>", event);
      setCommentaryList((prev) => [...prev, event.data]);

      if (event.data === "India wins the match!") {
        setShowConfetti(true);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h3 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        Live Commentary - India vs Pakistan
      </h3>

      <Timeline position="alternate">
        {commentaryList.map((line, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot>
                <SportsCricketIcon />
              </TimelineDot>
              {index !== commentaryList.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{line}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default MatchUpdates;
