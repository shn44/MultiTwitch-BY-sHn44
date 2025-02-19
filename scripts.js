const parentDomain = "https://shn44.github.io/";

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  themeToggle.textContent =
    savedTheme === "dark" ? "Modo Claro" : "Modo Escuro";
}

themeToggle.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "light");
    themeToggle.textContent = "Modo Escuro";
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Modo Claro";
    localStorage.setItem("theme", "dark");
  }
});

document.getElementById("add-channel").addEventListener("click", function () {
  const channelName = document.getElementById("channel-input").value.trim();
  if (channelName) {
    addStream(channelName);
    document.getElementById("channel-input").value = "";
  }
});

function addStream(channelName) {
  const existingStreams = document.querySelectorAll(".stream iframe");
  for (const stream of existingStreams) {
    if (stream.src.includes(channelName)) {
      alert("Este canal já foi adicionado!");
      return;
    }
  }
  const streamContainer = document.createElement("div");
  streamContainer.classList.add("stream");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  streamContainer.appendChild(loader);

  const iframe = document.createElement("iframe");
  iframe.src = `https://player.twitch.tv/?channel=${channelName}&parent=${parentDomain}`;
  iframe.allowFullscreen = true;

  iframe.onload = () => {
    streamContainer.removeChild(loader);
    streamContainer.appendChild(iframe);
  };

  iframe.onerror = () => {
    streamContainer.removeChild(loader);
    streamContainer.innerHTML = `<p class="error">Canal "${channelName}" não encontrado ou offline.<p>`;
  };

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-stream");
  removeButton.innerHTML = "&times";
  removeButton.addEventListener("click", () => {
    streamContainer.remove();
  });

  streamContainer.appendChild(iframe);
  streamContainer.appendChild(removeButton);
  document.querySelector(".streams-container").appendChild(streamContainer);
}
