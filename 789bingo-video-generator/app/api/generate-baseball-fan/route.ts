export const runtime = "nodejs";

const prompt = `
Create a hyper realistic 5-second live sports broadcast reaction shot in 3:4 vertical aspect ratio, captured inside a crowded Korean baseball stadium during an intense late-game moment.

You must use [Image 1] and [Image 2] as strict visual references.

[Image 1] is the 789Bingo brand logo reference. The "789Bingo" logo — including its font, color palette, glow effect, outline, brand styling, and premium visual identity — must match [Image 1] exactly.

[Image 2] is the uploaded selfie reference. The female spectator must match the person in [Image 2] exactly, including facial appearance, hairstyle, makeup style, skin tone, temperament, body proportions, and overall visual identity. Preserve the original face, hairstyle, and character identity from [Image 2] consistently throughout the entire video — do NOT alter the face from [Image 2].

The camera suddenly cuts to this young female spectator sitting among the crowd. She does NOT look at the camera. She is fully focused on the baseball game, reacting naturally with subtle emotional tension — blinking slowly, slightly biting her lip, breathing softly, with tiny micro-expressions and authentic, unposed human behavior. The shot feels like a real televised baseball broadcast reaction cam, not a cinematic movie scene. Atmosphere: accidental, candid, observational, unposed.

CAMERA STYLE:
- Live TV sports broadcast camera operator behavior.
- Long telephoto sports lens, 135–200mm equivalent.
- Very shallow depth of field, compressed stadium background, soft creamy bokeh.
- Slight handheld instability, tiny autofocus breathing, gentle live camera drift.
- Very slow subtle zoom-in during the shot.
- Framing slightly imperfect, like a real sports director camera cut.

LIGHTING:
- Realistic stadium LED lighting, cool white arena lights.
- Natural skin tones, slight blue/cyan shadows, bright stadium highlights.
- Night baseball game atmosphere.

SUBJECT WARDROBE & BRAND LOGO PLACEMENT:
- She wears a casual baseball-fan outfit (e.g. a fitted team-style tee or light jacket) that matches the appearance and styling of the clothing seen on the character in [Image 2] if applicable; otherwise a clean cotton tee suitable for a stadium.
- Place the "789Bingo" brand logo from [Image 1] clearly on the upper-left chest area of the clothing. The logo must match [Image 1] exactly in font, color, shape, logo styling, glow effect, and premium appearance.
- The logo must look naturally printed or embroidered on the fabric — NOT floating in air, NOT in the background, NOT distorted, NOT mirrored, NOT recolored.
- Logo stays stable, sharp, and consistent across every frame, with realistic fabric folds and lighting interaction.

BACKGROUND:
- Crowded baseball stadium audience, people moving naturally.
- Occasional blurry cheering gestures behind her.
- Live sports energy, depth and realism in crowd movement.

STYLE:
- Ultra realistic, live television broadcast aesthetic, sports reaction cam.
- Authentic Korean baseball TV style, candid spectator capture.
- Natural motion cadence, no dramatic acting, no cinematic Hollywood look.

TEXTURE:
- Slight digital broadcast compression, subtle high-ISO noise.
- Realistic TV sharpness, tiny motion blur from live camera movement.

MOTION:
- The woman slightly shifts her gaze following the baseball game.
- Small facial reactions only, hair moves subtly, natural blinking, slow breathing.
- Background crowd continuously moves organically.

TIMING (5 seconds):
- 0–2s: camera settles on the spectator.
- 2–4s: subtle emotional reaction builds.
- 4–5s: tiny expression change while crowd energy increases.

Negative prompt: cinematic movie look, fashion photography, studio lighting, influencer aesthetic, perfect symmetry, exaggerated emotions, overacting, anime, CGI look, plastic skin, beauty commercial, music video style, artificial posing, direct eye contact, over-sharpened face, fake smile, dramatic camera movement, low realism, generated-looking hands, face distortion, changing the face from [Image 2], changing the logo from [Image 1], floating logo, misplaced logo, wrong logo position, logo distortion, text artifacts, watermark.
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
            duration: 5,
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
