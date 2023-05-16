const twilio = require('twilio');

// Replace these with your Twilio account SID and auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

class TwilioService {
    constructor() {
        this.client = twilio(accountSid, authToken);
    }

    async sendSMS(to, message) {
        try {
            await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER, // Replace this with your Twilio phone number
                to
            });
            console.log(`Successfully sent SMS to ${to}`);
        } catch (err) {
            console.error('Error sending SMS:', err);
        }
    }
}

module.exports = new TwilioService();
/*
This TwilioService class provides a sendSMS(to, message) method for sending an SMS message to a specified phone number. It uses the twilio library to send the SMS.

You'll need to replace process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, and process.env.TWILIO_PHONE_NUMBER with your actual Twilio account SID, auth token, and phone number, respectively. These can be found in the Twilio dashboard.

You can use this TwilioService class in your application to send SMS notifications to users. For example, you could send an SMS notification to a lender when a payment is made or when they have successfully linked their bank account.
*/