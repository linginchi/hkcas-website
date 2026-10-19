#!/usr/bin/env python3
"""Build the HKCAS horizontal lockup (SVG).

Tree: cropped from public/logo-tree.png (official PNG), embedded as a small raster.
Wordmark: Source Serif 4 (wght 400, opsz 60), converted to SVG paths.

Run from the repo root:
    python3 design/logo/build-logo.py
"""

import base64
import urllib.request
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
FONT_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/SourceSerif4%5Bopsz,wght%5D.ttf"
FONT_PATH = Path("/tmp/SourceSerif4.ttf")

if not FONT_PATH.exists():
    urllib.request.urlretrieve(FONT_URL, FONT_PATH)

# Small embedded tree (display size is 32–40px; 148px covers 3–4x).
tree = Image.open(ROOT / "public/logo-tree.png").convert("RGBA").resize((148, 148), Image.LANCZOS)
tree = tree.quantize(colors=48, method=Image.Quantize.FASTOCTREE)
tree.save("/tmp/logo-tree-148.png", optimize=True)
white = Image.new("RGBA", tree.size, (255, 255, 255, 0))
white.putalpha(tree.convert("RGBA").getchannel("A"))
white.quantize(colors=8, method=Image.Quantize.FASTOCTREE).save("/tmp/logo-tree-white-148.png", optimize=True)

font = TTFont(FONT_PATH)
font = instantiateVariableFont(font, {"wght": 400, "opsz": 60}, inplace=True)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
bounds = BoundsPen(glyphs)
glyphs[cmap[ord("H")]].draw(bounds)
cap_units = bounds.bounds[3]

TREE_H, TREE_Y, CAP, TRACK, GAP = 96, 12, 42, 8.0, 24.0
scale = CAP / cap_units
baseline = TREE_Y + TREE_H / 2 + CAP / 2
cursor = TREE_H + GAP
paths = []
for char in "HKCAS":
    glyph = glyphs[cmap[ord(char)]]
    pen = SVGPathPen(glyphs)
    glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, baseline)))
    paths.append(pen.getCommands())
    cursor += glyph.width * scale + TRACK
width = TREE_H + GAP + (cursor - TRACK - (TREE_H + GAP)) + 4

def b64(path):
    return base64.b64encode(Path(path).read_bytes()).decode()

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} 120" role="img" aria-label="HKCAS">
  <image x="0" y="{ty}" width="{th}" height="{th}" href="data:image/png;base64,{tree}" />
  <path d="{d}" fill="{ink}" />
</svg>
"""

VARIANTS = [
    ("logo-horizontal.svg", "/tmp/logo-tree-148.png", "#121A16"),
    ("logo-horizontal-white.svg", "/tmp/logo-tree-white-148.png", "#FFFFFF"),
    ("logo-horizontal-green.svg", "/tmp/logo-tree-148.png", "#4A8522"),
]

for name, tree_png, ink in VARIANTS:
    svg = TEMPLATE.format(w=round(width, 1), ty=TREE_Y, th=TREE_H, tree=b64(tree_png), d=" ".join(paths), ink=ink)
    (ROOT / "public" / name).write_text(svg)
    print("wrote", name, len(svg) // 1024, "KB")
