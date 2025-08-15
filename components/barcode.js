"use client";
import React, { useEffect, useRef } from "react";
import { useBarcode } from "next-barcode";
import { jsPDF } from "jspdf";
import "svg2pdf.js"; // this patches jsPDF with .svg()
import { Button } from "@/components/ui/button";

function BarcodeItem({ user }) {
  const { inputRef: usernameInputRef } = useBarcode({ value: user.username });
  const { inputRef: passwordInputRef } = useBarcode({ value: user.password });

  const generatePDF = async () => {
    const usernameSvg = usernameInputRef.current;
    const passwordSvg = passwordInputRef.current;

    if (!usernameSvg?.innerHTML || !passwordSvg?.innerHTML) {
      console.error("Barcodes not generated yet");
      alert("Please wait for barcodes to load before downloading");
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    try {
      console.log("Generating PDF...");
      await doc.svg(usernameSvg, { x: 10, y: 10, width: 150, height: 50 });
      await doc.svg(passwordSvg, { x: 10, y: 70, width: 150, height: 50 });
      doc.save(`${user.username}_barcodes.pdf`);
      console.log("PDF saved successfully");
    } catch (err) {
      console.error("SVG render error:", err);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <svg ref={usernameInputRef} />
        <svg ref={passwordInputRef} />
      </div>

      <Button onClick={generatePDF} className="w-full">
        Download PDF
      </Button>
    </div>
  );
}

export default BarcodeItem;
