const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS to allow cross-origin requests (for frontend to access backend)
app.use(cors());

// Set the port (default to 3000 if not set in environment variables)
const PORT = process.env.PORT || 3000;

// Array containing India vs Pakistan match commentary (Navjot Sidhu style)
const commentary = [
  "Oye hoye! The stadium is jam-packed like a tin of sardines in the sun!",
  "Toss jeetna toh sirf shuruaat hai, asli baazi toh ab chalegi!",
  "Babar swings his bat like a warrior wielding a sword in battle!",
  "Bumrah ne ghanti bajaa di! Ball se kar diya chakachak!",
  "Rizwan aur Babar – jaise Ram aur Laxman, lekin pitch pe!",
  "Kuldeep ne dikhayi karamat – Babar gaya, Pakistan ki umeedein thodi dhak-dhak!",
  "Run aa rahe hain, par kachua chaal – Pakistan ki innings ka tempo slow motion mein!",
  "Hardik Pandya ne toofan macha diya – double dhamaaka!",
  "145 ka score, jaise daal mein namak kam – par cricket mein kuch bhi ho sakta hai!",
  "Rohit Sharma ne aaya aur chhakka maara – jaise sher jungle mein dahadta hai!",
  "Naseem ne ball daala – aur Rohit ka timber hil gaya, gajab!",
  "Kohli aur Gill – jaise do sathi ek mission pe!",
  "Kohli ne lagaye do chakke – stadium goonj utha 'Kohli! Kohli!' se!",
  "Gill gaya – par Kohli abhi baaki hai, picture abhi bhi superhit hai!",
  "Pant aaya, aur shots barse jaise barsaat mein paani!",
  "Kohli jaise chattan – pressure mein bhi smile karta hai!",
  "10 run chahiye, 6 ball baaki – yeh hai asli maidan-e-jung!",
  "Kohli ne maara chhakka – jaise teer nikal gaya dhanush se! Bharat ne jeet liya final!!",
  "Trophy uthi, Tiranga lahraya – aaj cricket ne phir se ek kahani likhi! Jai Hind! 🇮🇳",
];

let commentaryIndex = 0; // To track the current index of the commentary

// SSE (Server-Sent Events) endpoint to stream match updates
app.get("/get-update", (req, res) => {
  // Set required headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send the first commentary message immediately
  res.write(`data: ${commentary[commentaryIndex]}\n\n`);

  // Start interval to send remaining updates every 3 seconds
  const intervalId = setInterval(() => {
    commentaryIndex++;

    if (commentaryIndex < commentary.length) {
      // Send next piece of commentary
      res.write(`data: ${commentary[commentaryIndex]}\n\n`);
    } else {
      // End of commentary: clear interval, send final message, and close connection
      clearInterval(intervalId);
      res.write("data: India wins the match!\n\n");
      res.end();
    }
  }, 3000);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
