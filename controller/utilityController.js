import Feedback from "../models/feedbackModel.js";
import Help from "../models/helpModel.js";
import fs from "fs";
import pdf from "html-pdf";
import { sendInvoicePdf } from "../utils/sendMails.js";

export const feedbackForm = async (req, res) => {
  const { userId, fullName, email, message } = req.body;
  console.log(userId);
  try {
    const feedback = await Feedback.create({
      userId,
      fullName,
      email,
      message,
    });

    res.status(201).json({ message: "Feedback received successfully", feedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "An error occurred while saving feedback" });
  }
};
export const helpForm = async (req, res) => {
  const { fullName, email, message } = req.body;
  try {
    const help = await Help.create({ fullName, email, message });

    res.status(201).json({ message: "Feedback received successfully", help });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "An error occurred while saving feedback" });
  }
};
// app.post("/api/generate-invoice-pdf", (req, res) => {

export const sendInvoice = async (req, res) => {
  // Generate HTML content for invoice
  const { data, email } = req.body;
  console.log(data);
  console.log(email);
  const { user, partyData, purchaseDetails, amount, type } = data;
  console.log(amount, type);

  console.log(user, purchaseDetails, partyData);
  const generateHTMLInvoice = () => {
     let html = `
      <div>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f8f8;
          }
          
          .container {
            width: 90%;
            margin: auto;
            background-color: #fff;
            padding: 20px;
           }
  
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
  
          .header-left {
            text-align: left;
          }
  
          .business-name {
            font-size: 24px;
            font-weight: bold;
          }
  
          .phone-number {
            margin-top: 5px;
          }
  
          .header-right {
            display: flex;
            align-items: center;
          }
  
          .business-logo {
            width: 80px;
            height: auto;
            border-radius: 50%;
          }
  
          .title {
            text-align: center;
            color: #6b46c1;
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 24px;
          }
  
          .order-details {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
  
          .from-to,
          .dates {
            width: 48%;
          }
  
          .order-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
  
          .order-table th,
          .order-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
          }
  
          .order-table th {
            background-color: #f2f2f2;
          }
  
          .text-right {
            text-align: right;
          }
  
          .summary {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
  
          .summary-left,
          .summary-right {
            width: 48%;
          }
  
          .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
          }
  
          .signature {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
          }
  
          .signature p {
            border-top: 1px solid #000;
            padding-top: 10px;
            text-align: center;
            width: 200px;
          }
  
          .print-button {
            text-align: center;
            margin-top: 20px;
          }
  
          .print-button button {
            padding: 10px 20px;
            background-color: #1a73e8;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
  
          .print-button button:hover {
            background-color: #0c5ab8;
          }
        </style>
        <div class="container">
          <header class="header">
            <div class="header-left">
              <h1 class="business-name">${
                user?.businessName || user?.fullName
              }</h1>
              <p class="phone-number">Phone Number: ${user?.phoneNo}</p>
            </div>
            <div class="header-right">
              <img src=${
                user?.profileUrl
              } alt="Business Logo" class="business-logo" />
            </div>
          </header>
          <h2 class="title">${type} Order</h2>
          <div class="order-details">
            <div class="from-to">
              <p><strong>From:</strong>From: ${
                user?.businessName || user?.fullName
              }</p>
              <p><strong>To:</strong> To: ${partyData?.party}</p>
              <p><strong>Order Number: </strong>${partyData?.number}</p>
            </div>
            <div class="dates">
              <p><strong>Order Details</strong></p>
              <p><strong>Date: </strong>${new Date().toLocaleDateString()} </p>
              <p><strong>Due Date: </strong> ${partyData?.dueDate}</p>
            </div>
          </div>
          <table class="order-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price/Unit (without tax)</th>
                <th>Tax</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody id="purchaseList">hello</tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">Total quantity:</td>
                <td> ${partyData?.toatalquantity}</td>
                <td colspan="3" class="text-right">Total Amount:</td>
                <td>${partyData?.totalAmount} Rs</td>
              </tr>
            </tfoot>
          </table>
          <div class="summary">
            <div class="summary-left">
              <p><strong>Order Amount In Words</strong></p>
              <p>${amount}</p>
              <p><strong>Terms and Conditions</strong></p>
              <p>Thanks for doing business with us!</p>
              <p>Please visit Again</p>
            </div>
            <div class="summary-right">
              <div class="summary-row">
                <p>Total</p>
                <p>${partyData?.totalAmount} Rs</p>
              </div>
              <div class="summary-row">
                <p>Paid</p>
                <p>${partyData?.totalAmount} Rs</p>
              </div>
              <div class="summary-row">
                <p>Balance</p>
                <p>${partyData?.totalAmount} Rs</p>
              </div>
            </div>
          </div>
          <div class="signature">
            <p>Authorized Signatory</p>
          </div>
           
        </div>
        <script>
        const result =${purchaseDetails}
        const purchaseList = document.getElementById("purchaseList");
         if (result && result.length > 0) {
           for (let i = 0; i < result.length; i++) {
             const purchase = result[i];
             const row = document.createElement("tr");
             row.innerHTML = 
               <td>i + 1</td>
               <td>purchase.item</td>
               <td>purchase.qty</td>
               <td>purchase.unit</td>
               <td>purchase.pricePerUnit</td>
               <td>purchase.tax</td>
               <td>purchase.amount</td>
           ;
          
             purchaseList.appendChild(row);
           }
         } else {
           const row = document.createElement("tr");
          row.innerHTML = <td colspan="7">No data available</td>;
           purchaseList.appendChild(row);
         }
       </script>
      </div>
      `;

    return  html;
  };

  // Generate PDF invoice from HTML content
  const generatePDFInvoice = (htmlContent) => {
      pdf.create(htmlContent).toFile("./billingData/invoice.pdf", (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to generate PDF" });
      }
       sendInvoicePdf(email, res);
      console.log("PDF invoice generated successfully");
      res.status(200).json({
        success: true,
        message: "PDF invoice generated successfully",
        invoiceFilePath: "invoice.pdf",
      });
    });
  };

  // Call functions to generate HTML content and PDF invoice
  const htmlContent =await generateHTMLInvoice();
 await generatePDFInvoice(htmlContent);
  setTimeout(() => {
    fs.unlink("./billingData/invoice.pdf", function (err) {
      if (err) return console.log(err);
      console.log("file deleted successfully");
    });
  }, 20000);
};
