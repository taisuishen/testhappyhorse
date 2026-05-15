      {videoUrl && (
        <section className="result">
          <h2>生成结果</h2>
          <video src={videoUrl} controls autoPlay loop playsInline />
          <div className="infoBox">
            <strong>视频链接</strong>
            <span>{videoUrl}</span>
            <div className="linkActions">
              <a href={videoUrl} target="_blank" rel="noreferrer">
                新窗口打开
              </a>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(videoUrl);
                  setMessage("视频链接已复制到剪贴板");
                }}
              >
                复制链接
              </button>
            </div>
          </div>
        </section>
      )}
