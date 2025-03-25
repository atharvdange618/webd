import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { streamText } from "hono/streaming";

const app = new Hono();

let videos = [];

app.get("/", (c) => {
  return c.html("<h1>Hello World</h1>");
});

app.post("/video", async (c) => {
  const { videoName, channelName, duration } = await c.req.json();

  const newVideo = {
    id: uuidv4(),
    videoName,
    channelName,
    duration,
  };

  videos.push(newVideo);

  return c.json(newVideo, 200);
});

// Read all (Using Stream)
app.get("/videos", (c) => {
  return streamText(c, async (stream) => {
    for (const video of videos) {
      await stream.writeln(JSON.stringify(video));
      await stream.sleep(1000);
    }
  });
});

// Read by ID
app.get("/video/:id", (c) => {
  const { id } = c.req.param();
  const video = videos.find((video) => video.id === id);

  if (!video) {
    return c.notFound();
  }

  return c.json(video);
});

// Update by ID
app.put("/video/:id", async (c) => {
  const { id } = c.req.param();
  const { videoName, channelName, duration } = await c.req.json();

  const index = videos.findIndex((video) => video.id === id);

  if (index === -1) {
    return c.notFound();
  }

  videos[index] = { ...videos[index], videoName, channelName, duration };

  return c.json(videos[index], 200);
});

// Delete by ID
app.delete("/video/:id", (c) => {
  const { id } = c.req.param();
  videos = videos.filter((video) => video.id !== id);

  return c.json({ message: "Video deleted" }, 200);
});

// Delete all
app.delete("/videos", (c) => {
  videos = [];
  return c.json({ message: "All videos deleted" }, 200);
});
export default app;
