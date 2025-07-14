// /app/api/reports/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import InstitutionMember from "@/models/InstitutionMember";
import { Types } from "mongoose";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

// --- Data Fetching Logic (Unchanged) ---
async function fetchUserReportData(institutionId: Types.ObjectId) {
  await connectDB();
  const usersData = await InstitutionMember.aggregate([
    { $match: { institutionId } },
    { $sort: { createdAt: -1 } },
    { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userDoc' } },
    { $unwind: '$userDoc' },
    { $lookup: { from: 'performances', localField: 'userId', foreignField: 'userId', as: 'p' } },
    {
      $project: {
        Name: '$userDoc.name',
        Email: '$userDoc.email',
        Status: '$status',
        "Registration Date": { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        "Avg Performance (%)": { $ifNull: [{ $avg: '$p.understandingScore' }, 0] },
      }
    }
  ]);
  return usersData.map(u => ({ ...u, "Avg Performance (%)": Math.round(u["Avg Performance (%)"]) }));
}

// --- Excel Generation (Corrected) ---
async function generateExcelReport(data: any[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Lumo Admin Portal";
  workbook.created = new Date();
  
  const worksheet = workbook.addWorksheet("User Performance Report");

  worksheet.columns = [
    { header: "Name", key: "Name", width: 30 },
    { header: "Email", key: "Email", width: 40 },
    { header: "Status", key: "Status", width: 15 },
    { header: "Registration Date", key: "Registration Date", width: 20 },
    { header: "Avg Performance (%)", key: "Avg Performance (%)", width: 20 },
  ];

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF007BFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FF000000' } } };
  });
  
  worksheet.addRows(data);
  
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (worksheet.columns[colNumber - 1].key === 'Status' || worksheet.columns[colNumber - 1].key === 'Avg Performance (%)') {
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        }
        if (rowNumber % 2 === 0) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F0F0' } };
        }
      });
    }
  });

  // ==========================================================
  // ✨ FIX: Convert the ArrayBuffer from exceljs into a Node.js Buffer
  // ==========================================================
  const arrayBuffer = await workbook.xlsx.writeBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}

// --- PDF Generation (Unchanged) ---
async function generatePdfReport(data: any[]): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      doc.fontSize(18).text("User Performance Report", { align: "center" });
      doc.moveDown(2);

      const tableTop = 150;
      const itemHeight = 20;
      doc.fontSize(10).font("Helvetica-Bold");
      doc.text("Name", 50, tableTop); doc.text("Email", 180, tableTop); doc.text("Status", 350, tableTop); doc.text("Avg Perf.", 450, tableTop, { width: 90, align: "right" });
      doc.font("Helvetica");

      data.forEach((user, i) => {
        const y = tableTop + (i + 1) * itemHeight;
        doc.text(user.Name, 50, y);
        doc.text(user.Email, 180, y, { width: 170, ellipsis: true });
        doc.text(user.Status, 350, y, { width: 90 });
        doc.text(`${user["Avg Performance (%)"]}%`, 450, y, { width: 90, align: "right" });
      });

      doc.end();
    });
}


// --- API Route Handler (Unchanged) ---
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.institution?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const institutionId = new Types.ObjectId(session.institution.id);

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");

    if (!format || (format !== "xlsx" && format !== "pdf")) {
      return new NextResponse("Invalid format specified. Use 'xlsx' or 'pdf'.", { status: 400 });
    }

    const reportData = await fetchUserReportData(institutionId);

    if (format === "xlsx") {
      const buffer = await generateExcelReport(reportData);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="user_report_${new Date().toISOString().split('T')[0]}.xlsx"`,
        },
      });
    }

    if (format === "pdf") {
      const buffer = await generatePdfReport(reportData);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="user_report_${new Date().toISOString().split('T')[0]}.pdf"`,
        },
      });
    }

  } catch (error) {
    console.error("Failed to generate report:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
