import asyncio
from pathlib import Path
import edge_tts

TEXT = Path("scripts/narration.txt").read_text(encoding="utf-8")
OUT = Path("public/voice.mp3")

async def main():
    communicate = edge_tts.Communicate(TEXT, voice="en-US-GuyNeural", rate="+3%", volume="+0%")
    await communicate.save(str(OUT))

asyncio.run(main())
print(f"Created {OUT}")
