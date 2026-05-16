export const runtime = "nodejs";

const prompt = `
Hyper realistic Korean KBO baseball stadium reaction-cam shot, 10 seconds, vertical 3:4.

Use [Image 1] as the exact 789Bingo logo reference.
Use [Image 2] as the exact face and identity reference for the female spectator.

Style:
Real live sports broadcast audience-cam, similar to concert jumbotron or baseball stadium big-screen crowd capture.

Shot from far away with a long telephoto lens (200mm–400mm). Natural distant-camera feeling, like a broadcast operator randomly capturing a spectator in the crowd.

One single continuous locked-off shot.
No cuts.
No camera movement except tiny natural broadcast micro drift.

Camera angle:
Front-facing shot
She is looking toward the baseball field, never at the camera.

Framing:
Medium shot from head to upper waist/thigh while seated naturally in the stadium.
Chest area fully visible.

789Bingo logo:
Small embroidered 789Bingo logo on upper-left chest area of her shirt.
Clearly visible during the entire video.
Natural fabric folds and stitching.

Expression:
Calm and focused watching the game.
No exaggerated emotion.
No cheering.
No smiling.
Only subtle blinking, breathing, and tiny eye movement.

Background:
Quiet Korean baseball crowd softly blurred with telephoto compression and creamy bokeh.
No cheering crowd reactions.

Top overlay:
Small realistic Korean KBO broadcast scoreboard at the top of the frame:
LG 3 — SSG 2
8회말 2아웃
21:47
LIVE
KBO 리그

Lighting:
Realistic Korean stadium LED lighting at night.
Natural skin tones.
Live TV broadcast texture.
Subtle digital compression and high-ISO sports broadcast noise.

Ultra realistic sports broadcast aesthetic.
`;

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return Response.json({ error: "缺少 imageUrl" }, { status: 400 });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "DASHSCOPE_API_KEY 未配置" }, { status: 500 });
    }

    const createResp = await fetch(
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-DashScope-Async": "enable",
        },
        body: JSON.stringify({
          model: "happyhorse-1.0-r2v",
          input: {
            prompt,
            media: [
              {
                type: "reference_image",
                url: "https://uat-img.789bingo.com/merchant/fbc05060-d7a2-4823-9ecf-29e25d9036bd.png",
              },
              {
                type: "reference_image",
                url: imageUrl,
              },
            ],
          },
          parameters: {
            resolution: "720P",
            ratio: "3:4",
            duration: 10,
          },
        }),
      }
    );

    const createData = await createResp.json();

    if (!createResp.ok) {
      return Response.json(createData, { status: createResp.status });
    }

    return Response.json(createData);
  } catch (error: any) {
    return Response.json({ error: error?.message || "生成接口异常" }, { status: 500 });
  }
}
