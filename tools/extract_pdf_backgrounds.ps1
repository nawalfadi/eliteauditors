$PdfDir = 'C:\Users\PC1\AppData\Roaming\Cursor\User\workspaceStorage\c0c1143bc8c2f91032cd27ca17077be2\pdfs\cfa5c766-e353-4572-8281-0ed0e30c2c1d'

$Pdf = Get-ChildItem -Path $PdfDir -Filter '*.pdf' | Select-Object -First 1
if (-not $Pdf) {
  throw "No PDF found in: $PdfDir"
}

python .\tools\extract_pdf_backgrounds.py $Pdf.FullName

