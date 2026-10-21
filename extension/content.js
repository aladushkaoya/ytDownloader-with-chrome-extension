(() => {
	function addStyles() {
		if (document.getElementById("ytdownloader-button-styles")) return;
		const style = document.createElement("style");
		style.id = "ytdownloader-button-styles";
		style.textContent = `
			.ytdownloader-button {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				gap: 7px;
				height: 40px;
				margin-left: 8px;
				padding: 0 16px;
				overflow: hidden;
				border: 0;
				position: relative;
				isolation: isolate;
				border-radius: 20px;
				background: var(--yt-spec-button-chip-background, rgba(255, 255, 255, .1));
				color: var(--yt-spec-text-primary, #f1f1f1);
				box-shadow: 0 0 8px rgba(255, 62, 62, .22);
				font: 500 14px Roboto, Arial, sans-serif;
				line-height: 40px;
				white-space: nowrap;
				cursor: pointer;
				transition: background-color 140ms ease, transform 140ms ease;
			}
			.ytdownloader-button::before { content: ""; position: absolute; width: 100%; height: 100%; bottom: 50%; left: 0; border-radius: inherit; background: rgba(255, 255, 255, .05); filter: blur(10px); pointer-events: none; z-index: 0; }
			.ytdownloader-button::after {border-radius: inherit; inset: 0; position: absolute; content: ""; background: linear-gradient(var(--yt-light-rim-color, rgba(255, 255, 255, 0.1)), transparent 75%);     -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);  -webkit-mask-composite: xor; mask-composite: exclude;  padding: .5px; pointer-events: none; z-index: 2;}
			.ytdownloader-button > span { position: relative; z-index: 1; }
			.ytdownloader-button:hover { background: #3f3f3f; box-shadow: 0 0 12px rgba(255, 62, 62, .42); }
			.ytdownloader-button:active { transform: scale(.97); }
			.ytdownloader-button:focus-visible { outline: 2px solid #3ea6ff; outline-offset: 2px; }
			.ytdownloader-button svg { width: 18px; height: 18px; flex: none; }
			.ytdownloader-button svg path { stroke: #ff4e45; }
			@media (prefers-reduced-motion: reduce) { .ytdownloader-button { transition: none; } }
		`;
		document.head.appendChild(style);
	}

	function addDownloadButton() {
		const actions = document.querySelector("#top-level-buttons-computed");
		if (!actions || actions.querySelector(".ytdownloader-button")) return;

		addStyles();
		const button = document.createElement("button");
		button.className = "ytdownloader-button";
		button.type = "button";
		button.setAttribute("aria-label", "Скачать через YTDownloader");
		button.innerHTML = `<span>yt-Dlp</span>`;
		button.title = "Открыть в YTDownloader";
		button.addEventListener("click", () => {
			const link = `ytdownloader://add?url=${encodeURIComponent(location.href)}`;
			location.href = link;
		});
		actions.appendChild(button);
	}

	new MutationObserver(addDownloadButton).observe(document.documentElement, {
		childList: true,
		subtree: true,
	});
	addDownloadButton();
})();
