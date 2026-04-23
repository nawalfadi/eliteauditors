import os
import sys
from pathlib import Path

import fitz  # PyMuPDF


def clamp(v: int, lo: int, hi: int) -> int:
  return max(lo, min(hi, v))


def main() -> None:
  repo_root = Path(__file__).resolve().parents[1]

  pdf_path = os.environ.get("ELITE_PDF_PATH") or (sys.argv[1] if len(sys.argv) > 1 else "")
  if not pdf_path:
    raise SystemExit(
      "Missing ELITE_PDF_PATH env var. Example:\n"
      "  set ELITE_PDF_PATH=C:\\path\\to\\profile.pdf"
    )

  pdf_file = Path(pdf_path)
  if not pdf_file.exists():
    raise SystemExit(f"PDF not found: {pdf_file}")

  out_dir = repo_root / "public" / "pdf-bgs"
  out_dir.mkdir(parents=True, exist_ok=True)

  doc = fitz.open(str(pdf_file))

  # Render selected pages and crop to the photo-heavy parts.
  # Page indices are 0-based.
  targets = [
    # name, page_index, crop strategy
    ("hero", 1, "hero-right"),
    ("about", 2, "left"),
    ("services", 5, "left"),
    ("methodology", 9, "left"),
    ("registry", 11, "left"),
  ]

  zoom = 2.0  # balance quality vs size

  for name, page_index, crop in targets:
    if page_index < 0 or page_index >= doc.page_count:
      continue

    page = doc.load_page(page_index)
    rect = page.rect

    if crop == "hero-right":
      # Focus on the right side / skyline texture (avoid template text).
      clip = fitz.Rect(
        rect.x0 + rect.width * 0.45,
        rect.y0 + rect.height * 0.05,
        rect.x1,
        rect.y0 + rect.height * 0.62,
      )
    elif crop == "left":
      # Focus left side visuals (photos / circles) and avoid most text blocks.
      clip = fitz.Rect(
        rect.x0,
        rect.y0 + rect.height * 0.18,
        rect.x0 + rect.width * 0.55,
        rect.y1,
      )
    else:
      clip = rect

    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, clip=clip, alpha=False)

    out_path = out_dir / f"{name}.jpg"
    pix.save(str(out_path))

  print(f"Saved backgrounds to: {out_dir}")


if __name__ == "__main__":
  main()

