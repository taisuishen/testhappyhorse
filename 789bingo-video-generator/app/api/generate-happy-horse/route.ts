export const runtime = "nodejs";

const prompt = `
Create a cinematic ultra-detailed vertical fantasy video in 3:4 aspect ratio featuring a magnificent happy horse as the central character.

The hero is a majestic, joyful horse with a shining golden mane and tail, sparkling eyes full of life, glossy well-groomed coat with subtle iridescent highlights, prancing playfully and smiling with energy. The horse looks lucky, premium, friendly, and full of fortune — clearly embodying the "789Bingo Happy Horse" brand mascot.

The horse stands in a luxurious dreamlike meadow surrounded by glowing golden coins floating in slow motion, drifting four-leaf clovers, blooming flowers, and softly twinkling lights. In the background, an elegant European fantasy palace covered with climbing roses and golden vines, lit by cinematic golden-hour sunset rim light.

Camera movement: slow cinematic dolly-in toward the horse, followed by a gentle orbit revealing the magical environment.
Motion: the horse playfully rears up once and waves its mane; golden coins, petals, and sparkles drift through the air; soft cloth-like banners flutter in the warm wind.

Composition: the happy horse is centered with cinematic golden-hour backlighting outlining its silhouette while softly illuminating facial details. Use a film-grade lens with shallow depth of field, premium commercial advertisement quality.

Style: Douyin viral fantasy video, cinematic luxury commercial, ultra realistic, film-grade lighting, highly detailed, vibrant joyful colors with warm golden tones.

Video duration: 5 seconds.

Negative prompt: low quality, blurry, distorted anatomy, malformed horse, extra legs, missing legs, sad horse, scary horse, dark muddy lighting, flat lighting, cartoon, low detail, broken limbs, messy background, text artifacts, watermark, low resolution, ugly proportions.
`;

export async function POST() {
  try {
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
          model: "wanx2.1-t2v-plus",
          input: {
            prompt,
          },
          parameters: {
            size: "720*1280",
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
