const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripeService {
    async createCustomer(email) {
        try {
            const customer = await stripe.customers.create({ email });
            return customer.id;
        } catch (err) {
            console.error('Error creating Stripe customer:', err);
        }
    }

    async createPaymentIntent(amount) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd'
            });
            return paymentIntent.client_secret;
        } catch (err) {
            console.error('Error creating Stripe PaymentIntent:', err);
        }
    }

    async linkBankAccount(customerId, bankAccountId) {
        try {
            const bankAccount = await stripe.customers.createSource(customerId, {
                source: bankAccountId,
            });
            return bankAccount.id;
        } catch (err) {
            console.error('Error linking bank account to Stripe customer:', err);
        }
    }
}

module.exports = new StripeService();
/*
This StripeService class provides three methods for interacting with the Stripe API: createCustomer(email), createPaymentIntent(amount), and linkBankAccount(customerId, bankAccountId). These methods correspond to the routes we defined in the stripeIntegration.js module.

You'll need to replace process.env.STRIPE_SECRET_KEY with your actual Stripe secret key. This can be found in the Stripe dashboard.

You can use this StripeService class in your application to handle Stripe operations. For example, you could call createCustomer(email) when a new user signs up, createPaymentIntent(amount) when a lender wants to lend money, and linkBankAccount(customerId, bankAccountId) when a lender wants to link their bank account.
*/