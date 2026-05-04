const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID || "mdalvabv";

type FormspreeFieldValue = string | number | boolean | null | undefined;

export async function submitToFormspree(fields: Record<string, FormspreeFieldValue>) {
  const body = new URLSearchParams();

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  }

  const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Formspree submission failed with status ${response.status}${
        responseText ? `: ${responseText.slice(0, 200)}` : ""
      }`
    );
  }
}
