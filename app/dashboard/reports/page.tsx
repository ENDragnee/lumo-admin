"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ReportsPage() {
  const [isDownloading, setIsDownloading] = useState<"xlsx" | "pdf" | null>(null);
  const { toast } = useToast();

  // ✨ FIX: This new function handles the download actively using JavaScript.
  const handleDownload = async (format: "xlsx" | "pdf") => {
    setIsDownloading(format);

    try {
      const response = await fetch(`/api/reports/users?format=${format}`);

      if (!response.ok) {
        // If the server returns an error, we can handle it here.
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate the report.");
      }
      
      // Get the filename from the Content-Disposition header if available.
      const disposition = response.headers.get("Content-Disposition");
      let filename = `user_report.${format}`; // Default filename
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      // Get the response body as a Blob (a file-like object).
      const blob = await response.blob();
      
      // Create a temporary URL for the blob.
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger the download.
      const a = document.createElement("a");
      a.href = url;
      a.download = filename; // Use the filename from the header or the default.
      document.body.appendChild(a);
      a.click();
      
      // Clean up the temporary anchor and URL.
      a.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `Your ${format.toUpperCase()} report is downloading.`,
      });

    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Download detailed reports for your institution's users and content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* User Performance Report Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>User Performance Report</CardTitle>
                <CardDescription>
                  A detailed list of all registered users, their status, registration date, and average performance score.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex items-center gap-4">
                {/* ✨ FIX: Buttons now use the onClick handler to trigger the download. */}
                <Button 
                  variant="outline"
                  onClick={() => handleDownload("xlsx")} 
                  disabled={isDownloading !== null}
                >
                  {isDownloading === 'xlsx' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                  )}
                  Download as Excel
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => handleDownload("pdf")} 
                  disabled={isDownloading !== null}
                >
                  {isDownloading === 'pdf' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  Download as PDF
                </Button>
              </CardContent>
            </Card>

            {/* Placeholder for another report */}
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics Report</CardTitle>
                <CardDescription>
                  (Coming Soon) An overview of each content module's engagement, completion rates, and average scores.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex items-center gap-4">
                <Button variant="outline" disabled>
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> Download as Excel (.xlsx)
                </Button>
                <Button variant="outline" disabled>
                  <FileText className="mr-2 h-4 w-4" /> Download as PDF
                </Button>
              </CardContent>
            </Card>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
