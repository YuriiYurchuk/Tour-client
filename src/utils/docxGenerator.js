import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export const generateDOCX = async (booking) => {
  if (!booking) {
    console.error("Невірні дані бронювання або відсутній контракт");
    return;
  }

  const contract = booking?.contract;
  const tourists = booking?.tourists || [];
  const services = booking?.services || [];

  const contractSection = [
    headingP("Контракт"),
    textP(
      `ПІБ: ${contract.last_name} ${contract.first_name} ${
        contract.middle_name || ""
      }`
    ),
    textP(`Email: ${contract.email}`),
    textP(`Телефон: ${contract.phone_number}`),
    textP(`Дата народження: ${contract.date_of_birth}`),
    textP(`Громадянство: ${contract.citizenship}`),
    textP(`Тип документа: ${contract.document_type || ""}`),
    textP(`Серія документа: ${contract.document_series || ""}`),
    textP(`Номер документа: ${contract.document_number || ""}`),
    textP(`Дата видачі: ${contract.document_issued_date || ""}`),
    textP(`Адреса реєстрації: ${contract.registration_address || ""}`),
  ];

  const touristSections = tourists.flatMap((t, i) => [
    headingP(`Турист ${i + 1}`),
    textP(`ПІБ: ${t.last_name} ${t.first_name} ${t.middle_name || ""}`),
    textP(`Email: ${t.email}`),
    textP(`Телефон: ${t.phone_number}`),
    textP(`Стать: ${t.gender}`),
    textP(`Дата народження: ${t.date_of_birth}`),
    textP(`Країна народження: ${t.country_of_birth || ""}`),
    textP(`Громадянство: ${t.citizenship || ""}`),
    textP(`Тип документа: ${t.document_type || ""}`),
    textP(`Серія документа: ${t.document_series || ""}`),
    textP(`Номер документа: ${t.document_number || ""}`),
    textP(`Дата видачі документа: ${t.document_issued_date || ""}`),
    textP(`Дійсний до: ${t.document_valid_until || ""}`),
    emptyLine(),
  ]);

  const serviceSections = services.length
    ? [
        headingP("Послуги"),
        ...services.flatMap((s) => {
          const priceText = s.price ? `${s.price} грн` : "";
          const dateText = s.date || "";

          return [
            textP(`Назва: ${s.name || ""}`),
            textP(`Тип: ${s.type || ""}`),
            textP(`Ціна: ${priceText}`),
            textP(`Дата: ${dateText}`),
            emptyLine(),
          ];
        }),
      ]
    : [headingP("Послуги"), textP("Відсутні")];

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Деталі бронювання #${booking.contract.booking_id}`,
                bold: true,
                size: 36,
              }),
            ],
          }),
          emptyLine(),
          ...contractSection,
          emptyLine(),
          ...touristSections,
          ...serviceSections,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `booking_${booking.contract.booking_id}.docx`);
};

const textP = (text) =>
  new Paragraph({
    children: [new TextRun({ text, size: 28 })],
  });

const emptyLine = () =>
  new Paragraph({
    children: [new TextRun({ text: "", size: 28 })],
  });

const headingP = (text) =>
  new Paragraph({
    children: [new TextRun({ text, size: 32, bold: true })],
    heading: HeadingLevel.HEADING_2,
  });
