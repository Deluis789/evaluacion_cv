from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import AcceleratorDevice, AcceleratorOptions, PdfPipelineOptions

pipeline_options = PdfPipelineOptions()
pipeline_options.accelerator_options = AcceleratorOptions(
    num_threads=4,
    device=AcceleratorDevice.CPU,
)
pipeline_options.do_ocr = False  # ← nuestros CVs tienen texto real, no son escaneos

_converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
    }
)


def extract_cv_text(file_path: str) -> str:
    result = _converter.convert(file_path)
    return result.document.export_to_markdown()