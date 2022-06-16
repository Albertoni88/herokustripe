import express from 'express';

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51L8XfnFsR5opKmH1Q89hJ3W90avZuAHGtmbLUuPE5yyE2YmoelT3zTueeoVPlYSm4qscuBkBbkb1lVdjz7HEBltT00BI02dz5i";
const SECRET_KEY = "sk_test_51L8XfnFsR5opKmH1TEztjIzkolx956A9xpPGNmbCMQVVqQOdZLLgg5YFbhUe4RqbVKNdePrkLMX0rkHba55QG2da003fEd60Aq";
import Stripe from 'stripe';
const stripe = Stripe(SECRET_KEY, {apiVersion : '2020-08-27'});

app.listen(5000, function(){
    console.log('listening on *:5000');
  });
app.post('/create-payment-intent', async (req, res)=>{
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount : 1099,
            currency : "usd",
            payment_method_types : ["card"],
        });
        const clientSecret = paymentIntent.client_secret;
        console.log("clientSecret ", clientSecret);
        res.json({
            clientSecret : clientSecret
        })
    } catch (error) {
        console.log("console error ", error);
        res.json({ error : error.message })
    }
})



