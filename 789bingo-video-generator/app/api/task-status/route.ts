export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return Response.json({ error: "缺少 taskId" }, { status: 400 });
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "DASHSCOPE_API_KEY 未配置" }, { status: 500 });
    }

    const resp = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await resp.json();

    return Response.json(data, { status: resp.status });
  } catch (error: any) {
    return Response.json({ error: error?.message || "查询任务异常" }, { status: 500 });
  }
}
