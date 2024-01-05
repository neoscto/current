import jsPDF from 'jspdf';

export const pdfGenerate = (formData) => {
    const pdf = new jsPDF();
    pdf.text(20, 20, `Number of People: ${formData.numberOfPeople}`);
    pdf.text(20, 30, `First Name: ${formData.firstName}`);
    pdf.text(20, 40, `Last Name: ${formData.lastName}`);
    pdf.text(20, 50, `Email Address: ${formData.emailAddress}`);
    pdf.text(20, 60, `Phone Number: ${formData.phoneNumber}`);
    pdf.save(formData.firstName ? `${formData.firstName}.pdf` : 'contract.pdf');
  };