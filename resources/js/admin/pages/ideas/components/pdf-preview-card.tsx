import { useState } from 'react';
import { Download, ExternalLink, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PdfPreviewCardProps {
    pdfFile: string;
    ideaId: number;
}

export function PdfPreviewCard({ pdfFile, ideaId }: PdfPreviewCardProps) {
    const [showPdfPreview, setShowPdfPreview] = useState(false);

    return (
        <Card className="overflow-hidden py-0 pb-5">
            <CardHeader className="border-b bg-muted/50">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <CardTitle className="flex items-center gap-2 py-4 text-lg font-bold">
                        <FileText className="size-5 text-primary" />
                        الملف التوضيحي المرفق
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-9 font-bold"
                        >
                            <a
                                href={pdfFile}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="me-2 size-4" />
                                عرض ملء الشاشة
                            </a>
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="h-9 bg-primary font-bold hover:bg-primary/90"
                        >
                            <a
                                href={pdfFile}
                                download={`idea-${ideaId}-plan.pdf`}
                            >
                                <Download className="me-2 size-4" />
                                تحميل PDF
                            </a>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div
                    className={`relative flex w-full flex-col items-center justify-center bg-muted/30 transition-all duration-300 ${showPdfPreview ? 'aspect-[1/1.4] sm:aspect-video md:aspect-[1/1.4]' : 'px-8 py-12 text-center'}`}
                >
                    {showPdfPreview ? (
                        <iframe
                            src={`${pdfFile}#toolbar=0&navpanes=0`}
                            className="h-full w-full animate-in border-none duration-500 fade-in"
                            title="PDF Preview"
                        />
                    ) : (
                        <div className="animate-in space-y-4 duration-300 zoom-in-95">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                                <FileText className="size-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold">
                                    الملف متاح للمراجعة
                                </h3>
                                <p className="mx-auto max-w-xs text-sm font-semibold text-muted-foreground">
                                    انقر للمعاينة مباشرة هنا أو استخدم الخيارات
                                    أعلاه للتحميل
                                </p>
                            </div>
                            <Button
                                onClick={() => setShowPdfPreview(true)}
                                variant="secondary"
                                className="px-10 font-bold shadow-sm transition-all hover:shadow-md"
                            >
                                <Eye className="me-2 size-4" />
                                عرض المعاينة هنا
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
