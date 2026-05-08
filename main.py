import os
import sys
import subprocess

# Auto-install yt-dlp if not available
try:
    import yt_dlp
except ImportError:
    print("Installing yt-dlp...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "yt-dlp"])
    import yt_dlp

# ── ffmpeg location ──────────────────────────────────────────────────────────
# winget installs ffmpeg here; update this path if yours differs.
_FFMPEG_BIN = (
    r"C:\Users\Usama\AppData\Local\Microsoft\WinGet\Packages"
    r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\ffmpeg-8.1.1-full_build\bin"
)

def _ensure_ffmpeg_on_path():
    """Add the winget ffmpeg bin dir to PATH for this process if needed."""
    if not any(
        os.path.exists(os.path.join(p, "ffmpeg.exe"))
        for p in os.environ.get("PATH", "").split(os.pathsep)
    ):
        os.environ["PATH"] = _FFMPEG_BIN + os.pathsep + os.environ.get("PATH", "")

_ensure_ffmpeg_on_path()


def download_playlist(url: str, output_dir: str = "downloads", audio_only: bool = False):
    """
    Download a complete playlist from YouTube (or any yt-dlp supported site).

    Args:
        url:        Playlist URL
        output_dir: Folder where files will be saved
        audio_only: If True, download audio only (MP3)
    """
    os.makedirs(output_dir, exist_ok=True)

    # Output template: downloads/<playlist_title>/<index> - <title>.ext
    outtmpl = os.path.join(output_dir, "%(playlist_title)s", "%(playlist_index)s - %(title)s.%(ext)s")

    ydl_opts = {
        "outtmpl": outtmpl,
        "ignoreerrors": True,          # Skip unavailable videos
        "noplaylist": False,           # Always download full playlist
        "progress_hooks": [_progress_hook],
        "retries": 5,
        "fragment_retries": 5,
        "concurrent_fragment_downloads": 4,
        "ffmpeg_location": _FFMPEG_BIN,  # Explicit ffmpeg path
    }

    if audio_only:
        ydl_opts.update({
            "format": "bestaudio/best",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }],
        })
    else:
        # Best video + audio merged into mp4
        ydl_opts["format"] = "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"
        ydl_opts["merge_output_format"] = "mp4"

    print(f"\n{'='*60}")
    print(f"  Downloading {'audio' if audio_only else 'video'} playlist")
    print(f"  URL        : {url}")
    print(f"  Output dir : {os.path.abspath(output_dir)}")
    print(f"{'='*60}\n")

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        if info:
            count = len(info.get("entries", [])) if "entries" in info else 1
            print(f"\n✅  Done! {count} item(s) saved to: {os.path.abspath(output_dir)}")
        else:
            print("\n❌  Download failed. Check the URL and try again.")


def _progress_hook(d: dict):
    """Print a simple one-line progress indicator."""
    if d["status"] == "downloading":
        filename = os.path.basename(d.get("filename", ""))
        percent  = d.get("_percent_str", "?%").strip()
        speed    = d.get("_speed_str", "?/s").strip()
        eta      = d.get("_eta_str", "?s").strip()
        print(f"\r  ⬇  {filename[:50]:<50}  {percent:>6}  {speed:>10}  ETA {eta}", end="", flush=True)
    elif d["status"] == "finished":
        print(f"\r  ✔  {os.path.basename(d.get('filename', ''))}")


def main():
    print("\n🎬  Playlist Downloader (powered by yt-dlp)")
    print("─" * 45)

    url = input("Enter playlist URL: ").strip()
    if not url:
        print("No URL provided. Exiting.")
        sys.exit(1)

    mode = input("Download as (1) Video  (2) Audio only  [default: 1]: ").strip()
    audio_only = mode == "2"

    out = input("Output folder [default: downloads]: ").strip() or "downloads"

    download_playlist(url, output_dir=out, audio_only=audio_only)


if __name__ == "__main__":
    main()
