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
				height: 36px;
				margin-left: 8px;
				padding: 0 14px;
				border: 0;
				border-radius: 18px;
				background: #272727;
				color: #f1f1f1;
				font: 500 14px Roboto, Arial, sans-serif;
				white-space: nowrap;
				cursor: pointer;
				transition: background-color 140ms ease, transform 140ms ease;
			}
			.ytdownloader-button:hover { background: #3f3f3f; }
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
		button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 17v3h14v-3"/></svg><span>Скачать</span>`;
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
