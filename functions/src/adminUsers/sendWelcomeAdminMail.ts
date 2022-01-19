import * as functions from 'firebase-functions';
import * as mailgunJs from 'mailgun-js';

export function sendWelcomeAdminMail(user: {
  name: string;
  email: string;
  password: string;
}) {
  const config = functions.config().mailgun;

  const mailgun = mailgunJs({
    apiKey: config.api_key,
    host: 'api.eu.mailgun.net',
    domain: config.domain
  });

  const subject = `Martin Reiche | Administrationszugang`;

  const msgBody = `
    Hi ${user.name}

    Ich bin die Schaltzentrale und ich habe dich gerade zu einem Administrator ernannt! 
    Unter folgenden Adressen erreichst Du das Admin Panel:

        https://martinreiche.de/login/

    Dass erste Mal musst Du dich mit dem untenstehenden Passwort einloggen. Danach wirst Du sofort 
    aufgefordert Dein Passwort zu ändern. Bitte wähle ein sicheres Passwort. Du hast nun Zugriff 
    auf die komplette Shop Datenbank. Deswegen ist es sehr wichtig, dass Du die Sicherheitsfragen 
    ernst nimmst. Hier sind ein paar Tipps zur Erstellung sicherer Passwörter:

    - verwende auf keinen Fall ein Passwort, dass Du schon einmal verwendet hast
    - Vorallem auf die Länge kommt es an: am besten 20+ Zeichen
    - nimm daher lieber einen langen Satz den Du Dir merken kannst, statt zufälligen Zeichenfolgen
    - pack ein paar Eigennamen in den Satz, die nicht in Wörterbüchern stehen
    - am besten Du verwendest einen Passwortmanager mit zufällig erstellten Passwörtern

    Dein Vorläufiges Passwort lautet: ${user.password}

    So ${
      user.name
    }, das war es erstmal von mir. 

    Beste Grüße,
    Die Schaltzentrale
  `;

  const data = {
    from: config.from_address,
    to: user.email,
    bcc: config.bcc_address,
    subject,
    text: msgBody
  };

  return new Promise((resolve, reject) => {
    return mailgun.messages().send(data, function(error) {
      if (error) {
        reject(error);
      } else resolve(0);
    });
  });
}

export default sendWelcomeAdminMail;
