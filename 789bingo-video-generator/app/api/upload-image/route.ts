export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "请上传图片" }, { status: 400 });
    }

    const uploadForm = new FormData();
    uploadForm.append("reqtype", "fileupload");
    uploadForm.append("fileToUpload", file, file.name || "upload.jpg");

    const uploadResp = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: uploadForm,
    });

    const rawText = (await uploadResp.text()).trim();

    console.log("catbox response:", uploadResp.status, rawText.slice(0, 300));

    if (!uploadResp.ok || !rawText.startsWith("https://")) {
      return Response.json(
        {
          error: "图片上传失败（catbox 返回异常）",
          status: uploadResp.status,
          detail: rawText.slice(0, 500),
        },
        { status: 500 }
      );
    }

    return Response.json({
      imageUrl: rawText,
    });
  } catch (e: any) {
    console.error(e);

    return Response.json(
      {
        error: e?.message || "上传失败",
      },
      { status: 500 }
    );
  }
}
