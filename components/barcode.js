"use client";
import React, { useRef } from "react";
import { useBarcode } from "next-barcode";
import { jsPDF } from "jspdf";
import "svg2pdf.js";
import { Button } from "@/components/ui/button";

function UserBarcodes({ user, onReady }) {
  const { inputRef: usernameRef } = useBarcode({ value: user.username });
  const { inputRef: passwordRef } = useBarcode({ value: user.password });

  React.useEffect(() => {
    if (usernameRef.current && passwordRef.current) {
      onReady(user.id, {
        usernameSvg: usernameRef.current,
        passwordSvg: passwordRef.current,
      });
    }
  }, [user.id, usernameRef, passwordRef, onReady]);

  return (
    <div className="hidden">
      <svg ref={usernameRef} />
      <svg ref={passwordRef} />
    </div>
  );
}

function BarcodeItem({ users }) {
  const barcodeRefs = useRef({});

  const handleReady = (id, svgs) => {
    barcodeRefs.current[id] = svgs;
  };

  const generatePDF = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // grid config
    const margin = 20;
    const barcodeWidth = 150;
    const barcodeHeight = 50;
    const spacing = 20; // increased a bit since no text

    const usableWidth = pageWidth - 2 * margin;
    const usableHeight = pageHeight - 2 * margin;

    const itemWidth = barcodeWidth + spacing;
    const itemHeight = barcodeHeight * 2 + spacing;

    const itemsPerRow = Math.floor(usableWidth / itemWidth);
    const rowsPerPage = Math.floor(usableHeight / itemHeight);
    const itemsPerPage = itemsPerRow * rowsPerPage;

    let itemsOnCurrentPage = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const entry = barcodeRefs.current[user.id];

      if (!entry) {
        alert(`Barcode for ${user.username} not ready yet`);
        return;
      }

      const { usernameSvg, passwordSvg } = entry;

      if (itemsOnCurrentPage >= itemsPerPage) {
        doc.addPage();
        itemsOnCurrentPage = 0;
      }

      const row = Math.floor(itemsOnCurrentPage / itemsPerRow);
      const col = itemsOnCurrentPage % itemsPerRow;

      const x = margin + col * itemWidth;
      const y = margin + row * itemHeight;

      await doc.svg(usernameSvg, {
        x,
        y,
        width: barcodeWidth,
        height: barcodeHeight,
      });

      await doc.svg(passwordSvg, {
        x,
        y: y + barcodeHeight + 10,
        width: barcodeWidth,
        height: barcodeHeight,
      });

      itemsOnCurrentPage++;
    }

    const filename =
      users.length === 1
        ? `${users[0].username}_barcodes.pdf`
        : `${users.length}_users_barcodes.pdf`;

    doc.save(filename);
  };

  return (
    <div className="space-y-4">
      {/* hidden SVGs */}
      {users.map((user) => (
        <UserBarcodes key={user.id} user={user} onReady={handleReady} />
      ))}

      <Button onClick={generatePDF} className="w-full">
        Download PDF
      </Button>
    </div>
  );
}

export default BarcodeItem;
