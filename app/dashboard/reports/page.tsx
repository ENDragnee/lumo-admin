"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const handleDownload = () => {
    // In a real application, you would generate the report data here
    // and then trigger a download.
    // For demonstration, we'll create a simple text file.
    const reportContent = "This is a sample report.\n\nDate: " + new Date().toLocaleDateString();
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            View and download various reports for your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p>
              This section will contain a list of available reports. Each report
              can be generated and downloaded in a suitable format (e.g., PDF, CSV, Excel).
            </p>
            <Button onClick={handleDownload} className="w-fit">
              <Download className="mr-2 h-4 w-4" /> Download Sample Report
            </Button>
            {/* Add more report options here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
